import Image from "next/image";
import Link from "next/link";
import type { NavItem, SiteConfig } from "@/types/site-content";

interface FooterProps {
  navItems: NavItem[];
  siteConfig: SiteConfig;
}

export function Footer({ navItems, siteConfig }: FooterProps) {
  const { contact } = siteConfig;

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={200}
              height={60}
              className="mb-6 h-12 w-auto"
            />
            <p className="text-sm leading-relaxed text-white/70">
              {siteConfig.description}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Navegación
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>{contact.address}</li>
              <li>{contact.headquarters}</li>
              <li>
                <a href={contact.phoneHref} className="hover:text-white">
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-white"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-accent">
              Horarios
            </h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>{contact.hours.weekdays}</li>
              <li>{contact.hours.saturday}</li>
            </ul>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#1f1f1f] py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-white/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>Energía renovable · Córdoba, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
