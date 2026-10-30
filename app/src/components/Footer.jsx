import { waLink, INSTAGRAM_URL, LINKEDIN_URL } from "../data/content";
import { useLang } from "../i18n";
import ProgMark from "../brand/ProgMark";
import "./Footer.css";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <ProgMark s={36} className="footer__mark" />
        <span className="footer__brand">
          <span className="footer__name" translate="no">Arthur Prog</span>
          <span className="footer__tag">{t("Da ideia ao produto", "From idea to product")} — 2026</span>
        </span>
        <span className="footer__links">
          <a href={waLink(t("Olá! Vim pelo portfólio da Prog Soluções.", "Hi! I found Prog Soluções through the portfolio."))} target="_blank" rel="noopener">
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
