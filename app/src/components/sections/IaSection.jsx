import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import "./IaSection.css";

export default function IaSection() {
  const { t, content } = useLang();
  const { FERRAMENTAS } = content;
  return (
    <section id="ia" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Inteligência Artificial", "Artificial Intelligence")}
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 660 }}>
          {t("IA como multiplicador de produtividade — não como substituto.", "AI as a productivity multiplier — not a replacement.")}
        </Reveal>
        <Reveal as="p" delay={40} className="ia-desc">
          {t(
            "Uso IA em desenvolvimento, documentação, design, brainstorming, arquitetura e automações. Continuo sendo o responsável pelas decisões, pela qualidade e pela entrega.",
            "I use AI for development, documentation, design, brainstorming, architecture and automation. I'm still the one responsible for the decisions, the quality and the delivery."
          )}
        </Reveal>
        <div className="ia-grid">
          {FERRAMENTAS.map((f, i) => (
            <Reveal as="div" key={f.name} tilt delay={Math.min(i, 7) * 70} className="ia-card">
              <div className="ia-card__head">
                <span className="ia-card__dot" />
                <h3 className="ia-card__title">{f.name}</h3>
              </div>
              <p className="ia-card__desc">{f.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
