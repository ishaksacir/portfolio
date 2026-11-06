import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CaretRight } from "@phosphor-icons/react";
import { Highlight } from "../../components/TechText";
import { BIO, HOME_FACTS } from "../../content/home";
import { POSTS } from "../../content/journal";
import { PROJECTS } from "../../content/projects";
import { useNow, useTitle } from "../../hooks";
import { Carousel, PageEnd, PageHeader, Polaroid, Sec } from "../ui";

const LATEST_NOTES = [...POSTS].sort((a, b) => b.d.localeCompare(a.d)).slice(0, 3);

/** "24 Aug 2026" → "24 AUG" */
const shortDate = (date: string) => date.split(" ").slice(0, 2).join(" ").toUpperCase();

/** Its own component so the once-a-second tick doesn't re-render the page. */
function Clock() {
  const now = useNow();
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Sarajevo" });
  return <span className="m-meta">{time} CET</span>;
}

export default function Home() {
  useTitle("Ishak Sacirbey — designer & developer");
  return (
    <main>
      <PageHeader>
        <div className="m-h-row m-between">
          <span className="m-meta">SARAJEVO, BA</span>
          <Clock />
        </div>
        <div className="m-hand m-hello">hi, my name is</div>
        <div className="m-namebox">
          <i />
          <i />
          <i />
          <i />
          <h1 className="m-name">
            <span>ISHAK</span>
            <span>SACIRBEY</span>
          </h1>
        </div>
        <div className="m-v24" style={{ marginTop: 32 }}>
          <h2 className="m-h2">
            I design and build software that feels <Highlight text="handmade." letterSpacing={-0.015} specks={8} />
          </h2>
          <p className="m-body">Designer and developer, studying Data Science &amp; AI at ETF Sarajevo.</p>
          <div className="m-btns">
            <Link to="/work" className="m-btn m-btn-primary">
              See work
            </Link>
            <Link to="/about" className="m-btn m-btn-secondary">
              About me
            </Link>
          </div>
        </div>
        <div style={{ marginTop: 48 }}>
          <Polaroid
            src="/images/portrait-laptop-smooth.webp"
            alt="Ishak Sacirbey"
            caption="(yes, the pixels are on purpose)"
            width="64%"
            tilt="2deg"
            fit="contain"
            position="50% 100%"
            breathe
          />
        </div>
      </PageHeader>

      <section className="m-sec m-sec--tight">
        <div className="m-card">
          <div className="m-row">
            <span className="m-ico m-available">
              <span className="m-pulse" />
            </span>
            <div className="m-row-main">
              <span className="m-row-title">Open to new work &amp; odd problems</span>
              <span className="m-row-sub">Freelance web design and development</span>
            </div>
          </div>
        </div>
      </section>

      <Sec
        label="01 — Work"
        title={
          <>
            Selected <em>work.</em>
          </>
        }
        all="/work"
      >
        <Carousel count={PROJECTS.length} label="Selected work">
          {PROJECTS.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="m-slide m-slide--col m-card">
              <div className="m-media" style={{ aspectRatio: "4/3" }}>
                <img src={p.cover} alt={p.title} loading="lazy" />
              </div>
              <div className="m-pad m-v8" style={{ flex: 1 }}>
                <span className="m-meta">
                  {p.no} · {p.kind}
                </span>
                <span className="m-h3">{p.title}</span>
                <p className="m-small">{p.hook}</p>
                <span style={{ flex: 1 }} />
                <span className="m-link">
                  View project
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </Sec>

      <Sec
        label="02 — About"
        title={
          <>
            Designer, developer, <em>student.</em>
          </>
        }
      >
        <div className="m-v24">
          <p className="m-body">{BIO}</p>
          <div className="m-card">
            {HOME_FACTS.map(({ icon: IconC, t, d }) => (
              <div key={t} className="m-row">
                <span className="m-ico">
                  <IconC size={18} />
                </span>
                <div className="m-row-main">
                  <span className="m-row-title">{t}</span>
                  <span className="m-row-sub">{d}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="m-btn m-btn-secondary">
            More about me
            <ArrowRight size={17} />
          </Link>
        </div>
      </Sec>

      <Sec
        label="03 — Blog"
        title={
          <>
            Latest <em>notes.</em>
          </>
        }
        all="/journal"
      >
        <div className="m-card">
          {LATEST_NOTES.map((n) => (
            <Link key={n.d} to="/journal" className="m-row">
              <div className="m-row-main">
                <span className="m-meta">
                  {shortDate(n.date)} · {n.mins} MIN
                </span>
                <span className="m-row-title m-row-title--display">{n.title}</span>
              </div>
              <CaretRight size={16} className="m-chev" />
            </Link>
          ))}
        </div>
      </Sec>

      <PageEnd aside="scrolled all the way down? respect." secondary={{ label: "About me", to: "/about" }} />
    </main>
  );
}
