import { GlobeSimple, GraduationCap, MapPin, type Icon } from "@phosphor-icons/react";

/* Home page copy, lifted from home.dc.html. */

/** The hero editor types this out, line by line, then loops. */
export const HERO_CODE = [
  "// ishak.sys — boot sequence",
  "import { taste, patience } from './brain';",
  "",
  "const ishak = {",
  "  name: 'Ishak Sacirbey',",
  "  role: ['designer', 'developer'],",
  "  based: 'Sarajevo, BA',",
  "  tools: ['figma', 'react', 'node'],",
  "  coffee: Infinity,",
  "};",
  "",
  "function ship(idea) {",
  "  const draft = sketch(idea, taste);",
  "  while (!feelsRight(draft)) polish(draft);",
  "  return deploy(draft); // ship it",
  "}",
  "",
  "ship('something weird');",
].join("\n");

export const BIO =
  "Studying Data Science & AI at ETF Sarajevo, with two years of Software Engineering at TU Graz behind me. I design interfaces and build the things behind them.";

/** Fact rows in the mobile About block. */
export const HOME_FACTS: { icon: Icon; t: string; d: string }[] = [
  { icon: MapPin, t: "Sarajevo, BA", d: "Originally from Bihać" },
  { icon: GraduationCap, t: "ETF Sarajevo — DSAI", d: "Previously TU Graz, Software Engineering" },
  { icon: GlobeSimple, t: "Bosnian, English, German", d: "Native · very good · B2" },
];
