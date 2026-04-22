---
title: Bilag 2 — Leverandørens løsningsspesifikasjon
tender: 2026-105336
status: UTKAST — under arbeid
---

# Bilag 2 — Leverandørens løsningsspesifikasjon

**Leverandør:** Asbjørn Rørvik (org.nr 820252632)
**Anskaffelse:** Utvikling av selvhjelpsapp for personer som bruker kokain
**Dato:** 2026-04-27

---

## Overordnet løsningsbeskrivelse

Appen bygges som en native mobilapplikasjon for iOS og Android i **React Native
(0.74+)** med **TypeScript**. Vi beholder den *strukturelle oppbyggingen* fra
HAP (onboarding → tab-basert hovednavigasjon med fem hovedseksjoner →
innholdsstyring via Strapi headless-CMS), men bytter rammeverk for å gi
sluttbrukerne en vesentlig bedre brukeropplevelse.

**Hvorfor et annet rammeverk enn HAP:**

1. **Brukervennlighet.** Målgruppen er personer i en sårbar livssituasjon.
   React Native rendrer native UI-komponenter (iOS UIKit, Android Material)
   og gir smidigere animasjoner, bedre scroll-ytelse, og bedre integrasjon
   med plattformens tilgjengelighets-API-er enn en webbasert Ionic-løsning.
2. **Vedlikeholds­utvalg.** Det finnes i dag betydelig flere React Native-
   utviklere i Norge enn Ionic/Vue-utviklere. Dette reduserer risiko for
   vendor lock-in og gir Oppdragsgiver et bredere leverandør­marked hvis
   vedlikeholds­avtalen senere skulle overføres.
3. **Rammeverkets levetid.** React Native er bakket av Meta siden 2015, har
   dokumentert langsiktig support og oppfyller klart ønsket om "minimum 5–7
   års levetid". Store produksjonssystemer som Instagram, Shopify, Discord,
   Microsoft Office og hundrevis av norske apper (DNB, Vy, Equinor, Easee)
   bruker stacken.
4. **Felles kodebase.** Én React Native-kildekode kompileres til både iOS og
   Android — ingen duplisering.

**Backend:** Samme Strapi headless-CMS som HAP. Strapi er åpen kildekode,
selv-hostbart, og gir RUSinfo samme administrasjons­grensesnitt som i dag for
å redigere innhold, hente ut statistikk og sende meldinger til brukere.

---

## Svar på krav i Bilag 1

### § 4.1 Generelle krav

#### Krav 4.1.1 Tjenesten (M)

**Lest og akseptert.**

Appen leveres for iOS (15.0+) og Android (8.0 API 26+), utviklet i React Native
med delt TypeScript-kildekode. Native modules benyttes der hardware-tilgang
eller plattform-spesifikk UX krever det (f.eks. ML Kit / Apple Translation
Framework for lokal oversettelse, Haptic feedback, StatusBar-tilpasning).

Kundens tekniske plattform: appens backend (Strapi CMS) kjøres i kundens eget
driftsmiljø eller en skyløsning etter avtale (Azure, Digdir Sky, eller
selv-hosting på Oslo kommunes infrastruktur).

#### Krav 4.1.2 Vedlikehold (B)

**Ønsket løsning kan leveres uten avvik.**

Vi tilbyr vedlikeholdsavtale over 3 år med automatisk fornyelse for 1 år av
gangen, oppsigbar med 3 måneders varsel (jf. SSA-T § 2.2).

**Innhold i vedlikehold:**
- Feilretting og bug fixes
- Sikkerhets­oppdateringer (React Native versjoner, tredjeparts­biblioteker)
- Plattform­oppdateringer (årlig iOS + Android SDK-oppgraderinger)
- Drift og overvåking av backend-server
- Innmelding av feil via integrert rapporterings­kanal i appen
- Push-oppdatering for mindre endringer i innhold via Strapi uten nytt app-release
- Respons­tid: **maksimalt 24 timer** på virkedager (bedre enn ønsket 48 timer)

Vedlikeholdsavtalen inkluderer ikke **videreutvikling** av nye funksjoner —
det prises på timebasis og faktureres etter Bilag 7.

#### Krav 4.1.3 Trening av KI-modell (M)

**Lest og akseptert.**

Dersom lokal KI-modell benyttes (f.eks. for oversettelse, jf. krav 4.2.3),
skjer all trening på eksterne, offentlige korpus *før* modellen pakkes med
appen. Modellen trenes **ikke** på Kundens data eller brukerdata fra appen.

Modeller som vurderes:
- Apple Translation Framework (iOS 17.4+) — trenet av Apple, kjører on-device
- Google ML Kit Translation (Android) — trenet av Google, kjører on-device
- Alternativt: Helsinki-NLP Marian-modell via ONNX Runtime — forhåndstrenet
  åpen modell

#### Krav 4.1.4 Generelle krav ved bruk av KI (B)

**Ønsket løsning kan leveres uten avvik.**

Vi følger prinsippene for sporbar og kvalitetssikret KI-bruk i utvikling:

- **Kontrollert bruk:** KI-assistert koding (Copilot/Claude) brukes kun for
  å akselerere implementasjonen av kjente mønstre. Leverandør beholder full
  oversikt over kode, strings, arkitektur og avhengigheter.
- **Arkitektur-følgsomhet:** KI-generert kode følger prosjektets etablerte
  struktur. Ingen nye komponenter eller moduler genereres uten eksplisitt
  gjennomgang.
- **Code review:** All KI-generert kode kvalitetssikres gjennom manuell
  gjennomgang før merge til hovedgren.
- **Ingen hardkoding av tekst:** All brukerrettet tekst lagres i sentraliserte
  ressursfiler (`src/i18n/no.ts`), aldri inline i komponenter.
- **Automatisk deteksjon:** ESLint-regler konfigureres til å advare mot
  hardkodet tekst og dupliserte strings.

Ved brudd på disse prinsippene utbedres dette av Leverandør uten ekstra
kostnad for Oppdragsgiver.

#### Krav 4.1.5 Opplæring (M)

**Lest og akseptert.**

Opplæring tilbys i tre former:
1. **Oppstarts-workshop** (4 timer, fysisk eller video): gjennomgang av
   Strapi-administrasjon, innholds­oppdatering, statistikk­henting.
2. **Skriftlig dokumentasjon:** detaljert brukerhåndbok for backend-admin
   (PDF + online, søkbart).
3. **Teknisk bistand ved behov:** timebasert support via e-post/chat i
   vedlikeholdsperioden.

Opplæringen er priset separat i Bilag 7.

#### Krav 4.1.6 Ferdigstilling (M)

**Lest og akseptert.**

Leverandør er ansvarlig for å få den nye appen publisert i Apple App Store og
Google Play Store i Oppdragsgivers Developer-kontoer. Dette inkluderer:
- App Store Connect oppsett (metadata, screenshots, beskrivelse)
- Google Play Console oppsett (metadata, screenshots, policy)
- Håndtering av review-prosesser og tilbakemeldinger
- Versjonshåndtering og release-noter

Leverandør har tidligere publisert apper i begge butikker for Equinor, NLR
(TryggDrift) og Easee (EaseePay + Easee-appen).

#### Krav 4.1.7 Brukermanual (M)

**Lest og akseptert.**

Vi leverer to brukermanualer:
1. **Slutt­bruker­manual** med illustrasjoner — klar for publisering på
   RUSinfos nettside, forklarer appens funksjoner modul for modul.
2. **Admin-manual** for RUSinfo-personell — dekker innholdsredigering,
   statistikk og feilhåndtering.

Begge leveres som PDF og Markdown (versjonert i git) senest ved leveringsdag.

#### Krav 4.1.8 Åpen kildekode eller kundeeid (M)

**Lest og akseptert. Løsningen beskrives.**

Hele appens kildekode overføres til Oppdragsgivers eierskap ved kontrakts­
slutt. Vi bruker følgende praksis:
- **Git-repository** opprettet hos Oppdragsgiver (GitHub, GitLab eller Azure
  DevOps etter eget valg).
- Leverandør commiter direkte til Oppdragsgivers repo gjennom hele prosjektet
  — ingen mellomlagring hos Leverandør.
- Kildekoden lisensieres under **MIT-lisens** (åpen kildekode) eller annet
  vilkår Oppdragsgiver velger, men Oppdragsgiver har alltid full rett til
  koden.
- Alle tredjeparts­avhengigheter dokumenteres i Bilag 10 med lisenser.

Ved avtaleslutt kan Oppdragsgiver selv velge å åpne kildekoden som
open source eller holde den lukket — valget er kundens.

#### Krav 4.1.9 Reklamefri (M)

**Lest og akseptert.**

Appen skal ikke inneholde reklame, tracking-pixels, analytikk-sporing mot
tredjeparter, eller remarketing-komponenter.

Eneste "telemetri" er frivillig, anonymisert statistikk som sendes til
Oppdragsgivers egen Strapi-server (ingen Google Analytics, Firebase
Analytics, osv.).

#### Krav 4.1.10 Språk (M)

**Lest og akseptert.**

Appen leveres på norsk bokmål. Alle tekster er lagret i sentralisert
oversettelses­fil (`src/i18n/no.ts`) som muliggjør rask lokalisering til
andre språk senere hvis ønskelig.

For innhold som styres fra Strapi (artikler, dagens tema, info-tekster)
administrerer RUSinfo-personell språk­versjoner direkte i admin-UI.

#### Krav 4.1.11 Funksjoner som kan tas ut og priseffekt (M)

**Lest og akseptert.**

Følgende funksjoner kan tas ut av leveransen hvis budsjettet krever det,
med anslått priskonsekvens per modul:

| Funksjon | Estimert reduksjon | Konsekvens |
|---|---|---|
| Ny: Kartleggings­verktøy (kalender) | 60 000 NOK | Fjerner planleggings­modul — tidsbruk-logging forblir via dagbok |
| Ny: Motivasjonsvegg (bilde-galleri) | 30 000 NOK | Personliggjøring fjernes — kan introduseres senere |
| Ny: Bildebibliotek | 20 000 NOK | Standard bakgrunner i stedet for egne valg |
| Lokal AI-oversettelse | 30 000 NOK | App kun på norsk (ingen on-device oversettelse) |
| Tema/fargepalett-velger (utover grayscale) | 20 000 NOK | Forenklet — kun ett tema + grayscale |
| Opplæring (workshop) | 15 000 NOK | Kun skriftlig manual + video |

**Basis-leveransen** (alle M-krav + kjernefunksjonaliteten i HAP tilpasset for
kokain) kan ikke tas ut uten å bryte overordnet behov.

### § 4.2 Funksjonelle krav

#### Krav 4.2.1 Appens oppbygging (B)

**Leverandøren tilbyr en alternativ løsning som oppfyller Kundens
overordnede behov.**

Vi beholder **strukturen** i HAP fullt ut:

- **Onboarding-flyt:** bruker velger modul (syklisk / jevnlig / lære om kokain)
  og startdato ved første oppstart
- **Tab-basert hovednavigasjon:** fem tabs tilsvarende HAP
  - Hjem (prestasjoner, tidtaker, dagens tema, besparelse)
  - Dagbok (triggerdagbok + tekstdagbok + nye maler: ukesmål, kriseplan, FAK)
  - Statistikk (abstinensgraf, trigger-oversikt)
  - Prestasjoner (oppnådde + kommende)
  - Info (artikler fra Strapi)
- **Modal-basert innstillinger** (tilsvarende HAPs reset, settings, about)
- **Kontekstuelle modals** for dagboks­oppføring, crisisplan, trigger-valg
- **Backend-server** tilsvarende HAPs Strapi-oppsett — samme innholds­modell
  og samme admin-UI

**Forskjellen:** rammeverket er React Native i stedet for Ionic/Vue. Dette
påvirker ikke appens struktur eller informasjonsarkitektur, men gir
sluttbrukerne native-komponenter og smidigere UX.

**Universell utforming:** appen oppfyller Oslo kommunes krav til WCAG 2.1
AA og EUs webdirektiv (WAD). Konkret:
- Alle komponenter har korrekte `accessibilityLabel`, `accessibilityRole`,
  `accessibilityState` for VoiceOver (iOS) og TalkBack (Android)
- Kontrastkrav ≥ 4.5:1 for normal tekst, ≥ 3:1 for stor tekst
- Dynamic Type-støtte (følger systemets tekststørrelse)
- Støtte for Reduce Motion-preferanse
- Full navigerbar uten å kunne se skjermen (skjermleser-tester)

Ekstern UU-revisjon gjennomføres av **Funka Nu** eller **MediaLT** (inkludert
i tilbudet som underleverandør) før publisering.

#### Krav 4.2.2 Appens funksjoner (B)

**Ønsket løsning kan leveres uten avvik.**

Vi leverer alle etterspurte funksjoner:

**Beholdte fra HAP (kun visuell tilpasning):**

| Funksjon | Kommentar |
|---|---|
| Triggerdagbok med egne triggere | Port fra HAP |
| Tidtaker siden siste gangs bruk | Port fra HAP |
| Nullstill-funksjoner (alle + enkeltvis) | Port fra HAP |
| Avatar | Port fra HAP, ny standard-avatar for kokain-kontekst |
| Info-felt styrt av RUSinfo fra Strapi | Port fra HAP |
| Redigerbar tekstboks fra RUSinfo | Port fra HAP |
| Lenker til RUSinfos tjenester (tlf, chat, FAQ) | Port fra HAP |

**Tilpassede fra HAP:**

| Funksjon | Tilpasning |
|---|---|
| Prestasjoner | Nye parametre for kokain-kontekst, valgfrie temaer, oppgraderbar visning |
| Abstinensgraf | Tilpasset for kokain + kombo alkohol/kokain; ulik graf i modul 1 (slutte helt) og modul 2 (redusere) |
| Dagbokfunksjon | Tagging på innlegg + nye maler: ukesmål+evaluering, kriseplan, FAK-skjema |
| Dagens/ukens tema | Daglig i modul 1 og 2 første uker, så ukentlig |
| Sparekalkulator | Tilpasset kokain-pris; visuell oversikt over besparelse over tid |

**Fem helt nye funksjoner:**

1. **Kartleggings­verktøy (kalender)**
   Bruker legger inn planlagt kokain-bruk per periode, loggfører faktisk
   bruk, får visuell sammenligning. Native kalender-komponent med
   `react-native-calendars`. Lagres lokalt.

2. **Kriseknapp → kriseplan**
   Synlig fra alle hovedskjermer (flytende knapp). Direkte navigasjon til
   kriseplan-mal i dagboken. Default kriseplan-tekst hentes fra Strapi og
   redigeres av RUSinfo; bruker tilpasser sin personlige kriseplan over den.

3. **Tema- og fargepalett-velger + grayscale-modus**
   Bruker velger fargepalett (3–5 forhåndsdefinerte) eller aktiverer
   grayscale for øyekomfort. Implementeres som React Context + theme-
   provider med typet fargesystem. Lagres lokalt.

4. **Bildebibliotek**
   30–50 kuraterte bakgrunnsbilder (abstrakte, natur, ro) som bruker kan
   velge for hovedskjermer og motivasjonsvegg. Bildene hentes fra Strapi
   (CDN-levert) og caches lokalt etter første visning.

5. **Motivasjonsvegg**
   Egen view der bruker komponerer tekst + bilde fra biblioteket.
   Eksporterbar som JPEG for lagring på enheten eller deling.
   Motivasjonsvegg lagres lokalt (ikke sendt til server — anonymitet).

Alle nye funksjoner utvikles i samme stil og med samme interaksjonsmønstre
som eksisterende HAP-funksjoner, for at brukeren opplever appen som en
helhet.

#### Krav 4.2.3 Teknologi (B)

**Leverandøren tilbyr en alternativ løsning som oppfyller Kundens
overordnede behov. Avvik og begrunnelser er beskrevet nedenfor.**

**Felles kodebase:** ja, React Native har én TypeScript-kodebase som
kompileres til både iOS og Android. Ingen duplisering av forretningslogikk.

**Rammeverk levetid 5–7 år:** React Native har eksistert siden 2015, er
aktivt utviklet av Meta, og har dokumentert roadmap langt utover 7 år.
Major production apps: Instagram, Shopify, Discord, Microsoft Office,
Coinbase, Airbnb (kom tilbake), samt mange norske produksjons­apper. Dette
oppfyller ønsket med god margin.

**Backend-server:** vi beholder **Strapi** (samme som HAP), slik at
RUSinfo får kontinuitet i innholdsadministrasjon og statistikk­henting.
Strapi selv-hostes i Oppdragsgivers eget driftsmiljø (f.eks. Azure App
Service, Digdir Sky eller Oslo kommunes eksisterende infrastruktur) —
ikke i Leverandørens domene, slik som i dagens HAP-oppsett.

**Lydfiler:** ja, React Native støtter lydavspilling via `react-native-sound`
eller native `AVAudioPlayer` / `MediaPlayer` API. Lyd-assets kan være
lokale i app-bundelen eller strømmes fra Strapi.

**Lokal AI-oversettelsesmodell:**
vi foreslår **native plattform­løsninger** som primær implementasjon:
- **iOS 17.4+:** Apple Translation Framework — helt on-device, gratis,
  Apple-vedlikeholdt, støtter norsk.
- **Android:** Google ML Kit Translation API — on-device, gratis,
  Google-vedlikeholdt, støtter norsk.

Fordelen er null vedlikeholds­byrde, ingen ekstern avhengighet, null
datatrafikk. Alternativ: Helsinki-NLP Marian-modell via ONNX Runtime,
kryssplattform, pakket med appen.

**Avvik fra "samme rammeverk som HAP":**
- HAP bruker Ionic 7 + Vue 3. Vi bruker React Native.
- **Begrunnelse for avviket** (allerede beskrevet i Overordnet
  løsningsbeskrivelse øverst): bedre UX for sårbar målgruppe, bredere
  vedlikeholds­utvalg, lengre dokumentert levetid.
- **Konsekvens:** appens *struktur* er identisk, men den underliggende
  kilde­koden må bygges fra bunnen i RN. Dette er priset inn i Bilag 7.

### § 4.3 Personvern og informasjonssikkerhet

#### Krav 4.3.1 Personvern (B)

**Ønsket løsning kan leveres uten avvik.**

Løsningen utformes slik at den *ikke* behandler personopplysninger jf.
GDPR art. 4, og utløser dermed ikke krav om DPIA eller databehandler­
avtale. Konkret:

- **Ingen behandling av personopplysninger:**
  Appen sender ingen IP-adresser, enhets-ID-er, tids­stempler eller
  andre metadata som kan spores til enkeltpersoner. Backend (Strapi)
  er konfigurert til *kun* å levere innhold (artikler, konfig) ut —
  innkommende trafikk lagres ikke utover det strengt nødvendige for
  caching. Apache/Nginx access-logs aktiveres ikke, eller ruteres
  gjennom en anonymiserende reverse proxy som stripper IP.
- **Anonymiserte data:**
  All frivillig statistikk som bruker sender (f.eks. "jeg fullførte
  modul 1") er anonym og ikke-koblbar til person. Ingen brukerkonto,
  ingen innlogging, ingen session tokens.
- **Ingen logging av identifiserende metadata:**
  Ingen IP-logg, ingen enhetsinfo, ingen tidsstempler på individ-nivå.
- **Ingen tredjepartsbehandling:**
  Ingen analytics (ikke Firebase, ikke Google Analytics, ikke Sentry
  med IP-logg). Feilrapportering via anonym "send feedback"-knapp i
  appen som bruker selv velger å bruke.
- **Varsling ved endringer:**
  Hvis fremtidig endring skulle introdusere behandling av
  personopplysninger, varsles Oppdragsgiver skriftlig og behandling
  påbegynnes ikke før databehandleravtale er inngått.

### § 4.4 Krav som gjelder dersom løsningen behandler personopplysninger

**Merknad:** Siden ønsket løsning (§ 4.3.1) leveres uten avvik og *ikke*
behandler personopplysninger, er §§ 4.4.1–4.4.4 i praksis ikke utløst.
Vi bekrefter likevel aksept av samtlige krav for det tilfellet at
Oppdragsgiver senere velger å innføre behandling av personopplysninger:

#### Krav 4.4.1 Databehandleravtale (M)
**Lest og akseptert.**

#### Krav 4.4.2 Personvern i egen virksomhet (M)
**Lest og akseptert.**

Leverandør har dokumenterte rutiner for personvern gjennom tidligere
arbeid med PCI DSS (Easee EaseePay) og kan levere dokumentasjon på
forespørsel.

#### Krav 4.4.3 Bistand ved risikovurdering (M)
**Lest og akseptert.**

#### Krav 4.4.4 Underleverandører (M)
**Lest og akseptert.**

Leverandør vil kun benytte underleverandør (Funka Nu eller MediaLT for
UU-revisjon) med skriftlig samtykke fra Kunden. Underleverandøren får
ikke tilgang til personopplysninger — kun til app-UI for teknisk
tilgjengelighets-testing.

---

## Dokumentasjon som medfølger leveransen

- Arkitektur­dokument (oppdatert gjennom prosjektet)
- API-dokumentasjon (OpenAPI 3.0 for Strapi-endepunkter)
- Komponent-bibliotek­dokumentasjon (Storybook eller lignende)
- Brukerhåndbok for slutt­bruker
- Admin-håndbok for RUSinfo-personell
- Test­rapport (unit + integration + e2e + UU)
- DevOps-dokumentasjon (deployment, backup, monitoring)
- Bilag 10: Tredjeparts­komponenter og lisenser

---

*[Dokument under arbeid — skal kvalitetssikres og finpusses før innsending]*
