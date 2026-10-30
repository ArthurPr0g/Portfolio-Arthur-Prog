// Prog Soluções — telas de carregamento MOBILE (390×844 lógico, render 3x = 1170×2532)
const { C, F, MOTION, lerp, pct, useMo, LShot, ringD, Mark, Word, Line, Bar, Skel } = window.PL;
const MW = 390, MH = 844;

function StatusBar({ light }) {
  const col = light ? C.ink : C.text;
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: MW, height: 50, zIndex: 5 }}>
      <span style={{ position: 'absolute', left: 32, top: 16, fontFamily: F.dm, fontWeight: 600, fontSize: 15, color: col }}>9:41</span>
      <div style={{ position: 'absolute', right: 30, top: 19, display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          {[4, 6, 8, 10].map((h) => <span key={h} style={{ width: 3, height: h, borderRadius: 1, background: col }} />)}
        </div>
        <span style={{ position: 'relative', width: 24, height: 11, borderRadius: 3, border: `1.2px solid ${col}`, opacity: 0.9 }}>
          <span style={{ position: 'absolute', left: 1.5, top: 1.5, width: 16, height: 5.6, borderRadius: 1.5, background: col }} />
        </span>
      </div>
    </div>
  );
}

function MPill({ n, t, light }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 13px', borderRadius: 999,
      background: light ? C.white : 'rgba(18,20,26,.9)', border: `1px solid ${light ? 'rgba(8,8,10,.1)' : 'oklch(70% 0 0 / .14)'}`,
      fontFamily: F.mono, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: light ? C.mutD : C.mut }}>
      <span style={{ color: light ? C.accD : C.acc }}>{n}</span>{t}
    </span>
  );
}

function MSplash({ g }) {
  const { T, CUES, enter, draw } = useMo();
  const S = CUES.Site;
  const k = g.s / 48, X = (u) => g.cx + (u - 24) * k, Yu = (u) => g.cy + (u - 24) * k;
  const out = 1 - draw(3.05, 3.45);
  const an = (i) => enter(1.95 + i * 0.18, 2.6 + i * 0.18) * out;
  const lab = { position: 'absolute', fontFamily: F.mono, fontSize: 11, color: C.accS, whiteSpace: 'nowrap' };
  const hud = draw(0.2, 0.8) * (1 - draw(3.3, 3.8));
  const progOp = draw(0.2, 0.7) * (1 - draw(5.0, 5.5));
  const prog = interpolate([0.2, 1.2, 2.2, 3.0, 4.3], [0, 0.22, 0.48, 0.71, 1], MOTION.draw)(T);
  const [a0, a1, a2, a3] = [0, 1, 2, 3].map(an);
  const rx = 26.25 + 12 * Math.cos(-Math.PI / 4), ry = 18 + 12 * Math.sin(-Math.PI / 4);
  const dim = C.accS;
  return (
    <LShot from={0} to={S}>
      {[6, 30, 42].map((u, i) => {
        const a = draw(3.25 + i * 0.06, 3.9 + i * 0.06), b = draw(0.3 + i * 0.12, 1.1 + i * 0.12);
        return <Line key={'h' + u} x={a * MW} y={Yu(u) - 0.5} w={(b - a) * MW} h={1} op={u === 30 ? 0.5 : 0.34} />;
      })}
      {[9.75, 38.25].map((u, i) => {
        const a = draw(3.3 + i * 0.06, 3.95 + i * 0.06), b = draw(0.5 + i * 0.12, 1.3 + i * 0.12);
        return <Line key={'v' + u} x={X(u) - 0.5} y={a * MH} w={1} h={(b - a) * MH} op={0.3} />;
      })}
      <div style={{ opacity: a0, transform: `translateY(${(1 - a0) * 6}px)` }}>
        <Line x={X(9.75)} y={Yu(2.5)} w={8 * k} h={1} color={dim} op={0.8} />
        <Line x={X(9.75)} y={Yu(2.5) - 4} w={1} h={8} color={dim} op={0.8} />
        <Line x={X(17.75) - 1} y={Yu(2.5) - 4} w={1} h={8} color={dim} op={0.8} />
        <div style={{ ...lab, left: X(13.75), top: Yu(2.5) - 22, transform: 'translateX(-50%)' }}>8u</div>
      </div>
      <div style={{ opacity: a1, transform: `translateY(${(1 - a1) * 6}px)` }}>
        <Line x={X(5)} y={Yu(6)} w={1} h={36 * k} color={dim} op={0.8} />
        <Line x={X(5) - 4} y={Yu(6)} w={8} h={1} color={dim} op={0.8} />
        <Line x={X(5) - 4} y={Yu(42) - 1} w={8} h={1} color={dim} op={0.8} />
        <div style={{ ...lab, left: X(5) - 10, top: Yu(24) - 7, transform: 'translateX(-100%)' }}>36u</div>
      </div>
      <div style={{ opacity: a2, transform: `translateY(${(1 - a2) * 6}px)` }}>
        <div style={{ position: 'absolute', left: X(rx) - 3, top: Yu(ry) - 3, width: 6, height: 6, borderRadius: '50%', background: dim }} />
        <Line x={X(rx) + 6} y={Yu(ry) - 0.5} w={34} h={1} color={dim} op={0.8} />
        <div style={{ ...lab, left: X(rx) + 46, top: Yu(ry) - 7 }}>r 12u</div>
      </div>
      <div style={{ opacity: a3, transform: `translateY(${(1 - a3) * 6}px)` }}>
        <Line x={X(17.75)} y={Yu(45.5)} w={2.5 * k} h={1} color={dim} op={0.8} />
        <Line x={X(17.75)} y={Yu(45.5) - 4} w={1} h={8} color={dim} op={0.8} />
        <Line x={X(20.25) - 1} y={Yu(45.5) - 4} w={1} h={8} color={dim} op={0.8} />
        <div style={{ ...lab, left: X(19), top: Yu(45.5) + 8, transform: 'translateX(-50%)' }}>2,5u</div>
      </div>
      <div style={{ position: 'absolute', left: 24, top: 74, fontFamily: F.mono, fontSize: 11, letterSpacing: '.22em', color: C.accS, opacity: hud }}>PROG · 01</div>
      <div style={{ position: 'absolute', right: 24, top: 74, fontFamily: F.mono, fontSize: 11, letterSpacing: '.22em', color: C.dim, opacity: hud }}>GRADE 48U</div>
      <div style={{ opacity: progOp }}>
        <div style={{ position: 'absolute', left: 85, top: 694, width: 220, display: 'flex', justifyContent: 'space-between', fontFamily: F.mono, fontSize: 11, letterSpacing: '.22em', color: C.dim }}>
          <span>CARREGANDO</span><span style={{ color: C.acc, letterSpacing: '.06em' }}>{pct(prog)}</span>
        </div>
        <Bar x={85} y={716} w={220} p={prog} />
      </div>
    </LShot>
  );
}

function MSite() {
  const { T, CUES, enter, draw } = useMo();
  const S = CUES.Site, Y = CUES.Sistema;
  const prog = interpolate([0.3, 1.2, 1.7, 2.4, 2.9], [0, 0.38, 0.46, 0.86, 1], MOTION.draw)(T - S);
  const ldOp = draw(S + 0.1, S + 0.5) * (1 - draw(S + 2.85, S + 3.15));
  const exit = 1 - draw(S + 4.85, S + 5.3);
  const grad = { fontStyle: 'italic', fontWeight: 400, background: `linear-gradient(120deg, ${C.accS}, #43d5dc)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '.06em' };
  const lines = ['Produtos', 'digitais que', <><em style={grad}>vendem</em> e</>, <><em style={grad}>organizam</em> o</>, 'seu negócio.'];
  const lineR = (i) => enter(S + 3.65 + i * 0.08, S + 4.4 + i * 0.08);
  const pillOp = enter(S + 3.55, S + 4.1) * exit, ctaOp = enter(S + 4.0, S + 4.6) * exit;
  return (
    <LShot from={S - 0.2} to={Y + 0.2}>
      <div style={{ position: 'absolute', left: 0, top: 466, width: MW, textAlign: 'center', fontFamily: F.mono, fontSize: 11, letterSpacing: '.22em', color: C.dim, opacity: ldOp }}>
        CARREGANDO PÁGINA <span style={{ color: C.acc, letterSpacing: '.06em', marginLeft: 6 }}>{pct(prog)}</span>
      </div>
      <div style={{ position: 'absolute', left: 20, top: 150, width: 350, display: 'flex', flexDirection: 'column', gap: 18, transform: `translateY(${(1 - exit) * -10}px)` }}>
        <div style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 14px 7px 11px', borderRadius: 999, border: '1px solid oklch(70% 0 0 / .12)', background: 'oklch(70% 0 0 / .045)', fontFamily: F.dm, fontSize: 12.5, color: '#9ba1ab', opacity: pillOp }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}` }} />Disponível para novos projetos
        </div>
        <div style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 48, lineHeight: 1.04, letterSpacing: '-.045em', color: C.text }}>
          {lines.map((l, i) => (
            <div key={i} style={{ overflow: 'hidden', paddingBottom: 5, marginBottom: -5 }}>
              <div style={{ transform: `translateY(${(1 - lineR(i)) * 110}%)`, opacity: exit }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8, opacity: ctaOp, transform: `translateY(${(1 - ctaOp) * 10}px)` }}>
          <span style={{ height: 54, borderRadius: 999, background: C.paper, color: C.ink, fontFamily: F.dm, fontWeight: 600, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ver projetos →</span>
          <span style={{ height: 54, borderRadius: 999, border: '1px solid oklch(70% 0 0 / .16)', color: '#d7dae0', fontFamily: F.dm, fontWeight: 500, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Falar no WhatsApp</span>
        </div>
      </div>
    </LShot>
  );
}

function MSistema() {
  const { T, CUES, enter, draw, pop } = useMo();
  const S = CUES.Site, Y = CUES.Sistema, D = CUES.Documento;
  const lt = T - Y;
  const shX = ((((lt + 2) % 1.4) + 1.4) % 1.4) / 1.4 * 900 - 300;
  const res = (d = 0) => enter(Y + 3.9 + d, Y + 4.6 + d);
  const sk = (d = 0) => 1 - res(d);
  const mainOp = draw(S + 5.2, S + 5.9);
  const tabY = lerp(110, 0, enter(S + 5.0, S + 5.8));
  const kpi = [['Receita do mês', 'R$ 184 mil'], ['Pedidos', '1.284'], ['Clientes', '312'], ['Automações', '27']];
  const bars = [0.46, 0.55, 0.5, 0.63, 0.6, 0.72, 0.68, 0.9];
  const tabs = ['Início', 'Projetos', 'Clientes', 'Mais'];
  const cardBox = { position: 'absolute', borderRadius: 18, background: C.card, border: `1px solid ${C.line}` };
  const sIn = pop(Y - 0.15, Y + 0.55), sOut = draw(Y + 3.5, Y + 4.0);
  const sheetY = lerp(420, 0, sIn) + 440 * sOut;
  const dimOp = draw(Y - 0.2, Y + 0.3) * (1 - draw(Y + 3.5, Y + 4.0));
  const ph = (((lt % 1.3) + 1.3) % 1.3) / 1.3;
  const lb = MOTION.draw(clamp(ph / 0.6, 0, 1)), la = MOTION.draw(clamp((ph - 0.4) / 0.6, 0, 1));
  const fin = draw(Y + 3.0, Y + 3.45);
  const steps = ['Conectando ao ERP', 'Sincronizando CRM', 'Montando painel'];
  const lprog = interpolate([0.3, 1.2, 2.1, 3.0], [0, 0.34, 0.67, 1], MOTION.draw)(lt);
  return (
    <LShot from={S + 4.8} to={D + 0.4}>
      <div style={{ position: 'absolute', inset: 0, opacity: mainOp }}>
        <Skel x={20} y={136} w={150} h={22} op={sk()} shX={shX} />
        <div style={{ position: 'absolute', left: 20, top: 128, fontFamily: F.sora, fontWeight: 600, fontSize: 28, letterSpacing: '-.035em', color: C.text, opacity: res() }}>Visão geral</div>
        {kpi.map(([l, v], i) => {
          const x = 20 + (i % 2) * 181, y = 184 + Math.floor(i / 2) * 112, d = 0.05 + i * 0.06;
          return (
            <React.Fragment key={l}>
              <div style={{ ...cardBox, left: x, top: y, width: 169, height: 100 }} />
              <Skel x={x + 16} y={y + 22} w={80} h={10} op={sk(d)} shX={shX} />
              <Skel x={x + 16} y={y + 50} w={110} h={26} r={7} op={sk(d)} shX={shX} />
              <div style={{ position: 'absolute', left: x + 16, top: y + 17, fontFamily: F.dm, fontSize: 13, color: C.mut2, opacity: res(d) }}>{l}</div>
              <div style={{ position: 'absolute', left: x + 16, top: y + 44, fontFamily: F.sora, fontWeight: 600, fontSize: 30, letterSpacing: '-.04em', color: C.text, opacity: res(d), transform: `translateY(${(1 - res(d)) * 8}px)` }}>{v}</div>
            </React.Fragment>
          );
        })}
        <div style={{ ...cardBox, left: 20, top: 408, width: 350, height: 336 }} />
        <Skel x={38} y={430} w={150} h={12} op={sk(0.1)} shX={shX} />
        <div style={{ position: 'absolute', left: 38, top: 425, fontFamily: F.dm, fontSize: 14, color: C.mut, opacity: res(0.1) }}>Receita · últimos 8 meses</div>
        <Skel x={40} y={470} w={310} h={254} r={12} op={sk(0.1)} shX={shX} />
        {bars.map((b, i) => {
          const h = b * 230 * enter(Y + 4.0 + i * 0.05, Y + 4.8 + i * 0.05);
          return <div key={i} style={{ position: 'absolute', left: 40 + i * 38.75 + 6, top: 724 - h, width: 27, height: h, borderRadius: '7px 7px 3px 3px', background: i === 7 ? C.acc : 'oklch(72% .1 262 / .3)' }} />;
        })}
      </div>
      <div style={{ position: 'absolute', left: 0, top: 760 + tabY, width: MW, height: 84, background: C.panel, borderTop: '1px solid oklch(70% 0 0 / .08)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', paddingTop: 10 }}>
        {tabs.map((t, i) => (
          <div key={t} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 22, height: 22, borderRadius: 7, border: `1.6px solid ${i === 0 ? C.accS : '#6d727c'}`, background: i === 0 ? 'oklch(72% .1 262 / .18)' : 'transparent' }} />
            <span style={{ fontFamily: F.dm, fontSize: 11, color: i === 0 ? C.accS : '#8b919b', fontWeight: i === 0 ? 600 : 400, opacity: res(0.1 + i * 0.03) }}>{t}</span>
            <span style={{ position: 'absolute', top: 34, width: 40, height: 8, borderRadius: 4, background: 'oklch(70% 0 0 / .08)', opacity: sk(0.1 + i * 0.03) }} />
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(8,8,10,.6)', opacity: dimOp }} />
      {sheetY < 439 && (
        <div style={{ position: 'absolute', left: 0, top: 444, width: MW, height: 420, borderRadius: '28px 28px 0 0', background: C.surf, borderTop: '1px solid oklch(70% 0 0 / .14)', boxShadow: '0 -20px 60px rgba(0,0,0,.5)', transform: `translateY(${sheetY}px)` }}>
          <div style={{ position: 'absolute', left: 177, top: 10, width: 36, height: 5, borderRadius: 3, background: 'oklch(70% 0 0 / .22)' }} />
          <div style={{ position: 'absolute', left: 95, top: -14, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, oklch(50% .13 262 / .3), transparent 65%)', filter: 'blur(14px)' }} />
          <Mark cx={195} cy={86} s={84} arcA={la * (1 - fin)} arcB={lb + (1 - lb) * fin} track={0.16} ring={1} ringOp={0.55 * (1 - fin)} rot={lt * 90} ringColor={C.acc} ringW={0.7} dash={3.2} gap={2.8} />
          <div style={{ position: 'absolute', left: 104, top: 154, display: 'flex', flexDirection: 'column', gap: 13 }}>
            {steps.map((s, i) => {
              const ap = enter(Y + 0.3 + i * 0.9, Y + 0.7 + i * 0.9), dn = enter(Y + 1.2 + i * 0.9, Y + 1.5 + i * 0.9);
              return (
                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 11, opacity: ap, transform: `translateX(${(1 - ap) * -8}px)` }}>
                  <span style={{ position: 'relative', width: 14, height: 14, flex: 'none' }}>
                    <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `1.5px dashed ${C.acc}`, opacity: 1 - dn, transform: `rotate(${lt * 240}deg)` }} />
                    <span style={{ position: 'absolute', left: 3, top: 3, width: 8, height: 8, borderRadius: '50%', background: C.green, boxShadow: `0 0 8px ${C.green}`, transform: `scale(${dn})` }} />
                  </span>
                  <span style={{ fontFamily: F.dm, fontSize: 15.5, color: dn > 0.5 ? C.body : C.mut2 }}>{s}</span>
                </div>
              );
            })}
          </div>
          <Bar x={75} y={276} w={240} p={lprog} />
        </div>
      )}
    </LShot>
  );
}

function MDoc() {
  const { CUES, enter, draw, pop, T } = useMo();
  const D = CUES.Documento;
  const tIn = pop(D + 0.15, D + 0.75), up = draw(D + 3.9, D + 4.1), down = draw(D + 4.1, D + 4.5);
  const scale = lerp(0.86, 1, tIn) * (1 + 0.05 * up) * (1 - down);
  const tOp = clamp(tIn * 2, 0, 1) * (1 - draw(D + 4.3, D + 4.5));
  const gOp = 1 - draw(D + 3.4, D + 3.8);
  const TS = 168, k = TS / 48;
  const prog = interpolate([0.4, 1.4, 2.3, 3.4], [0, 0.31, 0.62, 1], MOTION.draw)(T - D);
  const txOp = draw(D + 0.4, D + 0.8) * (1 - draw(D + 3.8, D + 4.1));
  const bgGrid = draw(D, D + 0.7) * (1 - draw(D + 3.6, D + 4.3));
  return (
    <LShot from={D - 0.9} to={D + 6}>
      <div style={{ position: 'absolute', inset: 0, opacity: bgGrid,
        backgroundImage: 'linear-gradient(oklch(20% 0 0 / .06) 1px, transparent 1px), linear-gradient(90deg, oklch(20% 0 0 / .06) 1px, transparent 1px)',
        backgroundSize: '28px 28px', backgroundPosition: '13px 16px',
        WebkitMaskImage: 'radial-gradient(circle at 195px 380px, #000 0, #000 120px, transparent 360px)', maskImage: 'radial-gradient(circle at 195px 380px, #000 0, #000 120px, transparent 360px)' }} />
      {tOp > 0.001 && (
        <div style={{ position: 'absolute', left: 195 - TS / 2, top: 380 - TS / 2, width: TS, height: TS, borderRadius: 24, background: C.white, overflow: 'hidden',
          border: `1px solid oklch(50% .13 262 / ${0.35 * gOp + 0.08})`, boxShadow: '0 20px 50px rgba(8,8,10,.10)', opacity: tOp, transform: `scale(${scale})` }}>
          <div style={{ position: 'absolute', inset: 0, opacity: gOp, backgroundImage: 'linear-gradient(oklch(20% 0 0 / .07) 1px, transparent 1px), linear-gradient(90deg, oklch(20% 0 0 / .07) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
          {[6, 30, 42].map((u, i) => <Line key={u} x={0} y={u * k - 0.5} w={TS * draw(D + 0.4 + i * 0.1, D + 1.0 + i * 0.1)} h={1} color={C.accD} op={0.45 * gOp} />)}
          {[9.75, 38.25].map((u, i) => <Line key={u} x={u * k - 0.5} y={0} w={1} h={TS * draw(D + 0.55 + i * 0.1, D + 1.15 + i * 0.1)} color={C.accD} op={0.35 * gOp} />)}
          <Mark cx={TS / 2} cy={TS / 2} s={TS} stem={pop(D + 1.1, D + 1.6)} arcB={draw(D + 1.4, D + 2.2)} ring={draw(D + 0.7, D + 1.4)} ringOp={gOp} stemColor={C.ink} arcColor={C.accD} ringColor={C.accD} ringW={0.7} dash={3.2} gap={2.8} />
          <div style={{ position: 'absolute', right: 11, top: 6, fontFamily: F.mono, fontSize: 8.5, letterSpacing: '.14em', color: C.accD, opacity: draw(D + 0.9, D + 1.3) * gOp }}>PROG · 02</div>
        </div>
      )}
      <div style={{ opacity: txOp }}>
        <div style={{ position: 'absolute', left: 0, top: 496, width: MW, textAlign: 'center', fontFamily: F.mono, fontSize: 11, letterSpacing: '.22em', color: C.mutD }}>
          GERANDO PROPOSTA <span style={{ color: C.accD, letterSpacing: '.06em', marginLeft: 6 }}>{pct(prog)}</span>
        </div>
        <Bar x={85} y={520} w={220} p={prog} light />
      </div>
    </LShot>
  );
}

function MobilePiece({ labels }) {
  const { T, CUES, enter, draw, pop } = useMo();
  const S = CUES.Site, Y = CUES.Sistema, D = CUES.Documento;
  let cx = 195, cy = 400, s = lerp(250, 240, draw(0, 3.4));
  const a = enter(3.35, 4.35); cy = lerp(cy, 360, a); s = lerp(s, 104, a);
  const b = draw(S - 0.6, S + 0.15); cy = lerp(cy, 400, b); s = lerp(s, 88, b);
  const c = enter(S + 3.0, S + 3.8); cx = lerp(cx, 30.1, c); cy = lerp(cy, 76, c); s = lerp(s, 34, c);

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
  const gridR = lerp(0, 480, enter(0, 1.4));
  const splashWord = enter(3.85, 4.75) * (1 - draw(S - 0.95, S - 0.5));
  const navWord = enter(S + 3.55, S + 4.2);
  const chrome = draw(S + 3.2, S + 4.0);
  const paperR = 480 * draw(Y + 5.2, Y + 6.2);
  const inkR = 520 * draw(D + 4.35, D + 5.3);
  const markVis = T < Y + 6.3;
  const light = T >= Y + 5.75 && T < D + 4.9;

  const caps = [
    { at: 0.3, until: S - 0.3, text: <MPill n="01" t="Abertura do app" /> },
    { at: S + 0.2, until: Y - 0.4, text: <MPill n="02" t="Site · arco = progresso" /> },
    { at: Y + 0.2, until: D - 0.6, text: <MPill n="03" t="Sistema · painel" /> },
    { at: D + 0.3, until: D + 4.0, text: <MPill n="04" t="Documento · claro" light /> },
  ];

  return (
    <div data-screen-label={`Mobile · ${Math.floor(T)}s`} style={{ position: 'absolute', left: 0, top: 0, width: MW, height: MH, overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', width: 560, height: 560, left: 195 - 280 + Math.sin(T * 0.4) * 30, top: -300 + Math.cos(T * 0.3) * 20, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(50% .13 262 / .32), transparent 65%)', filter: 'blur(24px)', opacity: aura }} />
      <div style={{ position: 'absolute', width: 420, height: 420, left: 150 + Math.cos(T * 0.35) * 24, top: 520 + Math.sin(T * 0.28) * 24, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(46% .11 300 / .22), transparent 65%)', filter: 'blur(30px)', opacity: aura }} />
      {gridU > 0.001 && <div style={{ position: 'absolute', inset: 0, opacity: gridU,
        backgroundImage: 'linear-gradient(oklch(70% 0 0 / .11) 1px, transparent 1px), linear-gradient(90deg, oklch(70% 0 0 / .11) 1px, transparent 1px)',
        backgroundSize: '20px 20px', backgroundPosition: '15px 0',
        WebkitMaskImage: `radial-gradient(circle at 195px 400px, #000 0, #000 ${gridR * 0.35}px, transparent ${gridR}px)`,
        maskImage: `radial-gradient(circle at 195px 400px, #000 0, #000 ${gridR * 0.35}px, transparent ${gridR}px)` }} />}

      <MSplash g={{ cx, cy, s }} />
      <MSite />
      <MSistema />

      {markVis && chrome > 0.001 && (
        <>
          <Line x={0} y={112} w={MW * chrome} h={1} color="oklch(70% 0 0)" op={0.09} />
          <div style={{ position: 'absolute', right: 20, top: 70, display: 'flex', flexDirection: 'column', gap: 6, opacity: enter(S + 3.6, S + 4.2) }}>
            <span style={{ width: 22, height: 2, borderRadius: 2, background: C.text }} />
            <span style={{ width: 14, height: 2, borderRadius: 2, background: C.text, marginLeft: 8 }} />
          </div>
        </>
      )}
      {markVis && <Mark cx={cx} cy={cy} s={s} stem={pop(1.3, 1.95)} arcB={arcB} track={track} ring={ring} ringOp={ringOp} ringScale={ringScale} rot={rot} ringColor={inSite ? C.acc : C.accS} ringW={0.7} dash={3.2} gap={2.8} />}
      <Word x={83.9} cy={438} size={32} reveal={splashWord} />
      {markVis && <Word x={49.2} cy={76} size={22} reveal={navWord} />}

      {paperR > 0.5 && <div style={{ position: 'absolute', inset: 0, background: C.paper, clipPath: `circle(${paperR}px at 195px 422px)` }} />}
      <MDoc />
      {inkR > 0.5 && <div style={{ position: 'absolute', inset: 0, background: C.ink, clipPath: `circle(${inkR}px at 195px 380px)` }} />}
      <StatusBar light={light} />
      {labels && <Captions items={caps} style={{ left: 0, right: 0, bottom: 22, textAlign: 'center', font: 'inherit', textShadow: 'none' }} />}
    </div>
  );
}

function ProgLoadersMobile() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, labels: true });
  return (
    <>
      <CompositionStage width={1170} height={2532} bg={C.ink} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: MW, height: MH, transform: 'scale(3)', transformOrigin: '0 0' }}>
          <MobilePiece labels={t.labels !== false} />
        </div>
      </CompositionStage>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Animação" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Rótulos das telas" value={t.labels} onChange={(v) => setTweak('labels', v)} />
      </TweaksPanel>
    </>
  );
}

window.ProgLoadersMobile = ProgLoadersMobile;
window.PLM = { MobilePiece, MW, MH };
