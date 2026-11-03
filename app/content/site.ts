import { GithubLogo, InstagramLogo, LinkedinLogo, XLogo, type Icon } from "@phosphor-icons/react";

/** Side projects and experiments; set apart from the main pages in the navbar. */
export const NAV_PLAYGROUND = { to: "/playground", label: "Playground" };

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/work", label: "Work" },
  { to: "/journal", label: "Blog" },
];

interface Social {
  label: string;
  href: string;
  icon: Icon;
}

export const SOCIALS: Social[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ishaksacirbey/", icon: LinkedinLogo },
  { label: "Twitter / X", href: "https://x.com/ishak_sacirbey", icon: XLogo },
  { label: "Instagram", href: "https://www.instagram.com/sacirbey_/", icon: InstagramLogo },
  { label: "GitHub", href: "https://github.com/ishaksacir", icon: GithubLogo },
];

export const CONTACT_EMAIL = "hello@ishak.dev";

/** Drop the PDF into /public with this name to enable the "Download CV" button. */
export const CV_URL = "/ishak-sacirbey-cv.pdf";
