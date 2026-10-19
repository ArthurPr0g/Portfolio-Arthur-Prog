// Tabela em euro para clientes da Europa (só neste portfólio). Mesmos textos da
// versão em inglês (planos.en.js); mudam preços, orçamento do quiz e um texto.
//
// Como os preços foram definidos (pesquisa de 19/10/2026): um pouco abaixo do piso
// do que freelancers cobram na Europa Ocidental (Alemanha, Reino Unido, França).
// Sites: freelancer na Alemanha cobra 800–2.500 € (one-page) e 2.000–5.000 € (5–8
// páginas). Lojas: freelancer no Reino Unido 2.500–6.000 £. Logo: França 300–2.000 €.
// Manutenção: 50–200 €/mês. Gestão: horas × 70–91 €/h, cobrada a cerca de 1/3.
import { DADOS_EN } from "./planos.en.js";

const PRECOS = {
  site: [[790, 49], [1790, 49], [3290, 49]],
  loja: [[1390, 79], [2690, 79], [4990, 79]],
  erp: [[2690, 89], [5390, 129], [8990, 179]],
};
const MARCA = [350, 450, 720];

const comPreco = (cat) => ({
  ...DADOS_EN.PROD[cat],
  p: DADOS_EN.PROD[cat].p.map((x, i) => ({ ...x, price: PRECOS[cat][i][0], mo: PRECOS[cat][i][1] })),
});

export const DADOS_EU = {
  ...DADOS_EN,
  PROD: { site: comPreco("site"), loja: comPreco("loja"), erp: comPreco("erp") },
  BRAND: DADOS_EN.BRAND.map((x, i) => ({
    ...x,
    price: MARCA[i],
    combo: MARCA[i],
    ideal: i === 2 ? `Logo + identity together, cheaper than separately (€${(MARCA[0] + MARCA[1]).toLocaleString("en-IE")}): a complete brand on your website, social media and print.` : x.ideal,
  })),
  ORCAMENTO: { caps: [2000, 6000, Infinity], rotulos: ["Up to €2,000", "€2,000 – €6,000", "Over €6,000"] },
};
