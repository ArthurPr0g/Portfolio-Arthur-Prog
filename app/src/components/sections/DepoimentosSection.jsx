import Reveal from "../Reveal";
import { DEPOIMENTOS } from "../../data/content";
import "./DepoimentosSection.css";

export default function DepoimentosSection() {
  return (
    <section className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Depoimentos
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 540 }}>
          O que dizem quem trabalhou comigo.
        </Reveal>
        <div className="depo-grid">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal as="figure" key={d.name} tilt delay={Math.min(i, 7) * 70} className="depo-card">
              <span className="depo-card__quote-mark">&ldquo;</span>
              <blockquote className="depo-card__quote">{d.quote}</blockquote>
              <figcaption className="depo-card__author">
                <span className="depo-card__avatar">{d.initials}</span>
                <span className="depo-card__meta">
                  <span className="depo-card__name">{d.name}</span>
                  <span className="depo-card__role">{d.role}</span>
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
