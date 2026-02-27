# Changelog

All notable changes to this project will be documented in this file.

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
