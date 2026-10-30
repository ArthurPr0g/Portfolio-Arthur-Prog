import { Fragment, useRef } from "react";
import { EASE, clamp, lerp, interpolate, relogio, CUES } from "../motion";
import { C, F, a } from "../mark";
import ProgMark from "../ProgMark";
import ProgWordmark from "../ProgWordmark";
import { useTimeline, useMovimentoReduzido } from "../useTimeline";
import { Palco, Bar, Skel, Line, SoParaLeitor, useCompacto } from "./comum";

// Cena "Sistema" (referencias-html/prog-loaders.jsx → SistemaLayer, e
// prog-loaders-mobile.jsx → MSistema): skeleton com brilho, cartão (desktop)
// ou bottom sheet (mobile) com o P girando e as etapas; os dados resolvem com
// stagger. Fórmulas portadas linha a linha, no relógio absoluto da referência.
//
// Uso real: passe `concluidas` (quantas etapas terminaram) e `pronto` (todas):
// a cena segura antes de cada etapa pendente e o spinner só se completa no fim.
// Sem essas props, roda o tempo da referência (demonstração).

const S = CUES.Site, Y = CUES.Sistema;
const INICIO = S + 4.8, FIM = Y + 5.4;
const ETAPAS = ["Conectando ao ERP", "Sincronizando CRM", "Montando painel"];

export default function AppLoader({ etapas = ETAPAS, concluidas, pronto, loop = false, kpis, automacoes }) {
  const ref = useRef(null);
  const compacto = useCompacto(ref);
  const reduzido = useMovimentoReduzido();
  const real = concluidas !== undefined || pronto !== undefined;
  const { T, Tr } = useTimeline({
    inicio: INICIO,
    loop: loop ? [INICIO, FIM] : null,
    passo: (t, dt) => {
      const n = Math.min(t + dt, loop ? FIM : FIM - 0.001);
      if (!real) return n;
      const lim = pronto ? Infinity : Math.min(Y + 2.95, Y + 1.2 + 0.9 * (concluidas || 0) - 0.001);
      return t >= lim ? t : Math.min(n, lim);
    },
  });
  // Giros contínuos mesmo quando a cena segura.
  const giro = Tr + (INICIO - Y);
  const p = { T, giro, etapas, reduzido, kpis, automacoes };
  const atual = etapas.find((_, i) => (real ? i >= (concluidas || 0) : T < Y + 1.2 + 0.9 * i));
  return (
    <div ref={ref} role="status" aria-live="polite" style={{ position: "absolute", inset: 0 }}>
      <SoParaLeitor>{atual || "Painel pronto"}</SoParaLeitor>
      {compacto ? (
        <Palco W={390} H={844} aria-hidden="true"><Mobile {...p} /></Palco>
      ) : (
        <Palco W={1920} H={1080} aria-hidden="true"><Desktop {...p} /></Palco>
      )}
    </div>
  );
}

const KPI = [["Receita do mês", "R$ 184 mil"], ["Pedidos", "1.284"], ["Clientes ativos", "312"], ["Automações", "27"]];
const AUTOS = [["Emissão de NF-e", "diária"], ["Cobrança recorrente", "mensal"], ["Lembretes WhatsApp", "tempo real"], ["Integração ERP ↔ CRM", "a cada 5 min"], ["Relatório semanal", "segunda, 8h"]];
const cardBox = (r) => ({ position: "absolute", borderRadius: r, background: "var(--ps-card)", border: "1px solid var(--ps-line)" });

// Spinner do P em loop de 1,3 s; ao terminar, o arco se completa (fin).
function spinner(giro, draw) {
  const ph = (((giro % 1.3) + 1.3) % 1.3) / 1.3;
  const lb = EASE.draw(clamp(ph / 0.6, 0, 1)), la = EASE.draw(clamp((ph - 0.4) / 0.6, 0, 1));
  const fin = draw(Y + 3.0, Y + 3.45);
  return { arcA: la * (1 - fin), arcB: lb + (1 - lb) * fin, fin };
}

function Desktop({ T, giro, etapas, reduzido, kpis = KPI, automacoes = AUTOS }) {
  const { enter, draw, pop } = relogio(T);
  const lt = giro;
  const sideX = lerp(-300, 0, enter(S + 5.0, S + 5.8));
  const mainOp = draw(S + 5.3, S + 6.0);
  const shX = ((((lt + 2) % 1.6) + 1.6) % 1.6) / 1.6 * 2300 - 300;
  const res = (d = 0) => enter(Y + 3.9 + d, Y + 4.6 + d);
  const sk = (d = 0) => 1 - res(d);
  const navI = ["Visão geral", "Projetos", "Clientes", "Propostas", "Financeiro", "Automações"];
  const navW = [130, 100, 118, 92, 124, 108];
  const bars = [0.42, 0.5, 0.46, 0.58, 0.55, 0.63, 0.6, 0.7, 0.66, 0.78, 0.74, 0.9];
  const cIn = pop(Y - 0.1, Y + 0.5), cOut = draw(Y + 3.5, Y + 4.0);
  const cScale = reduzido ? 1 : lerp(0.92, 1, cIn) * (1 - 0.04 * cOut), cOp = clamp(cIn, 0, 1) * (1 - cOut);
  const sp = spinner(giro, draw);
  const lprog = interpolate([0.3, 1.2, 2.1, 3.0], [0, 0.34, 0.67, 1], EASE.draw)(T - Y);
  const dimOp = draw(Y - 0.2, Y + 0.3) * (1 - draw(Y + 3.5, Y + 4.0));
  const logo = enter(S + 5.0, S + 5.8);
  return (
    <>
      <div style={{ position: "absolute", left: sideX, top: 0, width: 300, height: 1080, background: C.panel, borderRight: `1px solid ${a(C.neutral, 7)}` }}>
        <ProgMark cx={53.06} cy={64} s={44} opacity={logo} />
        <ProgWordmark x={79.2} cy={64} size={28} reveal={logo} />
        {navI.map((n, i) => {
          const y = 168 + i * 60, r = res(i * 0.04);
          return (
            <Fragment key={n}>
              <Skel x={44} y={y + 16} w={18} h={18} r={9} op={sk(i * 0.04)} shX={shX - sideX} />
              <Skel x={80} y={y + 17} w={navW[i]} h={16} op={sk(i * 0.04)} shX={shX - sideX} />
              <div style={{ position: "absolute", left: 24, top: y, width: 252, height: 50, borderRadius: 14, display: "flex", alignItems: "center", padding: "0 20px", gap: 14,
                background: i === 0 ? a(C.acc, 14) : "transparent", opacity: r, fontFamily: F.dm, fontSize: 22,
                color: i === 0 ? C.accS : C.nav, fontWeight: i === 0 ? 600 : 400 }}>{n}</div>
            </Fragment>
          );
        })}
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: mainOp }}>
        <Skel x={360} y={50} w={300} h={30} op={sk()} shX={shX} />
        <div style={{ position: "absolute", left: 360, top: 38, fontFamily: F.sora, fontWeight: 600, fontSize: 46, letterSpacing: "-.035em", color: C.text, opacity: res() }}>Visão geral</div>
        <Skel x={1700} y={46} w={160} h={36} r={18} op={sk()} shX={shX} />
        <div style={{ position: "absolute", right: 60, top: 44, padding: "8px 20px", borderRadius: 999, border: `1px solid ${a(C.neutral, 14)}`, fontFamily: F.mono, fontSize: 18, letterSpacing: ".12em", color: C.mut, opacity: res() }}>OUT 2026</div>
        {kpis.map(([l, v], i) => {
          const x = 360 + i * 381, y = 140, d = 0.05 + i * 0.06;
          return (
            <Fragment key={l}>
              <div style={{ ...cardBox(24), left: x, top: y, width: 357, height: 170 }} />
              <Skel x={x + 30} y={y + 40} w={150} h={16} op={sk(d)} shX={shX} />
              <Skel x={x + 30} y={y + 88} w={200} h={44} r={10} op={sk(d)} shX={shX} />
              <div style={{ position: "absolute", left: x + 30, top: y + 32, fontFamily: F.dm, fontSize: 21, color: C.mut2, opacity: res(d) }}>{l}</div>
              <div style={{ position: "absolute", left: x + 30, top: y + 76, fontFamily: F.sora, fontWeight: 600, fontSize: 54, letterSpacing: "-.04em", color: C.text, opacity: res(d), transform: `translateY(${(1 - res(d)) * 14}px)` }}>{v}</div>
            </Fragment>
          );
        })}
        <div style={{ ...cardBox(24), left: 360, top: 334, width: 1095, height: 686 }} />
        <Skel x={396} y={376} w={280} h={20} op={sk(0.1)} shX={shX} />
        <div style={{ position: "absolute", left: 396, top: 370, fontFamily: F.dm, fontSize: 23, color: C.mut, opacity: res(0.1) }}>Receita · últimos 12 meses</div>
        <Skel x={408} y={450} w={999} h={500} r={16} op={sk(0.1)} shX={shX} />
        {bars.map((b, i) => {
          const h = b * 470 * enter(Y + 4.0 + i * 0.04, Y + 4.8 + i * 0.04);
          return <div key={i} style={{ position: "absolute", left: 408 + i * 83.25 + 13, top: 956 - h, width: 56, height: h, borderRadius: "10px 10px 4px 4px", background: i === 11 ? C.acc : a(C.acc, 30) }} />;
        })}
        <div style={{ ...cardBox(24), left: 1479, top: 334, width: 381, height: 686 }} />
        <Skel x={1513} y={376} w={200} h={20} op={sk(0.15)} shX={shX} />
        <div style={{ position: "absolute", left: 1513, top: 370, fontFamily: F.dm, fontSize: 23, color: C.mut, opacity: res(0.15) }}>Automações ativas</div>
        {automacoes.map(([n, f], i) => {
          const y = 450 + i * 104, d = 0.2 + i * 0.05;
          return (
            <Fragment key={n}>
              <Skel x={1513} y={y + 8} w={14} h={14} r={7} op={sk(d)} shX={shX} />
              <Skel x={1543} y={y + 4} w={230} h={18} op={sk(d)} shX={shX} />
              <Skel x={1543} y={y + 36} w={120} h={12} op={sk(d)} shX={shX} />
              <div style={{ position: "absolute", left: 1513, top: y, display: "flex", gap: 18, opacity: res(d) }}>
                <span style={{ width: 12, height: 12, marginTop: 9, borderRadius: "50%", background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontFamily: F.dm, fontSize: 22, color: C.body }}>{n}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 16, letterSpacing: ".08em", color: C.dim }}>{f}</span>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 300, top: 0, width: 1620, height: 1080, background: a(C.ink, 55), opacity: dimOp }} />
      {cOp > 0.001 && (
        <div style={{ position: "absolute", left: 810, top: 325, width: 600, height: 430, borderRadius: 32, background: C.surf, border: `1px solid ${a(C.neutral, 12)}`,
          boxShadow: `0 40px 120px ${a(C.ink, 55)}`, opacity: cOp, transform: `scale(${cScale})` }}>
          <div style={{ position: "absolute", left: 150, top: 40, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${a(C.accD, 30)}, transparent 65%)` }} />
          <ProgMark cx={300} cy={118} s={128} arcA={reduzido ? 0 : sp.arcA} arcB={reduzido ? 1 : sp.arcB} track={0.16} ring={reduzido ? 0 : 1} ringOp={0.55 * (1 - sp.fin)} rot={giro * 90} ringColor={C.acc} />
          <Etapas etapas={etapas} giro={giro} enter={enter} x={150} y={222} gap={18} dot={20} ponto={12} gapTxt={16} fs={24} borda={2} desloc={-14} sombra={10} reduzido={reduzido} />
          <Bar x={100} y={380} w={400} p={lprog} />
        </div>
      )}
    </>
  );
}

function Etapas({ etapas, giro, enter, x, y, gap, dot, ponto, gapTxt, fs, borda, desloc, sombra, reduzido }) {
  const off = (dot - ponto) / 2;
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", flexDirection: "column", gap }}>
      {etapas.map((s, i) => {
        const ap = enter(Y + 0.3 + i * 0.9, Y + 0.7 + i * 0.9), dn = enter(Y + 1.2 + i * 0.9, Y + 1.5 + i * 0.9);
        return (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: gapTxt, opacity: ap, transform: reduzido ? "none" : `translateX(${(1 - ap) * desloc}px)` }}>
            <span style={{ position: "relative", width: dot, height: dot, flex: "none" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `${borda}px dashed ${C.acc}`, opacity: 1 - dn, transform: `rotate(${reduzido ? 0 : giro * 240}deg)` }} />
              <span style={{ position: "absolute", left: off, top: off, width: ponto, height: ponto, borderRadius: "50%", background: C.green, boxShadow: `0 0 ${sombra}px ${C.green}`, transform: `scale(${dn})` }} />
            </span>
            <span style={{ fontFamily: F.dm, fontSize: fs, color: dn > 0.5 ? C.body : C.mut2 }}>{s}</span>
          </div>
        );
      })}
    </div>
  );
}

const KPI_M = [["Receita do mês", "R$ 184 mil"], ["Pedidos", "1.284"], ["Clientes", "312"], ["Automações", "27"]];
const MW = 390;

function Mobile({ T, giro, etapas, reduzido, kpis = KPI_M }) {
  const { enter, draw, pop } = relogio(T);
  const lt = giro;
  const shX = ((((lt + 2) % 1.4) + 1.4) % 1.4) / 1.4 * 900 - 300;
  const res = (d = 0) => enter(Y + 3.9 + d, Y + 4.6 + d);
  const sk = (d = 0) => 1 - res(d);
  const mainOp = draw(S + 5.2, S + 5.9);
  const tabY = lerp(110, 0, enter(S + 5.0, S + 5.8));
  const bars = [0.46, 0.55, 0.5, 0.63, 0.6, 0.72, 0.68, 0.9];
  const tabs = ["Início", "Projetos", "Clientes", "Mais"];
  const sIn = pop(Y - 0.15, Y + 0.55), sOut = draw(Y + 3.5, Y + 4.0);
  const sheetY = reduzido ? (sIn > 0.5 && sOut < 0.5 ? 0 : 440) : lerp(420, 0, sIn) + 440 * sOut;
  const dimOp = draw(Y - 0.2, Y + 0.3) * (1 - draw(Y + 3.5, Y + 4.0));
  const sp = spinner(giro, draw);
  const lprog = interpolate([0.3, 1.2, 2.1, 3.0], [0, 0.34, 0.67, 1], EASE.draw)(T - Y);
  return (
    <>
      {/* Cabeçalho que permanece (a mesma logo do site). */}
      <Line x={0} y={112} w={MW} h={1} color={C.neutral} op={0.09} />
      <div style={{ position: "absolute", right: 20, top: 70, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ width: 22, height: 2, borderRadius: 2, background: C.text }} />
        <span style={{ width: 14, height: 2, borderRadius: 2, background: C.text, marginLeft: 8 }} />
      </div>
      <ProgMark cx={30.1} cy={76} s={34} ringW={0.7} dash={3.2} gap={2.8} />
      <ProgWordmark x={49.2} cy={76} size={22} />
      <div style={{ position: "absolute", inset: 0, opacity: mainOp }}>
        <Skel x={20} y={136} w={150} h={22} op={sk()} shX={shX} />
        <div style={{ position: "absolute", left: 20, top: 128, fontFamily: F.sora, fontWeight: 600, fontSize: 28, letterSpacing: "-.035em", color: C.text, opacity: res() }}>Visão geral</div>
        {kpis.map(([l, v], i) => {
          const x = 20 + (i % 2) * 181, y = 184 + Math.floor(i / 2) * 112, d = 0.05 + i * 0.06;
          return (
            <Fragment key={l}>
              <div style={{ ...cardBox(18), left: x, top: y, width: 169, height: 100 }} />
              <Skel x={x + 16} y={y + 22} w={80} h={10} op={sk(d)} shX={shX} />
              <Skel x={x + 16} y={y + 50} w={110} h={26} r={7} op={sk(d)} shX={shX} />
              <div style={{ position: "absolute", left: x + 16, top: y + 17, fontFamily: F.dm, fontSize: 13, color: C.mut2, opacity: res(d) }}>{l}</div>
              <div style={{ position: "absolute", left: x + 16, top: y + 44, fontFamily: F.sora, fontWeight: 600, fontSize: 30, letterSpacing: "-.04em", color: C.text, opacity: res(d), transform: `translateY(${(1 - res(d)) * 8}px)` }}>{v}</div>
            </Fragment>
          );
        })}
        <div style={{ ...cardBox(18), left: 20, top: 408, width: 350, height: 336 }} />
        <Skel x={38} y={430} w={150} h={12} op={sk(0.1)} shX={shX} />
        <div style={{ position: "absolute", left: 38, top: 425, fontFamily: F.dm, fontSize: 14, color: C.mut, opacity: res(0.1) }}>Receita · últimos 8 meses</div>
        <Skel x={40} y={470} w={310} h={254} r={12} op={sk(0.1)} shX={shX} />
        {bars.map((b, i) => {
          const h = b * 230 * enter(Y + 4.0 + i * 0.05, Y + 4.8 + i * 0.05);
          return <div key={i} style={{ position: "absolute", left: 40 + i * 38.75 + 6, top: 724 - h, width: 27, height: h, borderRadius: "7px 7px 3px 3px", background: i === 7 ? C.acc : a(C.acc, 30) }} />;
        })}
      </div>
      <div style={{ position: "absolute", left: 0, top: 760 + tabY, width: MW, height: 84, background: C.panel, borderTop: `1px solid ${a(C.neutral, 8)}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", paddingTop: 10 }}>
        {tabs.map((t, i) => (
          <div key={t} style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, border: `1.6px solid ${i === 0 ? C.accS : C.dim}`, background: i === 0 ? a(C.acc, 18) : "transparent" }} />
            <span style={{ fontFamily: F.dm, fontSize: 11, color: i === 0 ? C.accS : C.mut2, fontWeight: i === 0 ? 600 : 400, opacity: res(0.1 + i * 0.03) }}>{t}</span>
            <span style={{ position: "absolute", top: 34, width: 40, height: 8, borderRadius: 4, background: a(C.neutral, 8), opacity: sk(0.1 + i * 0.03) }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", inset: 0, background: a(C.ink, 60), opacity: dimOp }} />
      {sheetY < 439 && (
        <div style={{ position: "absolute", left: 0, top: 444, width: MW, height: 420, borderRadius: "28px 28px 0 0", background: C.surf, borderTop: `1px solid ${a(C.neutral, 14)}`, boxShadow: `0 -20px 60px ${a(C.ink, 50)}`, transform: `translateY(${sheetY}px)` }}>
          <div style={{ position: "absolute", left: 177, top: 10, width: 36, height: 5, borderRadius: 3, background: a(C.neutral, 22) }} />
          <div style={{ position: "absolute", left: 95, top: -14, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${a(C.accD, 30)}, transparent 65%)` }} />
          <ProgMark cx={195} cy={86} s={84} arcA={reduzido ? 0 : sp.arcA} arcB={reduzido ? 1 : sp.arcB} track={0.16} ring={reduzido ? 0 : 1} ringOp={0.55 * (1 - sp.fin)} rot={giro * 90} ringColor={C.acc} ringW={0.7} dash={3.2} gap={2.8} />
          <Etapas etapas={etapas} giro={giro} enter={enter} x={104} y={154} gap={13} dot={14} ponto={8} gapTxt={11} fs={15.5} borda={1.5} desloc={-8} sombra={8} reduzido={reduzido} />
          <Bar x={75} y={276} w={240} p={lprog} />
        </div>
      )}
    </>
  );
}
