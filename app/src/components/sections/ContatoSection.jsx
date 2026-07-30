import { useState } from "react";
import Reveal from "../Reveal";
import { WHATSAPP_NUMBER, INSTAGRAM_URL, LINKEDIN_URL } from "../../data/content";
import "./ContatoSection.css";

const EMPTY_FORM = { nome: "", email: "", fone: "", msg: "" };

export default function ContatoSection() {
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
      setSentMsg("Preencha seu nome e ao menos um contato.");
      return;
    }
    const linhas =
      "Nome: " + form.nome +
      "\nEmail: " + (form.email || "—") +
      "\nWhatsApp: " + (form.fone || "—") +
      "\nMensagem: " + (form.msg || "—");
    const texto = "Olá Arthur! Vim pelo seu portfólio.\n\n" + linhas;
    window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
    setForm(EMPTY_FORM);
    setSentMsg("Mensagem pronta no WhatsApp — respondo em menos de 24h.");
  };

  return (
    <section id="contato" className="section section--bordered contato-section">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Contato
        </Reveal>
        <Reveal as="h2" className="heading-lg" style={{ maxWidth: 580 }}>
          Tem uma ideia? Vamos transformar em produto.
        </Reveal>
        <Reveal as="p" delay={40} className="section-intro">
          Respondo pessoalmente, geralmente em menos de 24 horas.
        </Reveal>

        <div className="contato-grid">
          <Reveal as="form" onSubmit={handleSubmit} className="contato-form">
            <label className="contato-field">
              <span className="contato-label">Nome</span>
              <input type="text" value={form.nome} onChange={field("nome")} placeholder="Seu nome" />
            </label>
            <label className="contato-field">
              <span className="contato-label">Email</span>
              <input type="email" value={form.email} onChange={field("email")} placeholder="voce@email.com" />
            </label>
            <label className="contato-field">
              <span className="contato-label">WhatsApp</span>
              <input type="tel" value={form.fone} onChange={field("fone")} placeholder="(62) 90000-0000" />
            </label>
            <label className="contato-field">
              <span className="contato-label">Mensagem</span>
              <textarea rows={4} value={form.msg} onChange={field("msg")} placeholder="Conte sobre sua ideia ou projeto" />
            </label>
            <button type="submit" className="btn btn-solid contato-submit">
              Enviar mensagem <span>→</span>
            </button>
            <p className="contato-feedback">{sentMsg}</p>
          </Reveal>

          <Reveal as="div" className="contato-direct">
            <h3 className="contato-direct__title">Prefere direto?</h3>
            <p className="contato-direct__desc">Escolha o canal mais confortável — respondo em todos.</p>
            <div className="contato-direct__list">
              <a href={"https://wa.me/" + WHATSAPP_NUMBER} target="_blank" rel="noopener" className="contato-direct__link contato-direct__link--wa">
                <span className="contato-direct__link-meta">
                  <span className="contato-direct__link-label">WhatsApp</span>
                  <span className="contato-direct__link-value">(62) 98213-3188</span>
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
