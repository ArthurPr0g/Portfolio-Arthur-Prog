// Capas com versões menores (scripts/fotos/miniaturas.py): largura original e as
// larguras geradas. Capa fora desta lista sai só com o arquivo original.
const CAPAS = {
  "/assets/progimports-home-hero.webp": [2000, 640, 1200],
  "/assets/tecnopallet-hero.webp": [2000, 640, 1200],
  "/assets/orbi-visao.webp": [2514, 640, 1200],
  "/assets/vitaliti-site-01-topo.webp": [2000, 640, 1200],
  "/assets/lumen-d02-inicio.webp": [2000, 640, 1200],
  "/assets/saloes-01-lancamento.webp": [2000, 640, 1200],
  "/assets/consorcio.webp": [1080, 640],
};

/** srcset de uma capa ("…-640.webp 640w, …"), ou undefined se não houver versões menores. */
export function srcsetDe(src) {
  const larguras = CAPAS[src];
  if (!larguras) return undefined;
  const [original, ...menores] = larguras;
  return [...menores.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`), `${src} ${original}w`].join(", ");
}
