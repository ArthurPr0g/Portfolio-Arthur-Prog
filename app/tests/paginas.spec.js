// Páginas abrem, não dão erro e não passam da largura da tela no celular.
import { test, expect } from "@playwright/test";
import { abrir, paginasDoSitemap, PAGINAS_PRINCIPAIS } from "./ajuda.js";

test("todas as páginas do sitemap respondem 200", async ({ request }) => {
  const paginas = await paginasDoSitemap(request);
  expect(paginas.length, "sitemap sem páginas").toBeGreaterThan(5);
  const ruins = [];
  for (const p of paginas) {
    const r = await request.get(p);
    if (r.status() !== 200) ruins.push(`${p} → ${r.status()}`);
  }
  expect(ruins, "páginas do sitemap que não abrem").toEqual([]);
});

for (const caminho of PAGINAS_PRINCIPAIS) {
  test(`${caminho} abre sem erro no console e sem rolagem lateral em 390 px`, async ({ page }) => {
    const { resp, erros } = await abrir(page, caminho);
    expect(resp.status()).toBe(200);
    // Rola até o fim para montar o que entra com a rolagem (imagens lazy, Reveal).
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    const largura = await page.evaluate(() => ({
      conteudo: document.documentElement.scrollWidth,
      tela: window.innerWidth,
    }));
    expect(largura.conteudo, "algo passa da largura da tela").toBeLessThanOrEqual(largura.tela);
    expect(erros, "erros no console").toEqual([]);
  });
}

test.describe("endereço inexistente dá 404 de verdade", () => {
  for (const caminho of ["/nao-existe", "/pt/nao-existe", "/pt/projetos/nao-existe", "/pt/planos/abc", "/en/projects/nao-existe"]) {
    test(caminho, async ({ request }) => {
      const r = await request.get(caminho);
      expect(r.status()).toBe(404);
    });
  }
});
