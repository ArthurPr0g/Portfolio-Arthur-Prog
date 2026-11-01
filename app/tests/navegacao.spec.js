// Seletor de idioma, menu do celular e topo da página.
import { test, expect } from "@playwright/test";
import { abrir } from "./ajuda.js";

function botaoIdioma(page, rotulo) {
  return page.locator("header .nav__lang-btn").filter({ hasText: new RegExp(`^${rotulo}$`) }).filter({ visible: true }).first();
}

for (const [de, rotulo, para] of [
  ["/pt", "EN", "/en"],
  ["/pt", "PT", "/pt-pt"],
  ["/en", "BR", "/pt"],
  ["/pt/planos", "EN", "/en/pricing"],
  ["/en/pricing", "PT", "/pt-pt/planos"],
]) {
  test(`idioma: ${de} → ${rotulo} leva para ${para}`, async ({ page }) => {
    await abrir(page, de);
    await botaoIdioma(page, rotulo).click();
    await expect(page).toHaveURL(new RegExp(`${para.replace(/\//g, "\\/")}$`));
  });
}

test.describe("menu do celular", () => {
  test("fechado: fica inert e o Tab não entra nele", async ({ page }) => {
    await abrir(page, "/pt");
    const menu = page.locator(".nav__mobile");
    await expect(page.getByRole("button", { name: "Abrir menu" })).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toHaveAttribute("inert", "");
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const dentro = await page.evaluate(() => !!document.activeElement?.closest(".nav__mobile"));
      expect(dentro, `Tab ${i + 1} caiu num link do menu fechado`).toBe(false);
    }
  });

  test("abre e fecha pelo botão", async ({ page }) => {
    await abrir(page, "/pt");
    const botao = page.locator("button.nav__toggle");
    const menu = page.locator(".nav__mobile");
    await botao.click();
    await expect(botao).toHaveAttribute("aria-expanded", "true");
    await expect(menu).not.toHaveAttribute("inert", /.*/);
    await expect(menu.locator(".nav__mobile-link").first()).toBeVisible();
    await botao.click();
    await expect(botao).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toHaveAttribute("inert", "");
  });
});

test("topo não esmaece com a rolagem no celular", async ({ page }) => {
  await abrir(page, "/pt");
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(400);
  const estilo = await page.locator(".hero__inner").evaluate((el) => ({
    opacidade: getComputedStyle(el).opacity,
    transform: el.style.transform,
  }));
  expect(estilo.opacidade).toBe("1");
  expect(estilo.transform).toBe("");
});
