// Política de privacidade (01/11/2026): as 3 versões abrem, têm o conteúdo mínimo da
// LGPD/RGPD e são alcançáveis pelo rodapé e pelo aviso do formulário de contato.
import { test, expect } from "@playwright/test";
import { abrir, WHATSAPP } from "./ajuda.js";

const VERSOES = [
  { caminho: "/pt", pagina: "/pt/privacidade", lang: "pt-BR", h1: "Política de privacidade", lei: /LGPD/, data: /Atualizada em \d{2}\/\d{2}\/\d{4}/, rodape: "Privacidade" },
  { caminho: "/pt-pt", pagina: "/pt-pt/privacidade", lang: "pt-PT", h1: "Política de privacidade", lei: /RGPD/, data: /Atualizada a \d{2}\/\d{2}\/\d{4}/, rodape: "Privacidade" },
  { caminho: "/en", pagina: "/en/privacy", lang: "en", h1: "Privacy policy", lei: /GDPR|RGPD|LGPD/, data: /\d{4}/, rodape: "Privacy" },
];

for (const v of VERSOES) {
  test(`${v.pagina} abre com título, data, base legal e contato pelo WhatsApp`, async ({ page }) => {
    const { resp, erros } = await abrir(page, v.pagina);
    expect(resp.status()).toBe(200);
    expect(await page.locator("html").getAttribute("lang")).toMatch(new RegExp("^" + v.lang.split("-")[0]));
    await expect(page.locator("h1")).toHaveText(v.h1);
    await expect(page.locator(".privacidade__data")).toHaveText(v.data);
    await expect(page.locator("main")).toContainText(v.lei);
    expect(await page.locator(".privacidade__secao").count(), "seções da política").toBeGreaterThanOrEqual(8);
    // O pedido de acesso/exclusão sai pelo WhatsApp do BRIEFING.
    const wa = page.locator(`main a[href*="${WHATSAPP}"]`);
    await expect(wa.first()).toBeVisible();
    // Canonical aponta para a própria página (SEO não pode mandar para outra versão).
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(new URL(canonical).pathname).toBe(v.pagina);
    const largura = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(largura, "algo passa da largura da tela").toBeLessThanOrEqual(0);
    expect(erros, "erros no console").toEqual([]);
  });

  test(`rodapé de ${v.caminho} leva à política (${v.pagina}) sem recarregar`, async ({ page }) => {
    await abrir(page, v.caminho);
    const link = page.locator("footer a", { hasText: v.rodape });
    await expect(link).toHaveAttribute("href", v.pagina);
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await expect(page).toHaveURL(new RegExp(v.pagina.replace(/\//g, "\\/") + "$"));
    await expect(page.locator("h1")).toHaveText(v.h1);
  });
}

test("aviso do formulário de contato abre a política em nova aba (não apaga o que foi digitado)", async ({ page }) => {
  await abrir(page, "/pt");
  const link = page.locator(".contato-aviso a");
  await expect(link).toHaveAttribute("href", "/pt/privacidade");
  await expect(link).toHaveAttribute("target", "_blank");
});

test("política dá para percorrer só com o teclado até o WhatsApp", async ({ page }) => {
  await abrir(page, "/pt/privacidade");
  let achou = false;
  for (let i = 0; i < 40 && !achou; i++) {
    await page.keyboard.press("Tab");
    achou = await page.evaluate(
      (n) => document.activeElement?.closest("main") !== null && (document.activeElement?.getAttribute("href") || "").includes(n),
      WHATSAPP
    );
  }
  expect(achou, "o link do WhatsApp da política não recebe foco com Tab").toBe(true);
});
