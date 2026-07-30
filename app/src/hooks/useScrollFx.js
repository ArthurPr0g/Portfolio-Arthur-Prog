import { useEffect } from "react";

export function useScrollFx({ barRef, navRef, heroRef, auraRef, timelineRef, trackRef }) {
  useEffect(() => {
    let raf = null;

    const update = () => {
      raf = null;
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const viewH = window.innerHeight;

      if (barRef.current) {
        barRef.current.style.transform = "scaleX(" + (y / max).toFixed(4) + ")";
      }

      if (navRef.current) {
        const on = y > 20;
        navRef.current.style.background = on ? "oklch(0.13 0.006 265 / 0.74)" : "transparent";
        navRef.current.style.backdropFilter = on ? "blur(18px) saturate(160%)" : "none";
        navRef.current.style.borderBottomColor = on ? "oklch(0.7 0 0 / 0.08)" : "transparent";
      }

      if (heroRef.current) {
        const p = Math.min(1, y / (viewH || 800));
        heroRef.current.style.transform =
          "translate3d(0," + (y * 0.16).toFixed(1) + "px,0) scale(" + (1 - p * 0.05).toFixed(4) + ")";
        heroRef.current.style.opacity = String(Math.max(0, 1 - p * 1.25));
      }

      if (auraRef.current) {
        auraRef.current.style.transform = "translate3d(0," + (y * -0.05).toFixed(1) + "px,0)";
      }

      if (timelineRef.current && trackRef.current) {
        const r = timelineRef.current.getBoundingClientRect();
        const done = (viewH * 0.6 - r.top) / Math.max(1, r.height);
        trackRef.current.style.transform = "scaleY(" + Math.max(0, Math.min(1, done)).toFixed(4) + ")";
      }
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [barRef, navRef, heroRef, auraRef, timelineRef, trackRef]);
}
