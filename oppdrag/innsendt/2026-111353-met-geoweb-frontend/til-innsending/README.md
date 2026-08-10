# Innsendings-sjekkliste — GeoWeb (Mercell, frist **10.08.2026 kl 12:00 CET**)

Alt leveres elektronisk i Mercell. Krav fra tender-dokumentet §6.1:
tilbudsbrev + utfylt kontrakt med bilag + øvrige vedlegg, som PDF.

| # | Dokument | Status | Kilde |
|---|---|---|---|
| 1 | Letter of Tender (PDF, signert elektronisk) | ⏳ | `vart-utkast/tilbudsbrev.md` |
| 2 | ESPD | ⏳ Fylles i Mercell (Del IV α) | Mercell-skjema |
| 3 | SSA-B appendices, utfylt (Appendix 2–5) | 🤖 Autogenerert — mangler [FILL] | `autogenerert/SSA-B_appendices_2026-eng (utfylt).docx` |
| 4 | CV — Asbjørn Rørvik (målrettet kravlisten) | ⏳ | `vart-utkast/cv-asbjorn.md` (ikke skrevet) |
| 5 | 3 referanseoppdrag m/ verdi, tidsrom, kontaktinfo | ⏳ Trenger samtykke | `vart-utkast/referanser.md` |
| 6 | Ev. utfylt SSA-B hoveddokument (signaturside) | ⏳ | `files/SSA-B_agreement ... .docx` |

Kun vinneren må levere (men ha klart): firmaattest (brreg.no),
kredittrating, skatteattest (Altinn, 1–3 dagers leveringstid).

## Regenerere docx etter endringer

```bash
/tmp/docxvenv/bin/python3 /Users/asbis/code/asbisdev/apps/web/scripts/fill-ssab-geoweb.py
```

- Appendix 2-innhold redigeres i `vart-utkast/bilag2-response.md`
- Timepris settes i scriptets `HOURLY_RATE` (fyller ut priscellene + mva)
- Representant/nøkkelpersonell i scriptets konstanter

## Viktige datoer

- **27.07 kl 16:00** — spørsmålsfrist (uke 28–29 = ferie, ingen svar)
- **10.08 kl 12:00** — innleveringsfrist
- Vedståelse til 09.10.2026
