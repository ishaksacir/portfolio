import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  BookmarkSimple,
  ChatCircle,
  Clock,
  Code,
  Coffee,
  Export,
  GearSix,
  Heart,
  NotePencil,
  PenNib,
  Repeat,
  SealCheck,
  Stack,
} from "@phosphor-icons/react";
import { Footer } from "../components/Footer";
import { Glass } from "../components/Glass";
import { GlassButton, Notification, Segmented, Slot, TrafficLights, TypedText } from "../components/ui";
import { JOURNAL_INTRO, POSTS, TAG_STYLE, TODOS, WRITING_ABOUT, type Category, type Post } from "../content/journal";
import { CONTACT_EMAIL } from "../content/site";
import { useTitle, useTypewriter } from "../hooks";
import "../styles/journal.css";

type Sort = "Newest" | "Oldest" | "Quickest read";
type View = "cards" | "list";

const SORTS: Sort[] = ["Newest", "Oldest", "Quickest read"];

const CATEGORIES: { key: "All" | Category; icon: typeof Stack }[] = [
  { key: "All", icon: Stack },
  { key: "Development", icon: Code },
  { key: "Design", icon: PenNib },
  { key: "Life", icon: Coffee },
  { key: "Process", icon: GearSix },
];

const LATEST = [...POSTS].sort((a, b) => b.d.localeCompare(a.d))[0];

const sorter: Record<Sort, (a: Post, b: Post) => number> = {
  Newest: (a, b) => b.d.localeCompare(a.d),
  Oldest: (a, b) => a.d.localeCompare(b.d),
  "Quickest read": (a, b) => a.mins - b.mins,
};

function Check({ done }: { done: boolean }) {
  return done ? (
    <span className="check check--on">
      <span />
    </span>
  ) : (
    <span className="check" />
  );
}

export default function Journal() {
  useTitle("Journal — Ishak Sacirbey");
  const intro = useTypewriter(JOURNAL_INTRO);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("Newest");
  const [view, setView] = useState<View>("cards");
  const [cat, setCat] = useState<"All" | Category>("All");
  const [todos, setTodos] = useState([true, false, false, false]);
  const search = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the search box, like the badge promises.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const needle = q.trim().toLowerCase();
  const shown = POSTS.filter(
    (p) =>
      (cat === "All" || p.cat === cat) && (!needle || `${p.title} ${p.ex} ${p.sub}`.toLowerCase().includes(needle)),
  ).sort(sorter[sort]);
  const countLabel = `${shown.length} ${shown.length === 1 ? "note" : "notes"}`;

  return (
    <>
      <main className="ruled">
        <div className="desk">
          {/* ── left column ── */}
          <aside className="desk__side">
            <div className="desk__sort">
              <span className="desk__label">SORT BY</span>
              <div className="desk__sort-list" role="radiogroup" aria-label="Sort notes">
                {SORTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="radio"
                    aria-checked={s === sort}
                    className={s === sort ? "is-on" : undefined}
                    onClick={() => setSort(s)}
                  >
                    <span />
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <Glass className="desk__glass-card" style={{ padding: 6, gap: 8 }}>
              <label htmlFor="journal-search" className="desk__label" style={{ padding: "8px 6px 0" }}>
                SEARCH
              </label>
              <div className="desk__input">
                <span className="desk__search-ring" />
                <input
                  id="journal-search"
                  ref={search}
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search notes…"
                  type="search"
                />
                <kbd>⌘K</kbd>
              </div>
            </Glass>

            <div className="paper-note" style={{ transform: "rotate(-2deg)", marginTop: 14 }}>
              <span
                className="paper-note__tape"
                style={{ left: -12, top: -16, transform: "rotate(-4deg)", background: "#7E9AB9" }}
              >
                WRITING ABOUT
              </span>
              <ul className="paper-note__list">
                {WRITING_ABOUT.map((w) => (
                  <li key={w.label}>
                    <Check done={w.done} />
                    {w.label}
                  </li>
                ))}
              </ul>
            </div>

            <span className="hand desk__aside">
              ↑ mostly tech,
              <br />
              sometimes life.
            </span>

            <Newsletter />
          </aside>

          {/* ── centre column ── */}
          <section className="desk__main" aria-label="Notes">
            <div className="win">
              <Glass className="win__bar">
                <TrafficLights />
                <div className="journal-file">
                  <span />
                  journal.md
                </div>
                <span className="journal-path">~/notes</span>
              </Glass>
              <div className="journal-head">
                <h1 className="journal-head__title">JOURNAL</h1>
                <div className="journal-head__row">
                  <TypedText className="journal-head__intro" full={JOURNAL_INTRO} typed={intro} />
                  <span className="hand journal-head__note">
                    new notes
                    <br />
                    every month-ish ↓
                  </span>
                </div>
                <Notification icon={NotePencil} tone="amber" title="New note" time={LATEST.date} delay={1200}>
                  “{LATEST.title}” — {LATEST.mins} min read, filed under {LATEST.cat.toLowerCase()}.
                </Notification>
              </div>
              <Glass className="win__foot journal-foot">
                <span>{countLabel}</span>
                <span className="journal-foot__sort">sorted: {sort.toLowerCase()}</span>
                <div className="view-toggle" role="radiogroup" aria-label="Layout">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={view === "cards"}
                    title="Cards"
                    className={view === "cards" ? "is-on" : undefined}
                    onClick={() => setView("cards")}
                  >
                    <span className="view-toggle__cards" />
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={view === "list"}
                    title="List"
                    className={view === "list" ? "is-on" : undefined}
                    onClick={() => setView("list")}
                  >
                    <span className="view-toggle__list" />
                  </button>
                </div>
              </Glass>
            </div>

            <div className="segmented-row">
              <Segmented
                label="Filter notes by category"
                value={cat}
                onChange={setCat}
                items={CATEGORIES.map(({ key, icon }) => ({
                  key,
                  icon,
                  label: key,
                  count: key === "All" ? POSTS.length : POSTS.filter((p) => p.cat === key).length,
                }))}
              />
            </div>

            {shown.length === 0 ? (
              <div className="hand journal-empty">nothing here yet — try another search or category</div>
            ) : view === "cards" ? (
              <div className="post-feed">
                {shown.map((p) => (
                  <PostCard key={p.d} post={p} />
                ))}
              </div>
            ) : (
              <div className="post-list">
                {shown.map((p) => (
                  <div key={p.d} className="post-list__row">
                    <span className="post-list__date">{p.date}</span>
                    <span className="post-list__title">{p.title}</span>
                    <Tag post={p} />
                    <span className="post-list__read">{p.mins} min read</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ── right column ── */}
          <aside className="desk__side desk__side--right">
            <div className="paper-note paper-note--wide" style={{ transform: "rotate(1.5deg)", marginTop: 18 }}>
              <span
                className="paper-note__tape"
                style={{ left: 76, top: -12, transform: "rotate(-3deg)", background: "#DFD4B7" }}
              >
                LATEST NOTE
              </span>
              <span className="hand" style={{ fontSize: 22, color: "var(--text-secondary)" }}>
                Currently working on:
              </span>
              <ul className="paper-note__list paper-note__list--todo">
                {TODOS.map((label, i) => (
                  <li key={label}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={todos[i]}
                      onClick={() => setTodos((t) => t.map((v, k) => (k === i ? !v : v)))}
                    >
                      <Check done={todos[i]} />
                      <span style={{ textDecoration: todos[i] ? "line-through" : "none" }}>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="win quote-win">
              <Glass className="win__bar" style={{ height: 32, padding: "0 12px" }}>
                <TrafficLights size={9} />
              </Glass>
              <figure className="quote-win__body">
                <blockquote className="hand">
                  <span>“</span>Writing is just debugging for thoughts.<span>”</span>
                </blockquote>
                <figcaption>— me, 2am</figcaption>
              </figure>
            </div>

            <div className="buddy">
              <span className="buddy__tape" />
              <div className="buddy__frame">
                <div className="buddy__photo">
                  <Slot label="the desk buddy" />
                </div>
                <span className="hand buddy__caption">the desk buddy</span>
              </div>
              <span className="hand buddy__note">
                co-pilot in
                <br />
                everything ↖
              </span>
            </div>
          </aside>
        </div>
      </main>
      <Footer note="rather talk than read?" secondary={{ label: "About me →", to: "/about" }} />
    </>
  );
}

function Tag({ post }: { post: Post }) {
  const [bg, fg] = TAG_STYLE[post.cat];
  return (
    <span className="post-tag" style={{ background: bg, color: fg }}>
      {post.cat.toUpperCase()}
    </span>
  );
}

function PostCard({ post: p }: { post: Post }) {
  return (
    <article className="post">
      <img className="post__avatar" src="/images/portrait-headshot.webp" alt="" />
      <div className="post__body">
        <div className="post__head">
          <b>Ishak Sacirbey</b>
          <SealCheck size={17} weight="fill" color="var(--accent)" />
          <span className="post__handle">@ishak · {p.date}</span>
          <span style={{ flex: 1 }} />
          <Tag post={p} />
          <span className="post__more" aria-hidden="true">
            ···
          </span>
        </div>
        <h2 className="post__title">{p.title}</h2>
        <p className="post__ex">
          {p.ex} <span style={{ color: "var(--accent)" }}>#{p.sub.toUpperCase()}</span>
        </p>
        <div className="post__cover">
          <Slot src={p.cover} label="Cover" />
        </div>
        <div className="post__acts" aria-hidden="true">
          <span className="post__act post__act--blue">
            <ChatCircle size={17} />
          </span>
          <span className="post__act post__act--green">
            <Repeat size={17} />
          </span>
          <span className="post__act post__act--red">
            <Heart size={17} />
          </span>
          <span className="post__act post__act--blue">
            <Clock size={17} />
            {p.mins} min read
          </span>
          <span style={{ display: "flex", gap: 14 }}>
            <span className="post__act post__act--blue">
              <BookmarkSimple size={17} />
            </span>
            <span className="post__act post__act--blue">
              <Export size={17} />
            </span>
          </span>
        </div>
      </div>
    </article>
  );
}

/** No mailing-list backend yet: subscribing opens a pre-filled email instead of faking a success state. */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/.+@.+[.].+/.test(email)) return;
    const body = encodeURIComponent(`Please add ${email} to the list for new notes.`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Subscribe to new notes")}&body=${body}`;
    setSent(true);
  };
  return (
    <Glass className="desk__glass-card" style={{ padding: 16, gap: 12 }}>
      <span className="desk__label">NEW NOTES BY EMAIL</span>
      {sent ? (
        <div className="desk__sent">
          <span />
          Almost there — just send that email.
        </div>
      ) : (
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <input
            className="desk__email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.com"
            aria-label="Email address"
          />
          <GlassButton type="submit" dot="amber" className="gbtn--center">
            Subscribe
          </GlassButton>
        </form>
      )}
    </Glass>
  );
}
