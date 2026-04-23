---
title: Bilag 2 — Oppdragsforståelse
tender: 2026-107028
kriterium: Kvalitet 3 — Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat
sider: 2–4
status: UTKAST
---

# Bilag 2, pkt. 3 — Oppdragsforståelse

**Leverandør:** Asbjørn Rørvik (org.nr 820 252 632)
**Oppdragsgiver:** Antidoping Norge (ADNO)
**Anskaffelse:** Utvikling av antidoping-app (Doffin 2026-107028)

---

## 1. Antidoping Norges mandat — slik vi forstår det

Antidoping Norge ble opprettet 3. juni 2003 av Norges Idrettsforbund og
Kulturdepartementet som en **uavhengig stiftelse**. Hele poenget med den
organisasjons­formen er at kontroll og påtale skal skje uavhengig av både NIF
og staten — et troverdighets­grep som er en forutsetning for at WADA-systemet
fungerer internasjonalt.

Mandatet har to parallelle spor som er viktig å holde atskilt når vi designer
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

Vi leser det slik at oppdraget ikke er et isolert IT-prosjekt. Appen er et
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
- **Dopingvarsel** drives av Whistleblower Network på ekstern URL.
- **WADAs Prohibited List** ligger på wada-ama.org med et søk som ikke er
  tilpasset norske utøvere.

Dette er Bilag 1 pkt. 1.0 sin egen formulering: "de kan oppleves vanskelig å
finne frem til riktig informasjon raskt nok, særlig i situasjoner der
beslutninger må tas på kort varsel". Vi er enige i diagnosen. Appens
hoved­jobb er å fjerne friksjon mellom *spørsmål* og *svar* — og det betyr at
arkitekturen må prioritere **ett klikk til verktøy**, ikke dypere navigasjon.

Bilag 1 § 6 presiserer at "all funksjonalitet skal være tilgjengelig fra en
hovedside" med "minimal bruk av tekst". Vi tolker dette bokstavelig: hovedsiden
i vår prototype er et 3×3-ikongrid over de ni verktøyene (§ 4.0), uten tabbar
og uten skjult navigasjon. En utøver skal se alle ADNOs ressurser i ett blikk
når appen åpnes.

## 3. Utøverens hverdag — når virker appen?

Kravet "antidoping i lomma" (Bilag 1 § 2.0) er ikke en metafor. Det er en
spesifikasjon av når appen må fungere. Vi har tegnet opp fire konkrete
situasjoner som har styrt designvalgene våre:

- **Kvelden før en konkurranse.** Utøveren får forkjølelse og står med en
  pakke Paracet og en pakke hostesaft fra foreldrenes skap. Hun har 30
  sekunder på seg før hun gir opp og tar sjansen. *Legemiddelsøk må svare
  uten innlogging og uten mer enn to tap.*
- **I garderoben på treningssenteret.** En lagkamerat tilbyr et
  pre-workout-pulver kjøpt på en utenlandsk nettbutikk. *Risikosjekk
  kosttilskudd må kunne gjennomføres på under 90 sekunder, og resultatet må
  være utvetydig i farge og tekst.*
- **På reise utenlands.** Utøveren får utlevert et medikament som ikke finnes
  i Felleskatalogen. *Søk mot WADAs Prohibited List må ha eget grensesnitt
  i appen — ikke en webview til wada-ama.org, som er uleselig på mobil — og
  det må være én knapp som sender spørsmål direkte til ADNOs medisinske
  rådgiver ved null treff (Bilag 1 § 5.0 "SØK I DOPINGLISTA").*
- **Midt i sesongen, uten varsel.** WADA publiserer årlig en revidert
  Prohibited List som trer i kraft 1. januar, og gjør i tillegg løpende
  endringer. En substans utøveren har brukt lovlig i fjor kan være forbudt
  i år. *Pushvarsling må leveres av ADNO, ikke autogenereres, og meldingen
  må ligge varig i et meldingssenter slik at utøveren kan finne den igjen
  når helsepersonell spør "hvor står dette?" (Bilag 1 § 5.0 "PUSHVARSLING").*

Disse fire situasjonene er vår lakmustest for hver designbeslutning. Hvis en
foreslått interaksjon ikke fungerer i minst én av dem, fjerner vi den.

## 4. WADA-konteksten setter tekniske rammer

Bilag 1 § 5.1.1 binder leverandøren til å arbeide i tråd med *World Anti-Doping
Code* og tilhørende standarder, særlig **International Standard for the
Protection of Privacy and Personal Information (ISPPPI)**. Dette er ikke en
formalitet — det er en konkret ramme som styrer tekniske valg:

- **ISPPPI 2021** (gjeldende versjon, i kraft fra 1.1.2021; 2027-versjon er
  under utarbeidelse hos WADA) krever bl.a. lovlig grunnlag og eksplisitt
  samtykke for behandling av utøver-data, dataminimering, sikkerhets­tiltak
  proporsjonalt med risiko, brudds­varsling, og dokumentert *Record of
  Processing* og *Risk Assessment Matrix*.
- **Konsekvenser for vår app:** (i) vi lagrer kun navn, telefon og e-post
  (Bilag 1 § 7) — ingen helseopplysninger lagres i appen utover det utøveren
  selv velger å skrive i et kontakt­skjema; (ii) legemiddelsøk og risikosjekk
  kjøres lokalt der det er mulig og sender aldri personidentifiserbare data
  til tredjepart; (iii) push-tokens lagres separert fra person­data og kan
  slettes uavhengig; (iv) all backend-behandling skjer innenfor EØS
  (Schrems II-hensyn); (v) vi leverer utfylt Record of Processing og DPIA som
  del av leveransen, slik at ADNO kan dokumentere etterlevelse overfor WADA.

**The Code** oppdateres i hovedrevisjoner (senest 2021, neste 2027). Appen må
derfor bygges slik at regelverk­innhold kan oppdateres uten nytt app-release
— det taler for en innholds­styrt arkitektur med remote config (se
løsningsspec, pkt. 1), ikke hardkodet tekst.

**Prohibited List** oppdateres minst årlig (1. januar) med mindre tillegg
underveis. Integrasjonen mot WADAs substans­data må derfor være automatisert,
med fallback til manuelt vedlikehold i admin­panelet dersom WADA ikke
eksponerer maskinlesbart API for en gitt endring.

## 5. De fire målgruppene krever forskjellig UX

Bilag 1 § 3.0 lister fire målgrupper. Disse har ulik terskel, ulik risiko og
ulik bruks­situasjon, og appen må balansere dem uten å bli tre apper i én:

| Gruppe | Hva de trenger | Vårt design­svar |
|---|---|---|
| **Toppidrett m/meldeplikt** | Rask tilgang til regelverk, TUE-veileder, bevissthet om at whereabouts-beslutninger har konsekvenser | Legemiddelsøk og TUE øverst i hovedgrid; e-post-bekreftelse av søk som kan vises ved kontroll |
| **Toppidrett u/meldeplikt + bredde 15+** | Lav terskel, ingen innlogging for basis-verktøy, enkel visuell risiko­kommunikasjon | Rød/gul/grønn-kodet output med ikoner (ikke bare farge — UU); onboarding tar < 30 sek |
| **Trenere, støtteapparat, foreldre** | Trygghet på at rådene de gir er korrekte; tilgang til materiale for mindreårige | Rollevalg i onboarding justerer språk og eksempler; "del resultat"-funksjon for bekreftelse på e-post |
| **Særforbund** | Administrering av e-læring | Ikke en del av appen — skjer i TASKs eksisterende web-admin, vi lenker dit |

Vi har designet hovedsiden som ett grid for alle målgrupper fordi kjernen av
appen er universell (legemiddel, kosttilskudd, regler). Personalisering skjer
gjennom rolle­valg i onboarding (§ 5.0 "Onboarding"), som påvirker eksempel­tekst
og hvilke pushvarsler som er på som default — ikke ved å gjemme verktøy.

## 6. Suksesskriterier for ADNO — slik vi måler vinningen

Appen er et virkemiddel, ikke et mål. Vi har vært eksplisitte med oss selv om
hva som gjør denne leveransen verdifull for ADNO et år etter lansering:

1. **Redusert henvendelsespress på medisinsk rådgiver for trivielle
   spørsmål.** Legemiddelsøk og astmakalkulator i appen skal ta unna
   rutine­spørsmålene. Målbart: antall e-poster til medisinsk rådgiver per
   kvartal, kategorisert etter type spørsmål.
2. **Økt bruk av Legemiddelsøk og Prohibited List-søk.** I dag ligger disse
   "gjemt" på nettsider. Målbart: antall søk per måned, sammenlignet med
   dagens web-baseline.
3. **Bedre etterlevelse av regelendringer.** Pushvarsler ved endring i
   dopinglista sikrer at utøvere informeres før neste konkurranse. Målbart:
   lese­grad på viktige meldinger.
4. **Flere relevante varsler via Dopingvarsel.** Lavere terskel når
   varslings­kanalen er ett tap unna. Målbart: antall innsendte varsler via
   appen vs. direkte via whistleblowernetwork.net.
5. **Ren Utøver-gjennomføring.** SSO-innlogging fra appen reduserer friksjon
   til e-læringen. Målbart: gjennomført­prosent for nye utøvere.

Vi legger opp til at disse måle­punktene kan dekkes av enkel, personvern­vennlig
bruks­statistikk (aggregerte tellere, ingen individ­sporing) — i tråd med
ISPPPI-prinsippet om dataminimering.

## 7. Hva vi har gjort for å forstå oppdraget

Oppdrags­forståelse er lett å påstå. Vi vil vise den. Før innsending har vi:

- **Lest hele Bilag 1 (§§ 1.0–12.0)** og referert til konkrete paragrafer
  gjennom hele tilbudet der det er relevant (jf. § 6 om ett-hovedside-prinsippet,
  § 5.1.1 om ISPPPI, § 4.0 om native vs. hybrid).
- **Bygget en klikkbar prototype** på ca. 20 skjermer som dekker alle ni
  verktøyene fra § 4.0. Prototypen er lagt bak basic auth på
  antidoping.asbjornrorvik.dev (lenke og QR i Bilag 2 pkt. 1). Dette er ikke
  en mock-up — det er en tidlig web-build av den samme React Native-kodebasen vi vil bygge ut.
- **Hentet fargepalett og typografi fra antidoping.no** for å sikre visuell
  tilhørighet (Bilag 1 § 6 "ADNOs designmanual er retningsgivende"). Endelig
  designmanual gjennomgås med ADNO i første workshop.
- **Studert internasjonale referanse­apper:** Sport Integrity Australia
  (Clean Sport-app med kosttilskudd­vurdering), UK Anti-Dopings "Clean Sport"
  og Global DRO. Disse har gitt oss konkrete design­valg — f.eks.
  kort-basert risikosjekk fremfor lange skjema — men vi har bevisst valgt å
  *ikke* kopiere dem, fordi ingen av dem er designet for norsk regelverk
  eller integrert mot Felleskatalogen.
- **Lest WADA ISPPPI 2021** i sin helhet og utarbeidet et foreløpig
  DPIA-utkast som grunnlag for samtalen med ADNOs personvernombud i
  oppstarts­fasen.
- **Kartlagt tredjeparts­avhengigheter:** Felleskatalogens API (samme
  integrasjon som antidoping.no i dag bruker), TASK for Ren Utøver SSO,
  Whistleblower Network for Dopingvarsel, FCM/APNs for push.

**Det ADNO får med denne leverandøren er ikke et løfte om å sette seg inn
i domenet — det er en leverandør som allerede har gjort det.**

---

*Denne seksjonen utgjør punkt 3 i Konsulentens besvarelse i Bilag 2, jf. Bilag 1 pkt. 2 "Oppdragsforståelse, herunder leverandørens oppfatning av Antidoping Norge sitt mandat".*
