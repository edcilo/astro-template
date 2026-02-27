# AGENTS.md — edc-template

> Guidelines for AI coding agents operating in this repository.

## Project Overview

Astro 5 static site template. ESM-only, pure `.astro` components (no UI framework).
Styled with Tailwind CSS v4 (CSS-first config — there is **no** `tailwind.config.js`).

| Field           | Value                           |
| --------------- | ------------------------------- |
| Runtime         | Node.js 22 (see `.nvmrc`)       |
| Framework       | Astro 5.x                       |
| Language        | TypeScript (strict)             |
| Styling         | Tailwind CSS v4 via Vite plugin |
| Package manager | npm                             |
| Module system   | ESM (`"type": "module"`)        |

## Commands

```bash
npm run dev                # Dev server at localhost:4321
npm run build              # Production build → ./dist/
npm run check              # TypeScript & Astro diagnostics
npm run lint               # ESLint (flat config, type-checked)
npm run lint:fix           # ESLint with auto-fix
npm run format             # Prettier — write changes
npm run format:check       # Prettier — check only (CI)
npm run test               # Vitest — run all tests once
npm run test:watch         # Vitest — watch mode
npm run validate           # Full pipeline: check → lint → format:check → test
```

Run a single test file:

```bash
npx vitest run src/tests/setup.test.ts
npx vitest run src/path/to/file.test.ts
```

**Always run `npm run validate` before committing.**

## Project Structure

```
├── public/                # Static assets (favicon, images, fonts)
├── src/
│   ├── components/        # Reusable .astro components (PascalCase)
│   ├── config/            # Site-wide configuration (site.ts, etc.)
│   ├── content/           # Content collections (Markdown/MDX)
│   ├── layouts/           # Page layouts (BaseLayout.astro, etc.)
│   ├── lib/               # Utility functions and shared logic
│   ├── pages/             # File-based routing (kebab-case filenames)
│   ├── styles/            # Global CSS — global.css imports Tailwind
│   └── tests/             # Test files (*.test.ts)
├── astro.config.mjs       # Astro + Tailwind Vite plugin
├── eslint.config.mjs      # ESLint 9 flat config
├── prettier.config.mjs    # Prettier config (plugins: astro, tailwindcss)
├── vitest.config.ts       # Vitest via Astro's getViteConfig
├── tsconfig.json          # Extends astro/tsconfigs/strict
└── .editorconfig          # Tabs for .astro, 2 spaces for everything else
```

Create directories only when adding the first file to them.

## Configuration Architecture

All site config lives in `src/config/site.ts` as a single typed `Config` object:

- **`site`** — title, description, lang, version, theme, languages
- **`layout`** — shared `maxWidth` and `fullWidth` (used by header AND footer containers)
- **`header`** — sticky, transparent, blurred, bordered, shadow, logo, navigation, tools
- **`footer`** — brand (logo, version, description), links, contact (email, socialLinks)

When adding configurable UI, add types and data here. Both header and footer read
`config.layout.maxWidth` / `config.layout.fullWidth` for consistent container widths.

## Component Patterns

Components follow an **orchestrator + sub-component** pattern:

- `Header.astro` → `HeaderLogo`, `HeaderNav`, `HeaderTools`, `MobileMenu`
- `Footer.astro` → `FooterBrand`, `FooterLinks`, `FooterContact`

The orchestrator reads from `config`, computes container classes, and passes props down.
Sub-components receive only the data they need via typed props.

## TypeScript

- Config extends `astro/tsconfigs/strict` — do NOT relax it.
- Never use `any`; ESLint enforces `@typescript-eslint/no-explicit-any: error`.
- Prefer `unknown` and narrow with type guards.
- Use explicit return types on exported functions.
- Prefer `interface` for object shapes; use `type` for unions/intersections.

## Code Style

Enforced by Prettier (`prettier.config.mjs` with `prettier-plugin-astro` and
`prettier-plugin-tailwindcss`) and EditorConfig:

| Rule            | Value                                    |
| --------------- | ---------------------------------------- |
| Indentation     | Tabs in `.astro`; 2 spaces in all others |
| Print width     | 100 characters                           |
| Semicolons      | Always                                   |
| Quotes          | Single in JS/TS; double in HTML attrs    |
| Trailing commas | Always in multi-line structures          |
| Line endings    | LF                                       |

## Naming Conventions

| Element          | Convention                   | Example                  |
| ---------------- | ---------------------------- | ------------------------ |
| Astro components | PascalCase                   | `NavBar.astro`           |
| Pages            | kebab-case                   | `about-us.astro`         |
| TS/JS files      | camelCase                    | `formatDate.ts`          |
| Interfaces/Types | PascalCase                   | `interface UserProfile`  |
| Constants        | UPPER_SNAKE_CASE             | `const MAX_RETRIES = 3;` |
| CSS classes      | Tailwind utils or kebab-case | `.hero-section`          |
| Env variables    | `PUBLIC_` prefix for client  | `PUBLIC_API_URL`         |

## Imports

Order: (1) type-only imports, (2) Node builtins, (3) external packages,
(4) internal modules, (5) relative. Separate each group with a blank line.
Use named exports; avoid `export default` except in Astro config and page files.

```ts
import type { ShadowSize } from '../config/site';

import path from 'node:path';

import { config } from '../config/site';

import Header from '../components/Header.astro';
```

Use named exports; avoid `export default` except in Astro config and page files.

## Astro Components

- All logic goes in the frontmatter fence (`---`).
- Type props with a `Props` interface at the top of frontmatter.
- Keep templates declarative — extract complex logic to `src/lib/`.
- Client-side interactivity uses `<script>` tags (no UI framework).
- Use `AbortController` pattern for event listeners to support View Transitions.

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<section>
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</section>
```

## Styling (Tailwind CSS v4)

- Tailwind is loaded via `@tailwindcss/vite` in `astro.config.mjs` — NOT `@astrojs/tailwind`.
- Global entry: `src/styles/global.css` with `@import 'tailwindcss'`.
- Dark mode uses `@custom-variant dark (&:where(.dark, .dark *))` (class-based).
- Customize with `@theme {}` blocks in CSS — there is no `tailwind.config.js`.
- Use scoped `<style>` blocks for non-Tailwind component styles.
- Avoid `!important`; refactor specificity instead.

## Testing

- Runner: Vitest 4.x, configured via `getViteConfig` from Astro.
- Test pattern: `src/**/*.test.ts` (configured in `vitest.config.ts`).
- Place tests in `src/tests/` or co-locate as `*.test.ts` next to source.
- Use `.test.ts` suffix (not `.spec.ts`).
- Import from `vitest`: `import { describe, it, expect } from 'vitest';`

## Error Handling

- Never silently swallow errors.
- Use try/catch in data-fetching frontmatter; log meaningful messages.
- Throw in library code (`src/lib/`); catch at page/layout boundary.
- Return user-friendly fallback UI when data is unavailable.

## ESLint

- Flat config (`eslint.config.mjs`) using `defineConfig` from `eslint/config`.
- Type-checked rules via `typescript-eslint` (unified `typescript-eslint` package —
  not the separate `@typescript-eslint/parser` or `@typescript-eslint/eslint-plugin`).
- Includes `eslint-plugin-astro` for `.astro` file linting.
- `eslint-config-prettier` must always be the **last** entry in the config.
- `@typescript-eslint/no-explicit-any` is set to `error`.
- Ignored paths: `dist/`, `.astro/`, `node_modules/`.

## Git

- Atomic commits; one logical change per commit.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`.
- Never commit `node_modules/`, `dist/`, `.astro/`, or `.env` files.

## Environment Variables

- Server-only: plain names (`DATABASE_URL`).
- Client-exposed: prefix with `PUBLIC_` (`PUBLIC_SITE_URL`).
- Access via `import.meta.env.VARIABLE_NAME`.
