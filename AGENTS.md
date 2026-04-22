<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Monorepo layout

This is a pnpm workspace. Don't look for Next.js at the root — it lives in `apps/web/`.

```
apps/
  web/          Next.js portfolio site (deploys to Vercel, root = apps/web)
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
