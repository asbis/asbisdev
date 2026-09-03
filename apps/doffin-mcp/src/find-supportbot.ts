/**
 * Find tenders about customer-support bots / AI chat / service desk automation.
 * Covers both live competitions and closed ones (to see who has bought what before).
 *
 * Run:  pnpm exec tsx --env-file=.env src/find-supportbot.ts
 *       pnpm exec tsx --env-file=.env src/find-supportbot.ts --active
 */
import { searchDoffin, type Tender } from "./doffin.js";

const QUERIES = [
  "chatbot",
  "chatbot kundeservice",
  "kundeservice",
  "kundesenter",
  "kundedialog",
  "brukerstøtte",
  "servicedesk",
  "helpdesk",
  "henvendelser innbyggere",
  "svartjeneste",
  "virtuell assistent",
  "digital assistent",
  "samtalerobot",
  "KI kundeservice",
  "kunstig intelligens kundeservice",
  "AI agent",
  "språkmodell",
  "automatisering henvendelser",
  "saksbehandling automatisering",
  "kontaktsenter",
];

const ACTIVE_ONLY = process.argv.includes("--active");
const STATUSES = ACTIVE_ONLY
  ? ["ACTIVE"]
  : ["ACTIVE", "EXPIRED", "AWARDED", "CANCELLED"];

const seen = new Map<string, Tender>();

for (const q of QUERIES) {
  for (let page = 1; page <= 3; page++) {
    try {
      const res = await searchDoffin({
        searchString: q,
        status: STATUSES,
        numHitsPerPage: 50,
        page,
        sortBy: "PUBLICATION_DATE_DESC",
      });
      for (const t of res.hits) if (!seen.has(t.id)) seen.set(t.id, t);
      if (page === 1) console.error(`"${q}" → ${res.total} total`);
      if (res.hits.length < 50) break;
    } catch (e) {
      console.error(`"${q}" p${page} failed: ${(e as Error).message}`);
      break;
    }
  }
}

// A hit must actually be about a bot/AI-assisted support channel, not just any
// system that happens to mention "kunde". Require one bot-signal AND one
// support-context signal, or an unambiguous single term.
const STRONG = /\b(chatbot|chat-bot|samtalerobot|virtuell assistent|digital assistent|voicebot|talebot|conversational)\b/i;
const BOT = /\b(chatbot|bot|kunstig intelligens|\bKI\b|\bAI\b|maskinlæring|språkmodell|LLM|automatis\w*|selvbetjening|virtuell|assistent)\b/i;
const SUPPORT = /\b(kundeservice|kundesenter|kundedialog|kontaktsenter|brukerstøtte|servicedesk|service desk|helpdesk|henvendelser|svartjeneste|innbyggerdialog|veiledning|support)\b/i;
const NOISE = /\b(renhold|transport|bygg|entreprenør|anleggs|catering|møbler|kjøretøy|vikartjenester|kantine|vakthold)\b/i;

const hits = [...seen.values()]
  .map((t) => {
    const text = `${t.heading} ${t.description ?? ""}`;
    let score = 0;
    if (STRONG.test(text)) score += 6;
    if (BOT.test(text)) score += 2;
    if (SUPPORT.test(text)) score += 2;
    if (STRONG.test(t.heading)) score += 4;
    if (SUPPORT.test(t.heading)) score += 2;
    return { t, score, text };
  })
  .filter(({ t, score, text }) => {
    if (NOISE.test(t.heading)) return false;
    return score >= 6 || (STRONG.test(text) && SUPPORT.test(text));
  })
  .sort((a, b) =>
    b.score - a.score ||
    (b.t.publicationDate ?? "").localeCompare(a.t.publicationDate ?? ""),
  );

const live = hits.filter(({ t }) => t.status === "ACTIVE");
console.log(
  `\nPool: ${seen.size} unike · Relevante: ${hits.length} (${live.length} aktive)\n`,
);

for (const { t, score } of hits.slice(0, 60)) {
  const buyer = t.buyer[0]?.name ?? "?";
  const val = t.estimatedValue?.amount
    ? ` · ${(t.estimatedValue.amount / 1_000_000).toFixed(1)}M`
    : "";
  console.log(
    `[${score}] ${t.status ?? "?"} · ${t.publicationDate?.slice(0, 10) ?? "?"} — ${t.heading}`,
  );
  console.log(`  ${buyer} · ${t.locationId.join(",") || "?"}${val}`);
  const desc = (t.description ?? "").replace(/\s+/g, " ").slice(0, 220);
  if (desc) console.log(`  ${desc}`);
  console.log(`  ${t.url}\n`);
}
