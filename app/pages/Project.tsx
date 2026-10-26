import { useLayoutEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  BracketsCurly,
  Image,
  Lightbulb,
  ListNumbers,
  RocketLaunch,
} from "@phosphor-icons/react";
import { Footer } from "../components/Footer";
import { FilePill, SectionHead, Slot, TypedText, Win } from "../components/ui";
import { PROJECTS, THEMES, findProject, tabOffset } from "../content/projects";
import { useTitle, useTypewriter } from "../hooks";
import "../styles/project.css";

/** Paints the page in the project's folder colour by overriding the tokens on :root. */
function useProjectTheme(slug: string) {
  useLayoutEffect(() => {
    const theme = THEMES[slug];
    if (!theme) return;
    const root = document.documentElement.style;
    for (const [k, v] of Object.entries(theme)) root.setProperty(k, v);
    return () => {
      for (const k of Object.keys(theme)) root.removeProperty(k);
    };
  }, [slug]);
}

const pad2 = (n: number) => String(n + 1).padStart(2, "0");

export default function Project() {
  const { slug } = useParams();
  const i = findProject(slug);
  if (i < 0) return <Navigate to="/work" replace />;
  return <ProjectPage key={PROJECTS[i].slug} index={i} />;
}

function ProjectPage({ index }: { index: number }) {
  const p = PROJECTS[index];
  useProjectTheme(p.slug);
  useTitle(`${p.title} — Ishak Sacirbey`);
  const lede = useTypewriter(p.lede, {
    delay: (ch) => (ch === " " ? 55 : ch === "," || ch === "." || ch === "—" ? 240 : 22 + Math.random() * 40),
  });

  return (
    <>
      <main>
        <section className="p-hero">
          <div className="p-hero__strip">
            <div className="p-hero__strip-inner">
              <div className="p-hero__tab" style={{ left: `calc(clamp(20px, 3cqw, 40px) + ${tabOffset(index)})` }}>
                ✦ PROJECT&nbsp;{p.no}
              </div>
            </div>
          </div>
          <div className="p-hero__inner">
            <Link to="/work" className="p-back">
              <ArrowLeft size={14} />
              ~/work
            </Link>
            <div className="p-hero__row">
              <div className="p-hero__text">
                <div className="p-hero__kicker">
                  <span>
                    {p.no} — {p.kind}
                  </span>
                  <span className="p-status">
                    <span />
                    {p.status}
                  </span>
                </div>
                <h1 className="p-hero__title">{p.title}</h1>
                <TypedText className="p-hero__lede" full={p.lede} typed={lede} />
                <div className="p-hero__chips">
                  {p.chips.map((c) => (
                    <span key={c} className="p-chip">
                      {c}
                    </span>
                  ))}
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener" className="p-hero__live">
                      Visit live site
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
                <dl className="p-facts">
                  {p.facts.map((f) => (
                    <div key={f.k}>
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="p-hero__cover">
                <span className="tape tape--l" style={{ left: 20, width: 84 }} />
                <span className="tape tape--r" style={{ right: 24, width: 84 }} />
                <div
                  className="photo-frame"
                  style={{ padding: 9, boxShadow: "0 2px 4px rgba(20,25,30,.14),0 18px 40px rgba(20,25,30,.3)" }}
                >
                  <div className="photo-frame__media">
                    <img src={p.cover} alt={`${p.title} cover`} style={{ objectPosition: "left center" }} />
                    <span className="hand p-hero__aside">{p.aside}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-case">
          <div className="p-case__inner">
            <div id="overview" className="p-overview">
              <div className="p-overview__text">
                <SectionHead kicker="01 — overview" title="THE STORY" note="(short version)" />
                <p className="p-overview__lead">{p.overviewLead}</p>
                <p className="p-overview__intro">{p.overview[0]}</p>
              </div>
              <figure className="brief">
                <div className="brief__bar">
                  <span />
                  <span style={{ flex: 1 }} />
                  <span>THE BRIEF</span>
                </div>
                <blockquote className="brief__quote">“{p.brief}”</blockquote>
              </figure>
            </div>

            <div id="approach" className="p-block">
              <SectionHead kicker="02 — approach" title="HOW I DID IT" note="four moves ↓" />
              <Win
                bar={
                  <>
                    <FilePill icon={ListNumbers}>approach.md</FilePill>
                    <span className="win__bar-label">APPROACH</span>
                  </>
                }
                foot={
                  <>
                    <span>02 // approach</span>
                    <span>{p.approach.length} steps · in order</span>
                  </>
                }
              >
                <ol className="p-approach">
                  {p.approach.map((s) => (
                    <li key={s.n}>
                      <span className="p-approach__n">{s.n}</span>
                      <span className="p-approach__title">{s.title}</span>
                      <span className="p-approach__body">{s.body}</span>
                    </li>
                  ))}
                </ol>
              </Win>
            </div>

            <div id="features" className="p-block">
              <SectionHead kicker="03 — what's inside" title="FEATURES" note="(the good bits)" />
              <Win
                bar={
                  <>
                    <FilePill icon={BracketsCurly}>features.json</FilePill>
                    <span className="win__bar-label">WHAT'S INSIDE</span>
                  </>
                }
                foot={
                  <>
                    <span>03 // features</span>
                    <span>JSON · valid ✓</span>
                  </>
                }
              >
                <ul className="p-features">
                  {p.features.map(({ icon: IconC, title, body }) => (
                    <li key={title}>
                      <span className="icon-tile">
                        <IconC size={18} />
                      </span>
                      <div>
                        <span className="p-features__title">{title}</span>
                        <span className="p-features__body">{body}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Win>
            </div>

            <div id="outcome" className="p-block">
              <SectionHead kicker="04 — outcome" title="HOW IT WENT" note="and what stuck with me" />
              <div className="p-outcome">
                <Win
                  bar={
                    <>
                      <FilePill icon={RocketLaunch}>outcome.log</FilePill>
                      <span className="win__bar-label">OUTCOME</span>
                    </>
                  }
                  foot={
                    <>
                      <span>04 // result</span>
                      <span>
                        <span style={{ color: "var(--green)" }}>✓ shipped</span> · exit 0
                      </span>
                    </>
                  }
                >
                  <div className="p-outcome__body">
                    {p.outcome.map((o) => (
                      <p key={o}>{o}</p>
                    ))}
                  </div>
                </Win>
                <Win
                  bar={
                    <>
                      <FilePill icon={Lightbulb}>learned.txt</FilePill>
                      <span className="win__bar-label">WHAT I LEARNED</span>
                    </>
                  }
                  foot={
                    <>
                      <span>05 // notes to self</span>
                      <span>Plain text · UTF-8</span>
                    </>
                  }
                >
                  <ol className="p-learned">
                    {p.learned.map((l, k) => (
                      <li key={l}>
                        <span>{pad2(k)}</span>
                        <span>{l}</span>
                      </li>
                    ))}
                  </ol>
                </Win>
              </div>
            </div>
          </div>
        </section>

        <section className="p-screens ruled">
          <div id="gallery" className="p-screens__inner">
            <SectionHead kicker="05 — screens" title="SCREENS" note="a closer look ↓" />
            <div className="p-screens__grid">
              {p.gallery.map((g, k) => (
                <Win
                  key={g.id}
                  bar={
                    <>
                      <FilePill icon={Image}>screen-{pad2(k)}.png</FilePill>
                      <span className="win__bar-label">{pad2(k)}</span>
                    </>
                  }
                  foot={
                    <>
                      <span>{g.cap}</span>
                      <span>PNG</span>
                    </>
                  }
                >
                  <div style={{ padding: 12 }}>
                    <div className="p-screens__shot">
                      <Slot src={g.src} label={g.ph} />
                    </div>
                  </div>
                </Win>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer note="liked this one? let's do yours." secondary={{ label: "More work →", to: "/work" }} />
    </>
  );
}
