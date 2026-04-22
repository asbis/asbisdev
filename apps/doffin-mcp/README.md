# doffin-mcp

MCP-server som lar Claude Code søke i Doffin og score anbud mot Asbjørn sin konsulentprofil.

## Kjør lokalt

```bash
pnpm --filter @asbisdev/doffin-mcp dev
```

## Koble til Claude Code

Legg til i `~/.claude/mcp.json` (eller prosjekt-lokal `.mcp.json`):

```json
{
  "mcpServers": {
    "doffin": {
      "command": "pnpm",
      "args": ["--filter", "@asbisdev/doffin-mcp", "start"],
      "cwd": "/Users/asbis/code/asbisdev"
    }
  }
}
```

## Verktøy

- `search_tenders` — fri-tekstsøk + CPV + lokasjon, scoret mot profil
- `recommended_tenders` — forhåndsinnstilt søk på software-CPV + Rogaland

## Merknad om API

Endepunktet i `src/doffin.ts` (`api.doffin.no/public/v2/search`) er et antatt
schema — Doffin sin faktiske offentlige API må verifiseres mot deres dokumentasjon
eller OCDS-dump på `data.norge.no`. `normalize()` er defensiv så den tåler
variasjoner, men strukturen bør testes mot reell respons og justeres.
