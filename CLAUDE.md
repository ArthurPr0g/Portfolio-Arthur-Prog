# Portfólio Arthur Prog

Portfólio estático em React + Vite. Sem banco de dados nem variáveis de ambiente.

## Onde vive o projeto
- **GitHub (fonte da verdade):** https://github.com/ArthurPr0g/Portfolio-Arthur-Prog — branch `main`
- **Vercel:** time `prog-solucoes`, projeto `portfolio-arthur-prog` → https://portfolio-arthur-prog.vercel.app
- Deploy é automático: todo push na `main` publica em produção. Não é preciso rodar `vercel` manualmente.
- **Cópia local:** `C:\Apps\1 - Dev\Prog Soluções\2 - Meus projetos\Portfólio Arthur Prog`

## Estrutura
- `app/` — o site de produção (React + Vite). Tudo que é código fica aqui.
- `project/` e `chats/` — handoff original do Claude Design (referência de design, não editar).

## Idiomas e endereços (português e inglês)
- Cada idioma tem seus endereços (`app/src/rotas.js`): `/pt`, `/pt/planos`, `/pt/projetos/<slug>` e `/en`, `/en/pricing`, `/en/projects/<slug>`.
- A raiz `/` só redireciona (`app/vercel.json`): `?lang=` > cookie `idioma` (escolha no seletor PT/EN) > país (Brasil → `/pt`, EUA → `/en`) > idioma do navegador > `/en`.
- Links antigos com `#/planos` e `#/projetos/<slug>` são convertidos para os novos no navegador.
- Textos em `app/src/data/content.js` (PT) e `app/src/data/content.en.js` (EN). Mudou um texto, mude os dois.
- Textos fixos dos componentes usam `t("português", "english")` de `app/src/i18n.jsx`.
- Planos: `planos.html` + dados em reais (`DADOS_PT` em `planos.js`); `planos.en.html` + `planos.en.js` com a tabela em dólar para os EUA (preços no piso do freelancer americano; só existe no portfólio, fora da regra de preços abaixo).

- Portugal (`/pt-pt`): textos gerais saem do pt-BR pelo conversor `app/src/ptpt.js` (frases revistas + termos + artigo antes do possessivo); conteúdo em `content.ptpt.js`; planos escritos à mão em `planos.ptpt.html`/`planos.ptpt.js` (euros, MB WAY/Multibanco, faturação certificada). Texto novo em português: confira como sai no conversor. Depoimentos ficam com as palavras originais.

## Fotos do Arthur
- `app/public/eu/arthur-sentado.webp` (Brasília, recorte de corpo inteiro, sentado na borda do card de "Quem sou") e `arthur-avatar.webp` (pista, foto redonda do contato).
- Feitas com `app/scripts/fotos/tratar-fotos.py` (rembg/isnet + limpeza de borda + retoque). Originais e masters em `_originais-fotos/` (só local, fora do Git).
- Trocar a foto sentada: refazer o recorte e atualizar `FOTO_ASSENTO` (altura do assento, 0–1) e `FOTO_PROPORCAO` em `content.js`.

## Conteúdo que depende do Arthur
- `app/src/data/content.js`: `EMAIL`, `AGENDA_URL` (Cal.com/Calendly) e `FOTO` — vazios = não aparecem.
- Depoimentos aceitam `foto`, `link` e `projeto` (slug do case).
- `app/src/data/resultados.js`: números de cada case. Itens com `exemplo: true` NÃO aparecem no site; para conferir, abrir o projeto com `?rascunho=1`. Nunca publicar número inventado como real.

## SEO
- `app/src/seo.js` define título, descrição, canonical, hreflang, imagem e JSON-LD de cada página.
- No build, `scripts/prerender.mjs` grava um HTML por página com esses dados + `sitemap.xml` e `robots.txt`.
- Desde 28/10/2026 o HTML de cada página sai com **todo o conteúdo** (React montado no build por `src/entry-server.jsx`, `vite build --ssr`): Bing e buscas com IA leem sem JavaScript. No navegador, `main.jsx` monta por cima (createRoot). Regra: componente não pode usar `window`/`document`/`localStorage` durante a renderização, só em efeitos — senão o build quebra. A página de planos sai num shadow root declarativo (`<template shadowrootmode>`).
- SEO local: endereço Goiânia/GO no JSON-LD; título da home em português começa com "Criação de sites".
- Pendente do Arthur: domínio próprio e Google Search Console (tag HTML + envio do sitemap).
- Imagens de compartilhamento: `public/og/og-pt.png` e `og-en.png` (1200×630).
- Endereço do site em um lugar só: `SITE` em `app/src/rotas.js` (trocar se houver domínio próprio).

## Comandos (dentro de `app/`)
- `npm install` — instala dependências
- `npm run dev` — servidor local
- `npm run build` — build de produção em `app/dist`

## Retomar o trabalho
1. `git pull` antes de começar (pode ter havido alterações por outra sessão/máquina).
2. Alterar, testar com `npm run build`, commitar e dar `git push` → a Vercel publica sozinha.
3. Se a pasta local sumir: `git clone https://github.com/ArthurPr0g/Portfolio-Arthur-Prog.git`.

## Marca Prog Soluções e telas de carregamento (29/10/2026)
- Handoff de design em `Prog Soluções - Identidade/design_handoff_prog_solucoes/` (fonte da verdade do movimento: `referencias-html/*.jsx`).
- Código em `app/src/brand/`: `tokens.css`, `motion.js` (enter/draw/pop), `mark.js` (geometria do P), `ProgMark.jsx`, `ProgWordmark.jsx`, `useTimeline.js`.
- O cabeçalho usa a logo Prog Soluções e o rodapé, o símbolo P (decisões do Arthur; o nome "Arthur Prog" continua no rodapé e no topo).
- Lockups em curvas (arquivos-mestre, sem depender da Sora instalada): `assets/logotipo/*-curvas.svg`, gerados do `<text>` original com a Sora variável e o kerning do HarfBuzz.
- Loader do site (`src/brand/loaders/boot.js`): roda **embutido no <head>** (plugin em `vite.config.js`), antes do bundle, porque o HTML pré-renderizado aparece antes do JS. Splash só no 1º acesso da aba (`sessionStorage` `ps-splash`); loader só se a espera passar de 300 ms; progresso real = HTML, CSS, fontes, montagem do React e imagens da 1ª tela. O CSS carrega sem bloquear a pintura (media=print + onload, com <noscript>).
- O topo da página precisa dos atributos `data-ps` (logo, itens do menu, `hero-pill`, `hero-w`, `hero-cta`) para o voo da logo e a entrada em stagger.
- Comparar com a referência: `/pt?ps-quadro=7.8` (para no tempo) ou `/pt?ps-ref` (toca a timeline da referência).
- `/dev/loaders/` (noindex, fora do menu e do sitemap): `AppLoader` e `DocLoader` para os sistemas; `?quadro=13.6` congela.

---

# Preços da Prog Soluções

Toda mudança de valor (pacote, combo, marca, mensalidade) vale nos três lugares,
no mesmo pedido, e é publicada e conferida sem precisar de aprovação do dono:

1. **Catálogo do ERP da Prog Imports** — `ArthurPr0g/Site-Prog-Imports`, tabela
   `internal_services` por migration (ver o `CLAUDE.md` de lá) e
   `src/lib/combo-servicos.ts`.
2. **Página de planos do portfólio** — `ArthurPr0g/Portfolio-Arthur-Prog`,
   `app/src/pages/planos/planos.js`.
3. **Página avulsa e tabela interna** — `ArthurPr0g/Resgate-Cr-dito-Claude`,
   `index.html` e `PACOTES.md`.

Regras vigentes: combo site/loja + gestão com 15/15/20% (mesmo nível) ou 15%
(níveis diferentes), terminado em 97; mensalidade do combo = a maior das duas;
marca: Logo Essencial 497, Identidade a partir do Logo 597, Identidade Visual
Completa 997 (combo dos dois). Antes de publicar, testar todas as combinações
do quiz e do simulador das páginas de planos.
