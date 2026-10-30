// Prog Soluções — telas de carregamento (1920×1080, loop)
const C = {
  ink: '#08080a', panel: '#0d0e13', surf: '#12141a', paper: '#f2f3f5', white: '#ffffff',
  text: '#f4f5f7', body: '#eceef1', mut: '#a3a8b2', mut2: '#8b919b', dim: '#6d727c', mutD: '#5d626b',
  acc: '#81aaf7', accS: '#b1d2ff', accD: '#3860ac', green: '#5fd37f',
  line: 'oklch(70% 0 0 / .09)', card: 'linear-gradient(180deg, oklch(70% 0 0 / .05), oklch(70% 0 0 / .015))',
};
const F = { sora: 'Sora, sans-serif', dm: "'DM Sans', sans-serif", mono: "'JetBrains Mono', monospace" };
const MOTION = { enter: Easing.easeOutExpo, draw: Easing.easeInOutCubic, pop: Easing.easeOutBack };
const ARC = 'M24.25 6H26.25A12 12 0 0 1 26.25 30H24.25A4 4 0 0 1 24.25 22H26.25A4 4 0 0 0 26.25 14H24.25A4 4 0 0 1 24.25 6Z';
const lerp = (a, b, p) => a + (b - a) * p;
const pct = (p) => String(Math.round(clamp(p, 0, 1) * 100)).padStart(3, '0') + '%';

const ClockCtx = React.createContext(null);
function useMo() {
  const comp = useComposition();
  const o = React.useContext(ClockCtx);
  const { T, CUES } = o || comp;
  const mk = (ease) => (s, e, f = 0, t = 1) => animate({ from: f, to: t, start: s, end: e, ease })(T);
  return { T, CUES, enter: mk(MOTION.enter), draw: mk(MOTION.draw), pop: mk(MOTION.pop) };
}

function LShot({ from, to, children }) {
  const { T } = useMo();
  return T >= from && T < to ? <>{children}</> : null;
}

function ringD(cx, cy, r, p) {
  p = clamp(p, 0, 1);
  if (p <= 0.001) return '';
  if (p >= 0.999) return `M${cx} ${cy - r}A${r} ${r} 0 1 1 ${cx} ${cy + r}A${r} ${r} 0 1 1 ${cx} ${cy - r}`;
  const a = -Math.PI / 2 + p * 2 * Math.PI;
  return `M${cx} ${cy - r}A${r} ${r} 0 ${p > 0.5 ? 1 : 0} 1 ${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
}

let __mk = 0;
function Mark({ cx, cy, s, stem = 1, arcA = 0, arcB = 1, track = 0, ring = 0, ringOp = 1, rot = 0, ringScale = 1,
  stemColor = C.text, arcColor = C.acc, ringColor = C.accS, opacity = 1, ringW = 1.6, dash = 7, gap = 6 }) {
  const idRef = React.useRef(null);
  if (!idRef.current) idRef.current = 'pmk' + (++__mk);
  if (opacity <= 0.001 || s <= 0.5) return null;
  const k = s / 48, span = Math.max(0, arcB - arcA), id = idRef.current;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" style={{ position: 'absolute', left: cx - s / 2, top: cy - s / 2, overflow: 'visible', opacity }}>
      <defs>
        <mask id={id} maskUnits="userSpaceOnUse" x="-12" y="-12" width="72" height="72">
          <path d="M20 10H26.25A8 8 0 0 1 26.25 26H20" fill="none" stroke="#fff" strokeWidth="8.8" pathLength="1"
            strokeDasharray={`${span} 3`} strokeDashoffset={-arcA} />
        </mask>
      </defs>
      {track > 0.001 && <path d={ARC} fill={arcColor} opacity={track} />}
      {span > 0.001 && <path d={ARC} fill={arcColor} mask={`url(#${id})`} />}
      {stem > 0.01 && <rect x="9.75" y={42 - 36 * stem} width="8" height={36 * stem} rx="4" fill={stemColor} />}
      {ring > 0.001 && ringOp > 0.001 && (
        <path transform={`rotate(${rot} 26.25 18)`} d={ringD(26.25, 18, 12 * ringScale, ring)} fill="none" stroke={ringColor}
          strokeWidth={ringW / k} strokeDasharray={`${dash / k} ${gap / k}`} opacity={ringOp} />
      )}
    </svg>
  );
}

function Word({ x, cy, size, reveal, dark = true, opacity = 1 }) {
  if (reveal <= 0.001 || opacity <= 0.001) return null;
  return (
    <div style={{
      position: 'absolute', left: x, top: cy - size / 2, fontFamily: F.sora, fontSize: size, lineHeight: 1,
      letterSpacing: '-.03em', whiteSpace: 'nowrap', color: dark ? C.text : C.ink, paddingRight: '.08em',
      clipPath: `inset(-20% ${(1 - reveal) * 100}% -20% 0)`, transform: `translateX(${-(1 - reveal) * size * 0.25}px)`,
      opacity: opacity * Math.min(1, reveal * 2.5),
    }}>
      <span style={{ fontWeight: 600 }}>Prog</span> <span style={{ fontWeight: 400, color: dark ? C.mut : C.mutD }}>Soluções</span>
    </div>
  );
}

function Line({ x, y, w, h, color = C.acc, op = 0.38 }) {
  if (w <= 0.5 || h <= 0.5) return null;
  return <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: color, opacity: op }} />;
}

function Bar({ x, y, w, p, light }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: 3, borderRadius: 3, background: light ? 'rgba(8,8,10,.08)' : 'oklch(70% 0 0 / .1)', overflow: 'hidden' }}>
      <div style={{ width: `${clamp(p, 0, 1) * 100}%`, height: '100%', borderRadius: 3, background: light ? C.accD : `linear-gradient(90deg, ${C.acc}, ${C.accS})` }} />
    </div>
  );
}

function Pill({ n, t, light }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 16, padding: '14px 26px', borderRadius: 999,
      background: light ? C.white : 'rgba(18,20,26,.88)', border: `1px solid ${light ? 'rgba(8,8,10,.1)' : 'oklch(70% 0 0 / .14)'}`,
      fontFamily: F.mono, fontSize: 20, letterSpacing: '.12em', textTransform: 'uppercase', color: light ? C.mutD : C.mut,
    }}><span style={{ color: light ? C.accD : C.acc }}>{n}</span>{t}</span>
  );
}

// ── Splash: construction annotations, progress ─────────────────────────────
function SplashLayer({ g }) {
  const { T, CUES, enter, draw } = useMo();
  const S = CUES.Site;
  const k = g.s / 48, X = (u) => g.cx + (u - 24) * k, Yu = (u) => g.cy + (u - 24) * k;
  const lines = [6, 30, 42].map((u, i) => {
    const a = draw(3.25 + i * 0.06, 3.9 + i * 0.06), b = draw(0.3 + i * 0.12, 1.1 + i * 0.12);
    return <Line key={'h' + u} x={a * 1920} y={Yu(u) - 0.75} w={(b - a) * 1920} h={1.5} op={u === 30 ? 0.5 : 0.34} />;
  });
  const vlines = [9.75, 38.25].map((u, i) => {
    const a = draw(3.3 + i * 0.06, 3.95 + i * 0.06), b = draw(0.5 + i * 0.12, 1.3 + i * 0.12);
    return <Line key={'v' + u} x={X(u) - 0.75} y={a * 1080} w={1.5} h={(b - a) * 1080} op={0.3} />;
  });
  const out = 1 - draw(3.05, 3.45);
  const an = (i) => enter(1.95 + i * 0.18, 2.6 + i * 0.18) * out;
  const lab = { position: 'absolute', fontFamily: F.mono, fontSize: 22, color: C.accS, whiteSpace: 'nowrap' };
  const hud = draw(0.2, 0.8) * (1 - draw(3.3, 3.8));
  const progOp = draw(0.2, 0.7) * (1 - draw(5.0, 5.5));
  const prog = interpolate([0.2, 1.2, 2.2, 3.0, 4.3], [0, 0.22, 0.48, 0.71, 1], MOTION.draw)(T);
  const a0 = an(0), a1 = an(1), a2 = an(2), a3 = an(3);
  const rx = 26.25 + 12 * Math.cos(-Math.PI / 4), ry = 18 + 12 * Math.sin(-Math.PI / 4);
  return (
    <LShot from={0} to={S}>
      {lines}{vlines}
      <div style={{ opacity: a0, transform: `translateY(${(1 - a0) * 12}px)` }}>
        <Line x={X(9.75)} y={Yu(2.5)} w={8 * k} h={1.5} color={C.accS} op={0.8} />
        <Line x={X(9.75)} y={Yu(2.5) - 8} w={1.5} h={16} color={C.accS} op={0.8} />
        <Line x={X(17.75) - 1.5} y={Yu(2.5) - 8} w={1.5} h={16} color={C.accS} op={0.8} />
        <div style={{ ...lab, left: X(13.75), top: Yu(2.5) - 44, transform: 'translateX(-50%)' }}>8u</div>
      </div>
      <div style={{ opacity: a1, transform: `translateY(${(1 - a1) * 12}px)` }}>
        <Line x={X(5)} y={Yu(6)} w={1.5} h={36 * k} color={C.accS} op={0.8} />
        <Line x={X(5) - 8} y={Yu(6)} w={16} h={1.5} color={C.accS} op={0.8} />
        <Line x={X(5) - 8} y={Yu(42) - 1.5} w={16} h={1.5} color={C.accS} op={0.8} />
        <div style={{ ...lab, left: X(5) - 22, top: Yu(24) - 13, transform: 'translateX(-100%)' }}>36u</div>
      </div>
      <div style={{ opacity: a2, transform: `translateY(${(1 - a2) * 12}px)` }}>
        <div style={{ position: 'absolute', left: X(rx) - 5, top: Yu(ry) - 5, width: 10, height: 10, borderRadius: '50%', background: C.accS }} />
        <Line x={X(rx) + 10} y={Yu(ry) - 0.75} w={110} h={1.5} color={C.accS} op={0.8} />
        <div style={{ ...lab, left: X(rx) + 136, top: Yu(ry) - 14 }}>r 12u</div>
      </div>
      <div style={{ opacity: a3, transform: `translateY(${(1 - a3) * 12}px)` }}>
        <Line x={X(17.75)} y={Yu(45.5)} w={2.5 * k} h={1.5} color={C.accS} op={0.8} />
        <Line x={X(17.75)} y={Yu(45.5) - 8} w={1.5} h={16} color={C.accS} op={0.8} />
        <Line x={X(20.25) - 1.5} y={Yu(45.5) - 8} w={1.5} h={16} color={C.accS} op={0.8} />
        <div style={{ ...lab, left: X(19), top: Yu(45.5) + 16, transform: 'translateX(-50%)' }}>2,5u</div>
      </div>
      <div style={{ position: 'absolute', left: 96, top: 56, fontFamily: F.mono, fontSize: 22, letterSpacing: '.22em', color: C.accS, opacity: hud }}>PROG · 01</div>
      <div style={{ position: 'absolute', right: 96, top: 56, fontFamily: F.mono, fontSize: 22, letterSpacing: '.22em', color: C.dim, opacity: hud }}>SÍMBOLO · GRADE 48U</div>
      <div style={{ opacity: progOp }}>
        <div style={{ position: 'absolute', left: 750, top: 892, width: 420, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 20, letterSpacing: '.24em', color: C.dim }}>
          <span>CARREGANDO</span><span style={{ color: C.acc, letterSpacing: '.08em' }}>{pct(prog)}</span>
        </div>
        <Bar x={750} y={934} w={420} p={prog} />
      </div>
    </LShot>
  );
}

// ── Site: page reveal ───────────────────────────────────────────────────────
function SiteLayer() {
  const { T, CUES, enter, draw } = useMo();
  const S = CUES.Site, Y = CUES.Sistema;
  const prog = interpolate([0.3, 1.2, 1.7, 2.4, 2.9], [0, 0.38, 0.46, 0.86, 1], MOTION.draw)(T - S);
  const ldOp = draw(S + 0.1, S + 0.5) * (1 - draw(S + 2.85, S + 3.15));
  const exit = 1 - draw(S + 4.85, S + 5.3);
  const nav = ['Projetos', 'Sobre', 'O que construo', 'Método', 'Contato', 'Planos'];
  const it = (i) => enter(S + 3.4 + i * 0.06, S + 4.0 + i * 0.06) * exit;
  const grad = { fontStyle: 'italic', fontWeight: 400, background: `linear-gradient(120deg, ${C.accS}, #43d5dc)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '.06em' };
  const lineR = (i) => enter(S + 3.7 + i * 0.12, S + 4.5 + i * 0.12);
  const pillOp = enter(S + 3.6, S + 4.2) * exit, ctaOp = enter(S + 4.0, S + 4.6) * exit;
  return (
    <LShot from={S - 0.2} to={Y + 0.2}>
      <div style={{ position: 'absolute', left: 0, top: 680, width: 1920, textAlign: 'center', fontFamily: F.mono, fontSize: 20, letterSpacing: '.24em', color: C.dim, opacity: ldOp }}>
        CARREGANDO PÁGINA <span style={{ color: C.acc, letterSpacing: '.08em', marginLeft: 12 }}>{pct(prog)}</span>
      </div>
      <Line x={0} y={128} w={1920 * draw(S + 3.2, S + 4.0)} h={1} color="oklch(70% 0 0)" op={0.09 * exit} />
      <div style={{ position: 'absolute', right: 96, top: 64, transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: 44 }}>
        {nav.map((n, i) => (
          <span key={n} style={{ fontFamily: F.dm, fontSize: 22, color: n === 'Planos' ? C.accS : '#9ba1ab', fontWeight: n === 'Planos' ? 600 : 400, opacity: it(i), transform: `translateY(${(1 - it(i)) * 10}px)` }}>{n}</span>
        ))}
        <span style={{ padding: '16px 30px', borderRadius: 999, background: C.paper, color: C.ink, fontFamily: F.dm, fontWeight: 600, fontSize: 20, opacity: it(6), transform: `translateY(${(1 - it(6)) * 10}px)` }}>Vamos conversar</span>
      </div>
      <div style={{ position: 'absolute', left: 96, top: 300, display: 'flex', flexDirection: 'column', gap: 34, transform: `translateY(${(1 - exit) * -18}px)` }}>
        <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 14, padding: '12px 24px 12px 18px', borderRadius: 999, border: '1px solid oklch(70% 0 0 / .12)', background: 'oklch(70% 0 0 / .045)', fontFamily: F.dm, fontSize: 21, color: '#9ba1ab', opacity: pillOp }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: C.green, boxShadow: `0 0 14px ${C.green}` }} />Disponível para novos projetos
        </div>
        <div style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 124, lineHeight: 1.04, letterSpacing: '-.045em', color: C.text }}>
          {[<>Produtos digitais que <em style={grad}>vendem</em></>, <>e <em style={grad}>organizam</em> o seu negócio.</>].map((l, i) => (
            <div key={i} style={{ overflow: 'hidden', paddingBottom: 10, marginBottom: -10 }}>
              <div style={{ transform: `translateY(${(1 - lineR(i)) * 110}%)`, opacity: exit }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, opacity: ctaOp, transform: `translateY(${(1 - ctaOp) * 14}px)` }}>
          <span style={{ padding: '22px 38px', borderRadius: 999, background: C.paper, color: C.ink, fontFamily: F.dm, fontWeight: 600, fontSize: 24 }}>Ver projetos →</span>
          <span style={{ padding: '22px 38px', borderRadius: 999, border: '1px solid oklch(70% 0 0 / .16)', color: '#d7dae0', fontFamily: F.dm, fontWeight: 500, fontSize: 24 }}>Falar no WhatsApp</span>
        </div>
      </div>
    </LShot>
  );
}

// ── Sistema: dashboard skeleton + loader card ───────────────────────────────
function Skel({ x, y, w, h, r = 8, op, shX }) {
  if (op <= 0.001) return null;
  const off = shX - x - 300;
  return <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, opacity: op,
    background: `linear-gradient(90deg, transparent 0, oklch(70% 0 0 / .11) 50%, transparent 100%) ${off}px 0 / 600px 100% no-repeat, oklch(70% 0 0 / .07)` }} />;
}

function SistemaLayer() {
  const { T, CUES, enter, draw, pop } = useMo();
  const S = CUES.Site, Y = CUES.Sistema, D = CUES.Documento;
  const lt = T - Y;
  const sideX = lerp(-300, 0, enter(S + 5.0, S + 5.8));
  const mainOp = draw(S + 5.3, S + 6.0);
  const shX = ((((lt + 2) % 1.6) + 1.6) % 1.6) / 1.6 * 2300 - 300;
  const res = (d = 0) => enter(Y + 3.9 + d, Y + 4.6 + d);
  const sk = (d = 0) => 1 - res(d);
  const navI = ['Visão geral', 'Projetos', 'Clientes', 'Propostas', 'Financeiro', 'Automações'];
  const navW = [130, 100, 118, 92, 124, 108];
  const kpi = [['Receita do mês', 'R$ 184 mil'], ['Pedidos', '1.284'], ['Clientes ativos', '312'], ['Automações', '27']];
  const bars = [0.42, 0.5, 0.46, 0.58, 0.55, 0.63, 0.6, 0.7, 0.66, 0.78, 0.74, 0.9];
  const autos = [['Emissão de NF-e', 'diária'], ['Cobrança recorrente', 'mensal'], ['Lembretes WhatsApp', 'tempo real'], ['Integração ERP ↔ CRM', 'a cada 5 min'], ['Relatório semanal', 'segunda, 8h']];
  const cardBox = { position: 'absolute', borderRadius: 24, background: C.card, border: `1px solid ${C.line}` };
  // loader card
  const cIn = pop(Y - 0.1, Y + 0.5), cOut = draw(Y + 3.5, Y + 4.0);
  const cScale = lerp(0.92, 1, cIn) * (1 - 0.04 * cOut), cOp = clamp(cIn, 0, 1) * (1 - cOut);
  const ph = ((((lt % 1.3) + 1.3) % 1.3)) / 1.3;
  const lb = MOTION.draw(clamp(ph / 0.6, 0, 1)), la = MOTION.draw(clamp((ph - 0.4) / 0.6, 0, 1));
  const fin = draw(Y + 3.0, Y + 3.45);
  const steps = ['Conectando ao ERP', 'Sincronizando CRM', 'Montando painel'];
  const lprog = interpolate([0.3, 1.2, 2.1, 3.0], [0, 0.34, 0.67, 1], MOTION.draw)(lt);
  const dimOp = draw(Y - 0.2, Y + 0.3) * (1 - draw(Y + 3.5, Y + 4.0));
  return (
    <LShot from={S + 4.8} to={D + 0.4}>
      <div style={{ position: 'absolute', left: sideX, top: 0, width: 300, height: 1080, background: C.panel, borderRight: `1px solid oklch(70% 0 0 / .07)` }}>
        {navI.map((n, i) => {
          const y = 168 + i * 60, r = res(i * 0.04);
          return (
            <React.Fragment key={n}>
              <Skel x={44} y={y + 16} w={18} h={18} r={9} op={sk(i * 0.04)} shX={shX - sideX} />
              <Skel x={80} y={y + 17} w={navW[i]} h={16} op={sk(i * 0.04)} shX={shX - sideX} />
              <div style={{ position: 'absolute', left: 24, top: y, width: 252, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', padding: '0 20px', gap: 14,
                background: i === 0 ? 'oklch(72% .1 262 / .14)' : 'transparent', opacity: r, fontFamily: F.dm, fontSize: 22,
                color: i === 0 ? C.accS : '#9ba1ab', fontWeight: i === 0 ? 600 : 400 }}>{n}</div>
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ position: 'absolute', inset: 0, opacity: mainOp }}>
        <Skel x={360} y={50} w={300} h={30} op={sk()} shX={shX} />
        <div style={{ position: 'absolute', left: 360, top: 38, fontFamily: F.sora, fontWeight: 600, fontSize: 46, letterSpacing: '-.035em', color: C.text, opacity: res() }}>Visão geral</div>
        <Skel x={1700} y={46} w={160} h={36} r={18} op={sk()} shX={shX} />
        <div style={{ position: 'absolute', right: 60, top: 44, padding: '8px 20px', borderRadius: 999, border: '1px solid oklch(70% 0 0 / .14)', fontFamily: F.mono, fontSize: 18, letterSpacing: '.12em', color: C.mut, opacity: res() }}>OUT 2026</div>
        {kpi.map(([l, v], i) => {
          const x = 360 + i * 381, y = 140, d = 0.05 + i * 0.06;
          return (
            <React.Fragment key={l}>
              <div style={{ ...cardBox, left: x, top: y, width: 357, height: 170 }} />
              <Skel x={x + 30} y={y + 40} w={150} h={16} op={sk(d)} shX={shX} />
              <Skel x={x + 30} y={y + 88} w={200} h={44} r={10} op={sk(d)} shX={shX} />
              <div style={{ position: 'absolute', left: x + 30, top: y + 32, fontFamily: F.dm, fontSize: 21, color: C.mut2, opacity: res(d) }}>{l}</div>
              <div style={{ position: 'absolute', left: x + 30, top: y + 76, fontFamily: F.sora, fontWeight: 600, fontSize: 54, letterSpacing: '-.04em', color: C.text, opacity: res(d), transform: `translateY(${(1 - res(d)) * 14}px)` }}>{v}</div>
            </React.Fragment>
          );
        })}
        <div style={{ ...cardBox, left: 360, top: 334, width: 1095, height: 686 }} />
        <Skel x={396} y={376} w={280} h={20} op={sk(0.1)} shX={shX} />
        <div style={{ position: 'absolute', left: 396, top: 370, fontFamily: F.dm, fontSize: 23, color: C.mut, opacity: res(0.1) }}>Receita · últimos 12 meses</div>
        <Skel x={408} y={450} w={999} h={500} r={16} op={sk(0.1)} shX={shX} />
        {bars.map((b, i) => {
          const h = b * 470 * enter(Y + 4.0 + i * 0.04, Y + 4.8 + i * 0.04);
          return <div key={i} style={{ position: 'absolute', left: 408 + i * 83.25 + 13, top: 956 - h, width: 56, height: h, borderRadius: '10px 10px 4px 4px', background: i === 11 ? C.acc : 'oklch(72% .1 262 / .3)' }} />;
        })}
        <div style={{ ...cardBox, left: 1479, top: 334, width: 381, height: 686 }} />
        <Skel x={1513} y={376} w={200} h={20} op={sk(0.15)} shX={shX} />
        <div style={{ position: 'absolute', left: 1513, top: 370, fontFamily: F.dm, fontSize: 23, color: C.mut, opacity: res(0.15) }}>Automações ativas</div>
        {autos.map(([n, f], i) => {
          const y = 450 + i * 104, d = 0.2 + i * 0.05;
          return (
            <React.Fragment key={n}>
              <Skel x={1513} y={y + 8} w={14} h={14} r={7} op={sk(d)} shX={shX} />
              <Skel x={1543} y={y + 4} w={230} h={18} op={sk(d)} shX={shX} />
              <Skel x={1543} y={y + 36} w={120} h={12} op={sk(d)} shX={shX} />
              <div style={{ position: 'absolute', left: 1513, top: y, display: 'flex', gap: 18, opacity: res(d) }}>
                <span style={{ width: 12, height: 12, marginTop: 9, borderRadius: '50%', background: C.green, boxShadow: `0 0 10px ${C.green}` }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={{ fontFamily: F.dm, fontSize: 22, color: C.body }}>{n}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 16, letterSpacing: '.08em', color: C.dim }}>{f}</span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 300, top: 0, width: 1620, height: 1080, background: 'rgba(8,8,10,.55)', opacity: dimOp }} />
      {cOp > 0.001 && (
        <div style={{ position: 'absolute', left: 810, top: 325, width: 600, height: 430, borderRadius: 32, background: C.surf, border: '1px solid oklch(70% 0 0 / .12)',
          boxShadow: '0 40px 120px rgba(0,0,0,.55)', opacity: cOp, transform: `scale(${cScale})` }}>
          <div style={{ position: 'absolute', left: 150, top: 40, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, oklch(50% .13 262 / .3), transparent 65%)', filter: 'blur(20px)' }} />
          <Mark cx={300} cy={118} s={128} arcA={la * (1 - fin)} arcB={lb + (1 - lb) * fin} track={0.16} ring={1} ringOp={0.55 * (1 - fin)} rot={lt * 90} ringColor={C.acc} />
          <div style={{ position: 'absolute', left: 150, top: 222, display: 'flex', flexDirection: 'column', gap: 18 }}>
            {steps.map((s, i) => {
              const ap = enter(Y + 0.3 + i * 0.9, Y + 0.7 + i * 0.9), dn = enter(Y + 1.2 + i * 0.9, Y + 1.5 + i * 0.9);
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: ap, transform: `translateX(${(1 - ap) * -14}px)` }}>
                  <span style={{ position: 'relative', width: 20, height: 20, flex: 'none' }}>
                    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px dashed ${C.acc}`, opacity: 1 - dn, transform: `rotate(${lt * 240}deg)` }} />
                    <span style={{ position: 'absolute', left: 4, top: 4, width: 12, height: 12, borderRadius: '50%', background: C.green, boxShadow: `0 0 10px ${C.green}`, transform: `scale(${dn})` }} />
                  </span>
                  <span style={{ fontFamily: F.dm, fontSize: 24, color: dn > 0.5 ? C.body : C.mut2 }}>{s}</span>
                </div>
              );
            })}
          </div>
          <Bar x={100} y={380} w={400} p={lprog} />
        </div>
      )}
    </LShot>
  );
}

// ── Documento: light theme, 2a tile ─────────────────────────────────────────
function DocLayer() {
  const { CUES, enter, draw, pop, T } = useMo();
  const D = CUES.Documento;
  const tIn = pop(D + 0.15, D + 0.75), up = draw(D + 3.9, D + 4.1), down = draw(D + 4.1, D + 4.5);
  const scale = lerp(0.86, 1, tIn) * (1 + 0.05 * up) * (1 - down);
  const tOp = clamp(tIn * 2, 0, 1) * (1 - draw(D + 4.3, D + 4.5));
  const gOp = 1 - draw(D + 3.4, D + 3.8);
  const k = 5.5;
  const prog = interpolate([0.4, 1.4, 2.3, 3.4], [0, 0.31, 0.62, 1], MOTION.draw)(T - D);
  const txOp = draw(D + 0.4, D + 0.8) * (1 - draw(D + 3.8, D + 4.1));
  const bgGrid = draw(D, D + 0.7) * (1 - draw(D + 3.6, D + 4.3));
  return (
    <LShot from={D - 0.9} to={D + 6}>
      <div style={{ position: 'absolute', inset: 0, opacity: bgGrid,
        backgroundImage: 'linear-gradient(oklch(20% 0 0 / .06) 1px, transparent 1px), linear-gradient(90deg, oklch(20% 0 0 / .06) 1px, transparent 1px)',
        backgroundSize: '40px 40px', backgroundPosition: '0 30px',
        WebkitMaskImage: 'radial-gradient(circle at 960px 470px, #000 0, #000 220px, transparent 700px)', maskImage: 'radial-gradient(circle at 960px 470px, #000 0, #000 220px, transparent 700px)' }} />
      {tOp > 0.001 && (
        <div style={{ position: 'absolute', left: 960 - 132, top: 470 - 132, width: 264, height: 264, borderRadius: 34, background: C.white, overflow: 'hidden',
          border: `1.5px solid oklch(50% .13 262 / ${0.35 * gOp + 0.08})`, boxShadow: '0 30px 70px rgba(8,8,10,.10)', opacity: tOp, transform: `scale(${scale})` }}>
          <div style={{ position: 'absolute', inset: 0, opacity: gOp, backgroundImage: 'linear-gradient(oklch(20% 0 0 / .07) 1px, transparent 1px), linear-gradient(90deg, oklch(20% 0 0 / .07) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
          {[6, 30, 42].map((u, i) => <Line key={u} x={0} y={u * k - 0.75} w={264 * draw(D + 0.4 + i * 0.1, D + 1.0 + i * 0.1)} h={1.5} color={C.accD} op={0.45 * gOp} />)}
          {[9.75, 38.25].map((u, i) => <Line key={u} x={u * k - 0.75} y={0} w={1.5} h={264 * draw(D + 0.55 + i * 0.1, D + 1.15 + i * 0.1)} color={C.accD} op={0.35 * gOp} />)}
          <Mark cx={132} cy={132} s={264} stem={pop(D + 1.1, D + 1.6)} arcB={draw(D + 1.4, D + 2.2)} ring={draw(D + 0.7, D + 1.4)} ringOp={gOp}
            stemColor={C.ink} arcColor={C.accD} ringColor={C.accD} />
          <div style={{ position: 'absolute', right: 18, top: 11, fontFamily: F.mono, fontSize: 12, letterSpacing: '.16em', color: C.accD, opacity: draw(D + 0.9, D + 1.3) * gOp }}>PROG · 02</div>
        </div>
      )}
      <div style={{ opacity: txOp }}>
        <div style={{ position: 'absolute', left: 0, top: 668, width: 1920, textAlign: 'center', fontFamily: F.mono, fontSize: 20, letterSpacing: '.24em', color: C.mutD }}>
          GERANDO PROPOSTA COMERCIAL <span style={{ color: C.accD, letterSpacing: '.08em', marginLeft: 12 }}>{pct(prog)}</span>
        </div>
        <Bar x={750} y={716} w={420} p={prog} light />
      </div>
    </LShot>
  );
}

// ── Piece ───────────────────────────────────────────────────────────────────
function Piece({ labels }) {
  const { T, CUES, enter, draw, pop } = useMo();
  const S = CUES.Site, Y = CUES.Sistema, D = CUES.Documento;

  // main mark geometry: splash → lockup → site loader → header → sidebar
  let cx = 960, cy = 540, s = lerp(500, 480, draw(0, 3.4));
  const a = enter(3.35, 4.35); cx = lerp(cx, 590, a); s = lerp(s, 156, a);
  const b = draw(S - 0.6, S + 0.15); cx = lerp(cx, 960, b); s = lerp(s, 128, b);
  const c = enter(S + 3.0, S + 3.8); cx = lerp(cx, 111.44, c); cy = lerp(cy, 64, c); s = lerp(s, 52, c);
  const d = enter(S + 5.0, S + 5.8); cx = lerp(cx, 53.06, d); s = lerp(s, 44, d);

  const siteProg = interpolate([0.3, 1.2, 1.7, 2.4, 2.9], [0, 0.38, 0.46, 0.86, 1], MOTION.draw)(T - S);
  const arcB = T < S - 0.45 ? draw(1.7, 2.5) : T < S + 0.2 ? 1 - draw(S - 0.45, S + 0.2) : siteProg;
  const track = draw(S - 0.45, S + 0.2, 0, 0.2) * (1 - draw(S + 2.9, S + 3.4));
  const inSite = T >= S - 0.5;
  const ringOp = inSite ? 0.75 * draw(S - 0.2, S + 0.4) * (1 - enter(S + 2.9, S + 3.5)) : 0.9 * (1 - draw(3.3, 3.8));
  const ring = inSite ? 1 : draw(0.8, 1.6);
  const ringScale = inSite ? 1 + 0.6 * enter(S + 2.9, S + 3.5) : 1;
  const rot = inSite ? (T - (S - 0.5)) * 50 : 0;

  const aura = draw(0, 1.2);
  const gridU = draw(0, 0.9) * (1 - 0.75 * draw(3.3, 4.2)) * (1 - draw(S - 0.6, S));
  const gridR = lerp(0, 900, enter(0, 1.4));
  const gridSite = 0.45 * draw(S + 3.0, S + 3.9) * (1 - draw(S + 4.9, S + 5.6));
  const splashWord = enter(3.85, 4.75) * (1 - draw(S - 0.95, S - 0.5));
  const navWord = enter(S + 3.55, S + 4.2);
  const paperR = 1150 * draw(Y + 5.2, Y + 6.2);
  const inkR = 1150 * draw(D + 4.35, D + 5.3);
  const markVis = T < Y + 6.3;

  const caps = [
    { at: 0.3, until: S - 0.3, text: <Pill n="01" t="Abertura do app · planta completa" /> },
    { at: S + 0.2, until: Y - 0.4, text: <Pill n="02" t="Site · o arco é a barra de progresso" /> },
    { at: Y + 0.2, until: D - 0.6, text: <Pill n="03" t="Sistema · carregamento do painel" /> },
    { at: D + 0.3, until: D + 4.0, text: <Pill n="04" t="Documento · tema claro" light /> },
  ];

  return (
    <div data-screen-label={`Telas de carregamento · ${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', width: 1100, height: 1100, left: 960 - 550 + Math.sin(T * 0.4) * 80, top: -560 + Math.cos(T * 0.3) * 40, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(50% .13 262 / .30), transparent 65%)', filter: 'blur(40px)', opacity: aura }} />
      <div style={{ position: 'absolute', width: 820, height: 820, left: 1380 + Math.cos(T * 0.35) * 60, top: 260 + Math.sin(T * 0.28) * 50, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(46% .11 300 / .22), transparent 65%)', filter: 'blur(50px)', opacity: aura }} />
      {gridU > 0.001 && <div style={{ position: 'absolute', inset: 0, opacity: gridU,
        backgroundImage: 'linear-gradient(oklch(70% 0 0 / .11) 1px, transparent 1px), linear-gradient(90deg, oklch(70% 0 0 / .11) 1px, transparent 1px)',
        backgroundSize: '40px 40px', backgroundPosition: '0 20px',
        WebkitMaskImage: `radial-gradient(circle at 960px 540px, #000 0, #000 ${gridR * 0.35}px, transparent ${gridR}px)`,
        maskImage: `radial-gradient(circle at 960px 540px, #000 0, #000 ${gridR * 0.35}px, transparent ${gridR}px)` }} />}
      {gridSite > 0.001 && <div style={{ position: 'absolute', inset: 0, opacity: gridSite,
        backgroundImage: 'linear-gradient(oklch(70% 0 0 / .05) 1px, transparent 1px), linear-gradient(90deg, oklch(70% 0 0 / .05) 1px, transparent 1px)',
        backgroundSize: '74px 74px', WebkitMaskImage: 'radial-gradient(circle at 50% 12%, #000, transparent 80%)', maskImage: 'radial-gradient(circle at 50% 12%, #000, transparent 80%)' }} />}

      <SplashLayer g={{ cx, cy, s }} />
      <SiteLayer />
      <SistemaLayer />

      {markVis && <Mark cx={cx} cy={cy} s={s} stem={pop(1.3, 1.95)} arcB={arcB} track={track} ring={ring} ringOp={ringOp} ringScale={ringScale} rot={rot}
        ringColor={inSite ? C.acc : C.accS} />}
      <Word x={682.3} cy={540} size={100} reveal={splashWord} />
      {markVis && <Word x={lerp(142.3, 79.2, d)} cy={64} size={lerp(33, 28, d)} reveal={navWord} />}

      {paperR > 0.5 && <div style={{ position: 'absolute', inset: 0, background: C.paper, clipPath: `circle(${paperR}px at 960px 540px)` }} />}
      <DocLayer />
      {inkR > 0.5 && <div style={{ position: 'absolute', inset: 0, background: C.ink, clipPath: `circle(${inkR}px at 960px 470px)` }} />}

      {labels && <Captions items={caps} style={{ left: 'auto', right: 64, bottom: 48, textAlign: 'right', font: 'inherit', textShadow: 'none' }} />}
    </div>
  );
}

function ProgLoaders() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, labels: true });
  return (
    <>
      <CompositionStage width={1920} height={1080} bg={C.ink} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece labels={t.labels !== false} />
      </CompositionStage>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Animação" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Rótulos das telas" value={t.labels} onChange={(v) => setTweak('labels', v)} />
      </TweaksPanel>
    </>
  );
}

window.ProgLoaders = ProgLoaders;
window.PL = { C, F, MOTION, ARC, lerp, pct, useMo, LShot, ClockCtx, ringD, Mark, Word, Line, Bar, Pill, Skel, Piece };
