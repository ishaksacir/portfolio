# Ishak Šačirbey — Portfolio

A comic-book-styled personal portfolio and case-study site, built with React, TypeScript and Vite.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build
npm run lint      # run oxlint
```

## Project structure

```
src/
├── assets/            images used across the site
├── components/
│   ├── common/         small shared UI (Kicker, ActionButton)
│   ├── layout/          Header, Footer — rendered once by App, outside the pages
│   ├── shop/             ShopCard — used by the Home preview and the Work shop grid
│   ├── blog/             BrainPost — used by the Home preview and the Journal feed
│   └── RetroScrollbar/  custom scrollbar, self-contained
├── pages/              one folder per route (Home, Work, About, Experience, Process, Journal, Contact)
│   └── Home/sections/   Home is composed from independent section components
├── data/               content as typed arrays/objects (projects, socials, nav, blog posts, ...)
├── hooks/               useHashRoute — the routing hook
├── routes/               route table: page ids → page components
├── utils/               small cross-page helpers (e.g. the Work project handoff)
├── styles/              global.css — the entire visual design, as plain CSS
├── App.tsx              shell: Header + current page + Footer
└── main.tsx             entry point
```

## Routing

Routing is a small custom hook (`src/hooks/useHashRoute.ts`) over `location.hash` — there's no router
dependency. `src/routes/routes.ts` maps each page id (`home`, `work`, `about`, `experience`, `process`,
`journal`, `contact`) to its page component; `App.tsx` renders whichever one matches the current hash.

## Content

Anything that repeats (projects, social links, blog posts, timeline entries, pricing, ...) lives in
`src/data/` as typed data, rendered with `.map()`. Copy that only belongs to one place in the UI stays
inline in its component.

## Design

See [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) for the color palette, type scale and the visual language the
site is built on.
