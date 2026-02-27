# Header Component — Design Document

**Date:** 2026-02-27
**Status:** Approved
**Scope:** Componente Header para template Astro 5 + Tailwind CSS v4

## Decisions

- Header dividido en tres secciones: logo, navigation y tools
- Menú hamburguesa para móvil con JavaScript vanilla (sin framework)
- Logo como `<img>` referenciando `public/logo.svg` para mejor performance
- Botones de tema e idioma puramente visuales por ahora (sin funcionalidad JS)
- `BaseLayout.astro` encapsula el HTML boilerplate y el Header
- Shadow como enum con presets mapeados a clases Tailwind para consistencia

## Component Architecture

```
src/
├── components/
│   ├── Header.astro          # Componente principal del header
│   ├── HeaderLogo.astro      # Sección del logo (link a home)
│   ├── HeaderNav.astro       # Sección de navegación (vacía por ahora)
│   ├── HeaderTools.astro     # Sección de herramientas (tema, idioma)
│   ├── ThemeToggle.astro     # Botón de cambio de tema (sin funcionalidad)
│   ├── LanguageToggle.astro  # Botón de cambio de idioma (sin funcionalidad)
│   └── MobileMenu.astro      # Menú hamburguesa para móvil
├── layouts/
│   └── BaseLayout.astro      # Layout base que incluye el Header
└── public/
    └── logo.svg              # Logo SVG del proyecto
```

## Props

### Header.astro

```typescript
interface Props {
  sticky?: boolean; // Fija al top al hacer scroll — default: false
  fullWidth?: boolean; // Contenido ocupa 100%, ignora maxWidth — default: false
  maxWidth?: string; // Clase Tailwind para ancho máximo — default: 'max-w-7xl'
  transparent?: boolean; // Fondo transparente — default: false
  blurred?: boolean; // Aplica backdrop-blur — default: true
  bordered?: boolean; // Línea sutil en borde inferior — default: false
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'; // Estilo de sombra — default: 'none'
}
```

## HTML Structure

```
header (full width, props de estilo)
  div.container (max-width configurable, centrado, padding horizontal)
    div.logo (lado izquierdo)
    nav.navigation (centro, oculta en móvil, vacía por ahora)
    div.tools (lado derecho, ocultas en móvil dentro del menú)
      ThemeToggle
      LanguageToggle
    button.hamburger (solo visible en móvil)
MobileMenu (panel overlay, oculto por defecto)
```

## Responsive Behavior

- **Desktop (md+):** Las 3 secciones visibles en fila horizontal con `justify-between`. Logo a la izquierda, nav al centro, tools a la derecha.
- **Móvil (<md):** Solo visible el logo y el botón hamburguesa. Al tocar el hamburguesa, se abre un panel overlay con la navegación y los botones de tools. El menú se abre/cierra con JavaScript vanilla (toggle de clase CSS).

## Visual Style

| Prop          | Clases / Comportamiento                                                                    |
| ------------- | ------------------------------------------------------------------------------------------ |
| default       | `bg-white/80` (semi-transparente) con `backdrop-blur-md`                                   |
| `transparent` | Quita el fondo                                                                             |
| `blurred`     | Controla `backdrop-blur-md` (default: `true`)                                              |
| `bordered`    | Agrega `border-b border-gray-200`                                                          |
| `shadow`      | Mapea a `{ none: '', sm: 'shadow-sm', md: 'shadow-md', lg: 'shadow-lg', xl: 'shadow-xl' }` |
| `sticky`      | Aplica `sticky top-0 z-50`                                                                 |
| `fullWidth`   | Contenido ocupa 100%, ignora `maxWidth`                                                    |
| `maxWidth`    | Clase Tailwind para ancho máximo (default: `max-w-7xl`)                                    |

## Design Rationale

- **Hamburger menu en móvil**: Patrón estándar. Estructura lista desde el inicio para evitar refactorizaciones.
- **Transparente con blur**: Estilo moderno glassmorphism. Semi-transparente con `backdrop-blur`.
- **Max-width configurable via prop**: Default 1280px (`max-w-7xl`), pero flexible por página.
- **Todas las props de estilo incluidas**: `sticky`, `fullWidth`, `maxWidth`, `transparent`, `blurred`, `bordered`, `shadow`.
- **Shadow como enum con presets**: Valores predefinidos (`none`, `sm`, `md`, `lg`, `xl`) mapeados a clases Tailwind para consistencia.

## Generated Files

| File                                  | Purpose                                       |
| ------------------------------------- | --------------------------------------------- |
| `src/components/Header.astro`         | Componente principal del header               |
| `src/components/HeaderLogo.astro`     | Sección del logo con link a home              |
| `src/components/HeaderNav.astro`      | Sección de navegación (vacía por ahora)       |
| `src/components/HeaderTools.astro`    | Sección de herramientas (tema, idioma)        |
| `src/components/ThemeToggle.astro`    | Botón de cambio de tema (sin funcionalidad)   |
| `src/components/LanguageToggle.astro` | Botón de cambio de idioma (sin funcionalidad) |
| `src/components/MobileMenu.astro`     | Menú hamburguesa para móvil                   |
| `src/layouts/BaseLayout.astro`        | Layout base que incluye el Header             |
| `public/logo.svg`                     | Logo SVG del proyecto                         |
