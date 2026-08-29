import type { ComponentType } from "react";
import { Home } from "../pages/Home/Home";
import { Work } from "../pages/Work/Work";
import { About } from "../pages/About/About";
import { Experience } from "../pages/Experience/Experience";
import { Process } from "../pages/Process/Process";
import { Journal } from "../pages/Journal/Journal";
import { Contact } from "../pages/Contact/Contact";

export type PageId =
  "home" | "work" | "about" | "experience" | "process" | "journal" | "contact";

export const PAGE_IDS: PageId[] = [
  "home",
  "work",
  "about",
  "experience",
  "process",
  "journal",
  "contact",
];

export const PAGE_COMPONENTS: Record<PageId, ComponentType> = {
  home: Home,
  work: Work,
  about: About,
  experience: Experience,
  process: Process,
  journal: Journal,
  contact: Contact,
};
