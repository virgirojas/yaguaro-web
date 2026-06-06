import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SolutionCards } from "@/components/sections/SolutionCards";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Soluciones",
  description:
    "On-Grid, Off-Grid, bombeo solar, BESS, peak shaving y más soluciones energéticas.",
};

export default async function SolucionesPage() {
  const { galleryImages, solutionTypes, solutions, pageHeroes } =
    await getSiteContent();

  return (
    <>
      <Hero
        title="Las soluciones que ofrecemos"
        subtitle="Soluciones"
        image={pageHeroes.soluciones}
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Energías renovables"
            title="Tecnologías integradas"
            description="Diseñamos sistemas híbridos que combinan fuentes solares, eólicas e hídricas con almacenamiento y control inteligente."
            align="center"
          />
          <div className="mt-12">
            <SolutionCards solutions={solutions} />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-display text-2xl font-bold text-navy">
            Tipos de solución
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {solutionTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent-dark"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Galería"
            title="Proyectos en acción"
            align="center"
          />
          <div className="mt-10">
            <ImageGallery images={galleryImages} />
          </div>
          <div className="mt-10 text-center">
            <Button href="/contacto" variant="primary">
              Consultá tu proyecto
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
