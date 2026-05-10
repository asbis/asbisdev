---
title: "Bilag 2 — Seksjon 4: Service, support og vedlikehold"
tender: 2026-107028
oppdragsgiver: Antidoping Norge (ADNO)
status: UTKAST
---

# 4. Service, support og vedlikehold

Tildelingskriteriet ber om tre ting: tilbudt service-/support-/vedlikeholds­modell, tilgjengelighet for Antidoping Norge (ADNO) underveis i utviklingen, og responstid på support og service i etterkant. Dette kapittelet svarer på alle tre, med konkrete tall, kanaler og SLA-er — ikke generelle formuleringer om å være "fleksibel og responsiv".

Grunnprinsippet i min modell er at ADNO får **direkte tilgang til utvikleren**. Det er ingen account manager, ingen ticket-kø og ingen eskaleringsmatrise mellom ADNO og den som skriver koden. Det gjør meg raskere enn et stort hus i alle ledd, og det er den konkrete fordelen jeg tilbyr som enmannsleverandør.

---

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

---

## 4.2 Pilotversjon og brukertesting

Bilag 1 §8 krever en pilotversjon underveis. Jeg leverer pilot i **måned 3 av 6** med minst de fire viktigste funksjonene kjørende mot reell backend: risikosjekk av kosttilskudd, legemiddelsøk (Felleskatalogen), søk i ADNOs norske dopingliste, og meldings­senter.

**Strukturert brukertesting som del av piloten:**

- **8–12 reelle brukertester** jeg fasiliterer, fordelt på fire målgrupper: toppidrettsutøvere med meldeplikt, breddeutøvere, trenere/støtte­apparat, og foreldre.
- Tester kjøres remote via Zoom + TestFlight, hver sesjon 45 min, med tenke-høyt-metodikk.
- Alle funn logges åpent i prosjekt­tavlen og prioriteres sammen med ADNO i påfølgende styringsmøte.
- ADNO fasiliteres hvis dere selv ønsker å invitere deltakere fra eget utøver­register — jeg håndterer det tekniske og moderering.

Rapport med prioriterte funn leveres innen 5 virkedager etter siste test­sesjon.

---

## 4.3 Leveranser, milepæler og aksepttest

Fastpris­leveransen er delt i seks milepæler med betalingsplan som matcher Bilag 5 (20/25/20/25/5/5). Dette senker ADNOs risiko: hver milepæl har sine egne aksepttest-kriterier, og ADNO kan avvise en milepæl uten at resterende arbeid utløser betaling.

**Aksepttest-kriteriene** defineres i fellesskap i måned 1 (oppstarts­workshop) og dokumenteres som vedlegg til prosjekt­planen. Typisk innhold per milepæl: funksjonelle krav dekket, ytelses-­mål (app-oppstart < 2 sek, søk < 1 sek), WCAG 2.2 AA-testrapport, 0 kritiske feil, < 3 alvorlige feil.

Aksepttest kjøres av ADNO i inntil 10 virkedager etter levering av hver milepæl. Feil meldt i aksepttest rettes uten kostnad som del av leveransen.

---

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

---

## 4.5 Overføring og knowledge transfer til ADNO

Et av målene i garantiperioden er at ADNO selv skal kunne drifte og vedlikeholde innhold i appen, og at en eventuell fremtidig leverandør raskt kan overta. Følgende leveres **ved oppstart av garantiperioden**:

- **Teknisk dokumentasjon**: arkitektur­diagram, integrasjons­oversikt (Felleskatalogen, ADNOs nettside / Crafts API levert av Feed, EQS Compliance Cockpit som lenke, Firebase Cloud Messaging), deploy-prosess (GitHub Actions → App Store Connect + Google Play Console — begge eid av ADNO), miljø­variabler og hemmeligheter (kryptert i 1Password eller tilsvarende).
- **Driftshåndbok**: hvordan se logger i Sentry, hvordan rulle ut ny versjon, hvordan rulle tilbake, hvordan rotere API-nøkler.
- **Video-opplæring (3–5 korte videoer à 5–10 min)** for ADNO-administrator: redigere kosttilskudd-spørsmål og vekting i app-admin, **sende push-varsler og styre målgruppe** (jf. Sp.18 — ADNO skal kunne betjene løsningen selv), **besvare innkommende meldinger fra utøvere i toveis meldings­tråden** (jf. Sp.17), redigere veileder-tekster (medisinsk fritak, astma — sistnevnte med gjenbruk av eksisterende kalkulator-logikk, jf. Sp.15), se statistikk. Opplæringen dekker også grensesnittet mot Craft (Feed) der det er relevant.
- **2-timers onboarding-workshop** med ADNOs innholds­administrator(er) ved oppstart av garantiperioden, samt en repetisjons­økt på 1 time 3 måneder senere.

All dokumentasjon vedlikeholdes i repoet (Markdown) og oppdateres ved hver release.

---

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

---

## 4.7 Monitorering og driftsovervåking

For at support skal være proaktiv, ikke reaktiv, settes følgende overvåkings­verktøy opp som del av leveransen — på ADNOs egne kontoer eller i ADNOs navn, slik at ADNO eier konfigurasjon og data:

- **Sentry** for fanging av crashes og feil fra produksjon (iOS, Android, backend). Alle nye crash-grupper varsler utvikler automatisk i garantiperioden.
- **Firebase Crashlytics** som sekundær crash-reporting for app-stabilitet (iOS + Android).
- **Uptime-monitor** (Better Stack eller tilsvarende) som sjekker backend hvert minutt. Nedetid varsler leverandør på SMS i garantiperioden.
- **Månedlig health-rapport** til ADNO de første 6 månedene etter lansering: crash-free rate (mål: ≥ 99.5 %), p95 API-respons­tid, oppetid backend (mål: ≥ 99.8 %), top 5 feil siste 30 dager med status.

**Verktøy-kostnader:** Sentry, Crashlytics og uptime-monitor settes opp på ADNOs egne kontoer fra dag 1 (free-tier dekker normalt behovet i utviklings- og garantifase). Eventuelle løpende SaaS-kostnader (ca. 400–600 NOK/mnd samlet ved skalering ut over free-tier) faktureres ADNO direkte fra leverandørene, slik at ADNO eier abonnementene og ikke blir avhengig av meg for tilgang til egne drifts­data.

---

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
