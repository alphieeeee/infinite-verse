type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="flex min-h-[50vh] flex-col justify-center rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white shadow-[0_20px_80px_rgba(0,0,0,0.22)] sm:p-8 lg:p-10">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em]">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl theme-accent">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">{description}</p>
      </div>
    </section>
  );
}
