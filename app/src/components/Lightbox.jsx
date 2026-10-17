import { useEffect } from "react";
import { useLang } from "../i18n";
import "./Lightbox.css";

export default function Lightbox({ src, alt = "", onClose }) {
  const { t } = useLang();
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
      <span className="lightbox__close">{t("FECHAR", "CLOSE")} ✕</span>
    </div>
  );
}
