// WhatsApp e formulário de contato. O envio real NUNCA é testado (cria lead na Lia):
// a chamada para a API é bloqueada e o window.open é trocado por um contador.
import { test, expect } from "@playwright/test";
import { abrir, WHATSAPP } from "./ajuda.js";

for (const caminho of ["/pt", "/pt-pt", "/en", "/pt/planos"]) {
  test(`${caminho}: todo link de WhatsApp vai para o número da Prog`, async ({ page }) => {
    await abrir(page, caminho);
    const links = await page.locator('a[href*="wa.me"], a[href*="api.whatsapp.com"]').evaluateAll((as) => as.map((a) => a.href));
    expect(links.length, "nenhum link de WhatsApp").toBeGreaterThan(0);
    for (const href of links) expect(href).toContain(WHATSAPP);
  });
}

test("botão flutuante do WhatsApp aparece no celular", async ({ page }) => {
  await abrir(page, "/pt");
  await expect(page.locator(".wa-fab")).toBeVisible();
});

test.describe("formulário de contato (sem enviar)", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      window.__aberturas = [];
      window.open = (...args) => {
        window.__aberturas.push(args[0]);
        return null;
      };
    });
  });

  async function preparar(page) {
    const chamadas = [];
    await page.route(/\/api\/portfolio\/contato/, (route) => {
      chamadas.push(route.request().url());
      return route.abort();
    });
    await abrir(page, "/pt#contato");
    const form = page.locator("form.contato-form");
    await form.scrollIntoViewIfNeeded();
    return { chamadas, form };
  }

  test("vazio: mostra o aviso e não envia nada", async ({ page }) => {
    const { chamadas, form } = await preparar(page);
    await form.getByRole("button", { name: /Enviar mensagem/ }).click();
    await expect(form.locator(".contato-feedback")).toHaveText(/Preencha seu nome e ao menos um contato/);
    expect(chamadas, "chamou a API da Lia").toEqual([]);
    expect(await page.evaluate(() => window.__aberturas), "abriu o WhatsApp").toEqual([]);
  });

  test("só com o nome (sem e-mail nem WhatsApp): mostra o aviso e não envia", async ({ page }) => {
    const { chamadas, form } = await preparar(page);
    await form.getByLabel("Nome").fill("Teste automático");
    await form.getByRole("button", { name: /Enviar mensagem/ }).click();
    await expect(form.locator(".contato-feedback")).toHaveText(/Preencha seu nome e ao menos um contato/);
    expect(chamadas).toEqual([]);
    expect(await page.evaluate(() => window.__aberturas)).toEqual([]);
  });

  test("campos com autocomplete (nome, e-mail, telefone)", async ({ page }) => {
    const { form } = await preparar(page);
    await expect(form.getByLabel("Nome")).toHaveAttribute("autocomplete", "name");
    await expect(form.getByLabel("Email")).toHaveAttribute("autocomplete", "email");
    await expect(form.getByLabel("WhatsApp")).toHaveAttribute("autocomplete", "tel");
  });
});
