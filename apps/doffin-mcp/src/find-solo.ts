import { searchDoffin, type Tender } from "./doffin.js";

const QUERIES = [
  "app utvikling",
  "mobilapp",
  "nettside",
  "webportal",
  "selvhjelp",
  "HMS app",
  "digital løsning",
  "skreddersydd",
  "chatbot",
  "AI løsning",
  "betalingsløsning",
  "booking",
  "rapportering",
  "portal kommune",
];

const seen = new Map<string, Tender>();

for (const q of QUERIES) {
  try {
    const res = await searchDoffin({
      searchString: q,
      status: ["ACTIVE"],
      type: ["COMPETITION"],
      numHitsPerPage: 50,
      page: 1,
      sortBy: "PUBLICATION_DATE_DESC",
    });
    for (const t of res.hits) {
      if (!seen.has(t.id)) seen.set(t.id, t);
    }
    console.error(`"${q}" → ${res.hits.length} hits`);
  } catch (e) {
    console.error(`"${q}" failed: ${(e as Error).message}`);
  }
}

// Filter: small budgets (< 10M) or missing value, and skip the IDs already on shortlist
const SKIP = new Set([
  "2026-107028", "2026-105336", "2026-105919", // already active
  "2025-103853", "2026-106729", "2025-112709", "2025-111353",
  "2024-112234", "2025-112444", "2025-112445", "2024-105583",
  "2026-106738", "2026-105950", "2026-105710", "2026-106061",
  "2025-109967", "2025-109968", "2025-109969", "2025-109970",
  "2025-109972", "2025-109973", "2025-109974", "2025-109976",
  "2026-106861", "2026-106589", "2026-106213", "2026-106442",
  "2026-105680", "2026-107037", "2026-107036", "2026-105435",
]);

const KEYWORDS_POS = /\b(app|mobil|nettside|webapp|portal|skreddersydd|nyutvikling|utvikle|frontend|backend|fullstack|løsning|system|digital)\b/i;
const KEYWORDS_NEG = /\b(rammeavtale|dynamisk innkjøpsordning|konsulentbistand|rådgiv|renhold|transport|bygg|entreprenør|anleggs|catering|møbler|kjøretøy)\b/i;

const filtered = [...seen.values()]
  .filter((t) => !SKIP.has(t.id))
  .filter((t) => {
    const text = `${t.heading} ${t.description ?? ""}`;
    const amount = t.estimatedValue?.amount ?? 0;
    const small = amount === 0 || amount < 15_000_000;
    return small && KEYWORDS_POS.test(text) && !KEYWORDS_NEG.test(text);
  })
  .sort((a, b) => (b.publicationDate ?? "").localeCompare(a.publicationDate ?? ""));

console.log(`\nPool: ${seen.size} unique, Filtered (solo-sized): ${filtered.length}\n`);

for (const t of filtered.slice(0, 50)) {
  const buyer = t.buyer[0]?.name ?? "?";
  const loc = t.locationId.join(",") || "?";
  const val = t.estimatedValue?.amount
    ? ` · ${(t.estimatedValue.amount / 1_000_000).toFixed(1)}M`
    : "";
  console.log(`- [${t.publicationDate?.slice(0, 10) ?? "?"}] ${t.heading}`);
  console.log(`  ${buyer} · ${loc}${val}`);
  const desc = (t.description ?? "").replace(/\s+/g, " ").slice(0, 200);
  if (desc) console.log(`  ${desc}`);
  console.log(`  ${t.url}\n`);
}
