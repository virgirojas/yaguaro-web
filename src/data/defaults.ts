import type { SiteContent } from "@/types/site-content";

export const defaultSiteContent: SiteContent = {
  siteConfig: {
    name: "Yaguaro",
    tagline: "Energía Renovables",
    description:
      "Estudio de ingeniería especializado en nuevas energías. Diseño e implementación de soluciones energéticas eficientes en Córdoba, Argentina.",
    url: "https://yaguaro.ar",
    logo: "https://yaguaro.ar/wp-content/uploads/2025/11/logo-yaguaro-fondo-transp-2-scaled.png",
    contact: {
      address: "Emilio Lamarca 3715 – Córdoba, Argentina",
      headquarters: "Mendiolaza, Córdoba, Argentina",
      phone: "+54 9 3512 12-2480",
      phoneHref: "tel:+5493512122480",
      whatsapp: "+54 9 3515 51-2048",
      whatsappHref: "https://wa.me/5493515512048",
      whatsappMessage: "Hola, te escribo desde el sitio web de Yaguaro",
      email: "info@yaguaro.ar",
      hours: {
        weekdays: "L a V: 8am – 18pm",
        saturday: "Sáb: 10am – 14pm",
      },
    },
    stats: [
      { value: 20, label: "Años de experiencia" },
      { value: 300, label: "Proyectos desarrollados" },
    ],
  },
  navItems: [
    { label: "Inicio", href: "/" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Servicios", href: "/servicios" },
    { label: "Soluciones", href: "/soluciones" },
    { label: "Obras", href: "/obras" },
    { label: "Contacto", href: "/contacto" },
  ],
  heroContent: {
    title: "Somos un estudio de ingeniería especializados en nuevas energías",
    image:
      "https://yaguaro.ar/wp-content/uploads/2023/11/DJI_0080-scaled.jpg",
  },
  aboutContent: {
    title: "Somos Yaguaro",
    paragraphs: [
      "Nos orientamos a requerimientos de alta precisión, de resultados predecibles y fiables. Respondemos a proyectos que requieren un alto grado de información desde su concepción y evaluación hasta el producto final.",
      "Nos interesan especialmente los casos que exigen soluciones a problemas complejos a través de fuentes híbridas (solar-eólica-hídrica-biocombustibles-hidrógeno) y su interacción con otros sistemas de control asociados a la demanda de energía.",
    ],
    disciplines:
      "Ingeniería eléctrica, Ing. mecánica, Ing. civil, Arquitectura, Ciencias Sociales aplicadas al campo de las tecnologías. Constructores y desarrollistas, especialistas en tecnología, confluyen en la elaboración de los proyectos más simples a más complejos desarrollados por Yaguaro.",
    image:
      "https://yaguaro.ar/wp-content/uploads/2023/08/IMG_20221028_101727.jpg",
  },
  nosotrosContent: {
    title: "Nosotros",
    intro:
      "Nos dedicamos al diseño e implementación de soluciones energéticas eficientes basadas en fuentes renovables. Integramos generación de energía y tecnologías de almacenamiento para maximizar el rendimiento energético, garantizando sistemas confiables y adaptados a las necesidades de cada proyecto.",
    image:
      "https://yaguaro.ar/wp-content/uploads/2023/08/IMG_20221028_101727.jpg",
  },
  solutions: [
    {
      title: "Fotovoltaica",
      description:
        "Generación solar on-grid y off-grid para residencial, comercial e industrial.",
      icon: "https://yaguaro.ar/wp-content/uploads/2023/07/fotovoltaica.png",
    },
    {
      title: "Energía eólica",
      description:
        "Diseño e integración de sistemas eólicos para complementar la matriz energética.",
      icon: "https://yaguaro.ar/wp-content/uploads/2023/07/energia-eolica.png",
    },
    {
      title: "Hidro y aguas",
      description:
        "Bombeo solar, riego y aprovechamiento hídrico con energías renovables.",
      icon: "https://yaguaro.ar/wp-content/uploads/2023/07/admirador.png",
    },
  ],
  solutionTypes: [
    "On-Grid",
    "Off-Grid",
    "Bombeo de agua",
    "Sistemas de riego",
    "BESS",
    "Peak Shaving",
    "Conversión de fases",
  ],
  featuredCase: {
    title: "Instalaciones en Sitios Históricos",
    description:
      "Hace más de 9.300 años los pueblos originarios Tehuelches y sus antecesores dejaron vestigios de su paso por el río de las pinturas. Entre varios aleros con pinturas rupestres, una cueva de 24 metros de profundidad, 15 metros de ancho en la entrada y alrededor de 10 metros de altura se conserva aquí el patrimonio más antiguo de la región.",
    image:
      "https://yaguaro.ar/wp-content/uploads/2023/07/cueva-de-las-manos.jpg",
    videoPoster:
      "https://yaguaro.ar/wp-content/uploads/2023/07/Cueva-Manos-1-scaled-1.jpeg",
  },
  obrasDescription:
    "Caracterización de la demanda de energía y su crecimiento futuro, la elaboración de escenarios de respuesta posible y su capacidad de expansión, simulación de producción y aporte de energía, retorno de inversión, vida útil de cada componente en función de su uso en el proyecto, disponibilidad de potencia y producción de energía, plan de mantenimiento, marcos regulatorios.",
  projects: [
    {
      title: "La Aguada - Santa Catalina",
      description: "Bombeo solar 2.38 kW, bomba 1.5 hp.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/11/20190601_155413-scaled.jpg",
    },
    {
      title: "Sistema híbrido",
      description: "9.6 kW / 45 kW Victron / 51.2 kWh / Grupo 70 kVA.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/11/pexels-tom-fisk-3809129-1.jpg",
    },
    {
      title: "Centro de Interpretación – Parque Nacional Perito Moreno",
      description: "Infraestructura energética en entorno protegido.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/11/2019-01-18-14.36.39-scaled.jpg",
    },
    {
      title: "Cañadón del Río Pinturas – Cueva de la Manos",
      description: "Instalación en sitio histórico patrimonial.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/11/Cueva-de-las-manos-Parque-Nacional-Patagonia.jpeg",
    },
    {
      title: "Tambo Automatizado Off Grid",
      description: "Sistema autónomo con almacenamiento y control inteligente.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/08/TY0101-20-09-22-F6.jpg",
    },
    {
      title: "Proyecto residencial",
      description: "Generación distribuida y eficiencia energética.",
      image:
        "https://yaguaro.ar/wp-content/uploads/2023/11/2019-02-23-18.29.24-scaled.jpg",
    },
  ],
  galleryImages: [
    "https://yaguaro.ar/wp-content/uploads/2023/11/6.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/7.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/2-1.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/4-1.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/8.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/3-1.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/2-2.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/4-2.jpg",
  ],
  carouselImages: [
    "https://yaguaro.ar/wp-content/uploads/2023/11/DJI_0080-scaled.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/1-2.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/2-1.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/07/cueva-de-las-manos.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/2-2.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/11/2.jpg",
    "https://yaguaro.ar/wp-content/uploads/2023/07/pexels-mark-stebnicki-15751120.jpg",
  ],
  services: [
    {
      title: "Energías Renovables",
      items: [
        "Ingeniería y DENSO",
        "Ejecución de proyectos",
        "Mantenimiento",
        "Desarrollo de proyectos especiales",
      ],
    },
    {
      title: "Infraestructura eléctrica",
      items: [
        "Redes MT y BT",
        "Subestaciones",
        "Loteos",
        "Fibra óptica",
        "Wireless",
      ],
    },
    {
      title: "Electromovilidad",
      items: [
        "Estaciones de carga",
        "Implementación residencial",
        "Implementación industrial",
        "Implementación urbana",
      ],
    },
    {
      title: "Gestión y trámites",
      items: [
        "Usuario-Generador",
        "Generación distribuida comunitaria",
        "Permisos y habilitaciones",
      ],
    },
  ],
  pageHeroes: {
    servicios:
      "https://yaguaro.ar/wp-content/uploads/2023/07/pexels-kindel-media-9800116.jpg",
    soluciones:
      "https://yaguaro.ar/wp-content/uploads/2023/08/portada.jpg",
    obras:
      "https://yaguaro.ar/wp-content/uploads/2023/11/pexels-tom-fisk-3809129-1.jpg",
    contacto:
      "https://yaguaro.ar/wp-content/uploads/2023/07/pexels-kindel-media-9800116.jpg",
  },
};
