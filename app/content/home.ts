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

export const ABOUT_CHIPS = ["Bihać → Sarajevo", "ETF · DSAI", "TU Graz", "BS / EN / DE"];
