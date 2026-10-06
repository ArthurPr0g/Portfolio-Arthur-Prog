import { useCallback, useEffect, useRef, useState } from "react";
import "./BeforeAfter.css";

const clamp = (v) => Math.min(100, Math.max(0, v));
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Comparador de antes e depois. A posição real segue o alvo com uma
// interpolação por frame, o que deixa o arrasto e os cliques fluidos sem
// atrasar o dedo. A posição é aplicada direto no DOM (variável CSS), sem
// re-render do React a cada frame.
export default function BeforeAfter({ pairs }) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef(null);
  const target = useRef(50);
  const current = useRef(50);
  const raf = useRef(0);
  const introPlayed = useRef(false);
  const introTimers = useRef([]);

  const paint = useCallback(() => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty("--pos", current.current.toFixed(3) + "%");
    el.setAttribute("aria-valuenow", String(Math.round(current.current)));
    el.dataset.side = current.current < 12 ? "after" : current.current > 88 ? "before" : "both";
  }, []);

  const loop = useCallback(() => {
    const diff = target.current - current.current;
    if (Math.abs(diff) < 0.02) {
      current.current = target.current;
      paint();
      raf.current = 0;
      return;
    }
    current.current += diff * 0.22;
    paint();
    raf.current = requestAnimationFrame(loop);
  }, [paint]);

  const moveTo = useCallback(
    (pos, instant = false) => {
      target.current = clamp(pos);
      if (instant || prefersReducedMotion()) {
        current.current = target.current;
        paint();
        return;
      }
      if (!raf.current) raf.current = requestAnimationFrame(loop);
    },
    [loop, paint]
  );

  const stopIntro = () => {
    introTimers.current.forEach(clearTimeout);
    introTimers.current = [];
  };

  const posFromEvent = (e) => {
    const r = frameRef.current.getBoundingClientRect();
    return ((e.clientX - r.left) / r.width) * 100;
  };

  const onPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    stopIntro();
    frameRef.current.setPointerCapture(e.pointerId);
    setDragging(true);
    moveTo(posFromEvent(e));
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    moveTo(posFromEvent(e));
  };
  const onPointerUp = (e) => {
    setDragging(false);
    if (frameRef.current.hasPointerCapture(e.pointerId)) frameRef.current.releasePointerCapture(e.pointerId);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 4;
    const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step };
    if (e.key in map) moveTo(target.current + map[e.key]);
    else if (e.key === "Home") moveTo(0);
    else if (e.key === "End") moveTo(100);
    else return;
    e.preventDefault();
    stopIntro();
  };

  // Na primeira vez que o comparador aparece na tela, a barra faz um
  // movimento curto para mostrar que dá para arrastar.
  useEffect(() => {
    const el = frameRef.current;
    paint();
    if (!el || prefersReducedMotion()) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || introPlayed.current) return;
        introPlayed.current = true;
        io.disconnect();
        [
          [350, 78],
          [1250, 24],
          [2150, 50],
        ].forEach(([t, p]) => introTimers.current.push(setTimeout(() => moveTo(p), t)));
      },
      { threshold: 0.55 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stopIntro();
    };
  }, [moveTo, paint]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Pré-carrega todos os pares para a troca de abas ser instantânea.
  useEffect(() => {
    pairs.forEach((p) => [p.before, p.after].forEach((src) => (new Image().src = src)));
  }, [pairs]);

  const pair = pairs[active];

  return (
    <div className="ba">
      {pairs.length > 1 && (
        <div className="ba__tabs" role="tablist" aria-label="Escolha a seção para comparar">
          {pairs.map((p, i) => (
            <button
              key={p.label}
              type="button"
              role="tab"
              aria-selected={i === active}
              className={"ba__tab" + (i === active ? " is-active" : "")}
              onClick={() => {
                stopIntro();
                setActive(i);
                moveTo(50);
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      <div
        ref={frameRef}
        className={"ba__frame" + (dragging ? " is-dragging" : "")}
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes e depois: ${pair.label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        aria-valuetext="Arraste para comparar o site antigo com o novo"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        {pairs.map((p, i) => (
          <div key={p.label} className={"ba__pair" + (i === active ? " is-active" : "")} aria-hidden={i !== active}>
            <img className="ba__img" src={p.after} alt={`Depois: ${p.label}`} draggable="false" decoding="async" />
            <div className="ba__before">
              <img className="ba__img" src={p.before} alt={`Antes: ${p.label}`} draggable="false" decoding="async" />
            </div>
          </div>
        ))}

        <span className="ba__label ba__label--before">Antes</span>
        <span className="ba__label ba__label--after">Depois</span>

        <div className="ba__handle" aria-hidden="true">
          <span className="ba__line" />
          <span className="ba__knob">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>

      <p className="ba__hint">
        <span className="ba__hint-icon">⟷</span> Arraste a barra para comparar o site antigo com o novo
      </p>
    </div>
  );
}
