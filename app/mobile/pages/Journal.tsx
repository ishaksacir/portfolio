import { useState, type FormEvent } from "react";
import { Check, MagnifyingGlass, NoteBlank } from "@phosphor-icons/react";
import { Slot } from "../../components/ui";
import { JOURNAL_INTRO, POSTS, TAG_STYLE, type Category, type Post } from "../../content/journal";
import { CONTACT_EMAIL } from "../../content/site";
import { useTitle } from "../../hooks";
import { PageEnd, PageHeader } from "../ui";

const CATEGORIES: ("All" | Category)[] = ["All", "Development", "Design", "Life", "Process"];

const NEWEST_FIRST = [...POSTS].sort((a, b) => b.d.localeCompare(a.d));

function CategoryTag({ cat, short }: { cat: Category; short?: boolean }) {
  const [background, color] = TAG_STYLE[cat];
  return (
    <span className="m-tag m-tag--plain" style={{ background, color }}>
      {short && cat === "Development" ? "DEV" : cat.toUpperCase()}
    </span>
  );
}

function Featured({ post }: { post: Post }) {
  return (
    <article className="m-card m-featured">
      <div className="m-media" style={{ aspectRatio: "16/9" }}>
        <Slot src={post.cover} label={post.title} />
      </div>
      <div className="m-pad m-v8">
        <div className="m-h-row m-between">
          <CategoryTag cat={post.cat} />
          <span className="m-meta">LATEST</span>
        </div>
        <span className="m-h3 m-h3--lg">{post.title}</span>
        <p className="m-small">{post.ex}</p>
        <span className="m-meta" style={{ marginTop: 4 }}>
          {post.date.toUpperCase()} · {post.mins} MIN READ
        </span>
      </div>
    </article>
  );
}

/** Same as desktop: there's no mailing list yet, so subscribing opens an email to Ishak. */
function Subscribe() {
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
    <section className="m-sec">
      <div className="m-card m-pad m-v16">
        <div className="m-v4">
          <span className="m-label">Newsletter</span>
          <span className="m-h3">New notes by email</span>
          <p className="m-small">Every month-ish. No spam, just notes.</p>
        </div>
        {sent ? (
          <div className="m-subscribed">
            <span className="m-ico">
              <Check size={18} />
            </span>
            <span className="m-row-title">Subscribed. See you soon.</span>
          </div>
        ) : (
          <form className="m-v8" onSubmit={submit}>
            <input
              className="m-input"
              type="email"
              placeholder="you@email.com"
              aria-label="Email address"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="m-btn m-btn-primary">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default function Journal() {
  useTitle("Journal — Ishak Sacirbey");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const shown = NEWEST_FIRST.filter(
    (p) => (cat === "All" || p.cat === cat) && (!q || `${p.title} ${p.ex} ${p.sub}`.toLowerCase().includes(q)),
  );
  const [featured, ...rest] = shown;

  return (
    <main>
      <PageHeader>
        <div className="m-v16">
          <span className="m-label">Journal</span>
          <h1 className="m-h1">
            Notes to <em>future me.</em>
          </h1>
          <p className="m-lede">{JOURNAL_INTRO}</p>
          <span className="m-hand m-hand--sm">mostly tech, sometimes life.</span>
        </div>
      </PageHeader>

      <section className="m-sec">
        <div className="m-v16 m-journal-tools">
          <div className="m-search">
            <MagnifyingGlass size={17} />
            <input
              className="m-input"
              type="search"
              placeholder="Search notes"
              aria-label="Search notes"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="m-scroller">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={c === cat}
                className={c === cat ? "m-chip is-on" : "m-chip"}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {featured && <Featured post={featured} />}

        {rest.length > 0 && (
          <div className="m-card">
            {rest.map((p) => (
              <div key={p.d} className="m-row m-row--top m-row--roomy">
                <div className="m-row-main m-row-main--6">
                  <span className="m-meta">
                    {p.date.toUpperCase()} · {p.mins} MIN
                  </span>
                  <span className="m-row-title m-row-title--display">{p.title}</span>
                  <span className="m-row-sub">{p.ex}</span>
                </div>
                <CategoryTag cat={p.cat} short />
              </div>
            ))}
          </div>
        )}

        {!featured && (
          <div className="m-card m-pad m-v8 m-empty">
            <NoteBlank size={28} />
            <span className="m-row-title">Nothing here yet</span>
            <span className="m-row-sub">Try another folder or search.</span>
          </div>
        )}
      </section>

      <Subscribe />

      <PageEnd aside="rather talk than read?" secondary={{ label: "About me", to: "/about" }} />
    </main>
  );
}
