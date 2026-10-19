import Reveal from "../Reveal";
import { FOTO } from "../../data/content";
import { useLang } from "../../i18n";
import "./SobreSection.css";

export default function SobreSection() {
  const { t, content } = useLang();
  const { PILARES } = content;
  return (
    <section id="sobre" className="section section--bordered">
      <div className={"container" + (FOTO ? " sobre-com-foto" : "")}>
        {/* Foto só aparece quando FOTO estiver preenchida em data/content.js. */}
        {FOTO && (
          <Reveal as="figure" className="sobre-foto">
            <img src={FOTO} alt="Arthur Prog" width="560" height="700" loading="lazy" />
          </Reveal>
        )}
        <div className="sobre-conteudo">
          <Reveal as="p" className="eyebrow">
            {t("Quem sou", "About me")}
          </Reveal>
          <Reveal as="h2" className="heading-lg sobre-heading">
            {t("Product Owner com perfil técnico. Construo, não só coordeno.", "A Product Owner with a technical background. I build, not just coordinate.")}
          </Reveal>
          <div className="sobre-grid">
            <Reveal as="p" className="sobre-text">
              {t(
                "Atuei como Product Owner porque adoro traduzir problemas em produtos. Mas minha maior característica é unir gestão de produto, UX/UI, desenvolvimento e IA em uma única entrega — participo de toda a construção, do primeiro insight ao deploy.",
                "I've worked as a Product Owner because I love turning problems into products. But what sets me apart is bringing product management, UX/UI, development and AI together in a single delivery — I'm involved in the whole build, from the first insight to deploy."
              )}
            </Reveal>
            <Reveal as="p" delay={70} className="sobre-text">
              {t(
                "Isso significa que a estratégia que desenho é executável, o design que proponho é implementável e o código que escrevo serve ao produto. Nada se perde na tradução entre áreas — porque não há tradução: sou o mesmo profissional em todas elas.",
                "That means the strategy I design is executable, the design I propose is buildable and the code I write serves the product. Nothing gets lost in translation between teams — because there is no translation: I'm the same person in all of them."
              )}
            </Reveal>
          </div>
          <Reveal as="div" className="sobre-tags">
            {PILARES.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
