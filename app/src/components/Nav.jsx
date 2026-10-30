import { useState } from "react";
import { useLang } from "../i18n";
import ProgMark from "../brand/ProgMark";
import ProgWordmark from "../brand/ProgWordmark";
import "./Nav.css";

// Lockup horizontal (docs/01-identidade.md): caixa de 32 px = símbolo visível de
// 24 px (H); texto 0,857·H e 0,393·H entre o símbolo e o texto (ver Nav.css).
const LOGO_CAIXA = 32;
const LOGO_TEXTO = 20.5;

const LINKS = [
  ["projetos", "Projetos", "Projects"],
  ["sobre", "Sobre", "About"],
  ["construo", "O que construo", "What I build"],
  ["metodo", "Método", "Process"],
  ["contato", "Contato", "Contact"],
];

/** Seletor BR / PT / EN. A escolha fica salva e vale por cima da detecção pelo país. */
function SeletorIdioma({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={"nav__lang " + className} role="group" aria-label="Idioma / Language" data-ps="nav-item" data-ps-i="6">
      {[
        ["pt", "BR", "Português do Brasil (preços em reais)"],
        ["pt-pt", "PT", "Português de Portugal (preços em euros)"],
        ["en", "EN", "English (USD / EUR)"],
      ].map(([id, rotulo, titulo]) => (
        <button
          key={id}
          type="button"
          title={titulo}
          aria-pressed={lang === id}
          className={"nav__lang-btn" + (lang === id ? " is-active" : "")}
          onClick={() => setLang(id)}
        >
          {rotulo}
        </button>
      ))}
    </div>
  );
}

export default function Nav({ navRef, onSection }) {
  const [open, setOpen] = useState(false);
  const { t, link, navigate } = useLang();
  const planosHref = link("planos");
  const abrirPlanos = (e) => {
    e.preventDefault();
    setOpen(false);
    navigate(planosHref);
  };

  const wrap = (id) => (e) => {
    setOpen(false);
    onSection(id)(e);
  };

  return (
    <header ref={navRef} className="nav">
      <div className="nav__inner container">
        <a href={link("home")} onClick={wrap("top")} className="nav__brand" translate="no" aria-label="Prog Soluções">
          <ProgMark s={LOGO_CAIXA} className="nav__mark" data-ps="logo-mark" />
          <ProgWordmark size={LOGO_TEXTO} className="nav__word" data-ps="logo-word" />
        </a>
        <nav className="nav__links">
          {LINKS.map(([id, pt, en], i) => (
            <a key={id} href={"#" + id} onClick={wrap(id)} className="nav__link" data-ps="nav-item" data-ps-i={i}>
              {t(pt, en)}
            </a>
          ))}
          <a href={planosHref} onClick={abrirPlanos} className="nav__link nav__link--planos" data-ps="nav-item" data-ps-i="5">
            {t("Planos", "Pricing")}
          </a>
        </nav>
        <SeletorIdioma />
        <a href="#contato" onClick={wrap("contato")} className="btn btn-solid nav__cta" data-ps="nav-item" data-ps-i="6">
          {t("Vamos conversar", "Let's talk")}
        </a>
        <button
          type="button"
          className={"nav__toggle" + (open ? " is-open" : "")}
          data-ps="nav-menu"
          aria-label={t("Abrir menu", "Open menu")}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={"nav__mobile" + (open ? " is-open" : "")}>
        {LINKS.map(([id, pt, en]) => (
          <a key={id} href={"#" + id} onClick={wrap(id)} className="nav__mobile-link">
            {t(pt, en)}
          </a>
        ))}
        <a href={planosHref} onClick={abrirPlanos} className="nav__mobile-link nav__mobile-link--planos">
          {t("Ver planos e preços", "See pricing")}
        </a>
      </div>
    </header>
  );
}
