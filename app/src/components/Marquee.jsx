import { TICKER } from "../data/content";
import "./Marquee.css";

function Group() {
  return (
    <div className="marquee__group">
      {TICKER.map((t, i) => (
        <span key={i} className="marquee__item">
          {t}
          <span className="marquee__sep" />
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="marquee">
      <div className="marquee__track">
        <Group />
        <Group />
      </div>
    </div>
  );
}
