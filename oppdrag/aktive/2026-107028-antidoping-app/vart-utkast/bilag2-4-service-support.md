---
title: Bilag 2 — Seksjon 4: Service, support og vedlikehold
tender: 2026-107028
status: UTKAST
---

# 4. Service, support og vedlikehold

Tildelingskriteriet ber om tre ting: tilbudt service-/support-/vedlikeholds­modell, tilgjengelighet for Antidoping Norge (ADNO) underveis i utviklingen, og responstid på support og service i etterkant. Dette kapittelet svarer på alle tre, med konkrete tall, kanaler og SLA-er — ikke generelle formuleringer om å være "fleksibel og responsiv".

Grunnprinsippet i vår modell er at ADNO får **direkte tilgang til utvikleren**. Det er ingen account manager, ingen ticket-kø og ingen eskaleringsmatrise mellom ADNO og den som skriver koden. Det gjør oss raskere enn et stort hus i alle ledd, og det er den konkrete fordelen vi tilbyr som enmannsleverandør.

---

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

---

## 4.2 Pilotversjon og brukertesting

Bilag 1 §8 krever en pilotversjon underveis. Vi leverer pilot i **måned 3 av 6** (september 2026) med minst de fire viktigste funksjonene kjørende mot reell backend: risikosjekk av kosttilskudd, legemiddelsøk (Felleskatalogen), søk i dopinglista (WADA), og meldings­senter.

**Strukturert brukertesting som del av piloten:**

- **8–12 reelle brukertester** fasilitert av oss, fordelt på fire målgrupper: toppidrettsutøvere med meldeplikt, breddeutøvere, trenere/støtte­apparat, og foreldre.
- Tester kjøres remote via Zoom + TestFlight, hver sesjon 45 min, med tenke-høyt-metodikk.
- Alle funn logges åpent i prosjekt­tavlen og prioriteres sammen med ADNO i påfølgende styringsmøte.
- ADNO fasiliteres hvis dere selv ønsker å invitere deltakere fra eget utøver­register — vi håndterer det tekniske og moderering.

Rapport med prioriterte funn leveres innen 5 virkedager etter siste test­sesjon.

---

## 4.3 Leveranser, milepæler og aksepttest

Fastpris­leveransen er delt i seks milepæler med betalingsplan som matcher Bilag 5 (20/25/20/25/5/5). Dette senker ADNOs risiko: hver milepæl har sine egne aksepttest-kriterier, og ADNO kan avvise en milepæl uten at resterende arbeid utløser betaling.

**Aksepttest-kriteriene** defineres i fellesskap i måned 1 (oppstarts­workshop) og dokumenteres som vedlegg til prosjekt­planen. Typisk innhold per milepæl: funksjonelle krav dekket, ytelses-­mål (app-oppstart < 2 sek, søk < 1 sek), WCAG 2.2 AA-testrapport, 0 kritiske feil, < 3 alvorlige feil.

Aksepttest kjøres av ADNO i inntil 10 virkedager etter levering av hver milepæl. Feil meldt i aksepttest rettes uten kostnad som del av leveransen.

---

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

---

## 4.5 Overføring og knowledge transfer til ADNO

Et av målene i garantiperioden er at ADNO selv skal kunne drifte og vedlikeholde innhold i appen, og at en eventuell fremtidig leverandør raskt kan overta. Følgende leveres **ved oppstart av garantiperioden**:

- **Teknisk dokumentasjon**: arkitektur­diagram, integrasjons­oversikt (Felleskatalogen, WADA, TASK/e-læring, Firebase Cloud Messaging), deploy-prosess (GitHub Actions → App Store Connect + Google Play Console), miljø­variabler og hemmeligheter (kryptert i 1Password eller tilsvarende).
- **Driftshåndbok**: hvordan se logger i Sentry, hvordan rulle ut ny versjon, hvordan rulle tilbake, hvordan rotere API-nøkler.
- **Video-opplæring (3–5 korte videoer à 5–10 min)** for ADNO-administrator: redigere kosttilskudd-spørsmål og vekting i CMS, sende push-varsel, redigere veileder-tekster (medisinsk fritak, astma), se statistikk.
- **2-timers onboarding-workshop** med ADNOs CMS-administrator(er) ved oppstart av garantiperioden, samt en repetisjons­økt på 1 time 3 måneder senere.

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
2. Vi svarer innen **5 virkedager** med estimat (timer eller fastpris), plan og foreslått leverings­dato.
3. ADNO godkjenner skriftlig før arbeid starter. Ingen arbeid faktureres uten godkjent bestilling.
4. Ferdig arbeid leveres mot tilsvarende aksepttest som i hoved­prosjektet.

**Prioritet:** ADNO er en fast kunde i vår portefølje etter oppstart. Hvis Asbjørn er allokert til andre oppdrag når en bestilling kommer, gjelder følgende:
- Kritiske saker (SLA A) prioriteres foran alt annet arbeid.
- Alvorlige saker (SLA B) starter innen 5 virkedager.
- Videreutvikling planlegges inn i nærmeste ledige 2-ukers sprint — normalt innen 2–4 uker.

**Kontraktens varighet og oppsigelse:** Vedlikeholds- og support­forholdet løper til det sies opp av en av partene med **3 måneders skriftlig varsel**, iht. kontrakt­utkastet. ADNO er ikke bundet til en minimum bestillings­volum etter garanti­periodens utløp.

---

## 4.7 Monitorering og driftsovervåking

For at support skal være proaktiv, ikke reaktiv, inngår følgende overvåkings­verktøy i leveransen:

- **Sentry** for fanging av crashes og feil fra produksjon (iOS, Android, backend). Alle nye crash-grupper varsler utvikler automatisk.
- **Firebase Crashlytics** som sekundær crash-reporting for app-stabilitet (iOS + Android).
- **Uptime-monitor** (Better Stack eller tilsvarende) som sjekker backend hvert minutt. Nedetid varsler Asbjørn på SMS.
- **Månedlig health-rapport** til ADNO: crash-free rate (mål: ≥ 99.5 %), p95 API-respons­tid, oppetid backend (mål: ≥ 99.8 %), top 5 feil siste 30 dager med status.

Alt verktøy-kostnad er inkludert i fastpris under utvikling og garantiperiode. Etter garantiperiode estimeres løpende SaaS-kostnader til ca. 400–600 NOK/mnd samlet, som viderefaktureres ADNO til selvkost eller settes opp på ADNOs egne kontoer.

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
