# Appendix 2 — The Consultant's specification of the assistance (draft)

> Goes into SSA-B appendices, Appendix 2. English. Point-by-point response to
> every requirement in Appendix 1 §5.1.1, so the evaluator can tick each box.
> [FILL]-markers need Asbjørn's input.

## Proposed consultant

Asbjørn Rørvik, senior frontend/fullstack developer, Stavanger, Norway.
8+ years of production experience delivering complete digital products —
frontend, backend, CI/CD and operations. B.Sc. in Automation and Electronics
Design, University of Stavanger (2013–2016). CV attached.

Currently engaged by Dr. Dropin (Norwegian healthcare provider) to take a
complete product from idea to production in two months, using AI-driven
development practices — full ownership of architecture, frontend, backend and
delivery. The product is under development and confidential; details can be
shared in an interview to the extent the client permits. The engagement
concludes 1 September 2026, so the consultant is fully available for the
GeoWeb assignment from contract start (required no later than 1 October 2026).

## Response to required skills and expertise (Appendix 1, §5.1.1)

### Frontend development and architecture

8+ years building production frontends. Sole architect and developer of
Supportify (Next.js/React/TypeScript SaaS serving 100+ paying Shopify
stores) — architecture, state management, performance and operations
end-to-end. React/Next.js is also the foundation of the product currently
being delivered for Dr. Dropin. Frontend developer on two of Equinor's most
business-critical offshore applications (React Native + TypeScript, via
Bouvet) and on the NLR KSL app (React Native, via Netpower). Developer on
the Kolumbus real-time public transport app, 142,000+ monthly active users,
winner of the Nordic Public Transport Design Award 2025.

### Modular design, specifically plugin interfaces

Supportify is built around an embeddable, plugin-style widget architecture
that runs inside third-party Shopify storefronts with strict isolation of
styling, state and network concerns, integrating chat, e-mail, Instagram and
Messenger channels behind one plugin interface. Also author of ShapeItUp, an
open-source CAD-scripting extension for VS Code designed as a pluggable tool
surface for AI agents.

### Web-based geospatial functionality (maps)

Hands-on OpenLayers experience from two products: the Kolumbus app
(real-time transit map with live vehicle positions, route planning and
contextual notifications for Rogaland's public transport network) and
Flagchase, a self-built digital orienteering product with OpenLayers-based
course maps, checkpoints and live ranking.

### Web-based charting and graphing functionality

Analytics and reporting views in Supportify (resolution rates, volume and
channel statistics for 100+ stores).

### Implementing automated tests

Automated test suites and CI-enforced quality gates in production projects:
GitHub Actions and GitLab CI pipelines for web and mobile, including release
automation against App Store/Play Store. Jest for unit/component testing in
production pipelines; working knowledge of Cypress and Storybook.

### Security awareness

Experience from environments with strict operational and security-related
requirements: Equinor's offshore-critical applications (among the strictest
code review, access control and release regimes in Norwegian industry) and
EaseePay, a PCI DSS-compliant payment module (Adyen integration, encryption,
data minimisation). Working habits include secrets management, dependency
scanning, least-privilege access, mandatory code review and GDPR-conscious
design. The consultant will comply with MET Norway's security instructions
at all times.

## Response to required technology familiarity

| Technology | Experience |
|---|---|
| HTML, CSS3 | 8+ years, production |
| JavaScript / TypeScript | 8+ years JS, TypeScript as primary language in current production work (Supportify, Dr. Dropin, Equinor apps) |
| React JS — Redux, Material UI | React/Next.js in production (Supportify, Dr. Dropin); React Native + TypeScript on Equinor's offshore apps and NLR KSL. Working familiarity with Redux and Material UI |
| Webpack / NPM and NX | Webpack/NPM: production. NX: familiar with the tooling, not yet used in production — expected to be quickly productive given extensive monorepo experience |
| Storybook, Jest, Cypress | Jest in production pipelines; working knowledge of Cypress and Storybook |
| OpenGeoWeb and OpenLayers | OpenLayers in production (Kolumbus, Flagchase). OpenGeoWeb: has studied the codebase — see below |

### Familiarity with the OpenGeoWeb codebase

To minimise onboarding time, the consultant has already studied the
OpenGeoWeb monorepo (gitlab.com/opengeoweb): the NX workspace with the
`geoweb` app and 27 publishable `@opengeoweb/*` libraries; the two-layer map
abstraction where the framework-agnostic `webmap` core (WMLayer,
WMJSDimension, WMTime and related WMS/WMTS classes) is bound to React in
`webmap-react`, with OpenLayers isolated behind `OpenLayersMapView`; the
plugin bridge in `libs/plugins` built on `@opengeoweb/plugin-interface` with
typed scope events; and the Redux Toolkit store organised as domain slices
(map, layer, service, ui, syncGroups). He is ready to contribute within this
architecture from day one.

## Response to required work experience

**Multidisciplinary scrum team:** 2021–2024 consultant at Bouvet (Equinor,
Altibox, Easee) and 2024– at Netpower (Kolumbus, NLR, Aero Norway) — all
delivered in cross-functional scrum teams with designers, testers, product
owners and backend developers.

**Collaboration in English:** Fluent written and spoken English; English has
been the working language in several previous engagements, including
Equinor's international development environment.

**International public-sector IT projects (meteorological context):**
Extensive Norwegian public-sector delivery experience (Kolumbus public
transport — 142,000+ monthly users; NLR TryggDrift for agriculture). While
the consultant has not worked in a meteorological organisation, he has
delivered in comparable mixed operational environments (offshore-critical
systems at Equinor used in daily operations) and has prepared for this
assignment by studying the OpenGeoWeb codebase and domain.

## Weekly reporting

The consultant will provide a weekly time-usage report to the Norwegian
project manager, as required.
