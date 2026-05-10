# Tilbudsstruktur — Veterinærinstituttet nettsideutvikling og drift

**Status:** Utkast, avventer lesing av konkurransegrunnlag på Tendsign

---

## Bilag 1: Tilbudsskjema

Standardform fra Tendsign. Fylles når priser er fastsatt.

**Prisbånd (hypotese — avventer konkurranse­grunnlag):**
- Fastpris År 1 (drift + initiale forbedringer): 1.8–2.2M NOK
- År 2–3 (opsjon): 2.0M/år (inflasjonskompensert)
- Vedlikeholdspool ekstra ordre: +500k/år

**Totalt 24 mnd:** ~4.5M NOK

---

## Bilag 2: Løsningsforslag

**Lengde:** 8–12 sider

### 1. Forståelse av oppdraget (1 side)

"Veterinærinstituttet er nasjonal autoritet for dyrehelse og beredskapskommunikasjon. Deres nettsted betjener:
- Internasjonale laboratorier (prøveinnlevering, WADA-tilgang)
- Veterinærer i praksis (diagnosestøtte, regelverksendringer)
- Allmennheten (sykdomsstatus, beredskapsinformasjon)

Oppdraget er drift, vedlikehold og evolutiv utvikling av denne kritiske digitale kanalen — sikring av oppetid, WCAG-compliance, integrasjon mot bakende-systemer, og modernisering der det gir verdi for kjøper."

### 2. Teknisk arkitektur (2 sider)

#### År 0–1: Kartlegging og stabilisering

"Dag 1–2 uker: Dokumentere eksisterende stack (CMS, hosting, integrasjoner, datamodell). Etablere:
- **Monitoring:** Sentry for feil, DataDog/CloudWatch for infrastruktur
- **CI/CD:** GitHub Actions eller Azure Pipelines for automatisert test og deploy
- **Backup/recovery:** Test RTO/RPO, dokumenter prosedyrer

Målt resultat: Baseline for oppetid (anslå 99.5 % månedlig), oppdaget kritiske gjeld."

#### År 1–2+: Videreutvikling etter prioritering

"Sjekk med kjøper hva som er viktigst:
- **Option A — Stabil drift + incremental modernisering:** Fortsett eksistende CMS, migrér gradvis til Next.js headless for komponenter der det gir ROI (frontend-tester, deployment-hastighet)
- **Option B — Aggressiv modernisering:** Hent all innhold fra CMS via API, bygger Next.js-frontend (18+ mnd)

Vi anbefaler Option A: lavere risiko, løpende verdi for kjøper."

#### Stack (teknisk valg)

**Frontend:**
- **Next.js 16** (App Router, Server Components)
- **TypeScript** — type-sikkerhet for kompleks domene
- **Tailwind CSS** — vedlikehold, konsistens

**Backend/API:**
- **Eksisterende CMS:** Magnolia/Sitecore/proprietary (kjør videre mens vi migrerer)
- **Integrasjonslag (nye features):** Node.js (NestJS) på Azure App Service
- **Database:** Eksisterende (arv) + PostgreSQL for nye features

**DevOps:**
- **Hosting:** Azure Government (hvis statlig krav) eller AWS Oslo region
- **CDN:** CloudFlare eller Azure Front Door (cache, DDoS-protect)
- **Sikkerhet:** WAF, certificate-pinning for API-kall, DPIA for persondata

**Monitoring:**
- **Errors:** Sentry
- **Logs:** ELK eller Azure Log Analytics
- **Alerts:** On-call via PagerDuty / Slack

### 3. Kvalitet og tilgjengelighet (1 side)

"WCAG 2.2 AA er ikke kun compliance — det er god UX.

**Fra dag 1:**
- Dynamic type (iOS) og scaled text (Android) — respekterer brukeren
- VoiceOver/TalkBack-merking (alt-tekst, ARIA-labels, landmark-nav)
- Kontrast > 4.5:1 for normal tekst, > 3:1 for store
- No layout shift under loading (Cumulative Layout Shift < 0.1)
- Keyboard navigation (tab, skip-links)
- Reduced motion —respekt fartstille

**Testing:**
- Automatisert: axe, WAVE, Lighthouse
- Manuell: halvårlig audit hos Funka (underleverandør)
- Brukertest: 2–3 ganger/år med skjermleser + tastatur-brukere

**Resultat:** Sertifikat eller uttalelse fra Funka per år."

### 4. Sikkerhet og personvern (1 side)

"Veterinærinstituttet håndterer:
- **GDPR:** Persondata om veterinærer, laboratorier, bevis­materiell
- **Datasikkerhet:** Integrasjon mot WADA, internasjonale myndigheter
- **Kritisk infrastruktur:** Sykdomsstatus brukt av myndig­heter på beredskapsmøter

**Tiltak:**
- DPIA (Data Protection Impact Assessment) for alle nye features
- Secrets management: Azure Key Vault (ikke i kode)
- Sertifikat-pinning for API-kall (hindre MITM-angrep)
- Minimal datainnnsamling (analytics anonym, no tracking-cookies)
- SOC 2 Type II eller ISO 27001-audit (årlig, eller godta kundens krav)

**Incidenthåndtering:**
- Response time: 1 time for kritisk, 4 timer for høy
- Postmortem: skriftlig root-cause-analyse innen 3 dager
- Logging: 90 dagers oppbevaring, audit-trail uforanderlig"

### 5. Driftsstabilitet (SLA) (1 side)

"Mål: 99.9 % oppetid (~45 min downtime/mnd).

**Backup og recovery:**
- Full backup daglig, geo-redundant lagring
- RTO (Recovery Time Objective): 1 time
- RPO (Recovery Point Objective): 4 timer

**Vedlikehold og patching:**
- Sikkerhetsupdater: innen 48 timer fra release
- Feature-patch: månedlig (2. onsdag)
- Major oppgradering: planlagt sammen med kjøper, max 1x/år

**Runbooks:**
- Dokumentert prosedyre per kritisk scenario (database-feil, DDoS, CDN-outage)
- Github-repo med troubleshooting-guide
- On-call backup: [underleverandør] responstid < 2 timer

**Rapportering:**
- Ukentlig oppetidsrapport
- Månedlig review med teknisk kontakt"

### 6. Endringsordrer og grenser (1 side)

**Inkludert i fastprisen:**
- Drift og patching
- Mindre feature-requests (< 20 timer/mnd snitt)
- WCAG-compliance-audits
- Sikkerhetsupdates
- Dokumentasjon

**IKKE inkludert (endringsordrer, Time & Materials):**
- Større redesign (100+ timer)
- Helt nye features uten scope-klargjøring
- Tredjepartsintegrasjoner (koster eksterne leverandør)
- Datastillinger eller migrasjon av legacy-data

"Vi forutsetter løpende dialog hver 2. uke (sprint-standup) for å holde scope tight."

---

## Bilag 3: Prosjektplan og milepæler

| Periode | Milepæl | Leveranse |
|---|---|---|
| **Dag 1–2** | Kartlegging | Arkitektur-dokument, systemmonografi |
| **Uke 1–4** | Baseline-stabili­sering | Monitoring operativt, CI/CD pipeline live, første 3 bugfix-milepæler |
| **Mnd 2–6** | År 1, iterasjon 1 | 5–8 små features, WCAG-audit fra Funka |
| **Mnd 6–12** | År 1, iterasjon 2–3 | Moderniserings-evaluering, Stack Overflow + Stack Overflow-analyse, backup-testing |
| **År 2+** | Løpende drift + videreutvikling | Per opsjon: målinger på teknisk gjeld, prioritert backlog |

---

## Bilag 4: Gjennomføringsevne og organisasjon

### Ressurser

| Rolle | Person | Erfaring | Prosent | År |
|---|---|---|---|---|
| Systemarkitekt + lead | Asbjørn Rørvik | 8 år fullstack, drift av Kolumbus-appen (142k brukere), TryggDrift | 80 % | År 1–2 |
| UU/kvalitetssikring (underleverandør) | Funka eller MediaLT | WCAG 2.2-spesialist | 20 % | År 1–2+ |
| Drift + backup (on-call) | Junior-konsulent (outsourced) | Søke support-partner, e.g. Logit (cloud-ops) | On-call | År 1–2+ |

**Kapasitet:** 
- År 1: 80 % dedikert (leverandør) + 20 % QA = 1.0 FTE
- År 2+: 60 % dedikert (drift/videreutvikling) + 20 % QA = 0.8 FTE

**Risiko — Solo-faktoren:**
"En person for 24 mnd drift kan være bekymring. Vi mitigerer:
1. Full kildekode-escrow — kjøper har git-tilgang hele tiden
2. Underleverandør backup — on-call responstime < 2 timer for kritisk
3. Dokumentasjon i Markdown (github): runbooks, API-spesifikasjon, datamigrasjon-guide
4. Monthly handover­møter med teknisk kontakt (sikrer kjøper kan overta)
5. Tilgang til Slack/Teams for daglig støtte — ikke avhengig av en person"

### Referanser

Se Bilag 5.

---

## Bilag 5: Referansebeskrivelser

### Referanse 1: Kolumbus-appen (Rogaland fylkeskommune)

**Kunde:** Rogaland fylkeskommune / Kolumbus AS
**Periode:** 2022–nå (4 år kontinuerlig)
**Roll:** Senior fullstack engineer, drift + feature-development

**Hva:** Kolumbus-appen er reiseguide for kollektiv­trafikk i Rogaland — planlegger rute, viser sanntids-informasjon, og lar passasjerer kjøpe billetter in-app. Vant Nordic Public Transport Design Award 2025.

**Størrelse:** 142,000 aktive brukere/mnd, 10M API-kall/dag

**Teknologi:** Flutter (iOS + Android), Go-backend (Kubernetes), PostgreSQL, real-time integrasjon mot Entur API

**Konkret bidrag:**
- Redesign av ruteplanlegger (forklarbar algoritme, alternative ruter)
- Sanntids-varslinger (forsinkelser, linjeskifte, alternativer)
- Payment integration (Adyen, in-app kjøp)
- Drift-ansvar: 99.5 % oppetid SLA, on-call support

**Kontaktperson:** [Navn], Technology Lead, Kolumbus
**Telefon:** +47 XX XXX XXXX

---

### Referanse 2: TryggDrift (Norges Landbrukssamfunn)

**Kunde:** Norges Landbrukssamfunn
**Periode:** 2020–2024 (4 år)
**Roll:** Lead developer, mobile app development

**Hva:** TryggDrift-appen er HMS-håndboken for landbruk — regel­værk, sjekklister, risiko­vurdering. Publisert på App Store og Google Play, brukt av tusenvis av bønder.

**Størrelse:** 5,000+ nedlastninger, gjennomsnittlig vurdering 4.7 stjerner

**Teknologi:** React Native, Node.js-backend, Firebase, offline-first

**Konkret bidrag:**
- Fullt produksjonslag (frontend + backend)
- Offline-synkronisering (arbeid ute på gårder uten nett)
- Regelverks-versjonering (trastrbar endringer)
- Publisering til App Store (TLS 1.3, certificate-handling)

**Kontaktperson:** [Navn], Prosjektleder, NLR
**Telefon:** +47 XX XXX XXXX

---

### Referanse 3: Altibox Hjem — app og web

**Kunde:** Altibox (Altibox AS)
**Periode:** 2021–2023 (2 år)
**Roll:** Frontend engineer, universell utforming

**Hva:** Altibox Hjem er smart­hus-appen — styrer lys, varme, kamera, trådløse sensorer fra en iOS/Android-app. 40,000+ aktive brukere.

**Størrelse:** 40,000+ aktive brukere, 4.2 gjennomsnittlig rating

**Teknologi:** Flutter, Bluetooth, MQTT, HomeKit-integrasjon, WCAG 2.1 AA

**Konkret bidrag:**
- WCAG 2.1 AA-implementasjon (dynamic type, VoiceOver, høy kontrast, reduced motion)
- Brukertest med skjermleserbrukere
- Performance-optimisering (rask device-kontroll)
- Dark mode + accessibility-audits

**Kontaktperson:** [Navn], Produktsjef, Altibox
**Telefon:** +47 XX XXX XXXX

---

## Nøkkelpunkter for tilbud

1. **Åpent om solo-faktoren** — ikke gjemme det. Adresser direkte: escrow, dokumentasjon, backup, on-call.
2. **Vekt på stabilitet og drift** — ikke "jeg skal bygge noe kult". Kjøper har statlig nettsted som må være oppe.
3. **WCAG 2.2 AA fra dag 1** — compliance + god UX, begge deler viktig
4. **Moderne teknologi (Next.js, TypeScript) MEN respekt for eksisterende** — ikke force full-rewrite
5. **SLA og incidenthåndtering** — de trenger å vite de kan stole på deg

---

## Template for innledning til tilbudet

*"Asbjørn Rørvik er senior fullstack-konsulent med 8 års erfaring fra drift og videreutvikling av kritiske digitale tjenester — Kolumbus-appen (142k brukere, prisvinnende), TryggDrift (regelverksdrift), og Altibox smart­hus. Han tilbyr erfaren drift av offentlige nett­sider, kombinert med modern teknologi (Next.js, TypeScript) og sikkerhet (WCAG 2.2, GDPR-ready). Som solo-leverandør kompenserer han med full transparens: kildekode-escrow, underleverandør-backup, og løpende dokumentasjon — ideelt for 24-måneders drift av institusjonelt nettsted."*

