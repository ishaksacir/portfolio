import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaperPlaneTilt } from "@phosphor-icons/react";
import { Highlight } from "../components/TechText";
import { CONTACT_EMAIL, SOCIALS } from "../content/site";

/* Building blocks shared by the phone pages. Styles live in styles/mobile.css. */

const TORN_EDGE =
  "M0,40 L0,14 L38,9 L88,18 L134,11 L195,20 L258,9 L310,17 L374,10 L449,19 L513,9 L583,18 L645,11 L709,20 L780,9 L843,17 L906,10 L975,19 L1036,9 L1099,18 L1167,10 L1245,20 L1308,9 L1372,17 L1440,12 L1440,40 Z";

/** Ruled-paper page header ending in a torn edge. */
export function PageHeader({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <header className={`m-hdr${className ? " " + className : ""}`} style={style}>
      {children}
      <svg aria-hidden="true" className="m-edge" viewBox="0 0 1440 40" preserveAspectRatio="none">
        <path fill="var(--bg-primary)" d={TORN_EDGE} />
      </svg>
    </header>
  );
}

/** Every section: mono label, title, an optional "All →" link, then one component. */
export function Sec({
  label,
  title,
  all,
  children,
}: {
  label: string;
  title: ReactNode;
  all?: string;
  children: ReactNode;
}) {
  return (
    <section className="m-sec">
      <div className="m-sec-head">
        <div>
          <span className="m-label">{label}</span>
          <h2 className="m-h2">{title}</h2>
        </div>
        {all && (
          <Link to={all} className="m-link">
            All
            <ArrowRight size={14} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

const SLIDE_GAP = 12;
const GUTTER = 20;
const pad2 = (n: number) => String(n).padStart(2, "0");

/** Scroll-snap carousel with dots and an "01 / 03" counter. Each child needs the m-slide class. */
export function Carousel({ count, label, children }: { count: number; label: string; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const onScroll = () => {
    const el = track.current;
    const slide = el?.querySelector<HTMLElement>(".m-slide");
    if (!el || !slide) return;
    const next = Math.round(el.scrollLeft / (slide.offsetWidth + SLIDE_GAP));
    setIndex(Math.max(0, Math.min(count - 1, next)));
  };

  const goTo = (k: number) => {
    const el = track.current;
    const slide = el?.querySelectorAll<HTMLElement>(".m-slide")[k];
    if (el && slide) el.scrollTo({ left: slide.offsetLeft - GUTTER, behavior: "smooth" });
    setIndex(k);
  };

  return (
    <>
      <div ref={track} onScroll={onScroll} className="m-carousel" role="group" aria-label={label}>
        {children}
      </div>
      <div className="m-car-foot">
        <div className="m-dots">
          {Array.from({ length: count }, (_, k) => (
            <button
              key={k}
              type="button"
              aria-label={`Go to ${k + 1}`}
              aria-current={k === index ? "true" : undefined}
              className={k === index ? "m-dot is-on" : "m-dot"}
              onClick={() => goTo(k)}
            />
          ))}
        </div>
        <span className="m-meta">
          {pad2(index + 1)} / {pad2(count)}
        </span>
      </div>
    </>
  );
}

/** Taped photo. `--r` is the tilt, and the breathe animation rotates around it. */
export function Polaroid({
  src,
  alt,
  caption,
  width,
  tilt,
  fit,
  position,
  breathe,
}: {
  src: string;
  alt: string;
  caption: string;
  width: string;
  tilt: string;
  fit?: CSSProperties["objectFit"];
  position: string;
  breathe?: boolean;
}) {
  return (
    <div className="m-polaroid-wrap">
      <div className={breathe ? "m-polaroid m-breathe" : "m-polaroid"} style={{ width, "--r": tilt } as CSSProperties}>
        <span className="m-tape" />
        <div className="m-media" style={{ aspectRatio: "4/5" }}>
          <img src={src} alt={alt} style={{ objectFit: fit, objectPosition: position }} />
        </div>
        <span className="m-hand">{caption}</span>
      </div>
    </div>
  );
}

/** The contact block and footer that end every page. Only the aside and second button change. */
export function PageEnd({ aside, secondary }: { aside: string; secondary: { label: string; to: string } }) {
  return (
    <>
      <section className="m-cta" id="contact">
        <div className="m-v24">
          <span className="m-hand m-cta-aside">{aside}</span>
          <h2 className="m-h1">
            Let's make something <Highlight text="a little weird." specks={10} />
          </h2>
          <div className="m-v8">
            <a href={`mailto:${CONTACT_EMAIL}`} className="m-btn m-btn-primary">
              <PaperPlaneTilt size={17} />
              Contact me
            </a>
            <Link to={secondary.to} className="m-btn m-btn-secondary">
              {secondary.label}
              <ArrowRight size={17} />
            </Link>
          </div>
          <div className="m-socials">
            {SOCIALS.map(({ label, href, icon: IconC }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}>
                <IconC size={22} />
              </a>
            ))}
          </div>
        </div>
      </section>
      <footer className="m-foot">
        <span className="m-foot-name">ISHAK SACIRBEY</span>
        <span className="m-meta">© 2026 · SARAJEVO, BA</span>
        <span className="m-hand m-hand--sm">made by hand, pixel by pixel</span>
      </footer>
    </>
  );
}
