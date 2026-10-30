import { useEffect, useRef, useState } from "react";

const PAUSA = typeof location !== "undefined" && new URLSearchParams(location.search).has("quadro")
  ? parseFloat(new URLSearchParams(location.search).get("quadro"))
  : null;

/**
 * Um único relógio (requestAnimationFrame) em segundos para uma cena.
 *   inicio: T inicial · passo(T, dt): devolve o próximo T (permite segurar ou pular)
 *   loop: [de, até] para repetir (demonstração).
 * Devolve { T, Tr } (Tr = tempo real corrido, para giros contínuos).
 * O rAF já para com a aba oculta; o dt é limitado para não pular ao voltar.
 * Use só em árvores pequenas (o loader): o estado muda a cada quadro.
 */
export function useTimeline({ inicio = 0, passo, loop } = {}) {
  const [t, setT] = useState({ T: inicio, Tr: 0 });
  const ref = useRef({ T: inicio, Tr: 0 });
  const passoRef = useRef(passo);
  passoRef.current = passo;

  useEffect(() => {
    let raf, ultimo = performance.now();
    ref.current = { T: inicio, Tr: 0 };
    const quadro = (agora) => {
      let dt = Math.min(0.1, Math.max(0, (agora - ultimo) / 1000));
      ultimo = agora;
      const c = ref.current;
      // ?quadro=13.6 congela a cena nesse T (comparação com a referência).
      if (PAUSA !== null && c.T + dt >= PAUSA) dt = Math.max(0, PAUSA - c.T);
      let T = passoRef.current ? passoRef.current(c.T, dt) : c.T + dt;
      if (loop && T >= loop[1]) T = loop[0];
      ref.current = { T, Tr: c.Tr + dt };
      setT(ref.current);
      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);
    return () => cancelAnimationFrame(raf);
  }, [inicio, loop?.[0], loop?.[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  return t;
}

/** prefers-reduced-motion: reduce (fora do navegador, false). */
export function useMovimentoReduzido() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(mq.matches);
    const f = () => setR(mq.matches);
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return r;
}
