import Reveal from "../Reveal";
import { PILARES } from "../../data/content";
import "./SobreSection.css";

export default function SobreSection() {
  return (
    <section id="sobre" className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          Quem sou
        </Reveal>
        <Reveal as="h2" className="heading-lg sobre-heading">
          Product Owner com perfil técnico. Construo, não só coordeno.
        </Reveal>
        <div className="sobre-grid">
          <Reveal as="p" className="sobre-text">
            Atuei como Product Owner porque adoro traduzir problemas em produtos. Mas minha maior característica é
            unir gestão de produto, UX/UI, desenvolvimento e IA em uma única entrega — participo de toda a
            construção, do primeiro insight ao deploy.
          </Reveal>
          <Reveal as="p" delay={70} className="sobre-text">
            Isso significa que a estratégia que desenho é executável, o design que proponho é implementável e o
            código que escrevo serve ao produto. Nada se perde na tradução entre áreas — porque não há tradução: sou
            o mesmo profissional em todas elas.
          </Reveal>
        </div>
        <Reveal as="div" className="sobre-tags">
          {PILARES.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
