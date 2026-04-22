/**
 * Enrich a tender folder with portal metadata (Mercell/Artifik).
 * Extracts the portal URL from the UBL XML, fetches the public page,
 * and saves the raw HTML for further inspection.
 *
 * Run:  pnpm exec tsx --env-file=.env src/portal.ts <doffin-id>
 *
 * Note: attachments (PDFs/zips) still require a login at Mercell/Artifik.
 * This script only captures what is publicly visible on the portal page.
 */
import { readFile, writeFile } from "node:fs/promises";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const REPO_ROOT = "/Users/asbis/code/asbisdev";
const AKTIVE = join(REPO_ROOT, "oppdrag/aktive");

function extractPortalUrl(xml: string): string | null {
  const match = xml.match(
    /https?:\/\/(?:permalink\.mercell\.com|app\.artifik\.no)[^\s<"']+/,
  );
  return match?.[0] ?? null;
}

async function enrich(folder: string) {
  const xmlPath = join(AKTIVE, folder, "tender.xml");
  const xml = await readFile(xmlPath, "utf-8");
  const url = extractPortalUrl(xml);
  if (!url) {
    console.log(`${folder}: no portal URL in UBL`);
    return;
  }
  console.log(`${folder}: fetching ${url}`);
  const res = await fetch(url, { redirect: "follow" });
  const html = await res.text();
  await writeFile(join(AKTIVE, folder, "portal.html"), html);
  console.log(`  saved ${html.length} bytes → portal.html (final: ${res.url})`);
  await writeFile(join(AKTIVE, folder, "portal.url"), res.url + "\n");
}

const target = process.argv[2];
const folders = target
  ? [readdirSync(AKTIVE).find((f) => f.startsWith(target))].filter(Boolean) as string[]
  : readdirSync(AKTIVE).filter((f) => !f.startsWith("_") && !f.startsWith("."));

for (const f of folders) await enrich(f);
