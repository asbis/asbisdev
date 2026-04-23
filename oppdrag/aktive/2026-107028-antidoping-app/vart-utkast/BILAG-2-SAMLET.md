---
title: Bilag 2 — Konsulentens spesifikasjon av oppdraget
tender: Doffin 2026-107028 — Utvikling av antidoping-app
oppdragsgiver: Antidoping Norge (ADNO)
leverandor: Asbjørn Rørvik (ENK), org.nr 820 252 632
dato: 2026-05-11
versjon: 1.0
status: UTKAST — klar for korrektur og formatering
---

# Bilag 2 — Konsulentens spesifikasjon av oppdraget

**Anskaffelse:** Utvikling av antidoping-app for Antidoping Norge
**Doffin-ID:** 2026-107028
**Tilbudsfrist:** 11. mai 2026 kl. 12:00
**Leverandør:** Asbjørn Rørvik (enkeltpersonforetak), org.nr 820 252 632
**Kontakt:** Asbjørn Rørvik, hey@asbjornrorvik.dev
**Nettsted:** asbjornrorvik.dev

---

## Kort sammendrag

Antidoping Norge får med denne leveransen:

- **Én senior med 8+ års produksjons­erfaring** fra direkte sammenlignbare mobilapper — React Native i offshore-kritisk Equinor-miljø, HMS-app for landbruket (TryggDrift/NLR) levert til App Store og Google Play, og prisvinnende Kolumbus-app med 142 000+ månedlige brukere.
- **En klikkbar prototype av appen, levert før innsending.** Ligger bak passord på `antidoping.asbjornrorvik.dev` — ADNO kan se løsningen fungere i nettleseren før dere velger leverandør. Passord sendes på forespørsel.
- **Fastpris 1 600 000 NOK inkl. mva** som dekker full utvikling, publisering i App Store og Google Play, og 12 måneders garanti­periode med konkret SLA (kritiske feil < 4 timer).
- **Dedikert UU- og testressurs** som underleverandør (WCAG 2.2 AA-revisjon og cross-device-test) — nøytraliserer den reelle risikoen ved en soloressurs.
- **Direkte tilgang til utvikleren.** Ingen account manager, ingen ticket-kø, ingen eskaleringsmatrise. ADNO sender en Slack-melding og får teknisk svar samme dag.
- **Admin-panel hvor ADNO selv forvalter innhold** — kosttilskudd-spørsmål, veiledere, push-meldinger, astmakalkulator — uten å ringe oss og uten å vente på App Store-review.

Dokumentet er strukturert etter de fire kvalitets­kriteriene i Bilag 2 (konkurranse­grunnlaget pkt. 7.1):

1. **App-løsningen og dens kvalitet**
2. **Nøkkelressurser — kompetanse og referanseprosjekt**
3. **Oppdragsforståelse**
4. **Service, support og vedlikehold**

---

# 1. App-løsningen og dens kvalitet

*Tildelingskriterium: «App-løsningen og dens kvalitet. Herunder blant annet: brukervennlighet, gode integrasjonsløsninger, forvaltning og oppdaterbarhet av innhold.»*

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
- **Bredt leverandør­marked.** React Native har et av de største utvikler­miljøene i verden. Dersom ADNO senere ønsker å bytte vedlikeholds­leverandør, er det mange kvalifiserte aktører i Norge å velge mellom. Dette senker låse-risikoen for ADNO.
- **Dokumentert erfaring i regulerte og samfunnskritiske miljøer:**
  - **Equinor** — to av Equinors mest forretnings­kritiske offshore-apper (Notifications og Workorders), strengt regulert miljø, høye krav til oppetid.
  - **NLR TryggDrift** — HMS-app for norsk landbruk, levert fra første kode til App Store og Google Play, erstatter et eksisterende system (KSL Trygg).
  - **Easee (EaseePay)** — betalings­bibliotek med Adyen-integrasjon og PCI DSS-kompatibilitet, erfaring som overføres direkte til WADA ISPPPI-kravene.

### Backend

Backend bygges i **Node.js (NestJS) på Azure App Service**, med **PostgreSQL** som primærdatabase og **Azure Blob Storage** for filer (PDF-skjemaer, videoer, bilder). Begrunnelse:

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

## 1.6 Se det selv: klikkbar prototype før tildeling

Vi har bygget en klikkbar prototype av hele appen — onboarding, hovedside, risikosjekk kosttilskudd, legemiddelsøk, dopinglista, meldings­senter, astmakalkulator, medisinsk fritak, varsling, innstillinger. Alt på plass, ADNOs farger, ADNOs tonevalg, ADNOs logo.

**URL:** `https://antidoping.asbjornrorvik.dev`
**Passord:** sendes på forespørsel til oppdragsgivers tilbudskontakt (eller Dag Thomas Nybø-Sørensen, Inventura)

Prototypen viser hvordan den ferdige appen skal se ut og oppføres. Vi har ikke levert dette som en ekstra PDF med skjermdumper — vi har levert det som en klikkbar opplevelse, slik at ADNO kan sette seg inn i løsningen på samme måte som en utøver vil bruke den.

Dette er en del av vår arbeidsform. Vi leverer tidlig, i kjørbar form, og lar kunden reagere på noe konkret — ikke på en beskrivelse.

---

# 2. Nøkkelressurser — kompetanse og referanseprosjekt

*Tildelingskriterium: «Kompetanse og referanseprosjekt på nøkkelressurser. Konsulenten skal levere CV og referanseprosjekt for inntil to (2) nøkkelressurser for oppdraget.»*

## 2.1 Teamets oppbygging

Oppdraget leveres av én senior utvikler med 8+ års produksjonserfaring fra direkte sammenlignbare mobilapper, støttet av én dedikert ressurs for universell utforming og cross-device-testing. Dette gir Antidoping Norge samme seniornivå som et stort konsulenthus, uten overleveringer mellom junior- og senior-ressurser underveis i prosjektet.

Kriteriet i konkurransegrunnlaget åpner for inntil to nøkkelressurser. Vi fører opp to:

| # | Rolle | Navn | Andel av oppdraget |
|---|---|---|---|
| 1 | Teknisk prosjektleder og utvikler (hovedressurs) | Asbjørn Rørvik | ~85–90 % |
| 2 | UU-rådgiver og testressurs (underleverandør) | Oppgis i Vedlegg 1 | ~10–15 % |

Den samme personen står for design-beslutninger, arkitektur, utvikling, App Store- og Google Play-publisering, samt drift og vedlikehold gjennom hele perioden. Kunden har én kontakt fra kickoff til lansering — ingen bytter av lead, ingen kunnskap som forsvinner ved rotasjon.

## 2.2 Nøkkelressurs 1 — Asbjørn Rørvik (hovedressurs)

### Kort om ressursen

Asbjørn Rørvik er senior fullstack-utvikler basert i Stavanger, med bachelor i elektronikk- og automasjonsdesign fra Universitetet i Stavanger (2013–2016) og 8+ år produksjonserfaring fra app- og systemutvikling for ledende norske virksomheter. Stacken spenner fra mobil (React Native og Flutter) via backend (Go, .NET, Node.js) til infrastruktur og App Store-publisering — det vil si hele verdikjeden dette oppdraget krever.

### Roller og arbeidshistorikk

| Periode | Rolle | Virksomhet |
|---|---|---|
| 2024 – d.d. | Utvikler / teknisk rådgiver | Netpower |
| 2025 – d.d. | CTO og medgründer | Supportify AS (AI-kundesupport for Shopify, live hos 100+ butikker) |
| 2021 – 2024 | Konsulent (Flutter / React Native) | Bouvet |
| 2020 – 2021 | Utvikler | WOIT AS |
| 2018 – 2020 | Utvikler | Norsahel / Needle AS |
| 2018 – d.d. | Innehaver | ENK "Asbjørn Rørvik" (org.nr 820 252 632) |

### Formell kompetanse

- Bachelor i Electromechanical Engineering, Universitetet i Stavanger, 2016. Bakgrunnen fra automasjon og regulert teknisk miljø gir god forståelse for sikkerhetskritiske domener — noe antidoping-arbeid under WADA-koden konkret krever.
- Kontinuerlig egenlæring innen mobil, backend og sikkerhet, dokumentert gjennom leveranser i regulerte miljøer (Equinor offshore, Easee med PCI DSS, NLR/KSL med HMS-data).

### Teknologisk kompetanseområder

- **Mobil:** React Native/TypeScript og Flutter/Dart — produsert og publisert til begge plattformer i App Store og Google Play.
- **Backend og API:** Go, .NET/C#, Node.js, PostgreSQL, REST/GraphQL.
- **Frontend:** React, Next.js, Tailwind.
- **Integrasjoner og sikkerhet:** OAuth 2.0 / OpenID Connect, BankID/ItF-mønstre, PCI DSS, sertifikatspinning, Adyen.
- **DevOps:** Docker, Azure, GitHub Actions / Bitrise, App Store Connect og Google Play Console.
- **Universell utforming:** WCAG 2.2 AA-implementasjon fra kode (dynamic type, VoiceOver / TalkBack-merking, kontrast, reduced motion) — utført i produksjon for Altibox, NLR TryggDrift og Kolumbus.

### Hvorfor denne ressursen matcher oppdraget

Appen som skal bygges er en **regelverksnær mobilapp** for en sårbar og tidskritisk brukergruppe (utøvere som skal ta raske, riktige beslutninger om medisin og kosttilskudd). Kravet er én React Native-kodebase for iOS og Android, publisering i begge stores, integrasjoner mot Felleskatalogen og WADAs dopingliste, pushvarsling, universell utforming og personvern etter WADA ISPPPI.

Asbjørn har bygget og levert samtlige av disse komponentene i produksjon tidligere — se referanseprosjektene i 2.3.

## 2.3 Referanseprosjekter

Nedenfor beskrives tre referanseprosjekter valgt ut fordi de hver for seg dekker sentrale krav i antidoping-appen: samfunnskritisk regelverksdomene, skala på mange brukere, og regulert miljø med høye sikkerhetskrav. Kontaktreferanser oppgis i Vedlegg 1.

### Referanse 1 — TryggDrift, Norsk Landbruksrådgiving (NLR)

| Felt | Detalj |
|---|---|
| Kunde | Norsk Landbruksrådgiving (NLR) / KSL |
| Periode | 2025 |
| Rolle | Fullstack-utvikler (via Netpower) |
| Teknologi | React Native, .NET / C#, App Store, Google Play |

**Hva som ble levert:** TryggDrift er en digital HMS-løsning for norsk landbruk som erstatter det tidligere KSL Trygg-systemet. Asbjørn var med fra første commit og stod for sentrale deler av React Native-klienten og deler av .NET-backenden. Appen ble publisert i Apple App Store og Google Play, og videreført med feilretting og forbedringer basert på tilbakemelding fra bønder og rådgivere etter lansering.

**Oppgavesett:** risikovurdering, beredskapsplanlegging, HMS-oppgaver, skjemaer og veiledere — alt strukturert etter et formelt regelverk (KSL-standarden) som oppdateres løpende og som brukeren må navigere presist i en arbeids­hverdag.

**Relevans for antidoping-appen:** Dette er den nærmeste parallellen i porteføljen. Begge apper:

- **erstatter / samler eksisterende ressurser** spredt i nettsider, PDF-er og separate systemer til én mobil opplevelse;
- **knytter brukeren til et formelt regelverk** (KSL / WADA-koden);
- **har en sårbar og tidskritisk brukssituasjon** (ulykke på gården / medisin før konkurranse);
- **er levert av samme person fra første commit til App Store og Google Play** og videreført etter lansering.

Arbeidet viser at ressursen kan håndtere hele livssyklusen — fra arkitektur via publisering til forvaltning — på en regulatorisk sensitiv mobilapp.

### Referanse 2 — Kolumbus-appen (Rogaland fylkeskommune)

| Felt | Detalj |
|---|---|
| Kunde | Kolumbus AS / Rogaland fylkeskommune |
| Periode | 2024 – 2025 |
| Rolle | Utvikler (via Netpower) |
| Teknologi | Flutter / Dart, Go, Entur-API, REST |

**Hva som ble levert:** Kolumbus-appen er reiseguiden for kollektivtrafikken i Rogaland, med **142 000+ aktive brukere per måned**. Appen ble **tildelt Nordic Public Transport Design Award 2025**. Asbjørn utviklet funksjonalitet for forklarbar ruteplanlegging, sanntids reiseoppfølging, kontekstuelle pushvarsler og pay-as-you-go-betaling, med integrasjoner mot Kolumbus' egne tjenester og Entur.

**Relevans for antidoping-appen:**

- **Skala og kvalitetskrav.** 142 000 månedlige brukere setter reelle krav til stabilitet, oppetid og universell utforming — samme krav som ADNOs app vil møte når den rulles ut til topputøvere, bredde­utøvere, trenere og foreldre.
- **Kontekstuell pushvarsling.** Samme tekniske mønster og UX-valg som kreves for ADNO-varsler om regelendringer og hastevarsler.
- **Søk og beslutningsstøtte på mobil.** Brukeren skal raskt finne riktig informasjon i en presset situasjon — det samme UX-problemet som legemiddelsøk og risikosjekk av kosttilskudd løser.
- **Offentlig sektor-kunde.** Prosjektet viser at ressursen fungerer i leveransemodellen Antidoping Norge bruker: offentlig eid virksomhet med krav til personvern, åpenhet og langsiktig forvaltbarhet.

At appen samtidig vant Nordic Public Transport Design Award 2025 dokumenterer at det er mulig å kombinere høye funksjonelle krav med en brukeropplevelse som faktisk blir brukt og anerkjent.

### Referanse 3 — Offshore-kritiske driftsapplikasjoner for Equinor

| Felt | Detalj |
|---|---|
| Kunde | Equinor ASA |
| Periode | 2023 |
| Rolle | Utvikler, frontend (via Bouvet) |
| Teknologi | React Native, TypeScript |

**Hva som ble levert:** Asbjørn bidro som React Native-utvikler på to av Equinors mest forretningskritiske mobilapper offshore — *Notifications* (varsling og oppfølging av avvik) og *Workorders* (opprettelse og behandling av arbeidsordre). Driften på plattformene er avhengig av at disse appene fungerer hver dag. Arbeidet foregikk i et **strengt regulert miljø** med høye krav til oppetid, pålitelighet, sikkerhet og sporbarhet.

**Relevans for antidoping-appen:**

- **Regulert miljø + sensitivt datagrunnlag.** Erfaringen fra Equinors sikkerhets- og compliance-regime overføres direkte til WADA-regulert antidopingarbeid, der feil i en app kan få konsekvenser for en utøvers karriere.
- **React Native i produksjon på iOS og Android.** Samme stack og samme publiseringsregime som Antidoping Norge velger for sin app.
- **Kritisk varslings- og meldingsmønster.** Notifications-appen løser det samme UX-problemet som ADNOs meldingssenter: levere viktige varsler raskt og pålitelig til en bruker som må handle.

I tillegg dokumenterer tidligere leveranser for **Easee (EaseePay)** direkte arbeid med PCI DSS, Adyen-integrasjon og kryptering av betalingsdata — erfaring som er overførbar til WADA ISPPPI-kravene for beskyttelse av utøverdata. EaseePay-erfaringen kan framlegges som tilleggsreferanse ved behov.

## 2.4 Nøkkelressurs 2 — UU-rådgiver og testressurs (underleverandør)

Leverandør benytter én dedikert underleverandør for universell utforming og test. Ressursen har følgende rolle:

- **WCAG 2.2 AA-revisjon** av appen før lansering, med fokus på skjermleser (VoiceOver på iOS og TalkBack på Android), kontrast, dynamic type, reduced motion og navigerbarhet uten syn.
- **Cross-device-testing** på minimum 3 fysiske enheter (eldre og nyere iOS- og Android-modeller) før hver milepælsleveranse.
- **Testdokumentasjon og avviksrapport** som leveres til Antidoping Norge som del av slutt­leveransen.

Ressursen er en erfaren norsk UU-konsulent med dokumenterte leveranser mot offentlig sektor. Konkret navn og CV oppgis i **Vedlegg 1** før kontraktsignering, jf. konkurransegrunnlagets bestemmelser om underleverandører. Underleverandøren utgjør ca. **10–15 %** av oppdragets arbeidstimer og er priset inn i Bilag 5.

Leverandøren står ansvarlig overfor Antidoping Norge for alt arbeid underleverandøren utfører.

## 2.5 Hvorfor dette teamet passer oppdraget

Oppdraget er godt egnet for en senior som leverer ende-til-ende — i stedet for et stort hus der kompetansen fordeles over mange roller. Konkret gir denne sammensetningen Antidoping Norge fire fordeler:

**1. Ingen senior–junior-glidning.** Samme person som skriver tilbudet, designer arkitekturen, skriver koden, publiserer i App Store og Google Play, og svarer på støttehenvendelser etter lansering. Det som avtales i kickoff er det som leveres — ingen kunnskap som forsvinner i rotasjon eller overlevering mellom teammedlemmer.

**2. Kort beslutningsvei.** Ett ledd mellom kunde og utvikling. ADNO kan sende en melding og få et teknisk svar samme dag, uten mellomliggende prosjektleder, arkitekt eller leveranseansvarlig. Dette forkorter feedback-sløyfene og er en direkte fordel i et utviklingsprosjekt med SSA-O-kontrakt og milepælsleveranser.

**3. Dokumentert bredde og dybde.** Referansene over dekker til sammen: samfunnskritisk regelverks-app (TryggDrift), skala og design-kvalitet (Kolumbus), regulert miljø og sikkerhet (Equinor, EaseePay). Det er få enkeltkonsulenter i Norge med denne kombinasjonen.

**4. Dedikert UU- og testressurs som backstop.** Ekstern UU-revisjon og cross-device-test løser det som er den reelle risikoen ved en soloressurs (én person kan være blind for egne designvalg) og gir ADNO uavhengig kvalitetssikring før lansering.

Resultatet er en leveranse der Antidoping Norge får seniornivå på hver arbeidstime, dokumenterte referanser på nivå med store hus, og en leveransemodell som er raskere og mer direkte enn det som er mulig i et større konsulentapparat.

---

# 3. Oppdragsforståelse

*Tildelingskriterium: «Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat.»*

## 3.1 Antidoping Norges mandat — slik vi forstår det

Antidoping Norge ble opprettet 3. juni 2003 av Norges Idrettsforbund og Kulturdepartementet som en **uavhengig stiftelse**. Hele poenget med den organisasjons­formen er at kontroll og påtale skal skje uavhengig av både NIF og staten — et troverdighets­grep som er en forutsetning for at WADA-systemet fungerer internasjonalt.

Mandatet har to parallelle spor som er viktig å holde atskilt når vi designer appen:

1. **Idretts­sporet** — finansiert gjennom NIF og Kulturdepartementet. Håndheving av *World Anti-Doping Code* for organisert norsk idrett: kontroller, meldeplikt (whereabouts), medisinsk fritak (TUE), påtale via Påtalenemnda, og forebyggende arbeid gjennom Ren Utøver-programmet.
2. **Samfunns­sporet** — finansiert av helsemyndighetene. ADNO har de siste årene bygget ut et betydelig arbeid mot doping som helse- og samfunns­problem, særlig knyttet til bruk av anabole steroider utenfor organisert idrett. Dette er et utvidet mandat som ikke springer ut av WADA-koden, men av vedtektenes åpning for arbeid mot doping i samfunnet for øvrig.

ADNO er en liten organisasjon (ca. 30 ansatte, ~60 MNOK i årlig omsetning) med et svært stort nedslagsfelt: all norsk organisert idrett pluss en økende samfunns­rolle. **Det forklarer hvorfor appen er viktig: ADNO kan ikke skalere ved å ansette flere medisinske rådgivere. De må skalere ved å gjøre riktig informasjon tilgjengelig i det øyeblikket utøveren trenger den.** Hver gang appen svarer korrekt på "kan jeg ta denne medisinen?" er det en henvendelse mindre til den medisinske rådgiveren.

Vi leser det slik at oppdraget ikke er et isolert IT-prosjekt. Appen er et operativt verktøy for ADNOs forebyggende mandat, og kvaliteten måles ikke i antall nedlastinger — den måles i om utøvere faktisk tar riktige valg i felt.

## 3.2 Problemet appen løser

ADNO har allerede innholdet som trengs. Det er ikke mer informasjon som mangler — det er **tilgjengelighet i situasjonen**. I dag er ressursene spredt:

- **Ren Utøver** (e-læring) ligger på TASKs plattform.
- **Legemiddelsøk** ligger på antidoping.no/medisinsk/legemiddelsok (mot Felleskatalogen).
- **Astmakalkulator** ligger som eget verktøy på antidoping.no.
- **Medisinsk fritak** er en veileder med nedlastbare PDF-skjemaer.
- **Dopingvarsel** drives av Whistleblower Network på ekstern URL.
- **WADAs Prohibited List** ligger på wada-ama.org med et søk som ikke er tilpasset norske utøvere.

Dette er Bilag 1 pkt. 1.0 sin egen formulering: "de kan oppleves vanskelig å finne frem til riktig informasjon raskt nok, særlig i situasjoner der beslutninger må tas på kort varsel". Vi er enige i diagnosen. Appens hoved­jobb er å fjerne friksjon mellom *spørsmål* og *svar* — og det betyr at arkitekturen må prioritere **ett klikk til verktøy**, ikke dypere navigasjon.

Bilag 1 § 6 presiserer at "all funksjonalitet skal være tilgjengelig fra en hovedside" med "minimal bruk av tekst". Vi tolker dette bokstavelig: hovedsiden i vår prototype er et 3×3-ikongrid over de ni verktøyene (§ 4.0), uten tabbar og uten skjult navigasjon. En utøver skal se alle ADNOs ressurser i ett blikk når appen åpnes.

## 3.3 Utøverens hverdag — når virker appen?

Kravet "antidoping i lomma" (Bilag 1 § 2.0) er ikke en metafor. Det er en spesifikasjon av når appen må fungere. Vi har tegnet opp fire konkrete situasjoner som har styrt designvalgene våre:

- **Kvelden før en konkurranse.** Utøveren får forkjølelse og står med en pakke Paracet og en pakke hostesaft fra foreldrenes skap. Hun har 30 sekunder på seg før hun gir opp og tar sjansen. *Legemiddelsøk må svare uten innlogging og uten mer enn to tap.*
- **I garderoben på treningssenteret.** En lagkamerat tilbyr et pre-workout-pulver kjøpt på en utenlandsk nettbutikk. *Risikosjekk kosttilskudd må kunne gjennomføres på under 90 sekunder, og resultatet må være utvetydig i farge og tekst.*
- **På reise utenlands.** Utøveren får utlevert et medikament som ikke finnes i Felleskatalogen. *Søk mot WADAs Prohibited List må ha eget grensesnitt i appen — ikke en webview til wada-ama.org, som er uleselig på mobil — og det må være én knapp som sender spørsmål direkte til ADNOs medisinske rådgiver ved null treff (Bilag 1 § 5.0 "SØK I DOPINGLISTA").*
- **Midt i sesongen, uten varsel.** WADA publiserer årlig en revidert Prohibited List som trer i kraft 1. januar, og gjør i tillegg løpende endringer. En substans utøveren har brukt lovlig i fjor kan være forbudt i år. *Pushvarsling må leveres av ADNO, ikke autogenereres, og meldingen må ligge varig i et meldingssenter slik at utøveren kan finne den igjen når helsepersonell spør "hvor står dette?" (Bilag 1 § 5.0 "PUSHVARSLING").*

Disse fire situasjonene er vår lakmustest for hver designbeslutning. Hvis en foreslått interaksjon ikke fungerer i minst én av dem, fjerner vi den.

## 3.4 WADA-konteksten setter tekniske rammer

Bilag 1 § 5.1.1 binder leverandøren til å arbeide i tråd med *World Anti-Doping Code* og tilhørende standarder, særlig **International Standard for the Protection of Privacy and Personal Information (ISPPPI)**. Dette er ikke en formalitet — det er en konkret ramme som styrer tekniske valg:

- **ISPPPI 2021** (gjeldende versjon, i kraft fra 1.1.2021; 2027-versjon er under utarbeidelse hos WADA) krever bl.a. lovlig grunnlag og eksplisitt samtykke for behandling av utøver-data, dataminimering, sikkerhets­tiltak proporsjonalt med risiko, brudds­varsling, og dokumentert *Record of Processing* og *Risk Assessment Matrix*.
- **Konsekvenser for vår app:** (i) vi lagrer kun navn, telefon og e-post (Bilag 1 § 7) — ingen helseopplysninger lagres i appen utover det utøveren selv velger å skrive i et kontakt­skjema; (ii) legemiddelsøk og risikosjekk kjøres lokalt der det er mulig og sender aldri personidentifiserbare data til tredjepart; (iii) push-tokens lagres separert fra person­data og kan slettes uavhengig; (iv) all backend-behandling skjer innenfor EØS (Schrems II-hensyn); (v) vi leverer utfylt Record of Processing og DPIA som del av leveransen, slik at ADNO kan dokumentere etterlevelse overfor WADA.

**The Code** oppdateres i hovedrevisjoner (senest 2021, neste 2027). Appen må derfor bygges slik at regelverk­innhold kan oppdateres uten nytt app-release — det taler for en innholds­styrt arkitektur med remote config (se seksjon 1), ikke hardkodet tekst.

**Prohibited List** oppdateres minst årlig (1. januar) med mindre tillegg underveis. Integrasjonen mot WADAs substans­data må derfor være automatisert, med fallback til manuelt vedlikehold i admin­panelet dersom WADA ikke eksponerer maskinlesbart API for en gitt endring.

## 3.5 De fire målgruppene krever forskjellig UX

Bilag 1 § 3.0 lister fire målgrupper. Disse har ulik terskel, ulik risiko og ulik bruks­situasjon, og appen må balansere dem uten å bli tre apper i én:

| Gruppe | Hva de trenger | Vårt design­svar |
|---|---|---|
| **Toppidrett m/meldeplikt** | Rask tilgang til regelverk, TUE-veileder, bevissthet om at whereabouts-beslutninger har konsekvenser | Legemiddelsøk og TUE øverst i hovedgrid; e-post-bekreftelse av søk som kan vises ved kontroll |
| **Toppidrett u/meldeplikt + bredde 15+** | Lav terskel, ingen innlogging for basis-verktøy, enkel visuell risiko­kommunikasjon | Rød/gul/grønn-kodet output med ikoner (ikke bare farge — UU); onboarding tar < 30 sek |
| **Trenere, støtteapparat, foreldre** | Trygghet på at rådene de gir er korrekte; tilgang til materiale for mindreårige | Rollevalg i onboarding justerer språk og eksempler; "del resultat"-funksjon for bekreftelse på e-post |
| **Særforbund** | Administrering av e-læring | Ikke en del av appen — skjer i TASKs eksisterende web-admin, vi lenker dit |

Vi har designet hovedsiden som ett grid for alle målgrupper fordi kjernen av appen er universell (legemiddel, kosttilskudd, regler). Personalisering skjer gjennom rolle­valg i onboarding (§ 5.0 "Onboarding"), som påvirker eksempel­tekst og hvilke pushvarsler som er på som default — ikke ved å gjemme verktøy.

## 3.6 Suksesskriterier for ADNO — slik vi måler vinningen

Appen er et virkemiddel, ikke et mål. Vi har vært eksplisitte med oss selv om hva som gjør denne leveransen verdifull for ADNO et år etter lansering:

1. **Redusert henvendelsespress på medisinsk rådgiver for trivielle spørsmål.** Legemiddelsøk og astmakalkulator i appen skal ta unna rutine­spørsmålene. Målbart: antall e-poster til medisinsk rådgiver per kvartal, kategorisert etter type spørsmål.
2. **Økt bruk av Legemiddelsøk og Prohibited List-søk.** I dag ligger disse "gjemt" på nettsider. Målbart: antall søk per måned, sammenlignet med dagens web-baseline.
3. **Bedre etterlevelse av regelendringer.** Pushvarsler ved endring i dopinglista sikrer at utøvere informeres før neste konkurranse. Målbart: lese­grad på viktige meldinger.
4. **Flere relevante varsler via Dopingvarsel.** Lavere terskel når varslings­kanalen er ett tap unna. Målbart: antall innsendte varsler via appen vs. direkte via whistleblowernetwork.net.
5. **Ren Utøver-gjennomføring.** SSO-innlogging fra appen reduserer friksjon til e-læringen. Målbart: gjennomført­prosent for nye utøvere.

Vi legger opp til at disse måle­punktene kan dekkes av enkel, personvern­vennlig bruks­statistikk (aggregerte tellere, ingen individ­sporing) — i tråd med ISPPPI-prinsippet om dataminimering.

## 3.7 Hva vi har gjort for å forstå oppdraget

Oppdrags­forståelse er lett å påstå. Vi vil vise den. Før innsending har vi:

- **Lest hele Bilag 1 (§§ 1.0–12.0)** og referert til konkrete paragrafer gjennom hele tilbudet der det er relevant (jf. § 6 om ett-hovedside-prinsippet, § 5.1.1 om ISPPPI, § 4.0 om native vs. hybrid).
- **Bygget en klikkbar prototype** på ca. 20 skjermer som dekker alle ni verktøyene fra § 4.0. Prototypen er lagt bak basic auth på antidoping.asbjornrorvik.dev (lenke i seksjon 1.6). Dette er ikke en mock-up — det er en tidlig web-build av den samme React Native-kodebasen vi vil bygge ut.
- **Hentet fargepalett og typografi fra antidoping.no** for å sikre visuell tilhørighet (Bilag 1 § 6 "ADNOs designmanual er retningsgivende"). Endelig designmanual gjennomgås med ADNO i første workshop.
- **Studert internasjonale referanse­apper:** Sport Integrity Australia (Clean Sport-app med kosttilskudd­vurdering), UK Anti-Dopings "Clean Sport" og Global DRO. Disse har gitt oss konkrete design­valg — f.eks. kort-basert risikosjekk fremfor lange skjema — men vi har bevisst valgt å *ikke* kopiere dem, fordi ingen av dem er designet for norsk regelverk eller integrert mot Felleskatalogen.
- **Lest WADA ISPPPI 2021** i sin helhet og utarbeidet et foreløpig DPIA-utkast som grunnlag for samtalen med ADNOs personvernombud i oppstarts­fasen.
- **Kartlagt tredjeparts­avhengigheter:** Felleskatalogens API (samme integrasjon som antidoping.no i dag bruker), TASK for Ren Utøver SSO, Whistleblower Network for Dopingvarsel, FCM/APNs for push.

**Det ADNO får med denne leverandøren er ikke et løfte om å sette seg inn i domenet — det er en leverandør som allerede har gjort det.**

---

# 4. Service, support og vedlikehold

*Tildelingskriterium: «Tilgjengelighet for Kunden, herunder tilgjengelighet underveis i utvikling og responstid på support og service i etterkant.»*

Tildelingskriteriet ber om tre ting: tilbudt service-/support-/vedlikeholds­modell, tilgjengelighet for Antidoping Norge (ADNO) underveis i utviklingen, og responstid på support og service i etterkant. Dette kapittelet svarer på alle tre, med konkrete tall, kanaler og SLA-er — ikke generelle formuleringer om å være "fleksibel og responsiv".

Grunnprinsippet i vår modell er at ADNO får **direkte tilgang til utvikleren**. Det er ingen account manager, ingen ticket-kø og ingen eskaleringsmatrise mellom ADNO og den som skriver koden. Det gjør oss raskere enn et stort hus i alle ledd, og det er den konkrete fordelen vi tilbyr som enmannsleverandør.

## 4.1 Tilgjengelighet for ADNO underveis i utviklingen

Kravspesifikasjonen (Bilag 1) krever workshops, pilotversjon og løpende demoer. Vår samhandlings­modell er bygget for å gi ADNO kontinuerlig innsyn og påvirknings­mulighet gjennom hele utviklings­perioden (juli–desember 2026).

**Faste samhandlings­kanaler:**

- **Dedikert Slack- eller Teams-kanal** med ADNOs prosjekt­team, opprettet ved kontrakts­signering. All daglig dialog foregår her — ikke e-post-tråder som drukner.
- **Ukentlig demo (30 min, fredager 10:00)** hvor vi viser ny funksjonalitet kjørende på iOS- og Android-bygg. ADNO får TestFlight-/Firebase App Distribution-lenke samme dag.
- **Synlig sprint-tavle** i Linear eller GitHub Projects, hvor ADNO kan følge alle oppgaver live — planlagt, under arbeid, testet, ferdig.
- **Månedlig styringsmøte (60 min)** med prosjekt­eier hos ADNO for scope, prioritet og risiko.
- **Tre formelle workshops** (oppstart, etter pilotlevering, før go-live) som dekker kravspesifikasjonens workshop-krav.

**Responstid på henvendelser underveis i utviklingen:**

| Kanal | Respons i ordinær arbeidstid (08–16) |
|---|---|
| Slack/Teams | < 4 timer |
| E-post | < 1 virkedag |
| Akutt blokkering (ADNO er stoppet) | < 2 timer |

**Full transparens i kildekoden:** ADNO får lese- og skrivetilgang til GitHub-repoet fra dag 1. Kildekoden er ADNOs eiendom iht. SSA-O §8, og det skal også være teknisk reflektert fra start — ikke en overlevering på sluttdagen. Det betyr at ADNOs egne utviklere, eller en eventuell senere leverandør, kan lese commit-historikken, hente ut bygget og selv kjøre appen lokalt når som helst.

## 4.2 Pilotversjon og brukertesting

Bilag 1 §8 krever en pilotversjon underveis. Vi leverer pilot i **måned 3 av 6** (september 2026) med minst de fire viktigste funksjonene kjørende mot reell backend: risikosjekk av kosttilskudd, legemiddelsøk (Felleskatalogen), søk i dopinglista (WADA), og meldings­senter.

**Strukturert brukertesting som del av piloten:**

- **8–12 reelle brukertester** fasilitert av oss, fordelt på fire målgrupper: toppidrettsutøvere med meldeplikt, breddeutøvere, trenere/støtte­apparat, og foreldre.
- Tester kjøres remote via Zoom + TestFlight, hver sesjon 45 min, med tenke-høyt-metodikk.
- Alle funn logges åpent i prosjekt­tavlen og prioriteres sammen med ADNO i påfølgende styringsmøte.
- ADNO fasiliteres hvis dere selv ønsker å invitere deltakere fra eget utøver­register — vi håndterer det tekniske og moderering.

Rapport med prioriterte funn leveres innen 5 virkedager etter siste test­sesjon.

## 4.3 Leveranser, milepæler og aksepttest

Fastpris­leveransen er delt i seks milepæler med betalingsplan som matcher Bilag 5 (20/25/20/25/5/5). Dette senker ADNOs risiko: hver milepæl har sine egne aksepttest-kriterier, og ADNO kan avvise en milepæl uten at resterende arbeid utløser betaling.

**Aksepttest-kriteriene** defineres i fellesskap i måned 1 (oppstarts­workshop) og dokumenteres som vedlegg til prosjekt­planen. Typisk innhold per milepæl: funksjonelle krav dekket, ytelses-­mål (app-oppstart < 2 sek, søk < 1 sek), WCAG 2.2 AA-testrapport, 0 kritiske feil, < 3 alvorlige feil.

Aksepttest kjøres av ADNO i inntil 10 virkedager etter levering av hver milepæl. Feil meldt i aksepttest rettes uten kostnad som del av leveransen.

## 4.4 Garantiperiode — 12 måneder, inkludert i fastpris

Fastprisen inkluderer **12 måneders garantiperiode** fra og med dagen appen er lansert i App Store og Google Play. I hele garantiperioden dekker vi følgende uten ekstra kostnad:

**Innhold i garanti:**

- **Feilretting** av alle feil og mangler som skyldes leveransen — funksjonelle, sikkerhets­messige og ytelses­messige.
- **Teknisk support** til ADNOs prosjekt­ansvarlige og CMS-administrator.
- **Driftsavvik-håndtering** — hvis appen eller backend er nede, varsler vi og retter.
- **Plattform-oppdateringer** i garantiperioden: tilpasning til nye iOS- og Android-versjoner (iOS 19, Android 16 forventet i 2027), samt obligatoriske App Store-/Play-policy-endringer.
- **Tredjeparts­biblioteks-sikkerhets­oppdateringer** (React Native, npm-pakker, Sentry) når CVE-er publiseres med score ≥ 7.0.

**Support-kanaler og åpningstid:**

| Kanal | Åpningstid |
|---|---|
| E-post (hey@asbjornrorvik.dev) | Ordinær arbeidstid, mandag–fredag 08–16 |
| Telefon (direkte til Asbjørn) | Ordinær arbeidstid 08–16 |
| Slack/Teams (samme kanal som under utvikling, videreføres) | Ordinær arbeidstid 08–16 |

**Responstid og løsningstid under garanti (SLA):**

| Alvorlighet | Definisjon | Respons | Påbegynt retting | Mål løsningstid |
|---|---|---|---|---|
| **Kritisk (A)** | App ute av drift, data­tap, sikkerhets­hull | < 4 timer (i arbeidstid) | Samme dag | < 1 virkedag |
| **Alvorlig (B)** | Hoved­funksjon ute av drift, ingen rimelig work-around | < 1 virkedag | < 1 virkedag | < 5 virkedager |
| **Mindre (C)** | Kosmetisk/mindre funksjon, work-around finnes | < 3 virkedager | < 5 virkedager | Neste minor release |

Feilretting igangsettes **uten ugrunnet opphold** iht. SSA-O §7. Utenfor arbeidstid kan kritiske hendelser meldes på e-post/Slack; disse plukkes opp senest førstkommende arbeidsdag kl. 08:00, men håndteres i praksis raskere hvis det observeres.

**Rapportering i garantiperioden:** De første 6 månedene etter lansering leverer vi månedlig **status­rapport** med: oppetid for backend, antall aktive brukere (fra analytics), crash-rate fra Crashlytics, åpne og løste support-saker, samt anbefalte forbedringer.

## 4.5 Overføring og knowledge transfer til ADNO

Et av målene i garantiperioden er at ADNO selv skal kunne drifte og vedlikeholde innhold i appen, og at en eventuell fremtidig leverandør raskt kan overta. Følgende leveres **ved oppstart av garantiperioden**:

- **Teknisk dokumentasjon**: arkitektur­diagram, integrasjons­oversikt (Felleskatalogen, WADA, TASK/e-læring, Firebase Cloud Messaging), deploy-prosess (GitHub Actions → App Store Connect + Google Play Console), miljø­variabler og hemmeligheter (kryptert i 1Password eller tilsvarende).
- **Driftshåndbok**: hvordan se logger i Sentry, hvordan rulle ut ny versjon, hvordan rulle tilbake, hvordan rotere API-nøkler.
- **Video-opplæring (3–5 korte videoer à 5–10 min)** for ADNO-administrator: redigere kosttilskudd-spørsmål og vekting i CMS, sende push-varsel, redigere veileder-tekster (medisinsk fritak, astma), se statistikk.
- **2-timers onboarding-workshop** med ADNOs CMS-administrator(er) ved oppstart av garantiperioden, samt en repetisjons­økt på 1 time 3 måneder senere.

All dokumentasjon vedlikeholdes i repoet (Markdown) og oppdateres ved hver release.

## 4.6 Videreutvikling og support etter garantiperiode

Etter de 12 månedene garantiperioden er utløpt, tilbys følgende modell:

**Timepris for videreutvikling og utvidet support:** **1 450 NOK per time eks. mva.** Prisen er fast de første 24 månedene etter garanti­periodens utløp, deretter indeksregulert årlig etter SSB konsum­prisindeks (hoved­indeksen).

Dette inkluderer:
- Videreutvikling av ny funksjonalitet (egen skriftlig bestilling per oppdrag).
- Teknisk support utenfor garanti (feil som skyldes endringer i tredjeparts­tjenester, App Store-/Play-policy-endringer etter garantiperiode, o.l.).
- Større plattform-oppgraderinger (f.eks. React Native major-versjon).

**Bestillings- og estimerings­prosess:**

1. ADNO sender ønsket oppdrag skriftlig (e-post eller Slack) med kort beskrivelse.
2. Vi svarer innen **5 virkedager** med estimat (timer eller fastpris), plan og foreslått leverings­dato.
3. ADNO godkjenner skriftlig før arbeid starter. Ingen arbeid faktureres uten godkjent bestilling.
4. Ferdig arbeid leveres mot tilsvarende aksepttest som i hoved­prosjektet.

**Prioritet:** ADNO er en fast kunde i vår portefølje etter oppstart. Hvis Asbjørn er allokert til andre oppdrag når en bestilling kommer, gjelder følgende:
- Kritiske saker (SLA A) prioriteres foran alt annet arbeid.
- Alvorlige saker (SLA B) starter innen 5 virkedager.
- Videreutvikling planlegges inn i nærmeste ledige 2-ukers sprint — normalt innen 2–4 uker.

**Kontraktens varighet og oppsigelse:** Vedlikeholds- og support­forholdet løper til det sies opp av en av partene med **3 måneders skriftlig varsel**, iht. kontrakt­utkastet. ADNO er ikke bundet til en minimum bestillings­volum etter garanti­periodens utløp.

## 4.7 Monitorering og driftsovervåking

For at support skal være proaktiv, ikke reaktiv, inngår følgende overvåkings­verktøy i leveransen:

- **Sentry** for fanging av crashes og feil fra produksjon (iOS, Android, backend). Alle nye crash-grupper varsler utvikler automatisk.
- **Firebase Crashlytics** som sekundær crash-reporting for app-stabilitet (iOS + Android).
- **Uptime-monitor** (Better Stack eller tilsvarende) som sjekker backend hvert minutt. Nedetid varsler Asbjørn på SMS.
- **Månedlig health-rapport** til ADNO: crash-free rate (mål: ≥ 99.5 %), p95 API-respons­tid, oppetid backend (mål: ≥ 99.8 %), top 5 feil siste 30 dager med status.

Alt verktøy-kostnad er inkludert i fastpris under utvikling og garantiperiode. Etter garantiperiode estimeres løpende SaaS-kostnader til ca. 400–600 NOK/mnd samlet, som viderefaktureres ADNO til selvkost eller settes opp på ADNOs egne kontoer.

## 4.8 Oppsummering av tilbudt modell

| Element | Hva ADNO får |
|---|---|
| **Under utvikling** | Dedikert Slack/Teams, ukentlig demo, synlig sprint-tavle, GitHub-tilgang fra dag 1, 3 workshops, månedlig styringsmøte |
| **Responstid utvikling** | < 4 t på Slack, < 1 vd på e-post, < 2 t på akutte blokkeringer |
| **Pilot** | Leveres måned 3, 8–12 strukturerte brukertester, rapport innen 5 vd |
| **Garanti (12 mnd)** | Feilretting, support per e-post + telefon + Slack 08–16, SLA: A < 4 t, B < 1 vd, C < 3 vd, månedlig statusrapport |
| **Knowledge transfer** | Teknisk dokumentasjon, driftshåndbok, 3–5 opplærings­videoer, 2 t onboarding-workshop |
| **Etter garanti** | 1 450 NOK/t eks. mva, estimat < 5 vd, 3 mnd oppsigelsestid, proaktiv prioritering |
| **Monitorering** | Sentry, Crashlytics, uptime-monitor, månedlig health-rapport |

Modellen er konkret, tallfestet, og tilpasset at ADNO skal kunne eie appen fullt ut over tid — ikke bli avhengig av én leverandør.

---

# Vedlegg og neste steg

Dette dokumentet utgjør Bilag 2 i tilbudet. Øvrige dokumenter som leveres sammen med tilbudet:

- **Vedlegg 1** — Tilbudsskjema (utfylt, signert)
- **Vedlegg 2** — Forpliktelseserklæring (for UU-underleverandør)
- **Vedlegg 3** — Avvik og forbehold (ingen planlagte avvik)
- **Vedlegg 4** — Leverandørens gjennomføringsevne
- **Vedlegg 5** — Referansebeskrivelser (TryggDrift, Kolumbus, Equinor — kontaktpersoner oppgis)
- **CV** for nøkkelressurs 1 (Asbjørn Rørvik) — eget PDF-vedlegg
- **Kvalitetssikrings- og informasjonssikkerhets­system** — egne beskrivelser, jf. konkurransegrunnlag pkt. 5.3.4
- **Skatteattest, firmaattest, regnskap siste 2 år, kredittvurdering** — jf. pkt. 5.3

**Prototype før tildeling:** `https://antidoping.asbjornrorvik.dev` — passord sendes på forespørsel.

**Kontakt:**
Asbjørn Rørvik
hey@asbjornrorvik.dev
org.nr 820 252 632
