import Image from "next/image";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Stats } from "@/components/sections/Stats";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const { nosotrosContent } = await getSiteContent();
  return {
    title: "Nosotros",
    description: nosotrosContent.intro,
  };
}

export default async function NosotrosPage() {
  const { aboutContent, nosotrosContent, siteConfig } = await getSiteContent();
  return (
    <>
      <Hero
        title={nosotrosContent.title}
        subtitle="Sobre nosotros"
        image={nosotrosContent.image}
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Nuestra misión"
                title="Ingeniería de precisión en energías renovables"
              />
              <p className="mt-6 text-lg leading-relaxed text-muted">
                {nosotrosContent.intro}
              </p>
              <div className="mt-8 space-y-4 text-muted">
                {aboutContent.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={nosotrosContent.image}
                alt="Yaguaro ingeniería"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Equipo multidisciplinario"
            title="Desde diversos campos disciplinarios"
            description={aboutContent.disciplines}
            light
            align="center"
          />
          <div className="mx-auto mt-12 max-w-2xl">
            <Stats stats={siteConfig.stats} />
          </div>
        </div>
      </section>
    </>
  );
}
