'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import { FilmProduction } from '@/data/studioData';
import TiltedCard from '@/components/ui/tilted-card';
import {
  Play,
  Disc,
  Sparkles,
  Clapperboard,
  Sliders,
  Video,
} from 'lucide-react';

export default function FilmsPage() {
  const { t, openFilm, films } = useStudio();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStageId, setSelectedStageId] = useState<string>('');
  const stageFilm: FilmProduction | undefined =
    films.find((f) => f.id === selectedStageId) || films[0];

  const filmCategories = [
    { slug: 'all', label: 'Todas las Películas' },
    { slug: 'wedding-films', label: 'Películas de Boda' },
    { slug: 'quince-films', label: 'Películas de Quinceañera' },
    { slug: 'music-videos', label: 'Videos Musicales (DMedia)' },
    { slug: 'original-films', label: 'Cine Original y Cortometrajes' },
    { slug: 'commercial-films', label: 'Comerciales y Marcas' },
  ];

  const filteredFilms =
    selectedCategory === 'all'
      ? films
      : films.filter((f) => f.categorySlug === selectedCategory);

  if (!stageFilm) return null;

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Cinema Header */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.26em] uppercase font-semibold">
            <Clapperboard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>DIVISIÓN DE CINE DPHOTOGRAPHY Y DMEDIA RECORDS</span>
          </div>

          <h1 className="font-monument hero-headline text-white uppercase">
            Producción Profesional. Visión Cinematográfica.
          </h1>

          <p className="font-editorial italic text-xl sm:text-3xl text-[#e2cf97] max-w-3xl mx-auto">
            Dirigido por Daniel Anthony Jesús Cudina — Wedding films en 4K,
            producciones de quinceañera, videoclips oficiales (DMedia Records) y
            cine original.
          </p>
        </div>
      </section>

      {/* Large Interactive Premiere Screening Player Stage */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1360px] mx-auto spatial-island overflow-hidden">
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-white/[0.02] border-b border-white/10 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] shrink-0" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.22em] uppercase text-[#f3dc8a] font-semibold">
                SALA DE PROYECCIÓN PRINCIPAL • {stageFilm.division}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-mono text-white/60">
              {stageFilm.format} • {stageFilm.duration}
            </span>
          </div>

          {/* Large Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              key={stageFilm.id}
              src={stageFilm.videoPreviewUrl}
              poster={stageFilm.thumbnail}
              controls
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

          {/* Active Stage Film Credits & Description */}
          <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#d4af37] font-semibold">
                {t(stageFilm.categoryLabel)} • {stageFilm.location}
              </span>
              <h2 className="font-monument text-2xl sm:text-3xl text-white">
                {t(stageFilm.title)}
              </h2>
              <p className="font-editorial italic text-xl text-[#e2cf97]">
                {t(stageFilm.subtitle)}
              </p>
              <p className="text-sm text-[#b8bcc8] leading-relaxed">
                {t(stageFilm.description)}
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.03} glare={0.25} shadow={0.35} className="h-full">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 h-full w-full">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] block">
                    Dirección
                  </span>
                  <span className="font-medium text-white mt-1 block text-[11px] sm:text-xs">
                    {stageFilm.credits.director}
                  </span>
                </div>
              </TiltedCard>
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.03} glare={0.25} shadow={0.35} className="h-full">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 h-full w-full">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] block">
                    Cinefotógrafo (DP)
                  </span>
                  <span className="font-medium text-white mt-1 block text-[11px] sm:text-xs">
                    {stageFilm.credits.cinematographer}
                  </span>
                </div>
              </TiltedCard>
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.03} glare={0.25} shadow={0.35} className="h-full">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 h-full w-full">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] block">
                    Edición y Color
                  </span>
                  <span className="font-medium text-white mt-1 block text-[11px] sm:text-xs">
                    {stageFilm.credits.editor}
                  </span>
                </div>
              </TiltedCard>
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={8} scaleOnHover={1.03} glare={0.25} shadow={0.35} className="h-full">
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 h-full w-full">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#d4af37] block">
                    Casa Productora
                  </span>
                  <span className="font-medium text-[#f3dc8a] mt-1 block text-[11px] sm:text-xs">
                    {stageFilm.credits.productionCompany}
                  </span>
                </div>
              </TiltedCard>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills & Catalog Grid */}
      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
          <div className="flex items-center sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
            {filmCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`cursor-pointer shrink-0 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase font-semibold transition-all ${
                  selectedCategory === cat.slug
                    ? 'btn-gold'
                    : 'glass-surface text-white/80 hover:text-white hover:border-[#d4af37]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="mobile-snap-row grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFilms.map((film) => (
              <TiltedCard
                key={film.id}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.025}
                glare={0.32}
                shadow={0.5}
                className="mobile-snap-card-wide h-full"
              >
                <div className="glass-dark-luxe glass-interactive rounded-3xl overflow-hidden flex flex-col justify-between h-full w-full">
                  <div>
                    <div
                      onClick={() => openFilm(film)}
                      className="cursor-pointer relative aspect-[16/10] bg-black overflow-hidden group"
                    >
                      <img
                        src={film.thumbnail}
                        alt={t(film.title)}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.8]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c12] via-transparent to-black/30" />

                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.18em] uppercase font-semibold">
                        {t(film.categoryLabel)}
                      </div>
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-black/80 text-white text-[10px] font-mono">
                        {film.duration}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#d4af37] text-black flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.65)] group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 fill-black ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between text-[10px] tracking-[0.2em] uppercase text-[#d4af37]">
                        <span>{film.division}</span>
                        <span>{film.year}</span>
                      </div>
                      <h3 className="font-monument text-lg text-white">
                        {t(film.title)}
                      </h3>
                      <p className="font-editorial italic text-base text-[#e2cf97]">
                        {t(film.subtitle)}
                      </p>
                      <p className="text-xs text-[#b0b4c2] leading-relaxed">
                        {t(film.description)}
                      </p>
                    </div>
                  </div>

                  {/* Credits + Action Bar */}
                  <div className="p-6 pt-4 border-t border-white/10 space-y-4 bg-white/[0.01]">
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-white/40 uppercase block text-[9px] tracking-widest">
                          Dirección
                        </span>
                        <span className="text-white/90 font-medium">
                          {film.credits.director}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 uppercase block text-[9px] tracking-widest">
                          Cinefotógrafo
                        </span>
                        <span className="text-white/90 font-medium">
                          {film.credits.cinematographer}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 uppercase block text-[9px] tracking-widest">
                          Edición y Color
                        </span>
                        <span className="text-white/90 font-medium">
                          {film.credits.editor}
                        </span>
                      </div>
                      <div>
                        <span className="text-white/40 uppercase block text-[9px] tracking-widest">
                          Producción
                        </span>
                        <span className="text-[#f3dc8a] font-medium">
                          {film.division}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStageId(film.id);
                          openFilm(film);
                        }}
                        className="cursor-pointer btn-gold flex-1 py-2.5 px-4 rounded-xl text-[11px] flex items-center justify-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Ver Película</span>
                      </button>
                      <Link
                        href={`/contact?service=${film.categorySlug}`}
                        className="px-4 py-2.5 rounded-xl border border-white/15 hover:border-[#d4af37] text-[11px] uppercase tracking-widest text-white/80 hover:text-white transition-all"
                      >
                        Cotizar
                      </Link>
                    </div>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>

      {/* DMedia Records Artist & Music Video Division Spotlight */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.24em] uppercase font-semibold">
              <Disc className="w-3.5 h-3.5 shrink-0" />
              <span>DMEDIA RECORDS • DIVISIÓN VISUAL DE ARTISTAS</span>
            </div>

            <h2 className="font-monument display-headline text-white uppercase">
              Videos Musicales, Visuales de Artistas y Cine Original
            </h2>

            <p className="text-sm sm:text-base text-[#c2c5d0] leading-relaxed">
              A través de nuestra división especializada DMedia Records,
              trabajamos con artistas musicales, sellos y marcas para producir
              videos musicales oficiales, visuales de lanzamiento, detrás de
              cámaras y cortometrajes.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-2 text-xs">
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={9} scaleOnHover={1.03} glare={0.28} shadow={0.4} className="h-full">
                <div className="p-3.5 sm:p-4 rounded-2xl glass-surface h-full w-full">
                  <Video className="w-5 h-5 text-[#d4af37] mb-1.5 sm:mb-2" />
                  <strong className="text-white block text-[11px] sm:text-xs">
                    Rigs de Cine Tilta y Gimbal
                  </strong>
                  <span className="text-white/65 text-[10px] sm:text-xs">
                    Movimiento fluido de cámara y monitoreo profesional en set
                  </span>
                </div>
              </TiltedCard>
              <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={9} scaleOnHover={1.03} glare={0.28} shadow={0.4} className="h-full">
                <div className="p-3.5 sm:p-4 rounded-2xl glass-surface h-full w-full">
                  <Sliders className="w-5 h-5 text-[#d4af37] mb-1.5 sm:mb-2" />
                  <strong className="text-white block text-[11px] sm:text-xs">
                    Efectos Visuales y Colorización
                  </strong>
                  <span className="text-white/65 text-[10px] sm:text-xs">
                    Acabado de color teatral y tráilers verticales para
                    Reels/TikTok
                  </span>
                </div>
              </TiltedCard>
            </div>

            <div className="pt-3">
              <Link
                href="/contact?service=music-videos"
                className="btn-gold w-full sm:w-auto justify-center inline-flex items-center gap-2 px-6 sm:px-8 py-4 rounded-full text-xs text-center"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Cotizar Video Musical con DMedia Records</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4">
            <TiltedCard
              imageSrc="/brand/creator-crouching-tilta-rig.jpg"
              altText="Rig de cine DMedia Records"
              captionText="Tilta Cinema Rig"
              containerHeight="auto"
              containerWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.04}
              glare={0.45}
              shadow={0.55}
              className="aspect-[3/4] border border-[#d4af37]/35"
            />
            <TiltedCard
              imageSrc="/brand/creator-directors-chair-cinema-rig.jpg"
              altText="Silla de Director DPhotography Studios"
              captionText="Dirección en Set"
              containerHeight="auto"
              containerWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.04}
              glare={0.45}
              shadow={0.55}
              className="aspect-[3/4] border border-white/15 mt-4 sm:mt-8"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
