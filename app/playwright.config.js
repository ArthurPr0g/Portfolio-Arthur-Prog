// Testes automáticos do portfólio (Tito). Rodam contra o site publicado por padrão.
//   npm test                                  → https://portfolio-arthur-prog.vercel.app
//   BASE_URL=http://localhost:5173 npm test   → outro endereço (prévia da Vercel, npm run dev...)
// Não fazem parte do build: a Vercel só roda "npm run build".
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 1,
  workers: 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL || "https://portfolio-arthur-prog.vercel.app",
    locale: "pt-BR",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "celular-390",
      use: {
        ...devices["Pixel 7"],
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});
