# Feature: Dark/Light Theme Toggle

## Metadata
issue_number: `10`
adw_id: `9e7ec5e4`
issue_json: `{"number":10,"title":"Add dark/light mode toggle","body":"## Feature\nAdd a dark/light theme toggle to the website.\n\n## Requirements\n- A toggle button in the site header (sun icon in dark mode, moon icon in light mode), visible on every page and on mobile width.\n- Clicking it switches the whole site between a dark and a light theme instantly, with a short smooth color transition.\n- Implement the themes with CSS custom properties (variables) in `src/styles/`, switched by a `data-theme=\"dark\" | \"light\"` attribute on `<html>`. No hard-coded colors in components for anything the theme changes.\n- First visit: follow the OS preference (`prefers-color-scheme`). After the user clicks the toggle, save the choice in `localStorage` and use it on every later visit.\n- No flash of the wrong theme on page load: apply the saved theme before the app renders (small inline script in `index.html`).\n- Text, links, buttons and cards must stay readable in both themes (WCAG AA contrast).\n- The button is keyboard accessible and has an `aria-label` that says which theme it switches to.\n- Keep the existing look as the dark theme if the site is dark today; design the light theme to match it.\n\n## Acceptance criteria\n1. Toggle is visible in the header on the home page.\n2. Clicking it switches dark ↔ light across the page.\n3. After a page reload, the last chosen theme is still active.\n4. `pnpm lint` and `pnpm build` pass.\n\n## Review screenshots\nTake these screenshots with Playwright at http://localhost:8080:\n1. Home page in dark theme\n2. Home page in light theme (after clicking the toggle)\n3. Home page after reload, still in light theme (proves persistence)\n4. A second page (for example a project page) in light theme\n5. Mobile width (390px) in light theme, toggle visible in the header\n"}`

## Feature Description
Add a dark/light theme toggle to the portfolio. The site is dark today (`$black` #262626 base, `$white` #F2F2F2 text, teal `#64ffda` accents, translucent dark panels over an animated dark gradient + three.js particle background). That look becomes the `dark` theme unchanged. A new `light` theme is designed to match it (same layout, teal accent darkened for contrast, light gradient background, light translucent panels).

Themes are CSS custom properties defined in `src/styles/`, switched by `data-theme="dark" | "light"` on `<html>`. A small icon button (sun in dark mode, moon in light mode) is fixed in the top corner on every page, including mobile. The first visit follows `prefers-color-scheme`; after the user clicks, the choice is saved in `localStorage` and wins on later visits. The theme is applied before the app renders so there is no flash.

## User Story
As a visitor to the portfolio
I want to switch between a dark and a light theme
So that I can read the site comfortably in my environment and have my choice remembered

## Problem Statement
All colors are hard-coded (SCSS variables `$white`/`$black`, plus ~100 literal hex/rgba values such as `#64ffda`, `#9aa7b4`, `rgba(40,48,58,.72)` across 13 files, the JS gradient in `public/js/color.js`, and Chart.js colors in `src/components/page/Chart.js`). There is no theming mechanism, no way to switch, and no respect for the OS color-scheme preference.

## Solution Statement
1. Introduce a semantic token layer as CSS custom properties in a new `src/styles/_theme.scss` (dark = default/`:root`, light under `[data-theme="light"]`), emitted exactly once from `App.vue`'s global style block (avoid duplicating the `:root` rules via every component's `@use`).
2. Replace theme-dependent hard-coded colors in components with `var(--token)`. Sass color functions (`rgba($black, .5)`) cannot take `var()`, so tokens for translucent colors are defined directly (e.g. `--page-overlay`, `--panel-bg`, `--accent-bg`, `--accent-border`) or use `color-mix(in srgb, var(--x) N%, transparent)`.
3. Add theme state to the existing Pinia store (`src/plugins/store.js`): `theme`, `toggleTheme()`, `setTheme()`; it sets `document.documentElement.dataset.theme` and persists to `localStorage` only on explicit user toggle.
4. Add a new `ThemeToggle.vue` component (button with inline SVG sun/moon, `aria-label="Switch to light theme"` / `"Switch to dark theme"`), rendered from `App.vue`.
5. Add a blocking external script `public/js/theme-init.js` loaded in `<head>` of `index.html` that sets `data-theme` before first paint. **Deviation from the issue's "inline script":** `netlify.toml` sets `Content-Security-Policy: script-src 'self'` (no `unsafe-inline`), so an inline script would be blocked in production. A synchronous (non-`defer`) same-origin script in `<head>` gives the identical no-flash behavior and is CSP-compliant. Mention this in the PR/notes.
6. Make the legacy global scripts theme-aware: `public/js/color.js` picks a dark or light gradient palette based on `data-theme`; the three.js particle canvas is made visible on light via CSS.
7. Smooth transition: a short `transition` on background/color/border-color for themed elements, applied through a `data-theme-transition` flag/class on `<html>` that is added only during a user toggle (and removed ~300ms later) so initial load and route changes are not animated and `prefers-reduced-motion` disables it.

## Relevant Files
Use these files to implement the feature:

- `README.md` - project overview and commands (`pnpm dev` at :8080, `pnpm lint`, `pnpm build`); the notes section should get a short "Theming" paragraph.
- `.claude/commands/conditional_docs.md` - checked; only README.md is relevant.
- `.claude/commands/test_e2e.md` and `.claude/commands/e2e/test_basic_query.md` - read these to understand how to write/run an E2E test file. (Note: `.claude/commands/e2e/test_theme_toggle.md` already exists in the repo; see tasks.)
- `index.html` - add the blocking `theme-init.js` script in `<head>` (before the font loader / any CSS), `<meta name="color-scheme" content="dark light">`, and a `theme-color` meta updated by the init script.
- `netlify.toml` - read-only reference: CSP `script-src 'self'` is why the init script must be an external file, not inline. Do not change the CSP.
- `src/main.js` - app bootstrap; store is created via `createPinia()`. Initialize the store's theme from `document.documentElement.dataset.theme` (set by the init script) so Vue state matches the DOM.
- `src/App.vue` - root component; holds the global (unscoped) styles (`html, body` colors, headings/`p` colors, `#page` overlay `rgba($black, .5)`, scrollbar). Import `_theme.scss` here once, convert these colors to tokens, render `<ThemeToggle />`, add the transition rule and `canvas` light-theme handling.
- `src/styles/_globals.scss` - existing SCSS vars/mixins/breakpoints. Keep `$white`/`$black`/etc. only for colors that are NOT theme dependent (e.g. YIP brand colors); add small helpers if useful. Do not put `:root` rules here (it is `@use`d by every component and would duplicate CSS).
- `src/plugins/store.js` - Pinia `useUiStore`; add theme state/actions here.
- `src/components/page/index.js` - barrel export of page components; export `ThemeToggle`.
- `src/components/page/HexNav.vue` - fixed top-right hex burger; the toggle must not overlap it (including its mobile fan-out to the left). Uses `$white` for link text and a blue glow filter on the active link; the hex PNG icons are dark-theme art (see Notes).
- `src/components/page/DynamicBackground.vue` - `#canvas` fallback `background-color: #1a1724` → token. (The component is exported but `App.vue` renders its own `canvas-wrap`; keep both consistent.)
- `src/components/page/SiteFooter.vue` - teal accent, grey text (`#cdd6df`, `#7f8c9a`, `#9aa7b4`), `rgba(255,255,255,.1)` divider → tokens.
- `src/components/page/Project.vue` - project card colors (`#f2f2f2`, `$white`, teal chips) → tokens.
- `src/components/page/Skills.vue` - teal border, skill tags (`#263238` text on `#fff`) → tokens.
- `src/components/page/Chart.js` - Chart.js options `fontColor: "white"`, `gridColor: "#314149"` and teal bar colors; read values from CSS variables at creation and re-render when the theme changes.
- `src/views/About.vue` - largest color consumer (30 usages: teal `#64ffda`, ink `#e9eef3`, muted `#9aa7b4`/`#8a97a5`, panel `rgba(40,48,58,.72)`, text-shadows using `rgba($black, …)`, `rgba($black,.5)` overlay). Convert to tokens; keep the existing comment about the 4.5:1 contrast fix.
- `src/views/Projects.vue` - project list page (teal chips/links, overlay, text shadow) → tokens.
- `src/views/projects/CaseStudy.vue` - defines local SCSS color vars `$cs-teal`, `$cs-teal-2`, `$cs-panel`, `$cs-panel-2`, `$cs-line`, `$cs-ink`, `$cs-muted` plus literal `#cdd6df`/`#d4dde6`; repoint these SCSS vars at `var(--…)` tokens so the rest of the file needs minimal edits.
- `src/views/projects/YIP.vue` - has its own palette (`$yip-*` brand colors, `$black`/`$white` card colors at ~463–547). Brand colors stay; surrounding text/background colors that sit on the themed page must be checked for contrast in light mode.
- `src/views/Blog.vue` - `rgba($black,.5)` / `rgba($white,.5)` overlay and border → tokens (route is not linked but still exists).
- `src/views/ProjectDetails.vue`, `src/views/errors/NotFound.vue` - quick check for any hard-coded colors; convert if present.
- `public/js/color.js` - legacy animated gradient (`colors` array capped by `MAX_BACKGROUND_LUMINANCE = 0.15`, writes `el.style.background` every frame). Add a light palette and select by `document.documentElement.dataset.theme` each frame.
- `public/js/3d-lines-animation.js` - minified three.js particle canvas (white sprites/lines at 0.5/0.2 opacity). Do not edit the minified file; handle light mode with CSS on `#canvas canvas`.
- `public/js/font-loader.js` - reference for how a small external script in `public/js/` is written (style, no jQuery).
- `eslint.config.js` - `public/js/**` is ignored by lint; `src/**` is linted with `flat/essential` (`pnpm lint` runs with `--fix`).
- `scripts/**`, `adws/**` - reviewed; no changes needed (start/stop scripts bring up the dev server on :8080).

### New Files
- `src/styles/_theme.scss` - the dark and light token sets (CSS custom properties) plus `color-scheme`.
- `src/components/page/ThemeToggle.vue` - the toggle button component.
- `public/js/theme-init.js` - blocking pre-render script that resolves and applies the initial theme.
- `.claude/commands/e2e/test_theme_toggle.md` - E2E test for the feature (already present in the repo; Task "E2E test file" says to verify/align it rather than recreate).

## Implementation Plan
### Phase 1: Foundation
- Audit every color (grep for `$white|$black|#hex|rgba(`) in the 13 files and group them into semantic tokens. Proposed token set (names are the contract; implementer picks final light values and verifies contrast):
  - Surfaces: `--bg` (dark `#262626` / light `#f4f6f8`), `--page-overlay` (dark `rgba(38,38,38,.5)` / light `rgba(255,255,255,.55)`), `--panel-bg`, `--panel-bg-2`, `--line`, `--chip-bg` (translucent teal tint).
  - Text: `--text` (dark `#F2F2F2` / light `#1b2430`), `--text-strong` (`#e9eef3` / `#0f1720`), `--text-soft` (`#cdd6df` / `#334155`), `--text-muted` (`#9aa7b4`/`#8a97a5` → light `#4a5868`), `--text-inverse` (for text on `--chip-solid`, e.g. Skills tags).
  - Accent: `--accent` (dark `#64ffda` / light a dark teal such as `#00695c`, ≥4.5:1 on `--panel-bg` and page), `--accent-2` (`#1de9b6` / `#00897b` darker variant), `--accent-bg`, `--accent-bg-hover`, `--accent-border`, `--accent-glow`.
  - Effects: `--text-shadow` color for hero text over the gradient (dark `rgba(38,38,38,.9)` / light `rgba(255,255,255,.8)`), `--scrollbar-track`, `--scrollbar-thumb`.
  - Chart: `--chart-text`, `--chart-grid`, `--chart-bar-1`, `--chart-bar-2`.
  - Toggle: `--toggle-bg`, `--toggle-border`, `--toggle-icon`.
- Dark theme values are exactly today's values so the dark look is pixel-identical. Light values target WCAG AA: 4.5:1 for body text/links, 3:1 for large text and UI borders/icons; verify with a contrast calculation, not by eye.
- Add `color-scheme: dark` / `light` to each theme block so native scrollbars/form controls match.

### Phase 2: Core Implementation
- `public/js/theme-init.js`: read `localStorage.theme` (try/catch for blocked storage); accept only `"dark"`/`"light"`; else use `matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'`; set `document.documentElement.dataset.theme`; update `<meta name="theme-color">`.
- Pinia store: `theme` state initialized from `document.documentElement.dataset.theme || 'dark'`; `setTheme(value, persist)` updates state, `dataset.theme`, and (if `persist`) `localStorage.setItem('theme', value)` inside try/catch; `toggleTheme()` flips and persists. Dispatch no globals; consumers (Chart) watch the store.
- Before the user has made an explicit choice, listen to `matchMedia('(prefers-color-scheme: light)')` `change` and follow the OS live (do not persist). Once `localStorage.theme` exists, ignore OS changes.
- `ThemeToggle.vue`: native `<button type="button" data-testid="theme-toggle">` (keyboard accessible for free: Tab, Enter, Space), `:aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"`, inline SVG sun (shown in dark) / moon (shown in light), `aria-hidden="true"` on the SVGs, `@click.stop` so it does not trigger App's document click handler beyond what is needed, visible `:focus-visible` ring using `--accent` (the global `*:not(input):not(textarea){outline:none !important}` rule in `App.vue` kills outlines, so draw the ring with `box-shadow`, which is not affected). Minimum 44×44px hit area.
- Position: `position: fixed; top: 10px; left: 16px; z-index` above `#app` (the site has no header bar; the fixed top strip is its header). Left side avoids the right-aligned hex menu; at 390px the open menu's leftmost hex starts at ~x=58px while the toggle spans 16–60px, so verify there is no overlap (shift to `left: 8px`/smaller size on mobile if needed).

### Phase 3: Integration
- `App.vue`: `@use "styles/theme"` once in the global style block; swap `$white`/`$black` usages for tokens; render `<ThemeToggle />` inside `#app`; add:
  - `html[data-theme-transition], html[data-theme-transition] *, … *::before, *::after { transition: background-color .3s ease, color .3s ease, border-color .3s ease, fill .3s ease, stroke .3s ease !important; }` wrapped in `@media (prefers-reduced-motion: no-preference)`. The store sets/removes `data-theme-transition` around a user toggle (~350ms timeout).
  - `html[data-theme="light"] #canvas canvas { filter: invert(1); }` so the white particles show on the light gradient.
- Convert all component/view colors to tokens (see Relevant Files). For SCSS variables local to a file (CaseStudy), repoint them to `var(--token)`.
- `color.js`: two palettes (`darkColors` = existing, luminance-capped as today; `lightColors` = pale teal/blue/lavender tints with a *minimum* luminance clamp analogous to the existing cap so the text contrast math holds). Choose palette per frame from `dataset.theme`; since the interpolation uses indices into the array, both palettes must have the same length. Smoothly crossfade is not required (the CSS transition does not apply to inline gradients), instant swap on next frame is acceptable.
- `Chart.js`: build options from `getComputedStyle(document.documentElement).getPropertyValue('--chart-…')`; watch `useUiStore().theme` and re-create/update the chart so axes/grid/bars follow the theme (give the chart component a `:key` bound to the theme, the simplest approach).
- README: add a "Theming" note (tokens live in `src/styles/_theme.scss`, init script, how to add a token).

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Read context
- Read `README.md`, `.claude/commands/test_e2e.md`, `.claude/commands/e2e/test_basic_query.md` and the existing `.claude/commands/e2e/test_theme_toggle.md`.
- Run `git grep -nE '\$(white|grey|black)\b|#[0-9a-fA-F]{3,8}\b|rgba?\(' -- src public/js/color.js` to produce the working checklist of colors to migrate.

### E2E test file
- Verify `.claude/commands/e2e/test_theme_toggle.md` exists (it does) and matches this feature: it must cover steps for dark default (emulated `prefers-color-scheme: dark`), toggle click, aria-label change, `localStorage.theme`, reload persistence (check `data-theme` before app mount), a second page (`/projects` then a case study), 390px width (toggle visible, no overlap with hex menu), keyboard activation (Tab/Enter), first-visit OS preference, and the 5 screenshots named `01_home_dark`, `02_home_light`, `03_home_reload_light`, `04_project_light`, `05_mobile_light`. Only edit it if something is missing or if selectors changed (it relies on `button[data-testid="theme-toggle"]` — keep that attribute on the component). If it is missing for any reason, create it from the `test_basic_query.md` format with exactly those steps.

### Theme tokens
- Create `src/styles/_theme.scss` with the dark tokens on `:root, :root[data-theme="dark"]` (exactly today's values, plus `color-scheme: dark`) and light tokens on `:root[data-theme="light"]` (`color-scheme: light`). Add a comment block listing each token's purpose.
- Compute contrast ratios for every text/background and accent/background pair in both themes (text on `--page-overlay` over the lightest/darkest gradient stop, text on `--panel-bg`, accent on both, muted on both, chip text on chip bg, toggle icon on toggle bg) and adjust light values until AA is met. Record the key ratios in a short comment in `_theme.scss`.

### Pre-render init script
- Create `public/js/theme-init.js` (plain ES5-style like the other legacy scripts, wrapped in an IIFE, try/catch around `localStorage`).
- In `index.html` `<head>`, add `<meta name="color-scheme" content="dark light">`, `<meta name="theme-color" content="#262626">` and `<script src="/js/theme-init.js"></script>` (NO `defer`/`async`) before the font loader. Add a comment explaining why it is an external file (CSP `script-src 'self'`) rather than inline.

### Store and toggle component
- Extend `src/plugins/store.js` with `theme` state and `setTheme`/`toggleTheme` actions (persist only on explicit toggle; guard `localStorage` with try/catch; manage the transient `data-theme-transition` attribute; OS-change listener only while no saved choice).
- Create `src/components/page/ThemeToggle.vue` (options API with `mapState`/`mapActions` to match the codebase style, `<style lang="scss">` with `@use '../../styles/_globals' as *;`, tabs for indentation like the neighbouring components). Export it from `src/components/page/index.js`.
- Render it in `src/App.vue` inside `#app` next to `<HexNav />`.

### Convert styles to tokens
- `src/App.vue`: import theme once; convert `html, body`, headings, `p`, `#page`, scrollbar colors; add transition and canvas-invert rules.
- Convert, one file at a time, theme-dependent colors in: `HexNav.vue`, `DynamicBackground.vue`, `SiteFooter.vue`, `Project.vue`, `Skills.vue`, `About.vue`, `Projects.vue`, `CaseStudy.vue`, `YIP.vue` (page-level text/backgrounds only; keep `$yip-*` brand colors), `Blog.vue`, and check `ProjectDetails.vue`/`NotFound.vue`. Leave non-themed brand colors alone. Remove any literal that duplicates a token.
- Hex PNG icons (`menu.png`, `link-hex*.png`): inspect them in light mode; if they are illegible on the light gradient, adjust via CSS `filter` scoped to `html[data-theme="light"]` on `#st_mainNav` and `.st_hexButton` (do not add new image assets).

### Legacy scripts and chart
- Update `public/js/color.js` with a light palette and per-frame palette selection; keep the reduced-motion static-frame behavior working (it calls `updateGradient(0)` once, so it must also repaint when the theme changes: listen for a `themechange` event or a `MutationObserver` on `data-theme` and call `updateGradient(0)`).
- Update `src/components/page/Chart.js` (and its consumer if a `:key` is needed in `Skills.vue`) to use token-derived colors and react to theme changes.

### Docs
- Add the short "Theming" section to `README.md`.

### Validate
- Run `pnpm dev` (or `scripts/start.sh`) and manually check: toggle visible on home, `/projects`, a case study (e.g. `/projects/yip`) and at 390px; both themes look right on every page; text/links/chips/cards readable; no flash on hard reload with a saved light theme (throttle CPU and watch the first paint); clearing storage with OS set to light starts light.
- Run the `Validation Commands` below, fix anything that fails, and re-run until all pass.

## Testing Strategy
### Unit Tests
The project has no unit test runner, so no unit test files are added (do not add a new dependency for this). Behavior is covered by the Playwright E2E test plus `pnpm lint`/`pnpm build`. Logic kept small and pure in the store (`resolve initial theme`, `toggle`, `persist`) so it is trivially checkable in the browser console.

### Edge Cases
- `localStorage` unavailable/throws (private mode, blocked cookies): init script and store must not throw; theme still toggles for the session.
- `localStorage.theme` contains an invalid value (`"blue"`): ignore and fall back to the OS preference.
- First visit with OS = light and OS = dark; OS preference changes while the page is open and no saved choice (follows live); after a saved choice OS changes are ignored.
- Hard reload on `/projects/:id` deep link in light theme: no dark flash (init script runs in `<head>` before CSS/app).
- Route changes keep the theme; the transition class is not left stuck on `<html>`; rapid double-clicks do not leave the wrong aria-label or stuck transition timer.
- `prefers-reduced-motion: reduce`: no color transitions; the static gradient frame repaints with the right palette on toggle.
- Keyboard: Tab reaches the button with a visible focus ring, Enter and Space toggle it.
- Mobile 390px: toggle is visible, 44px tap target, no overlap with the hex menu closed or open.
- Chart.js bars/axes readable in both themes and update after toggling without a reload.
- Light-theme contrast on: hero text over the gradient, `--text-muted`, teal chips/links, footer text, YIP page cards, scrollbar.
- Production CSP: build + `pnpm preview`, confirm the console shows no CSP violation (script is external).

## Acceptance Criteria
- A sun/moon toggle button is visible in the top header area on the home page, every other page, and at 390px width; sun is shown in dark mode, moon in light mode.
- Clicking it flips `html[data-theme]` between `dark` and `light`, the whole page (background, text, links, buttons, cards, footer, chart) changes with a short (~300ms) color transition; no transition on first paint or when `prefers-reduced-motion: reduce`.
- Themes are CSS custom properties defined in `src/styles/_theme.scss`; no theme-dependent hard-coded colors remain in components (brand-fixed colors such as `$yip-*` excepted).
- First visit follows `prefers-color-scheme`; after a click the choice is stored in `localStorage` (`theme`) and applied on every later visit, including after a reload.
- `data-theme` is set before the app renders (external blocking script in `<head>`), with no flash of the wrong theme and no CSP violation in production.
- Text, links, buttons and cards meet WCAG AA contrast (4.5:1 text, 3:1 large text/UI components) in both themes.
- The button is a real `<button>`, keyboard operable, with a visible focus ring and `aria-label` "Switch to light theme" / "Switch to dark theme" matching the current state.
- The dark theme is visually unchanged from the current site.
- `pnpm lint` and `pnpm build` pass.
- The 5 review screenshots can be captured: home dark, home light, home after reload (light), a project page in light, 390px light with the toggle visible.

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `Read .claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_theme_toggle.md` to validate this functionality works.
- `pnpm lint` - Run ESLint on the frontend with zero errors
- `pnpm build` - Run the frontend production build with zero errors
- `pnpm preview` (then load http://localhost:4173 with devtools open) - confirm no CSP/console errors and no theme flash on reload in the production build

## Notes
- No new libraries are needed (inline SVG icons, no icon package; no `uv add`).
- The issue asks for an inline script in `index.html`; this plan uses an external blocking script (`public/js/theme-init.js`) because `netlify.toml`'s CSP is `script-src 'self'`. If an inline script is strictly required, the alternative is adding its `sha256-…` hash to the CSP header in `netlify.toml`, which must be recomputed whenever the script changes.
- The site has no header bar; the "header" is the fixed top strip containing the hex menu at top-right. The toggle goes top-left to avoid colliding with the hex menu's fan-out.
- `public/js/color.js` and the minified three.js script are legacy globals that are ignored by ESLint (`public/js/**`); changes there are only verified manually/E2E.
- The hex menu/button artwork (`menu.png`, `link-hex*.png`) is raster art designed for the dark theme; fix legibility with CSS filters scoped to the light theme rather than new assets. If that looks poor, a follow-up could replace them with themed SVGs.
- Future: a third "system" option (follow OS, clearing the stored choice) would slot into the same store with minimal change.
