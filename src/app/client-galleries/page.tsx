'use client';

import React, { useState } from 'react';
import { useStudio } from '@/context/StudioContext';
import { CLIENT_GALLERIES_DATA, ClientGalleryItem } from '@/data/studioData';
import {
  Lock,
  Unlock,
  KeyRound,
  Download,
  Share2,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Calendar,
  MapPin,
  Image as ImageIcon,
  X,
} from 'lucide-react';

export default function ClientGalleriesPage() {
  const { t } = useStudio();
  const [searchCode, setSearchCode] = useState('');
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [activeGalleryModal, setActiveGalleryModal] =
    useState<ClientGalleryItem | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const filteredGalleries = CLIENT_GALLERIES_DATA.filter((g) => {
    if (!searchCode.trim()) return true;
    const q = searchCode.toLowerCase();
    return (
      g.clientNames.toLowerCase().includes(q) ||
      g.code.toLowerCase().includes(q) ||
      g.venue.toLowerCase().includes(q)
    );
  });

  const handleOpenGallery = (gal: ClientGalleryItem) => {
    setPasswordInput('');
    setPasswordError(false);
    setActiveGalleryModal(gal);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGalleryModal) return;
    if (
      passwordInput.trim().toUpperCase() === activeGalleryModal.code ||
      passwordInput.trim().length >= 4
    ) {
      setUnlockedIds((prev) => [...prev, activeGalleryModal.id]);
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const isGalleryUnlocked = (gal: ClientGalleryItem) =>
    !gal.isLocked || unlockedIds.includes(gal.id);

  return (
    <div className="pt-28 pb-20 space-y-16">
      {/* Header & Pixieset Quick Access Bar */}
      <section className="px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark-luxe border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.26em] uppercase font-semibold">
            <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>PORTAL PRIVADO DE CLIENTES PIXIESET</span>
          </div>

          <h1 className="font-monument hero-headline text-white uppercase">
            Galerías de Clientes
          </h1>

          <p className="font-editorial italic text-2xl sm:text-3xl text-[#e2cf97] max-w-3xl mx-auto">
            Visualiza, comparte con tu familia, ordena cuadros y descarga tus
            fotografías en máxima resolución.
          </p>

          {/* Search / Access Code Input */}
          <div className="max-w-xl mx-auto pt-4">
            <div className="glass-dark-luxe p-2 rounded-full flex items-center gap-2 border border-[#d4af37]/45">
              <KeyRound className="w-5 h-5 text-[#d4af37] ml-4 shrink-0" />
              <input
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Busca por Nombre o Código de Galería (ej. VALERIA15, BROWN2026)..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder:text-white/45 focus:outline-none px-2 py-2.5"
              />
              {searchCode && (
                <button
                  type="button"
                  onClick={() => setSearchCode('')}
                  className="cursor-pointer p-2 text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <p className="text-[11px] text-white/50 mt-2">
              Códigos de demostración para galerías con candado: VALERIA15 •
              CASTLE26
            </p>
          </div>
        </div>
      </section>

      {/* Client Galleries Grid */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredGalleries.map((gal) => {
            const unlocked = isGalleryUnlocked(gal);
            return (
              <div
                key={gal.id}
                onClick={() => handleOpenGallery(gal)}
                className="cursor-pointer group glass-dark-luxe glass-interactive rounded-3xl overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={gal.coverImage}
                    alt={gal.clientNames}
                    className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                      unlocked ? 'brightness-90' : 'brightness-50 blur-[2px]'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090a10] via-transparent to-black/40" />

                  <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] tracking-[0.2em] uppercase font-semibold">
                    {t(gal.eventType)}
                  </div>

                  <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 border border-white/15 text-xs flex items-center gap-1.5">
                    {unlocked ? (
                      <>
                        <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300 text-[10px] tracking-widest uppercase font-semibold">
                          Abierta
                        </span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span className="text-[#f3dc8a] text-[10px] tracking-widest uppercase font-semibold">
                          Con Contraseña
                        </span>
                      </>
                    )}
                  </div>

                  {!unlocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
                      <div className="w-14 h-14 rounded-full bg-black/80 border border-[#d4af37] flex items-center justify-center text-[#f3dc8a]">
                        <Lock className="w-6 h-6" />
                      </div>
                      <span className="text-xs tracking-[0.2em] uppercase text-white font-semibold bg-black/70 px-4 py-1.5 rounded-full">
                        Clic para Ingresar Contraseña
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1.5">
                    <h2 className="font-monument text-xl sm:text-2xl text-white">
                      {gal.clientNames}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-white/65">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                        {gal.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                        {gal.date}
                      </span>
                      <span className="flex items-center gap-1 text-[#f3dc8a]">
                        <ImageIcon className="w-3.5 h-3.5" />
                        {gal.photoCount} Fotos
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="cursor-pointer btn-gold px-5 py-3 rounded-xl text-[11px] shrink-0"
                  >
                    {unlocked ? 'Entrar a Galería' : 'Desbloquear'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pixieset Features & Client Instructions */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-surface rounded-3xl p-7 space-y-3">
            <Download className="w-7 h-7 text-[#d4af37]" />
            <h3 className="font-monument text-lg text-white">
              Descarga en Alta Resolución y Redes
            </h3>
            <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
              Descarga tus fotos favoritas directo a tu celular o descarga la
              galería completa en formato de Impresión de Alta Resolución y
              tamaño para Redes Sociales.
            </p>
          </div>

          <div className="glass-surface rounded-3xl p-7 space-y-3">
            <Share2 className="w-7 h-7 text-[#d4af37]" />
            <h3 className="font-monument text-lg text-white">
              Comparte con Familia e Invitados
            </h3>
            <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
              Tú tienes el control. Comparte el enlace con tus invitados
              mientras mantienes tu PIN de descarga privado.
            </p>
          </div>

          <div className="glass-surface rounded-3xl p-7 space-y-3">
            <ShoppingBag className="w-7 h-7 text-[#d4af37]" />
            <h3 className="font-monument text-lg text-white">
              Tienda de Cuadros e Impresiones
            </h3>
            <p className="text-xs sm:text-sm text-[#b8bcc8] leading-relaxed">
              Ordena cuadros enmarcados, lienzos canvas, acrílicos e impresiones
              profesionales directamente desde tu galería con envío a domicilio.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Client Gallery Unlock / Preview Modal */}
      {activeGalleryModal && (
        <div
          className="fixed inset-0 z-[85] bg-black/90 backdrop-blur-2xl p-4 sm:p-8 overflow-y-auto flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl glass-dark-luxe rounded-3xl overflow-hidden border border-[#d4af37]/45 p-6 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] tracking-[0.22em] uppercase text-[#d4af37] font-semibold">
                  COLECCIÓN DE CLIENTE PIXIESET • {activeGalleryModal.venue}
                </span>
                <h3 className="font-monument text-xl sm:text-2xl text-white mt-1">
                  {activeGalleryModal.clientNames}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveGalleryModal(null)}
                className="cursor-pointer p-2 rounded-full bg-white/5 hover:bg-[#d4af37]/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!isGalleryUnlocked(activeGalleryModal) ? (
              <form
                onSubmit={handleUnlock}
                className="py-8 max-w-md mx-auto text-center space-y-5"
              >
                <div className="w-16 h-16 rounded-full bg-[#d4af37]/15 border border-[#d4af37] flex items-center justify-center mx-auto text-[#f3dc8a]">
                  <Lock className="w-7 h-7" />
                </div>
                <h4 className="font-monument text-lg text-white">
                  Colección Privada con Contraseña
                </h4>
                <p className="text-xs text-white/70">
                  Ingresa la contraseña proporcionada por DPhotography Studios
                  (Código demo: {activeGalleryModal.code})
                </p>

                <input
                  type="text"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Ingresa la Contraseña..."
                  className="w-full px-4 py-3 rounded-xl bg-black/70 border border-[#d4af37]/40 text-center text-sm text-white tracking-widest uppercase focus:outline-none"
                />
                {passwordError && (
                  <p className="text-xs text-red-400">
                    Código incorrecto. Prueba con &quot;{activeGalleryModal.code}
                    &quot;
                  </p>
                )}

                <button
                  type="submit"
                  className="cursor-pointer btn-gold w-full py-3.5 rounded-xl text-xs"
                >
                  Desbloquear Galería
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 rounded-2xl text-xs text-emerald-200">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Galería Desbloqueada • {activeGalleryModal.photoCount} Fotos
                    en Alta Resolución Listas
                  </span>
                  <a
                    href={activeGalleryModal.pixiesetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#f3dc8a] font-semibold underline"
                  >
                    <span>Abrir en Pixieset</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {activeGalleryModal.previewPhotos.map((url, idx) => (
                    <div
                      key={idx}
                      className="aspect-[4/5] rounded-xl overflow-hidden bg-black border border-white/10"
                    >
                      <img
                        src={url}
                        alt={`${activeGalleryModal.clientNames} vista previa ${
                          idx + 1
                        }`}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-end gap-3 pt-2">
                  <a
                    href={activeGalleryModal.pixiesetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-gold px-6 py-3 rounded-xl text-xs flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descargar Colección Completa en Pixieset</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
