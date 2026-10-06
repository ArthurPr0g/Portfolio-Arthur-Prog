import { WHATSAPP_NUMBER } from "../data/content";
import "./Hero.css";

export default function Hero({ heroRef, onSection }) {
  return (
    <section id="top" className="hero">
      <div ref={heroRef} className="hero__inner">
        <div className="hero__badge">
          <span className="hero__dot" />
          <span>Da ideia ao produto — disponível para novos projetos</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__title-mask">
            <span className="hero__title-line hero__title-line--strong">Arthur</span>
          </span>
          <span className="hero__title-mask">
            <span className="hero__title-line hero__title-line--soft">Prog</span>
          </span>
        </h1>

        <p className="hero__role">Product Owner • Desenvolvedor • Designer • Especialista em IA</p>
        <p className="hero__desc">
          Transformo ideias em produtos digitais completos utilizando estratégia, design, desenvolvimento e
          Inteligência Artificial.
        </p>

        <div className="hero__actions">
          <a href="#projetos" onClick={onSection("projetos")} className="btn btn-solid">
            Conheça meus projetos <span>→</span>
          </a>
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="btn btn-outline">
            Falar no WhatsApp
          </a>
          <a href="/planos/" className="btn btn-outline">
            Ver planos e preços
          </a>
        </div>
      </div>

      <div className="hero__scroll">
        <span>SCROLL</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
