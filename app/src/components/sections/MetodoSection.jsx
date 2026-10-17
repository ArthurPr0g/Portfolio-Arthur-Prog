import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import "./MetodoSection.css";

export default function MetodoSection({ timelineRef, trackRef }) {
  const { t, content } = useLang();
  const { ETAPAS } = content;
  const etapa = t("Etapa", "Step");
  return (
    <section id="metodo" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Metodologia", "Methodology")}
        </Reveal>
        <Reveal as="h2" className="heading-lg metodo-heading">
          {t("Um processo claro para levar cada ideia até produção.", "A clear process to take every idea all the way to production.")}
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          {t(
            "Cada etapa gera valor por si só e prepara a próxima. Nada de teatro de processo.",
            "Every step delivers value on its own and sets up the next one. No process theater."
          )}
        </Reveal>

        <div ref={timelineRef} className="metodo-timeline">
          <div className="metodo-timeline__rail" />
          <div ref={trackRef} className="metodo-timeline__track" />
          {ETAPAS.map((e) => (
            <div key={e.num} className="metodo-row">
              <div className="metodo-row__side metodo-row__side--left">
                {e.isLeft && (
                  <Reveal as="div" direction="left" tilt className="metodo-card">
                    <p className="metodo-card__num">{etapa} {e.num}</p>
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
                    <p className="metodo-card__num">{etapa} {e.num}</p>
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
