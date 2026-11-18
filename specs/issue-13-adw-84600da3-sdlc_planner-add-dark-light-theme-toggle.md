# Feature: Add dark/light mode toggle

## Metadata
issue_number: `13`
adw_id: `84600da3`
issue_json: `{"number":13,"title":"Add dark/light mode toggle","body":"Add a dark/light theme toggle to the website (button in header with sun/moon icon, CSS custom properties switched by data-theme on <html>, OS preference on first visit, localStorage persistence, no flash of wrong theme via inline script in index.html, WCAG AA contrast, keyboard accessible with aria-label naming the target theme, existing look kept as dark theme). Acceptance: toggle visible on home page, switches dark<->light, persists after reload, pnpm lint and pnpm build pass. Review screenshots with Playwright at http://localhost:8080: home dark, home light, home after reload (light), a project page in light, 390px mobile in light."}`

## Feature Description
Add a theme toggle button that switches the whole portfolio between the existing dark look and a new light theme. Themes are defined as CSS custom properties in `src/styles/` and selected by a `data-theme="dark" | "light"` attribute on `<html>`. The first visit follows `prefers-color-scheme`; after the user clicks the toggle the choice is stored in `localStorage` and wins on all later visits. A tiny inline script in `index.html` applies the theme before the app renders so there is no flash of the wrong theme. The toggle shows a sun icon in dark mode and a moon icon in light mode, is keyboard accessible, and has an `aria-label` naming the theme it switches to.

## User Story
As a visitor to the portfolio
I want to switch between a dark and a light theme
So that I can read the site comfortably in my environment and have my choice remembered

## Problem Statement
The site is dark-only. Colors are hard-coded SCSS variables (`$white`, `$black`, ...) and many literal hex/rgba values (teal `#64ffda`, panel `rgba(40,48,58,.72)`, muted `#9aa7b4`, ...) scattered across `App.vue`, views and components, plus a JS-driven dark gradient background (`public/js/color.js`) and white 3D sprites (`public/js/3d-lines-animation.js`). Visitors who prefer a light UI (or have a light OS setting) have no option, and nothing is themeable at runtime.

## Solution Statement
1. Define semantic CSS custom properties (`--color-bg`, `--color-text`, `--color-text-muted`, `--color-accent`, `--color-panel`, `--color-border`, overlay/shadow tints, etc.) for `[data-theme="dark"]` (the current values, so the dark look is unchanged) and `[data-theme="light"]` (designed to match, with AA contrast) in a new `src/styles/_themes.scss`, emitted once from `App.vue`'s global style block.
2. Replace theme-dependent hard-coded colors in components with `var(--...)`. For colors that need alpha, expose RGB-triplet variables (e.g. `--accent-rgb: 100, 255, 218`) and use `rgba(var(--accent-rgb), .4)`.
3. Add a theme Pinia store (following the `src/plugins/store.js` pattern) holding `theme`, with `init`/`toggle` that set `document.documentElement.dataset.theme` and `localStorage.theme`. Add a `ThemeToggle.vue` component fixed in the header area (top-left, opposite the hex menu), mounted in `App.vue` so it is on every page and at mobile width.
4. Add an inline script in `index.html` `<head>` that resolves saved-or-OS theme and sets `data-theme` before first paint.
5. Make the legacy background theme-aware: `color.js` picks a dark or light palette from `document.documentElement.dataset.theme`, and the sprite/line color in `3d-lines-animation.js` is switched on a `themechange` window event.
6. Add a short `transition` on `background-color`, `color`, `border-color`, `fill` for smooth switching, disabled under `prefers-reduced-motion`.

## Relevant Files
Use these files to implement the feature:

- `README.md` - project overview and pnpm commands (read first; add a Theming note).
- `.claude/commands/conditional_docs.md` - checked; only README.md applies.
- `.claude/commands/test_e2e.md` and `.claude/commands/e2e/test_basic_query.md` - read these to understand how to create/structure an E2E test file.
- `.claude/commands/e2e/test_theme_toggle.md` - the E2E test file for this feature already exists in the repo; verify/align it with the final implementation (selector `button[data-testid="theme-toggle"]`, labels `Switch to light theme` / `Switch to dark theme`, screenshots 01-05).
- `index.html` - add the inline pre-render theme script and `<meta name="color-scheme" content="dark light">`.
- `src/main.js` - initialize the theme store before mount.
- `src/App.vue` - global styles: `html, body` use `$white`/`$black`; `h1-h4`, `p` colors; `#page` overlay `rgba($black, .5)`; scrollbar uses `$blue`; mount `ThemeToggle` here; emit theme variables.
- `src/styles/_globals.scss` - SCSS color variables and mixins; keep breakpoints, repoint/remove theme-dependent colors.
- `src/plugins/store.js` - Pinia store pattern to follow for the theme store.
- `src/components/page/index.js` - export the new `ThemeToggle` component.
- `src/components/page/HexNav.vue` - fixed top-right hex menu; the toggle must not overlap it; hover glow color.
- `src/components/page/DynamicBackground.vue` - `#canvas` background-color `#1a1724` and `div.canvas-content` color `#fff`.
- `src/components/page/Project.vue`, `SiteFooter.vue`, `Skills.vue` - hard-coded teal/grey/white colors to convert.
- `src/views/About.vue`, `Blog.vue`, `Projects.vue`, `ProjectDetails.vue` - hard-coded colors, text-shadows and `rgba($black/$white, ...)` overlays to convert.
- `src/views/projects/CaseStudy.vue` - `$cs-teal`, `$cs-panel`, `$cs-line`, `$cs-ink`, `$cs-muted` SCSS variables to become CSS variables; `YIP.vue` - brand `$yip-*` colors (keep, verify readability on light panels).
- `public/js/color.js` - dark-luminance-capped gradient palette; add a light palette keyed on theme.
- `public/js/3d-lines-animation.js` (minified) - sprite/line color `16777215` (white); recolor on theme change.
- `src/assets/images/icons/menu.png`, `link-hex.png` - raster hex images are designed for dark; check visibility on light (see Notes).

### New Files
- `src/styles/_themes.scss` - `dark` and `light` custom property blocks plus `color-scheme`, transition rule and reduced-motion override.
- `src/components/page/ThemeToggle.vue` - the toggle button with inline sun/moon SVG icons (`currentColor`), `data-testid="theme-toggle"`, dynamic `aria-label`.
- `.claude/commands/e2e/test_theme_toggle.md` - E2E test (already present; update only if it diverges from the implementation).

## Implementation Plan
### Phase 1: Foundation
Audit every hard-coded color (`grep -rnE "#[0-9a-fA-F]{3,8}\b|rgba?\(" src public/js`). Define the semantic variable set, the dark values (identical to today's colors) and the light values (verify WCAG AA: >=4.5:1 for text, >=3:1 for UI borders/icons; the teal `#64ffda` fails on light backgrounds, so use a deep teal such as `#00695c` for text/links in light). Create `_themes.scss`.

### Phase 2: Core Implementation
Create the theme Pinia store and `ThemeToggle.vue`; add the inline `index.html` script; wire the legacy background (`color.js`, `3d-lines-animation.js`) to the theme.

### Phase 3: Integration
Mount the toggle in `App.vue`, convert every component/view to variables, add transitions, verify both themes on all pages and at 390px, update README, run E2E and validation.

## Step by Step Tasks
IMPORTANT: Execute every step in order, top to bottom.

### Read context and E2E conventions
- Read `README.md`, `.claude/commands/test_e2e.md`, `.claude/commands/e2e/test_basic_query.md` and the existing `.claude/commands/e2e/test_theme_toggle.md`.
- Run the color grep above plus a grep for `$white|$black|$grey|$blue|$darkblue` in `src` to build the conversion checklist.

### Create the theme variables
- Create `src/styles/_themes.scss` with `:root[data-theme="dark"]` (current look) and `:root[data-theme="light"]` blocks defining: `--color-bg`, `--color-surface` (replaces the `rgba($black,.5)` page overlay), `--color-text`, `--color-text-muted`, `--color-text-subtle`, `--color-accent`, `--accent-rgb`, `--color-panel`, `--color-panel-2`, `--color-border`, `--color-ink`, `--shadow-text`, `--color-scrollbar`; set `color-scheme: dark` / `light`.
- Add a plain `:root` fallback equal to dark so a missing attribute never leaves variables undefined.
- Add a transition rule (`background-color, color, border-color, fill, box-shadow`, ~250ms ease) scoped to themed elements (do not use `*` and do not touch `transform`/`opacity`, to avoid interfering with ScrollReveal and `.st_fadeable`), and an `@media (prefers-reduced-motion: reduce)` override that disables it.
- Include it from `App.vue`'s unscoped `<style>` so the variables are emitted once.

### Theme store and toggle component
- In `src/plugins/store.js` add `useThemeStore` (`theme: 'dark'`; `init()` reads `document.documentElement.dataset.theme`, falling back to `matchMedia`; `toggle()` flips, sets the attribute, writes `localStorage.theme`, dispatches a `themechange` `CustomEvent` on `window`). Wrap `localStorage` access in try/catch. Persist only on user toggle (not on init) so the OS preference is followed until the user clicks.
- Create `src/components/page/ThemeToggle.vue`: `<button type="button" data-testid="theme-toggle">` with `:aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"`, sun SVG in dark mode and moon SVG in light mode (`aria-hidden="true"`, `currentColor`), >=44x44px hit area, visible `:focus-visible` ring using the accent variable. Fixed top-left with a z-index above `#app` (z-index 2); must not overlap the hex menu at 390px.
- Export it from `src/components/page/index.js` and render it in `src/App.vue` next to `<HexNav />`.
- In `src/main.js` call the theme store `init()` after `app.use(createPinia())` and before `app.mount`.

### No-flash inline script
- In `index.html` `<head>` (before other scripts) add a small synchronous inline script: read `localStorage.theme` in try/catch, accept only `dark`/`light`, else use `matchMedia('(prefers-color-scheme: light)')`, default `dark`; set `document.documentElement.setAttribute('data-theme', theme)`. Add `<meta name="color-scheme" content="dark light">` and a minimal inline `html` background per theme to avoid a white flash before the CSS loads.

### Convert styles to variables
- `src/App.vue`: `html, body` color/background, `h1-h4`, `p`, `#page` overlay, scrollbar colors.
- `DynamicBackground.vue`, `HexNav.vue`, `Project.vue`, `SiteFooter.vue`, `Skills.vue`: use variables (`rgba(var(--accent-rgb), a)` for tinted backgrounds/borders).
- `About.vue`, `Blog.vue`, `Projects.vue`, `ProjectDetails.vue`, `CaseStudy.vue` (replace `$cs-*` SCSS variables and any `rgba($cs-...)` usage with CSS variables); keep `YIP.vue` brand colors but verify contrast on light panels.
- Keep `_globals.scss` SCSS color variables only where not theme-dependent.
- Verify AA contrast for text/link/button/card pairs in both themes; record ratios in a comment next to the light values (matching the existing comment style in `About.vue`).

### Legacy background
- `public/js/color.js`: add a light palette (pale, high luminance, with a minimum-luminance floor instead of the max cap), choose palette by `document.documentElement.dataset.theme` each frame; in the reduced-motion static-frame path, repaint on `themechange`.
- `public/js/3d-lines-animation.js`: add a `themechange` listener that sets sprite and line material colors to white (dark) or dark slate (light), and apply the initial theme color after `init()`.

### Create/verify the E2E test file
- Confirm `.claude/commands/e2e/test_theme_toggle.md` matches the final implementation (selector, aria-labels, five screenshots `01_home_dark`, `02_home_light`, `03_home_reload_light`, `04_project_light`, `05_mobile_light`, keyboard step, first-visit OS preference step); edit only where it diverges. Follow the structure of `test_basic_query.md`.

### Docs
- Add a short "Theming" note to `README.md` (variables in `src/styles/_themes.scss`, switched by `data-theme`, persisted in `localStorage.theme`, how to add a new themed color).

### Final validation
- Run all `Validation Commands` below, fix any issue, and confirm both themes visually on home, `/projects`, a case study and at 390px.

## Testing Strategy
### Unit Tests
No unit test runner exists. Behavior is covered by the E2E test (`test_theme_toggle.md`) plus `pnpm lint` and `pnpm build`. Keep the store logic small and pure so it can be unit tested if Vitest is added later.

### Edge Cases
- `localStorage` unavailable/throwing (private mode): toggle works for the session; no crash on load.
- Invalid `localStorage.theme` value (e.g. `"blue"`): ignored, falls back to OS preference.
- First visit with OS light vs OS dark.
- Reload on any route (including direct load of a case study): no flash; `data-theme` set before the app mounts.
- Rapid repeated clicks; keyboard Tab/Enter/Space activation; visible focus ring in both themes.
- Mobile 390px: toggle visible, not overlapping the hex menu, hit area >= 44px.
- `prefers-reduced-motion`: no color transition; static background frame correct for the active theme.
- Animated gradient/3D sprites remain visible and readable in the light theme; ScrollReveal and `.st_fadeable` animations are unaffected by the transition rule.
- Hex menu/button PNG images remain legible on light backgrounds.

## Acceptance Criteria
1. A sun/moon toggle is visible in the header area on the home page, on every route, and at 390px width.
2. Clicking it switches the entire page between dark and light with a short smooth color transition; no component keeps a wrong-theme hard-coded color.
3. `document.documentElement.dataset.theme` is `dark` or `light`; themes are implemented with CSS custom properties in `src/styles/`.
4. First visit follows `prefers-color-scheme`; after a click the choice is stored in `localStorage` and used on later visits (survives reload) with no flash of the wrong theme.
5. Text, links, buttons and cards meet WCAG AA contrast (>=4.5:1 text, >=3:1 UI) in both themes; the dark theme looks the same as today.
6. The button is keyboard operable, shows a focus ring, and has `aria-label` "Switch to light theme" / "Switch to dark theme".
7. `pnpm lint` and `pnpm build` pass.
8. Review screenshots captured with Playwright at http://localhost:8080: home dark, home light, home after reload (light), project page light, 390px mobile light.

## Validation Commands
Execute every command to validate the feature works correctly with zero regressions.

- `Read .claude/commands/test_e2e.md`, then read and execute `.claude/commands/e2e/test_theme_toggle.md` to validate this functionality works.
- `pnpm lint` - Run frontend lint to validate the feature works with zero regressions
- `pnpm build` - Run frontend build to validate the feature works with zero regressions

## Notes
- No new libraries are required (pnpm project; `uv add` not applicable).
- The site has no real header bar: the only fixed chrome is the hex menu at top-right, so the toggle is placed fixed top-left as the header control; if a header is added later, move the component into it.
- `3d-lines-animation.js` is minified; edit carefully rather than reformatting the whole file.
- The hex menu/button images (`menu.png`, `link-hex.png`) are raster and dark-optimized; if illegible on the light theme, apply a CSS `filter` through a theme variable rather than creating new assets.
- If a strict CSP is introduced later, the inline theme script in `index.html` needs a hash/nonce (or move to a small external synchronous script).
