#!/usr/bin/env node
// Scrape Felleskatalogen for Norwegian medicines.
// Output: src/data.generated.ts with MEDICINES_FK and SUBSTANCES_FK arrays.
// Run: node scripts/scrape-felleskatalogen.mjs

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data.generated.ts');

// Curated seed: common Norwegian OTC + prescription drugs that athletes ask about.
// Each entry is a search term against felleskatalogen.no.
const SEEDS = [
  // Smerte / feber
  'paracet', 'panodil', 'ibux', 'ibuprofen', 'naproxen', 'voltaren', 'diclofenac',
  'paralgin forte', 'tramadol', 'oxycontin',
  // Astma / KOLS / luftveier
  'ventoline', 'pulmicort', 'symbicort', 'seretide', 'flixotide', 'spiriva',
  'singulair', 'atrovent', 'bricanyl', 'serevent',
  // Allergi
  'cetirizin', 'loratadin', 'aerius', 'zyrtec', 'avamys', 'nasonex',
  // Kortikosteroider
  'prednisolon', 'medrol', 'kenacort', 'solu-medrol',
  // Hormon / anabole / testosteron
  'testogel', 'nebido', 'testoviron', 'androtardyl',
  // Stimulerende / ADHD
  'ritalin', 'concerta', 'elvanse', 'strattera', 'modafinil',
  // Antidepressiva (relevante for utøvere)
  'cipralex', 'zoloft', 'fluoksetin', 'sertralin',
  // Søvn
  'imovane', 'circadin',
  // Diuretika (maskerende stoffer)
  'furix', 'furosemid', 'centyl', 'spironolakton',
  // Beta-blokkere (forbudt i skytesport mm.)
  'selo-zok', 'metoprolol', 'tenormin', 'atenolol', 'propranolol',
  // Cannabinoider (medisinsk)
  'sativex',
  // Antibiotika (alltid tillatt — viktig for å demonstrere "Tillatt"-status)
  'apocillin', 'amoxicillin', 'doxylin',
  // EPO / blodprodukter
  'eprex', 'aranesp', 'mircera', 'neorecormon',
  // Vekstthormoner
  'genotropin', 'norditropin', 'humatrope',
  // P-piller (alltid tillatt)
  'microgynon', 'yasmin', 'cerazette',
  // Diabetes
  'insulin', 'metformin', 'ozempic',
  // Lokalanestesi / muskelbetennelse
  'xylocain', 'voltarol',
];

const BASE = 'https://www.felleskatalogen.no';
const UA = 'Mozilla/5.0 (compatible; ADNO-Prototype-Builder/1.0; +https://antidoping.no)';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept': 'text/html' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.text();
}

function parseSearchResults(html) {
  // Match: <a href="/medisin/<slug>-<id>?markering=0">...
  const re = /href="(\/medisin\/[a-z0-9-]+-\d+)\?markering=0"/g;
  const seen = new Set();
  const out = [];
  let m;
  while ((m = re.exec(html))) {
    const path = m[1];
    if (!seen.has(path)) {
      seen.add(path);
      out.push(path);
    }
  }
  return out;
}

function parseDrugPage(html, url) {
  // ATC code: <span class="atc-kode">N02B E01</span>
  const atcMatch = html.match(/<span class="atc-kode">([^<]+)<\/span>/);
  // Substance / virkestoff name: <span class="atc-tittel-auto oppslag">Paracetamol</span>
  const subMatch = html.match(/<span class="atc-tittel-auto[^"]*">([^<]+)<\/span>/);
  // Page H1 has the brand name+manufacturer
  const nameMatch = html.match(/<h1 class="PreparatNavn">([^<]+)<\/h1>/);
  const firmMatch = html.match(/<p class="PreparatFirma">[\s\S]*?title="([^"]+)"/);
  // Forms appear in <span class="form-styrke">tabletter 500 mg</span> blocks
  const forms = [];
  const formRe = /<span class="form-styrke">([^<]+)<\/span>/g;
  let fm;
  while ((fm = formRe.exec(html))) {
    forms.push(fm[1].trim().replace(/\s+/g, ' '));
    if (forms.length > 4) break;
  }

  const brand = decodeHTML(nameMatch?.[1] || '').trim();
  const manufacturer = decodeHTML(firmMatch?.[1] || '').trim();

  if (!atcMatch || !subMatch || !brand) return null;

  return {
    name: brand,
    manufacturer,
    substance: decodeHTML(subMatch[1].trim()),
    atc: atcMatch[1].replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim(),
    forms: forms.slice(0, 3),
    url: BASE + url,
  };
}

function decodeHTML(s) {
  return s
    .replace(/&aring;/g, 'å').replace(/&aelig;/g, 'æ').replace(/&oslash;/g, 'ø')
    .replace(/&Aring;/g, 'Å').replace(/&AElig;/g, 'Æ').replace(/&Oslash;/g, 'Ø')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ');
}

// WADA classification by ATC prefix.
// Source: WADA 2026 Prohibited List + Antidoping Norge guidance.
const WADA_RULES = [
  // Anabolic agents — banned at all times
  { prefix: 'A14A', status: 'banned', cat: 'S1 — Anabole stoffer' },
  { prefix: 'G03B', status: 'banned', cat: 'S1 — Anabole stoffer (testosteron)' },
  // Peptide hormones, growth factors — banned at all times
  { prefix: 'B03XA', status: 'banned', cat: 'S2 — EPO/erytropoiesestimulerende' },
  { prefix: 'H01AC', status: 'banned', cat: 'S2 — Veksthormon (hGH)' },
  // Beta-2 agonists — restricted (most inhaled forms are allowed up to dose limits)
  { prefix: 'R03AC', status: 'incomp', cat: 'S3 — Beta-2-agonister' },
  { prefix: 'R03AK', status: 'incomp', cat: 'S3 — Beta-2-agonister (kombinasjon)' },
  // Hormone modulators
  { prefix: 'L02BG', status: 'banned', cat: 'S4 — Hormon-modulatorer' },
  // Diuretics & masking agents — banned at all times
  { prefix: 'C03', status: 'banned', cat: 'S5 — Diuretika og maskerende' },
  // Stimulants — banned in competition
  { prefix: 'N06BA', status: 'incomp', cat: 'S6 — Stimulerende midler' },
  { prefix: 'N06BC', status: 'incomp', cat: 'S6 — Stimulerende midler' },
  // Narcotics — banned in competition
  { prefix: 'N02A', status: 'incomp', cat: 'S7 — Narkotika' },
  // Cannabinoids — banned in competition
  { prefix: 'N02BG10', status: 'incomp', cat: 'S8 — Cannabinoider' },
  // Glucocorticoids (systemic) — banned in competition
  { prefix: 'H02AB', status: 'incomp', cat: 'S9 — Glukokortikoider (systemisk)' },
  // Beta-blockers — banned in select sports (shooting, archery)
  { prefix: 'C07A', status: 'incomp', cat: 'P1 — Beta-blokkere (i utvalgte idretter)' },
];

function classify(atc, substance) {
  // Special-case overrides for substances with nuanced status
  const sub = substance.toLowerCase();
  if (sub.includes('salbutamol')) return { status: 'incomp', cat: 'S3 — Beta-2-agonister', note: 'Tillatt inhalert inntil 1600 µg/24t (max 600 µg/8t). Over: krever fritak.' };
  if (sub.includes('formoterol')) return { status: 'incomp', cat: 'S3 — Beta-2-agonister', note: 'Tillatt inhalert inntil 54 µg/24t. Over: krever fritak.' };
  if (sub.includes('salmeterol')) return { status: 'incomp', cat: 'S3 — Beta-2-agonister', note: 'Tillatt inhalert inntil 200 µg/24t.' };
  if (sub.includes('vilanterol')) return { status: 'incomp', cat: 'S3 — Beta-2-agonister', note: 'Tillatt inhalert inntil 25 µg/24t.' };
  if (sub.includes('budesonid') && !sub.includes('formoterol')) return { status: 'allowed', cat: 'Inhalert glukokortikoid', note: 'Tillatt uten fritak når inhalert.' };
  if (sub.includes('flutikason')) return { status: 'allowed', cat: 'Inhalert glukokortikoid', note: 'Tillatt uten fritak når inhalert.' };
  if (sub.includes('prednisolon') || sub.includes('metylprednisolon')) return { status: 'tue', cat: 'S9 — Glukokortikoider', note: 'Forbudt i konkurranse ved oral/IV/IM/rektal bruk. Krever fritak.' };
  if (sub.includes('kodein')) return { status: 'allowed', cat: 'Svake opioider', note: 'Kodein er ikke på dopinglisten i 2026, men metaboliseres til morfin.' };
  if (sub.includes('morfin') || sub.includes('oksykodon') || sub.includes('fentanyl')) return { status: 'tue', cat: 'S7 — Narkotika', note: 'Forbudt i konkurranse. Krever medisinsk fritak.' };
  if (sub.includes('metylfenidat') || sub.includes('amfetamin') || sub.includes('lisdeksamfetamin') || sub.includes('atomoksetin')) return { status: 'tue', cat: 'S6 — Stimulerende midler', note: 'Forbudt i konkurranse. ADHD-utøvere må ha fritak.' };
  if (sub.includes('modafinil')) return { status: 'tue', cat: 'S6 — Stimulerende midler', note: 'Forbudt i konkurranse. Krever fritak.' };
  if (sub.includes('testosteron')) return { status: 'banned', cat: 'S1 — Anabole stoffer', note: 'Forbudt til enhver tid. Alle administrasjonsformer.' };

  for (const r of WADA_RULES) {
    if (atc.replace(/\s+/g, '').startsWith(r.prefix)) {
      return { status: r.status, cat: r.cat, note: defaultNote(r.status) };
    }
  }
  return { status: 'allowed', cat: '', note: 'Ingen kjente forbudte stoffer i dopinglisten.' };
}

function defaultNote(status) {
  return {
    allowed: 'Ingen kjente forbudte stoffer.',
    incomp: 'Forbudt i konkurranse. Sjekk doseringsregler.',
    tue: 'Krever medisinsk fritak (TUE).',
    banned: 'Forbudt til enhver tid.',
  }[status];
}

async function main() {
  const drugs = [];
  const seen = new Set();
  let i = 0;
  for (const seed of SEEDS) {
    i++;
    process.stderr.write(`[${i}/${SEEDS.length}] ${seed} ... `);
    try {
      const searchHtml = await fetchText(`${BASE}/medisin/sok?sokord=${encodeURIComponent(seed)}`);
      const paths = parseSearchResults(searchHtml).slice(0, 3);
      for (const p of paths) {
        if (seen.has(p)) continue;
        seen.add(p);
        await sleep(150);
        try {
          const drugHtml = await fetchText(BASE + p);
          const drug = parseDrugPage(drugHtml, p);
          if (drug) {
            const wada = classify(drug.atc, drug.substance);
            drugs.push({ ...drug, ...wada });
          }
        } catch (e) {
          process.stderr.write(`(skip ${p}: ${e.message}) `);
        }
      }
      process.stderr.write(`✓\n`);
    } catch (e) {
      process.stderr.write(`✗ ${e.message}\n`);
    }
    await sleep(200);
  }

  // Dedupe by substance+manufacturer
  const out = [];
  const dedupe = new Set();
  for (const d of drugs) {
    const key = `${d.substance}|${d.name}|${d.manufacturer}`;
    if (dedupe.has(key)) continue;
    dedupe.add(key);
    out.push(d);
  }

  out.sort((a, b) => a.name.localeCompare(b.name));

  const ts = `// Auto-generated from felleskatalogen.no by scripts/scrape-felleskatalogen.mjs
// Do not edit by hand. Re-run script to refresh.
// Generated: ${new Date().toISOString()}
// Source: Felleskatalogen (offisiell norsk legemiddelkatalog, Foreningen for utgivelse av Norsk legemiddelhåndbok)

export type FKStatus = 'allowed' | 'incomp' | 'tue' | 'banned';

export interface FKMedicine {
  name: string;
  manufacturer: string;
  substance: string;
  atc: string;
  forms: string[];
  url: string;
  status: FKStatus;
  cat: string;
  note: string;
}

export const MEDICINES_FK: FKMedicine[] = ${JSON.stringify(out, null, 2)};
`;

  writeFileSync(OUT, ts);
  process.stderr.write(`\nWrote ${out.length} medicines → ${OUT}\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
