// Lógica da página de planos. Roda dentro de um shadow root para que o CSS
// da página não vaze para o portfólio (e vice-versa).
export function initPlanos(root) {
/* ===== CONFIG ===== */
const WHATSAPP = "5562982133188";

/* ===== DADOS ===== */
const LV = ["Essencial", "Profissional", "Premium"];
const LV_ERP = ["Básico", "Intermediário", "Avançado"];
const COLORS = ["green", "blue", "purple"];
const PROD = {
  site: { icon: "🌐", lv: LV, meters: ["Personalização", "Animações", "Recursos", "Suporte"], p: [
    { name: "Site Simples", price: 1597, mo: 149, prazo: "5–10 dias úteis", m: [1, 0, 1, 2],
      ideal: "Quem está começando e precisa aparecer no Google e no WhatsApp.",
      f: ["Até 5 páginas ou landing page única", "Modelo profissional com as cores e a logo da marca", "WhatsApp, formulário por e-mail e mapa", "SEO básico e cadeado de segurança (SSL)", "2 rodadas de ajustes · 30 dias de suporte"] },
    { name: "Site Intermediário", price: 2997, mo: 149, prazo: "7–14 dias úteis", m: [3, 3, 2, 2], pop: true,
      ideal: "Empresas que querem uma marca forte e passar mais confiança.",
      f: ["Até 8 páginas", "Layout criado para a sua marca, não é modelo", "Animações ao rolar e efeitos ao passar o mouse", "SEO completo", "2 rodadas de ajustes · 30 dias de suporte"] },
    { name: "Site Completo", price: 5597, mo: 149, prazo: "14–28 dias úteis", m: [5, 5, 4, 4],
      ideal: "Quem quer se destacar e precisa de agendamento ou área do cliente.",
      f: ["Até 15 páginas com design exclusivo e prévia aprovada", "Animações avançadas e transições entre páginas", "Painel para editar todo o site + revisão dos textos", "Agendamento online ou área restrita", "SEO avançado, site muito rápido e acessível", "1 integração com outro sistema", "3 rodadas de ajustes · 60 dias de suporte"] } ] },
  loja: { icon: "🛒", lv: LV, meters: ["Personalização", "Recursos de venda", "Gestão", "Suporte"], p: [
    { name: "Loja Simples", price: 1997, mo: 199, prazo: "7–14 dias úteis", m: [1, 1, 1, 2],
      ideal: "Quem vende pelo Instagram ou WhatsApp e quer um catálogo com carrinho.",
      f: ["Até 50 produtos (sem variações), 20 já cadastrados", "Carrinho com finalização pelo WhatsApp", "Frete por tabela fixa ou Melhor Envio", "Painel de pedidos e produtos", "2 rodadas de ajustes · 30 dias de suporte"] },
    { name: "Loja Intermediária", price: 3597, mo: 199, prazo: "14–28 dias úteis", m: [3, 4, 3, 3], pop: true,
      ideal: "Quem quer receber online, com estoque e área do cliente.",
      f: ["Até 300 produtos com variações (tamanho, cor)", "Boleto, parcelamento e cupons de desconto", "Frete grátis por valor/região, retirada e cálculo na hora", "Busca, filtros, avaliações e animações", "Área do cliente e e-mails automáticos", "Controle de estoque e relatório de vendas", "2 rodadas de ajustes · 60 dias de suporte"] },
    { name: "Loja Completa", price: 6997, mo: 199, prazo: "14–28 dias úteis", m: [5, 5, 5, 5],
      ideal: "Lojas que querem uma experiência exclusiva e automações.",
      f: ["Produtos ilimitados com página completa de gestão", "Design exclusivo e banners animados sob medida", "Favoritos, carrinho e busca inteligente", "Assinatura ou recorrência", "Rastreio do pedido por etapas", "Painel de vendas, dashboard e automações", "3 rodadas de ajustes · 90 dias de suporte"] } ] },
  erp: { icon: "📊", lv: LV_ERP, meters: ["Usuários", "Módulos", "Automação", "Suporte"], p: [
    { name: "Gestão Essencial", price: 1997, mo: 199, prazo: "7–14 dias úteis", m: [1, 2, 1, 2],
      ideal: "Quem controla tudo em planilha ou caderno e quer organizar.",
      f: ["Até 5 usuários (administrador e operador)", "Clientes, fornecedores e produtos/serviços", "Orçamentos e pedidos em PDF", "Estoque com alerta de estoque baixo", "Contas a pagar/receber, fluxo de caixa e painel", "Backups diários · 1h de treinamento · 30 dias de suporte"] },
    { name: "Gestão Profissional", price: 4597, mo: 249, prazo: "14–28 dias úteis", m: [3, 3, 4, 3], pop: true,
      ideal: "Quem emite nota fiscal, tem equipe e quer cobrança automática.",
      f: ["Até 15 usuários com permissões", "Emissão de NF-e, NFC-e ou NFS-e*", "Pix e boleto automáticos, com parcelamento", "Compras, comissões e integração com a loja", "Relatórios em Excel/PDF e registro de alterações", "2 treinamentos + manual · 60 dias de suporte"] },
    { name: "Gestão Sob Medida", price: 9597, mo: 349, prazo: "28–52 dias úteis", m: [5, 5, 5, 5], from: true,
      ideal: "Operações com regras próprias que sistemas prontos não atendem.",
      f: ["Usuários ilimitados com permissões detalhadas", "Estoque por lote, validade ou unidade", "Mensalidades, contratos em PDF, trocas e DRE", "Até 3 módulos sob medida (OS, agenda, frota…)", "Relatórios do seu jeito e histórico completo", "Treinamento por equipe · 90 dias de suporte"] } ] },
};
const BRAND = [
  { name: "Logo Essencial", price: 497, combo: 497, prazo: "5–7 dias úteis", m: [2, 2, 2, 2],
    ideal: "Para quem não tem logo e precisa começar com o essencial bem feito.",
    f: ["2 propostas de logo criadas do zero", "2 rodadas de ajustes", "Versões horizontal, vertical e ícone", "Paleta de cores e fontes da marca", "Arquivos PNG, SVG e PDF (fundo claro e escuro)", "Favicon e foto de perfil para redes sociais"] },
  { name: "Identidade Visual Completa", price: 1297, combo: 1297, prazo: "7–14 dias úteis", m: [5, 5, 5, 4], pop: true,
    ideal: "Para quem quer uma marca completa, consistente no site, nas redes e no papel.",
    f: ["Tudo do Logo Essencial, com 3 propostas e 3 rodadas", "Manual da marca em PDF (uso correto, cores, fontes)", "Cartão de visita e assinatura de e-mail", "Kit redes sociais: perfil, capa e 5 modelos de post/story", "Elementos gráficos e padrões da marca", "Tudo aplicado no seu site ou loja"] },
];
const CMP = {
  site: [["Páginas", "até 5", "até 8", "até 15"], ["Design", "modelo adaptado", "criado para a marca", "exclusivo + prévia"], ["Animações", "—", "ao rolar e ao passar o mouse", "avançadas + transições"], ["WhatsApp, formulário e mapa", "✓", "✓", "✓"], ["SEO (Google)", "básico", "completo", "avançado + alta velocidade"], ["Painel para editar o site", "—", "—", "✓"], ["Revisão dos textos", "—", "—", "✓"], ["Agendamento ou área restrita", "—", "—", "✓ (escolher 1)"], ["Integração com outro sistema", "—", "—", "1"], ["Domínio grátis no 1º ano", "✓", "✓", "✓"], ["Rodadas de ajustes", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "30 dias", "60 dias"], ["Prazo", "5–10 dias úteis", "7–14 dias úteis", "14–28 dias úteis"]],
  loja: [["Produtos", "até 50 (sem variações)", "até 300 com variações", "ilimitados"], ["Finalização da compra", "WhatsApp", "pagamento online", "pagamento online"], ["Boleto, parcelamento e cupons", "—", "✓", "✓"], ["Assinatura / recorrência", "—", "—", "✓"], ["Frete", "tabela ou Melhor Envio", "+ grátis, retirada, cálculo na hora", "+ grátis, retirada, cálculo na hora"], ["Busca, filtros e avaliações", "—", "✓", "✓ + busca inteligente"], ["Design", "padrão de loja", "com animações", "exclusivo + banners animados"], ["Área do cliente", "—", "✓ + e-mails automáticos", "✓ + rastreio por etapas"], ["Gestão", "pedidos e produtos", "+ estoque e relatórios", "+ dashboard e automações"], ["Domínio grátis no 1º ano", "✓", "✓", "✓"], ["Rodadas de ajustes", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "14–28 dias úteis"]],
  erp: [["Usuários", "até 5", "até 15", "ilimitados"], ["Clientes, fornecedores e produtos", "✓", "✓", "✓"], ["Orçamentos e pedidos", "✓ com PDF", "✓ + comissões", "✓ + contratos e trocas"], ["Estoque", "entradas, saídas e alerta", "+ compras", "por lote, validade ou unidade"], ["Financeiro", "pagar, receber e caixa", "+ Pix/boleto automáticos", "+ mensalidades e DRE"], ["Nota fiscal (NF-e/NFC-e/NFS-e)", "—", "✓*", "✓*"], ["Integração com a loja virtual", "—", "✓", "✓"], ["Relatórios", "painel principal", "filtros + Excel/PDF", "sob medida"], ["Módulos sob medida", "—", "—", "até 3"], ["Treinamento", "1h", "2 sessões + manual", "por equipe"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "28–52 dias úteis"]],
};

/* ===== CÁLCULOS =====
   Cartão via Asaas: 2,99% (1x) · 3,49% (2–6x) · 3,99% (7–12x) + R$ 0,49; antecipação 1,25% a.m.
   Até 2x: sem juros. De 3x a 12x: taxa repassada ao cliente. */
const brl = v => "R$ " + Math.round(v).toLocaleString("pt-BR");
const mdr = n => n === 1 ? .0299 : n <= 6 ? .0349 : .0399;
const parcela = (P, n) => n <= 2 ? P / n : Math.ceil((P + .49) / (1 - mdr(n) - .0125 * (n + 1) / 2) / n);
const x97 = v => Math.floor((v - 97) / 100) * 100 + 97;
const x9 = v => Math.floor((v - 9) / 10) * 10 + 9;
function combo(prod, l, el) {
  const a = PROD[prod].p[l], b = PROD.erp.p[el];
  const d = l === el ? [.10, .12, .15][l] : .10;
  return { sum: a.price + b.price, price: x97((a.price + b.price) * (1 - d)), moSum: a.mo + b.mo, mo: x9((a.mo + b.mo) * .85) };
}
const waLink = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const ctaAttrs = msg => WHATSAPP ? `href="${waLink(msg)}" target="_blank" rel="noopener"` : `href="#contato"`;

/* ===== CARDS + COMPARATIVO ===== */
let curTab = "site";
function renderCards(highlight) {
  const P = PROD[curTab];
  root.getElementById("cards").innerHTML = P.p.map((x, i) => `
    <article class="card${x.pop ? " pop" : ""}${highlight === i ? " hl" : ""}" style="animation-delay:${i * 80}ms">
      ${x.pop ? '<span class="badge">⭐ Mais escolhido</span>' : ""}
      <span class="chip c-${COLORS[i]}">${P.lv[i]}</span>
      <h3>${x.name}</h3>
      <p class="ideal">${x.ideal}</p>
      <div class="price">${x.from ? "<small>a partir de </small>" : ""}${brl(x.price)}</div>
      <div class="pay">2x sem juros de ${brl(x.price / 2)} · ou 12x de ${brl(parcela(x.price, 12))}</div>
      <div class="facts"><span class="fact">⏱️ ${x.prazo}</span><span class="fact">🔁 depois ${brl(x.mo)}/mês</span><span class="fact">🌐 domínio grátis</span></div>
      <div class="meters">${P.meters.map((m, k) => `<div class="meter">${m}<span class="dots">${[1, 2, 3, 4, 5].map(d => `<i class="${d <= x.m[k] ? "on" : ""}"></i>`).join("")}</span></div>`).join("")}</div>
      <ul>${x.f.map(f => `<li>${f}</li>`).join("")}</ul>
      <a class="btn ${x.pop ? "btn-primary" : "btn-ghost"} cta" ${ctaAttrs(`Olá! Tenho interesse no pacote ${x.name} (${brl(x.price)}).`)}>Quero este</a>
    </article>`).join("");
  root.getElementById("cmpTable").innerHTML =
    `<thead><tr><th></th>${P.p.map((x, i) => `<th><span class="chip c-${COLORS[i]}">${P.lv[i]}</span><div style="margin-top:6px">${x.from ? "a partir de " : ""}${brl(x.price)}</div></th>`).join("")}</tr></thead><tbody>` +
    CMP[curTab].map(r => `<tr>${r.map((c, i) => i === 0 ? `<td>${c}</td>` : `<td class="${c.startsWith("✓") ? "yes" : c === "—" ? "no" : ""}">${c}</td>`).join("")}</tr>`).join("") +
    `<tr><td>Mensalidade</td>${P.p.map(x => `<td>${brl(x.mo)}/mês</td>`).join("")}</tr></tbody>`;
}
function setTab(t, hl) {
  curTab = t;
  root.querySelectorAll("#tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === t));
  renderCards(hl);
}
root.querySelectorAll("#tabs button").forEach(b => b.addEventListener("click", () => setTab(b.dataset.tab)));
root.getElementById("cmpBtn").addEventListener("click", e => {
  const w = root.getElementById("cmpWrap"); w.hidden = !w.hidden;
  e.currentTarget.textContent = w.hidden ? "📋 Comparar os 3 níveis lado a lado" : "✕ Fechar comparativo";
});

/* ===== COMBOS ===== */
const COMBOS = [["Start", "site", 0], ["Business", "site", 1], ["Enterprise", "site", 2], ["Loja Start", "loja", 0], ["Loja Growth", "loja", 1], ["Loja Enterprise", "loja", 2]];
root.getElementById("comboGrid").innerHTML = COMBOS.map(([n, p, l]) => {
  const c = combo(p, l, l), from = l === 2 ? "<small style='font-size:.8rem;font-weight:600;color:var(--muted)'>a partir de </small>" : "";
  return `<div class="combo">
    <span class="chip c-${COLORS[l]}">${PROD[p].icon} + 📊</span>
    <span class="save">economize ${brl(c.sum - c.price)}</span>
    <h4>${n}</h4>
    <div class="parts">${PROD[p].p[l].name} + ${PROD.erp.p[l].name}</div>
    <div class="old">${brl(c.sum)} separado</div>
    <div class="now">${from}${brl(c.price)}</div>
    <div class="mo">ou 12x de ${brl(parcela(c.price, 12))} · depois ${brl(c.mo)}/mês <s>${brl(c.moSum)}</s></div>
  </div>`;
}).join("");

/* ===== MARCA ===== */
root.getElementById("brandGrid").innerHTML = BRAND.map((x, i) => `
  <article class="card${x.pop ? " pop" : ""}">
    ${x.pop ? '<span class="badge">🎨 Marca completa</span>' : ""}
    <span class="chip c-${i ? "purple" : "green"}">${i ? "Completa" : "Essencial"}</span>
    <h3>${x.name}</h3>
    <p class="ideal">${x.ideal}</p>
    <div class="price">${brl(x.price)}</div>
    <div class="pay">${x.combo < x.price ? `ou <b>${brl(x.combo)}</b> fechando junto com site ou loja · ` : ""}2x sem juros de ${brl(x.price / 2)}</div>
    <div class="facts"><span class="fact">⏱️ ${x.prazo}</span><span class="fact">🎨 sem mensalidade</span></div>
    <ul>${x.f.map(f => `<li>${f}</li>`).join("")}</ul>
    <a class="btn ${x.pop ? "btn-primary" : "btn-ghost"} cta" ${ctaAttrs(`Olá! Preciso criar minha marca do zero: ${x.name}.`)}>Quero minha marca</a>
  </article>`).join("");

/* ===== SIMULADOR ===== */
const S = { prod: "site", l: 1, erp: false, el: 1, brand: 0, n: 12 };
function seg(id, items, val, set) {
  const el = root.getElementById(id);
  el.innerHTML = items.map((t, i) => `<button class="${i === val ? "on" : ""}" data-i="${i}">${t}</button>`).join("");
  el.querySelectorAll("button").forEach(b => b.onclick = () => { set(+b.dataset.i); renderSim(); });
}
function renderSim() {
  const prods = ["site", "loja", "erp"];
  seg("sProd", ["🌐 Site", "🛒 Loja virtual", "📊 Só gestão"], prods.indexOf(S.prod), i => { S.prod = prods[i]; if (S.prod === "erp") S.erp = false; });
  seg("sLvl", PROD[S.prod].lv, S.l, i => S.l = i);
  seg("sErpLvl", LV_ERP, S.el, i => S.el = i);
  seg("sBrand", ["✅ Já tenho", "✏️ Logo Essencial", "🎨 Identidade Completa"], S.brand, i => S.brand = i);
  root.getElementById("sErpToggle").hidden = S.prod === "erp";
  root.getElementById("sErpOn").checked = S.erp;
  root.getElementById("sErpField").hidden = !S.erp || S.prod === "erp";
  const a = PROD[S.prod].p[S.l], lines = [[a.name, a.price]];
  let total = a.price, mo = a.mo, disc = 0, moOld = "";
  if (S.erp && S.prod !== "erp") {
    const b = PROD.erp.p[S.el], c = combo(S.prod, S.l, S.el);
    lines.push([b.name, b.price]); disc = c.sum - c.price; total = c.price; mo = c.mo; moOld = ` <s style="color:var(--muted)">${brl(c.moSum)}</s>`;
  }
  if (S.brand) { const b = BRAND[S.brand - 1]; lines.push([b.combo < b.price ? `${b.name} <s style="color:var(--muted)">${brl(b.price)}</s>` : b.name, b.combo]); total += b.combo; }
  const from = (S.prod === "erp" && S.l === 2) || (S.erp && S.prod !== "erp" && S.el === 2);
  const msg = `Olá! Simulei: ${lines.map(l => l[0].replace(/ <s.*<\/s>/, "")).join(" + ")} por ${brl(total)}. Quero uma proposta!`;
  const inst = n => `<span>${n}x de ${brl(parcela(total, n))}</span><span style="color:var(--muted);font-weight:600">total ${brl(parcela(total, n) * n)}</span>`;
  root.getElementById("sOut").innerHTML = `
    <div style="font-weight:800;margin-bottom:8px">Resumo</div>
    ${lines.map(l => `<div class="sum-line"><span>${l[0]}</span><span>${brl(l[1])}</span></div>`).join("")}
    ${disc ? `<div class="sum-line disc"><span>🎉 Desconto do combo</span><span>− ${brl(disc)}</span></div>` : ""}
    <div class="sum-total"><span>Total${from ? " (a partir de)" : ""}</span><b>${brl(total)}</b></div>
    <div style="color:var(--muted);font-size:.9rem">Depois, mensalidade de <b style="color:var(--text)">${brl(mo)}/mês</b>${moOld} · domínio grátis no 1º ano</div>
    <div class="payopts">
      <div class="po"><small>⚡ Pix ou boleto</small><b>${brl(total / 2)}</b> no fechamento<br><b>${brl(total / 2)}</b> na entrega</div>
      <div class="po feat"><small>💳 Cartão 2x sem juros</small><b>2x de ${brl(total / 2)}</b></div>
    </div>
    <div class="po" style="margin-top:10px">
      <small>🗓️ Cartão parcelado de 3x a 12x (com taxa da operadora)</small>
      <input type="range" min="3" max="12" value="${S.n}" id="sN" aria-label="Número de parcelas">
      <div class="inst-out" id="sInst">${inst(S.n)}</div>
    </div>
    <a class="btn btn-primary" style="width:100%;justify-content:center;margin-top:18px" ${ctaAttrs(msg)}>💬 Quero essa proposta</a>`;
  root.getElementById("sN").oninput = e => { S.n = +e.target.value; root.getElementById("sInst").innerHTML = inst(S.n); };
}
root.getElementById("sErpOn").onchange = e => { S.erp = e.target.checked; renderSim(); };

/* ===== QUIZ ===== */
const Q = [
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
  { t: "Quanto pretende investir no projeto?", k: "budget", o: [
    ["💵", "Até R$ 2.500", "", 0], ["💰", "Entre R$ 2.500 e R$ 7.000", "", 1], ["💎", "Acima de R$ 7.000", "", 2] ] },
];
const A = {}; let qStep = 0;
function renderQuiz() {
  const box = root.getElementById("quizBox");
  const bar = `<div class="steps">${Q.map((_, i) => i).map(i => `<span class="${i <= qStep ? "on" : ""}"></span>`).join("")}</div>`;
  if (qStep < Q.length) {
    const q = Q[qStep];
    box.innerHTML = bar + `<div class="q-title">${qStep + 1}. ${q.t}</div><div class="opts">${q.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="e">${o[0]}</span><b>${o[1]}</b>${o[2] ? `<small>${o[2]}</small>` : ""}</button>`).join("")}</div>` + (qStep ? `<button class="q-back" id="qBack">← voltar</button>` : "");
    box.querySelectorAll(".opt").forEach(b => b.onclick = () => { A[q.k] = q.o[+b.dataset.i][3]; qStep++; renderQuiz(); });
    if (qStep) root.getElementById("qBack").onclick = () => { qStep--; renderQuiz(); };
    return;
  }
  const prod = A.need.split("+")[0], withErp = A.need.includes("+erp");
  // Sem marca nenhuma, o site precisa da identidade completa (ela já inclui o logo).
  const bi = A.brand === 2 ? 1 : -1, bp = bi >= 0 ? BRAND[bi] : null;
  // O orçamento informado vale para o projeto inteiro, marca incluída.
  const priceAt = l => (withErp ? combo(prod, l, l).price : PROD[prod].p[l].price) + (bp ? bp.combo : 0);
  const cap = [2500, 7000, Infinity][A.budget];
  let l = A.stage; while (l > 0 && priceAt(l) > cap) l--;
  const ideal = A.stage, lvName = PROD[prod].lv[l];
  let title, price, mo, parts;
  if (withErp) { const c = combo(prod, l, l); title = "Combo " + COMBOS.find(k => k[1] === prod && k[2] === l)[0]; price = c.price; mo = c.mo; parts = `${PROD[prod].p[l].name} + ${PROD.erp.p[l].name}.`; }
  else { const x = PROD[prod].p[l]; title = x.name; price = x.price; mo = x.mo; parts = ""; }
  const why = { site: "Você precisa de presença profissional para ser encontrado e transmitir confiança.", loja: "Você quer vender online com carrinho, frete e pedidos organizados.", erp: "Você precisa sair da planilha e ter estoque, vendas e financeiro num lugar só." }[prod]
    + (withErp ? " Como também quer organizar a gestão, o combo sai mais barato e fica tudo integrado, com o mesmo login." : "");
  const alt = l < ideal ? `<div class="alt">💡 Pelo momento do seu negócio, o nível <b>${PROD[prod].lv[ideal]}</b> seria o ideal (${brl(priceAt(ideal))}). Dá para começar no ${lvName} e fazer upgrade depois, pagando só a diferença.</div>` : "";
  const fromTxt = l === 2 && (prod === "erp" || withErp);
  const total = price + (bp ? bp.combo : 0);
  const brandTip = bp ? `<div class="alt">🎨 Como você ainda não tem marca, incluímos a <b>${bp.name}</b> (${brl(bp.combo)}): logo, cores, fontes, manual da marca e kit para redes sociais. Criamos a marca primeiro e depois o ${prod === "erp" ? "sistema" : "site"}, já com a sua cara.</div>`
    : A.brand === 1 ? `<div class="alt">✏️ Já tem logo? Ótimo! Se quiser padronizar cores, fontes e redes sociais, a <b>Identidade Visual Completa</b> sai por ${brl(BRAND[1].combo)}.</div>` : "";
  box.innerHTML = bar + `<div class="result">
    <div>
      <span class="chip c-${COLORS[l]}">Recomendado para você · ${lvName}</span>
      <h3>${title}</h3>
      <p class="why">${parts ? `<b>${parts}</b> ` : ""}${why}</p>${alt}${brandTip}
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px">
        <a class="btn btn-primary" href="#simulador" id="qSee">Simular pagamento</a>
        <button class="btn btn-ghost" id="qAgain">↺ Refazer</button>
      </div>
    </div>
    <div class="pricebox">
      <small>${fromTxt ? "a partir de" : "investimento"}</small>
      <div class="big">${brl(total)}</div>
      ${bp ? `<small>${title} ${brl(price)} + ${bp.name} ${brl(bp.combo)}</small>` : ""}
      <small>2x sem juros de ${brl(total / 2)} · ou 12x de ${brl(parcela(total, 12))}</small>
      <div style="margin-top:12px;font-weight:700">depois ${brl(mo)}/mês</div>
      <small>🌐 domínio grátis no 1º ano</small>
    </div></div>`;
  root.getElementById("qAgain").onclick = () => { qStep = 0; renderQuiz(); };
  root.getElementById("qSee").onclick = () => { setTab(prod, l); Object.assign(S, { prod, l, erp: withErp, el: l, brand: bi + 1 }); renderSim(); };
}

/* ===== TEMA / INIT ===== */
if (WHATSAPP) root.querySelectorAll("[data-wa]").forEach(a => { a.href = waLink("Olá! Quero um orçamento com a Prog Soluções."); a.target = "_blank"; a.rel = "noopener"; });
renderCards(); renderQuiz(); renderSim();

/* ===== ÂNCORAS INTERNAS =====
   O portfólio usa rotas por hash (#/planos), então um link "#quiz" trocaria de
   rota. Aqui ele só rola até a seção. */
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
