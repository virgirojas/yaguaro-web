import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/ContactForm";
import { Hero } from "@/components/sections/Hero";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getSiteContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contactá a Yaguaro para consultas sobre proyectos de energía renovable.",
};

export default async function ContactoPage() {
  const { siteConfig, pageHeroes } = await getSiteContent();
  const { contact } = siteConfig;

  return (
    <>
      <Hero
        title="Contacto"
        subtitle="Escribinos"
        image={pageHeroes.contacto}
        compact
      />

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Estamos para ayudarte"
                title="¿Te queda más cómodo por mail?"
                description="Completá el formulario y nos pondremos en contacto a la brevedad. También podés escribirnos por WhatsApp o llamarnos directamente."
              />

              <div className="mt-10 space-y-6">
                <ContactInfo label="Dirección" value={contact.address} />
                <ContactInfo label="Sede central" value={contact.headquarters} />
                <ContactInfo
                  label="Teléfono"
                  value={contact.phone}
                  href={contact.phoneHref}
                />
                <ContactInfo
                  label="WhatsApp"
                  value={contact.whatsapp}
                  href={contact.whatsappHref}
                  external
                />
                <ContactInfo
                  label="Email"
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                <div>
                  <p className="text-sm font-medium text-muted">Horarios</p>
                  <p className="mt-1 text-navy">{contact.hours.weekdays}</p>
                  <p className="text-navy">{contact.hours.saturday}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
              <h2 className="mb-6 font-display text-xl font-bold text-navy">
                Enviá tu consulta
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactInfo({
  label,
  value,
  href,
  external,
}: {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-muted">{label}</p>
      {href ? (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="mt-1 block font-medium text-accent-dark hover:underline"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 font-medium text-navy">{value}</p>
      )}
    </div>
  );
}
