import Reveal from "../Reveal";
import { CARREIRA } from "../../data/content";
import "./CarreiraSection.css";

export default function CarreiraSection() {
  return (
    <section className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Carreira
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 620 }}>
          Uma trajetória construída em cima de dados, processo e produto.
        </Reveal>
        <div className="carreira-grid">
          {CARREIRA.map((c, i) => (
            <Reveal as="div" key={c.num} tilt delay={Math.min(i, 7) * 70} className="carreira-card">
              <div className="carreira-card__head">
                <span className="carreira-card__num">{c.num}</span>
                <span className="carreira-card__year">{c.year}</span>
              </div>
              <h3 className="carreira-card__role">{c.role}</h3>
              <p className="carreira-card__desc">{c.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
