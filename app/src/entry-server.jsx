// Montagem das páginas fora do navegador, só no build (scripts/prerender.mjs): o
// HTML de cada página já sai com todo o conteúdo (textos, cases, preços), para o
// Google, o Bing e as buscas com IA lerem sem rodar JavaScript. No navegador o
// React monta de novo por cima (main.jsx), com os efeitos e animações.
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { LangProvider } from "./i18n.jsx";

export function render(lang, name, slug = null) {
  return renderToString(
    <LangProvider rotaFixa={{ lang, name, slug }}>
      <App />
    </LangProvider>
  );
}
