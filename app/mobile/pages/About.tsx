import { DownloadSimple } from "@phosphor-icons/react";
import { DOING, EDUCATION, EXPERIENCE, NOW, PRINCIPLES, PROCESS, ROLES, TOOLS } from "../../content/about";
import { CV_URL } from "../../content/site";
import { useTitle } from "../../hooks";
import { Carousel, PageEnd, PageHeader, Polaroid, Sec } from "../ui";

/** `todo` items still hold placeholder details, which only show in development (same as desktop). */
const SHOW_TODOS = import.meta.env.DEV;

const NEWEST_FIRST = [...EDUCATION].reverse();

const updated = new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }).toUpperCase();

export default function About() {
  useTitle("About — Ishak Sacirbey");
  return (
    <main>
      <PageHeader>
        <div className="m-v16">
          <span className="m-label">About</span>
          <h1 className="m-h1">Web developer who turns rough ideas into fast, thoughtful things.</h1>
          <div className="m-tags" style={{ marginTop: 4 }}>
            {ROLES.map((r) => (
              <span key={r.label} className="m-tag">
                {r.label}
              </span>
            ))}
          </div>
          <span className="m-hand m-hand--sm">same person, just different tools</span>
        </div>
        <div style={{ marginTop: 40 }}>
          <Polaroid
            src="/images/portrait-headshot-cut.webp"
            alt="Ishak Sacirbey"
            caption="yep, that's me"
            width="62%"
            tilt="-2deg"
            position="50% 20%"
          />
        </div>
      </PageHeader>

      <section className="m-sec">
        <div className="m-v24">
          <p className="m-body">
            I'm a student of Data Science &amp; Artificial Intelligence at ETF Sarajevo, with a background in Software
            Engineering and a deep interest in design, AI, and building useful things.
          </p>
          <div className="m-btns">
            <a href="#contact" className="m-btn m-btn-primary">
              Contact
            </a>
            <a href={CV_URL} download className="m-btn m-btn-secondary">
              <DownloadSimple size={17} />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <Sec label="01 — Focus" title="What I do">
        <div className="m-card">
          {DOING.map(({ icon: IconC, t, d }) => (
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
      </Sec>

      <Sec label="02 — Process" title="How I work">
        <div className="m-card">
          {PROCESS.map((s) => (
            <div key={s.n} className="m-row m-row--top">
              <span className="m-num">{s.n}</span>
              <div className="m-row-main">
                <span className="m-row-title">{s.t}</span>
                <span className="m-row-sub">{s.d}</span>
                <span className="m-meta" style={{ marginTop: 4 }}>
                  $ {s.cmd}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="03 — Principles" title="What I believe">
        <Carousel count={PRINCIPLES.length} label="Principles">
          {PRINCIPLES.map((p) => (
            <div key={p.n} className="m-slide m-principle" style={{ background: p.bg }}>
              <span className="m-meta">
                {p.n} / {String(PRINCIPLES.length).padStart(2, "0")}
              </span>
              <span className="m-h3 m-h3--lg">{p.t}</span>
              <p className="m-small">{p.d}</p>
            </div>
          ))}
        </Carousel>
      </Sec>

      <Sec label="04 — Experience" title="What I've done">
        <div className="m-card">
          {EXPERIENCE.map(({ app, icon: IconC, y, t, d, tags, todo }) => (
            <div key={app} className="m-row m-row--top m-row--roomy">
              <span className="m-ico">
                <IconC size={18} />
              </span>
              <div className="m-row-main m-row-main--4">
                <span className="m-meta">
                  {app} · {todo && !SHOW_TODOS ? "now" : y}
                </span>
                <span className="m-row-title">{t}</span>
                <span className="m-row-sub">{d}</span>
                <div className="m-tags" style={{ marginTop: 6 }}>
                  {tags.map((tag) => (
                    <span key={tag} className="m-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="05 — Now" title="Right now">
        <div className="m-card">
          {NOW.map(({ icon: IconC, t, d, todo }) => (
            <div key={t} className="m-row">
              <span className="m-ico">
                <IconC size={18} />
              </span>
              <div className="m-row-main">
                <span className="m-row-title">{t}</span>
                {(!todo || SHOW_TODOS) && <span className="m-row-sub">{d}</span>}
              </div>
            </div>
          ))}
        </div>
        <span className="m-meta" style={{ display: "block", marginTop: 12 }}>
          LAST UPDATED {updated}
        </span>
      </Sec>

      <Sec label="06 — Education" title="Where I studied">
        <div className="m-card">
          {NEWEST_FIRST.map((e) => (
            <div key={e.t} className="m-row m-row--top">
              <span className="m-kv">{e.y}</span>
              <div className="m-row-main">
                <span className="m-row-title">{e.t}</span>
                <span className="m-row-sub">{e.d}</span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="07 — Toolkit" title="Tools I use">
        <div className="m-tools">
          {TOOLS.map((t) => (
            <div key={t.name} className="m-card m-tool">
              <img src={t.src} alt="" loading="lazy" />
              <span>{t.name}</span>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="08 — Personal" title="Off the clock">
        <div className="m-card m-pad m-v12">
          <p className="m-body">
            Skiing and taking photos. Summers, I've spent 5+ years as a rafting guide on the Una.
          </p>
          <span className="m-hand m-hand--sm" style={{ color: "var(--amber)" }}>
            (nobody's fallen in… lately)
          </span>
        </div>
      </Sec>

      <PageEnd aside="still reading? nice." secondary={{ label: "See the work", to: "/work" }} />
    </main>
  );
}
