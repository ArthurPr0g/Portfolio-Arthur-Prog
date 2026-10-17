import { useEffect, useRef } from "react";
import htmlPt from "./planos/planos.html?raw";
import htmlEn from "./planos/planos.en.html?raw";
import css from "./planos/planos.css?raw";
import { initPlanos } from "./planos/planos.js";

// A página de planos foi feita como HTML + JS independente. Ela é montada num
// shadow root para manter o CSS isolado do portfólio; menu, rodapé, favicon e
// botão de WhatsApp continuam sendo os do portfólio. Título e SEO vêm de seo.js.
// Em português: preços em reais. Em inglês: tabela em dólar para os EUA.
export default function PlanosPage({ lang = "pt" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${css}</style>${lang === "en" ? htmlEn : htmlPt}`;
    initPlanos(root, lang);
  }, [lang]);

  return <main ref={hostRef} />;
}
