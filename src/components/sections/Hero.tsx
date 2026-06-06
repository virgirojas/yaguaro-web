import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  cta?: { label: string; href: string };
  compact?: boolean;
}

export function Hero({ title, subtitle, image, cta, compact }: HeroProps) {
  return (
    <section
      className={`relative flex items-end overflow-hidden bg-navy ${
        compact ? "min-h-[50vh]" : "min-h-screen"
      }`}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover opacity-60"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-20 pt-32 sm:px-6 lg:px-8 lg:pb-28">
        {subtitle && (
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            {subtitle}
          </p>
        )}
        <h1 className="max-w-4xl font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {cta && (
          <div className="mt-8">
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
          </div>
        )}
      </div>

      {!compact && (
        <a
          href="#contenido"
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/60"
          aria-label="Ir al contenido"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      )}
    </section>
  );
}
