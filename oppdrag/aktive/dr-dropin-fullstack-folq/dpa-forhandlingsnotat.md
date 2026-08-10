# Forslag til endringer – Databehandleravtale (Dr.Dropin BHT AS)

**Fra:** Console Holding AS, org.nr 936 680 259 (Databehandler)
**Til:** Dr.Dropin BHT AS v/ Nora Huseby (CSO)
**Dato:** 15.05.2026
**Gjelder:** Databehandleravtale (revidert utkast datert 15.05.2026)

Jeg stiller meg bak avtalen i all hovedsak og ønsker å komme raskt i gang. Jeg
ber om følgende justeringer før signering. Endringene er ment å være balanserte –
de reflekterer at oppdraget utføres av en enkelt spesialist, og at vi i
fellesskap kan redusere risiko gjennom hvordan løsningen bygges, ikke bare
gjennom avtaletekst.

---

## 1. Bilag 1 – databehandler arbeider mot syntetiske/anonymiserte data (NYTT, hovedpunkt)

**Bakgrunn:** Plattformen bygges fra bunnen. Den største enkeltrisikoen for begge
parter er om utvikler i det hele tatt eksponeres for reelle person- og
helseopplysninger. Jeg ønsker å designe løsningen slik at dette unngås.

**Foreslått tillegg til Bilag 1 (nytt avsnitt under "Behandlingens art"):**

> Databehandler skal som hovedregel ikke ha tilgang til reelle person- eller
> helseopplysninger. Utvikling, test og feilsøking skal skje mot anonymiserte
> eller syntetiske data. Dersom tilgang til produksjonsdata unntaksvis er
> nødvendig for feilsøking, skal dette skje etter forhåndsavtale, være
> tidsbegrenset, logget, og begrenset til det minimum som er nødvendig.

*Effekt: reduserer reell risiko for brudd dramatisk for begge parter.*

---

## 2. Punkt 12 – Ansvar (viktigst)

**Slik det står:** Objektivt ansvar for ethvert direkte tap; ansvar for indirekte
tap ved grov uaktsomhet/forsett; ubegrenset skadesløsholdelse for krav fra
registrerte og overtredelsesgebyrer/bøter. Ingen ansvarsbegrensning.

**Foreslått ny ordlyd (siste del av punkt 12 erstattes):**

> Databehandlerens samlede ansvar etter denne Avtalen er begrenset til
> NOK 3 000 000 per hendelse og samlet per år, med mindre tapet skyldes
> Databehandlerens forsett eller grove uaktsomhet.
>
> Databehandlerens ansvar for indirekte tap er begrenset til tilfeller av
> forsett eller grov uaktsomhet.
>
> Databehandlerens plikt til å holde Behandlingsansvarlig skadesløs for
> overtredelsesgebyr og bøter gjelder kun i den utstrekning gebyret/boten
> skyldes Databehandlerens forsettlige eller grovt uaktsomme brudd, og er
> omfattet av ansvarsbegrensningen ovenfor.

*Begrunnelse: et fullstendig ubegrenset ansvar (inkl. GDPR-bøter) er ikke
forsikringsbart og står ikke i forhold til et oppdrag av denne størrelsen.
Taket på NOK 3 000 000 er satt for å samsvare med Databehandlerens
profesjonsansvarsforsikring (formueansvar) via Folq/Storebrand. Ansvarstak og
skyldkrav er markedsstandard for databehandleravtaler med mindre leverandører.*

---

## 3. Punkt 6 – Bistand "for egen regning"

**Slik det står:** Ubegrenset, ukompensert bistand ved innsynskrav, henvendelser
fra registrerte/tilsynsmyndigheter mv.

**Foreslått tillegg til punkt 6:**

> Bistand etter dette punkt 6 ytes uten kostnad for Behandlingsansvarlig i
> rimelig omfang. Bistand utover 4 timer per hendelse faktureres etter
> Databehandlerens ordinære timesats i henhold til Oppdragsavtalen.

*Begrunnelse: standard rutinemessig bistand er greit å ta, men omfattende
saksbehandling bør kunne kompenseres.*

---

## 4. Punkt 4.2 – Varslingsfrist ved brudd

**Status:** Jeg beholder 24-timersfristen slik den står. Ingen endring ønsket.

---

## 5. Punkt 9/10 – Varighet og opphør ved overlevering (NYTT)

**Bakgrunn:** Oppdraget er en avgrenset MVP-leveranse. Etter overlevering har
Databehandler verken tilgang til, mulighet til å endre, eller faktisk befatning
med personopplysninger. Avtalen bør reflektere dette.

**Foreslått tillegg til punkt 9:**

> Databehandlerens forpliktelser og ansvar etter denne Avtalen opphører ved
> levering og Behandlingsansvarliges aksept av leveransen under Oppdragsavtalen,
> i den utstrekning Databehandler fra dette tidspunkt ikke lenger behandler
> personopplysninger eller har tilgang til Behandlingsansvarliges systemer eller
> data. Databehandler er ikke ansvarlig for behandling, drift, endringer eller
> sikkerhet etter dette tidspunktet, da dette overtas i sin helhet av
> Behandlingsansvarlig.

*Begrunnelse: Databehandler kan ikke bære ansvar for et system han ikke lenger
har tilgang til eller kontroll over etter overlevering.*

---

## 6. Avtalepart / Folq-rammeverk (avklaring før signering)

Oppdraget utføres via Folq, der Oppdragsavtalen er et tillegg til
Samarbeidsavtalen mellom partenes selskaper og Folq. Jeg ber om avklaring av om
denne databehandleravtalen skal:

(a) inngås direkte mellom Dr.Dropin BHT AS og Console Holding AS, eller
(b) håndteres gjennom Folqs rammeverk / Folqs standard databehandleravtale.

Dette bør avklares med Folq før signering, slik at riktig juridisk part står
som Databehandler.

---

## 7. Punkt 8 / Bilag 2 – Underdatabehandlere (avklaring, ikke konflikt)

Bilag 2 mangler. Jeg ønsker å få forhåndsgodkjent min tekniske verktøykjede før
prod-data eksisterer. Foreslått liste til Bilag 2 (oppdateres ved behov):

- Skyhosting / drift: [f.eks. Vercel / AWS – region innenfor EØS]
- Kildekode/CI: [f.eks. GitHub]
- Feilovervåking/logging: [f.eks. Sentry – EU-region]
- [Evt. AI-/kodeverktøy som ikke eksponeres for persondata]

*Merk: med syntetiske data (punkt 1) eksponeres ingen av disse for reelle
personopplysninger, noe som forenkler godkjenningen.*

---

## 8. Mindre / formelt

- Datoer er rettet til 15.05.2026 i revidert utkast (tidligere inkonsistens
  mellom avtaletekst og signaturfelt).
- Databehandler signerer som **selskap** (Console Holding AS), ikke privatperson.
- Jeg ber om å motta Oppdragsavtalen for min dokumentasjon, da DPA-en viser
  tilbake til denne for omfang og kompensasjon.

---

*Jeg ser frem til et godt samarbeid og er fleksibel på formuleringene så lenge
ansvarsbegrensning (punkt 2) og prinsippet om syntetiske data (punkt 1) ivaretas.*
