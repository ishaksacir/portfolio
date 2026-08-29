import { Kicker } from "../../../components/common/Kicker";
import { ActionButton } from "../../../components/common/ActionButton";
import { navigateTo } from "../../../hooks/useHashRoute";
import { HOME_METHOD_STEPS } from "../../../data/home";
import laptop from "../../../assets/ishak-laptop-blue-color.png";

export function MethodTeaserSection() {
  return (
    <section className="teaser">
      <div>
        <Kicker>
          <b>02</b> ORIGIN / METHOD
        </Kicker>
        <h2>
          CODE, DESIGN, AND AN
          <br />
          UNHEALTHY RESPECT
          <br />
          FOR ALIGNMENT.
        </h2>
        <p>
          I work across the whole stack — from interfaces and design systems to
          APIs, databases and deployment. I like clean code, clear ideas and
          details nobody notices until they’re wrong.
        </p>
        <ActionButton onClick={() => navigateTo("experience")}>
          READ THE LORE
        </ActionButton>
      </div>
      <div className="teaserpic">
        <img src={laptop} alt="" />
        <small>FIG. 02 — DEVELOPER IN NATURAL HABITAT</small>
      </div>
      <ol>
        {HOME_METHOD_STEPS.map((step, i) => (
          <li key={step.title}>
            <b>0{i + 1}</b>
            <strong>{step.title}</strong>
            <span>{step.copy}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
