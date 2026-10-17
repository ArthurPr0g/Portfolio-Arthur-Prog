// SEO de cada página: título, descrição, endereço canônico, versões em outros
// idiomas (hreflang), imagem de compartilhamento e dados estruturados (JSON-LD).
// Usado no navegador (ao trocar de página) e no build (scripts/prerender.mjs),
// que grava esses dados no HTML de cada endereço.
import * as PT from "./data/content.js";
import { traduzir } from "./data/content.en.js";
import { DADOS_PT } from "./pages/planos/planos.js";
import { DADOS_EN } from "./pages/planos/planos.en.js";
import { SITE, caminho } from "./rotas.js";

const EN = traduzir(PT);
const conteudo = (lang) => (lang === "en" ? EN : PT);

const brl = (v) => "R$ " + v.toLocaleString("pt-BR");
const usd = (v) => "$" + v.toLocaleString("en-US");

const PERFIS = [PT.LINKEDIN_URL, PT.INSTAGRAM_URL];

function pessoa(lang) {
  return {
    "@type": "Person",
    "@id": SITE + "/#arthur",
    name: "Arthur Prog",
    url: SITE + caminho(lang),
    jobTitle: lang === "en" ? "Product Owner, Developer and Designer" : "Product Owner, Desenvolvedor e Designer",
    sameAs: PERFIS,
    knowsAbout: ["Product Management", "UX/UI Design", "React", "TypeScript", "Node.js", "PostgreSQL", "Next.js", "Power BI", "Artificial Intelligence"],
    address: { "@type": "PostalAddress", addressCountry: "BR" },
  };
}

function servico(lang) {
  const en = lang === "en";
  return {
    "@type": "ProfessionalService",
    "@id": SITE + "/#servicos",
    name: "Arthur Prog",
    url: SITE + caminho(lang),
    image: SITE + `/og/og-${lang}.png`,
    description: en
      ? "Websites, online stores and custom business software built from concept to launch."
      : "Sites, lojas virtuais e sistemas de gestão sob medida, do conceito ao lançamento.",
    founder: { "@id": SITE + "/#arthur" },
    areaServed: [{ "@type": "Country", name: "Brazil" }, { "@type": "Country", name: "United States" }],
    availableLanguage: ["Portuguese", "English"],
    telephone: "+" + PT.WHATSAPP_NUMBER,
    sameAs: PERFIS,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
  };
}

function catalogo(lang) {
  const en = lang === "en";
  const D = en ? DADOS_EN : DADOS_PT;
  const moeda = en ? "USD" : "BRL";
  const itens = [...D.PROD.site.p, ...D.PROD.loja.p, ...D.PROD.erp.p, ...D.BRAND];
  return {
    "@type": "OfferCatalog",
    name: en ? "Pricing — Arthur Prog" : "Planos e preços — Arthur Prog",
    url: SITE + caminho(lang, "planos"),
    itemListElement: itens.map((x) => ({
      "@type": "Offer",
      price: x.price,
      priceCurrency: moeda,
      itemOffered: { "@type": "Service", name: x.name, description: x.ideal, provider: { "@id": SITE + "/#servicos" } },
    })),
  };
}

/** Dados de SEO de uma página. `name`: "home" | "planos" | "project". */
export function metaDaRota(lang, name = "home", slug = null) {
  const en = lang === "en";
  const outro = en ? "pt" : "en";
  const c = conteudo(lang);
  const D = en ? DADOS_EN : DADOS_PT;
  const din = en ? usd : brl;
  let title, description, image = `/og/og-${lang}.png`, grafo, h1;

  const projeto = name === "project" ? c.PROJECTS.find((p) => p.slug === slug) : null;
  if (name === "project" && !projeto) name = "home";

  if (name === "planos") {
    const [s, l, g] = [D.PROD.site.p[0].price, D.PROD.loja.p[0].price, D.PROD.erp.p[0].price];
    title = en ? "Pricing: Websites, Online Stores & Business Software | Arthur Prog" : "Planos e preços: sites, lojas virtuais e sistemas | Arthur Prog";
    description = en
      ? `Fixed prices: websites from ${din(s)}, online stores from ${din(l)} and custom business software from ${din(g)}. Pay 50% to start and 50% on delivery.`
      : `Preços fechados: site a partir de ${din(s)}, loja virtual a partir de ${din(l)} e sistema de gestão a partir de ${din(g)}. Faça o quiz e veja o pacote ideal.`;
    h1 = en ? "Pricing" : "Planos e preços";
    grafo = [servico(lang), catalogo(lang)];
  } else if (projeto) {
    title = `${projeto.title} — ${projeto.meta} | Arthur Prog`;
    description = projeto.desc;
    h1 = projeto.title;
    grafo = [
      pessoa(lang),
      {
        "@type": "CreativeWork",
        name: projeto.title,
        description: projeto.desc,
        image: SITE + projeto.cover,
        url: SITE + caminho(lang, "project", projeto.slug),
        creator: { "@id": SITE + "/#arthur" },
        inLanguage: en ? "en" : "pt-BR",
        keywords: projeto.techs.join(", "),
      },
    ];
  } else {
    title = en ? "Arthur Prog | Websites, Online Stores & Custom Software" : "Arthur Prog | Sites, lojas virtuais e sistemas sob medida";
    description = en
      ? "Product owner, developer and designer building websites, online stores and custom business software with AI, from concept to launch. Working remotely with US clients."
      : "Product Owner, desenvolvedor e designer. Crio sites, lojas virtuais e sistemas de gestão sob medida com IA, do conceito ao lançamento, para todo o Brasil.";
    h1 = "Arthur Prog";
    grafo = [
      pessoa(lang),
      servico(lang),
      { "@type": "WebSite", "@id": SITE + "/#site", name: "Arthur Prog", url: SITE, inLanguage: ["pt-BR", "en"], publisher: { "@id": SITE + "/#arthur" } },
    ];
  }

  return {
    lang,
    htmlLang: en ? "en" : "pt-BR",
    ogLocale: en ? "en_US" : "pt_BR",
    ogLocaleAlt: en ? "pt_BR" : "en_US",
    title,
    description,
    h1,
    url: SITE + caminho(lang, name, projeto?.slug),
    alternates: {
      [lang]: SITE + caminho(lang, name, projeto?.slug),
      [outro]: SITE + caminho(outro, name, projeto?.slug),
    },
    image: SITE + image,
    jsonld: { "@context": "https://schema.org", "@graph": grafo },
  };
}

/** Todas as páginas do site, para o build e o sitemap. */
export function todasAsRotas() {
  const rotas = [];
  for (const lang of ["pt", "en"]) {
    rotas.push({ lang, name: "home", slug: null });
    rotas.push({ lang, name: "planos", slug: null });
    for (const p of PT.PROJECTS) rotas.push({ lang, name: "project", slug: p.slug });
  }
  return rotas;
}

const hreflang = { pt: "pt-BR", en: "en" };

/** Tags do <head> em HTML (usado no build). */
export function headHtml(m) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    ...Object.entries(m.alternates).map(([l, u]) => `<link rel="alternate" hreflang="${hreflang[l]}" href="${u}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Arthur Prog" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${m.ogLocaleAlt}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<script type="application/ld+json">${JSON.stringify(m.jsonld).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
