import Reveal from "../Reveal";
import { PROJECTS } from "../../data/content";
import "./ProjetosSection.css";

export default function ProjetosSection({ onOpenProject }) {
  return (
    <section id="projetos" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Projetos
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 680 }}>
          Produtos, sistemas e sites que já saíram do papel.
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          Clique em qualquer projeto para ver o case completo, com galeria e detalhes.
        </Reveal>

        <div className="projetos-grid">
          {PROJECTS.map((p, i) => (
            <Reveal
              key={p.slug}
              as="a"
              href={"#/projetos/" + p.slug}
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
                  Ver case completo <span>→</span>
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
