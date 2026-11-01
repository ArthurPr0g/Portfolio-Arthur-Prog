// Orçamento de peso: capas dos projetos no celular. Hoje são de 2000 px (até ~137 KB)
// para cards de ~350 px; o alvo é servir uma versão menor (srcset/sizes).
import { test, expect } from "@playwright/test";
import { abrir } from "./ajuda.js";

const LIMITE_KB = 60;

test(`/pt: cada capa de projeto baixada no celular tem até ${LIMITE_KB} KB`, async ({ page, request }) => {
  await abrir(page, "/pt");
  const capas = page.locator(".project-card__img");
  const n = await capas.count();
  expect(n, "nenhuma capa de projeto em /pt").toBeGreaterThan(0);
  const pesadas = [];
  for (let i = 0; i < n; i++) {
    const img = capas.nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el) => el.complete && !!el.currentSrc)).toBe(true);
    const src = await img.evaluate((el) => el.currentSrc);
    const kb = (await (await request.get(src)).body()).length / 1024;
    if (kb > LIMITE_KB) pesadas.push(`${new URL(src).pathname}: ${Math.round(kb)} KB`);
  }
  expect(pesadas).toEqual([]);
});
