import { useCallback, useEffect, useRef, useState } from "react";
import GlobalFx from "./components/GlobalFx";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Lightbox from "./components/Lightbox";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import { useHashRoute } from "./hooks/useHashRoute";
import { useScrollFx } from "./hooks/useScrollFx";
import { useCursorGlow } from "./hooks/useCursorGlow";
import { PROJECTS } from "./data/content";

export default function App() {
  const { route, goToProject, clearRoute } = useHashRoute();
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const barRef = useRef(null);
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const auraRef = useRef(null);
  const glowRef = useRef(null);
  const timelineRef = useRef(null);
  const trackRef = useRef(null);

  useScrollFx({ barRef, navRef, heroRef, auraRef, timelineRef, trackRef });
  useCursorGlow(glowRef);

  const project = route.name === "project" ? PROJECTS.find((p) => p.slug === route.slug) : null;
  const isProject = route.name === "project" && !!project;
  const projectIndex = project ? PROJECTS.indexOf(project) : -1;
  const nextProject = project ? PROJECTS[(projectIndex + 1) % PROJECTS.length] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name, route.slug]);

  const onSection = useCallback(
    (id) => (e) => {
      if (e) e.preventDefault();
      const go = () => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top, behavior: "smooth" });
        }
      };
      if (isProject) {
        clearRoute();
        setTimeout(go, 90);
      } else {
        go();
      }
    },
    [isProject, clearRoute]
  );

  const onOpenProject = useCallback(
    (slug) => (e) => {
      if (e) e.preventDefault();
      goToProject(slug);
    },
    [goToProject]
  );

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <GlobalFx auraRef={auraRef} glowRef={glowRef} barRef={barRef} />
      <Nav navRef={navRef} onSection={onSection} />

      {isProject ? (
        <ProjectPage
          project={project}
          nextProject={nextProject}
          onSection={onSection}
          onOpenProject={onOpenProject}
          onZoom={setLightboxSrc}
        />
      ) : (
        <Home
          heroRef={heroRef}
          timelineRef={timelineRef}
          trackRef={trackRef}
          onSection={onSection}
          onOpenProject={onOpenProject}
        />
      )}

      {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      <WhatsAppButton />
      <Footer />
    </div>
  );
}
