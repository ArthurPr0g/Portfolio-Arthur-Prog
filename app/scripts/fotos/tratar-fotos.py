# Tratamento das fotos do Arthur para o portfólio (versão 2).
# Uso: python -I tratar2.py <pasta>
# Saídas:
#   sentado.png / sentado.webp — Brasília, recorte de corpo inteiro com fundo transparente
#                               (para "sentar" na borda de um card do site)
#   avatar.png / avatar.webp    — pista, rosto em quadrado para foto redonda
import site, sys
sys.path.append(site.getusersitepackages())
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter
from rembg import remove, new_session
from scipy import ndimage

d = sys.argv[1]
sessao = new_session("isnet-general-use")

def recortar(img):
    rgba = remove(img, session=sessao, alpha_matting=True,
                  alpha_matting_foreground_threshold=240,
                  alpha_matting_background_threshold=12,
                  alpha_matting_erode_size=8)
    a = np.asarray(rgba.getchannel("A")).astype(np.float32)
    # Só a maior região conectada (a pessoa); some o que a IA pegou do fundo.
    rot, n = ndimage.label(a > 40)
    if n > 1:
        tam = ndimage.sum(np.ones_like(a), rot, index=range(1, n + 1))
        maior = 1 + int(np.argmax(tam))
        mascara = ndimage.binary_dilation(rot == maior, iterations=6)
        a = a * mascara
    # Endurece a máscara: some com véus semitransparentes, mantém borda suave.
    t = np.clip((a - 105) / (225 - 105), 0, 1)
    a = (t * t * (3 - 2 * t)) * 255
    am = Image.fromarray(a.astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    a = np.asarray(am).astype(np.float32)
    # Descontamina a cor da borda: usa a cor do interior em vez do fundo vazado.
    rgb = np.asarray(rgba.convert("RGB")).astype(np.float32)
    dentro = (a > 250).astype(np.float32)
    soma = np.stack([ndimage.gaussian_filter(rgb[..., c] * dentro, 6) for c in range(3)], -1)
    peso = ndimage.gaussian_filter(dentro, 6)[..., None]
    interior = soma / np.maximum(peso, 1e-4)
    borda = ((a > 0) & (a < 250))[..., None] & (peso > 0.02)
    k = (1 - a / 255.0)[..., None] * 0.9
    rgb = np.where(borda, rgb * (1 - k) + interior * k, rgb)
    rgba = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8)).convert("RGBA")
    rgba.putalpha(Image.fromarray(a.astype(np.uint8)))
    return rgba

def cor(rgb, contraste=1.06, brilho=1.02, sat=0.95, frio=True):
    rgb = ImageEnhance.Contrast(rgb).enhance(contraste)
    rgb = ImageEnhance.Brightness(rgb).enhance(brilho)
    arr = np.asarray(rgb).astype(np.float32)
    if frio:
        arr[..., 0] *= 0.98
        arr[..., 2] *= 1.02
    rgb = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))
    return ImageEnhance.Color(rgb).enhance(sat)

# ---------- Brasília: corpo inteiro, sentado ----------
bra = Image.open(d + r"\brasilia.jpg").convert("RGB")
r = recortar(bra)

def limpar_claros(rgba, protegidos, y_tenis):
    """Remove manchas claras e sem cor (concreto/vitral) grudadas na borda da silhueta."""
    arr = np.asarray(rgba).astype(np.float32)
    rgb, a = arr[..., :3], arr[..., 3].copy()
    mx, mn = rgb.max(-1), rgb.min(-1)
    sat = (mx - mn) / np.maximum(mx, 1)
    claro = (a > 0) & (mx > 85) & (sat < 0.22)
    yy, xx = np.mgrid[0:a.shape[0], 0:a.shape[1]]
    for (cx, cy, raio) in protegidos:
        claro &= ((xx - cx) ** 2 + (yy - cy) ** 2) > raio ** 2
    claro &= yy < y_tenis
    fora = ndimage.binary_dilation(a < 60, iterations=4)
    rot, n = ndimage.label(claro)
    tocam = set(np.unique(rot[fora & (rot > 0)]))
    remover = np.isin(rot, list(tocam))
    remover = ndimage.binary_dilation(remover, iterations=3)
    a[remover] = 0
    a = np.asarray(Image.fromarray(a.astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))).astype(np.float32)
    out = Image.fromarray(arr[..., :3].astype(np.uint8)).convert("RGBA")
    out.putalpha(Image.fromarray(a.astype(np.uint8)))
    return out, int(remover.sum())

k = bra.width / 1988  # medidas feitas na prévia de 1988 px
protegidos = [(1112 * k, 1093 * k, 24 * k),   # relógio
              (970 * k, 730 * k, 130 * k)]    # rosto (dentes e olhos)
r, removidos = limpar_claros(r, protegidos, y_tenis=1370 * k)
print("pixels claros removidos:", removidos)

# Máscara manual dos tênis: preto contra a base preta da mureta, a IA não separa.
# Contornos traçados à mão sobre a foto original clareada (coordenadas de 2668 px).
from PIL import ImageDraw
TENIS = [
    [(1083, 1940), (1095, 1938), (1120, 1942), (1150, 1960), (1185, 1982), (1215, 1995), (1238, 2028),
     (1232, 2040), (1210, 2048), (1170, 2052), (1130, 2050), (1100, 2042), (1080, 2025), (1072, 2005), (1076, 1975)],
    [(1537, 1960), (1627, 1958), (1643, 1990), (1653, 2033), (1668, 2068), (1680, 2084), (1665, 2090),
     (1640, 2092), (1607, 2094), (1573, 2089), (1540, 2079), (1507, 2065), (1487, 2049), (1482, 2033),
     (1486, 2020), (1498, 2010), (1520, 1990)],
]
esc_orig = bra.width / 2668
manual = Image.new("L", bra.size, 0)
dr = ImageDraw.Draw(manual)
for poli in TENIS:
    dr.polygon([(x * esc_orig, y * esc_orig) for x, y in poli], fill=255)
manual = manual.filter(ImageFilter.GaussianBlur(1.4))
alfa = np.maximum(np.asarray(r.getchannel("A")), np.asarray(manual))
r.putalpha(Image.fromarray(alfa.astype(np.uint8)))
r.save(d + r"\brasilia-recorte.png")
a = np.asarray(r.getchannel("A"))
ys, xs = np.where(a > 20)
x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
m = 12
caixa = (max(0, x0 - m), max(0, y0 - m), min(bra.width, x1 + m), min(bra.height, y1 + m))
corpo = r.crop(caixa)
rgb = cor(corpo.convert("RGB"), contraste=1.05, brilho=1.04)
rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
corpo = Image.merge("RGBA", (*rgb.split(), corpo.getchannel("A")))
# Altura de saída: 1100 px (nítido em tela retina até ~550 px de altura no site)
alvo_h = 1100
esc = alvo_h / corpo.height
corpo = corpo.resize((round(corpo.width * esc), alvo_h), Image.LANCZOS)
# Retoque localizado: vitral cinza preso no vão entre braço e corpo
# (só pixels cinza; pele e tecido preto em volta ficam intactos).
arr = np.asarray(corpo).copy()
reg = arr[505:536, 338:364].astype(np.float32)
mx, mn = reg[..., :3].max(-1), reg[..., :3].min(-1)
cinza = (mx > 85) & (mx < 170) & ((mx - mn) / np.maximum(mx, 1) < 0.12)
cinza = ndimage.binary_dilation(cinza, iterations=1)
reg[..., 3] = np.where(cinza, 0, reg[..., 3])
arr[505:536, 338:364] = reg.astype(np.uint8)
corpo = Image.fromarray(arr)
print("retoque: pixels cinza apagados =", int(cinza.sum()))
corpo.save(d + r"\sentado.png")
corpo.save(d + r"\sentado.webp", quality=90, method=6)
# Linha do assento: topo da mureta, medido na foto original (y ≈ 1597 px em 2497)
assento = (1597 * (bra.height / 2497) - caixa[1]) / (caixa[3] - caixa[1])
print("sentado", corpo.size, "assento_ratio=%.4f" % assento)

# ---------- Pista: avatar quadrado ----------
pista = Image.open(d + r"\gfotos.png").convert("RGB")
s = pista.width / 1080
rp = recortar(pista)
# Quadrado centrado no rosto (rosto ~ x 725, y 610 na versão de 1080)
lado = int(330 * s)
cx, cy = int(725 * s), int(640 * s)
q = rp.crop((cx - lado // 2, cy - lado // 2, cx + lado // 2, cy + lado // 2)).resize((600, 600), Image.LANCZOS)
rgb = cor(q.convert("RGB"))
rgb = rgb.filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=2))
a = q.getchannel("A")
W = H = 600
y, x = np.mgrid[0:H, 0:W].astype(np.float32)
fundo = np.zeros((H, W, 3), np.float32)
fundo[:] = np.array([18, 20, 30], np.float32) + (np.array([10, 10, 14]) - np.array([18, 20, 30])) * (y / H)[..., None]
g = np.exp(-(((x - W * 0.5) ** 2 + (y - H * 0.35) ** 2) / (2 * (W * 0.35) ** 2)))[..., None]
fundo += g * np.array([96, 126, 240], np.float32) * 0.22
fundo = Image.fromarray(np.clip(fundo, 0, 255).astype(np.uint8))
avatar = Image.composite(rgb, fundo, a)
avatar.save(d + r"\avatar.png")
avatar.save(d + r"\avatar.webp", quality=90, method=6)
print("avatar", avatar.size)
