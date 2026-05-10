import { chromium, devices } from "playwright-core";
const iphone = devices["iPhone 14 Pro"];
const browser = await chromium.launchPersistentContext("/tmp/debug-prof", {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ...iphone,
  headless: true,
});
const page = await browser.newPage();
page.on("console", m => console.log("CONSOLE:", m.type(), m.text().slice(0, 200)));
page.on("pageerror", e => console.log("PAGEERROR:", e.message.slice(0, 300)));
page.on("response", r => { if (r.status() >= 400) console.log("HTTP", r.status(), r.url()); });
await page.goto("http://localhost:3000/antidoping-proto/index.html", { waitUntil: "networkidle" });
await page.waitForTimeout(5000);
const txt = await page.evaluate(() => document.body.innerText.slice(0, 500));
const html = await page.evaluate(() => document.body.innerHTML.slice(0, 500));
console.log("INNERTEXT:", JSON.stringify(txt));
console.log("INNERHTML:", JSON.stringify(html));
await browser.close();
