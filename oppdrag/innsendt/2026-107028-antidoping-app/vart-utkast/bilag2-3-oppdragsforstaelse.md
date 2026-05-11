---
title: Bilag 2 — Oppdragsforståelse
tender: 2026-107028
oppdragsgiver: Antidoping Norge (ADNO)
kriterium: Kvalitet 3 — Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat
sider: 2–4
status: UTKAST
---

# Bilag 2, pkt. 3 — Oppdragsforståelse

**Leverandør:** Asbjørn Rørvik (org.nr 820 252 632)
**Oppdragsgiver:** Antidoping Norge (ADNO)
**Anskaffelse:** Utvikling av antidoping-app (Doffin 2026-107028)

---

## 1. Antidoping Norges mandat — slik jeg forstår det

Antidoping Norge ble opprettet 3. juni 2003 av Norges Idrettsforbund og
Kulturdepartementet som en **uavhengig stiftelse**. Hele poenget med den
organisasjons­formen er at kontroll og påtale skal skje uavhengig av både NIF
og staten — et troverdighets­grep som er en forutsetning for at WADA-systemet
fungerer internasjonalt.

Mandatet har to parallelle spor som er viktig å holde atskilt når jeg designer
appen:

1. **Idretts­sporet** — finansiert gjennom NIF og Kulturdepartementet.
   Håndheving av *World Anti-Doping Code* for organisert norsk idrett:
   kontroller, meldeplikt (whereabouts), medisinsk fritak (TUE), påtale via
   Påtalenemnda, og forebyggende arbeid gjennom Ren Utøver-programmet.
2. **Samfunns­sporet** — finansiert av helsemyndighetene. ADNO har de siste
   årene bygget ut et betydelig arbeid mot doping som helse- og samfunns­problem,
   særlig knyttet til bruk av anabole steroider utenfor organisert idrett. Dette
   er et utvidet mandat som ikke springer ut av WADA-koden, men av vedtektenes
   åpning for arbeid mot doping i samfunnet for øvrig.

ADNO er en liten organisasjon (ca. 30 ansatte, ~60 MNOK i årlig omsetning) med
et svært stort nedslagsfelt: all norsk organisert idrett pluss en økende
samfunns­rolle. **Det forklarer hvorfor appen er viktig: ADNO kan ikke skalere
ved å ansette flere medisinske rådgivere. De må skalere ved å gjøre riktig
informasjon tilgjengelig i det øyeblikket utøveren trenger den.** Hver gang
appen svarer korrekt på "kan jeg ta denne medisinen?" er det en henvendelse
mindre til den medisinske rådgiveren.

Jeg leser det slik at oppdraget ikke er et isolert IT-prosjekt. Appen er et
operativt verktøy for ADNOs forebyggende mandat, og kvaliteten måles ikke i
antall nedlastinger — den måles i om utøvere faktisk tar riktige valg i felt.

## 2. Problemet appen løser

ADNO har allerede innholdet som trengs. Det er ikke mer informasjon som
mangler — det er **tilgjengelighet i situasjonen**. I dag er ressursene spredt:

- **Ren Utøver** (e-læring) ligger på TASKs plattform.
- **Legemiddelsøk** ligger på antidoping.no/medisinsk/legemiddelsok (mot
  Felleskatalogen).
- **Astmakalkulator** ligger som eget verktøy på antidoping.no.
- **Medisinsk fritak** er en veileder med nedlastbare PDF-skjemaer.
- **Dopingvarsel** drives av EQS (Compliance Cockpit), tilgjengelig via lenke
  fra antidoping.no.
- **Den norske dopinglista** ligger på antidoping.no, men søket er ikke
  optimalisert for mobil og inngår ikke i utøverens daglige verktøykasse.

Dette er Bilag 1 pkt. 1.0 sin egen formulering: "de kan oppleves vanskelig å
finne frem til riktig informasjon raskt nok, særlig i situasjoner der
beslutninger må tas på kort varsel". Jeg er enig i diagnosen. Appens
hoved­jobb er å fjerne friksjon mellom *spørsmål* og *svar* — og det betyr at
arkitekturen må prioritere **ett klikk til verktøy**, ikke dypere navigasjon.

Bilag 1 § 6 presiserer at "all funksjonalitet skal være tilgjengelig fra en
hovedside" med "minimal bruk av tekst". Jeg tolker dette bokstavelig: hovedsiden
i min prototype er et 3×3-ikongrid over de ni verktøyene (§ 4.0), uten tabbar
og uten skjult navigasjon. En utøver skal se alle ADNOs ressurser i ett blikk
når appen åpnes.

## 3. Utøverens hverdag — når virker appen?

Kravet "antidoping i lomma" (Bilag 1 § 2.0) er ikke en metafor. Det er en
spesifikasjon av når appen må fungere. Jeg har tegnet opp fire konkrete
situasjoner som har styrt designvalgene mine:

- **Kvelden før en konkurranse.** Utøveren får forkjølelse og står med en
  pakke Paracet og en pakke hostesaft fra foreldrenes skap. Hun har 30
  sekunder på seg før hun gir opp og tar sjansen. *Legemiddelsøk må svare
  uten innlogging og uten mer enn to tap.*
- **I garderoben på treningssenteret.** En lagkamerat tilbyr et
  pre-workout-pulver kjøpt på en utenlandsk nettbutikk. *Risikosjekk
  kosttilskudd må kunne gjennomføres på under 90 sekunder, og resultatet må
  være utvetydig i farge og tekst.*
- **På reise utenlands.** Utøveren får utlevert et medikament som ikke finnes
  i Felleskatalogen. *Søk i ADNOs norske dopingliste må ha eget grensesnitt
  i appen — utformet for utøvere på mobil — og det må være én knapp som
  sender spørsmål direkte til ADNOs medisinske rådgiver ved null treff
  (Bilag 1 § 5.0 "SØK I DOPINGLISTA").*
- **Ved årsskiftet.** Den norske dopinglista revideres én gang per år
  gjeldende fra 1. januar (besluttet i oktober). En substans utøveren har
  brukt lovlig i fjor kan være forbudt i år. *Pushvarsling må leveres av
  ADNO, ikke autogenereres, og meldingen må ligge varig i et meldingssenter
  slik at utøveren kan finne den igjen når helsepersonell spør "hvor står
  dette?" (Bilag 1 § 5.0 "PUSHVARSLING").*

Disse fire situasjonene er min lakmustest for hver designbeslutning. Hvis en
foreslått interaksjon ikke fungerer i minst én av dem, fjerner jeg den.

## 4. Personvern og regelverk setter tekniske rammer

Bilag 1 § 5.1.1 binder leverandøren til å arbeide i tråd med *World Anti-Doping
Code* og GDPR/personopplysningsloven. ADNO har egen DPO og GDPR-ressurs
(jf. Spørsmål 11), og personvern­arbeidet i denne kontrakten gjøres i samråd
med dem. Dette er ikke en formalitet — det er en konkret ramme som styrer
tekniske valg:

- **GDPR-prinsipper styrer arkitekturen:** lovlig grunnlag og eksplisitt
  samtykke for behandling av utøver-data, dataminimering, sikkerhets­tiltak
  proporsjonalt med risiko, brudds­varsling, og dokumentert protokoll over
  behandlings­aktiviteter (Record of Processing) og DPIA.
- **Konsekvenser for løsningen:** (i) **ingen pålogging i appen** (jf. ADNOs
  svar på Spørsmål 5) — jeg lagrer kun navn, telefon og e-post (Bilag 1 § 7)
  dersom utøveren selv velger å oppgi det, og fortrinnsvis kun lokalt på
  enheten; (ii) legemiddelsøk og risikosjekk kjøres lokalt der det er mulig
  og sender aldri personidentifiserbare data til tredjepart; (iii) push-tokens
  lagres separert fra person­data og kan slettes uavhengig; (iv) all
  backend-behandling skjer innenfor EØS (Schrems II-hensyn); (v) jeg leverer
  utfylt protokoll over behandlings­aktiviteter og DPIA som del av leveransen,
  utarbeidet i samarbeid med ADNOs DPO.

**Regelverket** oppdateres jevnlig. Appen må derfor bygges slik at
regelverk­innhold kan oppdateres uten nytt app-release — det taler for en
innholds­styrt arkitektur med remote config (se løsningsspec, pkt. 1), ikke
hardkodet tekst.

**Den norske dopinglista** revideres formelt 1×/år (1. januar), besluttet i
oktober foregående år, jf. ADNOs svar på Spørsmål 4. Hele lista ligger
allerede på antidoping.no. Min backend henter lista derfra (eller via Crafts
API levert av Feed) — daglig som sikkerhetsnett selv om endringer normalt
kun skjer årlig — og eksponerer et raskt mobiltilpasset søk for appen.

## 5. De fire målgruppene krever forskjellig UX

Bilag 1 § 3.0 lister fire målgrupper. Disse har ulik terskel, ulik risiko og
ulik bruks­situasjon, og appen må balansere dem uten å bli tre apper i én:

| Gruppe | Hva de trenger | Mitt design­svar |
|---|---|---|
| **Toppidrett m/meldeplikt** | Rask tilgang til regelverk, TUE-veileder, bevissthet om at whereabouts-beslutninger har konsekvenser | Legemiddelsøk og TUE øverst i hovedgrid; e-post-bekreftelse av søk som kan vises ved kontroll |
| **Toppidrett u/meldeplikt + bredde 15+** | Lav terskel, ingen pålogging i appen, enkel visuell risiko­kommunikasjon | Rød/gul/grønn-kodet output med ikoner (ikke bare farge — UU); onboarding tar < 30 sek |
| **Trenere, støtteapparat, foreldre** | Trygghet på at rådene de gir er korrekte; tilgang til materiale for mindreårige | Rollevalg i onboarding justerer språk og eksempler; "del resultat"-funksjon for bekreftelse på e-post |
| **Særforbund / e-læringsbruk** | Tilgang til Ren Utøver | Ikke integrert i appen — appen er en portal som åpner ADNOs Ren Utøver-side i in-app browser (ingen API-/SSO-integrasjon, jf. Spørsmål 5) |

Jeg har designet hovedsiden som ett grid for alle målgrupper fordi kjernen av
appen er universell (legemiddel, kosttilskudd, regler). Personalisering skjer
gjennom rolle­valg i onboarding (§ 5.0 "Onboarding"), som påvirker eksempel­tekst
og hvilke pushvarsler som er på som default — ikke ved å gjemme verktøy.

## 6. Suksesskriterier for ADNO — slik jeg måler vinningen

Appen er et virkemiddel, ikke et mål. Jeg har vært vært ærlig med meg selv om
hva som gjør denne leveransen verdifull for ADNO et år etter lansering:

1. **Redusert henvendelsespress på medisinsk rådgiver for trivielle
   spørsmål.** Legemiddelsøk og astmakalkulator i appen skal ta unna
   rutine­spørsmålene. Målbart: antall e-poster til medisinsk rådgiver per
   kvartal, kategorisert etter type spørsmål.
2. **Økt bruk av Legemiddelsøk og dopingliste-søk.** I dag ligger disse
   "gjemt" på nettsider. Målbart: antall søk per måned, sammenlignet med
   dagens web-baseline.
3. **Bedre etterlevelse av regelendringer.** Pushvarsler ved endring i
   dopinglista sikrer at utøvere informeres før neste konkurranse. Målbart:
   lese­grad på viktige meldinger.
4. **Flere relevante varsler via Dopingvarsel.** Lavere terskel når
   EQS-varslings­kanalen er ett tap unna fra appen. Målbart: antall innsendte
   varsler via appen vs. direkte via dopingvarsel-nettsiden.
5. **Ren Utøver-gjennomføring.** Direkte tilgang til e-læringen fra appens
   hovedside reduserer friksjon. Målbart i TASKs eksisterende statistikk:
   gjennomført­prosent for nye utøvere etter app-lansering.
6. **Erstatte ADNOs Facebook-gruppe for topputøvere.** Sp.18 sier eksplisitt
   at ADNO ønsker å avvikle dagens FB-gruppe og at viktige varsler heller
   skal komme fra appen. Suksess her betyr bedre rekkevidde (alle utøvere,
   ikke bare de på Facebook), bedre personvern (ingen Meta-sporing av
   topputøvere), og målrettet kommunikasjon per rolle/kategori. Målbart:
   andel topputøvere som mottar push-varsel innen 24t etter publisering, og
   nedleggelse av FB-gruppen innen 3 mnd etter app-lansering.

Jeg legger opp til at disse måle­punktene kan dekkes av enkel, personvern­vennlig
bruks­statistikk (aggregerte tellere, ingen individ­sporing) — i tråd med
GDPR-prinsippet om dataminimering.

## 7. Hva jeg har gjort for å forstå oppdraget

Oppdrags­forståelse er lett å påstå. Jeg vil vise den. Før innsending har jeg:

- **Lest hele Bilag 1 (§§ 1.0–12.0)** og referert til konkrete paragrafer
  gjennom hele tilbudet der det er relevant (jf. § 6 om ett-hovedside-prinsippet,
  § 5.1.1 om regelverk og personvern, § 4.0 om native vs. hybrid).
- **Lest alle tre Q&A-versjoner fra ADNO (22.04, 24.04 og 06.05.2026)** og
  innarbeidet samtlige 18 svar i tilbudet — særlig: pris som inkl. mva
  (Sp.1), dopinglista som **norsk** liste fra antidoping.no (Sp.4 — justert
  i v3 fra WADA-engelsk til norsk versjon), **ingen pålogging** og ingen
  TASK-integrasjon (Sp.5), Craft CMS som ADNOs hovedinnholds­motor levert av
  Feed (Sp.6), ADNO som eier av utviklerkontoer (Sp.7), EQS Compliance
  Cockpit som varslings­leverandør (Sp.8), engelsk språkstøtte i tillegg til
  norsk (Sp.10), at ADNO selv har DPO og GDPR-ressurs (Sp.11), at app-følelse
  vektes høyere enn web-app (Sp.12), avgrenset vedlikeholds­scope i
  garantiperioden (Sp.13/14), gjenbruk av eksisterende astma­kalkulator-kode
  (Sp.15), valgfri datalagring og moderat varsel­volum (8–12/år, Sp.16),
  toveis meldings­tråd i appen og Unifon som ADNOs SMS-gateway (Sp.17), og
  Azure-backend som matcher ADNOs eksisterende Microsoft-skyplattform med
  ADNO selv som avsender av meldinger/push (Sp.18).
- **Bygget en klikkbar prototype** på ca. 20 skjermer som dekker alle ni
  verktøyene fra § 4.0. Prototypen er lagt bak basic auth på
  asbjornrorvik.dev/no/oppdrag/antidoping-app (lenke og QR i Bilag 2 pkt. 1). Dette er ikke
  en mock-up — det er en tidlig web-build av den samme React Native-kodebasen
  jeg vil bygge ut. Konsekvensen for ADNO er at de tyngste tekniske antakelsene
  (informasjons­arkitektur, interaksjons­mønstre, visuell identitet, UU-grunnlag)
  allerede er validert før kontrakts­signering. Sprint 1 går dermed rett til
  integrasjon mot reelle datasett og innholds­produksjon — det reduserer
  leveranse­risiko og gir bedre sikkerhet for å levere innenfor fastpris og 6 mnd.
- **Hentet fargepalett og typografi fra antidoping.no** for å sikre visuell
  tilhørighet (Bilag 1 § 6 "ADNOs designmanual er retningsgivende"). Endelig
  designmanual gjennomgås med ADNO i første workshop.
- **Sett på hvordan tilsvarende apper er løst internasjonalt** (bl.a. Global
  DRO og Clean Sport-apper fra andre nasjonale antidoping­byråer) for å
  kalibrere informasjons­arkitektur og interaksjons­mønstre — uten å kopiere,
  fordi ingen av disse er designet for norsk regelverk eller integrert mot
  Felleskatalogen, og ADNOs hovedsidekrav (ett-trykks-tilgang, minimal tekst)
  er strengere enn det jeg har sett ute.
- **Utarbeidet et foreløpig DPIA-utkast** etter GDPR/personopplysningsloven
  som grunnlag for samtalen med ADNOs DPO i oppstarts­fasen.
- **Kartlagt tredjeparts­avhengigheter:** Felleskatalogens API (ADNOs
  eksisterende avtale), ADNOs nettside / Crafts API (Feed) for dopingliste
  og redaksjonelt innhold, EQS Compliance Cockpit for Dopingvarsel
  (lenke-portal), FCM/APNs for push, Apple App Store Connect og Google Play
  Console (eid av ADNO).

**Det ADNO får med denne leverandøren er ikke et løfte om å sette seg inn
i domenet — det er en leverandør som allerede har gjort det.**

---

*Denne seksjonen utgjør punkt 3 i Konsulentens besvarelse i Bilag 2, jf. Bilag 1 pkt. 2 "Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat".*
