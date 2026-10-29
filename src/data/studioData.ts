export type Language = 'es' | 'en';

export interface BilingualText {
  en: string;
  es: string;
}

export interface ProjectGallery {
  id: string;
  categorySlug: string;
  categoryLabel: BilingualText;
  title: BilingualText;
  subtitle: BilingualText;
  venue: string;
  location: string;
  date: string;
  photoCount: number;
  coverImage: string;
  story: BilingualText;
  gearUsed: string;
  images: {
    url: string;
    caption: BilingualText;
    aspect?: 'portrait' | 'landscape' | 'square';
  }[];
}

export interface PhotoCategory {
  slug: string;
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  coverImage: string;
  accentTag: BilingualText;
  galleryCount: string;
}

export interface FilmProduction {
  id: string;
  categorySlug:
    | 'wedding-films'
    | 'quince-films'
    | 'music-videos'
    | 'original-films'
    | 'commercial-films';
  categoryLabel: BilingualText;
  division: 'DPhotography Studios & Films' | 'DMedia Records';
  title: BilingualText;
  subtitle: BilingualText;
  description: BilingualText;
  duration: string;
  format: string;
  year: string;
  location: string;
  thumbnail: string;
  videoPreviewUrl: string;
  featuredOnHome?: boolean;
  credits: {
    director: string;
    cinematographer: string;
    editor: string;
    productionCompany: string;
  };
}

export interface PackageTier {
  id: string;
  categorySlug:
    | 'wedding-photo'
    | 'wedding-films'
    | 'wedding-combo'
    | 'quinceaneras'
    | 'portraits'
    | 'music-videos'
    | 'commercial'
    | 'events';
  categoryName: BilingualText;
  tierName: BilingualText;
  tagline: BilingualText;
  startingPrice: string;
  durationLabel: BilingualText;
  popular?: boolean;
  deliverables: {
    en: string[];
    es: string[];
  };
  optionalExtras: {
    en: string[];
    es: string[];
  };
}

export interface ClientGalleryItem {
  id: string;
  code: string;
  clientNames: string;
  eventType: BilingualText;
  date: string;
  venue: string;
  photoCount: number;
  coverImage: string;
  isLocked: boolean;
  pixiesetUrl: string;
  previewPhotos: string[];
}

export const PHOTO_CATEGORIES: PhotoCategory[] = [
  {
    slug: 'weddings',
    title: { en: 'Bodas', es: 'Bodas' },
    subtitle: {
      en: 'Ceremonias, parejas, recepciones y detalles eternos',
      es: 'Ceremonias, parejas, recepciones y detalles eternos',
    },
    description: {
      en: 'La elegancia editorial se une a la emoción real. Cada colección de boda se cura como un legado visual inolvidable.',
      es: 'La elegancia editorial se une a la emoción real. Cada colección de boda se cura como un legado visual inolvidable.',
    },
    coverImage: '/fotos/boda-47.jpg',
    accentTag: { en: 'Colección Insignia', es: 'Colección Insignia' },
    galleryCount: '35+ Historias Curadas',
  },
  {
    slug: 'quinceaneras',
    title: { en: 'Quinceañeras', es: 'Quinceañeras' },
    subtitle: {
      en: 'Sesiones pre-quince, retratos reales y grandes celebraciones',
      es: 'Sesiones pre-quince, retratos reales y grandes celebraciones',
    },
    description: {
      en: 'Transformamos un momento único en la vida en una producción real de alta costura con iluminación dramática, vestidos espectaculares y emoción familiar.',
      es: 'Transformamos un momento único en la vida en una producción real de alta costura con iluminación dramática, vestidos espectaculares y emoción familiar.',
    },
    coverImage: '/fotos/quince-caballo-10.jpg',
    accentTag: { en: 'Editorial Real XV', es: 'Editorial Real XV' },
    galleryCount: '28+ Galerías Reales',
  },
  {
    slug: 'portraits-editorial',
    title: { en: 'Retratos y Editorial', es: 'Retratos y Editorial' },
    subtitle: {
      en: 'Marca personal, moda, artistas y sesiones creativas en estudio',
      es: 'Marca personal, moda, artistas y sesiones creativas en estudio',
    },
    description: {
      en: 'Iluminación de revista y dirección artística diseñada para modelos, artistas, creativos y profesionales modernos.',
      es: 'Iluminación de revista y dirección artística diseñada para modelos, artistas, creativos y profesionales modernos.',
    },
    coverImage: '/fotos/melissa-4.jpg',
    accentTag: { en: 'Estudio y Moda', es: 'Estudio y Moda' },
    galleryCount: '40+ Series de Estudio',
  },
  {
    slug: 'maternity-family',
    title: { en: 'Maternidad y Familia', es: 'Maternidad y Familia' },
    subtitle: {
      en: 'Maternidad artística, cumpleaños infantiles y retratos familiares',
      es: 'Maternidad artística, cumpleaños infantiles y retratos familiares',
    },
    description: {
      en: 'Sesiones cálidas, luminosas y profundamente emotivas que celebran la nueva vida y el legado familiar.',
      es: 'Sesiones cálidas, luminosas y profundamente emotivas que celebran la nueva vida y el legado familiar.',
    },
    coverImage: '/fotos/edit-02.jpg',
    accentTag: { en: 'Retratos de Legado', es: 'Retratos de Legado' },
    galleryCount: '24+ Historias Familiares',
  },
  {
    slug: 'graduation-corporate-events',
    title: {
      en: 'Graduaciones, Eventos y Conciertos',
      es: 'Graduaciones, Eventos y Conciertos',
    },
    subtitle: {
      en: 'Graduaciones, conciertos en vivo, imagen ejecutiva y eventos especiales',
      es: 'Graduaciones, conciertos en vivo, imagen ejecutiva y eventos especiales',
    },
    description: {
      en: 'Fotografía de alta precisión para graduaciones, escenarios en vivo, artistas y eventos corporativos.',
      es: 'Fotografía de alta precisión para graduaciones, escenarios en vivo, artistas y eventos corporativos.',
    },
    coverImage: '/fotos/edicion-3.jpg',
    accentTag: { en: 'Graduaciones y Eventos', es: 'Graduaciones y Eventos' },
    galleryCount: '30+ Colecciones',
  },
];

export const PROJECT_GALLERIES: ProjectGallery[] = [
  {
    id: 'sophia-alexander-brown-hotel',
    categorySlug: 'weddings',
    categoryLabel: { en: 'Historia de Boda', es: 'Historia de Boda' },
    title: {
      en: 'Colección Nupcial — Elegancia y Hora Dorada',
      es: 'Colección Nupcial — Elegancia y Hora Dorada',
    },
    subtitle: {
      en: 'Retratos Nupciales en Exterior y Cobertura Cinematográfica',
      es: 'Retratos Nupciales en Exterior y Cobertura Cinematográfica',
    },
    venue: 'Jardines Históricos',
    location: 'Louisville, KY',
    date: '2026',
    photoCount: 34,
    coverImage: '/fotos/boda-47.jpg',
    story: {
      en: 'Una celebración inolvidable en Louisville donde la luz natural del atardecer y la dirección editorial se unieron para capturar retratos atemporales de los novios.',
      es: 'Una celebración inolvidable en Louisville donde la luz natural del atardecer y la dirección editorial se unieron para capturar retratos atemporales de los novios.',
    },
    gearUsed: 'Línea de Cine Sony Alpha • Sigma Art 35mm y 85mm f/1.4 • Iluminación Profoto',
    images: [
      {
        url: '/fotos/boda-47.jpg',
        caption: {
          en: 'Retrato editorial de novios bajo los árboles',
          es: 'Retrato editorial de novios bajo los árboles',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/boda-60.jpg',
        caption: {
          en: 'Retrato de la novia con luz cálida de atardecer',
          es: 'Retrato de la novia con luz cálida de atardecer',
        },
        aspect: 'portrait',
      },
    ],
  },
  {
    id: 'valeria-xv-royal-gold-gala',
    categorySlug: 'quinceaneras',
    categoryLabel: { en: 'Historia de Quinceañera', es: 'Historia de Quinceañera' },
    title: {
      en: 'Editorial Real XV — Sesiones Ecuestres y de Gala',
      es: 'Editorial Real XV — Sesiones Ecuestres y de Gala',
    },
    subtitle: {
      en: 'Sesión Editorial Pre-Quince con Caballo + Retratos Reales',
      es: 'Sesión Editorial Pre-Quince con Caballo + Retratos Reales',
    },
    venue: 'Locación Ecuestre y Jardines de Kentucky',
    location: 'Louisville, KY',
    date: '2026',
    photoCount: 30,
    coverImage: '/fotos/quince-caballo-10.jpg',
    story: {
      en: 'Una producción pre-quince de ensueño con vestidos de alta costura, retratos ecuestres al aire libre e iluminación dramática digna de portada.',
      es: 'Una producción pre-quince de ensueño con vestidos de alta costura, retratos ecuestres al aire libre e iluminación dramática digna de portada.',
    },
    gearUsed: 'Sony A7R V • 85mm f/1.4 Sigma Art • Flashes de Estudio Godox Pro',
    images: [
      {
        url: '/fotos/quince-caballo-10.jpg',
        caption: {
          en: 'Retrato editorial de Quinceañera junto a su caballo',
          es: 'Retrato editorial de Quinceañera junto a su caballo',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/quince-47.jpg',
        caption: {
          en: 'Vestido real bordado en azul y plata en locación natural',
          es: 'Vestido real bordado en azul y plata en locación natural',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/foto-9.jpg',
        caption: {
          en: 'Retrato en hora dorada en los campos de Kentucky',
          es: 'Retrato en hora dorada en los campos de Kentucky',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/foto-8-nuevo.jpg',
        caption: {
          en: 'Sesión exterior con luz de atardecer',
          es: 'Sesión exterior con luz de atardecer',
        },
        aspect: 'portrait',
      },
    ],
  },
  {
    id: 'dps-signature-studio-editorial',
    categorySlug: 'portraits-editorial',
    categoryLabel: { en: 'Retratos y Editorial', es: 'Retratos y Editorial' },
    title: {
      en: 'Retratos de Estudio, Moda y Artistas Musicales',
      es: 'Retratos de Estudio, Moda y Artistas Musicales',
    },
    subtitle: {
      en: 'Iluminación de Revista, Marca Personal y Sesiones Conceptuales',
      es: 'Iluminación de Revista, Marca Personal y Sesiones Conceptuales',
    },
    venue: 'Estudio Principal DPhotography',
    location: 'Louisville, KY',
    date: 'Colección de Estudio 2026',
    photoCount: 25,
    coverImage: '/fotos/melissa-4.jpg',
    story: {
      en: 'Creada en el estudio principal de DPhotography Studios en Louisville, esta serie reúne retratos editoriales para músicos, modelos, atletas y marcas personales.',
      es: 'Creada en el estudio principal de DPhotography Studios en Louisville, esta serie reúne retratos editoriales para músicos, modelos, atletas y marcas personales.',
    },
    gearUsed: 'Sony Alpha Cinema • Sigma Art 24-70mm f/2.8 • Godox Studio Pro',
    images: [
      {
        url: '/fotos/melissa-4.jpg',
        caption: {
          en: 'Retrato Musical en Estudio — Melissa',
          es: 'Retrato Musical en Estudio — Melissa',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/randy-26.jpg',
        caption: {
          en: 'Retrato Artístico con Guitarra en Estudio — Randy',
          es: 'Retrato Artístico con Guitarra en Estudio — Randy',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/chelsea-7.jpg',
        caption: {
          en: 'Marca Personal y Retrato Editorial — Chelsea',
          es: 'Marca Personal y Retrato Editorial — Chelsea',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/vane-2.jpg',
        caption: {
          en: 'Editorial Urbano de Moda — Vane',
          es: 'Editorial Urbano de Moda — Vane',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/yelena-14.jpg',
        caption: {
          en: 'Sesión Deportiva y Editorial — Yelena',
          es: 'Sesión Deportiva y Editorial — Yelena',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/foto-1-2.jpg',
        caption: {
          en: 'Retrato de Belleza y Alta Costura en Estudio',
          es: 'Retrato de Belleza y Alta Costura en Estudio',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/edicion-02.jpg',
        caption: {
          en: 'Iluminación Escultórica en Estudio',
          es: 'Iluminación Escultórica en Estudio',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/randy-29.jpg',
        caption: {
          en: 'Retrato de Artista en Blanco y Negro / Color',
          es: 'Retrato de Artista en Blanco y Negro / Color',
        },
        aspect: 'portrait',
      },
    ],
  },
  {
    id: 'martinez-maternity-golden-hour',
    categorySlug: 'maternity-family',
    categoryLabel: { en: 'Maternidad y Familia', es: 'Maternidad y Familia' },
    title: {
      en: 'Celebraciones Familiares y Retratos Infantiles en Estudio',
      es: 'Celebraciones Familiares y Retratos Infantiles en Estudio',
    },
    subtitle: {
      en: 'Primer Año, Escenarios Temáticos y Recuerdos Familiares',
      es: 'Primer Año, Escenarios Temáticos y Recuerdos Familiares',
    },
    venue: 'Estudio Principal DPhotography',
    location: 'Louisville, KY',
    date: '2026',
    photoCount: 26,
    coverImage: '/fotos/edit-02.jpg',
    story: {
      en: 'Sesiones llenas de ternura y escenarios personalizados en estudio para celebrar el primer cumpleaños y las etapas más dulces de la familia.',
      es: 'Sesiones llenas de ternura y escenarios personalizados en estudio para celebrar el primer cumpleaños y las etapas más dulces de la familia.',
    },
    gearUsed: 'Sony A7R V • 50mm f/1.2 GM • Iluminación Suave de Estudio',
    images: [
      {
        url: '/fotos/edit-02.jpg',
        caption: {
          en: 'Sesión temática de Primer Cumpleaños en estudio',
          es: 'Sesión temática de Primer Cumpleaños en estudio',
        },
        aspect: 'portrait',
      },
    ],
  },
  {
    id: 'louisville-estates-corporate-grad',
    categorySlug: 'graduation-corporate-events',
    categoryLabel: {
      en: 'Graduaciones, Conciertos y Eventos',
      es: 'Graduaciones, Conciertos y Eventos',
    },
    title: {
      en: 'Graduaciones en Louisville y Conciertos en Vivo (Fourth Street Live!)',
      es: 'Graduaciones en Louisville y Conciertos en Vivo (Fourth Street Live!)',
    },
    subtitle: {
      en: 'Retratos de Graduación, Escenarios Musicales y Eventos Masivos',
      es: 'Retratos de Graduación, Escenarios Musicales y Eventos Masivos',
    },
    venue: 'Fourth Street Live! y Locaciones Históricas',
    location: 'Louisville, KY',
    date: '2026',
    photoCount: 28,
    coverImage: '/fotos/edicion-3.jpg',
    story: {
      en: 'Desde sesiones de graduación llenas de orgullo hasta la energía vibrante de conciertos en vivo en Fourth Street Live! Louisville.',
      es: 'Desde sesiones de graduación llenas de orgullo hasta la energía vibrante de conciertos en vivo en Fourth Street Live! Louisville.',
    },
    gearUsed: 'Sony A7R V • 24-70mm f/2.8 GM II • 70-200mm f/2.8 GM II',
    images: [
      {
        url: '/fotos/edicion-3.jpg',
        caption: {
          en: 'Retrato de Graduación Class of 2025',
          es: 'Retrato de Graduación Class of 2025',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/update-10.jpg',
        caption: {
          en: 'Celebración de Graduación en arquitectura clásica',
          es: 'Celebración de Graduación en arquitectura clásica',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/originales-20.jpg',
        caption: {
          en: 'Retrato de Graduación en escalinata histórica',
          es: 'Retrato de Graduación en escalinata histórica',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/concierto-6159.jpg',
        caption: {
          en: 'Concierto en vivo en Fourth Street Live! Louisville',
          es: 'Concierto en vivo en Fourth Street Live! Louisville',
        },
        aspect: 'landscape',
      },
      {
        url: '/fotos/concierto-7232.jpg',
        caption: {
          en: 'Energía en tarima — Cobertura de eventos y conciertos',
          es: 'Energía en tarima — Cobertura de eventos y conciertos',
        },
        aspect: 'portrait',
      },
      {
        url: '/fotos/edit-11.jpg',
        caption: {
          en: 'Retrato de agrupación musical en exterior',
          es: 'Retrato de agrupación musical en exterior',
        },
        aspect: 'portrait',
      },
    ],
  },
];

export const FILM_PRODUCTIONS: FilmProduction[] = [
  {
    id: 'eternal-vows-wedding-trailer',
    categorySlug: 'wedding-films',
    categoryLabel: {
      en: 'Tráiler Cinematográfico de Boda',
      es: 'Tráiler Cinematográfico de Boda',
    },
    division: 'DPhotography Studios & Films',
    title: {
      en: 'SOFÍA Y ALEXANDER — "SINFONÍA ETERNA"',
      es: 'SOFÍA Y ALEXANDER — "SINFONÍA ETERNA"',
    },
    subtitle: {
      en: 'Tráiler de Boda en 4K Anamórfico • The Brown Hotel, Louisville',
      es: 'Tráiler de Boda en 4K Anamórfico • The Brown Hotel, Louisville',
    },
    description: {
      en: 'Grabado con doble cámara de cine, captura de votos con audio cristalino y tomas aéreas con dron. Colorizado con nuestro perfil cinematográfico cálido.',
      es: 'Grabado con doble cámara de cine, captura de votos con audio cristalino y tomas aéreas con dron. Colorizado con nuestro perfil cinematográfico cálido.',
    },
    duration: '03:42',
    format: '4K Cine RAW • 24fps • Audio Dolby',
    year: '2026',
    location: 'Louisville, KY',
    thumbnail:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-forest-42428-large.mp4',
    featuredOnHome: true,
    credits: {
      director: 'DPhotography Studios',
      cinematographer: 'Director de Fotografía Principal — Unidad de Cine',
      editor: 'Laboratorio de Edición y Color DPhotography',
      productionCompany: 'DPhotography Studios & Films',
    },
  },
  {
    id: 'valeria-xv-royal-cinema',
    categorySlug: 'quince-films',
    categoryLabel: {
      en: 'Película Highlight de Quinceañera',
      es: 'Película Highlight de Quinceañera',
    },
    division: 'DPhotography Studios & Films',
    title: {
      en: 'VALERIA XV — "LA CORONA DORADA"',
      es: 'VALERIA XV — "LA CORONA DORADA"',
    },
    subtitle: {
      en: 'Tráiler Pre-Quince de Cine + Película Highlight del Evento',
      es: 'Tráiler Pre-Quince de Cine + Película Highlight del Evento',
    },
    description: {
      en: 'Dirigido como una película de Hollywood. Incluye un tráiler conceptual pre-quince proyectado en pantalla gigante antes de su gran entrada.',
      es: 'Dirigido como una película de Hollywood. Incluye un tráiler conceptual pre-quince proyectado en pantalla gigante antes de su gran entrada.',
    },
    duration: '04:15',
    format: '4K 60fps / 24fps • Anillo Estabilizador Tilta',
    year: '2026',
    location: 'Louisville, KY',
    thumbnail:
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1400&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-woman-in-a-long-dress-walking-in-a-field-41697-large.mp4',
    featuredOnHome: true,
    credits: {
      director: 'DPhotography Studios',
      cinematographer: 'Unidad de Cine DPhotography',
      editor: 'Suite de Color y Sonido DPhotography',
      productionCompany: 'DPhotography Studios & Films',
    },
  },
  {
    id: 'dmedia-records-midnight-gold-mv',
    categorySlug: 'music-videos',
    categoryLabel: {
      en: 'Video Musical Oficial',
      es: 'Video Musical Oficial',
    },
    division: 'DMedia Records',
    title: {
      en: 'NOCHE DE ORO — VIDEO MUSICAL OFICIAL',
      es: 'NOCHE DE ORO — VIDEO MUSICAL OFICIAL',
    },
    subtitle: {
      en: 'Una Producción de DMedia Records • Visual de Artista y Performance',
      es: 'Una Producción de DMedia Records • Visual de Artista y Performance',
    },
    description: {
      en: 'Coreografía de cámara con anillo Tilta, iluminación RGB de cine, efectos especiales y edición rítmica producida por nuestra división musical DMedia Records.',
      es: 'Coreografía de cámara con anillo Tilta, iluminación RGB de cine, efectos especiales y edición rítmica producida por nuestra división musical DMedia Records.',
    },
    duration: '03:18',
    format: '4K Anamórfico • Master DMedia Records',
    year: '2026',
    location: 'Louisville / Nashville',
    thumbnail: '/brand/creator-crouching-tilta-rig.jpg',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-musician-playing-guitar-in-a-dark-room-with-lights-41724-large.mp4',
    featuredOnHome: true,
    credits: {
      director: 'Director Creativo DMedia Records',
      cinematographer: 'Departamento de Cámara DPhotography y DMedia',
      editor: 'Efectos Visuales y Color DMedia',
      productionCompany: 'DMedia Records / DPhotography Studios',
    },
  },
  {
    id: 'echoes-of-kentucky-short-film',
    categorySlug: 'original-films',
    categoryLabel: {
      en: 'Cortometraje Original',
      es: 'Cortometraje Original',
    },
    division: 'DPhotography Studios & Films',
    title: {
      en: '"SOMBRAS ANTES DEL AMANECER" — CORTOMETRAJE ORIGINAL',
      es: '"SOMBRAS ANTES DEL AMANECER" — CORTOMETRAJE ORIGINAL',
    },
    subtitle: {
      en: 'Cine Narrativo y Producción Original',
      es: 'Cine Narrativo y Producción Original',
    },
    description: {
      en: 'Un cortometraje narrativo original que explora la ambición, el sacrificio y el legado. Filmado con lentes de cine, diseño sonoro original y colorización teatral.',
      es: 'Un cortometraje narrativo original que explora la ambición, el sacrificio y el legado. Filmado con lentes de cine, diseño sonoro original y colorización teatral.',
    },
    duration: '14:20',
    format: '4K DCI 2.39:1 • Banda Sonora Original',
    year: '2026',
    location: 'Kentucky',
    thumbnail: '/brand/creator-directors-chair-cinema-rig.jpg',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-cameraman-recording-a-scene-in-a-studio-41717-large.mp4',
    featuredOnHome: false,
    credits: {
      director: 'DPhotography Studios',
      cinematographer: 'Director de Fotografía Principal',
      editor: 'Postproducción de Cine DPhotography',
      productionCompany: 'DPhotography Studios & Films',
    },
  },
  {
    id: 'bourbon-reserve-luxury-commercial',
    categorySlug: 'commercial-films',
    categoryLabel: {
      en: 'Comercial y Cine de Marca',
      es: 'Comercial y Cine de Marca',
    },
    division: 'DPhotography Studios & Films',
    title: {
      en: 'HERENCIA DE KENTUCKY — COMERCIAL DE MARCA DE LUJO',
      es: 'HERENCIA DE KENTUCKY — COMERCIAL DE MARCA DE LUJO',
    },
    subtitle: {
      en: 'Cinematografía Macro de Alta Velocidad y Narrativa de Marca',
      es: 'Cinematografía Macro de Alta Velocidad y Narrativa de Marca',
    },
    description: {
      en: 'Creado para marcas de hospitalidad y negocios de alto nivel. Diseñado para elevar el prestigio de tu empresa en campañas web, televisión y redes sociales.',
      es: 'Creado para marcas de hospitalidad y negocios de alto nivel. Diseñado para elevar el prestigio de tu empresa en campañas web, televisión y redes sociales.',
    },
    duration: '01:30',
    format: '4K 120fps Macro • Master Comercial',
    year: '2026',
    location: 'Louisville, KY',
    thumbnail:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85',
    videoPreviewUrl:
      'https://assets.mixkit.co/videos/preview/mixkit-cameraman-recording-a-scene-in-a-studio-41717-large.mp4',
    featuredOnHome: false,
    credits: {
      director: 'Unidad Comercial DPhotography',
      cinematographer: 'Director de Fotografía Principal',
      editor: 'Postproducción Comercial DPhotography',
      productionCompany: 'DPhotography Studios & Films',
    },
  },
];

export const PACKAGES_DATA: PackageTier[] = [
  {
    id: 'wedding-photo-signature',
    categorySlug: 'wedding-photo',
    categoryName: { en: 'Fotografía de Bodas', es: 'Fotografía de Bodas' },
    tierName: {
      en: 'Colección Legado Editorial (Fotografía)',
      es: 'Colección Legado Editorial (Fotografía)',
    },
    tagline: {
      en: 'Cobertura fotográfica de boda de día completo y álbum artesanal de lujo',
      es: 'Cobertura fotográfica de boda de día completo y álbum artesanal de lujo',
    },
    startingPrice: '$2,800',
    durationLabel: {
      en: '8 a 10 Horas de Cobertura',
      es: '8 a 10 Horas de Cobertura',
    },
    popular: false,
    deliverables: {
      en: [
        '8–10 Horas de Cobertura Continua el Día de la Boda',
        'Fotógrafo Principal + Segundo Fotógrafo Asociado',
        '600+ Fotografías Editadas en Alta Resolución',
        'Sesión Fotográfica de Compromiso (Engagement) Incluida',
        'Galería Privada en Pixieset con Contraseña y Descarga Directa',
        'Álbum de Boda Artesanal 12x12 en Lino o Piel Italiana',
        'Avance de 25 Fotos (Sneak Peek) en 48 Horas',
      ],
      es: [
        '8–10 Horas de Cobertura Continua el Día de la Boda',
        'Fotógrafo Principal + Segundo Fotógrafo Asociado',
        '600+ Fotografías Editadas en Alta Resolución',
        'Sesión Fotográfica de Compromiso (Engagement) Incluida',
        'Galería Privada en Pixieset con Contraseña y Descarga Directa',
        'Álbum de Boda Artesanal 12x12 en Lino o Piel Italiana',
        'Avance de 25 Fotos (Sneak Peek) en 48 Horas',
      ],
    },
    optionalExtras: {
      en: [
        'Hora Adicional de Cobertura ($300/hr)',
        'Álbumes Réplica para Padres',
        'Cobertura de Cena de Ensayo',
      ],
      es: [
        'Hora Adicional de Cobertura ($300/hr)',
        'Álbumes Réplica para Padres',
        'Cobertura de Cena de Ensayo',
      ],
    },
  },
  {
    id: 'wedding-films-cinema',
    categorySlug: 'wedding-films',
    categoryName: { en: 'Películas de Boda', es: 'Películas de Boda' },
    tierName: {
      en: 'Colección Estreno de Cine (Video)',
      es: 'Colección Estreno de Cine (Video)',
    },
    tagline: {
      en: 'Cinematografía de boda en 4K multicámara, tráiler y película completa',
      es: 'Cinematografía de boda en 4K multicámara, tráiler y película completa',
    },
    startingPrice: '$3,100',
    durationLabel: { en: '8 a 10 Horas de Cine', es: '8 a 10 Horas de Cine' },
    popular: false,
    deliverables: {
      en: [
        '2 Operadores de Cámara de Cine (4K Sony Cinema + Tilta Gimbal)',
        'Tráiler Cinematográfico de 60–90 Segundos (En 7 Días)',
        'Película Highlight Emocional de 7–10 Minutos',
        'Edición Completa Multicámara de Ceremonia y Brindis',
        'Cinematografía Aérea con Dron 4K de la Locación',
        'Captura de Audio Profesional Inalámbrico para Votos y Discursos',
        'Entrega Digital en Sala de Cine Online + USB de Colección',
      ],
      es: [
        '2 Operadores de Cámara de Cine (4K Sony Cinema + Tilta Gimbal)',
        'Tráiler Cinematográfico de 60–90 Segundos (En 7 Días)',
        'Película Highlight Emocional de 7–10 Minutos',
        'Edición Completa Multicámara de Ceremonia y Brindis',
        'Cinematografía Aérea con Dron 4K de la Locación',
        'Captura de Audio Profesional Inalámbrico para Votos y Discursos',
        'Entrega Digital en Sala de Cine Online + USB de Colección',
      ],
    },
    optionalExtras: {
      en: [
        'Disco Duro con Material Original (RAW)',
        'Edición el Mismo Día para Proyectar en la Fiesta',
        'Tomas Vintage Estilo Super 8mm',
      ],
      es: [
        'Disco Duro con Material Original (RAW)',
        'Edición el Mismo Día para Proyectar en la Fiesta',
        'Tomas Vintage Estilo Super 8mm',
      ],
    },
  },
  {
    id: 'wedding-photo-video-combo',
    categorySlug: 'wedding-combo',
    categoryName: {
      en: 'Boda Foto + Video Combinado',
      es: 'Boda Foto + Video Combinado',
    },
    tierName: {
      en: 'Colección Insignia Grand Studio (Foto + Cine)',
      es: 'Colección Insignia Grand Studio (Foto + Cine)',
    },
    tagline: {
      en: 'Nuestra colección más solicitada con equipo completo de fotografía y cine',
      es: 'Nuestra colección más solicitada con equipo completo de fotografía y cine',
    },
    startingPrice: '$5,200',
    durationLabel: {
      en: 'Día Completo (Hasta 10 Horas)',
      es: 'Día Completo (Hasta 10 Horas)',
    },
    popular: true,
    deliverables: {
      en: [
        'Equipo Creativo de 4 Profesionales (2 Fotógrafos + 2 Cinematógrafos)',
        '750+ Fotografías Editadas en Alta Resolución en Galería Pixieset',
        'Tráiler de 1 Minuto + Película Principal de Boda de 8–12 Minutos en 4K',
        'Video Completo de Ceremonia, Vals y Protocolo',
        'Sesión de Compromiso de Fotos + Video Save-the-Date Incluido',
        'Dron 4K + Iluminación de Estudio Profesional en la Recepción',
        'Álbum de Lujo 12x12 + Entrega Prioritaria',
      ],
      es: [
        'Equipo Creativo de 4 Profesionales (2 Fotógrafos + 2 Cinematógrafos)',
        '750+ Fotografías Editadas en Alta Resolución en Galería Pixieset',
        'Tráiler de 1 Minuto + Película Principal de Boda de 8–12 Minutos en 4K',
        'Video Completo de Ceremonia, Vals y Protocolo',
        'Sesión de Compromiso de Fotos + Video Save-the-Date Incluido',
        'Dron 4K + Iluminación de Estudio Profesional en la Recepción',
        'Álbum de Lujo 12x12 + Entrega Prioritaria',
      ],
    },
    optionalExtras: {
      en: [
        'Cabina de Video 360° Alfombra Roja',
        'Cuadro Gigante Enmarcado para Entrada del Salón',
        'Paquete de Viaje de Destino',
      ],
      es: [
        'Cabina de Video 360° Alfombra Roja',
        'Cuadro Gigante Enmarcado para Entrada del Salón',
        'Paquete de Viaje de Destino',
      ],
    },
  },
  {
    id: 'quinceanera-royal-combo',
    categorySlug: 'quinceaneras',
    categoryName: {
      en: 'Quinceañeras (Foto + Cine)',
      es: 'Quinceañeras (Foto + Cine)',
    },
    tierName: {
      en: 'Producción Real de Quinceañera (Foto + Película)',
      es: 'Producción Real de Quinceañera (Foto + Película)',
    },
    tagline: {
      en: 'Sesión pre-quince editorial, tráiler de cine, fotos y película completa del evento',
      es: 'Sesión pre-quince editorial, tráiler de cine, fotos y película completa del evento',
    },
    startingPrice: '$3,800',
    durationLabel: {
      en: 'Sesión Pre-Quince + Día Completo',
      es: 'Sesión Pre-Quince + Día Completo',
    },
    popular: true,
    deliverables: {
      en: [
        'Sesión Fotográfica Pre-Quince de Alta Costura (En Estudio o Locación)',
        'Tráiler Cinematográfico Pre-Quince (¡Listo para Proyectar en el Salón!)',
        'Cobertura Completa: Preparación, Misa/Ceremonia, Paseo y Recepción',
        'Tráiler del Evento + Película Cinematográfica de 6–8 Minutos en 4K',
        'Grabación Multicámara Completa del Vals, Baile Sorpresa y Coronación',
        '500+ Fotos Editadas en Pixieset + Cuadro de Entrada 20x30 Pulgadas',
        'Libro de Firmas de Lujo Diseñado con las Fotos Pre-Quince',
      ],
      es: [
        'Sesión Fotográfica Pre-Quince de Alta Costura (En Estudio o Locación)',
        'Tráiler Cinematográfico Pre-Quince (¡Listo para Proyectar en el Salón!)',
        'Cobertura Completa: Preparación, Misa/Ceremonia, Paseo y Recepción',
        'Tráiler del Evento + Película Cinematográfica de 6–8 Minutos en 4K',
        'Grabación Multicámara Completa del Vals, Baile Sorpresa y Coronación',
        '500+ Fotos Editadas en Pixieset + Cuadro de Entrada 20x30 Pulgadas',
        'Libro de Firmas de Lujo Diseñado con las Fotos Pre-Quince',
      ],
    },
    optionalExtras: {
      en: [
        'Segunda Sesión con Cambio de Vestido en Estudio',
        'Álbum de Lujo en Caja Acrílica',
        'Dron 4K para Llegada en Limusina',
      ],
      es: [
        'Segunda Sesión con Cambio de Vestido en Estudio',
        'Álbum de Lujo en Caja Acrílica',
        'Dron 4K para Llegada en Limusina',
      ],
    },
  },
  {
    id: 'portrait-editorial-sessions',
    categorySlug: 'portraits',
    categoryName: {
      en: 'Sesiones de Retrato y Estudio',
      es: 'Sesiones de Retrato y Estudio',
    },
    tierName: {
      en: 'Sesión Editorial en Estudio o Locación',
      es: 'Sesión Editorial en Estudio o Locación',
    },
    tagline: {
      en: 'Individual, familia, maternidad, graduación y marca personal',
      es: 'Individual, familia, maternidad, graduación y marca personal',
    },
    startingPrice: '$450',
    durationLabel: {
      en: '90 Minutos • 2–3 Cambios de Ropa',
      es: '90 Minutos • 2–3 Cambios de Ropa',
    },
    deliverables: {
      en: [
        'Sesión Dirigida de 90 Minutos (En Nuestro Estudio en Louisville o Exterior)',
        'Hasta 3 Cambios de Vestuario e Iluminación Profesional de Revista',
        '35 Fotografías Retocadas en Alta Resolución',
        'Galería Privada en Pixieset con Descarga Directa',
        'Entrega Express Disponible en 72 Horas',
      ],
      es: [
        'Sesión Dirigida de 90 Minutos (En Nuestro Estudio en Louisville o Exterior)',
        'Hasta 3 Cambios de Vestuario e Iluminación Profesional de Revista',
        '35 Fotografías Retocadas en Alta Resolución',
        'Galería Privada en Pixieset con Descarga Directa',
        'Entrega Express Disponible en 72 Horas',
      ],
    },
    optionalExtras: {
      en: [
        'Reel Vertical Cinematográfico para Instagram/TikTok ($150)',
        'Maquillaje y Peinado Profesional',
        'Cuadros e Impresiones Fine-Art',
      ],
      es: [
        'Reel Vertical Cinematográfico para Instagram/TikTok ($150)',
        'Maquillaje y Peinado Profesional',
        'Cuadros e Impresiones Fine-Art',
      ],
    },
  },
  {
    id: 'dmedia-music-video-production',
    categorySlug: 'music-videos',
    categoryName: {
      en: 'Producción de Videos Musicales',
      es: 'Producción de Videos Musicales',
    },
    tierName: {
      en: 'DMedia Records — Producción Oficial de Video Musical',
      es: 'DMedia Records — Producción Oficial de Video Musical',
    },
    tagline: {
      en: 'Concepto, filmación con rig de cine, iluminación, edición y colorización',
      es: 'Concepto, filmación con rig de cine, iluminación, edición y colorización',
    },
    startingPrice: '$1,500',
    durationLabel: {
      en: '1 a 2 Días de Rodaje',
      es: '1 a 2 Días de Rodaje',
    },
    popular: true,
    deliverables: {
      en: [
        'Desarrollo de Concepto Creativo, Guion Técnico y Scouting de Locaciones',
        'Filmación con Rig de Cine Completo (Sony Cinema + Tilta Ring + Monitores)',
        'Paquete de Iluminación Cinematográfica RGB y Tubos LED',
        'Edición Master en 4K + Colorización de Cine y Efectos Visuales',
        '3 Tráilers Verticales para Lanzamiento (Reels, TikTok y YouTube Shorts)',
        '15 Fotos de Detrás de Cámaras y Portada Oficial para Spotify / Apple Music',
      ],
      es: [
        'Desarrollo de Concepto Creativo, Guion Técnico y Scouting de Locaciones',
        'Filmación con Rig de Cine Completo (Sony Cinema + Tilta Ring + Monitores)',
        'Paquete de Iluminación Cinematográfica RGB y Tubos LED',
        'Edición Master en 4K + Colorización de Cine y Efectos Visuales',
        '3 Tráilers Verticales para Lanzamiento (Reels, TikTok y YouTube Shorts)',
        '15 Fotos de Detrás de Cámaras y Portada Oficial para Spotify / Apple Music',
      ],
    },
    optionalExtras: {
      en: [
        'Renta de Estudio / Ciclorama',
        'Casting de Modelos, Bailarines y Extras',
        'Autos Exóticos o Escenografía Especial',
      ],
      es: [
        'Renta de Estudio / Ciclorama',
        'Casting de Modelos, Bailarines y Extras',
        'Autos Exóticos o Escenografía Especial',
      ],
    },
  },
  {
    id: 'commercial-brand-production',
    categorySlug: 'commercial',
    categoryName: {
      en: 'Producciones Comerciales y Marcas',
      es: 'Producciones Comerciales y Marcas',
    },
    tierName: {
      en: 'Campaña Comercial y Video Corporativo',
      es: 'Campaña Comercial y Video Corporativo',
    },
    tagline: {
      en: 'Anuncios para empresas, videos promocionales y contenido de marca',
      es: 'Anuncios para empresas, videos promocionales y contenido de marca',
    },
    startingPrice: '$1,800',
    durationLabel: {
      en: 'Alcance Personalizado por Campaña',
      es: 'Alcance Personalizado por Campaña',
    },
    deliverables: {
      en: [
        'Comercial Principal de Marca de 60–90 Segundos en 4K',
        '3 Versiones para Anuncios en Redes Sociales (15s / 30s Horizontal y Vertical)',
        '30 Fotografías Comerciales de Producto, Instalaciones y Equipo',
        'Guion Comercial, Captura de Entrevistas y Música con Licencia Comercial',
        'Derechos de Uso Comercial para Web y Publicidad Pagada',
      ],
      es: [
        'Comercial Principal de Marca de 60–90 Segundos en 4K',
        '3 Versiones para Anuncios en Redes Sociales (15s / 30s Horizontal y Vertical)',
        '30 Fotografías Comerciales de Producto, Instalaciones y Equipo',
        'Guion Comercial, Captura de Entrevistas y Música con Licencia Comercial',
        'Derechos de Uso Comercial para Web y Publicidad Pagada',
      ],
    },
    optionalExtras: {
      en: [
        'Plan Mensual de Contenido para Empresas',
        'Versiones del Anuncio en Español e Inglés',
        'Recorrido Aéreo con Dron',
      ],
      es: [
        'Plan Mensual de Contenido para Empresas',
        'Versiones del Anuncio en Español e Inglés',
        'Recorrido Aéreo con Dron',
      ],
    },
  },
  {
    id: 'event-coverage-package',
    categorySlug: 'events',
    categoryName: {
      en: 'Cobertura de Eventos y Galas',
      es: 'Cobertura de Eventos y Galas',
    },
    tierName: {
      en: 'Cobertura de Eventos Especiales (Foto + Recap)',
      es: 'Cobertura de Eventos Especiales (Foto + Recap)',
    },
    tagline: {
      en: 'Galas, conciertos, cumpleaños de lujo, conferencias y eventos privados',
      es: 'Galas, conciertos, cumpleaños de lujo, conferencias y eventos privados',
    },
    startingPrice: '$1,200',
    durationLabel: {
      en: '4 a 6 Horas de Cobertura',
      es: '4 a 6 Horas de Cobertura',
    },
    deliverables: {
      en: [
        'Hasta 5 Horas de Cobertura de Fotografía y Video Recap',
        'Aftermovie / Video Resumen Dinámico de 60–90 Segundos en 4K',
        '250+ Fotografías Editadas Entregadas en Galería Pixieset',
        '15 Fotos de Avance al Día Siguiente para Redes y Prensa',
      ],
      es: [
        'Hasta 5 Horas de Cobertura de Fotografía y Video Recap',
        'Aftermovie / Video Resumen Dinámico de 60–90 Segundos en 4K',
        '250+ Fotografías Editadas Entregadas en Galería Pixieset',
        '15 Fotos de Avance al Día Siguiente para Redes y Prensa',
      ],
    },
    optionalExtras: {
      en: [
        'Estación de Retratos en Alfombra Roja',
        'Grabación Multicámara de Escenario en Vivo',
      ],
      es: [
        'Estación de Retratos en Alfombra Roja',
        'Grabación Multicámara de Escenario en Vivo',
      ],
    },
  },
];

export const CLIENT_GALLERIES_DATA: ClientGalleryItem[] = [
  {
    id: 'gal-sophia-alex',
    code: 'BROWN2026',
    clientNames: 'Sophia y Alexander',
    eventType: { en: 'Colección de Boda', es: 'Colección de Boda' },
    date: '18 Oct, 2026',
    venue: 'The Brown Hotel • Louisville, KY',
    photoCount: 642,
    coverImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
    isLocked: false,
    pixiesetUrl: 'https://pixieset.com',
    previewPhotos: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'gal-valeria-xv',
    code: 'VALERIA15',
    clientNames: 'Valeria XV — Gala Real',
    eventType: {
      en: 'Quinceañera + Pre-Quince',
      es: 'Quinceañera + Pre-Quince',
    },
    date: '24 Ago, 2026',
    venue: 'The Olmsted • Louisville, KY',
    photoCount: 518,
    coverImage:
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1000&q=80',
    isLocked: true,
    pixiesetUrl: 'https://pixieset.com',
    previewPhotos: [
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'gal-camila-mateo',
    code: 'CASTLE26',
    clientNames: 'Camila y Mateo',
    eventType: { en: 'Boda Foto + Cine', es: 'Boda Foto + Cine' },
    date: '12 Sep, 2026',
    venue: 'The Kentucky Castle',
    photoCount: 710,
    coverImage:
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80',
    isLocked: true,
    pixiesetUrl: 'https://pixieset.com',
    previewPhotos: [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    id: 'gal-studio-editorial',
    code: 'DPS2026',
    clientNames: 'Editorial en Estudio DPhotography',
    eventType: {
      en: 'Serie de Estudio y Marca Personal',
      es: 'Serie de Estudio y Marca Personal',
    },
    date: 'Oct 2026',
    venue: 'Estudio Principal DPhotography',
    photoCount: 45,
    coverImage: '/brand/creator-tuxedo-portrait.jpg',
    isLocked: false,
    pixiesetUrl: 'https://pixieset.com',
    previewPhotos: [
      '/brand/creator-tuxedo-portrait.jpg',
      '/brand/creator-tuxedo-fullbody.jpg',
      '/brand/creator-editorial-angle.jpg',
      '/brand/creator-directors-chair-cinema-rig.jpg',
    ],
  },
];

export const EXPERIENCE_STEPS = [
  {
    step: '01',
    title: { en: 'Consulta Privada', es: 'Consulta Privada' },
    description: {
      en: 'Nos reunimos en persona en Louisville o por videollamada para conocer tu historia, entender tu visión y diseñar tu colección de foto y cine a medida.',
      es: 'Nos reunimos en persona en Louisville o por videollamada para conocer tu historia, entender tu visión y diseñar tu colección de foto y cine a medida.',
    },
  },
  {
    step: '02',
    title: {
      en: 'Reserva de Fecha y Contrato',
      es: 'Reserva de Fecha y Contrato',
    },
    description: {
      en: 'Asegura tu fecha fácilmente con contrato digital y anticipo. Nuestro equipo queda reservado exclusivamente para tu gran día.',
      es: 'Asegura tu fecha fácilmente con contrato digital y anticipo. Nuestro equipo queda reservado exclusivamente para tu gran día.',
    },
  },
  {
    step: '03',
    title: {
      en: 'Pre-Producción y Cronograma',
      es: 'Pre-Producción y Cronograma',
    },
    description: {
      en: 'Creamos un plan detallado de iluminación, locaciones y horarios—además de realizar tu sesión pre-boda o pre-quince antes del gran evento.',
      es: 'Creamos un plan detallado de iluminación, locaciones y horarios—además de realizar tu sesión pre-boda o pre-quince antes del gran evento.',
    },
  },
  {
    step: '04',
    title: {
      en: 'Día de Rodaje y Producción',
      es: 'Día de Rodaje y Producción',
    },
    description: {
      en: 'Dirección artística tranquila y profesional con cámaras de cine 4K, anillo estabilizador Tilta, iluminación de estudio y dron.',
      es: 'Dirección artística tranquila y profesional con cámaras de cine 4K, anillo estabilizador Tilta, iluminación de estudio y dron.',
    },
  },
  {
    step: '05',
    title: {
      en: 'Edición Master y Colorización de Cine',
      es: 'Edición Master y Colorización de Cine',
    },
    description: {
      en: 'Cada fotografía se retoca cuidadosamente y cada película se edita con diseño sonoro envolvente y colorización cinematográfica de lujo.',
      es: 'Cada fotografía se retoca cuidadosamente y cada película se edita con diseño sonoro envolvente y colorización cinematográfica de lujo.',
    },
  },
  {
    step: '06',
    title: {
      en: 'Estreno Digital y Entrega en Pixieset',
      es: 'Estreno Digital y Entrega en Pixieset',
    },
    description: {
      en: 'Recibe tu galería privada en Pixieset para descargar en máxima resolución, enlaces de cine 4K y álbumes italianos hechos a mano.',
      es: 'Recibe tu galería privada en Pixieset para descargar en máxima resolución, enlaces de cine 4K y álbumes italianos hechos a mano.',
    },
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 't1',
    client: 'Sophia y Alexander M.',
    role: {
      en: 'Boda en The Brown Hotel, Louisville',
      es: 'Boda en The Brown Hotel, Louisville',
    },
    quote: {
      en: 'Cuando vimos nuestro tráiler de boda por primera vez, toda nuestra familia lloró de emoción. Literalmente se ve y se escucha como una película de cine, y las fotos parecen de revista.',
      es: 'Cuando vimos nuestro tráiler de boda por primera vez, toda nuestra familia lloró de emoción. Literalmente se ve y se escucha como una película de cine, y las fotos parecen de revista.',
    },
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't2',
    client: 'Familia Hernández — Valeria XV',
    role: {
      en: 'Producción Completa de Quinceañera',
      es: 'Producción Completa de Quinceañera',
    },
    quote: {
      en: 'Proyectar el tráiler pre-quince de Valeria en la pantalla gigante justo antes de su entrada dejó a los 300 invitados sin palabras. ¡La mejor inversión que hicimos para sus XV!',
      es: 'Proyectar el tráiler pre-quince de Valeria en la pantalla gigante justo antes de su entrada dejó a los 300 invitados sin palabras. ¡La mejor inversión que hicimos para sus XV!',
    },
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 't3',
    client: 'Jay V. — Artista Musical',
    role: {
      en: 'Video Musical — DMedia Records',
      es: 'Video Musical — DMedia Records',
    },
    quote: {
      en: 'Las tomas con el rig de cine, la iluminación y la edición llevaron mi lanzamiento a otro nivel. DPhotography Studios y DMedia Records tienen calidad de industria.',
      es: 'Las tomas con el rig de cine, la iluminación y la edición llevaron mi lanzamiento a otro nivel. DPhotography Studios y DMedia Records tienen calidad de industria.',
    },
    rating: 5,
    image: '/brand/creator-crouching-tilta-rig.jpg',
  },
];

export const FAQ_ITEMS = [
  {
    q: {
      en: '¿Con cuánta anticipación debemos reservar nuestra Boda o Quinceañera?',
      es: '¿Con cuánta anticipación debemos reservar nuestra Boda o Quinceañera?',
    },
    a: {
      en: 'La mayoría de las parejas y familias reservan entre 6 y 14 meses antes, especialmente para sábados de temporada alta. Para sesiones de retrato, videos musicales o comerciales, de 2 a 4 semanas de anticipación es ideal.',
      es: 'La mayoría de las parejas y familias reservan entre 6 y 14 meses antes, especialmente para sábados de temporada alta. Para sesiones de retrato, videos musicales o comerciales, de 2 a 4 semanas de anticipación es ideal.',
    },
  },
  {
    q: {
      en: '¿Qué se necesita para apartar oficialmente nuestra fecha?',
      es: '¿Qué se necesita para apartar oficialmente nuestra fecha?',
    },
    a: {
      en: 'Un anticipo del 30% y la firma del contrato digital aseguran tu fecha exclusivamente en nuestro calendario. El resto se puede dividir en pagos cómodos antes de tu evento.',
      es: 'Un anticipo del 30% y la firma del contrato digital aseguran tu fecha exclusivamente en nuestro calendario. El resto se puede dividir en pagos cómodos antes de tu evento.',
    },
  },
  {
    q: {
      en: '¿Cuál es el tiempo de entrega de las fotografías y películas?',
      es: '¿Cuál es el tiempo de entrega de las fotografías y películas?',
    },
    a: {
      en: '¡Recibes un avance (Sneak Peek) en 48 horas! Tu tráiler cinematográfico se entrega en 7–10 días, la galería completa de fotos en Pixieset en 3–5 semanas, y la película completa en 4–6 semanas.',
      es: '¡Recibes un avance (Sneak Peek) en 48 horas! Tu tráiler cinematográfico se entrega en 7–10 días, la galería completa de fotos en Pixieset en 3–5 semanas, y la película completa en 4–6 semanas.',
    },
  },
  {
    q: {
      en: '¿Están ubicados en Louisville, KY y viajan a otras ciudades o destinos?',
      es: '¿Están ubicados en Louisville, KY y viajan a otras ciudades o destinos?',
    },
    a: {
      en: '¡Sí! Nuestro estudio principal está en Louisville, Kentucky. Cubrimos todo Kentucky, Indiana, Ohio y Tennessee (Lexington, Cincinnati, Indianápolis, Nashville) y viajamos a cualquier estado o destino internacional.',
      es: '¡Sí! Nuestro estudio principal está en Louisville, Kentucky. Cubrimos todo Kentucky, Indiana, Ohio y Tennessee (Lexington, Cincinnati, Indianápolis, Nashville) y viajamos a cualquier estado o destino internacional.',
    },
  },
  {
    q: {
      en: '¿Cómo recibimos y descargamos nuestras fotos y videos?',
      es: '¿Cómo recibimos y descargamos nuestras fotos y videos?',
    },
    a: {
      en: 'Todas las colecciones fotográficas se entregan en tu Galería Privada de Pixieset con contraseña, donde puedes ver, compartir, pedir impresiones y descargar tus fotos en máxima resolución en tu celular o computadora.',
      es: 'Todas las colecciones fotográficas se entregan en tu Galería Privada de Pixieset con contraseña, donde puedes ver, compartir, pedir impresiones y descargar tus fotos en máxima resolución en tu celular o computadora.',
    },
  },
];
