import { useState } from "react";
import { useLang } from "../i18n";
import "./Nav.css";

const LINKS = [
  ["construo", "O que construo", "What I build"],
  ["sobre", "Sobre", "About"],
  ["metodo", "Método", "Process"],
  ["projetos", "Projetos", "Projects"],
  ["ia", "IA", "AI"],
  ["contato", "Contato", "Contact"],
];

/** Seletor PT / EN. A escolha fica salva e vale por cima da detecção pelo país. */
function SeletorIdioma({ className = "" }) {
  const { lang, setLang } = useLang();
  return (
    <div className={"nav__lang " + className} role="group" aria-label="Idioma / Language">
      {[
        ["pt", "PT", "Ver em português"],
        ["en", "EN", "View in English"],
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
  const { lang, t } = useLang();
  // Os planos têm preços em reais para clientes do Brasil; em inglês o link some.
  const mostraPlanos = lang === "pt";

  const wrap = (id) => (e) => {
    setOpen(false);
    onSection(id)(e);
  };

  return (
    <header ref={navRef} className="nav">
      <div className="nav__inner container">
        <a href="#top" onClick={wrap("top")} className="nav__brand" translate="no">
          <span className="nav__badge">AP</span>
          <span>Arthur Prog</span>
        </a>
        <nav className="nav__links">
          {LINKS.map(([id, pt, en]) => (
            <a key={id} href={"#" + id} onClick={wrap(id)} className="nav__link">
              {t(pt, en)}
            </a>
          ))}
          {mostraPlanos && (
            <a href="#/planos" onClick={() => setOpen(false)} className="nav__link nav__link--planos">
              Planos
            </a>
          )}
        </nav>
        <SeletorIdioma />
        <a href="#contato" onClick={wrap("contato")} className="btn btn-solid nav__cta">
          {t("Vamos conversar", "Let's talk")}
        </a>
        <button
          type="button"
          className={"nav__toggle" + (open ? " is-open" : "")}
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
        {mostraPlanos && (
          <a href="#/planos" onClick={() => setOpen(false)} className="nav__mobile-link nav__mobile-link--planos">
            Ver planos e preços
          </a>
        )}
      </div>
    </header>
  );
}
