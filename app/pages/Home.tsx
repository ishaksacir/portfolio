import { useEffect, useRef, useState, type CSSProperties, type Dispatch, type SetStateAction } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaretLeft, CaretRight, ChartBar, ChatCircle, Heart, Repeat, SealCheck } from "@phosphor-icons/react";
import CardSwap, { Card, type CardSwapHandle } from "../components/CardSwap";
import { Footer } from "../components/Footer";
import { Glass } from "../components/Glass";
import { Highlight } from "../components/TechText";
import { GlassButton, TrafficLights } from "../components/ui";
import { TOOLS } from "../content/about";
import { BIO, HERO_CODE } from "../content/home";
import { THREADS } from "../content/journal";
import { PROJECTS } from "../content/projects";
import { prefersReducedMotion, useTitle, useTypewriter } from "../hooks";
import "../styles/home.css";

const TORN_BOTTOM =
  "M0,40 L0,14 L0,14.9 L22,9.6 L38,14.2 L59,9.1 L88,16.3 L107,12.0 L134,17.2 L146,15.0 L161,17.4 L175,15.8 L195,10.5 L207,21.1 L238,9.7 L258,21.4 L272,13.9 L294,17.4 L310,10.4 L342,14.2 L357,15.7 L374,10.2 L401,12.9 L419,9.1 L449,11.3 L479,14.6 L494,16.4 L513,18.6 L537,9.9 L552,14.3 L564,8.7 L583,17.5 L607,21.4 L624,14.1 L645,14.1 L674,14.3 L693,11.7 L709,18.4 L722,11.8 L748,20.0 L780,21.0 L809,18.5 L833,15.8 L843,12.5 L861,11.0 L880,17.6 L906,11.7 L937,8.1 L955,16.2 L975,9.3 L1007,14.4 L1036,16.2 L1056,9.8 L1083,20.5 L1099,8.3 L1113,17.9 L1138,17.2 L1167,11.2 L1195,10.4 L1206,9.1 L1217,15.5 L1245,19.8 L1258,14.9 L1269,11.9 L1290,8.9 L1308,11.2 L1324,19.1 L1337,10.3 L1347,16.7 L1359,13.6 L1372,14.7 L1391,8.1 L1418,14.3 L1440,14 L1440,40 Z";
const TORN_TOP =
  "M0,0 L1440,0 L1440,26 L1440,27.3 L1412,22.4 L1383,30.9 L1362,25.2 L1352,30.1 L1336,27.7 L1326,26.2 L1304,25.3 L1291,19.8 L1260,25.4 L1249,31.2 L1232,30.3 L1221,18.3 L1207,29.3 L1190,26.7 L1161,28.2 L1136,28.7 L1107,18.4 L1094,22.4 L1080,24.9 L1056,28.6 L1035,24.2 L1018,27.3 L1002,24.6 L978,29.0 L951,31.0 L930,29.8 L916,18.1 L901,31.5 L871,25.6 L842,28.9 L824,24.1 L810,21.3 L793,28.7 L766,18.1 L755,26.1 L742,26.8 L727,22.9 L715,21.5 L702,18.5 L685,19.7 L675,30.8 L645,27.2 L620,18.0 L599,21.3 L587,20.2 L575,27.1 L561,30.3 L543,20.9 L530,28.2 L503,25.2 L485,24.5 L463,30.8 L433,29.2 L404,26.5 L374,30.1 L360,23.9 L339,22.1 L309,21.5 L290,18.3 L262,20.7 L245,28.4 L231,22.0 L208,31.6 L184,32.0 L171,30.3 L150,22.2 L126,27.7 L94,24.4 L81,29.7 L50,24.8 L31,27.7 L16,21.5 L0,18.7 L0,26 Z";

export default function Home() {
  useTitle("Ishak Sacirbey — designer & developer");
  return (
    <>
      <main>
        <Hero />
        <AboutPreview />
        <WorkPreview />
        <BlogPreview />
      </main>
      <Footer note="scrolled all the way down? respect." secondary={{ label: "About me →", to: "/about" }} />
    </>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────── */

/** Types HERO_CODE out, pauses, clears, and starts over. */
function useLoopingCode() {
  const [typed, setTyped] = useState(() => (prefersReducedMotion() ? HERO_CODE.length : 0));
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (i >= HERO_CODE.length) {
        t = setTimeout(() => {
          i = 0;
          setTyped(0);
          t = setTimeout(tick, 400);
        }, 2600);
        return;
      }
      const ch = HERO_CODE[i++];
      setTyped(i);
      t = setTimeout(tick, ch === "\n" ? 180 : 28 + Math.random() * 50);
    };
    t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);
  const lines = HERO_CODE.slice(0, typed).split("\n");
  const current = lines.pop() ?? "";
  return { lines, current };
}

const pad2 = (n: number) => String(n).padStart(2, "0");

function Hero() {
  const { lines, current } = useLoopingCode();
  return (
    <section className="hero ruled">
      <svg className="torn torn--bottom" aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path fill="var(--bg-primary)" d={TORN_BOTTOM} />
      </svg>
      <div className="hero__inner">
        <div className="hero__editor-wrap">
          <span className="hand hero__hi">hi, my name is ↘</span>
          <span className="tape-label tape-label--gold hero__tape-details">SWEATS THE DETAILS</span>

          <div className="editor">
            <div className="editor__bar">
              <TrafficLights />
              <div className="editor__tabs">
                <span className="editor__tab is-active">
                  <span className="editor__tab-dot" />
                  ishak.ts
                </span>
                <span className="editor__tab">about.md</span>
                <span className="editor__tab">work.json</span>
              </div>
              <span className="editor__path">~/portfolio</span>
            </div>
            <div className="editor__body">
              <div className="editor__code" aria-hidden="true">
                {lines.map((text, i) => (
                  <div key={i} className="editor__line">
                    <span className="editor__ln">{pad2(i + 1)}</span>
                    <span>{text || " "}</span>
                  </div>
                ))}
                <div className="editor__line">
                  <span className="editor__ln">{pad2(lines.length + 1)}</span>
                  <span className="editor__current">
                    {current}
                    <span className="editor__caret blink" />
                  </span>
                </div>
                <div style={{ flex: "1 1 auto" }} />
              </div>
              <div className="name-frame">
                <span className="name-frame__handle" style={{ left: -4, top: -4 }} />
                <span className="name-frame__handle" style={{ right: -4, top: -4 }} />
                <span className="name-frame__handle" style={{ left: -4, bottom: -4 }} />
                <span className="name-frame__handle" style={{ right: -4, bottom: -4 }} />
                <h1 className="hero__name">ISHAK SACIRBEY</h1>
                <span className="tape-label tape-label--blue hero__tape-makes">MAKES THINGS</span>
              </div>
            </div>
            <div className="editor__status">
              <span>⎇ main</span>
              <span className="editor__saved">
                <span />
                saved
              </span>
              <span style={{ flex: 1 }} />
              <span>
                Ln {lines.length + 1}, Col {current.length + 1}
              </span>
              <span>TypeScript</span>
              <span style={{ color: "var(--text-muted)" }}>designer + developer</span>
            </div>
          </div>

          <span className="hand hero__type-note">(it types itself, give it a sec)</span>
          <span className="hand hero__role">Product designer</span>
        </div>

        <div className="hero__open">
          <span />
          OPEN TO NEW WORK &amp; ODD PROBLEMS
        </div>

        <div className="hero__statement">
          <img
            className="breathe hero__mac"
            src="/images/macintosh.webp"
            alt=""
            style={{ "--r": "-8deg", "--dur": "5.5s" } as CSSProperties}
          />
          <h2 className="hero__headline">
            I design and build software that feels <Highlight text="handmade." letterSpacing={-0.025} />
          </h2>
          <div
            className="breathe hero__polaroid"
            style={{ "--r": "5deg", "--dur": "6.5s", "--delay": "-2.4s" } as CSSProperties}
          >
            <span className="hero__polaroid-tape" />
            <img src="/images/portrait-laptop-smooth.webp" alt="Ishak Sacirbey with a laptop" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── About preview ─────────────────────────────────────────────────── */

function AboutPreview() {
  const bioRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = bioRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const bio = useTypewriter(BIO, {
    enabled: inView,
    startDelay: 250,
    delay: (ch) => (ch === "." || ch === "," ? 220 : 14 + Math.random() * 30),
  });

  return (
    <section className="h-about">
      <img className="h-about__bg" src="/images/land-dusk.webp" alt="" aria-hidden="true" />
      <div className="h-about__veil" aria-hidden="true" />
      <div className="h-about__inner">
        <div className="h-about__photo-col">
          <div className="h-about__polaroid">
            <img src="/images/portrait-headshot-cut.webp" alt="Ishak Sacirbey" />
            <span className="hand h-about__caption">yep, that's me</span>
          </div>
        </div>
        <div className="h-about__text">
          <div className="h-kicker-row">
            <span className="kicker">01 — ABOUT</span>
            <span className="hand h-kicker-row__note">the short version ↘</span>
          </div>
          <h2 className="h-title">
            Designer, developer, <em>student.</em>
          </h2>
          <div ref={bioRef} className="h-about__bio">
            <span className="h-about__tag">
              &lt;about <span style={{ color: "var(--text-muted)" }}>lang=</span>"en"&gt;
            </span>
            <div className="typed h-about__bio-body">
              <p aria-hidden="true" className="typed__ghost">
                {BIO}
              </p>
              <p aria-label={BIO} className="typed__live">
                {bio}
                <span className="h-about__caret blink" />
              </p>
            </div>
            <span className="h-about__tag">&lt;/about&gt;</span>
          </div>
          <div className="h-tools">
            <span className="hand h-tools__note">tools I work in</span>
            <ul className="h-tools__row">
              {TOOLS.map((t) => (
                <li key={t.name} className="h-tools__tile" title={t.name}>
                  <img src={t.src} alt={t.name} width={22} height={22} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
          <div style={{ paddingTop: 6 }}>
            <GlassButton to="/about" dot="amber">
              More about me →
            </GlassButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Work preview: React Bits card stack + synced project details ──── */

function WorkPreview() {
  const [sel, setSel] = useState(0);
  const swap = useRef<CardSwapHandle>(null);
  const navigate = useNavigate();
  const n = PROJECTS.length;
  const cur = PROJECTS[sel];
  const kind = cur.kind.split(" · ")[0];

  return (
    <section className="h-work">
      <div className="h-work__inner">
        <div className="h-head">
          <div className="h-head__titles">
            <div className="h-kicker-row">
              <span className="kicker">02 — WORK</span>
              <span className="hand h-kicker-row__note">flip through ↘</span>
            </div>
            <div className="h-head__title-row">
              <img
                className="breathe h-head__icon"
                src="/images/folder-code.webp"
                alt=""
                style={{ "--r": "-6deg", "--dur": "6.5s", "--delay": "-2s" } as CSSProperties}
              />
              <h2 className="h-title">
                Selected <em>work.</em>
              </h2>
            </div>
          </div>
          <GlassButton to="/work">All projects →</GlassButton>
        </div>

        <div className="h-work__stage">
          {/* Details follow whichever card is in front: drag, click or the arrows (no autoplay). */}
          <div className="h-work__info">
            <div className="h-work__count" aria-hidden="true">
              <b>{cur.no}</b>
              <span className="h-work__track">
                {PROJECTS.map((p, i) => (
                  <i key={p.slug} className={i === sel ? "is-on" : undefined} />
                ))}
              </span>
              <span>{pad2(n)}</span>
            </div>
            <div key={cur.slug} className="h-work__text" aria-live="polite">
              <div className="h-work__meta">
                <span className="h-work__kind">{kind}</span>
                <span>{cur.year}</span>
                <span>{cur.domain}</span>
              </div>
              <h3 className="h-work__name">{cur.title}</h3>
              <p className="h-work__hook">{cur.hook}</p>
              <div className="h-work__built">
                <span>Built with</span>
                <ul className="h-work__chips">
                  {cur.chips.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="h-work__actions">
              <GlassButton to={`/work/${cur.slug}`}>Open case →</GlassButton>
              <div className="h-work__nav">
                <Glass
                  as="button"
                  type="button"
                  className="h-work__arrow"
                  aria-label="Previous project"
                  onClick={() => swap.current?.prev()}
                >
                  <CaretLeft size={16} />
                </Glass>
                <Glass
                  as="button"
                  type="button"
                  className="h-work__arrow"
                  aria-label="Next project"
                  onClick={() => swap.current?.next()}
                >
                  <CaretRight size={16} />
                </Glass>
              </div>
            </div>
            <span className="hand h-work__hint">drag the cards, or use the arrows →</span>
          </div>

          <div className="h-work__deck">
            <CardSwap
              ref={swap}
              theme="light"
              width={680}
              height={400}
              cardDistance={64}
              verticalDistance={46}
              depth={90}
              skewAmount={3}
              autoplay={false}
              cardRadius={14}
              parallax={0.3}
              dim={0.4}
              onChange={setSel}
              onCardClick={(i) => {
                if (i === sel) navigate(`/work/${PROJECTS[i].slug}`);
              }}
              aria-label="Selected work — drag the front card or use the arrow keys"
            >
              {PROJECTS.map((p) => (
                <Card key={p.slug} className="h-work__card">
                  <div className="h-work__card-bar">
                    <TrafficLights size={9} />
                    <span className="h-work__card-url">{p.domain}</span>
                  </div>
                  <div className="h-work__card-cover">
                    <img src={p.cover} alt={`${p.title} — cover`} draggable={false} />
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Blog preview: thread feed ─────────────────────────────────────── */

type Flags = Record<string, boolean>;

function BlogPreview() {
  const [open, setOpen] = useState<Flags>({});
  const [liked, setLiked] = useState<Flags>({});
  const [rt, setRt] = useState<Flags>({});
  const flip = (set: Dispatch<SetStateAction<Flags>>, slug: string) => () => set((s) => ({ ...s, [slug]: !s[slug] }));

  return (
    <section className="h-blog ruled">
      <svg className="torn torn--top" aria-hidden="true" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path fill="var(--bg-primary)" d={TORN_TOP} />
      </svg>
      <div className="h-blog__inner">
        <div className="h-head h-head--narrow">
          <div className="h-head__titles">
            <div className="h-kicker-row">
              <span className="kicker">03 — BLOG</span>
              <span className="hand h-kicker-row__note">notes to future me ↘</span>
            </div>
            <div className="h-head__title-row">
              <img
                className="breathe h-head__icon"
                src="/images/notes-icon.webp"
                alt=""
                style={{ "--r": "5deg", "--dur": "6s", "--delay": "-3.5s" } as CSSProperties}
              />
              <h2 className="h-title">
                Latest <em>notes.</em>
              </h2>
            </div>
          </div>
          <GlassButton to="/journal">All posts →</GlassButton>
        </div>

        <div className="feed">
          <div className="feed__head">
            <div className="feed__head-text">
              <span className="feed__head-title">Latest threads</span>
              <span className="feed__head-sub">@ishak.dev · essays, one post at a time</span>
            </div>
            <Link to="/journal" className="feed__follow">
              Follow
            </Link>
          </div>
          {THREADS.map((p) => {
            const o = !!open[p.slug],
              lk = !!liked[p.slug],
              r = !!rt[p.slug];
            const short = p.date.split(" ").slice(0, 2).reverse().join(" ");
            return (
              <article key={p.slug} className="tweet">
                <div className="tweet__main">
                  <div className="tweet__avatar-col">
                    <img className="tweet__avatar" src="/images/portrait-headshot.webp" alt="Ishak Sacirbey" />
                    {o && <span className="tweet__line" />}
                  </div>
                  <div className="tweet__content">
                    <div className="tweet__who">
                      <b>Ishak Sacirbey</b>
                      <SealCheck size={16} weight="fill" color="var(--accent)" />
                      <span>@ishak.dev · {short}</span>
                    </div>
                    <p className="tweet__text">
                      {p.tw} <span style={{ color: "var(--accent)" }}>#{p.hash}</span>
                    </p>
                    <Link to="/journal" className="tweet__card">
                      <span className="tweet__card-meta">ishak.dev/blog · {p.read} read</span>
                      <span className="tweet__card-title">{p.title}</span>
                      <span className="tweet__card-ex">{p.ex}</span>
                    </Link>
                    <div className="tweet__acts">
                      <button
                        type="button"
                        className="act act--reply"
                        style={{ paddingLeft: 0 }}
                        onClick={flip(setOpen, p.slug)}
                        aria-expanded={o}
                      >
                        <ChatCircle size={17} />
                        {p.replies}
                      </button>
                      <button
                        type="button"
                        className="act act--rt"
                        style={{ color: r ? "var(--green)" : undefined }}
                        onClick={flip(setRt, p.slug)}
                        aria-pressed={r}
                      >
                        <Repeat size={17} />
                        {p.rts + (r ? 1 : 0)}
                      </button>
                      <button
                        type="button"
                        className="act act--like"
                        style={{ color: lk ? "var(--red)" : undefined }}
                        onClick={flip(setLiked, p.slug)}
                        aria-pressed={lk}
                      >
                        <Heart size={17} weight={lk ? "fill" : "regular"} />
                        {p.likes + (lk ? 1 : 0)}
                      </button>
                      <span className="act" style={{ cursor: "default" }}>
                        <ChartBar size={17} />
                        {p.views}
                      </span>
                    </div>
                  </div>
                </div>
                {o &&
                  p.body.map((text, i) => (
                    <div key={i} className="reply">
                      <div className="reply__avatar-col">
                        <img src="/images/portrait-headshot.webp" alt="" />
                        <span style={{ background: i < p.body.length - 1 ? "var(--border)" : "transparent" }} />
                      </div>
                      <div className="reply__content">
                        <span className="reply__who">
                          <b>Ishak Sacirbey</b> @ishak.dev · {i + 2}/{p.body.length + 1}
                        </span>
                        <p className="tweet__text">{text}</p>
                      </div>
                    </div>
                  ))}
                <button type="button" className="tweet__toggle" onClick={flip(setOpen, p.slug)}>
                  {o ? "Hide thread" : `Show this thread · ${p.body.length + 1} posts`}
                </button>
              </article>
            );
          })}
          <Link to="/journal" className="feed__more">
            Show more posts
          </Link>
        </div>
      </div>
    </section>
  );
}
