/* Playground experiments, lifted from playground.dc.html. */

export type Status = "In progress" | "Shelved" | "Someday" | "Abandoned";

export interface Experiment {
  file: string;
  title: string;
  body: string;
  status: Status;
  pct: number;
  date: string;
  note: string;
  ratio: string;
  /** placeholder label for the photo until a real image is set */
  ph: string;
  src?: string;
  idea: string;
  stuck: string;
  next: string;
  stack: string;
}

export const STATUS_COLOR: Record<Status, string> = {
  "In progress": "#3E5A8C",
  Shelved: "#7F5A1C",
  Someday: "#3F5E5A",
  Abandoned: "#8A4232",
};

export const PLAYGROUND_INTRO = "Half-built ideas, weekend experiments and things I haven't given up on yet.";

export const EXPERIMENTS: Experiment[] = [
  { file: "pixel-type.fig", title: "A pixel font, one glyph a night", body: "Drawing a 16×16 typeface for this site. Lowercase is done, numbers are fighting me.", status: "In progress", pct: 60, date: "Sep 2026", note: "the \"g\" is cursed", ratio: "4/3", ph: "Glyph sheet", idea: "A bitmap typeface drawn on a 16×16 grid, one glyph every night, so this whole site can speak in my own pixels.", stuck: "Lowercase g, y and j refuse to share a descender height. Kerning pixel fonts is a special kind of pain.", next: "Finish numerals, then export a test .woff2 and swap it into the nav.", stack: "Figma · FontForge · 16px grid" },
  { file: "una-map.html", title: "An interactive map of the Una", body: "Every swimming spot, bridge and café along the river — scroll to float downstream.", status: "Shelved", pct: 35, date: "Jul 2026", note: "needs a summer, not a weekend", ratio: "16/10", ph: "Map sketch", idea: "Scroll down the page and you float down the Una — every bridge, swimming spot and café pinned where the current takes you.", stuck: "Needs real photos and GPS points, which means actually being there for a whole summer.", next: "Ride the river once with a GoPro and log coordinates.", stack: "Mapbox · GSAP · GeoJSON" },
  { file: "window-manager.css", title: "A tiny window manager in CSS", body: "Draggable, stackable Mac windows with almost no JavaScript. Mostly for fun.", status: "In progress", pct: 75, date: "Aug 2026", note: "you are looking at v0.1", ratio: "1/1", ph: "Screen recording", idea: "Draggable, stackable Mac-style windows built almost entirely in CSS — the site you are on is v0.1.", stuck: "Z-index focus without JavaScript is a lie. I need at least a few lines.", next: "Add snap-to-edges and a proper minimise animation.", stack: "CSS · a little JS · too much caffeine" },
  { file: "poster-gen.js", title: "Generative gig posters", body: "Feed it a band name and a date, get a Swiss-style poster. Great results 1 in 10 times.", status: "Someday", pct: 20, date: "Jun 2026", note: "1 in 10 is a good ratio, right?", ratio: "3/4", ph: "Poster output", idea: "Type a band name and a date, get a Swiss-style gig poster built from a grid, one typeface and random constraints.", stuck: "Nine out of ten outputs are ugly. Taste is hard to encode.", next: "Hand-pick 50 good outputs and reverse-engineer the rules.", stack: "p5.js · Helvetica Now · randomness" },
  { file: "habit.sh", title: "A habit tracker for the terminal", body: "One command a day, a grid of dots. I stopped using it, which says something.", status: "Abandoned", pct: 50, date: "Apr 2026", note: "ironic, I know", ratio: "16/9", ph: "Terminal screenshot", idea: "A command that asks one question a day and draws a GitHub-style grid of dots in the terminal.", stuck: "I stopped opening the terminal to log habits. The habit tracker failed its own habit.", next: "Maybe make it a menubar app instead. Or accept defeat.", stack: "Bash · ANSI colours · guilt" },
  { file: "sound-toy/", title: "Keyboard that plays the city", body: "Each key triggers a recorded sound from Sarajevo — trams, calls to prayer, rain on tin.", status: "Someday", pct: 10, date: "Mar 2026", note: "still collecting sounds", ratio: "4/3", ph: "Prototype still", idea: "A keyboard where every key plays a recorded sound from Sarajevo — trams, calls to prayer, rain on tin roofs.", stuck: "Collecting clean recordings in a loud city is slow work.", next: "Record 26 sounds, one per letter, then build the first playable demo.", stack: "Web Audio API · Zoom H1n" },
  { file: "cursor-lab.tsx", title: "Cursors with personality", body: "Lag, magnetism, trails. Twelve cursor behaviours and a switch to compare them.", status: "In progress", pct: 85, date: "Sep 2026", note: "almost shippable!", ratio: "16/10", ph: "Cursor demo", idea: "Twelve cursor behaviours — lag, magnetism, trails, gravity — with a toggle to compare how each one feels.", stuck: "Almost done. Just polishing the easing curves so none of them feel sick.", next: "Write short notes on when each cursor is actually a good idea.", stack: "React · Framer Motion · springs" },
  { file: "recipes.app", title: "A recipe app for one person", body: "Scales everything down to a single portion. Turns out that is harder than it sounds.", status: "Abandoned", pct: 40, date: "Jan 2026", note: "maths > cooking", ratio: "1/1", ph: "App screens", idea: "A recipe app that scales everything down to a single portion — for people who cook for one.", stuck: "Half an egg. A third of an onion. Maths broke the cooking.", next: "Add smart rounding and \"use the rest tomorrow\" suggestions.", stack: "SwiftUI · Core Data" },
];

/* Per-position decoration, cycled by index. */
export const TILTS = ["-2.4deg", "1.8deg", "-1deg", "2.6deg", "-1.8deg", "1.2deg", "-2.8deg", "1.6deg"];
export const DROPS = ["0px", "26px", "8px", "18px", "0px", "30px", "12px", "4px"];
export const PAPERS = ["#FFE98A", "#FFC9D6", "#C4E3F6", "#D2EDB8", "#FFD7A8", "#E1D5F5"];
