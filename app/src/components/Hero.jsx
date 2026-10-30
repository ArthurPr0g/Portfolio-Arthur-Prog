import { useEffect, useState } from "react";
import { waLink, FOTO, FOTO_ASSENTO, FOTO_PROPORCAO } from "../data/content";
import { useLang } from "../i18n";
import "./Hero.css";

// Topo: frase de valor à esquerda; à direita o Arthur sentado em cima de uma
// janela de navegador que alterna entre telas reais dos projetos (clicável).
const TELAS = [
  { slug: "prog-imports", src: "/assets/progimports-home-hero.webp" },
  { slug: "tecnopallet", src: "/assets/tecnopallet-hero.webp" },
  { slug: "vitaliti", src: "/assets/vitaliti-site-01-topo.webp" },
  { slug: "lumen", src: "/assets/lumen-d02-inicio.webp" },
];
const CLIENTES = ["TecnoPallet", "VitaliTI", "Prog Imports", "Depyl Action"];

// Título com cada palavra numa máscara: o loader da página (brand/loaders/boot.js)
// agrupa as palavras por linha e faz a entrada linha a linha da referência.
// partes: [texto, destaque?]; destaque vira <em> com o gradiente.
function Frase({ partes }) {
  const out = [];
  partes.forEach(([texto, em], pi) =>
    texto.split(" ").filter(Boolean).forEach((w, wi) => {
      if (out.length) out.push(" ");
      const k = pi + "-" + wi;
      out.push(
        em ? (
          <em key={k} className="hero__w" data-ps="hero-w"><span>{w}</span></em>
        ) : (
          <span key={k} className="hero__w" data-ps="hero-w"><span>{w}</span></span>
        )
      );
    })
  );
  return out;
}

export default function Hero({ heroRef, onSection }) {
  const { lang, t, link, navigate, content } = useLang();
  const planosHref = link("planos");
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setAtual((i) => (i + 1) % TELAS.length), 3800);
    return () => clearInterval(id);
  }, []);

  const tela = TELAS[atual];
  const projeto = content.PROJECTS.find((p) => p.slug === tela.slug);
  // Endereço mostrado na barra: o domínio real quando existe; senão, o nome do projeto.
  const endereco = projeto?.linkLabel && projeto.linkLabel.includes(".") ? projeto.linkLabel : projeto?.title;
  const abrir = (e) => {
    e.preventDefault();
    navigate(link("project", tela.slug));
  };

  return (
    <section id="top" className="hero">
      <div ref={heroRef} className="hero__inner container">
        <div className="hero__texto">
          <div className="hero__badge" data-ps="hero-pill">
            <span className="hero__dot" />
            <span>{t("Disponível para novos projetos", "Available for new projects")}</span>
          </div>

          <p className="hero__nome" translate="no" data-ps="hero-pill">
            Arthur Prog
            <span>{t("Product Owner · Desenvolvedor · Designer · IA", "Product Owner · Developer · Designer · AI")}</span>
          </p>

          <h1 className="hero__title">
            {lang === "en" ? (
              <Frase partes={[["Digital products that"], ["sell", true], ["and"], ["organize", true], ["your business."]]} />
            ) : (
              <Frase partes={[["Produtos digitais que"], ["vendem", true], ["e"], ["organizam", true], ["o seu negócio."]]} />
            )}
          </h1>

          <p className="hero__desc" data-ps="hero-cta">
            {t(
              "Sites, lojas virtuais e sistemas de gestão sob medida — estratégia, design, código e IA feitos por uma só pessoa, do primeiro rascunho ao lançamento.",
              "Websites, online stores and custom business software — strategy, design, code and AI from a single person, from the first sketch to launch."
            )}
          </p>

          <div className="hero__actions" data-ps="hero-cta">
            <a href="#projetos" onClick={onSection("projetos")} className="btn btn-solid">
              {t("Ver projetos", "See projects")} <span>→</span>
            </a>
            <a href={waLink(t("Olá! Vim pelo portfólio da Prog Soluções.", "Hi! I found Prog Soluções through the portfolio."))} target="_blank" rel="noopener" className="btn btn-outline">
              {t("Falar no WhatsApp", "Chat on WhatsApp")}
            </a>
            <a
              href={planosHref}
              onClick={(e) => {
                e.preventDefault();
                navigate(planosHref);
              }}
              className="hero__link"
            >
              {t("Planos e preços", "Pricing")} →
            </a>
          </div>

          <div className="hero__clientes" data-ps="hero-cta">
            <span>{t("Projetos para", "Built for")}</span>
            {CLIENTES.map((c) => (
              <strong key={c} translate="no">
                {c}
              </strong>
            ))}
          </div>
        </div>

        {FOTO && (
          <div className="hero__palco" data-ps="hero-cta" style={{ "--assento": FOTO_ASSENTO, "--proporcao": FOTO_PROPORCAO }}>
            <span className="hero__chip hero__chip--a">React · TypeScript</span>
            <span className="hero__chip hero__chip--b">{t("IA no dia a dia", "AI-powered")}</span>
            <span className="hero__chip hero__chip--c">UX / UI</span>

            <a className="hero__janela" href={link("project", tela.slug)} onClick={abrir} aria-label={projeto?.title}>
              <span className="hero__barra">
                <i />
                <i />
                <i />
                <span className="hero__url" translate="no">
                  {endereco}
                </span>
              </span>
              <span className="hero__tela">
                {TELAS.map((tl, i) => (
                  <img key={tl.slug} src={tl.src} alt="" className={i === atual ? "is-on" : ""} loading={i ? "lazy" : "eager"} />
                ))}
              </span>
              <span className="hero__legenda">
                {projeto?.title} <b>→</b>
              </span>
            </a>

            <img className="hero__sentado" src={FOTO} alt="Arthur Prog" width="551" height="1100" fetchPriority="high" />
          </div>
        )}
      </div>
    </section>
  );
}
