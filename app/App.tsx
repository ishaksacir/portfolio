import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { GradualBlur } from "./components/GradualBlur";

// One chunk per page, so the first visit only downloads the route it lands on.
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Project = lazy(() => import("./pages/Project"));
const Playground = lazy(() => import("./pages/Playground"));
const Journal = lazy(() => import("./pages/Journal"));
const NotFound = lazy(() => import("./pages/NotFound"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="page">
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: "calc(100vh / var(--z, 1))" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<Project />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <GradualBlur />
    </div>
  );
}
