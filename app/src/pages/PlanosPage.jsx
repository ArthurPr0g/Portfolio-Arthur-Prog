import { useEffect, useRef } from "react";
import html from "./planos/planos.html?raw";
import css from "./planos/planos.css?raw";
import { initPlanos } from "./planos/planos.js";

// A página de planos foi feita como HTML + JS independente. Ela é montada num
// shadow root para manter o CSS isolado do portfólio; menu, rodapé, favicon e
// botão de WhatsApp continuam sendo os do portfólio.
export default function PlanosPage() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${css}</style>${html}`;
    initPlanos(root);

    const previousTitle = document.title;
    document.title = "Planos e preços — Arthur Prog";
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return <main ref={hostRef} />;
}
