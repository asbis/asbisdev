---
title: Bilag 7 — Prisskjema (forslag til utfylling)
tender: 2026-105336
status: UTKAST — tall må godkjennes av Leverandør før utfylling i Excel
---

# Bilag 7 — Prisforslag

Alle priser i NOK **ekskl. mva**. Excel-malen `03.2 DEL 2 SSA-T PRISSKJEMA Vedlegg 1 til bilag 7.xlsx` fylles ut i gule felter. Dette dokumentet forklarer tallene og evaluerings­summen.

---

## 1. Hovedoppdraget (engangs­kostnad)

| Ref. | Rad i Excel | Post | Enhet | Antall | **Enhetspris** | Evaluerings­pris |
|---|---|---|---|---|---|---|
| 1.1 | Rad 11 | Utvikling, design, testing, prosjekt­ledelse, publisering i App Store + Google Play, ekstern UU-revisjon, alle M- og B-krav i Bilag 1 | Engangs­kostnad | 1 | **650 000** | 650 000 |

**Bakgrunn:**
- Estimert innsats: ~410 t fra Bilag 4 × 1 400 NOK/t = 574 000
- UU-underleverandør (Funka Nu / MediaLT): ~50 000
- Buffer for review-rundene i app-butikkene + uforutsett: ~25 000
- **Sum: 650 000**

Fastpris, inkluderer også kjøp av fri kildekode (krav 4.1.8 — leveres som åpen/kundeeid).

---

## 2. Vedlikeholds­avtale

| Ref. | Rad | Post | Enhet | Antall | **Enhetspris** | Evaluerings­pris |
|---|---|---|---|---|---|---|
| 2.1 | Rad 15 | Drift, feilretting, plattform­oppdateringer, Strapi-server, sikkerhets­patches, 24t respons­tid | Pr. år | 10 | **120 000** | 1 200 000 |

**Bakgrunn:**
- Estimert ~10 t/måned = 120 t/år drift + feilretting
- Timepris intern­kalkulasjon: 1 000 NOK/t (lavere enn konsulent­pris fordi det er forutsigbart volum)
- Inkluderer én årlig plattform-oppgradering (iOS + Android SDK), ikke video­reutvikling av nye funksjoner
- Forutsetter at Strapi-host (Azure eller tilsvarende) faktureres direkte til RUSinfo (estimat 800 NOK/mnd — ikke del av denne posten)

---

## 3. Timepriser (ytterligere utvikling etter leveringsdag)

| Ref. | Rad | Post | Enhet | Antall | **Enhetspris** | Evaluerings­pris |
|---|---|---|---|---|---|---|
| 6.1 | Rad 19 | Junior konsulent (0–5 år) | Pr. time | 20 | **1 100** | 22 000 |
| 6.2 | Rad 20 | Senior konsulent (>5 år) | Pr. time | 10 | **1 400** | 14 000 |

**Bakgrunn:**
- Senior­prisen 1 400 er markedsmessig for en solo-leverandør med 8+ års erfaring (marked 1 400–2 000)
- Junior­pris 1 100 brukes dersom backup-utvikler (yngre) tas inn for oppgaver som ikke krever seniorkompetanse
- Prisene gjelder endrings­arbeid og videre­utvikling etter leveringsdag
- Årlig indeksregulering tillatt jf. SSA-T (f.eks. SSB konsulent­indeks)

---

## 4. Opplæring

| Ref. | Rad | Post | Enhet | Antall | **Enhetspris** | Evaluerings­pris |
|---|---|---|---|---|---|---|
| 4.1 | Rad 24 (oppl.) | Workshop + skriftlig admin-manual + teknisk bistand­pakke | Engangs­kostnad | 1 | **15 000** | 15 000 |

**Bakgrunn:**
- 4 timers workshop (Teams eller fysisk i Oslo)
- Skriftlig admin-manual (PDF + Markdown)
- 2 timers oppfølgings­samtale ved behov innen 30 dager etter leveringsdag

---

## 5. Sum evalueringspris (10 års evaluerings­horisont)

| Post | Beløp |
|---|---|
| 1.1 Hovedoppdrag | 650 000 |
| 2.1 Vedlikehold × 10 år | 1 200 000 |
| 6.1 Junior × 20 t | 22 000 |
| 6.2 Senior × 10 t | 14 000 |
| 4.1 Opplæring | 15 000 |
| **Samlet evaluerings­pris** | **1 901 000** |

---

## 6. Øvrig sortiment (frivillig, inngår ikke i prissammenligning)

Foreslåtte tilleggs­tjenester som RUSinfo kan bestille etter behov:

| Post | Beskrivelse | Enhet | Pris |
|---|---|---|---|
| Ø1 | Strapi-hosting (hvis RUSinfo ønsker at Leverandør drifter) | Pr. mnd | 1 500 |
| Ø2 | Ekstra bildesett til bildebibliotek (kurator + 20 bilder) | Engangs | 25 000 |
| Ø3 | Ny språk­versjon (nynorsk eller engelsk) inkl. Strapi-oppsett | Engangs | 45 000 |
| Ø4 | Widget eller App Clip (iOS) for rask krise­tilgang | Engangs | 35 000 |
| Ø5 | Ekstra oppfølgings­workshop | Pr. gang | 8 000 |
| Ø6 | Bistand ved DPIA / risiko­vurdering hvis personopplysninger senere introduseres | Pr. time | 1 400 |

---

## 7. Vurderinger før innsending

**Kontroll­spørsmål å avklare før tall fylles inn i Excel:**

1. **Er 650 000 for hovedoppdraget realistisk for deg?** 410 timer over 16 uker ≈ 25 t/uke. Hvis du har begrenset kapasitet pga. Netpower eller Supportify, må timeantall opp og prisen opp tilsvarende.
2. **Tåler du 10 t/mnd vedlikehold over 10 år?** 120 000/år er fornuftig for solo, men det binder deg i en lang horisont. Legg gjerne til oppsigelses­klausul.
3. **UU-pris** (50k) — bekreft med Funka Nu eller MediaLT før endelig pris.
4. **Taktisk prising er forbudt** (kravspec §5.2.1). Priser må være gjennomtenkte. Vi har lagt oss på realistiske marked­priser — ingen kunstig lav fastpris som kompenseres med høye timepriser.

**Konkurranse­vurdering:**
- Store byråer priser hovedoppdrag på 1,2–2,5M + vedlikehold 300–500k/år = 4–7M eval­pris
- Mindre konsulent­hus: 800k–1,5M hovedoppdrag + 150–250k/år = 2,3–4M eval­pris
- Vårt tilbud på 1,9M ligger **lavest i feltet uten å være urealistisk** — dette er en solid vinner­posisjon på pris (30 % av evalueringen) uten å utløse mistanke om taktisk prising.

---

## 8. Sjekkliste for utfylling i Excel

Åpne `03.2 DEL 2 SSA-T PRISSKJEMA Vedlegg 1 til bilag 7.xlsx` og fyll gule felter:

- [ ] **Rad 11 (1.1 Hovedoppdrag):** F11 = beskrivelse (se under), G11 = **650 000**
- [ ] **Rad 15 (2.1 Vedlikehold):** F15 = beskrivelse, G15 = **120 000**
- [ ] **Rad 19 (6.1 Junior):** F19 = "Backup-utvikler m/3–5 års RN-erfaring", G19 = **1 100**
- [ ] **Rad 20 (6.2 Senior):** F20 = "Asbjørn Rørvik, 8+ års fullstack / RN-erfaring", G20 = **1 400**
- [ ] **Rad 24 (Opplæring):** F24 = beskrivelse, G24 = **15 000**
- [ ] Øvrig sortiment-arkfane: legg inn punkt Ø1–Ø6 fra §6 over
- [ ] Verifiser at summene i H-kolonnen regnes riktig (formel skal være `=G*E`)
- [ ] Lagre som `.xlsx` og last opp i KGV

**Forslag til beskrivelse F11 (Hovedoppdrag):**
> "Utvikling av selvhjelpsapp for iOS og Android i React Native + TypeScript. Inkluderer design, utvikling, testing (unit, e2e, manuell), intern og ekstern UU-revisjon (Funka Nu eller MediaLT), Strapi-backend, CI/CD, publisering i App Store og Google Play under Kundens kontoer, sluttbruker- og admin-manualer, samt personvern­vurdering. Kildekoden overføres til Kunden fra dag 1 via felles git-repo. Fastpris, inkluderer alt frem til leveringsdag."

**Forslag til beskrivelse F15 (Vedlikehold):**
> "Løpende drift og vedlikehold: feilretting, sikkerhets­oppdateringer, plattform-oppgraderinger (årlig iOS/Android SDK), Strapi-patching, overvåkning, backup-kontroll, feilmottak via app og e-post. Respons­tid 24 timer på virkedager. Inkluderer ikke videre­utvikling av nye funksjoner (prises etter timepris 6.1/6.2)."

---

*Dokumentet er et internt arbeidsdokument — Excel-filen er den som leveres i KGV.*
