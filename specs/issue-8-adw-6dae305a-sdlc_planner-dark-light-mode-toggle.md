# Feature: Add dark/light mode toggle

## Metadata
issue_number: `8`
adw_id: `6dae305a`
issue_json: `{"number":8,"title":"Add dark/light mode toggle","body":"## Feature\nAdd a dark/light theme toggle to the website.\n\n## Requirements\n- A toggle button in the site header (sun icon in dark mode, moon icon in light mode), visible on every page and on mobile width.\n- Clicking it switches the whole site between a dark and a light theme instantly, with a short smooth color transition.\n- Implement the themes with CSS custom properties (variables) in `src/styles/`, switched by a `data-theme=\"dark\" | \"light\"` attribute on `<html>`. No hard-coded colors in components for anything the theme changes.\n- First visit: follow the OS preference (`prefers-color-scheme`). After the user clicks the toggle, save the choice in `localStorage` and use it on every later visit.\n- No flash of the wrong theme on page load: apply the saved theme before the app renders (small inline script in `index.html`).\n- Text, links, buttons and cards must stay readable in both themes (WCAG AA contrast).\n- The button is keyboard accessible and has an `aria-label` that says which theme it switches to.\n- Keep the existing look as the dark theme if the site is dark today; design the light theme to match it.\n\n## Acceptance criteria\n1. Toggle is visible in the header on the home page.\n2. Clicking it switches dark ↔ light across the page.\n3. After a page reload, the last chosen theme is still active.\n4. `pnpm lint` and `pnpm build` pass.\n\n## Review screenshots\nTake these screenshots with Playwright at http://localhost:8080:\n1. Home page in dark theme\n2. Home page in light theme (after clicking the toggle)\n3. Home page after reload, still in light theme (proves persistence)\n4. A second page (for example a project page) in light theme\n5. Mobile width (390px) in light theme, toggle visible in the header\n"}`

## Feature Description
Add a dark/light theme toggle to the portfolio. The site is dark today (`$black` #262626 page, `$white` #F2F2F2 text, teal `#64ffda` accents, translucent slate panels, an animated dark gradient + 3D particle canvas behind everything). That look becomes the `dark` theme unchanged. A matching `light` theme is added, and a sun/moon button fixed at the top of the viewport (the site's "header" area, see Notes) switches between them with a short color transition. The first visit follows `prefers-color-scheme`; a click persists the choice in `localStorage`. An inline script in `index.html` sets `data-theme` on `<html>` before first paint to avoid a flash.

## User Story
As a visitor to the portfolio
I want to switch between a dark and a light theme
So that I can read the site comfortably in my environment and have my choice remembered

## Problem Statement
The site only has a dark appearance, with colors hard-coded as SCSS variables (`$white`, `$black`, `$blue`, compiled to fixed values) and as literals (`#64ffda`, `#9aa7b4`, `rgba(40,48,58,.72)`, etc.) across ~14 files. SCSS variables are compile-time, so they can't be switched at runtime. Visitors who prefer light UIs have no option and the site ignores `prefers-color-scheme`.

## Solution Statement
1. Introduce runtime theme tokens as CSS custom properties in a new `src/styles/_themes.scss`, defined under `:root, :root[data-theme="dark"]` (current values) and `:root[data-theme="light"]` (new AA-compliant values). `_globals.scss` keeps its SCSS vars for non-theme things (grid, fonts, radius) and re-points the color vars at `var(--…)` so the many existing `$white`/`$black` usages become theme-aware with minimal churn; `rgba($black, .5)` usages (which Sass can't apply to `var()`) are replaced by dedicated tokens.
2. Replace hard-coded themed literals in components with `var(--token)`.
3. Add a `ThemeToggle.vue` component (button, sun/moon inline SVG, `aria-label`) mounted in `App.vue`, backed by a small `useTheme` logic in the existing Pinia `ui` store (`theme` state, `toggleTheme`, `initTheme`).
4. Inline script in `index.html` `<head>` resolves `localStorage.theme` or `prefers-color-scheme` and sets `document.documentElement.dataset.theme` synchronously; also sets `color-scheme`.
5. Make the non-CSS visuals follow the theme: the `.gradient` canvas background driven by `public/js/color.js` (read palette from CSS variables / `data-theme`), the particle color in the three.js sprites (white on dark, dark on light), the image-based backgrounds/hex icons (apply a CSS overlay/filter token rather than new art), and Chart.js colors in `Chart.js`.
6. A short transition (`background-color`, `color`, `border-color`, ~250ms) is applied on theme change only (via a temporary `theme-transition` class on `<html>`), so it does not interfere with hover transitions or first paint, and is disabled under `prefers-reduced-motion`.

## Relevant Files
Use these files to implement the feature:

- `README.md` - Project overview and commands (`pnpm lint`, `pnpm build`, dev server on :8080). Add a short "Theming" note.
- `index.html` - Add the inline no-flash theme script in `<head>` (before any stylesheet/app script) and `<meta name="color-scheme">`.
- `src/main.js` - App bootstrap; ensure the store's theme init runs without waiting for components (store is created here via `createPinia`).
- `src/App.vue` - Root component; mounts the toggle, holds global `html/body/h1-h4/p/#page/scrollbar` styles that use `$white`/`$black`/`$blue`, plus the new `.theme-transition` rule.
- `src/styles/_globals.scss` - SCSS color vars; re-point to CSS variables and keep grid/typography/radius.
- `src/plugins/store.js` - Pinia `ui` store; add `theme` state and `setTheme`/`toggleTheme`/`initTheme` actions.
- `src/components/page/HexNav.vue` - Fixed hex menu at top-right (the existing "header" element); `color: $white`, hex PNG backgrounds, active-glow `rgba(33,150,243,.8)`. The toggle must not overlap it.
- `src/components/page/SiteFooter.vue` - Hard-coded teal/greys/white-alpha colors.
- `src/components/page/Project.vue`, `src/components/page/Skills.vue` - Cards/chips with literal colors (`#f2f2f2`, `#64ffda`, `#fff`, `#263238`).
- `src/components/page/DynamicBackground.vue` - Literal `#1a1724` / `#fff`.
- `src/components/page/Chart.js` - Chart.js grid/bar colors set in JS (`#314149`, teal rgba); must read theme tokens.
- `src/views/About.vue`, `src/views/Projects.vue`, `src/views/Blog.vue` - Largest users of literal colors (`#64ffda`, `#9aa7b4`, `#8a97a5`, `#e9eef3`, panel rgba values, `rgba($black,.5)` text shadows/panels).
- `src/views/projects/CaseStudy.vue` - `$cs-*` SCSS color vars (teal, panel, line, ink, muted) → map to theme tokens; second page used for the light-theme screenshot.
- `src/views/projects/YIP.vue` - `$yip-*` palette is brand/data color (keep), but `$black`/`$white` usages (lines 463, 504, 542, 547) must be reviewed.
- `src/views/ProjectDetails.vue`, `src/views/errors/NotFound.vue` - Check for inherited colors/readability in light theme.
- `src/assets/images/icons/carrot-down.svg` - Fixed `#205B9D` fill; verify contrast on light surfaces.
- `public/js/color.js` - Animated `.gradient` palette (luminance-capped dark colors); add a light palette keyed off `document.documentElement.dataset.theme`.
- `public/js/3d-lines-animation.js` - Minified; particle/line color is hard-coded white (`o=16777215`). Needs a theme-aware color (see tasks; it is ignored by ESLint).
- `scripts/**` - Start/stop scripts for the dev server (used by validation/E2E).
- `.claude/commands/conditional_docs.md` - Checked; only `README.md` applies.
- Read `.claude/commands/test_e2e.md` to understand how to create an E2E test file. Note: `.claude/commands/e2e/` and `test_basic_query.md` do not exist in this repo, so model the new file on the `test_e2e.md` runner contract (User Story / Test Steps with **Verify** lines / Success Criteria / screenshot directory / JSON output).

### New Files
- `src/styles/_themes.scss` - `:root` dark/light CSS custom property definitions, `color-scheme`, and the `.theme-transition` rule.
- `src/components/page/ThemeToggle.vue` - Accessible sun/moon toggle button.
- `.claude/commands/e2e/test_theme_toggle.md` - E2E test validating the toggle, persistence, a second page, and mobile width.

## Implementation Plan
### Phase 1: Foundation
- Define the token set (names below) with dark values equal to today's look and light values meeting WCAG AA (≥4.5:1 text, ≥3:1 UI borders/large text).
- Suggested tokens: `--bg`, `--bg-overlay` (replaces `rgba($black,.5)`), `--surface` / `--surface-2` (cards/panels), `--line`, `--text`, `--text-strong`, `--text-muted`, `--text-subtle`, `--accent` (teal in dark; a deeper teal e.g. `#00796b`-range in light so it hits 4.5:1 on light surfaces), `--accent-bg`, `--accent-bg-hover`, `--accent-border`, `--on-accent`, `--shadow-text`, `--scrollbar-track/thumb`, `--chart-grid`, `--chart-bar-1/2`, `--gradient-*`, `--particle`.
- Light palette direction: page `#F2F2F2`-ish background, text `#1f2933`/`#262626` (swap of today's pair), muted `#52606d` (≥4.5:1 on panels), panels white with ~0.8 alpha and a subtle dark line.
- Extend the Pinia store with theme state/actions and the persistence logic; add the inline script to `index.html`.

### Phase 2: Core Implementation
- Create `ThemeToggle.vue` and wire it to the store.
- Migrate `_globals.scss` color vars and all literal colors in components/views to tokens, file by file.
- Handle non-CSS visuals: gradient (`color.js`), particles (`3d-lines-animation.js`), Chart.js, image-based hex buttons/backgrounds.

### Phase 3: Integration
- Mount the toggle in `App.vue`, add the transition class handling, verify on every route and at 390px width, check keyboard focus ring and `aria-label`, and verify contrast for text/links/buttons/cards in both themes.
- Update README, create the E2E test, run validation.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### 1. Create the E2E test file
- Read `.claude/commands/test_e2e.md` (and note `.claude/commands/e2e/` does not exist yet; create the directory).
- Create `.claude/commands/e2e/test_theme_toggle.md` with a User Story, Test Steps, Success Criteria and a screenshot list, minimal steps:
  1. Navigate to http://localhost:8080 with `colorScheme: dark` emulated and localStorage cleared; **Verify** `document.documentElement.dataset.theme === "dark"` and the toggle (`button[data-testid="theme-toggle"]` / `aria-label="Switch to light theme"`) is visible. Screenshot `01_home_dark`.
  2. Click the toggle; **Verify** `data-theme="light"`, aria-label now `Switch to dark theme`, `localStorage.theme === "light"`, computed `body` background is light. Screenshot `02_home_light`.
  3. Reload; **Verify** still `light` immediately (also check the attribute is set before app mount, e.g. via `evaluate` right after navigation). Screenshot `03_home_reload_light`.
  4. Navigate (client-side or URL) to a project page (`/projects`, then a case study); **Verify** `data-theme="light"` and toggle visible. Screenshot `04_project_light`.
  5. Resize to 390x844; **Verify** toggle visible and not overlapping the hex menu. Screenshot `05_mobile_light`.
  6. Press Tab until the toggle is focused and press Enter; **Verify** theme flips back to dark (keyboard accessibility).
  7. Clear storage, emulate `prefers-color-scheme: light`, reload; **Verify** first visit follows the OS (`light`).

### 2. Create theme tokens
- Add `src/styles/_themes.scss` with `:root, :root[data-theme="dark"] { color-scheme: dark; --…: … }` using the exact current values, and `:root[data-theme="light"] { color-scheme: light; --…: … }`.
- Add the transition rule: `html.theme-transition, html.theme-transition *, html.theme-transition *::before, html.theme-transition *::after { transition: background-color .25s ease, color .25s ease, border-color .25s ease, fill .25s ease !important; }` wrapped in `@media (prefers-reduced-motion: no-preference)`.
- Load it once globally: `@use "styles/_themes";` at the top of `App.vue`'s non-scoped style block (the same place `_globals` is used) so the variables are emitted once, not per component.
- Compute contrast ratios for each text/background pair (script or manual) and record them in a comment block; every pair must be ≥4.5:1 (≥3:1 for borders/large text).

### 3. Update `_globals.scss`
- Keep `$breakpoint-*`, `$grid-*`, fonts and `$border-radius`.
- Redefine `$white`, `$grey`, `$black`, `$blue`, etc. to `var(--text)`, `var(--text-muted)`, `var(--bg)`… as appropriate, or (preferred, clearer) leave the brand constants (`$green`, `$red`, `$success`, `$error`) and replace uses of `$white`/`$black` in components with `var(--…)` directly. Because `rgba($black, .5)` and `rgba($white, .5)` are invalid with `var()`, replace each with a token (`--bg-overlay`, `--line-strong`).

### 4. Store + toggle logic
- In `src/plugins/store.js` add `theme: 'dark'` state and actions:
  - `initTheme()`: read `document.documentElement.dataset.theme` (set by the inline script) as the source of truth.
  - `setTheme(value)`: validates `'dark' | 'light'`, sets `dataset.theme`, adds then removes `theme-transition` (~300ms timeout), writes `localStorage.setItem('theme', value)` inside `try/catch` (private mode / blocked storage must not throw).
  - `toggleTheme()`: flips and calls `setTheme`.
- Call `initTheme()` from `App.vue` `mounted`.
- When no explicit choice is stored, listen to `matchMedia('(prefers-color-scheme: dark)')` `change` and update the theme live; stop following once the user has clicked (stored choice exists).

### 5. No-flash inline script
- In `index.html` `<head>`, before `font-loader.js`, add a tiny classic inline `<script>`:
  ```js
  (function () {
    var t;
    try { t = localStorage.getItem('theme'); } catch (e) {}
    if (t !== 'light' && t !== 'dark') {
      t = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    document.documentElement.setAttribute('data-theme', t);
  })();
  ```
- Add `<meta name="color-scheme" content="dark light">`. Add a minimal inline `<style>` (`html{background:#262626}html[data-theme=light]{background:#F2F2F2}`) so the canvas is correct before the bundled CSS arrives. Note: the existing code comment in `index.html` says the font loader avoids needing `script-src 'unsafe-inline'`; check `public/web.config` for a CSP header and, if one exists, allow this inline script via a SHA-256 hash (preferred) rather than `'unsafe-inline'`, and document it.

### 6. ThemeToggle component
- Create `src/components/page/ThemeToggle.vue` (plain Options API like `HexNav.vue`, no decorators), export from `src/components/page/index.js`.
- Template: `<button type="button" class="theme-toggle" data-testid="theme-toggle" :aria-label="label" :title="label" @click.stop="toggleTheme">` with an inline SVG: sun icon when `theme === 'dark'`, moon icon when `theme === 'light'` (per issue). `label` = `Switch to light theme` / `Switch to dark theme`. Use `fill/stroke: currentColor`.
- `@click.stop` so it doesn't trip the document click handler in `App.vue` unexpectedly (that handler only closes the menu, which is fine and arguably desirable; decide and keep consistent).
- Style: `position: fixed; top: 10px; left: 16px` on mobile (HexNav occupies the top-right and fans out to the left when open on mobile, so top-left avoids overlap); desktop `top: 60px; left: 70px` mirroring HexNav's offsets. `z-index` above `#page` (which sits at `z-index:2` in `#app`), 44x44px minimum touch target, visible `:focus-visible` outline using `var(--accent)` (the global `outline: none !important` rule in `App.vue` only excludes inputs, so add an explicit `:focus-visible` style with `!important` or adjust that global rule to keep a keyboard focus indicator). Contrast of icon and button background must be ≥3:1 in both themes.
- Mount `<ThemeToggle />` in `App.vue` next to `<HexNav />` so it appears on every route. Ensure it also fades with `.st_fadeable` behavior or stays interactive (it should stay interactive).

### 7. Migrate global styles in `App.vue`
- `html, body`: `color: var(--text); background: var(--bg)`.
- `h1–h4`, `p`: `color: var(--text-strong)` / `var(--text)`.
- `#page`: `background: var(--bg-overlay)`.
- Scrollbar track/thumb: tokens.
- `.st_hexButton`: `color: var(--text)`.

### 8. Migrate components and views
Go file by file, replacing themed literals with tokens (leave brand/data colors like `$yip-*` alone, and the green/red status colors unless contrast fails):
- `HexNav.vue`: link text color token; the hex PNGs are dark-baked art, so for light theme apply a token-driven treatment (e.g. `filter: var(--hex-filter)`; dark: `none`, light: tuned `invert()`/`hue-rotate()`/`brightness()` or a light-friendly overlay) and verify the active-glow and hover states remain legible. If the filter cannot reach AA for link text, swap `.nav_link` text to a token that contrasts with the filtered hex. Same for `.st_hexButton` in `App.vue`.
- `SiteFooter.vue`, `Project.vue`, `Skills.vue`, `DynamicBackground.vue`, `About.vue`, `Projects.vue`, `Blog.vue`: replace `#64ffda` → `var(--accent)`, `rgba(100,255,218,x)` → `--accent-bg`/`--accent-bg-hover`/`--accent-border`, greys → `--text-muted`/`--text-subtle`, panels → `--surface`/`--surface-2`, white-alpha lines → `--line`, `rgba($black,…)` shadows → `--shadow-text`. Keep the existing explanatory contrast comments updated with the new numbers.
- `CaseStudy.vue`: redefine `$cs-teal`, `$cs-panel`, `$cs-panel-2`, `$cs-line`, `$cs-ink`, `$cs-muted` as `var(--…)` strings (SCSS vars holding `var()` are fine where they're used as plain values; check any `rgba($cs-…)` or `darken()` usage).
- `YIP.vue`: review the `$black`/`$white` lines and keep palette colors; ensure text on colored chips stays AA in both themes.
- Backgrounds: `.st_hexBackground.bg1-3` are dark PNGs behind content. Add a token-driven overlay (e.g. a `::before` with `background: var(--bg-image-veil)`) or `filter: var(--bg-filter)` so the light theme doesn't have light text-on-dark-image/dark-text-on-dark-image conflicts.
- `carrot-down.svg`: check usage; if it's inlined via CSS `background`, confirm `#205B9D` contrast on the light surface (≥3:1 as a UI glyph).

### 9. Theme the non-CSS visuals
- `public/js/color.js`: define `lightColors` (pale, luminance-floored instead of capped, e.g. a `MIN_BACKGROUND_LUMINANCE` ≈ 0.7 so dark text stays AA) and pick palette via `document.documentElement.dataset.theme`; observe changes with a `MutationObserver` on `data-theme` so the gradient switches live, and recompute the palette once. Keep the reduced-motion static frame behavior and the existing `capLuminance` for dark.
- `public/js/3d-lines-animation.js` (minified): replace the hard-coded white `o=16777215` for the `SpriteCanvasMaterial` and `LineBasicMaterial` with a value read from the theme (`getComputedStyle(document.documentElement).getPropertyValue('--particle')` → hex int) and update `.color` of both materials on theme change (same `MutationObserver`). Edit minimally; the file is ignored by ESLint.
- `Chart.js`: read `--chart-grid`, `--chart-bar-1`, `--chart-bar-2` and the label color from `getComputedStyle(document.documentElement)` when building options, and refresh when the theme changes (e.g., component watches `useUiStore().theme` and updates chart options). Verify on the page that renders the chart.

### 10. Docs
- `README.md`: add a "Theming" note: tokens live in `src/styles/_themes.scss`, theme is `data-theme` on `<html>`, persisted in `localStorage.theme`, inline script in `index.html`, and that new components must use `var(--…)` tokens rather than literals.

### 11. Manual contrast + visual pass
- Start the dev server (`pnpm dev`) and visit `/`, `/projects`, a case study, an invalid route (NotFound), at 1440px and 390px, in both themes. Check text, links, buttons, chips, cards, footer, focus rings, hover states. Fix any pair under AA.
- Confirm no flash: hard reload with `data-theme=light` stored and throttled CPU; the first paint must already be light.

### 12. Run validation
- Run every command in `Validation Commands` and fix all failures.

## Testing Strategy
### Unit Tests
There is no unit test runner in this project (validation is `pnpm lint` + `pnpm build` + E2E), so no unit tests are added. The store actions (`setTheme` validation, `toggleTheme`, storage `try/catch`) are covered by the E2E steps and by keeping the logic small and side-effect-explicit.

### Edge Cases
- First visit with OS dark / OS light preference; no `localStorage` value.
- Invalid stored value (`localStorage.theme = "purple"`) → falls back to the OS preference, never throws.
- `localStorage` unavailable/throws (Safari private mode, blocked cookies) → toggle still works for the session.
- OS preference changes while no stored choice → site follows; after a click it stops following.
- Reload and route navigation (vue-router SPA) keep the theme; toggle appears on every route including NotFound.
- Mobile 390px: toggle visible, tappable (≥44px), does not collide with the hex menu, including when the menu is open and fanned out to the left.
- Keyboard: Tab reaches the toggle, visible focus ring, Enter/Space toggles, `aria-label` updates after toggling.
- Rapid repeated clicks don't leave `theme-transition` stuck on `<html>` (clear previous timeout).
- `prefers-reduced-motion`: no color transition, static gradient still themed.
- Animated gradient/particles switch live without a page reload; Chart.js colors update.
- Scrollbar, text selection, and image-based hex buttons remain legible in light theme.
- Print/other `color-scheme` UI (form controls, scrollbars) follows `color-scheme`.

## Acceptance Criteria
1. A sun/moon toggle button is visible at the top of the viewport on the home page, on every route, and at 390px width (sun icon in dark mode, moon icon in light mode).
2. Clicking it switches the entire site (text, panels, buttons, chips, footer, background gradient, particles, chart, hex buttons) between dark and light with a short smooth color transition (~250ms).
3. Themes are implemented with CSS custom properties in `src/styles/` keyed off `data-theme="dark" | "light"` on `<html>`; no themed hard-coded colors remain in components.
4. First visit follows `prefers-color-scheme`; after a click, the choice is stored in `localStorage` and used on all later visits (reload keeps the last chosen theme).
5. No flash of the wrong theme on load (inline script in `index.html` sets `data-theme` before first paint).
6. Text, links, buttons and cards meet WCAG AA contrast in both themes.
7. The button is keyboard operable with a visible focus indicator and an `aria-label` of `Switch to light theme` / `Switch to dark theme` reflecting the target theme.
8. The dark theme looks identical to the current site.
9. `pnpm lint` and `pnpm build` pass.
10. The E2E test `.claude/commands/e2e/test_theme_toggle.md` passes and produces the five review screenshots.

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `Read .claude/commands/test_e2e.md`, then read and execute your new E2E `.claude/commands/e2e/test_theme_toggle.md` test file to validate this functionality works.
- `pnpm lint` - Run ESLint (with auto-fix) to validate the feature works with zero regressions
- `pnpm build` - Run frontend build to validate the feature works with zero regressions
- `git diff --stat` - Confirm no unintended files changed (e.g. lint auto-fix churn)

## Notes
- No new libraries are required.
- The site has no traditional header bar: the only chrome is the fixed hex menu (`HexNav.vue`) at the top-right. The "site header" toggle is therefore a fixed top-left button so it is visible on every route and doesn't conflict with the hex menu's fan-out. If a header is added later, move `ThemeToggle` into it.
- The hex/menu icons and the full-bleed `bg1–bg3` backgrounds are raster art made for the dark look. Prefer CSS filters/overlays driven by tokens over producing new art; if the result is not good enough, a follow-up can add light-variant assets.
- `public/js/*` are legacy global scripts outside the Vue build; they cannot import the store, so they read the theme from the `data-theme` attribute / CSS variables and observe it with a `MutationObserver`.
- `pnpm lint` runs `eslint . --fix` and may modify files; review `git diff` afterwards.
- Plan was written for issue 8 / adw id `6dae305a`; the slash-command arguments arrived unparsed (issue number and adw id were swapped/mangled in the template variables), so the values were taken from the leading `8 6dae305a` args.
