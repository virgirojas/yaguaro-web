import Image from "next/image";

interface Solution {
  title: string;
  description: string;
  icon: string;
}

export function SolutionCards({ solutions }: { solutions: Solution[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {solutions.map((solution) => (
        <article
          key={solution.title}
          className="group rounded-2xl border border-border bg-surface p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/10"
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-accent/10 transition-colors group-hover:bg-accent/20">
            <Image
              src={solution.icon}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
            />
          </div>
          <h3 className="font-display text-xl font-bold text-navy">
            {solution.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {solution.description}
          </p>
        </article>
      ))}
    </div>
  );
}
