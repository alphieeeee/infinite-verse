import Link from "next/link";
import AnimPanning from "../gsap/AnimPanning";

type Item = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Item[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <AnimPanning
        duration={0.8}
        delay={0.2}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
        onScroll={false}
      >
        <ol className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href ? <Link href={item.href}>{item.label.toUpperCase()}</Link> : <span>{item.label.toUpperCase()}</span>}
              {index < items.length - 1 ? <span>/</span> : null}
            </li>
          ))}
        </ol>
      </AnimPanning>
    </nav>
  );
}
