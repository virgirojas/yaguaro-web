"use client";

import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  label: string;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

export function Stats({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <p className="font-display text-5xl font-bold text-accent sm:text-6xl">
            <AnimatedNumber value={stat.value} />
            <span className="text-accent/60">+</span>
          </p>
          <p className="mt-2 text-sm font-medium uppercase tracking-wider text-white/70">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
