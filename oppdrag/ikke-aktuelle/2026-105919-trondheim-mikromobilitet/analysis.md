---
tender: 2026-105919
title: Trondheim mikromobilitet — vurdering
status: Tier 2 — betinget no-go
deadline: 2026-05-04 16:00
questionsDeadline: 2026-04-28 12:00
budget: 1.2M NOK
contract: SSA-L (leie/lisens av hylleprodukt)
---

# Trondheim mikromobilitet — vurdering

## TL;DR

**Betinget no-go.** SSA-L-kontrakten gjør dette til en lisensierings­konkurranse,
ikke et utviklings­oppdrag. Etablerte internasjonale SaaS-plattformer (Populus,
Vianova, Ride Report, Fluctuo) er bygget spesifikt for dette og har vunnet
tilsvarende anbud i Oslo, København, Paris, London. Å konkurrere som norsk
enmannsshop med å bygge noe nytt på 2 uker er urealistisk — og kjøper vil
uansett trolig vekte produktmodenhet høyere enn pris.

**Unntak:** Hvis vi kan vinkle det som *"jeg integrerer/tilpasser åpen-kildekode-
plattformen (f.eks. Open Mobility Foundation-standarden) for Trondheims
spesifikke forskrift"*, er det en åpning — men det krever mye research og hjelp
fra kunden på hva som *faktisk* trengs. Med 12 dager til frist er det ikke
rom for den dialogen.

## Kunden og oppdraget

**Trondheim kommune** regulerer utleie av små elektriske kjøretøy (elsparke­sykler)
i henhold til egen lokal forskrift. I 2025–2026-sesongen har tre operatører
tillatelse: **Tier-Dott, Voi og Ryde**.

De ønsker et skybasert verktøy (SaaS) for:
- **Regulering** — sette soner, hastighetsgrenser, parkerings­restriksjoner
- **Analyse** — aggregere GBFS/MDS-data fra alle operatørene
- **Overvåking** — håndheve regel­etterlevelse, fakturere overtredelser

Avtale­periode: 1. juni 2026 – 31. mai 2028 + 1 + 1 år opsjon. **Det forteller
at de vil ha en stabil partner, ikke noen som skal bygge fra scratch.**

## Konkurransen (markedet)

Dette er et etablert SaaS-segment med 5–10 seriøse aktører internasjonalt:

| Leverandør | Kjente kunder | Styrke |
|---|---|---|
| **Populus** (US) | Washington DC, Austin, Bogotá | Markedsledende, full MDS-suite |
| **Vianova** (FR) | Paris, Milano, Berlin, Oslo (antatt) | EU-fokus, GDPR-ready |
| **Ride Report** (US) | Portland, Chicago | Fokus på data-analyse |
| **Fluctuo** (FR) | Paris, Madrid | Europeisk, enkelt UI |
| **Lime Aware / Voi City** | Egne produkter | Operatør­verktøy, litt inhabilt |

**Alle** disse har produkt klart, referanse­kunder, GDPR-dokumentasjon, og
MDS 2.x/GBFS 3.x-implementasjon. Noen er gratis for kommuner fordi de selger
data tilbake til operatørene.

## Hvorfor SSA-L er et rødt flagg for oss

SSA-L = **Statens standardavtale for løpende tjenestekjøp (lisens/leie)**.
Brukes når kjøper betaler for å *bruke* et produkt som leverandøren allerede
har laget, ikke for at leverandøren skal bygge noe nytt. Du kan ikke by inn
"jeg skal bygge dette" under SSA-L uten at det blir merkelig.

Kontrasten til Antidoping-anbudet er lærerik: **SSA-O** (utvikling) vs **SSA-L**
(lisens) signaliserer kjøpers forventning helt tydelig.

## Hva ville vi trengt for å vinne?

For å være troverdig tilbyder her måtte vi ha:
1. Et **eksisterende produkt** i drift, eller minst en demo-versjon som
   snakker GBFS/MDS
2. **Minimum én referanse­kunde** i en sammenlignbar kommune
3. **Dokumentert skala** — håndtert X datapunkter / dag
4. **GDPR/DPIA ferdig** for typen data operatørene sender
5. **SOC2 eller ISO 27001** — kommuner spør stadig oftere

Ingenting av dette finnes i dag. Å bygge det på 2 uker er umulig. Å bygge det
på 2 år er en prosjekt­risiko som kjøper ikke vil ta.

## Alternativ vinkel — hvis vi *virkelig* vil prøve

**Bli subkontraktør til en av de etablerte leverandørene.** Populus og Vianova
leter jevnlig etter lokale implementasjons­partnere. Din domene­erfaring fra
Kolumbus (mobilitet, Nordic PT Design Award) er faktisk en relevant referanse.

Konkret:
1. Kontakt salgs­kontakt hos Vianova og Populus **denne uken**.
2. Tilby lokal Norge-implementasjon og forskrifts­tilpasning på deres plattform.
3. De får norsk bakkepartner, du får en timepris-kontrakt uten å eie produktet.

Det er ikke 1.2M-avtalen her, men det er en åpning til løpende arbeid med
alle norske kommuner som skal kjøpe tilsvarende de neste årene (Oslo, Bergen,
Stavanger, Drammen står for tur).

## Beslutning

**Ikke send tilbud som hovedleverandør.** Bruk heller de 2 ukene på
Antidoping-appen, som er en reell vinnersjanse.

Hvis du vil, kan vi i løpet av neste uke:
- Sende en kort e-post til Pål Øyvind Solbu (Trondheim kommune) og spørre om de
  har vurdert åpen-kildekode-løsninger og om nyutvikling er innenfor scope.
  Svaret er sannsynligvis "nei" — men hvis det er "ja" åpnes et helt annet
  spor.
- Kontakte Populus/Vianova om partner­skap.

## Læring for fremtiden

Fremover — når vi ser SSA-L + SaaS + spesifikt domene (CRM, parkering,
fleet, booking, osv.) → det er nesten alltid hylleprodukt-anbud. Hopp over
dem med mindre vi *er* hyllproduktet.

**SSA-O + utvikling + scope er kundens problem­beskrivelse** → det er vår bane.
