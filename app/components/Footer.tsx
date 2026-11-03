import { SOCIALS } from "../content/site";
import { Highlight } from "./TechText";
import { ContactButton, GlassButton } from "./ui";

interface FooterProps {
  /** handwritten line above the headline — different on every page */
  note: string;
  secondary: { label: string; to: string };
}

/** Footer CTA + bottom bar. Always the light base theme, even on themed project pages. */
export function Footer({ note, secondary }: FooterProps) {
  return (
    <div className="theme-base site-end">
      <section className="cta">
        <div className="cta__inner">
          <span className="hand cta__note">{note}</span>
          <h2 className="cta__title">
            Let's make something <Highlight text="a little weird." />
          </h2>
          <div className="cta__actions">
            <ContactButton />
            <GlassButton to={secondary.to}>{secondary.label}</GlassButton>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__name">
            <span className="footer__logo">ISHAK SACIRBEY</span>© 2026 · Sarajevo, BA
          </span>
          <div id="contact" aria-label="Contact" className="footer__socials">
            {SOCIALS.map(({ label, href, icon: IconC }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener"
                aria-label={label}
                title={label}
                className="social"
              >
                <IconC size={22} />
              </a>
            ))}
          </div>
          <span className="hand footer__hand">made by hand, pixel by pixel</span>
        </div>
      </footer>
    </div>
  );
}
