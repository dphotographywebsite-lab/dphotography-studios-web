'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import {
  Camera,
  MapPin,
  Calendar,
  Eye,
  Sparkles,
  BookOpen,
  Frame,
  Layers,
} from 'lucide-react';

function PhotographyPortfolioContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] =
    useState<string>(initialCategory);
  const { t, openGallery, projectGalleries, photoCategories } = useStudio();

  const filteredGalleries =
    selectedCategory === 'all'
      ? projectGalleries
      : projectGalleries.filter((g) => g.categorySlug === selectedCategory);

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* Encabezado Espacial Flotante */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.26em] uppercase font-semibold">
            <Camera className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>ARCHIVO FOTOGRÁFICO Y CATÁLOGO DE HISTORIAS</span>
          </div>

          <h1 className="font-monument hero-headline text-white uppercase">
            Historias Visuales Eternas
          </h1>

          <p className="font-editorial italic text-xl sm:text-3xl text-[#e2cf97] max-w-3xl mx-auto">
            Cada galería flota en su propia cápsula visual con su historia,
            locación e iluminación editorial.
          </p>

          {/* Barra de Filtros en Cápsula de Cristal */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'btn-gold'
                  : 'spatial-capsule text-white/80 hover:text-white hover:border-[#d4af37]/45'
              }`}
            >
              Todas las Colecciones
            </button>
            {photoCategories.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`cursor-pointer px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.14em] sm:tracking-[0.18em] uppercase font-semibold transition-colors ${
                  selectedCategory === cat.slug
                    ? 'btn-gold'
                    : 'spatial-capsule text-white/80 hover:text-white hover:border-[#d4af37]/45'
                }`}
              >
                {t(cat.title)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Galerías Abiertas sobre el Lienzo */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-16">
          {filteredGalleries.map((gallery, index) => (
            <div
              key={gallery.id}
              className="space-y-8 pb-12 border-b border-white/10 last:border-b-0"
            >
              {/* Encabezado de la Historia */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3.5 py-1 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.2em] uppercase font-semibold">
                      0{index + 1} • {t(gallery.categoryLabel)}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#c5c8d4] font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                      {gallery.venue} ({gallery.location})
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-[#a8acb8]">
                      <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                      {gallery.date}
                    </span>
                  </div>

                  <h2 className="font-monument text-2xl sm:text-3xl text-white">
                    {t(gallery.title)}
                  </h2>
                  <p className="font-editorial italic text-xl text-[#e2cf97]">
                    {t(gallery.subtitle)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => openGallery(gallery)}
                    className="cursor-pointer btn-gold px-5 sm:px-6 py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Abrir Galería ({gallery.photoCount} Fotos)</span>
                  </button>
                  <Link
                    href={`/contact?service=${gallery.categorySlug}`}
                    className="spatial-capsule px-5 py-3.5 text-white hover:border-[#d4af37]/50 text-xs tracking-[0.18em] uppercase font-semibold transition-colors text-center"
                  >
                    Cotizar
                  </Link>
                </div>
              </div>

              {/* Narrativa */}
              <p className="text-sm sm:text-base text-[#b8bcc8] leading-relaxed max-w-4xl">
                {t(gallery.story)}
              </p>

              {/* Malla Bento de Fotos Flotantes */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {gallery.images.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => openGallery(gallery)}
                    className={`cursor-pointer group relative rounded-2xl overflow-hidden border border-white/12 bg-black/50 ${
                      i === 0
                        ? 'col-span-2 row-span-2 aspect-[4/3]'
                        : 'aspect-[4/5]'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={t(img.caption)}
                      className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="font-editorial italic text-sm text-[#f3dc8a]">
                        {t(img.caption)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Álbumes Italianos y Cuadros de Colección (Flotando en el Lienzo) */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold block">
              IMPRESIONES FINE-ART Y ÁLBUMES DE LUJO
            </span>
            <h2 className="font-monument display-headline text-white uppercase">
              Álbumes Italianos y Cuadros de Colección
            </h2>
            <p className="font-editorial italic text-xl text-[#d8c488]">
              Tus fotografías merecen vivir más allá de una pantalla: álbumes
              artesanales en piel italiana, cuadros acrílicos y ampliaciones de
              galería.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="spatial-bento-card p-8 space-y-4">
              <BookOpen className="w-8 h-8 text-[#d4af37]" />
              <h3 className="font-monument text-xl text-white">
                Álbumes Artesanales de Boda y XV
              </h3>
              <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
                Páginas rígidas 12x12 con apertura panorámica encuadernadas en
                piel italiana, terciopelo o lino con grabado en oro.
              </p>
            </div>

            <div className="spatial-bento-card p-8 space-y-4">
              <Frame className="w-8 h-8 text-[#d4af37]" />
              <h3 className="font-monument text-xl text-white">
                Cuadros Gigantes de Recepción
              </h3>
              <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
                Ampliaciones enmarcadas 20x30 y 24x36 listas para lucir en un
                caballete dorado en la entrada de tu salón de boda o
                quinceañera.
              </p>
            </div>

            <div className="spatial-bento-card p-8 space-y-4">
              <Layers className="w-8 h-8 text-[#d4af37]" />
              <h3 className="font-monument text-xl text-white">
                Arte en Acrílico Cristal y Metal
              </h3>
              <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
                Cuadros en acrílico de alta definición y metal disponibles
                directamente desde la tienda integrada en tu galería Pixieset.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/contact"
              className="btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reservar Tu Colección Fotográfica</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PhotographyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <PhotographyPortfolioContent />
    </Suspense>
  );
}
