import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const MOBILE_QUERY = "(max-width: 767.98px)";
const subscribeMobile = (onChange: () => void) => {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

/** True below 768px, where each route renders its composition from app/mobile/. */
export function useIsMobile() {
  return useSyncExternalStore(subscribeMobile, () => window.matchMedia(MOBILE_QUERY).matches);
}

/** Current time, re-rendered every second. */
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

/** "Wed 7 Oct 14:09" */
export function formatClock(d: Date) {
  const day = d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }).replace(",", "");
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return `${day} ${time}`;
}

/** Per-character delay used by most of the self-typing intros. */
const proseDelay = (ch: string) =>
  ch === " " ? 55 : ch === "," || ch === "." || ch === "—" ? 240 : 28 + Math.random() * 50;

interface TypeOptions {
  /** ms before the first character */
  startDelay?: number;
  /** ms to wait after typing `ch` */
  delay?: (ch: string) => number;
  /** typing only starts once this is true (e.g. scrolled into view) */
  enabled?: boolean;
}

/** Types `text` out one character at a time; returns the visible prefix. */
export function useTypewriter(
  text: string,
  { startDelay = 500, delay = proseDelay, enabled = true }: TypeOptions = {},
) {
  const [n, setN] = useState(0);
  // Read through refs so a new inline `delay` each render doesn't restart the typing.
  const opts = useRef({ startDelay, delay });
  opts.current = { startDelay, delay };
  useEffect(() => {
    setN(0);
    if (!enabled) return;
    if (prefersReducedMotion()) {
      setN(text.length);
      return;
    }
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const step = () => {
      if (i >= text.length) return;
      const ch = text[i++];
      setN(i);
      t = setTimeout(step, opts.current.delay(ch));
    };
    t = setTimeout(step, opts.current.startDelay);
    return () => clearTimeout(t);
  }, [text, enabled]);
  return text.slice(0, n);
}

export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
