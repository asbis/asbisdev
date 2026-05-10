import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://localhost:3001/oppdrag/2026-107028-antidoping-app";
const OUT = process.argv[2] ||
  "/Users/asbis/code/asbisdev/oppdrag/aktive/2026-107028-antidoping-app/til-innsending/autogenerert";

mkdirSync(OUT, { recursive: true });

const DOCS = [
  { slug: "vart-utkast/tilbudsbrev", out: "00 Tilbudsbrev.pdf" },
  { slug: "vart-utkast/BILAG-2-SAMLET", out: "02 Bilag 2 — Konsulentens spesifikasjon.pdf" },
  { slug: "vart-utkast/bilag2-1-app-losning", out: "02.1 Bilag 2 — App-løsning.pdf" },
  { slug: "vart-utkast/bilag2-2-nokkelressurser", out: "02.2 Bilag 2 — Nøkkelressurser.pdf" },
  { slug: "vart-utkast/bilag2-3-oppdragsforstaelse", out: "02.3 Bilag 2 — Oppdragsforståelse.pdf" },
  { slug: "vart-utkast/bilag2-4-service-support", out: "02.4 Bilag 2 — Service og support.pdf" },
  { slug: "vart-utkast/cv-asbjorn", out: "CV — Asbjørn Rørvik.pdf" },
  { slug: "vart-utkast/ks-infosikkerhet", out: "KS- og informasjonssikkerhetssystem.pdf" },
  { slug: "vart-utkast/egenerklaering-finansiell-kapasitet", out: "Egenerklæring — Finansiell kapasitet.pdf" },
];

const browser = await chromium.launchPersistentContext("/tmp/pdf-chrome-profile", {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--disable-gpu"],
});

for (const doc of DOCS) {
  const page = await browser.newPage();
  const url = `${BASE}?doc=${encodeURIComponent(doc.slug)}`;
  try {
    await page.goto(url, { waitUntil: "networkidle" });
    await page.emulateMedia({ media: "print" });
    const out = join(OUT, doc.out);
    await page.pdf({
      path: out,
      format: "A4",
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    });
    console.log("✓ " + doc.out);
  } catch (err) {
    console.warn(`⚠ ${doc.out} feilet: ${err.message}`);
  }
  await page.close();
}

await browser.close();
console.log(`\nFerdig. PDF-er skrevet til ${OUT}`);
