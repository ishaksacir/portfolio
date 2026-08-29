import { Kicker } from "../../components/common/Kicker";
import { navigateTo } from "../../hooks/useHashRoute";
import {
  EXPERIENCE_ROLES,
  EXPERIENCE_SKILL_LEVELS,
  EXPERIENCE_STACK_INVENTORY,
  EXPERIENCE_STUDY,
} from "../../data/experience";

export function Experience() {
  return (
    <main className="lore-page">
      <section className="lore-cover">
        <div>
          <Kicker>CHAPTER 04 · THE LORE</Kicker>
          <h1>
            FIVE YEARS.
            <br />
            THREE ROLES.
            <br />
            ONE SAGA.
          </h1>
          <p>
            Mostly learned by shipping things before I felt ready, fixing what
            broke, and writing down what I wished somebody had explained sooner.
          </p>
          <div className="lore-chips">
            <b>3 ROLES</b>
            <span>16 SHIPPED</span>
            <span>SARAJEVO</span>
            <span>REMOTE SINCE ’21</span>
          </div>
        </div>
        <strong className="lore-burst">WHAM!</strong>
        <aside className="lore-sheet">
          <header>
            <span>CHARACTER DATA</span>
            <b>LVL. 05</b>
          </header>
          <h2>ISHAK</h2>
          <p>CLASS: DEV / DESIGN HYBRID</p>
          <dl>
            {EXPERIENCE_SKILL_LEVELS.map((skill) => (
              <div key={skill.label}>
                <dt>{skill.label}</dt>
                <dd>
                  <i style={{ width: `${skill.percent}%` }} />
                </dd>
              </div>
            ))}
          </dl>
          <small>SPECIAL MOVE: SHIPS THE DETAILS NOBODY ELSE NOTICES.</small>
        </aside>
      </section>

      <div className="lore-divider">
        <b>THE SAGA — IN READING ORDER</b>
        <span>4 PANELS</span>
      </div>

      <section className="lore-roles">
        {EXPERIENCE_ROLES.map((role, i) => (
          <article className={`lore-role lore-role-${i}`} key={role.panel}>
            <div className="lore-years">
              <b>{role.years}</b>
            </div>
            <div className="lore-role-copy">
              <Kicker>{role.panel}</Kicker>
              <h2>{role.title}</h2>
              <strong>{role.meta}</strong>
              <p>{role.copy}</p>
              <blockquote>{role.quote}</blockquote>
            </div>
            <aside>
              <Kicker>ARSENAL</Kicker>
              <div>
                {role.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
              <Kicker>FIELD NOTES</Kicker>
              <p>{role.note}</p>
            </aside>
          </article>
        ))}
        <article className="lore-continued">
          <b>PANEL 04 — TO BE CONTINUED...</b>
          <p>
            One role open. No spoilers. The next panel could have your project
            in it.
          </p>
          <button onClick={() => navigateTo("contact")}>
            WRITE IT WITH ME →
          </button>
        </article>
      </section>

      <section className="lore-bottom">
        <div>
          <Kicker>SIDE QUESTS · STUDY</Kicker>
          {EXPERIENCE_STUDY.map((entry) => (
            <article key={entry.title}>
              <i />
              <p>
                <b>{entry.title}</b>
                <span>{entry.detail}</span>
              </p>
            </article>
          ))}
        </div>
        <div>
          <div className="lore-bottom-head">
            <Kicker>INVENTORY · STACK TODAY</Kicker>
            {/* Flavor text for a fictional 12-slot inventory — not derived from the stack list length. */}
            <span>9 / 12 SLOTS</span>
          </div>
          <div className="lore-inventory">
            {EXPERIENCE_STACK_INVENTORY.map((tech, i) => (
              <span key={tech}>
                <i className={`inventory-${i}`} />
                <b>{tech}</b>
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
