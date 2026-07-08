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
  Three.js + jQuery) and is loaded via `<script>` tags in `index.html`.
