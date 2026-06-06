export interface NavItem {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  label: string;
}

export interface ContactInfo {
  address: string;
  headquarters: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  whatsappMessage: string;
  email: string;
  hours: {
    weekdays: string;
    saturday: string;
  };
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo: string;
  contact: ContactInfo;
  stats: Stat[];
}

export interface HeroContent {
  title: string;
  image: string;
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
  disciplines: string;
  image: string;
}

export interface NosotrosContent {
  title: string;
  intro: string;
  image: string;
}

export interface Solution {
  title: string;
  description: string;
  icon: string;
}

export interface FeaturedCase {
  title: string;
  description: string;
  image: string;
  videoPoster: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
}

export interface Service {
  title: string;
  items: string[];
}

export interface PageHeroes {
  servicios: string;
  soluciones: string;
  obras: string;
  contacto: string;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  navItems: NavItem[];
  heroContent: HeroContent;
  aboutContent: AboutContent;
  nosotrosContent: NosotrosContent;
  solutions: Solution[];
  solutionTypes: string[];
  featuredCase: FeaturedCase;
  obrasDescription: string;
  projects: Project[];
  galleryImages: string[];
  carouselImages: string[];
  services: Service[];
  pageHeroes: PageHeroes;
}
