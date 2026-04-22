---
title: HAP slik den er i dag
---

# HAP slik den er i dag

Dette dokumentet beskriver den eksisterende appen HAP (cannabis-avvenning) i
detalj — som referanse for både "hva kunden er vant til" og "hva vi ikke vil
videreføre" i ny app.

Dette er basert på gjennomgang av kildekoden (rekonstruert fra sourcemaps) og
testing av den ferdig bygget appen.

## Appens overordnede hensikt

HAP er en selvhjelps-app for personer som vil slutte med, trappe ned eller ta
en pause fra cannabis. Programmet strekker seg over 12 uker og baseres på
abstinens-faser, triggere, motivasjon og dagbokføring.

Appen er **fullstendig anonym** — ingen brukerkonto, ingen innlogging, ingen
personopplysninger sendes til server.

## Visuell profil

### Fargepalett ("calm"-serien)

- **calm1:** `#ECD8E0` — mørkt rosa/pudder
- **calm2:** `#FFD5B6` — fersken/beige
- **calm3:** `#BAD8E0` — lyseblå
- **calm4:** `#C7DBB0` — lys grønn/oliven

Alle er pastelltoner. Intensjonen er "dempende" / "rolige". Kontrasten mot
hvit bakgrunn er lav → tilgjengelighets-utfordringer (under WCAG AA for
normal tekst).

### Typografi

Standard Ionic-systemfonter (San Francisco på iOS, Roboto på Android).
Ingen custom typografi. Ingen hierarki utover Ionic-standard.

### Layout

Kort-basert (Ionic `<ion-card>`), uten egen design. Alle "moduler" på hjem-
skjermen er bare stablede kort med forskjellig pastellfarge. Ingen hvitrom
eller skulpterende komposisjon. Mye `<br /><br />`-tags (!) manuelt brukt
for å lage luft.

### Ikoner

Ionicons (standard) + Tabler Icons (sekundært). Blandet stil — noen
outline, noen filled. Avatarer er fra flaticon.com ("/flaticon.com/
collection-4/svg/078-user-8.svg").

## Navigasjon

**Onboarding → Tabs.** 5 tabs nederst:

```
┌─────────────────────────────────────────┐
│ Hjem │ Dagbok │ Oversikt │ Prestasjoner │ Info │
└─────────────────────────────────────────┘
```

## Skjerm-for-skjerm beskrivelse

### 1. Onboarding (5 slides, horisontal swipe)

**Slide 1 — Velkommen:**
- "Velkommen til HAP"
- "Du er helt anonym"
- Knapp "Start hasjavvenningsprogrammet"
- Subknapp: "Cannabis og rekreasjonsbruk" (info om lett bruk)

**Slide 2 — Litt info:**
- Appens formål (12-ukers program)
- Bakgrunn (studenter fra Westerdahls + RUSinfo + Uteseksjonen Oslo)
- Nøytralitets-erklæring
- Lenker til RUSinfo + Uteseksjonen

**Slide 3 — Velg sluttdato:**
- Datovelger (dato + klokkeslett)
- Forklarer hvorfor datoen er viktig
- Ionic-native `<ion-datetime>` komponent

**Slide 4 — Frivillig bidrag:**
- Toggle: "Jeg ønsker å bidra"
- Hvis aktivert: dropdowns for alder + kjønn + annen bakgrunn
- Alt anonymt, aggregeres i Strapi

**Slide 5 — Aksepter:**
- Sammendrag + "Aksepter"-knapp → inn i hovedappen

### 2. Hjem (Tab 1)

Stabel av 4 kort, alle med ulik pastellfarge:

1. **Info-kort** (calm3 lyseblå): redigerbar tekstboks fra RUSinfo
2. **Tidtaker** (calm1 rosa): "Du har klart deg i X dager, Y timer, Z
   sekunder" siden din sluttdato
3. **Sparekalkulator** (calm2 beige): penger spart siden sluttdato,
   basert på brukerens egen verdi-input
4. **Dagens/ukens tema** (calm4 grønn): refleksjonsspørsmål/øvelse hentet
   fra Strapi, rullerende

Etter de fire kortene: **10+ manuelle `<br />`-tags** (!), deretter en
floating action button (FAB) som skjuler seg under innholdet.

### 3. Dagbok (Tab 2)

- Toppbar: tittel + "Skriv"-knapp
- Tom tilstand: stort kort som oppfordrer til første notat
- Liste av notater som kort (datostempel + forhåndsvisning + tags)
- Klikk åpner modal for redigering
- Egen søkebar som kan vises/skjules
- Tagging på hvert innlegg (badges med farger)

### 4. Oversikt (Tab 3)

**Før 42 dager:**
- Abstinensoversikt-kort med graf
- Fase-indikator (Fase 1 / 2 / 3)
- Chart.js-graf med to linjer: "humørsvingninger" + "THC-metabolitter"
- "Du er her"-markør
- Info-modal for forklaring av hver fase

**Etter 42 dager:**
- Statistisk tekst om "vedlikeholdsfasen"
- Ingen graf synlig som default

**Alltid synlig:**
- 2 pie charts: "triggere som hjelper" og "triggere som fører til bruk"
- Fra triggerdagbok-data

### 5. Prestasjoner (Tab 4)

- "Neste prestasjon" (1 kort) med estimert tid til fullført
- "Fullførte prestasjoner" (liste av kort)
- Hvert kort: ikon (trofé-variant) + tittel + beskrivelse
- Klikk → `/awards/upcoming` for fullstendig liste
- Referanser til "hasjavvenningsprogrammet" i teksten (hardkodet)

### 6. Info (Tab 5)

- Liste av kategorier fra Strapi
- Klikk på kategori → liste av artikler
- Klikk på artikkel → full tekst (HTML-rendret)
- Hierarki: Info → Kategori → Artikkel

### 7. Sidemeny (drawer fra hamburger-meny)

Kategoriene:
- **Generelt:** Innstillinger, Om appen
- **Tilbakestilling:** Nullstill alt, Nullstill timer, Nullstill triggere,
  Nullstill prestasjoner

### 8. Modals (14 stk)

| Modal | Formål |
|---|---|
| `about` | Om appen + versjoner + kreditering |
| `abstinenceInfoModal` | Forklaring av abstinensgraf og faser |
| `diaryEdit` | Skriv/rediger dagboksoppføring, 246 LOC — stor |
| `feedback` | Anonym tilbakemelding til RUSinfo |
| `licenses` | Tredjeparts-lisenser |
| `phaseInfo` | Info om en bestemt abstinens-fase |
| `reset` | Bekreftelse før nullstilling (351 LOC) |
| `savingsCalculator` | Endre pris/frekvens for sparekalkulator |
| `selectIcon` | Velg avatar fra liste |
| `selectProgramStartedAt` | Endre sluttdato i ettertid |
| `settings` | Appinnstillinger (mørk modus, avatar, osv.) |
| `triggerDiary-addCustomTrigger` | Legg til egen trigger |
| `triggerDiary-modal` | Registrer trigger-hendelse |
| `triggerDiary-sheet` | Bottom sheet for rask trigger-registrering |

## Teknologisk profil

- **Rammeverk:** Ionic 7 + Vue 3 + Capacitor 5
- **State:** Vuex (ikke Pinia)
- **Grafer:** Chart.js via vue-chartjs
- **Backend:** Strapi CMS på `https://hap.appfabrikken.no/api`
- **Auth token:** hardkodet Bearer i klient
- **Lokal lagring:** Capacitor Preferences, AES-kryptert
- **Tester:** Jest (unit) + Cypress (e2e) + Playwright WebKit

## UX-problemer (brukertest med Asbjørn, 22. april)

Asbjørns første inntrykk: **"elendig"**. Konkret:

1. **Flat kort-design** uten visuelt hierarki. Alt ser like viktig ut.
2. **Pastell­palett uten bevissthet** — fargene er bare "hyggelige", ikke
   informative. calm1 (hjem) og calm2 (spare) betyr ingenting visuelt.
3. **Manuelle `<br />`-tags** som spacing = amatørmessig. FAB-knappen kolliderer.
4. **Onboarding er tekst-tungt** (slide 2 er praktisk talt et essay).
5. **Standard Ionic UI** → ingen signatur, ingen varme, ingen følelse av
   omsorg. Appen føles klinisk/teknisk, ikke støttende.
6. **Tom tilstand er passiv** ("Kom i gang med din egen dagbok 📔") uten å
   gi verdifull veiledning.
7. **Ingen motion/micro-interactions** — alt er statisk. Klikk gir ingen
   feedback.
8. **Tilgjengelighet** — pastell på hvit bakgrunn bryter WCAG AA. Ingen
   synlig støtte for skjermleser eller Dynamic Type.
9. **Navigering fra ikoner alene** (home/book/stats/trophy/book) er ikke
   selvforklarende.
10. **Fase-indikator** (Fase 1/2/3 oppe i Oversikt-tabben) er bare tekst-
    divs — ingen progresjonsfølelse.

## Hva som fungerer (bør videreføres)

- **Anonymitets-løftet** fra start. Viktig for målgruppen.
- **Dagbokens rolle** som reflekterende verktøy — god idé.
- **Trigger­dagbok med pie-charts** — gir brukeren innsikt.
- **Sparekalkulator** som mikromotivasjon — konkret, håndfast.
- **Abstinens­graf** som pedagogisk verktøy — viktig å beholde.
- **Strapi-drevet innhold** — gir RUSinfo autonomi til å oppdatere tekst.
- **Onboarding setter forventninger** — 12-ukers program, forpliktelse.
- **Prestasjoner som mikromål** — motiverende for små seire.

## Oppsummering

HAP er **strukturelt solid, visuelt svak**. Arkitekturen, datamodellen,
og grunnfunksjonaliteten er verdt å beholde. Det visuelle uttrykket,
micro-interaksjonene, tilgjengeligheten og varmen mangler.

Den nye appen for kokain­brukere skal ha samme struktur (samme tabs,
samme datamodell, samme backend-tilnærming), men et vesentlig bedre
visuelt og opplevelsesmessig nivå.

Se `04-slik-vi-lager-den.md` for hvordan.
