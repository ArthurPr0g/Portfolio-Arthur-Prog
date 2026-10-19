import { useEffect } from "react";
import Reveal from "../components/Reveal";
import BeforeAfter from "../components/BeforeAfter";
import { useTilt } from "../hooks/useTilt";
import { WHATSAPP_NUMBER } from "../data/content";
import { RESULTADOS } from "../data/resultados";
import { paraPtPt } from "../ptpt";
import { useLang } from "../i18n";
import "./ProjectPage.css";

// Números de exemplo só aparecem com ?rascunho=1 no endereço (ver data/resultados.js).
const rascunho = () => {
  try {
    return new URLSearchParams(window.location.search).has("rascunho");
  } catch {
    return false;
  }
};

function Numeros({ slug, lang }) {
  const mostrarExemplos = rascunho();
  const itens = (RESULTADOS[slug] || []).filter((r) => mostrarExemplos || !r.exemplo);
  if (!itens.length) return null;
  const txt = (o) => (lang === "en" ? o.en : lang === "pt-pt" ? paraPtPt(o.pt) : o.pt);
  return (
    <div className="project-page__numbers">
      {itens.map((r, i) => (
        <Reveal as="div" key={i} delay={i * 70} className={"project-page__number" + (r.exemplo ? " is-exemplo" : "")}>
          <span className="project-page__number-value">{txt(r.valor)}</span>
          <span className="project-page__number-label">{txt(r.rotulo)}</span>
          {r.exemplo && <span className="project-page__number-tag">exemplo</span>}
        </Reveal>
      ))}
    </div>
  );
}

function GalleryItem({ item, index, onZoom }) {
  const tiltRef = useTilt();
  return (
    <Reveal as="figure" delay={Math.min(index, 7) * 60} className="project-page__gallery-item">
      <button ref={tiltRef} onClick={() => onZoom(item.src)} className="project-page__gallery-btn">
        <img src={item.src} alt={item.caption} loading="lazy" />
      </button>
      <figcaption>{item.caption}</figcaption>
    </Reveal>
  );
}

export default function ProjectPage({ project, nextProject, onSection, onOpenProject, onZoom }) {
  const { t, link, lang } = useLang();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  return (
    <main className="project-page">
      <article className="project-page__inner container">
        <a href={link("home") + "#projetos"} onClick={onSection("projetos")} className="project-page__back">
          <span>←</span> {t("Todos os projetos", "All projects")}
        </a>

        <p className="project-page__meta">{project.meta}</p>
        <h1 className="project-page__title">{project.title}</h1>
        <p className="project-page__desc">{project.desc}</p>

        <div className="project-page__actions">
          {project.linkUrl && (
            <a href={project.linkUrl} target="_blank" rel="noopener" className="btn btn-solid">
              {project.linkLabel} <span>↗</span>
            </a>
          )}
          {project.restrito && (
            <span className="project-page__restrito">{t("Sistema interno — acesso restrito", "Internal system — restricted access")}</span>
          )}
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="btn btn-outline">
            {t("Quero algo assim", "I want something like this")}
          </a>
        </div>

        <Numeros slug={project.slug} lang={lang} />

        {project.beforeAfter ? (
          <BeforeAfter key={project.slug} pairs={project.beforeAfter} />
        ) : (
          <button onClick={() => onZoom(project.cover)} className="project-page__cover">
            <img src={project.cover} alt={project.title} />
          </button>
        )}

        <div className="project-page__pair">
          <Reveal as="div" className="project-page__block">
            <h2>{t("Problema", "Problem")}</h2>
            <p>{project.problema}</p>
          </Reveal>
          <Reveal as="div" delay={70} className="project-page__block">
            <h2>{t("Solução", "Solution")}</h2>
            <p>{project.solucao}</p>
          </Reveal>
        </div>

        <Reveal as="div" className="project-page__block">
          <h2>{t("Tecnologias", "Technologies")}</h2>
          <div className="project-page__techs">
            {project.techs.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal as="div" className="project-page__block project-page__block--result">
          <h2>{t("Resultado", "Result")}</h2>
          <p>{project.resultado}</p>
        </Reveal>

        <div className="project-page__section">
          <Reveal as="h2" className="project-page__section-title">
            {t("Processo de desenvolvimento", "Development process")}
          </Reveal>
          <div className="project-page__process">
            {project.processo.map((step, i) => (
              <Reveal as="div" key={i} delay={Math.min(i, 7) * 60} className="project-page__step">
                <span className="project-page__step-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="project-page__step-text">{step}</span>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="project-page__section">
          <Reveal as="h2" className="project-page__section-title">
            {t("Galeria", "Gallery")}
          </Reveal>
          <Reveal as="p" className="project-page__gallery-hint">
            {t("Clique em qualquer imagem para ampliar.", "Click any image to enlarge it.")}
          </Reveal>
          <div className="project-page__gallery">
            {project.gallery.map((g, i) => (
              <GalleryItem key={i} item={g} index={i} onZoom={onZoom} />
            ))}
          </div>
        </div>

        {nextProject && (
          <Reveal
            as="a"
            href={link("project", nextProject.slug)}
            onClick={onOpenProject(nextProject.slug)}
            className="project-page__next"
          >
            <span className="project-page__next-meta">
              <span className="project-page__next-label">{t("Próximo projeto", "Next project")}</span>
              <span className="project-page__next-title">{nextProject.title}</span>
            </span>
            <span className="project-page__next-arrow">→</span>
          </Reveal>
        )}
      </article>
    </main>
  );
}
