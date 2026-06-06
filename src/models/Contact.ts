import mongoose, { Schema, models } from "mongoose";

export interface ContactDocument {
  name: string;
  phone: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

const ContactSchema = new Schema<ContactDocument>(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Contact =
  models.Contact ?? mongoose.model<ContactDocument>("Contact", ContactSchema);
