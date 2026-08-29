import type { PageId } from "../routes/routes";

export interface NavItem {
  id: Exclude<PageId, "home" | "contact">;
  label: string;
}

export const BRAND_LABEL = "SACIRBEY";

/** Order the primary nav renders in, left to right. */
export const NAV_ITEMS: NavItem[] = [
  { id: "work", label: "The Good Stuff" },
  { id: "about", label: "Origin Story" },
  { id: "experience", label: "Lore" },
  { id: "process", label: "How It’s Made" },
  { id: "journal", label: "Brain Dump" },
];

export const CONTACT_NAV_LABEL = "Summon Me";
