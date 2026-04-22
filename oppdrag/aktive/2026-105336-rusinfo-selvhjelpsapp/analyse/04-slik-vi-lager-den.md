---
title: Slik vi lager den nye appen
---

# Slik vi lager den nye appen (RUSinfo kokain-selvhjelp)

Design-brief og funksjonsbeskrivelse for Claude Design (eller annen
designer) — mål: generere app-mockups som vi bruker som inspirasjon til
React Native-implementasjonen.

Navnet på appen er ikke bestemt. Arbeidstittel: **"Kord"** (kontraksjon av
"kontroll" + "ord" som i avtalen med seg selv) eller **"Sprek"** eller
**"Nyvak"** — designer kan foreslå flere.

## Design-filosofi

**Appen møter personer i en svært sårbar fase.** Målgruppen kan være
skamfull, paranoid, utslitt og ensom. UX må signalisere:

1. **Verdighet** — ingenting i appen skal føles nedlatende, "kul" eller
   "støtende". Den er et verktøy, ikke en kampanje.
2. **Ro** — visuelt rolig, lav kognitiv belastning. Bruker kan være
   påvirket, engstelig eller utmattet når appen åpnes.
3. **Varme** — ikke klinisk, men heller ikke infantilt. Som en god terapeut:
   profesjonell, trygg, til stede.
4. **Progresjon** — bruker skal kjenne at *noe skjer*, selv når det er
   langsomt. Små visuelle seire, bevegelse, indikator-bevegelser.
5. **Privathet** — ingen "sosial deling", ingen gamification som tyder på
   at andre ser. Bare jeg og appen.

**Hva vi *ikke* vil:** sosiale elementer, konkurranse, tabeller med poeng,
infantilt språk, humoristiske tone, neon, gradient-tung stil, maskot,
mørk "edgy" stil som romantiserer bruk, eller "inspirational quotes".

## Visuell retning

### Palett

Tre forslag å teste (designer velger / foreslår):

**Alternativ A — "Varm stein":**
- Base: off-white `#F6F2EC`
- Primær: varm brun `#6B5544`
- Aksent 1: dempet rust `#B86B4A`
- Aksent 2: sage-grønn `#8BA78F`
- Tekst: nesten-svart `#231F1C`
- Feil/krise: støvet rød `#9E4F4F`

*Inspirert av keramikk, håndverk, naturmaterialer. Ikke "terapeut-blå".*

**Alternativ B — "Stille vann":**
- Base: nesten-hvit `#FAFAF7`
- Primær: blågrå `#4A5F6E`
- Aksent 1: støvet turkis `#7FA8A4`
- Aksent 2: sand `#D4C4A8`
- Tekst: dyp marine `#1E2A33`
- Feil/krise: pudderrød `#C97B7B`

*Mer kjølig, kontemplativ, nordisk minimalisme.*

**Alternativ C — "Nordlys":**
- Base: lys violett-grå `#F3F1F5`
- Primær: dyplilla `#4B3F5C`
- Aksent 1: dempet lilla `#8B7BA4`
- Aksent 2: varm skimmer `#D4A574`
- Tekst: aubergine `#2A2231`
- Feil/krise: korall `#C97060`

*Myk og følelsesmessig, med håp­snitt.*

**Designer velger én eller forslår en fjerde.**

### Typografi

- **Overskrifter:** en seriff med menneskelighet (IBM Plex Serif, Lora,
  Source Serif Pro, eller Instrument Serif)
- **Brødtekst:** nøytral sans-serif (Inter, IBM Plex Sans, eller DM Sans)
- **Vekttilpasning:** Dynamic Type fullt støttet — bruker kan skalere opp
- **Linjeavstand:** relativt luftig (1.5–1.6 for brødtekst) — reduserer
  kognitiv belastning

### Komponenter

- **Kort:** subtile (max 1px border eller 2–4px skygge). Ingen tykke
  pastellkort som i HAP.
- **Knapper:** full-bredde primærknapp på bunn. Sekundære knapper i tekst
  med understreking.
- **Input:** bunn-linje kun (Material-style), ikke omfattende rammer.
- **Ikoner:** ett konsistent sett (f.eks. Lucide, eller custom linjeikoner)
- **Mellomrom:** store marginer (32px vertikalt mellom seksjoner, 24px
  mellom elementer). Rom til å puste.

### Motion

- **200–300 ms easing** på alt (ikke snap)
- **Fade + lett slide** mellom skjermer
- **Pulse/breath-animasjon** på kriseknapp (subtil, 3 sekunder loop)
- **Progresjonsanimasjoner** når bruker logger handling (liten
  check-mark vokser og fader)
- **Reduce Motion** respekteres absolutt

## Struktur (samme som HAP — kunden kjenner denne)

```
Onboarding (kort, 3 slides, ikke 5)
  ↓
Hovednav: 5 tabs
  ├── Hjem
  ├── Dagbok
  ├── Oversikt
  ├── Prestasjoner
  └── Info
```

Pluss **permanent kriseknapp** (FAB) i alle skjermer utenom onboarding.

## Skjerm-for-skjerm forbedringer

### Onboarding (nytt)

**Slide 1 — Velkommen + modul­valg**
- Tittel: "Velkommen. Du er anonym her."
- Tre store kort, én linje hvert:
  - *Jeg vil slutte helt* (modul 1, ~12 ukers løp)
  - *Jeg vil redusere bruken* (modul 2, fleksibelt løp)
  - *Jeg vil lære om kokain* (modul 3, edukativ, ingen løp)
- Bruker velger én. Kan bytte senere.

**Slide 2 — Sett startdato (hopp over = i dag)**
- Stor, myk datovelger
- Tekst: *"Dette er utgangspunktet. Du kan endre senere hvis livet endrer
  seg."*
- Primærknapp: "I dag". Sekundær: "Velg dato"

**Slide 3 — Privathet-løfte**
- Kort, tydelig:
  - *"Vi sender ingen data om deg noe sted."*
  - *"Det finnes ingen konto. Ingen telefonnummer. Ingen e-post."*
  - *"Hvis du sletter appen, er alt borte. Det er bare ditt."*
- Primærknapp: "Kom i gang"

**Flyt:** ingen slide 4/5 med demografiske spørsmål. Det føles inntrengende
for målgruppen. I stedet: nudge senere, inne i appen, etter tillit er bygd.

### Hjem

Vertikal rulle, tre hoveddeler:

1. **Øverst — personlig hilsen**
   - Avatar (bruker kan velge eller la være)
   - Greeting basert på tid på døgnet: *"God kveld."* /  *"God morgen."*
   - Under hilsen: **dager siden startdato**, stort tall med mykt lys bak
     (som en glow, ikke en skarp ring)

2. **Dagens tilbakemelding** (erstatter HAPs "Tema for dagen")
   - Ett stort spørsmål: *"Hvordan har du det i dag?"*
   - Tre emoji-alternativer (🌱 bra / 🌫 gråsone / 🌊 tung) — tre tap, én
     sekunds logging. Lagres i dagbok automatisk.

3. **Ressurs-strip**
   - Horisontal scroll med 3–5 "nåværende" ressurser: Ukens tema (fra
     Strapi), Kriseplan, Spare-status, Nærmeste prestasjon
   - Rammet inn som små kort med tydelig overskrift

**Ikke med på hjem** (flyttet til andre tabs):
- Sparekalkulator-detalj (→ Oversikt)
- Tidtaker-detalj (→ Prestasjoner)

### Kriseknapp (ny — alltid synlig)

- Floating knapp, nede-til-høyre
- Klikkes: **åpner direkte til kriseplan i dagbok**
- Ikonografi: ikke rødt "SOS" — mykere, som et skjold eller en åpen hånd
- Subtil "breathing"-animasjon (3 sekunder loop) så den kan finnes i panikk
- **Aktiveres først etter dag 3** — respekterer at bruker trenger tid

### Dagbok

Tre innganger øverst (pille-knapper):

- **Notat** (fritekst)
- **Trigger** (velg fra liste eller egendefinert)
- **Plan** (kriseplan, ukesmål, FAK-skjema)

Resten av siden er kronologisk liste, gruppert etter dag/uke.

**Tom tilstand** (forbedret fra HAP):
*"Hvert innlegg er bare ditt. Vi anbefaler å skrive kort og ofte —
lettere enn å skrive langt og sjeldent. Hva skjedde i dag?"*

**Eksisterende innlegg:**
- Dato i myk typografi
- Første 2 linjer av teksten
- Tags som små tekst-pille (ikke farget badge)
- Siste emoji-check (fra Hjem-spørsmålet)

**Ny funksjon: Dagbok-mal-maler**
- "Ukens mål" (settes søndag, evalueres neste søndag)
- "Kriseplan" (aktiveres fra kriseknapp)
- "FAK-skjema" (kognitiv atferdsteknikk: Foranledning → Atferd → Konsekvens)

### Oversikt

**Tre seksjoner:**

1. **Din status** (erstatter abstinensgraf)
   - Horisontal fase-indikator med subtile overganger (ikke flat divs)
   - Animert avatar/markør som "flyter" nedover grafen etter hvert som tid
     går
   - Klikk på hvilken som helst fase for å lese om den (modal)

2. **Dine mønstre** (bevart fra HAP, forbedret visuelt)
   - "Triggere som hjelper" (pie)
   - "Triggere som dreg" (pie)
   - Begge med mykere farge + klar labels

3. **Dine tall**
   - Dager uten bruk
   - Penger spart (sparekalkulator, flyttet hit)
   - Antall dagbok-innlegg
   - Antall kriseplaner brukt (hvis > 0)

### Prestasjoner

Kronologisk tidslinje (vertikal) i stedet for HAPs liste:

- Dato + prestasjon-ikon (minimalistisk linjeikon, ikke trofé-cartoon)
- Tittel + kort beskrivelse
- Subtil line-connector mellom hver
- Neste prestasjon øverst som "neste stasjon" med avstand

### Info

**Forbedret fra HAP:**
- Tematiske "hubs" i stedet for flat kategori­liste
- Søk som hovedinntak (ikke skjult)
- Artikler har estimert lesetid, tags
- Deling som tekst-link (ikke deling av innhold om bruk) — f.eks. ring
  RUSinfo-linja

## Fem nye funksjoner (jf. kravspec § 4.2.2)

### 1. Kartleggings­verktøy (kalender)

**Konsept:** To lag på én kalender
- Bakgrunn: planlagt bruk (før perioden begynner)
- Forgrunn: faktisk bruk (loggført daglig)
- Visuell sammenligning etter endt periode

**Design:** mini-kalender (uke eller måned-visning). Tap en dag → logg
faktisk bruk. Planlegging gjøres i forkant via "sett mål"-knapp.

### 2. Kriseknapp → Kriseplan

Beskrevet over. **Kriseplan**-skjermen:
- "Når jeg kjenner trang, gjør jeg dette:" (bruker fyller inn egne skritt)
- Liste 5 ting (default fra RUSinfo, bruker overstyrer)
- "Ring noen:" (bruker legger inn én person + tlf)
- "Ring RUSinfo" (direkteknapp)

### 3. Tema/fargepalett + grayscale

- I innstillinger: velg mellom 3–5 forhåndsdefinerte temaer + grayscale-
  toggle
- Graystil brukes for sensorisk redusert modus
- Temaene bytter primær/aksent-farger men beholder hierarki

### 4. Bildebibliotek

- 40–60 kuraterte bilder (naturbilder, abstrakt, håndverk, ro)
- Bildene lastet ned via Strapi + cachet lokalt
- Bruker velger som bakgrunn i "Hjem" eller i motivasjonsveggen

### 5. Motivasjonsvegg

Bruker komponerer:
- Velger bilde fra bibliotek
- Legger på kort tekst (egen eller fra Strapi-forslag)
- Lagres lokalt. Kan eksporteres som JPG for å lagre i eget foto-album
  (men aldri "del på sosiale medier" som direktevalg).

Vegg-samlingen er brukerens personlige galleri — kan være 3 eller 30
veggposter. Ruller over tid.

## Mikro-detaljer som skiller oss fra HAP

- **Tasteklikk gir haptisk feedback** (iOS Haptic, Android Vibration)
- **Dark mode som *virkelig* er mørk** (ikke bare mørkgrå) med myk OLED-
  kompatibel kontrast
- **First-launch animasjon**: 2 sekunder, teksten *"Du er anonym"* som
  fader inn
- **Pull-to-refresh** på Hjem og Oversikt med en myk, egenlaget animasjon
- **Loading states** har meningsfulle tekster, ikke bare spinnere
- **Feedback ved logging**: når du logger en dagbok-oppføring, vokser en
  liten sirkel på datoen → tydeliggjør at *noe skjedde*
- **Onboarding kan forkortes**: hvis bruker trykker "hopp over" på slide
  1, gå direkte inn i appen med default-innstillinger

## Tilgjengelighet (WCAG 2.1 AA fullt ut)

- Alle kontraster ≥ 4.5:1 (tekst) og ≥ 3:1 (UI-elementer)
- Dynamic Type støttes helt opp til AX5
- Alle ikoner har `accessibilityLabel`
- Skjermleser-testet med VoiceOver (iOS) og TalkBack (Android)
- Tastatur-navigerbar hele veien
- Focus ring synlig (ikke fjernet av default)
- Reduce Motion respekteres
- Ingen informasjon formidles kun gjennom farge

## Teknologi (til implementasjon)

- **React Native 0.74+** med Expo eller bar RN
- **TypeScript 5+**
- **Navigasjon:** React Navigation
- **State:** Zustand eller Jotai (lettere enn Redux/Vuex)
- **Styling:** Dripsy eller Tamagui (theming med tokens) — eller nativewind
- **Animasjon:** Reanimated 3 + Moti
- **Grafer:** Victory Native eller react-native-svg-charts
- **Dato:** date-fns
- **Kalender:** react-native-calendars
- **Backend:** samme Strapi CMS (beholdt)
- **Lyd:** react-native-sound eller expo-av
- **Lokal AI-oversettelse:** Apple Translation + Google ML Kit

## Hva designer skal produsere

For å mate denne som input til Claude Design (eller manuell designer):

1. **1–2 moodboards** basert på de tre palettforslagene
2. **3–5 nøkkelsk­jermer designet som high-fidelity mockups:**
   - Onboarding slide 1 (modul­valg)
   - Hjem (med dagens-spørsmål + ressurs-strip)
   - Dagbok tom-tilstand + med innlegg
   - Oversikt (status + mønster + tall)
   - Kriseplan
3. **Motion-skisser** (GIFs) for:
   - Kriseknappens breathing-animasjon
   - Dagbok-innlegg-registrering (growing check)
   - Tab-overgang
4. **Komponent-bibliotek** (10–15 atomer + molekyler) med tokens
5. **Tilgjengelighets-check** på alle hovedskjermer (kontrast, fokus, Dynamic
   Type)

## Oppsummert brief til designer

> Lag mockups for en selvhjelpsapp for voksne kokain­brukere som vil
> slutte eller redusere bruken. Appen er anonym, har tre moduler med ulik
> intensitet, og skal møte brukeren med verdighet, ro og varme — ikke
> klinisk, ikke infantilt. Visuelt minimalistisk, nordisk, håndverks­aktig.
> Fokusert på hovedskjermene: onboarding, hjem, dagbok, oversikt,
> kriseplan. Se `03-hap-slik-den-er.md` for hvordan forrige app ser ut —
> vi vil det *stikk motsatte* visuelt, men bevare strukturen.
