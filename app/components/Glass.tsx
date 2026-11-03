import { useCallback, type ComponentPropsWithoutRef, type CSSProperties, type ElementType } from "react";

/*
 * Liquid glass, after React Bits' <GlassSurface /> (SVG renderer).
 *
 * Chromium gets an SVG displacement filter as backdrop-filter: the edge of the
 * glass bends and colour-splits whatever is behind it, the centre stays calm.
 * Safari and Firefox can't use url() in backdrop-filter, so they get the
 * frosted look with a sheen (data-lg="fb"); see `.glass` in global.css.
 *
 * Unlike the original component this doesn't wrap children in a fixed-size
 * box — any element (header, link, button…) becomes glass at its own size,
 * and all filters share one hidden <svg>. The WebGL renderer is left out: it
 * only helps when the glass sits over a single <img>/<video>/<canvas>.
 */

/** GlassSurface defaults: strong bend and colour split. Used on small controls (buttons, pills, chips). */
const SMALL = { opacity: 0.93, distortionScale: -180, offsets: [0, 10, 20] };
/** Big surfaces (cards, windows, the navbar) bend only at the rim and keep the middle perfectly still,
 *  otherwise the photo behind turns into a rainbow under the text. */
const LARGE = { opacity: 1, distortionScale: -110, offsets: [0, 5, 10] };
/** Shorter side (px) above which an element counts as large. */
const LARGE_FROM = 72;

const O = {
  borderWidth: 0.07,
  brightness: 50,
  blur: 11,
  displace: 0.5,
  mixBlendMode: "difference",
};
const NS = "http://www.w3.org/2000/svg";

const SVG_OK = (() => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const webkit = /Safari/.test(ua) && !/Chrome/.test(ua);
  const ff = /Firefox/.test(ua);
  const probe = document.createElement("div");
  probe.style.backdropFilter = "url(#x)";
  return !webkit && !ff && probe.style.backdropFilter !== "";
})();

let defs: SVGDefsElement | null = null;
let count = 0;

function getDefs() {
  if (defs) return defs;
  const host = document.createElementNS(NS, "svg");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  defs = document.createElementNS(NS, "defs");
  host.appendChild(defs);
  document.body.appendChild(host);
  return defs;
}

function mk(tag: string, attrs: Record<string, string | number>, parent?: Element) {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, String(attrs[k]));
  parent?.appendChild(e);
  return e;
}

/** Red = horizontal bend, blue = vertical bend; a soft grey centre keeps the middle still. */
function displacementMap(w: number, h: number, r: number, id: string, opacity: number) {
  const edge = Math.min(w, h) * (O.borderWidth * 0.5);
  const s = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r${id}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="b${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="black"/><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#r${id})"/><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#b${id})" style="mix-blend-mode:${O.mixBlendMode}"/><rect x="${edge}" y="${edge}" width="${w - edge * 2}" height="${h - edge * 2}" rx="${r}" fill="hsl(0 0% ${O.brightness}% / ${opacity})" style="filter:blur(${O.blur}px)"/></svg>`;
  return "data:image/svg+xml," + encodeURIComponent(s);
}

function attach(el: HTMLElement) {
  if (!SVG_OK) {
    el.dataset.lg = "fb";
    return undefined;
  }
  const id = "lg" + ++count;
  const f = mk(
    "filter",
    { id, "color-interpolation-filters": "sRGB", x: "0%", y: "0%", width: "100%", height: "100%" },
    getDefs(),
  );
  const img = mk(
    "feImage",
    { x: 0, y: 0, width: "100%", height: "100%", preserveAspectRatio: "none", result: "map" },
    f,
  );
  // One displacement per colour channel, each bent a little more: that's the chromatic fringe.
  const channels: [string, string][] = [
    ["red", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"],
    ["green", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"],
    ["blue", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"],
  ];
  const disp = channels.map(([c, m]) => {
    const d = mk(
      "feDisplacementMap",
      { in: "SourceGraphic", in2: "map", result: "d" + c, xChannelSelector: "R", yChannelSelector: "G" },
      f,
    );
    mk("feColorMatrix", { in: "d" + c, type: "matrix", values: m, result: c }, f);
    return d;
  });
  mk("feBlend", { in: "red", in2: "green", mode: "screen", result: "rg" }, f);
  mk("feBlend", { in: "rg", in2: "blue", mode: "screen", result: "output" }, f);
  mk("feGaussianBlur", { in: "output", stdDeviation: O.displace }, f);

  let size = "";
  const update = () => {
    // Layout size, not getBoundingClientRect, so page zoom doesn't stretch the map.
    const w = el.offsetWidth,
      h = el.offsetHeight;
    if (!w || !h) return;
    const rad = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, h / 2, w / 2);
    const key = `${w}x${h}x${rad}`;
    if (key === size) return;
    size = key;
    const t = Math.min(w, h) > LARGE_FROM ? LARGE : SMALL;
    disp.forEach((d, i) => d.setAttribute("scale", String(t.distortionScale + t.offsets[i])));
    // Pixel size, not "100%": Chrome ignores a percentage-sized feImage inside backdrop-filter
    // and shifts the whole backdrop instead of bending only the rim.
    img.setAttribute("width", String(w));
    img.setAttribute("height", String(h));
    img.setAttribute("href", displacementMap(w, h, rad, id, t.opacity));
  };
  const ro = new ResizeObserver(() => setTimeout(update, 0));
  ro.observe(el);
  update();
  el.style.setProperty("--lg-filter", `url(#${id})`);
  el.dataset.lg = "svg";
  return () => {
    ro.disconnect();
    f.remove();
  };
}

/** Callback ref that turns any element into liquid glass. Pair with className="glass". */
function useGlassRef() {
  return useCallback((el: HTMLElement | null) => (el ? attach(el) : undefined), []);
}

type GlassProps<E extends ElementType> = {
  as?: E;
  /** White tint over the glass, 0–1 (like GlassSurface's backgroundOpacity). Raise it where text needs calm. */
  frost?: number;
} & ComponentPropsWithoutRef<E>;

/** <Glass as="a" …> — any element, rendered as liquid glass. */
export function Glass<E extends ElementType = "div">({ as, className, frost, style, ...rest }: GlassProps<E>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useGlassRef();
  const s = frost === undefined ? style : ({ ...style, "--glass-frost": frost } as CSSProperties);
  return <Tag ref={ref} className={className ? `glass ${className}` : "glass"} style={s} {...rest} />;
}
