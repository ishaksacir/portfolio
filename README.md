# Ishak Sacirbey — Portfolio

Personal portfolio and case-study site, built with React, TypeScript and Vite. Hand-written CSS, no UI framework.

## Getting started

```bash
npm install
npm run dev           # start the dev server
npm run build         # type-check and build for production
npm run preview       # preview the production build
npm run lint          # run oxlint
npm run format        # format everything with Prettier
npm run format:check  # check formatting without writing
```

## Project structure

```
index.html          entry HTML, plus the inline screen-scaling script (see below)
app/
├── main.tsx        mounts the router and global styles
├── App.tsx         routes: /, /about, /work, /work/:slug, /playground, /journal
├── hooks.ts        small shared hooks (clock, typewriter, page title)
├── components/     shared UI: Navbar, Footer, Glass (liquid glass), TechText, ui.tsx building blocks
├── content/        all copy and data as typed objects, one file per page
├── mobile/         the phone site (<768px): MobileApp.tsx (top bar, tab dock, routes), ui.tsx, pages/
├── pages/          one component per route
└── styles/         plain CSS: global.css (fonts, tokens), components.css, mobile.css, one file per page
public/
├── fonts/          self-hosted fonts (Clash Grotesk, JetBrains Mono, Jersey 10)
└── images/         all images, as .webp
```

## Conventions

- **Content lives in `app/content/`.** Pages map over typed data; one-off copy stays inline in its component.
- **Design tokens** (colours, fonts, easing) are CSS custom properties on `:root` in `app/styles/global.css`.
  Project pages swap the colours via `THEMES` in `app/content/projects.ts`.
- **Same look on every screen.** At 1280px wide and up, a script in `index.html` lays the page out at 1440px and
  zooms it to fit the window. Because of that:
  - use `cqw` instead of `vw` for fluid sizes (measured against `#root`, so they stay correct under the zoom);
  - divide viewport heights by the zoom: `calc(100vh / var(--z, 1))`;
  - in JS, `getBoundingClientRect()` and pointer coordinates are zoomed, while `offsetWidth`/`clientWidth` are not.
- **Images** go in `public/images/` as `.webp`.
- **Phones get their own composition.** Below 768px, `useIsMobile()` swaps the whole app for `app/mobile/`: same routes
  and same `app/content/` data, different layout. Its classes are prefixed `m-` and live in `styles/mobile.css`, because
  the desktop stylesheets stay loaded after a resize. Page changes usually need doing in both `pages/` and `mobile/pages/`.
