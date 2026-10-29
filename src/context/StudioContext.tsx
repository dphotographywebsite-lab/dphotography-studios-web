'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Language,
  BilingualText,
  ProjectGallery,
  FilmProduction,
  FILM_PRODUCTIONS,
} from '@/data/studioData';

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

  const setLang = (newLang: Language) => {
    setLangState(newLang);
  };

  const t = (text: BilingualText) => text.es || text.en;

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
