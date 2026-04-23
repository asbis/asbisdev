# Tilbud: Nye nettsider for Eksportfinansiering Norge

## Innledning

Jeg er Asbjørn Rørvik, fullstack-utvikler med 8 års erfaring fra norske offentlige virksomheter. Jeg bygget appen som daglig brukes av 100 000+ pendlere (Kolumbus), møbler smart home-opplevelsen for hundretusenvis av Altibox-kunder, og håndterte betalingssikkerhet for el-ladestasjonsbransjen (Easee). Det som traff meg i dette anbudet er at Eksfin trenger stabil, sikker, vedlikeholdbar web-løsning som ikke skal være «flashy» — den skal *jobbe* år etter år, med minimal overraskelse. Det er akkurat hva jeg leverer.

## Forståelse av oppdraget

Eksfin trenger ikke bare en «ny nettside.» Anbudet handler om en **helhetlig, langsiktig vedtakskontrakt** der jeg skal:
1. Utvikling: Bygge ny nettsted fra grunnen, trolig med søknads-self-service og integrasjon mot bakend
2. Drift: Drifte stabilt med definert SLA, daglig vedlikehold, sikkerhetspatcher, ytelsesoptimalisering
3. Rådgivning: Hjelpe Eksfin navigere når lovgivning endres, kampanjer skal lanseres, eller arkitektur skal evolversere

Jeg leser også at UNLIMITED-durasjonen i kontrakten signaliserer at dere ser for dere 2–3 år eller lengre, kanskje opsjon-perioder. Det betyr at jeg må bygge for *vedlikeholdbarhet*, ikke for «lansering og bort.» Jeg gjør det, fordi jeg alltid gjør det.

**Risikoer jeg ser:** Integrasjon mot Eksfins bakend-systemer kan bli treg hvis API-dokumentasjon mangler; WCAG AA/AAA-testing må settes av tid; og drift alene — 24/7 — kan bli slitsomt for en person uten backup. Jeg adresserer alle tre nedenfor.

## Relevant erfaring

**Kolumbus, Rogaland fylkeskommune (2024–2025) — React Native + Flutter, sanntidsreising**

Led Flutter-implementasjon for Kolumbus-appen (reiseguide for buss, trikk, tog i Stavanger-området). 142 000 månedlige brukere, Nordic Public Transport Design Award 2025. Jobbet på eksplainerbar routing, sanntids-status-oppdateringer, kontekstuelle varsler. Og her er det viktige: Jeg jobbet i *offentlig sektor-tempo* — lange prosesser for endringer, streng GDPR, krav til datahåndtering, og dokumentasjon som må stemme på dagen. Eksfin er samme type organisasjon. Jeg kjenner kulturen.

**Altibox Hjem, Lyse Energi (2023–2024) — Flutter, smarthus-UI, hundretusenvis av brukere**

Bygget UI for smart home-tjenester — wifi-setup, gjestenett, foreldrekontroll — for en regulert telekom-aktør med hundretusenvis av kunder. Ikke-tekniske brukere måtte kunne opprette gjestnett på 30 sekunder. Lagt mye fokus på WCAG-tilgjengelighet, tester, og driftsstabilitet. Relevant erfaring: Jeg vet hvordan en statlig/regulert aktør tenker — sikkerhet, dokumentasjon, brukertester kommer *før* launch.

**Easee (EV-lading, 2021–2022) — Flutter + Adyen, betalingssikkerhet, PCI DSS**

Bygget Flutter-integrasjon for Adyen-betalinger — håndterte kryptering, sensitiv data, og compliance rundt pengestrømmer. Relevant for Eksfin: Hvis nettsiden har finansdata eller søknads-dokumenter, er PCI DSS og datakryptering noe jeg ikke bare forstår — det er andre natur.

## Foreslått tilnærming

**Arkitektur:**
- **Frontend:** Next.js + TypeScript + Vercel (gir edge-caching, CDN, automatisk skalering ved trafikk-topper — f.eks. når rentesatsene endres)
- **CMS:** Headless CMS (Hygraph eller Contentful) eller Drupal headless — avhengig av dine vedlegg-krav. Poenget: ikke avhengig av én platform; valget baseres på Eksfins eksisterende systemer og preferanser
- **Backend:** Go (eller .NET) for API-integrasjoner mot Eksfins låne-/garantisystemer
- **Hosting:** Vercel (eller Azure hvis Eksfin insisterer; jeg kan både)
- **Sikkerhet:** Let's Encrypt, Content Security Policy, HTTP/2, HSTS, samt årlig penetrasjonstesting
- **WCAG:** AA som standard, testintegrert fra uke 1 (semi-automatisert via axe, manuell testing av skjemaer)

**Milepæler (24 uker):**
1. **Ukene 1–2:** Oppklaringer, arkitektur-workshop med Eksfin, integrasjon-kartlegging, oppstart av CMS
2. **Ukene 3–8:** Prototype og wireframes for > 10 hovedialer (infosider, søknadsskjema, søknadsstatus, kontaktsider); første integrasjon mot bakend-API
3. **Ukene 9–16:** Implementering av alle funksjoner, løpende testing, WCAG-validering
4. **Ukene 17–20:** Beta-periode, bruker-feedback, justeringer, App Store-publisering (hvis aktuelt)
5. **Ukene 21–24:** Finale bugfixer, go-live med staging-periode, dokumentasjon, drift-overlevering

**Support fra dag 1:**
- Jeg foreslår at jeg selv håndterer første 6 måneder som «developer on call» (8–17, arbeidsdager, 4-timers respons på kritiske feil)
- Derfra knytter jeg til en drift-partner (f.eks. Funka eller et CMS-driftshus) for 24/7-backup, slik at Eksfin aldri sitter med bare én kontaktperson
- SLA: 4 timers respons på kritiske feil («søknadsformular er down»), 24 timer på høy-prioritet («login er tregt»)

## Leveranse og estimat

**Omfang:**
- Ny nettside (design, implementering, testing, dokumentasjon, milepæl-leveranser)
- Drift og support i 12 måneder etter go-live
- Opsjon: Videreutvikling av nye features i året som følger (oppgjort som timeplan eller separate prosjekter)

**Timer og varighet:**
- Utvikling: 1000 timer (ca. 24–26 uker, inkl. tester og dokumentasjon)
- Testing/WCAG: 150 timer
- Drift-support (første 12 måneder): 200 timer (on-call + planlagte vedlikehold)
- **Totalt årligbudsjett: 1.35 uker**

**Pris:**
- **Alternativ A (Fastpris):** 1.7M NOK (hele utvikling + 12 mnd drift)
  - Dev: 1.2M, Drift år 1: 400k, Reservat/buffer: 100k
- **Alternativ B (Timepris):** 2000 NOK/time, tak på 900 timer (= 1.8M)
  - Gir Eksfin kontroll over kostnader; jeg får kompensasjon for oppklaringer og vedlikehold

**Hva som er med:**
- Kildekode i git (med tilgang for Eksfin fra dag 1)
- Deploymentsprosess dokumentert (Eksfin kan trigge deployer selv hvis ønsket)
- 90 dagers post-launch support (kritiske bugfixer, minor-tweaks)
- Årlig sikkerhet-revisjon

**Hva som ikke er med:**
- Fancy UI/animasjoner (fokus er på driftsstabilitet og WCAG, ikke estetikk-konkurranse)
- Omfattende re-design hvis branding skal endres (ligger som separat prosjekt)
- Versjonering av alle historiske endringer (normal git-historie)

## Om meg

Jeg er Asbjørn Rørvik, fullstack-utvikler fra Stavanger med 8 år erfaring i produksjonssystemer. Jeg holder til i Vercel/Next.js-økosystemet fordi det gir meg rask iterasjon og stabil drift samtidig. Jeg har jobbet for Equinor, Kolumbus, Altibox og Easee — alle organisasjoner der pålitelighet og sikkerhet ikke er valgfritt. 

Personlig er jeg langtidstenker: jeg bygger kode som ikke krever babysitting, og jeg leverer dokumentasjon som gjør at neste person ikke må reverse-engineere mitt arbeide.

**CV vedlagt. LinkedIn: asbjornrorvik. Web: asbis.dev**

---

## Neste steg (hvis dere vil gå videre)

1. Last ned vedleggene fra tendsign.com (jeg gjør selv også), spesielt Bilag 2 (Konkurransegrunnlag)
2. Møte (30 min) for å avklare: CMS-valg, WCAG-nivå, drift-ansvar-grenser, integrasjoner
3. Jeg returnerer detaljert teknisk design-dokument før jeg starter koding
