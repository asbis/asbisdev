// Eksporter GeoWeb-tilbudsdokumenter (markdown → HTML → PDF via headless Chrome).
// Kjør: node apps/web/scripts/export-geoweb.mjs
import { chromium } from "playwright-core";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const DIR = "/Users/asbis/code/asbisdev/oppdrag/aktive/2025-103853-mattilsynet-dps-systemutvikling";
const OUT = join(DIR, "til-innsending");
mkdirSync(OUT, { recursive: true });

const DOCS = [
  { src: "vart-utkast/presentasjon.md", out: "Asbjørn Rørvik — Presentasjon av leverandør og ressurs.pdf" },
];

function mdToHtml(md) {
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const inline = (s) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.+?)`/g, "<code>$1</code>");
  const lines = md.split("\n");
  let html = "", inList = false, inTable = false, inPara = false;
  const closeAll = () => {
    if (inList) { html += "</ul>"; inList = false; }
    if (inTable) { html += "</table>"; inTable = false; }
  };
  for (const line of lines) {
    const t = line.trim();
    if (!t) { closeAll(); inPara = false; continue; }
    if (t.startsWith(">")) continue; // interne notater
    if (/^#{1,3} /.test(t)) {
      closeAll();
      inPara = false;
      const lvl = t.match(/^#+/)[0].length;
      html += `<h${lvl}>${inline(t.replace(/^#+ /, ""))}</h${lvl}>`;
    } else if (t.startsWith("|")) {
      const cells = t.slice(1, -1).split("|").map((c) => c.trim());
      if (cells.every((c) => /^[-: ]*$/.test(c))) continue;
      if (!inTable) { closeAll(); html += "<table>"; inTable = true; }
      html += "<tr>" + cells.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
    } else if (/^[-*] /.test(t)) {
      if (!inList) { closeAll(); html += "<ul>"; inList = true; }
      html += `<li>${inline(t.slice(2))}</li>`;
    } else if (inList) {
      html = html.slice(0, -5) + " " + inline(t) + "</li>";
    } else {
      closeAll();
      if (inPara && html.endsWith("</p>")) html = html.slice(0, -4) + " " + inline(t) + "</p>";
      else { html += `<p>${inline(t)}</p>`; inPara = true; }
    }
  }
  closeAll();
  return `<!doctype html><meta charset="utf-8"><style>
    @page { size: A4; margin: 22mm 20mm; }
    body { font: 11pt/1.55 "Helvetica Neue", Arial, sans-serif; color: #16202a; }
    h1 { font-size: 17pt; line-height:1.3; border-bottom: 2px solid #16202a; padding-bottom: 6px; }
    h2 { font-size: 13pt; margin-top: 22px; }
    h3 { font-size: 11.5pt; margin-top: 16px; }
    table { border-collapse: collapse; width: 100%; margin: 10px 0; }
    td { border: 1px solid #b9c2cc; padding: 5px 8px; vertical-align: top; }
    tr:first-child td { font-weight: 600; background: #eef1f4; }
    code { font-family: Menlo, monospace; font-size: 9.5pt; background: #f0f2f4; padding: 0 3px; }
    ul { margin: 6px 0; padding-left: 20px; }
  </style><body>${html}</body>`;
}

const browser = await chromium.launchPersistentContext("/tmp/pdf-chrome-profile-geoweb", {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--disable-gpu"],
});

for (const doc of DOCS) {
  const md = readFileSync(join(DIR, doc.src), "utf8");
  const tmp = join(tmpdir(), doc.out.replace(/[^a-z0-9]+/gi, "-") + ".html");
  writeFileSync(tmp, mdToHtml(md));
  const page = await browser.newPage();
  await page.goto("file://" + tmp, { waitUntil: "networkidle" });
  await page.pdf({ path: join(OUT, doc.out), format: "A4", printBackground: true, preferCSSPageSize: true });
  await page.close();
  console.log("→", doc.out);
}
await browser.close();
