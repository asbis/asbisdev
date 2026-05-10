---
title: Tilbudsbrev
tender: 2026-107028
oppdragsgiver: Antidoping Norge (ADNO)
status: UTKAST — kopieres inn i Vedlegg 1 ved signering, eller leveres som separat PDF
---

# Tilbud — Utvikling av antidoping-app

**Til:** Antidoping Norge (ADNO)
**Sak:** Doffin 2026-107028 — Utvikling av antidoping-app
**Fra:** Asbjørn Rørvik (org.nr 820 252 632)
**Dato:** 11. mai 2026
**Tilbudet gjelder fram til:** 31. august 2026 (vedståelses­frist jf. konkurranse­grunnlaget pkt. 2.5)

---

Kjære Antidoping Norge,

Jeg leverer herved bindende tilbud på utvikling, publisering og vedlikehold av antidoping-appen, i tråd med SSA-O og Bilag 1–7 i konkurransedokumentene.

## Min forståelse av oppdraget

ADNO skal samle dagens spredte verktøy — Ren Utøver (e-læring), Felleskatalogen-søk, ADNOs norske dopingliste, medisinsk fritak, kosttilskudd, astmakalkulator, varsling og kontakt — i én app som utøvere kan bruke i lomma, på trening, i bilen, på reise. Bilag 1 § 6 er klar: «Grafikken skal være enkel. Minimal bruk av tekst og all funksjonalitet skal være tilgjengelig fra en hovedside.» Det utelukker fem under­menyer og krever et hardt kuratert hovedsidedesign.

Jeg har lest alle tre versjoner av Q&A-dokumentet (22.04, 24.04 og 06.05.2026) og innarbeidet samtlige 18 svar i tilbudet — særlig at appen skal oppleves **som app, ikke webapp** (Sp.12, der webapp vektes lavere), at den ikke skal ha pålogging og ingen TASK-integrasjon (Sp.5), at dopinglista er den **norske** versjonen fra antidoping.no (Sp.4 — justert i v3), at ADNO eier utviklerkontoene (Sp.7), at varslingskanalen leveres av EQS (Sp.8), at lagring av kontaktdata er valgfri og varselvolumet er moderat (8–12/år, Sp.16), at meldinger er toveis i appen og Unifon er ADNOs SMS-gateway (Sp.17), at leverandør etablerer backend og at ADNO i dag bruker Microsoft skytjenester (Sp.18), og at engelsk språkstøtte er ønsket i tillegg til norsk (Sp.10).

**Pris:** Fastpris 1 600 000 NOK inkl. mva., maksimal ramme 1 800 000 NOK inkl. mva. (jf. Sp.1).

Jeg har bygget en **klikkbar prototype** som viser hvordan appen vil se ut og oppføres for utøveren — onboarding, 3×3 ikongrid, kosttilskudd-risikoscore i grønt/gult/rødt, legemiddelsøk, dopingliste-oppslag, astmakalkulator, varslings­strøm og kontakt. Dere kan klikke gjennom alt før dere velger leverandør.

**Prototype:**
- URL: https://asbjornrorvik.dev/no/oppdrag/antidoping-app
- Passord: `antidoping2026`

## Om meg

Jeg er Asbjørn Rørvik, senior fullstack-utvikler med 8+ års produksjons­erfaring og egen virksomhet i Stavanger. Jeg har spesialisert meg på native mobilapper og helhetlige løsninger for krevende målgrupper — fra offshore­kritiske Equinor-apper til Kolumbus-appen (vinner av Nordic Public Transport Design Award 2025, 142 000+ månedlige brukere), HMS-appen TryggDrift for Norsk Landbruks­rådgiving og betalings­modulen i EaseePay for Easee (PCI DSS, Adyen). I tillegg driver jeg Supportify, en AI-basert kundesupport­tjeneste for Shopify som i dag betjener 100+ butikker — bygget og driftet alene fra kode til kunde­kontakt.

ADNOs drift er uavhengig av min tilgjengelighet: kildekoden, innhold og hemmeligheter ligger hos ADNO fra dag 1, og enhver React Native-utvikler kan ta over på grunnlag av `SETUP.md` og `CONTRIBUTING.md` i repoet. For universell utforming engasjeres etablert ekstern aktør (Funka Nu eller MediaLT) for uavhengig UU-revisjon før publisering; endelig valg avtales med ADNO i prosjektets oppstart.

## Hvordan jeg vil levere

- **Teknologi:** React Native (0.74+) med TypeScript — felles kodebase iOS + Android, ekte native UI som oppleves som app (jf. ADNOs preferanse i Sp.12). Backend i Node.js (NestJS) på Azure. App-spesifikt innhold (kosttilskudd-spørsmål, astmakalkulator-doser, push-meldinger) forvaltes i et lett admin-panel; redaksjonelt hovedinnhold hentes der det er naturlig fra ADNOs eksisterende Craft CMS levert av Feed (Sp.6).
- **Integrasjoner:** Felleskatalogen-API via ADNOs eksisterende avtale — leverandør trenger ingen egen avtale (Sp.3), ADNOs norske dopingliste fra antidoping.no/Crafts API (Sp.4), Ren Utøver som portal-lenke uten API-/SSO-integrasjon (Sp.5), EQS Compliance Cockpit som lenke for dopingvarsel (Sp.8), Firebase Cloud Messaging + APNs for push-varsler, Unifon som SMS-gateway når SMS er nødvendig (Sp.17), Sentry for feil­rapportering. **Ingen pålogging i appen.** Backend driftes på Azure — match med ADNOs eksisterende Microsoft-skyplattform (Sp.18). For astmakalkulatoren ber jeg om utlevering av eksisterende kildekode ved kontraktssignering (ADNO eier koden, jf. Sp.15) for å gjenbruke logikk og dose­tabeller.
- **Språk:** norsk (bokmål) og engelsk inkludert i fastpris (Sp.10) — i18n-arkitektur fra første kommit.
- **Framdrift:** inntil 6 måneder fra kontrakts­signering til live i App Store og Google Play (jf. Sp.13). Pilot/akseptansetest underveis. Demo til ADNO annenhver uke. Se Bilag 2 og Bilag 4 for detaljert plan.
- **Personvern:** DPIA gjennomføres ved oppstart i samråd med ADNOs DPO (Sp.11), minimal data­innsamling, alt i EU/EØS, sertifikat-pinning.
- **Eierskap fra dag 1:** kildekoden commites direkte til ADNOs git-repo. Dere eier alt — jeg har kun committer-tilgang under prosjektet. Apple Developer Program og Google Play Console eies også av ADNO (Sp.7); jeg får tilgang for utvikling og publisering.
- **Universell utforming:** WCAG 2.2 AA implementert fra første kommit, med innkjøpt ekstern UU-revisjon (Funka Nu eller MediaLT) før publisering. UU-revisjonen er priset inn i fastpris.
- **Vedlikehold og garanti:** 12 måneders garantiperiode med feilretting og mindre justeringer (avgrenset omfang jf. Sp.13/14). Konkret SLA: kritiske feil < 4 timer. Etter garanti: 1 450 NOK/t eks. mva, 3 mnd. oppsigelse. Drift inngår ikke i fastprisen — tegnes separat hvis ønsket.

## Avvik fra konkurransedokumentene

Ingen avvik. Vedlegg 3 er signert «ingen avvik eller forbehold».

## Vedlagte dokumenter

1. Dette tilbudsbrevet (signert)
2. Vedlegg 1 — Tilbudsskjema (signert)
3. Vedlegg 3 — Avvik og forbehold (ingen avvik)
4. Vedlegg 4 — Leverandørens gjennomføringsevne
5. Vedlegg 5 — Referansebeskrivelser (TryggDrift, Kolumbus, EaseePay)
6. SSA-O Bilag (utfylt — Konsulentens spesifikasjon, nøkkelressurser, pris)
7. Bilag 2 — Konsulentens spesifikasjon (lesbar PDF)
8. CV — Asbjørn Rørvik
9. KS- og informasjons­sikkerhets­system
10. Skatte­attest, firma­attest, egenerklæring finansiell kapasitet med næringsinntekt fra skattemelding 2024–2025
11. Prototype (lenke + passord over)

## Kontakt

Asbjørn Rørvik
E-post: hei@asbjornrorvik.dev
Telefon: +47 47 65 86 51
Nettside: asbjornrorvik.dev
Org.nr: 820 252 632

Jeg ser fram til å høre fra dere, og står til disposisjon for avklaringer i evaluerings­fasen.

Med vennlig hilsen

Asbjørn Rørvik
Org.nr 820 252 632
Sandnes, 11. mai 2026

*Signert elektronisk via Mercell med BankID — se signaturlogg i Mercell-portalen.*
