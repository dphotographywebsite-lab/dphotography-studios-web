'use client';

import React from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import {
  TiltedGridHero,
  TiltedGridImage,
} from '@/components/ui/tilted-grid-hero';
import TiltedCard, { TiltedCardLayer } from '@/components/ui/tilted-card';
import InteractiveStudioGallery from '@/components/ui/interactive-studio-gallery';
import { EXPERIENCE_STEPS } from '@/data/studioData';
import { Play } from 'lucide-react';

const HERO_REEL_IMAGES: TiltedGridImage[] = [
  {
    src: '/fotos/boda-47.jpg',
    alt: 'Fotografía de Bodas — DPhotography Studios',
  },
  {
    src: '/fotos/quince-caballo-10.jpg',
    alt: 'Quinceañera Editorial — DPhotography Studios',
  },
  {
    src: '/fotos/melissa-4.jpg',
    alt: 'Retrato Musical en Estudio — DPhotography Studios',
  },
  {
    src: '/fotos/chelsea-7.jpg',
    alt: 'Marca Personal y Retrato Editorial — DPhotography Studios',
  },
  {
    src: '/fotos/boda-60.jpg',
    alt: 'Retrato de Novia en Hora Dorada — DPhotography Studios',
  },
  {
    src: '/fotos/randy-26.jpg',
    alt: 'Retrato Artístico en Estudio — DPhotography Studios',
  },
  {
    src: '/fotos/vane-2.jpg',
    alt: 'Retrato Urbano de Moda — DPhotography Studios',
  },
  {
    src: '/fotos/yelena-14.jpg',
    alt: 'Sesión Deportiva y Editorial — DPhotography Studios',
  },
  {
    src: '/fotos/quince-47.jpg',
    alt: 'Quinceañera de Lujo — DPhotography Studios',
  },
  {
    src: '/fotos/foto-1-2.jpg',
    alt: 'Editorial de Belleza en Estudio — DPhotography Studios',
  },
  {
    src: '/fotos/edicion-02.jpg',
    alt: 'Retrato Artístico en Estudio — DPhotography Studios',
  },
  {
    src: '/fotos/originales-20.jpg',
    alt: 'Sesión en Locación Louisville — DPhotography Studios',
  },
  {
    src: '/fotos/edit-11.jpg',
    alt: 'Sesión Musical en Exterior — DPhotography Studios',
  },
  {
    src: '/fotos/concierto-6159.jpg',
    alt: 'Cobertura de Eventos y Conciertos en Vivo — DPhotography Studios',
  },
  {
    src: '/fotos/foto-9.jpg',
    alt: 'Retrato al Atardecer — DPhotography Studios',
  },
  {
    src: '/fotos/edicion-3.jpg',
    alt: 'Sesión de Graduación — DPhotography Studios',
  },
];

export default function HomePage() {
  const { t, openFilm, openShowreel, films, packages, testimonials } = useStudio();

  const featuredFilms = films.filter((f) => f.featuredOnHome);
  const featuredPackages = packages.filter((p) => p.popular);

  return (
    <div className="w-full overflow-x-clip pb-14 sm:pb-24 space-y-14 sm:space-y-32">
      {/* =====================================================================
          1. HERO ESPACIAL INTEGRADO AL LIENZO ÚNICO
      ===================================================================== */}
      <section className="relative pt-10 sm:pt-14">
        <TiltedGridHero
          images={HERO_REEL_IMAGES}
          speed={4}
          tileHeight={32}
          aspectRatio={16 / 10}
          gap={5}
          axis={48}
          curve={80}
          fade={10}
          className="h-[66svh] sm:h-[90vh] min-h-[430px] sm:min-h-[680px] max-h-[960px] w-full bg-transparent"
          style={{
            maskImage:
              'linear-gradient(to bottom, #000 0%, #000 84%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, #000 0%, #000 84%, transparent 100%)',
          }}
        >
          <div className="pointer-events-none relative z-10 flex h-full w-full items-end justify-center overflow-hidden">
            {/* Logo centrado encima de la foto del personaje en móvil */}
            <div className="sm:hidden absolute top-2 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
              <img
                src="/brand/dps-logo-texture.png"
                alt="DPhotography Studios"
                draggable={false}
                className="w-40 xs:w-44 h-auto object-contain select-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.95)]"
              />
            </div>

            <div className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 w-[260px] sm:w-[540px] h-[260px] sm:h-[540px] bg-[#d4af37]/15 blur-[120px]" />

            <img
              src="/brand/creator-cutout.png"
              alt="DPhotography Studios & Films"
              draggable={false}
              className="relative z-10 h-[76%] sm:h-[88%] md:h-[96%] w-auto max-w-none object-contain object-bottom sm:-translate-y-2 md:scale-[1.04] origin-bottom select-none drop-shadow-[0_24px_60px_rgba(0,0,0,0.95)]"
            />
          </div>
        </TiltedGridHero>
      </section>

      {/* =====================================================================
          2. GALERÍA INTERACTIVA CON LENTE DE CRISTAL LÍQUIDO (Debajo del Hero)
      ===================================================================== */}
      <InteractiveStudioGallery />

      {/* =====================================================================
          3. CINEMATOGRAFÍA 4K Y SALA DE PROYECCIÓN (Esquinas Rectas Editorial)
      ===================================================================== */}
      <section className="px-5 sm:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-7 sm:space-y-14">
          <div
            data-reveal="up"
            className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/15 pb-4 sm:pb-6"
          >
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37] block">
                01 / CINEMATOGRAFÍA 4K & DMEDIA RECORDS
              </span>
              <h2 className="font-monument display-headline text-white uppercase">
                Producciones de Cine
              </h2>
            </div>
            <div className="flex items-center justify-between md:justify-end gap-4">
              <span className="md:hidden text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                DESLIZA LAS PELÍCULAS →
              </span>
              <Link href="/films" className="editorial-link self-start md:self-auto">
                <span>Archivo Completo</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Marco Panorámico de Showreel (Esquinas rectas 0px) */}
          <TiltedCard
            containerHeight="auto"
            rotateAmplitude={7}
            scaleOnHover={1.015}
            glare={0.45}
            shadow={0.5}
            onClick={openShowreel}
            captionText="REPRODUCIR SHOWREEL 4K"
          >
            <div
              data-reveal="image"
              className="cursor-pointer group relative overflow-hidden border border-white/15 min-h-[210px] sm:min-h-[440px] lg:aspect-[21/9] p-4 sm:p-10 flex flex-col justify-between bg-black w-full"
            >
              <img
                src="/brand/creator-directors-chair-cinema-rig.jpg"
                alt="Showreel 2026 DPhotography Studios"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 filter brightness-[0.55]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/25 to-[#050508]/70" />

              <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] tracking-[0.22em] uppercase font-mono text-white/75">
                <span>SHOWREEL OFICIAL • 4K</span>
                <span className="text-[#f3dc8a]">01:15 MASTER</span>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center text-center gap-2.5 sm:gap-4 my-auto py-2 sm:py-4">
                <div className="w-11 h-11 sm:w-16 sm:h-16 border border-[#d4af37] bg-black/60 group-hover:bg-[#d4af37] text-[#f3dc8a] group-hover:text-black flex items-center justify-center transition-colors duration-300">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                </div>
                <h3 className="font-monument text-sm sm:text-3xl text-white uppercase tracking-[0.14em]">
                  Reproducir Showreel Cinematográfico
                </h3>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-white/60">
                <span className="hidden sm:inline">
                  SONY ALPHA CINEMA • ANILLO TILTA • DRON 4K
                </span>
                <span className="text-[#f3dc8a]">PANTALLA COMPLETA →</span>
              </div>
            </div>
          </TiltedCard>

          {/* 3 Películas Destacadas: Carrusel Horizontal en Mobile, 3 Columnas en Desktop */}
          <div className="pt-5 sm:pt-8 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] uppercase text-[#d4af37]">
                ESTRENOS DESTACADOS
              </span>
              <span className="lg:hidden text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                DESLIZA →
              </span>
            </div>

            <div
              data-reveal="stagger"
              className="mobile-snap-row grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
            {featuredFilms.map((film, idx) => (
              <TiltedCard
                key={film.id}
                containerHeight="auto"
                rotateAmplitude={11}
                scaleOnHover={1.035}
                glare={0.5}
                shadow={0.5}
                captionText={t(film.title)}
                onClick={() => openFilm(film)}
                className="mobile-snap-card"
              >
                <div className="cursor-pointer group spatial-bento-card flex flex-col justify-between w-full h-full">
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-black border-b border-white/10">
                      <img
                        src={film.thumbnail}
                        alt={t(film.title)}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-[0.82]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      <div className="absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-[#f3dc8a] bg-black/75 px-2 py-0.5 border border-white/15">
                        0{idx + 1} • {t(film.categoryLabel)}
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 text-[9px] sm:text-[10px] font-mono text-white/80 bg-black/80 px-2 py-0.5">
                        {film.duration}
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.16em] uppercase text-white/50">
                        <span>{film.division}</span>
                        <span>{film.location}</span>
                      </div>
                      <h3 className="font-monument text-sm sm:text-lg text-white group-hover:text-[#f3dc8a] transition-colors">
                        {t(film.title)}
                      </h3>
                      <p className="font-editorial italic text-sm sm:text-base text-[#e0cd95] line-clamp-2">
                        {t(film.subtitle)}
                      </p>
                    </div>
                  </div>

                  <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase text-white/70 group-hover:text-[#f3dc8a] transition-colors">
                    <span>REPRODUCIR PELÍCULA</span>
                    <span>→</span>
                  </div>
                </div>
              </TiltedCard>
            ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. EL ESTUDIO Y DIRECCIÓN CREATIVA (Editorial Arquitectónico)
      ===================================================================== */}
      <section className="px-5 sm:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-14 items-center">
          {/* Mosaico Fotográfico Compacto 2x2 en Mobile con TiltedCard */}
          <div
            data-reveal="stagger"
            className="lg:col-span-7 grid grid-cols-12 gap-2.5 sm:gap-4 items-stretch"
          >
            <div className="col-span-7">
              <TiltedCard
                imageSrc="/brand/creator-tuxedo-portrait.jpg"
                altText="Director de DPhotography Studios"
                captionText="DIRECCIÓN DE ETIQUETA"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.04}
                glare={0.5}
                shadow={0.5}
                className="min-h-[260px] sm:min-h-[460px] h-full"
              >
                <TiltedCardLayer depth={28}>
                  <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-4 bg-black/80 backdrop-blur-md border-t border-white/15">
                    <span className="text-[8px] sm:text-[10px] font-mono tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#f3dc8a] block">
                      DIRECCIÓN DE ETIQUETA
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-white/70">
                      Louisville, KY
                    </span>
                  </div>
                </TiltedCardLayer>
              </TiltedCard>
            </div>

            <div className="col-span-5 flex flex-col gap-2.5 sm:gap-4">
              <TiltedCard
                imageSrc="/brand/creator-crouching-tilta-rig.jpg"
                altText="Rig de cine Tilta DPhotography Studios"
                captionText="RIG TILTA • 4K"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                glare={0.5}
                shadow={0.5}
                className="min-h-[124px] sm:min-h-[222px] flex-1"
              >
                <TiltedCardLayer depth={24}>
                  <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-black/80 border-t border-white/10 text-[8px] sm:text-[9px] font-mono tracking-[0.16em] uppercase text-[#f3dc8a]">
                    RIG TILTA • 4K
                  </div>
                </TiltedCardLayer>
              </TiltedCard>

              <TiltedCard
                imageSrc="/brand/creator-gimbal-profile.jpg"
                altText="Operador de gimbal DMedia Records"
                captionText="DMEDIA RECORDS"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                glare={0.5}
                shadow={0.5}
                className="min-h-[124px] sm:min-h-[222px] flex-1"
              >
                <TiltedCardLayer depth={24}>
                  <div className="absolute bottom-0 inset-x-0 px-2.5 py-1.5 sm:px-3 sm:py-2 bg-black/80 border-t border-white/10 text-[8px] sm:text-[9px] font-mono tracking-[0.16em] uppercase text-white/80">
                    DMEDIA RECORDS
                  </div>
                </TiltedCardLayer>
              </TiltedCard>
            </div>
          </div>

          {/* Manifiesto Editorial */}
          <div data-reveal="up" className="lg:col-span-5 space-y-4 sm:space-y-6">
            <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37] block">
              02 / EL DIRECTOR Y EL ESTUDIO
            </span>

            <div className="space-y-1.5">
              <h2 className="font-monument display-headline text-white uppercase">
                Daniel Anthony Jesús Cudina
              </h2>
              <p className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.18em] text-[#f3dc8a]">
                Founder & Creative Director • Filmmaker • Cinematographer • Photographer
              </p>
            </div>

            <p className="font-editorial italic text-lg sm:text-2xl text-[#e2cf97] border-l-2 border-[#d4af37] pl-3.5">
              “No solo capturo imágenes, creo historias que merecen ser
              recordadas para siempre.”
            </p>

            <p className="text-xs sm:text-base text-[#b8bcc8] leading-relaxed">
              Para mí, una cámara es mucho más que una herramienta de trabajo:
              es una manera de contar historias, transmitir emociones y
              convertir ideas en experiencias visuales extraordinarias. En{' '}
              <strong className="text-white">
                DPhotography Studios & DMedia Records
              </strong>{' '}
              llevamos la fotografía profesional y la producción cinematográfica
              a otro nivel.
            </p>

            <div className="pt-1 sm:pt-2">
              <Link href="/about" className="editorial-link">
                <span>Conocer Sobre Mí y el Estudio</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. EXPERIENCIA Y TESTIMONIOS (Cuadrícula 2x3 + Carrusel en Mobile)
      ===================================================================== */}
      <section className="px-5 sm:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-12 sm:space-y-16">
          <div className="space-y-5 sm:space-y-8">
            <div
              data-reveal="up"
              className="border-b border-white/15 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2"
            >
              <div>
                <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37] block">
                  03 / METODOLOGÍA DE PRODUCCIÓN
                </span>
                <h2 className="font-monument display-headline text-white uppercase mt-1">
                  De la Consulta al Estreno
                </h2>
              </div>
            </div>

            <div
              data-reveal="stagger"
              className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-4"
            >
              {EXPERIENCE_STEPS.map((item) => (
                <TiltedCard
                  key={item.step}
                  containerHeight="auto"
                  rotateAmplitude={10}
                  scaleOnHover={1.03}
                  glare={0.45}
                  shadow={0.45}
                  captionText={`PASO ${item.step}`}
                  className="h-full"
                >
                  <div className="p-3.5 sm:p-8 border border-white/15 bg-black/45 backdrop-blur-md space-y-1.5 sm:space-y-3 w-full h-full">
                    <span className="font-mono text-[10px] sm:text-xs tracking-[0.22em] text-[#d4af37] block">
                      /{item.step}
                    </span>
                    <h3 className="font-monument text-xs sm:text-lg text-white leading-snug">
                      {t(item.title)}
                    </h3>
                    <p className="text-[11px] sm:text-sm text-[#a8acb8] leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {t(item.description)}
                    </p>
                  </div>
                </TiltedCard>
              ))}
            </div>
          </div>

          {/* Testimonios: Swipe Horizontal en Mobile, 3 Columnas en Desktop */}
          <div className="space-y-3">
            <div className="flex items-center justify-between md:hidden">
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-[#d4af37]">
                RESEÑAS DE CLIENTES
              </span>
              <span className="text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                DESLIZA →
              </span>
            </div>

            <div
              data-reveal="stagger"
              className="mobile-snap-row grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {testimonials.map((item) => (
                <TiltedCard
                  key={item.id}
                  containerHeight="auto"
                  rotateAmplitude={11}
                  scaleOnHover={1.035}
                  glare={0.5}
                  shadow={0.5}
                  captionText={item.client}
                  className="mobile-snap-card"
                >
                  <div className="spatial-bento-card p-5 sm:p-8 flex flex-col justify-between space-y-4 sm:space-y-6 w-full h-full">
                    <p className="font-editorial italic text-base sm:text-xl text-white/90 leading-relaxed">
                      “{t(item.quote)}”
                    </p>

                    <div className="pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <h4 className="font-monument text-[11px] sm:text-xs tracking-[0.14em] text-[#f3dc8a] uppercase">
                          {item.client}
                        </h4>
                        <span className="text-[10px] sm:text-[11px] text-white/55 block mt-0.5">
                          {t(item.role)}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#d4af37]">
                        ★★★★★
                      </span>
                    </div>
                  </div>
                </TiltedCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. COLECCIONES E INVERSIÓN + CIERRE EDITORIAL
      ===================================================================== */}
      <section className="px-5 sm:px-8 relative z-10">
        <div className="max-w-[1400px] mx-auto space-y-14 sm:space-y-20">
          <div className="space-y-6 sm:space-y-10">
            <div
              data-reveal="up"
              className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-white/15 pb-4 sm:pb-6"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37] block">
                  04 / PAQUETES Y COLECCIONES
                </span>
                <h2 className="font-monument display-headline text-white uppercase">
                  Colecciones Destacadas
                </h2>
              </div>
              <div className="flex items-center justify-between md:justify-end gap-4">
                <span className="lg:hidden text-[9px] font-mono tracking-[0.22em] uppercase text-white/45">
                  DESLIZA PAQUETES →
                </span>
                <Link
                  href="/packages"
                  className="editorial-link self-start md:self-auto"
                >
                  <span>Ver las 8 Categorías</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div
              data-reveal="stagger"
              className="mobile-snap-row grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {featuredPackages.map((pkg) => (
                <TiltedCard
                  key={pkg.id}
                  containerHeight="auto"
                  rotateAmplitude={10}
                  scaleOnHover={1.03}
                  glare={0.5}
                  shadow={0.5}
                  captionText="CONTACTAR POR PAQUETE"
                  className="mobile-snap-card-wide"
                >
                  <div className="spatial-bento-card p-5 sm:p-8 flex flex-col justify-between w-full h-full">
                    <div className="space-y-4 sm:space-y-5">
                      <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-[0.18em] uppercase text-[#d4af37]">
                        <span>{t(pkg.categoryName)}</span>
                        <span className="text-white/55">
                          {t(pkg.durationLabel)}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-monument text-base sm:text-xl text-white">
                          {t(pkg.tierName)}
                        </h3>
                        <p className="font-editorial italic text-sm sm:text-lg text-[#e0cd95] mt-1 line-clamp-2">
                          {t(pkg.tagline)}
                        </p>
                      </div>

                      <div className="py-3 sm:py-3.5 border-y border-white/10 flex items-center justify-between">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-white/50">
                          COBERTURA
                        </span>
                        <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.16em] text-[#f3dc8a]">
                          {t(pkg.durationLabel)}
                        </span>
                      </div>

                      <ul className="space-y-2 text-[11px] sm:text-xs text-[#c5c8d4]">
                        {pkg.deliverables.es.slice(0, 4).map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 border-b border-white/[0.05] pb-1.5 last:border-0"
                          >
                            <span className="text-[#d4af37] font-mono text-[10px] mt-0.5">
                              —
                            </span>
                            <span className="line-clamp-2">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10">
                      <Link
                        href={`/contact?package=${pkg.id}&service=${pkg.categorySlug}`}
                        className="btn-gold block w-full py-3 sm:py-3.5 px-4 text-[10px] sm:text-[11px] text-center"
                      >
                        Contactar por este Paquete
                      </Link>
                    </div>
                  </div>
                </TiltedCard>
              ))}
            </div>
          </div>

          {/* Cierre Editorial Minimalista */}
          <div
            data-reveal="up"
            className="pt-12 border-t border-white/15 text-center space-y-6"
          >
            <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37] block">
              TU VISIÓN • NUESTRA CREATIVIDAD — DANIEL ANTHONY JESÚS CUDINA
            </span>
            <h2 className="font-monument display-headline text-white uppercase max-w-4xl mx-auto">
              Donde Tus Historias Se Convierten en Películas y Tus Sueños Se
              Convierten en Vida
            </h2>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#f3dc8a]">
              “Let&apos;s Create Something Extraordinary.”
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                href="/contact"
                className="btn-gold px-10 py-4 text-xs tracking-[0.22em]"
              >
                Reservar Tu Fecha
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
