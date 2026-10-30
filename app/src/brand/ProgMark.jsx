import { useId } from "react";
import { ARC, ARC_PEQ, STEM, STEM_PEQ, MASK_D, MARK_PADRAO, ringD } from "./mark";

/**
 * Símbolo P modular. Com cx/cy, fica posicionado (absolute) como o Mark da
 * referência; sem eles, é um ícone em linha de s px. Abaixo de 24 px usa o
 * desenho pequeno (estático). Props de animação: stem, arcA, arcB, track,
 * ring, ringOp, rot, ringScale (ver docs/02-telas-de-carregamento.md).
 */
export default function ProgMark({ cx, cy, s = 48, className, style, ...props }) {
  const id = useId().replace(/:/g, "");
  const p = { ...MARK_PADRAO };
  for (const k in MARK_PADRAO) if (props[k] !== undefined) p[k] = props[k];
  const resto = {};
  for (const k in props) if (!(k in MARK_PADRAO)) resto[k] = props[k];
  if (p.opacity <= 0.001 || s <= 0.5) return null;

  const posicionado = cx !== undefined && cy !== undefined;
  const caixa = posicionado
    ? { position: "absolute", left: cx - s / 2, top: cy - s / 2, overflow: "visible", opacity: p.opacity, ...style }
    : { display: "block", flex: "none", overflow: "visible", opacity: p.opacity, ...style };

  if (s < 24) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className} style={caixa} {...resto}>
        <rect x={STEM_PEQ.x} y={STEM_PEQ.y} width={STEM_PEQ.w} height={STEM_PEQ.h} rx={STEM_PEQ.rx} style={{ fill: p.stemColor }} />
        <path d={ARC_PEQ} style={{ fill: p.arcColor }} />
      </svg>
    );
  }

  const k = s / 48, span = Math.max(0, p.arcB - p.arcA);
  const completo = p.arcA <= 0 && p.arcB >= 1;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" aria-hidden="true" focusable="false" className={className} style={caixa} {...resto}>
      {!completo && (
        <defs>
          <mask id={id} maskUnits="userSpaceOnUse" x="-12" y="-12" width="72" height="72">
            <path d={MASK_D} fill="none" stroke="#fff" strokeWidth="8.8" pathLength="1" strokeDasharray={`${span} 3`} strokeDashoffset={-p.arcA} />
          </mask>
        </defs>
      )}
      {p.track > 0.001 && <path d={ARC} opacity={p.track} style={{ fill: p.arcColor }} />}
      {span > 0.001 && <path d={ARC} mask={completo ? undefined : `url(#${id})`} style={{ fill: p.arcColor }} />}
      {p.stem > 0.01 && (
        <rect x={STEM.x} y={42 - 36 * p.stem} width={STEM.w} height={36 * p.stem} rx={STEM.rx} style={{ fill: p.stemColor }} />
      )}
      {p.ring > 0.001 && p.ringOp > 0.001 && (
        <path
          transform={`rotate(${p.rot} 26.25 18)`}
          d={ringD(26.25, 18, 12 * p.ringScale, p.ring)}
          fill="none"
          strokeWidth={p.ringW / k}
          strokeDasharray={`${p.dash / k} ${p.gap / k}`}
          opacity={p.ringOp}
          style={{ stroke: p.ringColor }}
        />
      )}
    </svg>
  );
}
