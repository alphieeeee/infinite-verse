import AnimPanning from "../gsap/AnimPanning";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="flex min-h-[50vh] flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
      <div className="max-w-3xl">
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
          <p className="text-sm font-semibold uppercase tracking-[0.35em]">{eyebrow}</p>
        </AnimPanning>
        <AnimPanning
          duration={0.8}
          delay={0.4}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl theme-accent">{title}</h1>
        </AnimPanning>
        <AnimPanning
          duration={0.8}
          delay={0.6}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">{description}</p>
        </AnimPanning>
      </div>
    </section>
  );
}
