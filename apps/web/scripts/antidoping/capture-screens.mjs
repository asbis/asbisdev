import { chromium, devices } from "playwright-core";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const BASE = "http://localhost:3000/antidoping-proto/index.html";
const OUT = "/Users/asbis/code/asbisdev/oppdrag/aktive/2026-107028-antidoping-app/vart-utkast/skjermbilder";
mkdirSync(OUT, { recursive: true });

const SHOTS = [
  { name: "01-home.png", action: async (p) => { await p.waitForTimeout(800); } },
  { name: "02-sok-legemiddel.png", action: async (p) => {
      // Trykk "Legemiddelsøk" eller liknende på Home
      await p.getByText(/Legemiddel/i).first().click({ trial: false }).catch(() => {});
      await p.waitForTimeout(500);
    }
  },
  { name: "03-sok-dopingliste.png", action: async (p) => {
      // Bytt til dopingliste-tab
      await p.getByText(/Dopinglista|Dopingliste/i).first().click().catch(() => {});
      await p.waitForTimeout(500);
    }
  },
  { name: "04-risiko.png", action: async (p) => {
      // Tilbake til Home, så Kosttilskudd-risiko
      await p.locator("text=/Hjem|Home/i").first().click().catch(() => {});
      await p.waitForTimeout(400);
      await p.getByText(/Kosttilskudd|Risiko/i).first().click().catch(() => {});
      await p.waitForTimeout(600);
    }
  },
  { name: "05-astma.png", action: async (p) => {
      await p.locator("text=/Hjem|Home/i").first().click().catch(() => {});
      await p.waitForTimeout(400);
      await p.getByText(/Astma/i).first().click().catch(() => {});
      await p.waitForTimeout(500);
    }
  },
];

const iphone = devices["iPhone 14 Pro"];
const browser = await chromium.launchPersistentContext("/tmp/screen-capture-profile", {
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ...iphone,
  headless: true,
  deviceScaleFactor: 2,
});

const page = await browser.newPage();
// Sett localStorage før app booter slik at vi hopper rett til Home
await page.addInitScript(() => {
  try {
    localStorage.setItem("adno:onboarding-done", JSON.stringify(true));
    localStorage.setItem("adno:profile", JSON.stringify({ role: "athlete" }));
  } catch {}
});
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForFunction(() => document.body.innerText.length > 50, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(3500);

for (const shot of SHOTS) {
  try {
    await shot.action(page);
  } catch (e) {
    console.log(`⚠ ${shot.name}: action failed (${e.message.slice(0, 60)})`);
  }
  const out = join(OUT, shot.name);
  await page.screenshot({ path: out, fullPage: false });
  console.log(`✓ ${shot.name}`);
}

await browser.close();
console.log(`\nFerdig. Skjermbilder lagret i ${OUT}`);
