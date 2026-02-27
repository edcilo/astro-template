# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- **Header component system** — Responsive header with three sections: logo, navigation, tools
  - `Header.astro` — Main component with configurable props: `sticky`, `fullWidth`, `maxWidth`, `transparent`, `blurred`, `bordered`, `shadow`
  - `HeaderLogo.astro` — Logo section with link to home, references `public/logo.svg`
  - `HeaderNav.astro` — Navigation placeholder (empty, ready for future links)
  - `HeaderTools.astro` — Container for tool buttons (theme, language)
  - `ThemeToggle.astro` — Theme toggle button (visual only, no functionality yet)
  - `LanguageToggle.astro` — Language toggle button (visual only, no functionality yet)
  - `MobileMenu.astro` — Fullscreen overlay menu for mobile with open/close toggle
  - Vanilla JS for mobile menu: hamburger toggle, close button, Escape key support
  - Glassmorphism style: semi-transparent background with `backdrop-blur`
  - Inner container with configurable `maxWidth` (default `max-w-7xl` / 1280px)
- **BaseLayout** (`src/layouts/BaseLayout.astro`) — Base page layout with `<html>`, `<head>`, Header, and `<slot />`
  - Props: `title` (required), `description` (optional)
  - Centralizes `global.css` import and HTML boilerplate
- **Project logo** (`public/logo.svg`) — edcilo brand logo as static SVG asset
- Refactored `src/pages/index.astro` to use `BaseLayout`
- **Centralized site configuration** (`src/config/site.ts`) — Typed configuration object
  - `SiteConfig`: title, description, lang
  - `HeaderConfig`: all header props + logo, navigation, tools
  - `LogoConfig`: src, alt for the logo image
  - `NavigationItem`: label, href for future nav links
  - `ToolsConfig`: themeToggle, languageToggle boolean flags
  - Typed exports: `Config`, `HeaderConfig`, `LogoConfig`, `NavigationItem`, `ShadowSize`, `SiteConfig`, `ToolsConfig`
- **Mobile drawer** — Converted mobile menu from fullscreen overlay to slide-in drawer
  - Drawer panel slides from right with CSS transition (`translate-x-full` → `translate-x-0`)
  - Backdrop overlay (`bg-black/20 backdrop-blur-sm`) closes menu on click
  - `role="dialog"` and `aria-modal="true"` for accessibility
  - `transitionend` listener hides container after animation completes
- **Theme toggle** — 3-state theme switching system (light / dark / system)
  - `ThemeToggle.astro` rewritten with 3 SVG icons (sun, moon, monitor) and cycle logic
  - Persists user preference in `localStorage` with key `theme`
  - Respects `prefers-color-scheme` when in system mode
  - Listens for OS theme changes and re-applies automatically
  - Anti-FOUC inline script in `<head>` prevents flash of wrong theme on load
- **Dark mode support** — Tailwind CSS v4 class-based dark mode
  - `@custom-variant dark (&:where(.dark, .dark *))` in `global.css`
  - `dark:` variant classes applied to all existing components (header, drawer, buttons, body, text)
- **`Theme` type** added to `src/config/site.ts` with `defaultTheme: 'system'` in site config
- **Language selector** — Custom dropdown for language switching (EN / ES)
  - `LanguageToggle.astro` rewritten as custom dropdown with trigger button showing language code
  - Dropdown with `role="listbox"`, options with `role="option"` and `aria-selected`
  - Persists user preference in `localStorage` with key `lang`
  - Updates `<html lang="">` attribute on change
  - Anti-FOUC inline script in `<head>` restores lang before render
  - Syncs all instances (desktop + drawer) via `data-*` attributes
  - Dark mode classes on dropdown, options, and trigger
  - No real translation — placeholder for future i18n integration
- **`LanguageConfig` type** added to `src/config/site.ts` with `languages` array in site config

### Changed

- `BaseLayout` props now optional with defaults from `config.site`
- `Header` props defaults sourced from `config.header` instead of hardcoded values
- `HeaderLogo` receives `logo: LogoConfig` prop (dynamic src/alt)
- `HeaderTools` receives `tools: ToolsConfig` prop (conditional rendering of toggles)
- `MobileMenu` receives `tools: ToolsConfig` prop and passes to `HeaderTools`
- Mobile menu JS init changed from `astro:page-load` to direct call + `astro:after-swap`
- `HeaderLogo` changed from `<img>` to inline SVG with `fill="currentColor"` and `fill-rule="evenodd"` for dark mode support
- `ThemeToggle` changed from IDs to `data-*` attributes for multi-instance sync
- `HeaderTools` now imports `config` and passes `languages`/`defaultLang` to `LanguageToggle`

### Fixed

- Event listener accumulation in `Header.astro` and `LanguageToggle.astro` — now use `AbortController` for cleanup on re-init
- Escape key priority: language dropdown closes first, then mobile drawer (via `event.stopPropagation()`)

### Technical Notes

- Header uses conditional class computation in frontmatter with `filter(Boolean).join(' ')`
- Shadow prop uses enum-to-class mapping (`'none' | 'sm' | 'md' | 'lg' | 'xl'`) with `Record<ShadowSize, string>`
- Mobile menu JS uses direct init + `astro:after-swap` for View Transitions compatibility
- Body scroll is locked (`overflow-hidden`) when mobile menu is open
- All interactive elements have proper ARIA attributes (`aria-label`, `aria-expanded`, `aria-controls`)

## [0.0.1] - 2026-02-27

### Added

- **Prettier** (v3.8.1) with `prettier-plugin-astro` and `prettier-plugin-tailwindcss`
  - Config: `prettier.config.mjs` — single quotes, trailing commas, semicolons, tabs for `.astro`
  - `.prettierignore` for build artifacts
- **ESLint 9** (flat config) with `typescript-eslint`, `eslint-plugin-astro`, `eslint-config-prettier`
  - Config: `eslint.config.mjs` — type-checked rules, no `any`, Prettier compat
- **Tailwind CSS v4** via `@tailwindcss/vite` (not `@astrojs/tailwind`)
  - CSS-first configuration in `src/styles/global.css`
  - Integrated as Vite plugin in `astro.config.mjs`
- **Vitest** (v4.0.18) with Astro's `getViteConfig`
  - Config: `vitest.config.ts` — inherits Astro Vite config automatically
  - Placeholder test: `src/tests/setup.test.ts`
- **EditorConfig** — tabs for `.astro`, 2 spaces for TS/JS/CSS/JSON, UTF-8, LF
- **`.nvmrc`** — pinned to Node.js 22
- **npm scripts**: `check`, `lint`, `lint:fix`, `format`, `format:check`, `test`, `test:watch`, `validate`
- **`@astrojs/check`** and **TypeScript** as dev dependencies for `astro check`
- Updated `src/pages/index.astro` with Tailwind CSS classes and global CSS import

### Technical Notes

- Tailwind v4 removed `tailwind.config.js` — all config is CSS-first via `@theme {}`
- `typescript-eslint` v8 unifies `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`
- ESLint 9 (not 10) chosen for ecosystem stability
- `prettier-plugin-tailwindcss` must be last in the plugins array
- `eslint-config-prettier` must be last in the ESLint config chain
