# Tilbudsutkast — Frontend Developer for GeoWeb (MET, 2026-111353)

> Status: UTKAST. Innleveres via Mercell innen **10.08.2026 kl 12:00**.
> Sannsynligvis på engelsk (alle konkurransedokumenter er engelske, teamet er
> internasjonalt). ⚠️ Avklar språk i Mercell-Q&A hvis usikker — frist 27.07 kl 16.

## Hva som skal leveres (sjekkliste)

- [ ] **ESPD** — fylles direkte i Mercell. Bruk Del IV α («oppfyller alle
      kvalifikasjonskrav»). Standard egenerklæring, ingen vedlegg nå.
- [ ] **Tilbudsbrev (Letter of Tender)** — 1 side, se utkast under.
- [ ] **SSA-B Bilag 2** — besvarelse av alle krav i Bilag 1 + CV. ⭐ Dette er
      kvalitets-dokumentet som vinner eller taper konkurransen.
- [ ] **SSA-B Bilag 3** — fremdrift: oppstart «as soon as possible, no later
      than 01/10/2026», varighet «until upper financial limit is reached».
- [ ] **SSA-B Bilag 4** — autorisert representant (Asbjørn / Console Holding AS?),
      nøkkelpersonell: Asbjørn Rørvik.
- [ ] **SSA-B Bilag 5** — timepris eks/ink mva (totalbudsjett 1 MNOK er ferdig utfylt).
- [ ] **3 referanseoppdrag** (siste 3 år) med verdi, tidsrom og kontaktperson
      (navn, telefon, e-post) — kvalifikasjonskravet.
- [ ] Firmaattest + kredittrating (kun vinneren må levere, men ha klart).

## Evaluering: pris 50 % / kvalitet 50 %

Kvalitet = erfaring, kompetanse, **personlig egnethet** — vurdert via CV,
skriftlig besvarelse og intervju (topp 2–3 kalles inn). Beste kandidat får 10
poeng på hver akse, resten relativt. Strategien:

1. **Vinn den skriftlige besvarelsen på konkretisering.** Alle vil skrive «har
   erfaring med React». Skill deg ut ved å svare punkt-for-punkt på kravlisten
   i Bilag 1 med konkrete eksempler og tall.
2. **Vis kjennskap til GeoWeb/OpenGeoWeb-kodebasen.** Den er open source
   (https://gitlab.com/opengeoweb). Les koden, referer til konkret arkitektur
   (plugin-struktur, OpenLayers-bruk, NX-monorepo) i besvarelsen. Nesten ingen
   konkurrenter gjør dette — det signaliserer null oppstartstid.
3. **Priser skarpt.** Med 50 % vekt på pris kan riktig timepris kompensere for
   at andre kandidater har meteorologi-bakgrunn. Enkeltperson-firma uten
   overhead kan slå konsulenthus på pris uten å tape marginer.
4. **Intervjuet avgjør «personlig egnethet»** — engelsk, scrum-erfaring,
   selvgående remote-arbeider.

### Avklart i Q&A (01.07.2026)
- Fullt remote OK, også fra utlandet — ingen krav om fysisk oppmøte.
- Ingen sikkerhetsklarering, men kandidatene sikkerhetsvurderes.

## Besvarelse av kompetansekravene (Bilag 2 — kladd)

| Krav (Bilag 1, §5.1.1) | Vårt svar (kladd — fyll ut med tall) |
|---|---|
| Frontend development & architecture | 8 år produksjonserfaring. Var med å bygge Altibox-appen fra scratch; utvikler på Kolumbus sanntidsapp (Nordic Public Transport Design Award 2025). Solo-arkitekt for Supportify (React/TS, 100+ betalende Shopify-butikker). |
| Modular design / plugin interfaces | Supportify: plugin-basert widget-arkitektur embeddet i tredjeparts butikker. [Utdyp: Altibox/Equinor modulstruktur?] |
| Web-based geospatial (maps) | Kolumbus: sanntids kollektivkart (posisjon, ruter, stopp). [Hvilket kartbibliotek brukte dere — Mapbox/Leaflet/OpenLayers? Vær presis.] |
| Charting/graphing | [Fyll inn: dashboards i Supportify (analytics), Easee energidata?] |
| Automated testing | Jest/Cypress i produksjon hos [kunde]; CI-pipelines i GitLab/GitHub Actions. |
| Security awareness | Equinor: offshore-kritiske apper med strenge sikkerhetsregimer. EaseePay: PCI DSS-compliance. Beskriv secure SDLC-vaner (secrets-håndtering, dependency-skanning, code review). |

Teknologikrav: HTML/CSS3 ✅, JS/TS ✅, React/Redux ✅, Material UI ✅,
Webpack/NPM ✅, NX [verifiser/les deg opp], Storybook/Jest/Cypress ✅,
**OpenGeoWeb/OpenLayers ⚠️ — les kodebasen og bygg noe smått med OpenLayers
før innlevering, så det kan omtales ærlig.**

Erfaringskrav: scrum-team ✅ (Bouvet/Netpower-prosjekter), engelsk ✅,
«internasjonalt europeisk offentlig meteorologi-prosjekt» ⚠️ — dekkes ærlig:
offentlig sektor ✅ (Kolumbus, NLR), operasjonelt-kritisk miljø ✅ (Equinor),
meteorologi ✖ — kompenser med rask onboarding-historikk + OpenGeoWeb-kjennskap.

## Referanseoppdrag (3 stk, siste 3 år — velg og få OK fra kontaktpersoner)

1. **Kolumbus** — sanntids kollektivapp, kart/geodata, offentlig sektor.
   (Team-leveranse — skriv «utvikler på», ikke «leverte alene».)
2. **Supportify** — solo-bygget SaaS, React/TS, 100+ kunder. Viser
   selvstendighet og full-stack eierskap. (Kontaktperson: en kunde? Avklar.)
3. **Equinor eller Easee (EaseePay)** — sikkerhetskritisk/PCI DSS.
   [Avklar hvilken referanse som stiller opp med tlf + e-post.]

## Pris (Bilag 5)

- Ramme: 1 MNOK eks mva ≈ 950–1000 timer ved ~1000–1050 kr/t → ca. 6 mnd fulltid.
- Vurder 950–1100 kr/t. Med 50 % prisvekt: hver 50-lapp under konkurrentene
  gir reell uttelling. Ingen reisekostnader å prise inn (remote).
- Sett timepris som også er bærekraftig i opsjonsårene (prisregulering følger
  SSA-B §6.5 med mindre annet spesifiseres i Bilag 5).

## Tilbudsbrev — skisse (engelsk)

> Console Holding AS submits an offer for the GeoWeb frontend assignment with
> Asbjørn Rørvik as the proposed consultant. Asbjørn is a senior frontend/
> fullstack developer (8 years production experience) with deep React/TypeScript
> expertise, real-time geospatial UI experience from Nordic public transport
> (Kolumbus — Nordic Public Transport Design Award 2025), and security-aware
> delivery experience from Equinor and PCI DSS-certified payment systems. He is
> available full-time from [date], works fluently in English in distributed
> scrum teams, and has already familiarised himself with the OpenGeoWeb
> codebase. Hourly rate: NOK [x] excl. VAT.

## Neste steg

1. [ ] Meld interesse i Mercell (åpner innleveringsskjemaet + varsler).
2. [ ] Klon og les OpenGeoWeb-repoet; noter 2–3 konkrete observasjoner til besvarelsen.
3. [ ] Avklar referansepersoner (navn/tlf/e-post) for de 3 casene.
4. [ ] Ev. spørsmål i Mercell før 27.07 kl 16 (ferie uke 28–29): tilbudsspråk?
5. [ ] Fyll Bilag 2–5, skriv CV målrettet mot kravlisten.
6. [ ] Bestill kredittrating (f.eks. via regnskapsfører/Experian) så den er klar.
