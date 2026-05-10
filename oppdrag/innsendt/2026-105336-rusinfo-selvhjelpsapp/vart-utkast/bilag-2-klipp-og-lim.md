---
title: Bilag 2 — Klipp-og-lim-besvarelser
tender: 2026-105336
status: Åpne kundens Word-mal og lim inn tekstblokker i "Leverandørens besvarelse"-feltene
---

# Klipp-og-lim-besvarelser for Bilag 2

**Slik bruker du dette dokumentet:**
1. Åpne `fra-kunden/02-ssa-t-kontrakt/02 DEL 2 SSA-T Bilag 2 Leverandørens løsningsspesifikasjon.docx` i Word
2. Finn "Leverandørens besvarelse:"-feltet for hvert krav
3. Kopier tilsvarende tekstblokk nedenfor og lim inn
4. Lagre som ny fil og last opp i KGV under Tildelingskriterium "Ønsket funksjonalitet og brukervennlighet"

---

## § 4.1 Generelle krav

### 4.1.1 Tjenesten (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Appen leveres for iOS (15.0+) og Android (8.0 / API 26+), utviklet i React Native med delt TypeScript-kildekode. Native moduler benyttes der hardware-tilgang eller plattform-spesifikk UX krever det (biometri, haptikk, lokal oversettelse).

Krav til Kundens tekniske plattform:
- Én webserver (Linux, 2 vCPU / 4 GB RAM) for Strapi CMS + Postgres
- HTTPS med gyldig sertifikat (Let's Encrypt eller Oslo kommunes interne CA)
- Apple Developer Program-konto og Google Play Console-konto eid av RUSinfo/Velferdsetaten
- Git-hosting (GitHub, GitLab eller Azure DevOps) for kildekode-eierskap

Leverandør bistår med oppsett.

---

### 4.1.2 Vedlikehold (B)

**Lim inn i "Leverandørens besvarelse":**

Ønsket løsning kan leveres uten avvik.

Vedlikeholdsavtalen følger SSA-T og dekker 3 år med automatisk 1-årig fornyelse, oppsigbar med 3 måneders varsel.

Innhold:
- Feilretting og feilsøking i app + backend-server
- Sikkerhetsoppdateringer (React Native-versjoner, Expo-oppgraderinger, Strapi-patches, alle tredjepartsbiblioteker)
- Årlige plattformoppgraderinger (iOS SDK, Android target-API) for å beholde butikk-godkjenning
- Drift og overvåking av Strapi-server (helsesjekk, backup, logg-rotasjon)
- Innmelding av feil direkte fra appen via innebygget "send feedback"-kanal som posterer anonymt til Strapi
- Push av innholdsendringer via Strapi uten nytt app-release
- Responstid: 24 timer på virkedager — bedre enn ønsket 48 timer

Videreutvikling av nye funksjoner prises separat etter Bilag 7. Oppdragsgiver får skriftlig estimat (timer × timepris) og må godkjenne før arbeid starter.

---

### 4.1.3 Trening av eventuell KI-modell (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Appen bruker ingen generativ KI i sluttproduktet. Lokal oversettelsesmodell (jf. krav 4.2.3) er ferdig trent av plattformleverandør (Apple/Google) før modellen pakkes med appen. Modellen trenes ikke på Kundens eller brukernes data.

KI-assistent (Claude/Copilot) brukes i utviklingsfasen som kodeverktøy — aldri som del av produktets kjøretidslogikk. Se 4.1.4.

---

### 4.1.4 Generelle krav ved bruk av KI (B)

**Lim inn i "Leverandørens besvarelse":**

Ønsket løsning kan leveres uten avvik.

Konkrete tiltak for kontrollert, sporbar og kvalitetssikret KI-bruk i utvikling:

- Kontrollert bruk: KI genererer kun kjente mønstre (komponenter, tester, boilerplate). Arkitekturbeslutninger tas alltid av Leverandør manuelt.
- Følger definert struktur: `.cursorrules` / `CLAUDE.md` i repo definerer filstruktur, navnekonvensjoner og regler. KI-kode som bryter med dette avvises.
- Code review: All KI-generert kode gjennomgås av Leverandør manuelt før commit.
- Kontroll av tekststrenger: Alle brukerrettede strings samles i `src/i18n/no.ts`. ESLint-regel flagger hardkodet tekst. Tekstfiler versjoneres i git.
- Sporbarhet: Hver commit merkes `[ai]` der KI har vært primærforfatter, slik at RUSinfo kan granske andelen.
- Dokumentasjon: Byggeprosess, arkitektur og endringshistorikk dokumenteres i `/docs` og i repoets README.

Brudd på disse prinsippene utbedres uten ekstra kostnad.

---

### 4.1.5 Opplæring (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Opplæringen tilbys i tre former:
- Oppstarts-workshop (4 timer, fysisk eller Teams): gjennomgang av Strapi-admin — innholdsredigering, dagens tema, default kriseplan, bildebibliotek, statistikkhenting
- Skriftlig admin-manual (PDF + Markdown i git, med skjermbilder) levert ved go-live
- Teknisk bistand i vedlikeholdsperioden via e-post/chat, timebasert etter Bilag 7

Priset separat i Bilag 7.

---

### 4.1.6 Ferdigstilling (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Leverandør håndterer hele publiseringsløpet i Oppdragsgivers egne Apple Developer- og Google Play-kontoer:

- App Store Connect: metadata, screenshots, beskrivelse, aldersvurdering, eksport-compliance
- Google Play Console: metadata, screenshots, Data Safety-skjema, policy-samsvar
- Håndtering av review-prosessen og svar på eventuelle avslag
- Versjonsnummerering og release-noter

Leverandør har tidligere vært med på publisering til App Store og Google Play gjennom arbeid hos Netpower (Kolumbus, NLR TryggDrift) og Bouvet (Easee, Equinor), og har i tillegg egenhendig publisert og drifter Supportify-integrasjoner.

---

### 4.1.7 Brukermanual (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

To manualer leveres ved go-live:
- Sluttbrukermanual (PDF + web-publisering på rusinfo.no): illustrert innføring modul for modul, inkludert hvordan bruker aktiverer lås, hvordan kriseplanen fungerer, hvordan motivasjonsveggen bygges
- Admin-manual for RUSinfo-personell (PDF + Markdown i git): Strapi-redigering, statistikkhenting, feilhåndtering, release-rutiner

Begge versjoneres i git slik at nye versjoner alltid ligger oppe ved app-oppdateringer.

---

### 4.1.8 Åpen kildekode eller kundeeid (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Hele appens kildekode er Oppdragsgivers eiendom. Praksis:

- Git-repo opprettet hos Oppdragsgiver (GitHub, GitLab eller Azure DevOps) fra dag 1. Leverandør commiter direkte til Kundens repo — ingen mellomlagring.
- Ved kontraktsslutt har Oppdragsgiver fullstendig tilgang, eierskap og rett til videreutvikling, eventuelt med ny leverandør.
- Lisens: Oppdragsgiver velger (MIT/Apache-2.0 for åpen kildekode, eller lukket proprietær).
- Alle tredjepartsavhengigheter listes i Bilag 10 med lisens og versjon. Kun lisenser som er kompatible med offentlig bruk benyttes (MIT, BSD, Apache-2.0, ISC).

---

### 4.1.9 Reklamefri (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Appen inneholder:
- Ingen reklame (ingen AdMob, ingen banner, ingen sponset innhold)
- Ingen tracking-pixler eller tredjeparts analytikk (Google Analytics, Firebase Analytics, Segment, Mixpanel — ingen av disse)
- Ingen remarketing eller attribution-SDK-er

Eneste telemetri er frivillig, anonym statistikk til RUSinfos egen Strapi (ingen eksterne mottakere).

---

### 4.1.10 Språk (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Appen leveres på norsk bokmål. All brukerrettet tekst er sentralisert i `src/i18n/no.ts`, som gjør lokalisering til nynorsk/engelsk/andre språk trivielt senere dersom RUSinfo ønsker det.

Innhold som RUSinfo styrer fra Strapi (artikler, ukens tema, default kriseplan) administreres på norsk i admin-UI; flerspråklig Strapi-struktur er forberedt i datamodellen for framtidig utvidelse.

---

### 4.1.11 Funksjoner som kan tas ut og priseffekt (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert. Oversikt over reduserbare komponenter med estimert priseffekt (NOK ekskl. mva):

- Kartleggingsverktøy (kalender, planlagt vs. faktisk): ~60 000 — fjerner planleggingsmodulen, tidsbruk-logging beholdes i dagboken
- Motivasjonsvegg (galleri + komposisjon): ~35 000 — personliggjøring via galleri fjernes, standard-bakgrunner beholdes
- Bildebibliotek (kuratert bakgrunnssett): ~20 000 — standard bakgrunner i stedet for valgbare
- Lokal AI-oversettelse: ~30 000 — app kun på norsk uten on-device oversetting
- Palett-velger utover grayscale: ~20 000 — ett tema + grayscale. Grayscale beholdes alltid (UU-krav).
- Krise-chat (Kord AI anonym samtale): ~40 000 — kriseplan beholdes, chat-funksjonen utgår
- Oppstarts-workshop: ~15 000 — kun skriftlig manual + videoopptak

Disse er uavhengige og kan tas ut i kombinasjon. Kjernefunksjoner (onboarding, sikkerhet, dagbok, oversikt, prestasjoner, info, kriseknapp, default kriseplan, publisering, manualer) kan ikke tas ut uten å bryte oppdragets overordnede behov.

---

## § 4.2 Funksjonelle krav

### 4.2.1 Appens oppbygging (B)

**Lim inn i "Leverandørens besvarelse":**

Leverandøren tilbyr en alternativ løsning som oppfyller Kundens overordnede behov, men som avviker delvis fra ønsket løsning.

Avvik: rammeverk (React Native i stedet for Ionic 7/Vue 3). Struktur, IU, XU og backend-modell er identisk med HAP.

Begrunnelse: se krav 4.2.3 nedenfor (rammeverkvalg).

Konsekvens for IU/XU/backend: ingen. Brukeropplevelsen er mer native, ikke annerledes.

Faktisk oppbygging (som implementert i vedlagt prototype):

| Lag | HAP | Vår løsning |
|---|---|---|
| Onboarding | Modulvalg + startdato | Utvidet 7-stegs flyt: modul (stoppe helt / redusere / lære) → startdato med kalender → frekvens + kostnad per gang → personvernløfte → sikkerhetsvalg → PIN → nødkontakt |
| Hovednavigasjon | Tab-basert, 5 seksjoner | 5 tabs: Hjem, Dagbok, Oversikt, Prestasjon, Info |
| Modaler | Innstillinger, reset | Modale native-stack-skjermer for Motivasjonsvegg, Kartlegging, Artikkel, Dagboksinnlegg, Innstillinger, Chat, og Kriseplan som bottom sheet |
| Global kriseknapp | Tilgjengelig fra alle skjermer | Flytende FAB nederst til høyre med pust-animasjon, synlig på alle hovedskjermer |
| Backend | Strapi headless CMS | Samme modell — Strapi, selv-hostet hos RUSinfo. Innholdstyper speiler HAP |

Universell utforming (WCAG 2.1 AA + EUs webdirektiv):
- accessibilityLabel, accessibilityRole, accessibilityState på alle interaktive komponenter (VoiceOver/TalkBack)
- Kontrast ≥ 4.5:1 for normal tekst, ≥ 3:1 for stor tekst
- Grayscale-modus som alternativt tema (øyekomfort og forutsigbar kontrast)
- Dynamic Type-støtte (følger systemets tekststørrelse)
- Reduce Motion-respekt for pust-animasjoner og overganger
- Full tastatur- og skjermleser-navigasjon testet

Ekstern UU-revisjon utføres av Funka Nu eller MediaLT (underleverandør) før publisering til butikkene.

---

### 4.2.2 Appens funksjoner (B)

**Lim inn i "Leverandørens besvarelse":**

Ønsket løsning kan leveres uten avvik.

Alle etterspurte funksjoner leveres. Oversikt med forankring i vedlagt prototype:

A. Beholdte fra HAP (kun visuell tilpasning)
- Triggerdagbok med egne triggere — implementert (3-stegs flyt: type → utfall → kategori + fritekst)
- Tidtaker siden siste gangs bruk — implementert, beregnes dynamisk fra siste "Bruk"-logg
- Nullstill alle + enkeltvis — implementert i Innstillinger + enkeltinnlegg
- Avatar — implementert, tilpasses RUSinfos retningslinjer
- Info-felt styrt av RUSinfo (via Strapi) — UI implementert, kobles til Strapi-endepunkt i prod
- Redigerbar tekstboks for meldinger — samme Strapi-mekanisme, tekstfelt per modul
- Direkte lenker til RUSinfos tjenester — implementert ("Ring RUSinfo 08588" med tel:-lenke)

B. Tilpassede fra HAP
- Prestasjoner med endrede parametre for kokain + oppgraderbart tema per palett — implementert som tidslinje med milepælsikoner
- Abstinensgraf/fasevisualisering tilpasset kokain-forløp — implementert modul 1-graf; modul 2-variant bygges i produksjon
- Dagbok med tagging på innlegg — implementert
- Ukens mål + "Slik gikk det"-evaluering — malstruktur forberedt i datamodellen, UI-ferdigstilling i produksjon
- Mal for kriseplan med default-tekst fra Strapi — implementert som kriseplan-modal med pust-animasjon, nummererte steg, ring-kontakt og "Ring RUSinfo"
- FAK-skjema (Foranledning/Atferd/Konsekvens) som egen mal — datastruktur forberedt, stegbasert flyt bygges i produksjon
- Dagens/ukens tema — hentes fra Strapi, daglig i modul 1+2 første uker, deretter ukentlig
- Sparekalkulator (daglig kostnad × frekvens × dager uten bruk) — implementert med norsk tallformatering

C. Fem nye funksjoner
- Kartleggingsverktøy (kalender) med planlagt vs. faktisk bruk — implementert
- Kriseknapp → kriseplan som global flytende FAB med pust-animasjon — implementert
- Palett + grayscale — implementert for 2 paletter; grayscale-palett legges til
- Bildebibliotek (30–50 kuraterte bakgrunner fra Strapi) — UI-rammeverk på plass, bildesett og Strapi-modell bygges i produksjon
- Motivasjonsvegg med tekst + bilde-komposisjon, eksporterbar som JPEG — implementert

Alle nye funksjoner er designet og implementert i samme visuelle språk (Instrument Serif-overskrifter, Inter-brødtekst, runde kort, mykt palett, haptisk respons på alle hovedinteraksjoner) slik at appen oppleves som én helhet.

---

### 4.2.3 Teknologi (B)

**Lim inn i "Leverandørens besvarelse":**

Leverandøren tilbyr en alternativ løsning som oppfyller Kundens overordnede behov, men som avviker fra ønsket løsning.

Felles kodebase: Ja. Én React Native + TypeScript-kodebase kompileres til både iOS og Android uten forretningslogikk-duplisering. Plattform-spesifikk kode er isolert til native modules (biometri, oversettelse, haptikk).

Rammeverklevetid 5–7 år: Oppfylt med god margin. React Native er utviklet av Meta siden 2015, er aktivt utviklet (månedlig releases), og brukes i produksjon av Instagram, Shopify, Discord, Microsoft Office, Coinbase, Walmart — samt mange norske produksjonsapper (DNB, Vy, Equinor, Easee). Expo har garantert support-syklus.

Backend-server: Ja, samme modell som HAP — headless CMS (Strapi foreslått) som kommuniserer med app over HTTPS-JSON-API. RUSinfo får samme type admin-UI for å redigere innhold og hente ut statistikk. Selv-hostes i Oppdragsgivers driftsmiljø.

Lydfiler: Ja. React Native støtter lydavspilling via `expo-av` / `react-native-sound`. Lyd-assets kan være lokale i app-bundle (pusteøvelser, jordingslyder) eller strømmes fra Strapi.

Lokal oversettelsesmodell på enheten:
- iOS 17.4+: Apple Translation Framework — helt on-device, gratis, Apple-vedlikeholdt, dekker norsk + EU-språk
- Android: Google ML Kit Translation API — on-device, gratis, Google-vedlikeholdt
- Fallback for eldre iOS: pakket Helsinki-NLP Marian-modell via ONNX Runtime (~30 MB)

Fordelen med plattform-nativ tilnærming: null vedlikeholdsbyrde, null datatrafikk, null risiko for leverandøruavhengighet.

Statistikkinnsamling: Som HAP — frivillig, anonym innsending fra app til Strapi (aggregert: "antall fullførte modul 1", ikke-koblbart til person). Ingen IP, ingen enhets-ID, ingen sesjonstoken.

Avvik fra "samme rammeverk som HAP":
- HAP bruker Ionic 7 + Vue 3 (Capacitor-basert webvisning i en native container).
- Vi bruker React Native + Expo (faktisk native UI-komponenter).

Begrunnelse:
1. Brukeropplevelse for sårbar målgruppe. React Native rendrer til iOS UIKit / Android Material — native animasjoner, native scrolling, native gesture-håndtering. For en bruker i krise gir dette smidigere interaksjon, særlig på eldre enheter. Ionic's webview har dokumentert høyere input-latency.
2. Bredere vedlikeholdsmarked i Norge. React Native-utviklere er vesentlig flere enn Ionic/Vue-utviklere i det norske markedet. Dette reduserer Oppdragsgivers risiko for leverandør-lock-in.
3. Modnere tilgjengelighets-API. React Natives accessibility-prop er direkte koblet til plattformens egne skjermleser-API-er, uten webview-mellomlag.
4. Større biblioteksøkosystem via Expo-teamet.

Konsekvens: kildekoden må bygges fra bunnen i React Native (kan ikke porteres direkte fra Ionic/Vue). Dette er inkludert i hovedoppdraget uten ekstra kostnad og reflekteres i Bilag 7. HAPs struktur, datamodell og backend-integrasjon gjenbrukes fullt ut.

Ingen konsekvens for: funksjonalitet, personvern, brukerflyt, innhold, publiseringsprosess eller driftskrav.

---

## § 4.3 Personvern og informasjonssikkerhet

### 4.3.1 Personvern — overordnet behov (B)

**Lim inn i "Leverandørens besvarelse":**

Ønsket løsning kan leveres uten avvik.

Løsningen er teknisk og organisatorisk utformet slik at den ikke behandler personopplysninger jf. GDPR art. 4. Dette utløser ikke krav om DPIA eller databehandleravtale.

Konkrete tiltak:

- Ingen brukerkonto: Appen har ingen påloggingsfunksjon. Ingen e-post, telefonnummer eller navn samles inn. Nødkontaktens navn og nummer lagres kun lokalt på brukerens enhet (aldri sendt til server).
- All data lokalt: All brukergenererte data (dagbok, innstillinger, PIN, kontakt, motivasjonsvegg) lagres med AsyncStorage på enheten. Slettes når brukeren avinstallerer appen eller velger "Nullstill alt".
- Ingen IP-logging: Strapi konfigureres uten access-logs med IP. Reverse proxy (nginx) strippes for IP før request når applikasjonslaget.
- Ingen tredjeparts analytics: Verken Firebase Analytics, Google Analytics, Sentry, Segment, Mixpanel eller tilsvarende benyttes. Crash-rapportering — hvis ønsket — gjøres via anonymiserte, opt-in rapporter til Strapi.
- Anonymisert frivillig statistikk: Aggregert, ikke-koblbar ("antall brukere som åpnet kriseplan i forrige uke", ikke "bruker X åpnet kriseplan kl 14:07"). Ingen tidsstempling på individnivå.
- Ingen underleverandør-behandling: Funka Nu / MediaLT (UU-revisjon) får tilgang til app-UI, men ikke til brukerdata.
- Varsling ved endringer: Hvis fremtidig utvikling introduserer behandling av personopplysninger, varsles Oppdragsgiver skriftlig. Behandling starter ikke før databehandleravtale er inngått.

Personvernvurdering leveres ved go-live.

---

## § 4.4 Krav som gjelder dersom løsningen behandler personopplysninger

> **Merknad:** Siden løsningen under 4.3.1 leveres uten avvik (dvs. ingen behandling av personopplysninger), er §§ 4.4.1–4.4.13 i utgangspunktet ikke utløst. Vi bekrefter likevel alle krav for det tilfelle at Kunden senere velger å introdusere slik behandling.
>
> **For 4.4.1 til 4.4.13 — lim inn følgende standardbesvarelse hvor kravet er utformet som "Lest og akseptert"-type:**

### 4.4.1 Databehandleravtale (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert. Ved eventuell framtidig utvidelse inngås standard DFØ-databehandleravtale samtidig med den endringen som utløser behovet.

### 4.4.2 Personvern i egen virksomhet (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert.

Leverandør har erfaring med personvern- og compliance-arbeid gjennom tidligere teamarbeid på Easee EaseePay (PCI DSS-miljø, via Bouvet 2021–2022) og har etablerte interne rutiner for sikker kode, tilgangsstyring og dataminimering. Dokumentasjon leveres på forespørsel.

### 4.4.3 Bistand ved risikovurderinger (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert. Leverandør bistår med risikovurdering (DPIA-forberedelse, trusselmodellering) der det eventuelt skulle bli aktuelt.

### 4.4.4 Underleverandører (M)

**Lim inn i "Leverandørens besvarelse":**

Lest og akseptert. Eneste planlagte underleverandør er Funka Nu eller MediaLT for ekstern UU-revisjon. Underleverandør godkjennes skriftlig av Kunden før bruk. Underleverandør får ikke tilgang til personopplysninger.

### 4.4.5 Styringssystem

**Lim inn i "Leverandørens besvarelse":**

Ikke relevant — løsningen behandler ikke personopplysninger jf. § 4.3.1. Bekreftes oppfylt dersom framtidige endringer utløser det. Leverandør følger prinsippene i ISO/IEC 27001 for sikkerhetsstyring i egen virksomhet.

### 4.4.6 Risikostyring og ROS-analyse

**Lim inn i "Leverandørens besvarelse":**

Ikke relevant jf. § 4.3.1. ROS-analyse utføres dersom framtidige endringer introduserer behandling av personopplysninger, i samarbeid med Kunden.

### 4.4.7 Brukertilganger og revisjon

**Lim inn i "Leverandørens besvarelse":**

Ikke relevant jf. § 4.3.1 — løsningen har ingen brukerkontoer eller persondata. Leverandørens git-repo-tilgang og Strapi-admin følger prinsippet om minste nødvendige tilgang.

### 4.4.8 Tilgangskontroll

**Lim inn i "Leverandørens besvarelse":**

Ikke relevant jf. § 4.3.1. Strapi-admin benytter sterke passord og valgfri MFA. Sikker lagring av hemmeligheter via Azure Key Vault eller tilsvarende, eid og administrert av Kunden.

### 4.4.9 Nettverkssikkerhet

**Lim inn i "Leverandørens besvarelse":**

All kommunikasjon mellom app og Strapi er kryptert via HTTPS (TLS 1.2+). Strapi-server kjører bak reverse proxy med gyldig sertifikat. Ingen persondata transporteres jf. § 4.3.1.

### 4.4.10 Sikring av data

**Lim inn i "Leverandørens besvarelse":**

Ikke relevant jf. § 4.3.1 — det finnes ingen persondata å sikre. Innholdsdata i Strapi (artikler, temaer) er uten personopplysninger og sikres via standard Strapi-mekanismer + daglig database-backup.

### 4.4.11 Håndtering av sertifikat og kryptografiske nøkler

**Lim inn i "Leverandørens besvarelse":**

Sertifikater (TLS for Strapi, App Store Connect, Google Play-signering) håndteres av Kunden i eget hemmelighetslager. Leverandør får tilgang under prosjektet og revokeres automatisk ved avtaleslutt.

### 4.4.12 Sikkerhetskopiering

**Lim inn i "Leverandørens besvarelse":**

Strapi-database sikkerhetskopieres daglig til Kundens driftsmiljø. Retensjonstid avtales med Kunden (anbefalt: 30 dager). App-kildekoden ligger i git hos Kunden og er i seg selv en kontinuerlig backup.

### 4.4.13 Hendelseshåndtering og rapportering

**Lim inn i "Leverandørens besvarelse":**

Ved sikkerhetshendelse varsles Kunden skriftlig innen 24 timer. Leverandør samarbeider med Kundens personvernombud og eventuelt Datatilsynet dersom varslingsplikt utløses. Rutiner etableres ved kontraktsstart.

---

## Avsluttende kommentarer (lim inn der malen åpner for generell kommentar)

Prototype vedlagt tilbudet som levende demonstrasjon av løsningsarkitekturen. Prototypen implementerer onboarding, PIN-/biometrilås, fem hovedtabs, kriseplan med pusteøvelse, motivasjonsvegg, kartleggingskalender og palett-/grayscale-tema. Prototypen er ikke ferdig produkt, men bevis på at løsningsvalg er testet og kjørende.

Leverandør ser fram til dialog med RUSinfo ved avklaringer eller spørsmål.
