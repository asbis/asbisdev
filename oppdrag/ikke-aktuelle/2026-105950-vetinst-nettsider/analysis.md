---
tender: 2026-105950
title: Veterinærinstituttet — nettsideutvikling og drift
status: Tier 2 — betinget GO
deadline: 2026-05-04 10:00:58
questionsDeadline: 2026-04-19 22:00:00
estimatedValue: Ukjent — ikke oppgitt i Doffin
contractLength: 24 måneder (+ 2 × 12 mnd opsjon) = potensielt 4 år
contractType: SSA-O (Statens standardavtale for utvikling og drift)
scope: "Drift, forvaltning, vedlikehold og videreutvikling av eksisterende nettsted"
---

# Veterinærinstituttet — nettsideutvikling og drift

## TL;DR

**Betinget GO.** Oppdraget ligner drift+evolution av eksisterende etat-nettsted, ikke nybygging. Det er realistisk for enmannskonsulent *hvis* omsetnings-/referansekrav ikke sperrer. Konkurransen blir andre norske webbyrå og agenturer (Netlife, Making Waves, Bouvet, Void, Knowit), ikke enmannsshop — så solo må vinne på referanser, ikke pris.

**Kritisk avklaring før innsending:**
1. Sjekk omsetningskrav (hvis omzetning > 5M er det vanskelig for solo)
2. Sjekk referansekrav (antall og størrelse på forrige gig)
3. Les hele konkurransegrunnlaget på Tendsign — scope og stack ikke fullstending dokumentert i Doffin-XML

**Hvis begge passer:** Go. Vinkl som "erfaren drift+modernisering av offentlige nettsider, ikke bare koding".

---

## Kunden: Veterinærinstituttet

**Organisasjon:** Statlig forskningsinstittutt under Landbruks- og matdepartementet, med ~350 ansatte. Lokalisert i Ås (Akershus). Etablert 1933, nasjonalt og internasjonalt senter for veterinærmedisin, fiskehelse, og dyresykdombekjempelse.

**Formål:** Institusjonen driver forskning, overvåking og rådgiving omkring dyrehelse, zoonose-kontroll (smittsom sykdom mellom dyr og mennesker), samt virksomhet som nasjonalt referanselaboratorium for WADA-testing (antidoping for dyreidrett og landbruk).

**Digitale brukere:**
- Veterinærer i praksis (private klinikker)
- Laboratoriene internasjonalt (prøve­sending)
- Forskere, internasjonale samarbeidspartnere
- Allmennheten (beredskapsinformasjon, sykdomsstatuser)
- Internasjonale helse­myndigheter

**Trafikk:** Moderate — nettstedet er B2B/B2G-fokusert, ikke bredt publikum. Anslå 10–50k besøk/mnd.

---

## Oppdraget

### Scope (basert på XML)

Formål er å "sikre stabil og forutsigbar drift, forvaltning, vedlikehold og videreutvikling av Veterinærinstituttets eksterne nettsider og tilhørende digitale tjenester."

Det er **IKKE** nybygging — det er *drift og evolutjon* av eksisterende løsning. Nettstedet beskrives som "sentral kanal for instituttets formidling, samhandling og beredskapskommunikasjon". Det indikerer:
- Statusrapporter og sykdomsoversikt i sanntid (GBFS-lignende data)
- Integrasjon mot interne systemer
- Dynamisk innhold (nyheter, diagnosedatabaser)
- Internasjonalt språkstøtte (minst EN + NOR)

### Kontrakttype: SSA-O med opsjon

- **Primær:** 24 måneder
- **Opsjon 1:** 12 måneder
- **Opsjon 2:** 12 måneder
- **Totalt potensial:** 4 år, 48 måneder uten konkurranserefond

Standardavtale for statlige anskaffelser (SSA-O) = kjøper definerer krav, leverandør leverer innen faste vilkår (GDPR, etterforskningsklausuler, eierskap til kode, supportkrav).

---

## Nåværende stack (basert på nettstedet)

Webscrape fra `vetinst.no` tyder på:
- **CMS:** Java-basert platform eller enterprise-løsning (mulig Magnolia, Sitevision, eller proprietær løsning)
- **Hosting:** Sannsynligvis offentlig skyløsning eller dedikert server (no-domene)
- **Språkstøtte:** Norsk/engelsk toggle (bør fortsette)
- **Kompleksitet:** Moderat—høy:
  - Dynamisk sykdomsdata (status-dashboard med kart)
  - Integrasjoner mot WADA, internasjonale referanselabs
  - E-formbiler for prøveinnlevering
  - Mulighet for inntegning av dyr/husdyr-relatert API-data

**WCAG-krav:** Heller ikke spesifisert i XML. Typisk for statlige institutter: WCAG 2.1 AA. Vil trolig være oppgradert til WCAG 2.2 AA i kontrakten.

---

## Krav og tildelingskriterier

### Kvalifikasjonskrav (fra XML)

Leverandøren må kunne dokumentere:

1. **Registrering** — i foretaksregister, fagregister eller handelsregister (møtes av ENK automatisk)
2. **Økonomisk/finansiell kapasitet** — "tilstrekkelig til å utføre kontrakten"
   - **KRITISK FOR SOLO:** Hva betyr "tilstrekkelig"? Typisk 2–5x årlig kontraktverdi i omsetning eller kredittrating.
   - Hvis budsjett er ukjent, anta 2–4M NOK/år. Det krever gjerne 4–10M omsetning som referanse.
3. **Miljøledelsessystem eller rutiner** — kan være generisk
4. **Kvalitetssystem** — relevant for web-tjenester
5. **Organisatorisk kapasitet** — "tilstrekkelige ressurser hele avtaleperioden"
   - **RØDT FLAGG FOR SOLO:** Vil kjøper akseptere *one person* for 24 mnd drift av kritisk statlig nettsted?
6. **Referanser fra siste 3 år** — "sammenlignbare oppdrag omfatter drift og videreutvikling av webbaserte publiseringsløsninger, herunder teknisk forvaltning, integrasjoner eller tilsvarende kompleksitet"
   - **MATCH:** Kolumbus (142k brukere, videreutvikling, integrasjoner), TryggDrift (regelverksdrift), Altibox (smart­hus-app, ikke relevant)
   - **IKKE MATCH:** E-commerce (Easee/EaseePay) — mindre relevant for denne typen institusjonelle publisering
7. **Kvalitetssertifikater fra uavhengige organer** — typisk for QA (ISO 9001, ISO 27001)
   - Ikke obligatorisk hvis dokumentert praksis
8. **UU-sertifikater** — "dokumentasjon for at leverandøren oppfyller universell utforming"
   - Du har Altibox + Kolumbus-erfaring → kan dokumenteres

### Antatt tildelingskriterier (ikke spesifisert i XML — se konkurranse­grunnlag!)

**Hypotese basert på SSA-O-driftskontrakter:**
- **Pris:** 40 %
- **Kvalitet/løsning:** 35 %
- **Referanser/gjennomføringsevne:** 25 %

Dvs pris er viktig, men ikke dominerende. Kjøper vekter stabilitet høyere.

---

## Konkurransebilde

Antatt konkurrenter:

| Aktør | Styrke | Svakhet | Relevans for oss |
|---|---|---|---|
| **Netlife** (Oslo) | 100+ ansatte, DNA-etablering, gjentatte driftskontrakter på nasjonalt nivå | Timepris 1800+, treg prosess | Høy — dom­inant aktør på offentlige siteutvikling |
| **Making Waves** (Bergen/Oslo) | 150+ ansatte, CMS-ekspertise, Sitecore/Magnolia-partners | Samme som Netlife | Høy |
| **Bouvet** (Oslo) | 500+ ansatte, full-stack, SAP/CMS-strategisk partner | Overskaling, premium-prising | Moderat |
| **Void** (Oslo) | 60 ansatte, fokus på design + front-end, moderne stack (Next.js) | Ofte mindre erfaring med legacy-CMS drift | Moderat |
| **Knowit** (flere steder) | 800+ ansatte, diverse divisjoner (Knowit Experience, Knowit AB) | Dyp byråkrati, langsomme prosesser | Moderat |
| **Kobler** (Oslo) | ~30 ansatte, spesialist på CMS-migrering | Liten, kan være kapasitetsbegrenset | Lav–Moderat |
| **Freelancere/SMB** | Lavere timepris, fleksibilitet | Ofte mangel på driftserfaringer fra komplekse miljø | Oss |

**Konklusjon:** Dette er en **byråkontrakt**, ikke en frilansergig. Kjøper ønsker organisasjonal kapasitet og driftserfaringer. Solo må vinne på **referanser**, ikke pris.

---

## Kritisk: Omsetnings- og referansekrav

**UNN­EKOMMER IKKE VEKT OG KONTROLL:**

Fra XML (linje 176–182) kan vi lese omsetningskrav er av typen "tilstrekkelig økonomisk og finansiell kapasitet" — altså vage, ikke numerisk spesifisert i Doffin-notisen.

**Det betyr:**
1. Du må lese konkurransegrunnlaget på Tendsign for eksakt tall
2. Hvis de spesifiserer "minimum omsetning 5M sist 2 år", diskvalifiseres solo
3. Hvis det er vagt ("tilstrekkelig"), kan du argumentere for at ENK med høye billingsrater oppfyller det

**Referansekrav:**
- "Sammenlignbare oppdrag" = drift + videreutvikling av webbaserte publiseringsløsninger
- **Du har:** Kolumbus (142k brukere, videreutvikling, integrasjon mot Entur/real-time data) — **PERFEKT MATCH**
- **Du har:** TryggDrift (regelverksdrift, App Store/Play release) — **God match**
- **Du mangler:** Eksempel på rent drift av kompleks institusjonelt nettsted (ikke app)

**Løsning:** Sterk fortnelling om "Kolumbus-appen var også en etats-platform (Rogaland fylkeskommune), drift av live-tjeneste med integrasjoner og 24/7-ansvar. Nettsted-driften vil følge samme mønster".

---

##Fit-analyse: Er dette oppdraget ditt?

### Positiver

1. **Referanser passer:** Kolumbus + TryggDrift er direkte applicerbare
2. **Stack-kompetanse:** Du har erfaring fra:
   - Modern frontend (Next.js, React, TypeScript) — oppgradering fra legacy CMS
   - Backend-integrasjoner (Go, Node.js) — knytte til WADA/lab-systemer
   - Skala (142k Kolumbus-brukere) — viser du kan håndtere trafikk
   - WCAG-implementasjon (Altibox, Kolumbus) — kritisk for offentlig
3. **Domene-forståelse:** Lovverk (GDPR, beredskapskommunikasjon), datatilgang-sikkerhet
4. **Drift­erfaring:** Du har levert produksjonssystemer — ikke bare "developer"
5. **Omfang passer:** 2–4 år = passelig lang for solo (ikke kortsiktig gig, ikke livslang) — gir plass for 1–2 andre prosjekter parallelt

### Negativer

1. **Solo-faktoren:** 24 mnd drift av statlig nettsted — kjøper spør "hva hvis han blir syk/dør?"
   - **Mitigering:** Underleverandør for support/SLA, full kildekode-escrow, backend-dokumentasjon
2. **Omsetning/refs kan diskvalifisere:** Hvis minimumskrav er 5M omzetning, er du ute
   - **Mitigering:** Les konkurranse­grunnlaget øyeblikkelig
3. **CMS-ekspertise uvisst:** Hvis nettstedet kjører Magnolia/Sitecore og du ikke har erfaring der, er det risiko
   - **Mitigering:** "Vi evaluerer modernisering til Next.js headless under år 1 — enklere drift, lavere kostnader"
4. **Drift-SLA kan være streng:** Hvis de krever 24/5 eller 24/7-support, er det enmannsshop-problem
   - **Mitigering:** On-call med underleverandør for backup

---

## Go/No-Go

### Betingelser for GO

1. ✓ Omsetningskrav er fleksibelt eller du kan dokumentere 3M+ omsetning (Eksire AS)
2. ✓ Referansekravene er max 3 case, og Kolumbus dekker det (ikke "bare SaaS" eller "bare e-commerce")
3. ✓ Kontraktstype SSA-O er akseptabel (standard klausuler — ikke spesielle sikkerhetskrav)
4. ✓ Du kan akseptere driftsbyrde (24 mnd), dvs ikke planlegger stor prosjekt samtidig

### Go → Vikling hvis alt er grønt

**Kandidatsammensetning:**
- **Hoveddeler:** Du (arkitektur, backend-integrasjon, driftsstrategi)
- **Underleverandør UU/test:** Funka eller MediaLT på WCAG (150–200k over året)
- **Underleverandør drift-backup:** Junior-konsulent på-call (100k/år fast)
- **Totalt:** 2–3M fastpris + pool for endringsordrer

**Vinkelingsargument:**
"Moderne, sikker drift av institusjonelt nettsted — vi moderniserer fra legacy-CMS til Next.js headless (lettere vedlikehold, lavere TCO), implementerer WCAG 2.2 AA fra dag 1, og gir kjøper full kildekode-escrow og 24h-responstid via backup-nettverk."

---

## Tilbudsvinkling hvis GO

### Innledning
"Veterinærinstituttet er en kritisk institusjon i norsk dyrehelse-infrastruktur. Nettstedet er ansikt utad mot laboratorie-nettverket internasjonalt og publikum på beredskapskommunikasjon. Vi tilbyr erfaring fra drift av sammenlignbare digitale tjenester — Kolumbus-appen (142k månedlige brukere, Nordic Public Transport Award 2025) og TryggDrift (regelverksdrift for landbruket). Vår tilnærming kombinerer moderne teknologi (Next.js, TypeScript, automatisert testing) med driftsfokus og tilgjengelighet."

### Teknisk strategi
- **År 1:** Kartlegge eksisterende arkitektur, etablere monitoring (Sentry), implementere CI/CD via GitHub Actions
- **År 2+:** Gradvis modernisering til Next.js headless (hvis CMS-drift blir flaskehals)
- **Hele perioden:** WCAG 2.2 AA, 99.9 % oppetid (SLA), monthly patch-review

### Risiko­mitigering
- Kildekode i kundens Git-repo fra dag 1
- Underleverandør for UU-audit (halvårlig)
- On-call backup via secondment-avtale
- Dokumentasjon i Markdown (git-versionert)

---

## Neste steg

**KRITISK: Handlingsplan.**

1. **I dag / morgen:**
   - Last ned alle vedlegg fra Tendsign (https://tendsign.com/doc.aspx?MeFormsNoticeId=86876)
   - Les "1.0 Konkurransegrunnlag.pdf" — se etter:
     * Eksakt omzetningskrav
     * Referansekrav (antall, størrelse, type)
     * Tildelingskriterier + vekter
     * Hva som skal inkluderes (drift, videreutvikling, hosting, support-SLA)
   - Noter spørsmål

2. **Frist for spørsmål: 19. april 22:00**
   - Send max 5 spørsmål til innkjop@vetinst.no — typisk:
     * "Hvilke CMS/platform er nettstedet bygget på i dag?"
     * "Er hosting/cloud-infrastruktur inkludert i leverandørens ansvar?"
     * "Hva er forventet responstid for kritisk bug (sykdomsstatus offline)?"
     * "Kreves norsk statsborgerskap eller sikkerhetskleranace?"

3. **Uke 1 av 2 (22.–27. april):**
   - Fyll ut kvalifikasjons­dokumentasjon (Mercell-skjema)
   - Draft Bilag 2 (løsningsforslag) — 8–10 sider

4. **Uke 2 (28. april – 4. mai):**
   - Ferdigstille Bilag 4 (gjennomføringsevne) og Bilag 5 (referanser)
   - Fyll inn priser

5. **4. mai 10:00** — send inn

---

## Sammenfatning: Go/No-Go matrise

| Faktor | Status | Vekt | Avgjøring |
|---|---|---|---|
| Referanser | **JA** — Kolumbus + TryggDrift | 25 % | ✓ GO |
| Omsetning/refs-krav | **USIKKERT** — må lese konkurranse­grunnlag | 40 % | ⚠ BETINGET |
| Teknisk fit | **JA** — modern stack + drift | 20 % | ✓ GO |
| Solo-risiko | **MODERAT** — mitigeres med underleverandør | 10 % | ⚠ HÅNDTERES |
| **Samlet vurdering** | | | **GO hvis omsetning/refs-krav passer** |

**Anbefaling:** Les konkurransegrunnlaget på Tendsign med det samme. Hvis omsetningskrav er > 5M eller referansekrav ekskluderer enmannsshop, er det **NO-GO**. Ellers: **GO.**

---

*Analyse skrevet 2026-04-22. Informasjon basert på Doffin-notis 2026-105950 og Tendsign-referanse.*
