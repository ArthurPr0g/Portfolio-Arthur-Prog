import Reveal from "../Reveal";
import { PIPELINE } from "../../data/content";
import "./ConstruoSection.css";

export default function ConstruoSection() {
  return (
    <section id="construo" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          O que eu construo
        </Reveal>
        <div className="pipeline-grid">
          {PIPELINE.map((p, i) => (
            <Reveal as="div" key={p.label} tilt delay={Math.min(i, 7) * 70} className="pipeline-card">
              <span className="pipeline-card__icon">{p.icon}</span>
              <span className="pipeline-card__label">{p.label}</span>
            </Reveal>
          ))}
        </div>
        <Reveal as="p" className="construo-tagline">
          Eu não entrego apenas código ou documentos. Eu construo{" "}
          <span className="shine-text">produtos digitais completos</span>, do conceito ao lançamento.
        </Reveal>
      </div>
    </section>
  );
}
