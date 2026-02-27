# Footer Component — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Configurable footer component for Astro 5 + Tailwind CSS v4 + TypeScript template

## Summary

Add a configurable three-section footer (Brand, Links, Contact) that shares layout constraints
(`maxWidth`, `fullWidth`) with the header via a new `LayoutConfig`.

## Motivation

The site currently has a header but no footer. The footer needs to display brand identity,
legal/informational links, and contact information including social media icons. The container
width must be shared with the header so changing it in one place affects both.

## Config Changes (`src/config/site.ts`)

### New: `LayoutConfig`

Extracted from `HeaderConfig`. Contains `maxWidth: string` and `fullWidth: boolean`. Both header
and footer read from `config.layout`.

### New: `SiteConfig.version`

A `version: string` field (e.g. `'0.0.1'`) displayed in the footer brand section.

### New: `FooterConfig`

```typescript
type SocialPlatform = 'facebook' | 'x' | 'instagram' | 'linkedin' | 'github';

interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterConfig {
  brand: {
    showLogo: boolean;
    showVersion: boolean;
    description?: string;
  };
  links: FooterLink[];
  contact: {
    email?: string;
    socialLinks: SocialLink[];
  };
}
```

### Modified: `HeaderConfig`

Remove `maxWidth` and `fullWidth` (migrated to `LayoutConfig`).

### Modified: `Config`

```typescript
interface Config {
  site: SiteConfig;
  layout: LayoutConfig;
  header: HeaderConfig;
  footer: FooterConfig;
}
```

## Component Architecture

```
src/
├── components/
│   ├── Footer.astro          # Orchestrator: config, container, grid layout
│   ├── FooterBrand.astro     # Logo + version + optional description
│   ├── FooterLinks.astro     # Renders list of FooterLink items
│   └── FooterContact.astro   # Email display + social media icon links
```

| Component             | Responsibility                                                       |
| --------------------- | -------------------------------------------------------------------- |
| `Footer.astro`        | Reads config, renders container with layout constraints, grid layout |
| `FooterBrand.astro`   | Logo (reuses SVG from HeaderLogo pattern) + version + description    |
| `FooterLinks.astro`   | Renders list of `FooterLink` items                                   |
| `FooterContact.astro` | Email display + social media icon links                              |

## Visual Layout

- **Desktop (md+):** CSS Grid, 3 equal columns: `[Brand] [Links] [Contact]`
- **Mobile (<md):** Vertical stack — brand, links, contact
- Container uses `config.layout.maxWidth` and `config.layout.fullWidth`, same as header
- `border-t` separator at the top of the footer
- Copyright bar at the bottom, centered text: `(c) {year} {site.title}`

## Social Icons

Inline SVGs mapped by `platform` string. Each icon wrapped in
`<a target="_blank" rel="noopener noreferrer">`.

| Detail    | Value                                    |
| --------- | ---------------------------------------- |
| Size      | `h-5 w-5`                                |
| Hover     | Color transition                         |
| Platforms | facebook, x, instagram, linkedin, github |

## Header Refactor

Minimal change: `Header.astro` reads `maxWidth` / `fullWidth` from `config.layout` instead of
`config.header`. Props remain available for per-page override.

## Integration

`Footer.astro` is added to `BaseLayout.astro` after `<main><slot /></main>`, before the closing
`</body>` tag.

## Generated Files

| File                                 | Purpose                                        |
| ------------------------------------ | ---------------------------------------------- |
| `src/config/site.ts`                 | Add `LayoutConfig`, `FooterConfig`, `version`  |
| `src/components/Footer.astro`        | Main footer orchestrator                       |
| `src/components/FooterBrand.astro`   | Brand section (logo, version, description)     |
| `src/components/FooterLinks.astro`   | Link list section                              |
| `src/components/FooterContact.astro` | Contact and social media section               |
| `src/components/Header.astro`        | Refactored to read layout from `config.layout` |
| `src/layouts/BaseLayout.astro`       | Updated to include Footer                      |
