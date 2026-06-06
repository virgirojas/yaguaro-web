"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ImageField } from "@/components/admin/ImageField";
import type { SiteContent } from "@/types/site-content";

const TABS = [
  { id: "general", label: "General" },
  { id: "contacto", label: "Contacto" },
  { id: "inicio", label: "Inicio" },
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "soluciones", label: "Soluciones" },
  { id: "obras", label: "Obras" },
  { id: "imagenes", label: "Imágenes" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelClass = "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [tab, setTab] = useState<TabId>("general");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "saved") {
      const t = setTimeout(() => setStatus("idle"), 3000);
      return () => clearTimeout(t);
    }
  }, [status]);

  async function handleSave() {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al guardar");
      }
      const updated = await res.json();
      setContent(updated);
      setStatus("saved");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error al guardar");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-10 border-b border-border bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div>
            <h1 className="font-display text-xl font-bold text-navy">
              Panel de administración
            </h1>
            <p className="text-sm text-muted">Yaguaro Web</p>
          </div>
          <div className="flex items-center gap-3">
            {status === "saved" && (
              <span className="text-sm font-medium text-green-600">Guardado</span>
            )}
            {status === "error" && (
              <span className="text-sm font-medium text-red-600">{error}</span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-navy hover:bg-slate-50"
            >
              Ver sitio
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-slate-50"
            >
              Salir
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={status === "saving"}
              className="rounded-lg bg-accent-dark px-5 py-2 text-sm font-semibold text-white hover:bg-accent disabled:opacity-50"
            >
              {status === "saving" ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-3 sm:px-6">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.id
                  ? "bg-navy text-white"
                  : "text-muted hover:bg-slate-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
          {tab === "general" && (
            <Section title="Información general">
              <Field label="Nombre" value={content.siteConfig.name} onChange={(v) => updateSiteConfig(setContent, "name", v)} />
              <Field label="Tagline" value={content.siteConfig.tagline} onChange={(v) => updateSiteConfig(setContent, "tagline", v)} />
              <TextArea label="Descripción" value={content.siteConfig.description} onChange={(v) => updateSiteConfig(setContent, "description", v)} rows={3} />
              <Field label="URL del sitio" value={content.siteConfig.url} onChange={(v) => updateSiteConfig(setContent, "url", v)} />
              <ImageField label="Logo" value={content.siteConfig.logo} onChange={(v) => updateSiteConfig(setContent, "logo", v)} />
              <StatsEditor content={content} setContent={setContent} />
            </Section>
          )}

          {tab === "contacto" && (
            <Section title="Datos de contacto">
              <Field label="Dirección" value={content.siteConfig.contact.address} onChange={(v) => updateContact(setContent, "address", v)} />
              <Field label="Sede central" value={content.siteConfig.contact.headquarters} onChange={(v) => updateContact(setContent, "headquarters", v)} />
              <Field label="Teléfono" value={content.siteConfig.contact.phone} onChange={(v) => updateContact(setContent, "phone", v)} />
              <Field label="Teléfono (href)" value={content.siteConfig.contact.phoneHref} onChange={(v) => updateContact(setContent, "phoneHref", v)} />
              <Field label="WhatsApp" value={content.siteConfig.contact.whatsapp} onChange={(v) => updateContact(setContent, "whatsapp", v)} />
              <Field label="WhatsApp (href)" value={content.siteConfig.contact.whatsappHref} onChange={(v) => updateContact(setContent, "whatsappHref", v)} />
              <Field label="Mensaje WhatsApp" value={content.siteConfig.contact.whatsappMessage} onChange={(v) => updateContact(setContent, "whatsappMessage", v)} />
              <Field label="Email" value={content.siteConfig.contact.email} onChange={(v) => updateContact(setContent, "email", v)} />
              <Field label="Horario semana" value={content.siteConfig.contact.hours.weekdays} onChange={(v) => updateHours(setContent, "weekdays", v)} />
              <Field label="Horario sábado" value={content.siteConfig.contact.hours.saturday} onChange={(v) => updateHours(setContent, "saturday", v)} />
            </Section>
          )}

          {tab === "inicio" && (
            <Section title="Página de inicio">
              <Field label="Título hero" value={content.heroContent.title} onChange={(v) => setContent((c) => ({ ...c, heroContent: { ...c.heroContent, title: v } }))} />
              <ImageField label="Imagen hero" value={content.heroContent.image} onChange={(v) => setContent((c) => ({ ...c, heroContent: { ...c.heroContent, image: v } }))} />
              <Field label="Título 'Somos Yaguaro'" value={content.aboutContent.title} onChange={(v) => setContent((c) => ({ ...c, aboutContent: { ...c.aboutContent, title: v } }))} />
              <TextArea label="Párrafos (uno por línea)" value={content.aboutContent.paragraphs.join("\n")} onChange={(v) => setContent((c) => ({ ...c, aboutContent: { ...c.aboutContent, paragraphs: linesToArray(v) } }))} rows={5} />
              <TextArea label="Disciplinas" value={content.aboutContent.disciplines} onChange={(v) => setContent((c) => ({ ...c, aboutContent: { ...c.aboutContent, disciplines: v } }))} rows={4} />
              <ImageField label="Imagen sección about" value={content.aboutContent.image} onChange={(v) => setContent((c) => ({ ...c, aboutContent: { ...c.aboutContent, image: v } }))} />
              <ImageListEditor label="Carrusel de imágenes" urls={content.carouselImages} onChange={(urls) => setContent((c) => ({ ...c, carouselImages: urls }))} />
            </Section>
          )}

          {tab === "nosotros" && (
            <Section title="Página Nosotros">
              <Field label="Título" value={content.nosotrosContent.title} onChange={(v) => setContent((c) => ({ ...c, nosotrosContent: { ...c.nosotrosContent, title: v } }))} />
              <TextArea label="Introducción" value={content.nosotrosContent.intro} onChange={(v) => setContent((c) => ({ ...c, nosotrosContent: { ...c.nosotrosContent, intro: v } }))} rows={4} />
              <ImageField label="Imagen" value={content.nosotrosContent.image} onChange={(v) => setContent((c) => ({ ...c, nosotrosContent: { ...c.nosotrosContent, image: v } }))} />
            </Section>
          )}

          {tab === "servicios" && (
            <Section title="Página Servicios">
              <ImageField label="Imagen hero" value={content.pageHeroes.servicios} onChange={(v) => setContent((c) => ({ ...c, pageHeroes: { ...c.pageHeroes, servicios: v } }))} />
              <ServicesEditor content={content} setContent={setContent} />
            </Section>
          )}

          {tab === "soluciones" && (
            <Section title="Página Soluciones">
              <ImageField label="Imagen hero" value={content.pageHeroes.soluciones} onChange={(v) => setContent((c) => ({ ...c, pageHeroes: { ...c.pageHeroes, soluciones: v } }))} />
              <SolutionsEditor content={content} setContent={setContent} />
              <TextArea label="Tipos de solución (uno por línea)" value={content.solutionTypes.join("\n")} onChange={(v) => setContent((c) => ({ ...c, solutionTypes: linesToArray(v) }))} rows={6} />
              <ImageListEditor label="Galería de fotos" urls={content.galleryImages} onChange={(urls) => setContent((c) => ({ ...c, galleryImages: urls }))} />
            </Section>
          )}

          {tab === "obras" && (
            <Section title="Página Obras">
              <ImageField label="Imagen hero" value={content.pageHeroes.obras} onChange={(v) => setContent((c) => ({ ...c, pageHeroes: { ...c.pageHeroes, obras: v } }))} />
              <TextArea label="Descripción general" value={content.obrasDescription} onChange={(v) => setContent((c) => ({ ...c, obrasDescription: v }))} rows={5} />
              <Field label="Caso destacado - título" value={content.featuredCase.title} onChange={(v) => setContent((c) => ({ ...c, featuredCase: { ...c.featuredCase, title: v } }))} />
              <TextArea label="Caso destacado - descripción" value={content.featuredCase.description} onChange={(v) => setContent((c) => ({ ...c, featuredCase: { ...c.featuredCase, description: v } }))} rows={4} />
              <ImageField label="Caso destacado - imagen" value={content.featuredCase.image} onChange={(v) => setContent((c) => ({ ...c, featuredCase: { ...c.featuredCase, image: v } }))} />
              <ProjectsEditor content={content} setContent={setContent} />
            </Section>
          )}

          {tab === "imagenes" && (
            <Section title="Imágenes de páginas">
              <ImageField label="Hero Contacto" value={content.pageHeroes.contacto} onChange={(v) => setContent((c) => ({ ...c, pageHeroes: { ...c.pageHeroes, contacto: v } }))} />
              <p className="text-sm text-muted">
                Las demás imágenes se editan en las pestañas Inicio, Servicios, Soluciones y Obras.
              </p>
            </Section>
          )}
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5">
      <h2 className="border-b border-border pb-3 font-display text-lg font-bold text-navy">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <input className={inputClass} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <textarea className={`${inputClass} resize-y`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function StatsEditor({ content, setContent }: { content: SiteContent; setContent: React.Dispatch<React.SetStateAction<SiteContent>> }) {
  return (
    <div className="space-y-4 rounded-xl border border-border bg-slate-50 p-4">
      <p className="text-sm font-semibold text-navy">Estadísticas</p>
      {content.siteConfig.stats.map((stat, i) => (
        <div key={i} className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Valor</label>
            <input
              type="number"
              className={inputClass}
              value={stat.value}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setContent((c) => {
                  const stats = [...c.siteConfig.stats];
                  stats[i] = { ...stats[i], value: val };
                  return { ...c, siteConfig: { ...c.siteConfig, stats } };
                });
              }}
            />
          </div>
          <div>
            <label className={labelClass}>Etiqueta</label>
            <input
              className={inputClass}
              value={stat.label}
              onChange={(e) => {
                setContent((c) => {
                  const stats = [...c.siteConfig.stats];
                  stats[i] = { ...stats[i], label: e.target.value };
                  return { ...c, siteConfig: { ...c.siteConfig, stats } };
                });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ImageListEditor({
  label,
  urls,
  onChange,
}: {
  label: string;
  urls: string[];
  onChange: (urls: string[]) => void;
}) {
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState("");

  async function uploadAtIndex(index: number, file: File) {
    setUploadingIndex(index);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al subir");
      }

      const next = [...urls];
      next[index] = data.url;
      onChange(next);
    } catch (err) {
      setUploadError(
        err instanceof Error ? err.message : "Error al subir la imagen",
      );
    } finally {
      setUploadingIndex(null);
    }
  }

  return (
    <div className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">{label}</p>
        <button
          type="button"
          onClick={() => onChange([...urls, ""])}
          className="text-sm font-medium text-accent-dark hover:underline"
        >
          + Agregar
        </button>
      </div>

      {uploadError && (
        <p className="text-xs text-red-600">{uploadError}</p>
      )}

      {urls.map((url, i) => (
        <div key={i} className="space-y-2 rounded-lg border border-border bg-white p-3">
          <div className="flex gap-2">
            <input
              className={`${inputClass} flex-1`}
              value={url}
              placeholder="/uploads/imagen.jpg"
              onChange={(e) => {
                const next = [...urls];
                next[i] = e.target.value;
                onChange(next);
              }}
            />
            <input
              ref={(el) => {
                fileRefs.current[i] = el;
              }}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadAtIndex(i, file);
                e.target.value = "";
              }}
            />
            <button
              type="button"
              disabled={uploadingIndex === i}
              onClick={() => fileRefs.current[i]?.click()}
              className="shrink-0 rounded-lg bg-accent-dark px-3 py-2 text-xs font-semibold text-white hover:bg-accent disabled:opacity-50"
            >
              {uploadingIndex === i ? "..." : "Subir"}
            </button>
            <button
              type="button"
              onClick={() => onChange(urls.filter((_, j) => j !== i))}
              className="shrink-0 rounded-lg border border-red-200 px-3 text-sm text-red-600 hover:bg-red-50"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function SolutionsEditor({ content, setContent }: { content: SiteContent; setContent: React.Dispatch<React.SetStateAction<SiteContent>> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">Soluciones</p>
        <button type="button" onClick={() => setContent((c) => ({ ...c, solutions: [...c.solutions, { title: "", description: "", icon: "" }] }))} className="text-sm font-medium text-accent-dark hover:underline">+ Agregar</button>
      </div>
      {content.solutions.map((sol, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-navy">Solución {i + 1}</span>
            <button type="button" onClick={() => setContent((c) => ({ ...c, solutions: c.solutions.filter((_, j) => j !== i) }))} className="text-sm text-red-600 hover:underline">Eliminar</button>
          </div>
          <Field label="Título" value={sol.title} onChange={(v) => updateSolutionField(setContent, i, "title", v)} />
          <TextArea label="Descripción" value={sol.description} onChange={(v) => updateSolutionField(setContent, i, "description", v)} rows={2} />
          <ImageField label="Icono" value={sol.icon} onChange={(v) => updateSolutionField(setContent, i, "icon", v)} />
        </div>
      ))}
    </div>
  );
}

function ProjectsEditor({ content, setContent }: { content: SiteContent; setContent: React.Dispatch<React.SetStateAction<SiteContent>> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">Proyectos / Obras</p>
        <button type="button" onClick={() => setContent((c) => ({ ...c, projects: [...c.projects, { title: "", description: "", image: "" }] }))} className="text-sm font-medium text-accent-dark hover:underline">+ Agregar</button>
      </div>
      {content.projects.map((proj, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-navy">Proyecto {i + 1}</span>
            <button type="button" onClick={() => setContent((c) => ({ ...c, projects: c.projects.filter((_, j) => j !== i) }))} className="text-sm text-red-600 hover:underline">Eliminar</button>
          </div>
          <Field label="Título" value={proj.title} onChange={(v) => updateProjectField(setContent, i, "title", v)} />
          <TextArea label="Descripción" value={proj.description} onChange={(v) => updateProjectField(setContent, i, "description", v)} rows={2} />
          <ImageField label="Imagen" value={proj.image} onChange={(v) => updateProjectField(setContent, i, "image", v)} />
        </div>
      ))}
    </div>
  );
}

function ServicesEditor({ content, setContent }: { content: SiteContent; setContent: React.Dispatch<React.SetStateAction<SiteContent>> }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-navy">Categorías de servicio</p>
        <button type="button" onClick={() => setContent((c) => ({ ...c, services: [...c.services, { title: "", items: [""] }] }))} className="text-sm font-medium text-accent-dark hover:underline">+ Agregar</button>
      </div>
      {content.services.map((svc, i) => (
        <div key={i} className="space-y-3 rounded-xl border border-border bg-slate-50 p-4">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-navy">Categoría {i + 1}</span>
            <button type="button" onClick={() => setContent((c) => ({ ...c, services: c.services.filter((_, j) => j !== i) }))} className="text-sm text-red-600 hover:underline">Eliminar</button>
          </div>
          <Field label="Título" value={svc.title} onChange={(v) => setContent((c) => { const services = [...c.services]; services[i] = { ...services[i], title: v }; return { ...c, services }; })} />
          <TextArea label="Ítems (uno por línea)" value={svc.items.join("\n")} onChange={(v) => setContent((c) => { const services = [...c.services]; services[i] = { ...services[i], items: linesToArray(v) }; return { ...c, services }; })} rows={4} />
        </div>
      ))}
    </div>
  );
}

function linesToArray(text: string) {
  return text.split("\n").map((l) => l.trim()).filter(Boolean);
}

function updateSiteConfig(setContent: React.Dispatch<React.SetStateAction<SiteContent>>, key: keyof SiteContent["siteConfig"], value: string) {
  setContent((c) => ({ ...c, siteConfig: { ...c.siteConfig, [key]: value } }));
}

function updateContact(setContent: React.Dispatch<React.SetStateAction<SiteContent>>, key: keyof SiteContent["siteConfig"]["contact"], value: string) {
  setContent((c) => ({ ...c, siteConfig: { ...c.siteConfig, contact: { ...c.siteConfig.contact, [key]: value } } }));
}

function updateHours(setContent: React.Dispatch<React.SetStateAction<SiteContent>>, key: "weekdays" | "saturday", value: string) {
  setContent((c) => ({ ...c, siteConfig: { ...c.siteConfig, contact: { ...c.siteConfig.contact, hours: { ...c.siteConfig.contact.hours, [key]: value } } } }));
}

function updateSolutionField(
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>,
  index: number,
  field: keyof SiteContent["solutions"][number],
  value: string,
) {
  setContent((c) => {
    const solutions = [...c.solutions];
    solutions[index] = { ...solutions[index], [field]: value };
    return { ...c, solutions };
  });
}

function updateProjectField(
  setContent: React.Dispatch<React.SetStateAction<SiteContent>>,
  index: number,
  field: keyof SiteContent["projects"][number],
  value: string,
) {
  setContent((c) => {
    const projects = [...c.projects];
    projects[index] = { ...projects[index], [field]: value };
    return { ...c, projects };
  });
}
