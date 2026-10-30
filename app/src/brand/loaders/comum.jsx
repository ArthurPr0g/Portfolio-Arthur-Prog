import { useEffect, useRef, useState } from "react";
import { clamp } from "../motion";
import { C, a } from "../mark";

/**
 * Palco de W×H (medidas da referência) escalado para caber no elemento pai
 * ("contain", centralizado). Devolve o filho já posicionado em coordenadas da cena.
 */
export function Palco({ W, H, fundo = C.ink, children, ...resto }) {
  const ref = useRef(null);
  const [k, setK] = useState({ k: 0, ox: 0, oy: 0 });
  useEffect(() => {
    const el = ref.current;
    const medir = () => {
      const w = el.clientWidth, h = el.clientHeight;
      const kk = Math.min(w / W, h / H);
      setK({ k: kk, ox: (w - W * kk) / 2, oy: (h - H * kk) / 2 });
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [W, H]);
  return (
    <div ref={ref} style={{ position: "absolute", inset: 0, overflow: "hidden", background: fundo }} {...resto}>
      {k.k > 0 && (
        <div style={{ position: "absolute", left: 0, top: 0, width: W, height: H, transformOrigin: "0 0", transform: `translate(${k.ox}px, ${k.oy}px) scale(${k.k})` }}>
          {children}
        </div>
      )}
    </div>
  );
}

/** Mobile (≤ 600 px de largura do elemento pai). */
export function useCompacto(ref) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;
    const ro = new ResizeObserver(() => setM(el.clientWidth <= 600));
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return m;
}

export function Line({ x, y, w, h, color = C.acc, op = 0.38 }) {
  if (w <= 0.5 || h <= 0.5) return null;
  return <div style={{ position: "absolute", left: x, top: y, width: w, height: h, background: color, opacity: op }} />;
}

export function Bar({ x, y, w, p, light }) {
  return (
    <div style={{ position: "absolute", left: x, top: y, width: w, height: 3, borderRadius: 3, background: light ? a(C.ink, 8) : a(C.neutral, 10), overflow: "hidden" }}>
      <div style={{ width: `${clamp(p, 0, 1) * 100}%`, height: "100%", borderRadius: 3, background: light ? C.accD : `linear-gradient(90deg, ${C.acc}, ${C.accS})` }} />
    </div>
  );
}

/** Esqueleto com a faixa de brilho que atravessa a tela (background-position, sem layout). */
export function Skel({ x, y, w, h, r = 8, op, shX }) {
  if (op <= 0.001) return null;
  const off = shX - x - 300;
  return (
    <div
      style={{
        position: "absolute", left: x, top: y, width: w, height: h, borderRadius: r, opacity: op,
        background: `linear-gradient(90deg, transparent 0, ${a(C.neutral, 11)} 50%, transparent 100%) ${off}px 0 / 600px 100% no-repeat, ${a(C.neutral, 7)}`,
      }}
    />
  );
}

/** Texto só para leitores de tela (o loader anuncia a etapa atual). */
export function SoParaLeitor({ children }) {
  return <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>{children}</span>;
}
