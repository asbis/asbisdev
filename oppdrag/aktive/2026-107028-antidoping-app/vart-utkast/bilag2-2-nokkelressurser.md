---
title: Bilag 2 — Seksjon 2. Nøkkelressurser — kompetanse og referanseprosjekt
tender: 2026-107028
status: UTKAST
---

# 2. Nøkkelressurser — kompetanse og referanseprosjekt

**Leverandør:** Asbjørn Rørvik (enkeltpersonforetak), org.nr. 820 252 632
**Anskaffelse:** Utvikling av antidoping-app for Antidoping Norge (Doffin 2026-107028)

---

## 2.1 Teamets oppbygging

Oppdraget leveres av én senior utvikler med 8+ års produksjonserfaring fra
direkte sammenlignbare mobilapper, støttet av én dedikert ressurs for
universell utforming og cross-device-testing. Dette gir Antidoping Norge
samme seniornivå som et stort konsulenthus, uten overleveringer mellom
junior- og senior-ressurser underveis i prosjektet.

Kriteriet i konkurransegrunnlaget åpner for inntil to nøkkelressurser.
Vi fører opp to:

| # | Rolle | Navn | Andel av oppdraget |
|---|---|---|---|
| 1 | Teknisk prosjektleder og utvikler (hovedressurs) | Asbjørn Rørvik | ~85–90 % |
| 2 | UU-rådgiver og testressurs (underleverandør) | Oppgis i Vedlegg 1 | ~10–15 % |

Den samme personen står for design-beslutninger, arkitektur, utvikling,
App Store- og Google Play-publisering, samt drift og vedlikehold gjennom
hele perioden. Kunden har én kontakt fra kickoff til lansering — ingen
bytter av lead, ingen kunnskap som forsvinner ved rotasjon.

---

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

- Bachelor i Electromechanical Engineering, Universitetet i Stavanger, 2016.
  Bakgrunnen fra automasjon og regulert teknisk miljø gir god forståelse
  for sikkerhetskritiske domener — noe antidoping-arbeid under WADA-koden
  konkret krever.
- Kontinuerlig egenlæring innen mobil, backend og sikkerhet, dokumentert
  gjennom leveranser i regulerte miljøer (Equinor offshore, Easee med
  PCI DSS, NLR/KSL med HMS-data).

### Teknologisk kompetanseområder

- **Mobil:** Flutter/Dart og React Native/TypeScript — produsert og
  publisert begge plattformer i App Store og Google Play.
- **Backend og API:** Go, .NET/C#, Node.js, PostgreSQL, REST/GraphQL.
- **Frontend:** React, Next.js, Tailwind.
- **Integrasjoner og sikkerhet:** OAuth 2.0 / OpenID Connect, BankID/ItF-
  mønstre, PCI DSS, sertifikatspinning, Adyen.
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
Felleskatalogen og WADAs dopingliste, pushvarsling, universell utforming og
personvern etter WADA ISPPPI.

Asbjørn har bygget og levert samtlige av disse komponentene i produksjon
tidligere — se referanseprosjektene i 2.3.

---

## 2.3 Referanseprosjekter

Nedenfor beskrives tre referanseprosjekter valgt ut fordi de hver for seg
dekker sentrale krav i antidoping-appen: samfunnskritisk regelverksdomene,
skala på mange brukere, og regulert miljø med høye sikkerhetskrav.
Kontaktreferanser oppgis i Vedlegg 1.

### Referanse 1 — TryggDrift, Norsk Landbruksrådgiving (NLR)

| Felt | Detalj |
|---|---|
| Kunde | Norsk Landbruksrådgiving (NLR) / KSL |
| Periode | 2025 |
| Rolle | Fullstack-utvikler (via Netpower) |
| Teknologi | React Native, .NET / C#, App Store, Google Play |

**Hva som ble levert:** TryggDrift er en digital HMS-løsning for norsk
landbruk som erstatter det tidligere KSL Trygg-systemet. Asbjørn var med
fra første commit og stod for sentrale deler av React Native-klienten og
deler av .NET-backenden. Appen ble publisert i Apple App Store og Google
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
- **knytter brukeren til et formelt regelverk** (KSL / WADA-koden);
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
  sikkerhets- og compliance-regime overføres direkte til WADA-regulert
  antidopingarbeid, der feil i en app kan få konsekvenser for en utøvers
  karriere.
- **React Native i produksjon på iOS og Android.** Samme stack og samme
  publiseringsregime som Antidoping Norge kan velge for sin app.
- **Kritisk varslings- og meldingsmønster.** Notifications-appen løser det
  samme UX-problemet som ADNOs meldingssenter (krav 3.4): levere viktige
  varsler raskt og pålitelig til en bruker som må handle.

I tillegg dokumenterer tidligere leveranser for **Easee (EaseePay)** direkte
arbeid med PCI DSS, Adyen-integrasjon og kryptering av betalingsdata —
erfaring som er overførbar til WADA ISPPPI-kravene for beskyttelse av
utøverdata. EaseePay-erfaringen kan framlegges som tilleggsreferanse ved
behov.

---

## 2.4 Nøkkelressurs 2 — UU-rådgiver og testressurs (underleverandør)

Leverandør benytter én dedikert underleverandør for universell utforming
og test. Ressursen har følgende rolle:

- **WCAG 2.2 AA-revisjon** av appen før lansering, med fokus på skjermleser
  (VoiceOver på iOS og TalkBack på Android), kontrast, dynamic type, reduced
  motion og navigerbarhet uten syn.
- **Cross-device-testing** på minimum 3 fysiske enheter (eldre og nyere
  iOS- og Android-modeller) før hver milepælsleveranse.
- **Testdokumentasjon og avviksrapport** som leveres til Antidoping Norge
  som del av slutt­leveransen.

Ressursen er en erfaren norsk UU-konsulent med dokumenterte leveranser mot
offentlig sektor. Konkret navn og CV oppgis i **Vedlegg 1** før
kontraktsignering, jf. konkurransegrunnlagets bestemmelser om
underleverandører. Underleverandøren utgjør ca. **10–15 %** av oppdragets
arbeidstimer og er priset inn i Bilag 7.

Leverandøren står ansvarlig overfor Antidoping Norge for alt arbeid
underleverandøren utfører.

---

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

**4. Dedikert UU- og testressurs som backstop.** Ekstern UU-revisjon og
cross-device-test løser det som er den reelle risikoen ved en
soloressurs (én person kan være blind for egne designvalg) og gir ADNO
uavhengig kvalitetssikring før lansering.

Resultatet er en leveranse der Antidoping Norge får seniornivå på hver
arbeidstime, dokumenterte referanser på nivå med store hus, og en
leveransemodell som er raskere og mer direkte enn det som er mulig i et
større konsulentapparat.

---

*Kontaktinformasjon til referanser oppgis i Vedlegg 1. CV for nøkkel­
ressurs 1 følger som eget vedlegg.*
