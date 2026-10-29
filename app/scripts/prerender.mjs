// Roda depois do `vite build`: grava um HTML por página (/pt, /en, planos,
// pricing e cada projeto nos dois idiomas) com título, descrição, canonical,
// hreflang, imagem de compartilhamento e JSON-LD próprios. Assim o Google e as
// prévias de link (WhatsApp, LinkedIn) leem cada página certa, sem depender do
// JavaScript. Também gera sitemap.xml e robots.txt.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { metaDaRota, todasAsRotas, headHtml, HREFLANG } from "../src/seo.js";
import { SITE, caminho } from "../src/rotas.js";
// Pacote de servidor (vite build --ssr src/entry-server.jsx): o HTML de cada página
// sai com todo o conteúdo, para buscadores e IAs lerem sem rodar JavaScript.
const { render } = await import(new URL("../dist-ssr/entry-server.js", import.meta.url).href);

const dist = fileURLToPath(new URL("../dist/", import.meta.url));
const base = fs.readFileSync(path.join(dist, "index.html"), "utf8");
if (!/<!-- seo:inicio[\s\S]*?<!-- seo:fim -->/.test(base)) throw new Error("index.html sem os marcadores seo:inicio/seo:fim");


function pagina(m, corpo) {
  return base
    .replace(/<html lang="[^"]*">/, `<html lang="${m.htmlLang}">`)
    .replace(/<!-- seo:inicio[\s\S]*?<!-- seo:fim -->/, headHtml(m))
    .replace('<div id="root"></div>', `<div id="root">${corpo}</div>`);
}

const rotas = todasAsRotas();
for (const r of rotas) {
  const m = metaDaRota(r.lang, r.name, r.slug);
  const dir = path.join(dist, caminho(r.lang, r.name, r.slug));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pagina(m, render(r.lang, r.name, r.slug)));
}
// A raiz só redireciona na Vercel (vercel.json); o HTML dela é o da home em português.
fs.writeFileSync(path.join(dist, "index.html"), pagina(metaDaRota("pt", "home"), render("pt", "home")));

// Sitemap com as duas versões de cada página ligadas entre si.
const hoje = new Date().toISOString().slice(0, 10);
const hreflang = HREFLANG;
const urls = rotas.map((r) => {
  const m = metaDaRota(r.lang, r.name, r.slug);
  const alt = Object.entries(m.alternates)
    .map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${hreflang[l]}" href="${u}"/>`)
    .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}/"/>`)
    .join("\n");
  const prioridade = r.name === "home" ? "1.0" : r.name === "planos" ? "0.9" : "0.7";
  return `  <url>\n    <loc>${m.url}</loc>\n    <lastmod>${hoje}</lastmod>\n    <priority>${prioridade}</priority>\n${alt}\n  </url>`;
});
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join("\n")}\n</urlset>\n`
);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`prerender: ${rotas.length} páginas + sitemap.xml + robots.txt`);
