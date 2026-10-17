// Endereços do site. Cada idioma tem os seus, para o Google indexar os dois:
//   /pt, /pt/planos, /pt/projetos/<slug>
//   /en, /en/pricing, /en/projects/<slug>
// A raiz "/" só redireciona (vercel.json): EUA → /en, Brasil → /pt.
// Arquivo sem dependência do navegador: o script de build também usa.

export const SITE = "https://portfolio-arthur-prog.vercel.app";
export const IDIOMAS = ["pt", "en"];

const SEG = {
  pt: { planos: "planos", projetos: "projetos" },
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
  const m = p.match(/^\/(pt|en)(?:\/(.*))?$/);
  if (!m) return null;
  const lang = m[1];
  const partes = (m[2] || "").split("/").filter(Boolean);
  if (partes[0] === SEG[lang].planos && partes.length === 1) return { lang, name: "planos", slug: null };
  if (partes[0] === SEG[lang].projetos && partes[1]) return { lang, name: "project", slug: partes[1] };
  return { lang, name: "home", slug: null };
}
