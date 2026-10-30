// Curvas e interpolação da marca Prog Soluções. Fórmulas idênticas às das
// referências (design_handoff_prog_solucoes/referencias-html): só três curvas.
//   enter = easeOutExpo     (chegar, voar)
//   draw  = easeInOutCubic  (traços, fades, saídas)
//   pop   = easeOutBack     (haste do P, cards, bottom sheet)
// Sem dependências: o loader embutido no <head> também usa este arquivo.

export const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
export const lerp = (a, b, p) => a + (b - a) * p;

export const EASE = {
  enter: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  draw: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  pop: (t) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/** Valor no tempo t de um trecho (início, fim, de, para): limitado antes e depois. */
export function tween(t, start, end, from = 0, to = 1, ease = EASE.draw) {
  if (t <= start) return from;
  if (t >= end) return to;
  return from + (to - from) * ease((t - start) / (end - start));
}

/** Keyframes: interpolate([t0, t1…], [v0, v1…], curva)(t). */
export function interpolate(input, output, ease = (t) => t) {
  return (t) => {
    if (t <= input[0]) return output[0];
    if (t >= input[input.length - 1]) return output[output.length - 1];
    for (let i = 0; i < input.length - 1; i++) {
      if (t >= input[i] && t <= input[i + 1]) {
        const span = input[i + 1] - input[i];
        const local = span === 0 ? 0 : (t - input[i]) / span;
        const fn = Array.isArray(ease) ? ease[i] || ((x) => x) : ease;
        return output[i] + (output[i + 1] - output[i]) * fn(local);
      }
    }
    return output[output.length - 1];
  };
}

/** As três curvas presas a um relógio T, no formato da referência: enter(início, fim, de, para). */
export function relogio(T) {
  const mk = (ease) => (s, e, f = 0, to = 1) => tween(T, s, e, f, to, ease);
  return { T, enter: mk(EASE.enter), draw: mk(EASE.draw), pop: mk(EASE.pop) };
}

/** "042%" como nas referências. */
export const pct = (p) => String(Math.round(clamp(p, 0, 1) * 100)).padStart(3, "0") + "%";

/** Início de cada cena na timeline das referências (s). */
export const CUES = { Splash: 0, Site: 6.5, Sistema: 12.0, Documento: 18.2, Fim: 23.7 };
