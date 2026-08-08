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
        <ol className="flex flex-wrap gap-2 font-semibold">
          {items.map((item, index) => {
            const isCurrentPage = index === items.length - 1;
            const label = item.label.toUpperCase();

            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-2">
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-current={isCurrentPage ? "page" : undefined}
                    className={isCurrentPage ? "theme-accent" : "transition-colors hover:text-[var(--theme-accent)]"}
                  >
                    {label}
                  </Link>
                ) : (
                  <span aria-current={isCurrentPage ? "page" : undefined} className={isCurrentPage ? "theme-accent" : undefined}>
                    {label}
                  </span>
                )}
                {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
              </li>
            );
          })}
        </ol>
      </AnimPanning>
    </nav>
  );
}
