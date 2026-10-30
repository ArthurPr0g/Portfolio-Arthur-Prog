import { useRef } from "react";
import { EASE, clamp, lerp, interpolate, relogio, pct, CUES } from "../motion";
import { C, F, a } from "../mark";
import ProgMark from "../ProgMark";
import { useTimeline, useMovimentoReduzido } from "../useTimeline";
import { Palco, Bar, Line, SoParaLeitor, useCompacto } from "./comum";

// Cena "Documento" em tema claro (referencias-html/prog-loaders.jsx → DocLayer,
// e prog-loaders-mobile.jsx → MDoc): ladrilho da planta 2a se constrói, o
// progresso da geração corre e o ladrilho fecha num ponto que escurece a tela.
//
// Uso real: passe `progresso` (0..1) da geração do PDF/proposta. A barra mostra o
// valor suavizado e a cena segura antes do fechamento até chegar a 1.

const D = CUES.Documento;
const INICIO = D - 0.9, FIM = D + 5.4, SEGURA = D + 3.35;
const SIM = interpolate([0.4, 1.4, 2.3, 3.4], [0, 0.31, 0.62, 1], EASE.draw);

export default function DocLoader({ progresso, rotulo, loop = false }) {
  const ref = useRef(null);
  const compacto = useCompacto(ref);
  const reduzido = useMovimentoReduzido();
  const real = progresso !== undefined;
  const mostrado = useRef(0);
  const { T } = useTimeline({
    inicio: INICIO,
    loop: loop ? [INICIO, FIM] : null,
    passo: (t, dt) => {
      const n = Math.min(t + dt, loop ? FIM : FIM - 0.001);
      if (!real) return n;
      // exibido += (alvo − exibido)·(1 − e^(−dt/0,12)), no máximo 1,5/s
      const alvo = clamp(progresso, 0, 1), v = mostrado.current;
      if (t < D + 0.4) mostrado.current = 0;
      else mostrado.current = alvo - v < 0.002 ? Math.max(v, alvo) : v + Math.max(0, Math.min((alvo - v) * (1 - Math.exp(-dt / 0.12)), 1.5 * dt));
      return mostrado.current >= 0.999 ? n : Math.min(n, SEGURA);
    },
  });
  const prog = real ? (T >= D + 0.4 ? mostrado.current : 0) : SIM(T - D);
  const texto = rotulo || (compacto ? "GERANDO PROPOSTA" : "GERANDO PROPOSTA COMERCIAL");
  const p = { T, prog, texto, reduzido };
  return (
    <div ref={ref} role="status" aria-live="polite" style={{ position: "absolute", inset: 0 }}>
      <SoParaLeitor>{prog >= 1 ? "Documento pronto" : texto.toLowerCase()}</SoParaLeitor>
      {compacto ? (
        <Palco W={390} H={844} fundo={C.paper} aria-hidden="true"><Cena {...p} m={MOB} /></Palco>
      ) : (
        <Palco W={1920} H={1080} fundo={C.paper} aria-hidden="true"><Cena {...p} m={DESK} /></Palco>
      )}
    </div>
  );
}

// Medidas: desktop 1920×1080 e mobile 390×844.
const DESK = {
  W: 1920, cx: 960, cy: 470, TS: 264, raio: 34, borda: 1.5, sombra: "0 30px 70px", grade: 22, th: 1.5,
  fundoGrade: { size: 40, pos: "0 30px", r0: 220, r1: 700 }, ring: { w: 1.6, d: 7, g: 6 },
  selo: { right: 18, top: 11, fs: 12, ls: ".16em" },
  txt: { y: 668, fs: 20, ls: ".24em", pls: ".08em", gap: 12 }, barra: { x: 750, y: 716, w: 420 }, tinta: 1150,
};
const MOB = {
  W: 390, cx: 195, cy: 380, TS: 168, raio: 24, borda: 1, sombra: "0 20px 50px", grade: 14, th: 1,
  fundoGrade: { size: 28, pos: "13px 16px", r0: 120, r1: 360 }, ring: { w: 0.7, d: 3.2, g: 2.8 },
  selo: { right: 11, top: 6, fs: 8.5, ls: ".14em" },
  txt: { y: 496, fs: 11, ls: ".22em", pls: ".06em", gap: 6 }, barra: { x: 85, y: 520, w: 220 }, tinta: 520,
};

function Cena({ T, prog, texto, reduzido, m }) {
  const { draw, pop } = relogio(T);
  const tIn = pop(D + 0.15, D + 0.75), up = draw(D + 3.9, D + 4.1), down = draw(D + 4.1, D + 4.5);
  const scale = reduzido ? 1 : lerp(0.86, 1, tIn) * (1 + 0.05 * up) * (1 - down);
  const tOp = clamp(tIn * 2, 0, 1) * (1 - draw(D + 4.3, D + 4.5));
  const gOp = 1 - draw(D + 3.4, D + 3.8);
  const TS = m.TS, k = TS / 48;
  const txOp = draw(D + 0.4, D + 0.8) * (1 - draw(D + 3.8, D + 4.1));
  const bgGrid = draw(D, D + 0.7) * (1 - draw(D + 3.6, D + 4.3));
  const inkR = reduzido ? 0 : m.tinta * draw(D + 4.35, D + 5.3);
  const g = m.fundoGrade;
  const mascara = `radial-gradient(circle at ${m.cx}px ${m.cy}px, #000 0, #000 ${g.r0}px, transparent ${g.r1}px)`;
  const grade = (al, size) => ({
    backgroundImage: `linear-gradient(${a(C.ink, al)} 1px, transparent 1px), linear-gradient(90deg, ${a(C.ink, al)} 1px, transparent 1px)`,
    backgroundSize: `${size}px ${size}px`,
  });
  return (
    <>
      <div style={{ position: "absolute", inset: 0, opacity: bgGrid, ...grade(6, g.size), backgroundPosition: g.pos, WebkitMaskImage: mascara, maskImage: mascara }} />
      {tOp > 0.001 && (
        <div style={{ position: "absolute", left: m.cx - TS / 2, top: m.cy - TS / 2, width: TS, height: TS, borderRadius: m.raio, background: C.white, overflow: "hidden",
          border: `${m.borda}px solid ${a(C.accD, (0.35 * gOp + 0.08) * 100)}`, boxShadow: `${m.sombra} ${a(C.ink, 10)}`, opacity: tOp, transform: `scale(${scale})` }}>
          <div style={{ position: "absolute", inset: 0, opacity: gOp, ...grade(7, m.grade) }} />
          {[6, 30, 42].map((u, i) => <Line key={u} x={0} y={u * k - m.th / 2} w={TS * draw(D + 0.4 + i * 0.1, D + 1.0 + i * 0.1)} h={m.th} color={C.accD} op={0.45 * gOp} />)}
          {[9.75, 38.25].map((u, i) => <Line key={u} x={u * k - m.th / 2} y={0} w={m.th} h={TS * draw(D + 0.55 + i * 0.1, D + 1.15 + i * 0.1)} color={C.accD} op={0.35 * gOp} />)}
          <ProgMark cx={TS / 2} cy={TS / 2} s={TS} stem={reduzido ? 1 : pop(D + 1.1, D + 1.6)} arcB={reduzido ? 1 : draw(D + 1.4, D + 2.2)} ring={reduzido ? 0 : draw(D + 0.7, D + 1.4)} ringOp={gOp}
            stemColor={C.ink} arcColor={C.accD} ringColor={C.accD} ringW={m.ring.w} dash={m.ring.d} gap={m.ring.g} />
          <div style={{ position: "absolute", right: m.selo.right, top: m.selo.top, fontFamily: F.mono, fontSize: m.selo.fs, letterSpacing: m.selo.ls, color: C.accD, opacity: draw(D + 0.9, D + 1.3) * gOp }}>PROG · 02</div>
        </div>
      )}
      <div style={{ opacity: txOp }}>
        <div style={{ position: "absolute", left: 0, top: m.txt.y, width: m.W, textAlign: "center", fontFamily: F.mono, fontSize: m.txt.fs, letterSpacing: m.txt.ls, color: C.mutD }}>
          {texto} <span style={{ color: C.accD, letterSpacing: m.txt.pls, marginLeft: m.txt.gap }}>{pct(prog)}</span>
        </div>
        <Bar x={m.barra.x} y={m.barra.y} w={m.barra.w} p={prog} light />
      </div>
      {inkR > 0.5 && <div style={{ position: "absolute", inset: -2000, background: C.ink, clipPath: `circle(${inkR}px at ${m.cx + 2000}px ${m.cy + 2000}px)` }} />}
    </>
  );
}
