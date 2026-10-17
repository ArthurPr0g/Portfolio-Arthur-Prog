import Reveal from "../Reveal";
import { useCountUp } from "../../hooks/useCountUp";
import { STATS as STATS_PT } from "../../data/content";
import { useLang } from "../../i18n";
import "./StatsSection.css";

// Os alvos da contagem são os mesmos nos dois idiomas; vêm do português para a
// animação não reiniciar ao trocar de idioma.
const ALVOS = STATS_PT.map((s) => s.target);

export default function StatsSection() {
  const { t, content } = useLang();
  const { STATS } = content;
  const [sectionRef, values] = useCountUp(ALVOS);

  return (
    <section ref={sectionRef} className="section section--bordered">
      <div className="container">
        <Reveal as="p" className="eyebrow">
          {t("Números", "Numbers")}
        </Reveal>
        <Reveal as="h2" className="heading-lg">
          {t("Produto entregue, não teórico.", "Products shipped, not theory.")}
        </Reveal>
        <div className="stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="stats-cell">
              <div className="stats-cell__value">
                {values[i]}
                {s.suffix}
              </div>
              <div className="stats-cell__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
