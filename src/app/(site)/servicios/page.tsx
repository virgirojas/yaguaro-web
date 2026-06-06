import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { ServiceAccordion } from "@/components/sections/ServiceAccordion";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Energías renovables, infraestructura eléctrica, electromovilidad y gestión de trámites.",
};

export default async function ServiciosPage() {
  const { services, pageHeroes } = await getSiteContent();

  return (
    <>
      <Hero
        title="Nuestros Servicios"
        subtitle="Servicios"
        image={pageHeroes.servicios}
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Áreas de trabajo"
            title="Soluciones integrales de ingeniería"
            description="Desde el diseño hasta la ejecución y mantenimiento, acompañamos cada etapa de tu proyecto energético."
            align="center"
          />
          <div className="mt-12">
            <ServiceAccordion services={services} />
          </div>
        </div>
      </section>
    </>
  );
}
