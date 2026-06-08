import { put } from "@vercel/blob";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export function buildImageFilename(file: File): string {
  const ext = EXTENSIONS[file.type] ?? ".jpg";
  return `${Date.now()}-${crypto.randomUUID().slice(0, 8)}${ext}`;
}

function isVercel(): boolean {
  return process.env.VERCEL === "1";
}

async function uploadToLocal(file: File, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);
  return `/uploads/${filename}`;
}

async function uploadToBlob(file: File, filename: string): Promise<string> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error("BLOB_MISSING");
  }

  const blob = await put(`yaguaro/${filename}`, file, {
    access: "public",
    token,
    addRandomSuffix: false,
  });

  return blob.url;
}

export async function uploadImage(file: File, filename: string): Promise<string> {
  const hasBlobToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

  if (isVercel() || hasBlobToken) {
    return uploadToBlob(file, filename);
  }

  return uploadToLocal(file, filename);
}

export function getUploadErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "BLOB_MISSING") {
    return (
      "Vercel Blob no está configurado. En Vercel: Storage → Create Database → Blob " +
      "(acceso Public), conectalo al proyecto y redeploy."
    );
  }

  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes("EROFS") ||
    message.includes("read-only") ||
    message.includes("ENOENT")
  ) {
    return (
      "No se puede guardar en disco en producción. Configurá Vercel Blob " +
      "(Storage → Blob) y redeploy."
    );
  }

  if (
    message.includes("No token") ||
    message.includes("BLOB_READ_WRITE_TOKEN") ||
    message.includes("Unauthorized") ||
    message.includes("403")
  ) {
    return (
      "Token de Vercel Blob inválido o ausente. Verificá Storage → Blob en el proyecto " +
      "y que BLOB_READ_WRITE_TOKEN esté en Environment Variables."
    );
  }

  if (message.includes("store") && message.includes("access")) {
    return (
      "El Blob store debe ser Public, o usá access compatible con tu store en Vercel."
    );
  }

  return `No se pudo subir la imagen: ${message}`;
}
