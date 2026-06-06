import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteContent, updateSiteContent } from "@/lib/site-content";
import type { SiteContent } from "@/types/site-content";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as SiteContent;
    const updated = await updateSiteContent(body);

    revalidatePath("/", "layout");
    [
      "/",
      "/nosotros",
      "/servicios",
      "/soluciones",
      "/obras",
      "/contacto",
    ].forEach((path) => revalidatePath(path));

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error al guardar contenido:", error);
    return NextResponse.json(
      { error: "No se pudo guardar el contenido" },
      { status: 500 },
    );
  }
}
