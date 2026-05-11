---
title: Til-innsending — autogenererte filer (Antidoping-app)
tender: 2026-107028
---

# Autogenererte tilbudsfiler

Alle filer her er **autogenerert fra scripts** i `apps/web/scripts/antidoping/`
basert på markdown-kilder i `../../vart-utkast/` og kundens maler i `../../files/`.

**Ikke rediger filene her direkte** — endringer overskrives ved neste regenerering.

## Filoversikt

### Kundens maler, utfylt

| Fil | Kilde | Script |
|---|---|---|
| `Vedlegg 1 — Tilbudsskjema (utfylt).docx` | `files/1.1 Vedlegg 1 - Tilbudsskjema.docx` | `fill-vedlegg1-tilbudsskjema.py` |
| `Vedlegg 2 — Forpliktelseserklæring (UU).docx` | `files/1.2 Vedlegg 2 - Forpliktelseserklæring.docx` | `fill-vedlegg2-forpliktelse.py` |
| `Vedlegg 3 — Avvik og forbehold (utfylt).docx` | `files/1.3 Vedlegg 3 - Avvik og forbehold.docx` | `fill-vedlegg3-avvik.py` |
| `Vedlegg 4 — Gjennomføringsevne (utfylt).docx` | `files/1.4 Vedlegg 4 - Leverandørens gjennomføringsevne.docx` | `fill-vedlegg4-gjennomforing.py` |
| `Vedlegg 5 — Referansebeskrivelser (utfylt).docx` | `files/1.5 Vedlegg 5 - Referansebeskrivelser.docx` | `fill-vedlegg5-referanser.py` |
| `SSA-O Bilag (utfylt).docx` | `files/2.1 SSA-O Bilag.docx` | `fill-ssa-o-bilag.py` |

### Egne PDF-vedlegg (Markdown → PDF via Next-side)

| Fil | Markdown-kilde | Script |
|---|---|---|
| `00 Tilbudsbrev.pdf` | `vart-utkast/tilbudsbrev.md` | `export-bilag.mjs` |
| `02 Bilag 2 — Konsulentens spesifikasjon.pdf` | `vart-utkast/BILAG-2-SAMLET.md` | `export-bilag.mjs` |
| `CV — Asbjørn Rørvik.pdf` | `vart-utkast/cv-asbjorn.md` | `export-bilag.mjs` |
| `KS- og informasjonssikkerhetssystem.pdf` | `vart-utkast/ks-infosikkerhet.md` | `export-bilag.mjs` |

## Regenerering

Forutsetter Python-venv på `/tmp/docxvenv/` (gjenskap: `python3 -m venv /tmp/docxvenv && /tmp/docxvenv/bin/python3 -m pip install python-docx openpyxl`).

For PDF-eksport: `pnpm dev` i `apps/web/` (port 3001).

```bash
cd /Users/asbis/code/asbisdev/apps/web
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-vedlegg1-tilbudsskjema.py
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-vedlegg2-forpliktelse.py
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-vedlegg3-avvik.py
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-vedlegg4-gjennomforing.py
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-vedlegg5-referanser.py
/tmp/docxvenv/bin/python3 scripts/antidoping/fill-ssa-o-bilag.py
pnpm exec tsx scripts/antidoping/copy-oppdrag.ts
node scripts/antidoping/export-bilag.mjs
```
