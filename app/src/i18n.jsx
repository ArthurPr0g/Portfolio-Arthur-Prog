import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as PT from "./data/content";
import { traduzir } from "./data/content.en";

// Idioma do site: português ou inglês.
//
// Ordem de decisão:
// 1. ?lang=en ou ?lang=pt no link (para mandar o link já no idioma certo);
// 2. escolha feita no seletor PT/EN (fica salva neste navegador);
// 3. país do visitante pelo IP (Estados Unidos → inglês, Brasil → português);
// 4. idioma do navegador (português → português; qualquer outro → inglês).

const CHAVE = "portfolio.idioma";
const LangContext = createContext(null);

const valido = (v) => (v === "pt" || v === "en" ? v : null);

function lerSalvo() {
  try {
    return valido(localStorage.getItem(CHAVE));
  } catch {
    return null;
  }
}

function doLink() {
  try {
    return valido(new URLSearchParams(window.location.search).get("lang"));
  } catch {
    return null;
  }
}

const doNavegador = () => (/^pt\b/i.test(navigator.language || "") ? "pt" : "en");

export function LangProvider({ children }) {
  const fixo = doLink() || lerSalvo();
  const [lang, setLangState] = useState(fixo || doNavegador());

  useEffect(() => {
    if (fixo) return;
    let cancelado = false;
    fetch("/api/pais")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelado || !d?.pais) return;
        if (d.pais === "US") setLangState("en");
        else if (d.pais === "BR") setLangState("pt");
      })
      .catch(() => {});
    return () => {
      cancelado = true;
    };
  }, [fixo]);

  useEffect(() => {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    document.title =
      lang === "en"
        ? "Arthur Prog — Product Owner, Developer, Designer, AI"
        : "Arthur Prog — Product Owner, Desenvolvedor, Designer, IA";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        lang === "en"
          ? "I turn ideas into complete digital products through strategy, design, development and Artificial Intelligence."
          : "Transformo ideias em produtos digitais completos utilizando estratégia, design, desenvolvimento e Inteligência Artificial."
      );
  }, [lang]);

  const setLang = useCallback((novo) => {
    setLangState(novo);
    // Tira o ?lang= do endereço para a escolha manual valer ao recarregar.
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has("lang")) {
        url.searchParams.delete("lang");
        history.replaceState(history.state, "", url.pathname + url.search + url.hash);
      }
    } catch {
      /* sem acesso ao histórico: segue só com o estado */
    }
    try {
      localStorage.setItem(CHAVE, novo);
    } catch {
      /* navegador sem armazenamento: vale só nesta visita */
    }
  }, []);

  const valor = useMemo(() => {
    const content = lang === "en" ? traduzir(PT) : PT;
    const t = (pt, en) => (lang === "en" ? en : pt);
    return { lang, setLang, t, content };
  }, [lang, setLang]);

  return <LangContext.Provider value={valor}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
