import { useEffect, useRef } from "react";
import "./RetroScrollbar.css";

export function RetroScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    startY: number;
    startScroll: number;
    maxScroll: number;
    maxTop: number;
  } | null>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current,
        thumb = thumbRef.current;
      if (!track || !thumb) return;
      const viewport = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const trackHeight = track.clientHeight;
      const maxScroll = Math.max(0, documentHeight - viewport);
      const thumbHeight = Math.max(
        36,
        Math.min(trackHeight, trackHeight * (viewport / documentHeight)),
      );
      const maxTop = Math.max(0, trackHeight - thumbHeight);
      const top = maxScroll ? (window.scrollY / maxScroll) * maxTop : 0;
      thumb.style.height = `${thumbHeight}px`;
      thumb.style.transform = `translateY(${top}px)`;
      track.setAttribute("aria-valuemax", String(Math.round(maxScroll)));
      track.setAttribute("aria-valuenow", String(Math.round(window.scrollY)));
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(requestUpdate);
    observer.observe(document.documentElement);
    addEventListener("scroll", requestUpdate, { passive: true });
    addEventListener("resize", requestUpdate, { passive: true });
    update();
    return () => {
      observer.disconnect();
      removeEventListener("scroll", requestUpdate);
      removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollStep = (direction: number) =>
    window.scrollBy({ top: direction * 64, behavior: "auto" });
  const pageTrack = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const thumb = thumbRef.current;
    if (!thumb) return;
    const rect = thumb.getBoundingClientRect();
    window.scrollBy({
      top: (event.clientY < rect.top ? -1 : 1) * window.innerHeight * 0.9,
      behavior: "auto",
    });
  };
  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const track = trackRef.current,
      thumb = thumbRef.current;
    if (!track || !thumb) return;
    const maxScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
    );
    dragRef.current = {
      startY: event.clientY,
      startScroll: window.scrollY,
      maxScroll,
      maxTop: Math.max(0, track.clientHeight - thumb.offsetHeight),
    };
    thumb.setPointerCapture(event.pointerId);
    document.body.classList.add("retro-scroll-dragging");
  };
  const drag = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = dragRef.current;
    if (!state || !state.maxTop) return;
    window.scrollTo({
      top:
        state.startScroll +
        ((event.clientY - state.startY) / state.maxTop) * state.maxScroll,
      behavior: "auto",
    });
  };
  const stopDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    document.body.classList.remove("retro-scroll-dragging");
  };

  return (
    <aside className="retro-scrollbar" aria-label="Page scrollbar">
      <button
        className="retro-scrollbar__arrow"
        onClick={() => scrollStep(-1)}
        aria-label="Scroll up"
      >
        ▲
      </button>
      <div
        className="retro-scrollbar__track"
        ref={trackRef}
        onPointerDown={pageTrack}
        role="scrollbar"
        aria-label="Document position"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={0}
        aria-valuenow={0}
      >
        <div
          className="retro-scrollbar__thumb"
          ref={thumbRef}
          onPointerDown={startDrag}
          onPointerMove={drag}
          onPointerUp={stopDrag}
          onPointerCancel={stopDrag}
        />
      </div>
      <button
        className="retro-scrollbar__arrow"
        onClick={() => scrollStep(1)}
        aria-label="Scroll down"
      >
        ▼
      </button>
    </aside>
  );
}
