import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Obras",
  description:
    "Proyectos de energía renovable en Patagonia, Córdoba y todo el país.",
};

export default async function ObrasPage() {
  const { featuredCase, obrasDescription, projects, pageHeroes } =
    await getSiteContent();

  return (
    <>
      <Hero
        title="Nuestras obras"
        subtitle="Portfolio"
        image={pageHeroes.obras}
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Ingeniería aplicada"
            title="Proyectos con impacto"
            description={obrasDescription}
            align="center"
          />
          <div className="mt-12">
            <ProjectGrid projects={projects} />
          </div>
        </div>
      </section>

      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Destacado"
            title={featuredCase.title}
            description={featuredCase.description}
            light
            align="center"
          />
          <div className="mt-8">
            <Button href="/contacto" variant="outline">
              Consultar proyecto similar
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
