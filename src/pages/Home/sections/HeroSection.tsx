import { Kicker } from "../../../components/common/Kicker";
import { ActionButton } from "../../../components/common/ActionButton";
import { navigateTo } from "../../../hooks/useHashRoute";

export function HeroSection() {
  return (
    <section className="homehero">
      <div>
        <Kicker>
          MEANWHILE... IN SARAJEVO
          <br />
          ANOTHER IDEA GETS WAY TOO SERIOUS.
        </Kicker>
        <h1>
          FULL STACK.
          <br />
          FULL SEND.
        </h1>
        <div className="hero-skills">
          <span className="strip">DESIGN / FRONTEND / BACKEND / DEPLOY</span>
          <span className="issue-badge">
            <small>ISSUE</small>
            <b>01</b>
          </span>
        </div>
        <blockquote>
          I turn ideas into working digital products —<br />
          from the first sketch to the final deploy,
          <br />
          with a suspicious amount of attention to tiny details.
        </blockquote>
        <ActionButton variant="featured" onClick={() => navigateTo("work")}>
          ENTER THE ARCHIVES
        </ActionButton>
      </div>
      <div className="photo red">
        <img src={portrait} alt="Ishak Šačirbey" />
        <small>
          43.8563° N / 18.4131° E
          <br />
          SARAJEVO, BOSNIA
        </small>
      </div>
    </section>
  );
}
