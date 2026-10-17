import Reveal from "../Reveal";
import { useLang } from "../../i18n";
import "./ProjetosSection.css";

export default function ProjetosSection({ onOpenProject }) {
  const { t, content, link } = useLang();
  const { PROJECTS } = content;
  return (
    <section id="projetos" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Projetos", "Projects")}
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 680 }}>
          {t("Produtos, sistemas e sites que já saíram do papel.", "Products, systems and websites that made it off the drawing board.")}
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          {t(
            "Clique em qualquer projeto para ver o case completo, com galeria e detalhes.",
            "Click any project to see the full case study, with gallery and details."
          )}
        </Reveal>

        <div className="projetos-grid">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.slug}
              as="a"
              href={link("project", p.slug)}
              onClick={onOpenProject(p.slug)}
              tilt
              delay={Math.min(i, 7) * 70}
              className="project-card"
            >
              <span className="project-card__media">
                <img src={p.cover} alt={p.title} loading="lazy" className="project-card__img" />
              </span>
              <span className="project-card__body">
                <span className="project-card__meta">{p.meta}</span>
                <span className="project-card__title">{p.title}</span>
                <span className="project-card__desc">{p.desc}</span>
                <span className="project-card__cta">
                  {t("Ver case completo", "View full case study")} <span>→</span>
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
