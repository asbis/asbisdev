# oppdrag/

Arbeidsmappe for anbud og søknader. Ikke en kode-pakke — bare markdown.

## Struktur

```
oppdrag/
├── _maler/          # søknadsmaler (bruk som utgangspunkt)
├── aktive/          # pågående anbud
│   └── <tender-id>/
│       ├── tender.md      # rå beskrivelse fra Doffin
│       ├── notes.md       # egne notater, spørsmål
│       └── draft.md       # utkast til søknad
└── innsendt/        # arkiv over innsendte søknader (for gjenbruk + læring)
```

## Flyt

1. Claude Code finner et anbud via `doffin-mcp` (`recommended_tenders`).
2. Oppretter `aktive/<id>/tender.md` med beskrivelsen.
3. Drafter `draft.md` basert på maler i `_maler/` og caser i
   `packages/templates/cases/`.
4. Etter innsending: flytt mappen til `innsendt/` med utfall-annotasjon i
   filnavn (f.eks. `innsendt/2026-05-aker-app-vunnet/`).
