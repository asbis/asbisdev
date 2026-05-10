# Vårt arbeid — status per dokument

| Dokument | Status | Ansvar | Målfil til innsending |
|---|---|---|---|
| `bilag-2-loesningsspec.md` | ✅ Utkast 1 ferdig | Claude utkast, Asbjørn review | Kopier inn i `fra-kunden/02-ssa-t-kontrakt/02 ... Bilag 2 ... .docx` → eksporter PDF → `1.7 Bilag 2 Løsningsspesifikasjon.pdf` |
| `bilag-4-prosjektplan.md` | ⏳ Ikke startet | Claude utkast, Asbjørn review | Kopier inn i `fra-kunden/02-ssa-t-kontrakt/03 Bilag 3 til 10.docx` (Bilag 4-delen) → `1.8 Bilag 4 Prosjektplan.pdf` |
| `bilag-7-prisestimering.md` | ⏳ Ikke startet | Claude tall-utkast, Asbjørn endelig | Fyll inn i `fra-kunden/02-ssa-t-kontrakt/03.2 ... PRISSKJEMA ... .xlsx` → `1.9 Bilag 7 Prisskjema.xlsx` |
| `tilbudsbrev.md` | ⏳ Ikke startet | Claude utkast, Asbjørn signerer | Kopier inn i `fra-kunden/01-konkurransegrunnlag/03 Vedlegg 3 Mal for tilbudsbrev.docx` → signer → `1.1 Tilbudsbrev.pdf` |
| `cv-asbjorn.md` | ⏳ Trenger input | Asbjørn skriver oppsummering | Inngår i Bilag 4 §4.2 |
| `referanser/tryggdrift.md` | ⏳ Trenger kontakt-OK | Asbjørn får samtykke | Inngår i Bilag 4 §4.2 + "1.6 Teknisk/faglig" dokumentet |
| `referanser/kolumbus.md` | ⏳ Trenger kontakt-OK | Asbjørn får samtykke | Inngår i Bilag 4 §4.2 + "1.6 Teknisk/faglig" |
| `referanser/easee.md` | ⏳ Trenger kontakt-OK | Asbjørn får samtykke | Inngår i Bilag 4 §4.2 + "1.6 Teknisk/faglig" |

## Hvordan Word-filene skal fylles ut

Kundens Word-maler har forhåndsdefinerte felt. For **Bilag 2** ser formatet typisk slik ut:

```
| Krav nr. | 4.1.1 |
| Kravtype | M |
| Forventninger | [kundens tekst] |
| Leverandørens besvarelse | [← HER skriver vi] |
```

Vår markdown er organisert etter samme kravnummer, så kopiering er mekanisk:
markdown-teksten under "Krav 4.1.1" går inn i "Leverandørens besvarelse"-cellen.

## Eksport-rutine (siste dag)

1. Åpne kundens Word-mal i Word/Google Docs/LibreOffice
2. Kopier markdown-tekst inn i besvarelse-felt for hvert krav
3. Sjekk formatering (lister, tabeller)
4. "Lagre som PDF"
5. Plasser PDF i `til-innsending/` med riktig filnavn
6. Sladd konfidensiell informasjon i egen versjon (gul → kan redigeres, svart → kan ikke redigeres) — se veiledning i `fra-kunden/01-konkurransegrunnlag/01 Vedlegg 1 ...`
