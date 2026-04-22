import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const KEY = process.env.DOFFIN_API_KEY!;
const BASE = process.env.DOFFIN_API_BASE ?? "https://api.doffin.no/public";
const REPO_ROOT = "/Users/asbis/code/asbisdev";

const TARGETS = [
  { id: "2026-107028", slug: "antidoping-app" },
  { id: "2026-105919", slug: "trondheim-mikromobilitet" },
  { id: "2026-105336", slug: "rusinfo-selvhjelpsapp" },
];

async function fetchXml(id: string): Promise<string> {
  const res = await fetch(`${BASE}/v2/download/${id}`, {
    headers: { "Ocp-Apim-Subscription-Key": KEY, Accept: "application/xml" },
  });
  if (!res.ok) throw new Error(`${id}: ${res.status} ${await res.text()}`);
  return res.text();
}

function all(xml: string, tag: string): string[] {
  const re = new RegExp(
    `<(?:\\w+:)?${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:\\w+:)?${tag}>`,
    "g",
  );
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml))) out.push(m[1].trim());
  return out;
}

function first(xml: string, tag: string): string {
  return all(xml, tag)[0] ?? "";
}

function decode(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .trim();
}

function extractWithin(xml: string, wrapperTag: string, innerTag: string): string {
  const wrapperMatch = new RegExp(
    `<(?:\\w+:)?${wrapperTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/(?:\\w+:)?${wrapperTag}>`,
  ).exec(xml);
  if (!wrapperMatch) return "";
  return first(wrapperMatch[1], innerTag);
}

function summarize(id: string, xml: string): string {
  const heading = decode(extractWithin(xml, "ProcurementProject", "Name"));
  const description = decode(
    extractWithin(xml, "ProcurementProject", "Description"),
  );

  // Buyer: first PartyName/Name inside ContractingParty
  const buyer = decode(extractWithin(xml, "ContractingParty", "Name"));

  // Deadline
  const deadlineDate = first(xml, "EndDate");
  const deadlineTime = first(xml, "EndTime");
  const deadline = deadlineDate
    ? `${deadlineDate}${deadlineTime ? " " + deadlineTime : ""}`
    : "?";

  // Estimated value
  const valueMatch = /<(?:\w+:)?EstimatedOverallContractAmount[^>]*currencyID="([^"]+)"[^>]*>([\d.]+)/.exec(
    xml,
  );
  const value = valueMatch ? `${valueMatch[2]} ${valueMatch[1]}` : "?";

  // Contact
  const contactEmail = first(xml, "ElectronicMail");
  const contactName = first(xml, "ContactName") || decode(first(xml, "Name"));

  // CPV codes
  const cpvCodes = [...new Set(all(xml, "ItemClassificationCode").map(decode))];

  // Document references
  const docRefs = all(xml, "DocumentHostingURI").map(decode);

  return `# ${heading || id}

- **Doffin-ID:** ${id}
- **Oppdragsgiver:** ${buyer || "?"}
- **Frist:** ${deadline}
- **Estimert verdi:** ${value}
- **CPV:** ${cpvCodes.join(", ") || "?"}
- **Kontakt:** ${contactEmail || "?"}
- **Lenke:** https://www.doffin.no/notices/${id}
- **Dokumenter:** ${docRefs.length ? docRefs.join("\n  ") : "(se Doffin-siden)"}

## Beskrivelse

${description || "(ingen prosjektbeskrivelse i UBL-en — sjekk vedlegg)"}
`;
}

for (const t of TARGETS) {
  console.log(`Henter ${t.id} (${t.slug})…`);
  const xml = await fetchXml(t.id);
  const dir = join(REPO_ROOT, "oppdrag/aktive", `${t.id}-${t.slug}`);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "tender.xml"), xml);
  await writeFile(join(dir, "tender.md"), summarize(t.id, xml));
  console.log(`  → ${dir}/tender.md (${xml.length} bytes XML)`);
}
