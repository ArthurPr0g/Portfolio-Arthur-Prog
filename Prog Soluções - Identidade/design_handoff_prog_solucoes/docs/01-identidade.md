# 01 — Identidade: símbolo P modular

## Geometria (grade de 48u, origem no canto superior esquerdo)
- **Haste**: `rect x=9.75 y=6 w=8 h=36 rx=4` (pílula), cor neutra (`#F4F5F7` no escuro e `#08080A` no claro).
- **Arco**: `M24.25 6H26.25A12 12 0 0 1 26.25 30H24.25A4 4 0 0 1 24.25 22H26.25A4 4 0 0 0 26.25 14H24.25A4 4 0 0 1 24.25 6Z`, em acento (`#81AAF7` no escuro e `#3860AC` no claro).
  - Centro do bojo: (26.25, 18). Raio externo 12u, interno 4u e braço 8u. As pontas são arredondadas com raio 4.
- **Corte** entre a haste e o arco: 2,5u (haste até x = 17.75; arco a partir de x = 20.25).
- **Caixa visível**: x de 9.75 a 38.25 e y de 6 a 42, ou seja, 28,5u × 36u. O símbolo fica centrado em (24, 24) na grade de 48u.
- **Construção (planta)**: círculo tracejado com centro (26.25, 18) e r = 12; guias horizontais em y = 6, 30 e 42; guias verticais em x = 9.75 e 38.25; grade a cada 4u.
- **Desenho pequeno (abaixo de 24 px)**: haste `rect x=9 y=6 w=9 h=36 rx=4.5` e arco `M24.5 6H26.5A12.5 12.5 0 0 1 26.5 31H24.5A4.5 4.5 0 0 1 24.5 22H26.5A3.5 3.5 0 0 0 26.5 15H24.5A4.5 4.5 0 0 1 24.5 6Z`. O corte cai para 2u. Em 16 px, use **monocromático**.

## Regra fixa de cor
A **haste é sempre neutra e o arco é sempre acento**. Nunca inverta. Sem gradiente, sombra, brilho ou contorno no símbolo.

## Sistema responsivo (2c)
| Tamanho do símbolo | Versão |
|---|---|
| ≥ 120 px | **Planta (2a)**: ladrilho, grade, guias e círculo tracejado (`assets/planta/`) |
| 48–120 px | **Guia**: símbolo com o círculo tracejado; o círculo pode girar em loading |
| 24–48 px | **Sólido** |
| < 24 px | **Desenho pequeno**; em 16 px, monocromático (favicon) |

## Lockups
- **Horizontal (principal)**: o símbolo tem altura H. "Prog" em Sora 600 e " Soluções" em Sora 400, com font-size = **0,857·H**, letter-spacing −0,03em e line-height 1, centralizado verticalmente com o símbolo. O espaço entre a borda visível do símbolo e o texto é **0,393·H**. Cor de "Soluções": `#A3A8B2` no escuro e `#5D626B` no claro.
  - Medida de referência: "Prog Soluções" em Sora a 100 px com −0,03em mede **≈694 px** de largura.
  - Exemplos usados: no cabeçalho desktop, símbolo com caixa de 52 px (altura visível 39 px) e texto de 33 px, a 96 px da borda esquerda; na sidebar, caixa de 44 px e texto de 28 px, a 40 px da borda; no cabeçalho mobile, caixa de 34 px e texto de 22 px, a 20 px da borda.
- **Vertical**: símbolo acima e texto centralizado abaixo. Texto = 0,82·H e distância vertical ≈ 0,4·H. Use em capas, login, splash mobile e Reels.
- **Compacta**: texto em duas linhas ("Prog" / "Soluções"), para sidebars e assinaturas.

## Área de proteção e tamanhos mínimos
- Área de proteção: x = 2/3 da altura do símbolo, em todos os lados.
- Horizontal: mínimo de 104 px de largura (25 mm impresso). Símbolo: mínimo de 16 px, com o desenho pequeno abaixo de 24 px.

## Não fazer
Aplicar gradiente, sombra ou contorno no símbolo. Usar ciano, verde, roxo ou qualquer cor fora da paleta. Fechar o corte (exceto no desenho pequeno). Inverter as cores entre haste e arco. Distorcer, rotacionar ou trocar a fonte. Usar sobre foto sem um fundo liso por trás.

## Arquivos
O SVG é a fonte de verdade da forma. Nos lockups, o texto está como `<text>` em Sora: **converta em curvas** (Figma ou Illustrator) antes de usar como arquivo-mestre, ou carregue a Sora na página.
