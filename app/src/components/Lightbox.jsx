import { useEffect } from "react";
import "./Lightbox.css";

export default function Lightbox({ src, alt = "", onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="lightbox" onClick={onClose}>
      <img className="lightbox__img" src={src} alt={alt} />
      <span className="lightbox__close">FECHAR ✕</span>
    </div>
  );
}
