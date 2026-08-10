#!/usr/bin/env node
// Check app + domain + handle + trademark signals for candidate names.
//
// Usage:
//   node scripts/check-name.mjs Fitly Trainly Coachly
//   node scripts/check-name.mjs --file scripts/names.txt
//   node scripts/check-name.mjs --json Fitly Trainly        # machine-readable
//   node scripts/check-name.mjs --tlds com,app,io Fitly     # custom TLDs
//   node scripts/check-name.mjs --concurrency 5 --file ...  # parallel names
//
// Caveats (read these before trusting the output):
//   - iTunes Search API returns ranked search results, not a definitive
//     "is this name reserved" answer. False negatives happen. The only
//     authoritative check is creating the app record in App Store Connect.
//   - Google Play allows duplicate display names; uniqueness is on the
//     package id. A "no exact match" result just means no top-ranked
//     collision — it does not guarantee the name is conflict-free.
//   - Social handle checks use unauthenticated HTTP probes. Instagram and
//     TikTok in particular often return 200 with a login wall regardless,
//     so treat ⚠️ as "verify manually."
//   - Trademark checks are deep-links to official search UIs. There is no
//     reliable free API that covers USPTO + EUIPO + Patentstyret for
//     fuzzy mark search in Class 9 (software/apps).

const DEFAULT_TLDS = ['com', 'app', 'io', 'ai', 'co', 'fit', 'fitness', 'coach'];
const ITUNES_COUNTRIES = ['us', 'no', 'gb'];

const args = process.argv.slice(2);
const flag = (name, def) => {
  const i = args.indexOf(name);
  if (i < 0) return def;
  const v = args[i + 1];
  args.splice(i, 2);
  return v;
};
const has = (name) => {
  const i = args.indexOf(name);
  if (i < 0) return false;
  args.splice(i, 1);
  return true;
};

const JSON_OUT = has('--json');
const CONCURRENCY = parseInt(flag('--concurrency', '3'), 10);
const TLDS = (flag('--tlds', null)?.split(',') ?? DEFAULT_TLDS).map((s) => s.trim()).filter(Boolean);
const fileArg = flag('--file', null);

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchSafe(url, opts = {}) {
  const ctl = AbortSignal.timeout?.(15000);
  try {
    return await fetch(url, { signal: ctl, redirect: 'follow', ...opts });
  } catch (e) {
    return { ok: false, status: 0, error: String(e), text: async () => '', json: async () => ({}) };
  }
}

// ---------- App Store (iTunes Search API) ----------
async function checkITunes(name) {
  const slug = norm(name);
  const out = { exact: [], partial: [], totalResults: 0 };
  await Promise.all(
    ITUNES_COUNTRIES.map(async (country) => {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=software&country=${country}&limit=50`;
      const r = await fetchSafe(url);
      if (!r.ok) return;
      const j = await r.json().catch(() => ({}));
      const results = j.results ?? [];
      out.totalResults += results.length;
      for (const app of results) {
        const tn = app.trackName || '';
        const tnNorm = norm(tn);
        if (tnNorm === slug) {
          out.exact.push({ country, name: tn, seller: app.sellerName, id: app.trackId, bundleId: app.bundleId });
        } else if (tnNorm.startsWith(slug) || tnNorm.includes(`:${slug}`) || tnNorm.split(/[\s:\-—]/).map(norm).includes(slug)) {
          out.partial.push({ country, name: tn, seller: app.sellerName });
        }
      }
    }),
  );
  // Dedup exact across countries
  const seen = new Set();
  out.exact = out.exact.filter((h) => (seen.has(h.id) ? false : (seen.add(h.id), true)));
  return out;
}

// ---------- Play Store (HTML scrape; google-play-scraper does the same) ----------
async function checkPlay(name) {
  const url = `https://play.google.com/store/search?q=${encodeURIComponent(name)}&c=apps&hl=en&gl=us`;
  const r = await fetchSafe(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!r.ok) return { error: r.error || `status ${r.status}`, url };
  const html = await r.text();
  // Play renders app titles inside spans/divs; look for the exact name as a
  // contained text node. This is heuristic — a hit means "name appears in
  // first page of results," not "this exact app exists."
  const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const exact = new RegExp(`>\\s*${esc}\\s*<`, 'i').test(html);
  const fuzzy = new RegExp(`>\\s*${esc}[^<]{0,40}<`, 'i').test(html);
  return { exact, fuzzy, url };
}

// ---------- Domains (RDAP) ----------
// rdap.org rate-limits aggressively (~10 req then 429). Serialize *globally*
// across all names with a small spacing.
let rdapChain = Promise.resolve();
function rdapQueue(fn) {
  const next = rdapChain.then(() => fn()).then(async (v) => {
    await sleep(400);
    return v;
  });
  rdapChain = next.catch(() => {});
  return next;
}
async function checkDomain(fqdn) {
  return rdapQueue(async () => {
    const url = `https://rdap.org/domain/${fqdn}`;
    for (let attempt = 0; attempt < 4; attempt++) {
      const r = await fetchSafe(url);
      if (r.status === 404) return { fqdn, available: true };
      if (r.status === 200) {
        const j = await r.json().catch(() => ({}));
        const reg = j?.entities?.[0]?.vcardArray?.[1]?.find?.((x) => Array.isArray(x) && x[0] === 'fn')?.[3];
        return { fqdn, available: false, registrar: reg };
      }
      if (r.status === 429) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return { fqdn, available: null, status: r.status, error: r.error };
    }
    return { fqdn, available: null, status: 429, error: 'rate-limited after retries' };
  });
}

// ---------- Social handles ----------
// Probe strategy per platform. 404 = available is the cleanest signal.
// For platforms that always return 200 we fall back to body markers.
async function checkHandle(platform, url, markers = {}) {
  const r = await fetchSafe(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (r.status === 404) return { platform, status: 'available', url };
  if (!r.ok && r.status !== 200) return { platform, status: 'unknown', code: r.status, url };
  if (markers.notFound) {
    const html = await r.text();
    if (markers.notFound.test(html)) return { platform, status: 'available', url };
    if (markers.found && markers.found.test(html)) return { platform, status: 'taken', url };
    return { platform, status: 'ambiguous', url };
  }
  return { platform, status: 'taken', url };
}

async function checkHandles(name) {
  const h = norm(name);
  const probes = [
    // GitHub: clean public API.
    fetchSafe(`https://api.github.com/users/${h}`).then((r) => ({
      platform: 'github',
      status: r.status === 404 ? 'available' : r.status === 200 ? 'taken' : 'unknown',
      url: `https://github.com/${h}`,
    })),
    // npm registry: 404 = name free.
    fetchSafe(`https://registry.npmjs.org/${encodeURIComponent(h)}`).then((r) => ({
      platform: 'npm',
      status: r.status === 404 ? 'available' : r.status === 200 ? 'taken' : 'unknown',
      url: `https://www.npmjs.com/package/${h}`,
    })),
    // Reddit user JSON: 404 if no such user. Reddit blocks default UA.
    fetchSafe(`https://www.reddit.com/user/${h}/about.json`, { headers: { 'user-agent': 'name-checker/1.0' } }).then(
      (r) => ({
        platform: 'reddit',
        status: r.status === 404 ? 'available' : r.status === 200 ? 'taken' : 'unknown',
        url: `https://www.reddit.com/user/${h}`,
      }),
    ),
    // YouTube @handle: 404 if free, 200 if claimed.
    checkHandle('youtube', `https://www.youtube.com/@${h}`),
    // TikTok: usually 200 even when free, but body contains a notFound marker.
    checkHandle('tiktok', `https://www.tiktok.com/@${h}`, {
      notFound: /Couldn['’]t find this account|user_page_no_found/i,
    }),
    // Instagram: returns login wall — best-effort marker check, often ambiguous.
    checkHandle('instagram', `https://www.instagram.com/${h}/`, {
      notFound: /Sorry, this page isn't available|Page Not Found/i,
    }),
    // X/Twitter: requires auth in 2026 — emit a manual link only.
    Promise.resolve({ platform: 'x', status: 'manual', url: `https://x.com/${h}` }),
  ];
  return Promise.all(probes);
}

// ---------- Trademark deep-links (manual verification) ----------
function trademarkLinks(name) {
  const q = encodeURIComponent(name);
  return {
    uspto: `https://tmsearch.uspto.gov/search/search-information?searchType=basic&q=${q}`,
    euipo: `https://www.tmdn.org/tmview/#/tmview/results?text=${q}&_=1`,
    patentstyret: `https://search.patentstyret.no/Trademark?query=${q}`,
    googleQuoted: `https://www.google.com/search?q=%22${q}%22+app`,
  };
}

// ---------- Verdict ----------
function verdict({ itunes, play, domains, handles }) {
  const reasons = [];
  if (itunes.exact.length > 0) reasons.push('App Store exact-name match');
  if (play.exact) reasons.push('Play Store exact-name match');
  const goodDomains = domains.filter((d) => ['app', 'io', 'ai', 'co'].includes(d.fqdn.split('.').pop()) && d.available);
  if (goodDomains.length === 0) reasons.push('no preferred domain available');
  const ghTaken = handles.find((h) => h.platform === 'github' && h.status === 'taken');
  if (ghTaken) reasons.push('github handle taken');

  if (itunes.exact.length > 0) return { level: 'red', reasons };
  if (reasons.length >= 2) return { level: 'yellow', reasons };
  if (reasons.length === 1) return { level: 'yellow', reasons };
  return { level: 'green', reasons: [] };
}

// ---------- Per-name pipeline ----------
async function checkName(name) {
  const slug = norm(name);
  // App Store + Play in parallel; domains and handles in parallel groups.
  // RDAP serialized within the name (rdap.org rate-limits ~10 req).
  const [itunes, play, handles, domains] = await Promise.all([
    checkITunes(name),
    checkPlay(name),
    checkHandles(name),
    Promise.all(TLDS.map((tld) => checkDomain(`${slug}.${tld}`))),
  ]);
  const v = verdict({ itunes, play, domains, handles });
  return { name, slug, itunes, play, domains, handles, trademark: trademarkLinks(name), verdict: v };
}

// ---------- Output ----------
function emoji(level) {
  return level === 'green' ? '🟢' : level === 'yellow' ? '🟡' : '🔴';
}

function printPretty(r) {
  console.log(`\n${emoji(r.verdict.level)} === ${r.name} ===`);
  if (r.verdict.reasons.length) console.log(`   verdict: ${r.verdict.level} — ${r.verdict.reasons.join('; ')}`);
  else console.log(`   verdict: green — no blocking signals`);

  if (r.itunes.exact.length === 0) {
    const note = r.itunes.totalResults === 0 ? ' (⚠️ search returned 0 results — verify manually)' : '';
    console.log(`   App Store: no exact-name match ✅${note}`);
  } else {
    console.log('   App Store: EXACT MATCHES ❌');
    for (const h of r.itunes.exact) console.log(`     - "${h.name}" by ${h.seller} (bundleId ${h.bundleId})`);
  }
  if (r.itunes.partial.length) {
    const sample = r.itunes.partial.slice(0, 3).map((p) => `"${p.name}"`).join(', ');
    console.log(`   App Store: ${r.itunes.partial.length} partial match(es) — ${sample}${r.itunes.partial.length > 3 ? ', …' : ''}`);
  }

  console.log(
    `   Play Store: ${r.play.exact ? 'exact name in results ❌' : r.play.fuzzy ? 'fuzzy hit ⚠️' : 'no obvious match ✅'}`,
  );

  console.log('   Domains:');
  for (const d of r.domains) {
    const mark = d.available === true ? '✅' : d.available === false ? '❌' : `? (${d.status ?? d.error})`;
    console.log(`     ${d.fqdn.padEnd(28)} ${mark}${d.registrar ? '  — ' + d.registrar : ''}`);
  }

  console.log('   Handles:');
  for (const h of r.handles) {
    const sym = { available: '✅', taken: '❌', ambiguous: '⚠️', unknown: '?', manual: '👉' }[h.status];
    console.log(`     ${h.platform.padEnd(10)} ${sym} ${h.status.padEnd(10)} ${h.url}`);
  }

  console.log('   Trademark (verify manually):');
  console.log(`     USPTO:        ${r.trademark.uspto}`);
  console.log(`     EUIPO TMview: ${r.trademark.euipo}`);
  console.log(`     Patentstyret: ${r.trademark.patentstyret}`);
}

// ---------- Concurrency-limited driver ----------
async function pool(items, n, fn) {
  const out = [];
  let i = 0;
  const workers = Array.from({ length: Math.max(1, n) }, async () => {
    while (i < items.length) {
      const idx = i++;
      out[idx] = await fn(items[idx]);
    }
  });
  await Promise.all(workers);
  return out;
}

async function main() {
  let names = [];
  if (fileArg) {
    const fs = await import('node:fs/promises');
    names = (await fs.readFile(fileArg, 'utf8'))
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith('#'));
  } else {
    names = args;
  }
  if (names.length === 0) {
    console.error('Usage: node scripts/check-name.mjs [--json] [--concurrency N] [--tlds com,app,io] <Name> ...');
    console.error('       node scripts/check-name.mjs --file scripts/names.txt');
    process.exit(1);
  }

  const results = await pool(names, CONCURRENCY, checkName);

  if (JSON_OUT) {
    console.log(JSON.stringify(results, null, 2));
    return;
  }
  for (const r of results) printPretty(r);

  // Final summary, sorted by verdict.
  console.log('\n--- Summary ---');
  const order = { green: 0, yellow: 1, red: 2 };
  const sorted = [...results].sort((a, b) => order[a.verdict.level] - order[b.verdict.level]);
  for (const r of sorted) {
    console.log(`${emoji(r.verdict.level)} ${r.name.padEnd(20)} ${r.verdict.reasons.join('; ') || 'clear'}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
