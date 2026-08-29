import { Kicker } from "../../components/common/Kicker";
import type { Project } from "../../data/projects";
import dalgaCase1 from "../../assets/dalga-case-page-1.png";
import dalgaCase2 from "../../assets/dalga-case-page-2.png";
import dalgaCase3 from "../../assets/dalga-case-page-3.png";

// Only DALGA has real case-study art and copy today, so every issue's reader reuses these
// pages, the spec sheet and the tags below — swapping in just the opened project's title,
// type and year. Replace this once the other issues get their own write-ups.
const CASE_STUDY_PAGES = [dalgaCase1, dalgaCase2, dalgaCase3];

interface ComicCasePageProps {
  project: Project;
  onBack: () => void;
}

export function ComicCasePage({ project, onBack }: ComicCasePageProps) {
  return (
    <main className="project-reader">
      <div className="project-reader-bar">
        <button onClick={onBack}>← BACK TO THE SHOP</button>
        <b>
          {project.title} · NO.{project.number}
        </b>
        <span>
          <button>−</button>
          <strong>PAGE 01 / 03</strong>
          <button>＋</button>
        </span>
      </div>

      <div className="project-reader-layout">
        <nav className="project-thumbs" aria-label="Case study pages">
          {CASE_STUDY_PAGES.map((src, i) => (
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById(`case-page-${i + 1}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              key={src}
            >
              <img src={src} alt="" />
              <b>0{i + 1}</b>
            </button>
          ))}
        </nav>

        <article className="project-pages">
          {CASE_STUDY_PAGES.map((src, i) => (
            <figure id={`case-page-${i + 1}`} key={src}>
              <img
                src={src}
                alt={`${project.title} comic case study page ${i + 1}`}
              />
              <figcaption>PAGE 0{i + 1}</figcaption>
            </figure>
          ))}
        </article>

        <aside className="project-ledger">
          <Kicker>CLIENT DETAILS</Kicker>
          <dl>
            <div>
              <dt>FOR</dt>
              <dd>{project.title}</dd>
            </div>
            <div>
              <dt>TYPE</dt>
              <dd>{project.category}</dd>
            </div>
            <div>
              <dt>YEAR</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>STATUS</dt>
              <dd>LIVE</dd>
            </div>
          </dl>
          <Kicker>SPEC SHEET</Kicker>
          <dl>
            <div>
              <dt>ROLE</dt>
              <dd>DESIGN + BUILD</dd>
            </div>
            <div>
              <dt>STACK</dt>
              <dd>REACT / SUPABASE</dd>
            </div>
            <div>
              <dt>PAGES</dt>
              <dd>03</dd>
            </div>
            <div>
              <dt>MODE</dt>
              <dd>RESPONSIVE</dd>
            </div>
          </dl>
          <Kicker>TAGS</Kicker>
          <div className="project-ledger-tags">
            <span>DESIGN</span>
            <span>WEB</span>
            <span>SYSTEMS</span>
            <span>PRINT</span>
          </div>
        </aside>
      </div>

      <section className="project-closing">
        <div className="project-closing-rail" />
        <div className="project-closing-main">
          <div className="project-end">
            <b>END OF ISSUE {project.number}</b>
            <span>
              <button>VISIT LIVE SITE　▸</button>
              <button>NEXT ISSUE　▸</button>
            </span>
          </div>
          <div className="project-credits">
            <span>SCRIPT, ART & CODE: ISHAK · COLOURS: RISO</span>
            <span>3 PAGES · ISSUE {project.number}</span>
          </div>
        </div>
        <nav className="project-reader-nav">
          <div className="issue-pager">
            <button>‹ PREV</button>
            <b>ISSUE</b>
            <button>NEXT ›</button>
          </div>
          <button onClick={onBack}>BACK TO THE SHELF</button>
        </nav>
      </section>
    </main>
  );
}
