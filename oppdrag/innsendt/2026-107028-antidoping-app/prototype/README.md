# Antidoping i lomma — React Native prototype

Funksjonell prototype av ADNOs app-konsept. Basert på design fra Claude Design (`app-design/`). Bygget i Expo + React Native + TypeScript for å kjøre på iOS, Android og web (for demo-link i tilbudet).

## Kjør

```bash
cd oppdrag/aktive/2026-107028-antidoping-app/prototype
pnpm install     # eller npm install
pnpm start       # Expo dev server (trykk w for web, i for iOS, a for Android)
pnpm web         # direkte i nettleser
```

## Skjermer (20+)

Onboarding (3) → Hjem → Kosttilskuddsjekk (intro, 8 spørsmål, beregner, resultat) → Legemiddelsøk + detalj → Dopinglista-søk + detalj → Meldinger + detalj → Astmakalkulator → Medisinsk fritak → Dopingvarsel → Kontakt oss → Ren Utøver → Innstillinger (inkl. mørk modus).

## Designsystem

- Palett: `src/theme.ts` (off-white `#F5F3EE`, deep navy `#0B2545`, ok/warn/bad + mørk variant)
- Primitiver: `src/ui.tsx` (Button, Card, StatusBadge, RiskBar, RiskDisplay, AppBar, LargeTitle, ListRow, Switch, SearchField)
- Ikoner: `src/icons.tsx` (monoline Lucide-stil, via react-native-svg)

## Router

Stack-basert `history`-array i `App.tsx`, matcher design-prototypens ruter 1:1. Ingen external nav-lib — tilstand persisterer mellom skjermer (svar, valgt medisin, etc.).
