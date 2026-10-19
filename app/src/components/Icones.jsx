// Ícones de traço do site (substituem os emojis). Desenhos baseados no
// conjunto Lucide (licença ISC). Herdam a cor do texto (currentColor).

const P = {
  ideia: ["M9 18h6", "M10 22h4", "M12 2a7 7 0 0 0-4 12.74V17h8v-2.26A7 7 0 0 0 12 2z"],
  estrategia: [null, "M12 12h.01"],
  design: ["M12 19l7-7 3 3-7 7-3-3z", "M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z", "M2 2l7.586 7.586"],
  codigo: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
  ia: ["M12 3l1.9 5.8L19.7 10.7 13.9 12.6 12 18.4l-1.9-5.8L4.3 10.7l5.8-1.9z", "M19 17v4", "M17 19h4", "M5 3v3", "M3.5 4.5h3"],
  produto: [
    "M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",
    "M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",
    "M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",
    "M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",
  ],
};

export function Icone({ nome, size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {nome === "estrategia" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
        </>
      )}
      {nome === "design" && <circle cx="11" cy="11" r="2" />}
      {(P[nome] || []).filter(Boolean).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

/** Ícones das 6 etapas de "O que eu construo", na ordem de PIPELINE. */
export const ICONES_PIPELINE = ["ideia", "estrategia", "design", "codigo", "ia", "produto"];
