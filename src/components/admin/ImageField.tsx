"use client";

import Image from "next/image";
import { useRef, useState } from "react";

const inputClass =
  "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";
const labelClass =
  "mb-1 block text-xs font-semibold uppercase tracking-wide text-muted";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(file: File) {
    setUploading(true);
    setError("");

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

      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>

      {value && (
        <div className="relative h-32 w-full max-w-xs overflow-hidden rounded-lg border border-border bg-slate-100">
          <Image
            src={value}
            alt="Vista previa"
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={value.startsWith("/uploads/")}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleUpload(file);
          }}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="rounded-lg bg-accent-dark px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:opacity-50"
        >
          {uploading ? "Subiendo..." : "Subir imagen"}
        </button>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted hover:bg-slate-50"
          >
            Quitar
          </button>
        )}
      </div>

      <input
        className={inputClass}
        value={value}
        placeholder="/uploads/imagen.jpg o https://..."
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="text-xs text-muted">
        JPG, PNG, WebP o GIF · máximo 5 MB. También podés pegar una URL externa.
      </p>

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
