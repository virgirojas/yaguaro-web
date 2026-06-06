import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    await connectDB();
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      contacts.map((c) => ({
        id: String(c._id),
        name: c.name,
        phone: c.phone,
        email: c.email,
        message: c.message,
        read: c.read ?? false,
        createdAt: c.createdAt,
      })),
    );
  } catch (error) {
    console.error("Error al listar consultas:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar las consultas" },
      { status: 500 },
    );
  }
}
