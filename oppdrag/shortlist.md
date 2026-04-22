# Doffin-shortlist — generert 2026-04-22

Kilde: `apps/doffin-mcp/src/browse.ts` mot `api.doffin.no/public/v2/search`,
CPV 72200000/72260000/72262000/72212000/72230000/48000000, status=ACTIVE.
188 unike aktive anbud i poolen, 92 med relevans-score ≥ 10.

## Tier 1 — solo-leveranser å gå etter først

| Score | Oppdrag | Kunde | Budsjett | URL |
|---|---|---|---|---|
| 26 | Utvikling av antidoping-app | Antidoping Norge | 1.8M NOK | https://www.doffin.no/notices/2026-107028 |
| 22 | Selvhjelpsapp for kokainbrukere (RUSinfo) | Oslo kommune Velferdsetaten | — | https://www.doffin.no/notices/2026-105336 |
| 16 | Digitalt reguleringsverktøy mikromobilitet | Trondheim kommune | 1.2M NOK | https://www.doffin.no/notices/2026-105919 |
| 19 | Nettsideutvikling og drift — vetinst.no | Veterinærinstituttet | — | https://www.doffin.no/notices/2026-105950 |
| 16 | Forvaltning og utvikling av nettsider | Asker kommune | anywhere | https://www.doffin.no/notices/2026-105710 |
| 18 | Tolkebestillingsløsning | Domstoladministrasjonen | 5M NOK | https://www.doffin.no/notices/2026-106061 |
| 22 | Digitalt fagsystem for parkeringstjenester | Nordre Follo kommune | 3.4M NOK | https://www.doffin.no/notices/2026-106738 |

**Start med topp 3:** antidoping-app, mikromobilitet (Kolumbus-ref er gull), og
RUSinfo-appen. Samme mønster som TryggDrift/HMS-apper han allerede har levert.

## Tier 2 — DPS å kvalifisere seg inn på (remote, løpende pipeline)

| Score | DPS | Kunde | Ramme | URL |
|---|---|---|---|---|
| 29 | Rådgivning/bistand/prosjektledelse (★ Rogaland) | Sandnes kommune | 20M NOK | https://www.doffin.no/notices/2025-112709 |
| 23 | Systemutvikling | Brønnøysundregistrene | 600M NOK | https://www.doffin.no/notices/2025-112445 |
| 32 | Systemutvikling | Mattilsynet | 400M NOK | https://www.doffin.no/notices/2025-103853 |
| 24 | Systemutvikling backend/frontend | Vinmonopolet | 32M NOK | https://www.doffin.no/notices/2024-105583 |
| 25 | Brukskvalitet og design | Brønnøysundregistrene | 140M NOK | https://www.doffin.no/notices/2025-112444 |
| 28 | UX/design/universell utforming | Digitaliseringsdirektoratet | 60M NOK | https://www.doffin.no/notices/2024-112234 |
| 29 | Rammeavtale IT-utvikling/plattform/Azure | Nkom | 50M NOK | https://www.doffin.no/notices/2026-106729 |

Start med **Sandnes** (lokal, mindre konkurranse), så Brønnøysund systemutvikling,
så Mattilsynet.

## Tier 3 — hopp over

Konsern-rammeavtaler (NRK 1.4B, Forsvarsmateriell UDV 5B, EPJ Vestland 270M),
SAP-utvikler-gigs (feil stack), og fagsystem-anskaffelser der etablerte produkt-
leverandører vinner (FDVU Oslobygg, EPJ Kinn, UDI Læringsplattform).

## Neste steg når vi tar fatt

1. Utvid `apps/doffin-mcp` med `get_tender_details(id)` mot `/v2/download/{id}` —
   da får vi frist, kvalifikasjonskrav, tildelingskriterier per anbud.
2. Trekk full detalj for topp 3 Tier 1 til `oppdrag/aktive/<id>/tender.md`.
3. Draft søknad for én av dem via `oppdrag/_maler/konsulent-tilbud.md`.
