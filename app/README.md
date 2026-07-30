# Arthur Prog — Portfólio

Site pessoal de Arthur Prog (Product Owner, desenvolvedor, designer e especialista em IA), construído em React + Vite.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`, prontos para deploy em qualquer host estático (Netlify, Vercel, GitHub Pages etc.).

## Estrutura

- `src/data/content.js` — todo o conteúdo do site (projetos, textos, dados de contato).
- `src/components/` — componentes de UI e seções da home.
- `src/pages/` — `Home.jsx` e `ProjectPage.jsx` (página de detalhe de cada projeto, roteada por hash `#/projetos/:slug`).
- `src/hooks/` — animações (reveal on scroll, tilt 3D, contador animado, efeitos de scroll, cursor glow) e o roteador de hash.

## Contato

O formulário de contato abre o WhatsApp com a mensagem pré-preenchida. Não há integração de e-mail configurada.
