---
title: Bilag 2 — Leverandørens løsningsspesifikasjon
tender: 2026-105336
status: UTKAST 2 — forankret i fungerende prototype
---

# Bilag 2 — Leverandørens løsningsspesifikasjon

**Leverandør:** Asbjørn Rørvik (org.nr 820252632)
**Anskaffelse:** Utvikling av selvhjelpsapp for personer som bruker kokain
**Sak:** 2026-105336 · Oslo kommune, Velferdsetaten / RUSinfo
**Dato:** 24. april 2026

---

## 1. Sammendrag

Leverandøren tilbyr en komplett selvhjelpsapp med samme *struktur, informasjonsarkitektur og backend-modell* som dagens HAP, men bygget i React Native. Tilbudet er forankret i en **fungerende klikkbar prototype** (React Native 0.81 + Expo 54) som allerede implementerer onboarding, PIN/biometri-lås, hovednavigasjon med fem tabs, dagbok med triggerlogg, statistikkmoduler, kriseplan med pusteøvelse og ringfunksjon, motivasjonsvegg, kartleggingskalender, palett-/grayscale-velger, lokal lagring og haptisk respons. Prototypen er *så nær produksjonsklar som mulig uten tilkoblet backend*.

**Prøv prototypen direkte i nettleseren:**
- URL: `https://asbjornrorvik.dev/no/oppdrag/rusinfo-app`
- Passord: `rusinfo2026`

Prototypen er utgangspunktet — ikke fasiten. Alle skjermer, tekster, palletter og flyter kan og vil bli tilpasset RUSinfos faglige innspill, målgruppetester og designvalg i prosjektets designfase.

**Kjerneavvik fra ønsket løsning:** rammeverket er React Native i stedet for Ionic/Vue. Begrunnelse og konsekvenser er beskrevet under krav 4.2.3.

---

## 2. Overordnet løsningsbeskrivelse

### 2.1 Applikasjonsarkitektur

Appen leveres som én React Native-kodebase (TypeScript) som kompileres til både iOS og Android. Strukturen speiler HAP 1:1:

- **Onboarding-flyt** (7 steg): modulvalg → startdato → brukstatistikk (frekvens + kostnad) → personvern-løfte → sikkerhetsvalg → PIN-oppsett → nødkontakt. *Implementert i prototypen i `OnboardingScreen.tsx`.*
- **Sikkerhetslås** før tilgang (valgfri): PIN + biometri via enhetens egen Face ID/Touch ID. *Implementert i `SecurityCheckScreen.tsx` med `expo-local-authentication`.*
- **Tab-basert hovednavigasjon** med fem tabs: Hjem, Dagbok, Oversikt (statistikk), Prestasjon, Info. *Implementert i `RootNavigator.tsx` via React Navigation bottom tabs.*
- **Modale skjermer** over tabs: Kriseplan (bottom sheet), Motivasjonsvegg, Kartleggingskalender, Artikkel-leser, Dagboks-innleggsskjerma, Innstillinger. *Alle implementert som egne native-stack-skjermer.*
- **Global flytende krise­knapp** (CrisisFab) synlig fra alle hovedskjermer, med pust-animasjon. *Implementert i `CrisisFab.tsx` og montert globalt.*

### 2.2 Backend og innholds­styring

Backend beholdes på **samme tekniske modell som HAP** — et headless CMS (Strapi eller tilsvarende) som RUSinfo redigerer via web-admin. Innholdstyper: artikler, info-tekster, ukens/dagens tema, default kriseplan-tekst, bildebibliotek, tredjeparts­lenker. Serveren eies og driftes av Oppdragsgiver (Azure, Digdir Sky eller Oslo kommunes eksisterende infrastruktur) — ikke i Leverandørens domene.

Kommunikasjonen app ↔ server er enveis henting av innhold + valgfri anonym innsending av aggregert statistikk. Ingen brukeridentifikasjon. Se §4.3.1 for personvern.

### 2.3 Teknologi­valg (kort)

| Lag | Valg | Begrunnelse |
|---|---|---|
| UI-rammeverk | React Native 0.81 + Expo 54 | Native UI, 5–7+ års levetid, stort norsk utvikler­marked |
| Språk | TypeScript | Typesikkerhet, redusert feilrate |
| Navigasjon | React Navigation (bottom tabs + native stack) | Standard, vedlikeholdt av Expo-teamet |
| Lokal lagring | AsyncStorage + SQLite ved behov | Enkel, anonym, kryptert med enhets-keychain der OS-en støtter det |
| Biometri/lås | `expo-local-authentication` | Face ID / Touch ID / Android BiometricPrompt |
| Haptikk | `expo-haptics` | Tilgjengelig feedback for alle hovedinteraksjoner |
| Grafikk | `react-native-svg`, `expo-linear-gradient` | Brukes til abstinensgraf, pie charts, tidslinje |
| Dato | `date-fns` med norsk lokalisering | Kjent, lett, god i18n-støtte |
| Ikoner | `lucide-react-native` | Åpen, konsistent, lett |
| Fonter | Instrument Serif + Inter | Varme, rolige typografiske uttrykk for sårbar målgruppe |
| Backend | Strapi (eller tilsvarende headless CMS) | Samme modell som HAP — RUSinfo får kontinuitet |
| Oversettelse on-device | Apple Translation Framework (iOS 17.4+) / Google ML Kit (Android) | Gratis, on-device, ingen datatrafikk |

Alle valg er allerede implementert og kjørende i prototypen (`prototype/package.json`).

---

## 3. Svar på krav i Bilag 1

### § 4.1 Generelle krav

#### Krav 4.1.1 Tjenesten (M)

**Lest og akseptert.**

Appen leveres for iOS (15.0+) og Android (8.0 / API 26+), utviklet i React Native med delt TypeScript-kildekode. Native moduler benyttes der hardware-tilgang eller plattform-spesifikk UX krever det (biometri, haptikk, lokal oversettelse).

**Krav til Kundens tekniske plattform:**
- Én webserver (Linux, 2 vCPU / 4 GB RAM) for Strapi CMS + Postgres (kan være samme host eller separat)
- HTTPS med gyldig sertifikat (Let's Encrypt eller Oslo kommunes interne CA)
- Apple Developer-konto og Google Play Console-konto eid av RUSinfo/Velferdsetaten
- Git-hosting (GitHub, GitLab eller Azure DevOps) for kildekode-eierskap

Leverandør bistår med oppsett.

#### Krav 4.1.2 Vedlikehold (B) — **Ønsket løsning kan leveres uten avvik.**

Vedlikeholdsavtalen følger SSA-T og dekker 3 år med automatisk 1-årig fornyelse, oppsigbar med 3 måneders varsel.

**Innhold:**
- Feilretting og feilsøking i app + backend-server
- Sikkerhets­oppdateringer (React Native-versjoner, Expo-oppgraderinger, Strapi-patches, alle tredjeparts­biblioteker)
- Årlige plattform­oppgraderinger (iOS SDK, Android target-API) for å beholde butikk-godkjenning
- Drift og overvåking av Strapi-server (helsesjekk, backup, logg-rotasjon)
- **Innmelding av feil direkte fra appen:** prototypen er forberedt med en innebygget "send feedback"-kanal som posterer anonymt til Strapi (aktiveres i produksjon)
- Push av innholds­endringer via Strapi uten nytt app-release
- **Respons­tid: 24 timer på virkedager** — bedre enn ønsket 48 timer

Videre­utvikling av nye funksjoner prises separat etter Bilag 7. Oppdragsgiver får skriftlig estimat (timer × timepris) og må godkjenne før arbeid starter.

**Vedlegg:** Vedlikeholds­avtale leveres som egen signert SSA-V light eller som del av hovedkontrakt — etter Kundens preferanse.

#### Krav 4.1.3 Trening av KI-modell (M)

**Lest og akseptert.**

Appen bruker ingen generativ KI i sluttproduktet. Lokal oversettelsesmodell (se 4.2.3) er ferdig­trent av plattform­leverandør (Apple/Google) før modellen pakkes med appen. Modellen trenes **ikke** på Kundens eller brukernes data.

KI-assistent (Claude/Copilot) brukes i **utviklingsfasen** som kodeverktøy — aldri som del av produktets kjøretids­logikk. Se 4.1.4.

#### Krav 4.1.4 Generelle krav ved bruk av KI (B) — **Ønsket løsning kan leveres uten avvik.**

Konkrete tiltak for kontrollert, sporbar og kvalitets­sikret KI-bruk i utvikling:

| Prinsipp | Praksis |
|---|---|
| Kontrollert bruk | KI genererer kun kjente mønstre (komponenter, tester, boilerplate). Arkitektur­beslutninger tas alltid av Leverandør manuelt. |
| Følger definert struktur | `.cursorrules` / `CLAUDE.md` i repo definerer fil­struktur, navne­konvensjoner og regler. KI-kode som bryter med dette avvises. |
| Code review | All KI-generert kode gjennomgås av Leverandør manuelt før commit. |
| Kontroll av tekststrenger | Alle brukerrettede strings samles i `src/i18n/no.ts`. ESLint-regel `no-inline-string` flagger hardkodet tekst. Tekstfiler versjoneres i git og kan eksporteres til RUSinfo for gjennomgang. |
| Sporbarhet | Hver commit merkes `[ai]` der KI har vært primærforfatter, slik at RUSinfo kan granske andelen. |
| Dokumentasjon | Byggeprosess, arkitektur og endrings­historikk dokumenteres i `/docs` og i repoets README. |

Brudd på disse prinsippene utbedres uten ekstra kostnad.

#### Krav 4.1.5 Opplæring (M)

**Lest og akseptert.**

| Form | Innhold | Varighet |
|---|---|---|
| Oppstarts-workshop (fysisk eller Teams) | Gjennomgang av Strapi-admin: redigere innhold, dagens tema, default kriseplan, bildebibliotek, hente ut statistikk | 4 timer |
| Skriftlig admin-manual | PDF + Markdown i git, med skjermbilder | Leveres ved go-live |
| Teknisk bistand i vedlikeholdsperioden | E-post/chat, timebasert, etter Bilag 7 | Ved behov |

Priset separat i Bilag 7.

#### Krav 4.1.6 Ferdigstilling (M)

**Lest og akseptert.**

Leverandør håndterer hele publiserings­løpet i Oppdragsgivers egne Apple Developer- og Google Play-kontoer:

- App Store Connect: metadata, screenshots, beskrivelse, aldersvurdering, eksport-compliance
- Google Play Console: metadata, screenshots, Data Safety-skjema, policy-samsvar
- Håndtering av review-prosessen og svar på eventuelle avslag
- Versjons­nummerering og release-noter

Leverandør har tidligere vært med på publisering til App Store og Google Play gjennom arbeid hos Netpower (Kolumbus, NLR TryggDrift) og Bouvet (Easee), og har i tillegg egenhendig publisert og drifter Supportify-integrasjonen.

#### Krav 4.1.7 Brukermanual (M)

**Lest og akseptert.**

To manualer leveres ved go-live:

1. **Sluttbruker­manual** (PDF + web-publisering på rusinfo.no): illustrert innføring modul for modul, inkludert hvordan bruker aktiverer lås, hvordan kriseplanen fungerer, hvordan motivasjons­veggen bygges.
2. **Admin-manual** for RUSinfo-personell (PDF + Markdown i git): Strapi-redigering, statistikk­henting, feilhåndtering, release-rutiner.

Begge versjoneres i git slik at nye versjoner alltid ligger oppe ved app-oppdateringer.

#### Krav 4.1.8 Åpen kildekode eller kundeeid (M)

**Lest og akseptert.**

Hele appens kildekode er Oppdragsgivers eiendom. Praksis:

- Git-repo opprettet hos Oppdragsgiver (GitHub, GitLab eller Azure DevOps) fra dag 1. Leverandør commiter direkte til Kundens repo — ingen mellomlagring.
- Ved kontraktsslutt har Oppdragsgiver fullstendig tilgang, eierskap og rett til videre­utvikling, eventuelt med ny leverandør.
- Lisens: Oppdragsgiver velger (MIT/Apache-2.0 for åpen kildekode, eller lukket proprietær).
- Alle tredjeparts­avhengigheter listes i **Bilag 10** med lisens og versjon. Kun lisenser som er kompatible med offentlig bruk benyttes (MIT, BSD, Apache-2.0, ISC).

#### Krav 4.1.9 Reklamefri (M)

**Lest og akseptert.**

Appen inneholder:

- **Ingen reklame** (ingen AdMob, ingen banner, ingen sponset innhold)
- **Ingen tracking-pixler** eller tredjeparts analytikk (Google Analytics, Firebase Analytics, Segment, Mixpanel — ingen av disse)
- **Ingen remarketing** eller attribution-SDK-er

Eneste telemetri er frivillig, anonym statistikk til RUSinfos egen Strapi (ingen eksterne mottakere).

#### Krav 4.1.10 Språk (M)

**Lest og akseptert.**

Appen leveres på **norsk bokmål**. All brukerrettet tekst er sentralisert i `src/i18n/no.ts`, som gjør lokalisering til nynorsk/engelsk/andre språk trivielt senere dersom RUSinfo ønsker det.

Innhold som RUSinfo styrer fra Strapi (artikler, ukens tema, default kriseplan) administreres på norsk i admin-UI; flerspråklig Strapi-struktur er forberedt i datamodellen for framtidig utvidelse.

#### Krav 4.1.11 Funksjoner som kan tas ut og priseffekt (M)

**Lest og akseptert.** Oversikt over reduserbare komponenter med estimert priseffekt:

| Funksjon | Estimert reduksjon (NOK) | Konsekvens |
|---|---|---|
| Kartleggings­verktøy (kalender, planlagt vs. faktisk) | 60 000 | Fjerner planleggings­modulen; tidsbruk-logging beholdes i dagboken |
| Motivasjonsvegg (galleri + komposisjon) | 35 000 | Personliggjøring via galleri fjernes; standard-bakgrunner beholdes |
| Bildebibliotek (kuratert bakgrunns­sett) | 20 000 | Standard bakgrunner istedenfor valgbare |
| Lokal AI-oversettelse | 30 000 | App kun på norsk uten on-device oversetting |
| Palett-velger utover grayscale | 20 000 | Ett tema + grayscale. Grayscale beholdes alltid (UU-krav). |
| Krise-chat (Kord AI anonym samtale) | 40 000 | Kriseplan beholdes; chat-funksjonen utgår |
| Oppstarts-workshop | 15 000 | Kun skriftlig manual + videoopptak |
| KI-assistent-chat generelt | 25 000 | Hvis RUSinfo ikke ønsker eksperimentell KI-støtte |

Disse er uavhengige og kan tas ut i kombinasjon. Kjerne­funksjoner (onboarding, sikkerhet, dagbok, oversikt, prestasjoner, info, kriseknapp, default kriseplan, publisering, manualer) kan ikke tas ut uten å bryte oppdragets overordnede behov.

---

### § 4.2 Funksjonelle krav

#### Krav 4.2.1 Appens oppbygging (B) — **Leverandøren tilbyr en alternativ løsning som oppfyller Kundens overordnede behov.**

**Avvik:** rammeverk (React Native i stedet for Ionic 7/Vue 3). *Struktur, IU, XU og backend-modell er identisk med HAP.*

**Begrunnelse:** se krav 4.2.3 nedenfor (rammeverk­valg).

**Konsekvens for IU/XU/backend:** ingen. Brukeropplevelsen er mer *native*, ikke annerledes.

**Faktisk oppbygging (som implementert i prototypen):**

| Lag | HAP | Vår løsning |
|---|---|---|
| Onboarding | Modul­valg + startdato | **Utvidet 7-stegs flyt:** modul (stoppe helt / redusere / lære) → startdato med kalender → frekvens + kostnad per gang → personvern­løfte → sikkerhetsvalg → PIN → nødkontakt. `OnboardingScreen.tsx`. |
| Hovednavigasjon | Tab-basert, 5 seksjoner | **5 tabs:** Hjem, Dagbok, Oversikt, Prestasjon, Info. `RootNavigator.tsx`. |
| Modaler | Innstillinger, reset, osv. | Samme prinsipp — modale native-stack-skjermer for Motivasjonsvegg, Kartlegging, Artikkel, Dagboks­innlegg, Innstillinger, Chat, og Kriseplan som bottom sheet. |
| Global krise­knapp | Tilgjengelig fra alle skjermer | **Flytende FAB** nederst til høyre med pust-animasjon, synlig på alle hoved­skjermer. `CrisisFab.tsx`. |
| Backend | Strapi headless CMS | **Samme modell** — Strapi, selv-hostet hos RUSinfo. Innholdstyper speiler HAP. |

**Universell utforming (WCAG 2.1 AA + EUs webdirektiv):**
- `accessibilityLabel`, `accessibilityRole`, `accessibilityState` på alle interaktive komponenter (for VoiceOver/TalkBack)
- Kontrast ≥ 4.5:1 for normal tekst, ≥ 3:1 for stor tekst — begge pallettene i prototypen er verifisert
- **Grayscale-modus** som alternativt tema (øyekomfort og forutsigbar kontrast) — implementert i `ThemeContext.tsx` og kan aktiveres fra Innstillinger
- Dynamic Type-støtte (følger systemets tekststørrelse)
- Reduce Motion-respekt for pust-animasjoner og overganger
- Full tastatur-/skjermleser-navigasjon testet

**Ekstern UU-revisjon** inkluderes i tilbudet og utføres av **Funka Nu** eller **MediaLT** (underleverandør) før publisering til butikkene.

#### Krav 4.2.2 Appens funksjoner (B) — **Ønsket løsning kan leveres uten avvik.**

Alle etterspurte funksjoner leveres. Oversikt med prototype-forankring:

**A. Beholdte fra HAP (kun visuell tilpasning)**

| Funksjon | Status i prototype | Filreferanse |
|---|---|---|
| Triggerdagbok med egne triggere | **Implementert.** 3-stegs flyt (type → utfall → kategori + fritekst). Default kategorier: Sosialt, Stress, Kjedsomhet, Alene, Fest. Egne kategorier kan legges til i prod. | `DiaryEntryScreen.tsx` |
| Tidtaker siden siste gangs bruk | **Implementert.** Beregnes dynamisk fra siste "Bruk"-logg eller startdato. Vises prominent på Hjem. | `HomeScreen.tsx`, `storage.ts:getStats` |
| Nullstill alle + enkeltvis | **Implementert.** "Nullstill alt" i Innstillinger med bekreftelse; enkelt­innlegg kan slettes fra dagbok-detalj. | `SettingsScreen.tsx:onReset`, `storage.ts:clearAll` |
| Avatar | **Implementert.** Lite avatar-symbol oppe til venstre på Hjem; åpner Motivasjonsvegg. Design er valgfritt — tilpasses RUSinfos retningslinjer. | `HomeScreen.tsx` |
| Info-felt styrt av RUSinfo (via Strapi) | **Implementert som UI;** kobles til Strapi-endepunkt i prod. "Nå for deg"-karusell på Hjem + hele Info-tab med artikler og temaer henter fra CMS. | `HomeScreen.tsx`, `InfoScreen.tsx` |
| Redigerbar tekstboks for meldinger til brukere | Samme Strapi-mekanisme — et tekst-felt per modul som vises som banner/kort. Leveres i produksjons­versjonen. | (planlagt i Info-tab) |
| Direkte lenker til RUSinfos tjenester | **Implementert.** Kriseplan har "Ring RUSinfo 08588" (native tel: lenke). Info-tab vil lenke til chat og FAQ på rusinfo.no. | `KriseplanScreen.tsx:handleCall` |

**B. Tilpassede fra HAP**

| Funksjon | Tilpasning | Status | Filreferanse |
|---|---|---|---|
| Prestasjoner | Endrede parametre for kokain (ikke cannabis). Tidsakse 0–12 uker + "12+ uker". Neste-milepæl vises som "NESTE". Oppgraderbart tema per palett. | **Implementert** som tidslinje med milepæls­ikoner | `PrestasjonScreen.tsx` |
| Abstinensgraf / fase­visualisering | Tilpasset kokain-forløp: Akutt (0–1 uke), Tidlig (1–2), Oppbygging (2–6), Konsolidering (6–12), Vedvarende (12+). Modul 1 (slutte helt) vs. modul 2 (redusere) får ulike grafer ved at fase­teksten omskrives og måling endres fra "dager uten bruk" til "dager innenfor plan". | **Implementert modul 1-graf**; modul 2-variant bygges i produksjon | `OversiktScreen.tsx:phases` |
| Dagbok med tagging | Hver innlegg får kategori-tagg; Bruk-innlegg merkes "NULLSTILLER" og synliggjør at telleren starter på null. | **Implementert** | `DagbokScreen.tsx`, `DiaryEntryScreen.tsx` |
| Ukens mål + evaluering | Egen dagboks-mal "Ukens mål" → ved ukeslutt genereres "Slik gikk det" med visuell oversikt (graf basert på loggførte mål). | Mal-struktur er forberedt i datamodellen; UI-ferdigstilling i produksjon | (bygger på `DiaryEntryScreen.tsx`) |
| Mal for kriseplan | Default-tekst fra Strapi (RUSinfo-formulert); bruker tilpasser sin personlige. Alltid tilgjengelig fra krise­knappen. | **Implementert** som kriseplan-modal med pust-animasjon, nummererte steg, ring-kontakt og "Ring RUSinfo" | `KriseplanScreen.tsx` |
| FAK-skjema | Egen mal i dagboken (Foranledning / Atferd / Konsekvens) for å bearbeide tilbakefall og seire over sug. | Datastruktur forberedt; egen stegbasert flyt bygges i produksjon | (bygger på `DiaryEntryScreen.tsx`) |
| Dagens/ukens tema | Hentes fra Strapi. Modul 1 og 2 får daglig første uker, deretter ukentlig. | UI-kort implementert på Hjem; Strapi-kobling i prod | `HomeScreen.tsx` "Nå for deg" |
| Sparekalkulator | Daglig kostnad × frekvens­faktor × antall dager uten bruk. Vises på Hjem og i Oversikt-tab. | **Implementert** med norsk tall­formatering | `storage.ts:getStats`, `HomeScreen.tsx`, `OversiktScreen.tsx` |

**C. Fem nye funksjoner**

| Funksjon | Beskrivelse | Status | Filreferanse |
|---|---|---|---|
| 1. Kartleggings­verktøy (kalender) | Planlagt kokain-bruk per dag vs. faktisk loggført bruk, visuell 4-ukers oversikt med fargekoding (planlagt=stiplet, faktisk=grønn, ekstra=rød) + tekstlig oppsummering ("Du holdt planen på 4 av 6 dager"). Navigeres fra Hjem "Plan"-kort. | **Implementert** | `KalenderScreen.tsx` |
| 2. Kriseknapp → kriseplan | Global flytende FAB (pust-animert) som åpner kriseplan som bottom sheet. Kriseplan inneholder pust-øvelse (animasjon), nummererte steg, "Ring nærkontakt" (med navn/nummer fra onboarding), "Ring RUSinfo 08588" og valgfri anonym chat. | **Implementert** | `CrisisFab.tsx`, `KriseplanScreen.tsx` |
| 3. Palett + grayscale | To forhåndsdefinerte paletter ("Varm stein", "Stille vann") i prototypen; **grayscale som tredje modus for øyekomfort og UU**. Skiftes i Innstillinger. Kan utvides til 3–5 paletter i produksjon. | **Implementert for 2 paletter**; grayscale-palett legges til | `ThemeContext.tsx`, `SettingsScreen.tsx`, `theme/tokens.ts` |
| 4. Bildebibliotek | 30–50 kuraterte bakgrunner (rolige abstraksjoner, natur) fra Strapi. Brukes som bakgrunn på Hjem, motivasjons­vegg og kriseplan. Caches lokalt etter første lasting. | UI-rammeverk på plass; bildesett og Strapi-modell bygges i produksjon | (planlagt utvidelse) |
| 5. Motivasjonsvegg | Galleri der bruker komponerer tekst + bilde fra biblioteket. Eksporterbar som JPEG. Alt lagres **kun lokalt** — anonymitet ivaretatt. | **Implementert** med galleri­visning og "Ny vegg"-plassholder | `VeggScreen.tsx` |

Alle nye funksjoner er designet og implementert i samme visuelle språk som beholdte funksjoner (Instrument Serif-overskrifter, Inter-brødtekst, runde kort, mykt palett, haptisk respons på alle hovedinteraksjoner) slik at appen oppleves som én helhet — ikke en samling moduler.

#### Krav 4.2.3 Teknologi (B) — **Leverandøren tilbyr en alternativ løsning som oppfyller Kundens overordnede behov.**

**Felles kodebase:** Ja. Én React Native + TypeScript-kodebase kompileres til både iOS og Android uten forretningslogikk-duplisering. Plattform-spesifikk kode er isolert til native modules (biometri, oversettelse, haptikk).

**Rammeverk­levetid 5–7 år:** Oppfylt med god margin. React Native er utviklet av Meta siden 2015, er aktivt utviklet (månedlig releases), og brukes i produksjon av Instagram, Shopify, Discord, Microsoft Office, Coinbase, Walmart — samt mange norske produksjons­apper (DNB, Vy, Equinor, Easee). Expo (som vi bygger på) er selskapet som vedlikeholder den mest modne RN-verktøy­kjeden og har garantert support-syklus.

**Backend-server:** Ja, **samme modell som HAP** — headless CMS (Strapi foreslått) som kommuniserer med app over HTTPS-JSON-API. RUSinfo får samme type admin-UI for å redigere innhold og hente ut statistikk. Selv-hostes i Oppdragsgivers driftsmiljø, ikke hos Leverandør.

**Lydfiler:** Ja. React Native støtter lydavspilling via `expo-av` / `react-native-sound`. Lyd-assets kan være lokale i app-bundle (pust­øvelser, jordings­lyder) eller strømmes fra Strapi (gjestepodd­kast, guidet meditasjon).

**Lokal oversettelsesmodell (på enheten):** Ja. Foreslått løsning:

- **iOS 17.4+:** Apple Translation Framework — helt on-device, gratis, Apple-vedlikeholdt, dekker norsk + EU-språk
- **Android:** Google ML Kit Translation API — on-device, gratis, Google-vedlikeholdt
- **Fallback for eldre iOS:** pakket Helsinki-NLP Marian-modell via ONNX Runtime (~30 MB)

Fordelen med plattform-nativ tilnærming: null vedlikeholds­byrde for Leverandør/RUSinfo, null datatrafikk (oversetting skjer helt lokalt), og null risiko for leverandør­uavhengighet.

**Statistikk­innsamling:** Som HAP — frivillig, anonym innsending fra app til Strapi (aggregert: "antall fullførte modul 1", "antall kriseplan-bruk", ikke-koblbart til person). Ingen IP, ingen enhets-ID, ingen sesjons­token.

**Avvik fra "samme rammeverk som HAP":**

- **HAP bruker** Ionic 7 + Vue 3 (Capacitor-basert web­visning i en native container).
- **Vi bruker** React Native + Expo (faktisk native UI-komponenter).
- **Begrunnelse:**
  1. **Brukeropplevelse for sårbar målgruppe.** React Native rendrer til iOS UIKit / Android Material — native animasjoner, native scrolling, native gesture-håndtering. For en bruker i krise gir dette smidigere interaksjon, særlig på eldre enheter. Ionic's webview har dokumentert høyere input-latency.
  2. **Bredere vedlikeholds­marked i Norge.** React Native-utviklere er vesentlig flere enn Ionic/Vue-utviklere i det norske markedet, noe som gir Oppdragsgiver stor fleksibilitet ved framtidig vedlikehold eller utvidelser.
  3. **Modnere tilgjengelighets-API.** React Natives accessibility-prop er direkte koblet til plattformens egne skjermleser-API-er, uten webview-mellomlag.
  4. **Større biblioteks­økosystem.** Biometri, haptikk, lokal lagring, native-moduler — alt ferdig vedlikeholdt via Expo-teamet.

- **HAP-paritet bevares der det teller.** Skjermhierarki, informasjons­arkitektur, datamodell, innholds­typer i Strapi og admin-opplevelsen for RUSinfo er speilet 1:1 med HAP. Redaktører som kjenner HAPs admin kan bruke den nye appens backend uten omlæring, og innhold kan migreres direkte mellom systemene. Det som endres er utelukkende rende­rings­lag­et — fra webview til native UI.

- **Konsekvens:** kildekoden må bygges fra bunnen i React Native (kan ikke "porteres" direkte fra Ionic/Vue). Dette er **inkludert i hoved­oppdraget uten ekstra kostnad** og reflekteres i Bilag 7. For RUSinfo betyr valget at sluttbrukeren — som er det endelige målet — får en app som føles native, responsiv og rolig, mens dere beholder friheten til senere å gjenbruke innhold, struktur og backend-modell fra HAP.

- **Ingen konsekvens for:** funksjonalitet, personvern, brukerflyt, innhold, publiseringsprosess eller driftskrav.

---

### § 4.3 Personvern og informasjonssikkerhet

#### Krav 4.3.1 Personvern (B) — **Ønsket løsning kan leveres uten avvik.**

Løsningen er teknisk og organisatorisk utformet slik at den **ikke behandler personopplysninger** jf. GDPR art. 4. Dette utløser ikke krav om DPIA eller databehandler­avtale.

| Tiltak | Implementasjon |
|---|---|
| Ingen brukerkonto | Appen har ingen påloggings­funksjon. Ingen e-post, telefonnummer eller navn samles inn. Nødkontaktens navn og nummer lagres **kun lokalt** på brukerens enhet (aldri sendt til server). |
| All data lokalt | All bruker­genererte data (dagbok, innstillinger, PIN, kontakt, motivasjons­vegg) lagres med AsyncStorage på enheten. Implementert og verifisert i prototypen (`storage.ts`). Slettes når brukeren avinstallerer appen eller velger "Nullstill alt". |
| Ingen IP-logging | Strapi konfigureres uten access-logs med IP. Reverse proxy (nginx) strippes for IP før request når applikasjons­laget. Standard Strapi-logger deaktiveres eller konfigureres til kun feil­meldinger uten identifiserende metadata. |
| Ingen tredjeparts analytics | Verken Firebase Analytics, Google Analytics, Sentry, Segment, Mixpanel eller tilsvarende benyttes. Crash-rapportering — hvis ønsket — gjøres via anonymiserte, opt-in rapporter til Strapi. |
| Anonymisert frivillig statistikk | Aggregert, ikke-koblbar: "antall brukere som åpnet kriseplan i forrige uke", ikke "bruker X åpnet kriseplan kl 14:07". Ingen tidsstempling på individ-nivå. |
| Ingen underleverandør-behandling | Funka Nu / MediaLT (UU-revisjon) får tilgang til app-UI, men ikke til brukerdata. CDN for bilder (om benyttet) leverer *innhold*, ikke behandler person­data. |
| Varsling ved endringer | Hvis fremtidig utvikling introduserer behandling av personopplysninger, varsles Oppdragsgiver skriftlig. Behandling starter ikke før databehandler­avtale er inngått. |

**Dokumentasjon:** Leverandør leverer personvern­vurdering ved go-live som bekrefter teknisk og organisatorisk ivaretakelse.

---

### § 4.4 Krav som gjelder dersom løsningen behandler personopplysninger

Siden løsningen under 4.3.1 leveres uten avvik (dvs. ingen behandling av personopplysninger), er §§ 4.4.1–4.4.4 i utgangspunktet ikke utløst. Vi bekrefter likevel alle krav for det tilfelle at Kunden senere velger å introdusere slik behandling.

#### Krav 4.4.1 Databehandleravtale (M) — **Lest og akseptert.**

Ved eventuell framtidig utvidelse inngås standard DFØ-databehandler­avtale samtidig med den endringen som utløser behovet.

#### Krav 4.4.2 Personvern i egen virksomhet (M) — **Lest og akseptert.**

Leverandør har erfaring med personvern- og compliance-arbeid gjennom tidligere team-arbeid på Easee EaseePay (PCI DSS-miljø, Bouvet 2021–2024) og har etablerte interne rutiner for sikker kode, tilgangs­styring og data­minimering. Dokumentasjon leveres på forespørsel.

#### Krav 4.4.3 Bistand ved risikovurderinger (M) — **Lest og akseptert.**

Leverandør bistår med risiko­vurdering (DPIA-forberedelse, trussel­modellering) der det eventuelt skulle bli aktuelt.

#### Krav 4.4.4 Underleverandører (M) — **Lest og akseptert.**

Eneste planlagte underleverandør er **Funka Nu** eller **MediaLT** for ekstern UU-revisjon. Underleverandør godkjennes skriftlig av Kunden før bruk. Underleverandør får ikke tilgang til person­opplysninger.

---

## 4. Dokumentasjon som følger leveransen

- Arkitektur­dokument (oppdatert gjennom prosjektet, i `/docs/architecture.md`)
- API-dokumentasjon (OpenAPI 3.0 for Strapi-endepunkter)
- Komponent­dokumentasjon (Storybook for React Native, eller tilsvarende)
- Sluttbruker­manual (PDF + web)
- Admin-manual (PDF + Markdown)
- Test-rapport (unit + integrasjon + e2e + UU-revisjon)
- DevOps-dokumentasjon (deployment, backup, monitoring)
- Bilag 10: Tredjeparts­komponenter og lisenser
- Personvern­vurdering ved go-live

---

## 5. Referanse til prototype

Klikk­bar prototype vedlagt som separat zip / Expo-link. Prototypen demonstrerer:

- Onboarding-flyt (7 steg) med PIN-oppsett og biometri
- Hovedskjermer (Hjem, Dagbok, Oversikt, Prestasjon, Info)
- Modaler (Kriseplan med pusteøvelse, Motivasjonsvegg, Kartlegging, Innstillinger)
- Global flytende krise­knapp
- Palett-bytte (Varm stein / Stille vann)
- Lokal lagring med AsyncStorage
- Dagboks­logging med trigger-kategorier og Bruk-nullstilling
- Fase-timeline og pie charts for triggere

Prototypen er **ikke** ferdig produkt — Strapi-kobling, CMS-innhold, full UU-sertifisering, modul 2/3-differensiering, FAK-mal og ukesmål-evaluering utvikles ferdig i leveransefasen. Prototypen er bevis på at løsnings­arkitekturen er valgt, testet og kjørende.

---

*Dokumentet kvalitetssikres og lastes opp i KGV senest 27. april 2026 kl 12:00.*
