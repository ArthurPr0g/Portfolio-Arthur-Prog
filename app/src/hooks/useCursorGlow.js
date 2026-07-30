import { useEffect } from "react";

export function useCursorGlow(glowRef) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cur = { x: mouse.x, y: mouse.y };
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    const loop = () => {
      cur.x += (mouse.x - cur.x) * 0.12;
      cur.y += (mouse.y - cur.y) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = "translate3d(" + cur.x.toFixed(1) + "px," + cur.y.toFixed(1) + "px,0)";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [glowRef]);
}
