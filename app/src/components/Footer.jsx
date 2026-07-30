import { WHATSAPP_NUMBER, INSTAGRAM_URL, LINKEDIN_URL } from "../data/content";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <span className="footer__badge">AP</span>
        <span className="footer__brand">
          <span className="footer__name">Arthur Prog</span>
          <span className="footer__tag">Da ideia ao produto — 2026</span>
        </span>
        <span className="footer__links">
          <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
            Instagram
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener">
            LinkedIn
          </a>
        </span>
      </div>
    </footer>
  );
}
