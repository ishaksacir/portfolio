import { Link, NavLink } from "react-router-dom";
import { NAV_LINKS } from "../content/site";
import { formatClock, useNow } from "../hooks";
import { Glass } from "./Glass";

export function Navbar() {
  const now = useNow();
  return (
    <Glass as="header" className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand" aria-label="Ishak Sacirbey — home">
          <span className="nav__logo">
            <span />
          </span>
          <span className="nav__name">ISHAK SACIRBEY</span>
        </Link>
        <nav className="nav__links" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) => (isActive ? "nav__link is-active" : "nav__link")}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="nav__right">
          <div className="nav__status">
            <span className="nav__status-dot" />
            Available
          </div>
          <time className="nav__clock" dateTime={now.toISOString()}>
            {formatClock(now)}
          </time>
        </div>
      </div>
    </Glass>
  );
}
