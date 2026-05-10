import { chromium } from 'playwright-core';

const url = process.argv[2];
const out = process.argv[3];
if (!url || !out) { console.error('usage: node pdfgen.mjs <url> <out>'); process.exit(1); }

const browser = await chromium.launchPersistentContext('/tmp/pdf-chrome-profile', {
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
  args: ['--disable-gpu'],
});
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
await page.emulateMedia({ media: 'print' });
await page.pdf({
  path: out,
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
  preferCSSPageSize: true,
});
await browser.close();
console.log('ok ' + out);
