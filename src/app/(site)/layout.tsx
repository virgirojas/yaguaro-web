import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { getSiteContent } from "@/lib/site-content";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getSiteContent();

  return (
    <>
      <Header
        navItems={content.navItems}
        logo={content.siteConfig.logo}
        name={content.siteConfig.name}
        whatsappHref={content.siteConfig.contact.whatsappHref}
      />
      <main className="flex-1">{children}</main>
      <Footer
        navItems={content.navItems}
        siteConfig={content.siteConfig}
      />
      <WhatsAppButton contact={content.siteConfig.contact} />
    </>
  );
}
