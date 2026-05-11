---
title: Avklaringsspørsmål til ADNO før spørsmålsfrist
tender: 2026-107028
frist: 2026-05-04 12:00
status: UTKAST — sendes via Mercell
---

# Spørsmål til ADNO — Doffin 2026-107028

**Til:** Antidoping Norge v/ Inventura (Dag Thomas Nybø-Sørensen)
**Fra:** Asbjørn Rørvik (org.nr 820 252 632)
**Saksreferanse:** Doffin 2026-107028 — Utvikling av antidoping-app

---

## 1. Ekstern UU-revisjon — krav om forpliktelseserklæring (Vedlegg 2)?

For å sikre uavhengig kvalitetssikring av universell utforming planlegger jeg å engasjere en etablert norsk UU-leverandør (f.eks. Funka Nu eller MediaLT) til å gjennomføre WCAG 2.2 AA-revisjon av appen før publisering. UU-revisjonen er priset inn i fastpris og leveres som en avgrenset tjenesteleveranse — den er etter min vurdering en *innkjøpt tjeneste*, ikke en *underleverandør* i kvalifikasjons­forstand, ettersom kvalifikasjonen for selve oppdraget (apputvikling) dekkes fullt ut av tilbyder.

**Spørsmål:** Bekrefter ADNO at UU-revisjon levert som innkjøpt tjeneste på denne måten **ikke** krever forpliktelseserklæring (Vedlegg 2)? Eller ønsker ADNO at jeg leverer Vedlegg 2 for UU-leverandøren for å være på den sikre siden?

## 2. Hosting/drift — ADNOs eget Azure-tenant eller leverandørens?

Jeg foreslår Azure App Service + PostgreSQL som backend-infrastruktur, og forutsetter at ressursene opprettes i **ADNOs eget Azure-tenant** slik at ADNO eier abonnementet og dataene fra dag 1. Driftskostnadene faktureres da direkte fra Microsoft til ADNO, og leverandøren har kun delegert tilgang.

**Spørsmål:** Bekrefter ADNO at dette er ønsket modell, eller skal leverandøren stå som abonnementseier i en egen Azure-tenant og videre­fakturere ADNO?

## 3. Drift etter levering — separat avtale eller del av tilbudet?

Konkurransegrunnlaget og Q&A 13/14 avklarer at løpende drift av backend ikke inngår i fastpris. Jeg legger derfor opp til at ADNO enten drifter selv eller tegner en separat drifts­avtale med tilbyder etter avtale.

**Spørsmål:** Ønsker ADNO at jeg legger ved et eget driftsforslag (med fast månedspris) som *opsjon* sammen med tilbudet, eller ønskes dette håndtert utenfor evalueringen og avtalt etter tildeling?

## 4. Eksisterende Felleskatalogen-avtale — er API-tilgangen klar fra dag 1?

Jeg legger til grunn (jf. Q&A 3) at ADNO har en eksisterende API-avtale med Felleskatalogen som kan benyttes av appen.

**Spørsmål:** Er denne avtalen ferdig forhandlet og klar for produksjons­bruk fra kontrakts­oppstart, eller må leverandøren påregne tid til avklaring/utvidelse av lisens­vilkårene? Eventuell ventetid hos Felleskatalogen vil i så fall være utenfor leverandørens kontroll.

## 5. Crafts API hos Feed — leverandørtilgang?

Jeg planlegger å hente redaksjonelt innhold (inkludert norsk dopingliste) fra ADNOs eksisterende Craft CMS via Feeds API (jf. Q&A 4 og 6).

**Spørsmål:** Er det avklart med Feed at en ekstern leverandør får lese-tilgang til API-et i utviklings- og driftsfasen, eller må dette etableres som en del av prosjekt­oppstart?

---

*Sendes via Mercell innen 2026-05-04 kl. 12:00.*
