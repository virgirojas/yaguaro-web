"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavItem } from "@/types/site-content";

interface HeaderProps {
  navItems: NavItem[];
  logo: string;
  name: string;
  whatsappHref: string;
}

export function Header({ navItems, logo, name, whatsappHref }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const headerBg = menuOpen
    ? "bg-navy shadow-lg"
    : scrolled
      ? "bg-navy/95 shadow-lg shadow-black/20 backdrop-blur-md"
      : "bg-transparent";

  return (
    <>
      {menuOpen && (
        <div
          className="fixed inset-0 z-[90] overflow-y-auto bg-navy lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex min-h-full flex-col px-6 pb-10 pt-28">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-xl px-4 py-4 text-lg font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-accent/25 text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8 border-t border-white/15 pt-8">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-[#25D366] px-4 py-4 text-base font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <header
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-300 ${headerBg}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <nav className="hidden items-center gap-6 lg:flex lg:flex-1">
            {navItems.slice(0, 3).map((item) => (
              <NavLink key={item.href} item={item} active={pathname === item.href} />
            ))}
          </nav>

          <Link href="/" className="relative shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src={logo}
              alt={name}
              width={220}
              height={64}
              className="h-12 w-auto sm:h-14 md:h-16"
              priority
            />
          </Link>

          <nav className="hidden items-center justify-end gap-6 lg:flex lg:flex-1">
            {navItems.slice(3).map((item) => (
              <NavLink key={item.href} item={item} active={pathname === item.href} />
            ))}
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menú</span>
            <div className="flex w-6 flex-col gap-1.5">
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 w-full bg-white transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </header>
    </>
  );
}

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`text-xs font-medium uppercase tracking-[0.15em] transition-colors ${
        active ? "text-accent" : "text-white/70 hover:text-white"
      }`}
    >
      {item.label}
    </Link>
  );
}
