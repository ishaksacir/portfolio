import { useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CaretUp, ListBullets, RocketLaunch, SquaresFour } from "@phosphor-icons/react";
import { Footer } from "../components/Footer";
import { FinderPath, Notification, PixelTitle, Segmented } from "../components/ui";
import { FOLDERS, PROJECTS, TAG_COLORS, tabOffset } from "../content/projects";
import { useTitle } from "../hooks";
import "../styles/work.css";

type View = "gallery" | "list";

const HOVER_TILT = [
  "translateY(-10px) rotate(-.7deg)",
  "translateY(-10px) rotate(.6deg)",
  "translateY(-10px) rotate(-.5deg)",
];
const COVER_ROT = ["-.6deg", ".7deg", "-.4deg"];

const tagsFor = (chips: string[], i: number) =>
  chips.map((t, k) => ({ t, color: TAG_COLORS[(i + k) % TAG_COLORS.length] }));
const titleCase = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export default function Work() {
  useTitle("Work — Ishak Sacirbey");
  const [view, setView] = useState<View>("gallery");
  const count = `${PROJECTS.length} items`;

  return (
    <>
      <main>
        <section
          className="scenic-header"
          style={{ "--scene": "url('/images/land-autumn.webp')", "--scene-y": "35%" } as CSSProperties}
        >
          <div className="scenic-header__inner">
            <FinderPath folder="work" />
            <PixelTitle>SELECTED WORK</PixelTitle>
            <div className="work-intro">
              <p className="work-intro__lead">
                Three projects I took from first sketch to live site — design, code and everything in between.
              </p>
              <span className="hand work-intro__note">a few favourites ↓</span>
            </div>
            <Notification icon={RocketLaunch} tone="green" title="Deploy succeeded" time="2m ago">
              {PROJECTS.length} of {PROJECTS.length} projects live — {PROJECTS.map((p) => p.domain).join(", ")}. Zero
              rollbacks (so far).
            </Notification>
            <div className="work-controls">
              <Segmented
                label="View"
                value={view}
                onChange={setView}
                items={[
                  { key: "gallery", label: "Gallery", icon: SquaresFour },
                  { key: "list", label: "List", icon: ListBullets },
                ]}
              />
              <span className="work-controls__count">{count}</span>
            </div>
          </div>
        </section>

        <div className="ruled" style={{ borderTop: "1px solid var(--border)" }}>
          <section className="work-projects" aria-label="Projects">
            {view === "list" ? <ProjectList count={count} /> : <FolderStack />}
          </section>
        </div>
      </main>
      <Footer note="seen enough? good sign." secondary={{ label: "About me →", to: "/about" }} />
    </>
  );
}

/** Each project is a physical file folder; hovering one lifts it and slides the ones below down. */
function FolderStack() {
  const [hov, setHov] = useState(-1);
  return (
    <div className="folders">
      {PROJECTS.map((p, i) => {
        const f = FOLDERS[i % FOLDERS.length];
        const on = hov === i;
        const opened = i > 0 && hov === i - 1;
        const style = {
          marginTop: i === 0 ? 0 : opened ? "-18px" : "calc(-1 * var(--overlap))",
          zIndex: i + 1,
          color: f.fg,
          transformOrigin: i % 2 ? "20% 100%" : "80% 100%",
          transform: on ? HOVER_TILT[i % 3] : "none",
          filter: on ? "drop-shadow(0 18px 26px rgba(20,25,30,.18))" : "none",
          "--folder": f.bg,
          "--muted": f.muted,
        } as CSSProperties;
        return (
          <Link
            key={p.slug}
            id={p.slug}
            to={`/work/${p.slug}`}
            className="folder"
            style={style}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov((h) => (h === i ? -1 : h))}
            onFocus={() => setHov(i)}
            onBlur={() => setHov((h) => (h === i ? -1 : h))}
          >
            <div className="folder__tab" style={{ left: tabOffset(i) }}>
              ✦ PROJECT&nbsp;{p.no}
            </div>
            <div className="folder__body" style={{ borderRadius: i ? 14 : "0 14px 14px 14px" }}>
              <div className="folder__text">
                <span className="folder__kicker">
                  <span style={{ background: f.fg }} />
                  {p.date.toUpperCase()} · {p.kind.split(" · ")[1]}
                </span>
                <h2 className="folder__title">{p.title}</h2>
                <p className="folder__hook">{p.hook}</p>
                <div className="folder__chips">
                  {tagsFor(p.chips, i).map((c) => (
                    <span key={c.t} className="folder__chip" style={{ background: f.chipBg }}>
                      <span style={{ background: c.color }} />
                      {c.t}
                    </span>
                  ))}
                </div>
                <div className="folder__cta">
                  <span className="folder__view" style={{ borderBottomColor: f.fg }}>
                    VIEW PROJECT <ArrowUpRight size={13} />
                  </span>
                  <span className="hand folder__aside">{p.aside}</span>
                </div>
              </div>
              <div className="folder__cover" style={{ transform: `rotate(${COVER_ROT[i % 3]})` }}>
                <span className="tape tape--l" />
                <span className="tape tape--r" />
                <div className="photo-frame">
                  <div className="photo-frame__media">
                    <img src={p.cover} alt={`${p.title} cover`} style={{ objectPosition: "center top" }} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Finder list view. */
function ProjectList({ count }: { count: string }) {
  return (
    <div className="flist">
      <div className="flist__row flist__row--head">
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          Name
          <CaretUp size={10} />
        </span>
        <span>Kind</span>
        <span>Date Modified</span>
        <span>Tags</span>
      </div>
      {PROJECTS.map((p, i) => (
        <Link
          key={p.slug}
          to={`/work/${p.slug}`}
          className="flist__row"
          style={{ background: i % 2 ? "rgba(20,25,30,.035)" : "transparent" }}
        >
          <span className="flist__name">
            <img src="/images/folder-code.webp" alt="" />
            <span className="flist__name-text">
              <span className="flist__title">{p.title}</span>
              <span className="flist__hook">{p.hook}</span>
            </span>
          </span>
          <span className="flist__dim">Web · {titleCase(p.kind.split(" · ")[1])}</span>
          <span className="flist__dim">{p.date}</span>
          <span className="flist__tags">
            {tagsFor(p.chips, i).map((c) => (
              <span key={c.t}>
                <span style={{ background: c.color }} />
                {c.t}
              </span>
            ))}
          </span>
        </Link>
      ))}
      <div className="flist__foot">{count}, 2.4 GB available</div>
    </div>
  );
}
