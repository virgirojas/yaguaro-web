import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.title}
          className="group overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:ring-accent/20"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          <div className="p-6">
            <h3 className="font-display text-lg font-bold text-navy">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
