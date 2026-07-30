import "./GlobalFx.css";

export default function GlobalFx({ auraRef, glowRef, barRef }) {
  return (
    <>
      <div ref={auraRef} className="fx-aura" aria-hidden="true">
        <span className="fx-blob fx-blob--a" />
        <span className="fx-blob fx-blob--b" />
        <span className="fx-blob fx-blob--c" />
      </div>
      <div className="fx-grid" aria-hidden="true" />
      <div ref={glowRef} className="fx-glow" aria-hidden="true" />
      <div ref={barRef} className="fx-bar" aria-hidden="true" />
    </>
  );
}
