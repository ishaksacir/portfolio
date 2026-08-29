# Design system

A riso-print / comic-book editorial style: heavy borders, hard drop shadows, halftone textures and a
small, saturated palette. All of it lives in `src/styles/global.css` as plain CSS (no CSS-in-JS, no CSS
modules) — this file documents the tokens, not a separate config to keep in sync.

## Colors

Defined as CSS custom properties on `:root` in `global.css`:

| Token | Value | Use |
|---|---|---|
| `--paper` | `#eee5cf` | page background |
| `--cream` | `#f8f3e7` | card / surface background |
| `--ink` | `#191713` | text, borders |
| `--red` | `#e13b2e` | primary accent |
| `--blue` | `#2c60ad` | secondary accent |
| `--green` | `#5c7946` | tertiary accent |
| `--yellow` | `#f7bf21` | highlight accent |
| `--line` | `1px solid var(--ink)` | the standard hairline/heavy border shorthand |

## Type

Three families, loaded from `public/fonts/` via `@font-face`:

- **Clash Display** — headlines (`h1`/`h2`/`h3`), always uppercase, tight/negative letter-spacing.
- **Clash Grotesk** — body copy.
- **JetBrains Mono** — labels, meta text, kickers, buttons — always uppercase, wide letter-spacing.

## Recurring patterns

- **Kicker** (`src/components/common/Kicker.tsx`) — the small red monospace eyebrow label above headings.
- **ActionButton** (`src/components/common/ActionButton.tsx`) — the boxed CTA button (`.box`), with a
  one-off larger "featured" variant (`.retro-work-button`) used once, in the homepage hero.
- **Hard shadows** — offsets like `3px 3px 0 var(--ink)` stand in for `box-shadow` blur; there's no blur
  anywhere in the design.
- **Halftone/dot textures** — repeating `radial-gradient` backgrounds, used behind hero sections.

## Layout

Everything sits inside `.shell`, a centered `max-width: 1680px` column. Each page returns a single
`<main>` — the `header`/`main`/`footer` stacking and the responsive breakpoints (900px, 600px) are
handled in `global.css`, not per-component.
