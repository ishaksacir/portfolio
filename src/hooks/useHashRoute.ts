import { useEffect, useState } from "react";

function readRoute<T extends string>(validIds: readonly T[], fallback: T): T {
  const current = window.location.hash.slice(1);
  return (validIds as readonly string[]).includes(current)
    ? (current as T)
    : fallback;
}

/** Tracks `location.hash` as the current route, falling back when it doesn't match a known id. */
export function useHashRoute<T extends string>(
  validIds: readonly T[],
  fallback: T,
): T {
  const [route, setRoute] = useState<T>(() => readRoute(validIds, fallback));

  useEffect(() => {
    const handleHashChange = () => setRoute(readRoute(validIds, fallback));
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [validIds, fallback]);

  return route;
}

export function navigateTo(id: string) {
  window.location.hash = id === "home" ? "" : id;
  window.scrollTo(0, 0);
}
