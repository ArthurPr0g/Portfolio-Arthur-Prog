// Acessibilidade: varredura do axe (WCAG 2.1 AA), títulos, alt e foco visível.
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { abrir, PAGINAS_PRINCIPAIS } from "./ajuda.js";

async function rolarAteOFim(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800); // fim das animações de entrada (Reveal)
}

for (const caminho of ["/pt", "/pt/planos", "/en", "/pt/projetos/prog-imports"]) {
  test(`${caminho}: axe sem problema sério ou crítico`, async ({ page }) => {
    await abrir(page, caminho);
    await rolarAteOFim(page);
    const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const graves = r.violations
      .filter((v) => v.impact === "serious" || v.impact === "critical")
      .map((v) => `${v.id} (${v.nodes.length}): ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
    expect(graves).toEqual([]);
  });
}

test("/pt/planos: títulos em ordem (combos usam h3, não h4)", async ({ page }) => {
  await abrir(page, "/pt/planos");
  // Os locators do Playwright entram no shadow root da página de planos.
  await expect(page.locator(".combo h3").first()).toBeAttached();
  await expect(page.locator(".combo h4")).toHaveCount(0);
  const r = await new AxeBuilder({ page }).withRules(["heading-order"]).analyze();
  expect(r.violations.map((v) => v.nodes.map((n) => n.target.join(" ")).join(" | "))).toEqual([]);
});

for (const caminho of PAGINAS_PRINCIPAIS) {
  test(`${caminho}: toda imagem tem alt`, async ({ page }) => {
    await abrir(page, caminho);
    await rolarAteOFim(page);
    const semAlt = await page.locator("img:not([alt])").evaluateAll((imgs) => imgs.map((i) => i.currentSrc || i.src));
    expect(semAlt).toEqual([]);
  });
}

test("/pt: foco visível nos primeiros 15 itens do Tab", async ({ page }) => {
  await abrir(page, "/pt");
  for (let i = 0; i < 15; i++) {
    await page.keyboard.press("Tab");
    const foco = await page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return { ok: false, quem: "nada focado" };
      const cs = getComputedStyle(a);
      const contorno = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
      const sombra = cs.boxShadow && cs.boxShadow !== "none";
      const r = a.getBoundingClientRect();
      return { ok: (contorno || sombra) && r.width > 0 && r.height > 0, quem: a.outerHTML.slice(0, 80) };
    });
    expect(foco.ok, `Tab ${i + 1} sem foco visível: ${foco.quem}`).toBe(true);
  }
});
