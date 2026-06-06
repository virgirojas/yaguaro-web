import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getSiteContent } from "@/lib/site-content";

export default async function AdminPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }

  const content = await getSiteContent();
  return <AdminEditor initialContent={content} />;
}
