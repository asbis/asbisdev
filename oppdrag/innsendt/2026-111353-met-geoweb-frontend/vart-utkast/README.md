# Vårt arbeid — status per dokument (GeoWeb, frist 10.08.2026 kl 12:00)

| Dokument | Status | Ansvar | Målfil til innsending |
|---|---|---|---|
| `tilbudsbrev.md` | ✅ Komplett (mangler dato + OpenGeoWeb-obs) | Asbjørn review + signering | `Letter of Tender.pdf` |
| `bilag2-response.md` | ✅ Komplett (mangler OpenGeoWeb-obs) | Asbjørn review | Inn i SSA-B appendices docx → Appendix 2 |
| `cv-asbjorn.md` | ✅ Komplett | Asbjørn review | Vedlegg til Appendix 2 |
| `referanser.md` | ✅ Kontakter «på forespørsel» (skaffes ved innstilling) | — | Kvalifikasjonskrav 4.3 — egen PDF |
| Pris (Appendix 5) | ✅ 1 075 kr/t (maks 1 084 for 1 MNOK/922 t) | Asbjørn kan justere | Autogenerert i docx |
| ESPD | ⏳ Fylles i Mercell (Del IV α) | Asbjørn, 30 min klikking | Mercell |
| Firmaattest | ⏳ Bestilles brreg.no (kun vinner må levere, ha klart) | Asbjørn | — |
| Kredittrating | ⏳ Bestilles (kun vinner må levere, ha klart) | Asbjørn | — |

## Regenerering av Word-fil

```bash
/tmp/docxvenv/bin/python3 /Users/asbis/code/asbisdev/apps/web/scripts/fill-ssab-geoweb.py
```

Scriptet leser MET sin `files/SSA-B_appendices_2026-eng.docx`, setter inn vår
besvarelse i Appendix 2/3/4/5 og skriver utfylt docx til
`../til-innsending/autogenerert/`. Rediger innhold i scriptets tekstblokker
eller i markdown-kildene her — ikke i den genererte fila.
