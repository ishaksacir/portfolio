import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { CaretRight, Folder, HardDrives, type Icon } from "@phosphor-icons/react";
import { Glass } from "./Glass";

/* Small building blocks shared by several pages. Styles live in styles/components.css. */

type Dot = "amber" | "accent";

interface GlassButtonProps {
  children: ReactNode;
  dot?: Dot;
  icon?: Icon;
  to?: string;
  href?: string;
  download?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

/** Pill button with a white knob on the left — the site's one CTA style. */
export function GlassButton({ children, dot = "accent", icon: IconC, to, href, download, onClick, type = "button", className }: GlassButtonProps) {
  const knob = (
    <span className="gbtn__knob">{IconC ? <IconC size={15} color="var(--accent)" /> : <span className={`gbtn__dot gbtn__dot--${dot}`} />}</span>
  );
  const cls = `gbtn${className ? " " + className : ""}`;
  if (to) return <Glass as={Link} to={to} className={cls}>{knob}{children}</Glass>;
  if (href) return <Glass as="a" href={href} download={download} className={cls}>{knob}{children}</Glass>;
  return <Glass as="button" type={type} onClick={onClick} className={cls}>{knob}{children}</Glass>;
}

/** Scrolls to the footer socials — every "Contact" button on the site does this. */
export function ContactButton({ label = "Contact me" }: { label?: string }) {
  return (
    <GlassButton dot="amber" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" })}>
      {label}
    </GlassButton>
  );
}

export function TrafficLights({ size = 11, flat = false, onClose }: { size?: number; flat?: boolean; onClose?: () => void }) {
  const style = { width: size, height: size };
  const cls = flat ? "light light--flat" : "light";
  return (
    <div className="lights">
      {onClose ? (
        <button type="button" aria-label="Close" className={`${cls} light--red light--btn`} style={style} onClick={onClose} />
      ) : (
        <span className={`${cls} light--red`} style={style} />
      )}
      <span className={`${cls} light--amber`} style={style} />
      <span className={`${cls} light--green`} style={style} />
    </div>
  );
}

/** macOS-style window: glass title bar, body, optional glass footer. */
export function Win({ bar, foot, children, className, style }: { bar: ReactNode; foot?: ReactNode; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`win${className ? " " + className : ""}`} style={style}>
      <Glass className="win__bar">
        <TrafficLights />
        {bar}
      </Glass>
      {children}
      {foot && <Glass className="win__foot">{foot}</Glass>}
    </div>
  );
}

/** File-name pill shown in window title bars. */
export function FilePill({ icon: IconC, children }: { icon: Icon; children: ReactNode }) {
  return (
    <div className="file-pill">
      <IconC size={13} color="var(--accent)" />
      {children}
    </div>
  );
}

/** "01 — overview" kicker + pixel h2 + handwritten aside. */
export function SectionHead({ kicker, title, note }: { kicker: string; title: string; note?: ReactNode }) {
  return (
    <div className="section-head">
      <div className="section-head__titles">
        <span className="section-head__kicker">{kicker}</span>
        <h2 className="section-head__title">{title}</h2>
      </div>
      {note && <span className="hand section-head__note">{note}</span>}
    </div>
  );
}

/** Finder breadcrumb pill: Macintosh HD › Users › ishak › <folder>. */
export function FinderPath({ folder }: { folder: string }) {
  return (
    <div className="finder-path">
      <HardDrives size={14} color="var(--text-secondary)" />
      <span>Macintosh HD</span>
      <CaretRight size={10} color="var(--text-muted)" />
      <span>Users</span>
      <CaretRight size={10} color="var(--text-muted)" />
      <span>ishak</span>
      <CaretRight size={10} color="var(--text-muted)" />
      <span className="finder-path__current">
        <Folder size={14} weight="fill" color="#5BA4E6" />
        {folder}
      </span>
    </div>
  );
}

/** Text that types itself; a hidden copy reserves the final size so layout doesn't jump. */
export function TypedText({ full, typed, className, before }: { full: string; typed: string; className?: string; before?: ReactNode }) {
  return (
    <div className={`typed${className ? " " + className : ""}`}>
      <p aria-hidden="true" className="typed__ghost">
        {before}
        {full}
        <span className="typed__cursor-space" />
      </p>
      <p aria-label={full} className="typed__live">
        {before}
        {typed}
        <span className="cursor blink" />
      </p>
    </div>
  );
}

/** Image area. Shows the real image when `src` is set, otherwise a labelled placeholder. */
export function Slot({ src, label, alt, style }: { src?: string; label: string; alt?: string; style?: CSSProperties }) {
  if (src) return <img className="slot slot--img" src={src} alt={alt ?? label} style={style} loading="lazy" />;
  return (
    <div className="slot slot--empty" role="img" aria-label={`${label} (image coming soon)`} style={style}>
      <span>{label}</span>
    </div>
  );
}

/** Segmented control (Gallery / List, playground filters). */
export function Segmented<K extends string>({ items, value, onChange, label }: { items: { key: K; label: string; icon: Icon; count?: number }[]; value: K; onChange: (k: K) => void; label: string }) {
  return (
    <div role="tablist" aria-label={label} className="segmented">
      {items.map(({ key, label: l, icon: IconC, count }) => (
        <button key={key} type="button" role="tab" aria-selected={key === value} className={key === value ? "segmented__btn is-on" : "segmented__btn"} onClick={() => onChange(key)}>
          <IconC size={14} />
          {l}
          {count !== undefined && <span className="segmented__count">{count}</span>}
        </button>
      ))}
    </div>
  );
}

type Tone = "dark" | "green" | "blue" | "amber";

/** macOS notification banner: app icon, bold title, timestamp, one or two lines of body. Slides in on mount. */
export function Notification({ icon: IconC, tone = "dark", title, time = "now", children, delay, className }: { icon: Icon; tone?: Tone; title: string; time?: string; children: ReactNode; delay?: number; className?: string }) {
  return (
    <Glass className={`notify${className ? " " + className : ""}`} role="status" style={delay !== undefined ? ({ "--notify-delay": `${delay}ms` } as CSSProperties) : undefined}>
      <span className={`notify__icon notify__icon--${tone}`}><IconC size={19} weight={tone === "dark" ? "regular" : "fill"} /></span>
      <span className="notify__text">
        <span className="notify__head"><b>{title}</b><span>{time}</span></span>
        <span>{children}</span>
      </span>
    </Glass>
  );
}

export function PixelTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={`pixel-title${className ? " " + className : ""}`}>{children}</h1>;
}
