// Lógica da página de planos. Roda dentro de um shadow root para que o CSS
// da página não vaze para o portfólio (e vice-versa).
//
// Dois idiomas com tabelas próprias:
// - "pt": preços em reais para o Brasil (valem também no ERP da Prog Imports e
//   na página avulsa — ver CLAUDE.md).
// - "en": preços em dólar para clientes dos EUA, só neste portfólio.
import { DADOS_EN } from "./planos.en.js";
import { DADOS_EU } from "./planos.eu.js";
import { DADOS_PTPT } from "./planos.ptpt.js";
import { paraPtPt } from "../../ptpt.js";

// Textos da página em inglês que mudam por região (elementos com data-r="...").
const REGIAO = {
  usd: {
    sub: "Clear packages with fixed prices for small businesses. Pick just the website, just the system, or both together and save. Built in Brazil for clients in the US, by the same developer behind every project in this portfolio.",
    confianca: "I'm an independent developer based in Brazil. My prices are lower than US agencies because of a lower cost of living and no agency overhead, not lower quality. You can see the live projects in this portfolio.",
    fuso: "Brazil is 1–2 hours ahead of US Eastern Time",
    // Recebimento pela Asaas: cartão estrangeiro, cobrado em reais (decisão do Arthur em 19/10/2026)
    faturado: "Secure card payment. Prices are in US dollars; the charge is processed in Brazilian reais at the day's exchange rate, so your statement shows the equivalent amount (your bank may add its usual foreign transaction fee).",
    porque: "Why are your prices lower than US agencies?",
    fusoFaq: "Everything is remote: video calls, WhatsApp and email, in English. Brazil is 1–2 hours ahead of US Eastern Time, so we share most of the business day.",
    naoIncluso: "Business email, payment processor fees (such as Stripe), sales tax setup and paid third-party apps. You provide the texts and photos; on Premium packages I review the copy to help it sell more.",
  },
  eur: {
    sub: "Clear packages with fixed prices for small businesses. Pick just the website, just the system, or both together and save. Built in Brazil for clients in Europe, by the same developer behind every project in this portfolio.",
    confianca: "I'm an independent developer based in Brazil. My prices are lower than European agencies because of a lower cost of living and no agency overhead, not lower quality. You can see the live projects in this portfolio.",
    fuso: "Brazil is 3–5 hours behind most of Europe: your afternoon is my morning",
    faturado: "Secure card payment. Prices are in euros; the charge is processed in Brazilian reais at the day's exchange rate, so your statement shows the equivalent amount (your bank may add its usual foreign transaction fee).",
    porque: "Why are your prices lower than European agencies?",
    fusoFaq: "Everything is remote: video calls, WhatsApp and email, in English. Brazil is 3–5 hours behind most of Europe, so my mornings overlap with your afternoons every working day.",
    naoIncluso: "Business email, payment processor fees (such as Stripe), VAT registration or tax setup and paid third-party apps. You provide the texts and photos; on Premium packages I review the copy to help it sell more.",
  },
};

export const DADOS_PT = {
  LV: ["Essencial", "Profissional", "Premium"],
  LV_ERP: ["Básico", "Intermediário", "Avançado"],
  PROD: {
    site: { icon: "🌐", meters: ["Personalização", "Animações", "Recursos", "Suporte"], p: [
      { name: "Site Simples", price: 1597, mo: 149, prazo: "5–10 dias úteis", m: [1, 0, 1, 2],
        ideal: "Quem está começando e precisa aparecer no Google e no WhatsApp.",
        f: ["Até 5 páginas ou landing page única", "Modelo profissional com as cores e a logo da marca", "WhatsApp, formulário por e-mail e mapa", "SEO básico e cadeado de segurança (SSL)", "2 rodadas de ajustes · 30 dias de suporte"] },
      { name: "Site Intermediário", price: 2997, mo: 149, prazo: "7–14 dias úteis", m: [3, 3, 2, 2], pop: true,
        ideal: "Empresas que querem uma marca forte e passar mais confiança.",
        f: ["Até 8 páginas", "Layout criado para a sua marca, não é modelo", "Animações ao rolar e efeitos ao passar o mouse", "SEO completo", "2 rodadas de ajustes · 30 dias de suporte"] },
      { name: "Site Completo", price: 5597, mo: 149, prazo: "14–28 dias úteis", m: [5, 5, 4, 4],
        ideal: "Quem quer se destacar e precisa de agendamento ou área do cliente.",
        f: ["Até 15 páginas com design exclusivo e prévia aprovada", "Animações avançadas e transições entre páginas", "Painel para editar todo o site + revisão dos textos", "Agendamento online ou área restrita", "SEO avançado, site muito rápido e acessível", "1 integração com outro sistema", "3 rodadas de ajustes · 60 dias de suporte"] } ] },
    loja: { icon: "🛒", meters: ["Personalização", "Recursos de venda", "Gestão", "Suporte"], p: [
      { name: "Loja Simples", price: 1997, mo: 199, prazo: "7–14 dias úteis", m: [1, 1, 1, 2],
        ideal: "Quem vende pelo Instagram ou WhatsApp e quer um catálogo com carrinho.",
        f: ["Até 50 produtos (sem variações), 20 já cadastrados", "Carrinho com finalização pelo WhatsApp", "Frete por tabela fixa ou Melhor Envio", "Painel de pedidos e produtos", "2 rodadas de ajustes · 30 dias de suporte"] },
      { name: "Loja Intermediária", price: 3597, mo: 199, prazo: "14–28 dias úteis", m: [3, 4, 3, 3], pop: true,
        ideal: "Quem quer receber online, com estoque e área do cliente.",
        f: ["Até 300 produtos com variações (tamanho, cor)", "Boleto, parcelamento e cupons de desconto", "Frete grátis por valor/região, retirada e cálculo na hora", "Busca, filtros, avaliações e animações", "Área do cliente e e-mails automáticos", "Controle de estoque e relatório de vendas", "2 rodadas de ajustes · 60 dias de suporte"] },
      { name: "Loja Completa", price: 6997, mo: 199, prazo: "14–28 dias úteis", m: [5, 5, 5, 5],
        ideal: "Lojas que querem uma experiência exclusiva e automações.",
        f: ["Produtos ilimitados com página completa de gestão", "Design exclusivo e banners animados sob medida", "Favoritos, carrinho e busca inteligente", "Assinatura ou recorrência", "Rastreio do pedido por etapas", "Painel de vendas, dashboard e automações", "3 rodadas de ajustes · 90 dias de suporte"] } ] },
    erp: { icon: "📊", meters: ["Usuários", "Módulos", "Automação", "Suporte"], p: [
      { name: "Gestão Essencial", price: 1997, mo: 199, prazo: "7–14 dias úteis", m: [1, 2, 1, 2],
        ideal: "Quem controla tudo em planilha ou caderno e quer organizar.",
        f: ["Até 5 usuários (administrador e operador)", "Clientes, fornecedores e produtos/serviços", "Orçamentos e pedidos em PDF", "Estoque com alerta de estoque baixo", "Contas a pagar/receber, fluxo de caixa e painel", "Backups diários · 1h de treinamento · 30 dias de suporte"] },
      { name: "Gestão Profissional", price: 4597, mo: 249, prazo: "14–28 dias úteis", m: [3, 3, 4, 3], pop: true,
        ideal: "Quem emite nota fiscal, tem equipe e quer cobrança automática.",
        f: ["Até 15 usuários com permissões", "Emissão de NF-e, NFC-e ou NFS-e*", "Pix e boleto automáticos, com parcelamento", "Compras, comissões e integração com a loja", "Relatórios em Excel/PDF e registro de alterações", "2 treinamentos + manual · 60 dias de suporte"] },
      { name: "Gestão Sob Medida", price: 9597, mo: 349, prazo: "28–52 dias úteis", m: [5, 5, 5, 5], from: true,
        ideal: "Operações com regras próprias que sistemas prontos não atendem.",
        f: ["Usuários ilimitados com permissões detalhadas", "Estoque por lote, validade ou unidade", "Mensalidades, contratos em PDF, trocas e DRE", "Até 3 módulos sob medida (OS, agenda, frota…)", "Relatórios do seu jeito e histórico completo", "Treinamento por equipe · 90 dias de suporte"] } ] },
  },
  BRAND: [
    { name: "Logo Essencial", price: 497, combo: 497, prazo: "5–7 dias úteis", m: [2, 2, 2, 2],
      ideal: "Para quem não tem logo e precisa começar com o essencial bem feito.",
      f: ["2 propostas de logo criadas do zero", "2 rodadas de ajustes", "Versões horizontal, vertical e ícone", "Paleta de cores e fontes da marca", "Arquivos PNG, SVG e PDF (fundo claro e escuro)", "Favicon e foto de perfil para redes sociais"] },
    { name: "Identidade a partir do Logo", price: 597, combo: 597, prazo: "5–10 dias úteis", m: [3, 3, 3, 3],
      ideal: "Para quem já tem logo e precisa do resto da marca: cores, fontes, padrões e redes.",
      f: ["Seu logo atual revisado e vetorizado, se precisar", "Paleta de cores e fontes da marca", "Manual da marca em PDF (uso correto, cores, fontes)", "Cartão de visita e assinatura de e-mail", "Kit redes sociais: perfil, capa e 5 modelos de post/story", "Tudo aplicado no seu site ou loja"] },
    { name: "Identidade Visual Completa", price: 997, combo: 997, prazo: "7–14 dias úteis", m: [5, 5, 5, 4], pop: true,
      ideal: "Logo + identidade juntos, mais barato que separados (R$ 1.094): marca completa no site, nas redes e no papel.",
      f: ["Tudo do Logo Essencial, com 3 propostas e 3 rodadas", "Manual da marca em PDF (uso correto, cores, fontes)", "Cartão de visita e assinatura de e-mail", "Kit redes sociais: perfil, capa e 5 modelos de post/story", "Elementos gráficos e padrões da marca", "Tudo aplicado no seu site ou loja"] },
  ],
  CMP: {
    site: [["Páginas", "até 5", "até 8", "até 15"], ["Design", "modelo adaptado", "criado para a marca", "exclusivo + prévia"], ["Animações", "—", "ao rolar e ao passar o mouse", "avançadas + transições"], ["WhatsApp, formulário e mapa", "✓", "✓", "✓"], ["SEO (Google)", "básico", "completo", "avançado + alta velocidade"], ["Painel para editar o site", "—", "—", "✓"], ["Revisão dos textos", "—", "—", "✓"], ["Agendamento ou área restrita", "—", "—", "✓ (escolher 1)"], ["Integração com outro sistema", "—", "—", "1"], ["Domínio grátis no 1º ano", "✓", "✓", "✓"], ["Rodadas de ajustes", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "30 dias", "60 dias"], ["Prazo", "5–10 dias úteis", "7–14 dias úteis", "14–28 dias úteis"]],
    loja: [["Produtos", "até 50 (sem variações)", "até 300 com variações", "ilimitados"], ["Finalização da compra", "WhatsApp", "pagamento online", "pagamento online"], ["Boleto, parcelamento e cupons", "—", "✓", "✓"], ["Assinatura / recorrência", "—", "—", "✓"], ["Frete", "tabela ou Melhor Envio", "+ grátis, retirada, cálculo na hora", "+ grátis, retirada, cálculo na hora"], ["Busca, filtros e avaliações", "—", "✓", "✓ + busca inteligente"], ["Design", "padrão de loja", "com animações", "exclusivo + banners animados"], ["Área do cliente", "—", "✓ + e-mails automáticos", "✓ + rastreio por etapas"], ["Gestão", "pedidos e produtos", "+ estoque e relatórios", "+ dashboard e automações"], ["Domínio grátis no 1º ano", "✓", "✓", "✓"], ["Rodadas de ajustes", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "14–28 dias úteis"]],
    erp: [["Usuários", "até 5", "até 15", "ilimitados"], ["Clientes, fornecedores e produtos", "✓", "✓", "✓"], ["Orçamentos e pedidos", "✓ com PDF", "✓ + comissões", "✓ + contratos e trocas"], ["Estoque", "entradas, saídas e alerta", "+ compras", "por lote, validade ou unidade"], ["Financeiro", "pagar, receber e caixa", "+ Pix/boleto automáticos", "+ mensalidades e DRE"], ["Nota fiscal (NF-e/NFC-e/NFS-e)", "—", "✓*", "✓*"], ["Integração com a loja virtual", "—", "✓", "✓"], ["Relatórios", "painel principal", "filtros + Excel/PDF", "sob medida"], ["Módulos sob medida", "—", "—", "até 3"], ["Treinamento", "1h", "2 sessões + manual", "por equipe"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "28–52 dias úteis"]],
  },
  COMBOS: [["Start", "site", 0], ["Business", "site", 1], ["Enterprise", "site", 2], ["Loja Start", "loja", 0], ["Loja Growth", "loja", 1], ["Loja Enterprise", "loja", 2]],
  ORCAMENTO: { caps: [2500, 7000, Infinity], rotulos: ["Até R$ 2.500", "Entre R$ 2.500 e R$ 7.000", "Acima de R$ 7.000"] },
};

// moeda: só vale em inglês — "usd" (EUA) ou "eur" (Europa).
// aoTrocarMoeda: chamado pelo seletor de moeda da página em inglês.
export function initPlanos(root, lang = "pt", { moeda = "usd", aoTrocarMoeda } = {}) {
const en = lang === "en";
const pp = lang === "pt-pt"; // Portugal: português de Portugal e euros
const eur = en && moeda === "eur";
// t(pt-BR, inglês, pt-PT opcional — sem ele, sai do conversor ptpt.js)
const t = (pt, ing, ptpt) => (en ? ing : pp ? (ptpt ?? paraPtPt(pt)) : pt);
const D = en ? (eur ? DADOS_EU : DADOS_EN) : pp ? DADOS_PTPT : DADOS_PT;

/* ===== CONFIG ===== */
const WHATSAPP = "5562996368281"; // Lia, a atendente de IA (30/10/2026)

/* ===== DADOS ===== */
const LV = D.LV;
const LV_ERP = D.LV_ERP;
const COLORS = ["green", "blue", "purple"];
const PROD = {
  site: { ...D.PROD.site, lv: LV },
  loja: { ...D.PROD.loja, lv: LV },
  erp: { ...D.PROD.erp, lv: LV_ERP },
};
const BRAND = D.BRAND;
const CMP = D.CMP;

/* ===== CÁLCULOS =====
   Brasil — cartão via Asaas: 2,99% (1x) · 3,49% (2–6x) · 3,99% (7–12x) + R$ 0,49; antecipação 1,25% a.m.
   Até 2x: sem juros. De 3x a 12x: taxa repassada ao cliente.
   EUA — sem parcelamento: 50% para começar e 50% na entrega. */
const brl = v => "R$ " + Math.round(v).toLocaleString("pt-BR");
const usd = v => "$" + Math.round(v).toLocaleString("en-US");
const euro = v => "€" + Math.round(v).toLocaleString("en-IE");
const euroPt = v => Math.round(v).toLocaleString("pt-PT") + " €";
const money = en ? (eur ? euro : usd) : pp ? euroPt : brl;
const mdr = n => n === 1 ? .0299 : n <= 6 ? .0349 : .0399;
const parcela = (P, n) => n <= 2 ? P / n : Math.ceil((P + .49) / (1 - mdr(n) - .0125 * (n + 1) / 2) / n);
// Arredonda para baixo terminando em 97 (reais) ou 90 (dólar e euro).
const fim = en || pp ? 90 : 97;
const xFim = v => Math.floor((v - fim) / 100) * 100 + fim;
// No combo o cliente paga uma mensalidade só: a maior das duas.
function combo(prod, l, el) {
  const a = PROD[prod].p[l], b = PROD.erp.p[el];
  const d = l === el ? [.15, .15, .20][l] : .15;
  return { sum: a.price + b.price, price: xFim((a.price + b.price) * (1 - d)), moSum: a.mo + b.mo, mo: Math.max(a.mo, b.mo) };
}
const mes = v => money(v) + t("/mês", "/mo");
// Linha de pagamento abaixo do preço.
const payLine = P => en ? `50% to start · 50% on delivery (${money(P / 2)} each)`
  : pp ? `50% no início · 50% na entrega (${money(P / 2)} cada)`
  : `2x sem juros de ${brl(P / 2)} · ou 12x de ${brl(parcela(P, 12))}`;
const waLink = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const ctaAttrs = msg => WHATSAPP ? `href="${waLink(msg)}" target="_blank" rel="noopener"` : `href="#contato"`;
const aPartir = t("a partir de", "from");

/* ===== CARDS + COMPARATIVO ===== */
let curTab = "site";
function renderCards(highlight) {
  const P = PROD[curTab];
  root.getElementById("cards").innerHTML = P.p.map((x, i) => `
    <article class="card${x.pop ? " pop" : ""}${highlight === i ? " hl" : ""}" style="animation-delay:${i * 80}ms">
      ${x.pop ? `<span class="badge">⭐ ${t("Mais escolhido", "Most popular")}</span>` : ""}
      <span class="chip c-${COLORS[i]}">${P.lv[i]}</span>
      <h3>${x.name}</h3>
      <p class="ideal">${x.ideal}</p>
      <div class="price">${x.from ? `<small>${aPartir} </small>` : ""}${money(x.price)}</div>
      <div class="pay">${payLine(x.price)}</div>
      <div class="facts"><span class="fact">⏱️ ${x.prazo}</span><span class="fact">🔁 ${t("depois", "then")} ${mes(x.mo)}</span><span class="fact">🌐 ${t("domínio grátis", "free domain")}</span></div>
      <div class="meters">${P.meters.map((m, k) => `<div class="meter">${m}<span class="dots">${[1, 2, 3, 4, 5].map(d => `<i class="${d <= x.m[k] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>
      <ul>${x.f.map(f => `<li>${f}</li>`).join("")}</ul>
      <a class="btn ${x.pop ? "btn-primary" : "btn-ghost"} cta" ${ctaAttrs(t(`Olá! Tenho interesse no pacote ${x.name} (${money(x.price)}).`, `Hi! I'm interested in the ${x.name} package (${money(x.price)}).`))}>${t("Quero este", "I want this")}</a>
    </article>`).join("");
  root.getElementById("cmpTable").innerHTML =
    `<thead><tr><th></th>${P.p.map((x, i) => `<th><span class="chip c-${COLORS[i]}">${P.lv[i]}</span><div style="margin-top:6px">${x.from ? aPartir + " " : ""}${money(x.price)}</div></th>`).join("")}</tr></thead><tbody>` +
    CMP[curTab].map(r => `<tr>${r.map((c, i) => i === 0 ? `<td>${c}</td>` : `<td class="${c.startsWith("✓") ? "yes" : c === "—" ? "no" : ""}">${c}</td>`).join("")}</tr>`).join("") +
    `<tr><td>${t("Mensalidade", "Monthly plan")}</td>${P.p.map(x => `<td>${mes(x.mo)}</td>`).join("")}</tr></tbody>`;
}
function setTab(tab, hl) {
  curTab = tab;
  root.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === tab));
  renderCards(hl);
}
root.querySelectorAll("#tabs button").forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));
const cmpAbrir = t("📋 Comparar os 3 níveis lado a lado", "📋 Compare the 3 tiers side by side");
root.getElementById("cmpBtn").addEventListener("click", e => {
  const w = root.getElementById("cmpWrap"); w.hidden = !w.hidden;
  e.currentTarget.textContent = w.hidden ? cmpAbrir : t("✕ Fechar comparativo", "✕ Close comparison");
});

/* ===== PREÇOS DO TOPO ===== */
root.querySelectorAll("[data-from]").forEach(el => { el.textContent = money(PROD[el.dataset.from].p[0].price); });

/* ===== REGIÃO (só em inglês): textos e seletor de moeda ===== */
if (en) {
  const R = REGIAO[eur ? "eur" : "usd"];
  root.querySelectorAll("[data-r]").forEach(el => { el.textContent = R[el.dataset.r]; });
  root.querySelectorAll("#moedaSel button").forEach(b => {
    b.setAttribute("aria-pressed", String(b.dataset.moeda === (eur ? "eur" : "usd")));
    b.addEventListener("click", () => { if (aoTrocarMoeda && b.dataset.moeda !== (eur ? "eur" : "usd")) aoTrocarMoeda(b.dataset.moeda); });
  });
}

/* ===== COMBOS ===== */
const COMBOS = D.COMBOS;
root.getElementById("comboGrid").innerHTML = COMBOS.map(([n, p, l]) => {
  const c = combo(p, l, l), from = l === 2 ? `<small style='font-size:.8rem;font-weight:600;color:var(--muted)'>${aPartir} </small>` : "";
  const pagamento = en ? `then ${mes(c.mo)} <s>${mes(c.moSum)}</s>`
    : pp ? `depois ${mes(c.mo)} <s>${mes(c.moSum)}</s>`
    : `ou 12x de ${brl(parcela(c.price, 12))} · depois ${brl(c.mo)}/mês <s>${brl(c.moSum)}</s>`;
  return `<div class="combo">
    <span class="chip c-${COLORS[l]}">${PROD[p].icon} + 📊</span>
    <span class="save">${t("economize", "save", "poupe")} ${money(c.sum - c.price)}</span>
    <h4>${n}</h4>
    <div class="parts">${PROD[p].p[l].name} + ${PROD.erp.p[l].name}</div>
    <div class="old">${money(c.sum)} ${t("separado", "separately", "em separado")}</div>
    <div class="now">${from}${money(c.price)}</div>
    <div class="mo">${pagamento}</div>
  </div>`;
}).join("");

/* ===== MARCA ===== */
const brandChips = en ? ["Logo only", "I have a logo", "Complete"] : pp ? ["Só o logótipo", "Já tenho logótipo", "Completa"] : ["Só o logo", "Já tenho logo", "Completa"];
root.getElementById("brandGrid").innerHTML = BRAND.map((x, i) => `
  <article class="card${x.pop ? " pop" : ""}">
    ${x.pop ? `<span class="badge">🎨 ${t("Marca completa", "Full brand")}</span>` : ""}
    <span class="chip c-${COLORS[i]}">${brandChips[i]}</span>
    <h3>${x.name}</h3>
    <p class="ideal">${x.ideal}</p>
    <div class="price">${money(x.price)}</div>
    <div class="pay">${en ? "50% to start · 50% on delivery" : pp ? "50% no início · 50% na entrega" : `${x.combo < x.price ? `ou <b>${brl(x.combo)}</b> fechando junto com site ou loja · ` : ""}2x sem juros de ${brl(x.price / 2)}`}</div>
    <div class="facts"><span class="fact">⏱️ ${x.prazo}</span><span class="fact">🎨 ${t("sem mensalidade", "no monthly fee")}</span></div>
    <ul>${x.f.map(f => `<li>${f}</li>`).join("")}</ul>
    <a class="btn ${x.pop ? "btn-primary" : "btn-ghost"} cta" ${ctaAttrs(en
      ? (i === 1 ? `Hi! I already have a logo and I'd like the ${x.name}.` : `Hi! I need to create my brand: ${x.name}.`)
      : pp ? (i === 1 ? `Olá! Já tenho logótipo e quero a ${x.name}.` : `Olá! Preciso de criar a minha marca de raiz: ${x.name}.`)
      : (i === 1 ? `Olá! Já tenho logo e quero a ${x.name}.` : `Olá! Preciso criar minha marca do zero: ${x.name}.`))}>${t("Quero minha marca", "Build my brand")}</a>
  </article>`).join("");

/* ===== SIMULADOR ===== */
const S = { prod: "site", l: 1, erp: false, el: 1, brand: 0, n: 12 };
function seg(id, items, val, set) {
  const el = root.getElementById(id);
  el.innerHTML = items.map((txt, i) => `<button class="${i === val ? "on" : ""}" data-i="${i}">${txt}</button>`).join("");
  el.querySelectorAll("button").forEach(b => b.onclick = () => { set(+b.dataset.i); renderSim(); });
}
function renderSim() {
  const prods = ["site", "loja", "erp"];
  seg("sProd", en ? ["🌐 Website", "🛒 Online store", "📊 Management only"] : pp ? ["🌐 Site", "🛒 Loja online", "📊 Só gestão"] : ["🌐 Site", "🛒 Loja virtual", "📊 Só gestão"], prods.indexOf(S.prod), i => { S.prod = prods[i]; if (S.prod === "erp") S.erp = false; });
  seg("sLvl", PROD[S.prod].lv, S.l, i => S.l = i);
  seg("sErpLvl", LV_ERP, S.el, i => S.el = i);
  seg("sBrand", en ? ["✅ I have it", "✏️ Logo Design", "🖌️ Brand kit from my logo", "🎨 Full Brand Identity"] : pp ? ["✅ Já tenho", "✏️ Logótipo Essencial", "🖌️ Identidade a partir do logótipo", "🎨 Identidade Completa"] : ["✅ Já tenho", "✏️ Logo Essencial", "🖌️ Identidade a partir do logo", "🎨 Identidade Completa"], S.brand, i => S.brand = i);
  root.getElementById("sErpToggle").hidden = S.prod === "erp";
  root.getElementById("sErpOn").checked = S.erp;
  root.getElementById("sErpField").hidden = !S.erp || S.prod === "erp";
  const a = PROD[S.prod].p[S.l], lines = [[a.name, a.price]];
  let total = a.price, mo = a.mo, disc = 0, moOld = "";
  if (S.erp && S.prod !== "erp") {
    const b = PROD.erp.p[S.el], c = combo(S.prod, S.l, S.el);
    lines.push([b.name, b.price]); disc = c.sum - c.price; total = c.price; mo = c.mo; moOld = ` <s style="color:var(--muted)">${money(c.moSum)}</s>`;
  }
  if (S.brand) { const b = BRAND[S.brand - 1]; lines.push([b.combo < b.price ? `${b.name} <s style="color:var(--muted)">${money(b.price)}</s>` : b.name, b.combo]); total += b.combo; }
  const from = (S.prod === "erp" && S.l === 2) || (S.erp && S.prod !== "erp" && S.el === 2);
  const nomes = lines.map(l => l[0].replace(/ <s.*<\/s>/, "")).join(" + ");
  const msg = en ? `Hi! I built: ${nomes} for ${money(total)}. I'd like a proposal!` : `Olá! Simulei: ${nomes} por ${money(total)}. Quero uma proposta!`;
  const inst = n => `<span>${n}x de ${brl(parcela(total, n))}</span><span style="color:var(--muted);font-weight:600">total ${brl(parcela(total, n) * n)}</span>`;
  const pagamento = en ? `
    <div class="payopts">
      <div class="po feat"><small>🤝 To start</small><b>${money(total / 2)}</b> (50%)</div>
      <div class="po"><small>🚀 On delivery</small><b>${money(total / 2)}</b> (50%)</div>
    </div>
    <div style="color:var(--muted);font-size:.88rem;margin-top:10px">Pay by credit card (processed in Brazilian reais at the day's exchange rate). You only pay the second half after you approve the finished project.</div>` : pp ? `
    <div class="payopts">
      <div class="po feat"><small>🤝 No início</small><b>${money(total / 2)}</b> (50%)</div>
      <div class="po"><small>🚀 Na entrega</small><b>${money(total / 2)}</b> (50%)</div>
    </div>
    <div style="color:var(--muted);font-size:.88rem;margin-top:10px">Pagamento com cartão de crédito (processado em reais, a moeda brasileira, ao câmbio do dia). A segunda metade só é paga depois de aprovar o projeto final.</div>` : `
    <div class="payopts">
      <div class="po"><small>⚡ Pix ou boleto</small><b>${brl(total / 2)}</b> no fechamento<br><b>${brl(total / 2)}</b> na entrega</div>
      <div class="po feat"><small>💳 Cartão 2x sem juros</small><b>2x de ${brl(total / 2)}</b></div>
    </div>
    <div class="po" style="margin-top:10px">
      <small>🗓️ Cartão parcelado de 3x a 12x (com taxa da operadora)</small>
      <input type="range" min="3" max="12" value="${S.n}" id="sN" aria-label="Número de parcelas">
      <div class="inst-out" id="sInst">${inst(S.n)}</div>
    </div>`;
  root.getElementById("sOut").innerHTML = `
    <div style="font-weight:800;margin-bottom:8px">${t("Resumo", "Summary")}</div>
    ${lines.map(l => `<div class="sum-line"><span>${l[0]}</span><span>${money(l[1])}</span></div>`).join("")}
    ${disc ? `<div class="sum-line disc"><span>🎉 ${t("Desconto do combo", "Bundle discount")}</span><span>− ${money(disc)}</span></div>` : ""}
    <div class="sum-total"><span>Total${from ? t(" (a partir de)", " (from)") : ""}</span><b>${money(total)}</b></div>
    <div style="color:var(--muted);font-size:.9rem">${t("Depois, mensalidade de", "Then a monthly plan of")} <b style="color:var(--text)">${mes(mo)}</b>${moOld} · ${t("domínio grátis no 1º ano", "free domain for the 1st year", "domínio grátis no 1.º ano")}</div>
    ${pagamento}
    <a class="btn btn-primary" style="width:100%;justify-content:center;margin-top:18px" ${ctaAttrs(msg)}>💬 ${t("Quero essa proposta", "Get this proposal", "Quero esta proposta")}</a>`;
  const sN = root.getElementById("sN");
  if (sN) sN.oninput = e => { S.n = +e.target.value; root.getElementById("sInst").innerHTML = inst(S.n); };
}
root.getElementById("sErpOn").onchange = e => { S.erp = e.target.checked; renderSim(); };

/* ===== QUIZ ===== */
const ORC = D.ORCAMENTO;
const Q = en ? [
  { t: "What do you need most right now?", k: "need", o: [
    ["🌐", "Showcase my business", "get found on Google and receive inquiries", "site"],
    ["🛒", "Sell online", "catalog, cart and orders", "loja"],
    ["📊", "Organize my operations", "inventory, sales and finances", "erp"],
    ["🔗", "Website + operations", "everything in one place", "site+erp"],
    ["🚀", "Sell online + operations", "store connected to management", "loja+erp"] ] },
  { t: "Where is your business today?", k: "stage", o: [
    ["🌱", "Just starting", "I want the essentials, done right", 0],
    ["📈", "Growing", "I have customers and want more", 1],
    ["🏢", "Established", "I have a team and my own processes", 2] ] },
  { t: "Do you already have a logo and brand identity?", k: "brand", o: [
    ["✅", "Yes, all set", "logo, colors and fonts defined", 0],
    ["✏️", "Only a logo", "but no colors, fonts or social media standard", 1],
    ["🎨", "Nothing yet", "I need to create the brand from scratch", 2] ] },
  { t: "What's your budget for the project?", k: "budget", o: ORC.rotulos.map((r, i) => [["💵", "💰", "💎"][i], r, "", i]) },
] : pp ? [
  { t: "Do que mais precisa agora?", k: "need", o: [
    ["🌐", "Mostrar a minha empresa", "ser encontrado no Google e receber contactos", "site"],
    ["🛒", "Vender pela internet", "catálogo, carrinho e encomendas", "loja"],
    ["📊", "Organizar a gestão", "stock, vendas e financeiro", "erp"],
    ["🔗", "Site + organizar a gestão", "tudo num só lugar", "site+erp"],
    ["🚀", "Vender online + organizar", "loja integrada na gestão", "loja+erp"] ] },
  { t: "Em que fase está o seu negócio?", k: "stage", o: [
    ["🌱", "A começar", "quero o essencial, bem feito", 0],
    ["📈", "A crescer", "já tenho clientes e quero mais", 1],
    ["🏢", "Estabelecido", "tenho equipa e processos próprios", 2] ] },
  { t: "Já tem logótipo e identidade visual?", k: "brand", o: [
    ["✅", "Sim, tenho tudo", "logótipo, cores e tipos de letra definidos", 0],
    ["✏️", "Só tenho o logótipo", "mas sem padrão de cores, tipos de letra e redes", 1],
    ["🎨", "Não tenho nada", "preciso de criar a marca de raiz", 2] ] },
  { t: "Quanto pretende investir no projeto?", k: "budget", o: ORC.rotulos.map((r, i) => [["💵", "💰", "💎"][i], r, "", i]) },
] : [
  { t: "O que você mais precisa agora?", k: "need", o: [
    ["🌐", "Mostrar minha empresa", "ser encontrado no Google e receber contatos", "site"],
    ["🛒", "Vender pela internet", "catálogo, carrinho e pedidos", "loja"],
    ["📊", "Organizar a gestão", "estoque, vendas e financeiro", "erp"],
    ["🔗", "Site + organizar a gestão", "tudo num lugar só", "site+erp"],
    ["🚀", "Vender online + organizar", "loja integrada à gestão", "loja+erp"] ] },
  { t: "Como está o seu negócio hoje?", k: "stage", o: [
    ["🌱", "Começando", "quero o essencial, bem feito", 0],
    ["📈", "Crescendo", "já tenho clientes e quero mais", 1],
    ["🏢", "Estabelecido", "tenho equipe e processos próprios", 2] ] },
  { t: "Você já tem logo e identidade visual?", k: "brand", o: [
    ["✅", "Sim, tenho tudo", "logo, cores e fontes definidos", 0],
    ["✏️", "Tenho só o logo", "mas sem padrão de cores, fontes e redes", 1],
    ["🎨", "Não tenho nada", "preciso criar a marca do zero", 2] ] },
  { t: "Quanto pretende investir no projeto?", k: "budget", o: ORC.rotulos.map((r, i) => [["💵", "💰", "💎"][i], r, "", i]) },
];
const A = {}; let qStep = 0;
function renderQuiz() {
  const box = root.getElementById("quizBox");
  const bar = `<div class="steps">${Q.map((_, i) => i).map(i => `<span class="${i <= qStep ? "on" : ""}"></span>`).join("")}</div>`;
  if (qStep < Q.length) {
    const q = Q[qStep];
    box.innerHTML = bar + `<div class="q-title">${qStep + 1}. ${q.t}</div><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="e">${o[0]}</span><b>${o[1]}</b>${o[2] ? `<small>${o[2]}</small>` : ""}</button>`).join("")}</div>` + (qStep ? `<button class="q-back" id="qBack">${t("← voltar", "← back")}</button>` : "");
    box.querySelectorAll(".opt").forEach(b => b.onclick = () => { A[q.k] = q.o[+b.dataset.i][3]; qStep++; renderQuiz(); });
    if (qStep) root.getElementById("qBack").onclick = () => { qStep--; renderQuiz(); };
    return;
  }
  const prod = A.need.split("+")[0], withErp = A.need.includes("+erp");
  // O site não sai sem identidade visual: sem marca nenhuma entra a completa (que
  // já inclui o logo); com só o logo, a identidade a partir dele.
  const bi = A.brand === 2 ? 2 : A.brand === 1 ? 1 : -1, bp = bi >= 0 ? BRAND[bi] : null;
  // O orçamento informado vale para o projeto inteiro, marca incluída.
  const priceAt = l => (withErp ? combo(prod, l, l).price : PROD[prod].p[l].price) + (bp ? bp.combo : 0);
  const cap = ORC.caps[A.budget];
  let l = A.stage; while (l > 0 && priceAt(l) > cap) l--;
  const ideal = A.stage, lvName = PROD[prod].lv[l];
  let title, price, mo, parts;
  if (withErp) { const c = combo(prod, l, l); title = "Combo " + COMBOS.find(k => k[1] === prod && k[2] === l)[0]; price = c.price; mo = c.mo; parts = `${PROD[prod].p[l].name} + ${PROD.erp.p[l].name}.`; }
  else { const x = PROD[prod].p[l]; title = x.name; price = x.price; mo = x.mo; parts = ""; }
  const why = (en
    ? { site: "You need a professional presence to be found and to earn trust.", loja: "You want to sell online with a cart, shipping and organized orders.", erp: "You need to move off spreadsheets and keep inventory, sales and finances in one place." }
    : pp ? { site: "Precisa de uma presença profissional para ser encontrado e transmitir confiança.", loja: "Quer vender online com carrinho, portes e encomendas organizados.", erp: "Precisa de sair das folhas de cálculo e ter stock, vendas e financeiro num só lugar." }
    : { site: "Você precisa de presença profissional para ser encontrado e transmitir confiança.", loja: "Você quer vender online com carrinho, frete e pedidos organizados.", erp: "Você precisa sair da planilha e ter estoque, vendas e financeiro num lugar só." })[prod]
    + (withErp ? t(" Como também quer organizar a gestão, o combo sai mais barato e fica tudo integrado, com o mesmo login.", " Since you also want to organize your operations, the bundle costs less and everything is connected, with a single login.", " Como também quer organizar a gestão, o combo fica mais barato e tudo fica integrado, com o mesmo login.") : "");
  const alt = l < ideal ? (en
    ? `<div class="alt">💡 For where your business is, the <b>${PROD[prod].lv[ideal]}</b> tier would be ideal (${money(priceAt(ideal))}). You can start with ${lvName} and upgrade later, paying only the difference.</div>`
    : pp ? `<div class="alt">💡 Pela fase do seu negócio, o nível <b>${PROD[prod].lv[ideal]}</b> seria o ideal (${money(priceAt(ideal))}). Pode começar no ${lvName} e subir de nível mais tarde: paga apenas a diferença.</div>`
    : `<div class="alt">💡 Pelo momento do seu negócio, o nível <b>${PROD[prod].lv[ideal]}</b> seria o ideal (${brl(priceAt(ideal))}). Dá para começar no ${lvName} e fazer upgrade depois, pagando só a diferença.</div>`) : "";
  const fromTxt = l === 2 && (prod === "erp" || withErp);
  const total = price + (bp ? bp.combo : 0);
  const sistema = prod === "erp" ? t("sistema", "system") : t("site", "website");
  const brandTip = !bp ? "" : en
    ? (bi === 2
      ? `<div class="alt">🎨 Since you don't have a brand yet, we included the <b>${bp.name}</b> (${money(bp.combo)}): logo, colors, fonts, brand guide and a social media kit. We create the brand first, then the ${sistema}, already in your style.</div>`
      : `<div class="alt">✏️ Since you already have a logo, we included the <b>${bp.name}</b> (${money(bp.combo)}): from your logo we define colors, fonts, a brand guide and a social media kit, so the ${sistema} launches consistent from day one.</div>`)
    : pp ? (bi === 2
      ? `<div class="alt">🎨 Como ainda não tem marca, incluímos a <b>${bp.name}</b> (${money(bp.combo)}): logótipo, cores, tipos de letra, manual de marca e kit para redes sociais. Criamos primeiro a marca e depois o ${sistema}, já com a sua imagem.</div>`
      : `<div class="alt">✏️ Como já tem logótipo, incluímos a <b>${bp.name}</b> (${money(bp.combo)}): a partir do seu logótipo definimos cores, tipos de letra, manual de marca e kit para redes sociais, e o ${sistema} já nasce coerente com a marca.</div>`)
    : (bi === 2
      ? `<div class="alt">🎨 Como você ainda não tem marca, incluímos a <b>${bp.name}</b> (${brl(bp.combo)}): logo, cores, fontes, manual da marca e kit para redes sociais. Criamos a marca primeiro e depois o ${sistema}, já com a sua cara.</div>`
      : `<div class="alt">✏️ Como você já tem o logo, incluímos a <b>${bp.name}</b> (${brl(bp.combo)}): a partir do seu logo definimos cores, fontes, manual da marca e kit para redes sociais, e o ${sistema} já nasce padronizado.</div>`);
  box.innerHTML = bar + `<div class="result">
    <div>
      <span class="chip c-${COLORS[l]}">${t("Recomendado para você", "Recommended for you", "Recomendado para si")} · ${lvName}</span>
      <h3>${title}</h3>
      <p class="why">${parts ? `<b>${parts}</b> ` : ""}${why}</p>${alt}${brandTip}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
        <a class="btn btn-primary" href="#simulador" id="qSee">${t("Simular pagamento", "See payment details")}</a>
        <button class="btn btn-ghost" id="qAgain">${t("↺ Refazer", "↺ Start over")}</button>
      </div>
    </div>
    <div class="pricebox">
      <small>${fromTxt ? aPartir : t("investimento", "investment")}</small>
      <div class="big">${money(total)}</div>
      ${bp ? `<small>${title} ${money(price)} + ${bp.name} ${money(bp.combo)}</small>` : ""}
      <small>${payLine(total)}</small>
      <div style="margin-top:12px;font-weight:700">${t("depois", "then")} ${mes(mo)}</div>
      <small>🌐 ${t("domínio grátis no 1º ano", "free domain for the 1st year", "domínio grátis no 1.º ano")}</small>
    </div></div>`;
  root.getElementById("qAgain").onclick = () => { qStep = 0; renderQuiz(); };
  root.getElementById("qSee").onclick = () => { setTab(prod, l); Object.assign(S, { prod, l, erp: withErp, el: l, brand: bi + 1 }); renderSim(); };
}

/* ===== TEMA / INIT ===== */
if (WHATSAPP) root.querySelectorAll("[data-wa]").forEach(a => { a.href = waLink(t("Olá! Quero um orçamento com a Prog Soluções.", "Hi! I'd like a quote for a project.")); a.target = "_blank"; a.rel = "noopener"; });
renderCards(); renderQuiz(); renderSim();

/* ===== ÂNCORAS INTERNAS =====
   O portfólio usa rotas por hash (#/planos), então um link "#quiz" trocaria de
   rota. Aqui ele só rola até a seção. */
// A página é remontada ao trocar de idioma; o ouvinte entra só uma vez.
if (root.__ancoras) return;
root.__ancoras = true;
root.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const href = a.getAttribute("href");
  if (href.startsWith("#/")) return;
  e.preventDefault();
  const el = root.getElementById(href.slice(1));
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
});
}
