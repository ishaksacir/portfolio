import type { Project } from "../../data/projects";

interface ShopCardProps {
  project: Project;
  /** Position among all issues — drives the shop-card-N accent styling. */
  index: number;
  onOpen: () => void;
}

export function ShopCard({ project, index, onOpen }: ShopCardProps) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  };

  return (
    <article
      className={`shop-card shop-card-${index}`}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="shop-card-meta">
        <span>ISHAK COMICS</span>
        <b>NO. {project.number}</b>
      </div>
      {/* Cover art (project.image) isn't wired into the shop card yet — every issue shows this placeholder. */}
      <div className="shop-visual">
        <span>IMAGE COMING SOON</span>
      </div>
      <h2>{project.title}</h2>
      <div className="shop-card-foot">
        <span>
          ISSUE {project.number} · {project.category} · {project.year}
        </span>
        <b>READ IT →</b>
      </div>
    </article>
  );
}
