'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import TiltedCard from '@/components/ui/tilted-card';
import {
  Sparkles,
  CheckCircle2,
  PlusCircle,
  ArrowRight,
  Sliders,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function PackagesPage() {
  const { t, packages, faqs } = useStudio();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { slug: 'all', label: 'Las 8 Categorías' },
    { slug: 'weddings-group', label: 'Bodas (Foto, Cine y Combo)' },
    { slug: 'quinceaneras', label: 'Quinceañeras' },
    { slug: 'portraits', label: 'Sesiones de Retrato' },
    { slug: 'music-videos', label: 'Videos Musicales (DMedia)' },
    { slug: 'commercial-events', label: 'Comerciales y Eventos' },
  ];

  const filteredPackages = packages.filter((pkg) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'weddings-group') {
      return (
        pkg.categorySlug === 'wedding-photo' ||
        pkg.categorySlug === 'wedding-films' ||
        pkg.categorySlug === 'wedding-combo'
      );
    }
    if (selectedFilter === 'commercial-events') {
      return (
        pkg.categorySlug === 'commercial' || pkg.categorySlug === 'events'
      );
    }
    return pkg.categorySlug === selectedFilter;
  });

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark-luxe border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.26em] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>INVERSIÓN Y COLECCIONES DE LUJO</span>
          </div>

          <h1 className="font-monument hero-headline text-white uppercase">
            Paquetes y Precios
          </h1>

          <p className="font-editorial italic text-2xl sm:text-3xl text-[#e2cf97] max-w-3xl mx-auto">
            Inversión transparente, entregables completos de lujo y planes de
            pago flexibles adaptados a tu celebración.
          </p>

          {/* Category Tabs */}
          <div className="pt-4 flex items-center sm:justify-center gap-2 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setSelectedFilter(tab.slug)}
                className={`cursor-pointer shrink-0 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.18em] uppercase font-semibold transition-all ${
                  selectedFilter === tab.slug
                    ? 'btn-gold'
                    : 'glass-surface text-white/80 hover:text-white hover:border-[#d4af37]/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-10 sm:py-20 px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto mobile-snap-row grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <TiltedCard
              key={pkg.id}
              containerHeight="auto"
              rotateAmplitude={8}
              scaleOnHover={1.02}
              glare={0.45}
              shadow={0.5}
              captionText={pkg.startingPrice}
              className="mobile-snap-card-wide"
            >
              <div
                className={`p-5 sm:p-10 flex flex-col justify-between transition-all w-full h-full ${
                  pkg.popular
                    ? 'glass-dark-luxe border-2 border-[#d4af37]/60 shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_40px_rgba(212,175,55,0.18)]'
                    : 'glass-surface border border-white/15'
                }`}
              >
                <div className="space-y-6">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3.5 py-1 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/45 text-[#f3dc8a] text-[10px] tracking-[0.22em] uppercase font-semibold">
                      {t(pkg.categoryName)}
                    </span>
                    {pkg.popular && (
                      <span className="px-3.5 py-1 rounded-full bg-[#d4af37] text-[#070709] text-[10px] tracking-[0.2em] uppercase font-bold">
                        MÁS SOLICITADO
                      </span>
                    )}
                  </div>

                  {/* Title & Starting Price */}
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
                    <div>
                      <h2 className="font-monument text-2xl text-white">
                        {t(pkg.tierName)}
                      </h2>
                      <p className="font-editorial italic text-lg text-[#e2cf97] mt-1">
                        {t(pkg.tagline)}
                      </p>
                    </div>
                    <div className="sm:text-right shrink-0">
                      <span className="text-[10px] uppercase tracking-widest text-white/50 block">
                        Inversión Desde
                      </span>
                      <span className="font-monument text-3xl sm:text-4xl text-gold-gradient font-bold">
                        {pkg.startingPrice}
                      </span>
                      <span className="text-[11px] text-white/60 block mt-0.5">
                        {t(pkg.durationLabel)}
                      </span>
                    </div>
                  </div>

                  {/* What's Included */}
                  <div className="space-y-3">
                    <h3 className="text-[11px] tracking-[0.22em] uppercase text-[#f3dc8a] font-semibold">
                      QUÉ INCLUYE ESTA COLECCIÓN
                    </h3>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-[#d2d5e0]">
                      {pkg.deliverables.es.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Optional Extras */}
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#d4af37] font-semibold flex items-center gap-1.5">
                      <PlusCircle className="w-3.5 h-3.5" />
                      Extras Opcionales Disponibles
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {pkg.optionalExtras.es.map((extra, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-[11px] text-white/80"
                        >
                          + {extra}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Request a Quote Button */}
                <div className="pt-8 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-white/60 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    Aparta tu Fecha con el 30%
                  </span>

                  <Link
                    href={`/contact?package=${pkg.id}&service=${pkg.categorySlug}`}
                    className="btn-gold w-full sm:w-auto px-7 py-3.5 rounded-full text-xs flex items-center justify-center gap-2"
                  >
                    <span>Solicitar Cotización</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* Custom Productions Section */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1300px] mx-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.24em] uppercase font-semibold">
              <Sliders className="w-3.5 h-3.5" />
              <span>PRODUCCIONES PERSONALIZADAS A MEDIDA</span>
            </div>
            <h2 className="font-monument text-2xl sm:text-4xl text-white uppercase">
              ¿Necesitas un Video Musical, Cortometraje o Cobertura de Varios
              Días?
            </h2>
            <p className="text-sm sm:text-base text-[#c5c8d4] leading-relaxed">
              Los videos musicales, cortometrajes originales, campañas
              comerciales y bodas o quinceañeras de destino suelen requerir un
              presupuesto personalizado según locaciones, equipo de iluminación
              y días de rodaje. Cuéntanos tu idea y armamos tu propuesta en
              menos de 24 horas.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/contact?package=custom-production"
              className="btn-gold py-4 px-6 rounded-2xl text-xs text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>SOLICITAR PRESUPUESTO A MEDIDA</span>
            </Link>
            <p className="text-[11px] text-center text-white/55">
              Incluye Asesoría Gratuita 1-a-1 con el Director
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <HelpCircle className="w-4 h-4" />
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="font-monument display-headline text-white uppercase">
              Anticipos, Entregas y Viajes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item, idx) => (
              <TiltedCard
                key={idx}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={4}
                scaleOnHover={1.015}
                glare={0.22}
                shadow={0.4}
                className="w-full"
              >
                <div className="glass-surface rounded-2xl p-6 sm:p-7 space-y-2 border border-white/10 w-full">
                  <h3 className="font-monument text-base sm:text-lg text-[#f3dc8a]">
                    {t(item.q)}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c3c6d2] leading-relaxed">
                    {t(item.a)}
                  </p>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
