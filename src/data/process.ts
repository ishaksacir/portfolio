export interface ProcessStep {
  number: string;
  title: string;
  copy: string;
  output: string;
  time: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "DISCOVER",
    copy: "A call, then a written brief: audience, must-haves, what success looks like, and what is explicitly out of scope.",
    output: "BRIEF + ESTIMATE",
    time: "≈ 1 WEEK",
  },
  {
    number: "02",
    title: "DESIGN",
    copy: "Structure first — wireframes on real copy, then two visual directions. One gets picked and refined, never averaged.",
    output: "FIGMA FILE",
    time: "1 – 3 WEEKS",
  },
  {
    number: "03",
    title: "BUILD",
    copy: "Components, content, motion, accessibility, performance budget. A staging link every week from day one.",
    output: "STAGING LINK",
    time: "2 – 6 WEEKS",
  },
  {
    number: "04",
    title: "SHIP & KEEP",
    copy: "Launch, analytics, handover docs — plus a month of fixes included. Optional retainer after that.",
    output: "THE LIVE SITE",
    time: "LAUNCH +30D",
  },
];

export interface PricingTier {
  label: string;
  detail: string;
  price: string;
}

export const PROCESS_PRICING: PricingTier[] = [
  {
    label: "Landing page",
    detail: "Design + build, 1—2 weeks",
    price: "FROM €900",
  },
  {
    label: "Marketing site",
    detail: "5—8 pages, CMS, 3—5 weeks",
    price: "FROM €2,400",
  },
  { label: "Web app", detail: "Scoped per project", price: "DAY RATE" },
  { label: "Retainer", detail: "Ongoing changes, monthly", price: "FROM €400" },
];

export interface ProcessPrinciple {
  lead: string;
  copy: string;
}

export const PROCESS_PRINCIPLES: ProcessPrinciple[] = [
  {
    lead: "Content before layout.",
    copy: "Real copy in the wireframe, or the design is a guess.",
  },
  {
    lead: "One decision at a time.",
    copy: "No 40-screen reveal — you review as it’s built.",
  },
  {
    lead: "Motion earns its place.",
    copy: "It explains a change of state, or it doesn’t ship.",
  },
  {
    lead: "You own everything.",
    copy: "Repo, design file, domains, accounts — handed over.",
  },
];
