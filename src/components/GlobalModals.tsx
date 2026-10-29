'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import {
  X,
  MapPin,
  Calendar,
  Camera,
  Film,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function GlobalModals() {
  const {
    t,
    activeGallery,
    closeGallery,
    activeFilm,
    closeFilm,
  } = useStudio();

  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);

  useEffect(() => {
    setSelectedPhotoIdx(0);
  }, [activeGallery]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (activeGallery) closeGallery();
        if (activeFilm) closeFilm();
      }
      if (activeGallery) {
        if (e.key === 'ArrowRight') {
          setSelectedPhotoIdx((prev) =>
            (prev + 1) % activeGallery.images.length
          );
        }
        if (e.key === 'ArrowLeft') {
          setSelectedPhotoIdx(
            (prev) =>
              (prev - 1 + activeGallery.images.length) %
              activeGallery.images.length
          );
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeGallery, activeFilm, closeGallery, closeFilm]);

  return (
    <>
      {/* 1. EDITORIAL PROJECT STORY GALLERY MODAL */}
      {activeGallery && (
        <div
          className="fixed inset-0 z-[80] bg-[#050507]/95 backdrop-blur-2xl overflow-y-auto p-3 sm:p-8 flex items-start justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-6xl my-2 sm:my-4 glass-dark-luxe rounded-3xl overflow-hidden border border-[#d4af37]/35">
            {/* Top Bar */}
            <div className="sticky top-0 z-20 bg-[#0b0c10]/90 backdrop-blur-xl px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] tracking-[0.16em] sm:tracking-[0.24em] uppercase text-[#d4af37] font-semibold block">
                  {t(activeGallery.categoryLabel)} • {activeGallery.venue}
                </span>
                <h3 className="font-monument text-sm sm:text-xl text-white mt-0.5">
                  {t(activeGallery.title)}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeGallery}
                className="cursor-pointer p-2.5 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/15 hover:border-[#d4af37] text-white transition-all shrink-0"
                aria-label="Cerrar Galería"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-10 space-y-6 sm:space-y-8">
              {/* Featured Active Image Lightbox Stage */}
              <div className="relative rounded-2xl overflow-hidden bg-[#060608] border border-white/10">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] max-h-[65vh] sm:max-h-[68vh] w-full flex items-center justify-center bg-black">
                  <img
                    src={activeGallery.images[selectedPhotoIdx]?.url}
                    alt={t(
                      activeGallery.images[selectedPhotoIdx]?.caption ||
                        activeGallery.title
                    )}
                    className="max-h-[65vh] sm:max-h-[68vh] w-auto max-w-full object-contain transition-all duration-300"
                  />
                  {/* Prev / Next Controls */}
                  {activeGallery.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPhotoIdx(
                            (prev) =>
                              (prev - 1 + activeGallery.images.length) %
                              activeGallery.images.length
                          )
                        }
                        className="cursor-pointer absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all"
                        aria-label="Foto anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedPhotoIdx(
                            (prev) => (prev + 1) % activeGallery.images.length
                          )
                        }
                        className="cursor-pointer absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#d4af37] text-white hover:text-black border border-white/20 transition-all"
                        aria-label="Foto siguiente"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Caption & Counter Bar */}
                <div className="px-4 sm:px-6 py-3 sm:py-3.5 bg-[#0e1017] border-t border-white/10 flex flex-wrap items-center justify-between gap-2 sm:gap-3 text-xs">
                  <p className="font-editorial italic text-sm sm:text-base text-[#f3dc8a]">
                    “
                    {t(
                      activeGallery.images[selectedPhotoIdx]?.caption ||
                        activeGallery.subtitle
                    )}
                    ”
                  </p>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-white/60">
                    FOTO {selectedPhotoIdx + 1} / {activeGallery.images.length}{' '}
                    <span className="text-[#d4af37] ml-1 sm:ml-2">
                      ({activeGallery.photoCount} en Galería Completa)
                    </span>
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {activeGallery.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPhotoIdx(idx)}
                    className={`cursor-pointer relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                      selectedPhotoIdx === idx
                        ? 'border-[#d4af37] scale-[1.03] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={t(img.caption)}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Editorial Story & Production Metadata */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4 border-t border-white/10">
                <div className="lg:col-span-2 space-y-3">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#d4af37] font-semibold">
                    LA HISTORIA EDITORIAL
                  </span>
                  <h4 className="font-editorial italic text-2xl text-white">
                    {t(activeGallery.subtitle)}
                  </h4>
                  <p className="text-sm sm:text-base text-[#c5c8d4] leading-relaxed">
                    {t(activeGallery.story)}
                  </p>
                </div>

                <div className="glass-surface rounded-2xl p-5 space-y-3.5 text-xs">
                  <div className="flex items-center gap-2.5 text-white/90">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                        Salón y Locación
                      </span>
                      <span className="font-medium">
                        {activeGallery.venue} — {activeGallery.location}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/90">
                    <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                        Temporada / Fecha
                      </span>
                      <span className="font-medium">{activeGallery.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-white/90">
                    <Camera className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                        Cámara e Iluminación
                      </span>
                      <span className="font-medium">
                        {activeGallery.gearUsed}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/contact?service=${activeGallery.categorySlug}`}
                      onClick={closeGallery}
                      className="btn-gold w-full py-3 px-4 rounded-xl text-[11px] flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Cotizar una Sesión Similar</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CINEMA THEATER FILM PLAYER MODAL */}
      {activeFilm && (
        <div
          className="fixed inset-0 z-[90] bg-[#040406]/95 backdrop-blur-2xl overflow-y-auto p-3 sm:p-8 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-5xl glass-dark-luxe rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-[0_0_90px_rgba(212,175,55,0.18)]">
            {/* Top Cinema Bar */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#090a0f] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase font-semibold">
                  {activeFilm.division}
                </span>
                <span className="text-xs text-white/60 hidden sm:inline">
                  {activeFilm.format}
                </span>
              </div>
              <button
                type="button"
                onClick={closeFilm}
                className="cursor-pointer p-2 rounded-full bg-white/5 hover:bg-[#d4af37]/20 border border-white/15 hover:border-[#d4af37] text-white transition-all shrink-0"
                aria-label="Cerrar Sala de Cine"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Widescreen Video Stage */}
            <div className="relative aspect-video bg-black">
              <video
                key={activeFilm.id}
                src={activeFilm.videoPreviewUrl}
                poster={activeFilm.thumbnail}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            {/* Film Details & Full Production Credits */}
            <div className="p-4 sm:p-8 bg-[#0b0c12] space-y-5 sm:space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] tracking-[0.16em] sm:tracking-[0.24em] uppercase text-[#d4af37] font-semibold">
                    {t(activeFilm.categoryLabel)} • {activeFilm.location} (
                    {activeFilm.duration})
                  </span>
                  <h3 className="font-monument text-base sm:text-2xl text-white mt-1">
                    {t(activeFilm.title)}
                  </h3>
                  <p className="font-editorial italic text-base sm:text-lg text-[#d8c488]">
                    {t(activeFilm.subtitle)}
                  </p>
                </div>

                <Link
                  href={`/contact?service=${activeFilm.categorySlug}`}
                  onClick={closeFilm}
                  className="btn-gold w-full md:w-auto px-6 py-3 rounded-full text-xs shrink-0 flex items-center justify-center gap-2"
                >
                  <Film className="w-4 h-4" />
                  <span>Cotizar Producción de Cine</span>
                </Link>
              </div>

              <p className="text-sm text-[#c3c6d1] leading-relaxed">
                {t(activeFilm.description)}
              </p>

              {/* Official Film Credits Grid */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37] block">
                    Director
                  </span>
                  <span className="font-medium text-white mt-0.5 block">
                    {activeFilm.credits.director}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37] block">
                    Dirección de Foto
                  </span>
                  <span className="font-medium text-white mt-0.5 block">
                    {activeFilm.credits.cinematographer}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37] block">
                    Edición y Color
                  </span>
                  <span className="font-medium text-white mt-0.5 block">
                    {activeFilm.credits.editor}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#d4af37] block">
                    Casa Productora
                  </span>
                  <span className="font-medium text-white mt-0.5 block">
                    {activeFilm.credits.productionCompany}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
