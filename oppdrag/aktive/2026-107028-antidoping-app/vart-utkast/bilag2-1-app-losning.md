---
title: "Bilag 2 — Seksjon 1: App-løsningen og dens kvalitet"
tender: 2026-107028
oppdragsgiver: Antidoping Norge
leverandor: Asbjørn Rørvik (ENK), org.nr 820 252 632
status: UTKAST
---

# 1. App-løsningen og dens kvalitet

*Tildelingskriterium fra konkurransegrunnlaget: «App-løsningen og dens kvalitet. Herunder blant annet: brukervennlighet, gode integrasjonsløsninger, forvaltning og oppdaterbarhet av innhold.»*

## 1.1 Min løsning i ett bilde

Jeg leverer én app — ikke en samling lenker. iOS og Android, lastbar fra App Store og Google Play, med ett klart designgrep: **alt utøveren trenger skal være tilgjengelig fra hovedsiden, på ett trykk**. Dette er ikke en tolkning fra min side, det er kravet fra Bilag 1 § 6: «Grafikken skal være enkel. Minimal bruk av tekst og all funksjonalitet skal være tilgjengelig fra en hovedside.»

Hovedsiden er et **3×3 ikongrid** med de ni funksjonene fra kravspesifikasjonen:

```
┌──────────────────────────────────────────┐
│  [ADNO-logo]              [🔔]  [👤]     │
├──────────────────────────────────────────┤
│                                          │
│   ⚗️           💊          📋            │
│ Kosttilskudd  Legemiddel-  Dopinglista   │
│               søk          (norsk)       │
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

Jeg har allerede bygget en klikkbar prototype av dette. **Den ligger på `asbjornrorvik.dev/no/oppdrag/antidoping-app` bak basic auth (passord: `antidoping2026`).** ADNO kan klikke seg gjennom alle ni funksjonene, se onboarding, se risikoscoren for kosttilskudd i grønt/gult/rødt, og få et konkret inntrykk av hvordan den ferdige appen vil se ut og oppføres. Jeg leverer før jeg har vunnet, slik at dere ikke trenger å ta mitt ord på at «det blir bra».

**Hva dette betyr for leveranse­risiko og framdrift:** Som del av tilbuds­arbeidet har jeg validert tekniske antakelser i prototypen — informasjons­arkitektur (3×3 hovedsiden), interaksjons­mønstre (risikosjekk-flyt, legemiddel­søk, dopingliste-oppslag), visuell identitet i tråd med ADNOs designmanual, og UU-grunnlag (skjermleser, dynamic type, kontrast). Dette betyr at sprint 1 etter kickoff går rett til **integrasjon mot ADNOs reelle datasett (Felleskatalogen, norsk dopingliste fra Crafts API) og innholds­produksjon med ADNO-redaktører**, framfor utforskende arkitektur­arbeid. Risikoen for tekniske over­raskelser i tidlig fase er dermed vesentlig redusert, og jeg kan møte fastpris- og tids­rammen (1,6 MNOK inkl. mva, 6 mnd) med høyere sikkerhet enn et team som starter fra blanke ark.

## 1.2 Teknisk arkitektur

### Rammeverk: React Native

Jeg bygger appen i **React Native (0.74+) med TypeScript**. Dette er et bevisst valg, ikke et standardvalg — og det svarer direkte på ADNOs preferanse i Sp.12: appen skal **oppleves som app**, og web-app vektes lavere fordi den «installeres ikke på nettsidene til målgruppen og oppleves mest som et web-verktøy». React Native rendrer faktiske native komponenter (UIKit/Material), installeres fra App Store og Google Play, og gir den native opplevelsen ADNO etterspør — i motsetning til en mobile-first webapp. Jeg kan på forespørsel vise tilsvarende RN-apper fra produksjon (Equinor Notifications/Workorders, NLR TryggDrift) slik at ADNO selv får sjekket opplevelse og funksjonalitet, slik Sp.12 åpner for.

- **React Native har modent økosystem og dokumentert lang levetid.** Det er utviklet og vedlikeholdt av Meta siden 2015, brukes i produksjon av Microsoft (Office, Teams, Outlook Mobile), Shopify, Discord, Coinbase, Instagram, samt norske produksjons­apper som Vy, DNB og Equinor. Det er med andre ord ikke et risikoelement for ADNO — det er en bransjestandard.
- **Én kodebase, to plattformer.** All forretnings­logikk, alle skjermer og alle integrasjoner skrives én gang og kompileres til både iOS og Android. Det betyr at når dopinglista oppdateres, eller ADNO ønsker en ny knapp, skjer det på begge plattformer samtidig — ingen iOS som ligger tre uker bak Android.
- **Native komponenter der det trengs.** React Native rendrer faktiske iOS UIKit- og Android Material-komponenter. Scroll, animasjoner, hurtigtaster og skjermleser-integrasjon føles native fordi de *er* native.
- **Jeg har tung React Native-erfaring i samfunnskritiske og regulerte apper:**
  - **Equinor** — to av Equinors mest forretnings­kritiske offshore-apper (Notifications og Workorders), strengt regulert miljø, høye krav til oppetid.
  - **NLR TryggDrift** — HMS-app for norsk landbruk, levert fra første kode til App Store og Google Play, erstatter et eksisterende system (KSL Trygg).
  - **Easee** — betalings­biblioteket EaseePay i Flutter med Adyen-integrasjon og PCI DSS-kompatibilitet (samme utvikler­erfaring bak begge rammeverkene, og for denne leveransen har jeg vurdert at RN er riktig).

Jeg kunne bygget i Flutter — jeg er like sterk der (Kolumbus, Altibox Hjem). Men for ADNO er React Native riktig valg fordi det gir ADNO det bredeste mulige leverandør­markedet hvis dere senere vil bytte vedlikeholds­leverandør, og fordi det gir direkte gjenbruk av mønstre fra Equinor og TryggDrift.

### Backend

Backend bygges i **Node.js (NestJS) på Azure App Service**, med **PostgreSQL** som primærdatabase og **Azure Blob Storage** for filer (PDF-skjemaer, videoer, bilder). Jeg har vurdert Go som alternativ — jeg har levert flere Go-backender (Dropby, Flagchase, deler av Kolumbus-stacken) — men for denne appen anbefaler jeg Node.js av tre grunner:

1. **Felles språk på tvers av mobil og server** (TypeScript) — reduserer friksjon og feil­kilder, og gjør det lettere for ADNO å få en annen leverandør inn senere.
2. **Stort utvalg modne integrasjons­biblioteker** — spesielt mot push (FCM/APNs), e-post, og SSO/OAuth — som sparer utviklings­tid.
3. **Azure-hosting i Norge/EU — match med ADNOs eksisterende plattform.** ADNO benytter i dag Microsoft sine skytjenester (jf. Sp.18). Ved å legge backend på Azure unngår ADNO en ny leverandør i sky-stacken, og infrastrukturen kan på sikt overføres til ADNOs eget Azure-tenant uten reskript. Dette er et bevisst valg fordi Sp.18 ber leverandøren beskrive og forklare hva foreslått modell betyr i praksis for ADNO — og dette er den modellen som gir minst nytt for ADNO å forholde seg til.

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
   ┌─────────┐ ┌───┐ ┌────┐ ┌─────┐ ┌────────┐
   │Postgres │ │FK │ │ADNO│ │Craft│ │EQS     │
   │(Azure)  │ │API│ │API │ │CMS  │ │varsel  │
   └─────────┘ └───┘ └────┘ └─────┘ └────────┘
                    ┌───────┐
                    │FCM/   │  (push-varsling)
                    │APNs   │
                    └───────┘
```

## 1.3 Brukervennlighet

### Design­prinsipper

Jeg bygger etter fire enkle regler hentet fra kravspesifikasjonen og målgruppens situasjon:

1. **Maks ett trykk fra hovedside til verktøy.** Ingen skjulte menyer, ingen hamburger, ingen tab-bar i bunn som konkurrerer med grid-et.
2. **Fargekoding er alltid supplert med ikon og tekst.** Grønn/gul/rød brukes konsekvent for tillatt/forsiktighet/forbudt, men aldri alene — alt har også en ikonform og en tekststreng. Dette er en UU-standard (WCAG 2.2 § 1.4.1) og en trygghets­standard (fargeblinde utgjør ca. 8 % av menn).
3. **Tekst er informasjon, ikke dekorasjon.** Jeg følger prinsippet fra § 6 i kravspesifikasjonen: minimalt med tekst, ikoner gjør jobben.
4. **Resultatskjermer er alltid handlings­rettet.** Hver risikoskjerm, legemiddel­detalj og dopingliste-treff avsluttes med en konkret neste handling: «Send bekreftelse på e-post», «Kontakt ADNO for råd», «Les mer om medisinsk fritak».

### Universell utforming (WCAG 2.2 AA)

Appen leveres med full WCAG 2.2 AA-kompatibilitet fra dag 1:

- Alle interaktive komponenter har korrekte `accessibilityLabel`, `accessibilityRole` og `accessibilityState` for VoiceOver (iOS) og TalkBack (Android).
- Kontrastkrav ≥ 4.5:1 for normal tekst, ≥ 3:1 for stor tekst og UI-elementer.
- **Dynamic Type**-støtte: appen følger systemets tekststørrelse, inkludert de største valgene (iOS XXL, Android Extra Large).
- **Reduce Motion**-preferansen respekteres: animasjoner deaktiveres når brukeren har slått det på i OS.
- Alle fargesignaler er supplert med ikon og tekst (ikke-farge-bare signaler, WCAG 2.2 § 1.4.1).
- Full navigering med skjermleser testet manuelt før hver release.

Jeg tilbyr **innkjøpt ekstern UU-revisjon** via Funka Nu eller MediaLT før publisering (inkludert i fastpris som ekstern tjeneste, ikke som under­leverandør i kvalifikasjons­forstand). ADNO står fritt til å velge om dette skal gjennomføres.

### ADNOs designmanual og visuelle identitet

Appen følger ADNOs eksisterende visuelle identitet — ikke som en pliktøvelse, men som et signal om at dette er ADNOs app, ikke min. Jeg henter primærblå, sekundær­farger, ikonstil og typografi fra antidoping.no og ADNOs designmanual. Typografien er en profesjonell sans-serif (Inter eller ADNOs egen font hvis den finnes i lisens­bar form).

Splash-skjerm, onboarding og meldings­senter er utformet for å oppleves som en naturlig forlengelse av ADNOs nettside og kommunikasjons­materiell.

### Onboarding og personvern

Onboarding er tre skjermer: velkomst, rollevalg (utøver / trener / foreldre / støtteapparat), og samtykke til push-varsler. Samtykke­teksten utformes etter GDPR og personopplysnings­loven, i samråd med ADNOs DPO og GDPR-ressurs.

**Ingen innlogging i appen.** Utøveren bruker alle verktøy uten å opprette konto — dette er i tråd med ADNOs forventning (jf. svar på Spørsmål 5: «Appen skal ikke ha pålogging»). Navn, telefon og e-post lagres kun dersom brukeren selv velger det (f.eks. for å motta e-post­bekreftelse på legemiddel­søk), og lagres da kun lokalt på enheten med mindre brukeren eksplisitt sender informasjonen til ADNO.

### Språkstøtte (norsk + engelsk)

Appen leveres med **i18n-arkitektur fra første kommit** og to språk inkludert i fastpris: **norsk (bokmål) og engelsk**. Dette er bevisst valgt fordi norsk idrett har et betydelig antall utøvere som ikke har norsk som førstespråk (jf. ADNOs svar på Spørsmål 10), og fordi kostnaden for å bygge i18n inn fra start er marginal — mens kostnaden for å retrofitte etterpå er stor. Ekstra språk kan legges til av ADNO senere uten teknisk bistand fra leverandør (oversettelses­fil i admin-panelet).

## 1.4 Integrasjons­løsninger

Appens verdi ligger i at **innholdet er levende og eksternt** — hentet fra de samme systemene som allerede forvalter det. Det gir utøveren alltid oppdatert informasjon, og det sparer ADNO for dobbelt­arbeid.

### Felleskatalogen (legemiddelsøk)

ADNO har allerede en avtale og integrasjon med Felleskatalogen på antidoping.no/medisinsk/legemiddelsok. Jeg viderefører dette oppsettet: backend-laget mitt konsumerer Felleskatalogens API, cacher resultater og eksponerer et enkelt søkebruk for appen. Bekreftelses-e-post sendes via samme mekanisme som dagens nettside (felleskatalogen.no/medisin/doping-bekreftelse), fra ADNOs egen avsender­adresse.

**Caching:** legemiddel­data caches i 24 timer i backend, slik at appen fungerer raskt selv når Felleskatalogens API er tregt, og slik at søk ikke belaster Felleskatalogen unødig.

### Norsk dopingliste (søk i dopinglista)

ADNO publiserer den **norske oversettelsen av dopinglista** på antidoping.no, og det er denne listen — ikke WADAs engelske versjon — som skal benyttes i appen (jf. ADNOs svar på Spørsmål 4). Listen oppdateres én gang per år, gjeldende fra 1. januar, etter beslutning i oktober. Jeg implementerer:

- **Backend henter datasett fra ADNOs nettside (eller direkte fra Crafts API levert av Feed)** ved oppstart og deretter daglig som sikkerhetsnett — selv om listen kun endres årlig, fanger daglig sjekk opp eventuelle korrigeringer eller ekstra publiseringer underveis.
- Datasettet lagres i Postgres med full tekstsøk på norsk (`tsvector` med norsk språk­konfigurasjon for korrekt stemming).
- Appen søker mot mitt API — det gir et grensesnitt utformet for utøvere på mobil, ikke for regulatorer på desktop.
- Ved manglende treff får utøveren en direkte knapp: «Send spørsmål til ADNOs medisinske rådgiver» — spørsmålet sendes som e-post eller til meldings­senter, etter ADNOs valg.
- **Synlighet av oppdaterings­dato:** appen viser alltid «Oppdatert: 1. januar 2026» nederst på dopinglista, slik at utøveren ser at innholdet er ferskt og at appen følger ADNOs offisielle versjon.

### Ren Utøver (e-læring) — portal-funksjon

E-læringen forblir på TASK-plattformen, og appen integrerer **ikke** mot TASK med API eller SSO. Dette er i tråd med ADNOs avklaring på Spørsmål 5: appen er en «portal» til e-læringens pålogging, ikke et speil av den. Konkret:

- Utøveren trykker «Ren Utøver»-ikonet på hovedsiden.
- Appen åpner ADNOs Ren Utøver-side (e-læringens egen pålogging) i en in-app browser (SFSafariViewController på iOS, Custom Tabs på Android).
- Brukeren logger inn der dersom det kreves, eller starter modulen direkte hvis den er åpen.
- Ingen brukerdata, fremdrift eller fullføringsstatus speiles i appen — alt forblir hos TASK/ADNO.

Dette gjør integrasjonen enkel, sikker og uavhengig av endringer hos TASK.

### Push-varsling (FCM + APNs + meldings­senter)

Push-varsling implementeres via **Firebase Cloud Messaging (Android) og Apple Push Notification Service (iOS)**. Volumet er moderat — ADNO anslår maks 8–12 varsler/meldinger per år, typisk ved oppdatering av dopinglista (jf. Sp.16). Push er foretrukket kanal: når brukeren har samtykket til push, trenger ADNO **ikke** lagre telefonnummer eller e-post for å nå utøveren. SMS via Unifon (Sp.17) og e-post er kun fallback for tilfeller der bruker ikke har push aktivert eller hvor bekreftelse er ønsket; eventuell lagring av e-post i den sammenheng er midlertidig (Sp.16).

ADNO får et eget admin-panel (se § 1.5) hvor dere selv sender varsler — uten teknisk bistand fra leverandør (Sp.18 stiller dette som krav):

- Valg av målgruppe (alle, spesifikk rolle, brukere med spesifikk kategori påslått).
- Tittel + brødtekst + valgfri lenke.
- Alle sendte meldinger lagres i **meldings­senter** i appen, slik at utøveren finner dem igjen.
- Utøveren kan skru push **til eller fra** per kategori (regler, hastevarsler, nyheter) i innstillinger — krav fra Sp.18 om at de som ikke vil motta varsler kan velge det bort.

**Erstatter ADNOs FB-gruppe for topputøvere:** Sp.18 sier eksplisitt at ADNO ønsker å avvikle dagens Facebook-gruppe for topputøvere, og at viktige varsler heller skal komme fra appen. Push-varsling og meldings­senter dekker dette behovet direkte, med bedre rekkevidde (alle utøvere, ikke bare de på Facebook), bedre personvern (ingen Meta-sporing), og mulighet for målretting per rolle/kategori.

Push triggs kun av ADNO — aldri av andre brukere, aldri automatisk. Dette speiler kravspesifikasjonen § 7 («Pushvarsler: skal kun sendes når det aktivt trigges av ADNO»).

### Varslingskanal (dopingvarsel — EQS Compliance Cockpit)

Varslingskanalen leveres av **EQS (Compliance Cockpit)** og er allerede lenket fra antidoping.no/tips-oss-om-doping → dopingvarsel. Den skal forbli en ekstern tredjepart — av personvern- og integritets­hensyn (jf. ADNOs svar på Spørsmål 8). Appens rolle er portal-funksjon:

- Egen skjerm i appen som forklarer hva varsling er og hvordan anonymitet ivaretas.
- Knapp «Gå til anonymt varsel» som åpner EQS dopingvarsel-siden i en **sikker in-app browser** (med session-isolasjon, ingen cookie-lagring i appen).
- Ingen logging av at brukeren har trykket på knappen — dette er kritisk for anonymitet.

### E-post (bekreftelser, kontakt)

Transaksjonell e-post sendes via **Postmark**, fra en avsender­adresse under antidoping.no-domenet. Postmark er valgt fordi den er optimalisert for transaksjons­e-post (høy leverings­grad, lav latens, ingen markedsførings­funksjoner som kan forveksles med ADNOs øvrige utsendelser). Jeg setter opp SPF, DKIM og DMARC slik at e-postene ikke havner i søppel­post­mappen. Backend bruker et tynt e-post-grensesnitt slik at ADNO kan bytte leverandør senere uten kodeendring.

### Kontakt oss (toveis meldings­tråd i appen)

Sp.17 avklarer at ADNO ikke ønsker en bemannet live-chat, men en løsning der utøveren kan **sende spørsmål til ADNO direkte fra appen og få svaret tilbake i appen**. Jeg leverer dette som en lett toveis meldings­tråd — uten innlogging, og uten ekstern chat-leverandør:

- Utøveren skriver spørsmål i appen (valgfritt navn/e-post/telefon, jf. Sp.16). Hver melding får en anonym tråd-ID som lagres lokalt på enheten.
- Spørsmålet sendes inn til ADNOs admin-panel (samme web-grensesnitt som push-varsler), og ADNO-rådgiver svarer fra panelet.
- Svaret leveres tilbake til utøveren via tråd-ID-en, både som notifikasjon i appen (push hvis aktivert) og synlig i meldings­senteret. **Ingen e-post-tråd ut av appen for vanlige spørsmål.**
- Hvis ADNO trenger å nå utøveren via SMS (f.eks. ved tids­kritiske svar og bruker uten push), sendes det fra **Unifon** — ADNOs eksisterende SMS-gateway (Sp.17). Backend har et tynt SMS-grensesnitt slik at ADNO kan bytte gateway senere uten kodeendring.
- For bekreftelse på legemiddelsøk speiler vi dagens nettside-løsning (Sp.16): bekreftelsen sendes til utøveren etter eget valg av kanal.

Denne modellen dekker «kontakt oss» og «meldingssenter» fra kravspesifikasjonen § 5/§ 7 i én sammenhengende mekanisme — ingen drifts­ansvar for åpningstider hos leverandør, men full toveis kommunikasjon i appen slik Sp.17 etterspør.

## 1.5 Forvaltning og oppdaterbarhet

Dette er kriteriet hvor mange app-leveranser faller igjennom etter lansering: ADNO må kunne oppdatere innhold uten å ringe meg, og uten å vente på app-store-godkjenning. Jeg har designet dette inn fra start.

### Admin-panel for ADNO

Jeg leverer et **web-basert admin-panel** (kjører på Azure, samme infrastruktur som API-et) der ADNO-ansatte logger inn og forvalter appen uten teknisk bistand:

| Hva ADNO kan endre selv | Hvor |
|---|---|
| Kosttilskudd-spørsmål (tekst, vekting, rekkefølge) | Admin → Risikosjekk |
| Risiko-terskler (grense for lav/middels/høy) | Admin → Risikosjekk → Terskler |
| Veileder medisinsk fritak (tekst, seksjoner, skjemaer) | Admin → Veiledere |
| Astma-medisiner og doser i kalkulatoren (gjenbruk av eksisterende logikk fra ADNOs astma­kalkulator, jf. Sp.15) | Admin → Astmakalkulator |
| Push-meldinger (komposisjon, målgruppe, sending) | Admin → Meldinger |
| Meldings­senter-innhold | Admin → Meldinger |
| Kontakt­informasjon, åpningstider, lenker | Admin → Konfigurasjon |
| Onboarding-tekst, samtykke­tekst, versjons­merking | Admin → Onboarding |

Admin-panelet er rollestyrt (redaktør, administrator) med full **revisjons­logg**: hvem endret hva når. Dette er viktig for ADNOs eget kvalitets­arbeid og for ekstern revisjon.

**Forholdet til Craft (Feed):** ADNOs hovedinnhold ligger i Craft CMS levert av Feed (jf. Spørsmål 6). Mitt admin-panel duplicerer ikke Craft — det forvalter kun app-spesifikt innhold som ikke har naturlig plass i Craft (kosttilskudd-spørsmål med vekting, astmakalkulator-doser, push-meldinger til appen, app-onboarding). Hvor ADNO ønsker det, henter appen innhold direkte fra Craft via Feeds API; for app-spesifikt innhold er admin-panelet enkleste vei.

### Automatisk oppdatering av eksterne datasett

- **Norsk dopingliste** hentes daglig fra ADNOs nettside (eller Crafts API). Listen oppdateres formelt 1×/år (1. januar), men den daglige sjekken fanger opp eventuelle korrigeringer. Når en endring oppdages, får ADNO push-varsel i admin­panelet: «Ny versjon av dopinglista publisert — X nye substanser, Y fjernet.» Dere kan deretter velge å varsle utøverne via push.
- **Felleskatalogen** hentes live ved hvert søk (med 24t cache), via ADNOs eksisterende API-avtale (jf. Spørsmål 3). **Leverandør trenger ingen egen avtale med Felleskatalogen** — Sp.3 bekrefter at appen kan benytte samme avtale som ADNO bruker mot nettsiden, alternativt hente fra nettsidens eget API. Medisinsk data er alltid ferskt.
- **Astmakalkulator** — ADNO eier kildekoden til dagens astmakalkulator (Sp.15). Jeg ber om utlevering ved kontrakts­signering for å gjenbruke logikk og dose­tabeller, slik at vi sikrer kontinuitet i beregningen utøvere er kjent med, og sparer reverse-engineering. Doser og medisiner forvaltes deretter av ADNO i admin-panelet.

### App-innhold uten butikk­godkjenning

Alt tekst- og konfigurasjons­innhold i appen hentes fra backend ved oppstart og caches lokalt. Det betyr at når ADNO endrer en tekst i admin-panelet, oppdateres appen **uten** at utøveren må laste ned ny versjon fra App Store / Google Play. Kun endringer i appens *funksjonalitet* eller visuelle design krever ny utrulling.

### App-store-publisering og livssyklus

Jeg tar fullt ansvar for publisering og vedlikehold av app-butikkene gjennom hele garanti­perioden:

- **Apple App Store Connect** og **Google Play Console** settes opp i ADNOs egne developer-kontoer — dere eier distribusjonen.
- Metadata, screenshots, beskrivelse og policy-dokumenter leveres av meg.
- Review-prosesser og eventuelle tilbake­meldinger fra Apple/Google håndteres av meg.
- Versjons­håndtering og release-noter vedlikeholdes i git og publiseres per release.
- Jeg har publisert apper i begge butikkene tidligere for Equinor, NLR (TryggDrift) og Easee (EaseePay + Easee-appen) — review-prosessene er kjent farvann.

### 12 måneders garanti inkludert

Fastpris på 1 600 000 NOK inkl. mva dekker (jf. ADNOs svar på Spørsmål 13):

- Full utvikling (inntil 6 måneder)
- App-store-publisering på iOS og Android
- **12 måneders garantiperiode** på levert funksjonalitet, avgrenset i tråd med Spørsmål 13/14:
  - Feilretting (bug-fixes på avdekkede feil)
  - Mindre justeringer/forbedringer basert på tilbakemeldinger på funksjonalitet eller brukervennlighet
  - Sikkerhets­oppdateringer av React Native og avhengig­heter når dette er nødvendig for å beholde butikk-godkjenning
  - Respons­tid: maksimalt 24 timer på virkedager for kritiske feil
- Opplæring av ADNOs admin-brukere (workshop + skriftlig manual)

**Det som ikke inngår i fastprisen** (i tråd med Spørsmål 13/14): løpende drift av backend etter levering, videreutvikling/ny funksjonalitet, og større tilpasninger som følge av endringer hos eksterne samarbeidspartnere (TASK, Feed, Felleskatalogen) eller større operativsystem-endringer. App utvikles på en måte slik at normal OS-oppdatering ikke utløser omfattende vedlikeholdsbehov.

**Indikative drifts­kostnader (Azure-infrastruktur, til ADNOs egen konto):**

| Tjeneste | Estimert månedskostnad |
|---|---|
| Azure App Service (Backend, B1/P1v3) | 400–1 200 NOK |
| Azure Database for PostgreSQL (Flexible, Burstable) | 350–800 NOK |
| Azure Blob Storage + utgående trafikk | 50–250 NOK |
| Sentry, Crashlytics, uptime-monitor (free-tier dekker normalt) | 0–500 NOK |
| **Sum, indikativt** | **800–2 750 NOK/mnd** |

Dette er ren infrastruktur­kostnad direkte fra Azure/SaaS-leverandører til ADNO — ikke leverandør­påslag. Hvis ADNO ønsker at jeg skal stå for løpende drift (overvåking, sikkerhets­oppdateringer, backups, vakttelefon), tegnes en separat drifts­avtale med fast månedlig pris. Forslag: 4 500 NOK/mnd eks. mva for standard drift i garantiperioden, justeres ved fornyelse. ADNO står fritt til å drifte selv eller velge en tredjepart — alt er dokumentert som infrastruktur-som-kode.

### Leveranse­prioritering ved tids- eller scope-press

For å være tydelig overfor ADNO på hvordan jeg forvalter fastpris og 6-måneders­ramme, opererer jeg med en eksplisitt MoSCoW-prioritering. Kjernen leveres alltid; ytterkant kan ramme­justeres i samråd med ADNO uten at fastpris endres:

| Prioritet | Funksjonalitet |
|---|---|
| **MUST** (i produksjon ved go-live) | 3×3 hovedside, legemiddel­søk via Felleskatalogen, søk i norsk dopingliste, risikosjekk kosttilskudd, astma­kalkulator, medisinsk fritak (veileder), Ren Utøver-portal, EQS-varslings­portal, kontakt­funksjon, push-varsling fra admin, meldings­senter, onboarding m/rollevalg, WCAG 2.2 AA, norsk + engelsk språk, ekstern UU-revisjon |
| **SHOULD** (leveres innen go-live så langt det lar seg) | Admin-panel for kosttilskudd-spørsmål og terskler, admin for astma­medisiner og doser, full revisjons­logg i admin, e-post­bekreftelse på legemiddel­søk |
| **COULD** (faseres til garantiperioden ved press) | Aggregert bruks­statistikk i admin, A/B-testing av onboarding, in-app chat-widget (kan starte som kontakt­skjema og oppgraderes) |
| **WON'T** (eksplisitt utenfor scope) | Pålogging i appen, TASK-integrasjon, speiling av Ren Utøver-status i appen, native varslings­kanal (varslings­kanalen forblir hos EQS) |

**Konsekvens:** Hvis et område viser seg å være større enn antatt etter sprint 2 (f.eks. en integrasjon Feed/Craft krever mer arbeid enn forventet), tar jeg det opp eksplisitt med ADNO og foreslår faseing innenfor MUST/SHOULD/COULD-rammen. ADNO skal aldri komme til lansering og oppdage at noe MUST mangler — jeg varsler tidlig og prioriterer i samråd. Dette er hvordan en solo­leverandør håndterer fastpris ansvarlig.

## 1.6 Se det selv: klikkbar prototype før tildeling

Jeg har bygget en klikkbar prototype av hele appen — onboarding, hovedside, risikosjekk kosttilskudd, legemiddelsøk, dopinglista, meldings­senter, astmakalkulator, medisinsk fritak, varsling, innstillinger. Alt på plass, ADNOs farger, ADNOs tonevalg, ADNOs logo.

**URL:** `https://asbjornrorvik.dev/no/oppdrag/antidoping-app`
**Passord:** `antidoping2026`

Prototypen viser hvordan den ferdige appen skal se ut og oppføres. Jeg har ikke levert dette som en ekstra pdf med skjermdumper — jeg har levert det som en klikkbar opplevelse, slik at ADNO kan sette seg inn i løsningen på samme måte som en utøver vil bruke den.

Dette er en del av min arbeidsform. Jeg leverer tidlig, i kjørbar form, og lar kunden reagere på noe konkret — ikke på en beskrivelse.

---

*Denne seksjonen er én av fire seksjoner i Bilag 2. Se også: seksjon 2 (leveranse­metodikk), seksjon 3 (kompetanse og referanser), seksjon 4 (forvaltning etter levering).*
