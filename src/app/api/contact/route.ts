import { NextResponse } from "next/server";
import { getDatabaseErrorMessage } from "@/lib/contact-errors";
import { connectDB } from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "El email no es válido" },
        { status: 400 },
      );
    }

    await connectDB();
    await Contact.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    return NextResponse.json(
      { error: getDatabaseErrorMessage(error) },
      { status: 503 },
    );
  }
}
