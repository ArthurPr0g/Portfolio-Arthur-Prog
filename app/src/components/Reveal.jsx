import { useReveal } from "../hooks/useReveal";
import { useTilt } from "../hooks/useTilt";

function mergeRefs(a, b) {
  return (node) => {
    if (a) a.current = node;
    if (b) b.current = node;
  };
}

export default function Reveal({
  as: Tag = "div",
  direction = "up",
  delay = 0,
  tilt = false,
  className = "",
  style,
  children,
  ...rest
}) {
  const [revealRef, visible] = useReveal();
  const tiltRef = useTilt();

  const dirClass = direction === "left" ? "reveal--left" : direction === "right" ? "reveal--right" : "";
  const classes = ["reveal", dirClass, tilt ? "tilt" : "", visible ? "is-in" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={tilt ? mergeRefs(revealRef, tiltRef) : revealRef}
      className={classes}
      style={{ transitionDelay: delay ? delay + "ms" : undefined, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
