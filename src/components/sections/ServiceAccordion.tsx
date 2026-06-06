"use client";

import { useState } from "react";

interface Service {
  title: string;
  items: string[];
}

export function ServiceAccordion({ services }: { services: Service[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {services.map((service, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={service.title}
            className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-accent/5"
            >
              <span className="font-display text-lg font-bold text-navy">
                {service.title}
              </span>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="space-y-2 border-t border-border px-6 py-5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-muted"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
