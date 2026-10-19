import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import { Icone, ICONES_PIPELINE } from "../Icones";
import "./ConstruoSection.css";

export default function ConstruoSection() {
  const { lang, t, content } = useLang();
  const { PIPELINE } = content;
  return (
    <section id="construo" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("O que eu construo", "What I build")}
        </Reveal>
        <div className="pipeline-grid">
          {PIPELINE.map((p, i) => (
            <Reveal as="div" key={p.label} tilt delay={Math.min(i, 7) * 70} className="pipeline-card">
              <span className="pipeline-card__icon"><Icone nome={ICONES_PIPELINE[i]} /></span>
              <span className="pipeline-card__label">{p.label}</span>
            </Reveal>
          ))}
        </div>
        {lang === "en" ? (
          <Reveal as="p" className="construo-tagline">
            I don't just deliver code or documents. I build{" "}
            <span className="shine-text">complete digital products</span>, from concept to launch.
          </Reveal>
        ) : (
          <Reveal as="p" className="construo-tagline">
            Eu não entrego apenas código ou documentos. Eu construo{" "}
            <span className="shine-text">produtos digitais completos</span>, do conceito ao lançamento.
          </Reveal>
        )}
      </div>
    </section>
  );
}
