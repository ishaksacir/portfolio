import { useEffect, useRef, type CSSProperties } from "react";

/*
 * TechText — React Bits, ported from the prototype's TechText.jsx.
 * Renders a word on a canvas, inheriting font-size from the surrounding line.
 * Hovering outlines the nearest glyph with a dashed stroke and a selection
 * frame; glyphs can be dragged and spring back. When idle, a lens sweeps.
 */

const LABEL_FONT = "10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
const FALLOFF_STEPS = 8,
  SPRING = 320,
  DAMPING = 22,
  PAD = 40;

const approach = (c: number, t: number, dt: number, s: number) => c + (t - c) * (1 - Math.exp(-dt / s));
const hexRgb = (hex: string) => {
  let h = String(hex || "").replace("#", "");
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h.slice(0, 6), 16);
  return Number.isNaN(n) ? [255, 255, 255] : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const rgba = (hex: string, a: number) => {
  const [r, g, b] = hexRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
const noise = (...vs: number[]) => {
  let h = 2166136261;
  for (const v of vs) {
    h = Math.imul(h ^ (v | 0), 16777619);
    h ^= h >>> 13;
    h = Math.imul(h, 0x5bd1e995);
    h ^= h >>> 15;
  }
  return (h >>> 0) / 4294967296;
};
const signed = (v: number) => (v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0");

interface Settings {
  text: string;
  fontFamily: string;
  fontWeight: number;
  fontStyle: string;
  fontSize: number;
  letterSpacing: number;
  color: string;
  accentColor: string;
  reach: number;
  softness: number;
  dashLength: number;
  dashGap: number;
  strokeWidth: number;
  lineStyle: "dashed" | "solid";
  reveal: "letter" | "area";
  specks: number;
  selection: boolean;
  labels: boolean;
  draggable: boolean;
  sweep: boolean;
  speed: number;
}

interface TechTextProps extends Partial<Settings> {
  className?: string;
  style?: CSSProperties;
}

interface Art {
  image: HTMLCanvasElement;
  left: number;
  top: number;
}
interface Box {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}
interface Glyph {
  char: string;
  x: number;
  box: Box;
  offset: { x: number; y: number };
  velocity: { x: number; y: number };
  outline: number;
  index: number;
  fill: Art;
  dashes: Art;
}
interface View {
  size: number;
  baseline: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export function TechText({
  text = "React Bits",
  fontFamily = "",
  fontWeight = 600,
  fontStyle = "normal",
  fontSize = 0,
  letterSpacing = -0.05,
  color = "#ffffff",
  accentColor = "#ffffff",
  reach = 200,
  softness = 0.7,
  dashLength = 4,
  dashGap = 2,
  strokeWidth = 1.5,
  lineStyle = "dashed",
  reveal = "letter",
  specks = 15,
  selection = true,
  labels = true,
  draggable = true,
  sweep = true,
  speed = 1,
  className = "",
  style,
}: TechTextProps) {
  const outerRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef<Settings | null>(null);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    settingsRef.current = {
      text,
      fontFamily,
      fontWeight,
      fontStyle,
      fontSize,
      letterSpacing,
      color,
      accentColor,
      reach,
      softness,
      dashLength,
      dashGap,
      strokeWidth,
      lineStyle,
      reveal,
      specks,
      selection,
      labels,
      draggable,
      sweep,
      speed,
    };
    wakeRef.current();
  });

  useEffect(() => {
    const outer = outerRef.current,
      container = containerRef.current,
      canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const scratch = document.createElement("canvas");
    const scratchCtx = scratch.getContext("2d");
    if (!outer || !container || !canvas || !ctx || !scratchCtx) return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let width = 1,
      height = 1,
      dpr = 1,
      raf = 0,
      last = performance.now(),
      visible = true,
      alive = true;
    let layoutKey = "",
      requestedFont = "",
      word: View | null = null,
      glyphs: Glyph[] = [];
    let presence = 0,
      clock = 0,
      pulse = 0,
      placed = false,
      dragging = -1,
      lineSize = 16;
    const pointer = { x: 0, y: 0, inside: false },
      grab = { x: 0, y: 0 },
      lens = { x: 0, y: 0 };
    const frame = { x1: 0, y1: 0, x2: 0, y2: 0, alpha: 0, index: -1 };

    const refreshFonts = () => {
      layoutKey = "";
      wakeRef.current();
    };
    const family = (s: Settings) => s.fontFamily || getComputedStyle(outer).fontFamily || "sans-serif";
    const fontFor = (s: Settings, size: number) => `${s.fontStyle} ${s.fontWeight} ${size}px ${family(s)}`;
    const setFont = (t: CanvasRenderingContext2D, s: Settings, size: number) => {
      t.font = fontFor(s, size);
      if ("letterSpacing" in t) t.letterSpacing = `${s.letterSpacing * size}px`;
      t.textAlign = "left";
      t.textBaseline = "alphabetic";
    };

    const sprite = (s: Settings, view: View, glyph: Pick<Glyph, "char" | "x" | "box">, stroke: boolean): Art => {
      const pad = Math.ceil(s.strokeWidth * 2 + 4);
      const left = glyph.box.x1 - pad,
        top = glyph.box.y1 - pad;
      const w = glyph.box.x2 - glyph.box.x1 + pad * 2,
        h = glyph.box.y2 - glyph.box.y1 + pad * 2;
      const image = document.createElement("canvas");
      image.width = Math.max(1, Math.ceil(w * dpr));
      image.height = Math.max(1, Math.ceil(h * dpr));
      const c = image.getContext("2d");
      if (!c) return { image, left, top };
      c.setTransform(dpr, 0, 0, dpr, -left * dpr, -top * dpr);
      setFont(c, s, view.size);
      if (stroke) {
        c.lineJoin = "round";
        c.lineWidth = s.strokeWidth * 2;
        c.lineCap = "butt";
        c.strokeStyle = s.color;
        if (s.lineStyle !== "solid") c.setLineDash([Math.max(1, s.dashLength), Math.max(1, s.dashGap)]);
        c.strokeText(glyph.char, glyph.x, view.baseline);
        c.setLineDash([]);
        c.globalCompositeOperation = "destination-out";
        c.fillStyle = "#000000";
        c.fillText(glyph.char, glyph.x, view.baseline);
        c.globalCompositeOperation = "source-over";
      } else {
        c.fillStyle = s.color;
        c.fillText(glyph.char, glyph.x, view.baseline);
      }
      return { image, left, top };
    };

    const ensureLayout = (s: Settings): View => {
      const size = s.fontSize || lineSize;
      const key = [
        s.text,
        family(s),
        s.fontWeight,
        s.fontStyle,
        size,
        s.letterSpacing,
        s.color,
        s.dashLength,
        s.dashGap,
        s.strokeWidth,
        s.lineStyle,
        width,
        height,
        dpr,
      ].join("|");
      if (key === layoutKey && word) return word;
      layoutKey = key;
      const wanted = fontFor(s, 64);
      if (document.fonts && wanted !== requestedFont) {
        requestedFont = wanted;
        document.fonts.load(wanted, s.text).then(refreshFonts, refreshFonts);
      }
      const probe = scratchCtx;
      setFont(probe, s, size);
      const m = probe.measureText(s.text);
      const adv = Math.ceil(m.width + Math.max(0, m.actualBoundingBoxRight - m.width));
      if (Math.abs(outer.offsetWidth - adv) > 0.5) outer.style.width = adv + "px";
      const x = PAD,
        baseline = PAD + outer.offsetHeight;
      const next: View = {
        size,
        baseline,
        left: x - m.actualBoundingBoxLeft,
        right: x + m.actualBoundingBoxRight,
        top: baseline - m.actualBoundingBoxAscent,
        bottom: baseline + m.actualBoundingBoxDescent,
      };
      word = next;
      const chars = Array.from(s.text),
        previous = glyphs;
      glyphs = [];
      let prefix = "";
      chars.forEach((char, i) => {
        prefix += char;
        const own = probe.measureText(char);
        const gx = x + probe.measureText(prefix).width - own.width;
        if (!char.trim()) return;
        const base = {
          char,
          x: gx,
          box: {
            x1: gx - own.actualBoundingBoxLeft,
            y1: baseline - own.actualBoundingBoxAscent,
            x2: gx + own.actualBoundingBoxRight,
            y2: baseline + own.actualBoundingBoxDescent,
          },
        };
        const kept = previous[glyphs.length];
        glyphs.push({
          ...base,
          offset: kept && kept.char === char ? kept.offset : { x: 0, y: 0 },
          velocity: { x: 0, y: 0 },
          outline: 0,
          index: i,
          fill: sprite(s, next, base, false),
          dashes: sprite(s, next, base, true),
        });
      });
      dragging = -1;
      frame.index = -1;
      return next;
    };

    const glyphAt = (x: number, y: number) => {
      if (!word || y < word.top - 24 || y > word.bottom + 24) return -1;
      let best = -1,
        bd = Infinity;
      glyphs.forEach((g, i) => {
        const x1 = g.box.x1 + g.offset.x,
          x2 = g.box.x2 + g.offset.x;
        const d = x < x1 ? x1 - x : x > x2 ? x - x2 : 0;
        if (d < bd) {
          bd = d;
          best = i;
        }
      });
      return bd < 28 ? best : -1;
    };

    const falloff = (t: CanvasRenderingContext2D, cx: number, cy: number, r: number, st: number, soft: number) => {
      const inner = Math.min(1, Math.max(0, 1 - soft));
      const g = t.createRadialGradient(cx, cy, 0, cx, cy, r);
      g.addColorStop(0, `rgba(0, 0, 0, ${st})`);
      if (inner > 0.995) {
        g.addColorStop(0.995, `rgba(0, 0, 0, ${st})`);
        g.addColorStop(1, "rgba(0, 0, 0, 0)");
        return g;
      }
      for (let i = 0; i <= FALLOFF_STEPS; i++) {
        const t2 = i / FALLOFF_STEPS,
          e = t2 * t2 * (3 - 2 * t2);
        g.addColorStop(inner + (1 - inner) * t2, `rgba(0, 0, 0, ${st * (1 - e)})`);
      }
      return g;
    };

    const blit = (t: CanvasRenderingContext2D, art: Art, dx: number, dy: number, ox: number, oy: number) =>
      t.drawImage(art.image, Math.round((art.left + dx) * dpr - ox), Math.round((art.top + dy) * dpr - oy));

    const drawReveal = (s: Settings) => {
      const r = s.reach * dpr,
        cx = lens.x * dpr,
        cy = lens.y * dpr;
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = falloff(ctx, cx, cy, r, presence, s.softness);
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      ctx.globalCompositeOperation = "source-over";
      const x0 = Math.max(0, Math.floor(cx - r)),
        y0 = Math.max(0, Math.floor(cy - r));
      const x1 = Math.min(canvas.width, Math.ceil(cx + r)),
        y1 = Math.min(canvas.height, Math.ceil(cy + r));
      if (x1 <= x0 || y1 <= y0) return;
      const w = x1 - x0,
        h = y1 - y0;
      if (scratch.width < w || scratch.height < h) {
        scratch.width = Math.max(scratch.width, w);
        scratch.height = Math.max(scratch.height, h);
      }
      scratchCtx.setTransform(1, 0, 0, 1, 0, 0);
      scratchCtx.globalCompositeOperation = "source-over";
      scratchCtx.clearRect(0, 0, w, h);
      for (const g of glyphs) blit(scratchCtx, g.dashes, g.offset.x, g.offset.y, x0, y0);
      scratchCtx.globalCompositeOperation = "destination-in";
      scratchCtx.fillStyle = falloff(scratchCtx, cx - x0, cy - y0, r, 1, s.softness);
      scratchCtx.fillRect(0, 0, w, h);
      scratchCtx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = presence;
      ctx.drawImage(scratch, 0, 0, w, h, x0, y0, w, h);
      ctx.globalAlpha = 1;
    };

    const crisp = (v: number) => (Math.round(v * dpr) + 0.5) / dpr;
    const perimeterPoint = (dist: number, w: number, h: number): [number, number, number, number] => {
      let d = ((dist % (2 * (w + h))) + 2 * (w + h)) % (2 * (w + h));
      if (d < w) return [frame.x1 + d, frame.y1, 0, -1];
      d -= w;
      if (d < h) return [frame.x2, frame.y1 + d, 1, 0];
      d -= h;
      if (d < w) return [frame.x2 - d, frame.y2, 0, 1];
      d -= w;
      return [frame.x1, frame.y2 - d, -1, 0];
    };

    const drawSpecks = (s: Settings, a: number) => {
      const w = frame.x2 - frame.x1,
        h = frame.y2 - frame.y1;
      if (w < 2 || h < 2) return;
      const per = 2 * (w + h),
        seed = frame.index + 1,
        grid = 3;
      for (let k = 0; k < s.specks; k++) {
        const period = 0.5 + noise(seed, k, 11) * 1.2,
          t = pulse / period + noise(seed, k, 17),
          cycle = Math.floor(t),
          life = t - cycle;
        if (life > 0.7) continue;
        const [px, py, nx, ny] = perimeterPoint(noise(seed, k, cycle) * per, w, h);
        const pick = noise(seed, k, cycle, 2);
        const size = pick < 0.46 ? 2 : pick < 0.7 ? 3 : pick < 0.84 ? 5 : pick < 0.94 ? 8 : 11,
          large = size >= 8;
        const out = (large ? 9 : 4) + Math.floor(noise(seed, k, cycle, 1) * 5) * grid;
        const x = frame.x1 + Math.round((px + nx * out - frame.x1) / grid) * grid,
          y = frame.y1 + Math.round((py + ny * out - frame.y1) / grid) * grid;
        const tone = noise(seed, k, cycle, 3),
          blinkA = life < 0.06 || (life > 0.32 && life < 0.36) ? 0.35 : 1;
        const alpha = a * (large ? 0.3 + 0.4 * tone : 0.3 + 0.6 * tone) * blinkA;
        const left = Math.round(x - size / 2),
          top = Math.round(y - size / 2);
        if (tone < 0.26 || (large && tone < 0.78)) {
          ctx.strokeStyle = rgba(s.accentColor, alpha);
          ctx.strokeRect(left + 0.5, top + 0.5, size, size);
          if (large && tone > 0.5) {
            ctx.fillStyle = rgba(s.accentColor, alpha);
            ctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 2);
          }
        } else {
          ctx.fillStyle = rgba(s.accentColor, alpha);
          ctx.fillRect(left, top, size, size);
        }
      }
      for (let j = 0; j < 2; j++) {
        const head = (pulse * 0.42 * s.speed + j * 0.5) * per;
        for (let i = 0; i < 4; i++) {
          const [x, y] = perimeterPoint(head - i * 6, w, h);
          const sz = i === 0 ? 3 : 2;
          ctx.fillStyle = rgba(s.accentColor, a * [0.95, 0.55, 0.32, 0.16][i]);
          ctx.fillRect(Math.round(x - sz / 2), Math.round(y - sz / 2), sz, sz);
        }
      }
    };

    const drawFrame = (s: Settings) => {
      const g = glyphs[frame.index];
      if (!g || frame.alpha < 0.01) return;
      const a = frame.alpha,
        x1 = crisp(frame.x1),
        y1 = crisp(frame.y1),
        x2 = crisp(frame.x2),
        y2 = crisp(frame.y2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const moved = Math.hypot(g.offset.x, g.offset.y);
      if (moved > 1) {
        const hx = (g.box.x1 + g.box.x2) / 2,
          hy = (g.box.y1 + g.box.y2) / 2;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(hx + g.offset.x, hy + g.offset.y);
        ctx.setLineDash([3, 4]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = rgba(s.accentColor, 0.45 * a);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.rect(Math.round(hx) - 2, Math.round(hy) - 2, 4, 4);
        ctx.fillStyle = rgba(s.accentColor, 0.7 * a);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.rect(x1, y1, x2 - x1, y2 - y1);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(s.accentColor, 0.5 * a);
      ctx.stroke();
      ctx.beginPath();
      for (const [cx, cy] of [
        [x1, y1],
        [x2, y1],
        [x2, y2],
        [x1, y2],
      ])
        ctx.rect(Math.round(cx) - 2, Math.round(cy) - 2, 5, 5);
      ctx.fillStyle = rgba(s.accentColor, 0.95 * a);
      ctx.fill();
      if (s.specks > 0) {
        ctx.lineWidth = 1;
        drawSpecks(s, a);
      }
      if (!s.labels) return;
      ctx.font = LABEL_FONT;
      ctx.textAlign = "left";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = rgba(s.accentColor, 0.62 * a);
      const label =
        moved > 1
          ? `${signed(Math.round(g.offset.x))}, ${signed(Math.round(-g.offset.y))}`
          : `${g.char}  ${Math.round(g.box.x2 - g.box.x1)} × ${Math.round(g.box.y2 - g.box.y1)}`;
      ctx.fillText(label, Math.round(frame.x1), Math.round(frame.y1) - 7);
    };

    const tick = (now: number) => {
      raf = 0;
      const s = settingsRef.current;
      if (!s) return;
      const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
      last = now;
      const view = ensureLayout(s);
      const sweeping = s.sweep && !reducedMotion && !pointer.inside && dragging < 0;
      if (sweeping) clock += dt * s.speed;
      pulse += dt;
      let tx = pointer.x,
        ty = pointer.y;
      if (sweeping) {
        tx = view.left + (view.right - view.left) * (0.5 - 0.5 * Math.cos(clock * 0.45));
        ty = view.top + (view.bottom - view.top) * (0.45 + 0.1 * Math.sin(clock * 0.8));
      }
      const active = pointer.inside || sweeping || dragging >= 0;
      if (active && !placed) {
        lens.x = tx;
        lens.y = ty;
      }
      if (active) {
        const lag = pointer.inside ? 0.05 : 0.22;
        lens.x = approach(lens.x, tx, dt, lag);
        lens.y = approach(lens.y, ty, dt, lag);
      }
      placed = active;
      presence = approach(presence, s.reveal === "area" && active && dragging < 0 ? 1 : 0, dt, 0.16);
      let moving = false;
      glyphs.forEach((g, i) => {
        if (i === dragging) {
          g.offset.x = approach(g.offset.x, pointer.x - grab.x, dt, 0.03);
          g.offset.y = approach(g.offset.y, pointer.y - grab.y, dt, 0.03);
          g.velocity.x = 0;
          g.velocity.y = 0;
          moving = true;
          return;
        }
        const { offset: o, velocity: v } = g;
        if (Math.abs(o.x) < 0.05 && Math.abs(o.y) < 0.05 && Math.hypot(v.x, v.y) < 0.5) {
          o.x = 0;
          o.y = 0;
          v.x = 0;
          v.y = 0;
          return;
        }
        v.x += (-SPRING * o.x - DAMPING * v.x) * dt;
        v.y += (-SPRING * o.y - DAMPING * v.y) * dt;
        o.x += v.x * dt;
        o.y += v.y * dt;
        moving = true;
      });
      const focus = dragging >= 0 ? dragging : active ? glyphAt(lens.x, lens.y) : -1;
      if (focus >= 0 && s.selection) {
        const g = glyphs[focus];
        const bx1 = g.box.x1 + g.offset.x - 6,
          by1 = g.box.y1 + g.offset.y - 6,
          bx2 = g.box.x2 + g.offset.x + 6,
          by2 = g.box.y2 + g.offset.y + 6;
        if (frame.index < 0 || frame.alpha < 0.02) {
          frame.x1 = bx1;
          frame.y1 = by1;
          frame.x2 = bx2;
          frame.y2 = by2;
        }
        const glide = focus === dragging ? 0.02 : 0.08;
        frame.x1 = approach(frame.x1, bx1, dt, glide);
        frame.y1 = approach(frame.y1, by1, dt, glide);
        frame.x2 = approach(frame.x2, bx2, dt, glide);
        frame.y2 = approach(frame.y2, by2, dt, glide);
        frame.index = focus;
      }
      frame.alpha = approach(frame.alpha, focus >= 0 && s.selection ? 1 : 0, dt, 0.1);
      glyphs.forEach((g, i) => {
        const t = s.reveal === "letter" && i === focus && i !== dragging ? 1 : 0;
        g.outline = approach(g.outline, t, dt, 0.09);
        if (Math.abs(g.outline - t) > 0.002) moving = true;
        else g.outline = t;
      });
      if (s.draggable) container.style.cursor = dragging >= 0 ? "grabbing" : focus >= 0 && pointer.inside ? "grab" : "";
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const g of glyphs) {
        const mv = Math.hypot(g.offset.x, g.offset.y);
        if (mv > 1) {
          ctx.globalAlpha = Math.min(1, mv / 24) * 0.55;
          blit(ctx, g.dashes, 0, 0, 0, 0);
          ctx.globalAlpha = 1;
        }
      }
      for (const g of glyphs) {
        if (g.outline < 0.999) {
          ctx.globalAlpha = 1 - g.outline;
          blit(ctx, g.fill, g.offset.x, g.offset.y, 0, 0);
        }
        if (g.outline > 0.001) {
          ctx.globalAlpha = g.outline;
          blit(ctx, g.dashes, g.offset.x, g.offset.y, 0, 0);
        }
        ctx.globalAlpha = 1;
      }
      if (presence > 0.001) drawReveal(s);
      drawFrame(s);
      const settling =
        moving ||
        Math.abs(presence - (s.reveal === "area" && active && dragging < 0 ? 1 : 0)) > 0.002 ||
        (frame.alpha > 0.01 && frame.alpha < 0.99);
      if ((active || settling) && visible && alive) raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (raf || !visible || !alive) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    const resize = () => {
      lineSize = parseFloat(getComputedStyle(outer).fontSize) || 16;
      width = Math.max(1, container.clientWidth);
      height = Math.max(1, container.clientHeight);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      layoutKey = "";
      wake();
    };
    const locate = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      const k = width / (r.width || width); // undo page zoom
      pointer.x = (e.clientX - r.left) * k;
      pointer.y = (e.clientY - r.top) * k;
    };
    const onMove = (e: PointerEvent) => {
      locate(e);
      pointer.inside = true;
      wake();
    };
    const onLeave = () => {
      if (dragging >= 0) return;
      pointer.inside = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      locate(e);
      pointer.inside = true;
      const s = settingsRef.current;
      if (s && s.draggable && (e.pointerType !== "mouse" || e.button === 0)) {
        const idx = glyphAt(pointer.x, pointer.y);
        if (idx >= 0) {
          dragging = idx;
          grab.x = pointer.x - glyphs[idx].offset.x;
          grab.y = pointer.y - glyphs[idx].offset.y;
          container.setPointerCapture?.(e.pointerId);
        }
      }
      wake();
    };
    const onUp = (e: PointerEvent) => {
      if (dragging >= 0) {
        dragging = -1;
        if (container.hasPointerCapture?.(e.pointerId)) container.releasePointerCapture(e.pointerId);
        const r = container.getBoundingClientRect();
        pointer.inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      }
      wake();
    };

    outer.addEventListener("pointermove", onMove, { passive: true });
    outer.addEventListener("pointerenter", onMove, { passive: true });
    outer.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    outer.addEventListener("pointercancel", onUp, { passive: true });
    outer.addEventListener("pointerleave", onLeave, { passive: true });
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    ro.observe(outer.parentElement || outer);
    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
      wake();
    });
    io.observe(container);
    document.fonts?.ready.then(refreshFonts, refreshFonts);
    resize();

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      wakeRef.current = () => {};
      ro.disconnect();
      io.disconnect();
      outer.removeEventListener("pointermove", onMove);
      outer.removeEventListener("pointerenter", onMove);
      outer.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      outer.removeEventListener("pointercancel", onUp);
      outer.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={outerRef}
      className={`tech-text ${className}`.trim()}
      role="img"
      aria-label={text}
      style={{
        position: "relative",
        display: "inline-block",
        height: ".74em",
        width: text.length * 0.5 + "em",
        touchAction: "pan-y",
        userSelect: "none",
        verticalAlign: "baseline",
        ...style,
      }}
    >
      <span
        ref={containerRef}
        style={{ position: "absolute", left: -PAD, top: -PAD, right: -PAD, bottom: -PAD, pointerEvents: "none" }}
      >
        <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
      </span>
    </span>
  );
}

/** The blue, italic, letter-reveal treatment used for every emphasised word in the design. */
export function Highlight({
  text,
  letterSpacing = -0.02,
  specks = 12,
}: {
  text: string;
  letterSpacing?: number;
  specks?: number;
}) {
  return (
    <TechText
      text={text}
      fontFamily="'Clash Grotesk', sans-serif"
      fontWeight={500}
      fontStyle="italic"
      letterSpacing={letterSpacing}
      color="#5B7DBF"
      accentColor="#3E5A8C"
      reveal="letter"
      specks={specks}
      dashLength={4}
      dashGap={2}
    />
  );
}
