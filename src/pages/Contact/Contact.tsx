import { Kicker } from "../../components/common/Kicker";
import { ActionButton } from "../../components/common/ActionButton";
import {
  CONTACT_CHANNELS,
  CONTACT_NEED_OPTIONS,
  CONTACT_STATS,
} from "../../data/contact";

export function Contact() {
  return (
    <main className="contact-page">
      <section className="contact">
        <div className="contact-intro">
          <Kicker>CHAPTER 07 — SAY HELLO</Kicker>
          <h1>
            LET’S BUILD
            <br />
            SOMETHING
            <br />
            GREAT
          </h1>
          <p>
            Tell me what you’re making and when you need it. I reply within two
            working days — and if I’m not the right fit, I’ll say so and point
            you somewhere better.
          </p>
          <b className="available">■　AVAILABLE FROM SEPTEMBER 2026</b>
          <div className="contactlist">
            {CONTACT_CHANNELS.map((channel) =>
              channel.href ? (
                <a href={channel.href} key={channel.label}>
                  {channel.icon}　 {channel.label}
                </a>
              ) : (
                <span key={channel.label}>
                  {channel.icon}　 {channel.label}
                </span>
              ),
            )}
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="enquiry-rail">
            <span>□</span>
            <b>NEW_ENQUIRY</b>
          </div>
          <div className="form-body">
            <div className="fields">
              <label>
                NAME
                <input placeholder="Your name" />
              </label>
              <label>
                EMAIL
                <input type="email" placeholder="you@email.com" />
              </label>
            </div>
            <label>
              WHAT DO YOU NEED?
              <div className="tags contact-choices">
                {CONTACT_NEED_OPTIONS.map((option) => (
                  <em key={option}>{option}</em>
                ))}
              </div>
            </label>
            <div className="fields">
              <label>
                BUDGET
                <select>
                  <option>€1k — €3k</option>
                </select>
              </label>
              <label>
                TIMELINE
                <select>
                  <option>1 — 2 months</option>
                </select>
              </label>
            </div>
            <label>
              DETAILS
              <textarea placeholder="A few lines about the project, the audience and what success looks like." />
            </label>
            <div className="form-submit">
              <small>NO NEWSLETTER. NO SHARING.</small>
              <ActionButton>SEND ENQUIRY</ActionButton>
            </div>
          </div>
        </form>
      </section>

      <section className="stats">
        {CONTACT_STATS.map((stat) => (
          <div key={stat.label}>
            <Kicker>{stat.label}</Kicker>
            <b>{stat.value}</b>
            <p>{stat.copy}</p>
          </div>
        ))}
        <aside>✦</aside>
      </section>
    </main>
  );
}
