/* Journal content, lifted from journal.dc.html (posts) and home.dc.html (threads). */

export type Category = "Development" | "Design" | "Life" | "Process";

export interface Post {
  /** ISO date, used for sorting */
  d: string;
  date: string;
  cat: Category;
  sub: string;
  title: string;
  ex: string;
  mins: number;
  /** cover image path — empty until real covers exist */
  cover?: string;
}

export const POSTS: Post[] = [
  {
    d: "2026-08-24",
    date: "24 Aug 2026",
    cat: "Development",
    sub: "Performance",
    title: "Motion that survives a slow phone",
    ex: "Transforms, frame budgets, and the three animations I now cut from every project.",
    mins: 12,
  },
  {
    d: "2026-07-30",
    date: "30 Jul 2026",
    cat: "Design",
    sub: "Systems",
    title: "Six shapes are enough",
    ex: "How a tiny set of radii and rectangles ended up carrying a whole identity.",
    mins: 6,
  },
  {
    d: "2026-07-12",
    date: "12 Jul 2026",
    cat: "Life",
    sub: "Travel",
    title: "A week on the Una, offline",
    ex: "No laptop, one notebook, and a list of ideas that turned out better than expected.",
    mins: 5,
  },
  {
    d: "2026-06-18",
    date: "18 Jun 2026",
    cat: "Development",
    sub: "TypeScript",
    title: "Typed forms without a library",
    ex: "Validation, errors and state in about eighty lines — and why I stopped reaching for packages.",
    mins: 9,
  },
  {
    d: "2026-05-02",
    date: "2 May 2026",
    cat: "Design",
    sub: "Portfolio",
    title: "Redesigning this portfolio, twice",
    ex: "From comic panels to a Macintosh notebook — what stayed, what went, and why.",
    mins: 7,
  },
  {
    d: "2026-04-10",
    date: "10 Apr 2026",
    cat: "Development",
    sub: "CSS",
    title: "The CSS I still get wrong",
    ex: "Stacking contexts, min-width: 0, and other things I relearn every quarter.",
    mins: 4,
  },
  {
    d: "2026-03-06",
    date: "6 Mar 2026",
    cat: "Design",
    sub: "Branding",
    title: "Shipping a brand in a week",
    ex: "A compressed identity process that still leaves room for one good idea.",
    mins: 7,
  },
  {
    d: "2026-02-14",
    date: "14 Feb 2026",
    cat: "Process",
    sub: "Freelance",
    title: "What I charge and why",
    ex: "Day rates, fixed scopes and the one question I ask before every quote.",
    mins: 6,
  },
];

export const TAG_STYLE: Record<Category, [bg: string, fg: string]> = {
  Development: ["rgba(91,125,191,.14)", "#3E5A8C"],
  Design: ["rgba(209,154,61,.18)", "#7F5A1C"],
  Life: ["rgba(104,120,90,.16)", "#4F5C43"],
  Process: ["rgba(90,127,122,.16)", "#3F5E5A"],
};

export const WRITING_ABOUT: { label: string; done: boolean }[] = [
  { label: "Product design", done: true },
  { label: "Front-end craft", done: true },
  { label: "Type & posters", done: false },
  { label: "Freelance life", done: true },
  { label: "Rivers, mostly the Una", done: false },
];

export const TODOS = [
  "Portfolio v2",
  "Finish the Fuelfit case study",
  "Plan the next Una trip",
  "New side project idea",
];

export const JOURNAL_INTRO =
  "Bits of code, design, and everything in between. A place to write things down and think out loud.";

/* ─── Home page "Latest threads" ─── */
interface Thread {
  slug: string;
  tw: string;
  hash: string;
  replies: number;
  rts: number;
  likes: number;
  views: string;
  date: string;
  title: string;
  read: string;
  ex: string;
  body: string[];
}

export const THREADS: Thread[] = [
  {
    slug: "motion-slow-phone",
    tw: "Tested every animation I've shipped this year on a borrowed 4-year-old Android. Most of them didn't make it.",
    hash: "webperf",
    replies: 14,
    rts: 22,
    likes: 186,
    views: "9.4K",
    date: "24 Aug 2026",
    title: "Motion that survives a slow phone",
    read: "12 min",
    ex: "Transforms, frame budgets, and three animations I now cut.",
    body: [
      "Most animation advice assumes a flagship phone. Most people visiting the sites I build are on a four-year-old Android with thirty tabs open, so I started testing everything on the cheapest phone I could borrow.",
      "The first rule was boring: animate only transform and opacity. Anything that touches layout — height, top, width — gets replaced or cut. The second rule was a budget: if a transition cannot finish inside 200ms on that phone, it does not ship.",
      "The surprising part was what users missed when I removed things. Nobody missed the parallax. Everybody noticed when the buttons stopped responding instantly.",
    ],
  },
  {
    slug: "six-shapes",
    tw: "Built a whole studio identity out of six shapes. Felt limiting for a day, liberating for a month.",
    hash: "branding",
    replies: 8,
    rts: 31,
    likes: 240,
    views: "12K",
    date: "30 Jul 2026",
    title: "Six shapes are enough",
    read: "6 min",
    ex: "A tiny set of radii and rectangles that carried a whole identity.",
    body: [
      "For a small studio identity I gave myself one constraint: six shapes, no more. A square, a pill, a circle, two radii and a single diagonal.",
      "Every icon, badge and layout had to be built out of those pieces. It felt limiting for a day and liberating for the rest of the project — decisions got faster because most options were already off the table.",
      "The side effect I did not expect: the brand became recognisable from a single cropped corner. Constraints are a shortcut to consistency.",
    ],
  },
];
