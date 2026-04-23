---
tender: 2026-105747
title: Narvik IAM — vurdering
status: NO-GO
deadline: 2026-05-07
budget: 2.1M NOK
contract: IAM-produkt + implementasjon
---

# Narvik brukeradministrativt system / IAM-løsning — vurdering

## TL;DR

**Klart NO-GO som primærleverandør.** Dette er en produktanskaffelse + implementasjon
for et konsortium av 5 enheter (Narvik kommune, Narvik Havn KF, Narvik Vann KF,
Narvik kirkelige fellesråd, Ofoten brann IKS). Norsk kommunalt IAM-marked
domineres av etablerte produkter (Microsoft Entra ID, Okta, Feide, Omada,
SailPoint, Kantega SSO) — en solo fullstack-utvikler bygger ikke IAM fra scratch.

## Kunden og oppdraget

- **Kjøper:** Narvik kommune på vegne av 5 enheter
- **CPV:** 72000000 (IT-tjenester)
- **Prosedyre:** Åpen tilbudskonkurranse
- **Budget:** 2.1M NOK
- **Kontakt:** Arne Hvidsten, arne@innkjopskontoret.no

## Markedsbilde

Etablerte produkter + integratorer dominerer kommunalt IAM:

| Produkt | Leverandør |
|---|---|
| Entra ID Governance | Microsoft + Microsoft-partnere |
| Okta | Okta + lokale partnere |
| Omada Identity | Omada |
| Kantega SSO (Feide/MinID-adapters) | Kantega |
| SailPoint | SailPoint |

Systemintegrasjon gjøres av Bouvet, Accenture, Capgemini, Knowit, Itera
— alle med IAM-sertifiserte team. Konsortium-kompleksitet (fem entiteter,
kryss-RBAC, revisjon) gjør det til et produkt-integrasjons­problem, ikke
custom-build.

## Fit-analyse — Asbjørn

**Gap:**
- Ingen IAM-produkt-ekspertise
- Ingen føderert identitet i stor skala (SAML/OIDC på organisasjonsnivå)
- Ingen SCIM-provisioning eller LDAP/AD-integrasjon
- Ingen Feide/MinID/MAS-erfaring
- Auth-erfaring fra EaseePay (PCI DSS) og Equinor er app-nivå, ikke IAM-arkitektur

**Sannsynlighet for seier som primær:** &lt;5 %.

## Konklusjon: NO-GO

Ikke send tilbud som primærleverandør. Eneste realistiske vinkel er som
underleverandør til en Microsoft-/Okta-/Kantega-partner for lokal
tilpasning — men det krever etablert relasjon som ikke finnes i dag.
Bruk tiden på tenderne der fullstack-dev er flaskehalsen.
