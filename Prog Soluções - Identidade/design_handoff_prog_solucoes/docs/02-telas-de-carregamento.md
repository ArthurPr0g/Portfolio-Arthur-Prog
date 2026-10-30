# 02 — Telas de carregamento (desktop 1920×1080 e mobile 390×844)

**A fonte da verdade são os arquivos `referencias-html/prog-loaders.jsx` (desktop) e `prog-loaders-mobile.jsx` (mobile).** Todo valor é calculado a partir do tempo `T`, com funções `enter`, `draw` e `pop` no formato `(início, fim, de = 0, para = 1)`. A função limita o valor antes do início e depois do fim. Porte essas expressões linha por linha.

Início de cada cena: **Splash 0 · Site 6,5 · Sistema 12,0 · Documento 18,2 · fim 23,7** (o fim volta ao começo; o último quadro é preto puro, igual ao primeiro).

## Componente `Mark` (o símbolo animável)
Props: `cx, cy, s` (centro e lado da caixa de 48u em px), `stem` (0..1, cresce de baixo para cima e passa de 1 com `pop`), `arcA` e `arcB` (início e fim do trecho visível do arco, de 0 a 1 ao longo da linha central), `track` (opacidade do arco inteiro como trilho), `ring` (0..1, círculo tracejado desenhado em sentido horário a partir do topo), `ringOp`, `rot` (graus, em torno de 26.25,18), `ringScale`, cores e `ringW/dash/gap` (em px de tela).

Como revelar o arco: aplique ao path do arco uma máscara com o path `M20 10H26.25A8 8 0 0 1 26.25 26H20`, traço branco de 8,8u, `pathLength=1`, `stroke-dasharray="(arcB−arcA) 3"` e `stroke-dashoffset=−arcA`.

## DESKTOP
### 1. Splash, ou abertura do app (0–6,5 s)
| t (s) | O que acontece | Curva |
|---|---|---|
| 0–1,2 | Auras (azul no topo, roxa à direita) de 0 a 1 | draw |
| 0–0,9 | Grade de 40 px (4u) aparece; máscara radial com raio de 0 a 900 px (enter 0–1,4) | draw |
| 0,3 + i·0,12 (duração 0,8) | 3 guias horizontais (y = 6, 30 e 42u) desenham da esquerda para a direita, 1,5 px, acento a 34–50% | draw |
| 0,5 + i·0,12 (duração 0,8) | 2 guias verticais (x = 9,75 e 38,25u) desenham de cima para baixo | draw |
| 0,8–1,6 | Círculo tracejado desenha 360° (`#B1D2FF`, 1,6 px, traços de 7/6 px) | draw |
| 1,3–1,95 | **Haste cresce** com overshoot | pop |
| 1,7–2,5 | **Arco revela** ao longo da linha central | draw |
| 1,95 + i·0,18 (duração 0,65) | Cotas "8u", "36u", "r 12u" e "2,5u" (JetBrains Mono 22 px, `#B1D2FF`) sobem 12 px | enter |
| 0–3,4 | Marca encolhe de 500 para 480 px (push lento) | draw |
| 3,05–3,45 | Cotas somem | draw |
| 3,25–3,95 | Guias recolhem (o início avança até o fim); círculo some em 3,3–3,8 | draw |
| 3,35–4,35 | Marca vai para o lockup: centro x de 960 para 590, tamanho de 480 para 156 px | enter |
| 3,85–4,75 | Wordmark de 100 px revela (clip da direita e translateX −25 px até 0), x = 682,3 | enter |
| 0,2–4,3 | Progresso nos keyframes [0, .22, .48, .71, 1] em t = [0,2; 1,2; 2,2; 3,0; 4,3] | draw por trecho |
| 5,0–5,5 | Bloco "CARREGANDO 000%" e barra (420×3 px, y = 934) somem | draw |
| 5,55–6,0 | Wordmark esconde; marca vai para (960, 540) com 128 px em 5,9–6,65 | draw |
| 6,05–6,7 | Arco **rebobina** de 1 para 0 e o trilho sobe de 0 para 20% (o arco vira a barra de progresso) | draw |

HUD: "PROG · 01" (`#B1D2FF`) e "SÍMBOLO · GRADE 48U" (`#6D727C`), Mono 22 px, +0,22em, a 56 px do topo.

### 2. Site (S = 6,5)
- Progresso = `interpolate([0,3; 1,2; 1,7; 2,4; 2,9] → [0; .38; .46; .86; 1])` em `T − S`, com `draw` em cada trecho. Ele **controla o arco** (`arcB`). Simula a rede: arranca, segura e termina. Em produção, use o progresso real (ver doc 04).
- Círculo tracejado gira a 50°/s, com opacidade de 0 a .75 em S−0,2 até S+0,4.
- Ao concluir (S+2,9–3,5): o círculo escala de 1 para 1,6 e some (enter); o texto "CARREGANDO PÁGINA 000%" (Mono 20 px, y = 680) some.
- S+3,0–3,8: a marca **voa para o cabeçalho**, centro (111,44; 64), caixa de 52 px (enter). A linha do cabeçalho em y = 128 desenha em S+3,2–4,0.
- Itens do menu ("Projetos, Sobre, O que construo, Método, Contato, **Planos**" + botão "Vamos conversar") entram com stagger de 0,06 s a partir de S+3,4 (duração 0,6), subindo 10 px. Usam DM Sans 22 px `#9BA1AB`; "Planos" em 600 `#B1D2FF`.
- Hero a 96 px da esquerda e 300 px do topo: pílula "● Disponível para novos projetos" (S+3,6); título em Sora 600 de 124 px, lh 1,04 e −0,045em, linha a linha com máscara (translateY de 110% a 0, stagger 0,12 a partir de S+3,7, duração 0,8). O itálico "vendem" e "organizam" usa a mesma família do título, em itálico 400, com o gradiente `#B1D2FF → #43D5DC` a 120°. Os botões entram em S+4,0–4,6.
- Saída: S+4,85–5,3, opacidade a 0 e subida de 18 px.

### 3. Sistema (Y = 12,0)
- Transição (S+5,0–5,8): a sidebar (300 px, `#0D0E13`) entra pela esquerda; a marca vai para (53,06; 64) com 44 px e o texto passa de 33 para 28 px (enter). O conteúdo principal aparece em S+5,3–6,0.
- Esqueleto: base oklch(70% 0 0 / .07) e uma faixa de brilho de 600 px que atravessa a tela a cada 1,6 s.
- Fundo escurecido rgba(8,8,10,.55) de Y−0,2 a Y+0,3. Card de 600×430 centrado em (1110, 540), raio 32, `#12141A`, sombra `0 40px 120px rgba(0,0,0,.55)`, entrando com `pop` em Y−0,1 até Y+0,5 (escala .92 → 1).
- **Spinner do P** em loop de 1,3 s: fase `ph = (t mod 1.3)/1.3`, `arcB = draw(clamp(ph/.6))` e `arcA = draw(clamp((ph−.4)/.6))`. O trilho fica em 16% e o círculo tracejado gira a 90°/s com opacidade .55. Ao terminar (Y+3,0–3,45), o arco se completa: `arcA·(1−f)`, `arcB + (1−arcB)·f`.
- Etapas "Conectando ao ERP", "Sincronizando CRM" e "Montando painel": a etapa i aparece em Y+0,3+0,9i e conclui em Y+1,2+0,9i. Pendente = anel tracejado girando; concluída = ponto verde `#5FD37F` que surge com escala. Barra de progresso nos keyframes [0,3; 1,2; 2,1; 3,0] → [0; .34; .67; 1].
- Card sai em Y+3,5–4,0. Os dados **resolvem** em Y+3,9 com stagger (enter de 0,7 s). As barras do gráfico crescem a partir de Y+4,0+0,04i (duração 0,8).
- Y+5,2–6,2: **círculo de papel** (`#F2F3F5`) expande do centro até 1150 px, cobrindo tudo.

### 4. Documento (D = 18,2), tema claro
- Ladrilho de 264 px em (960, 470), branco, raio 34, borda 1,5 px de oklch(50% .13 262 / .35), grade interna de 22 px. Entra com `pop` em D+0,15–0,75 (escala .86 → 1).
- Guias `#3860AC` em D+0,4+0,1i; círculo em D+0,7–1,4; haste em D+1,1–1,6 (pop); arco em D+1,4–2,2; rótulo "PROG · 02" no canto superior direito.
- "GERANDO PROPOSTA COMERCIAL 000%" (Mono 20 px, `#5D626B`) e barra `#3860AC`, com keyframes [0,4; 1,4; 2,3; 3,4] → [0; .31; .62; 1].
- D+3,4–3,8: grade e guias somem e o ladrilho vira o ícone limpo. Antecipação de +5% em D+3,9–4,1 e colapso para escala 0 em D+4,1–4,5.
- D+4,35–5,3: **círculo de tinta** `#08080A` expande a partir de (960, 470) até cobrir a tela. É o fechamento do loop.

## MOBILE (390×844 pt; render 3x = 1170×2532)
Mesma timeline e mesmas curvas. As diferenças estão abaixo; os valores exatos estão em `prog-loaders-mobile.jsx`.
- **Splash**: marca de 250 → 240 pt em (195, 400); grade de 20 pt; cotas em Mono 11 pt. O lockup é **vertical**: marca em (195, 360) com 104 pt e wordmark de 32 pt centralizado (x = 83,9, cy = 438). Progresso de 220 pt em y = 716. HUD a 74 pt do topo, abaixo da status bar.
- **Site**: loader em (195, 400) com 88 pt e texto em y = 466. A marca voa para o cabeçalho, centro (30,1; 76) com caixa de 34 pt e texto de 22 pt em x = 49,2; linha do cabeçalho em y = 112; menu de 2 traços à direita. Hero: título de 48 pt em 5 linhas ("Produtos / digitais que / *vendem* e / *organizam* o / seu negócio."); botões de altura total em pílula de 54 pt empilhados.
- **Sistema**: o cabeçalho **permanece** (a mesma logo). Tab bar de 84 pt sobe por baixo (Início, Projetos, Clientes, Mais). KPIs em 2×2 (169×100 pt) e gráfico de 8 barras. O loader é um **bottom sheet** (top 444, raio 28, com alça) que sobe com `pop` e desce em Y+3,5–4,0. Spinner de 84 pt.
- **Documento**: ladrilho de 168 pt em (195, 380) e texto "GERANDO PROPOSTA". O círculo de papel e o de tinta usam o centro da tela, com raio até 480 e 520 pt.
- Traço do círculo tracejado no mobile: 0,7 pt, com traços de 3,2/2,8 pt.
- A status bar é apenas ilustrativa; o sistema operacional desenha a real.
