import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import "./DepoimentosSection.css";

export default function DepoimentosSection() {
  const { t, content } = useLang();
  const { DEPOIMENTOS } = content;
  return (
    <section className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Depoimentos", "Testimonials")}
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 540 }}>
          {t("O que dizem quem trabalhou comigo.", "What people who worked with me say.")}
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
