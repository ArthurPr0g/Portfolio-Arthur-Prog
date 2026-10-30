# 04 — Implementação (para não perder qualidade)

## Princípio central
Nas referências, **um único relógio** (`T`) controla tudo, e cada propriedade é `f(T)`. É isso que garante a continuidade: a marca que voa para o cabeçalho, o arco que vira barra de progresso e os círculos de transição. Mantenha esse modelo em produção.

## Arquitetura recomendada (React + TypeScript)
```
src/brand/
  motion.ts          // enter/draw/pop (fórmulas exatas), tween(t, a, b, from, to, ease), interpolate(keys, values, ease)
  ProgMark.tsx       // símbolo animável (props iguais ao Mark da referência), SVG + máscara do arco
  ProgWordmark.tsx   // wordmark com revelação (clip-path inset + translateX)
  useTimeline.ts     // rAF → t em segundos; pausa com document.hidden; respeita reduced-motion
  loaders/
    SplashLoader.tsx // cena 1 (app/PWA, cold start)
    PageLoader.tsx   // cena 2 (site): o arco é o progresso
    AppLoader.tsx    // cena 3 (sistema): skeleton + card/sheet com etapas
    DocLoader.tsx    // cena 4 (geração de proposta/PDF, tema claro)
```
- Use `requestAnimationFrame` e calcule os valores a cada quadro. Escreva-os via `style` ou refs, **sem `setState` por quadro** em árvores grandes. Alternativas equivalentes: Framer Motion `useAnimationFrame` + `useMotionValue`, ou uma timeline GSAP com os mesmos tempos e curvas (`expo.out`, `power2.inOut`/cubic, `back.out(1.7)`).
- **Não** converta para `@keyframes` CSS independentes por elemento: sem o relógio comum as etapas dessincronizam.
- O mobile nativo (React Native) segue as mesmas fórmulas com Reanimated (`useFrameCallback`) e react-native-svg.

## Máquina de estados (carregamento real)
A timeline demonstra o comportamento ideal. Em produção, ligue os trechos aos eventos reais:

| Loader | Estados | Regras |
|---|---|---|
| Splash | `construindo → aguardando → lockup → saída` | A construção (0–2,5 s) roda só no **primeiro acesso da sessão** (guarde em `sessionStorage`). Se o app ficar pronto antes, pule direto para o lockup. Se demorar, segure no spinner do P (loop de 1,3 s). Lockup visível por ≥ 0,8 s. |
| Página | `carregando(p) → completo → voo para o cabeçalho` | `arcB` = progresso real **suavizado**: `exibido += (alvo − exibido) · (1 − e^(−dt/0,12))`, com velocidade máxima de 1,5/s, para que nunca salte. Sem progresso mensurável, use o spinner do P. Só mostre o loader se a espera passar de 300 ms. |
| Sistema | `skeleton + etapas[i] → resolve` | Cada etapa corresponde a uma promise real (ERP, CRM, painel). O spinner só se completa (`fin`) quando todas terminam. Os dados resolvem com o stagger da referência. |
| Documento | `gerando(p) → pronto → fechamento` | Progresso real da geração do PDF ou proposta. O ladrilho em tema claro segue a cor do documento. |

## Acessibilidade
- `prefers-reduced-motion: reduce`: sem construção, voo ou círculos de transição. Mostre o símbolo sólido, uma barra de progresso linear e um fade de 200 ms entre estados.
- Loader com `role="status"`, `aria-live="polite"` e o texto da etapa atual; o símbolo com `aria-hidden`.
- Contraste: `#81AAF7` sobre `#08080A` = 8,6:1; `#3860AC` sobre `#F2F3F5` = 5,5:1.

## Performance (meta: 60 fps num Android intermediário)
- Anime **transform e opacity**. A revelação do arco por `stroke-dashoffset` na máscara é barata.
- **Auras**: na referência usam `filter: blur()`. Em produção, troque por um `radial-gradient` sem filtro (o visual é o mesmo) ou por um PNG pré-renderizado.
- O brilho do skeleton usa um `background-position` deslocado, sem animar layout.
- Mantenha a contagem de nós baixa durante o splash e só monte as cenas que estão visíveis.

## Fontes
Sora (400, 600), DM Sans (400, 500, 600 + itálico 400) e JetBrains Mono (400, 500) via Google Fonts ou self-host. Use `font-display: swap` e **pré-carregue a Sora 600/400**, porque o wordmark é revelado nos primeiros segundos.
