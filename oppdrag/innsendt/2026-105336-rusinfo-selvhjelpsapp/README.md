---
tender: 2026-105336
title: Utvikling av selvhjelpsapp for personer som bruker kokain
buyer: Oslo kommune Velferdsetaten v/ RUSinfo
deadline: 2026-04-27 kl 12:00
contract: SSA-T (tilpasning) + 3 års vedlikehold
portal: https://app.artifik.no/procurements/4281
---

# RUSinfo selvhjelpsapp — arbeidsmappe

## Status

| | |
|---|---|
| **Tilbudsfrist** | **2026-04-27 kl 12:00** |
| **Spørsmålsfrist** | 2026-04-27 kl 11:00 (samme dag — for sen for oss) |
| **Tildeling** (estimert) | 2026-05-27 |
| **Kontraktsigning** | ~2026-06-07 (10 dager etter tildeling) |
| **Vedståelsesfrist** | 2026-08-27 (3 mnd etter tilbud) |

## Mappestruktur

```
rusinfo-selvhjelpsapp/
├── README.md                ← du er her
├── analyse/                 ← VÅR strategi og research
│   ├── 01-vinnerstrategi.md
│   └── 02-hap-teknisk-teardown.md
│
├── fra-kunden/              ← ALT Oppdragsgiver har levert. IKKE REDIGER.
│   ├── 01-konkurransegrunnlag/
│   │   ├── 00 Del III Konkurransegrunnlag.pdf
│   │   ├── 01 Vedlegg 1 Sladding.docx
│   │   ├── 02 Vedlegg 2 Forpliktelseserklæring.docx
│   │   └── 03 Vedlegg 3 Mal for tilbudsbrev.docx
│   ├── 02-ssa-t-kontrakt/
│   │   ├── 00 SSA-T_generell_avtaletekst.docx
│   │   ├── 01 Bilag 1 Kravspesifikasjon.pdf
│   │   ├── 02 Bilag 2 Løsningsspesifikasjon.docx   ← vår løsning skrives HER
│   │   ├── 03 Bilag 3-10.docx
│   │   └── 03.2 Bilag 7 Prisskjema.xlsx             ← vår pris fylles HER
│   └── 03-hap-kildekode/    ← HAPs dist/ (ikke src)
│
├── metadata/                ← auto-hentet fra Doffin + Artifik
│   ├── tender.md
│   ├── tender.xml
│   ├── portal.html
│   └── portal.url
│
├── vart-utkast/             ← VÅRE arbeidsutkast i markdown
│   ├── README.md            ← sjekkliste: hva er skrevet, hva mangler
│   ├── bilag-2-loesningsspec.md
│   ├── bilag-4-prosjektplan.md      (TODO)
│   ├── bilag-7-prisestimering.md    (TODO)
│   ├── tilbudsbrev.md               (TODO)
│   ├── cv-asbjorn.md                (TODO)
│   └── referanser/
│       ├── tryggdrift.md            (TODO)
│       ├── kolumbus.md              (TODO)
│       └── easee.md                 (TODO)
│
├── til-innsending/          ← FERDIGE filer klar for KGV-opplasting
│   └── README.md            ← 12-punkts sjekkliste (1.1–1.12)
│
└── hap-src/ (gitignored)    ← rekonstruert HAP-kildekode
```

## Arbeidsflyt

1. **Analyse i `analyse/`** — strategi, konkurrentbilde, tekniske funn
2. **Markdown-utkast i `vart-utkast/`** — rask å redigere, versjoneres i git
3. **Kopier inn i kundens malfil** (Word/Excel) når teksten er ferdig
4. **Eksporter til PDF** (for Word-dokumenter) og plasser i `til-innsending/`
5. **Last opp i KGV** med korrekt filnavn (1.1 Tilbudsbrev, 1.7 Bilag 2, osv.)

Kunden forventer innsending i **originale Word/Excel-maler fra `fra-kunden/`**,
ikke i markdown.

## Viktige pekere

- **Hovedstrategien**: [analyse/01-vinnerstrategi.md](analyse/01-vinnerstrategi.md)
- **Stack og kodebasen til HAP**: [analyse/02-hap-teknisk-teardown.md](analyse/02-hap-teknisk-teardown.md)
- **Kravene vi skal besvare**: `fra-kunden/02-ssa-t-kontrakt/01 DEL 2 SSA-T Bilag 1 Kundens behovsbeskrivelse og kravspesifikasjon.pdf`
- **Malen for svaret vårt**: `fra-kunden/02-ssa-t-kontrakt/02 DEL 2 SSA-T Bilag 2 Leverandørens løsningsspesifikasjon.docx`
