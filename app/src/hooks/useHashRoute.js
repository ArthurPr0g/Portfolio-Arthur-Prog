import { useCallback, useEffect, useState } from "react";

function parseHash() {
  const h = window.location.hash || "";
  const m = h.match(/^#\/projetos\/([a-z0-9-]+)/i);
  if (m) return { name: "project", slug: m[1] };
  if (/^#\/planos\/?$/i.test(h)) return { name: "planos", slug: null };
  return { name: "home", slug: null };
}

export function useHashRoute() {
  const [route, setRoute] = useState(parseHash);

  useEffect(() => {
    const onHashChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const goToProject = useCallback((slug) => {
    window.location.hash = "#/projetos/" + slug;
  }, []);

  const clearRoute = useCallback(() => {
    if (window.location.hash === "") {
      setRoute(parseHash());
    } else {
      window.location.hash = "";
    }
  }, []);

  return { route, goToProject, clearRoute };
}
