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

/** Blob conectado al proyecto (OIDC: BLOB_STORE_ID, o legacy: BLOB_READ_WRITE_TOKEN). */
export function isBlobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN,
  );
}

async function uploadToLocal(file: File, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(uploadsDir, filename), buffer);
  return `/uploads/${filename}`;
}

async function uploadToBlob(file: File, filename: string): Promise<string> {
  // El SDK usa OIDC (VERCEL_OIDC_TOKEN + BLOB_STORE_ID) en Vercel,
  // o BLOB_READ_WRITE_TOKEN si está definido.
  const blob = await put(`yaguaro/${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
  });

  return blob.url;
}

export async function uploadImage(file: File, filename: string): Promise<string> {
  if (isVercel()) {
    if (!isBlobConfigured()) {
      throw new Error("BLOB_MISSING");
    }
    return uploadToBlob(file, filename);
  }

  if (isBlobConfigured() || process.env.BLOB_READ_WRITE_TOKEN) {
    return uploadToBlob(file, filename);
  }

  return uploadToLocal(file, filename);
}

export function getUploadErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message === "BLOB_MISSING") {
    return (
      "Vercel Blob no está conectado al proyecto. En Storage → tu Blob store → " +
      "Projects → Connect to yaguaro-web, luego redeploy."
    );
  }

  const message = error instanceof Error ? error.message : String(error);

  if (
    message.includes("No blob credentials") ||
    message.includes("No read-write token")
  ) {
    return (
      "Blob sin credenciales en este deploy. Conectá el store al proyecto " +
      "(debe aparecer BLOB_STORE_ID) y hacé redeploy."
    );
  }

  if (
    message.includes("EROFS") ||
    message.includes("read-only") ||
    message.includes("ENOENT")
  ) {
    return (
      "No se puede guardar en disco en producción. Conectá Vercel Blob al proyecto y redeploy."
    );
  }

  if (message.includes("Unauthorized") || message.includes("403")) {
    return (
      "Sin permiso para escribir en Blob. Verificá que el store esté conectado al proyecto y redeploy."
    );
  }

  if (
    message.includes("access") &&
    (message.includes("private") || message.includes("public"))
  ) {
    return (
      "El Blob store debe ser Public para imágenes del sitio. Creá un store Public o cambiá el existente."
    );
  }

  return `No se pudo subir la imagen: ${message}`;
}
