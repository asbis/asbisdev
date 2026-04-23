---
title: Bilag 2 — Seksjon 1: App-løsningen og dens kvalitet
tender: 2026-107028
oppdragsgiver: Antidoping Norge
leverandor: Asbjørn Rørvik (ENK), org.nr 820 252 632
status: UTKAST
---

# 1. App-løsningen og dens kvalitet

*Tildelingskriterium fra konkurransegrunnlaget: «App-løsningen og dens kvalitet. Herunder blant annet: brukervennlighet, gode integrasjonsløsninger, forvaltning og oppdaterbarhet av innhold.»*

## 1.1 Vår løsning i ett bilde

Vi leverer én app — ikke en samling lenker. iOS og Android, lastbar fra App Store og Google Play, med ett klart designgrep: **alt utøveren trenger skal være tilgjengelig fra hovedsiden, på ett trykk**. Dette er ikke en tolkning fra vår side, det er kravet fra Bilag 1 § 6: «Grafikken skal være enkel. Minimal bruk av tekst og all funksjonalitet skal være tilgjengelig fra en hovedside.»

Hovedsiden er et **3×3 ikongrid** med de ni funksjonene fra kravspesifikasjonen:

```
┌──────────────────────────────────────────┐
│  [ADNO-logo]              [🔔]  [👤]     │
├──────────────────────────────────────────┤
│                                          │
│   ⚗️           💊          📋            │
│ Kosttilskudd  Legemiddel-  Dopinglista   │
│               søk          (WADA)        │
│                                          │
│   🎓          📄          🌬️              │
│ Ren Utøver    Medisinsk    Astma-        │
│ (e-læring)    fritak       kalkulator    │
│                                          │
│   🚨          💬          🔍             │
│ Varsling      Kontakt oss  (reservert)   │
│               (dopingvarsel)             │
│                                          │
└──────────────────────────────────────────┘
```

Design­filosofien er hentet direkte fra målgruppens situasjon: 15–35 år gamle utøvere, ofte på trening, i bilen, på reise, rett før konkurranse. De skal ta en rask beslutning («kan jeg ta denne medisinen?», «er dette kosttilskuddet trygt?») — og svaret skal komme i appen, i lomma, på sekunder. Det utelukker fem under­menyer og mye tekst.

Vi har allerede bygget en klikkbar prototype av dette. **Den ligger på `antidoping.asbjornrorvik.dev` bak basic auth — passord sendes på forespørsel til oppdragsgivers tilbudskontakt.** ADNO kan klikke seg gjennom alle ni funksjonene, se onboarding, se risikoscoren for kosttilskudd i grønt/gult/rødt, og få et konkret inntrykk av hvordan den ferdige appen vil se ut og oppføres. Vi leverer før vi har vunnet, slik at dere ikke trenger å ta vårt ord på at «det blir bra».

## 1.2 Teknisk arkitektur

### Rammeverk: React Native

Vi bygger appen i **React Native (0.74+) med TypeScript**. Dette er et bevisst valg, ikke et standardvalg:

- **React Native har modent økosystem og dokumentert lang levetid.** Det er utviklet og vedlikeholdt av Meta siden 2015, brukes i produksjon av Microsoft (Office, Teams, Outlook Mobile), Shopify, Discord, Coinbase, Instagram, samt norske produksjons­apper som Vy, DNB og Equinor. Det er med andre ord ikke et risikoelement for ADNO — det er en bransjestandard.
- **Én kodebase, to plattformer.** All forretnings­logikk, alle skjermer og alle integrasjoner skrives én gang og kompileres til både iOS og Android. Det betyr at når dopinglista oppdateres, eller ADNO ønsker en ny knapp, skjer det på begge plattformer samtidig — ingen iOS som ligger tre uker bak Android.
- **Native komponenter der det trengs.** React Native rendrer faktiske iOS UIKit- og Android Material-komponenter. Scroll, animasjoner, hurtigtaster og skjermleser-integrasjon føles native fordi de *er* native.
- **Asbjørn har tung React Native-erfaring i samfunnskritiske og regulerte apper:**
  - **Equinor** — to av Equinors mest forretnings­kritiske offshore-apper (Notifications og Workorders), strengt regulert miljø, høye krav til oppetid.
  - **NLR TryggDrift** — HMS-app for norsk landbruk, levert fra første kode til App Store og Google Play, erstatter et eksisterende system (KSL Trygg).
  - **Easee** — betalings­biblioteket EaseePay i Flutter med Adyen-integrasjon og PCI DSS-kompatibilitet (samme utvikler­erfaring bak begge rammeverkene, og for denne leveransen har vi vurdert at RN er riktig).

Vi kunne bygget i Flutter — Asbjørn er like sterk der (Kolumbus, Altibox Hjem). Men for ADNO er React Native riktig valg fordi det gir ADNO det bredeste mulige leverandør­markedet hvis dere senere vil bytte vedlikeholds­leverandør, og fordi det gir oss direkte gjenbruk av mønstre fra Equinor og TryggDrift.

### Backend

Backend bygges i **Node.js (NestJS) på Azure App Service**, med **PostgreSQL** som primærdatabase og **Azure Blob Storage** for filer (PDF-skjemaer, videoer, bilder). Vi har vurdert Go som alternativ — Asbjørn har levert flere Go-backender (Dropby, Flagchase, deler av Kolumbus-stacken) — men for denne appen anbefaler vi Node.js av tre grunner:

1. **Felles språk på tvers av mobil og server** (TypeScript) — reduserer friksjon og feil­kilder, og gjør det lettere for ADNO å få en annen leverandør inn senere.
2. **Stort utvalg modne integrasjons­biblioteker** — spesielt mot push (FCM/APNs), e-post, og SSO/OAuth — som sparer utviklings­tid.
3. **Azure-hosting i Norge/EU** — passer oppdragsgivers sannsynlige krav til datalokasjon og gir enkel overføring til ADNOs eget Azure-tenant ved kontrakts­slutt.

All infrastruktur er **kode** (Terraform eller Bicep), slik at ADNO får en komplett, re-deploybar arkitektur — ikke en håndkonfigurert server ingen andre kan rekonstruere.

### Arkitektur­diagram (forenklet)

```
┌──────────────────┐       ┌──────────────────┐
│  iOS (App Store) │       │ Android (Google) │
│   React Native   │       │   React Native   │
└────────┬─────────┘       └────────┬─────────┘
         │                          │
         └─────────── HTTPS ────────┘
                        │
            ┌───────────▼───────────┐
            │   Azure App Service   │
            │   NestJS API (Node)   │
            └─┬──┬──┬──┬──┬──┬──┬──┬┘
              │  │  │  │  │  │  │  │
         ┌────┘  │  │  │  │  │  │  └────┐
         ▼       ▼  ▼  ▼  ▼  ▼  ▼       ▼
   ┌─────────┐ ┌───┐ ┌───┐ ┌─────┐ ┌────────┐
   │Postgres │ │FK │ │WAD│ │TASK │ │Whistle-│
   │(Azure)  │ │API│ │A  │ │SSO  │ │blower  │
   └─────────┘ └───┘ └───┘ └─────┘ └────────┘
                    ┌───────┐
                    │FCM/   │  (push-varsling)
                    │APNs   │
                    └───────┘
```

## 1.3 Brukervennlighet

### Design­prinsipper

Vi bygger etter fire enkle regler hentet fra kravspesifikasjonen og målgruppens situasjon:

1. **Maks ett trykk fra hovedside til verktøy.** Ingen skjulte menyer, ingen hamburger, ingen tab-bar i bunn som konkurrerer med grid-et.
2. **Fargekoding er alltid supplert med ikon og tekst.** Grønn/gul/rød brukes konsekvent for tillatt/forsiktighet/forbudt, men aldri alene — alt har også en ikonform og en tekststreng. Dette er en UU-standard (WCAG 2.2 § 1.4.1) og en trygghets­standard (fargeblinde utgjør ca. 8 % av menn).
3. **Tekst er informasjon, ikke dekorasjon.** Vi følger prinsippet fra § 6 i kravspesifikasjonen: minimalt med tekst, ikoner gjør jobben.
4. **Resultatskjermer er alltid handlings­rettet.** Hver risikoskjerm, legemiddel­detalj og WADA-treff avsluttes med en konkret neste handling: «Send bekreftelse på e-post», «Kontakt ADNO for råd», «Les mer om medisinsk fritak».

### Universell utforming (WCAG 2.2 AA)

Appen leveres med full WCAG 2.2 AA-kompatibilitet fra dag 1:

- Alle interaktive komponenter har korrekte `accessibilityLabel`, `accessibilityRole` og `accessibilityState` for VoiceOver (iOS) og TalkBack (Android).
- Kontrastkrav ≥ 4.5:1 for normal tekst, ≥ 3:1 for stor tekst og UI-elementer.
- **Dynamic Type**-støtte: appen følger systemets tekststørrelse, inkludert de største valgene (iOS XXL, Android Extra Large).
- **Reduce Motion**-preferansen respekteres: animasjoner deaktiveres når brukeren har slått det på i OS.
- Alle fargesignaler er supplert med ikon og tekst (ikke-farge-bare signaler, WCAG 2.2 § 1.4.1).
- Full navigering med skjermleser testet manuelt før hver release.

Vi tilbyr **ekstern UU-revisjon** via Funka Nu eller MediaLT før publisering (inkludert som under­leverandør i vår pris). ADNO står fritt til å velge om dette skal gjennomføres.

### ADNOs designmanual og visuelle identitet

Appen følger ADNOs eksisterende visuelle identitet — ikke som en pliktøvelse, men som et signal om at dette er ADNOs app, ikke vår. Vi henter primærblå, sekundær­farger, ikonstil og typografi fra antidoping.no og ADNOs designmanual. Typografien er en profesjonell sans-serif (Inter eller ADNOs egen font hvis den finnes i lisens­bar form).

Splash-skjerm, onboarding og meldings­senter er utformet for å oppleves som en naturlig forlengelse av ADNOs nettside og kommunikasjons­materiell.

### Onboarding og personvern

Onboarding er tre skjermer: velkomst, rollevalg (utøver / trener / foreldre / støtteapparat), og samtykke til push-varsler. Samtykke­teksten er utformet for å oppfylle **WADA ISPPPI** (*International Standard for Protection of Privacy and Personal Information*) — dette er den internasjonale personvern­standarden WADA bruker for antidoping-data, og den må nevnes eksplisitt i utøver­rettet funksjonalitet.

Ingen innlogging i kjerne­appen. Utøveren kan bruke alle verktøyene uten å opprette konto. Navn, telefon og e-post lagres kun dersom brukeren selv velger det (f.eks. for å motta e-post­bekreftelse på legemiddel­søk).

## 1.4 Integrasjons­løsninger

Appens verdi ligger i at **innholdet er levende og eksternt** — hentet fra de samme systemene som allerede forvalter det. Det gir utøveren alltid oppdatert informasjon, og det sparer ADNO for dobbelt­arbeid.

### Felleskatalogen (legemiddelsøk)

ADNO har allerede en avtale og integrasjon med Felleskatalogen på antidoping.no/medisinsk/legemiddelsok. Vi viderefører dette oppsettet: backend-laget vårt konsumerer Felleskatalogens API, cacher resultater og eksponerer et enkelt søkebruk for appen. Bekreftelses-e-post sendes via samme mekanisme som dagens nettside (felleskatalogen.no/medisin/doping-bekreftelse), fra ADNOs egen avsender­adresse.

**Caching:** legemiddel­data caches i 24 timer i backend, slik at appen fungerer raskt selv når Felleskatalogens API er tregt, og slik at søk ikke belaster Felleskatalogen unødig.

### WADA Prohibited List (søk i dopinglista)

WADA publiserer dopinglista som en maskinlesbar liste oppdatert minst årlig (1. januar), med fortløpende tillegg. Vi implementerer følgende:

- Backend henter fullt datasett fra WADA ved oppstart og deretter daglig (cron).
- Datasettet lagres i Postgres med full tekstsøk (Postgres `tsvector`).
- Appen søker mot vårt API, ikke direkte mot WADA — dette gir rask respons og et grensesnitt som er utformet for utøvere (ikke regulatorer, slik WADAs egen søkeside er).
- Ved manglende treff får utøveren en direkte knapp: «Send spørsmål til ADNOs medisinske rådgiver» — spørsmålet sendes som e-post eller til meldings­senter, etter ADNOs valg.

### TASK (e-læring Ren Utøver)

E-læringen blir liggende hos TASK. Vi kobler fra appen via **SSO (OpenID Connect eller SAML, avhengig av hva TASK tilbyr)** slik at utøveren ikke må logge inn på nytt. I praksis:

- Utøveren trykker «Ren Utøver»-ikonet på hovedsiden.
- Appen henter et engangs­token fra backend, videresender til TASK.
- TASK-læringen åpnes i en in-app browser (SFSafariViewController på iOS, Custom Tabs på Android) — ADNOs logo og farger er synlige, overgangen føles sømløs.

Tekniske avklaringer med TASK tar vi i første sprint, som kravspesifikasjonen anviser.

### Push-varsling (FCM + APNs + meldings­senter)

Push-varsling implementeres via **Firebase Cloud Messaging (Android) og Apple Push Notification Service (iOS)**. ADNO får et eget admin-panel (se § 1.5) hvor dere kan sende varsler:

- Valg av målgruppe (alle, spesifikk rolle, brukere med spesifikk kategori påslått).
- Tittel + brødtekst + valgfri lenke.
- Alle sendte meldinger lagres i **meldings­senter** i appen, slik at utøveren finner dem igjen.
- Utøveren kan skru av push per kategori (regler, hastevarsler, nyheter) i innstillinger.

Push triggs kun av ADNO — aldri av andre brukere, aldri automatisk. Dette speiler kravspesifikasjonen § 7 («Pushvarsler: skal kun sendes når det aktivt trigges av ADNO»).

### Varslingskanal (dopingvarsel)

Varslingskanalen (whistleblowernetwork.net) er en ekstern tredjepart­tjeneste og skal forbli det — av personvern- og integritets­hensyn. Vi implementerer:

- Egen skjerm i appen som forklarer hva varsling er og hvordan anonymitet ivaretas.
- Knapp «Gå til anonymt varsel» som åpner whistleblowernetwork i en **sikker in-app browser** (med session-isolasjon, ingen cookie-lagring i appen).
- Ingen logging av at brukeren har trykket på knappen — dette er kritisk for anonymitet.

### E-post (bekreftelser, kontakt)

Transaksjonell e-post sendes via **Postmark** eller **SendGrid** (ADNOs valg), fra en avsender­adresse under antidoping.no-domenet. Vi setter opp SPF, DKIM og DMARC slik at e-postene ikke havner i søppel­post­mappen.

### Kontakt oss / chat

Chat-widget integreres via **Intercom** eller **Zendesk** (avhengig av hvilken leverandør ADNO allerede bruker for kunde­support). Utenfor åpningstid vises et kontakt­skjema som sendes til ADNOs support-postboks og returnerer svar via SMS eller i appens meldings­senter.

## 1.5 Forvaltning og oppdaterbarhet

Dette er kriteriet hvor mange app-leveranser faller igjennom etter lansering: ADNO må kunne oppdatere innhold uten å ringe oss, og uten å vente på app-store-godkjenning. Vi har designet dette inn fra start.

### Admin-panel for ADNO

Vi leverer et **web-basert admin-panel** (kjører på Azure, samme infrastruktur som API-et) der ADNO-ansatte logger inn og forvalter appen uten teknisk bistand:

| Hva ADNO kan endre selv | Hvor |
|---|---|
| Kosttilskudd-spørsmål (tekst, vekting, rekkefølge) | Admin → Risikosjekk |
| Risiko-terskler (grense for lav/middels/høy) | Admin → Risikosjekk → Terskler |
| Veileder medisinsk fritak (tekst, seksjoner, skjemaer) | Admin → Veiledere |
| Astma-medisiner og doser i kalkulatoren | Admin → Astmakalkulator |
| Push-meldinger (komposisjon, målgruppe, sending) | Admin → Meldinger |
| Meldings­senter-innhold | Admin → Meldinger |
| Kontakt­informasjon, åpningstider, lenker | Admin → Konfigurasjon |
| Onboarding-tekst, samtykke­tekst, versjons­merking | Admin → Onboarding |

Admin-panelet er rollestyrt (redaktør, administrator) med full **revisjons­logg**: hvem endret hva når. Dette er viktig for ADNOs eget kvalitets­arbeid og for sporbarhet ved WADA-revisjoner.

### Automatisk oppdatering av eksterne datasett

- **WADA-dopinglista** oppdateres automatisk hver natt fra WADAs kilde. ADNO får push-varsel i admin­panelet ved hver oppdatering: «Ny versjon av dopinglista publisert — X nye substanser, Y fjernet.» Dere kan deretter velge å varsle utøverne via push.
- **Felleskatalogen** hentes live ved hvert søk (med 24t cache), så medisinsk data er alltid ferskt.

### App-innhold uten butikk­godkjenning

Alt tekst- og konfigurasjons­innhold i appen hentes fra backend ved oppstart og caches lokalt. Det betyr at når ADNO endrer en tekst i admin-panelet, oppdateres appen **uten** at utøveren må laste ned ny versjon fra App Store / Google Play. Kun endringer i appens *funksjonalitet* eller visuelle design krever ny utrulling.

### App-store-publisering og livssyklus

Vi tar fullt ansvar for publisering og vedlikehold av app-butikkene gjennom hele garanti­perioden:

- **Apple App Store Connect** og **Google Play Console** settes opp i ADNOs egne developer-kontoer — dere eier distribusjonen.
- Metadata, screenshots, beskrivelse og policy-dokumenter leveres av oss.
- Review-prosesser og eventuelle tilbake­meldinger fra Apple/Google håndteres av oss.
- Versjons­håndtering og release-noter vedlikeholdes i git og publiseres per release.
- Asbjørn har publisert apper i begge butikkene tidligere for Equinor, NLR (TryggDrift) og Easee (EaseePay + Easee-appen) — review-prosessene er kjent farvann.

### 12 måneders garanti inkludert

Fastpris på 1 600 000 NOK inkl. mva dekker:

- Full utvikling (6 måneder, juli–desember 2026)
- App-store-publisering på iOS og Android
- **12 måneders garanti** på levert funksjonalitet, inkludert:
  - Feilretting og bug-fixes
  - Sikkerhets­oppdateringer av React Native og avhengig­heter
  - Plattform­oppdateringer (iOS/Android årlige SDK-oppgraderinger)
  - Drift og overvåking av backend
  - Respons­tid: maksimalt 24 timer på virkedager for kritiske feil
- Opplæring av ADNOs admin-brukere (workshop + skriftlig manual)

## 1.6 Se det selv: klikkbar prototype før tildeling

Vi har bygget en klikkbar prototype av hele appen — onboarding, hovedside, risikosjekk kosttilskudd, legemiddelsøk, dopinglista, meldings­senter, astmakalkulator, medisinsk fritak, varsling, innstillinger. Alt på plass, ADNOs farger, ADNOs tonevalg, ADNOs logo.

**URL:** `https://antidoping.asbjornrorvik.dev`
**Passord:** sendes på forespørsel til oppdragsgivers tilbudskontakt (eller Dag Thomas Nybø-Sørensen, Inventura)

Prototypen viser hvordan den ferdige appen skal se ut og oppføres. Vi har ikke levert dette som en ekstra pdf med skjermdumper — vi har levert det som en klikkbar opplevelse, slik at ADNO kan sette seg inn i løsningen på samme måte som en utøver vil bruke den.

Dette er en del av vår arbeidsform. Vi leverer tidlig, i kjørbar form, og lar kunden reagere på noe konkret — ikke på en beskrivelse.

---

*Denne seksjonen er én av fire seksjoner i Bilag 2. Se også: seksjon 2 (leveranse­metodikk), seksjon 3 (kompetanse og referanser), seksjon 4 (forvaltning etter levering).*
