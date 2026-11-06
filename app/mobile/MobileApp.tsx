import { Suspense, lazy } from "react";
import { Link, NavLink, Route, Routes, matchPath, useLocation } from "react-router-dom";
import { CaretLeft, Flask, FolderSimple, House, NotePencil, User, type Icon } from "@phosphor-icons/react";
import { PROJECTS, findProject } from "../content/projects";
import "../styles/mobile.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Project = lazy(() => import("./pages/Project"));
const Playground = lazy(() => import("./pages/Playground"));
const Journal = lazy(() => import("./pages/Journal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const TABS: { to: string; label: string; icon: Icon }[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/about", label: "About", icon: User },
  { to: "/work", label: "Work", icon: FolderSimple },
  { to: "/playground", label: "Play", icon: Flask },
  { to: "/journal", label: "Blog", icon: NotePencil },
];

const pad2 = (n: number) => String(n).padStart(2, "0");

/** Brand and status everywhere; a back link and the project's position on project pages. */
function TopBar() {
  const { pathname } = useLocation();
  const project = findProject(matchPath("/work/:slug", pathname)?.params.slug);
  if (project >= 0) {
    return (
      <div className="m-top">
        <Link to="/work" className="m-top-back">
          <CaretLeft size={18} />
          Work
        </Link>
        <span className="m-meta">
          {pad2(project + 1)} / {pad2(PROJECTS.length)}
        </span>
      </div>
    );
  }
  return (
    <div className="m-top">
      <Link to="/" className="m-top-brand" aria-label="Ishak Sacirbey — home">
        <span className="m-top-mark">
          <i />
        </span>
        <span className="m-top-name">ISHAK SACIRBEY</span>
      </Link>
      <span className="m-status">
        <span className="m-pulse" />
        Available
      </span>
    </div>
  );
}

function Dock() {
  return (
    <nav className="m-dock" aria-label="Main">
      {TABS.map(({ to, label, icon: IconC }) => (
        <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => (isActive ? "is-on" : undefined)}>
          {({ isActive }) => (
            <>
              <IconC size={21} weight={isActive ? "fill" : "regular"} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}

/** The phone site: same routes as desktop, with a top bar and a tab dock instead of the glass navbar. */
export default function MobileApp() {
  return (
    <div className="m">
      <TopBar />
      <Suspense fallback={<div style={{ minHeight: "100dvh" }} />}>
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
      <Dock />
    </div>
  );
}
