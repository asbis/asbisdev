---
title: Bilag 10 — Vilkår for Kundens tilgang og bruk av tredjepartsleveranser
tender: 2026-105336
status: UTKAST — versjons­numre oppdateres ved go-live
---

# Bilag 10 — Vilkår for Kundens tilgang og bruk av tredjepartsleveranser

**Leverandør:** Asbjørn Rørvik (org.nr 820252632)
**Anskaffelse:** 2026-105336 · Selvhjelpsapp for personer som bruker kokain
**Dato:** 24. april 2026

---

## 10.1 Standard­programvare under standard lisens­vilkår

Leveransen inneholder **ingen proprietær standard­programvare** med kostnads­bærende lisensvilkår som overføres til Kunden. Alle tredjeparts­komponenter som inngår i appen eller backend-systemet er tilgjengelig under **åpne lisens­vilkår** (primært MIT, Apache-2.0, BSD eller ISC) som er kompatible med offentlig bruk.

**Plattform-lisenser som Kunden selv tegner med tredjepart** (utenfor denne leveransen):

| Leverandør | Tjeneste | Lisens­form |
|---|---|---|
| Apple | Apple Developer Program + App Store Connect | Årsavgift, standardvilkår iOS Developer Agreement |
| Google | Google Play Console + Play Developer | Engangs­registrering, standardvilkår |
| Kundens valgte skyleverandør (Azure, Digdir Sky eller lignende) | Drift av Strapi-server | Etter Kundens eksisterende rammeavtale |

Disse vilkårene godtas direkte av RUSinfo/Velferdsetaten og er ikke Leverandørens ansvar.

---

## 10.2 Fri programvare i leveransen

Hele app-kodebasen er bygget på åpen kildekode. Under følger fullstendig oversikt over frie komponenter som inngår i leveransen (speilet i appens `package.json` og leveres sammen med kildekoden).

Lisens­tekstene for hver komponent hentes fra komponentens offisielle repository og medfølger i git-repoet under `/licenses/` ved go-live.

### 10.2.1 React Native / Expo-rammeverket

| Komponent | Lisens | Versjon (ved tilbudsdato) | Formål |
|---|---|---|---|
| react | MIT | 19.1.0 | Kjernerammeverk for UI |
| react-native | MIT | 0.81.5 | Native rendring til iOS/Android |
| expo | MIT | 54.0.33 | Verktøy­kjede for bygg/publisering |
| expo-font | MIT | 14.0.11 | Fontlasting |
| expo-haptics | MIT | 15.0.8 | Haptisk respons |
| expo-linear-gradient | MIT | 15.0.8 | Gradient­bakgrunner |
| expo-local-authentication | MIT | 17.0.8 | PIN/biometri (Face ID/Touch ID) |
| expo-splash-screen | MIT | 31.0.13 | Splash-skjerm ved oppstart |
| expo-status-bar | MIT | 3.0.9 | Statuslinje-håndtering |

### 10.2.2 Navigasjon og UI

| Komponent | Lisens | Versjon | Formål |
|---|---|---|---|
| @react-navigation/native | MIT | 7.2.2 | Ruter/navigasjon |
| @react-navigation/native-stack | MIT | 7.14.11 | Stack-navigasjon |
| @react-navigation/bottom-tabs | MIT | 7.15.9 | Tab-navigasjon |
| react-native-safe-area-context | MIT | 5.6.0 | Safe area for notch/hjem-indikator |
| react-native-screens | MIT | 4.16.0 | Native skjerm-containere |
| react-native-svg | MIT | 15.12.1 | SVG-gjengivelse (grafer, ikoner) |
| lucide-react-native | ISC | 1.8.0 | Ikonsett |

### 10.2.3 Lagring og data

| Komponent | Lisens | Versjon | Formål |
|---|---|---|---|
| @react-native-async-storage/async-storage | MIT | 2.2.0 | Lokal, anonym lagring på enheten |
| date-fns | MIT | 4.1.0 | Dato-håndtering med norsk lokalisering |

### 10.2.4 Fonter (Google Fonts)

| Komponent | Lisens | Versjon | Formål |
|---|---|---|---|
| Instrument Serif | SIL Open Font License 1.1 | via @expo-google-fonts/instrument-serif ^0.4.1 | Overskrifts­font |
| Inter | SIL Open Font License 1.1 | via @expo-google-fonts/inter ^0.4.2 | Brødtekst-font |

### 10.2.5 Støtte­biblioteker

| Komponent | Lisens | Versjon | Formål |
|---|---|---|---|
| typescript | Apache-2.0 | 5.9.2 | Typesystem / språk |
| clsx | MIT | 2.1.1 | Conditional CSS-klasser |
| tailwind-merge | MIT | 3.5.0 | Klasse-sammenslåing |

### 10.2.6 Backend (Strapi)

Backend-serveren bygges på **Strapi** (MIT-lisens, selv-hostet av Kunden). Tilhørende driftskomponenter:

| Komponent | Lisens | Formål |
|---|---|---|
| strapi | MIT | Headless CMS for innholds­administrasjon |
| node.js | MIT | Kjøretidsmiljø |
| postgresql | PostgreSQL License (permissive, BSD-lignende) | Database |
| nginx | BSD 2-clause | Reverse proxy og IP-stripping |

### 10.2.7 Eventuelle on-device oversettelses­modeller

| Komponent | Lisens | Formål |
|---|---|---|
| Apple Translation Framework (iOS 17.4+) | Del av iOS, Apple Developer-vilkår | On-device oversettelse (primær iOS) |
| Google ML Kit Translation API | Apache-2.0 (ML Kit-SDK); plattform-del av Google Play Services | On-device oversettelse (primær Android) |
| Helsinki-NLP MarianMT (fallback) | MIT | Kryssplattform on-device oversettelse |
| ONNX Runtime (fallback) | MIT | Kjøremotor for ML-modellen |

Kun én av disse tas i bruk i produksjon; de øvrige listes for fullstendighet.

---

## 10.3 Konsolidert lisens­oversikt

| Lisens­type | Antall komponenter | Kompatibilitet med offentlig bruk | Kjernevilkår |
|---|---|---|---|
| MIT | 20+ | Ja | Attribusjon, ingen ansvar, fri kommersiell bruk |
| Apache-2.0 | 3 | Ja | Attribusjon, patentklausul, ingen ansvar |
| BSD (2/3-clause) | 2 | Ja | Attribusjon, ingen ansvar |
| ISC | 1 | Ja | Kortfattet MIT-lignende |
| SIL Open Font License 1.1 | 2 | Ja | Kan brukes fritt, inkludert kommersielt |
| PostgreSQL License | 1 | Ja | BSD-lignende permissivitet |

Ingen komponenter bruker **copyleft-lisenser (GPL/LGPL/AGPL)** eller lisenser som kan smitte Kundens egenutviklede kode. Kunden kan derfor holde kildekoden lukket dersom ønskelig, eller åpne den under egenvalgt lisens (jf. Bilag 1 krav 4.1.8).

---

## 10.4 Vedlikeholds- og forpliktelses­vilkår

For hver tredjeparts­komponent gjelder komponentens egen lisens. Leverandør forplikter seg til:

- **Kontinuerlig oppdatering** av avhengigheter i vedlikeholds­perioden (jf. Bilag 1 krav 4.1.2)
- **Sikkerhets­overvåkning** (Dependabot eller tilsvarende) med automatisk varsling ved CVE-funn
- **Dokumentasjon av lisens­oversikten** versjoneres i git og oppdateres ved hver release. En ferskt generert `THIRD_PARTY_LICENSES.md` følger alltid med siste godkjente bygg.
- **Ingen introduksjon** av komponenter med inkompatible lisenser uten skriftlig forhåndsgodkjenning fra Kunden.

---

## 10.5 Lisens­tekster

Fullstendige lisens­tekster for alle komponenter medfølger i kildekode-repositoryet under `/licenses/` ved leveringsdag. Lisenstekstene ligger også som vedlegg til dette bilaget ved endelig kontrakts­signering (automatisk generert via `license-checker`).

For lesbarhet er standardiserte lisens­tekster (MIT, Apache-2.0, BSD, ISC) ikke duplisert her — de er universelle og tilgjengelige via komponentens offisielle repo. På anmodning fra Kunden leveres de som samlet PDF.

---

*Dokumentet oppdateres med eksakte versjons­numre på leveringsdag. Ved tilbudsdato er versjonene oppgitt over hentet fra fungerende prototype-bygg.*
