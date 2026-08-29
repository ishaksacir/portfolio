import { useState } from "react";
import { Kicker } from "../../components/common/Kicker";
import { ShopCard } from "../../components/shop/ShopCard";
import { ComicCasePage } from "./ComicCasePage";
import { navigateTo } from "../../hooks/useHashRoute";
import { takeQueuedProjectIndex } from "../../utils/projectHandoff";
import { FEATURED_PROJECT_COUNT, PROJECTS } from "../../data/projects";

const SHELVES = [
  {
    label: "NEW ARRIVALS",
    tagline: "FRESH IN THIS WEEK",
    items: PROJECTS.slice(0, FEATURED_PROJECT_COUNT),
    offset: 0,
  },
  {
    label: "BACK CATALOGUE",
    tagline: "STILL IN PRINT",
    items: PROJECTS.slice(FEATURED_PROJECT_COUNT),
    offset: FEATURED_PROJECT_COUNT,
  },
];

export function Work() {
  const [selected, setSelected] = useState<number | null>(() =>
    takeQueuedProjectIndex(),
  );

  const open = (index: number) => {
    setSelected(index);
    window.scrollTo(0, 0);
  };

  const close = () => {
    setSelected(null);
    window.scrollTo(0, 0);
  };

  if (selected !== null) {
    return <ComicCasePage project={PROJECTS[selected]} onBack={close} />;
  }

  return (
    <main className="shop-page">
      <section className="shop-hero">
        <div>
          <Kicker>CHAPTER 02 · THE SHOP · SIX STORIES IN STOCK</Kicker>
          <h1>
            ISHAK’S
            <br />
            COMIC SHOP
          </h1>
          <p>
            Every project is an issue. Pick one off the shelf and read it cover
            to cover—process, code, decisions, and all.
          </p>
        </div>
        <strong className="shop-burst">BAM!</strong>
        <aside>
          <b>OPEN</b>
          <span>FOR PROJECTS</span>
          <small>
            NO ACCOUNT
            <br />
            NEEDED
          </small>
        </aside>
      </section>

      <div className="shop-filters">
        <span>BROWSE BY CASE:</span>
        <b>ALL {String(PROJECTS.length).padStart(2, "0")}</b>
        <button>WEB DESIGN</button>
        <button>WEB APP</button>
        <button>BRANDING</button>
        <button>EXPERIMENT</button>
        <em>SORT: NEWEST FIRST ↓</em>
      </div>

      {SHELVES.map((shelf) => (
        <section className="shop-shelf" key={shelf.label}>
          <div className="shop-shelf-title">
            <b>
              <i>{shelf.label}</i>
            </b>
            <span>{shelf.tagline}</span>
          </div>
          <div className="shop-grid">
            {shelf.items.map((project, i) => (
              <ShopCard
                project={project}
                index={i + shelf.offset}
                onOpen={() => open(i + shelf.offset)}
                key={project.number}
              />
            ))}
          </div>
          <div className="shop-ticker" aria-hidden="true" />
        </section>
      ))}

      <section className="shop-cta">
        <div>
          <Kicker>SHOPKEEPER’S NOTE</Kicker>
          <blockquote>
            Start with No. 02 if you like design systems. No. 01 if you like
            offline apps. All of them are better when nobody hides behind the
            final screenshot.
          </blockquote>
        </div>
        <div>
          <h2>
            WANT AN ISSUE
            <br />
            OF YOUR OWN?
          </h2>
          <button onClick={() => navigateTo("contact")}>
            COMMISSION ONE →
          </button>
        </div>
      </section>
    </main>
  );
}
