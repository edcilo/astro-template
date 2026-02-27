# Base Tooling Configuration — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Template reutilizable, solo .astro, deploy en Vercel

## Decisions

- Solo componentes `.astro` (sin framework UI)
- Deploy target: Vercel (static)
- Template reutilizable para múltiples proyectos
- Sin git hooks por ahora (ejecución manual de linter/formatter)
- Vitest incluido desde el inicio

## Tools

### 1. Prettier

- **Packages:** `prettier`, `prettier-plugin-astro`, `prettier-plugin-tailwindcss`
- **Config:** `prettier.config.mjs` (ESM)
- **Rules:** single quotes, trailing commas, semicolons, 2-space indent (TS/JS/CSS/JSON), tabs for `.astro`
- **Scripts:** `format`, `format:check`
- **Ignore:** `.prettierignore` for `dist/`, `node_modules/`, `.astro/`, `package-lock.json`

### 2. ESLint

- **Packages:** `eslint`, `eslint-plugin-astro`, `@typescript-eslint/parser`, `@typescript-eslint/eslint-plugin`, `eslint-config-prettier`
- **Config:** `eslint.config.mjs` (flat config, ESLint 9)
- **Rules:** recommended from astro + typescript-eslint, no `any`, prettier compat
- **Scripts:** `lint`, `lint:fix`

### 3. Tailwind CSS v4

- **Installation:** via `@astrojs/tailwind` integration
- **Config:** CSS-first (`src/styles/global.css` with `@import "tailwindcss"`)
- **No `tailwind.config.js`** — v4 uses CSS-based configuration

### 4. Vitest

- **Packages:** `vitest`
- **Config:** `vitest.config.ts`
- **Scripts:** `test`, `test:watch`
- **Directory:** `src/tests/` with `.test.ts` suffix
- **Includes a placeholder test**

### 5. EditorConfig + .nvmrc

- `.editorconfig`: tabs for `.astro`, 2 spaces for TS/JS/CSS/JSON, LF, UTF-8
- `.nvmrc`: Node 22

## Scripts (package.json)

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview",
  "check": "astro check",
  "lint": "eslint .",
  "lint:fix": "eslint . --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "vitest run",
  "test:watch": "vitest",
  "validate": "npm run check && npm run lint && npm run format:check && npm run test"
}
```

## Generated Files

| File                      | Purpose                   |
| ------------------------- | ------------------------- |
| `prettier.config.mjs`     | Prettier configuration    |
| `.prettierignore`         | Files ignored by Prettier |
| `eslint.config.mjs`       | ESLint flat config        |
| `src/styles/global.css`   | Tailwind entry point      |
| `vitest.config.ts`        | Vitest configuration      |
| `src/tests/setup.test.ts` | Placeholder test          |
| `.editorconfig`           | Editor consistency        |
| `.nvmrc`                  | Node version pinned       |
