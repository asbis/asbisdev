/**
 * Finn nye, aktuelle oppdrag siden forrige runde.
 *
 * Sveiper Doffin på både CPV-koder og fritekst, fjerner alt som allerede er
 * vurdert (utledet fra mappenavn under oppdrag/ + URL-er i shortlist.md),
 * scorer mot profilen og skriver en datostemplet markdown-rapport.
 *
 * Kjør:
 *   pnpm exec tsx --env-file=.env src/nye.ts
 *   pnpm exec tsx --env-file=.env src/nye.ts --since=2026-04-22 --min-score=12
 *
 * Flagg:
 *   --since=YYYY-MM-DD   kun kunngjøringer publisert etter denne datoen
 *                        (standard: 60 dager tilbake)
 *   --min-score=N        terskel for relevans (standard: 10)
 *   --limit=N            maks antall i rapporten per bolk (standard: 30)
 *   --out=sti            målfil, relativt til repo-rot
 *                        (standard: oppdrag/nye-oppdrag.md)
 */
import { readFile, writeFile } from "node:fs/promises";
import { readdirSync, existsSync } from "node:fs";
import { join, dirname, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";
import { searchDoffin, scoreTender, type ScoreProfile, type Tender } from "./doffin.js";

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const OPPDRAG = join(REPO_ROOT, "oppdrag");
const STATUS_MAPPER = ["aktive", "innsendt", "ikke-aktuelle", "langskudd"];

// --- argumenter ------------------------------------------------------------

function arg(name: string): string | undefined {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit?.slice(name.length + 3);
}

function daysAgo(n: number): string {
  const d = new Date(Date.now() - n * 86_400_000);
  return d.toISOString().slice(0, 10);
}

const SINCE = arg("since") ?? daysAgo(60);
const MIN_SCORE = Number(arg("min-score") ?? 10);
const LIMIT = Number(arg("limit") ?? 30);
const outArg = arg("out") ?? "oppdrag/nye-oppdrag.md";
const OUT = isAbsolute(outArg) ? outArg : join(REPO_ROOT, outArg);

// --- hva er allerede vurdert? ---------------------------------------------

const DOFFIN_ID = /\b(\d{4}-\d{6})\b/g;

async function alreadySeen(): Promise<Set<string>> {
  const seen = new Set<string>();

  for (const status of STATUS_MAPPER) {
    const dir = join(OPPDRAG, status);
    if (!existsSync(dir)) continue;
    for (const folder of readdirSync(dir)) {
      const id = folder.match(/^(\d{4}-\d{6})/)?.[1];
      if (id) seen.add(id);
    }
  }

  // Tidligere rapporter: alt som er listet der er allerede sett på.
  for (const file of ["shortlist.md", "nye-oppdrag.md"]) {
    const path = join(OPPDRAG, file);
    if (!existsSync(path)) continue;
    const text = await readFile(path, "utf-8");
    for (const m of text.matchAll(DOFFIN_ID)) seen.add(m[1]);
  }

  return seen;
}

// --- profil ----------------------------------------------------------------

const profile: ScoreProfile = {
  keywords: [
    "app", "mobil", "mobile", "flutter", "react native", "ios", "android",
    "frontend", "backend", "fullstack", "full-stack",
    "utvikling", "programvare", "digital", "integrasjon", "api",
    "nettside", "webapp", "portal", "plattform", "platform",
    "ai", "llm", "chatbot", "maskinlæring",
    "skreddersydd", "nyutvikling",
  ],
  cpvCodes: ["72200000", "72260000", "72262000", "72212000", "72230000", "72240000"],
  preferredLocations: ["NO043", "NO0A3"],
};

const CPV_SET = [
  "72200000", // programvareutvikling og rådgivning
  "72260000", // tjenester i tilknytning til programvare
  "72262000", // programvareutvikling
  "72212000", // applikasjonsprogramvare
  "72230000", // utvikling av kundetilpasset programvare
  "48000000", // programvarepakker
];

const QUERIES = [
  "app utvikling", "mobilapp", "nettside", "webportal", "digital løsning",
  "skreddersydd", "chatbot", "AI løsning", "booking", "selvbetjening",
  "innbyggerportal", "fagsystem", "kartløsning",
];

// Rammeavtaler og DPS er egen bolk — ikke søppel, men annen salgsprosess.
const RAMME = /\b(rammeavtale|dynamisk innkj(ø|o)psordning|dps|parallelle rammeavtaler)\b/i;
// Feil bransje eller feil stack.
const AVVIS = /\b(renhold|transport|entrepren(ø|o)r|anleggs|catering|m(ø|o)bler|kj(ø|o)ret(ø|o)y|vikartjenest|bemanning|sap|dynamics 365|servicenow|lisens(er|kj(ø|o)p))\b/i;

// --- sveip -----------------------------------------------------------------

const pool = new Map<string, Tender>();

async function sweep(label: string, run: (page: number) => Promise<{ hits: Tender[] }>) {
  let added = 0;
  for (let page = 1; page <= 3; page++) {
    const res = await run(page);
    for (const t of res.hits) {
      if (!pool.has(t.id)) added++;
      pool.set(t.id, t);
    }
    if (res.hits.length < 100) break;
  }
  console.error(`${label} → +${added} nye i poolen (pool: ${pool.size})`);
}

for (const cpv of CPV_SET) {
  await sweep(`cpv ${cpv}`, (page) =>
    searchDoffin({
      cpvCode: [cpv],
      status: ["ACTIVE"],
      type: ["COMPETITION"],
      issueDateFrom: SINCE,
      numHitsPerPage: 100,
      page,
      sortBy: "PUBLICATION_DATE_DESC",
    }),
  );
}

for (const q of QUERIES) {
  await sweep(`"${q}"`, (page) =>
    searchDoffin({
      searchString: q,
      status: ["ACTIVE"],
      type: ["COMPETITION"],
      issueDateFrom: SINCE,
      numHitsPerPage: 100,
      page,
      sortBy: "PUBLICATION_DATE_DESC",
    }),
  );
}

// --- filtrering ------------------------------------------------------------

const seen = await alreadySeen();
console.error(`\nAllerede vurdert: ${seen.size} kunngjøringer`);

type Scored = Tender & { score: number };

const fresh: Scored[] = [...pool.values()]
  .filter((t) => !seen.has(t.id))
  .filter((t) => (t.publicationDate ?? t.issueDate ?? "").slice(0, 10) >= SINCE)
  .map((t) => ({ ...t, score: scoreTender(t, profile) }))
  .filter((t) => t.score >= MIN_SCORE)
  .filter((t) => !AVVIS.test(`${t.heading} ${t.description ?? ""}`))
  .sort((a, b) => b.score - a.score);

const isSolo = (t: Scored) => {
  const amount = t.estimatedValue?.amount ?? 0;
  const rammeavtale = RAMME.test(`${t.heading} ${t.description ?? ""}`);
  return !rammeavtale && (amount === 0 || amount < 15_000_000);
};

const solo = fresh.filter(isSolo);
const rammer = fresh.filter((t) => !isSolo(t));

// --- rapport ---------------------------------------------------------------

function rogaland(t: Tender): boolean {
  return t.locationId.some((l) => l.startsWith("NO043") || l.startsWith("NO0A3"));
}

function row(t: Scored): string {
  const buyer = t.buyer[0]?.name ?? "?";
  const val = t.estimatedValue?.amount
    ? `${(t.estimatedValue.amount / 1_000_000).toFixed(1)}M`
    : "—";
  const pub = (t.publicationDate ?? t.issueDate ?? "").slice(0, 10) || "?";
  const flag = rogaland(t) ? " ★" : "";
  const heading = t.heading.replace(/\|/g, "/");
  return `| ${t.score}${flag} | ${pub} | ${heading} | ${buyer} | ${val} | ${t.url} |`;
}

const HEADER = "| Score | Publisert | Oppdrag | Kunde | Verdi | URL |\n|---|---|---|---|---|---|";

function section(title: string, items: Scored[], note: string): string {
  if (items.length === 0) return `## ${title}\n\nIngenting nytt i denne bolken.\n`;
  return [
    `## ${title}`,
    "",
    note,
    "",
    HEADER,
    ...items.slice(0, LIMIT).map(row),
    "",
  ].join("\n");
}

const today = new Date().toISOString().slice(0, 10);
const report = [
  `# Nye oppdrag — sveip ${today}`,
  "",
  `Kilde: \`apps/doffin-mcp/src/nye.ts\` mot \`api.doffin.no/public/v2/search\`.`,
  `Publisert etter ${SINCE}, status ACTIVE, score ≥ ${MIN_SCORE}.`,
  `Pool: ${pool.size} kunngjøringer · ${seen.size} allerede vurdert · ${fresh.length} nye og relevante.`,
  `★ = Rogaland (NO043 / NO0A3).`,
  "",
  section(
    "Solo-leveranser",
    solo,
    "Avgrensede leveranser under 15M som én utvikler kan ta alene. Start her.",
  ),
  section(
    "Rammeavtaler og DPS",
    rammer,
    "Kvalifisering framfor tilbud. Lengre løp, men gir løpende tilgang på minikonkurranser.",
  ),
  "## Neste steg",
  "",
  "1. Trekk full detalj for de mest aktuelle med `src/details.ts` (frist + kvalifikasjonskrav).",
  "2. Legg mappe under `oppdrag/aktive/<id>-<slug>/` med `tender.md`.",
  "3. Draft tilbud fra `oppdrag/_maler/konsulent-tilbud.md`.",
  "",
  "Alt som står i denne rapporten regnes som vurdert og dukker ikke opp i neste sveip.",
  "",
].join("\n");

await writeFile(OUT, report);

console.log(`\n${fresh.length} nye og relevante (${solo.length} solo, ${rammer.length} ramme/DPS)\n`);
for (const t of solo.slice(0, LIMIT)) {
  console.log(`[${t.score}${rogaland(t) ? "★" : " "}] ${t.heading}`);
  console.log(`     ${t.buyer[0]?.name ?? "?"} · ${(t.publicationDate ?? "").slice(0, 10)}`);
  console.log(`     ${t.url}\n`);
}
console.log(`Rapport skrevet: ${OUT}`);
