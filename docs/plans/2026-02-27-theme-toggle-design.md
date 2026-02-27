# Theme Toggle — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Theme switching system with 3 states (light / dark / system)

## Decisions

- Three-state cycle: light → dark → system → light
- Initial detection: localStorage first, falls back to `prefers-color-scheme`
- Persistence via localStorage key `'theme'`
- Dark mode applied via `class="dark"` on `<html>` (Tailwind CSS class strategy)
- Tailwind v4 configured with `@custom-variant dark (&.dark)` in `global.css`
- Anti-FOUC inline script in `<head>` to apply theme before render
- Icon reflects current state: sun (light), moon (dark), monitor (system)
- `aria-label` updates dynamically per state

## Architecture

### Files Modified/Created

| File                               | Change                                                          |
| ---------------------------------- | --------------------------------------------------------------- |
| `src/styles/global.css`            | Add `@custom-variant dark (&.dark)` for Tailwind v4 dark mode   |
| `src/config/site.ts`               | Add `defaultTheme: 'system'` to site config                     |
| `src/components/ThemeToggle.astro` | Rewrite with 3 icons, cycle logic, localStorage persistence     |
| `src/layouts/BaseLayout.astro`     | Add inline script in `<head>` for anti-FOUC theme application   |
| Existing components                | Add `dark:` variant classes for visible dark mode demonstration |

### Theme Detection Flow

1. Page loads → inline script in `<head>` runs (blocking)
2. Read `localStorage.getItem('theme')`
3. If value is `'light'` → remove `dark` class
4. If value is `'dark'` → add `dark` class
5. If value is `'system'` or `null` → check `prefers-color-scheme: dark`, apply accordingly
6. Page renders with correct theme (no flash)

### ThemeToggle Component

- Button with 3 SVG icons (sun, moon, monitor), only one visible at a time
- Click cycles through: light → dark → system → light
- Each click: updates localStorage, applies/removes `dark` class, updates icon visibility, updates `aria-label`
- Icon: sun = light active, moon = dark active, monitor = system active
- When switching to `system`, re-evaluates `prefers-color-scheme` to determine if `dark` class should be applied

### Anti-FOUC Strategy

- `<script is:inline>` in BaseLayout `<head>` — executes synchronously before render
- Reads localStorage and applies `dark` class to `<html>` immediately
- Must be `is:inline` (not a module) to block rendering

### Dark Mode Classes (Minimal)

Applied only to existing components to demonstrate the theme works:

| Element              | Dark Classes                                                         |
| -------------------- | -------------------------------------------------------------------- |
| `<body>`             | `dark:bg-gray-900 dark:text-gray-100`                                |
| Header background    | `dark:bg-gray-900/80`                                                |
| Header buttons       | `dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100` |
| Mobile menu / drawer | `dark:bg-gray-900/95`, `dark:bg-gray-900`                            |
| Borders              | `dark:border-gray-700`                                               |

## Design Rationale

- **Three-state toggle**: Respects user OS preference while allowing explicit override. The `system` state keeps the app in sync with OS-level dark mode changes.
- **localStorage persistence**: Lightweight, synchronous read — ideal for anti-FOUC scripts that must run before first paint.
- **Class strategy over media strategy**: `class="dark"` on `<html>` gives full programmatic control, required for a toggle that can override the OS preference.
- **`@custom-variant` in CSS**: Tailwind v4 CSS-first approach — no `tailwind.config.js` needed, consistent with the project's configuration strategy.
- **Inline script in `<head>`**: Prevents the flash of wrong theme. Must be `is:inline` so Astro does not defer it as a module.
- **Minimal dark classes**: Only enough to visually confirm the toggle works. Full dark theme styling is a separate concern.

## Generated / Modified Files

| File                               | Purpose                                             |
| ---------------------------------- | --------------------------------------------------- |
| `src/styles/global.css`            | Tailwind v4 dark mode custom variant                |
| `src/config/site.ts`               | Default theme configuration                         |
| `src/components/ThemeToggle.astro` | 3-state toggle button with icons and persistence    |
| `src/layouts/BaseLayout.astro`     | Anti-FOUC inline script in `<head>`                 |
| Existing components                | `dark:` utility classes for dark mode demonstration |
