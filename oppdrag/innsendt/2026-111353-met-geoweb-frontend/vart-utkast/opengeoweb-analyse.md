# OpenGeoWeb kodebase-analyse (forarbeid, 02.07.2026)

Shallow clone av gitlab.com/opengeoweb/opengeoweb. Verifiserte fakta til bruk
i besvarelse og intervju:

- **NX-monorepo (v19):** 2 apper (`geoweb`, `geoweb-e2e`) + 27 publiserbare
  `@opengeoweb/*`-libs: `core`, `webmap`, `webmap-react`, `store`, `plugins`,
  `theme`, `warnings`, `sigmet-airmet`, `taf`, `cap`, `space-weather`,
  `soundings`, `time-series`, `time-slider`, `layer-select`, `workspace` m.fl.
- **Plugin-arkitektur:** `libs/plugins` implementerer en host↔plugin-bro over
  `@opengeoweb/plugin-interface` — typede scope-events via
  `useScopeEvent<T extends ScopeName>` og `pluginBridge.sendEvent(scope, event)`.
- **Kartlag i to nivåer:** rammeverk-agnostisk `webmap`-kjerne med håndskrevne
  WMS/WMTS-klasser (`WMLayer`, `WMJSDimension`, `WMLegend`, `WMProjection`,
  `WMTime`) + `webmap-react` som React-binding der OpenLayers (`ol` ^10.6)
  er isolert i `OpenLayersMapView.tsx` med egne `layers/`, `controls/`,
  `draw/`, `tools/`-moduler. Støtte for OGC EDR og GeoTIFF-lag.
- **State:** Redux Toolkit v2 (`configureStore` + domene-slices: map/layer/
  service/ui/auth/syncGroups). Ingen sagas. `webmap`-kjernen bruker
  `@tanstack/query-core` for datahenting.
- **UI/test:** React 19, MUI v9, Storybook 10 med `jest-image-snapshot` for
  visuell regresjon, Jest 30. **E2E er Playwright, ikke Cypress**
  (`apps/geoweb-e2e/playwright.config.ts`) — nyttig nyanse i intervju.
- **Domene-libs:** warnings, SIGMET/AIRMET, TAF, CAP (Common Alerting
  Protocol), space-weather, soundings. Tidshåndtering i `time-slider` +
  `metronome`. i18n via i18next med per-lib locales. Vindushåndtering via
  forket `react-mosaic-component-opengeoweb` (`workspace`-lib).

## Intervju-snakkepunkter

1. Plugin-broen med typede scopes matcher kravet «modular design, plugin
   interfaces» direkte — kan diskutere trade-offs i event-baserte plugin-API.
2. To-lags kartabstraksjon (webmap/webmap-react) = ryddig separasjon; erfaring
   med tilsvarende wrapper-mønstre fra Kolumbus/Flagchase.
3. Visuell regresjonstesting med image snapshots per lib — relevant for
   meteorologiske visualiseringer der pixel-output er produktet.
