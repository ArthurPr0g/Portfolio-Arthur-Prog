const P = "/assets/";

const IMG = {
  progCover: P + "prog-site-cover.webp",
  progSite: [P + "prog-site-1.webp", P + "prog-site-2.webp", P + "prog-site-3.webp", P + "prog-site-4.webp", P + "prog-site-5.webp"],
  progDash: P + "prog-dash.webp",
  progFin: P + "prog-financeiro.webp",
  orbiVisao: P + "orbi-visao.webp",
  orbiTreinos: P + "orbi-treinos.webp",
  consorcio: P + "consorcio.webp",
};

const tp = (n) => P + "tecnopallet-" + n + ".webp";
const vt = (n) => P + "vitaliti-" + n + ".webp";
const lm = (n) => P + "lumen-" + n + ".webp";
const sl = (n) => P + "saloes-" + n + ".webp";

export const WHATSAPP_NUMBER = "5562982133188";
export const INSTAGRAM_URL = "https://instagram.com/prog.arthur";
export const LINKEDIN_URL = "https://www.linkedin.com/in/arthur-araujo-6a6292179/";

export const PROJECTS = [
  {
    slug: "prog-imports",
    title: "Prog Imports",
    meta: "Sistema web + e-commerce · 2025",
    desc: "Plataforma completa de importação: loja, gestão, estoque e financeiro em um só lugar.",
    linkUrl: "https://www.prog-imports.com",
    linkLabel: "prog-imports.com",
    cover: IMG.progCover,
    problema: "A operação dependia de planilhas soltas, conversas informais e controles manuais. Não havia visão única de estoque, vendas, orçamentos e financeiro — cada resposta exigia consolidar dados à mão.",
    solucao: "Um produto em duas frentes: o e-commerce voltado ao cliente final (catálogo, coleções, serviços técnicos, carrinho) e o sistema interno de gestão com dashboard, clientes, produtos, estoque, orçamentos, vendas, trocas e financeiro completo.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "Recharts"],
    resultado: "Toda a operação passou a viver em um só sistema: indicadores gerais, financeiros e comerciais em tempo real, fluxo de caixa mensal visível e catálogo online integrado ao estoque.",
    processo: [
      "Discovery com a operação para mapear o fluxo real de compra, importação e venda",
      "Modelagem de dados de produtos, estoque, vendas e financeiro",
      "Design da loja e do painel interno com um mesmo sistema visual",
      "Desenvolvimento incremental com entregas semanais validadas",
      "Migração dos controles em planilha e treinamento de uso",
    ],
    gallery: [
      { src: IMG.progSite[0], caption: "Loja — hero e coleções" },
      { src: IMG.progSite[1], caption: "Loja — catálogo por categoria" },
      { src: IMG.progSite[2], caption: "Loja — promoções e mais vendidos" },
      { src: IMG.progSite[3], caption: "Loja — diferenciais e serviços técnicos" },
      { src: IMG.progSite[4], caption: "Loja — depoimentos, newsletter e rodapé" },
      { src: IMG.progDash, caption: "Painel — dashboard de indicadores" },
      { src: IMG.progFin, caption: "Painel — financeiro e fluxo de caixa" },
    ],
  },
  {
    slug: "tecnopallet",
    title: "TecnoPallet Logística",
    meta: "Redesign de site institucional · 2026",
    desc: "Do site antigo e datado a uma presença digital à altura de duas décadas de operação.",
    cover: tp("hero"),
    beforeAfter: [
      { label: "Quem somos", before: P + "tecno-ba1-antes.webp", after: P + "tecno-ba1-depois.webp" },
      { label: "Serviços", before: P + "tecno-ba2-antes.webp", after: P + "tecno-ba2-depois.webp" },
      { label: "Instalações", before: P + "tecno-ba3-antes.webp", after: P + "tecno-ba3-depois.webp" },
    ],
    problema: "O site antigo tinha layout de 2020, blocos de texto corridos, fotos pequenas e nenhuma chamada clara para orçamento. Não transmitia o tamanho real da operação: 7.500 m² cobertos, portaria 24 h e frota rastreada.",
    solucao: "Site novo com hero de impacto, linha do tempo da empresa desde 2003, soluções logísticas navegáveis, paletização em etapas, galeria de operações com filtros, instalações, mapa de cobertura no estado do Rio e formulário que cai direto no WhatsApp.",
    techs: ["React", "Next.js", "Tailwind", "Framer Motion", "SEO"],
    resultado: "Uma marca que finalmente parece do tamanho da operação, com prova social (4,7★ no Google) logo no topo e o pedido de orçamento a um clique em qualquer seção.",
    processo: [
      "Diagnóstico do site antigo e das dúvidas que mais chegavam por telefone",
      "Nova arquitetura de seções e textos mais diretos",
      "Identidade visual aplicada com fotos reais da operação",
      "Implementação responsiva, rápida e otimizada para o Google",
    ],
    gallery: [
      { src: tp("hero"), caption: "Hero com indicadores de confiança" },
      { src: tp("historia"), caption: "Linha do tempo: de 2003 até hoje" },
      { src: tp("solucoes"), caption: "Soluções logísticas de ponta a ponta" },
      { src: tp("paletizacao"), caption: "Paletização em etapas" },
      { src: tp("quem-somos"), caption: "Quem somos, missão, visão e valores" },
      { src: tp("galeria"), caption: "Galeria de operações com filtros" },
      { src: tp("instalacoes"), caption: "Infraestrutura e segurança" },
      { src: tp("distribuicao"), caption: "Mapa de distribuição no estado do Rio" },
      { src: tp("contato"), caption: "Contato direto pelo WhatsApp" },
    ],
  },
  {
    slug: "orbi",
    title: "Orbi",
    meta: "Produto com IA · 2025",
    desc: "Assistente pessoal com IA reunindo agenda, tarefas, finanças e treinos.",
    linkUrl: "https://jarvis-webapp-three.vercel.app/login",
    linkLabel: "Acessar Orbi",
    cover: IMG.orbiVisao,
    problema: "Ferramentas de produtividade tratam agenda, dinheiro, tarefas e saúde como aplicativos separados. O usuário perde tempo trocando de contexto e ninguém enxerga o dia como um todo.",
    solucao: "O Orbi centraliza visão geral do dia, agenda, tarefas, financeiro e treino em uma interface só, com um assistente (Jarvis) que resume o dia, aponta pendências e conversa sobre o que fazer em seguida.",
    techs: ["React", "TypeScript", "Node.js", "OpenAI", "Supabase", "Tailwind"],
    resultado: "Rotina inteira em uma tela: clima, resumo do dia por IA, tarefas pendentes, gastos, compromissos, pagamentos a receber e acompanhamento de treino com evolução de carga e peso.",
    processo: [
      "Definição das personas e dos jobs-to-be-done da rotina diária",
      "Arquitetura do agente e das ferramentas que ele pode acionar",
      "Design dos módulos (visão geral, agenda, tarefas, financeiro, treino)",
      "Desenvolvimento iterativo com uso real no dia a dia",
      "Ajuste fino de prompts, resumos e limites do assistente",
    ],
    gallery: [
      { src: IMG.orbiVisao, caption: "Visão geral com resumo do Jarvis" },
      { src: IMG.orbiTreinos, caption: "Módulo de treino, cronômetro e evolução" },
    ],
  },
  {
    slug: "vitaliti",
    title: "VitaliTI Soluções",
    meta: "Site institucional + painel de gestão · 2025",
    desc: "Site de credibilidade e conversão, com painel próprio para clientes e orçamentos.",
    linkUrl: "https://www.vitalitisolucoes.com.br",
    linkLabel: "vitalitisolucoes.com.br",
    cover: vt("site-01-topo"),
    problema: "A VitaliTI tinha entregas técnicas fortes — CFTV, cabeamento, automação, controle de acesso — mas nenhuma presença digital que sustentasse essa autoridade e gerasse orçamentos.",
    solucao: "Site institucional com narrativa clara de serviços, números de credibilidade, portfólio de clientes reais, depoimentos, FAQ e chamadas diretas para orçamento pelo WhatsApp. Por trás, um painel de gestão com dashboard comercial, cadastro de clientes, ficha completa e histórico de orçamentos, em tema claro e escuro e responsivo no celular.",
    techs: ["React", "Next.js", "Tailwind", "Framer Motion", "SEO"],
    resultado: "Percepção de marca mais sólida, um caminho curto do visitante até o pedido de orçamento e a operação comercial (clientes, propostas e valores aprovados) organizada num só lugar.",
    processo: [
      "Workshop de posicionamento e definição das mensagens-chave",
      "Arquitetura da informação e wireframes das seções",
      "Design system leve com componentes reutilizáveis",
      "Implementação com foco em performance, SEO e conversão",
    ],
    gallery: [
      { src: vt("site-01-topo"), caption: "Site — hero e indicadores de credibilidade" },
      { src: vt("site-03-servicos"), caption: "Site — serviços" },
      { src: vt("site-04-clientes"), caption: "Site — clientes que são referência" },
      { src: vt("site-05-sobre"), caption: "Site — sobre a empresa" },
      { src: vt("site-06-faq"), caption: "Site — perguntas frequentes" },
      { src: vt("site-07-contato"), caption: "Site — contato e rodapé" },
      { src: vt("painel-01-dashboard"), caption: "Painel — dashboard comercial" },
      { src: vt("painel-07-dashboard-escuro"), caption: "Painel — tema escuro" },
      { src: vt("painel-03-clientes"), caption: "Painel — clientes" },
      { src: vt("painel-04-ficha-cliente"), caption: "Painel — ficha do cliente" },
      { src: vt("painel-05-orcamentos"), caption: "Painel — histórico de orçamentos" },
      { src: vt("celular"), caption: "Site e painel no celular" },
    ],
  },
  {
    slug: "lumen",
    title: "Lumen",
    meta: "Produto com IA · 2026",
    desc: "Plataforma de leitura que transforma livros em conhecimento que fica.",
    cover: lm("d02-inicio"),
    problema: "A gente lê muito e lembra pouco: as anotações se perdem, ninguém revisa o que leu e o progresso de leitura não fica visível.",
    solucao: "Biblioteca, leitor e anotações conectados a um ciclo de aprendizado: quizzes por capítulo, flashcards com repetição espaçada, revisões, mapa de conhecimento e a Lumen AI, que gera perguntas, resume capítulos e explica conceitos. Metas, insights e conquistas mantêm a constância.",
    techs: ["React", "TypeScript", "IA generativa", "Repetição espaçada", "Design responsivo"],
    resultado: "Uma experiência completa em computador, tablet e celular, em que cada livro lido vira revisão, métrica e conhecimento conectado.",
    processo: [
      "Mapeamento da jornada: ler, anotar, revisar e lembrar",
      "Design do ciclo de aprendizado com repetição espaçada",
      "Interface escura focada em leitura, nos três tamanhos de tela",
      "Integração da IA para quizzes, resumos e flashcards automáticos",
    ],
    gallery: [
      { src: lm("d02-inicio"), caption: "Início com meta do dia e livro atual" },
      { src: lm("d03-biblioteca"), caption: "Biblioteca" },
      { src: lm("d04-pagina-do-livro"), caption: "Página do livro e capítulos" },
      { src: lm("d05-leitor"), caption: "Leitor focado" },
      { src: lm("d06-quizzes"), caption: "Quizzes por capítulo" },
      { src: lm("d08-flashcards"), caption: "Flashcards" },
      { src: lm("d10-mapa-de-conhecimento"), caption: "Mapa de conhecimento" },
      { src: lm("d11-insights"), caption: "Insights de leitura" },
      { src: lm("d12-metas"), caption: "Metas e consistência" },
      { src: lm("d13-conquistas"), caption: "Conquistas" },
      { src: lm("d15-lumen-ai"), caption: "Lumen AI" },
      { src: lm("t01-inicio"), caption: "Versão tablet" },
      { src: lm("celular"), caption: "Versão celular" },
    ],
  },
  {
    slug: "controle-saloes",
    title: "Controle de Serviços para Salões",
    meta: "Sistema web · 2026",
    desc: "Lançamento de serviços por profissional e fechamento do dia em poucos toques.",
    restrito: true,
    cover: sl("01-lancamento"),
    problema: "Salões anotavam os serviços em caderno ou planilha. Fechar o dia e calcular o que cada profissional fez levava tempo e gerava erro.",
    solucao: "Lançamento em três toques (profissional, serviço e valor), resumo por profissional e categoria por dia, mês ou total, e uma tela de ajustes em que cada salão define nome, cor, logo, equipe e tabela de serviços com preços.",
    techs: ["React", "TypeScript", "Design responsivo"],
    resultado: "Fechamento do dia instantâneo e um sistema que vira a marca de cada salão: o mesmo produto atende Depyl Action, Studio Bella e outros, cada um com sua identidade.",
    processo: [
      "Observação da rotina de lançamento no balcão",
      "Fluxo de três toques pensado para o celular",
      "Resumos por profissional e categoria",
      "Personalização visual por salão (white label)",
    ],
    gallery: [
      { src: sl("01-lancamento"), caption: "Lançamento de serviços" },
      { src: sl("02-resumo"), caption: "Resumo por profissional e categoria" },
      { src: sl("03-ajustes"), caption: "Ajustes: identidade, equipe e tabela de serviços" },
      { src: sl("04-tema-marinho"), caption: "Mesmo sistema com a marca de outro salão" },
    ],
  },
  {
    slug: "sistema-financeiro",
    title: "Sistema Financeiro",
    meta: "Módulo de gestão · 2024",
    desc: "Receitas, despesas, previsões e fluxo de caixa com leitura imediata.",
    restrito: true,
    cover: IMG.progFin,
    problema: "O controle financeiro vivia em planilhas: sem previsto versus realizado, sem lucro por período e sem qualquer visão de fluxo de caixa ao longo do ano.",
    solucao: "Módulo com receitas e despesas lançadas por período, status de pago e previsto, filtros por data, ano e mês, e gráfico de fluxo de caixa mensal consolidado.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL", "Recharts"],
    resultado: "Receita, despesa, lucro líquido e valores previstos do período à vista, com fechamento que deixou de levar dias para levar minutos.",
    processo: [
      "Levantamento dos indicadores que a gestão realmente usa",
      "Modelagem de lançamentos, parcelas e status",
      "Design das telas de listagem, filtros e gráficos",
      "Validação dos números contra os controles antigos",
    ],
    gallery: [
      { src: IMG.progFin, caption: "Financeiro — período, indicadores e fluxo de caixa" },
      { src: IMG.progDash, caption: "Dashboard — indicadores gerais e comerciais" },
    ],
  },
  {
    slug: "sistema-consorcio",
    title: "Sistema de Consórcio",
    meta: "Sistema web · 2024",
    desc: "Gestão de grupos, cotas, contemplações e inadimplência.",
    cover: IMG.consorcio,
    problema: "Administrar consórcios envolve grupos, cotas, parcelas, contemplações e adimplência — regras que nenhuma planilha sustenta sem erro.",
    solucao: "Sistema com dashboard consolidado de todos os consórcios: visão geral, financeiro por mês, pagamentos, próximos vencimentos, participantes a receber e um farol por participante.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL", "Chart.js"],
    resultado: "Operação padronizada e auditável: cada parcela, contemplação e atraso com registro e visão imediata de quem está em dia.",
    processo: [
      "Modelagem das regras de grupos, cotas e parcelas",
      "Design do dashboard e do farol de participantes",
      "Desenvolvimento com validações fortes por etapa",
      "Conferência do histórico financeiro migrado",
    ],
    gallery: [{ src: IMG.consorcio, caption: "Dashboard consolidado com farol de participantes" }],
  },
  {
    slug: "sites-institucionais",
    title: "Sites Institucionais",
    meta: "Coleção · 2023 — 2025",
    desc: "Identidades diferentes, mesmo padrão de qualidade e performance.",
    cover: tp("hero"),
    problema: "Cada empresa precisa de uma identidade própria, mas com o mesmo rigor de performance, SEO, acessibilidade e conversão.",
    solucao: "Sites institucionais sob medida, cada um com seu sistema visual — como a TecnoPallet (logística) e a VitaliTI (tecnologia) — sempre com serviços claros, prova social, localização e contato direto.",
    techs: ["React", "Next.js", "Tailwind", "Framer Motion", "SEO"],
    resultado: "Sites rápidos, bem ranqueados e que comunicam a proposta de valor de cada cliente sem ruído.",
    processo: [
      "Discovery de marca, público e posicionamento",
      "Design visual alinhado ao copywriting",
      "Implementação performática e acessível",
      "Acompanhamento pós-lançamento",
    ],
    gallery: [
      { src: tp("hero"), caption: "TecnoPallet — hero e indicadores" },
      { src: tp("solucoes"), caption: "TecnoPallet — soluções logísticas" },
      { src: tp("quem-somos"), caption: "TecnoPallet — quem somos" },
      { src: tp("distribuicao"), caption: "TecnoPallet — área de cobertura" },
      { src: vt("site-01-topo"), caption: "VitaliTI Soluções — home" },
      { src: vt("site-03-servicos"), caption: "VitaliTI Soluções — serviços" },
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce",
    meta: "Comércio digital · 2024 — 2025",
    desc: "Vitrine, catálogo e checkout pensados para vender.",
    linkUrl: "https://www.prog-imports.com",
    linkLabel: "Ver loja no ar",
    cover: IMG.progSite[1],
    problema: "Lojas online perdem venda em catálogo confuso, falta de informação de parcelamento e checkout longo demais.",
    solucao: "Estrutura de e-commerce com coleções navegáveis, cards de produto com preço, parcelamento e promoção, busca, favoritos, carrinho e área de gerenciamento integrada ao estoque.",
    techs: ["React", "TypeScript", "Node.js", "PostgreSQL", "Integrações de pagamento"],
    resultado: "Jornada de compra curta e leitura clara do que vende, com o catálogo sempre coerente com o estoque real.",
    processo: [
      "Análise do catálogo e da jornada de compra",
      "Redesign da vitrine e das páginas de produto",
      "Otimização do carrinho e das formas de pagamento",
      "Instrumentação de métricas de conversão",
    ],
    gallery: [
      { src: IMG.progSite[1], caption: "Catálogo por categoria" },
      { src: IMG.progSite[2], caption: "Promoções e mais vendidos" },
      { src: IMG.progSite[4], caption: "Depoimentos e newsletter" },
    ],
  },
];

export const TICKER = [
  "Product Owner", "React", "TypeScript", "UX / UI", "Node.js", "Power BI",
  "Inteligência Artificial", "PostgreSQL", "Automações", "Design Systems", "SQL", "Next.js",
];

export const PIPELINE = [
  { icon: "💡", label: "Ideia" },
  { icon: "📋", label: "Estratégia" },
  { icon: "🎨", label: "Design" },
  { icon: "💻", label: "Desenvolvimento" },
  { icon: "🤖", label: "IA" },
  { icon: "🚀", label: "Produto" },
];

export const PILARES = ["Gestão de Produto", "UX / UI", "Desenvolvimento", "Inteligência Artificial"];

export const ETAPAS = [
  ["Descoberta", "Entendo o problema real antes de propor solução."],
  ["Pesquisa", "Usuários, mercado e dados guiam as decisões."],
  ["Estratégia", "Definição clara de objetivos, métricas e escopo."],
  ["Roadmap", "Priorização com visão de curto, médio e longo prazo."],
  ["Backlog", "Histórias detalhadas, critérios de aceite e valor."],
  ["Design", "UX e UI que traduzem estratégia em interface."],
  ["Desenvolvimento", "Código limpo, revisado e escalável."],
  ["Testes", "Qualidade validada antes do usuário sentir."],
  ["Deploy", "Entregas frequentes e sem sobressaltos."],
  ["Evolução contínua", "Métricas, feedback e novos ciclos."],
].map((e, i) => ({
  num: String(i + 1).padStart(2, "0"),
  title: e[0],
  desc: e[1],
  isLeft: i % 2 === 0,
  isRight: i % 2 === 1,
}));

export const FERRAMENTAS = [
  { name: "Claude Code", desc: "Codificação assistida com foco em qualidade e refactor." },
  { name: "Claude Design", desc: "Ideação de interfaces e sistemas de design." },
  { name: "Claude Cowork", desc: "Documentação viva, PRDs e comunicação de produto." },
  { name: "ChatGPT", desc: "Brainstorming, arquitetura de soluções e análise." },
  { name: "Lovable", desc: "Prototipação e entrega acelerada de produtos." },
  { name: "GitHub Copilot", desc: "Aceleração de tarefas repetitivas no editor." },
];

export const COMPETENCIAS = [
  { area: "Product Owner", items: ["Roadmaps", "Backlog", "Sprint Planning", "Scrum", "Kanban", "Refinamento", "User Stories", "Priorização", "OKRs", "Métricas", "Discovery", "Stakeholders", "Decisão orientada a dados"] },
  { area: "Desenvolvimento", items: ["SQL", "Python", "Power BI", "DAX", "APIs", "Automações", "React", "TypeScript", "Node.js"] },
  { area: "Design", items: ["UX", "UI", "Protótipos", "Landing Pages", "Design Systems", "Interfaces modernas"] },
];

export const CARREIRA = [
  { num: "01", year: "2022", role: "Analista de Processos", desc: "Mapeamento e otimização de fluxos operacionais." },
  { num: "02", year: "2023", role: "Analista Power BI", desc: "Modelagem de dados, DAX e dashboards executivos." },
  { num: "03", year: "2024", role: "Analista de Projetos", desc: "Condução de projetos e entrega orientada a resultado." },
  { num: "04", year: "2025", role: "Product Owner", desc: "Estratégia, design, desenvolvimento e IA no ciclo do produto." },
];

export const STATS = [
  [15, "+", "Projetos desenvolvidos"],
  [18, "+", "Clientes atendidos"],
  [30, "+", "Automações entregues"],
  [35, "+", "Dashboards criados"],
  [3, "", "Sistemas em produção"],
  [15, "+", "Landing pages"],
].map((st) => ({ target: st[0], suffix: st[1], label: st[2] }));

export const DEPOIMENTOS = [
  { quote: "O Arthur entendeu exatamente o que eu precisava e entregou um resultado melhor do que eu imaginava. O projeto ficou bonito, rápido e muito bem organizado.", name: "Pedro", role: "Proprietário TecnoPallet", initials: "P" },
  { quote: "O Orbi automatizou várias tarefas que eu fazia manualmente. Hoje consigo focar muito mais no que realmente importa.", name: "Felipe Sousa", role: "Usuário do Orbi", initials: "FS" },
  { quote: "Trabalhar com o Arthur trouxe muito mais clareza para o projeto. Ele conecta estratégia, design e desenvolvimento de forma natural, entregando soluções modernas e bem estruturadas.", name: "Wellington Cunha Filho", role: "Proprietário VitaliTI", initials: "WF" },
];
