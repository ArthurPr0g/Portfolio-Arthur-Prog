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
      <Hero heroRef={heroRef} onSection={onSection} />
      <Marquee />
      <ConstruoSection />
      <SobreSection />
      <MetodoSection timelineRef={timelineRef} trackRef={trackRef} />
      <ProjetosSection onOpenProject={onOpenProject} />
      <IaSection />
      <CompetenciasSection />
      <CarreiraSection />
      <StatsSection />
      <DepoimentosSection />
      <ContatoSection />
    </main>
  );
}
