import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import ConstruoSection from "../components/sections/ConstruoSection";
import SobreSection from "../components/sections/SobreSection";
import MetodoSection from "../components/sections/MetodoSection";
import ProjetosSection from "../components/sections/ProjetosSection";
import IaSection from "../components/sections/IaSection";
import CompetenciasSection from "../components/sections/CompetenciasSection";
import CarreiraSection from "../components/sections/CarreiraSection";
import StatsSection from "../components/sections/StatsSection";
import DepoimentosSection from "../components/sections/DepoimentosSection";
import ContatoSection from "../components/sections/ContatoSection";

export default function Home({ heroRef, timelineRef, trackRef, onSection, onOpenProject }) {
  return (
    <main style={{ position: "relative", zIndex: 2 }}>
      {/* Trabalho primeiro: projetos, números e depoimentos logo depois do topo. */}
      <Hero heroRef={heroRef} onSection={onSection} />
      <Marquee />
      <ProjetosSection onOpenProject={onOpenProject} />
      <StatsSection />
      <DepoimentosSection />
      <SobreSection />
      <ConstruoSection />
      <MetodoSection timelineRef={timelineRef} trackRef={trackRef} />
      <IaSection />
      <CompetenciasSection />
      <CarreiraSection />
      <ContatoSection />
    </main>
  );
}
