---
title: KS- og informasjonssikkerhetssystem
tender: 2026-107028
oppdragsgiver: Antidoping Norge (ADNO)
status: UTKAST
---

# Kvalitets- og informasjons­sikkerhets­system

Beskrivelse av kvalitetssikrings­system og informasjons­sikkerhets­system for Asbjørn Rørvik (ENK) som leverandør i kontrakten *Utvikling av antidoping-app*. Beskrivelsen oppfyller kravene i konkurranse­grunnlagets pkt. 5.3.4 og er tilpasset omfanget av leveransen.

---

## 1. Kvalitetssikrings­system (KS)

### 1.1 Prinsipper

Leveransen styres etter fire prinsipper, som hver er konkret operasjonalisert:

1. **Kort feedbacksløyfe** — ingen kode lever lenger enn én sprint uten å være demonstrert for ADNO.
2. **Skriftlig sporbarhet** — alle beslutninger ligger i git-commit, issue-tracker eller møte­referat.
3. **Automatisert kvalitet** — type­sjekk, lint, tester og bygg kjøres ved hver commit. Brutt main-bransje stoppes automatisk.
4. **Manuell kvalitet der det betyr noe** — UU-test, sluttbrukertester og akseptansetest er menneskelige og uavhengig­e.

### 1.2 Konkret prosess

| Element | Hvordan |
|---|---|
| Krav­håndtering | Alle krav fra Bilag 1/2 mappes til issues i ADNOs git-repo. Hver issue lukkes med referanse til commit og PR. |
| Versjonskontroll | Git, hosted hos ADNO. Branch-modell: `main` (alltid deployable) + feature-branches via PR. |
| Code review | Hver PR krever gjennomlest av Asbjørn (selv-review) og automatisert sjekk. Ved større endringer engasjeres ekstern reviewer (peer fra fagnettverket) for second opinion. |
| Test­strategi | Unit-tester (Jest, ≥ 60 % dekning på logikk), integrasjons­tester for kritiske flyter, manuell testing på minst 3 fysiske enheter (iOS + Android, ulike skjermstørrelser). |
| CI/CD | GitHub Actions: lint + type­sjekk + tester + build på hver commit. Auto-deploy til intern test-track ved merge til `main`. |
| Demo og akseptanse | Demo til ADNO annenhver uke. Pilot/akseptanse­test etter ca. 12 uker, før App Store/Play-publisering. |
| Dokumentasjon | `README.md`, `SETUP.md`, `CONTRIBUTING.md`, arkitektur­diagram og driftshåndbok i repoet. Oppdateres ved hver release. |
| Avviks­håndtering | Avvik registreres som issues. Kritiske avvik rapporteres til ADNO innen 24 timer skriftlig. |

### 1.3 Kvalitets­indikatorer (mål)

- Crash-free rate i produksjon: **≥ 99,5 %**
- p95 API-respons­tid: **< 300 ms** for de hyppigst brukte endepunkt
- Backend oppetid (etter go-live): **≥ 99,8 %**
- Antall kritiske feil i 12-mnd garantiperiode: **0 åpne ved garantislutt**

Alle indikatorene rapporteres månedlig til ADNO i en kort statusrapport.

---

## 2. Informasjons­sikkerhets­system

### 2.1 Rammeverk

Informasjons­sikkerhets­arbeidet er forankret i:
- **ISO/IEC 27001-prinsipper** (proporsjonalt anvendt for ENK med ett årsverk)
- **NSMs grunnprinsipper for IKT-sikkerhet** (versjon 2.1)
- **GDPR** og personopplysnings­loven
- **OWASP Mobile Top 10** og **OWASP ASVS** for kode­sikkerhet
- **App Store Review Guidelines** og **Google Play-policy**

### 2.2 Tiltaks­oversikt

| Område | Tiltak |
|---|---|
| **Tilgangsstyring** | Minste nødvendige tilgang. Alle kontoer har MFA. Tilgang revokeres automatisk ved avtaleslutt. |
| **Hemmelighets­håndtering** | API-nøkler, sertifikater og passord lagres kryptert i 1Password (eller ADNOs eget Key Vault). Aldri i git. |
| **Kommunikasjons­sikkerhet** | All app↔backend-trafikk kryptert med TLS 1.2+. Sertifikat-pinning aktivert i appen. |
| **Datasikkerhet** | Persondata lagres i EU/EØS. DPIA gjennomføres ved oppstart. Data­minimering — vi samler kun det som er strengt nødvendig. |
| **Kode­sikkerhet** | Avhengighets­scanning (Dependabot, npm audit). Statisk analyse på CI. Manuell sikkerhets­gjennomgang før hvert App Store-release. |
| **Endepunkt­sikkerhet** | Utviklings­maskin (Mac) er fullkryptert (FileVault), har MFA og automatisk skjerm­lås. Backup til kryptert ekstern lagring. |
| **Logging og overvåking** | Sentry for app- og backend-feil. Uptime-monitor for backend. Sikkerhets­hendelser logges separat med 12 måneders retensjon. |
| **Backup og gjenoppretting** | Daglig backup av backend-database, retensjon 30 dager. Kildekoden er i seg selv kontinuerlig backup (git hos ADNO). |
| **Hendelses­håndtering** | Ved sikkerhets­hendelse varsles ADNO skriftlig innen **24 timer**. Eskalering til ADNOs personvernombud og evt. Datatilsynet ved varslings­plikt. |
| **Tredjeparts­vurdering** | Alle tredjeparts­biblioteker og -tjenester vurderes for risiko og dokumenteres i Bilag 10 (tredjeparts­leveranser). |

### 2.3 Personvern (særskilt)

Antidoping-appen vil håndtere informasjon om utøvere som er sensitiv av karakter (medisinske søk, fritak, kosttilskudd-spørsmål). Følgende prinsipper gjelder:

- **Data­minimering:** kun data som er nødvendig for funksjonen lagres. Søk på legemidler skjer mot Felleskatalogens API uten lagring av søkehistorikk hos ADNO.
- **Lokal lagring først:** når mulig holdes data på enheten (sjekklister, notater) og synkes ikke til skyen.
- **Ingen tredjeparts-analytics** av brukeradferd uten eksplisitt samtykke. Crash-rapporter er anonymisert (ingen brukernavn, kun teknisk stack-trace).
- **Sletting:** brukere kan slette sin konto og tilhørende data fra appen. Backend tar forespørselen til etterretning innen 30 dager.
- **Databehandler­avtale (DPA):** signeres med ADNO før prosjektoppstart, jf. SSA-O Bilag 8.

### 2.4 Roller og ansvar

- **Sikkerhets­ansvarlig hos leverandør:** Asbjørn Rørvik (innehaver). Direkte ansvar.
- **Personvern­ombud (ADNO):** Asbjørn samarbeider med ADNOs personvernombud i alle spørsmål om personopplysninger.
- **Underleverandør UU/test:** signerer egen taushetsplikt­erklæring og databehandler­avtale før tilgang gis.

### 2.5 Revisjons­rett

ADNO har rett til årlig revisjon av leverandørens sikkerhetsarbeid relatert til denne kontrakten, jf. SSA-O Bilag 8. Leverandør stiller dokumentasjon, repo-tilgang og logger til disposisjon ved forespørsel.

---

## 3. Forbedring og evaluering

KS- og informasjons­sikkerhets­systemet evalueres løpende:

- **Etter hver milepæl** i prosjektet — hva fungerte, hva må endres
- **Halvårlig sikkerhets­gjennomgang** med skriftlig rapport til ADNO i garantiperioden
- **Årlig oppdatering** av tiltaks­oversikten basert på endringer i regelverk, plattform­krav (App Store / Play) og trussel­bilde
