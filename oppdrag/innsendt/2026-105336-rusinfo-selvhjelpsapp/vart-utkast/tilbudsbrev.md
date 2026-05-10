---
title: Tilbudsbrev
tender: 2026-105336
status: UTKAST — limes inn i kundens mal (Vedlegg 3)
---

# Tilbud — Utvikling av selvhjelpsapp for personer som bruker kokain

**Til:** Oslo kommune, Velferdsetaten / RUSinfo
**Sak:** 2026-105336
**Fra:** Asbjørn Rørvik (org.nr 820252632)
**Dato:** 24. april 2026
**Tilbudet gjelder fram til:** 27. juli 2026 (3 måneders vedståelses­frist jf. konkurranse­grunnlaget pkt. 3.4)

---

Kjære RUSinfo,

Jeg leverer herved bindende tilbud på utvikling, publisering og vedlikehold av selvhjelps­appen for personer som bruker kokain, i tråd med SSA-T og Bilag 1–10.

## Om meg

Jeg er Asbjørn Rørvik, senior fullstack-utvikler med 8+ års produksjons­erfaring og egen virksomhet i Stavanger. Jeg har spesialisert meg på mobilapper og helhetlige løsninger for krevende målgrupper — fra offshore­kritiske Equinor-apper til kollektiv­appen for Kolumbus (prisvinnende design, Nordic Public Transport Design Award 2025) og selvhjelps­verktøyet TryggDrift for NLR. I tillegg driver jeg selv Supportify, en AI-basert kundesupport­tjeneste for Shopify som i dag betjener 100+ betalende butikker — bygget og driftet alene fra kode til kundekontakt.

Kundens drift er uavhengig av min tilgjengelighet: kildekoden, innhold og hemmeligheter ligger hos RUSinfo fra dag 1, og enhver React Native-utvikler kan ta over på grunnlag av `SETUP.md` og `CONTRIBUTING.md` i repoet. Prototypen er allerede bygget og fjerner oppstartsrisiko. For universell utforming engasjeres etablert ekstern aktør (f.eks. Funka Nu eller MediaLT) for uavhengig UU-revisjon før publisering; endelig valg av revisor avtales sammen med RUSinfo i prosjektets oppstart.

## Min forståelse av oppdraget

Dere skal gi personer i en sårbar fase et verktøy som er trygt, respektfullt og lett tilgjengelig — ikke en klinisk app, ikke en reklame­app, men noe som føles som deres eget rom. Tre moduler med ulike løp gjenspeiler at folk kommer til problemet fra ulike kanter. Krise­knappen, personvernet og den rolige visuelle tonen må være konsekvent gjennom hele produktet.

Jeg har lest kildekoden til HAP og forstått arkitekturen. Jeg har også bygget en fungerende prototype av den nye appen som viser onboarding, dagbok med triggerlogg, statistikk, krise­plan med pust-øvelse, motivasjons­vegg, kartleggings­kalender og palett-/grayscale-tema.

**Dere kan prøve prototypen direkte i nettleseren:**
- URL: https://asbjornrorvik.dev/no/oppdrag/rusinfo-app
- Passord: `rusinfo2026`

Prototypen vises i en iPhone-ramme på desktop og som fullskjerm på mobil. Alle hovedflyter fungerer end-to-end med lokal lagring — onboarding, PIN-lås, dagboksinnlegg, krise­planen og navigasjon mellom alle skjermer. Den er bevis på at jeg har satt meg grundig inn i oppgaven før jeg leverte tilbud.

## Hvordan jeg vil levere

- **Teknologi:** React Native med TypeScript (felles kodebase, native UI, 10+ år etablert). Samme backend-modell som HAP — et selv-hostet headless CMS (Strapi) som RUSinfo selv administrerer.
- **Framdrift:** 16 uker fra kontrakts­signering til live i App Store og Google Play. Demo til RUSinfo annenhver uke gjennom hele prosjektet. Se Bilag 4 for detaljert plan.
- **Personvern som grunnstein:** løsningen behandler *ingen* personopplysninger. Ingen konto, ingen IP-logg, ingen tredjeparts analytics. All bruker­data lagres kun på telefonen.
- **Eierskap fra dag 1:** kildekoden commites direkte til RUSinfos git-repo. Dere eier alt — jeg har kun committer-tilgang under prosjektet.
- **Universell utforming:** WCAG 2.1 AA, ekstern revisjon av Funka Nu eller MediaLT før publisering.
- **Vedlikehold:** 3 år + auto-fornyelse, 24 timers respons­tid på virkedager (bedre enn etterspurt 48 t).

## Avvik fra kravspesifikasjonen

Jeg tilbyr en **alternativ løsning** på krav 4.2.1 og 4.2.3: **React Native i stedet for Ionic 7 + Vue 3** (som HAP bruker). Applikasjonens *struktur, informasjons­arkitektur, skjermhierarki, backend-modell og data­modell* er speilet 1:1 med HAP — RUSinfo får samme admin-opplevelse og kan gjenbruke innholds­struktur fra HAP direkte. Det eneste som endres er det underliggende rende­rings­lag­et: fra webview-basert Ionic til ekte native UI-komponenter. Begrunnelsen er bedre brukeropplevelse for en sårbar målgruppe — som må være det endelige målet — kombinert med bredere vedlikeholds­marked i Norge og modnere tilgjengelighets-API. Se Bilag 2 §4.2.3 for fullstendig redegjørelse og konsekvens­vurdering.

Ingen andre avvik.

## Vedlagte dokumenter

1. Dette tilbudsbrevet (signert)
2. ESPD-skjema (generert i KGV)
3. Firma­attest fra Brønnøysundregisteret
4. Skatte- og avgiftsattest (Altinn)
5. Teknisk/faglig: CV + 3 referanser
6. Bilag 2 — Leverandørens løsningsspesifikasjon
7. Bilag 4 — Prosjekt- og framdriftsplan
8. Bilag 7 — Priskjema (utfylt Excel)
9. Bilag 10 — Tredjeparts­komponenter og lisenser
10. Prototype (nettlenke i tilbudsbrev over)
11. Sladdet versjon av tilbudet

## Kontakt

Asbjørn Rørvik
E-post: hei@asbjornrorvik.dev
Telefon: +47 47 65 86 51
Nettside: www.asbjornrorvik.dev

Jeg ser fram til å høre fra dere, og står til disposisjon for avklaringer i evaluerings­fasen.

Med vennlig hilsen

_______________________________
Asbjørn Rørvik
Org.nr 820252632
Stavanger, 24. april 2026
