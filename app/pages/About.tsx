import { useEffect, useState, type ComponentProps, type CSSProperties, type MouseEvent, type ReactNode } from "react";
import {
  ArrowRight,
  BatteryHigh,
  Books,
  Bug,
  CaretLeft,
  CaretRight,
  Clock,
  DownloadSimple,
  FileMd,
  Files,
  FileTs,
  GitBranch,
  Heart,
  House,
  MagnifyingGlass,
  NotePencil,
  Pause,
  Play,
  PuzzlePiece,
  PushPin,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  SpeakerHigh,
  WifiHigh,
  X,
} from "@phosphor-icons/react";
import Dock, { type DockItemData, type DockMenuItem } from "../components/Dock";
import { Footer } from "../components/Footer";
import { Glass } from "../components/Glass";
import { ContactButton, GlassButton, PixelTitle, SectionHead, Slot, TypedText } from "../components/ui";
import {
  ABOUT_INTRO,
  CALENDARS,
  CODE_FILES,
  DESKTOP_ICONS,
  DOCK,
  DOING,
  EDUCATION,
  EXPERIENCE,
  MENU,
  NOW,
  PLAYLIST,
  PRINCIPLES,
  PROCESS,
  ROLES,
  TOOLS,
  TRACKS,
  type DesktopApp,
} from "../content/about";
import { CV_URL } from "../content/site";
import { formatClock, useNow, useTitle, useTypewriter } from "../hooks";
import "../styles/about.css";

/** Placeholder notes from the design ("TODO: fill in") — visible while developing, hidden in production. */
const SHOW_TODOS = import.meta.env.DEV;

export default function About() {
  useTitle("About — Ishak Sacirbey");
  const intro = useTypewriter(ABOUT_INTRO, {
    delay: (ch) => (ch === " " ? 60 : ch === "&" || ch === "." ? 260 : 32 + Math.random() * 55),
  });

  return (
    <>
      <main>
        <div
          className="scenic-header scenic-header--soft"
          style={{ "--scene": "url('/images/land-lake.webp')" } as CSSProperties}
        >
          <section className="a-top">
            <div className="a-top__main">
              <PixelTitle>ABOUT ME</PixelTitle>
              <TypedText className="a-top__intro" full={ABOUT_INTRO} typed={intro} />
              <div className="a-roles">
                {ROLES.map((r) => (
                  <span key={r.label} className="frost-pill a-role">
                    <span style={{ background: r.color }} />
                    {r.label}
                  </span>
                ))}
              </div>
            </div>

            <div className="a-portrait-col">
              <div className="a-portrait">
                <span className="a-portrait__tape" />
                <div className="a-portrait__photo">
                  <img src="/images/portrait-headshot-cut.webp" alt="Ishak Sacirbey" />
                </div>
                <span className="hand a-portrait__name">Ishak Sacirbey</span>
                <div className="a-stamp" aria-hidden="true">
                  <span>
                    SARAJEVO
                    <br />
                    26·IX·26
                  </span>
                </div>
              </div>
            </div>

            <Glass className="a-hello">
              <span className="hand a-hello__hi">
                hi, I'm Ishak Sacirbey <span style={{ color: "var(--accent)" }}>↘</span>
              </span>
              <p className="a-hello__text">
                Studying Data Science &amp; AI in Sarajevo. Open to freelance work and internships.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <ContactButton label="Contact" />
                <GlassButton href={CV_URL} download icon={DownloadSimple}>
                  Download CV
                </GlassButton>
              </div>
            </Glass>
          </section>
        </div>

        <section className="a-cards" aria-label="Overview">
          <div className="card">
            <div className="card__label">
              <span className="label">WHAT I DO</span>
            </div>
            <ul className="a-doing">
              {DOING.map(({ icon: IconC, t, d }) => (
                <li key={t}>
                  <span
                    className="icon-tile"
                    style={{
                      width: 42,
                      height: 42,
                      boxShadow: "inset 0 0 0 1px var(--border),0 1px 2px rgba(20,25,30,.05)",
                    }}
                  >
                    <IconC size={20} />
                  </span>
                  <div>
                    <span className="a-item-t">{t}</span>
                    <span className="a-item-d">{d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div className="card__label">
              <span className="label">A BIT MORE PERSONAL</span>
            </div>
            <div className="a-personal">
              <p>
                Off the clock: skiing and taking photos. Summers, I've spent 5+ years as a rafting guide on the Una.{" "}
                <span className="hand a-personal__aside">(nobody's fallen in… lately)</span>
              </p>
              <div className="a-personal__photo">
                <span className="tape tape--gold" />
                <div style={{ aspectRatio: "4/3", background: "#DDE0DF" }}>
                  <Slot
                    src="/images/una-rafting.webp"
                    label="Rafting on the Una"
                    style={{ objectPosition: "50% 72%" }}
                  />
                </div>
                <span className="hand a-personal__caption">random</span>
              </div>
            </div>
          </div>
        </section>

        <section className="a-desktop-section">
          <SectionHead
            kicker="~/desktop — how I work, what I've done, what's next"
            title="MY DESKTOP"
            note="(it's a real-ish Mac. click stuff.)"
          />
          <Desktop />
        </section>

        <section className="a-edu">
          <div className="card a-edu__timeline-card">
            <div className="card__label">
              <span className="label">EDUCATION TIMELINE</span>
            </div>
            <ol className="a-timeline">
              {EDUCATION.map((e) => (
                <li key={e.t}>
                  <span className="a-timeline__dot" />
                  <span className="a-timeline__y">{e.y}</span>
                  <div>
                    <span className="a-item-t">{e.t}</span>
                    <span className="a-item-d" style={{ lineHeight: 1.55 }}>
                      {e.d}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="card a-edu__tools-card">
            <div className="card__label">
              <span className="label">TOOLS I USE</span>
            </div>
            <ul className="a-tools">
              {TOOLS.map((t) => (
                <li key={t.name}>
                  <span className="a-tools__tile">
                    <img src={t.src} alt="" width={36} height={36} loading="lazy" />
                  </span>
                  <span>{t.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer note="still reading? nice." secondary={{ label: "See the work →", to: "/work" }} />
    </>
  );
}

/* ─── The "real-ish Mac" desktop ────────────────────────────────────── */

interface WinState {
  open: Partial<Record<DesktopApp, boolean>>;
  /** Focus order; the last key is the front window. */
  order: DesktopApp[];
}

const DAY_HEAD = ["M", "T", "W", "T", "F", "S", "S"];

function Desktop() {
  const now = useNow();
  const [win, setWin] = useState<WinState>({ open: { work: true }, order: ["work"] });
  const [note, setNote] = useState(0);
  const [pr, setPr] = useState(0);
  const [prRun, setPrRun] = useState(0);

  // Principles auto-advance; bumping `prRun` restarts the 7s timer after a manual pick.
  useEffect(() => {
    const t = setInterval(() => setPr((p) => (p + 1) % PRINCIPLES.length), 7000);
    return () => clearInterval(t);
  }, [prRun]);

  const top = win.order[win.order.length - 1];
  const openWin = (k: DesktopApp) =>
    setWin((w) => ({ open: { ...w.open, [k]: true }, order: [...w.order.filter((x) => x !== k), k] }));
  const closeWin = (k: DesktopApp) =>
    setWin((w) => ({ open: { ...w.open, [k]: false }, order: w.order.filter((x) => x !== k) }));
  const goPr = (i: number) => {
    setPr(i);
    setPrRun((n) => n + 1);
  };
  const pickNote = (i: number) => setNote((i + PROCESS.length) % PROCESS.length);
  /** Dock items for the React Bits dock: click opens (it hops by itself), right click / long press for the menu. */
  const dockItems: DockItemData[] = DOCK.flatMap((d): DockItemData[] => {
    const open = d.opens ? !!win.open[d.opens] : false;
    let menu: DockMenuItem[] | undefined;
    if (d.key === "finder") {
      menu = [
        ...DESKTOP_ICONS.map((i) => ({ label: `Open ${i.label}`, onClick: () => openWin(i.key) })),
        { separator: true },
        {
          label: "Close All Windows",
          disabled: win.order.length === 0,
          onClick: () => setWin({ open: {}, order: [] }),
        },
      ];
    } else if (d.opens) {
      const k = d.opens;
      menu = [
        { label: open ? "Show" : "Open", onClick: () => openWin(k) },
        { separator: true },
        { label: "Quit", shortcut: "⌘Q", disabled: !open, onClick: () => closeWin(k) },
      ];
    } else if (d.key === "trash") {
      menu = [{ label: "Empty Trash", disabled: true }];
    }
    const item: DockItemData = {
      label: d.t,
      icon: <img src={d.src} alt="" draggable={false} />,
      active: d.running || open,
      onClick: d.opens ? () => openWin(d.opens!) : undefined,
      menu,
    };
    return d.sep ? [{ separator: true }, item] : [item];
  });

  /** Shared window chrome state: open/closed, front/back, stacking. */
  const frame = (k: DesktopApp) => {
    const on = !!win.open[k];
    const active = on && top === k;
    return {
      active,
      props: {
        className: `mac-win${on ? " is-open" : ""}${active ? " is-active" : ""}`,
        style: { zIndex: on ? 10 + win.order.indexOf(k) : 1 },
        onMouseDown: () => {
          if (top !== k) openWin(k);
        },
        inert: !on,
      },
      lights: (
        <Lights
          active={active}
          onClose={(e) => {
            e.stopPropagation();
            closeWin(k);
          }}
        />
      ),
    };
  };

  const y = now.getFullYear(),
    mo = now.getMonth(),
    today = now.getDate();
  const lead = (new Date(y, mo, 1).getDay() + 6) % 7;
  const days = new Date(y, mo + 1, 0).getDate();
  const cells = [...Array<null>(lead).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const calMonth = now.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const exp = frame("exp"),
    cal = frame("now"),
    work = frame("work"),
    music = frame("music"),
    code = frame("code");
  const expOn = !!win.open.exp;
  const step = PROCESS[note];
  const principle = PRINCIPLES[pr];

  return (
    <div className="mac">
      <div aria-hidden="true" className="mac__ratio" />
      <div className="mac__screen">
        <div className="mac__menubar">
          <span className="mac__logo">
            <span />
          </span>
          <span className="mac__app">
            {DESKTOP_ICONS.find((d) => d.key === top)?.app ?? DOCK.find((d) => d.opens === top)?.t ?? "Finder"}
          </span>
          {MENU.map((m) => (
            <span key={m} className="mac__menu">
              {m}
            </span>
          ))}
          <span style={{ flex: 1 }} />
          <div className="mac__status">
            <BatteryHigh size={16} />
            <WifiHigh size={14} />
            <MagnifyingGlass size={13} />
            <span>{formatClock(now)}</span>
          </div>
        </div>

        <div className="mac__desk">
          <div className="mac__hint" style={{ opacity: win.order.length ? 0 : 1 }}>
            <span className="hand">psst — click the icons to open things</span>
          </div>

          {/* Principles widget — sits under windows, like a macOS widget */}
          <div className="mac-widget">
            <div className="mac-widget__head">
              <PushPin size={13} color="var(--accent-dark)" />
              <span>PRINCIPLES</span>
              <span style={{ flex: 1 }} />
              <b>{principle.n}/04</b>
            </div>
            <div className="mac-widget__body" aria-live="polite">
              <span className="hand">{principle.t}</span>
              <span>{principle.d}</span>
            </div>
            <div className="mac-widget__foot">
              {PRINCIPLES.map((p, i) => (
                <button
                  key={p.n}
                  type="button"
                  aria-label={`Principle ${p.n}`}
                  className={i === pr ? "mac-widget__dot is-on" : "mac-widget__dot"}
                  onClick={() => goPr(i)}
                />
              ))}
              <span style={{ flex: 1 }} />
              <button
                type="button"
                aria-label="Next principle"
                className="mac-widget__next"
                onClick={() => goPr((pr + 1) % PRINCIPLES.length)}
              >
                <ArrowRight size={12} />
              </button>
            </div>
          </div>

          <div className="mac-icons">
            {DESKTOP_ICONS.map((d) => (
              <button
                key={d.key}
                type="button"
                className={top === d.key ? "mac-icon is-selected" : "mac-icon"}
                onClick={() => openWin(d.key)}
              >
                <span className="mac-icon__tile">
                  <img src={d.src} alt="" draggable={false} />
                </span>
                <span className="mac-icon__label">{d.label}</span>
              </button>
            ))}
          </div>

          <div className="mac-windows">
            {/* Experience → Terminal */}
            <section aria-label="Experience" {...exp.props} className={`${exp.props.className} mac-term`}>
              <div className="mac-term__bar">
                {exp.lights}
                <span className="mac-term__title">ishak — experience.log — zsh — 80×24</span>
                <span style={{ width: 50, flex: "none" }} />
              </div>
              <div className="mac-term__body">
                <Prompt>cat experience.log</Prompt>
                {EXPERIENCE.map(({ app, icon: IconC, y: years, t, d, tags, todo }, i) => (
                  <div
                    key={app}
                    className="mac-term__entry"
                    style={{
                      opacity: expOn ? 1 : 0,
                      transform: expOn ? "none" : "translateX(-8px)",
                      transitionDelay: expOn ? `${0.12 + i * 0.12}s` : "0s",
                    }}
                  >
                    <div className="mac-term__meta">
                      <span style={{ color: "#E2B867" }}>[{todo && !SHOW_TODOS ? "now" : years}]</span>
                      <span style={{ color: "#8FB0E8", letterSpacing: ".08em" }}>{app}</span>
                      {todo && SHOW_TODOS && <span style={{ color: "#E2B867", opacity: 0.8 }}># TODO: dates</span>}
                    </div>
                    <div className="mac-term__title-line">
                      <IconC size={14} color="#A9B1BA" />
                      {t}
                    </div>
                    <div className="mac-term__d">{d}</div>
                    <div className="mac-term__tags">{tags.map((tg) => "#" + tg).join("  ")}</div>
                  </div>
                ))}
                <div style={{ color: "#6F7788", paddingTop: 8 }}># {EXPERIENCE.length} entries · more loading</div>
                <Prompt>
                  <span className="mac-term__caret blink" />
                </Prompt>
              </div>
            </section>

            {/* Right now → Calendar */}
            <section aria-label="Right now" {...cal.props} className={`${cal.props.className} mac-cal`}>
              <div className="mac-win__toolbar" style={{ background: "rgba(240,242,245,.95)" }}>
                {cal.lights}
                <span className="mac-win__title">{calMonth}</span>
                <span style={{ flex: 1 }} />
                <div className="mac-cal__seg" aria-hidden="true">
                  <span className="is-on">Day</span>
                  <span>Week</span>
                  <span>Month</span>
                </div>
              </div>
              <div className="mac-win__split">
                <aside className="mac-cal__side">
                  <div className="mac-cal__mini">
                    <span className="mac-cal__mini-title">{calMonth}</span>
                    <div className="mac-cal__grid">
                      {DAY_HEAD.map((h, i) => (
                        <span key={"h" + i} className="mac-cal__head">
                          {h}
                        </span>
                      ))}
                      {cells.map((n, i) => (
                        <span key={i} className={n === today ? "is-today" : undefined}>
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mac-cal__legend">
                    <span className="mac-cal__caption">CALENDARS</span>
                    {Object.values(CALENDARS).map((c) => (
                      <span key={c.label} className="mac-cal__cal">
                        <span style={{ background: c.color }} />
                        {c.label}
                      </span>
                    ))}
                  </div>
                </aside>
                <div className="mac-cal__main">
                  <div className="mac-cal__day">
                    <span>{now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
                    <span>TODAY</span>
                  </div>
                  <div>
                    {NOW.map(({ time, cal: c, icon: IconC, t, d, todo }) => (
                      <div key={t} className="mac-cal__row">
                        <span className="mac-cal__time">{time}</span>
                        <div
                          className="mac-cal__event"
                          style={{ background: CALENDARS[c].tint, opacity: todo && SHOW_TODOS ? 0.6 : 1 }}
                        >
                          <IconC size={15} color={CALENDARS[c].color} style={{ flex: "none", marginTop: 1 }} />
                          <div className="mac-cal__event-text">
                            <span>{t}</span>
                            <span>{d}</span>
                            {todo && SHOW_TODOS && (
                              <span className="todo-badge" style={{ marginTop: 2 }}>
                                TODO: fill in
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="mac-cal__updated">
                    Last updated {now.toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                  </span>
                </div>
              </div>
            </section>

            {/* How I work → Notes */}
            <section aria-label="How I work" {...work.props} className={`${work.props.className} mac-notes`}>
              <div className="mac-win__toolbar" style={{ background: "rgba(242,240,235,.95)" }}>
                {work.lights}
                <span className="mac-win__title">How I work</span>
                <span style={{ flex: 1 }} />
                <NotePencil size={17} color="var(--text-muted)" />
              </div>
              <div className="mac-win__split">
                <aside className="mac-notes__side">
                  <span className="mac-notes__caption">{PROCESS.length} NOTES</span>
                  {PROCESS.map((p, i) => (
                    <button
                      key={p.n}
                      type="button"
                      aria-pressed={i === note}
                      className={i === note ? "mac-notes__row is-on" : "mac-notes__row"}
                      onClick={() => pickNote(i)}
                    >
                      <span>{p.t}</span>
                      <span>
                        {p.n} · {p.d}
                      </span>
                    </button>
                  ))}
                </aside>
                <div className="mac-notes__main">
                  <span className="mac-notes__step">
                    Step {step.n} of 0{PROCESS.length}
                  </span>
                  <div className="mac-notes__title">
                    <step.icon size={22} color={step.color} />
                    {step.t}
                  </div>
                  <p>{step.d}</p>
                  <span className="mac-notes__cmd">$ {step.cmd}</span>
                  <span style={{ flex: 1 }} />
                  <div className="mac-notes__nav">
                    <button type="button" onClick={() => pickNote(note - 1)}>
                      ← Prev
                    </button>
                    <button type="button" onClick={() => pickNote(note + 1)}>
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Dock → Spotify */}
            <SpotifyWin win={music.props} lights={music.lights} />

            {/* Dock → VS Code */}
            <CodeWin win={code.props} lights={code.lights} />
          </div>

          <Dock
            className="mac-dock"
            items={dockItems}
            theme="light"
            tiles={false}
            baseItemSize={40}
            magnification={62}
            distance={140}
            panelHeight={58}
            gap={6}
            accentColor="var(--accent)"
            style={{ "--dock-separator": "rgba(20, 25, 30, 0.22)" } as CSSProperties}
          />
        </div>
      </div>
    </div>
  );
}

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Spotify-style player. No audio — the progress bar just ticks along while "playing". */
function SpotifyWin({ win, lights }: { win: ComponentProps<"section">; lights: ReactNode }) {
  const [cur, setCur] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const track = TRACKS[cur];

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setPos((p) => p + 1), 1000);
    return () => clearInterval(t);
  }, [playing]);
  // Roll over to the next track when this one ends.
  useEffect(() => {
    if (pos >= track.len) {
      setCur((c) => (c + 1) % TRACKS.length);
      setPos(0);
    }
  }, [pos, track.len]);

  const pick = (i: number) => {
    if (i === cur) {
      setPlaying((p) => !p);
      return;
    }
    setCur((i + TRACKS.length) % TRACKS.length);
    setPos(0);
    setPlaying(true);
  };
  const back = () => (pos > 3 ? setPos(0) : pick(cur - 1));
  const seek = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(Math.round(((e.clientX - r.left) / r.width) * track.len));
  };
  const total = TRACKS.reduce((n, t) => n + t.len, 0);

  return (
    <section aria-label="Spotify" {...win} className={`${win.className} mac-spot`}>
      <div className="mac-spot__bar">
        {lights}
        <div className="mac-spot__nav" aria-hidden="true">
          <span>
            <CaretLeft size={14} />
          </span>
          <span>
            <CaretRight size={14} />
          </span>
        </div>
        <div className="mac-spot__search" aria-hidden="true">
          <MagnifyingGlass size={14} />
          What do you want to play?
        </div>
      </div>
      <div className="mac-win__split">
        <aside className="mac-spot__side">
          <div className="mac-spot__panel">
            <span className="is-on">
              <House size={18} weight="fill" />
              Home
            </span>
            <span>
              <MagnifyingGlass size={18} />
              Search
            </span>
          </div>
          <div className="mac-spot__panel mac-spot__lib">
            <span>
              <Books size={18} />
              Your Library
            </span>
            <div className="mac-spot__item is-on">
              <span
                className="mac-spot__art"
                style={{ background: `linear-gradient(135deg, ${PLAYLIST.color}, #1E2A44)` }}
              />
              <div>
                <span>{PLAYLIST.title}</span>
                <span>Playlist · Ishak</span>
              </div>
            </div>
            <div className="mac-spot__item">
              <span className="mac-spot__art mac-spot__art--liked">
                <Heart size={14} weight="fill" />
              </span>
              <div>
                <span>Liked Songs</span>
                <span>Playlist · {Object.values(liked).filter(Boolean).length} songs</span>
              </div>
            </div>
          </div>
        </aside>
        <div className="mac-spot__main" style={{ "--pl": PLAYLIST.color } as CSSProperties}>
          <header className="mac-spot__hero">
            <span className="mac-spot__cover">
              <Play size={34} weight="fill" />
            </span>
            <div>
              <span>Playlist</span>
              <h3>{PLAYLIST.title}</h3>
              <span>{PLAYLIST.d}</span>
              <span>
                <b>Ishak</b> · {TRACKS.length} songs, {Math.round(total / 60)} min
              </span>
            </div>
          </header>
          <div className="mac-spot__actions">
            <button
              type="button"
              className="mac-spot__big"
              aria-label={playing ? "Pause" : "Play"}
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={20} weight="fill" /> : <Play size={20} weight="fill" />}
            </button>
            <Shuffle size={22} />
          </div>
          <ol className="mac-spot__list">
            <li className="mac-spot__head">
              <span>#</span>
              <span>Title</span>
              <span>Album</span>
              <Clock size={14} />
            </li>
            {TRACKS.map((tr, i) => (
              <li
                key={tr.t}
                className={i === cur ? "is-on" : undefined}
                onDoubleClick={() => {
                  if (i === cur) setPlaying(true);
                  else pick(i);
                }}
              >
                <button
                  type="button"
                  className="mac-spot__n"
                  aria-label={i === cur && playing ? `Pause ${tr.t}` : `Play ${tr.t}`}
                  onClick={() => pick(i)}
                >
                  <span>
                    {i === cur && playing ? (
                      <span className="mac-spot__eq" aria-hidden="true">
                        <i />
                        <i />
                        <i />
                      </span>
                    ) : (
                      i + 1
                    )}
                  </span>
                  {i === cur && playing ? <Pause size={13} weight="fill" /> : <Play size={13} weight="fill" />}
                </button>
                <div className="mac-spot__title">
                  <span className="mac-spot__art" style={{ background: tr.color }} />
                  <div>
                    <span>{tr.t}</span>
                    <span>{tr.a}</span>
                  </div>
                </div>
                <span className="mac-spot__album">{tr.album}</span>
                <span className="mac-spot__len">{mmss(tr.len)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <footer className="mac-spot__player">
        <div className="mac-spot__now">
          <span className="mac-spot__art" style={{ background: track.color }} />
          <div>
            <span>{track.t}</span>
            <span>{track.a}</span>
          </div>
          <button
            type="button"
            aria-label="Like"
            aria-pressed={!!liked[cur]}
            className={liked[cur] ? "mac-spot__like is-on" : "mac-spot__like"}
            onClick={() => setLiked((l) => ({ ...l, [cur]: !l[cur] }))}
          >
            <Heart size={16} weight={liked[cur] ? "fill" : "regular"} />
          </button>
        </div>
        <div className="mac-spot__ctrl">
          <div className="mac-spot__btns">
            <Shuffle size={16} />
            <button type="button" aria-label="Previous" onClick={back}>
              <SkipBack size={17} weight="fill" />
            </button>
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              className="mac-spot__play"
              onClick={() => setPlaying((p) => !p)}
            >
              {playing ? <Pause size={15} weight="fill" /> : <Play size={15} weight="fill" />}
            </button>
            <button type="button" aria-label="Next" onClick={() => pick(cur + 1)}>
              <SkipForward size={17} weight="fill" />
            </button>
            <Repeat size={16} />
          </div>
          <div className="mac-spot__seek">
            <span>{mmss(pos)}</span>
            <div className="mac-spot__track" onClick={seek}>
              <span style={{ width: `${(pos / track.len) * 100}%` }} />
            </div>
            <span>{mmss(track.len)}</span>
          </div>
        </div>
        <div className="mac-spot__vol" aria-hidden="true">
          <SpeakerHigh size={16} />
          <div className="mac-spot__track">
            <span style={{ width: "70%" }} />
          </div>
        </div>
      </footer>
    </section>
  );
}

type Tok = [cls: string, text: string];

/** Just enough highlighting for the two files in CODE_FILES: strings, comments, keywords, keys, headings. */
function highlight(line: string, lang: "ts" | "md"): Tok[] {
  if (lang === "md") {
    if (line.startsWith("#")) return [["h", line]];
    if (line.startsWith("- "))
      return [
        ["p", "- "],
        ["", line.slice(2)],
      ];
    return [["", line]];
  }
  const out: Tok[] = [];
  const re = /(\/\/.*$)|("[^"]*")|\b(const|export|default)\b|(\w+)(?=:)|(\w+)/g;
  let last = 0;
  for (const m of line.matchAll(re)) {
    if (m.index > last) out.push(["p", line.slice(last, m.index)]);
    out.push([m[1] ? "c" : m[2] ? "s" : m[3] ? "k" : m[4] ? "key" : "v", m[0]]);
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(["p", line.slice(last)]);
  return out;
}

function FileIcon({ lang }: { lang: "ts" | "md" }) {
  return lang === "ts" ? <FileTs size={15} color="#3178c6" /> : <FileMd size={15} color="#5ea2e6" />;
}

/** VS Code-style editor showing a couple of "about me" files; click a file in the explorer or a tab to switch. */
function CodeWin({ win, lights }: { win: ComponentProps<"section">; lights: ReactNode }) {
  const [cur, setCur] = useState(0);
  const file = CODE_FILES[cur];
  const lines = file.code.split("\n");

  return (
    <section aria-label="Visual Studio Code" {...win} className={`${win.className} mac-code`}>
      <div className="mac-code__bar">
        {lights}
        <span className="mac-code__title">{file.name} — portfolio</span>
        <span style={{ width: 50, flex: "none" }} />
      </div>
      <div className="mac-win__split">
        <nav className="mac-code__activity" aria-hidden="true">
          <Files size={22} className="is-on" />
          <MagnifyingGlass size={22} />
          <GitBranch size={22} />
          <Bug size={22} />
          <PuzzlePiece size={22} />
        </nav>
        <aside className="mac-code__side">
          <span className="mac-code__caption">EXPLORER</span>
          <span className="mac-code__folder">⌄ PORTFOLIO</span>
          {CODE_FILES.map((f, i) => (
            <button
              key={f.name}
              type="button"
              aria-pressed={i === cur}
              className={i === cur ? "mac-code__file is-on" : "mac-code__file"}
              onClick={() => setCur(i)}
            >
              <FileIcon lang={f.lang} />
              {f.name}
            </button>
          ))}
        </aside>
        <div className="mac-code__main">
          <div className="mac-code__tabs" role="tablist">
            {CODE_FILES.map((f, i) => (
              <button
                key={f.name}
                type="button"
                role="tab"
                aria-selected={i === cur}
                className={i === cur ? "mac-code__tab is-on" : "mac-code__tab"}
                onClick={() => setCur(i)}
              >
                <FileIcon lang={f.lang} />
                {f.name}
                <X size={12} className="mac-code__tab-x" />
              </button>
            ))}
          </div>
          <pre className="mac-code__editor" key={file.name}>
            {lines.map((l, i) => (
              <div key={i} className="mac-code__line">
                <span className="mac-code__ln">{i + 1}</span>
                <code>
                  {highlight(l, file.lang).map(([c, t], j) =>
                    c ? (
                      <span key={j} className={`tk-${c}`}>
                        {t}
                      </span>
                    ) : (
                      t
                    ),
                  )}
                  {i === lines.length - 1 && <span className="mac-code__caret blink" />}
                </code>
              </div>
            ))}
          </pre>
        </div>
      </div>
      <footer className="mac-code__status">
        <span>
          <GitBranch size={12} /> main
        </span>
        <span>0 ⚠ 0 ✕</span>
        <span style={{ flex: 1 }} />
        <span>
          Ln {lines.length}, Col {lines[lines.length - 1].length + 1}
        </span>
        <span>UTF-8</span>
        <span>{file.lang === "ts" ? "TypeScript" : "Markdown"}</span>
      </footer>
    </section>
  );
}

/** Window traffic lights: coloured on the front window, grey otherwise. Only red is interactive. */
function Lights({ active, onClose }: { active: boolean; onClose: (e: MouseEvent) => void }) {
  return (
    <div className={active ? "mac-lights is-active" : "mac-lights"}>
      <button type="button" aria-label="Close window" onClick={onClose} />
      <span />
      <span />
    </div>
  );
}

function Prompt({ children }: { children: ReactNode }) {
  return (
    <div style={{ color: "#D5D9E0" }}>
      <span style={{ color: "var(--green)" }}>~/ishak</span> <span style={{ color: "#7FA6DE" }}>$</span> {children}
    </div>
  );
}
