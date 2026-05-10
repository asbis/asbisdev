---
title: Bilag 2 — Konsulentens spesifikasjon av oppdraget
tender: Doffin 2026-107028 — Utvikling av antidoping-app
oppdragsgiver: Antidoping Norge (ADNO)
leverandor: Asbjørn Rørvik (ENK), org.nr 820 252 632
dato: 2026-05-11
versjon: 3.0
status: Q&A v3 (06.05.2026) innarbeidet
---

# Bilag 2 — Konsulentens spesifikasjon av oppdraget

**Anskaffelse:** Utvikling av antidoping-app for Antidoping Norge
**Doffin-ID:** 2026-107028
**Tilbudsfrist:** 11. mai 2026 kl. 12:00
**Vedståelsesfrist:** 31.08.2026
**Leverandør:** Asbjørn Rørvik (enkeltpersonforetak), org.nr 820 252 632
**Kontakt:** Asbjørn Rørvik, hei@asbjornrorvik.dev, +47 47 65 86 51
**Nettsted:** asbjornrorvik.dev

---


# 1. App-løsningen og dens kvalitet

*Tildelingskriterium fra konkurransegrunnlaget: «App-løsningen og dens kvalitet. Herunder blant annet: brukervennlighet, gode integrasjonsløsninger, forvaltning og oppdaterbarhet av innhold.»*

## 1.1 Min løsning i ett bilde

Jeg leverer én app — ikke en samling lenker. iOS og Android, lastbar fra App Store og Google Play, med ett klart designgrep: **alt utøveren trenger skal være tilgjengelig fra hovedsiden, på ett trykk**. Dette er ikke en tolkning fra min side, det er kravet fra Bilag 1 § 6: «Grafikken skal være enkel. Minimal bruk av tekst og all funksjonalitet skal være tilgjengelig fra en hovedside.»

Hovedsiden er et **3×3 ikongrid** med de ni funksjonene fra kravspesifikasjonen:

![Hjem-skjermen i prototypen — 3×3 grid med Kosttilskudd, Legemidler, Dopinglista, Fritak, Astma, Ren Utøver, Meldinger, Varsle og Spør ADNO. Bottom navigation med Hjem, Søk, Varsler, Kurs og Profil.](/skjermbilder-antidoping/01-home.png)

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


*Denne seksjonen er én av fire seksjoner i Bilag 2. Se også: seksjon 2 (leveranse­metodikk), seksjon 3 (kompetanse og referanser), seksjon 4 (forvaltning etter levering).*

---


# 2. Nøkkelressurser — kompetanse og referanseprosjekt

**Leverandør:** Asbjørn Rørvik (enkeltpersonforetak), org.nr. 820 252 632
**Anskaffelse:** Utvikling av antidoping-app for Antidoping Norge (Doffin 2026-107028)


## 2.1 Teamets oppbygging

Oppdraget leveres av én senior utvikler med 8+ års produksjonserfaring fra
direkte sammenlignbare mobilapper. I tillegg engasjeres en **etablert
ekstern UU-leverandør** (Funka Nu eller MediaLT) som **innkjøpt tjeneste**
for uavhengig WCAG 2.2 AA-revisjon før publisering. Dette gir Antidoping
Norge seniornivå på hver arbeidstime og uavhengig kvalitetssikring av
universell utforming, uten overleveringer mellom junior- og senior-ressurser.

Nøkkelressurs i konkurransegrunnlagets forstand er én:

| # | Rolle | Navn | Andel av oppdraget |
|---|---|---|---|
| 1 | Teknisk prosjektleder og utvikler | Asbjørn Rørvik | 100 % av utviklingstid |

UU-revisjonen leveres som **ekstern tjeneste** — ikke som underleverandør
i kvalifikasjons­forstand — og er priset inn i fastpris (Bilag 7). Endelig
valg av UU-leverandør (Funka Nu / MediaLT / annen etablert aktør) avtales
med ADNO i oppstart. Leverandøren står ansvarlig overfor ADNO for hele
leveransen.

Den samme personen står for design-beslutninger, arkitektur, utvikling,
App Store- og Google Play-publisering, samt drift og vedlikehold gjennom
hele perioden. Kunden har én kontakt fra kickoff til lansering — ingen
bytter av lead, ingen kunnskap som forsvinner ved rotasjon.


## 2.2 Nøkkelressurs 1 — Asbjørn Rørvik (hovedressurs)

### Kort om ressursen

Asbjørn Rørvik er senior fullstack-utvikler basert i Stavanger, med bachelor
i elektronikk- og automasjonsdesign fra Universitetet i Stavanger (2013–2016)
og 8+ år produksjonserfaring fra app- og systemutvikling for ledende norske
virksomheter. Stacken spenner fra mobil (React Native og Flutter) via backend
(Go, .NET, Node.js) til infrastruktur og App Store-publisering — det vil si
hele verdikjeden dette oppdraget krever.

### Roller og arbeidshistorikk

| Periode | Rolle | Virksomhet |
|---|---|---|
| 2024 – d.d. | Utvikler / teknisk rådgiver | Netpower |
| 2025 – d.d. | CTO og medgründer | Supportify AS (AI-kundesupport for Shopify, live hos 100+ butikker) |
| 2021 – 2024 | Konsulent (Flutter / React Native) | Bouvet |
| 2020 – 2021 | Utvikler | WOIT AS |
| 2018 – 2020 | Utvikler | Norsahel / Needle AS |
| 2018 – d.d. | Innehaver | ENK "Asbjørn Rørvik" (org.nr. 820 252 632) |

### Formell kompetanse

- Bachelor i automatisering og elektronikk­design, Universitetet i Stavanger, 2013–2016.
  Bakgrunnen fra automasjon og regulert teknisk miljø gir god forståelse
  for sikkerhetskritiske domener — relevant i regelverksnær antidoping-app.
- Kontinuerlig egenlæring innen mobil, backend og sikkerhet, dokumentert
  gjennom leveranser i regulerte miljøer (Equinor offshore, Easee med
  PCI DSS, NLR/KSL med HMS-data).

### Teknologisk kompetanseområder

- **Mobil:** Flutter/Dart og React Native/TypeScript — produsert og
  publisert begge plattformer i App Store og Google Play.
- **Backend og API:** Go, .NET/C#, Node.js, PostgreSQL, REST/GraphQL.
- **Frontend:** React, Next.js, Tailwind.
- **Integrasjoner og sikkerhet:** REST/JSON-integrasjoner mot tredjeparts-API
  (Felleskatalogen, Entur, Adyen), PCI DSS, sertifikat-pinning, sikker
  hemmelighets­håndtering.
- **DevOps:** Docker, Azure, GitHub Actions / Bitrise, App Store Connect
  og Google Play Console.
- **Universell utforming:** WCAG 2.2 AA-implementasjon fra kode (dynamic
  type, VoiceOver / TalkBack-merking, kontrast, reduced motion) — utført
  i produksjon for Altibox, NLR TryggDrift og Kolumbus.

### Hvorfor denne ressursen matcher oppdraget

Appen som skal bygges er en **regelverksnær mobilapp** for en sårbar og
tidskritisk brukergruppe (utøvere som skal ta raske, riktige beslutninger
om medisin og kosttilskudd). Kravet er én felles Flutter/React Native-kodebase
for iOS og Android, publisering i begge stores, integrasjoner mot
Felleskatalogen og ADNOs norske dopingliste, pushvarsling, universell
utforming og personvern etter GDPR i samråd med ADNOs DPO.

Asbjørn har bygget og levert samtlige av disse komponentene i produksjon
tidligere — se referanseprosjektene i 2.3.


## 2.3 Referanseprosjekter

Nedenfor beskrives tre referanseprosjekter valgt ut fordi de hver for seg
dekker sentrale krav i antidoping-appen: samfunnskritisk regelverksdomene,
skala på mange brukere, og regulert miljø med høye sikkerhetskrav.
Kontaktreferanser oppgis i Vedlegg 1.

### Referanse 1 — TryggDrift, Norsk Landbruksrådgiving (NLR)

| Felt | Detalj |
|---|---|
| Kunde | Norsk Landbruksrådgiving (NLR) / KSL |
| Periode | 2023–2024 |
| Rolle | Sentral utvikler (via Netpower) |
| Teknologi | React Native, .NET / C#, App Store, Google Play |

**Hva som ble levert:** TryggDrift er en digital HMS-løsning for norsk
landbruk som erstatter det tidligere KSL Trygg-systemet. Asbjørn var med
fra første commit og bidro gjennom sentrale deler av React Native-klienten
og deler av .NET-backenden. Appen ble publisert i Apple App Store og Google
Play, og videreført med feilretting og forbedringer basert på tilbakemelding
fra bønder og rådgivere etter lansering.

**Oppgavesett:** risikovurdering, beredskapsplanlegging, HMS-oppgaver, skjemaer
og veiledere — alt strukturert etter et formelt regelverk (KSL-standarden)
som oppdateres løpende og som brukeren må navigere presist i en arbeids­
hverdag.

**Relevans for antidoping-appen:** Dette er den nærmeste parallellen i
porteføljen. Begge apper:

- **erstatter / samler eksisterende ressurser** spredt i nettsider, PDF-er
  og separate systemer til én mobil opplevelse;
- **knytter brukeren til et formelt regelverk** (KSL / WADA-koden formidlet via ADNOs norske dopingliste);
- **har en sårbar og tidskritisk brukssituasjon** (ulykke på gården / medisin
  før konkurranse);
- **er levert av samme person fra første commit til App Store og Google Play**
  og videreført etter lansering.

Arbeidet viser at ressursen kan håndtere hele livssyklusen — fra arkitektur
via publisering til forvaltning — på en regulatorisk sensitiv mobilapp.

### Referanse 2 — Kolumbus-appen (Rogaland fylkeskommune)

| Felt | Detalj |
|---|---|
| Kunde | Kolumbus AS / Rogaland fylkeskommune |
| Periode | 2024 – 2025 |
| Rolle | Utvikler (via Netpower) |
| Teknologi | Flutter / Dart, Go, Entur-API, REST |

**Hva som ble levert:** Kolumbus-appen er reiseguiden for kollektivtrafikken
i Rogaland, med **142 000+ aktive brukere per måned**. Appen ble **tildelt
Nordic Public Transport Design Award 2025**. Asbjørn utviklet Flutter-
funksjonalitet for forklarbar ruteplanlegging, sanntids reiseoppfølging,
kontekstuelle pushvarsler og pay-as-you-go-betaling, med integrasjoner mot
Kolumbus' egne tjenester og Entur.

**Relevans for antidoping-appen:**

- **Skala og kvalitetskrav.** 142 000 månedlige brukere setter reelle krav
  til stabilitet, oppetid og universell utforming — samme krav som ADNOs
  app vil møte når den rulles ut til topputøvere, bredde­utøvere, trenere
  og foreldre.
- **Kontekstuell pushvarsling.** Samme tekniske mønster og UX-valg som
  kreves for krav 3.4 i prototype-brief (ADNO-varsler om regelendringer og
  hastevarsler).
- **Søk og beslutningsstøtte på mobil.** Brukeren skal raskt finne riktig
  informasjon i en presset situasjon — det samme UX-problemet som
  legemiddelsøk og risikosjekk av kosttilskudd løser.
- **Offentlig sektor-kunde.** Prosjektet viser at ressursen fungerer i
  leveransemodellen Antidoping Norge bruker: offentlig eid virksomhet med
  krav til personvern, åpenhet og langsiktig forvaltbarhet.

At appen samtidig vant Nordic Public Transport Design Award 2025
dokumenterer at det er mulig å kombinere høye funksjonelle krav med
en brukeropplevelse som faktisk blir brukt og anerkjent.

### Referanse 3 — Offshore-kritiske driftsapplikasjoner for Equinor

| Felt | Detalj |
|---|---|
| Kunde | Equinor ASA |
| Periode | 2023 |
| Rolle | Utvikler, frontend (via Bouvet) |
| Teknologi | React Native, TypeScript |

**Hva som ble levert:** Asbjørn bidro som React Native-utvikler på to av
Equinors mest forretningskritiske mobilapper offshore — *Notifications*
(varsling og oppfølging av avvik) og *Workorders* (opprettelse og behandling
av arbeidsordre). Driften på plattformene er avhengig av at disse appene
fungerer hver dag. Arbeidet foregikk i et **strengt regulert miljø** med
høye krav til oppetid, pålitelighet, sikkerhet og sporbarhet.

**Relevans for antidoping-appen:**

- **Regulert miljø + sensitivt datagrunnlag.** Erfaringen fra Equinors
  sikkerhets- og compliance-regime overføres direkte til antidoping­arbeid,
  der feil i en app kan få konsekvenser for en utøvers karriere.
- **React Native i produksjon på iOS og Android.** Samme stack og samme
  publiseringsregime som Antidoping Norge kan velge for sin app.
- **Kritisk varslings- og meldingsmønster.** Notifications-appen løser det
  samme UX-problemet som ADNOs meldingssenter (krav 3.4): levere viktige
  varsler raskt og pålitelig til en bruker som må handle.

I tillegg dokumenterer tidligere leveranser for **Easee (EaseePay)** direkte
arbeid med PCI DSS, Adyen-integrasjon og kryptering av betalingsdata —
erfaring som er overførbar til personvern­kravene for beskyttelse av
utøverdata. EaseePay-erfaringen kan framlegges som tilleggsreferanse ved
behov.


## 2.4 Innkjøpt UU-revisjon (ekstern tjeneste)

For å sikre uavhengig kvalitetssikring av universell utforming engasjeres
en etablert norsk UU-leverandør (Funka Nu eller MediaLT) som **innkjøpt
tjeneste** før publisering. Leveransen omfatter:

- **WCAG 2.2 AA-revisjon** av appen, med fokus på skjermleser (VoiceOver
  på iOS, TalkBack på Android), kontrast, dynamic type, reduced motion og
  navigerbarhet uten syn.
- **Cross-device-testing** på minimum 3 fysiske enheter (eldre og nyere
  iOS- og Android-modeller) før produksjons­release.
- **Testdokumentasjon og avviksrapport** som leveres til Antidoping Norge
  som del av sluttleveransen.

UU-revisjonen er priset inn i fastpris (Bilag 7) og bestilles som en
avgrenset tjenesteleveranse — den er **ikke** en underleverandør i
kvalifikasjons­forstand, og det stilles derfor ikke krav om
forpliktelseserklæring (Vedlegg 2). Leverandøren står ansvarlig overfor
Antidoping Norge for hele leveransen, inkludert at UU-revisjonen
gjennomføres etter avtalt nivå.

Den løpende UU-implementasjonen (riktig markup, kontrast, dynamic type osv.)
ligger i utviklerens ansvar fra første kommit og er testet manuelt med
VoiceOver/TalkBack før hver milepæls­leveranse — den eksterne revisjonen
er en uavhengig dobbeltsjekk, ikke selve UU-arbeidet.


## 2.5 Hvorfor dette teamet passer oppdraget

Oppdraget er godt egnet for en senior som leverer ende-til-ende — i stedet
for et stort hus der kompetansen fordeles over mange roller. Konkret gir
denne sammensetningen Antidoping Norge fire fordeler:

**1. Ingen senior–junior-glidning.** Samme person som skriver tilbudet,
designer arkitekturen, skriver koden, publiserer i App Store og Google Play,
og svarer på støttehenvendelser etter lansering. Det som avtales i kickoff
er det som leveres — ingen kunnskap som forsvinner i rotasjon eller
overlevering mellom teammedlemmer.

**2. Kort beslutningsvei.** Ett ledd mellom kunde og utvikling. ADNO kan
sende en melding og få et teknisk svar samme dag, uten mellomliggende
prosjektleder, arkitekt eller leveranseansvarlig. Dette forkorter
feedback-sløyfene og er en direkte fordel i et utviklingsprosjekt med
SSA-O-kontrakt og milepælsleveranser.

**3. Dokumentert bredde og dybde.** Referansene over dekker til sammen:
samfunnskritisk regelverks-app (TryggDrift), skala og design-kvalitet
(Kolumbus), regulert miljø og sikkerhet (Equinor, EaseePay). Det er få
enkeltkonsulenter i Norge med denne kombinasjonen.

**4. Uavhengig UU-revisjon som backstop.** Innkjøpt ekstern UU-revisjon
og cross-device-test løser det som er den reelle risikoen ved en
soloressurs (én person kan være blind for egne designvalg) og gir ADNO
uavhengig kvalitetssikring før lansering.

Resultatet er en leveranse der Antidoping Norge får seniornivå på hver
arbeidstime, dokumenterte referanser på nivå med store hus, og en
leveransemodell som er raskere og mer direkte enn det som er mulig i et
større konsulentapparat.


*Kontaktinformasjon til referanser oppgis i Vedlegg 1. CV for nøkkel­
ressurs 1 følger som eget vedlegg.*

---


# Bilag 2, pkt. 3 — Oppdragsforståelse

**Leverandør:** Asbjørn Rørvik (org.nr 820 252 632)
**Oppdragsgiver:** Antidoping Norge (ADNO)
**Anskaffelse:** Utvikling av antidoping-app (Doffin 2026-107028)


## 1. Antidoping Norges mandat — slik jeg forstår det

Antidoping Norge ble opprettet 3. juni 2003 av Norges Idrettsforbund og
Kulturdepartementet som en **uavhengig stiftelse**. Hele poenget med den
organisasjons­formen er at kontroll og påtale skal skje uavhengig av både NIF
og staten — et troverdighets­grep som er en forutsetning for at WADA-systemet
fungerer internasjonalt.

Mandatet har to parallelle spor som er viktig å holde atskilt når jeg designer
appen:

1. **Idretts­sporet** — finansiert gjennom NIF og Kulturdepartementet.
   Håndheving av *World Anti-Doping Code* for organisert norsk idrett:
   kontroller, meldeplikt (whereabouts), medisinsk fritak (TUE), påtale via
   Påtalenemnda, og forebyggende arbeid gjennom Ren Utøver-programmet.
2. **Samfunns­sporet** — finansiert av helsemyndighetene. ADNO har de siste
   årene bygget ut et betydelig arbeid mot doping som helse- og samfunns­problem,
   særlig knyttet til bruk av anabole steroider utenfor organisert idrett. Dette
   er et utvidet mandat som ikke springer ut av WADA-koden, men av vedtektenes
   åpning for arbeid mot doping i samfunnet for øvrig.

ADNO er en liten organisasjon (ca. 30 ansatte, ~60 MNOK i årlig omsetning) med
et svært stort nedslagsfelt: all norsk organisert idrett pluss en økende
samfunns­rolle. **Det forklarer hvorfor appen er viktig: ADNO kan ikke skalere
ved å ansette flere medisinske rådgivere. De må skalere ved å gjøre riktig
informasjon tilgjengelig i det øyeblikket utøveren trenger den.** Hver gang
appen svarer korrekt på "kan jeg ta denne medisinen?" er det en henvendelse
mindre til den medisinske rådgiveren.

Jeg leser det slik at oppdraget ikke er et isolert IT-prosjekt. Appen er et
operativt verktøy for ADNOs forebyggende mandat, og kvaliteten måles ikke i
antall nedlastinger — den måles i om utøvere faktisk tar riktige valg i felt.

## 2. Problemet appen løser

ADNO har allerede innholdet som trengs. Det er ikke mer informasjon som
mangler — det er **tilgjengelighet i situasjonen**. I dag er ressursene spredt:

- **Ren Utøver** (e-læring) ligger på TASKs plattform.
- **Legemiddelsøk** ligger på antidoping.no/medisinsk/legemiddelsok (mot
  Felleskatalogen).
- **Astmakalkulator** ligger som eget verktøy på antidoping.no.
- **Medisinsk fritak** er en veileder med nedlastbare PDF-skjemaer.
- **Dopingvarsel** drives av EQS (Compliance Cockpit), tilgjengelig via lenke
  fra antidoping.no.
- **Den norske dopinglista** ligger på antidoping.no, men søket er ikke
  optimalisert for mobil og inngår ikke i utøverens daglige verktøykasse.

Dette er Bilag 1 pkt. 1.0 sin egen formulering: "de kan oppleves vanskelig å
finne frem til riktig informasjon raskt nok, særlig i situasjoner der
beslutninger må tas på kort varsel". Jeg er enig i diagnosen. Appens
hoved­jobb er å fjerne friksjon mellom *spørsmål* og *svar* — og det betyr at
arkitekturen må prioritere **ett klikk til verktøy**, ikke dypere navigasjon.

Bilag 1 § 6 presiserer at "all funksjonalitet skal være tilgjengelig fra en
hovedside" med "minimal bruk av tekst". Jeg tolker dette bokstavelig: hovedsiden
i min prototype er et 3×3-ikongrid over de ni verktøyene (§ 4.0), uten tabbar
og uten skjult navigasjon. En utøver skal se alle ADNOs ressurser i ett blikk
når appen åpnes.

## 3. Utøverens hverdag — når virker appen?

Kravet "antidoping i lomma" (Bilag 1 § 2.0) er ikke en metafor. Det er en
spesifikasjon av når appen må fungere. Jeg har tegnet opp fire konkrete
situasjoner som har styrt designvalgene mine:

- **Kvelden før en konkurranse.** Utøveren får forkjølelse og står med en
  pakke Paracet og en pakke hostesaft fra foreldrenes skap. Hun har 30
  sekunder på seg før hun gir opp og tar sjansen. *Legemiddelsøk må svare
  uten innlogging og uten mer enn to tap.*
- **I garderoben på treningssenteret.** En lagkamerat tilbyr et
  pre-workout-pulver kjøpt på en utenlandsk nettbutikk. *Risikosjekk
  kosttilskudd må kunne gjennomføres på under 90 sekunder, og resultatet må
  være utvetydig i farge og tekst.*
- **På reise utenlands.** Utøveren får utlevert et medikament som ikke finnes
  i Felleskatalogen. *Søk i ADNOs norske dopingliste må ha eget grensesnitt
  i appen — utformet for utøvere på mobil — og det må være én knapp som
  sender spørsmål direkte til ADNOs medisinske rådgiver ved null treff
  (Bilag 1 § 5.0 "SØK I DOPINGLISTA").*
- **Ved årsskiftet.** Den norske dopinglista revideres én gang per år
  gjeldende fra 1. januar (besluttet i oktober). En substans utøveren har
  brukt lovlig i fjor kan være forbudt i år. *Pushvarsling må leveres av
  ADNO, ikke autogenereres, og meldingen må ligge varig i et meldingssenter
  slik at utøveren kan finne den igjen når helsepersonell spør "hvor står
  dette?" (Bilag 1 § 5.0 "PUSHVARSLING").*

Disse fire situasjonene er min lakmustest for hver designbeslutning. Hvis en
foreslått interaksjon ikke fungerer i minst én av dem, fjerner jeg den.

## 4. Personvern og regelverk setter tekniske rammer

Bilag 1 § 5.1.1 binder leverandøren til å arbeide i tråd med *World Anti-Doping
Code* og GDPR/personopplysningsloven. ADNO har egen DPO og GDPR-ressurs
(jf. Spørsmål 11), og personvern­arbeidet i denne kontrakten gjøres i samråd
med dem. Dette er ikke en formalitet — det er en konkret ramme som styrer
tekniske valg:

- **GDPR-prinsipper styrer arkitekturen:** lovlig grunnlag og eksplisitt
  samtykke for behandling av utøver-data, dataminimering, sikkerhets­tiltak
  proporsjonalt med risiko, brudds­varsling, og dokumentert protokoll over
  behandlings­aktiviteter (Record of Processing) og DPIA.
- **Konsekvenser for løsningen:** (i) **ingen pålogging i appen** (jf. ADNOs
  svar på Spørsmål 5) — jeg lagrer kun navn, telefon og e-post (Bilag 1 § 7)
  dersom utøveren selv velger å oppgi det, og fortrinnsvis kun lokalt på
  enheten; (ii) legemiddelsøk og risikosjekk kjøres lokalt der det er mulig
  og sender aldri personidentifiserbare data til tredjepart; (iii) push-tokens
  lagres separert fra person­data og kan slettes uavhengig; (iv) all
  backend-behandling skjer innenfor EØS (Schrems II-hensyn); (v) jeg leverer
  utfylt protokoll over behandlings­aktiviteter og DPIA som del av leveransen,
  utarbeidet i samarbeid med ADNOs DPO.

**Regelverket** oppdateres jevnlig. Appen må derfor bygges slik at
regelverk­innhold kan oppdateres uten nytt app-release — det taler for en
innholds­styrt arkitektur med remote config (se løsningsspec, pkt. 1), ikke
hardkodet tekst.

**Den norske dopinglista** revideres formelt 1×/år (1. januar), besluttet i
oktober foregående år, jf. ADNOs svar på Spørsmål 4. Hele lista ligger
allerede på antidoping.no. Min backend henter lista derfra (eller via Crafts
API levert av Feed) — daglig som sikkerhetsnett selv om endringer normalt
kun skjer årlig — og eksponerer et raskt mobiltilpasset søk for appen.

## 5. De fire målgruppene krever forskjellig UX

Bilag 1 § 3.0 lister fire målgrupper. Disse har ulik terskel, ulik risiko og
ulik bruks­situasjon, og appen må balansere dem uten å bli tre apper i én:

| Gruppe | Hva de trenger | Mitt design­svar |
|---|---|---|
| **Toppidrett m/meldeplikt** | Rask tilgang til regelverk, TUE-veileder, bevissthet om at whereabouts-beslutninger har konsekvenser | Legemiddelsøk og TUE øverst i hovedgrid; e-post-bekreftelse av søk som kan vises ved kontroll |
| **Toppidrett u/meldeplikt + bredde 15+** | Lav terskel, ingen pålogging i appen, enkel visuell risiko­kommunikasjon | Rød/gul/grønn-kodet output med ikoner (ikke bare farge — UU); onboarding tar < 30 sek |
| **Trenere, støtteapparat, foreldre** | Trygghet på at rådene de gir er korrekte; tilgang til materiale for mindreårige | Rollevalg i onboarding justerer språk og eksempler; "del resultat"-funksjon for bekreftelse på e-post |
| **Særforbund / e-læringsbruk** | Tilgang til Ren Utøver | Ikke integrert i appen — appen er en portal som åpner ADNOs Ren Utøver-side i in-app browser (ingen API-/SSO-integrasjon, jf. Spørsmål 5) |

Jeg har designet hovedsiden som ett grid for alle målgrupper fordi kjernen av
appen er universell (legemiddel, kosttilskudd, regler). Personalisering skjer
gjennom rolle­valg i onboarding (§ 5.0 "Onboarding"), som påvirker eksempel­tekst
og hvilke pushvarsler som er på som default — ikke ved å gjemme verktøy.

## 6. Suksesskriterier for ADNO — slik jeg måler vinningen

Appen er et virkemiddel, ikke et mål. Jeg har vært vært ærlig med meg selv om
hva som gjør denne leveransen verdifull for ADNO et år etter lansering:

1. **Redusert henvendelsespress på medisinsk rådgiver for trivielle
   spørsmål.** Legemiddelsøk og astmakalkulator i appen skal ta unna
   rutine­spørsmålene. Målbart: antall e-poster til medisinsk rådgiver per
   kvartal, kategorisert etter type spørsmål.
2. **Økt bruk av Legemiddelsøk og dopingliste-søk.** I dag ligger disse
   "gjemt" på nettsider. Målbart: antall søk per måned, sammenlignet med
   dagens web-baseline.
3. **Bedre etterlevelse av regelendringer.** Pushvarsler ved endring i
   dopinglista sikrer at utøvere informeres før neste konkurranse. Målbart:
   lese­grad på viktige meldinger.
4. **Flere relevante varsler via Dopingvarsel.** Lavere terskel når
   EQS-varslings­kanalen er ett tap unna fra appen. Målbart: antall innsendte
   varsler via appen vs. direkte via dopingvarsel-nettsiden.
5. **Ren Utøver-gjennomføring.** Direkte tilgang til e-læringen fra appens
   hovedside reduserer friksjon. Målbart i TASKs eksisterende statistikk:
   gjennomført­prosent for nye utøvere etter app-lansering.
6. **Erstatte ADNOs Facebook-gruppe for topputøvere.** Sp.18 sier eksplisitt
   at ADNO ønsker å avvikle dagens FB-gruppe og at viktige varsler heller
   skal komme fra appen. Suksess her betyr bedre rekkevidde (alle utøvere,
   ikke bare de på Facebook), bedre personvern (ingen Meta-sporing av
   topputøvere), og målrettet kommunikasjon per rolle/kategori. Målbart:
   andel topputøvere som mottar push-varsel innen 24t etter publisering, og
   nedleggelse av FB-gruppen innen 3 mnd etter app-lansering.

Jeg legger opp til at disse måle­punktene kan dekkes av enkel, personvern­vennlig
bruks­statistikk (aggregerte tellere, ingen individ­sporing) — i tråd med
GDPR-prinsippet om dataminimering.

## 7. Hva jeg har gjort for å forstå oppdraget

Oppdrags­forståelse er lett å påstå. Jeg vil vise den. Før innsending har jeg:

- **Lest hele Bilag 1 (§§ 1.0–12.0)** og referert til konkrete paragrafer
  gjennom hele tilbudet der det er relevant (jf. § 6 om ett-hovedside-prinsippet,
  § 5.1.1 om regelverk og personvern, § 4.0 om native vs. hybrid).
- **Lest alle tre Q&A-versjoner fra ADNO (22.04, 24.04 og 06.05.2026)** og
  innarbeidet samtlige 18 svar i tilbudet — særlig: pris som inkl. mva
  (Sp.1), dopinglista som **norsk** liste fra antidoping.no (Sp.4 — justert
  i v3 fra WADA-engelsk til norsk versjon), **ingen pålogging** og ingen
  TASK-integrasjon (Sp.5), Craft CMS som ADNOs hovedinnholds­motor levert av
  Feed (Sp.6), ADNO som eier av utviklerkontoer (Sp.7), EQS Compliance
  Cockpit som varslings­leverandør (Sp.8), engelsk språkstøtte i tillegg til
  norsk (Sp.10), at ADNO selv har DPO og GDPR-ressurs (Sp.11), at app-følelse
  vektes høyere enn web-app (Sp.12), avgrenset vedlikeholds­scope i
  garantiperioden (Sp.13/14), gjenbruk av eksisterende astma­kalkulator-kode
  (Sp.15), valgfri datalagring og moderat varsel­volum (8–12/år, Sp.16),
  toveis meldings­tråd i appen og Unifon som ADNOs SMS-gateway (Sp.17), og
  Azure-backend som matcher ADNOs eksisterende Microsoft-skyplattform med
  ADNO selv som avsender av meldinger/push (Sp.18).
- **Bygget en klikkbar prototype** på ca. 20 skjermer som dekker alle ni
  verktøyene fra § 4.0. Prototypen er lagt bak basic auth på
  asbjornrorvik.dev/no/oppdrag/antidoping-app (lenke og QR i Bilag 2 pkt. 1). Dette er ikke
  en mock-up — det er en tidlig web-build av den samme React Native-kodebasen
  jeg vil bygge ut. Konsekvensen for ADNO er at de tyngste tekniske antakelsene
  (informasjons­arkitektur, interaksjons­mønstre, visuell identitet, UU-grunnlag)
  allerede er validert før kontrakts­signering. Sprint 1 går dermed rett til
  integrasjon mot reelle datasett og innholds­produksjon — det reduserer
  leveranse­risiko og gir bedre sikkerhet for å levere innenfor fastpris og 6 mnd.
- **Hentet fargepalett og typografi fra antidoping.no** for å sikre visuell
  tilhørighet (Bilag 1 § 6 "ADNOs designmanual er retningsgivende"). Endelig
  designmanual gjennomgås med ADNO i første workshop.
- **Sett på hvordan tilsvarende apper er løst internasjonalt** (bl.a. Global
  DRO og Clean Sport-apper fra andre nasjonale antidoping­byråer) for å
  kalibrere informasjons­arkitektur og interaksjons­mønstre — uten å kopiere,
  fordi ingen av disse er designet for norsk regelverk eller integrert mot
  Felleskatalogen, og ADNOs hovedsidekrav (ett-trykks-tilgang, minimal tekst)
  er strengere enn det jeg har sett ute.
- **Utarbeidet et foreløpig DPIA-utkast** etter GDPR/personopplysningsloven
  som grunnlag for samtalen med ADNOs DPO i oppstarts­fasen.
- **Kartlagt tredjeparts­avhengigheter:** Felleskatalogens API (ADNOs
  eksisterende avtale), ADNOs nettside / Crafts API (Feed) for dopingliste
  og redaksjonelt innhold, EQS Compliance Cockpit for Dopingvarsel
  (lenke-portal), FCM/APNs for push, Apple App Store Connect og Google Play
  Console (eid av ADNO).

**Det ADNO får med denne leverandøren er ikke et løfte om å sette seg inn
i domenet — det er en leverandør som allerede har gjort det.**


*Denne seksjonen utgjør punkt 3 i Konsulentens besvarelse i Bilag 2, jf. Bilag 1 pkt. 2 "Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat".*

---


# 4. Service, support og vedlikehold

Tildelingskriteriet ber om tre ting: tilbudt service-/support-/vedlikeholds­modell, tilgjengelighet for Antidoping Norge (ADNO) underveis i utviklingen, og responstid på support og service i etterkant. Dette kapittelet svarer på alle tre, med konkrete tall, kanaler og SLA-er — ikke generelle formuleringer om å være "fleksibel og responsiv".

Grunnprinsippet i min modell er at ADNO får **direkte tilgang til utvikleren**. Det er ingen account manager, ingen ticket-kø og ingen eskaleringsmatrise mellom ADNO og den som skriver koden. Det gjør meg raskere enn et stort hus i alle ledd, og det er den konkrete fordelen jeg tilbyr som enmannsleverandør.


## 4.1 Tilgjengelighet for ADNO underveis i utviklingen

Kravspesifikasjonen (Bilag 1) krever workshops, pilotversjon og løpende demoer. Min samhandlings­modell er bygget for å gi ADNO kontinuerlig innsyn og påvirknings­mulighet gjennom hele utviklings­perioden (juli–desember 2026).

**Faste samhandlings­kanaler:**

- **Dedikert Slack- eller Teams-kanal** med ADNOs prosjekt­team, opprettet ved kontrakts­signering. All daglig dialog foregår her — ikke e-post-tråder som drukner.
- **Ukentlig demo (30 min, fredager 10:00)** hvor jeg viser ny funksjonalitet kjørende på iOS- og Android-bygg. ADNO får TestFlight-/Firebase App Distribution-lenke samme dag.
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

Bilag 1 §8 krever en pilotversjon underveis. Jeg leverer pilot i **måned 3 av 6** med minst de fire viktigste funksjonene kjørende mot reell backend: risikosjekk av kosttilskudd, legemiddelsøk (Felleskatalogen), søk i ADNOs norske dopingliste, og meldings­senter.

**Strukturert brukertesting som del av piloten:**

- **8–12 reelle brukertester** jeg fasiliterer, fordelt på fire målgrupper: toppidrettsutøvere med meldeplikt, breddeutøvere, trenere/støtte­apparat, og foreldre.
- Tester kjøres remote via Zoom + TestFlight, hver sesjon 45 min, med tenke-høyt-metodikk.
- Alle funn logges åpent i prosjekt­tavlen og prioriteres sammen med ADNO i påfølgende styringsmøte.
- ADNO fasiliteres hvis dere selv ønsker å invitere deltakere fra eget utøver­register — jeg håndterer det tekniske og moderering.

Rapport med prioriterte funn leveres innen 5 virkedager etter siste test­sesjon.


## 4.3 Leveranser, milepæler og aksepttest

Fastpris­leveransen er delt i seks milepæler med betalingsplan som matcher Bilag 5 (20/25/20/25/5/5). Dette senker ADNOs risiko: hver milepæl har sine egne aksepttest-kriterier, og ADNO kan avvise en milepæl uten at resterende arbeid utløser betaling.

**Aksepttest-kriteriene** defineres i fellesskap i måned 1 (oppstarts­workshop) og dokumenteres som vedlegg til prosjekt­planen. Typisk innhold per milepæl: funksjonelle krav dekket, ytelses-­mål (app-oppstart < 2 sek, søk < 1 sek), WCAG 2.2 AA-testrapport, 0 kritiske feil, < 3 alvorlige feil.

Aksepttest kjøres av ADNO i inntil 10 virkedager etter levering av hver milepæl. Feil meldt i aksepttest rettes uten kostnad som del av leveransen.


## 4.4 Garantiperiode — 12 måneder, inkludert i fastpris

Fastprisen inkluderer **12 måneders garantiperiode** fra og med dagen appen er lansert i App Store og Google Play. Garantiens omfang er avgrenset i tråd med ADNOs avklaringer i Q&A (Spørsmål 13/14): **feilretting og mindre justeringer/forbedringer**, ikke videreutvikling, ikke større tilpasninger som følge av endringer hos eksterne samarbeidspartnere, og ikke løpende drift.

**Hva som inngår uten ekstra kostnad:**

- **Feilretting** av avdekkede feil og mangler som skyldes leveransen — funksjonelle, sikkerhets­messige og ytelses­messige.
- **Mindre justeringer og forbedringer** basert på tilbakemeldinger på funksjonalitet eller brukervennlighet.
- **Teknisk support** til ADNOs prosjekt­ansvarlige og innholds­administrator.
- **Obligatoriske sikkerhets­oppdateringer** av React Native og avhengigheter når kritiske CVE-er (score ≥ 7.0) publiseres, og når dette er nødvendig for å beholde butikk-godkjenning i App Store og Google Play.

**Hva som ikke inngår** (jf. Spørsmål 13/14):

- Løpende drift av backend etter levering — driftsavtale tegnes separat hvis ADNO ønsker at jeg skal drifte. Appen utvikles slik at ADNO eller en tredjepart enkelt kan drifte den selv.
- Større tilpasninger som følge av endringer hos eksterne samarbeidspartnere (TASK, Feed/Craft, Felleskatalogen, EQS) eller større endringer i operativ­systemene til Apple eller Android. Appen utvikles slik at normal OS-oppdatering ikke utløser omfattende vedlikeholds­behov.
- Videreutvikling og ny funksjonalitet — prises etter timepris, jf. § 4.6.

**Support-kanaler og åpningstid:**

| Kanal | Åpningstid |
|---|---|
| E-post (hei@asbjornrorvik.dev) | Ordinær arbeidstid, mandag–fredag 08–16 |
| Telefon (direkte til Asbjørn) | Ordinær arbeidstid 08–16 |
| Slack/Teams (samme kanal som under utvikling, videreføres) | Ordinær arbeidstid 08–16 |

**Responstid og løsningstid under garanti (SLA):**

| Alvorlighet | Definisjon | Respons | Påbegynt retting | Mål løsningstid |
|---|---|---|---|---|
| **Kritisk (A)** | App ute av drift, data­tap, sikkerhets­hull | < 4 timer (i arbeidstid) | Samme dag | < 1 virkedag |
| **Alvorlig (B)** | Hoved­funksjon ute av drift, ingen rimelig work-around | < 1 virkedag | < 1 virkedag | < 5 virkedager |
| **Mindre (C)** | Kosmetisk/mindre funksjon, work-around finnes | < 3 virkedager | < 5 virkedager | Neste minor release |

Feilretting igangsettes **uten ugrunnet opphold** iht. SSA-O §7. Utenfor arbeidstid kan kritiske hendelser meldes på e-post/Slack; disse plukkes opp senest førstkommende arbeidsdag kl. 08:00, men håndteres i praksis raskere hvis det observeres.

**Rapportering i garantiperioden:** De første 6 månedene etter lansering leverer jeg månedlig **status­rapport** med: oppetid for backend, antall aktive brukere (fra analytics), crash-rate fra Crashlytics, åpne og løste support-saker, samt anbefalte forbedringer.


## 4.5 Overføring og knowledge transfer til ADNO

Et av målene i garantiperioden er at ADNO selv skal kunne drifte og vedlikeholde innhold i appen, og at en eventuell fremtidig leverandør raskt kan overta. Følgende leveres **ved oppstart av garantiperioden**:

- **Teknisk dokumentasjon**: arkitektur­diagram, integrasjons­oversikt (Felleskatalogen, ADNOs nettside / Crafts API levert av Feed, EQS Compliance Cockpit som lenke, Firebase Cloud Messaging), deploy-prosess (GitHub Actions → App Store Connect + Google Play Console — begge eid av ADNO), miljø­variabler og hemmeligheter (kryptert i 1Password eller tilsvarende).
- **Driftshåndbok**: hvordan se logger i Sentry, hvordan rulle ut ny versjon, hvordan rulle tilbake, hvordan rotere API-nøkler.
- **Video-opplæring (3–5 korte videoer à 5–10 min)** for ADNO-administrator: redigere kosttilskudd-spørsmål og vekting i app-admin, **sende push-varsler og styre målgruppe** (jf. Sp.18 — ADNO skal kunne betjene løsningen selv), **besvare innkommende meldinger fra utøvere i toveis meldings­tråden** (jf. Sp.17), redigere veileder-tekster (medisinsk fritak, astma — sistnevnte med gjenbruk av eksisterende kalkulator-logikk, jf. Sp.15), se statistikk. Opplæringen dekker også grensesnittet mot Craft (Feed) der det er relevant.
- **2-timers onboarding-workshop** med ADNOs innholds­administrator(er) ved oppstart av garantiperioden, samt en repetisjons­økt på 1 time 3 måneder senere.

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
2. Jeg svarer innen **5 virkedager** med estimat (timer eller fastpris), plan og foreslått leverings­dato.
3. ADNO godkjenner skriftlig før arbeid starter. Ingen arbeid faktureres uten godkjent bestilling.
4. Ferdig arbeid leveres mot tilsvarende aksepttest som i hoved­prosjektet.

**Prioritet:** ADNO er en fast kunde i min portefølje etter oppstart. Hvis jeg er allokert til andre oppdrag når en bestilling kommer, gjelder følgende:
- Kritiske saker (SLA A) prioriteres foran alt annet arbeid.
- Alvorlige saker (SLA B) starter innen 5 virkedager.
- Videreutvikling planlegges inn i nærmeste ledige 2-ukers sprint — normalt innen 2–4 uker.

**Kontraktens varighet og oppsigelse:** Vedlikeholds- og support­forholdet løper til det sies opp av en av partene med **3 måneders skriftlig varsel**, iht. kontrakt­utkastet. ADNO er ikke bundet til en minimum bestillings­volum etter garanti­periodens utløp.


## 4.7 Monitorering og driftsovervåking

For at support skal være proaktiv, ikke reaktiv, settes følgende overvåkings­verktøy opp som del av leveransen — på ADNOs egne kontoer eller i ADNOs navn, slik at ADNO eier konfigurasjon og data:

- **Sentry** for fanging av crashes og feil fra produksjon (iOS, Android, backend). Alle nye crash-grupper varsler utvikler automatisk i garantiperioden.
- **Firebase Crashlytics** som sekundær crash-reporting for app-stabilitet (iOS + Android).
- **Uptime-monitor** (Better Stack eller tilsvarende) som sjekker backend hvert minutt. Nedetid varsler leverandør på SMS i garantiperioden.
- **Månedlig health-rapport** til ADNO de første 6 månedene etter lansering: crash-free rate (mål: ≥ 99.5 %), p95 API-respons­tid, oppetid backend (mål: ≥ 99.8 %), top 5 feil siste 30 dager med status.

**Verktøy-kostnader:** Sentry, Crashlytics og uptime-monitor settes opp på ADNOs egne kontoer fra dag 1 (free-tier dekker normalt behovet i utviklings- og garantifase). Eventuelle løpende SaaS-kostnader (ca. 400–600 NOK/mnd samlet ved skalering ut over free-tier) faktureres ADNO direkte fra leverandørene, slik at ADNO eier abonnementene og ikke blir avhengig av meg for tilgang til egne drifts­data.


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

