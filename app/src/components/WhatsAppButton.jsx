import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "../data/content";
import "./WhatsAppButton.css";

export default function WhatsAppButton() {
  // O botão é fixo no canto inferior direito e cobriria os links do rodapé,
  // então some enquanto o rodapé estiver visível.
  const [overFooter, setOverFooter] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".footer");
    if (!footer) return;

    const io = new IntersectionObserver(([entry]) => setOverFooter(entry.isIntersecting));
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <a
      href={"https://wa.me/" + WHATSAPP_NUMBER}
      target="_blank"
      rel="noopener"
      className={overFooter ? "wa-fab wa-fab--hidden" : "wa-fab"}
      aria-label="Falar no WhatsApp"
      aria-hidden={overFooter}
      tabIndex={overFooter ? -1 : undefined}
    >
      <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.94.54 3.75 1.48 5.3L2 22l4.98-1.62a9.82 9.82 0 0 0 5.06 1.4c5.44 0 9.84-4.4 9.84-9.84S17.48 2 12.04 2Zm5.72 13.9c-.24.68-1.4 1.3-1.94 1.36-.54.06-1.02.1-1.76-.14-.44-.14-1.02-.32-1.76-.66-2.62-1.2-4.32-3.98-4.44-4.16-.12-.18-1.06-1.5-1.02-2.82.04-1.32.72-1.96.98-2.22.26-.26.56-.32.74-.32h.54c.18 0 .4-.02.62.5.24.56.82 2 .9 2.14.08.14.12.3.02.48-.1.18-.16.3-.32.46l-.24.28c-.16.16-.32.34-.14.66.18.32.8 1.34 1.72 2.18 1.18 1.08 1.8 1.26 2.06 1.4.26.14.42.12.58-.04.16-.16.68-.78.86-1.06.18-.28.36-.22.6-.14.24.08 1.52.72 1.78.86.26.14.44.2.5.32.06.12.06.7-.18 1.38Z" />
      </svg>
    </a>
  );
}
