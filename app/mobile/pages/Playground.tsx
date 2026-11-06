import { useState } from "react";
import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { Slot } from "../../components/ui";
import { EXPERIMENTS, PLAYGROUND_INTRO, STATUS_COLOR, STATUS_TINT, type Status } from "../../content/playground";
import { useTitle } from "../../hooks";
import { PageEnd, PageHeader } from "../ui";

const FILTERS: ("All" | Status)[] = ["All", "In progress", "Shelved", "Someday", "Abandoned"];

export default function Playground() {
  useTitle("Playground — Ishak Sacirbey");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);
  const shown = EXPERIMENTS.filter((e) => filter === "All" || e.status === filter);

  return (
    <main>
      <PageHeader>
        <div className="m-v16">
          <span className="m-label">Playground</span>
          <h1 className="m-h1">
            Unfinished <em>things.</em>
          </h1>
          <p className="m-lede">{PLAYGROUND_INTRO}</p>
          <div className="m-h-row m-terminal">
            <b>✕ build failed</b>
            <i>·</i>
            nothing here compiles yet
          </div>
        </div>
      </PageHeader>

      <section className="m-sec">
        <div className="m-scroller" style={{ marginBottom: 19 }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={f === filter}
              className={f === filter ? "m-chip is-on" : "m-chip"}
              onClick={() => {
                setFilter(f);
                setOpen(null);
              }}
            >
              {f}
              <small>{f === "All" ? EXPERIMENTS.length : EXPERIMENTS.filter((e) => e.status === f).length}</small>
            </button>
          ))}
        </div>

        <div className="m-v12">
          {shown.map((e) => {
            const isOpen = open === e.file;
            const Caret = isOpen ? CaretUp : CaretDown;
            return (
              <article key={e.file} className="m-card">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="m-exp-toggle"
                  onClick={() => setOpen(isOpen ? null : e.file)}
                >
                  <div className="m-v12">
                    <div className="m-h-row m-between">
                      <span className="m-meta m-exp-file">{e.file}</span>
                      <span className="m-meta">{e.date}</span>
                    </div>
                    <div className="m-v4">
                      <span className="m-h3">{e.title}</span>
                      <p className="m-small">{e.body}</p>
                    </div>
                    <div className="m-v8" style={{ marginTop: 4 }}>
                      <div className="m-bar">
                        <span style={{ width: `${e.pct}%`, background: STATUS_COLOR[e.status] }} />
                      </div>
                      <div className="m-h-row m-between">
                        <span
                          className="m-tag m-tag--plain"
                          style={{ background: STATUS_TINT[e.status], color: STATUS_COLOR[e.status] }}
                        >
                          {e.status.toUpperCase()} · {e.pct}%
                        </span>
                        <span className="m-h-row m-exp-more">
                          {isOpen ? "Less" : "Details"}
                          <Caret size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="m-exp-open">
                    <div className="m-media" style={{ aspectRatio: e.ratio }}>
                      <Slot src={e.src} label={e.ph} alt={e.title} />
                    </div>
                    <div className="m-row m-row--top">
                      <span className="m-kv">THE IDEA</span>
                      <span className="m-row-sub m-row-sub--fill">{e.idea}</span>
                    </div>
                    <div className="m-row m-row--top">
                      <span className="m-kv">STUCK ON</span>
                      <span className="m-row-sub m-row-sub--fill">{e.stuck}</span>
                    </div>
                    <div className="m-row m-row--top">
                      <span className="m-kv">NEXT STEP</span>
                      <span className="m-row-sub m-row-sub--fill m-exp-next">{e.next}</span>
                    </div>
                    <div className="m-row">
                      <span className="m-meta">{e.stack}</span>
                    </div>
                    <div className="m-exp-note">
                      <span className="m-hand">— {e.note}</span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <PageEnd aside="want to finish one together?" secondary={{ label: "Finished work", to: "/work" }} />
    </main>
  );
}
