export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  postedAgo: string;
  minutesToRead: number;
  boosts: number;
  comments: number;
  /** When set, the post renders as a pull-quote instead of its excerpt ("shorter thought" format). */
  quote?: string;
  /** Only the color-systems post shows its palette. */
  accentSwatches?: string[];
  /** Only the engineering post shows a code sample. */
  codeSnippet?: string;
}

/** Shared between the homepage blog preview and the full Journal feed. */
export const BLOG_POSTS: BlogPost[] = [
  {
    title: "SIX SHAPES ARE ENOUGH",
    excerpt:
      "Building a whole visual identity out of an arch, a circle and four friends.",
    category: "DESIGN",
    postedAgo: "3 DAYS AGO",
    minutesToRead: 6,
    boosts: 64,
    comments: 11,
    accentSwatches: [
      "#e13b2e",
      "#2c60ad",
      "#f7bf21",
      "#5c7946",
      "#191713",
      "#eee5cf",
    ],
  },
  {
    title: "TYPED FORMS WITHOUT A LIBRARY",
    excerpt: "What you actually lose by dropping the form dependency.",
    quote:
      "Every design system dies the day someone needs a button that isn’t in it. Design the escape hatch first.",
    category: "SHORTER THOUGHT",
    postedAgo: "1 WEEK AGO",
    minutesToRead: 1,
    boosts: 212,
    comments: 38,
  },
  {
    title: "TWO DIRECTIONS, NEVER THREE",
    excerpt: "Why I stopped showing clients a third option.",
    category: "ENGINEERING",
    postedAgo: "3 WEEKS AGO",
    minutesToRead: 9,
    boosts: 97,
    comments: 19,
    codeSnippet: "const errors = validate(form)\n// 41 lines. no dependencies.",
  },
];
