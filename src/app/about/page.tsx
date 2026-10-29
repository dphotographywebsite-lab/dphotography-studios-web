'use client';

import React from 'react';
import Link from 'next/link';
import {
  Camera,
  Disc,
  Sparkles,
  Award,
  Users,
  Compass,
  Aperture,
} from 'lucide-react';

export default function AboutPage() {
  const btsGallery = [
    {
      src: '/brand/creator-tuxedo-portrait.jpg',
      title: 'Dirección Formal de Etiqueta',
      tag: 'Sony Alpha + Sigma Art',
    },
    {
      src: '/brand/creator-directors-chair-cinema-rig.jpg',
      title: 'Silla de Director y Rig de Cine',
      tag: 'Anillo Tilta + Monitor de Campo',
    },
    {
      src: '/brand/creator-crouching-tilta-rig.jpg',
      title: 'Seguimiento Dinámico en Ángulo Bajo',
      tag: 'DJI RS3 Pro + Ecosistema Tilta',
    },
    {
      src: '/brand/creator-tuxedo-fullbody.jpg',
      title: 'Presencia de Gala para Bodas y XV',
      tag: 'Estudio Principal en Louisville',
    },
    {
      src: '/brand/creator-gimbal-profile.jpg',
      title: 'Estabilización Cinematográfica de Precisión',
      tag: '4K 24fps / 120fps Cámara Lenta',
    },
    {
      src: '/brand/creator-shooting-camera.jpg',
      title: 'Encuadre Óptico y Luz de Estudio',
      tag: 'Flashes de Estudio Godox Pro',
    },
  ];

  const teamMembers = [
    {
      role: 'Fundador, Director Creativo y Director de Fotografía',
      specialty:
        'Fotografía Editorial, Dirección de Cine y Colorización Master',
      image: '/brand/creator-editorial-angle.jpg',
    },
    {
      role: 'Segundo Fotógrafo y Especialista en Iluminación',
      specialty:
        'Ángulos Documentales, Iluminación de Recepción y Detalles',
      image: '/brand/creator-shooting-camera.jpg',
    },
    {
      role: 'Operador de Cámara B y Piloto de Dron 4K',
      specialty:
        'Captura Multicámara, Audio Inalámbrico y Tomas Aéreas 4K',
      image: '/brand/creator-gimbal-profile.jpg',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-20">
      {/* 1. Estudio y Fundador (Sin contenedor envolvente) */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Story (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.26em] uppercase font-semibold">
              <Award className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>SOBRE EL ESTUDIO Y EL CREADOR</span>
            </div>

            <h1 className="font-monument display-headline text-white uppercase">
              Un Estudio de Fotografía de Lujo Combinado con una Productora de
              Cine
            </h1>

            <p className="font-editorial italic text-2xl text-[#e2cf97]">
              “No solo documentamos eventos: dirigimos, iluminamos y creamos
              recuerdos dignos del cine.”
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#b8bcc8] leading-relaxed">
              <p>
                Con sede en Louisville, Kentucky, DPhotography Studios & Films
                nació de la pasión por el retrato editorial de lujo y la
                producción cinematográfica de alto nivel. Nuestro objetivo es
                que cada cliente viva la experiencia de una verdadera producción
                de cine.
              </p>
              <p>
                Ya sea capturando los votos de una boda de etiqueta, dirigiendo
                el tráiler real de una Quinceañera o armando nuestro rig
                cinematográfico Tilta para un video musical bajo nuestra
                división DMedia Records, cuidamos al máximo la iluminación, el
                sonido y la emoción de tu historia.
              </p>
            </div>

            {/* Dual Brand Architecture */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl spatial-bento-card space-y-2">
                <Camera className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-monument text-sm text-white uppercase">
                  DPhotography Studios & Films
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Bodas de Lujo, Quinceañeras, Retratos Editoriales en Estudio,
                  Maternidad y Familia.
                </p>
              </div>

              <div className="p-5 rounded-2xl spatial-bento-card space-y-2">
                <Disc className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-monument text-sm text-[#f3dc8a] uppercase">
                  División DMedia Records
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  Videos Musicales Oficiales, Visuales para Artistas,
                  Cortometrajes y Campañas Comerciales.
                </p>
              </div>
            </div>
          </div>

          {/* Dual Portrait Showcase (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 items-center">
            <div className="space-y-4">
              <img
                src="/brand/creator-tuxedo-portrait.jpg"
                alt="Fundador en Traje de Etiqueta con Cámara"
                className="rounded-3xl border border-[#d4af37]/40 shadow-2xl w-full aspect-[3/4] object-cover object-top"
              />
              <div className="p-4 rounded-2xl spatial-bento-card text-xs text-center">
                <strong className="text-[#f3dc8a] block uppercase tracking-widest">
                  El Estándar Editorial
                </strong>
                <span className="text-white/70">
                  Presencia formal de etiqueta en tus eventos de gala
                </span>
              </div>
            </div>

            <div className="space-y-4 sm:pt-8">
              <img
                src="/brand/creator-directors-chair-cinema-rig.jpg"
                alt="Fundador en Silla de Director con Rig de Cine Tilta"
                className="rounded-3xl border border-white/15 shadow-2xl w-full aspect-[3/4] object-cover object-top"
              />
              <div className="p-4 rounded-2xl spatial-bento-card text-xs text-center">
                <strong className="text-[#f3dc8a] block uppercase tracking-widest">
                  Producción Cinematográfica
                </strong>
                <span className="text-white/70">
                  Anillo Tilta, estabilizador RS3 Pro y monitor 4K
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detrás de Cámaras y Equipo de Cine Flotante */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center gap-2">
                <Aperture className="w-4 h-4" />
                DETRÁS DE CÁMARAS Y EQUIPO DE CINE
              </span>
              <h2 className="font-monument display-headline text-white uppercase">
                Nuestro Proceso y Equipo de Producción
              </h2>
            </div>
            <p className="font-editorial italic text-xl text-[#e2cf97] max-w-md">
              Cámaras de cine de última generación, lentes luminosos y
              estabilizadores profesionales.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {btsGallery.map((item, idx) => (
              <div
                key={idx}
                className="group spatial-bento-card overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/55 backdrop-blur-md border border-white/10">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#f3dc8a] font-mono block">
                      {item.tag}
                    </span>
                    <h3 className="font-monument text-lg text-white mt-0.5">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. El Equipo Detrás de la Visión */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              EL EQUIPO DETRÁS DE LA VISIÓN
            </span>
            <h2 className="font-monument display-headline text-white uppercase">
              Un Equipo Coordinado de Fotografía y Cine
            </h2>
            <p className="font-editorial italic text-xl text-[#c8ccd8]">
              Entrenados para trabajar en perfecta sincronía, logrando que
              fotografía y video se complementen en cada momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="spatial-bento-card overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={member.image}
                    alt={member.role}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-6 space-y-2">
                  <h3 className="font-monument text-lg text-[#f3dc8a]">
                    {member.role}
                  </h3>
                  <p className="text-xs text-[#b8bcc8] leading-relaxed">
                    {member.specialty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Louisville, Kentucky & Destinos Internacionales */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto py-4 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.24em] uppercase font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>LOUISVILLE, KENTUCKY Y DESTINOS INTERNACIONALES</span>
            </div>
            <h2 className="font-monument text-2xl sm:text-4xl text-white uppercase">
              Base en Louisville. Listos para Viajar a Cualquier Destino.
            </h2>
            <p className="text-sm sm:text-base text-[#b8bcc8] leading-relaxed">
              Cubrimos localmente Louisville, Lexington, Elizabethtown, Bowling
              Green, Indiana, Cincinnati, Indianápolis y Nashville—y nuestro
              equipo viaja a cualquier ciudad de Estados Unidos, México y el
              Caribe para bodas de destino, quinceañeras y videos musicales.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="btn-gold py-4 px-6 rounded-full text-xs text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>CONSULTAR DISPONIBILIDAD DE VIAJE</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
