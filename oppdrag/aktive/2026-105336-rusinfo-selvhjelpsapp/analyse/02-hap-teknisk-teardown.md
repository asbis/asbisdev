# HAP teknisk teardown — 2026-04-22

Kildekoden ble *ikke* levert i konkurransegrunnlaget, kun build-output (`dist/`).
Jeg rekonstruerte ~6700 linjer Vue/TS fra sourcemaps (`sourcesContent`-felt i
hver `*.js.map`). Dette er fullt lovlig — sourcemaps er lagt inn av leverandøren,
og beskriver appens faktiske oppførsel som leverandører skal bygge videre på.

**Merk:** `hap-src/` er lagt til `.gitignore`. Vi commiter ikke arvet kode.

## Nåværende leverandør: Appfabrikken AS (Oslo)

- Adresse: Nordre gate 22A, 0551 Oslo + C/O Mesh, Tordenskiolds gate 2
- Portefølje: "App for ansatte", UngApp, Gjenbrukskommune, flere kommune-apper
- **Nettsiden sier eksplisitt: *"tar ikke lenger imot skreddersydde
  utviklingsprosjekter — henvis til Infohub.no"***
- Konklusjon: **Appfabrikken trolig ikke med å by** på ny konkurranse. Dette er
  sannsynlig grunn til at tjenesten nå konkurranseutsettes — eksisterende
  leverandør har sluttet å ta nye prosjekter.
- Original utvikler (fra `/Users/robinhavre/...`-sti i manifest): **Robin Havre**

**Strategisk insikt:** Det er ingen insider-fordel å slå. Vi starter på lik linje
med andre, og har samme tilgang til HAP som alle nye tilbydere.

## Kodebasens størrelse

| Område | Linjer |
|---|---|
| main + router + App.vue | 324 |
| stores (Vuex) × 7 | 1 774 |
| views × 10 | 1 395 |
| components × 8 | 819 |
| modals × 14 | 2 319 |
| composables × 1 | 84 |
| **Totalt** | **~6 700 LOC** |

Dette er en **overkommelig kodebase** for en solo-utvikler. 2–3 uker for full
onboarding, deretter produktiv videreutvikling.

## Stack

- **Ionic 7** (UI-komponenter)
- **Vue 3** (Composition API + Options API blandet)
- **Capacitor 5** (native wrapper for iOS/Android)
- **TypeScript 5**
- **Vuex** — *viktig observasjon: Vuex er teknisk deprecated* til fordel for
  Pinia. Dette er teknisk gjeld som kan nevnes som "forbedrings­mulighet" i
  Bilag 2 (ikke et "avvik", men en oppgradering).
- **Chart.js / vue-chartjs** for grafer (abstinens, statistikk, triggerdagbok)
- **axios** for HTTP
- **crypto-js** — AES-kryptering av lokal Preferences-lagring
- **dayjs** — datohåndtering
- **lodash, uuid, swiper, tabler-icons, ionicons**
- **Jest** (unit) + **Cypress** (e2e) + **Playwright WebKit** (screenshots)

## Arkitektur

### Backend

**Strapi headless CMS** på `https://hap.appfabrikken.no/api`.

- Strapi er åpen kildekode, selv-hostbart
- RUSinfo-staff redigerer tekster/innhold i Strapi admin-UI
- **"Kontrollpanel" i kravspec = Strapi admin-panelet**
- Det hardkodede Bearer-tokenet i `apiService.ts` er read-only for publikum

**Hosting-implikasjon:** Ny leverandør må enten
1. Få Appfabrikken til å overlevere Strapi-instansen (trolig komplekst hvis de
   host-er for andre kunder også på samme server)
2. Sette opp ny Strapi-instans og migrere innhold (enkelt — Strapi har export/import)
3. Erstatte Strapi med noe annet (Sanity, Contentful, egen Next.js-CMS)

**Anbefaling i tilbudet:** Foreslå å **selv-hoste Strapi i Oslo kommunes Azure/Digdir Sky
eller på egen Vercel/Railway**, migrere innhold én gang, og drive videre. Dette
gir RUSinfo full kontroll og uavhengighet fra Appfabrikken — *viktig salgsargument*.

### Frontend arkitektur

```
/onboarding (velg modul + startdato)
    ↓
/tabs
  ├── /home     (prestasjoner, tidtaker, dagens tema, besparelse)
  ├── /diary    (triggerdagbok + dagbok)
  ├── /stats    (abstinensgraf, statistikk)
  ├── /awards   (oppnådde prestasjoner + kommende)
  └── /info     (artikler fra Strapi)
      ├── /category/:id
      └── /article/:id
```

**State management:** Vuex med 7 moduler
- `diary` (dagbok­oppføringer)
- `triggerDiary` (trigger-registreringer med kategorier)
- `calculator` (sparekalkulator)
- `awards` (prestasjoner)
- `content` (Strapi-synket innhold)
- `notifications` (push?)
- `themes` (visuell tilpasning)

**Lagring:** Capacitor Preferences (på native) eller LocalStorage (PWA) — alt
AES-kryptert med (hardkodet prefix + random passphrase per enhet).

## Sikkerhetsobservasjoner

### Det som er OK
- AES-kryptering av lokal Preferences ✓
- Anonymisert — ingen brukerkonto eller personopplysninger ✓
- Backend read-only for publikum ✓

### Det som bør forbedres (ikke nevne som avvik, men som forbedrings­potensiale i Bilag 2)
1. **Bearer-token hardkodet i klient** — ikke sikkerhets­kritisk siden backend
   kun serverer offentlig innhold, men bryter prinsippet om "least privilege".
   **Forslag:** Strapi public API-endepunkter (uten token) — enkel endring.
2. **AES-nøkkel delvis hardkodet** (`03c273a7-...` + random passphrase). Dette
   er forsvarlig security-by-obscurity, men en kompromittert app-binary
   eksponerer halve nøkkelen. **Forslag:** full random passphrase i Keychain/Keystore.
3. **Deprecated Vuex** — migrering til Pinia reduserer teknisk gjeld og gir
   bedre TypeScript-støtte. Kan foreslås som del av tilpasningen.
4. **Capacitor 5 / Ionic 7** — Capacitor 6 og Ionic 8 er nyere. Oppgradering
   anbefales før man legger til nye funksjoner.

## Hva som må *tilpasses* fra HAP til RUSinfo

Ut fra kravspec 4.2.2 + kodebasen jeg ser:

### Bare kosmetisk (lav innsats)
- `avatarOnly.vue` — kopier, endre default avatar (fra cannabis-stemning til kokain-stemning)
- `ThemeOfTheDayComponent.vue` — innholdet styres fra Strapi, så kun tekst-endringer i admin
- `InfoComponent.vue` — samme, styrt fra Strapi
- `TimerComponent.vue` — logikken er generisk, bare tekster endres

### Innholdsendring i Strapi (ikke kode)
- Alle artikler i info-seksjonen
- Dagens/ukens tema-tekster
- RUSinfos redigerbare tekstboks

### Tilpasning (middels innsats)
- `ChartAbstinenceGraph.ts` + `abstinenceInfoModal.vue` — *må* endres fra cannabis-abstinens til kokain-abstinens, inkl. kombo med alkohol. Ny graf pr modul.
- `stores/awards.ts` — nye prestasjons-parametre
- `stores/calculator.ts` — sparekalkulator for kokain-pris (høyere enhetspris)
- `stores/triggerDiary.ts` — eventuelt andre standard-triggere (selv om custom triggere finnes)

### Nye moduler (høy innsats, 5 nye funksjoner kravet)
- **Kartleggingsverktøy som kalender** — planlagt vs faktisk bruk per periode.
  **Helt ny vue-komponent**, krever ny Vuex-modul (`stores/planning.ts`?),
  Chart.js-graf for sammenligning.
- **Kriseknapp** → kriseplan i dagbok. Utvidelse av `stores/diary.ts` + ny modal
  `crisisplan.vue`.
- **Tema-/fargepalett-velger** + gray-scale-modus. Utvidelse av `stores/themes.ts`
  (som allerede finnes — 304 LOC, rimelig enkelt å utvide) + CSS-variabel-system.
- **Bildebibliotek** — bruker velger bakgrunnsbilder. Ny composable + asset-strukturen,
  enkel UI. Strapi kan hoste bildene.
- **Motivasjonsvegg** — ny view. Komposisjon av tekst + bilder fra bibliotek.
  Lagring i Vuex, eksport til bilde (optional).

### Teknologisk nytt (valgfritt, men ønsket i Bilag 1 §4.2.3)
- **Lokal språkmodell for oversettelse** — on-device oversettelse av
  Strapi-tekster. **Dette er spennende og skiller oss ut.** Mulige veier:
  - **Apple Translation Framework** (iOS 17.4+) + Google ML Kit (Android) → helt free-tier
  - **ONNX Runtime Web** med kompakt oversetter-modell → går på begge plattformer
  - **WebLLM** med smal modell → overkill men AI-hype
  **Anbefaling:** foreslå native plattformløsninger (Apple + Google) som
  primærvalg, da er det on-device + gratis + ingen nett. Alternativ: ONNX med
  Marian-modell (Helsinki-NLP).

## Estimat — total innsats

| Fase | Innsats | Timer |
|---|---|---|
| Onboarding på HAP-kode + oppsett | 2 uker | 60 |
| Backend-migrering Strapi | 1 uke | 30 |
| Kosmetisk tilpasning + theme for kokain | 1 uke | 30 |
| Abstinens­graf + calculator-tilpasning | 1 uke | 30 |
| 3 moduler (sykl/jevn/lær) m/ egne løp | 2 uker | 60 |
| Ny: kartleggingsverktøy kalender | 2 uker | 60 |
| Ny: kriseknapp + kriseplan | 1 uke | 30 |
| Ny: theme-velger + grayscale | 1 uke | 30 |
| Ny: bildebibliotek | 1 uke | 30 |
| Ny: motivasjonsvegg | 1 uke | 30 |
| Lokal AI-oversettelse (Apple+Google) | 1 uke | 30 |
| UU-testing m/ underleverandør | 1 uke | 20 (eget) + 40 (under) |
| Publisering App Store + Play | 0.5 uke | 15 |
| Dokumentasjon + overlevering | 1 uke | 30 |
| **Total utvikling** | **~16 uker** | **~485 t + 40 t underlev.** |

Med timepris 1500 gir det ~725k fastpris + 60k underleverandør = **~785k**.
Det er konsistent med det vi foreslo i analysen (750k). Litt slack for
risiko­buffer.

## Implikasjoner for tilbudet

1. **I Bilag 2 kan vi være svært konkret:** referer direkte til filstrukturen
   vi allerede vet om, nevn Strapi-hosting-alternativer, vis at vi har gjort
   due diligence. Det gir høye poeng på "teknisk funksjonalitet".

2. **Vi kan love kortere onboardings­tid enn konkurrentene** — vi har allerede
   lest koden. Dette er en *stille fordel* som gir oss tryggere tidsestimater.

3. **Spørsmål på KGV kan være spisse:**
   - *"Er Strapi-backend tilgjengelig for overlevering, eller skal ny leverandør
     etablere ny instans?"*
   - *"Hvem eier domenet `hap.appfabrikken.no`? Skal dette byttes?"*
   - *"Er det ønsket å migrere til Pinia og Capacitor 6 som del av tilpasningen,
     eller skal appen holdes på eksisterende versjoner?"*

4. **Posisjon mot andre tilbydere:** de fleste vil estimere basert på kravspec
   alene og legge inn stor risiko-buffer (~40 %). Vi har faktisk sett koden og
   kan legge inn moderat buffer (~15 %) → billigere tilbud uten å være taktisk.

## Neste steg

- [ ] Spesifikt spørsmål på KGV: *"Er kildekoden tilgjengelig for pre-tilbuds-
      gjennomgang?"* — hvis ja, få tilgang. Hvis nei, vi har allerede sett den.
- [ ] Bygg en lokal kopi av HAP (må gjenskape `src/` fra `hap-src/` + skaffe
      `public/` assets — ikoner, skrift, bilder)
- [ ] Verifiser at `npm install` + `npm run serve` funker mot kopien
- [ ] Test alle flows i nettleser for å forstå UX
