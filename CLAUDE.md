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

## Comandos (dentro de `app/`)
- `npm install` — instala dependências
- `npm run dev` — servidor local
- `npm run build` — build de produção em `app/dist`

## Retomar o trabalho
1. `git pull` antes de começar (pode ter havido alterações por outra sessão/máquina).
2. Alterar, testar com `npm run build`, commitar e dar `git push` → a Vercel publica sozinha.
3. Se a pasta local sumir: `git clone https://github.com/ArthurPr0g/Portfolio-Arthur-Prog.git`.

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
