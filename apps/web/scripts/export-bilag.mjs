import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://localhost:3001/oppdrag/2026-105336-rusinfo-selvhjelpsapp";
const OUT = process.argv[2] || "/Users/asbis/code/asbisdev/oppdrag/aktive/2026-105336-rusinfo-selvhjelpsapp/til-innsending/autogenerert";

mkdirSync(OUT, { recursive: true });

// slug → ferdig PDF-filnavn
const DOCS = [
  { slug: "vart-utkast/tilbudsbrev", out: "00 Tilbudsbrev.pdf" },
  { slug: "vart-utkast/tilbudsbrev-v2-malbasert", out: "1.1 Tilbudsbrev (v2 — malbasert).pdf" },
  { slug: "vart-utkast/bilag-2-loesningsspec", out: "02 Bilag 2 — Løsningsspesifikasjon.pdf" },
  { slug: "vart-utkast/bilag-2-vedlegg-a-sikkerhet-og-ros", out: "02 Bilag 2 Vedlegg A — Sikkerhet og ROS.pdf" },
  { slug: "vart-utkast/bilag-4-prosjektplan", out: "04 Bilag 4 — Prosjektplan.pdf" },
  { slug: "vart-utkast/bilag-10-tredjepartsleveranser", out: "10 Bilag 10 — Tredjepartslisenser.pdf" },
  { slug: "vart-utkast/teknisk-faglig-cv-referanser", out: "CV og referanser.pdf" },
  { slug: "vart-utkast/egenerklaering-finansiell-kapasitet", out: "Egenerklæring — finansiell kapasitet.pdf" },
  { slug: "vart-utkast/kapasitet-bemanning", out: "Kapasitet og bemanning.pdf" },
];

const browser = await chromium.launchPersistentContext("/tmp/pdf-chrome-profile", {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--disable-gpu"],
});

for (const doc of DOCS) {
  const page = await browser.newPage();
  const url = `${BASE}?doc=${encodeURIComponent(doc.slug)}`;
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
  await page.close();
  console.log("✓ " + doc.out);
}

await browser.close();
console.log(`\nFerdig. ${DOCS.length} PDF-er skrevet til ${OUT}`);
