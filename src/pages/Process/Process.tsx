import { Kicker } from "../../components/common/Kicker";
import {
  PROCESS_PRICING,
  PROCESS_PRINCIPLES,
  PROCESS_STEPS,
} from "../../data/process";

export function Process() {
  return (
    <main className="process-page">
      <section className="process-hero">
        <div>
          <Kicker>CHAPTER 05 — HOW I WORK</Kicker>
          <h1>
            FOUR STEPS,
            <br />
            NO SURPRISES
          </h1>
          <p>
            Same process whether it’s a landing page or a product. You always
            know what’s happening this week and what you’ll get at the end of
            it.
          </p>
        </div>
        <aside>
          <strong>
            NO
            <br />
            SURPRISES!
          </strong>
        </aside>
      </section>

      <section className="assembly">
        <header>
          <b>FIG. 05 — THE ASSEMBLY LINE</b>
          <span>SAME ORDER, EVERY PROJECT</span>
        </header>
        <div className="assembly-grid">
          {PROCESS_STEPS.map((step, i) => (
            <article className={`station station-${i}`} key={step.number}>
              <div className="station-card">
                <header>
                  <b>{step.title}</b>
                  <strong>{step.number}</strong>
                </header>
                <p>{step.copy}</p>
                <footer>
                  <small>OUTPUT</small>
                  <b>{step.output}</b>
                </footer>
              </div>
              <div className="station-track" />
              <small>{step.time}</small>
            </article>
          ))}
        </div>
        <footer>
          <span>
            YOU REVIEW AT EVERY STATION — NO 40-SCREEN REVEAL AT THE END
          </span>
          <b>TOTAL: 4 – 11 WEEKS</b>
        </footer>
      </section>

      <section className="process-bottom">
        <div>
          <Kicker>PRINCIPLES</Kicker>
          <ol>
            {PROCESS_PRINCIPLES.map((principle) => (
              <li key={principle.lead}>
                <b>{principle.lead}</b> {principle.copy}
              </li>
            ))}
          </ol>
        </div>
        <aside>
          <Kicker>WHAT IT COSTS</Kicker>
          <div className="price-list">
            {PROCESS_PRICING.map((tier) => (
              <article key={tier.label}>
                <p>
                  <b>{tier.label}</b>
                  <small>{tier.detail}</small>
                </p>
                <strong>{tier.price}</strong>
              </article>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
