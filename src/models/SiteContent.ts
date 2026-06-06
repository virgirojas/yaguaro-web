import mongoose, { Schema, models } from "mongoose";
import type { SiteContent } from "@/types/site-content";

interface SiteContentDoc {
  key: string;
  data: SiteContent;
}

const SiteContentSchema = new Schema<SiteContentDoc>(
  {
    key: { type: String, required: true, unique: true, default: "main" },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const SiteContentModel =
  models.SiteContent ??
  mongoose.model<SiteContentDoc>("SiteContent", SiteContentSchema);
