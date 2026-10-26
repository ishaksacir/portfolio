import {
  Books,
  BookOpen,
  Brain,
  Code,
  Ear,
  GlobeSimple,
  GraduationCap,
  Hammer,
  Laptop,
  MagnifyingGlass,
  MapPin,
  PenNib,
  PencilSimple,
  RocketLaunch,
  UsersThree,
  Waves,
  type Icon,
} from "@phosphor-icons/react";

/* About page content, lifted from about.dc.html. Items marked `todo` still
   need real details from Ishak; their badges only show in development. */

export const ABOUT_INTRO = "Web developer who turns rough ideas into fast, thoughtful things on the internet.";

export const ROLES = [
  { label: "Web developer", color: "var(--accent)" },
  { label: "Data science", color: "#C9953D" },
  { label: "Rafting guide", color: "var(--green)" },
];

export const DOING: { icon: Icon; t: string; d: string }[] = [
  { icon: Code, t: "Web development", d: "Fast, hand-built websites and web apps." },
  { icon: Brain, t: "AI & Data Science", d: "Machine learning, automation and building with AI." },
  { icon: PenNib, t: "Branding & visual identity", d: "Logos, type and posters with a bit of personality." },
];

export const FACTS: { icon: Icon; t: string; d: string }[] = [
  { icon: MapPin, t: "Bihać, Bosnia and Herzegovina", d: "Currently based in Sarajevo" },
  { icon: GraduationCap, t: "ETF Sarajevo — DSAI", d: "Data Science & Artificial Intelligence" },
  { icon: Laptop, t: "2 years at TU Graz", d: "Software Engineering and Management" },
  { icon: GlobeSimple, t: "Bosnian, English, German", d: "Native · very good · B2" },
];

export const EDUCATION = [
  { y: "— 2023", t: "Gymnasium Bihać", d: "Računarsko-informatički smjer" },
  { y: "2023 — 2025", t: "TU Graz", d: "Software Engineering and Management (2 years)" },
  { y: "2025 — now", t: "ETF Sarajevo — DSAI", d: "Data Science and Artificial Intelligence (Bachelor, ongoing)" },
];

/** How-I-work steps shown in the desktop Notes window. */
export const PROCESS: { n: string; icon: Icon; color: string; cmd: string; t: string; d: string }[] = [
  {
    n: "01",
    cmd: "listen --brief",
    icon: Ear,
    color: "var(--accent)",
    t: "Understand",
    d: 'Find the real problem, who it’s for and what "done" looks like.',
  },
  {
    n: "02",
    cmd: "sketch --rough",
    icon: PencilSimple,
    color: "var(--amber)",
    t: "Sketch",
    d: "Paper first, then wireframes and a visual direction in Figma.",
  },
  {
    n: "03",
    cmd: "build --stack full",
    icon: Code,
    color: "#3D4248",
    t: "Build",
    d: "Hand-code frontend and backend in small, working pieces.",
  },
  {
    n: "04",
    cmd: "test && refine",
    icon: MagnifyingGlass,
    color: "var(--teal)",
    t: "Refine",
    d: "Test on real devices, sand the rough edges, make it fast.",
  },
  {
    n: "05",
    cmd: "ship --watch",
    icon: RocketLaunch,
    color: "var(--green)",
    t: "Ship",
    d: "Deploy, hand over, and keep an eye on it after launch.",
  },
];

export const EXPERIENCE: {
  app: string;
  icon: Icon;
  bg: string;
  y: string;
  t: string;
  d: string;
  tags: string[];
  todo?: boolean;
}[] = [
  {
    app: "ETF SARAJEVO",
    icon: GraduationCap,
    bg: "var(--accent)",
    y: "2025 — now",
    t: "Data Science & AI student",
    d: "Going deeper into machine learning and data.",
    tags: ["Python", "ML", "Data"],
  },
  {
    app: "SOLO PROJECTS",
    icon: Code,
    bg: "#3D4248",
    y: "[year] — now",
    todo: true,
    t: "Independent web projects",
    d: "Several projects built alone, end to end: design, frontend and backend.",
    tags: ["Design", "Frontend", "Backend"],
  },
  {
    app: "TEAM PROJECTS",
    icon: UsersThree,
    bg: "var(--teal)",
    y: "[year] — now",
    todo: true,
    t: "Building with a senior full-stack dev",
    d: "Joint projects with my brother, a senior full-stack developer: real codebases, code reviews, shipping as a team.",
    tags: ["Full-stack", "Code review", "Git"],
  },
  {
    app: "UNA RIVER",
    icon: Waves,
    bg: "var(--green)",
    y: "5+ summers",
    t: "Rafting guide",
    d: "Leading groups through rapids: staying calm under pressure and communicating clearly.",
    tags: ["Leadership", "Outdoors"],
  },
];

/** "Right now" calendar events. Times are placeholders until Ishak provides real ones. */
type Cal = "study" | "build" | "personal";
export const CALENDARS: Record<Cal, { label: string; color: string; tint: string }> = {
  study: { label: "Study", color: "var(--accent)", tint: "rgba(91,125,191,.13)" },
  build: { label: "Build", color: "var(--amber)", tint: "rgba(209,154,61,.16)" },
  personal: { label: "Personal", color: "var(--green)", tint: "rgba(104,120,90,.15)" },
};

export const NOW: { time: string; cal: Cal; icon: Icon; t: string; d: string; todo?: boolean }[] = [
  {
    time: "09:00",
    cal: "study",
    icon: Books,
    t: "Studying Data Science & AI",
    d: "Exploring its different branches at ETF.",
  },
  {
    time: "11:30",
    cal: "study",
    icon: Brain,
    t: "Learning machine learning",
    d: "Which topics or courses, specifically?",
    todo: true,
  },
  { time: "15:00", cal: "build", icon: Hammer, t: "Building this portfolio", d: "Made by hand, pixel by pixel." },
  {
    time: "21:00",
    cal: "personal",
    icon: BookOpen,
    t: "Reading Meditations",
    d: "Marcus Aurelius — a few pages a day.",
  },
];

export const PRINCIPLES = [
  { n: "01", t: "Understand before building.", d: "Most bad software solves the wrong problem well." },
  { n: "02", t: "Speed is a feature.", d: "Fast pages, fast feedback, small steps that ship." },
  { n: "03", t: "Own the whole thing.", d: "Design, frontend, backend. Knowing every layer makes each one better." },
  { n: "04", t: "Keep it a little weird.", d: "Useful first, but it should still feel like a person made it." },
];

const devicon = (p: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${p}`;
export const TOOLS = [
  { name: "VS Code", src: devicon("vscode/vscode-original.svg") },
  { name: "Figma", src: devicon("figma/figma-original.svg") },
  { name: "Git", src: devicon("git/git-original.svg") },
  { name: "Docker", src: devicon("docker/docker-original.svg") },
  { name: "PostgreSQL", src: devicon("postgresql/postgresql-original.svg") },
  { name: "C++", src: devicon("cplusplus/cplusplus-original.svg") },
  { name: "Python", src: devicon("python/python-original.svg") },
  { name: "JavaScript", src: devicon("javascript/javascript-original.svg") },
];

export type DesktopApp = "now" | "exp" | "work" | "music";

/** Desktop icons, top to bottom. `app` is the menu-bar name while that window is in front. */
export const DESKTOP_ICONS: { key: DesktopApp; label: string; app: string; src: string }[] = [
  { key: "now", label: "Right now", app: "Calendar", src: "/images/desktop/icon-clock.webp" },
  { key: "exp", label: "Experience", app: "Terminal", src: "/images/desktop/icon-briefcase.webp" },
  { key: "work", label: "How I work", app: "Notes", src: "/images/desktop/icon-folder.webp" },
];

export const MENU = ["File", "Edit", "View", "Window", "Help"];

/** Dock items bounce on click; ones with `opens` also open that window. */
export const DOCK: { key: string; t: string; src: string; running?: boolean; sep?: boolean; opens?: DesktopApp }[] = [
  { key: "finder", t: "Finder", src: "/images/desktop/dock-finder.webp", running: true },
  { key: "spotify", t: "Spotify", src: "/images/desktop/dock-spotify.webp", opens: "music" },
  { key: "vscode", t: "Visual Studio Code", src: "/images/desktop/dock-vscode.webp" },
  { key: "trash", t: "Trash", src: "/images/desktop/dock-trash-empty.webp", sep: true },
];

/** Spotify window playlist. Placeholder picks until Ishak swaps in his real ones; `len` is in seconds. */
export const PLAYLIST = {
  title: "On repeat while coding",
  d: "Background noise for long builds and late debugging.",
  color: "#4E6BA8",
};

export const TRACKS: { t: string; a: string; album: string; len: number; color: string }[] = [
  { t: "Midnight City", a: "M83", album: "Hurry Up, We're Dreaming", len: 243, color: "#7B4FA0" },
  { t: "Intro", a: "The xx", album: "xx", len: 128, color: "#3A3A3A" },
  { t: "Breathe", a: "Télépopmusik", album: "Genetic World", len: 279, color: "#2F7A8C" },
  { t: "Teardrop", a: "Massive Attack", album: "Mezzanine", len: 330, color: "#8C6A3A" },
  { t: "Nightcall", a: "Kavinsky", album: "OutRun", len: 258, color: "#C2416B" },
  { t: "Weightless", a: "Marconi Union", album: "Weightless", len: 480, color: "#4F8A6B" },
];
