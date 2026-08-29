export interface TimelineEntry {
  panel: string;
  year: string;
  copy: string;
}

export const ABOUT_TIMELINE: TimelineEntry[] = [
  {
    panel: "01",
    year: "2014",
    copy: "A borrowed laptop and Notepad. The first page was a fan site for the local football club — eleven marquee tags, one visitor.",
  },
  {
    panel: "02",
    year: "2018",
    copy: "First paid job: a café menu site for 80 KM. Learned that the client’s phone is the only device that actually matters.",
  },
  {
    panel: "03",
    year: "2021",
    copy: "A studio, real deadlines, other people’s code. Two years of maintenance taught me more about design than any course did.",
  },
  {
    panel: "04",
    year: "2024",
    copy: "Went solo. Interface, identity and front end under one roof — which is how I wanted to work in the first place.",
  },
];

export interface Trait {
  title: string;
  copy: string;
}

export const ABOUT_TRAITS: Trait[] = [
  {
    title: "CLARITY FIRST",
    copy: "If it needs explaining, it needs redesigning.",
  },
  {
    title: "BUILT TO LAST",
    copy: "Boring, readable code. Fewer dependencies.",
  },
  {
    title: "FAST BY DEFAULT",
    copy: "Performance is a design decision, not a cleanup task.",
  },
  {
    title: "A LITTLE PLAY",
    copy: "One surprising detail per project — never at the cost of the task.",
  },
];

export interface Interest {
  title: string;
  copy: string;
}

export const ABOUT_INTERESTS: Interest[] = [
  {
    title: "Rivers and mountains",
    copy: "The Una is an hour away. Most weekends end up there.",
  },
  {
    title: "Type and posters",
    copy: "Collecting mid-century Yugoslav print design. It shows.",
  },
  {
    title: "Coffee, black",
    copy: "Two a day. The second is when the hard part gets solved.",
  },
  {
    title: "Side projects",
    copy: "Small tools nobody asked for — the best way to learn.",
  },
];

export const ABOUT_INFO: [string, string][] = [
  ["BASED", "SARAJEVO, BA"],
  ["EXPERIENCE", "3+ YEARS"],
  ["PROJECTS", "9 SHIPPED"],
  ["LANGUAGES", "BS / EN / DE"],
  ["STATUS", "AVAILABLE"],
];
