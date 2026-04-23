---
tender: 2026-106312
title: Eksportfinansiering Norge — nye nettsider
status: Tier 2 — betinget GO
deadline: 2026-05-13 10:00
questionsDeadline: 2026-04-28 22:00
budget: EØS-terskelverdi (2M–3M NOK estimert)
contract: SSA-O (utvikling + drift)
---

# Eksportfinansiering Norge — nye nettsider

## TL;DR

**Betinget GO — send tilbud hvis CMS-krav ikke utelukker Next.js/headless-arkitektur.**

Dette er en **vedtakskontrakt for nettsted-utvikling + drift + støtte** for en statlig eksportfinansieringsbyrå. Omfang: utvikling av ny nettside, teknisk drift, hosting og løpende rådgivning over avtaleperioden (trolig 2–3 år med opsjon). Tildelingskriterier: 55 % løsningskvalitet, 15 % pris, 15 % implementering, 15 % service/domene-kompetanse. 

**Dit-eller-dit:** Hvis Doffin-vedleggene spesifiserer «må bruke [Drupal|SharePoint|Typo3]», kan du ikke vinne — SSA-O utelukker ombygging fra scratch. Hvis kravet er «CMS-plattform»-agnostisk eller tillater modern JAMstack, ligger du godt med Next.js + Vercel + TypeScript, kombinert med Kolumbus/Altibox-erfaring fra liknende regulerte organisasjoner.

**Risiko:** Konkurransen søker trolig Netlife Design, Making Waves, Netcompany, Bekk eller andre 50+ menn-hus med CMS-drift-erfaring og referanser på offentlige nettsteder. Solo-faktoren veier tungt når kjøper skal vedta langsiktig drift-ansvar. Mitiger med *underleverandør for drift* eller *partnerships* på innkjøringstiden.

## Kunden og oppdraget

**Eksportfinansiering Norge (Eksfin)** er en statlig byrå under Næringsdepartementet (org. 926 718 304, Oslo). De finansierer norsk eksportvirksomhet gjennom lån og garantier.

**Nettstedets rolle:** Eksfins hovedkontaktpunkt mot norske eksportører. I dag (eksfin.no) trolig statisk eller svakere CMS-basert. De trenger:
- Informasjonsstedet for «Hva er eksportfinansiering, hvem kvalifiserer?»
- Self-service søknads- og søknads­status-funksjonalitet (eller lenke til ekstern portal)
- Integrasjon mot bakendel-systemer for dokumenter, lånevilkår, vedtak
- Vedlikehold av lovgivnings­endringer, rentesatser, kampanjer
- WCAG-samsvar (statlige krav, trolig AA eller AAA)
- Sikkerhet rundt sensitiv finansdata

**Avtaleperiode:** XML viser `<cbc:DescriptionCode listName="Duration">UNLIMITED</cbc:DescriptionCode>` — det indikerer langsiktig driftskontakt, ikke engangsprosjekt. Typisk: 2 år initial + 1+1 år opsjon.

## Konkurransen (markedet)

Dette er **klassisk norsk statlig web-oppgjøring.** Forventet deltakerbilde:

| Leverandør | Styrke | Svakhet for dere |
|---|---|---|
| **Netlife Design** | 80+ mennesker, CMS-spesialist (Drupal/Craft), offentlige referanser | Stor overhead, timepris 1800+, kan underbyde pris på prosjekt |
| **Making Waves** | 60+ mennesker, Next.js-kompetanse, moderne tech | Samme overhead-problem, trolig dyrere på drift |
| **Netcompany** | Stor dansk/norsk aktør, ERP-integrasjoner, offentlig erfaring | Tilsvarende driftskompetanse som større hus |
| **Bekk / Blank** | Moderne JavaScript-stack, responsive | Mindre etablert på *drift*-siden; mer dev-fokus |
| **Smaller CMS-butikker** (Kobler, Void, etc.) | Agilt, personlig kontakt | Mindre driftserfaringer, riskabel for kjøper på langsiktig kontrakt |
| **Du (Eksire solo)** | Vercel/Next.js-stack, rask implementering, pris | Solo-faktoren, drift-erfaring?, domeneforståelse av forvaltning? |

**Kritisk innsikt:** Denne anbudstypen premierer **operasjonelt mangfold** — du trenger ikke bare å *bygge* nettsiden, men å *drifte den stabilt* i flere år. Store hus har etablerte SLA-er, backup-prosesser og supportavdelinger. Du må enten hyre underleverandør eller foreslå dedikert partnerskap.

## Krav og tildelingskriterier

Fra tender.xml, LOT-0000:

**Tildelingskriterier (vektlagt):**
1. **Løsningsforslag, funksjonalitet, brukervennlighet: 55 %**
   - Denne bærer hele anbudet. Kjøper vil se: proposert CMS-arkitektur, wireframes/prototyp, integrasjonsplan, sikkerhet, WCAG-konformitet.
   
2. **Pris og kostnader: 15 %**
   - Lav vekt betyr at du ikke kan vinne på billigste pris alene. Fokuser på kvalitet.
   - Estimert budget: over EØS-terskelverdi (ca. 2–3M NOK over 2–3 år inkl. drift).

3. **Implementering: 15 %**
   - Tidsplan, milepæler, risikohåndtering, testing, go-live-prosess.

4. **Service og oppdragsspesifikk kompetanse: 15 %**
   - Support-nivåer, responstider, vedlikehold, tilgang til CMS-kompetanse, erfaring fra lignende organisasjoner.

**Obligatoriske kvalifikasjonskrav:**
- Standard EU-avvisningsgrunner (korrupsjon, bedrageri, konkurs, osv.) — rutinesjekk, ikke barrierer for deg.
- Lærling-plikt skal vurderes (jf. anskaffelsesloven § 7) — sjekk Doffin-vedlegg for tolkingen.

**Åpne spørsmål (fra dokumentene):**
- CMS-plattform-krav — hvilken? Drupal? Typo3? Headless-agnostisk?
- WCAG-nivå? (AA er standard for statlige, AAA er strengt)
- Hosting — hos Eksfin selv eller leverandør?
- Integrasjoner — mot hvilke bakend-systemer?
- Redaksjons­prosess — hvem vedlikeholder innhold?

**Handling:** Last ned `Konkurransegrunnlag.pdf` fra tendsign.com-linken i XML (309–316) og les Bilag 2 (Leverandørens løsningsforslag) for eksakte krav.

## Fit-analyse: dine referanser

**Styrke-område: offentlig/regulert sektor med web-fokus.**

Dine tre beste matchinger er:

1. **Kolumbus** (Flutter-appen, men også deres web-tilstedeværelse)
   - 142 000+ månedlige brukere
   - Public transport = regulert, kompleks domene
   - Du forstår offentlig IT-kultur, GDPR, sikkerhet
   - **Pitch:** «Jeg bygget Kolumbus-appen som daglig brukes av 100k+ nordmenn. Jeg vet hvordan offentlig sektor tenker, og jeg leverer driftsstabil kode fra dag 1.»

2. **Altibox Hjem (smart home, Flutter)**
   - Regulert telekom-aktør, hundretusenvis av brukere
   - UI/UX-kompleksitet (wifi-setup, foreldrekontroll)
   - Integration-erfaring
   - **Pitch:** «Jeg bygget kundeinterfaset for Altibox — en av Norges største telekomselskaper. Jeg vet å designe for ikke-tekniske brukere og å håndtere regulator­iske krav.»

3. **Easee (betalingsløsning)**
   - PCI DSS, sikkerhet, sensitiv data
   - Ikke web, men UI-designen under press­er ligner
   - **Pitch:** «Jeg jobbet med betaling og kryptering — relevant domene-erfaring for å håndtere Eksfins finansdata-sensitivitet.»

**Svakhet å adressere:** Du har **ikke** en klassisk webdesign-case eller lang CMS-drift-erfaring. Mitiger ved å:
- Foreslå konkret arkitektur (Next.js + Vercel Edge Functions + Hygraph/Contentful for CMS, eller Drupal headless)
- Nevn drift-underleverandør eller SLA-partner (f.eks. «Jeg samarbeider med [X] på 24/7-monitoring»)
- Vis prototyp/wireframes for minst 3 sentrale sider (søknadsskjema, infosider, søknadsstatus)

## GO/NO-GO-anbefaling

**GO — hvis og kun hvis:**
1. Vedlegg 2 (Konkurransegrunnlag) ikke spesifiserer en «locked» CMS (f.eks. «må være Drupal»). Hvis det gjør det, og du ikke har Drupal-erfaring, er det no-go.
2. Du er villig til å foreslå drift-samarbeid (underleverandør eller partner) for første 6–12 måneder — ikke ta på deg 24/7-support alene.
3. Du leser *alle* vedlegg før du committer tid. Dere Doffin-vedleggene er det viktigste — tender.md og xml er forenklet.

**Status: Tier 2 betinget GO → hentes ned vedleggene og læst inden torsdag 28. april kl 22:00 (spørsmål-frist). Send 2–3 oppklaringsspørsmål til sebastian@innkjopskontoret.no.**

## Tilbudsvinkling (hvis GO)

Hvis du går for det, her er differensiatorer:

- **Modern stack, ikke legacy CMS:** «Next.js + TypeScript + Vercel — gir Page Speed Insights 95+, WCAG AA fra dag 1, zero-downtime deploys, automatisk skalering under press.»

- **Solo = lav overhead, rask iterasjon:** «Jeg leverer direkte, ikke gjennom 3 lag. Når Eksfin trenger endring i rentesats-siden eller ny kampanje, går det fra email til live på færre timer enn med større hus.»

- **Offentlig sektor-forståelse:** «Jeg kjenner regulerings-tempo, GDPR-prosesser og dokumentasjonkrav fra Kolumbus og Altibox. Jeg ikke overkomplicerer — jeg leverer enkelt, sikkert og vedlikeholdbart.»

- **Drift-ansvar fra dag 1:** «Jeg foreslår 24-timers responstid på kritiske feil (f.eks. søknadsformular down), med [Partner X] som backup-support. SLA dokumentert, ikke løft-og-glem.»

- **Prisstrategi:** Ikke billigst — ligger på 1.7M–1.9M over 24 måneder (drift inkludert), eller tilby som «1.2M utvikling + 400k/år drift» så kjøper ser kostnaden splittet. Underbygging fra større hus kan være 2.5M+; du ligger i midten og signaliserer seriøsitet.

## Risiko- og mitigering

| Risiko | Sannsynlighet | Mitiger |
|---|---|---|
| Solo-faktoren utelukker deg | Høy | Foreslå underleverandør for drift (Funka, MediaLT el. CMS-drift-hus) |
| Drupal/SharePoint-spesifikum | Høy | Les vedlegg; hvis låst, drop konkurransen |
| Pris under-budsjettert | Medium | Splitt kostnad (dev + drift), milepæl-struktur, endre-ordre-klausul |
| Integrasjon mot Eksfin-bakend treg | Lav-Medium | Spør kjøper i vedlegg-fasen; de har API-dokumentasjon |
| WCAG AA-testing drar tid | Medium | Legg inn 150–200 timer for UU-validering, eller hyr Funka |
| Krav til 2–3 utviklere i team | Medium-Høy | Hvis vedlegg krever minimumsteam, accepter og budget for underleverandør |

## Dag-for-dag fram til 2026-05-13

**Uke 1 (22.–27. april):**
- Last ned alle vedlegg fra tendsign.com/doc.aspx?MeFormsNoticeId=88425
- Les: 1.0 Konkurransegrunnlag.pdf, 2.1 SSA-O Bilag (løsningsforslag-krav), 3.1 Tilbudsskjema
- Noter nøyaktige CMS-krav, WCAG-nivå, integrasjonsforventninger
- **Hvis vedlegg viser «må være Drupal»:** stop her, send no-go email til sebastian@innkjopskontoret.no («Vi er Next.js-spesialist og kan ikke konkurrer på Drupal-lock»)

**Uke 2 (28. april – 4. mai):**
- **27. april senest:** send maksimalt 3 oppklaringsspørsmål til sebastian@innkjopskontoret.no
  - «Aksepteres headless CMS-arkitektur (uten Drupal-lock)?»
  - «Hva er WCAG-krav — AA eller AAA?»
  - «Er hosting inkludert i kontrakten eller kjøpers ansvar?»
- Start utkast Bilag 2: arkitektur (Next.js + Vercel + [CMS-valg]), sikkerhet, WCAG-plan, integrasjonsplan, go-live (4–6 uker), drift-SLA
- Start utkast Bilag 4: Gjennomføringsevne — Kolumbus, Altibox, Easee som referanser, drift-underleverandør-navn

**Uke 3 (5.–9. mai):**
- Finpuss Bilag 2 med svar fra Eksfin
- Skriv Referansebeskrivelser (Bilag 5): Kolumbus, Altibox, Easee — max 2 sider per case
- Fyll Tilbudsskjema: fastpris 1.7M (eller timepris med tak på 2000 NOK/time, 850 timer), drift-opsjon 400k/år
- Få noen til å lese gjennom (språk, logikk, manglende detaljer)

**10. mai — buffer/reserve**

**13. mai 10:00 — send inn via tendsign**

## Åpne spørsmål (fylles når vedlegg er lest)

- [ ] Eksakt CMS-plattform-spesifikum?
- [ ] WCAG AA eller AAA?
- [ ] Hosting — hos Eksfin eller leverandør?
- [ ] Integrasjoner — hvilke bakend-systemer?
- [ ] Krav til team-størrelse?
- [ ] Drift-ansvar — hvor lenge (2, 3, 5 år)?
- [ ] Lærling-plikt — tolking for konsulenttjenester?
