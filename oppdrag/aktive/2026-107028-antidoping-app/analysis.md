---
tender: 2026-107028
title: Antidoping-app — vinnerstrategi
status: Tier 1 — høyeste prioritet
deadline: 2026-05-11 12:00
questionsDeadline: 2026-05-04 12:00
budget: 1.8M NOK
contract: SSA-O (utvikling)
---

# Antidoping-app — vinnerstrategi

## TL;DR

Dette er et **realistisk anbud å vinne** som enmannskonsulent. Ren nyutvikling,
riktig størrelse for soloshop (1.8M over trolig 12–18 mnd), SSA-O-kontrakt som
bekrefter scope er en ekte app — ikke hylleprodukt. Konkurransen vil være små
til mellomstore norske app-hus (Bekk, Knowit Mobile, Miles Mobile, Nitor,
frilansere). Din Flutter/React Native-erfaring fra Equinor, Altibox og NLR er
en direkte match. **Gå for det.**

## Kunden

**Antidoping Norge** er en stiftelse etablert av staten og Norges Idrettsforbund
for å håndheve antidopingarbeid uavhengig av NIF og staten. De har ca. 30
ansatte og en årlig omsetning på ~60M NOK. De er i en fase der hele det
digitale kontaktpunktet mot utøvere skal konsolideres:

- **Ren Utøver** (e-læringsmodul) — relansert 2022, mobiltilpasset web, ikke
  native app.
- **Medisin-søk** — integrert via Felleskatalogen (egen app).
- **Dopingvarsel** — varslertjeneste levert av PwC + danske Got Ethics.
- **MODOC** — tysk prøvetakingssystem fra Professional Worldwide Controls.

**Hva mangler:** en samlet "én-stopp" mobilapp for utøvere med alle ressursene
på ett sted. Det er *det* dette anbudet skal løse.

## Oppdraget — slik vi leser det

Ut fra Doffin-beskrivelsen og dokumenttitlene:

- Skal bygge en **native mobilapp** (iOS + Android)
- Samle verktøy og ressurser utøvere trenger i hverdagen
- Sannsynlig scope: medisin-søk (Felleskatalogen-API), varslinger om
  kontroller/regler, kobling mot WADA-lister, innlogging via Idrettens
  Fellestjenester (ItF) eller BankID, push-varsler, offline-tilgang til
  regelverk
- SSA-O = utviklings­kontrakt med **resultat­ansvar** — du forplikter deg til
  å levere en ferdig app, ikke timer

## Konkurransebilde

| Sannsynlig konkurrent | Fordeler | Svakheter |
|---|---|---|
| Bekk, Miles, Knowit Mobile | Størrelse, referanser, prosessmodenhet | Timepris 1600–2200, 1.8M blir trangt |
| Mobilehuset, Appex, Shortcut | Spesialist på mobil | Timepris 1400–1800, kan matche budsjett |
| **Andre frilansere/ENK** | Timepris 1100–1400, bud kan vinne på pris | Ofte svakere referanser |
| **Deg (Eksire)** | Referanser på nivå med store hus (Equinor, Kolumbus, Altibox), timepris i midtsjikt, solo-fleksibilitet | Må kompensere for å være én person |

**Vinnervinkelen:** referanse­styrke som et stort hus, men pris og fleksibilitet
som en frilanser.

## Tildelingskriterier — hypotese

Konkurransegrunnlaget (1.0 Konkurransegrunnlag.pdf) må leses for de eksakte
vektene, men typisk for SSA-O-utvikling på dette nivået:

- **Pris: 30 %** — fastpris eller timepris med tak
- **Kvalitet — løsning og metodikk: 35–40 %**
- **Kvalitet — kompetanse/referanser: 30–35 %**

Hvis det stemmer er **65–70 % kvalitet** og kun **30 % pris**. Ikke konkurrer
på bunnpris — vinn på kvalitet.

## Vinner­strategi per kriterium

### Pris (30 %) — "konkurranse­dyktig, ikke billigst"

- **Fastpris**, ikke timebasert. Det signaliserer resultat­ansvar, matcher
  SSA-O, og reduserer kjøpers risiko. Kjøper vet at timepris-prosjekter sprekker.
- Foreslått pris: **1.45M NOK fastpris + 250k vedlikeholds­pool (12 mnd)**.
  Det ligger akkurat under taket (gir margin), signaliserer at du har regnet.
- Splitt leveranse i tre milepæler (MVP → beta → 1.0) så kjøper kan kansellere
  etter hver milepæl. Det senker risiko-oppfatningen ytterligere.

### Kvalitet — løsning og metodikk (35–40 %)

**Dette er der du vinner eller taper.** Bilag 2 i SSA-O = "Leverandørens
løsningsforslag". Ikke skriv generisk — skriv som om du allerede har tegnet
appen.

Konkret innhold:
1. **Teknisk stakk med begrunnelse** — Flutter for én kodebase (iOS+Android),
   Go-backend i en skytjeneste (Azure eller Digdir Sky), integrasjon mot
   Felleskatalogen via deres API, ItF/BankID-login, Sentry for feilrapportering,
   Bitrise/GitHub Actions for CI.
2. **Tilgjengelighet (UU) fra dag 1** — WCAG 2.2 AA, screen reader-testing,
   dynamic type. **Du har Altibox-erfaring med UU-krav** — nevn det.
3. **Personvern** — DPIA, minimal datainnsamling, Schrems II-hensyn
   (alt i EU/EØS), sertifikat-pinning.
4. **Utviklings­metode** — 2-ukers sprinter, demo etter hver, Figma-prototyp
   før hvert større element. Vis at du leverer løpende, ikke "stor bang"
   på slutten.
5. **Kvalitetssikring** — minst 60 % unit-test-dekning på logikk, e2e-tester
   for kritiske flyter, manuelt testoppsett med 3 fysiske enheter.
6. **App Store / Play-publisering** — du har gjort det før (TryggDrift, EaseePay).
   Skriv det eksplisitt — mange hus outsourcer dette og sliter.

### Kvalitet — kompetanse/referanser (30–35 %)

Bilag 4/5 (Leverandørens gjennomføringsevne + Referansebeskrivelser). Velg tre
referanser som matcher *akkurat* denne appen:

1. **TryggDrift (NLR)** — Din lead-rolle, React Native, levert til App Store +
   Play, erstatter et eksisterende system. Samfunnskritisk domene med HMS/regel-
   data. **Nærmeste parallell til antidoping-appen vi har.**
2. **Kolumbus** — 142 000+ månedlige brukere, Flutter, prisvinnende produkt
   (Nordic Public Transport Design Award 2025), varsler + kontekstuell
   informasjon. Viser du kan lage app folk faktisk bruker.
3. **EaseePay (Easee)** — PCI DSS, sikkerhet, Adyen-integrasjon. Viser at du
   håndterer regulatoriske krav og sensitive data — relevant for helsedata.

**Kandidater å droppe:** Equinor (for offshore/b2b, ikke utøver-app), Altibox
(smart­hus, feil domene), Supportify (SaaS, ikke mobil-app-case).

### Gjennomføringsevne — "én person"-problemet

Dette er bekymringen kjøper vil ha. Nøytraliser den proaktivt:

- **Under­leverandør for UU og test** (f.eks. Funka eller MediaLT på UU, en
  frilans-tester for cross-device). Koster 100–150k, gir kjøper trygghet.
- **Supportavtale etter levering** — spesifisér responstider og backup-rutiner.
- **Kildekode-escrow** eller git-tilgang for kjøper fra dag 1. Hvis du blir
  truffet av en buss kan noen andre plukke opp.

## Risiko­analyse

| Risiko | Sannsynlighet | Mitigering |
|---|---|---|
| Solo-faktoren diskvalifiserer | Medium | Underleverandør for UU/test, escrow |
| Pris­veloppet for lavt → ulønnsomt | Medium | Milepæl-struktur, endrings­ordre-klausul |
| Felleskatalogen-API-tilgang treg | Lav | Antidoping Norge har allerede integrasjon — de vet hvordan |
| ItF/BankID-integrasjon drar scope | Medium | Legg inn i milepæl 2, ikke 1 |
| App Store-avvisning (medisin-info) | Lav-Medium | Du har publisert før. Flagg i bilag 2. |
| Etterforsknings­klausuler (SSA-O §8) | Lav | Godta standard, ikke forbehold |

## Dag-for-dag-plan fram til 2026-05-11

**Uke 1 (22.–27. april) — kartlegging**
- Last ned alle 9 vedlegg fra Mercell
- Les konkurransegrunnlag (1.0) først, så SSA-O Bilag (2.1)
- Noter nøyaktige tildelings­kriterier og vekter i `notes.md`
- Identifiser spørsmål til kjøper

**Uke 2 (28. april – 4. mai) — spørsmål og første utkast**
- **2. mai senest:** send spørsmål til Antidoping Norge (frist 4. mai)
  Typiske: "Er Felleskatalogen-lisens inkludert?", "Ønsker dere hosting hos
  dere selv eller skal leverandør drifte?", "Hvor mange utøvere er antatt
  aktive samtidig i snitt / peak?"
- Start utkast på Bilag 2 (Leverandørens løsning) — ca. 8–12 sider
- Start utkast på Bilag 4 (Gjennomføringsevne)

**Uke 3 (5.–9. mai) — ferdigstille**
- Finpuss Bilag 2 etter svar fra kjøper
- Skriv Referansebeskrivelser (Bilag 5) — 3 referanser à 1–2 sider
- Fyll inn Tilbudsskjema (1.1) med priser
- Få noen til å lese gjennom (ekstern korrektur)

**10. mai — reserve / buffer**

**11. mai 12:00 — send inn via Mercell**

## Etter innsending

- Mercell viser status løpende
- Typisk evalueringsperiode: 2–4 uker
- Hvis tildeling vinner: 10 dagers karens­periode før kontrakt signeres
- Hvis taper: **be om innsyn** i evaluerings­protokoll. Hver gang. Lærer mer
  om offentlige anbud enn noen kurs kan gi.

## Åpne spørsmål som må besvares

Fylles ut når vedlegg er lest:

- [ ] Eksakte vekter på tildelings­kriteriene
- [ ] Er det krav om 2 eller 3 referanser, og krav til deres størrelse?
- [ ] Krav til antall CV-er i teamet? (enmann vs minimumsteam)
- [ ] Er hosting/drift inkludert eller kjøpers ansvar?
- [ ] Er det krav om norsk statsborgerskap / sikkerhetsklarering?
- [ ] Er det opsjon på videreutvikling etter fase 1?
- [ ] Hvilken Felleskatalogen-lisens­modell gjelder?
