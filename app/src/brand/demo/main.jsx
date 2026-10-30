// /dev/loaders — demonstração das cenas "Sistema" e "Documento" para uso futuro
// nos sistemas. Sem link no menu, fora do sitemap e com noindex.
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import AppLoader from "../loaders/AppLoader";
import DocLoader from "../loaders/DocLoader";
import ProgMark from "../ProgMark";
import ProgWordmark from "../ProgWordmark";
import { C, F } from "../mark";
import "./demo.css";

function Moldura({ titulo, mobile, children }) {
  return (
    <figure className={"demo__moldura" + (mobile ? " demo__moldura--mobile" : "")}>
      <div className="demo__tela">{children}</div>
      <figcaption>{titulo}</figcaption>
    </figure>
  );
}

function Sistema() {
  const [real, setReal] = useState(false);
  const [n, setN] = useState(0);
  const [chave, setChave] = useState(0);
  const props = real ? { concluidas: n, pronto: n >= 3 } : { loop: true };
  return (
    <section className="demo__secao">
      <header>
        <h2>Sistema · <code>AppLoader</code></h2>
        <div className="demo__acoes">
          <button className={!real ? "is-on" : ""} onClick={() => (setReal(false), setChave((k) => k + 1))}>Tempo da referência</button>
          <button className={real ? "is-on" : ""} onClick={() => (setReal(true), setN(0), setChave((k) => k + 1))}>Etapas reais</button>
          {real && <button onClick={() => setN((v) => Math.min(3, v + 1))} disabled={n >= 3}>Concluir etapa ({n}/3)</button>}
          {real && <button onClick={() => (setN(0), setChave((k) => k + 1))}>Reiniciar</button>}
        </div>
      </header>
      <div className="demo__par">
        <Moldura titulo="Desktop (1920×1080)"><AppLoader key={"d" + chave} {...props} /></Moldura>
        <Moldura titulo="Mobile (390×844)" mobile><AppLoader key={"m" + chave} {...props} /></Moldura>
      </div>
    </section>
  );
}

function Documento() {
  const [real, setReal] = useState(false);
  const [p, setP] = useState(0);
  const [chave, setChave] = useState(0);
  const props = real ? { progresso: p / 100 } : { loop: true };
  return (
    <section className="demo__secao">
      <header>
        <h2>Documento · <code>DocLoader</code></h2>
        <div className="demo__acoes">
          <button className={!real ? "is-on" : ""} onClick={() => (setReal(false), setChave((k) => k + 1))}>Tempo da referência</button>
          <button className={real ? "is-on" : ""} onClick={() => (setReal(true), setP(0), setChave((k) => k + 1))}>Progresso real</button>
          {real && (
            <label>
              <input type="range" min="0" max="100" value={p} onChange={(e) => setP(+e.target.value)} /> {p}%
            </label>
          )}
          {real && <button onClick={() => (setP(0), setChave((k) => k + 1))}>Reiniciar</button>}
        </div>
      </header>
      <div className="demo__par">
        <Moldura titulo="Desktop (1920×1080)"><DocLoader key={"d" + chave} {...props} /></Moldura>
        <Moldura titulo="Mobile (390×844)" mobile><DocLoader key={"m" + chave} {...props} /></Moldura>
      </div>
    </section>
  );
}

function Marca() {
  return (
    <section className="demo__secao">
      <header><h2>Marca · <code>ProgMark</code> e <code>ProgWordmark</code></h2></header>
      <div className="demo__marcas">
        {[16, 24, 32, 48, 88].map((s) => (
          <div key={s} className="demo__marca"><ProgMark s={s} /><span>{s}px</span></div>
        ))}
        <div className="demo__marca"><ProgMark s={88} ring={1} ringOp={0.75} track={0.2} arcB={0.46} ringColor={C.acc} /><span>arcB 0,46</span></div>
        <div className="demo__marca demo__marca--claro"><ProgMark s={88} stemColor={C.ink} arcColor={C.accD} /><span>claro</span></div>
        <div className="demo__marca demo__marca--lockup"><ProgMark s={52} /><ProgWordmark size={33} style={{ marginLeft: 52 * 0.75 * 0.393 - 52 * 9.75 / 48 }} /></div>
      </div>
      <p className="demo__nota">
        Splash e loader de página rodam no site, não aqui. Para rever o splash: abra o site numa aba nova (o splash vale uma vez por aba) e
        simule rede lenta no DevTools. <a href="/" onClick={() => { try { sessionStorage.removeItem("ps-splash"); } catch { /* sem storage */ } }}>Abrir o site</a>
      </p>
    </section>
  );
}

function Demo() {
  return (
    <main className="demo" style={{ fontFamily: F.dm, color: C.body, background: C.ink }}>
      <h1 style={{ fontFamily: F.sora }}>Telas de carregamento</h1>
      <p className="demo__nota" style={{ color: C.mut }}>
        Componentes isolados em <code>src/brand/loaders/</code>, para uso futuro nos sistemas. Página fora do menu e do sitemap.
      </p>
      <Marca />
      <Sistema />
      <Documento />
    </main>
  );
}

createRoot(document.getElementById("demo")).render(
  <StrictMode>
    <Demo />
  </StrictMode>
);
