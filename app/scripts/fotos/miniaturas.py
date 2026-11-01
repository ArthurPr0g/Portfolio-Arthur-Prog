"""Gera versões menores das capas (640 e 1200 px de largura) para o srcset.

As capas originais têm 2000 px e aparecem em cartões de ~350 px: no celular o
navegador baixa a menor que serve. Rodar de novo ao trocar ou incluir uma capa
(e pôr o arquivo em CAPAS de src/data/miniaturas.js):

    python scripts/fotos/miniaturas.py public/assets/<capa>.webp [...]
"""
import sys
from pathlib import Path

from PIL import Image

LARGURAS = (640, 1200)

for arq in map(Path, sys.argv[1:]):
    im = Image.open(arq)
    for w in LARGURAS:
        if im.width <= w:
            continue
        h = round(im.height * w / im.width)
        saida = arq.with_name(f"{arq.stem}-{w}{arq.suffix}")
        im.resize((w, h), Image.LANCZOS).save(saida, "WEBP", quality=80, method=6)
        print(f"{saida.name}: {saida.stat().st_size // 1024} KB")
