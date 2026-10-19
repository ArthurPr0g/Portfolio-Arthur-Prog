import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import "./DepoimentosSection.css";

// Cada depoimento pode ter (em data/content.js): foto (ou logo) em public/,
// link (LinkedIn ou site da empresa) e projeto (slug do case ligado a ele).
export default function DepoimentosSection() {
  const { t, content, link, navigate } = useLang();
  const { DEPOIMENTOS } = content;
  return (
    <section className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Depoimentos", "Testimonials")}
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 540 }}>
          {t("O que dizem os clientes com quem trabalhei.", "What clients I've worked with say.")}
        </Reveal>
        <div className="depo-grid">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal as="figure" key={d.name} tilt delay={Math.min(i, 7) * 70} className="depo-card">
              <span className="depo-card__quote-mark">&ldquo;</span>
              <blockquote className="depo-card__quote">{d.quote}</blockquote>
              <figcaption className="depo-card__author">
                {d.foto ? (
                  <img className="depo-card__avatar depo-card__avatar--foto" src={d.foto} alt={d.name} width="36" height="36" loading="lazy" />
                ) : (
                  <span className="depo-card__avatar">{d.initials}</span>
                )}
                <span className="depo-card__meta">
                  {d.link ? (
                    <a className="depo-card__name" href={d.link} target="_blank" rel="noopener">
                      {d.name} ↗
                    </a>
                  ) : (
                    <span className="depo-card__name">{d.name}</span>
                  )}
                  <span className="depo-card__role">{d.role}</span>
                </span>
                {d.projeto && (
                  <a
                    className="depo-card__case"
                    href={link("project", d.projeto)}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link("project", d.projeto));
                    }}
                  >
                    {t("Ver o projeto", "See the project")} →
                  </a>
                )}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
