import { useCallback, type ComponentPropsWithoutRef, type ElementType } from "react";

/*
 * Liquid glass — port of the prototype's GlassSurface.js.
 * Chromium gets an SVG displacement filter as backdrop-filter; Safari and
 * Firefox can't use url() there, so they keep the frosted `.glass` fallback.
 */

const O = {
  borderWidth: 0.07,
  brightness: 50,
  opacity: 0.93,
  blur: 11,
  displace: 0.4,
  distortionScale: -64,
  offsets: [0, 2, 4],
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

function displacementMap(w: number, h: number, r: number, id: string) {
  const edge = Math.min(w, h) * (O.borderWidth * 0.5);
  const s = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="r${id}" x1="100%" y1="0%" x2="0%" y2="0%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="red"/></linearGradient><linearGradient id="b${id}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#0000"/><stop offset="100%" stop-color="blue"/></linearGradient></defs><rect x="0" y="0" width="${w}" height="${h}" fill="black"/><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#r${id})"/><rect x="0" y="0" width="${w}" height="${h}" rx="${r}" fill="url(#b${id})" style="mix-blend-mode:${O.mixBlendMode}"/><rect x="${edge}" y="${edge}" width="${w - edge * 2}" height="${h - edge * 2}" rx="${r}" fill="hsl(0 0% ${O.brightness}% / ${O.opacity})" style="filter:blur(${O.blur}px)"/></svg>`;
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
  const channels: [string, string][] = [
    ["red", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"],
    ["green", "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"],
    ["blue", "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"],
  ];
  channels.forEach(([c, m], i) => {
    mk(
      "feDisplacementMap",
      {
        in: "SourceGraphic",
        in2: "map",
        result: "d" + c,
        scale: O.distortionScale + O.offsets[i],
        xChannelSelector: "R",
        yChannelSelector: "G",
      },
      f,
    );
    mk("feColorMatrix", { in: "d" + c, type: "matrix", values: m, result: c }, f);
  });
  mk("feBlend", { in: "red", in2: "green", mode: "screen", result: "rg" }, f);
  mk("feBlend", { in: "rg", in2: "blue", mode: "screen", result: "output" }, f);
  mk("feGaussianBlur", { in: "output", stdDeviation: O.displace }, f);

  const update = () => {
    // Layout size, not getBoundingClientRect, so page zoom doesn't stretch the map.
    const w = el.offsetWidth,
      h = el.offsetHeight;
    if (!w || !h) return;
    const rad = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, h / 2, w / 2);
    img.setAttribute("href", displacementMap(w, h, rad, id));
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

type GlassProps<E extends ElementType> = { as?: E } & ComponentPropsWithoutRef<E>;

/** <Glass as="a" …> — any element, rendered as liquid glass. */
export function Glass<E extends ElementType = "div">({ as, className, ...rest }: GlassProps<E>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useGlassRef();
  return <Tag ref={ref} className={className ? `glass ${className}` : "glass"} {...rest} />;
}
