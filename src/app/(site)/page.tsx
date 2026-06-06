import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/sections/Hero";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SolutionCards } from "@/components/sections/SolutionCards";
import { Stats } from "@/components/sections/Stats";
import { getSiteContent } from "@/lib/site-content";

export default async function HomePage() {
  const {
    aboutContent,
    featuredCase,
    heroContent,
    obrasDescription,
    projects,
    carouselImages,
    siteConfig,
    solutionTypes,
    solutions,
  } = await getSiteContent();
  return (
    <>
      <Hero
        title={heroContent.title}
        subtitle={siteConfig.tagline}
        image={heroContent.image}
        cta={{ label: "Conocenos", href: "/nosotros" }}
      />

      <div id="contenido">
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Quiénes somos"
                  title={aboutContent.title}
                />
                <div className="mt-6 space-y-4 text-muted">
                  {aboutContent.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <div className="mt-8">
                  <Button href="/nosotros" variant="primary">
                    Nosotros
                  </Button>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-navy/20">
                <Image
                  src={aboutContent.image}
                  alt="Equipo Yaguaro"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navy-light py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ImageGallery images={carouselImages} />
          </div>
        </section>

        <section className="bg-navy py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <SectionHeading
                  eyebrow="Experiencia"
                  title="Desde diversos campos disciplinarios"
                  description={aboutContent.disciplines}
                  light
                />
              </div>
              <Stats stats={siteConfig.stats} />
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                eyebrow="Soluciones"
                title="Energías renovables integradas"
                description="Conocé todas nuestras propuestas para residencial, comercial e industrial."
              />
              <Button href="/soluciones" variant="secondary">
                Ver soluciones
              </Button>
            </div>
            <SolutionCards solutions={solutions} />
            <div className="mt-10 flex flex-wrap gap-3">
              {solutionTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-navy shadow-sm"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={featuredCase.image}
                  alt={featuredCase.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <SectionHeading
                  eyebrow="Caso destacado"
                  title={featuredCase.title}
                  description={featuredCase.description}
                  light
                />
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/obras" variant="outline">
                    Ver obras
                  </Button>
                  <Button
                    href={siteConfig.contact.whatsappHref}
                    variant="whatsapp"
                    external
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Obras"
              title="Proyectos desarrollados"
              description={obrasDescription}
            />
            <div className="mt-12">
              <ProjectGrid projects={projects.slice(0, 3)} />
            </div>
            <div className="mt-10 text-center">
              <Button href="/obras" variant="primary">
                Ver todas las obras
              </Button>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              <SectionHeading
                eyebrow="Contacto"
                title="Hablemos de tu proyecto"
                description="Estamos en Córdoba, Argentina. Escribinos o llamanos para consultar sobre tu próximo proyecto energético."
              />
              <div className="space-y-4 rounded-2xl border border-border bg-background p-8">
                <div>
                  <p className="text-sm font-medium text-muted">Dirección</p>
                  <p className="mt-1 font-medium text-navy">
                    {siteConfig.contact.address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Teléfono</p>
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="mt-1 block font-medium text-accent-dark hover:underline"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">Email</p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="mt-1 block font-medium text-accent-dark hover:underline"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <Button href="/contacto" variant="primary">
                  Formulario de contacto
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
