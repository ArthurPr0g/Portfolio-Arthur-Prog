// Loader da página: cenas "Splash" e "Site" das referências
// (referencias-html/prog-loaders.jsx e prog-loaders-mobile.jsx), sem React.
//
// Vai embutido no <head> (vite.config.js) porque o HTML pré-renderizado aparece
// antes do JavaScript: numa rede lenta a espera é o próprio bundle, então o
// loader precisa rodar antes dele. Um único relógio (requestAnimationFrame)
// calcula cada propriedade em função do tempo T, com as fórmulas da referência.
//
// Máquina de estados (docs/04-implementacao.md):
//   espera (≤300 ms, conteúdo oculto) → pronto antes? revela com fade, sem loader
//   → splash (só no 1º acesso da sessão) → site: o arco é o progresso real
//     suavizado; segura em S+2,85 até concluir → voo da logo para o cabeçalho
//     e entrada do conteúdo com o stagger da referência → fim.
// O app avisa: window.__psLoader.montado() e .rota() (troca de página).
import { EASE, clamp, lerp, interpolate, relogio, pct, CUES } from "../motion";
import { criarMarca, C, a, F } from "../mark";

(function () {
  const W = window, D = document, H = D.documentElement;
  if (W.__psLoader) return;

  const S = CUES.Site;
  const ESPERA = 0.3; // s sem loader
  const LIMITE = 15; // s: depois disso revela de qualquer jeito
  const SEGURA = S + 2.85; // fim do trecho "carregando"
  const SIM_SPLASH = interpolate([0.2, 1.2, 2.2, 3.0, 4.3], [0, 0.22, 0.48, 0.71, 1], EASE.draw);
  const SIM_SITE = interpolate([0.3, 1.2, 1.7, 2.4, 2.9], [0, 0.38, 0.46, 0.86, 1], EASE.draw);
  // Comparação com a referência: ?ps-ref toca a timeline dela (progresso simulado,
  // splash sempre, sem espera) e ?ps-quadro=7.8 para em T = 7,8 s.
  const busca = new URLSearchParams(location.search);
  const QUADRO = parseFloat(busca.get("ps-quadro"));
  const REF = busca.has("ps-ref") || !isNaN(QUADRO);
  const reduzido = !!(W.matchMedia && W.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const en = /^en/i.test(H.lang || "");
  const TXT = en
    ? { carregando: "LOADING", pagina: "LOADING PAGE", hud: "SYMBOL · 48U GRID", hudM: "48U GRID", sr: "Loading page", ok: "Page loaded" }
    : { carregando: "CARREGANDO", pagina: "CARREGANDO PÁGINA", hud: "SÍMBOLO · GRADE 48U", hudM: "GRADE 48U", sr: "Carregando página", ok: "Página carregada" };

  // Medidas de cada cena (desktop 1920×1080, mobile 390×844), copiadas das referências.
  const CENAS = {
    desktop: {
      W: 1920, H: 1080,
      m0: { cx: 960, cy: 540, s0: 500, s1: 480 }, lock: { cx: 590, cy: 540, s: 156 }, site: { cx: 960, cy: 540, s: 128 },
      word: { x: 682.3, cy: 540, size: 100 },
      grid: { size: 40, x: 0, y: 20, cx: 960, cy: 540, r: 900 },
      auras: [
        (T) => ({ d: 1100, x: 960 - 550 + Math.sin(T * 0.4) * 80, y: -560 + Math.cos(T * 0.3) * 40, cor: a(C.accD, 30) }),
        (T) => ({ d: 820, x: 1380 + Math.cos(T * 0.35) * 60, y: 260 + Math.sin(T * 0.28) * 50, cor: a(C.purple, 22) }),
      ],
      th: 1.5,
      an: { tick: 8, l8: -44, l36x: -22, l36y: -13, dot: 10, rl0: 10, rlw: 110, rlab: 136, rlaby: -14, l25: 16, sobe: 12, fs: 22 },
      hud: { x: 96, y: 56, fs: 22, dir: TXT.hud },
      barra: { x: 750, y: 934, w: 420, ly: 892, fs: 20, ls: ".24em", pls: ".08em" },
      texto: { y: 680, fs: 20, ls: ".24em", pls: ".08em", gap: 12 },
      ring: { w: 1.6, d: 7, g: 6 },
      heroi: { pill: [3.6, 4.2], linha: [3.7, 0.12, 0.8], cta: [4.0, 4.6, 14] },
    },
    mobile: {
      W: 390, H: 844,
      m0: { cx: 195, cy: 400, s0: 250, s1: 240 }, lock: { cx: 195, cy: 360, s: 104 }, site: { cx: 195, cy: 400, s: 88 },
      word: { x: 83.9, cy: 438, size: 32 },
      grid: { size: 20, x: 15, y: 0, cx: 195, cy: 400, r: 480 },
      auras: [
        (T) => ({ d: 560, x: 195 - 280 + Math.sin(T * 0.4) * 30, y: -300 + Math.cos(T * 0.3) * 20, cor: a(C.accD, 32) }),
        (T) => ({ d: 420, x: 150 + Math.cos(T * 0.35) * 24, y: 520 + Math.sin(T * 0.28) * 24, cor: a(C.purple, 22) }),
      ],
      th: 1,
      an: { tick: 4, l8: -22, l36x: -10, l36y: -7, dot: 6, rl0: 6, rlw: 34, rlab: 46, rlaby: -7, l25: 8, sobe: 6, fs: 11 },
      hud: { x: 24, y: 74, fs: 11, dir: TXT.hudM },
      barra: { x: 85, y: 716, w: 220, ly: 694, fs: 11, ls: ".22em", pls: ".06em" },
      texto: { y: 466, fs: 11, ls: ".22em", pls: ".06em", gap: 6 },
      ring: { w: 0.7, d: 3.2, g: 2.8 },
      heroi: { pill: [3.55, 4.1], linha: [3.65, 0.08, 0.75], cta: [4.0, 4.6, 10] },
    },
  };

  // ── Progresso real ─────────────────────────────────────────────────────────
  let tarefas = {};
  const iniciarTarefas = (pesos) => {
    tarefas = {};
    for (const k in pesos) tarefas[k] = { peso: pesos[k], f: 0 };
  };
  const marcar = (nome, f = 1) => {
    const t = tarefas[nome];
    if (t) t.f = Math.max(t.f, clamp(f, 0, 1));
  };
  const real = () => {
    let s = 0, p = 0;
    for (const k in tarefas) (s += tarefas[k].peso * tarefas[k].f), (p += tarefas[k].peso);
    return p ? s / p : 1;
  };
  const tudoPronto = () => {
    for (const k in tarefas) if (tarefas[k].f < 1) return false;
    return true;
  };
  // exibido += (alvo − exibido)·(1 − e^(−dt/0,12)), no máximo 1,5/s; nunca volta.
  const suavizar = (v, alvo, dt) => {
    if (alvo - v < 0.002) return Math.max(v, alvo);
    const passo = Math.min((alvo - v) * (1 - Math.exp(-dt / 0.12)), 1.5 * dt);
    return Math.min(1, v + Math.max(0, passo));
  };

  function vigiarCss() {
    const links = [...D.querySelectorAll('link[rel="stylesheet"]')];
    let falta = links.filter((l) => !l.sheet).length;
    const fim = () => {
      marcar("css");
      vigiarFontes(['400 1em "DM Sans"', '400 1em "JetBrains Mono"']);
    };
    if (!falta) return fim();
    links.forEach((l) => {
      if (l.sheet) return;
      const ok = () => --falta <= 0 && fim();
      l.addEventListener("load", ok, { once: true });
      l.addEventListener("error", ok, { once: true });
    });
  }
  let fontesOk = 0;
  function vigiarFontes(lista) {
    lista.forEach((f) => {
      const conta = () => marcar("fontes", ++fontesOk / 4);
      if (!D.fonts || !D.fonts.load) return conta();
      let feito = false;
      const uma = () => !feito && ((feito = true), conta());
      D.fonts.load(f).then(uma, uma);
      setTimeout(uma, 4000);
    });
  }
  // Imagens que aparecem na primeira tela (posição no documento, como se estivesse no topo).
  function imagensDaTela() {
    const root = D.getElementById("root");
    if (!root) return [];
    return [...root.querySelectorAll("img")].filter((img) => {
      const r = img.getBoundingClientRect();
      const topo = r.top + W.scrollY;
      return r.width > 0 && r.height > 0 && topo < W.innerHeight && getComputedStyle(img).opacity !== "0";
    });
  }
  function vigiarImagens(imgs, nome) {
    let ok = 0;
    if (!imgs.length) return marcar(nome);
    imgs.forEach((img) => {
      let feito = false;
      const uma = () => !feito && ((feito = true), marcar(nome, ++ok / imgs.length));
      const decodifica = () => (img.decode ? img.decode().then(uma, uma) : uma());
      if (img.complete) img.naturalWidth ? decodifica() : uma();
      else {
        img.addEventListener("load", decodifica, { once: true });
        img.addEventListener("error", uma, { once: true });
      }
      setTimeout(uma, 8000);
    });
  }

  // ── Estado ─────────────────────────────────────────────────────────────────
  const L = { fase: "parado", t0: 0, ultimo: 0, raf: 0, primeira: true };

  function iniciar(primeira) {
    L.fase = "espera";
    L.primeira = primeira;
    L.t0 = L.ultimo = performance.now();
    H.classList.add("ps-boot");
    cancelAnimationFrame(L.raf);
    L.raf = requestAnimationFrame(quadro);
    clearTimeout(L.limite);
    L.limite = setTimeout(() => {
      for (const k in tarefas) marcar(k);
    }, LIMITE * 1000);
  }

  function quadro(agora) {
    const dt = Math.min(0.1, Math.max(0, (agora - L.ultimo) / 1000));
    L.ultimo = agora;
    if (L.fase === "espera") {
      if (tudoPronto()) return revelarSemLoader();
      if (((agora - L.t0) / 1000 >= ESPERA || REF) && D.body) mostrar();
    }
    if (L.fase === "cena") atualizarCena(dt);
    else if (L.fase === "simples") atualizarSimples(dt);
    if (L.fase !== "parado") L.raf = requestAnimationFrame(quadro);
  }

  function revelarSemLoader() {
    L.fase = "parado";
    clearTimeout(L.limite);
    H.classList.add("ps-fade");
    H.classList.remove("ps-boot");
    setTimeout(() => H.classList.remove("ps-fade"), 260);
  }

  // ── DOM ────────────────────────────────────────────────────────────────────
  function el(tag, css, pai, texto) {
    const e = D.createElement(tag);
    if (css) e.style.cssText = css;
    if (texto != null) e.textContent = texto;
    if (pai) pai.appendChild(e);
    return e;
  }
  const px = (n) => n + "px";
  function linha(pai, cor, op) {
    const e = el("div", `position:absolute;left:0;top:0;background:${cor};opacity:${op}`, pai);
    return (x, y, w, h) => {
      if (w <= 0.5 || h <= 0.5) return (e.style.display = "none");
      e.style.display = "";
      e.style.left = px(x);
      e.style.top = px(y);
      e.style.width = px(w);
      e.style.height = px(h);
    };
  }
  function barra(pai, x, y, w) {
    const trilho = el("div", `position:absolute;left:${x}px;top:${y}px;width:${w}px;height:3px;border-radius:3px;overflow:hidden;background:${a(C.neutral, 10)}`, pai);
    const cheio = el("div", `height:100%;width:0;border-radius:3px;background:linear-gradient(90deg, ${C.acc}, ${C.accS})`, trilho);
    return (p) => (cheio.style.width = clamp(p, 0, 1) * 100 + "%");
  }

  function montarOverlay() {
    const raiz = el("div", "", D.body);
    raiz.className = "ps-loader";
    raiz.setAttribute("role", "status");
    raiz.setAttribute("aria-live", "polite");
    const sr = el("span", "", raiz, TXT.sr);
    sr.className = "ps-sr";
    const fundo = el("div", `position:absolute;inset:0;background:${C.ink}`, raiz);
    const palco = el("div", "position:absolute;left:0;top:0;transform-origin:0 0", raiz);
    palco.setAttribute("aria-hidden", "true");
    return { raiz, sr, fundo, palco };
  }

  // ── Cena (Splash + Site) ───────────────────────────────────────────────────
  let V; // tudo da cena atual

  function mostrar() {
    const mobile = W.innerWidth <= 600;
    const cfg = mobile ? CENAS.mobile : CENAS.desktop;
    let splash = false;
    if (REF) splash = true;
    else if (!reduzido && L.primeira) {
      try {
        splash = !sessionStorage.getItem("ps-splash");
        sessionStorage.setItem("ps-splash", "1");
      } catch {
        splash = false;
      }
    }
    H.classList.add("ps-anim");
    const o = montarOverlay();
    V = { cfg, mobile, splash, o, alvos: null, site: 0, spl: 0 };
    if (reduzido) return montarSimples();

    L.fase = "cena";
    V.T = V.Tr = V.T0 = splash ? 0 : S - 0.45;
    const { fundo, palco } = o;
    const f = cfg;
    // Fundo: auras (radial-gradient, sem filter: blur) e grade da planta.
    V.auras = f.auras.map((fn) => {
      const d = fn(0).d;
      return el("div", `position:absolute;left:0;top:0;width:${d}px;height:${d}px;border-radius:50%;background:radial-gradient(circle, ${fn(0).cor}, transparent 65%)`, fundo);
    });
    V.grade = el("div", `position:absolute;inset:0;background-image:linear-gradient(${a(C.neutral, 11)} 1px, transparent 1px), linear-gradient(90deg, ${a(C.neutral, 11)} 1px, transparent 1px)`, fundo);
    // Splash: guias, cotas, HUD e progresso.
    const sp = (V.sp = {});
    sp.h = [6, 30, 42].map((u) => linha(palco, C.acc, u === 30 ? 0.5 : 0.34));
    sp.v = [9.75, 38.25].map(() => linha(palco, C.acc, 0.3));
    const lab = `position:absolute;left:0;top:0;font-family:${F.mono};font-size:${f.an.fs}px;color:${C.accS};white-space:nowrap`;
    sp.g = [0, 1, 2, 3].map(() => el("div", "position:absolute;inset:0", palco));
    sp.l0 = [linha(sp.g[0], C.accS, 0.8), linha(sp.g[0], C.accS, 0.8), linha(sp.g[0], C.accS, 0.8)];
    sp.t0 = el("div", lab + ";transform:translateX(-50%)", sp.g[0], "8u");
    sp.l1 = [linha(sp.g[1], C.accS, 0.8), linha(sp.g[1], C.accS, 0.8), linha(sp.g[1], C.accS, 0.8)];
    sp.t1 = el("div", lab + ";transform:translateX(-100%)", sp.g[1], "36u");
    sp.dot = el("div", `position:absolute;width:${f.an.dot}px;height:${f.an.dot}px;border-radius:50%;background:${C.accS}`, sp.g[2]);
    sp.l2 = linha(sp.g[2], C.accS, 0.8);
    sp.t2 = el("div", lab, sp.g[2], "r 12u");
    sp.l3 = [linha(sp.g[3], C.accS, 0.8), linha(sp.g[3], C.accS, 0.8), linha(sp.g[3], C.accS, 0.8)];
    sp.t3 = el("div", lab + ";transform:translateX(-50%)", sp.g[3], "2,5u");
    const hud = `position:absolute;top:${f.hud.y}px;font-family:${F.mono};font-size:${f.hud.fs}px;letter-spacing:.22em`;
    sp.hudE = el("div", `${hud};left:${f.hud.x}px;color:${C.accS}`, palco, "PROG · 01");
    sp.hudD = el("div", `${hud};right:${f.hud.x}px;color:${C.dim}`, palco, f.hud.dir);
    sp.prog = el("div", "position:absolute;inset:0", palco);
    const b = f.barra;
    const rot = el("div", `position:absolute;left:${b.x}px;top:${b.ly}px;width:${b.w}px;display:flex;justify-content:space-between;font-family:${F.mono};font-size:${b.fs}px;letter-spacing:${b.ls};color:${C.dim}`, sp.prog);
    el("span", "", rot, TXT.carregando);
    sp.pct = el("span", `color:${C.acc};letter-spacing:${b.pls}`, rot, "000%");
    sp.barra = barra(sp.prog, b.x, b.y, b.w);
    // Site: "CARREGANDO PÁGINA 000%".
    const t = f.texto;
    V.txt = el("div", `position:absolute;left:0;top:${t.y}px;width:${f.W}px;text-align:center;font-family:${F.mono};font-size:${t.fs}px;letter-spacing:${t.ls};color:${C.dim}`, palco, TXT.pagina + " ");
    V.txtPct = el("span", `color:${C.acc};letter-spacing:${t.pls};margin-left:${t.gap}px`, V.txt, "000%");
    // Marca e wordmark do lockup.
    V.marca = criarMarca(D);
    palco.appendChild(V.marca.el);
    V.word = el("div", `position:absolute;left:${f.word.x}px;top:${f.word.cy - f.word.size / 2}px;font-family:${F.sora};font-size:${f.word.size}px;line-height:1;letter-spacing:-.03em;white-space:nowrap;color:${C.text};padding-right:.08em`, palco);
    el("span", "font-weight:600", V.word, "Prog");
    V.word.appendChild(D.createTextNode(" "));
    el("span", `font-weight:400;color:${C.mut}`, V.word, "Soluções");

    medir();
    W.addEventListener("resize", medir);
    renderCena();
  }

  // Palco na escala "contain" da tela; guias e grade vão de borda a borda.
  function medir() {
    if (!V) return;
    const { cfg } = V, vw = W.innerWidth, vh = W.innerHeight;
    const k = Math.min(vw / cfg.W, vh / cfg.H);
    const ox = (vw - cfg.W * k) / 2, oy = (vh - cfg.H * k) / 2;
    V.k = k;
    V.ox = ox;
    V.oy = oy;
    V.x0 = -ox / k;
    V.x1 = (vw - ox) / k;
    V.y0 = -oy / k;
    V.y1 = (vh - oy) / k;
    V.o.palco.style.width = px(cfg.W);
    V.o.palco.style.height = px(cfg.H);
    V.o.palco.style.transform = `translate(${ox}px, ${oy}px) scale(${k})`;
    if (V.alvos) medirAlvo();
  }
  function medirAlvo() {
    const m = V.alvos.logoMark;
    if (!m) return (V.alvo = null);
    const r = m.getBoundingClientRect();
    V.alvo = { cx: (r.left + r.width / 2 - V.ox) / V.k, cy: (r.top + r.height / 2 - V.oy) / V.k, s: r.width / V.k };
  }

  function atualizarCena(dt) {
    if (REF) {
      if (!isNaN(QUADRO) && V.T + dt >= QUADRO) dt = Math.max(0, QUADRO - V.T);
      V.Tr += dt;
      V.T += dt;
      V.spl = 1;
      V.site = SIM_SITE(V.T - S);
      if (V.T >= SEGURA && !V.alvos && tarefas.app && tarefas.app.f >= 1) prepararRevelacao();
      renderCena();
      if (V.alvos && V.T >= V.fimT) concluir();
      return;
    }
    V.Tr += dt;
    V.T += dt;
    const r = real();
    if (V.T >= 0.2 && V.T < S) V.spl = suavizar(V.spl, r, dt);
    if (V.T >= S + 0.2) V.site = suavizar(V.site, r, dt);
    const completo = tudoPronto() && V.site >= 0.999;
    if (!completo && V.T > SEGURA) V.T = SEGURA;
    // Pronto no meio do trecho de espera: pula direto para a conclusão (nada muda entre S+0,5 e S+2,85).
    if (completo && V.T >= S + 0.5 && V.T < SEGURA) V.T = SEGURA;
    if (completo && V.T >= SEGURA && !V.alvos) prepararRevelacao();
    renderCena();
    if (V.alvos && V.T >= V.fimT) concluir();
  }

  function renderCena() {
    const { cfg: f, sp, o } = V;
    const T = V.T, Tr = V.Tr;
    const { enter, draw, pop } = relogio(T);

    // Geometria da marca: splash → lockup → loader do site → cabeçalho.
    let cx = f.m0.cx, cy = f.m0.cy, s = lerp(f.m0.s0, f.m0.s1, draw(0, 3.4));
    const ga = enter(3.35, 4.35);
    cx = lerp(cx, f.lock.cx, ga); cy = lerp(cy, f.lock.cy, ga); s = lerp(s, f.lock.s, ga);
    const gb = V.splash ? draw(S - 0.6, S + 0.15) : 1;
    cx = lerp(cx, f.site.cx, gb); cy = lerp(cy, f.site.cy, gb); s = lerp(s, f.site.s, gb);
    const gc = enter(S + 3.0, S + 3.8);
    if (V.alvo) {
      cx = lerp(cx, V.alvo.cx, gc); cy = lerp(cy, V.alvo.cy, gc); s = lerp(s, V.alvo.s, gc);
    }

    const arcB = T < S - 0.45 ? draw(1.7, 2.5) : T < S + 0.2 ? 1 - draw(S - 0.45, S + 0.2) : V.site;
    const track = draw(S - 0.45, S + 0.2, 0, 0.2) * (1 - draw(S + 2.9, S + 3.4));
    const inSite = T >= S - 0.5;
    const ringOp = inSite ? 0.75 * draw(S - 0.2, S + 0.4) * (1 - enter(S + 2.9, S + 3.5)) : 0.9 * (1 - draw(3.3, 3.8));
    const ring = inSite ? 1 : draw(0.8, 1.6);
    const ringScale = inSite ? 1 + 0.6 * enter(S + 2.9, S + 3.5) : 1;
    const rot = inSite ? (Tr - (S - 0.5)) * 50 : 0;
    const pousou = V.alvo && gc >= 1;
    V.marca.set({
      cx, cy, s, stem: pop(1.3, 1.95), arcB, track, ring, ringOp, ringScale, rot,
      ringColor: inSite ? C.acc : C.accS, ringW: f.ring.w, dash: f.ring.d, gap: f.ring.g,
      opacity: pousou ? 0 : 1,
    });

    // Entrada (sem splash) e saída do fundo, que revela a página por baixo.
    const entrada = V.splash ? 1 : EASE.draw(clamp((Tr - V.T0) / 0.2, 0, 1));
    o.raiz.style.opacity = entrada;
    o.fundo.style.opacity = 1 - draw(S + 2.9, S + 3.4);
    o.raiz.style.pointerEvents = T >= S + 3.0 ? "none" : "";

    // Auras e grade.
    const aura = draw(0, 1.2);
    V.auras.forEach((e, i) => {
      const g = f.auras[i](Tr);
      e.style.opacity = aura;
      e.style.transform = `translate(${V.ox + g.x * V.k}px, ${V.oy + g.y * V.k}px) scale(${V.k})`;
      e.style.transformOrigin = "0 0";
    });
    const gridU = V.splash ? draw(0, 0.9) * (1 - 0.75 * draw(3.3, 4.2)) * (1 - draw(S - 0.6, S)) : 0;
    V.grade.style.display = gridU > 0.001 ? "" : "none";
    if (gridU > 0.001) {
      const gr = lerp(0, f.grid.r, enter(0, 1.4)) * V.k;
      const gx = V.ox + f.grid.cx * V.k, gy = V.oy + f.grid.cy * V.k;
      const m = `radial-gradient(circle at ${gx}px ${gy}px, #000 0, #000 ${gr * 0.35}px, transparent ${gr}px)`;
      V.grade.style.opacity = gridU;
      V.grade.style.backgroundSize = `${f.grid.size * V.k}px ${f.grid.size * V.k}px`;
      V.grade.style.backgroundPosition = `${V.ox + f.grid.x * V.k}px ${V.oy + f.grid.y * V.k}px`;
      V.grade.style.webkitMaskImage = m;
      V.grade.style.maskImage = m;
    }

    // Splash.
    const naSplash = T < S;
    const vis = (e, v) => (e.style.display = v ? "" : "none");
    [sp.hudE, sp.hudD, sp.prog, ...sp.g].forEach((e) => vis(e, naSplash));
    if (naSplash) {
      const k = s / 48, X = (u) => cx + (u - 24) * k, Yu = (u) => cy + (u - 24) * k;
      const th = f.th, an = f.an, Wd = V.x1 - V.x0, Ht = V.y1 - V.y0;
      [6, 30, 42].forEach((u, i) => {
        const a0 = draw(3.25 + i * 0.06, 3.9 + i * 0.06), b0 = draw(0.3 + i * 0.12, 1.1 + i * 0.12);
        sp.h[i](V.x0 + a0 * Wd, Yu(u) - th / 2, (b0 - a0) * Wd, th);
      });
      [9.75, 38.25].forEach((u, i) => {
        const a0 = draw(3.3 + i * 0.06, 3.95 + i * 0.06), b0 = draw(0.5 + i * 0.12, 1.3 + i * 0.12);
        sp.v[i](X(u) - th / 2, V.y0 + a0 * Ht, th, (b0 - a0) * Ht);
      });
      const out = 1 - draw(3.05, 3.45);
      const an_ = (i) => enter(1.95 + i * 0.18, 2.6 + i * 0.18) * out;
      sp.g.forEach((g, i) => {
        const v = an_(i);
        g.style.opacity = v;
        g.style.transform = `translateY(${(1 - v) * an.sobe}px)`;
      });
      const tk = an.tick;
      sp.l0[0](X(9.75), Yu(2.5), 8 * k, th);
      sp.l0[1](X(9.75), Yu(2.5) - tk, th, 2 * tk);
      sp.l0[2](X(17.75) - th, Yu(2.5) - tk, th, 2 * tk);
      pos(sp.t0, X(13.75), Yu(2.5) + an.l8);
      sp.l1[0](X(5), Yu(6), th, 36 * k);
      sp.l1[1](X(5) - tk, Yu(6), 2 * tk, th);
      sp.l1[2](X(5) - tk, Yu(42) - th, 2 * tk, th);
      pos(sp.t1, X(5) + an.l36x, Yu(24) + an.l36y);
      const rx = 26.25 + 12 * Math.cos(-Math.PI / 4), ry = 18 + 12 * Math.sin(-Math.PI / 4);
      pos(sp.dot, X(rx) - an.dot / 2, Yu(ry) - an.dot / 2);
      sp.l2(X(rx) + an.rl0, Yu(ry) - th / 2, an.rlw, th);
      pos(sp.t2, X(rx) + an.rlab, Yu(ry) + an.rlaby);
      sp.l3[0](X(17.75), Yu(45.5), 2.5 * k, th);
      sp.l3[1](X(17.75), Yu(45.5) - tk, th, 2 * tk);
      sp.l3[2](X(20.25) - th, Yu(45.5) - tk, th, 2 * tk);
      pos(sp.t3, X(19), Yu(45.5) + an.l25);
      const hud = draw(0.2, 0.8) * (1 - draw(3.3, 3.8));
      sp.hudE.style.opacity = sp.hudD.style.opacity = hud;
      const pv = Math.min(SIM_SPLASH(T), V.spl);
      sp.prog.style.opacity = draw(0.2, 0.7) * (1 - draw(5.0, 5.5));
      sp.pct.textContent = pct(pv);
      sp.barra(pv);
    }
    // Wordmark do lockup.
    const wr = V.splash ? enter(3.85, 4.75) * (1 - draw(S - 0.95, S - 0.5)) : 0;
    vis(V.word, wr > 0.001);
    if (wr > 0.001) revelar(V.word, wr, f.word.size);

    // Site: texto do carregamento.
    const ldOp = draw(S + 0.1, S + 0.5) * (1 - draw(S + 2.85, S + 3.15));
    vis(V.txt, T >= S - 0.2 && ldOp > 0.001);
    V.txt.style.opacity = ldOp;
    V.txtPct.textContent = pct(T < S + 0.2 ? 0 : V.site);

    if (V.alvos) renderPagina(T);
  }
  function pos(e, x, y) {
    e.style.left = px(x);
    e.style.top = px(y);
  }
  // Revelação do Word da referência: clip da direita + translateX −25% do tamanho.
  function revelar(e, r, size) {
    e.style.clipPath = `inset(-20% ${(1 - r) * 100}% -20% 0)`;
    e.style.translate = `${-(1 - r) * size * 0.25}px 0`;
    e.style.opacity = Math.min(1, r * 2.5);
  }

  // ── Conteúdo real da página (cabeçalho e topo) ─────────────────────────────
  function prepararRevelacao() {
    const q = (s) => [...D.querySelectorAll(s)];
    const visivel = (e) => e.getClientRects().length > 0;
    const al = (V.alvos = {
      logoMark: D.querySelector('[data-ps="logo-mark"]'),
      logoWord: D.querySelector('[data-ps="logo-word"]'),
      nav: q('[data-ps="nav-item"]').filter(visivel),
      menu: q('[data-ps="nav-menu"]').filter(visivel),
      pill: q('[data-ps="hero-pill"]'),
      cta: q('[data-ps="hero-cta"]'),
      linhas: [],
    });
    // Palavras do título agrupadas por linha (como as linhas da referência).
    let topo = null;
    q('[data-ps="hero-w"]').forEach((w) => {
      const t = Math.round(w.getBoundingClientRect().top);
      if (topo === null || Math.abs(t - topo) > 4) al.linhas.push([]), (topo = t);
      al.linhas[al.linhas.length - 1].push(w.firstElementChild || w);
    });
    al.wordSize = al.logoWord ? parseFloat(getComputedStyle(al.logoWord).fontSize) : 0;
    al.todos = [al.logoMark, al.logoWord, ...al.nav, ...al.menu, ...al.pill, ...al.cta, ...al.linhas.flat()].filter(Boolean);
    const h = V.cfg.heroi;
    V.fimT = Math.max(S + h.cta[1], S + 4.2 + 6 * 0.06, S + h.linha[0] + h.linha[1] * Math.max(0, al.linhas.length - 1) + h.linha[2]) + 0.05;
    medirAlvo();
    renderPagina(V.T);
    H.classList.remove("ps-boot");
  }

  function renderPagina(T) {
    const { enter } = relogio(T);
    const al = V.alvos, h = V.cfg.heroi;
    const gc = enter(S + 3.0, S + 3.8);
    if (al.logoMark) al.logoMark.style.opacity = V.alvo && gc < 1 ? 0 : "";
    if (al.logoWord) revelar(al.logoWord, enter(S + 3.55, S + 4.2), al.wordSize);
    const it = (i) => enter(S + 3.4 + i * 0.06, S + 4.0 + i * 0.06);
    const menu = enter(S + 3.6, S + 4.2);
    al.nav.forEach((e) => {
      if (V.mobile) return void (e.style.opacity = menu);
      const v = it(+e.dataset.psI || 0);
      e.style.opacity = v;
      e.style.translate = `0 ${(1 - v) * 10}px`;
    });
    al.menu.forEach((e) => {
      if (V.mobile) return void (e.style.opacity = menu);
      const v = it(6);
      e.style.opacity = v;
      e.style.translate = `0 ${(1 - v) * 10}px`;
    });
    const pill = enter(S + h.pill[0], S + h.pill[1]);
    al.pill.forEach((e) => (e.style.opacity = pill));
    al.linhas.forEach((ws, i) => {
      const r = enter(S + h.linha[0] + i * h.linha[1], S + h.linha[0] + i * h.linha[1] + h.linha[2]);
      ws.forEach((w) => (w.style.translate = `0 ${(1 - r) * 110}%`));
    });
    const cta = enter(S + h.cta[0], S + h.cta[1]);
    al.cta.forEach((e) => {
      e.style.opacity = cta;
      e.style.translate = `0 ${(1 - cta) * h.cta[2]}px`;
    });
  }

  function concluir() {
    if (V.alvos) V.alvos.todos.forEach((e) => {
      e.style.opacity = "";
      e.style.translate = "";
      e.style.clipPath = "";
    });
    fechar();
  }
  function fechar() {
    V.o.sr.textContent = TXT.ok;
    V.o.raiz.remove();
    W.removeEventListener("resize", medir);
    H.classList.remove("ps-boot");
    clearTimeout(L.limite);
    L.fase = "parado";
    V = null;
    W.dispatchEvent(new Event("ps:pronto"));
  }

  // ── Movimento reduzido: símbolo sólido, barra linear e fade de 200 ms ──────
  function montarSimples() {
    L.fase = "simples";
    const { palco, raiz } = V.o;
    V.Tr = 0;
    V.saida = -1;
    palco.style.cssText = "position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:220px;display:flex;flex-direction:column;align-items:center;gap:28px";
    const m = criarMarca(D);
    m.el.style.position = "static";
    m.set({ cx: 44, cy: 44, s: 88 });
    m.el.style.transform = "";
    palco.appendChild(m.el);
    const rot = el("div", `width:220px;display:flex;justify-content:space-between;font-family:${F.mono};font-size:11px;letter-spacing:.22em;color:${C.dim}`, palco);
    el("span", "", rot, TXT.carregando);
    V.pctS = el("span", `color:${C.acc};letter-spacing:.06em`, rot, "000%");
    const caixa = el("div", "position:relative;width:220px;height:3px", palco);
    V.barraS = barra(caixa, 0, 0, 220);
    raiz.style.opacity = 0;
  }
  function atualizarSimples(dt) {
    V.Tr += dt;
    V.site = suavizar(V.site, real(), dt);
    V.pctS.textContent = pct(V.site);
    V.barraS(V.site);
    if (V.saida < 0) {
      V.o.raiz.style.opacity = EASE.draw(clamp(V.Tr / 0.2, 0, 1));
      if (tudoPronto() && V.site >= 0.999) {
        V.saida = V.Tr;
        H.classList.add("ps-fade");
        H.classList.remove("ps-boot");
      }
    } else {
      const f = clamp((V.Tr - V.saida) / 0.2, 0, 1);
      V.o.raiz.style.opacity = 1 - EASE.draw(f);
      if (f >= 1) {
        H.classList.remove("ps-fade");
        fechar();
      }
    }
  }

  // ── Início e avisos do app ─────────────────────────────────────────────────
  iniciarTarefas({ html: 0.1, css: 0.1, fontes: 0.2, app: 0.4, imagens: 0.2 });
  vigiarFontes(['600 1em "Sora"', '400 1em "Sora"']);
  const aoLer = () => {
    if (D.readyState === "loading") return;
    D.removeEventListener("readystatechange", aoLer);
    marcar("html");
    vigiarCss();
  };
  D.addEventListener("readystatechange", aoLer);
  aoLer();
  iniciar(true);

  W.__psLoader = {
    /** O React montou: falta só esperar as imagens da primeira tela. */
    montado() {
      if (tarefas.app && tarefas.app.f < 1) {
        marcar("app");
        requestAnimationFrame(() => vigiarImagens(imagensDaTela(), "imagens"));
      }
    },
    /** Troca de página no navegador: loader só se as imagens da tela ainda não chegaram. */
    rota() {
      if (L.fase !== "parado") return;
      const pend = imagensDaTela().filter((img) => !(img.complete && img.naturalWidth));
      if (!pend.length) return;
      iniciarTarefas({ imagens: 1 });
      vigiarImagens(pend, "imagens");
      iniciar(false);
    },
  };
})();
