// Prog Soluções — Reels 1080×1920 (9:16), 27s loop
const { C, F, MOTION, lerp, useMo, LShot, ClockCtx, Mark, Word, Line, Piece } = window.PL;
const { MobilePiece } = window.PLM;
const CM = { Splash: 0, Site: 6.5, Sistema: 12, Documento: 18.2 };
const grad = { fontStyle: 'italic', fontWeight: 400, background: `linear-gradient(120deg, ${C.accS}, #43d5dc)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingRight: '.06em' };
const PH = { sc: 1.5, sw: 585, sh: 1266, top: 400, bez: 14 };

function Heading({ title, sub, op, dy }) {
  if (op <= 0.001) return null;
  return (
    <div style={{ position: 'absolute', left: 60, right: 60, top: 206, textAlign: 'center', opacity: op, transform: `translateY(${dy}px)` }}>
      <div style={{ fontFamily: F.sora, fontWeight: 600, fontSize: 60, letterSpacing: '-.04em', color: C.text, lineHeight: 1.05 }}>{title}</div>
      <div style={{ marginTop: 14, fontFamily: F.mono, fontSize: 24, letterSpacing: '.16em', textTransform: 'uppercase', color: C.acc }}>{sub}</div>
    </div>
  );
}

function ReelsPiece({ safe }) {
  const { T, CUES, enter, draw, pop } = useMo();
  const K = CUES.Construcao, M = CUES.Mobile, Dk = CUES.Desktop, Fi = CUES.Final;
  const END = Fi + 4;
  const fade = 1 - draw(END - 0.7, END);
  const aura = draw(0, 1.0) * fade;

  // hook
  const h1 = enter(0.25, 1.05), h2 = enter(0.5, 1.3), hOut = draw(2.4, 3.0);
  const hookTag = draw(0.7, 1.2) * (1 - hOut);

  // construction mark
  let cx = 540, cy = 900, s = lerp(820, 780, draw(K, K + 3.4));
  const la = enter(K + 3.2, K + 4.1); cy = lerp(cy, 820, la); s = lerp(s, 300, la);
  const py = lerp(1400, 0, enter(M - 0.9, M + 0.1));
  const b = draw(M - 0.9, M - 0.1); cy = lerp(cy, PH.top + 400 * PH.sc + py, b); s = lerp(s, 88 * PH.sc, b);
  const k = s / 48, X = (u) => cx + (u - 24) * k, Yu = (u) => cy + (u - 24) * k;
  const stem = pop(K + 0.9, K + 1.5);
  const arcB = T < M - 0.9 ? draw(K + 1.2, K + 2.0) : 1 - b;
  const track = draw(M - 0.9, M - 0.1, 0, 0.2);
  const ring = T < M - 1 ? draw(K + 0.4, K + 1.2) : 1;
  const ringOp = T < M - 1 ? 0.9 * (1 - draw(K + 2.9, K + 3.3)) : 0.639 * draw(M - 0.6, M - 0.1);
  const rot = 35 * b;
  const markVis = T >= K && T < M + 0.35;
  const word = enter(K + 3.6, K + 4.3) * (1 - draw(M - 0.95, M - 0.55));
  const gridOp = draw(K, K + 0.8) * (1 - draw(K + 3.0, K + 3.8));
  const out = 1 - draw(K + 2.9, K + 3.3);
  const an = (i) => enter(K + 1.5 + i * 0.15, K + 2.2 + i * 0.15) * out;
  const hud = draw(K + 0.2, K + 0.8) * (1 - draw(K + 3.1, K + 3.6));
  const lab = { position: 'absolute', fontFamily: F.mono, fontSize: 34, color: C.accS, whiteSpace: 'nowrap' };
  const rx = 26.25 + 12 * Math.cos(-Math.PI / 4), ry = 18 + 12 * Math.sin(-Math.PI / 4);

  // phone
  const ltM = T < M + 0.35 ? 6.7 : 6.7 + (T - (M + 0.35)) * 1.2;
  const pContent = draw(M - 0.1, M + 0.3);
  const pOutX = -1150 * draw(Dk - 0.4, Dk + 0.45);
  const pScale = 1 + 0.03 * draw(M + 0.35, Dk);
  const phoneVis = T >= M - 1 && T < Dk + 0.5;
  const fx = 540 - PH.sw / 2 - PH.bez, fy = PH.top - PH.bez + py;

  // desktop
  const bx = lerp(1150, 0, enter(Dk - 0.2, Dk + 0.6));
  const ltD = clamp(15.0 + (T - (Dk - 0.2)) * 1.1, 15.0, 23.7);
  const bOut = draw(Fi - 0.35, Fi + 0.3);
  const bScale = (1 + 0.04 * draw(Dk + 0.6, Fi)) * (1 - 0.05 * bOut);
  const browVis = T >= Dk - 0.3 && T < Fi + 0.4;
  const BW = 1000, bs = BW / 1920, BH = 1080 * bs, chrome = 54;

  // headings
  const hm = enter(M + 0.1, M + 0.7) * (1 - draw(M + 4.2, M + 4.5));
  const hm2 = enter(M + 4.5, M + 5.1) * (1 - draw(Dk - 0.45, Dk - 0.1));
  const hd = enter(Dk + 0.2, Dk + 0.8) * (1 - draw(Dk + 2.6, Dk + 2.9));
  const hd2 = enter(Dk + 2.9, Dk + 3.5) * (1 - draw(Fi - 0.4, Fi - 0.1));

  // final
  const fStem = pop(Fi + 0.2, Fi + 0.7), fArc = draw(Fi + 0.45, Fi + 1.1), fRing = draw(Fi + 0.1, Fi + 0.8), fRingOp = 1 - draw(Fi + 1.2, Fi + 1.6);
  const fWord = enter(Fi + 0.9, Fi + 1.6);
  const fTag = draw(Fi + 1.4, Fi + 1.9), fCta = enter(Fi + 1.8, Fi + 2.4);
  const finVis = T >= Fi;

  return (
    <div data-screen-label={`Reels · ${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: C.ink }}>
      <div style={{ position: 'absolute', width: 1300, height: 1300, left: 540 - 650 + Math.sin(T * 0.4) * 70, top: -520 + Math.cos(T * 0.3) * 50, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(50% .13 262 / .30), transparent 65%)', filter: 'blur(40px)', opacity: aura }} />
      <div style={{ position: 'absolute', width: 1000, height: 1000, left: 300 + Math.cos(T * 0.35) * 60, top: 1150 + Math.sin(T * 0.28) * 50, borderRadius: '50%',
        background: 'radial-gradient(circle, oklch(46% .11 300 / .22), transparent 65%)', filter: 'blur(50px)', opacity: aura }} />

      <LShot from={0} to={K + 0.1}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center', fontFamily: F.mono, fontSize: 26, letterSpacing: '.22em', color: C.acc, opacity: hookTag }}>PROG SOLUÇÕES · MARCA EM MOVIMENTO</div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 740, textAlign: 'center', fontFamily: F.sora, fontWeight: 600, letterSpacing: '-.045em', color: C.text,
          transform: `translateY(${-70 * hOut}px) scale(${1 + 0.04 * draw(0, 3)})`, opacity: 1 - hOut }}>
          <div style={{ overflow: 'hidden', fontSize: 92, lineHeight: 1.1 }}><div style={{ transform: `translateY(${(1 - h1) * 110}%)` }}>Até o carregamento</div></div>
          <div style={{ overflow: 'hidden', fontSize: 168, lineHeight: 1.08, paddingBottom: 12 }}><div style={{ transform: `translateY(${(1 - h2) * 110}%)` }}><em style={grad}>é marca.</em></div></div>
        </div>
      </LShot>

      <LShot from={K - 0.1} to={M}>
        <div style={{ position: 'absolute', inset: 0, opacity: gridOp,
          backgroundImage: 'linear-gradient(oklch(70% 0 0 / .1) 1px, transparent 1px), linear-gradient(90deg, oklch(70% 0 0 / .1) 1px, transparent 1px)',
          backgroundSize: '65px 65px', backgroundPosition: '20px 55px',
          WebkitMaskImage: 'radial-gradient(circle at 540px 900px, #000 0, #000 300px, transparent 900px)', maskImage: 'radial-gradient(circle at 540px 900px, #000 0, #000 300px, transparent 900px)' }} />
        {[6, 30, 42].map((u, i) => {
          const a0 = draw(K + 3.0 + i * 0.06, K + 3.6 + i * 0.06), b0 = draw(K + i * 0.12, K + 0.8 + i * 0.12);
          return <Line key={'h' + u} x={a0 * 1080} y={Yu(u) - 1} w={(b0 - a0) * 1080} h={2} op={u === 30 ? 0.5 : 0.34} />;
        })}
        {[9.75, 38.25].map((u, i) => {
          const a0 = draw(K + 3.05 + i * 0.06, K + 3.65 + i * 0.06), b0 = draw(K + 0.2 + i * 0.12, K + 1.0 + i * 0.12);
          return <Line key={'v' + u} x={X(u) - 1} y={a0 * 1920} w={2} h={(b0 - a0) * 1920} op={0.3} />;
        })}
        {[0, 1, 2, 3].map((i) => {
          const o = an(i);
          if (o <= 0.001) return null;
          const st = { opacity: o, transform: `translateY(${(1 - o) * 14}px)` };
          if (i === 0) return <div key={i} style={st}><Line x={X(9.75)} y={Yu(2.5)} w={8 * k} h={2} color={C.accS} op={0.8} /><Line x={X(9.75)} y={Yu(2.5) - 12} w={2} h={24} color={C.accS} op={0.8} /><Line x={X(17.75) - 2} y={Yu(2.5) - 12} w={2} h={24} color={C.accS} op={0.8} /><div style={{ ...lab, left: X(13.75), top: Yu(2.5) - 64, transform: 'translateX(-50%)' }}>8u</div></div>;
          if (i === 1) return <div key={i} style={st}><Line x={X(5)} y={Yu(6)} w={2} h={36 * k} color={C.accS} op={0.8} /><Line x={X(5) - 12} y={Yu(6)} w={24} h={2} color={C.accS} op={0.8} /><Line x={X(5) - 12} y={Yu(42) - 2} w={24} h={2} color={C.accS} op={0.8} /><div style={{ ...lab, left: X(5) - 26, top: Yu(24) - 20, transform: 'translateX(-100%)' }}>36u</div></div>;
          if (i === 2) return <div key={i} style={st}><div style={{ position: 'absolute', left: X(rx) - 7, top: Yu(ry) - 7, width: 14, height: 14, borderRadius: '50%', background: C.accS }} /><Line x={X(rx) + 14} y={Yu(ry) - 1} w={70} h={2} color={C.accS} op={0.8} /><div style={{ ...lab, left: X(rx) + 96, top: Yu(ry) - 21 }}>r 12u</div></div>;
          return <div key={i} style={st}><Line x={X(17.75)} y={Yu(45.5)} w={2.5 * k} h={2} color={C.accS} op={0.8} /><Line x={X(17.75)} y={Yu(45.5) - 12} w={2} h={24} color={C.accS} op={0.8} /><Line x={X(20.25) - 2} y={Yu(45.5) - 12} w={2} h={24} color={C.accS} op={0.8} /><div style={{ ...lab, left: X(19), top: Yu(45.5) + 22, transform: 'translateX(-50%)' }}>2,5u</div></div>;
        })}
        <div style={{ position: 'absolute', left: 60, top: 240, fontFamily: F.mono, fontSize: 26, letterSpacing: '.22em', color: C.accS, opacity: hud }}>PROG · 01</div>
        <div style={{ position: 'absolute', right: 60, top: 240, fontFamily: F.mono, fontSize: 26, letterSpacing: '.22em', color: C.dim, opacity: hud }}>GRADE 48U</div>
        <Word x={248.3} cy={1036} size={84} reveal={word} />
      </LShot>

      {phoneVis && (
        <div style={{ position: 'absolute', inset: 0, transform: `translateX(${pOutX}px) scale(${pScale})`, transformOrigin: '540px 1033px' }}>
          <div style={{ position: 'absolute', left: fx, top: fy, width: PH.sw + PH.bez * 2, height: PH.sh + PH.bez * 2, borderRadius: 74,
            background: 'linear-gradient(160deg, #2b2e37, #101217)', boxShadow: '0 60px 140px rgba(0,0,0,.65), inset 0 0 0 1.5px oklch(70% 0 0 / .22)' }} />
          <div style={{ position: 'absolute', left: fx + PH.bez, top: fy + PH.bez, width: PH.sw, height: PH.sh, borderRadius: 60, overflow: 'hidden', background: C.ink }}>
            {pContent > 0.001 && (
              <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, transform: `scale(${PH.sc})`, transformOrigin: '0 0', opacity: pContent }}>
                <ClockCtx.Provider value={{ T: ltM, CUES: CM }}><MobilePiece labels={false} /></ClockCtx.Provider>
              </div>
            )}
            <div style={{ position: 'absolute', left: PH.sw / 2 - 63, top: 16, width: 126, height: 36, borderRadius: 20, background: '#000' }} />
          </div>
        </div>
      )}

      {markVis && <Mark cx={cx} cy={cy} s={s} stem={stem} arcB={arcB} track={track} ring={ring} ringOp={ringOp} rot={rot}
        ringColor={T < M - 1 ? C.accS : C.acc} ringW={lerp(2.6, 1.05, b)} dash={lerp(13, 4.8, b)} gap={lerp(11, 4.2, b)} />}

      {browVis && (
        <div style={{ position: 'absolute', left: 40 + bx, top: 1000 - (BH + chrome) / 2, width: BW, height: BH + chrome, borderRadius: 26, overflow: 'hidden',
          background: C.surf, boxShadow: '0 60px 140px rgba(0,0,0,.6), inset 0 0 0 1.5px oklch(70% 0 0 / .16)', transform: `scale(${bScale})`, opacity: 1 - bOut }}>
          <div style={{ position: 'absolute', left: 0, top: 0, width: BW, height: chrome, display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px', borderBottom: '1px solid oklch(70% 0 0 / .08)' }}>
            {[0, 1, 2].map((i) => <span key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: '#3a3e48' }} />)}
            <span style={{ marginLeft: 'auto', marginRight: 'auto', padding: '7px 26px', borderRadius: 999, background: 'oklch(70% 0 0 / .06)', fontFamily: F.mono, fontSize: 16, letterSpacing: '.08em', color: C.mut2 }}>Prog Soluções · Painel</span>
            <span style={{ width: 59 }} />
          </div>
          <div style={{ position: 'absolute', left: 0, top: chrome, width: 1920, height: 1080, transform: `scale(${bs})`, transformOrigin: '0 0' }}>
            <ClockCtx.Provider value={{ T: ltD, CUES: CM }}><Piece labels={false} /></ClockCtx.Provider>
          </div>
        </div>
      )}

      <Heading title="Site no celular" sub="o arco do P é a barra de progresso" op={hm} dy={(1 - hm) * 16} />
      <Heading title="App do sistema" sub="o painel carrega por etapas" op={hm2} dy={(1 - hm2) * 16} />
      <Heading title="No sistema web" sub="skeleton, etapas e dados" op={hd} dy={(1 - hd) * 16} />
      <Heading title="Em propostas" sub="versão para fundo claro" op={hd2} dy={(1 - hd2) * 16} />

      {finVis && (
        <div style={{ position: 'absolute', inset: 0, opacity: fade }}>
          <Mark cx={540} cy={800} s={300} stem={fStem} arcB={fArc} ring={fRing} ringOp={fRingOp} ringW={2.4} dash={12} gap={10} />
          <Word x={248.3} cy={1016} size={84} reveal={fWord} />
          <div style={{ position: 'absolute', left: 0, right: 0, top: 1112, textAlign: 'center', fontFamily: F.mono, fontSize: 27, lineHeight: 1.7, letterSpacing: '.2em', color: C.mut, opacity: fTag }}>
            SITES · SISTEMAS · ERP · CRM<br />AUTOMAÇÃO · INTELIGÊNCIA ARTIFICIAL
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, top: 1262, display: 'flex', justifyContent: 'center', opacity: fCta, transform: `translateY(${(1 - fCta) * 20}px)` }}>
            <span style={{ padding: '26px 48px', borderRadius: 999, background: C.paper, color: C.ink, fontFamily: F.dm, fontWeight: 600, fontSize: 34 }}>Vamos conversar · link na bio</span>
          </div>
        </div>
      )}

      {safe && (
        <>
          <div style={{ position: 'absolute', left: 0, top: 0, width: 1080, height: 200, background: 'rgba(255,60,60,.16)', borderBottom: '2px dashed rgba(255,90,90,.8)' }} />
          <div style={{ position: 'absolute', left: 0, top: 1540, width: 1080, height: 380, background: 'rgba(255,60,60,.16)', borderTop: '2px dashed rgba(255,90,90,.8)' }} />
          <div style={{ position: 'absolute', left: 960, top: 200, width: 120, height: 1340, background: 'rgba(255,60,60,.10)', borderLeft: '2px dashed rgba(255,90,90,.6)' }} />
          <div style={{ position: 'absolute', left: 24, top: 1556, fontFamily: F.mono, fontSize: 22, color: '#ff8a8a' }}>ÁREA DA INTERFACE DO INSTAGRAM</div>
        </>
      )}
    </div>
  );
}

function ProgReels() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, safeZones: false });
  return (
    <>
      <CompositionStage width={1080} height={1920} bg={C.ink} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <ReelsPiece safe={!!t.safeZones} />
      </CompositionStage>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Animação" />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
        <TweakToggle label="Mostrar áreas seguras do Reels" value={t.safeZones} onChange={(v) => setTweak('safeZones', v)} />
      </TweaksPanel>
    </>
  );
}

window.ProgReels = ProgReels;
