import { navigateTo } from "../../hooks/useHashRoute";
import {
  BRAND_LABEL,
  CONTACT_NAV_LABEL,
  NAV_ITEMS,
} from "../../data/navigation";
import type { PageId } from "../../routes/routes";

// Intentionally fixed — this is issue branding for the site itself, not derived content.
const ISSUE_LABEL = "ISSUE 01";

export function Header({ currentPage }: { currentPage: PageId }) {
  const time = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <header>
      <button className="brand" onClick={() => navigateTo("home")}>
        <i /> {BRAND_LABEL}
      </button>
      <nav>
        {NAV_ITEMS.map((item) => (
          <button
            className={currentPage === item.id ? "on" : ""}
            onClick={() => navigateTo(item.id)}
            key={item.id}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="nav-rule" aria-hidden="true" />
      <div className="availability">
        <i /> AVAILABLE
      </div>
      <div className="issue-meta">{ISSUE_LABEL}</div>
      <time>{time}</time>
      <button
        className={`navbar-contact${currentPage === "contact" ? " on" : ""}`}
        onClick={() => navigateTo("contact")}
      >
        {CONTACT_NAV_LABEL}　▸
      </button>
    </header>
  );
}
