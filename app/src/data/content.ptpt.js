// Versão de Portugal (pt-PT) do conteúdo de content.js, gerada pelo conversor
// de ptpt.js. Só textos mudam; identificadores (slug), links, imagens, nomes de
// tecnologias e as citações dos depoimentos (palavras dos clientes) ficam iguais.
import { paraPtPt } from "../ptpt.js";

const c = paraPtPt;

export function adaptarPtPt(PT) {
  return {
    ...PT,
    PROJECTS: PT.PROJECTS.map((p) => ({
      ...p,
      title: c(p.title),
      meta: c(p.meta),
      desc: c(p.desc),
      linkLabel: p.linkLabel && !/\./.test(p.linkLabel) ? c(p.linkLabel) : p.linkLabel,
      problema: c(p.problema),
      solucao: c(p.solucao),
      resultado: c(p.resultado),
      processo: p.processo.map(c),
      beforeAfter: p.beforeAfter?.map((b) => ({ ...b, label: c(b.label) })),
      gallery: p.gallery.map((g) => ({ ...g, caption: c(g.caption) })),
    })),
    TICKER: PT.TICKER.map(c),
    PIPELINE: PT.PIPELINE.map((p) => ({ ...p, label: c(p.label) })),
    PILARES: PT.PILARES.map(c),
    ETAPAS: PT.ETAPAS.map((e) => ({ ...e, title: c(e.title), desc: c(e.desc) })),
    FERRAMENTAS: PT.FERRAMENTAS.map((f) => ({ ...f, desc: c(f.desc) })),
    COMPETENCIAS: PT.COMPETENCIAS.map((x) => ({ ...x, area: c(x.area), items: x.items.map(c) })),
    CARREIRA: PT.CARREIRA.map((x) => ({ ...x, role: c(x.role), desc: c(x.desc) })),
    STATS: PT.STATS.map((s) => ({ ...s, label: c(s.label) })),
    DEPOIMENTOS: PT.DEPOIMENTOS.map((d) => ({ ...d, role: c(d.role) })),
  };
}
