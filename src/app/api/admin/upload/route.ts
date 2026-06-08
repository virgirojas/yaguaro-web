import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  buildImageFilename,
  getUploadErrorMessage,
  uploadImage,
} from "@/lib/upload-image";

const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No se recibió ninguna imagen" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Formato no permitido. Usá JPG, PNG, WebP o GIF." },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "La imagen no puede superar 5 MB" },
        { status: 400 },
      );
    }

    const filename = buildImageFilename(file);
    const url = await uploadImage(file, filename);

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Error al subir imagen:", error);
    return NextResponse.json(
      { error: getUploadErrorMessage(error) },
      { status: 500 },
    );
  }
}
