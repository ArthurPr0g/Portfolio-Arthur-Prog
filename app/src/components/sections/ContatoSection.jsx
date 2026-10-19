import { useState } from "react";
import Reveal from "../Reveal";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, LINKEDIN_URL, EMAIL, AGENDA_URL } from "../../data/content";
import { useLang } from "../../i18n";
import "./ContatoSection.css";

const EMPTY_FORM = { nome: "", email: "", fone: "", msg: "" };

export default function ContatoSection() {
  const { lang, t } = useLang();
  const [form, setForm] = useState(EMPTY_FORM);
  const [sentMsg, setSentMsg] = useState("");

  const field = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setSentMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome || (!form.email && !form.fone)) {
      setSentMsg(t("Preencha seu nome e ao menos um contato.", "Please enter your name and at least one way to reach you."));
      return;
    }
    const linhas =
      t("Nome: ", "Name: ") + form.nome +
      "\nEmail: " + (form.email || "—") +
      "\nWhatsApp: " + (form.fone || "—") +
      t("\nMensagem: ", "\nMessage: ") + (form.msg || "—");
    const texto = t("Olá Arthur! Vim pelo seu portfólio.", "Hi Arthur! I found you through your portfolio.") + "\n\n" + linhas;
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    setForm(EMPTY_FORM);
    setSentMsg(t("Mensagem pronta no WhatsApp — respondo em menos de 24h.", "Your message is ready on WhatsApp — I reply within 24 hours."));
  };

  return (
    <section id="contato" className="section section--bordered contato-section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Contato", "Contact")}
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 580 }}>
          {t("Tem uma ideia? Vamos transformar em produto.", "Have an idea? Let's turn it into a product.")}
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          {t("Respondo pessoalmente, geralmente em menos de 24 horas.", "I reply personally, usually within 24 hours.")}
        </Reveal>

        <div className="contato-grid">
          <Reveal as="form" onSubmit={handleSubmit} className="contato-form">
            <label className="contato-field">
              <span className="contato-label">{t("Nome", "Name")}</span>
              <input type="text" value={form.nome} onChange={field("nome")} placeholder={t("Seu nome", "Your name")} />
            </label>
            <label className="contato-field">
              <span className="contato-label">{lang === "pt-pt" ? "E-mail" : "Email"}</span>
              <input type="email" value={form.email} onChange={field("email")} placeholder={t("voce@email.com", "you@email.com")} />
            </label>
            <label className="contato-field">
              <span className="contato-label">WhatsApp</span>
              <input type="tel" value={form.fone} onChange={field("fone")} placeholder={t("(62) 90000-0000", "+1 (555) 000-0000")} />
            </label>
            <label className="contato-field">
              <span className="contato-label">{t("Mensagem", "Message")}</span>
              <textarea rows={4} value={form.msg} onChange={field("msg")} placeholder={t("Conte sobre sua ideia ou projeto", "Tell me about your idea or project")} />
            </label>
            <button type="submit" className="btn btn-solid contato-submit">
              {t("Enviar mensagem", "Send message")} <span>→</span>
            </button>
            <p className="contato-feedback">{sentMsg}</p>
          </Reveal>

          <Reveal as="div" className="contato-direct">
            <h3 className="contato-direct__title">{t("Prefere direto?", "Prefer to reach out directly?")}</h3>
            <p className="contato-direct__desc">
              {t("Escolha o canal mais confortável — respondo em todos.", "Pick whichever channel you like — I answer on all of them.")}
            </p>
            {AGENDA_URL && (
              <a href={AGENDA_URL} target="_blank" rel="noopener" className="btn btn-solid contato-agenda">
                {t("Agendar conversa de 20 min", "Book a 20-minute call")} <span>→</span>
              </a>
            )}
            <div className="contato-direct__list">
              {EMAIL && (
                <a href={"mailto:" + EMAIL} className="contato-direct__link contato-direct__link--mail">
                  <span className="contato-direct__link-meta">
                    <span className="contato-direct__link-label">{lang === "pt-pt" ? "E-mail" : "Email"}</span>
                    <span className="contato-direct__link-value">{EMAIL}</span>
                  </span>
                  <span className="contato-direct__arrow">→</span>
                </a>
              )}
              <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="contato-direct__link contato-direct__link--wa">
                <span className="contato-direct__link-meta">
                  <span className="contato-direct__link-label">WhatsApp</span>
                  <span className="contato-direct__link-value">{lang === "pt" ? "(62) 98213-3188" : "+55 62 98213-3188"}</span>
                </span>
                <span className="contato-direct__arrow">→</span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="contato-direct__link contato-direct__link--ig">
                <span className="contato-direct__link-meta">
                  <span className="contato-direct__link-label">Instagram</span>
                  <span className="contato-direct__link-value">@prog.arthur</span>
                </span>
                <span className="contato-direct__arrow">→</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener" className="contato-direct__link contato-direct__link--li">
                <span className="contato-direct__link-meta">
                  <span className="contato-direct__link-label">LinkedIn</span>
                  <span className="contato-direct__link-value">arthur-araujo</span>
                </span>
                <span className="contato-direct__arrow">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
