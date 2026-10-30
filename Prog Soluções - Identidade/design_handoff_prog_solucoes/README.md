# Handoff: Prog Soluções — Identidade visual + Telas de carregamento (desktop, mobile) + Reels

> **Leia primeiro:** este README sozinho basta para implementar. Os documentos em `docs/` detalham cada parte com timings e medidas exatos. `TAREFAS.md` é a lista de trabalho em ordem, com critérios de aceite.

## Visão geral
A Prog Soluções é a marca comercial de serviços de tecnologia (sites, sistemas web, ERP/CRM, automação, IA, consultoria). Este pacote tem quatro partes:
1. **Identidade visual**: símbolo "P modular" (Conceito A refinado). Uma haste em pílula e um arco separados por um corte de 2,5u, numa grade de 48u. Inclui a versão **2a "Planta"**, que mostra a construção (grade, guias e círculo tracejado), e o sistema **2c "Responsivo"**: planta em tamanhos grandes, guia em médios e símbolo sólido em pequenos.
2. **Telas de carregamento desktop** (1920×1080): Splash do app, carregamento do Site, Painel do sistema e Documento em tema claro.
3. **As mesmas telas no mobile** (390×844 pt, render 3x).
4. **Vídeo Reels** (1080×1920, 27 s, loop) para o Instagram.

O visual deriva do portfólio existente (https://portfolio-arthur-prog.vercel.app/pt): fundo quase preto, um único acento azul periwinkle (oklch matiz 262), Sora + DM Sans + JetBrains Mono, pílulas e cards arredondados, grade de 74 px e auras desfocadas.

## Sobre os arquivos de design
Os arquivos em `referencias-html/` são **referências de design feitas em HTML/React**. São protótipos que mostram a aparência e o movimento pretendidos, **não código de produção para copiar**. A tarefa é **recriar esses designs no ambiente do codebase de destino** (React/Next, Vue, React Native, Flutter, SwiftUI…), usando os padrões dele. Se ainda não houver codebase, use **React + TypeScript** (recomendação em `docs/04-implementacao.md`).

Exceção: as **fórmulas de animação** dos arquivos `.jsx` são a fonte da verdade e devem ser portadas **1:1**. Todo valor visual nesses arquivos é uma função pura do tempo `T` (segundos). Não aproxime o movimento com keyframes CSS independentes: isso dessincroniza as etapas e o resultado perde a fluidez.

### Como abrir as referências
Sirva a pasta `referencias-html/` com um servidor estático (`npx serve referencias-html`) e abra:
- `Prog Solucoes - Identidade.dc.html`: apresentação da marca (análise, conceitos, rodada 2 "Em construção", entregáveis).
- `Prog Solucoes - Telas de Carregamento.dc.html`: desktop, 23,7 s em loop.
- `Prog Solucoes - Telas de Carregamento Mobile.dc.html`: mobile, 23,7 s em loop.
- `Prog Solucoes - Reels.dc.html`: Reels, 27 s em loop.

Atalhos: **espaço** = play/pause, **← →** = avança ou volta 0,1 s (com Shift, 1 s), **0** = início. Use isso para comparar quadro a quadro com a sua implementação.

## Fidelidade
**Alta fidelidade (hi-fi).** Cores, tipografia, medidas, curvas de easing e timings são finais. Recrie pixel a pixel e quadro a quadro. Os textos do painel (valores como "R$ 184 mil" e nomes de automações) são **ilustrativos**: em produção, use dados reais.

## Estrutura do pacote
```
README.md                  ← este arquivo
TAREFAS.md                 ← checklist ordenado com critérios de aceite
docs/
  01-identidade.md         ← geometria do símbolo, lockups, regras, tamanhos mínimos
  02-telas-de-carregamento.md ← timeline de cada tela (desktop e mobile), posições, easing
  03-reels.md              ← roteiro do vídeo, safe zones, exportação
  04-implementacao.md      ← arquitetura recomendada, máquina de estados, performance, acessibilidade
tokens/tokens.css, tokens.json
assets/
  simbolo/   (fundo escuro, fundo claro, mono branco/preto, pequeno ≤24px)
  logotipo/  (horizontal fundo escuro/claro — texto vivo em Sora, converter em curvas)
  planta/    (2a escuro/claro)
  icones/    (favicon, app icon escuro/claro 1024, avatar 1080)
referencias-html/  ← protótipos (fonte da verdade do movimento)
```

## Resumo dos tokens
| Token | Valor | Uso |
|---|---|---|
| ink | `#08080A` | fundo principal |
| panel / surface | `#0D0E13` / `#12141A` | sidebar, tab bar / cards elevados, sheets |
| paper | `#F2F3F5` | fundo claro, botão sólido |
| text | `#F4F5F7` | títulos, **haste do P** no escuro |
| muted / mutedDark | `#A3A8B2` / `#5D626B` | "Soluções" no escuro / no claro |
| accent | `#81AAF7` · oklch(74% .12 262) | **arco do P** no escuro, progresso |
| accentStrong | `#B1D2FF` | guias, cotas, item ativo |
| accentDark | `#3860AC` · oklch(50% .13 262) | **arco do P** no claro (5,5:1 sobre paper) |
| cyan `#43D5DC`, green `#5FD37F`, purple `#62488C` | — | **fora da marca**: só gradiente de texto, status e aura |

Fontes: **Sora** 600/400 (logo, títulos), **DM Sans** (texto, botões), **JetBrains Mono** (rótulos, %, cotas). Nunca use mono no logotipo.

## Curvas de movimento (apenas três)
| Nome | Função | CSS equivalente |
|---|---|---|
| `enter` | easeOutExpo `t==1?1:1-2^(-10t)` | `cubic-bezier(0.16, 1, 0.3, 1)` (é a mesma do site) |
| `draw` | easeInOutCubic | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `pop` | easeOutBack (c1 = 1.70158) | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

Use `enter` para elementos que chegam ou voam, `draw` para traços, fades e saídas, e `pop` para a haste do P, os cards e o bottom sheet. Não use nenhuma outra curva.

## Arquivos de referência
- `referencias-html/prog-loaders.jsx`: componente `Mark` (símbolo animável), `Word` (wordmark com revelação) e as 4 cenas desktop.
- `referencias-html/prog-loaders-mobile.jsx`: as 4 cenas mobile.
- `referencias-html/prog-reels.jsx`: vídeo Reels; reaproveita as cenas mobile e desktop dentro de um celular e de um navegador.
- `referencias-html/animations-v3.jsx`: motor de timeline usado só para pré-visualização e exportação de vídeo. **Não** leve para produção.
