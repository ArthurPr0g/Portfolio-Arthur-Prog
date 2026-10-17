import { WHATSAPP_NUMBER } from "../data/content";
import { useLang } from "../i18n";
import "./Hero.css";

export default function Hero({ heroRef, onSection }) {
  const { lang, t } = useLang();
  return (
    <section id="top" className="hero">
      <div ref={heroRef} className="hero__inner">
        <div className="hero__badge">
          <span className="hero__dot" />
          <span>{t("Da ideia ao produto — disponível para novos projetos", "From idea to product — available for new projects")}</span>
        </div>

        <h1 className="hero__title" translate="no">
          <span className="hero__title-mask">
            <span className="hero__title-line hero__title-line--strong">Arthur</span>
          </span>
          <span className="hero__title-mask">
            <span className="hero__title-line hero__title-line--soft">Prog</span>
          </span>
        </h1>

        <p className="hero__role">
          {t(
            "Product Owner • Desenvolvedor • Designer • Especialista em IA",
            "Product Owner • Developer • Designer • AI Specialist"
          )}
        </p>
        <p className="hero__desc">
          {t(
            "Transformo ideias em produtos digitais completos utilizando estratégia, design, desenvolvimento e Inteligência Artificial.",
            "I turn ideas into complete digital products through strategy, design, development and Artificial Intelligence."
          )}
        </p>

        <div className="hero__actions">
          <a href="#projetos" onClick={onSection("projetos")} className="btn btn-solid">
            {t("Conheça meus projetos", "See my projects")} <span>→</span>
          </a>
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="btn btn-outline">
            {t("Falar no WhatsApp", "Chat on WhatsApp")}
          </a>
          {lang === "pt" && (
            <a href="#/planos" className="btn btn-outline">
              Ver planos e preços
            </a>
          )}
        </div>
      </div>

      <div className="hero__scroll">
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
