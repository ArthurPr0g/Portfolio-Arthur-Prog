// Tabela em euros para clientes de Portugal, em português de Portugal (só neste
// portfólio; fora da regra de preços em reais do CLAUDE.md).
//
// Como os preços foram definidos (pesquisa de 19/10/2026): um pouco abaixo do piso
// do que freelancers cobram em Portugal. Sites: 1.000–5.000 € (5 a 8 páginas:
// 1.500–3.500 €; sites simples desde 350–490 €). Lojas online: 1.000–5.000 €
// (loja básica 2.500–4.000 € em média). Logótipo: média de 350 € (Zaask).
// Programador freelancer: ~36 €/h (20–60 €/h, Freelancermap). Gestão: horas × essa
// taxa, um pouco abaixo. Combos terminam em 90.

export const DADOS_PTPT = {
  LV: ["Essencial", "Profissional", "Premium"],
  LV_ERP: ["Básico", "Intermédio", "Avançado"],
  PROD: {
    site: { icon: "🌐", meters: ["Personalização", "Animações", "Recursos", "Suporte"], p: [
      { name: "Site Simples", price: 590, mo: 29, prazo: "5–10 dias úteis", m: [1, 0, 1, 2],
        ideal: "Para quem está a começar e precisa de aparecer no Google e no WhatsApp.",
        f: ["Até 5 páginas ou landing page única", "Modelo profissional com as cores e o logótipo da marca", "WhatsApp, formulário de contacto e mapa", "SEO básico e cadeado de segurança (SSL)", "2 rondas de alterações · 30 dias de suporte"] },
      { name: "Site Intermédio", price: 1290, mo: 29, prazo: "7–14 dias úteis", m: [3, 3, 2, 2], pop: true,
        ideal: "Empresas que querem uma marca forte e transmitir mais confiança.",
        f: ["Até 8 páginas", "Layout criado para a sua marca, não é um modelo", "Animações ao fazer scroll e efeitos ao passar o rato", "SEO completo", "2 rondas de alterações · 30 dias de suporte"] },
      { name: "Site Completo", price: 2490, mo: 29, prazo: "14–28 dias úteis", m: [5, 5, 4, 4],
        ideal: "Para quem se quer destacar e precisa de marcações online ou de uma área de cliente.",
        f: ["Até 15 páginas com design exclusivo e pré-visualização aprovada", "Animações avançadas e transições entre páginas", "Painel para editar todo o site + revisão dos textos", "Marcações online ou área reservada", "SEO avançado, site muito rápido e acessível", "1 integração com outro sistema", "3 rondas de alterações · 60 dias de suporte"] } ] },
    loja: { icon: "🛒", meters: ["Personalização", "Recursos de venda", "Gestão", "Suporte"], p: [
      { name: "Loja Simples", price: 990, mo: 49, prazo: "7–14 dias úteis", m: [1, 1, 1, 2],
        ideal: "Quem vende pelo Instagram ou WhatsApp e quer um catálogo com carrinho.",
        f: ["Até 50 produtos (sem variantes), 20 já registados", "Carrinho com encomenda por WhatsApp ou e-mail", "Portes por tabela fixa", "Painel de encomendas e produtos", "2 rondas de alterações · 30 dias de suporte"] },
      { name: "Loja Intermédia", price: 1990, mo: 49, prazo: "14–28 dias úteis", m: [3, 4, 3, 3], pop: true,
        ideal: "Quem quer receber online, com stock e área de cliente.",
        f: ["Até 300 produtos com variantes (tamanho, cor)", "MB WAY, Multibanco e cartão*, com códigos de desconto", "Portes grátis por valor ou região, levantamento em loja e cálculo automático", "Pesquisa, filtros, avaliações e animações", "Área de cliente e e-mails automáticos", "Controlo de stock e relatório de vendas", "2 rondas de alterações · 60 dias de suporte"] },
      { name: "Loja Completa", price: 3790, mo: 49, prazo: "14–28 dias úteis", m: [5, 5, 5, 5],
        ideal: "Lojas que querem uma experiência exclusiva e automatizações.",
        f: ["Produtos ilimitados com página completa de gestão", "Design exclusivo e banners animados à medida", "Favoritos, carrinho e pesquisa inteligente", "Subscrições ou compras recorrentes", "Seguimento da encomenda por etapas", "Painel de vendas, dashboard e automatizações", "3 rondas de alterações · 90 dias de suporte"] } ] },
    erp: { icon: "📊", meters: ["Utilizadores", "Módulos", "Automatização", "Suporte"], p: [
      { name: "Gestão Essencial", price: 1990, mo: 59, prazo: "7–14 dias úteis", m: [1, 2, 1, 2],
        ideal: "Quem controla tudo em folhas de cálculo ou num caderno e se quer organizar.",
        f: ["Até 5 utilizadores (administrador e operador)", "Clientes, fornecedores e produtos/serviços", "Orçamentos e encomendas em PDF", "Stock com alerta de stock baixo", "Contas a pagar e a receber, fluxo de caixa e painel", "Cópias de segurança diárias · 1h de formação · 30 dias de suporte"] },
      { name: "Gestão Profissional", price: 3990, mo: 89, prazo: "14–28 dias úteis", m: [3, 3, 4, 3], pop: true,
        ideal: "Quem tem equipa e quer cobranças automáticas e mais controlo.",
        f: ["Até 15 utilizadores com permissões", "Ligação ao seu programa de faturação certificado*", "Pagamentos online e cobranças recorrentes (MB WAY, Multibanco, cartão)*", "Compras, comissões e integração com a loja", "Relatórios em Excel/PDF e registo de alterações", "2 formações + manual · 60 dias de suporte"] },
      { name: "Gestão à Medida", price: 6990, mo: 129, prazo: "28–52 dias úteis", m: [5, 5, 5, 5], from: true,
        ideal: "Operações com regras próprias que os programas prontos não resolvem.",
        f: ["Utilizadores ilimitados com permissões detalhadas", "Stock por lote, validade ou unidade", "Mensalidades, contratos em PDF, trocas e demonstração de resultados", "Até 3 módulos à medida (ordens de serviço, agenda, frota…)", "Relatórios à sua medida e histórico completo", "Formação por equipa · 90 dias de suporte"] } ] },
  },
  BRAND: [
    { name: "Logótipo Essencial", price: 290, combo: 290, prazo: "5–7 dias úteis", m: [2, 2, 2, 2],
      ideal: "Para quem não tem logótipo e precisa de começar pelo essencial bem feito.",
      f: ["2 propostas de logótipo criadas de raiz", "2 rondas de alterações", "Versões horizontal, vertical e ícone", "Paleta de cores e tipos de letra da marca", "Ficheiros PNG, SVG e PDF (fundo claro e escuro)", "Favicon e fotografia de perfil para redes sociais"] },
    { name: "Identidade a partir do Logótipo", price: 390, combo: 390, prazo: "5–10 dias úteis", m: [3, 3, 3, 3],
      ideal: "Para quem já tem logótipo e precisa do resto da marca: cores, tipos de letra, padrões e redes.",
      f: ["O seu logótipo atual revisto e vetorizado, se necessário", "Paleta de cores e tipos de letra da marca", "Manual de marca em PDF (utilização correta, cores, tipos de letra)", "Cartão de visita e assinatura de e-mail", "Kit para redes sociais: perfil, capa e 5 modelos de publicação/story", "Tudo aplicado no seu site ou loja"] },
    { name: "Identidade Visual Completa", price: 590, combo: 590, prazo: "7–14 dias úteis", m: [5, 5, 5, 4], pop: true,
      ideal: "Logótipo + identidade juntos, mais barato do que em separado (680 €): marca completa no site, nas redes e em papel.",
      f: ["Tudo do Logótipo Essencial, com 3 propostas e 3 rondas", "Manual de marca em PDF (utilização correta, cores, tipos de letra)", "Cartão de visita e assinatura de e-mail", "Kit para redes sociais: perfil, capa e 5 modelos de publicação/story", "Elementos gráficos e padrões da marca", "Tudo aplicado no seu site ou loja"] },
  ],
  CMP: {
    site: [["Páginas", "até 5", "até 8", "até 15"], ["Design", "modelo adaptado", "criado para a marca", "exclusivo + pré-visualização"], ["Animações", "—", "ao fazer scroll e ao passar o rato", "avançadas + transições"], ["WhatsApp, formulário e mapa", "✓", "✓", "✓"], ["SEO (Google)", "básico", "completo", "avançado + alta velocidade"], ["Painel para editar o site", "—", "—", "✓"], ["Revisão dos textos", "—", "—", "✓"], ["Marcações ou área reservada", "—", "—", "✓ (escolher 1)"], ["Integração com outro sistema", "—", "—", "1"], ["Domínio grátis no 1.º ano", "✓", "✓", "✓"], ["Rondas de alterações", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "30 dias", "60 dias"], ["Prazo", "5–10 dias úteis", "7–14 dias úteis", "14–28 dias úteis"]],
    loja: [["Produtos", "até 50 (sem variantes)", "até 300 com variantes", "ilimitados"], ["Finalização da compra", "WhatsApp ou e-mail", "pagamento online", "pagamento online"], ["MB WAY, Multibanco, cartão e descontos", "—", "✓", "✓"], ["Subscrições / recorrência", "—", "—", "✓"], ["Portes", "tabela fixa", "+ grátis, levantamento, cálculo automático", "+ grátis, levantamento, cálculo automático"], ["Pesquisa, filtros e avaliações", "—", "✓", "✓ + pesquisa inteligente"], ["Design", "modelo de loja", "com animações", "exclusivo + banners animados"], ["Área de cliente", "—", "✓ + e-mails automáticos", "✓ + seguimento por etapas"], ["Gestão", "encomendas e produtos", "+ stock e relatórios", "+ dashboard e automatizações"], ["Domínio grátis no 1.º ano", "✓", "✓", "✓"], ["Rondas de alterações", "2", "2", "3"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "14–28 dias úteis"]],
    erp: [["Utilizadores", "até 5", "até 15", "ilimitados"], ["Clientes, fornecedores e produtos", "✓", "✓", "✓"], ["Orçamentos e encomendas", "✓ com PDF", "✓ + comissões", "✓ + contratos e trocas"], ["Stock", "entradas, saídas e alerta", "+ compras", "por lote, validade ou unidade"], ["Financeiro", "pagar, receber e caixa", "+ cobranças online automáticas", "+ mensalidades e resultados"], ["Ligação à faturação certificada", "—", "✓*", "✓*"], ["Integração com a loja online", "—", "✓", "✓"], ["Relatórios", "painel principal", "filtros + Excel/PDF", "à medida"], ["Módulos à medida", "—", "—", "até 3"], ["Formação", "1h", "2 sessões + manual", "por equipa"], ["Suporte após a entrega", "30 dias", "60 dias", "90 dias"], ["Prazo", "7–14 dias úteis", "14–28 dias úteis", "28–52 dias úteis"]],
  },
  COMBOS: [["Start", "site", 0], ["Business", "site", 1], ["Enterprise", "site", 2], ["Loja Start", "loja", 0], ["Loja Growth", "loja", 1], ["Loja Enterprise", "loja", 2]],
  ORCAMENTO: { caps: [1500, 4500, Infinity], rotulos: ["Até 1500 €", "Entre 1500 € e 4500 €", "Acima de 4500 €"] },
};
