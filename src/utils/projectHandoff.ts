const PENDING_PROJECT_KEY = "projectToOpen";

/** Lets a project card outside the Work page (e.g. the homepage preview) open straight into that issue's reader. */
export function queueProjectForWork(index: number) {
  sessionStorage.setItem(PENDING_PROJECT_KEY, String(index));
}

export function takeQueuedProjectIndex(): number | null {
  const pending = sessionStorage.getItem(PENDING_PROJECT_KEY);
  sessionStorage.removeItem(PENDING_PROJECT_KEY);
  return pending === null ? null : Number(pending);
}
