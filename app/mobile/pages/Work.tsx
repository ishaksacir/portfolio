import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { PROJECTS } from "../../content/projects";
import { useTitle } from "../../hooks";
import { PageEnd, PageHeader } from "../ui";

export default function Work() {
  useTitle("Work — Ishak Sacirbey");
  return (
    <main>
      <PageHeader>
        <div className="m-v16">
          <span className="m-label">Work</span>
          <h1 className="m-h1">
            Selected <em>work.</em>
          </h1>
          <p className="m-lede">
            Three projects I took from first sketch to live site — design, code and everything in between.
          </p>
          <span className="m-meta">{PROJECTS.length} PROJECTS · 2026</span>
        </div>
      </PageHeader>

      <section className="m-sec">
        <div className="m-v16">
          {PROJECTS.map((p) => (
            <Link key={p.slug} to={`/work/${p.slug}`} className="m-card" style={{ display: "block" }}>
              <div className="m-media" style={{ aspectRatio: "16/10" }}>
                <img src={p.cover} alt={p.title} loading="lazy" />
              </div>
              <div className="m-pad m-v12">
                <div className="m-h-row m-between">
                  <span className="m-meta">
                    PROJECT {p.no} · {p.year}
                  </span>
                  <span className="m-num" style={{ fontSize: 16 }}>
                    {p.no}
                  </span>
                </div>
                <div className="m-v4">
                  <span className="m-h3 m-h3--lg">{p.title}</span>
                  <span className="m-meta">{p.kind}</span>
                </div>
                <p className="m-small">{p.hook}</p>
                <div className="m-tags">
                  {p.chips.map((c) => (
                    <span key={c} className="m-tag">
                      {c}
                    </span>
                  ))}
                </div>
                <div
                  className="m-h-row m-between"
                  style={{ marginTop: 4, paddingTop: 12, borderTop: "1px solid var(--border)" }}
                >
                  <span className="m-link m-link--inline">
                    View project
                    <ArrowUpRight size={14} />
                  </span>
                  <span className="m-hand" style={{ fontSize: 19, color: "var(--text-muted)" }}>
                    {p.aside}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <PageEnd aside="seen enough? good sign." secondary={{ label: "About me", to: "/about" }} />
    </main>
  );
}
