<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Monorepo layout

This is a pnpm workspace. Don't look for Next.js at the root — it lives in `apps/web/`.

```
apps/
  web/          Next.js portfolio site (deploys to Vercel, root = apps/web)
  console/      Next.js landing page for Console Consulting (consoleconsulting.no,
                Vercel root = apps/console). Dithered three.js scenes, see below.
  doffin-mcp/   MCP server exposing Doffin tender search to Claude Code
packages/
  templates/    Shared: CV data, cases, tone guide, application boilerplate.
                Imported by apps/web AND read by Claude when drafting applications.
oppdrag/        Plain markdown working directory for tenders & applications.
                Not a package. See oppdrag/README.md for the flow.
```

## Commands

- `pnpm dev` — run the web app
- `pnpm build` — build the web app
- `pnpm dev:console` / `pnpm build:console` — run / build the Console Consulting site (port 3001)
- `pnpm mcp:doffin` — run the Doffin MCP server (stdio)

## When drafting applications in `oppdrag/`

1. Read the tender (`oppdrag/aktive/<id>/tender.md`).
2. Pull relevant cases from `packages/templates/cases/`.
3. Follow the template in `oppdrag/_maler/konsulent-tilbud.md` and the tone
   guide in `packages/templates/tone.md` (when it exists).
4. Save the draft as `oppdrag/aktive/<id>/draft.md`.

## Vercel

Only `apps/web` is deployed. The Vercel project's Root Directory setting must
point to `apps/web`. The MCP server and `oppdrag/` stay local.

## Console Consulting site (`apps/console`)

Inspired by brainfunctioncollapse.com/laya: every scene is rendered in grayscale with
three.js, then Bayer-dithered to two tones on the GPU (`lib/stage/stage.ts`). Scenes live in
`lib/stage/scenes/` (rig = hero, router = integrations, transit = Kolumbus app, stack =
platform), each with an autopilot and a "you play" mode; `components/game.tsx` runs the loop,
HUD and telemetry panel. All copy (NO/EN) is in `lib/content.ts`. In dev, `window.__sim_<id>`
exposes `{ sim, stage, labels }` for stepping a scene by hand (`stage.raw = true` skips the
dither pass).

Known issue: `next dev` on a `.next` that holds `next build` output (or after changing
`turbopack.root`) spawned hundreds of postcss workers on 2026-09-07. `pnpm dev` goes through
`scripts/dev-guard.sh`, which clears build output first and kills runaway process groups;
`turbopackFileSystemCacheForDev` is off. Stop dev before running `next build` in the same app.

## Current state (handoff, last touched 2026-04-22)

**Doffin integration is live and verified.** `apps/doffin-mcp` hits
`https://api.doffin.no/public/v2/search` with `Ocp-Apim-Subscription-Key` auth
(key in `apps/doffin-mcp/.env`, gitignored). OpenAPI spec is committed at
`apps/doffin-mcp/doffin-public-api.openapi.json`. Two scripts exist:

- `src/browse.ts` — paginate across 6 CPV codes, dedupe, score, print top 40.
  Run: `cd apps/doffin-mcp && pnpm exec tsx --env-file=.env src/browse.ts`.
- `src/index.ts` — MCP server (`search_tenders`, `recommended_tenders`).

**Notices API** is not needed — that's for contracting authorities publishing
tenders. Only Public API matters for finding work to bid on.

**Rogaland NUTS codes** in profile: `NO043`, `NO0A3` (not `NO0A`).

**The real shortlist of tenders lives in `oppdrag/shortlist.md`** — Tier 1
(solo-deliverable jobs), Tier 2 (DPS frameworks to qualify for), Tier 3 (skip).

**Next concrete steps when resuming:**
1. Add `get_tender_details(id)` tool in `apps/doffin-mcp` hitting
   `/v2/download/{doffinId}` to pull deadline + qualification criteria.
2. For each top-3 Tier 1 tender, create `oppdrag/aktive/<id>/tender.md` with
   full details from that endpoint.
3. Draft a proposal in `oppdrag/aktive/<id>/draft.md` using
   `oppdrag/_maler/konsulent-tilbud.md` + relevant cases from the CV.
   For the mobility job (Trondheim mikromobilitet, 2026-105919), the Kolumbus
   case is a direct hit and should be the lead reference.

**About the user (for framing applications):** senior fullstack, Stavanger-based,
8y production experience. Stack: Flutter, React Native, Go, .NET, TypeScript,
Next.js. Notable references: Equinor (offshore-kritiske apper), Kolumbus
(Nordic Public Transport Design Award 2025), Altibox, Easee (EaseePay, PCI DSS),
NLR TryggDrift, Aero Norway. CTO/solo-builder of Supportify (AI-kundesupport for
Shopify, live hos 100+ butikker). Comfortable taking full-app or full-website
builds solo. Prefers Stavanger or remote.
