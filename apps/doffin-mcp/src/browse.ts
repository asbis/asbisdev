import { searchDoffin, scoreTender, type ScoreProfile, type Tender } from "./doffin.js";

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

const all = new Map<string, Tender>();

for (const cpv of CPV_SET) {
  for (let page = 1; page <= 3; page++) {
    const res = await searchDoffin({
      cpvCode: [cpv],
      status: ["ACTIVE"],
      type: ["COMPETITION"],
      numHitsPerPage: 100,
      page,
      sortBy: "PUBLICATION_DATE_DESC",
    });
    for (const t of res.hits) all.set(t.id, t);
    if (res.hits.length < 100) break;
  }
}

const scored = [...all.values()]
  .map((t) => ({ ...t, score: scoreTender(t, profile) }))
  .filter((t) => t.score >= 10)
  .sort((a, b) => b.score - a.score);

console.log(`Pool: ${all.size} unique active tenders · Relevant (score≥10): ${scored.length}\n`);

for (const t of scored.slice(0, 40)) {
  const buyer = t.buyer[0]?.name ?? "?";
  const loc = t.locationId.join(",") || "?";
  const rogaland = t.locationId.some((l) => l.startsWith("NO043") || l.startsWith("NO0A3"));
  const val = t.estimatedValue?.amount
    ? ` · ${(t.estimatedValue.amount / 1_000_000).toFixed(1)}M ${t.estimatedValue.currencyCode ?? ""}`
    : "";
  console.log(`[${t.score}${rogaland ? "★" : " "}] ${t.heading}`);
  console.log(`     ${buyer} · ${loc}${val}`);
  const desc = (t.description ?? "").replace(/\s+/g, " ").slice(0, 180);
  if (desc) console.log(`     ${desc}…`);
  console.log(`     ${t.url}\n`);
}
