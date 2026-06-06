import { defaultSiteContent } from "@/data/defaults";
import { connectDB } from "@/lib/mongodb";
import { SiteContentModel } from "@/models/SiteContent";
import type { SiteContent } from "@/types/site-content";

const CONTENT_KEY = "main";

export async function getSiteContent(): Promise<SiteContent> {
  try {
    await connectDB();
    const doc = await SiteContentModel.findOne({ key: CONTENT_KEY }).lean();

    if (doc?.data) {
      return doc.data as SiteContent;
    }

    await SiteContentModel.create({ key: CONTENT_KEY, data: defaultSiteContent });
    return defaultSiteContent;
  } catch {
    return defaultSiteContent;
  }
}

export async function updateSiteContent(
  content: SiteContent,
): Promise<SiteContent> {
  await connectDB();
  const doc = await SiteContentModel.findOneAndUpdate(
    { key: CONTENT_KEY },
    { key: CONTENT_KEY, data: content },
    { upsert: true, new: true, runValidators: true },
  ).lean();

  if (!doc?.data) {
    throw new Error("No se pudo actualizar el contenido");
  }

  return doc.data as SiteContent;
}
