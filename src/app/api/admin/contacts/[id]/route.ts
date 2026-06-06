import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const read = Boolean(body.read);

    await connectDB();
    const contact = await Contact.findByIdAndUpdate(
      id,
      { read },
      { new: true },
    ).lean();

    if (!contact) {
      return NextResponse.json(
        { error: "Consulta no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: String(contact._id),
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      message: contact.message,
      read: contact.read,
      createdAt: contact.createdAt,
    });
  } catch (error) {
    console.error("Error al actualizar consulta:", error);
    return NextResponse.json(
      { error: "No se pudo actualizar la consulta" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      return NextResponse.json(
        { error: "Consulta no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al eliminar consulta:", error);
    return NextResponse.json(
      { error: "No se pudo eliminar la consulta" },
      { status: 500 },
    );
  }
}
