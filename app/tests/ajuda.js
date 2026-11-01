// Funções comuns dos testes.

export const WHATSAPP = "5562996368281"; // WHATSAPP_NUMBER em src/data/content.js

export const PAGINAS_PRINCIPAIS = [
  "/pt",
  "/pt/planos",
  "/pt-pt",
  "/pt-pt/planos",
  "/en",
  "/en/pricing",
  "/pt/projetos/prog-imports",
];

/**
 * Abre a página já sem o splash de 1º acesso (sessionStorage "ps-splash") e espera
 * o React montar. Devolve a lista de erros do console/página para quem quiser conferir.
 */
export async function abrir(page, caminho, { comSplash = false } = {}) {
  const erros = [];
  page.on("console", (m) => {
    if (m.type() === "error") erros.push(m.text());
  });
  page.on("pageerror", (e) => erros.push("pageerror: " + e.message));
  if (!comSplash) {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem("ps-splash", "1");
      } catch {}
    });
  }
  const resp = await page.goto(caminho, { waitUntil: "load" });
  await page.waitForLoadState("networkidle").catch(() => {});
  return { resp, erros };
}

/** Endereços do sitemap.xml (loc + alternativas hreflang), sem repetir. */
export async function paginasDoSitemap(request) {
  const r = await request.get("/sitemap.xml");
  const xml = await r.text();
  const urls = [...xml.matchAll(/(?:<loc>|href=")(https?:[^<"]+)/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set(urls)].filter((p) => p !== "/");
}
