---
title: Til-innsending — autogenererte filer
tender: 2026-105336
---

# Autogenererte tilbudsfiler

Alle filer i denne mappen er **autogenerert fra scripts** basert på markdown-kilder i `../../vart-utkast/` og kundens maler i `../../fra-kunden/`. Ikke rediger filene her direkte — endringer overskrives ved neste regenerering.

For å oppdatere innhold, rediger markdown-kilden eller script-parametere og kjør regenerering (se nederst).

---

## Filoversikt

### Kundens maler, utfylt (lastes opp i KGV)

| Fil | Kilde | Script |
|---|---|---|
| `1.1 Tilbudsbrev Asbjørn Rørvik.docx` | Kundens `Vedlegg 3 Mal for tilbudsbrev.docx` | `fill-tilbudsbrev.py` |
| `02 DEL 2 SSA-T Bilag 2 — Leverandørens løsningsspesifikasjon (utfylt).docx` | Kundens `Bilag 2` docx + krav-besvarelser i scriptet | `fill-bilag2.py` |
| `03 Del 2 SSA-T Bilag 3 til 10 (utfylt).docx` | Kundens `Bilag 3–10` docx | `fill-bilag4.py` |
| `03.2 DEL 2 SSA-T PRISSKJEMA Vedlegg 1 til bilag 7 (utfylt).xlsx` | Kundens `Prisskjema` xlsx | `fill-bilag7.py` |

### Våre vedlegg (PDF generert fra `/oppdrag`-nettsiden)

| Fil | Markdown-kilde | Script |
|---|---|---|
| `00 Tilbudsbrev.pdf` | `../../vart-utkast/tilbudsbrev.md` | `export-bilag.mjs` |
| `02 Bilag 2 — Løsningsspesifikasjon.pdf` | `../../vart-utkast/bilag-2-loesningsspec.md` | `export-bilag.mjs` |
| `04 Bilag 4 — Prosjektplan.pdf` | `../../vart-utkast/bilag-4-prosjektplan.md` | `export-bilag.mjs` |
| `10 Bilag 10 — Tredjepartslisenser.pdf` | `../../vart-utkast/bilag-10-tredjepartsleveranser.md` | `export-bilag.mjs` |
| `1.10 Bilag 10 Asbjørn Rørvik.pdf` | Samme som over, med KGV-ønsket filnavn | kopi |
| `CV og referanser.pdf` | `../../vart-utkast/teknisk-faglig-cv-referanser.md` | `export-bilag.mjs` |
| `Egenerklæring — finansiell kapasitet.pdf` | `../../vart-utkast/egenerklaering-finansiell-kapasitet.md` | `export-bilag.mjs` |
| `Kapasitet og bemanning.pdf` | `../../vart-utkast/kapasitet-bemanning.md` | `export-bilag.mjs` |

### Sladdet versjon (1.12 Sladd)

| Fil | Beskrivelse | Script |
|---|---|---|
| `1.12 Sladd — Begrunnelse.docx` | Forklarer hva som er sladdet og hvorfor | `fill-sladd.py` |
| `Sladd-GUL — Prisskjema.xlsx` | Gul celle-bakgrunn, innhold beholdt (redigerbar) | `fill-sladd.py` |
| `Sladd-SVART — Prisskjema.xlsx` | Svart celle-bakgrunn, innhold erstattet med ████ | `fill-sladd.py` |

---

## Hvordan regenerere

Alle scripts ligger i `/Users/asbis/code/asbisdev/apps/web/scripts/`. Python-venv må eksistere på `/tmp/docxvenv/` (kjør `python3 -m venv /tmp/docxvenv && /tmp/docxvenv/bin/pip install python-docx openpyxl` hvis ikke).

For PDF-eksport må dev-serveren kjøre på `http://localhost:3001` (`pnpm dev` i `apps/web/`).

### Kjør alt på én gang

```bash
cd /Users/asbis/code/asbisdev/apps/web
/tmp/docxvenv/bin/python3 scripts/fill-tilbudsbrev.py
/tmp/docxvenv/bin/python3 scripts/fill-bilag2.py
/tmp/docxvenv/bin/python3 scripts/fill-bilag4.py
/tmp/docxvenv/bin/python3 scripts/fill-bilag7.py
/tmp/docxvenv/bin/python3 scripts/fill-sladd.py
pnpm exec tsx scripts/copy-oppdrag.ts
node scripts/export-bilag.mjs
```

### Kjør enkelt script

Hvis du bare har endret én markdown eller ett script:

```bash
# Endret besvarelse i fill-bilag2.py → regenerer Word + PDF
/tmp/docxvenv/bin/python3 scripts/fill-bilag2.py
pnpm exec tsx scripts/copy-oppdrag.ts
node scripts/export-bilag.mjs

# Endret pris i fill-bilag7.py → regenerer Excel + sladdet versjon
/tmp/docxvenv/bin/python3 scripts/fill-bilag7.py
/tmp/docxvenv/bin/python3 scripts/fill-sladd.py

# Endret markdown (tilbudsbrev.md, bilag-2-loesningsspec.md, osv.) → regenerer PDF
pnpm exec tsx scripts/copy-oppdrag.ts
node scripts/export-bilag.mjs
```

---

## Opplastingsrekkefølge i KGV

Se `../../README.md` (over) for full sjekkliste. Kort versjon:

1. **Kvalifisering** → firmaattest (Brønnøysund), skatteattest + egenerklæring, CV, kapasitet-bemanning
2. **Tildelingskriterier** → prisskjema (xlsx), Bilag 2 (docx), Bilag 4 (pdf) + evt. Bilag 3-10 (docx)
3. **Oppsummering og signering** → tilbudsbrev (docx), Bilag 10 (pdf), sladdet versjon (begrunnelse + gul + svart)
4. Signer med BankID
