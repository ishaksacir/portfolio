import { ShopCard } from "../../../components/shop/ShopCard";
import { navigateTo } from "../../../hooks/useHashRoute";
import { queueProjectForWork } from "../../../utils/projectHandoff";
import { FEATURED_PROJECT_COUNT, PROJECTS } from "../../../data/projects";

export function ProjectsPreviewSection() {
  const featured = PROJECTS.slice(0, FEATURED_PROJECT_COUNT);

  return (
    <>
      <div className="sectionbar">
        <span>
          FROM THE ARCHIVES — {String(FEATURED_PROJECT_COUNT).padStart(2, "0")}{" "}
          PROJECTS
        </span>
        <button onClick={() => navigateTo("work")}>VIEW ALL →</button>
      </div>
      <section className="home-projects shop-grid">
        {featured.map((project, index) => (
          <ShopCard
            project={project}
            index={index}
            onOpen={() => {
              queueProjectForWork(index);
              navigateTo("work");
            }}
            key={project.number}
          />
        ))}
      </section>
    </>
  );
}
