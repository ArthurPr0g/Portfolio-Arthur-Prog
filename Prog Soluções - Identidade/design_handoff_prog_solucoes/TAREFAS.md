# TAREFAS — ordem de execução para o Claude Code

> Antes de começar: leia `README.md` e abra as 4 referências em `referencias-html/` (servidor estático). Compare tudo **quadro a quadro**: pause e use ← → para andar 0,1 s.

## 1. Base
- [ ] Importe `tokens/tokens.css` (ou converta `tokens.json` para o sistema de tokens do projeto).
- [ ] Carregue Sora, DM Sans e JetBrains Mono (pré-carregue a Sora).
- [ ] Crie `motion.ts` com `enter` (easeOutExpo), `draw` (easeInOutCubic), `pop` (easeOutBack), `tween` e `interpolate`, com as fórmulas exatas do README.
  - Aceite: `draw(0.5) === 0.5`, `enter(1) === 1`, e `pop` passa de 1 perto de t = 0,6.

## 2. Marca
- [ ] `ProgMark`: SVG em grade de 48u com as props do doc 02. O arco é revelado por máscara (path central, `pathLength=1`).
  - Aceite: com `stem=1, arcB=1`, o resultado é idêntico a `assets/simbolo/prog-simbolo-fundo-escuro.svg`.
- [ ] `ProgWordmark`: "Prog" em 600 + " Soluções" em 400, −0,03em, com revelação por clip.
- [ ] Favicon e ícones: use `assets/icones/`. Abaixo de 24 px, use **sempre** o desenho pequeno.

## 3. Telas de carregamento — web (desktop 1920 e responsivo)
- [ ] `useTimeline` (rAF, um único relógio).
- [ ] `SplashLoader`, `PageLoader`, `AppLoader` e `DocLoader`, portando as expressões de `prog-loaders.jsx` linha por linha.
- [ ] Máquina de estados ligada ao carregamento real (doc 04): progresso suavizado, `sessionStorage` para a construção e espera mínima de 300 ms.
- [ ] Breakpoint ≤ 600 px: use as medidas de `prog-loaders-mobile.jsx` (lockup vertical, bottom sheet, tab bar).
  - Aceite: lado a lado com a referência em 1,2 / 2,7 / 5,0 / 7,8 / 10,6 / 13,6 / 16,9 / 20,6 s, sem diferença visível.

## 4. Mobile nativo (se houver app)
- [ ] Mesmas fórmulas com Reanimated + react-native-svg (ou o equivalente da plataforma). Splash nativo estático = último quadro do lockup vertical, para não haver salto.

## 5. Reels
- [ ] Exporte pela ferramenta de design **ou** porte `ReelsPiece` para Remotion (doc 03): 1080×1920, 60 fps, H.264 ≥ 12 Mbps.
  - Aceite: nenhum texto nas áreas seguras; loop sem salto (27,0 s → 0 s).

## 6. Qualidade final
- [ ] 60 fps no Chrome DevTools com CPU 4x mais lenta. Auras sem `filter: blur`.
- [ ] `prefers-reduced-motion` testado.
- [ ] Nenhuma cor fora de `tokens` (ciano, verde e roxo só nos usos permitidos).
- [ ] Converta os textos dos lockups SVG em curvas para os arquivos-mestre.
