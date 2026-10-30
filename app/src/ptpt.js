// Converte textos do português do Brasil para o português de Portugal.
// Usado na versão /pt-pt do site (textos gerais e páginas de projeto). A página
// de preços de Portugal é escrita à mão (planos.ptpt.html / planos.ptpt.js).
//
// Ordem: frases específicas (revistas uma a uma) → termos → artigo antes do
// possessivo ("meus projetos" → "os meus projetos").
// Ao escrever um texto novo em português, confira como ele sai aqui.

const FRASES = [
  ["Assistente pessoal com IA reunindo agenda", "Assistente pessoal com IA que reúne agenda"],
  ["como aplicativos separados. O usuário perde tempo trocando de contexto e ninguém enxerga o dia como um todo.", "como aplicações separadas. O utilizador perde tempo a saltar de aplicação em aplicação e ninguém vê o dia como um todo."],
  ["Rotina inteira em uma tela", "A rotina inteira num só ecrã"],
  ["em uma interface só", "numa só interface"],
  ["utilizando estratégia", "com estratégia"],
  ["Continuo sendo o responsável", "Continuo a ser o responsável"],
  ["A gente lê muito e lembra pouco: as anotações se perdem, ninguém revisa o que leu", "Lemos muito e lembramos pouco: as anotações perdem-se, ninguém revê o que leu"],
  ["em que cada livro lido vira revisão", "em que cada livro lido se transforma em revisão"],
  ["um sistema que vira a marca de cada salão", "um sistema que assume a marca de cada salão"],
  ["formulário que cai direto no WhatsApp", "formulário que chega diretamente ao WhatsApp"],
  ["O que dizem quem trabalhou comigo.", "O que dizem os clientes com quem trabalhei."],
  ["Conte sobre sua ideia ou projeto", "Fale-me da sua ideia ou projeto"],
  ["Prefere direto?", "Prefere falar diretamente?"],
  ["construída em cima de dados", "construída sobre dados"],
  ["até produção", "até à produção"],
  ["antes do usuário sentir", "antes de o utilizador sentir"],
  ["critérios de aceite", "critérios de aceitação"],
  ["Acessar Orbi", "Aceder ao Orbi"],
  ["Ver loja no ar", "Ver a loja online"],
  ["Lojas online perdem venda em catálogo confuso, falta de informação de parcelamento e checkout longo demais.", "As lojas online perdem vendas com catálogos confusos, falta de informação sobre pagamentos em prestações e checkouts demasiado longos."],
  ["cards de produto com preço, parcelamento e promoção, busca", "cartões de produto com preço, prestações e promoções, pesquisa"],
  ["área de gerenciamento", "área de gestão"],
  ["Proprietário TecnoPallet", "Proprietário da TecnoPallet"],
  ["Proprietário VitaliTI", "Proprietário da VitaliTI"],
  ["participo de toda a construção", "participo em toda a construção"],
  ["responsivo no celular", "adaptado ao telemóvel"],
  ["controle de acesso", "controlo de acessos"],
  ["frota rastreada", "frota monitorizada"],
  ["estado do Rio", "estado do Rio de Janeiro"],
  ["Salões anotavam os serviços em caderno ou planilha", "Os salões registavam os serviços em cadernos ou folhas de cálculo"],
  ["levava tempo e gerava erro.", "levava tempo e gerava erros."],
  ["uma tela de ajustes em que", "um ecrã de definições em que"],
  ["Ajustes: identidade", "Definições: identidade"],
  ["Design das telas de listagem", "Design dos ecrãs de listagem"],
  ["nos três tamanhos de tela", "nos três tamanhos de ecrã"],
  ["status de pago e previsto", "estado de pago e previsto"],
  ["lançamentos, parcelas e status", "lançamentos, prestações e estados"],
  ["com fechamento que deixou de levar dias para levar minutos", "com um fecho de contas que passou de dias para minutos"],
  ["cotas, contemplações e inadimplência", "quotas, atribuições e incumprimento"],
  ["cotas, parcelas, contemplações e adimplência — regras que nenhuma planilha sustenta sem erro", "quotas, prestações, atribuições e pagamentos em dia — regras que nenhuma folha de cálculo aguenta sem erros"],
  ["um farol por participante", "um semáforo por participante"],
  ["farol de participantes", "semáforo de participantes"],
  ["cada parcela, contemplação e atraso", "cada prestação, atribuição e atraso"],
  ["cotas e parcelas", "quotas e prestações"],
  ["Conferência do histórico", "Verificação do histórico"],
  ["bem ranqueados", "bem posicionados no Google"],
  ["Migração dos controles em planilha e treinamento de uso", "Migração dos controlos em folhas de cálculo e formação da equipa"],
  ["Ver case completo", "Ver caso completo"],
  ["ver o case completo", "ver o caso completo"],
  ["Falar no WhatsApp", "Falar por WhatsApp"],
  ["Mapeamento da jornada: ler, anotar, revisar e lembrar", "Mapeamento da jornada: ler, anotar, rever e lembrar"],
  ["Versão celular", "Versão telemóvel"],
  ["Vim pelo seu portfólio", "Cheguei através do seu portefólio"],
  ["Vim pelo portfólio da Prog Soluções", "Cheguei através do portefólio da Prog Soluções"],
  ["já sabendo do seu projeto", "já a par do seu projeto"],
  ["Recebemos sua mensagem. O atendimento continua pelo WhatsApp, que abriu em outra aba.", "Recebemos a sua mensagem. O atendimento continua pelo WhatsApp, que abriu noutro separador."],
  ["carrinho e pedidos", "carrinho e encomendas"],
  ["Tem uma ideia? Vamos transformar em produto.", "Tem uma ideia? Vamos transformá-la num produto."],
  ["voce@email.com", "nome@email.com"],
  ["(62) 90000-0000", "912 345 678"],
];

// Termos (palavra inteira). A primeira letra maiúscula é preservada.
const TERMOS = [
  ["em uma", "numa"], ["em um", "num"],
  ["ao menos", "pelo menos"],
  ["sob medida", "à medida"],
  ["planilhas", "folhas de cálculo"], ["planilha", "folha de cálculo"],
  ["usuários", "utilizadores"], ["usuário", "utilizador"],
  ["celulares", "telemóveis"], ["celular", "telemóvel"],
  ["equipes", "equipas"], ["equipe", "equipa"],
  ["estoque", "stock"],
  ["contatos", "contactos"], ["contato", "contacto"],
  ["cadastros", "registos"], ["cadastro", "registo"], ["cadastrados", "registados"],
  ["registros", "registos"], ["registro", "registo"], ["registrado", "registado"], ["registrar", "registar"],
  ["treinamentos", "formações"], ["treinamento", "formação"],
  ["gerenciamento", "gestão"],
  ["controles", "controlos"], ["controle", "controlo"],
  ["seções", "secções"], ["seção", "secção"],
  ["percepção", "perceção"], ["Percepção", "Perceção"],
  ["cronômetro", "cronómetro"],
  ["revisado", "revisto"],
  ["escopo", "âmbito"],
  ["modelagem", "modelação"],
  ["fechamento", "fecho"],
  ["vitrine", "montra"],
  ["busca", "pesquisa"],
  ["parcelamento", "pagamento em prestações"], ["parcelas", "prestações"], ["parcela", "prestação"],
  ["cabeamento", "cablagem"],
  ["aplicativos", "aplicações"], ["aplicativo", "aplicação"],
  ["arquivos", "ficheiros"], ["arquivo", "ficheiro"],
  ["portfólio", "portefólio"],
  ["conectados", "ligados"], ["conectado", "ligado"],
  ["desenvolvedores", "programadores"], ["desenvolvedor", "programador"],
];

const POSSESSIVOS = { meu: "o", minha: "a", meus: "os", minhas: "as", seu: "o", sua: "a", seus: "os", suas: "as" };
const CONTRACOES = {
  de: { o: "do", a: "da", os: "dos", as: "das" },
  em: { o: "no", a: "na", os: "nos", as: "nas" },
  por: { o: "pelo", a: "pela", os: "pelos", as: "pelas" },
};

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const maiuscula = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const REGRAS_TERMOS = TERMOS.map(([de, para]) => [new RegExp(`(?<![\\p{L}])(${escapar(de)})(?![\\p{L}])`, "giu"), para]);

function artigos(texto) {
  // "de/em/por + possessivo" → contração; outros casos → artigo antes do possessivo.
  return texto.replace(
    /(^|[^\p{L}])((?:([Dd]e|[Ee]m|[Pp]or)\s+)?)(meu|minha|meus|minhas|seu|sua|seus|suas|Meu|Minha|Meus|Minhas|Seu|Sua|Seus|Suas)(?![\p{L}])/gu,
    (todo, antes, prep, prepPalavra, poss, offset, str) => {
      const p = poss.toLowerCase();
      const art = POSSESSIVOS[p];
      // Já tem artigo/contração antes? Mantém.
      const anterior = str.slice(Math.max(0, offset - 6), offset + antes.length);
      if (!prepPalavra && /(?:^|[^\p{L}])(o|a|os|as|do|da|dos|das|no|na|nos|nas|pelo|pela|pelos|pelas|ao|à|aos|às|um|uma)\s+$/iu.test(anterior + " ")) return todo;
      if (prepPalavra) {
        const c = CONTRACOES[prepPalavra.toLowerCase()][art];
        const cc = prepPalavra[0] === prepPalavra[0].toUpperCase() ? maiuscula(c) : c;
        return `${antes}${cc} ${p}`;
      }
      const comeco = poss[0] === poss[0].toUpperCase();
      return `${antes}${comeco ? maiuscula(art) : art} ${p}`;
    }
  );
}

export function paraPtPt(texto) {
  if (typeof texto !== "string" || !texto) return texto;
  let t = texto;
  for (const [de, para] of FRASES) t = t.split(de).join(para);
  for (const [re, para] of REGRAS_TERMOS) {
    t = t.replace(re, (m) => (m[0] === m[0].toUpperCase() && m[0] !== m[0].toLowerCase() ? maiuscula(para) : para));
  }
  return artigos(t);
}
