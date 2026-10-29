'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Language,
  BilingualText,
  ProjectGallery,
  PhotoCategory,
  FilmProduction,
  PackageTier,
  ClientGalleryItem,
  TestimonialItem,
  FAQItem,
  PHOTO_CATEGORIES,
  PROJECT_GALLERIES,
  FILM_PRODUCTIONS,
  PACKAGES_DATA,
  CLIENT_GALLERIES_DATA,
  TESTIMONIALS_DATA,
  FAQ_ITEMS,
} from '@/data/studioData';
import {
  liquidGlassCarouselDefaultItems,
  type LiquidGlassCarouselItem,
} from '@/components/ui/liquid-glass-carousel';
import rawServerOverrides from '@/data/cms-overrides.json';

export interface StudioCmsPayload {
  packages: PackageTier[];
  projectGalleries: ProjectGallery[];
  photoCategories: PhotoCategory[];
  carouselItems: LiquidGlassCarouselItem[];
  films: FilmProduction[];
  clientGalleries: ClientGalleryItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
}

const STORAGE_KEY = 'dphotography_cms_v1';

const DEFAULT_MEDIA_LIBRARY: string[] = [
  '/fotos/boda-47.jpg',
  '/fotos/boda-60.jpg',
  '/fotos/chelsea-7.jpg',
  '/fotos/concierto-6120.jpg',
  '/fotos/concierto-6159.jpg',
  '/fotos/concierto-6307.jpg',
  '/fotos/concierto-7232.jpg',
  '/fotos/edicion-02.jpg',
  '/fotos/edicion-3.jpg',
  '/fotos/edit-02.jpg',
  '/fotos/edit-11.jpg',
  '/fotos/foto-1-2.jpg',
  '/fotos/foto-14.jpg',
  '/fotos/foto-8-nuevo.jpg',
  '/fotos/foto-9.jpg',
  '/fotos/melissa-3.jpg',
  '/fotos/melissa-4.jpg',
  '/fotos/originales-14.jpg',
  '/fotos/originales-20.jpg',
  '/fotos/quince-47.jpg',
  '/fotos/quince-caballo-10.jpg',
  '/fotos/randy-1.jpg',
  '/fotos/randy-26.jpg',
  '/fotos/randy-29.jpg',
  '/fotos/update-10.jpg',
  '/fotos/vane-14.jpg',
  '/fotos/vane-2.jpg',
  '/fotos/yelena-1.jpg',
  '/fotos/yelena-14.jpg',
  '/fotos/yelena-21.jpg',
  '/brand/creator-crouching-tilta-rig.jpg',
  '/brand/creator-directors-chair-cinema-rig.jpg',
  '/brand/creator-editorial-angle.jpg',
  '/brand/creator-gimbal-profile.jpg',
  '/brand/creator-shooting-camera.jpg',
  '/brand/creator-tuxedo-fullbody.jpg',
  '/brand/creator-tuxedo-portrait.jpg',
];

function buildInitialCmsState(): StudioCmsPayload {
  const srv = (rawServerOverrides ?? {}) as Partial<StudioCmsPayload>;
  return {
    packages: Array.isArray(srv.packages) && srv.packages.length > 0 ? srv.packages : PACKAGES_DATA,
    projectGalleries:
      Array.isArray(srv.projectGalleries) && srv.projectGalleries.length > 0
        ? srv.projectGalleries
        : PROJECT_GALLERIES,
    photoCategories:
      Array.isArray(srv.photoCategories) && srv.photoCategories.length > 0
        ? srv.photoCategories
        : PHOTO_CATEGORIES,
    carouselItems:
      Array.isArray(srv.carouselItems) && srv.carouselItems.length > 0
        ? srv.carouselItems
        : liquidGlassCarouselDefaultItems,
    films: Array.isArray(srv.films) && srv.films.length > 0 ? srv.films : FILM_PRODUCTIONS,
    clientGalleries:
      Array.isArray(srv.clientGalleries) && srv.clientGalleries.length > 0
        ? srv.clientGalleries
        : CLIENT_GALLERIES_DATA,
    testimonials:
      Array.isArray(srv.testimonials) && srv.testimonials.length > 0
        ? srv.testimonials
        : TESTIMONIALS_DATA,
    faqs: Array.isArray(srv.faqs) && srv.faqs.length > 0 ? srv.faqs : FAQ_ITEMS,
  };
}

interface StudioContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (text: BilingualText) => string;
  activeGallery: ProjectGallery | null;
  openGallery: (gallery: ProjectGallery) => void;
  closeGallery: () => void;
  activeFilm: FilmProduction | null;
  openFilm: (film: FilmProduction) => void;
  openShowreel: () => void;
  closeFilm: () => void;
  // Datos dinámicos del CMS
  packages: PackageTier[];
  projectGalleries: ProjectGallery[];
  photoCategories: PhotoCategory[];
  carouselItems: LiquidGlassCarouselItem[];
  films: FilmProduction[];
  clientGalleries: ClientGalleryItem[];
  testimonials: TestimonialItem[];
  faqs: FAQItem[];
  mediaLibrary: string[];
  updateCmsData: (
    partial: Partial<StudioCmsPayload>,
    options?: { commitToGithub?: boolean; githubToken?: string }
  ) => Promise<{ ok: boolean; savedLocally?: boolean; githubSynced?: boolean; error?: string }>;
  resetCmsToDefaults: () => Promise<void>;
}

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const SHOWREEL_FILM: FilmProduction = {
  id: 'official-studio-showreel-2026',
  categorySlug: 'original-films',
  categoryLabel: {
    en: 'Showreel Oficial del Estudio • 4K',
    es: 'Showreel Oficial del Estudio • 4K',
  },
  division: 'DPhotography Studios & Films',
  title: {
    en: 'DPHOTOGRAPHY STUDIOS & FILMS — SHOWREEL CINEMATOGRÁFICO 2026',
    es: 'DPHOTOGRAPHY STUDIOS & FILMS — SHOWREEL CINEMATOGRÁFICO 2026',
  },
  subtitle: {
    en: 'Bodas • Quinceañeras • Videos Musicales (DMedia Records) • Cine Original',
    es: 'Bodas • Quinceañeras • Videos Musicales (DMedia Records) • Cine Original',
  },
  description: {
    en: 'Una antología de 75 segundos con nuestros mejores tráilers de boda, producciones reales de quinceañera, videos musicales de DMedia Records y cine original filmado en Louisville, Kentucky.',
    es: 'Una antología de 75 segundos con nuestros mejores tráilers de boda, producciones reales de quinceañera, videos musicales de DMedia Records y cine original filmado en Louisville, Kentucky.',
  },
  duration: '01:15',
  format: '4K Anamórfico 2.39:1 • Audio Master Dolby',
  year: '2026',
  location: 'Louisville, KY y Destinos',
  thumbnail: '/brand/creator-directors-chair-cinema-rig.jpg',
  videoPreviewUrl: FILM_PRODUCTIONS[0].videoPreviewUrl,
  credits: {
    director: 'DPhotography Studios & Films',
    cinematographer: 'Director de Fotografía Principal — Unidad de Cine',
    editor: 'Laboratorio de Edición y Color DPhotography',
    productionCompany: 'DPhotography Studios & Films • DMedia Records',
  },
};

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('es');
  const [activeGallery, setActiveGallery] = useState<ProjectGallery | null>(null);
  const [activeFilm, setActiveFilm] = useState<FilmProduction | null>(null);
  const [cms, setCms] = useState<StudioCmsPayload>(buildInitialCmsState);
  const [mediaLibrary, setMediaLibrary] = useState<string[]>(DEFAULT_MEDIA_LIBRARY);

  useEffect(() => {
    // 1. Cargar de localStorage inmediatamente si existe
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<StudioCmsPayload>;
        setCms((prev) => ({
          packages: Array.isArray(parsed.packages) ? parsed.packages : prev.packages,
          projectGalleries: Array.isArray(parsed.projectGalleries)
            ? parsed.projectGalleries
            : prev.projectGalleries,
          photoCategories: Array.isArray(parsed.photoCategories)
            ? parsed.photoCategories
            : prev.photoCategories,
          carouselItems: Array.isArray(parsed.carouselItems)
            ? parsed.carouselItems
            : prev.carouselItems,
          films: Array.isArray(parsed.films) ? parsed.films : prev.films,
          clientGalleries: Array.isArray(parsed.clientGalleries)
            ? parsed.clientGalleries
            : prev.clientGalleries,
          testimonials: Array.isArray(parsed.testimonials)
            ? parsed.testimonials
            : prev.testimonials,
          faqs: Array.isArray(parsed.faqs) ? parsed.faqs : prev.faqs,
        }));
      }
    } catch {
      // Ignorar errores de lectura de localStorage
    }

    // 2. Consultar servidor para biblioteca de medios y overrides guardados en disco
    fetch('/api/studio-cms', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        if (Array.isArray(data.mediaLibrary) && data.mediaLibrary.length > 0) {
          setMediaLibrary(data.mediaLibrary);
        }
        const srv = data.overrides as Partial<StudioCmsPayload> | undefined;
        if (srv && Object.keys(srv).length > 0 && !window.localStorage.getItem(STORAGE_KEY)) {
          setCms((prev) => ({
            packages: Array.isArray(srv.packages) ? srv.packages : prev.packages,
            projectGalleries: Array.isArray(srv.projectGalleries)
              ? srv.projectGalleries
              : prev.projectGalleries,
            photoCategories: Array.isArray(srv.photoCategories)
              ? srv.photoCategories
              : prev.photoCategories,
            carouselItems: Array.isArray(srv.carouselItems)
              ? srv.carouselItems
              : prev.carouselItems,
            films: Array.isArray(srv.films) ? srv.films : prev.films,
            clientGalleries: Array.isArray(srv.clientGalleries)
              ? srv.clientGalleries
              : prev.clientGalleries,
            testimonials: Array.isArray(srv.testimonials) ? srv.testimonials : prev.testimonials,
            faqs: Array.isArray(srv.faqs) ? srv.faqs : prev.faqs,
          }));
        }
      })
      .catch(() => {});
  }, []);

  const updateCmsData = useCallback(
    async (
      partial: Partial<StudioCmsPayload>,
      options?: { commitToGithub?: boolean; githubToken?: string }
    ) => {
      let nextState: StudioCmsPayload = cms;
      setCms((prev) => {
        nextState = { ...prev, ...partial };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
        } catch {
          // Ignorar errores de cuota
        }
        return nextState;
      });

      try {
        const res = await fetch('/api/studio-cms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            overrides: { ...cms, ...partial },
            commitToGithub: options?.commitToGithub ?? false,
            githubToken: options?.githubToken,
          }),
        });
        const data = await res.json();
        return {
          ok: Boolean(data.ok),
          savedLocally: data.savedLocally,
          githubSynced: data.githubSynced,
          error: data.githubError || data.error,
        };
      } catch (err) {
        return {
          ok: true,
          savedLocally: false,
          githubSynced: false,
          error: err instanceof Error ? err.message : undefined,
        };
      }
    },
    [cms]
  );

  const resetCmsToDefaults = useCallback(async () => {
    const defaults: StudioCmsPayload = {
      packages: PACKAGES_DATA,
      projectGalleries: PROJECT_GALLERIES,
      photoCategories: PHOTO_CATEGORIES,
      carouselItems: liquidGlassCarouselDefaultItems,
      films: FILM_PRODUCTIONS,
      clientGalleries: CLIENT_GALLERIES_DATA,
      testimonials: TESTIMONIALS_DATA,
      faqs: FAQ_ITEMS,
    };
    setCms(defaults);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    await fetch('/api/studio-cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ overrides: {} }),
    }).catch(() => {});
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (text: BilingualText) => text?.es || text?.en || '';

  return (
    <StudioContext.Provider
      value={{
        lang,
        setLang,
        t,
        activeGallery,
        openGallery: (g) => setActiveGallery(g),
        closeGallery: () => setActiveGallery(null),
        activeFilm,
        openFilm: (f) => setActiveFilm(f),
        openShowreel: () => setActiveFilm(SHOWREEL_FILM),
        closeFilm: () => setActiveFilm(null),
        packages: cms.packages,
        projectGalleries: cms.projectGalleries,
        photoCategories: cms.photoCategories,
        carouselItems: cms.carouselItems,
        films: cms.films,
        clientGalleries: cms.clientGalleries,
        testimonials: cms.testimonials,
        faqs: cms.faqs,
        mediaLibrary,
        updateCmsData,
        resetCmsToDefaults,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const ctx = useContext(StudioContext);
  if (!ctx) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return ctx;
}
