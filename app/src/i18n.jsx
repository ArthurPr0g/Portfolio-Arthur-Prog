import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import * as PT from "./data/content";
import { traduzir } from "./data/content.en";
import { adaptarPtPt } from "./data/content.ptpt";
import { paraPtPt } from "./ptpt";
import { caminho, lerRota, rotaDoHash, IDIOMAS } from "./rotas";
import { metaDaRota } from "./seo";

// Idioma e página atual.
//
// O idioma vem do endereço (/pt, /pt-pt ou /en), para o Google indexar todas as
// versões. Quem abre a raiz "/" é mandado para o idioma certo pela Vercel
// (vercel.json): link com ?lang= > escolha salva no seletor (cookie) > país
// (Brasil → /pt, Portugal → /pt-pt, EUA → /en) > idioma do navegador.
//
// t(pt, en): o português de Portugal sai do texto brasileiro pelo conversor ptpt.js.

const CHAVE = "portfolio.idioma";
const LangContext = createContext(null);

const valido = (v) => (IDIOMAS.includes(v) ? v : null);
const CONTEUDO = { pt: PT, en: traduzir(PT), "pt-pt": adaptarPtPt(PT) };

function preferido() {
  try {
    const q = valido(new URLSearchParams(window.location.search).get("lang"));
    if (q) return q;
  } catch {
    /* segue */
  }
  try {
    const salvo = valido(localStorage.getItem(CHAVE));
    if (salvo) return salvo;
  } catch {
    /* segue */
  }
  const nav = navigator.language || "";
  if (/^pt-PT/i.test(nav)) return "pt-pt";
  return /^pt\b/i.test(nav) ? "pt" : "en";
}

/** Rota inicial. Endereços sem idioma (ou com o #/ antigo) viram o endereço novo. */
function rotaInicial() {
  const doEndereco = lerRota(window.location.pathname);
  const doHash = rotaDoHash(window.location.hash);
  const lang = doEndereco?.lang || preferido();
  const rota = doHash ? { lang, ...doHash } : doEndereco || { lang, name: "home", slug: null };
  const certo = caminho(rota.lang, rota.name, rota.slug);
  const secao = !doHash && window.location.hash ? window.location.hash : "";
  // Tira só o ?lang= (já usado); outros parâmetros, como ?currency=, ficam.
  const params = new URLSearchParams(window.location.search);
  const tinhaLang = params.has("lang");
  params.delete("lang");
  const busca = params.toString() ? "?" + params.toString() : "";
  if (window.location.pathname !== certo || doHash || tinhaLang) {
    history.replaceState(null, "", certo + busca + secao);
  }
  return rota;
}

function salvarEscolha(lang) {
  try {
    localStorage.setItem(CHAVE, lang);
  } catch {
    /* sem armazenamento */
  }
  // Cookie lido pela Vercel ao abrir a raiz do site.
  document.cookie = `idioma=${lang}; path=/; max-age=31536000; SameSite=Lax`;
}

function aplicarHead(m) {
  document.documentElement.lang = m.htmlLang;
  document.title = m.title;
  const meta = (sel, attr, val) => document.head.querySelector(sel)?.setAttribute(attr, val);
  meta('meta[name="description"]', "content", m.description);
  meta('link[rel="canonical"]', "href", m.url);
  meta('meta[property="og:title"]', "content", m.title);
  meta('meta[property="og:description"]', "content", m.description);
  meta('meta[property="og:url"]', "content", m.url);
  meta('meta[name="twitter:title"]', "content", m.title);
  meta('meta[name="twitter:description"]', "content", m.description);
}

/**
 * rotaFixa: só no build (scripts/prerender.mjs), que monta o HTML completo de cada
 * página fora do navegador para buscadores e IAs lerem o conteúdo sem JavaScript.
 */
export function LangProvider({ children, rotaFixa = null }) {
  const [route, setRoute] = useState(() => rotaFixa ?? rotaInicial());
  const lang = route.lang;

  useEffect(() => {
    const onPop = () => {
      const r = lerRota(window.location.pathname);
      if (r) setRoute(r);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    aplicarHead(metaDaRota(route.lang, route.name, route.slug));
  }, [route.lang, route.name, route.slug]);

  const navigate = useCallback((path, { replace = false } = {}) => {
    const r = lerRota(path);
    if (!r) return;
    if (replace) history.replaceState(null, "", path);
    else history.pushState(null, "", path);
    setRoute(r);
  }, []);

  const setLang = useCallback(
    (novo) => {
      salvarEscolha(novo);
      if (novo !== route.lang) navigate(caminho(novo, route.name, route.slug), { replace: true });
    },
    [route, navigate]
  );

  const valor = useMemo(() => {
    const content = CONTEUDO[lang];
    const t = (pt, en) => (lang === "en" ? en : lang === "pt-pt" ? paraPtPt(pt) : pt);
    const link = (name = "home", slug = null) => caminho(lang, name, slug);
    return { lang, setLang, t, content, route, navigate, link };
  }, [lang, setLang, route, navigate]);

  return <LangContext.Provider value={valor}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
