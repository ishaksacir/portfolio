import {
  ChatCircleText, CircleHalf, Code, CoatHanger, DeviceMobile, FilmSlate, Fingerprint, FolderOpen, Gauge,
  Heart, Lightning, MagnifyingGlass, MapTrifold, NotePencil, PencilSimpleLine, SquaresFour, TextAa, Translate, type Icon,
} from "@phosphor-icons/react";

/* Project content, lifted from project.dc.html / work.dc.html / home.dc.html. */

export interface Project {
  slug: string;
  no: string;
  title: string;
  short: string;
  chips: string[];
  /** e.g. "WEB DESIGN · PRODUCT" */
  kind: string;
  year: string;
  /** shown on /work as "Date Modified" */
  date: string;
  aside: string;
  status: string;
  domain: string;
  url: string;
  cover: string;
  hook: string;
  lede: string;
  facts: { k: string; v: string }[];
  overviewLead: string;
  overview: string[];
  challenge: string[];
  brief: string;
  approach: { n: string; title: string; body: string }[];
  features: { icon: Icon; title: string; body: string }[];
  gallery: { id: string; ph: string; cap: string; src?: string }[];
  outcome: string[];
  learned: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ghost", no: "01", title: "Ghost", short: "Ghost", chips: ["Next.js", "TypeScript", "Maps"], kind: "WEB DESIGN · PRODUCT", year: "2026", date: "14 Sep 2026",
    aside: "bosnia, slowly", status: "LIVE", domain: "ghost.ba", url: "", cover: "/images/cover-ghost.png",
    hook: "A travel platform for slow trips through Bosnia — stays, experiences and local services worth booking.",
    lede: "A travel platform for slow trips through Bosnia — stays, guides and the local help you need after check-in, all from one place.",
    facts: [{ k: "ROLE", v: "Product design & full-stack" }, { k: "YEAR", v: "2026" }, { k: "PLATFORM", v: "Responsive web" }, { k: "STACK", v: "Next.js · TypeScript · Maps" }, { k: "STATUS", v: "Live" }],
    overviewLead: "Bosnia is easy to love and surprisingly hard to plan. Ghost puts the whole trip in one calm place.",
    overview: [
      "Travellers to Bosnia usually juggle a booking site for the room, a WhatsApp number for the guide, a Facebook group for the taxi and a friend-of-a-friend for dinner. Ghost pulls all of that into a single platform: handpicked stays, local experiences, transport and everyday services, searchable by place and date.",
      "I designed the product end to end — research, brand, interface and the Next.js build — with the goal of making the booking feel as unhurried as the trip itself.",
    ],
    challenge: [
      "The supply side was the hard part. Many of the best hosts and guides have no website, no calendar and no English copy. The platform had to make a family guesthouse in Mostar look as trustworthy as a hotel chain, without flattening the character that makes it worth visiting.",
      "On the traveller side, the problem was choice overload in an unfamiliar place — people need a few good options, not a thousand listings.",
    ],
    brief: "Make it feel like a local friend is planning your trip — not a marketplace.",
    approach: [
      { n: "01", title: "Talk to hosts first", body: "Interviews with hosts, guides and drivers in Mostar and Sarajevo shaped the listing model: a short, structured profile that can be filled in on a phone in ten minutes, with photos doing most of the talking." },
      { n: "02", title: "Curate, don’t list", body: "Instead of endless results, every category opens on a handpicked shortlist — “stays we would book ourselves” — with the full catalogue one tap away. Fewer choices, more confidence." },
      { n: "03", title: "A quiet, warm interface", body: "Full-bleed landscape photography, a soft sand-and-forest palette and an italic serif for the one word that matters. The UI steps back so the place can lead." },
      { n: "04", title: "Build for the road", body: "Next.js with server-rendered listing pages, map search and aggressive image optimisation, so it stays usable on patchy mountain connections." },
    ],
    features: [
      { icon: MagnifyingGlass, title: "One search bar", body: "Where, check-in, check-out and guests in a single glass bar over the hero — the whole trip starts in one field." },
      { icon: SquaresFour, title: "Five categories", body: "Stays, Experiences, Local services, Transport and Food & drink share one card system and one booking flow." },
      { icon: Heart, title: "Handpicked shortlists", body: "Editorial collections curated per region, so first-time visitors see the best options before the full list." },
      { icon: MapTrifold, title: "Map-first browsing", body: "Every listing lives on the map, so travellers can plan by distance and route rather than by price alone." },
      { icon: Translate, title: "Local-friendly listings", body: "Hosts write in Bosnian; structured fields and translations make the listing readable for everyone." },
      { icon: DeviceMobile, title: "Mobile by default", body: "Designed thumb-first for travellers on the move, with the search bar collapsing into a sticky pill." },
    ],
    gallery: [
      { id: "proj-ghost-1", ph: "Ghost — search results", cap: "Search results with map" },
      { id: "proj-ghost-2", ph: "Ghost — listing page", cap: "Stay detail page" },
      { id: "proj-ghost-3", ph: "Ghost — mobile", cap: "Mobile search flow" },
      { id: "proj-ghost-4", ph: "Ghost — host dashboard", cap: "Host onboarding" },
    ],
    outcome: ["Ghost is live and growing region by region, starting with Herzegovina. Hosts who previously relied on word of mouth now have a proper, bookable presence, and travellers get a trip that is planned in one place instead of five apps."],
    learned: [
      "Curation is a feature — a shortlist builds more trust than a filter panel.",
      "Design the supply side first; a marketplace is only as good as its listings.",
      "Performance is part of the brand when your users are on mountain roads.",
    ],
  },
  {
    slug: "dalga", no: "02", title: "Dalga Design", short: "Dalga", chips: ["Next.js", "GSAP", "Sanity"], kind: "WEB DESIGN · FASHION", year: "2026", date: "2 Aug 2026",
    aside: "made for one", status: "LIVE", domain: "dalgadesign.com", url: "", cover: "/images/cover-dalga.png",
    hook: "Custom fashion website with editorial motion for a Bosnian brand.",
    lede: "An editorial website for a Bosnian fashion label that makes one-of-one garments — made for one, repeated for no one.",
    facts: [{ k: "ROLE", v: "Design & development" }, { k: "YEAR", v: "2026" }, { k: "CLIENT", v: "Dalga Design" }, { k: "STACK", v: "Next.js · GSAP · Sanity" }, { k: "STATUS", v: "Live" }],
    overviewLead: "Every Dalga piece is made once, for one person. The website had to feel just as considered.",
    overview: [
      "Dalga Design creates custom garments designed around each client’s story. Their previous presence was an Instagram grid — beautiful, but impossible to navigate and hard to commission from.",
      "I designed and built a site that works like a printed lookbook: oversized serif typography, black-and-white photography and slow, deliberate motion — plus a CMS so the studio can publish new creations themselves.",
    ],
    challenge: [
      "Fashion sites often trade speed for spectacle. Dalga’s audience browses on phones, frequently on slow connections, and the brand needed the drama of an editorial spread without a loading spinner.",
      "The studio also had to update collections without a developer — every new piece needed a page, images and a story in minutes.",
    ],
    brief: "It should feel like a magazine cover you can walk into.",
    approach: [
      { n: "01", title: "Type as architecture", body: "A high-contrast display serif set at full-bleed scale, layered in front of and behind the model, turns every hero into a composed spread rather than a banner." },
      { n: "02", title: "Monochrome discipline", body: "All photography runs in black and white, so the garments’ silhouettes and textures carry the brand. Colour appears only on individual creation pages." },
      { n: "03", title: "Motion with restraint", body: "GSAP scroll timelines reveal type and imagery in slow, editorial beats. Everything animates on transform and opacity only, and respects reduced-motion settings." },
      { n: "04", title: "A CMS the studio enjoys", body: "Sanity schemas mirror how the studio thinks — piece, client story, fittings, photos — so publishing a new creation is filling in a short form." },
    ],
    features: [
      { icon: TextAa, title: "Editorial hero", body: "Oversized DALGA DESIGN wordmark interleaved with the photograph, so type and figure share the same plane." },
      { icon: CoatHanger, title: "Selected Creations", body: "A gallery of one-of-one pieces, each with its own story, fabrics and fitting notes." },
      { icon: Fingerprint, title: "One of One", body: "A page explaining the bespoke process, from first conversation to final fitting." },
      { icon: FilmSlate, title: "Scroll choreography", body: "GSAP timelines pace the reading like turning pages, never hijacking the scroll." },
      { icon: Lightning, title: "Fast on 3G", body: "Pre-sized responsive images and static generation keep first paint under a second on slow networks." },
      { icon: PencilSimpleLine, title: "Self-serve publishing", body: "The studio adds creations, stories and photos in Sanity without touching code." },
    ],
    gallery: [
      { id: "proj-dalga-1", ph: "Dalga — Selected Creations", cap: "Selected Creations grid" },
      { id: "proj-dalga-2", ph: "Dalga — creation page", cap: "Single creation story" },
      { id: "proj-dalga-3", ph: "Dalga — One of One", cap: "The bespoke process" },
      { id: "proj-dalga-4", ph: "Dalga — mobile", cap: "Mobile lookbook" },
    ],
    outcome: ["The site replaced Instagram DMs as the main way clients discover and commission pieces. The studio now publishes each new creation on the day it’s finished, and the site finally matches the craft of the garments."],
    learned: [
      "Restraint in colour gives you room to be loud with type.",
      "Editorial motion works best when it’s slower than you think.",
      "Model the CMS on how the client talks, not how the database wants it.",
    ],
  },
  {
    slug: "portfolio", no: "03", title: "Portfolio Website", short: "Portfolio", chips: ["Next.js", "Tailwind CSS", "Framer Motion"], kind: "WEB DESIGN · PERSONAL", year: "2026", date: "Today",
    aside: "yes, this one", status: "LIVE", domain: "ishak.dev", url: "", cover: "/images/cover-portfolio.png",
    hook: "The very site you're on. Designed and built with a love for clean interfaces.",
    lede: "The very site you're on — a notebook, a code editor and a desktop mashed into one place to show what I make and how I think.",
    facts: [{ k: "ROLE", v: "Everything, for better or worse" }, { k: "YEAR", v: "2026" }, { k: "PLATFORM", v: "Responsive web" }, { k: "STACK", v: "Next.js · Tailwind CSS · Framer Motion" }, { k: "STATUS", v: "Live, always changing" }],
    overviewLead: "A portfolio is the one project with no client. That makes it the hardest brief to write.",
    overview: [
      "I wanted a site that feels like my desk: ruled notebook paper, sticky tape labels, a code editor that types itself and a few old Macs lying around. Designer and developer, in one room.",
      "Every section borrows a familiar interface — an editor for the intro, a Finder window for work, a feed for writing — so browsing feels playful but never confusing.",
    ],
    challenge: [
      "Personality is easy to overdo. The risk was a site full of gimmicks where the actual work gets lost behind the jokes.",
      "It also had to prove the craft: if I say I care about details and performance, the site itself is the evidence.",
    ],
    brief: "Show that I design and build — without saying it in every sentence.",
    approach: [
      { n: "01", title: "One strong metaphor", body: "A designer’s notebook sets the ground: ruled paper, a red margin line and handwritten asides. Everything else is placed on top of it like objects on a desk." },
      { n: "02", title: "Familiar interfaces", body: "Code editor, Finder, window chrome and tabs — interfaces people already know how to read, restyled in a quiet blue-grey palette." },
      { n: "03", title: "Pixels on purpose", body: "A pixel wordmark with a hard offset shadow gives the site a recognisable signature, balanced by a clean grotesk for everything readable." },
      { n: "04", title: "Motion that earns its place", body: "Framer Motion powers the typing intro, the cover-flow of projects and small hover lifts — each tested on a slow phone before shipping." },
    ],
    features: [
      { icon: Code, title: "Self-typing editor", body: "The hero types out a tiny ishak.ts file — a bio written in code, with the name set in pixels on top." },
      { icon: FolderOpen, title: "Finder-style work", body: "Projects live in a macOS-like window with categories, a cover-flow and an info panel." },
      { icon: NotePencil, title: "Handwritten asides", body: "Pen-script notes and tape labels add the voice that a résumé can’t." },
      { icon: ChatCircleText, title: "Blog as a feed", body: "Writing shows up as threads you can expand, like, and read inline." },
      { icon: CircleHalf, title: "Glass & grain", body: "Frosted navigation, subtle paper grain and a gradual blur at the bottom of every page." },
      { icon: Gauge, title: "Built to be fast", body: "Static pages, self-hosted fonts and transform-only animation keep it quick everywhere." },
    ],
    gallery: [
      { id: "proj-portfolio-1", ph: "Portfolio — work window", cap: "Selected work, Finder-style" },
      { id: "proj-portfolio-2", ph: "Portfolio — about", cap: "About page" },
      { id: "proj-portfolio-3", ph: "Portfolio — blog", cap: "Blog feed" },
      { id: "proj-portfolio-4", ph: "Portfolio — mobile", cap: "Mobile layout" },
    ],
    outcome: [
      "The site has become the best conversation starter I have — people mention the pixel name and the typing editor before they mention the work, and then they stay for the work.",
      "It’s also my playground: new ideas get tried here first.",
    ],
    learned: [
      "A single strong metaphor beats ten clever details.",
      "Borrowed interfaces lower the learning curve for playful design.",
      "Your portfolio is never finished — design it to change.",
    ],
  },
];

export const findProject = (slug: string | undefined) => PROJECTS.findIndex((p) => p.slug === slug);

/* ─── Folder colours (by index) — shared by /work folders and project themes ─── */
export const FOLDERS = [
  { bg: "#1C1F27", fg: "#F3F5F7", muted: "rgba(243,245,247,.74)", chipBg: "rgba(255,255,255,.1)" },
  { bg: "#3E5A8C", fg: "#F5F7FA", muted: "rgba(245,247,250,.82)", chipBg: "rgba(255,255,255,.14)" },
  { bg: "#D8B06A", fg: "#1C1F27", muted: "rgba(28,31,39,.78)", chipBg: "rgba(255,255,255,.4)" },
];

/** Horizontal offset of folder tab `i` — identical on /work and /work/:slug. */
export const tabOffset = (i: number) => `calc(${i} * min(196px, 31%))`;

/** Tag dot colours on /work. */
export const TAG_COLORS = ["#5B7DBF", "#D19A3D", "#68785A", "#B85C4A", "#5A7F7A"];

/* ─── Project page themes (CSS variables set on :root) ─── */
export const THEMES: Record<string, Record<string, string>> = {
  ghost: { "--bg-primary": "#1C1F27", "--bg-secondary": "#232733", "--surface": "#262A35", "--surface-muted": "#2C313D", "--text-primary": "#F3F5F7", "--text-secondary": "#AAB1BC", "--text-muted": "#848C98", "--text-link": "#D0D6DE", "--border": "rgba(255,255,255,.10)", "--border-strong": "rgba(255,255,255,.2)", "--accent": "#7E9BD6", "--accent-dark": "#AEBED8", "--accent-light": "#3E5A8C", "--pill-bg": "rgba(255,255,255,.07)", "--pill-hi": "rgba(255,255,255,.14)", "--hover-bg": "rgba(255,255,255,.08)", "--lg-bg": "linear-gradient(180deg,rgba(46,51,63,.8),rgba(34,38,48,.72))", "--rules": "repeating-linear-gradient(180deg,transparent 0 35px,rgba(255,255,255,.05) 35px 36px)" },
  dalga: { "--bg-primary": "#3E5A8C", "--bg-secondary": "#37507E", "--surface": "#46649A", "--surface-muted": "#4B6AA2", "--text-primary": "#F5F7FA", "--text-secondary": "#D5DDEA", "--text-muted": "#AEBDD4", "--text-link": "#E6EBF3", "--border": "rgba(255,255,255,.16)", "--border-strong": "rgba(255,255,255,.28)", "--accent": "#F3E4B8", "--accent-dark": "#F3E4B8", "--accent-light": "#2B416A", "--pill-bg": "rgba(255,255,255,.12)", "--pill-hi": "rgba(255,255,255,.2)", "--hover-bg": "rgba(255,255,255,.12)", "--lg-bg": "linear-gradient(180deg,rgba(82,110,162,.8),rgba(62,90,140,.72))", "--rules": "repeating-linear-gradient(180deg,transparent 0 35px,rgba(255,255,255,.07) 35px 36px)" },
  portfolio: { "--bg-primary": "#D8B06A", "--bg-secondary": "#CFA55E", "--surface": "#E6C788", "--surface-muted": "#DFBB77", "--text-primary": "#1C1F27", "--text-secondary": "#4B402B", "--text-muted": "#6E5E3F", "--text-link": "#2C2A24", "--border": "rgba(28,31,39,.16)", "--border-strong": "rgba(28,31,39,.28)", "--accent": "#3E5A8C", "--accent-dark": "#2B416A", "--accent-light": "#F0D9A6", "--pill-bg": "rgba(255,255,255,.4)", "--pill-hi": "rgba(255,255,255,.6)", "--hover-bg": "rgba(255,255,255,.32)", "--lg-bg": "linear-gradient(180deg,rgba(242,221,172,.82),rgba(230,199,136,.74))", "--rules": "repeating-linear-gradient(180deg,transparent 0 35px,rgba(28,31,39,.08) 35px 36px)" },
};

