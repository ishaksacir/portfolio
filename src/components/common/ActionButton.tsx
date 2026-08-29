import type { ReactNode } from "react";

interface ActionButtonProps {
  children: ReactNode;
  onClick?: () => void;
  /** "featured" is the larger retro CTA style used once, on the homepage hero. */
  variant?: "default" | "featured";
}

export function ActionButton({
  children,
  onClick,
  variant = "default",
}: ActionButtonProps) {
  if (variant === "featured") {
    return (
      <button className="retro-work-button" onClick={onClick}>
        <span>{children}</span>
        <span className="retro-work-button__arrow">→</span>
      </button>
    );
  }

  return (
    <button className="box" onClick={onClick}>
      {children} <b>→</b>
    </button>
  );
}
