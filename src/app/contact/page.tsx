'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStudio } from '@/context/StudioContext';
import TiltedCard from '@/components/ui/tilted-card';
import {
  Sparkles,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Youtube,
  Facebook,
  CheckCircle2,
  Send,
  Disc,
  Clock,
} from 'lucide-react';

function ContactContent() {
  const { t, packages } = useStudio();
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get('package') || '';
  const preselectedService = searchParams.get('service') || '';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [venueLocation, setVenueLocation] = useState('Louisville, KY');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'wedding-combo',
  ]);
  const [selectedPackageId, setSelectedPackageId] =
    useState(preselectedPackage);
  const [budget, setBudget] = useState('$3,000 – $5,500');
  const [visionNotes, setVisionNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedServices([preselectedService]);
    }
    if (preselectedPackage) {
      setSelectedPackageId(preselectedPackage);
    }
  }, [preselectedService, preselectedPackage]);

  const serviceOptions = [
    {
      id: 'wedding-combo',
      label: 'Boda Fotografía + Cine Combinado',
    },
    {
      id: 'weddings',
      label: 'Solo Fotografía de Boda',
    },
    {
      id: 'wedding-films',
      label: 'Solo Película y Tráiler de Boda',
    },
    {
      id: 'quinceaneras',
      label: 'Quinceañera (Pre-Quince, Foto y Película)',
    },
    {
      id: 'portraits-editorial',
      label: 'Sesión de Retrato / Maternidad / Familia / Graduación',
    },
    {
      id: 'music-videos',
      label: 'Video Musical Oficial (DMedia Records)',
    },
    {
      id: 'commercial-films',
      label: 'Comercial de Marca, Corporativo o Bienes Raíces',
    },
    {
      id: 'original-films',
      label: 'Cortometraje Original o Proyecto Especial',
    },
  ];

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const socialPosts = [
    {
      img: '/brand/creator-tuxedo-portrait.jpg',
      handle: '@dphotographystudios',
      platform: 'Instagram',
      caption:
        'Retratos de etiqueta en estudio y temporada de bodas en Louisville ✨',
    },
    {
      img: '/brand/creator-crouching-tilta-rig.jpg',
      handle: '@dmediarecords',
      platform: 'YouTube / Reels',
      caption:
        'En el set con el anillo Tilta + Sony Cinema para nuestro nuevo video musical 🎬',
    },
    {
      img: '/fotos/boda-47.jpg',
      handle: '@dphotographystudios',
      platform: 'TikTok / Reels',
      caption: 'Estreno Tráiler de Boda 4K — Louisville KY 💍',
    },
    {
      img: '/fotos/quince-caballo-10.jpg',
      handle: '@dphotographystudios',
      platform: 'Instagram',
      caption:
        'Sesión Real Pre-Quince Editorial Ecuestre en Kentucky 👑',
    },
  ];

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1300px] mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full spatial-capsule text-[#f3dc8a] text-[10px] tracking-[0.26em] uppercase font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>RESERVA TU FECHA Y AGENDA TU CONSULTA</span>
          </div>

          <h1 className="font-monument hero-headline text-white uppercase">
            Hagamos Tu Historia Realidad
          </h1>

          <p className="font-editorial italic text-2xl sm:text-3xl text-[#e2cf97] max-w-3xl mx-auto">
            Completa el formulario de reserva y te responderemos en menos de 24
            horas con disponibilidad de fecha y una propuesta a tu medida.
          </p>
        </div>
      </section>

      {/* Main Booking Grid */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Detailed Booking Form (8 cols) */}
          <div className="lg:col-span-8 spatial-island p-6 sm:p-12">
            {submitted ? (
              <div className="py-16 text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center mx-auto text-[#f3dc8a]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="font-monument text-2xl sm:text-3xl text-white uppercase">
                  ¡Solicitud Recibida! — Bienvenido a DPhotography Studios
                </h2>
                <p className="font-editorial italic text-2xl text-[#e2cf97] max-w-xl mx-auto">
                  ¡Gracias, {fullName || 'por escribirnos'}! Estamos verificando
                  disponibilidad para {eventDate || 'tu fecha'} en{' '}
                  {venueLocation}.
                </p>
                <p className="text-xs sm:text-sm text-white/70 max-w-lg mx-auto">
                  Recibirás un mensaje y correo muy pronto para agendar tu
                  consulta privada en nuestro estudio de Louisville o por
                  videollamada.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="cursor-pointer btn-gold px-8 py-3.5 rounded-full text-xs"
                >
                  Enviar Otra Consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-[10px] tracking-[0.24em] uppercase text-[#d4af37] font-semibold">
                    PASO 01 • TUS DATOS DE CONTACTO
                  </span>
                  <h2 className="font-monument text-xl sm:text-2xl text-white mt-1">
                    Formulario de Cotización y Reserva
                  </h2>
                </div>

                {/* Contact Info Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="ej. Valeria Hernández / Sophia y Alex"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="cliente@correo.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(502) 000-0000"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Services Multi-Select */}
                <div className="space-y-3 pt-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                    PASO 02 • ¿QUÉ SERVICIOS TE INTERESAN? (PUEDES ELEGIR
                    VARIOS)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceOptions.map((srv) => {
                      const active = selectedServices.includes(srv.id);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => toggleService(srv.id)}
                          className={`cursor-pointer p-3.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                            active
                              ? 'bg-[#d4af37]/20 border-[#d4af37] text-[#f3dc8a]'
                              : 'bg-black/40 border-white/10 text-white/75 hover:border-white/30'
                          }`}
                        >
                          <span>{srv.label}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              active
                                ? 'border-[#d4af37] bg-[#d4af37] text-black'
                                : 'border-white/30'
                            }`}
                          >
                            {active && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Event Date, Location, Package & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Fecha del Evento o Sesión *
                    </label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Salón, Locación o Ciudad *
                    </label>
                    <input
                      type="text"
                      required
                      value={venueLocation}
                      onChange={(e) => setVenueLocation(e.target.value)}
                      placeholder="Louisville, KY / Otra Ciudad"
                      className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Paquete de Interés
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => setSelectedPackageId(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0e1017] border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    >
                      <option value="">
                        Ayúdame a elegir / Paquete Personalizado
                      </option>
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {t(p.categoryName)} — {t(p.tierName)} (
                          {p.startingPrice})
                        </option>
                      ))}
                      <option value="custom-production">
                        Producción Especial a Medida (Video Musical / Cine /
                        Destino)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                      Presupuesto Estimado
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#0e1017] border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                    >
                      <option value="$450 – $1,500">
                        $450 – $1,500 (Retratos / Sesiones Individuales)
                      </option>
                      <option value="$1,500 – $3,000">
                        $1,500 – $3,000 (Videos Musicales / Solo Foto o Video)
                      </option>
                      <option value="$3,000 – $5,500">
                        $3,000 – $5,500 (Boda o Quinceañera Foto + Película)
                      </option>
                      <option value="$5,500+">
                        $5,500+ (Colección Grand Signature / Varios Días /
                        Comercial)
                      </option>
                    </select>
                  </div>
                </div>

                {/* Story / Vision Textarea */}
                <div className="space-y-2">
                  <label className="text-[11px] uppercase tracking-widest text-[#f3dc8a] block">
                    Cuéntanos Sobre Tu Evento, Idea o Concepto
                  </label>
                  <textarea
                    rows={4}
                    value={visionNotes}
                    onChange={(e) => setVisionNotes(e.target.value)}
                    placeholder="Cuéntanos detalles de tu boda, temática de tus XV años, concepto de tu video musical o cualquier duda..."
                    className="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-sm text-white focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer btn-gold w-full py-4 rounded-2xl text-xs flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4" />
                  <span>ENVIAR SOLICITUD Y VERIFICAR FECHA</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Direct Info, Louisville Badge & Portrait (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={7} scaleOnHover={1.025} glare={0.32} shadow={0.5}>
              <div className="glass-dark-luxe rounded-3xl p-7 space-y-5 border border-[#d4af37]/35 w-full">
                <div className="flex items-center gap-3.5">
                  <img
                    src="/brand/creator-tuxedo-portrait.jpg"
                    alt="Director DPhotography Studios"
                    className="w-16 h-16 rounded-2xl object-cover object-top border border-[#d4af37]"
                  />
                  <div>
                    <span className="text-[10px] tracking-[0.22em] uppercase text-[#d4af37] font-semibold block">
                      ATENCIÓN DIRECTA DEL ESTUDIO
                    </span>
                    <h3 className="font-monument text-lg text-white">
                      DPhotography Studios
                    </h3>
                    <span className="text-xs text-white/65">
                      Atención en Español e Inglés • Louisville, KY
                    </span>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-white/10 text-xs text-[#c5c8d4]">
                  <p className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>
                      Louisville, Kentucky (Disponibles en Todo el País y
                      Destinos)
                    </span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>(502) 555-0194 (Llamadas / SMS / WhatsApp)</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>booking@dphotographystudios.com</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span>Tiempo de Respuesta: Menos de 6 Horas</span>
                  </p>
                </div>
              </div>
            </TiltedCard>

            {/* DMedia Records Direct Box */}
            <TiltedCard containerHeight="auto" containerWidth="100%" rotateAmplitude={7} scaleOnHover={1.025} glare={0.28} shadow={0.45}>
              <div className="glass-surface rounded-3xl p-7 space-y-3 border border-white/15 w-full">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#f3dc8a]">
                  <Disc className="w-4 h-4 text-[#d4af37]" />
                  <span>Reservas DMedia Records</span>
                </div>
                <p className="text-xs text-white/75 leading-relaxed">
                  Artistas, managers y disqueras interesados en Videos Musicales
                  pueden incluir el enlace de su canción o idea en las notas del
                  formulario.
                </p>
              </div>
            </TiltedCard>
          </div>
        </div>
      </section>

      {/* Social Media Hub & Latest Work Preview */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] tracking-[0.26em] uppercase text-[#d4af37] font-semibold block">
                NUESTRAS REDES SOCIALES OFICIALES
              </span>
              <h2 className="font-monument display-headline text-white uppercase">
                Síguenos en Instagram, YouTube, TikTok y Facebook
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full glass-dark-luxe hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-[#d4af37]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full glass-dark-luxe hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2"
              >
                <Youtube className="w-4 h-4 text-[#d4af37]" />
                <span>YouTube 4K</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full glass-dark-luxe hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>TikTok</span>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-full glass-dark-luxe hover:border-[#d4af37] text-xs font-semibold flex items-center gap-2"
              >
                <Facebook className="w-4 h-4 text-[#d4af37]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {socialPosts.map((post, i) => (
              <TiltedCard
                key={i}
                containerHeight="auto"
                containerWidth="100%"
                rotateAmplitude={10}
                scaleOnHover={1.035}
                glare={0.38}
                shadow={0.5}
                className="h-full"
              >
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group glass-dark-luxe glass-interactive rounded-2xl overflow-hidden flex flex-col justify-between h-full w-full"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-black relative">
                    <img
                      src={post.img}
                      alt={post.caption}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/75 text-[#f3dc8a] text-[8px] sm:text-[10px] uppercase tracking-widest">
                      {post.platform}
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4 space-y-1 sm:space-y-1.5">
                    <span className="text-[9px] sm:text-[11px] font-bold text-[#f3dc8a] block truncate">
                      {post.handle}
                    </span>
                    <p className="text-[10px] sm:text-xs text-white/80 line-clamp-2">
                      {post.caption}
                    </p>
                  </div>
                </a>
              </TiltedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070709]" />}>
      <ContactContent />
    </Suspense>
  );
}
