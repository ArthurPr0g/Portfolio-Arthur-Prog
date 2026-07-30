import Reveal from "../Reveal";
import { useCountUp } from "../../hooks/useCountUp";
import { STATS } from "../../data/content";
import "./StatsSection.css";

export default function StatsSection() {
  const [sectionRef, values] = useCountUp(STATS.map((s) => s.target));

  return (
    <section ref={sectionRef} className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Números
        </Reveal>
        <Reveal as="h2" className="heading-lg">
          Produto entregue, não teórico.
        </Reveal>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="stats-cell">
              <div className="stats-cell__value">
                {values[i]}
                {s.suffix}
              </div>
              <div className="stats-cell__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
