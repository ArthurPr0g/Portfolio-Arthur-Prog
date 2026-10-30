// Geometria do símbolo "P modular" (grade de 48u) e um construtor sem React,
// usado pelo loader embutido no <head>. O componente React (ProgMark.jsx) usa
// as mesmas constantes. Ver docs/01-identidade.md.

export const ARC = "M24.25 6H26.25A12 12 0 0 1 26.25 30H24.25A4 4 0 0 1 24.25 22H26.25A4 4 0 0 0 26.25 14H24.25A4 4 0 0 1 24.25 6Z";
export const STEM = { x: 9.75, y: 6, w: 8, h: 36, rx: 4 };
// Desenho pequeno (abaixo de 24 px): corte de 2u.
export const ARC_PEQ = "M24.5 6H26.5A12.5 12.5 0 0 1 26.5 31H24.5A4.5 4.5 0 0 1 24.5 22H26.5A3.5 3.5 0 0 0 26.5 15H24.5A4.5 4.5 0 0 1 24.5 6Z";
export const STEM_PEQ = { x: 9, y: 6, w: 9, h: 36, rx: 4.5 };
// Linha central do arco: a máscara revela o arco ao longo dela (pathLength = 1).
export const MASK_D = "M20 10H26.25A8 8 0 0 1 26.25 26H20";

/** Cores da marca como variáveis CSS (tokens.css). */
export const C = {
  ink: "var(--ps-ink)", panel: "var(--ps-panel)", surf: "var(--ps-surface)", paper: "var(--ps-paper)", white: "var(--ps-white)",
  text: "var(--ps-text)", body: "var(--ps-body)", mut1: "var(--ps-muted-1)", mut: "var(--ps-muted)", mut2: "var(--ps-muted-2)",
  nav: "var(--ps-nav)", dim: "var(--ps-dim)", mutD: "var(--ps-muted-dark)",
  acc: "var(--ps-accent)", accS: "var(--ps-accent-strong)", accD: "var(--ps-accent-dark)",
  cyan: "var(--ps-cyan)", green: "var(--ps-green)", purple: "var(--ps-purple)", neutral: "var(--ps-neutral)",
};
/** Um token com transparência: a(C.ink, 55) = ink a 55%. */
export const a = (cor, pct) => `color-mix(in srgb, ${cor} ${pct}%, transparent)`;

export const F = { sora: "var(--ps-font-display)", dm: "var(--ps-font-body)", mono: "var(--ps-font-mono)" };

/** Círculo tracejado desenhado em sentido horário a partir do topo (p de 0 a 1). */
export function ringD(cx, cy, r, p) {
  p = Math.max(0, Math.min(1, p));
  if (p <= 0.001) return "";
  if (p >= 0.999) return `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  const ang = -Math.PI / 2 + p * 2 * Math.PI;
  return `M${cx} ${cy - r}A${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${cx + r * Math.cos(ang)} ${cy + r * Math.sin(ang)}`;
}

export const MARK_PADRAO = {
  stem: 1, arcA: 0, arcB: 1, track: 0, ring: 0, ringOp: 1, rot: 0, ringScale: 1,
  stemColor: C.text, arcColor: C.acc, ringColor: C.accS, opacity: 1, ringW: 1.6, dash: 7, gap: 6,
};

const NS = "http://www.w3.org/2000/svg";
let seq = 0;

/** Símbolo animável sem React: { el, set(props) }. Props iguais às do Mark da referência. */
export function criarMarca(doc = document) {
  const id = "psmk" + ++seq;
  const mk = (tag, attrs = {}) => {
    const el = doc.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  };
  const svg = mk("svg", { viewBox: "0 0 48 48", "aria-hidden": "true", focusable: "false" });
  svg.style.cssText = "position:absolute;left:0;top:0;overflow:visible;transform-origin:0 0";
  const defs = mk("defs");
  const mask = mk("mask", { id, maskUnits: "userSpaceOnUse", x: -12, y: -12, width: 72, height: 72 });
  const reveal = mk("path", { d: MASK_D, fill: "none", stroke: "#fff", "stroke-width": 8.8, pathLength: 1 });
  mask.appendChild(reveal);
  defs.appendChild(mask);
  const track = mk("path", { d: ARC });
  const arc = mk("path", { d: ARC, mask: `url(#${id})` });
  const stem = mk("rect", { x: STEM.x, width: STEM.w, rx: STEM.rx });
  const ring = mk("path", { fill: "none" });
  svg.append(defs, track, arc, stem, ring);

  function set(props) {
    const p = { ...MARK_PADRAO, ...props };
    const { cx, cy, s } = p;
    if (p.opacity <= 0.001 || s <= 0.5) {
      svg.style.display = "none";
      return;
    }
    svg.style.display = "";
    const k = s / 48, span = Math.max(0, p.arcB - p.arcA);
    svg.setAttribute("width", s);
    svg.setAttribute("height", s);
    svg.style.transform = `translate(${cx - s / 2}px, ${cy - s / 2}px)`;
    svg.style.opacity = p.opacity;
    reveal.setAttribute("stroke-dasharray", `${span} 3`);
    reveal.setAttribute("stroke-dashoffset", -p.arcA);
    track.style.display = p.track > 0.001 ? "" : "none";
    track.style.fill = p.arcColor;
    track.setAttribute("opacity", p.track);
    arc.style.display = span > 0.001 ? "" : "none";
    arc.style.fill = p.arcColor;
    stem.style.display = p.stem > 0.01 ? "" : "none";
    stem.setAttribute("y", 42 - 36 * p.stem);
    stem.setAttribute("height", Math.max(0, 36 * p.stem));
    stem.style.fill = p.stemColor;
    const showRing = p.ring > 0.001 && p.ringOp > 0.001;
    ring.style.display = showRing ? "" : "none";
    if (showRing) {
      ring.setAttribute("transform", `rotate(${p.rot} 26.25 18)`);
      ring.setAttribute("d", ringD(26.25, 18, 12 * p.ringScale, p.ring));
      ring.style.stroke = p.ringColor;
      ring.setAttribute("stroke-width", p.ringW / k);
      ring.setAttribute("stroke-dasharray", `${p.dash / k} ${p.gap / k}`);
      ring.setAttribute("opacity", p.ringOp);
    }
  }
  return { el: svg, set };
}
