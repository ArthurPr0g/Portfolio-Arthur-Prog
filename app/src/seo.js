// SEO de cada página: título, descrição, endereço canônico, versões em outros
// idiomas (hreflang), imagem de compartilhamento e dados estruturados (JSON-LD).
// Usado no navegador (ao trocar de página) e no build (scripts/prerender.mjs),
// que grava esses dados no HTML de cada endereço.
// Idiomas: "pt" (Brasil, reais), "pt-pt" (Portugal, euros), "en" (EUA/Europa).
import * as PT from "./data/content.js";
import { traduzir } from "./data/content.en.js";
import { adaptarPtPt } from "./data/content.ptpt.js";
import { DADOS_PT } from "./pages/planos/planos.js";
import { DADOS_EN } from "./pages/planos/planos.en.js";
import { DADOS_PTPT } from "./pages/planos/planos.ptpt.js";
import { SITE, caminho, IDIOMAS } from "./rotas.js";

const CONTEUDO = { pt: PT, en: traduzir(PT), "pt-pt": adaptarPtPt(PT) };
const PLANOS = { pt: DADOS_PT, en: DADOS_EN, "pt-pt": DADOS_PTPT };
const MOEDA = { pt: "BRL", en: "USD", "pt-pt": "EUR" };
const DIN = {
  pt: (v) => "R$ " + v.toLocaleString("pt-BR"),
  en: (v) => "$" + v.toLocaleString("en-US"),
  "pt-pt": (v) => v.toLocaleString("pt-PT") + " €",
};
const HREFLANG = { pt: "pt-BR", "pt-pt": "pt-PT", en: "en" };
const OG_LOCALE = { pt: "pt_BR", "pt-pt": "pt_PT", en: "en_US" };

// Textos por idioma: [Brasil, Portugal, inglês]
const T = (lang, pt, ptpt, en) => (lang === "en" ? en : lang === "pt-pt" ? ptpt : pt);

const PERFIS = [PT.LINKEDIN_URL, PT.INSTAGRAM_URL];

function pessoa(lang) {
  return {
    "@type": "Person",
    "@id": SITE + "/#arthur",
    name: "Arthur Prog",
    url: SITE + caminho(lang),
    image: SITE + PT.AVATAR,
    jobTitle: T(lang, "Product Owner, Desenvolvedor e Designer", "Product Owner, Programador e Designer", "Product Owner, Developer and Designer"),
    sameAs: PERFIS,
    knowsAbout: ["Product Management", "UX/UI Design", "React", "TypeScript", "Node.js", "PostgreSQL", "Next.js", "Power BI", "Artificial Intelligence"],
    address: { "@type": "PostalAddress", addressCountry: "BR" },
  };
}

function servico(lang) {
  return {
    "@type": "ProfessionalService",
    "@id": SITE + "/#servicos",
    name: "Arthur Prog",
    url: SITE + caminho(lang),
    image: SITE + `/og/og-${lang}.png`,
    description: T(
      lang,
      "Sites, lojas virtuais e sistemas de gestão sob medida, do conceito ao lançamento.",
      "Sites, lojas online e sistemas de gestão à medida, do conceito ao lançamento.",
      "Websites, online stores and custom business software built from concept to launch."
    ),
    founder: { "@id": SITE + "/#arthur" },
    areaServed: ["Brazil", "Portugal", "United States", "European Union"].map((name) => ({ "@type": name === "European Union" ? "Place" : "Country", name })),
    availableLanguage: ["Portuguese", "English"],
    telephone: "+" + PT.WHATSAPP_NUMBER,
    sameAs: PERFIS,
    address: { "@type": "PostalAddress", addressCountry: "BR" },
  };
}

function catalogo(lang) {
  const D = PLANOS[lang];
  const itens = [...D.PROD.site.p, ...D.PROD.loja.p, ...D.PROD.erp.p, ...D.BRAND];
  return {
    "@type": "OfferCatalog",
    name: T(lang, "Planos e preços — Arthur Prog", "Planos e preços — Arthur Prog", "Pricing — Arthur Prog"),
    url: SITE + caminho(lang, "planos"),
    itemListElement: itens.map((x) => ({
      "@type": "Offer",
      price: x.price,
      priceCurrency: MOEDA[lang],
      itemOffered: { "@type": "Service", name: x.name, description: x.ideal, provider: { "@id": SITE + "/#servicos" } },
    })),
  };
}

/** Dados de SEO de uma página. `name`: "home" | "planos" | "project". */
export function metaDaRota(lang, name = "home", slug = null) {
  const c = CONTEUDO[lang];
  const D = PLANOS[lang];
  const din = DIN[lang];
  let title, description, grafo, h1;
  const image = `/og/og-${lang}.png`;

  const projeto = name === "project" ? c.PROJECTS.find((p) => p.slug === slug) : null;
  if (name === "project" && !projeto) name = "home";

  if (name === "planos") {
    const [s, l, g] = [D.PROD.site.p[0].price, D.PROD.loja.p[0].price, D.PROD.erp.p[0].price];
    title = T(
      lang,
      "Planos e preços: sites, lojas virtuais e sistemas | Arthur Prog",
      "Planos e preços: sites, lojas online e software de gestão | Arthur Prog",
      "Pricing: Websites, Online Stores & Business Software | Arthur Prog"
    );
    description = T(
      lang,
      `Preços fechados: site a partir de ${din(s)}, loja virtual a partir de ${din(l)} e sistema de gestão a partir de ${din(g)}. Faça o quiz e veja o pacote ideal.`,
      `Preços fechados em euros: site a partir de ${din(s)}, loja online a partir de ${din(l)} e sistema de gestão a partir de ${din(g)}. 50% no início e 50% na entrega.`,
      `Fixed prices: websites from ${din(s)}, online stores from ${din(l)} and custom business software from ${din(g)}. Pay 50% to start and 50% on delivery.`
    );
    h1 = T(lang, "Planos e preços", "Planos e preços", "Pricing");
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
        inLanguage: HREFLANG[lang],
        keywords: projeto.techs.join(", "),
      },
    ];
  } else {
    title = T(
      lang,
      "Arthur Prog | Sites, lojas virtuais e sistemas sob medida",
      "Arthur Prog | Sites, lojas online e software à medida",
      "Arthur Prog | Websites, Online Stores & Custom Software"
    );
    description = T(
      lang,
      "Product Owner, desenvolvedor e designer. Crio sites, lojas virtuais e sistemas de gestão sob medida com IA, do conceito ao lançamento, para todo o Brasil.",
      "Product Owner, programador e designer. Crio sites, lojas online e sistemas de gestão à medida com IA, do conceito ao lançamento, para empresas em Portugal.",
      "Product owner, developer and designer building websites, online stores and custom business software with AI, from concept to launch. Working remotely with US clients."
    );
    h1 = "Arthur Prog";
    grafo = [
      pessoa(lang),
      servico(lang),
      { "@type": "WebSite", "@id": SITE + "/#site", name: "Arthur Prog", url: SITE, inLanguage: ["pt-BR", "pt-PT", "en"], publisher: { "@id": SITE + "/#arthur" } },
    ];
  }

  const s = projeto?.slug;
  return {
    lang,
    htmlLang: HREFLANG[lang],
    ogLocale: OG_LOCALE[lang],
    ogLocaleAlt: IDIOMAS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
    title,
    description,
    h1,
    url: SITE + caminho(lang, name, s),
    alternates: Object.fromEntries(IDIOMAS.map((l) => [l, SITE + caminho(l, name, s)])),
    image: SITE + image,
    jsonld: { "@context": "https://schema.org", "@graph": grafo },
  };
}

/** Todas as páginas do site, para o build e o sitemap. */
export function todasAsRotas() {
  const rotas = [];
  for (const lang of IDIOMAS) {
    rotas.push({ lang, name: "home", slug: null });
    rotas.push({ lang, name: "planos", slug: null });
    for (const p of PT.PROJECTS) rotas.push({ lang, name: "project", slug: p.slug });
  }
  return rotas;
}

export { HREFLANG };

/** Tags do <head> em HTML (usado no build). */
export function headHtml(m) {
  const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.url}" />`,
    ...Object.entries(m.alternates).map(([l, u]) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${u}" />`),
    `<link rel="alternate" hreflang="x-default" href="${SITE}/" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Arthur Prog" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.url}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta property="og:locale" content="${m.ogLocale}" />`,
    ...m.ogLocaleAlt.map((l) => `<meta property="og:locale:alternate" content="${l}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<script type="application/ld+json">${JSON.stringify(m.jsonld).replace(/</g, "\\u003c")}</script>`,
  ].join("\n    ");
}
