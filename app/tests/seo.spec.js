// Arquivos e marcações de SEO que o build gera (scripts/prerender.mjs).
import { test, expect } from "@playwright/test";

test("robots.txt existe e aponta o sitemap", async ({ request }) => {
  const r = await request.get("/robots.txt");
  expect(r.status()).toBe(200);
  expect(await r.text()).toMatch(/Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/);
});

test("sitemap.xml existe e lista as páginas", async ({ request }) => {
  const r = await request.get("/sitemap.xml");
  expect(r.status()).toBe(200);
  const xml = await r.text();
  for (const p of ["/pt<", "/pt/planos<", "/en<", "/en/pricing<", "/pt-pt<"]) expect(xml).toContain(p);
});

for (const [caminho, idioma] of [
  ["/pt", /^pt(-BR)?$/i],
  ["/pt/planos", /^pt(-BR)?$/i],
  ["/pt-pt", /^pt-PT$/i],
  ["/en", /^en/i],
]) {
  test(`${caminho}: título, descrição, canonical, idioma e imagem de prévia no HTML`, async ({ request }) => {
    const html = await (await request.get(caminho)).text();
    const lang = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1] || "";
    expect(lang).toMatch(idioma);
    expect(html).toMatch(/<title>[^<]{10,}<\/title>/);
    expect(html).toMatch(/<meta name="description" content="[^"]{50,}"/);
    expect(html).toMatch(/<link rel="canonical" href="[^"]+"/);
    const og = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    expect(og, "sem og:image").toBeTruthy();
    const img = await request.get(new URL(og).pathname);
    expect(img.status(), `og:image ${og}`).toBe(200);
    expect(img.headers()["content-type"]).toMatch(/^image\//);
  });
}
