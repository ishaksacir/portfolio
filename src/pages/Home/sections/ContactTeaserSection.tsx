import { ActionButton } from "../../../components/common/ActionButton";
import { navigateTo } from "../../../hooks/useHashRoute";
import { SOCIAL_LINKS } from "../../../data/socials";

export function ContactTeaserSection() {
  return (
    <section className="homecontact">
      <div>
        <div className="contact-title">
          <b>04</b>
          <span>LET’S WORK TOGETHER</span>
        </div>
        <div className="contact-copy">
          <p>
            Have a project in mind, or just want to say hello? Let’s make
            something great together.
          </p>
          <address>
            HELLO@ISHAK.DEV
            <br />
            +387 61 123 456
            <br />
            SARAJEVO, BIH
          </address>
        </div>
        <ActionButton onClick={() => navigateTo("contact")}>
          START A PROJECT
        </ActionButton>
      </div>
      <div className="socials">
        {SOCIAL_LINKS.map((social) => (
          <a
            className="social-link"
            href={social.href}
            target="_blank"
            rel="noreferrer"
            key={social.label}
          >
            <span className="social-name">{social.label}</span>
            <small className="social-description">{social.description}</small>
          </a>
        ))}
      </div>
      <div className="care">
        ✦
        <small>
          BUILT WITH CARE
          <br />
          PRINTED ON
          <br />
          THE WEB
        </small>
      </div>
    </section>
  );
}
