#!/usr/bin/env node
// Bulk domain availability via RDAP. Reads names from --file (one per line),
// outputs markdown table to stdout.
//
//   node scripts/domains-only.mjs --file scripts/all-candidates.txt > out.md

const TLDS = ['com', 'app', 'io', 'ai', 'co', 'fit', 'fitness', 'coach'];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

const args = process.argv.slice(2);
const fileIdx = args.indexOf('--file');
if (fileIdx < 0) {
  console.error('Usage: node scripts/domains-only.mjs --file names.txt');
  process.exit(1);
}

const fs = await import('node:fs/promises');
const names = (await fs.readFile(args[fileIdx + 1], 'utf8'))
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

async function rdap(fqdn) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const r = await fetch(`https://rdap.org/domain/${fqdn}`, { signal: AbortSignal.timeout(15000) });
      if (r.status === 404) return true;
      if (r.status === 200) return false;
      if (r.status === 429) {
        await sleep(2000 * (attempt + 1));
        continue;
      }
      return null;
    } catch {
      return null;
    }
  }
  return null;
}

const rows = [];
let n = 0;
for (const name of names) {
  const slug = norm(name);
  const row = { name };
  for (const tld of TLDS) {
    const available = await rdap(`${slug}.${tld}`);
    row[tld] = available;
    await sleep(450);
  }
  rows.push(row);
  n++;
  process.stderr.write(`[${n}/${names.length}] ${name}\n`);
}

const sym = (v) => (v === true ? '✅' : v === false ? '❌' : '?');
console.log(`| Name | ${TLDS.map((t) => '.' + t).join(' | ')} |`);
console.log(`|---|${TLDS.map(() => '---').join('|')}|`);
for (const r of rows) {
  console.log(`| ${r.name} | ${TLDS.map((t) => sym(r[t])).join(' | ')} |`);
}
