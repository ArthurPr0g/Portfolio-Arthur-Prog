// Cabeçalhos de segurança (vercel.json) e fontes servidas pelo próprio site.
import { test, expect } from "@playwright/test";
import { abrir } from "./ajuda.js";

for (const caminho of ["/pt", "/pt/planos", "/en"]) {
  test(`${caminho} tem os cabeçalhos de segurança`, async ({ request }) => {
    const r = await request.get(caminho);
    const h = r.headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["referrer-policy"]).toBeTruthy();
  });

  test(`${caminho} não pede nada ao Google Fonts`, async ({ page }) => {
    const deFora = [];
    page.on("request", (req) => {
      if (/fonts\.(googleapis|gstatic)\.com/.test(req.url())) deFora.push(req.url());
    });
    await abrir(page, caminho);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    expect(deFora).toEqual([]);
  });
}
