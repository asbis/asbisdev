---
title: Bilag 4 — Prosjekt- og framdriftsplan
tender: 2026-105336
status: UTKAST
---

# Bilag 4 — Prosjekt- og framdriftsplan

**Leverandør:** Asbjørn Rørvik (org.nr 820252632)
**Anskaffelse:** Utvikling av selvhjelpsapp for personer som bruker kokain
**Sak:** 2026-105336 · Oslo kommune, Velferdsetaten / RUSinfo
**Dato:** 2026-04-27

---

## 1. Sammendrag

Leverandøren tilbyr en **smidig, inkrementell leveranse over 16 uker** etter kontraktsignering, med app i Apple App Store og Google Play innen uke 16. Planen bygger på at **prototypen allerede er bygget og verifiserer teknologi­valg og brukerflyt** — vi skal ikke starte fra et hvitt ark. Uke 1–2 går derfor til oppstart og Strapi-backend, ikke til rammeverk­valg.

Leveransen skjer i seks faser med demo og evaluerings­møte hver 2. uke. RUSinfo har full innsyn i git-repoet fra dag 1 og kan når som helst hente ned kildekoden og kjøre appen selv.

Én hoved­ressurs (Leverandør) + én navngitt backup-utvikler + ekstern UU-underleverandør.

---

## 2. Framdrift og milepæler

### 2.1 Overordnet tidslinje (16 uker etter kontrakts­signering)

```
Uke:  1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16
      ├─F0┤
          ├─F1───┤
                  ├─F2─────────┤
                                  ├─F3─────────┤
                                                  ├─F4────┤
                                                              ├─F5──┤
                                                                      ├─F6─┤

F0: Oppstart & prosjektsetup
F1: Backend (Strapi), innholdsmodell, CI/CD
F2: Port prototype til produksjon + HAP-funksjoner (triggerdagbok,
    tidtaker, avatar, sparekalkulator, abstinensgraf)
F3: Nye funksjoner (kartlegging, motivasjonsvegg, bildebibliotek,
    palett, krise-chat/AI) + tilpassede HAP-funksjoner (ukesmål, FAK)
F4: UU-testing (intern + ekstern) + bug-fix + modul 1/2/3-differensiering
F5: Butikk-publisering (App Store + Google Play review)
F6: Stabilisering, opplæring, dokumentasjon, overlevering
```

### 2.2 Milepæler med beslutnings­porter

| # | Milepæl | Uke | Leveranse | Beslutning |
|---|---|---|---|---|
| M0 | Kick-off | 1 | Prosjektplan signert, git-repo, kanaler oppsatt, kjørende dev-miljø hos RUSinfo | Go/no-go på oppstart |
| M1 | Backend-klar | 3 | Strapi oppe, innholds­modell verifisert, RUSinfo-admin kan redigere test­innhold | Innholds­modell godkjent |
| M2 | Kjerneapp demo | 6 | App med onboarding, lås, dagbok, tidtaker, Hjem, Prestasjoner, Info fra Strapi | Review av brukerflyt |
| M3 | Alle funksjoner integrert | 10 | Alle 5 nye funksjoner + FAK + ukesmål + modul 2-graf | Feature-complete sign-off |
| M4 | UU + test ferdig | 12 | Funka Nu/MediaLT-rapport, alle tilgjenge­lighetsfunn lukket, e2e-tester grønne | Klar for butikk-submit |
| M5 | Publisert | 15 | Godkjent i App Store + Google Play | Go-live |
| M6 | Overlevert | 16 | Manualer, opplæring gjennomført, drift i RUSinfos hender | Faktura + overgang til vedlikehold |

Demo-kadence: hver 2. uke (onsdag kl 13:00, 45 min Teams + git-link til fungerende build). RUSinfo-representanter kan prøve appen på egen enhet via Expo Go / TestFlight gjennom hele prosjektet.

### 2.3 Faseoversikt — detaljert

**F0. Oppstart (uke 1) — 20 t**
- Kick-off med RUSinfo: faglig gjennomgang, design-prinsipper, målgruppe
- Git-repo opprettet hos RUSinfo, Leverandør invitert som committer
- Teams/Slack-kanal, issue-tracker (GitHub Projects eller RUSinfos valg)
- Apple/Google Developer-kontoer bekreftet — Leverandør får tilgang
- Leveranseplan og kommunikasjons­rutine avtalt skriftlig

**F1. Backend-fundament (uke 2–3) — 40 t**
- Strapi oppe i Kundens driftsmiljø (Azure/Digdir/Oslo kommune)
- Innholds­modell: Artikkel, Tema, Hub, Krise­plan-default, Bakgrunns­bilde, Modul-konfig
- Admin-bruker for RUSinfo med test­innhold
- CI/CD: GitHub Actions eller tilsvarende → bygger iOS/Android ved push til main
- Reverse proxy + TLS, IP-stripping, logg-konfig (ingen person­data-logg)
- **Demo M1** uke 3: RUSinfo logger inn, redigerer en test­artikkel, ser den dukke opp i appen

**F2. Port og beholdte HAP-funksjoner (uke 4–6) — 100 t**
- Prototype-kode ryddet og produksjons­klargjort
- Onboarding med *RUSinfos* eget tekstutkast (ikke prototype-tekst)
- Sikkerhetslås: PIN + biometri, sikker lagring via iOS Keychain / Android Keystore
- Triggerdagbok + tidtaker + nullstill alle/enkelt
- Avatar-system (valgbar fra bildebibliotek, standard anonym figur)
- Sparekalkulator med norsk tallformat
- Abstinensgraf — modul 1-variant (slutte helt)
- Alle strings i `src/i18n/no.ts`, ESLint-regel aktivert
- **Demo M2** uke 6: full brukerflyt for "ny bruker i modul 1" fungerer ende-til-ende

**F3. Nye funksjoner og tilpassede (uke 7–10) — 130 t**
- Kartleggings­verktøy (planlagt vs. faktisk, 4-ukers visning)
- Motivasjons­vegg med bilde + tekst­komposisjon + eksport til JPEG
- Bildebibliotek (kurator­prosess sammen med RUSinfo uke 7)
- Palett­system utvidet til 3–5 paletter + grayscale
- Krise-chat (Kord AI eller enklere skript-basert "pust-veiledning")
- Ukens mål + "Slik gikk det"-evaluering
- FAK-skjema som egen dagboks-mal
- Modul 2-graf (redusere) + modul 3-flyt (lære om kokain)
- Lokal oversettelse: Apple Translation Framework / ML Kit integrert
- Lydavspilling for pusteøvelse og ev. guidet meditasjon
- **Demo M3** uke 10: alt innhold på plass, appen er feature-complete

**F4. Kvalitet, UU og test (uke 11–12) — 60 t**
- Unit-tester for dato- og statistikk­logikk (Vitest/Jest)
- E2e-tester for kjerne­flyter (Maestro eller Detox)
- Intern UU-sjekk: kontrast, skjermleser, Dynamic Type, Reduce Motion
- **Ekstern UU-revisjon** (Funka Nu / MediaLT) uke 11
- Bug-fix og tilgjenge­lighets­tilpasning uke 12
- Performance-test på gamle enheter (iPhone SE 2020, Android Go)
- **M4 uke 12:** UU-rapport signert, alle kritiske og høy­prioritets funn lukket

**F5. Publisering (uke 13–15) — 30 t**
- App Store Connect-metadata, screenshots, beskrivelse, aldersvurdering, eksport-compliance
- Google Play Console: Data Safety-skjema, policy-samsvar, metadata
- TestFlight / Internal Testing: 2 uker med RUSinfo + utvalgte testere
- Submit til review uke 14 (regner med 1–2 runder)
- **M5 uke 15:** godkjent og live i begge butikker

**F6. Opplæring, dokumentasjon og overlevering (uke 16) — 30 t**
- Sluttbruker­manual (PDF + web, illustrert)
- Admin-manual (PDF + Markdown i git)
- Bilag 10 tredjeparts­lisenser finalisert
- Personvern­vurderings­notat
- Oppstarts-workshop for RUSinfo-personell (4 t Teams eller fysisk)
- Overgangs­møte til vedlikeholds­fasen
- **M6 uke 16:** overlevert, vedlikeholds­avtale aktivert

**Total estimert innsats: ~410 timer** (ekskl. ekstern UU-revisjon som prises separat av underleverandør).

---

## 3. Kompetanse og bemanning

### 3.1 Hoved­ressurs — Asbjørn Rørvik

Senior fullstack-utvikler, 8+ års produksjons­erfaring. Stavanger-basert, jobber fjern med ukentlig fysisk tilstedeværelse i Oslo ved behov.

**Stack-erfaring relevant for oppdraget:**
- **React Native + TypeScript:** prototypen for denne appen + bygger og drifter Supportify (AI-kundesupport for Shopify, 100+ betalende butikker — solo-leveranse)
- **Mobilapp-publisering:** App Store + Google Play-publisering gjennom tidligere team­arbeid på Kolumbus (Netpower), NLR TryggDrift (Netpower), Easee (Bouvet) + egenhendig publisering av Supportify-integrasjoner
- **Backend + integrasjoner:** Go, .NET, Node.js, TypeScript, REST/GraphQL-APIer
- **Personvern og compliance:** team­arbeid på Easee EaseePay (PCI DSS-miljø, Bouvet 2021–2024)
- **Altibox-app:** var med på å bygge fra scratch som del av team­leveransen
- **CTO/solo-builder av Supportify:** driver full stack — frontend, backend, betalings­integrasjoner, kundesupport, drift — alene i produksjon

**Rolle i prosjektet:** arkitekt, hoved-utvikler, prosjekt­ansvarlig, kontaktpunkt mot RUSinfo. Tilgjengelig ~25 t/uke dedikert til oppdraget over 16 uker.

**Portefølje:** www.asbisdev.no (CV og case­beskrivelser)

### 3.2 Backup-utvikler (navngitt)

Ved sykdom, ferie eller annet fravær utover 3 virkedager trer backup-utvikler inn. Kandidater med skriftlig rammeavtale:

- *Navngitt backup — fylles inn før innsending* (senior RN-utvikler fra Leverandørens nettverk, skriftlig enighet om å dekke 4–8 timer/uke ved behov, 1500 kr/t, pre-godkjent av Kunden)

Backup-utvikler har lesetilgang til repo fra dag 1 og kan bringes inn operativt innen 48 t.

### 3.3 Underleverandør — ekstern UU-revisjon

**Funka Nu AB** eller **MediaLT AS** engasjeres for uavhengig tilgjenge­lighets­revisjon i uke 11. Begge er anerkjente aktører innen WCAG 2.1 AA-sertifisering for offentlig sektor i Norden. Endelig valg gjøres sammen med RUSinfo i uke 6 ut fra kapasitet og pris. Estimert omfang: 2 dagers revisjon + rapport. Priset separat i Bilag 7.

Underleverandøren får kun tilgang til app-UI og dokumentasjon, ikke til brukerdata.

### 3.4 Kildekode-eierskap og kontinuitets­sikring

RUSinfo eier kildekoden fra første commit (krav 4.1.8). I tillegg:

- **Git som eierskap:** RUSinfo har admin-rettigheter på repoet fra dag 1, Leverandør er committer. Hvis Leverandør blir utilgjengelig, har RUSinfo full kildekode uten noen mellomledd.
- **Byggnings­dokumentasjon:** repoet inneholder `CONTRIBUTING.md` og `SETUP.md` med skritt­visende instruksjoner for å bygge og publisere appen — slik at en hvilken som helst RN-utvikler kan ta over.
- **Hemmelig­sters­oversikt:** alle API-nøkler (Strapi token, App Store Connect, Google Play) eies av RUSinfo og lagres i deres hemmelig­lager (Azure Key Vault eller tilsvarende). Leverandør har tilgang under prosjektet, RUSinfo kan revokere når som helst.

---

## 4. Samarbeidsform

### 4.1 Møtestruktur

| Møte | Kadence | Varighet | Deltakere |
|---|---|---|---|
| Demo + evaluering | Annenhver onsdag kl 13:00 | 45 min | Leverandør, RUSinfo-prosjekt­leder, faglig rådgiver |
| Ukentlig statusmelding | Fredag kl 15:00 | Skriftlig (5 min lest) | Alle |
| Innholds­arbeid (uke 7) | 1 gang | 2 t | Leverandør, RUSinfo-fagansvarlig, bilde-kurator |
| Workshop ved overlevering (uke 16) | 1 gang | 4 t | Admin-personell + Leverandør |

### 4.2 Kanaler

- **Teams** (eller RUSinfos foretrukne): løpende dialog
- **GitHub Issues / Linear:** alle oppgaver, bugs og avklaringer sporbare
- **E-post:** formell dokumentasjon, endrings­anmodninger
- **Respons­tid i prosjektfasen:** 24 t på virkedager (bedre enn SSA-T-standarden)

### 4.3 Beslutnings­punkter

Alle beslutninger som påvirker omfang, tid eller kost logges i egen ADR-fil (`docs/decisions/`) med referanse til dato, deltakere og rasjonale. Oppdragsgiver godkjenner skriftlig endringer som utløser ekstra arbeid (jf. SSA-T kap. 3).

### 4.4 Innholds­arbeid med RUSinfo

Leverandør utvikler tekniske systemer; **RUSinfo eier alt fag­faglig innhold**:

- Ukens/dagens tema-tekster
- Default kriseplan-tekst
- Artikler og temaer i Info-tab
- Bildevalg og kurator­prosess for bildebibliotek
- FAK-mal og ukesmål-formulering
- Alle onboarding-tekster (prototypens tekster er *placeholders* til ekte tekst kommer)

Uke 7 settes av til felles innholds­arbeid. Leverandør leverer malverk, RUSinfo fyller inn.

---

## 5. Risiko­matrise

| # | Risiko | Sannsynlighet | Konsekvens | Mitigering |
|---|---|---|---|---|
| R1 | Solo-leverandør blir syk eller utilgjengelig | Middels | Høy | Navngitt backup-utvikler med rammeavtale; kildekode hos RUSinfo fra dag 1; all dokumentasjon i git; ukentlig commit-frekvens sikrer at siste fungerende state aldri er mer enn 5 dager gammel. |
| R2 | App Store / Google Play review avslår appen | Middels | Middels | Early TestFlight (uke 12) og Internal Testing-kanal; kontakt med Apple/Google-reviewere er etablert via Netpower- og Bouvet-erfaring; buffer på 3 uker mellom submit (uke 14) og krav om live (uke 15). |
| R3 | Kravendringer under­veis fra RUSinfo | Høy | Middels | 2-ukers demo-kadence fanger misforståelser tidlig; endringer håndteres via SSA-T kap. 3 med skriftlig estimat; "tas-ut"-listen i Bilag 2 §4.1.11 gir fleksibilitet uten ny forhandling. |
| R4 | Personvern-tolkning: tilsynet vurderer at løsningen *likevel* behandler personopplysninger | Lav | Middels | Personvern­vurdering leveres ved go-live; varslings­plikt ved endringer; DPIA-bistand avtalt etter 4.4.3 ved behov; databehandler­avtale-template klar hvis utløst. |
| R5 | UU-revisjon finner omfattende funn | Middels | Middels | Tilgjenge­lighet bygges inn fra start (accessibilityLabel/Role i prototypen allerede); intern revisjon i uke 10 før ekstern i uke 11; bufferuke 12 er satt av til lukking av funn. |
| R6 | Strapi-drift: ustabilitet eller sikkerhets­hull | Lav | Middels | Managed hosting foretrukket (Strapi Cloud eller Azure App Service); automatiske sikkerhets­patches; månedlig oppgradering i vedlikeholds­fasen; backup av database hvert døgn. |
| R7 | Lokal oversettelses­modell dekker ikke alle behov | Lav | Lav | Apple/Google-modeller dekker norsk godt; fallback til Marian-ONNX om behov; funksjon kan tas ut (30k reduksjon) uten å bryte oppdraget. |
| R8 | Budsjett­sprekk i scope | Middels | Høy | "Tas-ut"-liste i §4.1.11 gir RUSinfo konkrete handlingsrom; månedlig time­rapport sendes til RUSinfo; ved fare for sprekk varsles skriftlig minimum 2 uker i forveien. |
| R9 | RUSinfo-innhold blir forsinket | Middels | Middels | Uke 7 dedikert til innholds­arbeid; Leverandør leverer "lorem ipsum"-placeholders slik at tekniske milepæler ikke stopper; innhold kan byttes ut etter go-live via Strapi uten ny app-release. |
| R10 | Kravet om 5–7 års levetid for rammeverk | Lav | Lav | React Native er på år 11 med aktiv Meta-støtte; Expo har garantert support-syklus; lav risiko adressert med dokumentert roadmap. |

---

## 6. Aksept­kriterier (leverings­test)

Appen aksepteres som levert når **alle** følgende er oppfylt:

1. Publisert i Apple App Store og Google Play under RUSinfos kontoer
2. Alle M-krav i Bilag 1 er oppfylt
3. Alle B-krav besvart i Bilag 2 fungerer som beskrevet
4. UU-rapport fra Funka Nu/MediaLT viser WCAG 2.1 AA-samsvar
5. Unit- og e2e-tester passerer i CI
6. Admin- og sluttbruker­manualer levert
7. Oppstarts-workshop gjennomført
8. Git-repo overlevert, RUSinfo kan bygge og publisere selvstendig

Aksept­test gjennomføres som felles sjekkliste-gjennomgang uke 15–16 før signert aksept.

---

## 7. Forutsetninger

Planen forutsetter at RUSinfo bidrar med:

- Apple Developer-konto og Google Play Console-konto klargjort uke 1
- Driftsmiljø for Strapi (kan settes opp av Leverandør, men Kunden må eie) klargjort uke 2
- Faglig ressurs tilgjengelig for innholds­arbeid uke 7 (ca. 8 timers arbeid spredt over 2 uker)
- Demo-deltakelse annenhver onsdag
- Skriftlig godkjenning av endringer innen 5 virkedager

Forsinkelser i disse bidragene forskyver framdriften tilsvarende. Leverandør varsler skriftlig og foreslår justert plan.

---

## 8. Vedlegg

- Prototype-link og skjermbilder (vedlagt Bilag 2)
- CV og referanser (vedlagt separat som teknisk/faglig-bilag)
- Backup-utvikler­avtale (skriftlig erklæring, vedlagt separat)
- Intensjonsavtale Funka Nu / MediaLT (vedlagt separat)

---

*Dokumentet lastes opp i KGV sammen med øvrige bilag senest 27. april 2026 kl 12:00.*
