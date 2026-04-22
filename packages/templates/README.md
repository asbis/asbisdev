# @asbisdev/templates

Delt innhold: CV-data, profil-tekst, caser og søknadsmaler — brukt av både
`apps/web` (nettsiden) og av Claude Code når den skriver søknader i `oppdrag/`.

## Planlagt struktur

- `profile.ts` — profil-data (navn, stack, språk, preferred locations). Migreres
  fra `apps/web/lib/content.ts` når vi konsoliderer.
- `cases/` — én markdown-fil per prosjekt (Kolumbus, Equinor, Easee, …) med
  problem, løsning, rolle, teknologi, tall. Gjenbrukes som referanser i søknader.
- `tone.md` — skriveveiledning: stemme, lengde, hva som skal med og ikke.
- `boilerplate/` — gjenbrukbare tekstblokker (GDPR, metodikk, HMS, osv.).

## Flyt

Claude Code ved søknadsskriving:
1. Leser anbudsteksten fra `oppdrag/aktive/<id>/tender.md`.
2. Velger relevante caser fra `cases/`.
3. Bruker `tone.md` for stemme og `boilerplate/` for standardavsnitt.
4. Lagrer utkast i `oppdrag/aktive/<id>/draft.md`.
