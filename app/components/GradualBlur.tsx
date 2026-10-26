import { useEffect, useMemo, useState } from "react";

/*
 * GradualBlur — React Bits, ported from the prototype's GradualBlur.jsx and
 * trimmed to how the site uses it: a stacked backdrop-blur fade fixed to the
 * bottom of the viewport that shows while scrolling and hides at page end.
 */

const smoothstep = (p: number) => p * p * (3 - 2 * p);

interface Props {
  height?: string;
  strength?: number;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
}

export function GradualBlur({ height = "6rem", strength = 2, divCount = 5, exponential = true, zIndex = 1100 }: Props) {
  const [scrolling, setScrolling] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      setScrolling(true);
      clearTimeout(t);
      t = setTimeout(() => setScrolling(false), 700);
    };
    const check = () => {
      const el = document.scrollingElement || document.documentElement;
      setAtEnd(window.innerHeight + window.scrollY >= el.scrollHeight - 24);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onScroll, { passive: true });
    window.addEventListener("touchmove", onScroll, { passive: true });
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("touchmove", onScroll);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const shown = scrolling && !atEnd;

  const layers = useMemo(() => {
    const inc = 100 / divCount;
    return Array.from({ length: divCount }, (_, k) => {
      const i = k + 1;
      const p = smoothstep(i / divCount);
      const blur = exponential ? Math.pow(2, p * 4) * 0.0625 * strength : 0.0625 * (p * divCount + 1) * strength;
      const p1 = Math.round((inc * i - inc) * 10) / 10,
        p2 = Math.round(inc * i * 10) / 10;
      const p3 = Math.round((inc * i + inc) * 10) / 10,
        p4 = Math.round((inc * i + inc * 2) * 10) / 10;
      let g = `transparent ${p1}%, black ${p2}%`;
      if (p3 <= 100) g += `, black ${p3}%`;
      if (p4 <= 100) g += `, transparent ${p4}%`;
      return { mask: `linear-gradient(to bottom, ${g})`, blur: `blur(${blur.toFixed(3)}rem)` };
    });
  }, [divCount, exponential, strength]);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", left: 0, right: 0, bottom: 0, height, zIndex, pointerEvents: "none" }}
    >
      {layers.map((l, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            maskImage: l.mask,
            WebkitMaskImage: l.mask,
            backdropFilter: l.blur,
            WebkitBackdropFilter: l.blur,
            opacity: shown ? 1 : 0,
            transition: shown ? "opacity .45s cubic-bezier(.2,.8,.2,1)" : "opacity .9s cubic-bezier(.4,0,.2,1)",
            willChange: "opacity",
          }}
        />
      ))}
    </div>
  );
}
