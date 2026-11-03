import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from "react";
import { Archive, Hammer, MoonStars, Note, TerminalWindow, Trash } from "@phosphor-icons/react";
import { Footer } from "../components/Footer";
import { FinderPath, Notification, PixelTitle, Segmented, Slot, TypedText } from "../components/ui";
import {
  DROPS,
  EXPERIMENTS,
  PAPERS,
  PLAYGROUND_INTRO,
  STATUS_COLOR,
  TILTS,
  type Experiment,
  type Status,
} from "../content/playground";
import { prefersReducedMotion, useTitle, useTypewriter } from "../hooks";
import "../styles/playground.css";

type Filter = "All" | Status;
type Stage = "enter" | "front" | "back" | "leave";

const FILTERS: { key: Filter; icon: typeof Note }[] = [
  { key: "All", icon: Note },
  { key: "In progress", icon: Hammer },
  { key: "Shelved", icon: Archive },
  { key: "Someday", icon: MoonStars },
  { key: "Abandoned", icon: Trash },
];

const NOTE_TRANSFORM: Record<Stage, string> = {
  enter: "scale(.45) rotate(-6deg) rotateY(0deg)",
  front: "scale(1) rotate(0deg) rotateY(0deg)",
  back: "scale(1) rotate(0deg) rotateY(180deg)",
  leave: "scale(.5) rotate(4deg) rotateY(0deg)",
};

export default function Playground() {
  useTitle("Playground — Ishak Sacirbey");
  const intro = useTypewriter(PLAYGROUND_INTRO, { startDelay: 700 });
  const [filter, setFilter] = useState<Filter>("All");
  const [open, setOpen] = useState<number | null>(null);

  const shown = EXPERIMENTS.map((it, i) => ({ it, i })).filter(({ it }) => filter === "All" || it.status === filter);

  return (
    <>
      <main>
        <section
          className="scenic-header scenic-header--soft"
          style={{ "--scene": "url('/images/land-coast.webp')", "--scene-y": "40%" } as CSSProperties}
        >
          <div className="scenic-header__inner pg-header">
            <FinderPath folder="playground" />
            <PixelTitle>PLAYGROUND</PixelTitle>
            <TypedText
              className="pg-intro"
              full={PLAYGROUND_INTRO}
              typed={intro}
              before={
                <>
                  <span style={{ color: "var(--green)" }}>➜ </span>
                  <span style={{ color: "var(--accent-dark)" }}>unfinished </span>
                </>
              }
            />
            <div className="notify-row">
              <Notification icon={TerminalWindow} title="Build Failed">
                playground.cpp — 3 errors, 1 warning. Nothing here compiles yet.
              </Notification>
              <span className="hand notify-row__note">click a note to flip it ↓</span>
            </div>
            <div className="segmented-row" style={{ paddingTop: 6 }}>
              <Segmented
                label="Filter experiments"
                value={filter}
                onChange={setFilter}
                items={FILTERS.map(({ key, icon }) => ({
                  key,
                  icon,
                  label: key,
                  count: key === "All" ? EXPERIMENTS.length : EXPERIMENTS.filter((x) => x.status === key).length,
                }))}
              />
            </div>
          </div>
        </section>

        <div className="ruled" style={{ borderTop: "1px solid var(--border)" }}>
          <section className="pg-wall" aria-label="Experiments">
            {shown.map(({ it, i }) => (
              <StickyNote key={it.file} item={it} index={i} onOpen={() => setOpen(i)} />
            ))}
          </section>
        </div>
      </main>
      <Footer note="want to finish one together?" secondary={{ label: "Finished work →", to: "/work" }} />
      {open !== null && <NoteModal item={EXPERIMENTS[open]} index={open} onClosed={() => setOpen(null)} />}
    </>
  );
}

function StickyNote({ item, index, onOpen }: { item: Experiment; index: number; onOpen: () => void }) {
  const style = {
    "--tilt": TILTS[index % 8],
    marginTop: DROPS[index % 8],
  } as CSSProperties;
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };
  return (
    <div
      className="sticky"
      role="button"
      tabIndex={0}
      aria-label={`Open ${item.title}`}
      style={style}
      onClick={onOpen}
      onKeyDown={onKey}
    >
      <span className="sticky__tape" style={{ transform: `translateX(-50%) rotate(${index % 2 ? 3 : -4}deg)` }} />
      <div className="sticky__paper" style={{ background: PAPERS[index % PAPERS.length] }}>
        <div className="sticky__meta">
          <span>{item.file}</span>
          <span>{item.date}</span>
        </div>
        <div
          className="sticky__photo"
          style={{ aspectRatio: item.ratio, transform: `rotate(${((index % 3) - 1) * 1.2}deg)` }}
        >
          <Slot src={item.src} label={item.ph} />
        </div>
        <span className="hand sticky__title">{item.title}</span>
        <span className="sticky__body">{item.body}</span>
        <StatusRow item={item} />
        <span className="hand sticky__note">— {item.note}</span>
      </div>
    </div>
  );
}

function StatusRow({ item }: { item: Experiment }) {
  const c = STATUS_COLOR[item.status];
  return (
    <div className="status-row">
      <span className="status-row__stamp" style={{ borderColor: c, color: c }}>
        {item.status.toUpperCase()}
      </span>
      <span className="status-row__rule" />
      <span>{item.pct}% done</span>
    </div>
  );
}

/** The note zooms in, flips to its back, and can be flipped again; Esc or a click outside closes it. */
function NoteModal({ item, index, onClosed }: { item: Experiment; index: number; onClosed: () => void }) {
  const [stage, setStage] = useState<Stage>("enter");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const card = useRef<HTMLDivElement>(null);
  const paper = PAPERS[index % PAPERS.length];
  const c = STATUS_COLOR[item.status];

  const close = () => {
    clearTimeout(timer.current);
    setStage("leave");
    timer.current = setTimeout(onClosed, prefersReducedMotion() ? 0 : 380);
  };

  useEffect(() => {
    timer.current = setTimeout(() => {
      setStage("front");
      timer.current = setTimeout(() => setStage("back"), 520);
    }, 30);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    card.current?.focus();
    return () => {
      clearTimeout(timer.current);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const hidden = stage === "enter" || stage === "leave";
  const flip = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    setStage((s) => (s === "back" ? "front" : "back"));
  };

  return (
    <div
      className="note-modal"
      onClick={close}
      style={{
        background: `rgba(17,20,24,${hidden ? 0 : 0.55})`,
        backdropFilter: `blur(${hidden ? 0 : 6}px)`,
        WebkitBackdropFilter: `blur(${hidden ? 0 : 6}px)`,
      }}
    >
      <div
        ref={card}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        tabIndex={-1}
        className="note-modal__card"
        style={{ transform: NOTE_TRANSFORM[stage], opacity: hidden ? 0 : 1 }}
        onClick={flip}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            flip(e);
          }
        }}
      >
        <span className="note-modal__tape" />
        <div className="note-face note-face--front" style={{ background: paper }}>
          <div className="note-face__meta">
            <span>{item.file}</span>
            <span>{item.date}</span>
          </div>
          <div className="note-face__photo">
            <Slot src={item.src} label={item.ph} />
          </div>
          <span className="hand note-face__title">{item.title}</span>
          <span className="note-face__body">{item.body}</span>
          <span className="hand note-face__flip">flip me ↻</span>
        </div>
        <div className="note-face note-face--back" style={{ backgroundColor: paper }}>
          <div className="note-face__meta note-face__meta--back">
            <span className="status-row__stamp" style={{ borderColor: c, color: c }}>
              {item.status.toUpperCase()}
            </span>
            <span>{item.pct}% done</span>
          </div>
          <div className="note-face__section">
            <span>the idea</span>
            <span>{item.idea}</span>
          </div>
          <div className="note-face__section">
            <span>where it's stuck</span>
            <span>{item.stuck}</span>
          </div>
          <div className="note-face__section">
            <span>next step</span>
            <span>→ {item.next}</span>
          </div>
          <span style={{ flex: 1 }} />
          <div className="note-face__foot">
            <span className="note-face__stack">{item.stack}</span>
            <span className="note-face__sign">— {item.note}</span>
          </div>
        </div>
      </div>
      <span className="note-modal__hint" style={{ opacity: hidden ? 0 : 1 }}>
        click note to flip · click outside or esc to close
      </span>
    </div>
  );
}
