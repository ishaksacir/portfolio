export interface ArchiveEntry {
  date: string;
  title: string;
  category: string;
  minutesToRead: string;
}

export const JOURNAL_ARCHIVE: ArchiveEntry[] = [
  {
    date: "APR 2026",
    title: "THE CSS I STILL GET WRONG",
    category: "ENGINEERING",
    minutesToRead: "4 MIN",
  },
  {
    date: "MAR 2026",
    title: "SHIPPING A BRAND IN A WEEK",
    category: "DESIGN",
    minutesToRead: "7 MIN",
  },
  {
    date: "FEB 2026",
    title: "WHAT I CHARGE AND WHY",
    category: "PROCESS",
    minutesToRead: "6 MIN",
  },
];

export interface GuestbookEntry {
  message: string;
  author: string;
}

export const JOURNAL_GUESTBOOK: GuestbookEntry[] = [
  {
    message:
      "Found this via a webring at 2am. The risograph thing broke my brain, respect.",
    author: "@MARA_DOES_TYPE",
  },
  {
    message: "Stole your form validation post for work. Sorry. Thank you.",
    author: "@DENIZ.TXT",
  },
];

export const JOURNAL_TAGS = [
  "#css",
  "#riso",
  "#performance",
  "#type",
  "#systems",
  "#gsap",
  "#pricing",
  "#coffee",
];

export interface BoostedPost {
  boosts: number;
  title: string;
}

export const JOURNAL_BOOSTED_ALL_TIME: BoostedPost[] = [
  { boosts: 212, title: "Design the escape hatch first" },
  { boosts: 183, title: "What I charge and why" },
  { boosts: 128, title: "Motion that survives a slow phone" },
];

export const JOURNAL_CATEGORY_COUNTS = [
  { label: "ALL 14", active: true },
  { label: "ENGINEERING 5" },
  { label: "DESIGN 4" },
  { label: "PROCESS 3" },
  { label: "LONGER THOUGHTS 2" },
];
