import type { CSSProperties } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, GlobeSimple } from "@phosphor-icons/react";
import { Slot } from "../../components/ui";
import { MOBILE_THEMES, PROJECTS, findProject } from "../../content/projects";
import { useTitle } from "../../hooks";
import { Carousel, PageEnd, PageHeader, Sec } from "../ui";

export default function Project() {
  const { slug } = useParams();
  const i = findProject(slug);
  if (i < 0) return <Navigate to="/work" replace />;
  return <ProjectPage key={PROJECTS[i].slug} index={i} />;
}

function ProjectPage({ index }: { index: number }) {
  const p = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const th = MOBILE_THEMES[p.slug];
  useTitle(`${p.title} — Ishak Sacirbey`);

  const headerTheme = {
    "--th-bg": th.bg,
    "--th-fg": th.fg,
    "--th-muted": th.muted,
    "--th-acc": th.acc,
    "--th-rule": th.rule,
    "--th-chip": th.chip,
  } as CSSProperties;

  return (
    <main>
      <PageHeader className="m-phdr" style={headerTheme}>
        <div className="m-v16">
          <span className="m-label">
            Project {p.no} · {p.kind}
          </span>
          <h1 className="m-h1">{p.title}</h1>
          <p className="m-lede">{p.lede}</p>
          <div className="m-tags">
            {p.chips.map((c) => (
              <span key={c} className="m-tag">
                {c}
              </span>
            ))}
          </div>
          {p.url && (
            <a href={p.url} target="_blank" rel="noopener" className="m-btn m-phdr-visit">
              <GlobeSimple size={17} />
              Visit {p.domain}
            </a>
          )}
        </div>
        <div className="m-card m-phdr-cover">
          <div className="m-media" style={{ aspectRatio: "4/3" }}>
            <img src={p.cover} alt={p.title} />
          </div>
        </div>
        <span className="m-hand m-phdr-aside">{p.aside}</span>
      </PageHeader>

      <section className="m-sec" style={{ paddingTop: 32 }}>
        <div className="m-card">
          {p.facts.map((f) => (
            <div key={f.k} className="m-row m-row--fact">
              <span className="m-kv">{f.k}</span>
              <span className="m-fact">{f.v}</span>
            </div>
          ))}
        </div>
      </section>

      <Sec label="01 — Overview" title="The story">
        <div className="m-v16">
          <p className="m-h3 m-overview-lead">{p.overviewLead}</p>
          {p.overview.map((t) => (
            <p key={t} className="m-body">
              {t}
            </p>
          ))}
          <div className="m-brief">
            <span className="m-label">The brief</span>
            <p>“{p.brief}”</p>
          </div>
        </div>
      </Sec>

      <Sec label="02 — Approach" title="How I did it">
        <div className="m-card">
          {p.approach.map((s) => (
            <div key={s.n} className="m-row m-row--top m-row--roomy">
              <span className="m-num">{s.n}</span>
              <div className="m-row-main m-row-main--4">
                <span className="m-row-title">{s.title}</span>
                <span className="m-row-sub">{s.body}</span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="03 — Features" title="What's inside">
        <div className="m-card">
          {p.features.map(({ icon: IconC, title, body }) => (
            <div key={title} className="m-row m-row--top">
              <span className="m-ico">
                <IconC size={18} />
              </span>
              <div className="m-row-main">
                <span className="m-row-title">{title}</span>
                <span className="m-row-sub">{body}</span>
              </div>
            </div>
          ))}
        </div>
      </Sec>

      <Sec label="04 — Outcome" title="How it went">
        <div className="m-v24">
          {p.outcome.map((t) => (
            <p key={t} className="m-body">
              {t}
            </p>
          ))}
          <div className="m-v12">
            <span className="m-label m-label--muted">What I learned</span>
            <div className="m-card">
              {p.learned.map((t, k) => (
                <div key={t} className="m-row m-row--top">
                  <span className="m-num">{String(k + 1).padStart(2, "0")}</span>
                  <span className="m-learned">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sec>

      <Sec label="05 — Screens" title="Screens">
        <Carousel count={p.gallery.length} label={`${p.title} screens`}>
          {p.gallery.map((g, k) => (
            <figure key={g.id} className="m-slide m-card">
              <div className="m-media" style={{ aspectRatio: "4/3" }}>
                <Slot src={g.src} label={g.ph} alt={g.cap} />
              </div>
              <figcaption className="m-row m-screen-cap">
                <span className="m-num">{String(k + 1).padStart(2, "0")}</span>
                <span className="m-row-sub m-row-sub--fill">{g.cap}</span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </Sec>

      <section className="m-sec">
        <Link to={`/work/${next.slug}`} className="m-card m-next">
          <div className="m-media">
            <img src={next.cover} alt="" loading="lazy" />
          </div>
          <div className="m-row-main m-row-main--4">
            <span className="m-label">Next project</span>
            <span className="m-h3">{next.title}</span>
          </div>
          <ArrowRight size={20} className="m-chev" />
        </Link>
      </section>

      <PageEnd aside="liked this one? let's do yours." secondary={{ label: "More work", to: "/work" }} />
    </main>
  );
}
