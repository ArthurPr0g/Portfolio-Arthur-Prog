import { useLang } from "../i18n";
import { waLink } from "../data/content";
import "./ProjectPage.css";
import "./PrivacidadePage.css";

// Política de privacidade do portfólio (LGPD no Brasil, RGPD em Portugal e na UE).
// Mesma base da política da Prog Imports (site-prog-imports, /privacidade), só com
// o que este site faz de fato: formulário de contato → Lia (atendente com IA),
// sem cookies de publicidade nem medição de audiência, fontes no próprio site.
// Mudou algo que trate dados pessoais (novo serviço, analytics, formulário)?
// Atualize os três textos e a data. Português de Portugal escrito à mão (não passa pelo conversor).

const ATUALIZADA = { pt: "01/11/2026", "pt-pt": "01/11/2026", en: "November 1, 2026" };
const RESPONSAVEL = "Arthur Araújo de Matos (Prog Soluções), CNPJ 45.551.192/0001-62, Goiânia-GO";

const TEXTO = {
  pt: {
    titulo: "Política de privacidade",
    atualizada: "Atualizada em",
    intro: "Esta página explica quais dados pessoais este site coleta, para que eles servem e como você pode acessá-los, corrigi-los ou apagá-los, conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018, LGPD) e, para visitantes da União Europeia, o Regulamento Geral sobre a Proteção de Dados (RGPD).",
    secoes: [
      ["Quem é o responsável", [`O responsável (controlador) pelos dados é ${RESPONSAVEL}, Brasil. É quem faz os sites, lojas e sistemas mostrados aqui.`]],
      ["Quais dados coletamos", [
        ["Formulário de contato: nome, e-mail, WhatsApp e a mensagem que você escrever, além do idioma e do endereço da página de onde enviou.",
          "Proteção contra abuso: o seu endereço IP, guardado só embaralhado (hash), para limitar envios repetidos.",
          "Conversa no WhatsApp: ao enviar o formulário ou tocar no botão, o WhatsApp abre com a sua mensagem. O que você conversar lá também fica registrado no nosso atendimento.",
          "Navegação: não usamos cookies de publicidade nem ferramentas de medição de audiência. Só guardamos no seu navegador a escolha de idioma (um cookie \"idioma\") e de moeda, para lembrar da próxima vez. As fontes do site são servidas por ele mesmo, sem passar pelo Google."],
      ]],
      ["Para que usamos e com qual base legal", [
        ["Responder ao seu contato e preparar uma proposta, como você pediu (procedimentos preliminares a um contrato, art. 7º, V, da LGPD; art. 6.º, n.º 1, al. b, do RGPD).",
          "Pesquisar informações públicas sobre o seu negócio para a primeira resposta já chegar útil, e evitar spam no formulário (legítimo interesse, art. 7º, IX, da LGPD; art. 6.º, n.º 1, al. f, do RGPD). Você pode se opor a isso a qualquer momento."],
        "Não vendemos dados, não usamos para publicidade de terceiros e não mandamos mensagens em massa.",
      ]],
      ["Atendimento com inteligência artificial", [
        "Quem responde primeiro é a Lia, assistente virtual com IA da Prog Soluções. Com o que você enviou, ela pesquisa na internet informações públicas sobre o seu negócio (site, redes sociais, perfil no Google) e prepara a primeira resposta. A pesquisa e as conversas são processadas pela Anthropic (Claude).",
        "A Lia não fecha contratos nem cobra nada sozinha: uma pessoa acompanha as conversas e pode assumir a qualquer momento. Se preferir falar só com uma pessoa, é só pedir na conversa.",
      ]],
      ["Com quem compartilhamos", [
        "Só com os fornecedores que fazem o atendimento funcionar:",
        ["Vercel (hospedagem do site e do sistema de atendimento);", "Supabase (banco de dados do atendimento);", "Anthropic (IA que pesquisa e ajuda a responder);", "Meta (WhatsApp), por onde a conversa continua;", "Google (agenda e videochamada), quando marcamos uma reunião com você e enviamos o convite para o seu e-mail."],
        "Esses fornecedores guardam dados fora do Brasil e da União Europeia (principalmente nos Estados Unidos), com as garantias previstas na LGPD e no RGPD, como as cláusulas contratuais-padrão que eles oferecem. Também podemos fornecer dados quando a lei ou uma ordem judicial exigir.",
      ]],
      ["Por quanto tempo guardamos", ["Os dados de contato e as conversas ficam guardados enquanto houver conversa ou relacionamento comercial e, depois, por até 2 anos, a menos que você peça a exclusão antes. O que a lei obriga a guardar (por exemplo, dados de contratos e notas fiscais) fica pelo prazo legal."]],
      ["Seus direitos", [
        "Você pode pedir a qualquer momento: confirmação de que tratamos seus dados, acesso, correção, anonimização, portabilidade, exclusão, informação sobre com quem compartilhamos, revogação do consentimento e oposição ao uso por legítimo interesse.",
        "Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD) ou, na União Europeia, à autoridade do seu país (em Portugal, a CNPD).",
      ]],
      ["Como falar com a gente ou apagar seus dados", ["@contato"]],
      ["Segurança", ["Usamos conexão criptografada (HTTPS), cabeçalhos de segurança, acesso restrito ao banco de dados e limite de envios no formulário. Nenhum sistema é 100% seguro; se houver um incidente que traga risco a você, avisaremos você e a autoridade competente."]],
      ["Mudanças nesta política", ["Quando esta política mudar, a data no topo da página muda junto. Mudanças importantes serão avisadas nos nossos canais de atendimento."]],
    ],
    contato: ["Mande uma mensagem pelo ", "WhatsApp", " dizendo o que você quer (por exemplo, \"quero apagar os meus dados\"). Confirmamos que o pedido é seu pelo mesmo número ou e-mail e respondemos em até 15 dias."],
    waMsg: "Olá! Quero falar sobre os meus dados pessoais.",
    voltar: "Voltar ao início",
  },
  "pt-pt": {
    titulo: "Política de privacidade",
    atualizada: "Atualizada a",
    intro: "Esta página explica que dados pessoais este site recolhe, para que servem e como os pode consultar, corrigir ou apagar, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD) e da lei brasileira de proteção de dados (LGPD), já que o responsável está no Brasil.",
    secoes: [
      ["Quem é o responsável", [`O responsável pelo tratamento é ${RESPONSAVEL}, Brasil. É quem faz os sites, lojas e sistemas aqui apresentados.`]],
      ["Que dados recolhemos", [
        ["Formulário de contacto: nome, e-mail, WhatsApp e a mensagem que escrever, além do idioma e do endereço da página de onde a enviou.",
          "Proteção contra abusos: o seu endereço IP, guardado apenas sob a forma de hash, para limitar envios repetidos.",
          "Conversa no WhatsApp: ao enviar o formulário ou carregar no botão, o WhatsApp abre com a sua mensagem. O que conversar lá também fica registado no nosso atendimento.",
          "Navegação: não usamos cookies de publicidade nem ferramentas de medição de audiências. Só guardamos no seu navegador a escolha de idioma (um cookie \"idioma\") e de moeda, para a próxima visita. Os tipos de letra do site são servidos pelo próprio site, sem passar pela Google."],
      ]],
      ["Para que os usamos e com que fundamento", [
        ["Responder ao seu contacto e preparar uma proposta, a seu pedido (diligências pré-contratuais, art. 6.º, n.º 1, al. b, do RGPD; art. 7.º, V, da LGPD).",
          "Pesquisar informação pública sobre o seu negócio, para que a primeira resposta já seja útil, e evitar spam no formulário (interesse legítimo, art. 6.º, n.º 1, al. f, do RGPD; art. 7.º, IX, da LGPD). Pode opor-se a isto a qualquer momento."],
        "Não vendemos dados, não os usamos para publicidade de terceiros e não enviamos mensagens em massa.",
      ]],
      ["Atendimento com inteligência artificial", [
        "Quem responde primeiro é a Lia, assistente virtual com IA da Prog Soluções. Com o que enviou, ela pesquisa na internet informação pública sobre o seu negócio (site, redes sociais, perfil na Google) e prepara a primeira resposta. A pesquisa e as conversas são processadas pela Anthropic (Claude).",
        "A Lia não fecha contratos nem cobra nada sozinha: uma pessoa acompanha as conversas e pode assumir a qualquer momento. Se preferir falar só com uma pessoa, basta pedir na conversa.",
      ]],
      ["Com quem partilhamos", [
        "Apenas com os fornecedores que fazem o atendimento funcionar:",
        ["Vercel (alojamento do site e do sistema de atendimento);", "Supabase (base de dados do atendimento);", "Anthropic (IA que pesquisa e ajuda a responder);", "Meta (WhatsApp), onde a conversa continua;", "Google (agenda e videochamada), quando marcamos uma reunião consigo e enviamos o convite para o seu e-mail."],
        "Os dados são tratados fora do Espaço Económico Europeu (no Brasil e, sobretudo, nos Estados Unidos), com as garantias previstas no RGPD, como as cláusulas contratuais-tipo que estes fornecedores disponibilizam. Também podemos fornecer dados quando a lei ou uma ordem judicial o exigir.",
      ]],
      ["Durante quanto tempo os guardamos", ["Os dados de contacto e as conversas ficam guardados enquanto houver conversa ou relação comercial e, depois, até 2 anos, salvo se pedir a eliminação antes. O que a lei obriga a guardar (por exemplo, dados de contratos e faturas) fica pelo prazo legal."]],
      ["Os seus direitos", [
        "Pode pedir a qualquer momento: acesso aos seus dados, retificação, apagamento, limitação do tratamento, portabilidade, oposição ao tratamento por interesse legítimo e retirada do consentimento.",
        "Tem também o direito de apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD) ou à autoridade de controlo do seu país.",
      ]],
      ["Como nos contactar ou apagar os seus dados", ["@contato"]],
      ["Segurança", ["Usamos ligação cifrada (HTTPS), cabeçalhos de segurança, acesso restrito à base de dados e limite de envios no formulário. Nenhum sistema é 100% seguro; se houver um incidente que o ponha em risco, avisaremos o titular e a autoridade competente."]],
      ["Alterações a esta política", ["Quando esta política mudar, a data no topo da página muda também. As alterações importantes serão comunicadas nos nossos canais de atendimento."]],
    ],
    contato: ["Envie uma mensagem pelo ", "WhatsApp", " a dizer o que pretende (por exemplo, \"quero apagar os meus dados\"). Confirmamos que o pedido é seu pelo mesmo número ou e-mail e respondemos no prazo de 15 dias."],
    waMsg: "Olá! Quero falar sobre os meus dados pessoais.",
    voltar: "Voltar ao início",
  },
  en: {
    titulo: "Privacy policy",
    atualizada: "Last updated",
    intro: "This page explains what personal data this website collects, what it is used for and how you can access, correct or delete it, under the EU General Data Protection Regulation (GDPR) and Brazil's data protection law (LGPD), since the controller is based in Brazil.",
    secoes: [
      ["Who is responsible", [`The data controller is ${RESPONSAVEL}, Brazil: the person who builds the websites, stores and software shown here.`]],
      ["What we collect", [
        ["Contact form: your name, email, WhatsApp number and message, plus the language and the address of the page you sent it from.",
          "Abuse protection: your IP address, stored only as a one-way hash, to limit repeated submissions.",
          "WhatsApp chat: when you send the form or tap the button, WhatsApp opens with your message. What you say there is also recorded in our support system.",
          "Browsing: we don't use advertising cookies or audience analytics. We only store your language choice (an \"idioma\" cookie) and currency choice in your browser for your next visit. Fonts are served by this site itself, not by Google."],
      ]],
      ["Why we use it and on what legal basis", [
        ["To answer your message and prepare a proposal, as you asked (steps prior to a contract, GDPR Art. 6(1)(b); LGPD Art. 7, V).",
          "To look up public information about your business so our first reply is already useful, and to keep spam out of the form (legitimate interests, GDPR Art. 6(1)(f); LGPD Art. 7, IX). You can object to this at any time."],
        "We don't sell data, don't use it for third-party advertising and don't send bulk messages.",
      ]],
      ["AI-assisted replies", [
        "The first reply comes from Lia, the Prog Soluções AI assistant. Using what you sent, she looks up public information about your business online (website, social media, Google profile) and drafts the first answer. The research and the conversation are processed by Anthropic (Claude).",
        "Lia never signs contracts or charges anything on her own: a person follows the conversations and can take over at any time. If you'd rather talk only to a person, just say so in the chat.",
      ]],
      ["Who we share it with", [
        "Only the providers that make our support work:",
        ["Vercel (hosting for this site and the support system);", "Supabase (support database);", "Anthropic (the AI that researches and helps reply);", "Meta (WhatsApp), where the conversation continues;", "Google (calendar and video calls), when we book a meeting with you and send the invite to your email."],
        "These providers process data outside the European Economic Area (in Brazil and mainly in the United States), with the safeguards required by the GDPR, such as the standard contractual clauses they offer. We may also disclose data when required by law or a court order.",
      ]],
      ["How long we keep it", ["Contact details and conversations are kept while we're talking or working together and for up to 2 years afterwards, unless you ask us to delete them sooner. Anything the law requires us to keep (such as contract and invoice records) is kept for the legal period."]],
      ["Your rights", [
        "You can ask at any time to access, correct, delete or port your data, to restrict its use, to object to processing based on legitimate interests and to withdraw consent.",
        "You also have the right to complain to your local data protection authority (in Portugal, the CNPD; in Brazil, the ANPD).",
      ]],
      ["How to contact us or delete your data", ["@contato"]],
      ["Security", ["We use encrypted connections (HTTPS), security headers, restricted database access and rate limits on the form. No system is 100% secure; if an incident puts you at risk, we'll notify you and the relevant authority."]],
      ["Changes to this policy", ["When this policy changes, the date at the top changes too. Important changes will be announced on our support channels."]],
    ],
    contato: ["Send us a message on ", "WhatsApp", " saying what you need (for example, \"please delete my data\"). We'll confirm the request is yours through the same number or email and reply within 15 days."],
    waMsg: "Hi! I'd like to talk about my personal data.",
    voltar: "Back to home",
  },
};

function Bloco({ item, x }) {
  if (Array.isArray(item)) return <ul>{item.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (item === "@contato") {
    return (
      <p>
        {x.contato[0]}
        <a href={waLink(x.waMsg)} target="_blank" rel="noopener">{x.contato[1]}</a>
        {x.contato[2]}
      </p>
    );
  }
  return <p>{item}</p>;
}

export default function PrivacidadePage({ onSection }) {
  const { lang, link } = useLang();
  const x = TEXTO[lang] || TEXTO.pt;
  return (
    <main className="project-page privacidade">
      <article className="project-page__inner container">
        <a href={link("home")} onClick={onSection("top")} className="project-page__back">
          <span>←</span> {x.voltar}
        </a>
        <h1 className="project-page__title privacidade__titulo">{x.titulo}</h1>
        <p className="privacidade__data">{x.atualizada} {ATUALIZADA[lang]}</p>
        <p className="privacidade__intro">{x.intro}</p>
        {x.secoes.map(([titulo, blocos]) => (
          <section key={titulo} className="privacidade__secao">
            <h2>{titulo}</h2>
            {blocos.map((b, i) => <Bloco key={i} item={b} x={x} />)}
          </section>
        ))}
      </article>
    </main>
  );
}
