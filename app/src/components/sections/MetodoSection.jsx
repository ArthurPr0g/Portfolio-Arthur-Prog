import Reveal from "../Reveal";
import { ETAPAS } from "../../data/content";
import "./MetodoSection.css";

export default function MetodoSection({ timelineRef, trackRef }) {
  return (
    <section id="metodo" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Metodologia
        </Reveal>
        <Reveal as="h2" className="heading-lg metodo-heading">
          Um processo claro para levar cada ideia até produção.
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          Cada etapa gera valor por si só e prepara a próxima. Nada de teatro de processo.
        </Reveal>

        <div ref={timelineRef} className="metodo-timeline">
          <div className="metodo-timeline__rail" />
          <div ref={trackRef} className="metodo-timeline__track" />
          {ETAPAS.map((e) => (
            <div key={e.num} className="metodo-row">
              <div className="metodo-row__side metodo-row__side--left">
                {e.isLeft && (
                  <Reveal as="div" direction="left" tilt className="metodo-card">
                    <p className="metodo-card__num">Etapa {e.num}</p>
                    <h3 className="metodo-card__title">{e.title}</h3>
                    <p className="metodo-card__desc">{e.desc}</p>
                  </Reveal>
                )}
              </div>
              <div className="metodo-row__dot-col">
                <Reveal as="span" className="metodo-dot" />
              </div>
              <div className="metodo-row__side metodo-row__side--right">
                {e.isRight && (
                  <Reveal as="div" direction="right" tilt className="metodo-card">
                    <p className="metodo-card__num">Etapa {e.num}</p>
                    <h3 className="metodo-card__title">{e.title}</h3>
                    <p className="metodo-card__desc">{e.desc}</p>
                  </Reveal>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
