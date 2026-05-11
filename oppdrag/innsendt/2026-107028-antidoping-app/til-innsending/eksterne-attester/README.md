# Eksterne attester og vedlegg

PDF-er som **ikke** er autogenerert fra markdown — de bestilles fra eksterne registre og legges direkte her med ryddig filnavn for opplasting i Mercell.

## Status

| Mercell-krav | Fil | Status | Datert |
|---|---|---|---|
| **Skatteattest** | `Skatteattest — Asbjørn Rørvik — 2026-04-24.pdf` | ✅ Klar | 2026-04-24 (gyldig 6 mnd) |
| **Konkursregisteret-bekreftelse** (tillegg til finansiell egenerklæring) | `Bekreftelse fra Konkursregisteret — 2026-05-01.pdf` | ✅ Klar | 2026-05-01 |
| **Rolleoversikt** (tillegg, dokumenterer ENK-eierskap) | `Rolleoversikt næring — Asbjørn Rørvik — 2026-05-01.pdf` | ✅ Klar | 2026-05-01 |
| **Utskrift fra Enhetsregisteret** (likeverdig firmaattest for ENK) | `Utskrift fra Enhetsregisteret — 820 252 632 — YYYY-MM-DD.pdf` | ⏳ Last ned fra brreg.no/enhet/820252632 (gratis) | — |
| **Egenerklæring finansiell kapasitet** | autogenereres som PDF fra `vart-utkast/egenerklaering-finansiell-kapasitet.md` → `autogenerert/Egenerklæring — Finansiell kapasitet.pdf` | ✅ Markdown ferdig — PDF genereres med export-bilag.mjs | — |

## Strategi for hvert kvalifikasjonskrav

| Mercell-krav | Lastes opp |
|---|---|
| **Skatteattest** | `Skatteattest — Asbjørn Rørvik — 2026-04-24.pdf` |
| **Firmaattest / lovlig etablert foretak** | `Utskrift fra Enhetsregisteret …pdf` + `Rolleoversikt næring …pdf` (ENK utstedes ikke formell firmaattest — utskrift fra Enhetsregisteret er likeverdig dokumentasjon, dette er forklart i egenerklæringen pkt. 4) |
| **Økonomisk og finansiell kapasitet** | `Egenerklæring — Finansiell kapasitet.pdf` (samtykker til at ADNO selv innhenter kredittvurdering) + `Bekreftelse fra Konkursregisteret …pdf` som tillegg |
| **Gjennomføringsevne** | `Vedlegg 4 — Gjennomføringsevne (utfylt).docx` (autogenerert) |
| **Kvalitetssikring (KS)** | `KS- og informasjonssikkerhetssystem.pdf` (del 1 dekker KS) |
| **Informasjonssikkerhet** | Samme PDF — del 2 dekker infosikkerhet |
| **Erfaring (referanser)** | `Vedlegg 5 — Referansebeskrivelser (utfylt).docx` |

## Det eneste som gjenstår å laste ned

**Utskrift fra Enhetsregisteret** — gå til https://www.brreg.no/enhet/820252632, klikk "Bestill utskrift" eller bruk Cmd+P → "Lagre som PDF". Gratis, ingen BankID nødvendig.

ENK uten foretaksregistrering utstedes ikke formell *firmaattest* — utskrift fra Enhetsregisteret inneholder den samme informasjonen (foretaksnavn, org.nr, adresse, formål, registreringsdato) og er likeverdig dokumentasjon. Egenerklæringen pkt. 4 forklarer dette eksplisitt for ADNO.

Tilbudsfrist: 2026-05-11 kl. 10:00.
