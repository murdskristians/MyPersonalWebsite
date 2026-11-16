# AGENTS.md

Personal portfolio website: a Vue 3 single-page app (Vite, vue-router 4, Pinia),
plain JavaScript (no TypeScript) and SCSS, deployed to Netlify from `master`.

## Layout

- `src/main.js` entry, `src/App.vue` root, `src/plugins/router.js` routes, `src/plugins/store.js` Pinia
- `src/views/` pages (About, Projects, ProjectDetails, Blog, case studies in `src/views/projects/`)
- `src/components/page/` shared components (HexNav, SiteFooter, DynamicBackground, ...)
- `src/styles/_globals.scss` global styles
- `src/styles/_theme.scss` site colours as CSS custom properties (`--c-*`), switched by `data-theme="dark|light"` on `<html>`; new styles should use these variables for any colour that differs between themes
- `public/js/` legacy global scripts for the animated 3D background (three.js), loaded from `index.html`; not linted
- `public/js/theme-init.js` sets `data-theme` from the saved choice or the OS preference; it must stay a synchronous, self-hosted `<head>` script (the CSP allows no inline scripts, and `defer`/`async` would flash the wrong theme)
- `netlify.toml` build settings, SPA redirect and security headers (Content-Security-Policy)

## Set up a fresh checkout

Node 22 (`.nvmrc`) and pnpm (never npm). No env files are needed.

```bash
pnpm install --frozen-lockfile
```

## Dev server

```bash
pnpm dev --port <port> --strictPort
```

Start it in the background, and stop only your own server when you are done:
`factory/bin/port stop <port>` from the main checkout.

## Validation

The same commands as `factory/checks.sh`:

```bash
pnpm exec eslint .   # not `pnpm lint`: that runs `eslint . --fix` and rewrites files
pnpm build
```

There is no unit test runner.

## Software factory

`/factory run` builds every open GitHub issue labeled `factory` through
intake → spec → build → gate → review → approve, one PR per issue. State is in
`factory/jobs/` (gitignored); `factory/bin/job` is its only writer. Checks:
`factory/checks.sh`. Dashboard: `cd factory && python3 -m http.server`, then
open http://localhost:8000/dashboard.html.

Each job works in its own git worktree, a full checkout of the repo at
`.worktrees/<job-id>` (gitignored). A tool run from the repo root that doesn't
read `.gitignore` sees those copies too; exclude `.worktrees/` in its config.

This repo also has git-adw (`adws/`, ignored locally). Don't run its listener
while the factory runs: git-adw switches branches in the main checkout.
