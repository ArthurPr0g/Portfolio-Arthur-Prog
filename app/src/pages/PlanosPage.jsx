import { useCallback, useEffect, useRef, useState } from "react";
import htmlPt from "./planos/planos.html?raw";
import htmlEn from "./planos/planos.en.html?raw";
import css from "./planos/planos.css?raw";
import { initPlanos } from "./planos/planos.js";

// A página de planos foi feita como HTML + JS independente. Ela é montada num
// shadow root para manter o CSS isolado do portfólio; menu, rodapé, favicon e
// botão de WhatsApp continuam sendo os do portfólio. Título e SEO vêm de seo.js.
// Em português: preços em reais. Em inglês: dólar (EUA) ou euro (Europa).
//
// Moeda em inglês: ?currency=eur|usd no link > escolha salva no seletor > país
// do visitante (Europa → euro) > dólar.

const CHAVE = "portfolio.moeda";
// União Europeia, EEE, Suíça, Reino Unido e demais países europeus.
const EUROPA = new Set("AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO CH GB AD MC SM VA ME AL BA MK RS MD UA XK".split(" "));

const valida = (v) => (v === "usd" || v === "eur" ? v : null);

function moedaEscolhida() {
  try {
    const q = valida(new URLSearchParams(window.location.search).get("currency"));
    if (q) return q;
  } catch {
    /* segue */
  }
  try {
    return valida(localStorage.getItem(CHAVE));
  } catch {
    return null;
  }
}

export default function PlanosPage({ lang = "pt" }) {
  const hostRef = useRef(null);
  const [moeda, setMoeda] = useState(() => moedaEscolhida() || "usd");

  // Sem escolha feita, a moeda segue o país do visitante.
  useEffect(() => {
    if (lang !== "en" || moedaEscolhida()) return;
    let cancelado = false;
    fetch("/api/pais")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelado && d?.pais && EUROPA.has(d.pais)) setMoeda("eur");
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, [lang]);

  const trocarMoeda = useCallback((m) => {
    setMoeda(m);
    try {
      localStorage.setItem(CHAVE, m);
    } catch {
      /* sem armazenamento: vale só nesta visita */
    }
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const root = host.shadowRoot ?? host.attachShadow({ mode: "open" });
    root.innerHTML = `<style>${css}</style>${lang === "en" ? htmlEn : htmlPt}`;
    initPlanos(root, lang, { moeda, aoTrocarMoeda: trocarMoeda });
  }, [lang, moeda, trocarMoeda]);

  return <main ref={hostRef} />;
}
