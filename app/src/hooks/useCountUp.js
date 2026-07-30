import { useEffect, useRef, useState } from "react";

export function useCountUp(targets, duration = 1700) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = null;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            io.unobserve(entry.target);
            const t0 = performance.now();
            const tick = (t) => {
              const raw = Math.min(1, (t - t0) / duration);
              setProgress(1 - Math.pow(1 - raw, 3));
              if (raw < 1) raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration]);

  const values = targets.map((t) => Math.round(t * progress));
  return [ref, values];
}
