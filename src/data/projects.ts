import dalgaCover from "../assets/dalga-design-cover.png";

export type ProjectSwatch = "image" | "blue" | "green" | "black" | "";

export interface Project {
  number: string;
  title: string;
  category: string;
  year: string;
  /** Cover art for the shop card. Most issues don't have one yet. */
  image: string;
  /** Card background treatment when there's no cover image. */
  swatch: ProjectSwatch;
}

/** How many issues show under "new arrivals" / the homepage preview. */
export const FEATURED_PROJECT_COUNT = 3;

export const PROJECTS: Project[] = [
  {
    number: "01",
    title: "DALGA DESIGN",
    category: "BRAND / WEB",
    year: "2025",
    image: dalgaCover,
    swatch: "image",
  },
  {
    number: "02",
    title: "FUELFIT TRACKER",
    category: "REACT / SUPABASE",
    year: "2025",
    image: "",
    swatch: "blue",
  },
  {
    number: "03",
    title: "BIH GENESIS",
    category: "LOGO / PRINT",
    year: "2025",
    image: "",
    swatch: "green",
  },
  {
    number: "04",
    title: "BIHAĆ SCHOOL",
    category: "NEXT.JS / POSTGRES",
    year: "2025",
    image: "",
    swatch: "",
  },
  {
    number: "05",
    title: "UNA ADVENTURES",
    category: "ASTRO / SANITY",
    year: "2024",
    image: "",
    swatch: "",
  },
  {
    number: "06",
    title: "PRESS LAB",
    category: "CANVAS / MOTION",
    year: "2024",
    image: "",
    swatch: "black",
  },
];
