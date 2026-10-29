'use client';

import React from 'react';
import Link from 'next/link';
import TiltedCard, { TiltedCardLayer } from '@/components/ui/tilted-card';
import {
  Camera,
  Disc,
  Sparkles,
  Award,
  Users,
  Compass,
  Aperture,
  Film,
  Clapperboard,
} from 'lucide-react';

export default function AboutPage() {
  const studioSpecialties = [
    {
      num: '01',
      title: 'Bodas y Cinematografía de Bodas',
      desc: 'Fotografía profesional, wedding films, trailers cinematográficos, highlights, cobertura de ceremonias y documentales de bodas.',
    },
    {
      num: '02',
      title: 'Quinceañeras y Eventos Especiales',
      desc: 'Producciones cinematográficas, sesiones fotográficas, videos de presentación, trailers y cobertura completa de celebraciones.',
    },
    {
      num: '03',
      title: 'Videos Musicales (DMedia Records)',
      desc: 'Producción y dirección creativa de videoclips, conceptos cinematográficos, storytelling visual, iluminación profesional y edición audiovisual.',
    },
    {
      num: '04',
      title: 'Eventos Corporativos y Empresariales',
      desc: 'Conferencias, convenciones, galas, inauguraciones, eventos de gran escala, celebraciones empresariales y producciones comerciales.',
    },
    {
      num: '05',
      title: 'Producción de Contenido para Empresas',
      desc: 'Contratos mensuales de fotografía, videografía, campañas publicitarias, reels, videos promocionales y contenido estratégico para redes sociales.',
    },
    {
      num: '06',
      title: 'Comerciales y Publicidad',
      desc: 'Creación de anuncios cinematográficos, videos de marca, campañas visuales y contenido de alto impacto para productos y servicios.',
    },
    {
      num: '07',
      title: 'Fotografía Profesional',
      desc: 'Retratos, maternidad, familia, graduaciones, moda, fotografía comercial, productos, bienes raíces y sesiones personalizadas.',
    },
    {
      num: '08',
      title: 'Películas y Proyectos Creativos',
      desc: 'Cortometrajes, documentales, conceptos cinematográficos, storytelling y producciones audiovisuales originales.',
    },
    {
      num: '09',
      title: 'Conciertos y Entretenimiento',
      desc: 'Presentaciones musicales, artistas, eventos en vivo, discotecas y producciones especiales multicámara.',
    },
    {
      num: '10',
      title: 'Contenido Digital y Marketing Visual',
      desc: 'Contenido estratégico para Instagram, TikTok, YouTube, páginas web, marcas personales y negocios.',
    },
  ];

  const btsGallery = [
    {
      src: '/brand/creator-tuxedo-portrait.jpg',
      title: 'Dirección Formal de Etiqueta',
      tag: 'Daniel Anthony Jesús Cudina',
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
      tag: 'DPhotography Studios & Films',
    },
    {
      src: '/brand/creator-gimbal-profile.jpg',
      title: 'Estabilización Cinematográfica de Precisión',
      tag: '4K 24fps / 120fps Cámara Lenta',
    },
    {
      src: '/brand/creator-shooting-camera.jpg',
      title: 'Encuadre Óptico y Luz de Estudio',
      tag: 'Iluminación Especializada Pro',
    },
  ];

  const teamMembers = [
    {
      name: 'Daniel Anthony Jesús Cudina',
      role: 'Founder & Creative Director | Filmmaker | Cinematographer | Photographer',
      specialty:
        'Dirección Creativa, Fotografía Profesional, Cinematografía 4K y Colorización Master en DPhotography Studios & DMedia Records.',
      image: '/brand/creator-editorial-angle.jpg',
    },
    {
      name: 'Unidad de Fotografía y Luz',
      role: 'Segundo Fotógrafo y Especialista en Iluminación',
      specialty:
        'Ángulos Documentales, Iluminación Especializada de Recepción, Retratos y Detalles Editoriales.',
      image: '/brand/creator-shooting-camera.jpg',
    },
    {
      name: 'Unidad de Cine y Aérea',
      role: 'Operador Multicámara, Audio Profesional y Piloto de Dron 4K',
      specialty:
        'Sistemas de Múltiples Cámaras, Estabilizadores, Grabación de Audio Profesional y Tomas Aéreas con Drones.',
      image: '/brand/creator-gimbal-profile.jpg',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-24">
      {/* =====================================================================
          1. SOBRE MÍ — DANIEL ANTHONY JESÚS CUDINA
      ===================================================================== */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Biografía Principal (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.24em] uppercase font-semibold">
              <Award className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>SOBRE MÍ • FUNDADOR & DIRECTOR CREATIVO</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-monument display-headline text-white uppercase">
                Daniel Anthony Jesús Cudina
              </h1>
              <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.18em] text-[#d4af37]">
                Founder & Creative Director • Filmmaker • Cinematographer • Photographer
              </p>
            </div>

            <p className="font-editorial italic text-2xl sm:text-3xl text-[#e2cf97] border-l-2 border-[#d4af37] pl-4">
              “No solo capturo imágenes, creo historias que merecen ser
              recordadas para siempre.”
            </p>

            <div className="space-y-4 text-sm sm:text-base text-[#b8bcc8] leading-relaxed">
              <p>
                Mi nombre es{' '}
                <strong className="text-white font-semibold">
                  Daniel Anthony Jesús Cudina
                </strong>
                , soy fotógrafo profesional, filmmaker, cinematógrafo,
                videógrafo y fundador de{' '}
                <strong className="text-[#f3dc8a] font-semibold">
                  DPhotography Studios & DMedia Records
                </strong>
                , una compañía especializada en fotografía profesional,
                producción audiovisual y cinematografía.
              </p>
              <p>
                Para mí, una cámara es mucho más que una herramienta de trabajo.
                Es una manera de contar historias, transmitir emociones,
                capturar momentos irrepetibles y convertir ideas en experiencias
                visuales extraordinarias.
              </p>
              <p>
                Fundé{' '}
                <strong className="text-white font-semibold">
                  DPhotography Studios
                </strong>{' '}
                con una visión clara:{' '}
                <em className="text-[#e2cf97]">
                  llevar la fotografía y la producción cinematográfica a otro
                  nivel
                </em>
                , ofreciendo a cada cliente una experiencia personalizada,
                creativa y profesional, sin importar el tamaño de su proyecto.
              </p>
            </div>

            {/* Dual Brand Architecture */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 pt-2">
              <TiltedCard
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={9}
                scaleOnHover={1.03}
                glare={0.28}
                shadow={0.45}
                className="h-full"
              >
                <div className="p-3.5 sm:p-5 rounded-2xl spatial-bento-card space-y-1.5 sm:space-y-2 h-full w-full">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                  <h3 className="font-monument text-xs sm:text-sm text-white uppercase">
                    DPhotography Studios
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                    Fotografía profesional, wedding films, quinceañeras,
                    retratos, eventos corporativos y producciones comerciales.
                  </p>
                </div>
              </TiltedCard>

              <TiltedCard
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={9}
                scaleOnHover={1.03}
                glare={0.28}
                shadow={0.45}
                className="h-full"
              >
                <div className="p-3.5 sm:p-5 rounded-2xl spatial-bento-card space-y-1.5 sm:space-y-2 h-full w-full">
                  <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                  <h3 className="font-monument text-xs sm:text-sm text-[#f3dc8a] uppercase">
                    DMedia Records
                  </h3>
                  <p className="text-[11px] sm:text-xs text-white/70 leading-relaxed">
                    Dirección creativa de videoclips, storytelling visual,
                    conciertos, cine original y campañas digitales.
                  </p>
                </div>
              </TiltedCard>
            </div>
          </div>

          {/* Dual Portrait Showcase (6 cols) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-2.5 sm:gap-5 items-center">
            <div className="space-y-2.5 sm:space-y-4">
              <TiltedCard
                imageSrc="/brand/creator-tuxedo-portrait.jpg"
                altText="Daniel Anthony Jesús Cudina — Founder & Creative Director"
                captionText="Daniel Anthony Jesús Cudina"
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.04}
                glare={0.45}
                shadow={0.55}
                className="aspect-[3/4] border border-[#d4af37]/40 shadow-2xl"
              />
              <TiltedCard
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.02}
                glare={0.22}
                shadow={0.35}
              >
                <div className="p-2.5 sm:p-4 rounded-2xl spatial-bento-card text-[10px] sm:text-xs text-center w-full">
                  <strong className="text-[#f3dc8a] block uppercase tracking-widest">
                    Daniel Anthony Jesús Cudina
                  </strong>
                  <span className="text-white/70">
                    Founder & Creative Director • Presencia de Etiqueta
                  </span>
                </div>
              </TiltedCard>
            </div>

            <div className="space-y-2.5 sm:space-y-4 pt-4 sm:pt-8">
              <TiltedCard
                imageSrc="/brand/creator-directors-chair-cinema-rig.jpg"
                altText="Daniel Anthony Jesús Cudina en Silla de Director con Rig de Cine Tilta"
                captionText="Filmmaker & Cinematographer"
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.04}
                glare={0.45}
                shadow={0.55}
                className="aspect-[3/4] border border-white/15 shadow-2xl"
              />
              <TiltedCard
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={8}
                scaleOnHover={1.02}
                glare={0.22}
                shadow={0.35}
              >
                <div className="p-2.5 sm:p-4 rounded-2xl spatial-bento-card text-[10px] sm:text-xs text-center w-full">
                  <strong className="text-[#f3dc8a] block uppercase tracking-widest">
                    Visión Cinematográfica
                  </strong>
                  <span className="text-white/70">
                    Dirección creativa, óptica de cine y rigor técnico
                  </span>
                </div>
              </TiltedCard>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ¿QUÉ HACEMOS EN DPHOTOGRAPHY STUDIOS? (10 ÁREAS DE PRODUCCIÓN)
      ===================================================================== */}
      <section className="px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-white/15 pb-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center gap-2">
                <Clapperboard className="w-4 h-4" />
                ¿QUÉ HACEMOS EN DPHOTOGRAPHY STUDIOS?
              </span>
              <h2 className="font-monument display-headline text-white uppercase">
                Producción Visual de Alto Impacto
              </h2>
            </div>
            <p className="font-editorial italic text-lg sm:text-2xl text-[#e2cf97] max-w-xl">
              Somos una compañía de producción visual que transforma momentos,
              historias, marcas e ideas en contenido extraordinario.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {studioSpecialties.map((item) => (
              <TiltedCard
                key={item.num}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={9}
                scaleOnHover={1.03}
                glare={0.35}
                shadow={0.45}
                captionText={item.title}
                className="h-full"
              >
                <div className="p-5 spatial-bento-card flex flex-col justify-between space-y-3 h-full w-full">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-[#d4af37] block">
                      /{item.num}
                    </span>
                    <h3 className="font-monument text-xs sm:text-sm text-white uppercase leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#b8bcc8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. PRODUCCIÓN PROFESIONAL & MÁS QUE UN SERVICIO, UNA EXPERIENCIA
      ===================================================================== */}
      <section className="px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <TiltedCard
            containerHeight="auto"
            containerWidth="100%"
            rotateAmplitude={7}
            scaleOnHover={1.02}
            glare={0.3}
            shadow={0.45}
            className="h-full"
          >
            <div className="p-6 sm:p-10 spatial-bento-card space-y-4 h-full w-full">
              <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#d4af37] flex items-center gap-2">
                <Film className="w-4 h-4" />
                PRODUCCIÓN PROFESIONAL • VISIÓN CINEMATOGRÁFICA
              </span>
              <h3 className="font-monument text-xl sm:text-2xl text-white uppercase">
                Planificación Creativa y Tecnología Audiovisual
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-[#c2c6d4] leading-relaxed">
                <p>
                  Cada proyecto que realizamos cuenta con una planificación
                  creativa y un enfoque visual diseñado para conseguir
                  resultados únicos.
                </p>
                <p>
                  Trabajamos con equipos de producción profesionales, incluyendo
                  cámaras cinematográficas, sistemas de múltiples cámaras,
                  drones para tomas aéreas, iluminación especializada, equipos
                  de grabación de audio profesional, estabilizadores y
                  tecnología audiovisual.
                </p>
                <p>
                  Desde la preproducción, dirección creativa y planificación de
                  escenas hasta la grabación, edición, diseño de sonido,
                  corrección de color y entrega final, cuidamos cada detalle
                  para que el resultado refleje la calidad y visión que nuestros
                  clientes merecen.
                </p>
              </div>
            </div>
          </TiltedCard>

          <TiltedCard
            containerHeight="auto"
            containerWidth="100%"
            rotateAmplitude={7}
            scaleOnHover={1.02}
            glare={0.3}
            shadow={0.45}
            className="h-full"
          >
            <div className="p-6 sm:p-10 spatial-bento-card space-y-4 h-full w-full">
              <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#d4af37] flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                MÁS QUE UN SERVICIO, UNA EXPERIENCIA
              </span>
              <h3 className="font-monument text-xl sm:text-2xl text-white uppercase">
                Tu Historia Merece Convertirse en una Película
              </h3>
              <div className="space-y-3.5 text-xs sm:text-sm text-[#c2c6d4] leading-relaxed">
                <p>
                  Creo firmemente que cada persona tiene una historia que
                  contar, cada pareja tiene una historia de amor que merece
                  convertirse en una película y cada empresa tiene una visión
                  que merece ser presentada al mundo de una manera
                  extraordinaria.
                </p>
                <p>
                  Por eso, mi objetivo no es simplemente llegar con una cámara y
                  comenzar a grabar. Nuestro objetivo es conocer tu visión,
                  entender tus ideas y trabajar contigo para crear algo que
                  supere tus expectativas.
                </p>
                <p>
                  No importa si estás planeando la boda de tus sueños, los
                  quince años de tu hija, el lanzamiento de tu negocio, un video
                  musical o una producción cinematográfica completa:{' '}
                  <strong className="text-[#f3dc8a]">
                    cada proyecto recibe mi dedicación, creatividad, pasión y
                    compromiso profesional.
                  </strong>
                </p>
              </div>
            </div>
          </TiltedCard>
        </div>
      </section>

      {/* =====================================================================
          4. DETRÁS DE CÁMARAS Y EQUIPO DE CINE
      ===================================================================== */}
      <section className="px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center gap-2">
                <Aperture className="w-4 h-4" />
                DETRÁS DE CÁMARAS Y EQUIPO DE CINE
              </span>
              <h2 className="font-monument display-headline text-white uppercase">
                En el Set con DPhotography Studios
              </h2>
            </div>
            <p className="font-editorial italic text-lg sm:text-xl text-[#e2cf97] max-w-md">
              Desde sesiones íntimas hasta eventos multitudinarios y proyectos
              audiovisuales complejos.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
            {btsGallery.map((item, idx) => (
              <TiltedCard
                key={idx}
                imageSrc={item.src}
                altText={item.title}
                captionText={item.tag}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={11}
                scaleOnHover={1.035}
                glare={0.42}
                shadow={0.5}
                className="aspect-[3/4] spatial-bento-card"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                <TiltedCardLayer
                  depth={24}
                  className="flex flex-col justify-end p-2.5 sm:p-4"
                >
                  <div className="p-2.5 sm:p-4 bg-black/65 backdrop-blur-md border border-white/10">
                    <span className="text-[8px] sm:text-[10px] tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#f3dc8a] font-mono block">
                      {item.tag}
                    </span>
                    <h3 className="font-monument text-xs sm:text-lg text-white mt-0.5 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </TiltedCardLayer>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. EL EQUIPO DETRÁS DE LA VISIÓN
      ===================================================================== */}
      <section className="px-5 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Users className="w-4 h-4" />
              DIRECCIÓN Y EQUIPO DE PRODUCCIÓN
            </span>
            <h2 className="font-monument display-headline text-white uppercase">
              El Equipo Detrás de la Visión
            </h2>
            <p className="font-editorial italic text-lg sm:text-xl text-[#c8ccd8]">
              En DPhotography Studios no creemos en hacer simplemente un trabajo
              más: creamos producciones que provocan emociones y dejan una
              impresión duradera.
            </p>
          </div>

          <div className="mobile-snap-row grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => (
              <TiltedCard
                key={idx}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={9}
                scaleOnHover={1.03}
                glare={0.35}
                shadow={0.5}
                className="mobile-snap-card h-full"
              >
                <div className="spatial-bento-card overflow-hidden flex flex-col h-full w-full">
                  <div className="aspect-[4/5] overflow-hidden bg-black">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-[#d4af37] block">
                      {member.name}
                    </span>
                    <h3 className="font-monument text-base sm:text-lg text-[#f3dc8a]">
                      {member.role}
                    </h3>
                    <p className="text-xs text-[#b8bcc8] leading-relaxed">
                      {member.specialty}
                    </p>
                  </div>
                </div>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. TU VISIÓN. NUESTRA CREATIVIDAD. (CIERRE FIRMADO POR DANIEL)
      ===================================================================== */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto py-8 border-t border-white/15 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.14em] sm:tracking-[0.24em] uppercase font-semibold">
              <Compass className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
              <span>TU VISIÓN • NUESTRA CREATIVIDAD</span>
            </div>
            <h2 className="font-monument text-2xl sm:text-4xl text-white uppercase">
              Donde Tus Historias Se Convierten en Películas y Tus Sueños Se
              Convierten en Vida.
            </h2>
            <p className="text-sm sm:text-base text-[#b8bcc8] leading-relaxed">
              Soy{' '}
              <strong className="text-white">
                Daniel Anthony Jesús Cudina
              </strong>
              , y estoy aquí para convertir tus ideas en imágenes, tus momentos
              en recuerdos y tus sueños en una realidad cinematográfica. Con
              base en Louisville, Kentucky y disponibles para viajar a cualquier
              destino.
            </p>
            <p className="font-editorial italic text-xl sm:text-2xl text-[#f3dc8a]">
              “Let&apos;s Create Something Extraordinary.”
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              href="/contact"
              className="btn-gold py-4 px-6 rounded-full text-xs text-center flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span> HABLAR CON DANIEL • RESERVAR FECHA</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
