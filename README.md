# MyPersonalWebsite

Personal portfolio built with **Vue 3**, **Vite**, **vue-router 4** and **Pinia**.

## Requirements

- Node.js 22+ (see `.nvmrc`)
- [pnpm](https://pnpm.io/)

## Setup

```bash
pnpm install
```

## Scripts

```bash
pnpm dev        # start the dev server at http://localhost:8080
pnpm build      # production build → dist/
pnpm preview    # locally preview the production build
pnpm lint       # lint & auto-fix with ESLint
```

## Notes

- The animated 3D background lives in `public/js/` (legacy global scripts using
  Three.js, no jQuery) and is loaded via `<script>` tags in `index.html`.

## Theming

The site has a dark (default) and a light theme, switched by `data-theme="dark|light"` on `<html>`.

- Tokens are CSS custom properties in `src/styles/_theme.scss` (emitted once from `App.vue`). Components use `var(--token)` instead of literal colors. To add a token, define it in both the dark and light blocks, then consume it.
- `public/js/theme-init.js` runs synchronously in `<head>` and sets `data-theme` before first paint (saved choice in `localStorage.theme`, otherwise `prefers-color-scheme`). It is an external file because the CSP is `script-src 'self'`.
- Theme state lives in the Pinia store (`src/plugins/store.js`); the toggle is `src/components/page/ThemeToggle.vue`.
- `public/js/color.js` (animated gradient) and `src/components/page/Chart.js` read the active theme as well.
