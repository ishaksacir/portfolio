export interface Role {
  panel: string;
  years: string;
  title: string;
  meta: string;
  copy: string;
  quote: string;
  skills: string[];
  note: string;
}

export const EXPERIENCE_ROLES: Role[] = [
  {
    panel: "PANEL 01 · THE FIRST COMMIT",
    years: "2021—2022",
    title: "JUNIOR WEB DEVELOPER",
    meta: "LOCAL STUDIO · SARAJEVO",
    copy: "Marketing sites, CMS integrations, and a great deal of bug-fixing in other people’s code. No design system, lots of divs and very fast feedback.",
    quote:
      "Two years inside somebody else’s codebase is the fastest way to learn what readable means.",
    skills: ["JAVASCRIPT", "PHP", "FIGMA", "WORDPRESS"],
    note: "A LOT OF BUGS. EVEN MORE LESSONS.",
  },
  {
    panel: "PANEL 02 · LEARNING THE SYSTEM",
    years: "2022—2024",
    title: "FRONTEND DEVELOPER",
    meta: "DIGITAL AGENCY · CONTRACT",
    copy: "Client front ends built on a shared component library — from fintech overviews to checkout systems. Worked beside designers, account leads and clients.",
    quote:
      "A component library is a conversation. Break it quietly and you break an entire team.",
    skills: ["TYPESCRIPT", "REACT", "NEXT.JS", "STORYBOOK"],
    note: "SHIPPED WEEKLY. LEARNED TO DOCUMENT.",
  },
  {
    panel: "PANEL 03 · GOING SOLO",
    years: "2024—NOW",
    title: "FREELANCE DEVELOPER & DESIGNER",
    meta: "SELF-EMPLOYED · SARAJEVO / REMOTE",
    copy: "End-to-end scope, design, build and launch. The projects delivered since going solo — all from Sarajevo, all still alive in the wild.",
    quote:
      "Owning the whole thing means nowhere to hand the hard part. That is exactly why I like the work.",
    skills: ["REACT", "NEXT.JS", "GSAP", "SUPABASE"],
    note: "CURRENT QUEST: MAKE USEFUL THINGS FEEL ALIVE.",
  },
];

export interface SkillLevel {
  label: string;
  percent: number;
}

export const EXPERIENCE_SKILL_LEVELS: SkillLevel[] = [
  { label: "FRONT END", percent: 92 },
  { label: "DESIGN SYSTEMS", percent: 84 },
  { label: "BACK END", percent: 70 },
  { label: "DEPLOYMENT", percent: 78 },
];

export const EXPERIENCE_STACK_INVENTORY = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "NODE.JS",
  "POSTGRESQL",
  "SUPABASE",
  "GSAP",
  "FIGMA",
  "DOCKER",
];

export interface StudyEntry {
  title: string;
  detail: string;
}

export const EXPERIENCE_STUDY: StudyEntry[] = [
  {
    title: "Data Science & Artificial Intelligence",
    detail: "Faculty of Electrical Engineering, Sarajevo · 2021—present",
  },
  {
    title: "Software Engineering & Management",
    detail: "Bachelor’s programme · completed 2024",
  },
  {
    title: "Everything else, self-taught",
    detail: "Docs, source code and shipping badly before shipping better.",
  },
];
