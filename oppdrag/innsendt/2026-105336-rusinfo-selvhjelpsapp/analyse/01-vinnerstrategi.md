---
tender: 2026-105336
title: RUSinfo selvhjelpsapp — vinnerstrategi
status: Tier 1 — oppjustert etter dokumentgjennomgang
deadline: 2026-12-16 10:00 (må verifiseres mot Doffin-kunngjøringen)
budget: Ikke oppgitt (estimeres 800k–1.5M basert på omfang)
contract: SSA-T (tilpasning) + 3 års vedlikehold + auto-fornyelse
---

# RUSinfo selvhjelpsapp — vinnerstrategi

## TL;DR (revidert etter gjennomlesing av konkurransegrunnlag + Bilag 1)

**Dette er den beste vinnersjansen jeg har sett hittil.** Oppjusterer fra
"~Tier 2 — langt unna" til **Tier 1 på linje med Antidoping**.

Grunner:
- **SSA-T, ikke nyutvikling** — kodebasen (HAP) finnes allerede, er **Ionic 7 +
  Vue 3 + Capacitor 5 + TypeScript**. Du trenger ikke bygge en app fra scratch.
- **Kravene er tilpasning og nye moduler**, ikke en helt ny app
- **Løsningen skal være helt anonym** — ingen personopplysninger, ingen
  DPIA-byråkrati (GDPR-minimering er *krav*, ikke bare ønske)
- **Kildekoden skal eies av kunden eller være åpen** — *perfekt* for soloshop
  (eliminerer proprietære konkurrenter)
- **Prisen evalueres over 10 år** — solo-konsulent med lave kostnader vinner
  på totalpris, store hus med dyre team taper
- **3-års vedlikeholds­avtale med auto-fornyelse** — potensielt 10+ års
  løpende inntekt fra én vunnet kontrakt
- **Ingen Oslo-adresse påkrevd** — ren remote, anywhere

## Kunden

**Oslo kommune Velferdsetaten v/ RUSinfo**:
- RUSinfo er en nasjonal informasjons- og veiledningstjeneste om rus
- Finansiert via tilskudd fra Helsedirektoratet
- ~1050 ansatte i Velferdsetaten totalt
- Har allerede appen **HAP** for cannabis-avhengighet (som grunnlaget her)
- Har god erfaring med app som selvhjelpsverktøy → vil ikke gjøre store arkitekturendringer

**Oppdragsgiver-ansvarlig:** Synnøve Jørgensen (`synnove.jorgensen@okf.oslo.kommune.no`)

**Kommunikasjon:** All dialog via KGV (Oslo kommunes konkurransegjennomføringsverktøy).

## Arvet kodebase — HAP

Dette er det viktigste å forstå. HAP er allerede i drift og skal brukes som mal:

**Stack:**
- Ionic 7 (Vue 3)
- Capacitor 5 (native iOS/Android)
- TypeScript 5
- Vuex for state, Vue Router
- Chart.js (vue-chartjs) for grafer
- Jest (unit) + Cypress (e2e) + Playwright WebKit
- Axios for HTTP, backend kommuniserer med server for innhold

**Det betyr:** Alle teknologi-beslutningene er allerede tatt. Du overtar en
velstrukturert, moderne stack. Ikke din hovedstack (Flutter), men Ionic/Vue er
trivialt for en senior TypeScript-utvikler og en helt godkjent ramme.

**Risiko-mitigator:** Hvis du på spørsmålsfristen spør *"er det anledning til
å bytte rammeverk hvis dette gir bedre kvalitet?"* — og får nei, som sannsynlig —
så er du uansett bundet til Ionic. Det er greit. Pris kompenserer for læringskurve.

## Scope — hva skal faktisk leveres

Basert på krav 4.2.1 og 4.2.2 i Bilag 1:

### Skal beholdes fra HAP med kun visuelle endringer
- Triggerdagbok (egne triggere)
- Tidtaker siden siste gangs bruk
- Nullstille funksjoner (alle + enkelt)
- Avatar
- Infofelt styrt fra RUSinfos kontrollpanel via backend
- Redigerbar tekstboks fra RUSinfo til brukere
- Lenker til RUSinfos tjenester (tlf, chat, FAQ)

### Skal tilpasses fra HAP
- **Prestasjoner:** nye parametre, utseende, oppgraderbar, valgfritt tema
- **Abstinensgraf:** tilpasset kokain + kombo alkohol/kokain + ulik graf per
  modul (slutte helt vs redusere)
- **Dagbok** m/ tagging og flere malverk:
  - Mal for ukesmål + evaluering ("Ukens mål", "Slik gikk det") + visuell
    oversikt (graf)
  - Mal for kriseplan (med kriseknapp)
  - Mal for FAK-skjema (kognitiv atferdsteknikk)
- Dagens/ukens tema (refleksjonsspørsmål, oppmuntringer, øvelser)
- **Sparekalkulator** — visuell oversikt over besparelse

### Fem helt nye funksjoner
1. **Kartleggings­verktøy som kalender** — planlegge kokain­bruk per periode, evaluere etterpå
2. **Kriseknapp** — fører direkte til kriseplan i dagboken
3. **Tema/fargepalett-velger** + gray-scale-modus (øyekomfort)
4. **Bildebibliotek** — brukeren velger bakgrunnsbilder til funksjoner
5. **Motivasjonsvegg** — brukeren lager egen vegg med tekst + bilder fra biblioteket

### Tre moduler appen deles inn i
- **Modul 1:** personer med syklisk bruk
- **Modul 2:** personer med jevnlig/daglig bruk
- **Modul 3:** personer som vil lære mer om kokain (edukativ)

Bruker velger modul ved oppstart.

### Teknologi-krav (Bilag 1 §4.2.3)
- Felles kodebase ønsket (altså: ikke flere source trees)
- Rammeverk med 5–7 års levetid
- Lydavspilling
- **Lokal oversettelses-/språkmodell** (kjører på enheten, ikke nett) — spennende AI-vinkel

### Personvern (Bilag 1 §4.3.1) — *viktig og bra*
- **Løsningen skal IKKE behandle personopplysninger**
- Ingen IP-logg, ingen metadata, ingen tredjeparts­behandling
- All innsendt data er helt anonym
- Ingen DPIA eller databehandleravtale behøves hvis du leverer etter ønsket løsning
- Hvis du trenger DPA, utløses §4.4 med fire M-krav

**Dette er gull.** Antidoping og lignende apper må typisk bygge full GDPR-stack.
RUSinfo eksplisitt *ønsker* ikke-GDPR fordi målgruppa er stigmatisert. Det gjør
appen teknisk enklere og billigere å drifte.

## Tildelingskriterier — eksakte vekter

| Type | Kriterium | Vekt | Dokumentasjon |
|---|---|---|---|
| Pris | Samlet evalueringspris (hovedoppdrag + vedlikehold + timepriser + opplæring) | **30 %** | Bilag 7 prisskjema |
| Kvalitet | Ønsket funksjonalitet + brukervennlighet + vedlikehold | **35 %** | Besvarelse av alle B-krav i Bilag 2 |
| Kvalitet | Prosjektgjennomføring | **35 %** | Bilag 4: prosjektplan, kompetanse, samarbeid med oppdragsgiver |

**Evaluering:** Hver kategori får poeng 0–10. Beste tilbud får 10, andre lineært.
Vektes og summeres. **Ingen mellomrunder** — man tilbyr én gang og bli bedømt.

**Kritisk nyanse (§5.2.2):** For B-krav kan du enten bekrefte "ønsket løsning
kan leveres uten avvik" → full score 6 — eller tilby *alternativ* løsning som
dekker behovet "fullt ut" → også full score 6. **Det er altså ikke nødvendig
å love akkurat det RUSinfo beskriver** så lenge du argumenterer at din variant
dekker samme underliggende behov.

## Konkurransebildet

**Sannsynlige konkurrenter:**

| Type | Eksempler | Fordel | Svakhet |
|---|---|---|---|
| HAP-leverandøren selv | Trolig et lite Oslo-byrå | Kjenner kodebasen | Inhabil etter §3.11? *Kanskje* — spør på spørsmålsfrist |
| Ionic-spesialiserte byråer | Shortcut, Friflyt, diverse frilansere | Kjenner stacken | Dyrere |
| Lokale Oslo-app-shops | Oslosound, Netlife, Knowit Experience | Relasjoner | Middels fit |
| **Deg (Asbjørn Rørvik ENK)** | — | Timepris-konkurransedyktig, solo-fleksibilitet, TryggDrift direkte sammenlignbar case | Ikke Ionic-innfødt |

**Viktig spill:** finn ut om HAP-leverandøren kan delta. Hvis de har utviklet
selve kravspesifikasjonen er de utelukket etter §3.11. Hvis ikke er de
sannsynligvis sterk konkurrent. Gode spørsmål:
- *"Hvem har utarbeidet kravspesifikasjonen?"*
- *"Har tidligere HAP-leverandør adgang til å delta?"*

## Vinner­strategi per kriterium

### Pris (30 %) — solo-konsulent *dominerer*

Prising evalueres over **10 års vedlikehold**, inkluderer:
1. Hovedoppdrag (fastpris)
2. Vedlikehold per måned
3. Timepriser for endringer utover vedlikehold
4. Opplæring (workshops + skriftlig)

**Solo-konsulent vinner naturlig her.** Et stort hus må prise inn:
- Overhead (HR, admin, kontor) — ~30–50 % påslag
- Vedlikehold med 2–3 ressurser for bus-faktor
- Timepriser 1600–2400 NOK

Din kostnad er kun deg selv. Tålte timesatser: 1200–1400 for utvikling,
900–1100 for vedlikehold.

**Forslag prising (alt eks mva):**

| Post | Tilbud | Resonnement |
|---|---|---|
| Hovedoppdrag fastpris | **750 000** | 500 timer * 1500, innebærer 10 ukers innsats solo |
| Årlig vedlikehold | **120 000** | ~10 t/mnd * 1000/t, dekker deploys + bug fixes + store updates |
| Vedlikehold 10 år (evaluering) | **1 200 000** | Vekstbuffer mot inflasjon: 120k konstant, aksepter margin-skvis |
| Timepris utvikling | **1 250** | Kampanjepris første år, stiger 3 %/år |
| Timepris vedlikehold | **1 000** | Løpende rutine |
| Opplæring | **15 000 fastpris** | Én workshop + manual |
| **Total evalueringspris (10 år)** | **~2 000 000 NOK** | Sterk for evaluering |

**Kritisk:** §5.2.1 advarer mot *taktisk prising* — urimelig høye priser på
poster utenfor evaluering for å kompensere. Ikke gjør dette. Hold alle priser
konsistente med reell kostnad.

### Kvalitet — funksjonalitet (35 %) — svar *detaljert* i Bilag 2

Her evalueres svar på hvert B-krav i Bilag 2 på skala 0–6. Skriv ikke tynt.

**Vinner­taktikk:**
1. For *hvert* B-krav — svar "Ønsket løsning kan leveres uten avvik" der du
   kan. Det gir automatisk 6 poeng. Ikke kompliser.
2. Bare tilby alternativ løsning når du faktisk har en *bedre* idé (f.eks.
   lokal AI-oversettelse kan være ONNX/WebLLM — beskriv dette konkret).
3. Legg ved skjermbilder/skisser fra HAP og hvordan du ville endret dem.
   Viser at du har satt deg inn.
4. Teknologi­krav 4.2.3: *"Ønsket rammeverk levetid 5–7 år"* — bekreft eksplisitt
   at Ionic 7/8 (med vedlikeholds­policy) dekker dette. Ikke tilby alternativ
   (Flutter/RN) med mindre du argumenterer klart for gevinsten.

**Styrke­posisjoner:**
- TryggDrift (NLR, 2025): *"selvhjelpsverktøy for bruker­gruppe med sensitiv
  situasjon, levert til App Store + Play, helt ferdig fra kode til publisering"*
- Kolumbus: *"app med 142 000+ aktive brukere, kontekstuelle varslinger,
  gamification av reiseopplevelse, prisvinnende design"*
- Easee EaseePay: *"arbeidet med personvern på produksjonsnivå, erfaring med
  PCI DSS og anonymiserings­rutiner"*

### Kvalitet — prosjektgjennomføring (35 %) — dette er der du kan tape

Dette er *"en person vs et team"*-spørsmålet. Hvert punkt i Bilag 4 må svares:

**4.1 Prosjektplan:**
- Delt i faser (0. Onboarding → 1. Tilpasning av eksisterende → 2. Nye funk
  → 3. UU + testing → 4. Publisering → 5. Vedlikehold)
- Milepæler med demo hver 4. uke
- Estimert total varighet 12–16 uker utvikling + løpende vedlikehold
- Fordel: ikke behov for team-onboarding → raskere oppstart

**4.2 Kompetanse og erfaring på tilbudte ressurser:**
- Én ressurs: deg. Dette er den *største* risikoen i evalueringen.
- **Mitigering:**
  - Underleverandør for UU-test (Funka Nu eller MediaLT, ~80k)
  - Backup-utvikler-avtale (en tidligere kollega som kan steppe inn ved fravær)
  - Kildekode-escrow hos tredjepart (Escrow.com eller norsk alternativ)
  - Kontinuitet garantert via git-tilgang til RUSinfo fra dag 1

**4.3 Samarbeid og involvering av oppdragsgiver:**
- Ukesmøte, demo + feedback
- Figma-skisser før implementasjon for hver nye funksjon
- Bruker­test med RUSinfo-stab (ikke ekte sluttbrukere pga anonymitet)
- Delt issue-tracker (GitHub Projects / Linear)
- Svar på henvendelser innen 24 t på hverdag

## Risiko­matrise

| Risiko | Sannsynlighet | Konsekvens | Mitigering |
|---|---|---|---|
| Sollitære-faktor diskvalifiserer på prosjektgjennomføring | Høy | Høy | Underleverandør + escrow + transparent gantt |
| Ionic/Vue-læringskurve svekker pris­tilbudet | Middels | Middels | Legg inn 40 t onboarding-buffer i fastpris |
| HAP-kodebase er rotete/ ikke oppdatert | Middels | Middels | Spør på spørsmålsfrist: *"siste commit-dato + test coverage?"* |
| Evalueringen favoriserer eksisterende leverandør | Middels | Høy | Utnytt at §3.11 krever utelukkelse ved konkurransefordel |
| Tidsplan­glipp pga andre forpliktelser (Netpower-jobb) | Middels | Høy | Vær ærlig på tilbudt kapasitet (f.eks. 3 dager/uke) → ikke lov mer enn du klarer |
| Oslomodellen (Bilag 8) har krav om Oslo-tilknytning | Lav | Høy | **Må leses nå** — hvis krav om lokale partnere, allier med Oslo-baserte frilanser |

## Åpne spørsmål — send på KGV innen 8 dager før tilbudsfrist

1. **Tilbudsfrist:** 2026-12-16 (portal) vs fremdriftsplan (uke 18-22) — hva gjelder?
2. Hvem utarbeidet kravspesifikasjonen? Er HAP-leverandøren utelukket fra konkurransen?
3. Hva er siste HAP-commit, test-dekning, og vedlikeholds­status?
4. Er det krav om at leverandøren har Oslo-tilknytning (Oslomodellen)?
5. Hva er budsjett­ramme? "Kunden har budsjett som ikke kan overskrides vesentlig" — hvor ligger den?
6. Er det anledning til å tilby annen stack enn Ionic/Vue hvis det gir bedre kvalitet?
7. Hvem hoster backend-serveren i dag? Skal ny leverandør overta driften?
8. Hvilken lokal AI-språkmodell ønskes (on-device)? Fungerer WebLLM eller ONNX?
9. Forventet brukervolum? (påvirker server-sizing)
10. Hvordan defineres "funksjonalitet på plass ved leveringsdag"? All tre moduler samtidig eller rullende?

## Dag-for-dag plan (antatt tilbudsfrist 2026-12-16)

Du har ca. 8 måneder — mye mer komfortabel tidsramme enn Antidoping.

**Fase 1 — oppdag (2 uker)**
- Grundig gjennomgang av HAP-kildekoden → forstå arkitekturen
- Installer og kjør HAP lokalt, navigér hele appen
- Noter tekniske gjeldner og forbedringspotensiale

**Fase 2 — spørsmål (sommer 2026)**
- Send KGV-spørsmål (punktene over)
- Les alle Bilag 3–10

**Fase 3 — skriv (august-november)**
- Bilag 2: fullt svar på alle M-krav og B-krav (20–30 sider)
- Bilag 4: prosjektplan, CV-er, metodikk (15–20 sider)
- Bilag 7: prisskjema (nøye, taktisk-klausul respektert)
- Tilbudsbrev: kort og tydelig, avvik nevnt hvis noen

**Fase 4 — refleksjon (november)**
- Få noen til å lese gjennom (gamle kolleger fra Bouvet, Netpower)
- Ekstern korrektur
- Dobbeltkontroll ESPD-skjema og firmaattest

**Fase 5 — send (senest 15. desember)**

## Kombinasjon med Antidoping-anbudet

**Du kan bytte på begge** — og bør. Her er hvorfor:

1. **Antidoping-frist (11. mai 2026):** kortsiktig fokus
2. **RUSinfo-frist (16. desember 2026):** langsiktig forberedelse + lærepenger fra første tilbud

Hvis du vinner Antidoping: du har portefølje og relasjoner til å vinne RUSinfo.
Hvis du taper Antidoping: du har lært tilbudsprosessen før RUSinfo. Begge veier
vinner du kompetanse + inntekt.

**Felles gevinst:** når du leverer ett tilbud, har du malverk og struktur klart
for de neste. ROI på første tilbud er ca. 100 timer investert. ROI på nummer
10 er 20 timer per tilbud.

## Anbefaling

**Gå for det.** Dette er en bedre fit enn jeg opprinnelig trodde. Send inn
tilbud — med et seriøst nivå av innsats, ikke halvhjertet. Vinn dette og du har
en 10-årig vedlikeholds­strøm som i seg selv kan være 1.2M+ over løpetiden.

Starte med:
1. Kjør `npm install` i HAP-kodebasen og få den til å kjøre lokalt
2. Les resten av Bilag 3–10 (prisskjema, Oslomodellen osv)
3. Sett opp questions-dokumentet for KGV
