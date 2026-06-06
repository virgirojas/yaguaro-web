import type { Metadata } from "next";
import { IBM_Plex_Sans, Montserrat } from "next/font/google";
import { defaultSiteContent } from "@/data/defaults";
import "./globals.css";

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${defaultSiteContent.siteConfig.name} | ${defaultSiteContent.siteConfig.tagline}`,
    template: `%s | ${defaultSiteContent.siteConfig.name}`,
  },
  description: defaultSiteContent.siteConfig.description,
  icons: {
    icon: "https://yaguaro.ar/wp-content/uploads/2025/11/cropped-logo-yaguaro-12-scaled-1-32x32.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${ibmPlex.variable} ${montserrat.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
