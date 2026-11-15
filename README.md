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

## Theming

The site has a dark (default look) and a light theme, switched by `data-theme="dark" | "light"` on `<html>`. The colors are CSS custom properties in `src/styles/_themes.scss`. The first visit follows `prefers-color-scheme`; the toggle in the top-left stores the choice in `localStorage.theme`. An inline script in `index.html` applies the theme before first paint.

To add a themed color, define it in both the dark and light blocks of `_themes.scss` and use `var(--your-color)` (or `rgba(var(--accent-rgb), .4)` for tints) in components.

## Notes

- The animated 3D background lives in `public/js/` (legacy global scripts using
  Three.js, no jQuery) and is loaded via `<script>` tags in `index.html`.
