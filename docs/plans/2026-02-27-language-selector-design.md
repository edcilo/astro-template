# Language Selector — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Custom dropdown language selector with 2 languages (EN/ES), localStorage persistence

## Decisions

- Custom dropdown (not native `<select>`) for full visual control
- Button trigger shows language code ("EN" / "ES"), no icon
- 2 languages: English and Spanish, configured in `site.ts`
- Persistence via `localStorage` key `lang`
- Updates `<html lang="">` attribute on change
- No real translation — placeholder for future i18n integration
- Anti-FOUC inline script in `<head>` for lang attribute
- Multiple instances synced via `data-*` attributes (same pattern as ThemeToggle)

## Architecture

### Files Modified

| File                                  | Change                                                               |
| ------------------------------------- | -------------------------------------------------------------------- |
| `src/config/site.ts`                  | Add `LanguageConfig` interface and `languages` array to `SiteConfig` |
| `src/components/LanguageToggle.astro` | Rewrite as custom dropdown with JS                                   |
| `src/layouts/BaseLayout.astro`        | Add inline script for lang anti-FOUC                                 |

### Configuration

New interface:

```typescript
interface LanguageConfig {
  code: string;
  label: string;
}
```

Added to `SiteConfig`:

```typescript
languages: [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];
```

### Detection Flow

1. Read `localStorage.getItem('lang')`
2. If valid code (matches a configured language) → use it
3. If null or invalid → use `config.site.lang` default (`'en'`)
4. Apply to `<html lang="">` attribute

### Component Structure

```
div (relative container, data-lang-selector)
  button (trigger, data-lang-trigger)
    "EN" text
  div (dropdown panel, data-lang-dropdown, hidden)
    button (option, data-lang-option="en", role="option")
      "English"
    button (option, data-lang-option="es", role="option")
      "Español"
```

### Accessibility

- Trigger: `aria-expanded`, `aria-haspopup="listbox"`
- Dropdown: `role="listbox"`, `aria-label="Select language"`
- Options: `role="option"`, `aria-selected` on active
- Keyboard: Escape closes, Enter/Space selects

### Dark Mode Classes

| Element        | Dark Classes                                                                   |
| -------------- | ------------------------------------------------------------------------------ |
| Dropdown panel | `bg-white dark:bg-gray-800`, `border-gray-200 dark:border-gray-700`            |
| Options        | `hover:bg-gray-100 dark:hover:bg-gray-700`, `text-gray-900 dark:text-gray-100` |
| Active option  | `bg-gray-100 dark:bg-gray-700`                                                 |

### Anti-FOUC Strategy

- `<script is:inline>` in BaseLayout `<head>` — executes synchronously before render
- Reads `localStorage('lang')` and sets `<html lang="">` immediately
- Must be `is:inline` (not a module) to block rendering
- Same pattern as theme anti-FOUC

## Design Rationale

- **Custom dropdown over native `<select>`**: Native selects cannot be fully styled cross-browser. A custom dropdown gives full visual control and supports dark mode classes consistently.
- **localStorage persistence**: Lightweight, synchronous read — ideal for anti-FOUC scripts that must run before first paint. Same strategy as the theme toggle.
- **`data-*` attribute sync**: Multiple instances of the component on the same page (e.g., header and mobile menu) stay in sync by querying shared `data-lang-*` attributes, matching the ThemeToggle pattern.
- **No i18n integration**: The selector updates `<html lang="">` and stores the preference, but does not perform actual content translation. This provides a clean integration point for a future i18n system.
- **Inline script in `<head>`**: Prevents the flash of wrong `lang` attribute. Must be `is:inline` so Astro does not defer it as a module.

## Generated / Modified Files

| File                                  | Purpose                                                |
| ------------------------------------- | ------------------------------------------------------ |
| `src/config/site.ts`                  | Language configuration (codes, labels) in `SiteConfig` |
| `src/components/LanguageToggle.astro` | Custom dropdown selector with persistence and sync     |
| `src/layouts/BaseLayout.astro`        | Anti-FOUC inline script in `<head>` for lang attribute |
