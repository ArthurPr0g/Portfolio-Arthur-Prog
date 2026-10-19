// Endereços do site. Cada idioma tem os seus, para o Google indexar todos:
//   /pt, /pt/planos, /pt/projetos/<slug>          (português do Brasil, reais)
//   /pt-pt, /pt-pt/planos, /pt-pt/projetos/<slug>  (português de Portugal, euros)
//   /en, /en/pricing, /en/projects/<slug>          (inglês, dólar ou euro)
// A raiz "/" só redireciona (vercel.json): Brasil → /pt, Portugal → /pt-pt, EUA → /en.
// Arquivo sem dependência do navegador: o script de build também usa.

export const SITE = "https://portfolio-arthur-prog.vercel.app";
export const IDIOMAS = ["pt", "pt-pt", "en"];

const SEG = {
  pt: { planos: "planos", projetos: "projetos" },
  "pt-pt": { planos: "planos", projetos: "projetos" },
  en: { planos: "pricing", projetos: "projects" },
};

export function caminho(lang, name = "home", slug = null) {
  if (name === "planos") return `/${lang}/${SEG[lang].planos}`;
  if (name === "project" && slug) return `/${lang}/${SEG[lang].projetos}/${slug}`;
  return `/${lang}`;
}

/** Endereços antigos (#/planos e #/projetos/<slug>), usados antes dos idiomas. */
export function rotaDoHash(hash = "") {
  const m = hash.match(/^#\/projetos\/([a-z0-9-]+)/i);
  if (m) return { name: "project", slug: m[1] };
  if (/^#\/planos\/?$/i.test(hash)) return { name: "planos", slug: null };
  return null;
}

/** Lê o endereço. Devolve null quando ele não diz o idioma (raiz ou desconhecido). */
export function lerRota(pathname) {
  const p = pathname.replace(/\/+$/, "");
  const m = p.match(/^\/(pt-pt|pt|en)(?:\/(.*))?$/);
  if (!m) return null;
  const lang = m[1];
  const partes = (m[2] || "").split("/").filter(Boolean);
  if (partes[0] === SEG[lang].planos && partes.length === 1) return { lang, name: "planos", slug: null };
  if (partes[0] === SEG[lang].projetos && partes[1]) return { lang, name: "project", slug: partes[1] };
  return { lang, name: "home", slug: null };
}
