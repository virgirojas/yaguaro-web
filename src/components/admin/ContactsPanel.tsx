"use client";

import { useEffect, useState } from "react";

interface ContactEntry {
  id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function ContactsPanel() {
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/admin/contacts");
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Error al cargar");
        }
        const data = await res.json();
        if (!cancelled) setContacts(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Error al cargar consultas",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function loadContacts() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/contacts");
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al cargar");
      }
      setContacts(await res.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar consultas");
    } finally {
      setLoading(false);
    }
  }

  async function toggleRead(contact: ContactEntry) {
    const res = await fetch(`/api/admin/contacts/${contact.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !contact.read }),
    });
    if (res.ok) {
      const updated = await res.json();
      setContacts((list) =>
        list.map((c) => (c.id === updated.id ? updated : c)),
      );
    }
  }

  async function deleteContact(id: string) {
    if (!confirm("¿Eliminar esta consulta?")) return;
    const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    if (res.ok) {
      setContacts((list) => list.filter((c) => c.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  }

  const unreadCount = contacts.filter((c) => !c.read).length;

  if (loading) {
    return <p className="text-sm text-muted">Cargando consultas...</p>;
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={loadContacts}
          className="text-sm font-medium text-accent-dark hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-lg font-bold text-navy">
            Consultas del formulario
          </h2>
          <p className="text-sm text-muted">
            {contacts.length} total
            {unreadCount > 0 && (
              <span className="ml-2 font-medium text-accent-dark">
                · {unreadCount} sin leer
              </span>
            )}
          </p>
        </div>
        <button
          type="button"
          onClick={loadContacts}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-navy hover:bg-slate-50"
        >
          Actualizar
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border bg-slate-50 px-4 py-8 text-center text-sm text-muted">
          Todavía no hay consultas.
        </p>
      ) : (
        <ul className="space-y-3">
          {contacts.map((contact) => {
            const expanded = expandedId === contact.id;
            return (
              <li
                key={contact.id}
                className={`rounded-xl border p-4 transition-colors ${
                  contact.read
                    ? "border-border bg-white"
                    : "border-accent/30 bg-accent/5"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <button
                    type="button"
                    className="min-w-0 flex-1 text-left"
                    onClick={() => {
                      setExpandedId(expanded ? null : contact.id);
                      if (!contact.read) toggleRead(contact);
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-navy">
                        {contact.name}
                      </span>
                      {!contact.read && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-white">
                          Nueva
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {formatDate(contact.createdAt)}
                    </p>
                    {!expanded && (
                      <p className="mt-2 line-clamp-2 text-sm text-navy/80">
                        {contact.message}
                      </p>
                    )}
                  </button>
                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => toggleRead(contact)}
                      className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:bg-slate-50"
                    >
                      {contact.read ? "Marcar nueva" : "Marcar leída"}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteContact(contact.id)}
                      className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>

                {expanded && (
                  <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
                    <p>
                      <span className="font-medium text-navy">Email: </span>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-accent-dark hover:underline"
                      >
                        {contact.email}
                      </a>
                    </p>
                    <p>
                      <span className="font-medium text-navy">Teléfono: </span>
                      <a
                        href={`tel:${contact.phone.replace(/\s/g, "")}`}
                        className="text-accent-dark hover:underline"
                      >
                        {contact.phone}
                      </a>
                    </p>
                    <p className="whitespace-pre-wrap text-navy/90">
                      {contact.message}
                    </p>
                    <a
                      href={`mailto:${contact.email}?subject=Re: Consulta Yaguaro`}
                      className="inline-flex rounded-lg bg-accent-dark px-4 py-2 text-xs font-semibold text-white hover:bg-accent"
                    >
                      Responder por email
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
