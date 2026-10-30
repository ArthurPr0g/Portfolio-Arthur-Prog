import { C, F } from "./mark";

/**
 * "Prog Soluções": Prog em Sora 600 + Soluções em 400, −0,03em, line-height 1.
 * reveal (0..1) faz a revelação da referência: clip da direita + translateX −25%.
 * Com x/cy, fica posicionado (absolute) como o Word da referência.
 */
export default function ProgWordmark({ size, reveal = 1, dark = true, opacity = 1, x, cy, className, style, ...resto }) {
  if (reveal <= 0.001 || opacity <= 0.001) return null;
  const posicionado = x !== undefined && cy !== undefined;
  return (
    <span
      translate="no"
      className={className}
      style={{
        ...(posicionado ? { position: "absolute", left: x, top: cy - size / 2 } : { display: "inline-block" }),
        fontFamily: F.sora,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-.03em",
        whiteSpace: "nowrap",
        color: dark ? C.text : C.ink,
        paddingRight: ".08em",
        ...(reveal < 1
          ? {
              clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`,
              transform: `translateX(${-(1 - reveal) * size * 0.25}px)`,
            }
          : null),
        opacity: opacity * Math.min(1, reveal * 2.5),
        ...style,
      }}
      {...resto}
    >
      <span style={{ fontWeight: 600 }}>Prog</span> <span style={{ fontWeight: 400, color: dark ? C.mut : C.mutD }}>Soluções</span>
    </span>
  );
}
