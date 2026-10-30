import { useState } from "react";
import Reveal from "../Reveal";
import { waLink, WHATSAPP_EXIBIDO, LIA_CONTATO_URL, INSTAGRAM_URL, LINKEDIN_URL, EMAIL, AGENDA_URL, AVATAR } from "../../data/content";
import { useLang } from "../../i18n";
import "./ContatoSection.css";

// "site" é o campo-isca (honeypot): fica escondido; só robô preenche.
const EMPTY_FORM = { nome: "", email: "", fone: "", msg: "", site: "" };

/** Manda o contato para a Lia (atendente de IA). Falhou ou demorou (6 s), o WhatsApp abre do mesmo jeito. */
function avisarLia(form, lang) {
  try {
    const sinal = typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(6000) : undefined;
    fetch(LIA_CONTATO_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: form.nome,
        email: form.email,
        telefone: form.fone,
        mensagem: form.msg,
        idioma: lang,
        pagina: window.location.href,
        site: form.site,
      }),
      // Continua mesmo se o celular trocar para o app do WhatsApp.
      keepalive: true,
      signal: sinal,
    }).catch(() => {});
  } catch {
    /* sem rede: segue pelo WhatsApp */
  }
}

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
    const texto = t("Olá! Vim pelo portfólio da Prog Soluções.", "Hi! I found Prog Soluções through the portfolio.") + "\n\n" + linhas;
    // A Lia recebe os dados na hora (pesquisa e prepara o atendimento) e o WhatsApp abre no mesmo toque:
    // abrir só depois de esperar a rede faria o navegador bloquear a nova aba. Robô (isca preenchida) não vai.
    if (!form.site) avisarLia(form, lang);
    window.open(waLink(texto), "_blank", "noopener");
    setForm(EMPTY_FORM);
    setSentMsg(
      t(
        "Recebemos sua mensagem. O atendimento continua pelo WhatsApp, que abriu em outra aba.",
        "We got your message. We'll continue on WhatsApp, which just opened in a new tab."
      )
    );
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
          {t(
            "Resposta rápida pelo WhatsApp da Prog Soluções, já com uma análise do seu negócio.",
            "A quick reply on the Prog Soluções WhatsApp, with a first look at your business already done."
          )}
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
              <textarea rows={4} value={form.msg} onChange={field("msg")} placeholder={t("Conte sobre sua ideia ou projeto", "Tell us about your idea or project")} />
            </label>
            <label className="contato-isca" aria-hidden="true">
              Site
              <input type="text" name="site" tabIndex={-1} autoComplete="off" value={form.site} onChange={field("site")} />
            </label>
            <button type="submit" className="btn btn-solid contato-submit">
              {t("Enviar mensagem", "Send message")} <span>→</span>
            </button>
            <p className="contato-feedback">{sentMsg}</p>
          </Reveal>

          <Reveal as="div" className="contato-direct">
            <div className="contato-direct__head">
              {AVATAR && <img className="contato-direct__avatar" src={AVATAR} alt="Arthur Prog" width="64" height="64" loading="lazy" />}
              <div>
                <h3 className="contato-direct__title">{t("Prefere direto?", "Prefer to reach out directly?")}</h3>
                {AVATAR && <p className="contato-direct__quem">{t(
                  "Quem responde é a Lia, assistente da Prog Soluções, já sabendo do seu projeto.",
                  "Lia, the Prog Soluções assistant, replies already knowing about your project."
                )}</p>}
              </div>
            </div>
            <p className="contato-direct__desc">
              {t("Escolha o canal mais confortável. Pelo WhatsApp, a resposta é mais rápida.", "Pick whichever channel suits you. WhatsApp gets the fastest reply.")}
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
              <a href={waLink(t("Olá! Vim pelo portfólio da Prog Soluções.", "Hi! I found Prog Soluções through the portfolio."))} target="_blank" rel="noopener" className="contato-direct__link contato-direct__link--wa">
                <span className="contato-direct__link-meta">
                  <span className="contato-direct__link-label">WhatsApp</span>
                  <span className="contato-direct__link-value">{lang === "pt" ? WHATSAPP_EXIBIDO.pt : WHATSAPP_EXIBIDO.intl}</span>
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
