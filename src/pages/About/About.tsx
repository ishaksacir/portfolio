import { Kicker } from "../../components/common/Kicker";
import { ActionButton } from "../../components/common/ActionButton";
import {
  ABOUT_INFO,
  ABOUT_INTERESTS,
  ABOUT_TIMELINE,
  ABOUT_TRAITS,
} from "../../data/about";
import portrait from "../../assets/ishak-hero-warrior-wide.png";

export function About() {
  return (
    <main className="origin-page">
      <section className="origin-hero">
        <div>
          <Kicker>CHAPTER 03 — WHO I AM</Kicker>
          <h1>
            DEVELOPER,
            <br />
            DESIGNER,
            <br />
            TINKERER.
          </h1>
          <strong className="origin-wow">WOW!</strong>
          <p>
            I’m Ishak — a developer based in Sarajevo. I started with static
            pages for local businesses and kept going until the work covered the
            whole thing: interface, identity, front end and the details in
            between.
          </p>
          <blockquote>
            I like problems where design and engineering can’t be separated —
            motion that stays at 60fps, layouts that survive real content,
            brands that work at 16px and on a t-shirt.
          </blockquote>
        </div>
        <div className="origin-portrait">
          <div>
            <img src={portrait} alt="Ishak Šačirbey" />
          </div>
        </div>
      </section>

      <div className="origin-divider">
        <b>ORIGIN STRIP — HOW IT STARTED</b>
        <span>4 PANELS · 2014 → 2024</span>
      </div>

      <section className="origin-timeline">
        {ABOUT_TIMELINE.map((entry, i) => (
          <article className={`origin-year origin-year-${i}`} key={entry.year}>
            <div>
              <Kicker>PANEL 0{i + 1}</Kicker>
              <small>{entry.year}</small>
            </div>
            <h2>{entry.year}</h2>
            <p>{entry.copy}</p>
          </article>
        ))}
      </section>

      <section className="origin-creed">
        <Kicker>THE CREED — FOUR RULES, NO EXCEPTIONS</Kicker>
        <div>
          {ABOUT_TRAITS.map((trait, i) => (
            <article key={trait.title}>
              <h3>
                <i className={`creed-${i}`} />
                {trait.title}
              </h3>
              <p>{trait.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="origin-info">
        <div>
          <Kicker>OUTSIDE THE EDITOR</Kicker>
          <div className="origin-interests">
            {ABOUT_INTERESTS.map((interest, i) => (
              <article key={interest.title}>
                <i className={`interest-${i}`} />
                <p>
                  <b>{interest.title}</b>
                  <span>{interest.copy}</span>
                </p>
              </article>
            ))}
          </div>
        </div>
        <aside>
          <Kicker>GET INFO</Kicker>
          <dl>
            {ABOUT_INFO.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {/* No CV file linked yet — intentionally a no-op until there's something to download. */}
          <ActionButton>DOWNLOAD CV</ActionButton>
        </aside>
      </section>
    </main>
  );
}
