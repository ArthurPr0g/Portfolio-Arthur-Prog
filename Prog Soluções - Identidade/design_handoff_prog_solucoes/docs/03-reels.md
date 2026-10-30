# 03 — Vídeo Reels (1080×1920, 9:16, 27 s, loop)

Referência: `referencias-html/Prog Solucoes - Reels.dc.html` e `prog-reels.jsx`.

## Roteiro
| Cena | Início | Duração | Conteúdo |
|---|---|---|---|
| Hook | 0 | 3,0 | Mono "PROG SOLUÇÕES · MARCA EM MOVIMENTO"; "Até o carregamento" (Sora 600, 92 px) e *"é marca."* (168 px, itálico com gradiente) sobem com máscara (enter em 0,25 e 0,5). Push de escala 1 → 1,04. Saem em 2,4–3,0. |
| Construção | 3,0 | 4,5 | P em tela cheia (820 → 780 px) em (540, 900): guias, círculo, haste (pop), arco e cotas em Mono 34 px. Em K+3,2–4,1 vira o lockup vertical (marca de 300 px em y = 820 e wordmark de 84 px em cy = 1036). |
| Mobile | 7,5 | 9,0 | Um celular sobe (enter, M−0,9 até M+0,1) e a marca **encaixa exatamente** no loader da tela. É um match-cut: o arco rebobina, o trilho fica em 20% e o círculo a 35° com opacidade .639, idênticos ao quadro mobile em t = 6,7. O conteúdo mobile roda a 1,2x a partir de M+0,35. Títulos: "Site no celular / o arco do P é a barra de progresso" e depois "App do sistema / o painel carrega por etapas". |
| Desktop | 16,5 | 6,5 | O celular sai pela esquerda e um navegador de 1000 px entra pela direita, mostrando o desktop de t = 15,0 em 1,1x: card terminando, dados aparecendo, papel cobrindo e proposta em tema claro. Títulos: "No sistema web" e depois "Em propostas". |
| Final | 23,0 | 4,0 | O P se constrói (haste em pop, arco em draw), wordmark, "SITES · SISTEMAS · ERP · CRM / AUTOMAÇÃO · INTELIGÊNCIA ARTIFICIAL" (Mono 27 px) e a pílula "Vamos conversar · link na bio". Fade para preto em 26,3–27,0, que fecha o loop. |

## Áreas seguras (interface do Instagram)
Deixe livres o topo (0–200 px), a base (1540–1920 px) e a faixa direita (960–1080 px). O toggle "Mostrar áreas seguras do Reels" na referência desenha essas zonas, e ele **deve estar desligado na exportação**.

## Exportação
- **Caminho 1 (sem código):** abra o `.dc.html` na ferramenta de design e use Exportar → Vídeo.
- **Caminho 2 (programático, recomendado para o pipeline):** porte `ReelsPiece` para **Remotion** (React → MP4). Como a referência já é uma função pura de `T`, o porte é direto: `T = frame / fps`.
  - Especificação: 1080×1920, 60 fps (ou 30), H.264 High, perfil yuv420p, bitrate ≥ 12 Mbps, `.mp4`.
  - Carregue as fontes Sora, DM Sans e JetBrains Mono antes de renderizar (`@remotion/google-fonts`).
  - Áudio: não há trilha. Se for adicionar, coloque os acentos sonoros em 1,3 s (haste), 4,4 s (lockup), 7,6 s (encaixe no celular) e 23,2 s (assinatura).
- Capa sugerida para o feed: o quadro em ≈ 25,0 s (assinatura completa).
