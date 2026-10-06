import { useState } from "react";
import "./Nav.css";

const LINKS = [
  ["construo", "O que construo"],
  ["sobre", "Sobre"],
  ["metodo", "Método"],
  ["projetos", "Projetos"],
  ["ia", "IA"],
  ["contato", "Contato"],
];

export default function Nav({ navRef, onSection }) {
  const [open, setOpen] = useState(false);

  const wrap = (id) => (e) => {
    setOpen(false);
    onSection(id)(e);
  };

  return (
    <header ref={navRef} className="nav">
      <div className="nav__inner container">
        <a href="#top" onClick={wrap("top")} className="nav__brand">
          <span className="nav__badge">AP</span>
          <span>Arthur Prog</span>
        </a>
        <nav className="nav__links">
          {LINKS.map(([id, label]) => (
            <a key={id} href={"#" + id} onClick={wrap(id)} className="nav__link">
              {label}
            </a>
          ))}
          <a href="/planos/" className="nav__link nav__link--planos">
            Planos
          </a>
        </nav>
        <a href="#contato" onClick={wrap("contato")} className="btn btn-solid nav__cta">
          Vamos conversar
        </a>
        <button
          type="button"
          className={"nav__toggle" + (open ? " is-open" : "")}
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={"nav__mobile" + (open ? " is-open" : "")}>
        {LINKS.map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={wrap(id)} className="nav__mobile-link">
            {label}
          </a>
        ))}
        <a href="/planos/" className="nav__mobile-link nav__mobile-link--planos">
          Ver planos e preços
        </a>
      </div>
    </header>
  );
}
