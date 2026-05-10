#!/usr/bin/env node
// Bygger BILAG-2-SAMLET.md ved å konkatenere delfilene 2-1 → 2-4.
// Trigger: kjøres etter endringer i bilag2-*.md.

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "../../../..");
const dir = join(root, "oppdrag/aktive/2026-107028-antidoping-app/vart-utkast");

const stripFrontmatter = (s) => s.replace(/^---\n[\s\S]*?\n---\n+/, "");

const parts = [
  "bilag2-1-app-losning.md",
  "bilag2-2-nokkelressurser.md",
  "bilag2-3-oppdragsforstaelse.md",
  "bilag2-4-service-support.md",
].map((f) => stripFrontmatter(readFileSync(join(dir, f), "utf8")).trim());

const header = `---
title: Bilag 2 — Konsulentens spesifikasjon av oppdraget
tender: Doffin 2026-107028 — Utvikling av antidoping-app
oppdragsgiver: Antidoping Norge (ADNO)
leverandor: Asbjørn Rørvik (ENK), org.nr 820 252 632
dato: 2026-05-11
versjon: 3.0
status: UTKAST — Q&A v2 (24.04.2026) innarbeidet
---

# Bilag 2 — Konsulentens spesifikasjon av oppdraget

**Anskaffelse:** Utvikling av antidoping-app for Antidoping Norge
**Doffin-ID:** 2026-107028
**Tilbudsfrist:** 11. mai 2026 kl. 12:00
**Vedståelsesfrist:** 31.08.2026
**Leverandør:** Asbjørn Rørvik (enkeltpersonforetak), org.nr 820 252 632
**Kontakt:** Asbjørn Rørvik, hei@asbjornrorvik.dev, +47 47 65 86 51
**Nettsted:** asbjornrorvik.dev

---

`;

writeFileSync(join(dir, "BILAG-2-SAMLET.md"), header + parts.join("\n\n---\n\n") + "\n");
console.log("✓ BILAG-2-SAMLET.md regenerert fra delfilene");
