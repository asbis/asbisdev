# Innsendings-sjekkliste — Antidoping-appen (2026-107028)

Frist: **2026-05-11 kl. 12:00** (jf. konkurransegrunnlag pkt. 2.5). Vedståelsesfrist: **31.08.2026**.

Innsending skjer via Mercell. Filnavn-konvensjon følger konkurransegrunnlag pkt. 5.

| # | Filnavn | Status | Kilde | Merknader |
|---|---|---|---|---|
| 1 | `Vedlegg 1 — Tilbudsskjema (utfylt).docx` | ⏳ | Kundens `1.1` + `fill-vedlegg1-tilbudsskjema.py` | Signeres elektronisk i Mercell |
| 2 | ~~Vedlegg 2 — Forpliktelseserklæring~~ | ❌ Utgår | — | Vi tilbyr alene; UU-revisjon er ekstern tjeneste, ikke underleverandør |
| 3 | `Vedlegg 3 — Avvik og forbehold (utfylt).docx` | ⏳ | Kundens `1.3` + `fill-vedlegg3-avvik.py` | Planlagt: ingen avvik |
| 4 | `Vedlegg 4 — Gjennomføringsevne (utfylt).docx` | ⏳ | Kundens `1.4` + `fill-vedlegg4-gjennomforing.py` | Markdown-kilde: `vart-utkast/vedlegg-4-gjennomforing.md` |
| 5 | `Vedlegg 5 — Referansebeskrivelser (utfylt).docx` | ⏳ | Kundens `1.5` + `fill-vedlegg5-referanser.py` | 3–5 referanser. Markdown: `vart-utkast/referanser/*.md` |
| 6 | `SSA-O Bilag (utfylt).docx` | ⏳ | Kundens `2.1` + `fill-ssa-o-bilag.py` | Bilag 2 = Konsulentens spesifikasjon (4 kvalitets­kriterier). Også Bilag 1.5 (nøkkelressurs/underlev), Bilag 7 (pris) |
| 7 | `00 Tilbudsbrev.pdf` | ⏳ | `vart-utkast/tilbudsbrev.md` → `export-bilag.mjs` | Egen PDF, ikke kundemal |
| 8 | `02 Bilag 2 — Konsulentens spesifikasjon (samlet).pdf` | ⏳ | `vart-utkast/BILAG-2-SAMLET.md` → `export-bilag.mjs` | Vedlegges som lesbar PDF i tillegg til docx |
| 9 | `CV — Asbjørn Rørvik.pdf` | ⏳ | `vart-utkast/cv-asbjorn.md` → `export-bilag.mjs` | Eget vedlegg |
| 10 | `KS- og informasjonssikkerhetssystem.pdf` | ⏳ | `vart-utkast/ks-infosikkerhet.md` → `export-bilag.mjs` | Jf. konk.grunnlag pkt. 5.3.4 |
| 11 | `Skatteattest.pdf` | ⏳ Bestilles fra Altinn | Skatteetaten | 1–3 dagers leveringstid |
| 12 | `Firmaattest.pdf` | ⏳ Bestilles fra Brreg | brreg.no | 5 min, 30 kr |
| 13 | `Næringsinntekt-skattemelding-2024-2025.pdf` | ⏳ Last ned fra Altinn | Skatteetaten | ENK — vedlegges som faktisk dokumentasjon på finansiell kapasitet (jf. egenerklæringen) |
| 14 | `Kredittvurdering.pdf` | ⏳ Valgfritt — kun hvis ADNO ber om det | Bisnode/Experian/Soliditet | Egenerklæring + samtykke til kredittvurdering er hovedsporet |

## Når alle filer er klare

1. Last opp i Mercell under riktig kategori
2. Verifiser med Mercells sjekkliste
3. Signer med BankID
4. Send inn — **før kl. 12:00** mandag 11. mai

## Pre-flight (før innsending)

- [ ] Spørsmål til ADNO sendt før 4. mai
- [x] Fastpris låst: **1 600 000 NOK inkl. mva**, maks 1 800 000 NOK inkl. mva (jf. Q&A 1)
- [ ] UU dekkes som ekstern tjeneste (Funka/MediaLT) — ikke som underleverandør. Vedlegg 2 utgår.
- [ ] Prototype `antidoping.asbjornrorvik.dev` er deployed med passord
- [ ] Ekstern korrektur av Bilag 2
