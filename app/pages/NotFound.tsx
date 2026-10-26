import { Footer } from "../components/Footer";
import { GlassButton, PixelTitle } from "../components/ui";
import { useTitle } from "../hooks";

export default function NotFound() {
  useTitle("404 — Ishak Sacirbey");
  return (
    <>
      <main className="ruled" style={{ padding: "clamp(96px,12cqw,160px) clamp(20px,5cqw,72px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22, alignItems: "flex-start" }}>
          <span className="kicker">ERROR 404</span>
          <PixelTitle>FILE NOT FOUND</PixelTitle>
          <p className="mono" style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "var(--text-secondary)" }}>
            This page doesn't exist — or it's still sitting in the playground, unfinished.
          </p>
          <GlassButton to="/">Back home →</GlassButton>
        </div>
      </main>
      <Footer note="lost? happens to the best of us." secondary={{ label: "See the work →", to: "/work" }} />
    </>
  );
}
