import Reveal from "../Reveal";
import { COMPETENCIAS } from "../../data/content";
import "./CompetenciasSection.css";

export default function CompetenciasSection() {
  return (
    <section className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Competências
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 580 }}>
          Produto, desenvolvimento e design em um só profissional.
        </Reveal>
        <div className="comp-grid">
          {COMPETENCIAS.map((c, i) => (
            <Reveal as="div" key={c.area} delay={Math.min(i, 7) * 70} className="comp-card">
              <div className="comp-card__head">
                <span className="comp-card__bar" />
                <h3 className="comp-card__title">{c.area}</h3>
              </div>
              <div className="comp-card__items">
                {c.items.map((it) => (
                  <span key={it} className="comp-chip">
                    {it}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
