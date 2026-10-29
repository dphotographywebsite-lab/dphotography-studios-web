'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStudio } from '@/context/StudioContext';
import {
  PackageTier,
  ProjectGallery,
  FilmProduction,
  ClientGalleryItem,
  FAQItem,
  TestimonialItem,
} from '@/data/studioData';
import { type LiquidGlassCarouselItem } from '@/components/ui/liquid-glass-carousel';
import {
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Image as ImageIcon,
  Check,
  RotateCcw,
  Download,
  Upload,
  CloudUpload,
  Lock,
  ExternalLink,
  Layers,
  Camera,
  Film,
  DollarSign,
  KeyRound,
  HelpCircle,
  X,
} from 'lucide-react';

type AdminTab =
  | 'packages'
  | 'carousel'
  | 'galleries'
  | 'films'
  | 'clients'
  | 'faq-testimonials';

const PACKAGE_CATEGORIES: { slug: PackageTier['categorySlug']; label: string }[] = [
  { slug: 'wedding-photo', label: 'Fotografía de Bodas' },
  { slug: 'wedding-films', label: 'Películas de Boda' },
  { slug: 'wedding-combo', label: 'Boda Foto + Video Combinado' },
  { slug: 'quinceaneras', label: 'Quinceañeras (Foto + Cine)' },
  { slug: 'portraits', label: 'Sesiones de Retrato y Estudio' },
  { slug: 'music-videos', label: 'Producción de Videos Musicales' },
  { slug: 'commercial', label: 'Producciones Comerciales y Marcas' },
  { slug: 'events', label: 'Cobertura de Eventos y Galas' },
];

const GALLERY_CATEGORIES = [
  { slug: 'weddings', label: 'Historia de Boda' },
  { slug: 'quinceaneras', label: 'Historia de Quinceañera' },
  { slug: 'portraits-editorial', label: 'Retratos y Editorial' },
  { slug: 'maternity-family', label: 'Maternidad y Familia' },
  { slug: 'graduation-corporate-events', label: 'Graduaciones, Conciertos y Eventos' },
];

const FILM_CATEGORIES: { slug: FilmProduction['categorySlug']; label: string }[] = [
  { slug: 'wedding-films', label: 'Tráiler Cinematográfico de Boda' },
  { slug: 'quince-films', label: 'Película Highlight de Quinceañera' },
  { slug: 'music-videos', label: 'Video Musical Oficial' },
  { slug: 'original-films', label: 'Cortometraje Original' },
  { slug: 'commercial-films', label: 'Comercial y Cine de Marca' },
];

export default function AdminDashboardPage() {
  const {
    packages,
    projectGalleries,
    carouselItems,
    films,
    clientGalleries,
    faqs,
    testimonials,
    mediaLibrary,
    supabaseConnected,
    updateCmsData,
    uploadMediaFiles,
    resetCmsToDefaults,
  } = useStudio();

  // Autenticación con contraseña del Estudio
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('dps_admin_unlocked') === 'true') {
        setUnlocked(true);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  // Pestaña activa
  const [activeTab, setActiveTab] = useState<AdminTab>('packages');

  // Estados editables locales sincronizados con StudioContext
  const [draftPackages, setDraftPackages] = useState<PackageTier[]>(packages);
  const [selectedPkgIndex, setSelectedPkgIndex] = useState<number>(0);

  const [draftCarousel, setDraftCarousel] =
    useState<LiquidGlassCarouselItem[]>(carouselItems);

  const [draftGalleries, setDraftGalleries] =
    useState<ProjectGallery[]>(projectGalleries);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);

  const [draftFilms, setDraftFilms] = useState<FilmProduction[]>(films);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState<number>(0);

  const [draftClients, setDraftClients] =
    useState<ClientGalleryItem[]>(clientGalleries);
  const [selectedClientIndex, setSelectedClientIndex] = useState<number>(0);

  const [draftFaqs, setDraftFaqs] = useState<FAQItem[]>(faqs);
  const [draftTestimonials, setDraftTestimonials] =
    useState<TestimonialItem[]>(testimonials);

  // Estado de guardado y sincronización
  const [saving, setSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [githubToken, setGithubToken] = useState<string>('');
  const [showCloudModal, setShowCloudModal] = useState<boolean>(false);

  // Selector visual de fotos (Media Picker)
  const [mediaPickerCallback, setMediaPickerCallback] = useState<
    ((url: string) => void) | null
  >(null);

  useEffect(() => {
    setDraftPackages(packages);
  }, [packages]);

  useEffect(() => {
    setDraftCarousel(carouselItems);
  }, [carouselItems]);

  useEffect(() => {
    setDraftGalleries(projectGalleries);
  }, [projectGalleries]);

  useEffect(() => {
    setDraftFilms(films);
  }, [films]);

  useEffect(() => {
    setDraftClients(clientGalleries);
  }, [clientGalleries]);

  useEffect(() => {
    setDraftFaqs(faqs);
  }, [faqs]);

  useEffect(() => {
    setDraftTestimonials(testimonials);
  }, [testimonials]);

  useEffect(() => {
    try {
      const savedToken = window.localStorage.getItem('dps_admin_gh_token');
      if (savedToken) setGithubToken(savedToken);
    } catch {
      // ignore
    }
  }, []);

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => {
      setStatusMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  // Guardar todos los cambios (localStorage + servidor local + opcional GitHub)
  const handleSaveAll = async (commitToGithub = false) => {
    setSaving(true);
    if (githubToken) {
      try {
        window.localStorage.setItem('dps_admin_gh_token', githubToken);
      } catch {
        // ignore
      }
    }

    const res = await updateCmsData(
      {
        packages: draftPackages,
        carouselItems: draftCarousel,
        projectGalleries: draftGalleries,
        films: draftFilms,
        clientGalleries: draftClients,
        faqs: draftFaqs,
        testimonials: draftTestimonials,
      },
      {
        commitToGithub,
        githubToken: githubToken.trim() || undefined,
      }
    );

    setSaving(false);
    if (commitToGithub) {
      if (res.githubSynced) {
        showToast('Cambios guardados y publicados en GitHub / Vercel correctamente.');
        setShowCloudModal(false);
      } else {
        showToast(
          `Guardado en el navegador. Error al publicar en GitHub: ${
            res.error || 'Verifica tu token'
          }`
        );
      }
    } else {
      if (res.supabaseSynced) {
        showToast(
          'Cambios guardados en Supabase Cloud en tiempo real (visible en todos los dispositivos).'
        );
      } else {
        showToast(
          res.savedLocally
            ? 'Cambios guardados en el sitio y en el servidor local.'
            : 'Cambios aplicados y guardados en este navegador.'
        );
      }
    }
  };

  // Exportar respaldo JSON
  const handleExportJson = () => {
    const payload = {
      packages: draftPackages,
      carouselItems: draftCarousel,
      projectGalleries: draftGalleries,
      films: draftFilms,
      clientGalleries: draftClients,
      faqs: draftFaqs,
      testimonials: draftTestimonials,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dphotography-cms-backup-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Archivo de respaldo JSON descargado.');
  };

  // Importar respaldo JSON
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (Array.isArray(parsed.packages)) setDraftPackages(parsed.packages);
        if (Array.isArray(parsed.carouselItems))
          setDraftCarousel(parsed.carouselItems);
        if (Array.isArray(parsed.projectGalleries))
          setDraftGalleries(parsed.projectGalleries);
        if (Array.isArray(parsed.films)) setDraftFilms(parsed.films);
        if (Array.isArray(parsed.clientGalleries))
          setDraftClients(parsed.clientGalleries);
        if (Array.isArray(parsed.faqs)) setDraftFaqs(parsed.faqs);
        if (Array.isArray(parsed.testimonials))
          setDraftTestimonials(parsed.testimonials);
        await updateCmsData(parsed);
        showToast('Respaldo JSON importado y aplicado con éxito.');
      } catch {
        showToast('Error: El archivo JSON no tiene un formato válido.');
      }
    };
    reader.readAsText(file);
  };

  // Subir imagen desde dispositivo directo a Supabase Storage (optimizada en canvas)
  const handleLocalImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onResult: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    showToast('Optimizando y subiendo fotografía a Supabase Cloud...');
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1920;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h);
          canvas.toBlob(
            async (blob) => {
              if (blob) {
                const baseName = file.name.replace(/\.[^/.]+$/, '') || 'foto';
                const optimizedFile = new File([blob], `${baseName}.jpg`, {
                  type: 'image/jpeg',
                });
                const upRes = await uploadMediaFiles([optimizedFile]);
                if (upRes.ok && upRes.uploadedUrls?.[0]) {
                  onResult(upRes.uploadedUrls[0]);
                  showToast('Fotografía subida a Supabase Cloud correctamente.');
                  return;
                }
              }
              const compressed = canvas.toDataURL('image/jpeg', 0.86);
              onResult(compressed);
              showToast('Fotografía cargada y optimizada.');
            },
            'image/jpeg',
            0.88
          );
        }
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!unlocked) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-black/90 border border-[#d4af37]/35 p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-[0.26em] uppercase text-[#d4af37] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              ACCESO ADMINISTRATIVO PRIVADO
            </span>
            <h1 className="font-monument text-2xl text-white uppercase">
              Panel de Control DPS
            </h1>
            <p className="text-xs text-white/60">
              Ingresa la contraseña maestra del estudio para editar precios,
              galerías y películas.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const clean = pinInput.trim();
              if (
                clean === 'DPS2026!' ||
                clean.toUpperCase() === 'DPS2026!' ||
                clean.toUpperCase() === 'DPS2026'
              ) {
                setUnlocked(true);
                setPinError(false);
                try {
                  sessionStorage.setItem('dps_admin_unlocked', 'true');
                } catch {
                  // ignore
                }
              } else {
                setPinError(true);
              }
            }}
            className="space-y-4"
          >
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              placeholder="Contraseña de Administrador..."
              className="w-full px-4 py-3.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
            />
            {pinError && (
              <p className="text-xs text-red-400">
                Contraseña incorrecta. Verifica tus credenciales de administrador.
              </p>
            )}
            <button type="submit" className="cursor-pointer btn-gold w-full py-3.5 text-xs">
              Desbloquear Panel de Administración
            </button>
          </form>
        </div>
      </div>
    );
  }

  const currentPkg = draftPackages[selectedPkgIndex] || draftPackages[0];
  const currentGallery =
    draftGalleries[selectedGalleryIndex] || draftGalleries[0];
  const currentFilm = draftFilms[selectedFilmIndex] || draftFilms[0];
  const currentClient = draftClients[selectedClientIndex] || draftClients[0];

  const updateCurrentPackage = (updater: (pkg: PackageTier) => PackageTier) => {
    setDraftPackages((prev) =>
      prev.map((item, i) => (i === selectedPkgIndex ? updater(item) : item))
    );
  };

  const updateCurrentGallery = (
    updater: (gal: ProjectGallery) => ProjectGallery
  ) => {
    setDraftGalleries((prev) =>
      prev.map((item, i) => (i === selectedGalleryIndex ? updater(item) : item))
    );
  };

  const updateCurrentFilm = (
    updater: (film: FilmProduction) => FilmProduction
  ) => {
    setDraftFilms((prev) =>
      prev.map((item, i) => (i === selectedFilmIndex ? updater(item) : item))
    );
  };

  const updateCurrentClient = (
    updater: (client: ClientGalleryItem) => ClientGalleryItem
  ) => {
    setDraftClients((prev) =>
      prev.map((item, i) => (i === selectedClientIndex ? updater(item) : item))
    );
  };

  return (
    <div className="pt-28 pb-24 px-4 sm:px-8 min-h-screen relative z-10">
      <div className="max-w-[1440px] mx-auto space-y-8">
        {/* =================================================================
            CABECERA FIJA DEL PANEL DE ADMINISTRACIÓN
        ================================================================= */}
        <div className="bg-black/80 backdrop-blur-xl border border-white/15 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase text-[#d4af37]">
                ESTUDIO CMS • PANEL DE ADMINISTRACIÓN
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#f3dc8a]">
                EN VIVO
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                {supabaseConnected ? 'SUPABASE CLOUD CONECTADO' : 'SUPABASE CLOUD LISTO'}
              </span>
            </div>
            <h1 className="font-monument text-2xl sm:text-3xl text-white uppercase">
              Editor de Precios, Galerías y Cine
            </h1>
            <p className="text-xs sm:text-sm text-white/65">
              Edita planes de precios, entregables, el carrusel interactivo WebGL,
              galerías de portafolio, películas y accesos de clientes.
            </p>
          </div>

          {/* Botonera de Acciones */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleSaveAll(false)}
              disabled={saving}
              className="cursor-pointer btn-gold px-5 py-3 text-xs flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCloudModal(true)}
              className="cursor-pointer px-4 py-3 bg-[#11131a] border border-[#d4af37]/50 hover:border-[#d4af37] text-[#f3dc8a] text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-colors"
            >
              <CloudUpload className="w-4 h-4" />
              <span>Publicar en Vercel / GitHub</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              title="Descargar copia de seguridad JSON"
              className="cursor-pointer px-3.5 py-3 bg-black/70 border border-white/15 hover:border-white/40 text-white/80 text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">Exportar</span>
            </button>

            <label
              title="Importar respaldo JSON"
              className="cursor-pointer px-3.5 py-3 bg-black/70 border border-white/15 hover:border-white/40 text-white/80 text-xs flex items-center gap-1.5"
            >
              <Upload className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden sm:inline">Importar</span>
              <input
                type="file"
                accept="application/json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={async () => {
                if (
                  window.confirm(
                    '¿Deseas restaurar todos los precios, galerías y películas a los valores originales de fábrica?'
                  )
                ) {
                  await resetCmsToDefaults();
                  showToast('Datos restaurados a los valores originales.');
                }
              }}
              title="Restaurar valores de fábrica"
              className="cursor-pointer px-3.5 py-3 bg-black/70 border border-red-500/30 hover:border-red-500 text-red-300 text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden xl:inline">Restaurar</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setUnlocked(false);
                setPinInput('');
                try {
                  sessionStorage.removeItem('dps_admin_unlocked');
                } catch {
                  // ignore
                }
              }}
              title="Bloquear Panel"
              className="cursor-pointer px-3.5 py-3 bg-black/70 border border-white/15 hover:border-[#d4af37] text-white/80 hover:text-[#f3dc8a] text-xs flex items-center gap-1.5"
            >
              <Lock className="w-4 h-4 text-[#d4af37]" />
              <span className="hidden xl:inline">Bloquear</span>
            </button>
          </div>
        </div>

        {/* Aviso de confirmación */}
        {statusMessage && (
          <div className="bg-[#d4af37]/15 border border-[#d4af37] px-5 py-3.5 flex items-center justify-between text-xs text-[#f3dc8a]">
            <div className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{statusMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* =================================================================
            PESTAÑAS DE MÓDULOS DEL CMS
        ================================================================= */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-white/15 bg-black/70">
          {[
            {
              id: 'packages' as AdminTab,
              label: 'Planes y Precios',
              count: draftPackages.length,
              icon: DollarSign,
            },
            {
              id: 'carousel' as AdminTab,
              label: 'Carrusel Inicio',
              count: draftCarousel.length,
              icon: Layers,
            },
            {
              id: 'galleries' as AdminTab,
              label: 'Galerías Foto',
              count: draftGalleries.length,
              icon: Camera,
            },
            {
              id: 'films' as AdminTab,
              label: 'Películas y Cine',
              count: draftFilms.length,
              icon: Film,
            },
            {
              id: 'clients' as AdminTab,
              label: 'Portal Clientes',
              count: draftClients.length,
              icon: KeyRound,
            },
            {
              id: 'faq-testimonials' as AdminTab,
              label: 'FAQ y Reseñas',
              count: draftFaqs.length + draftTestimonials.length,
              icon: HelpCircle,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`cursor-pointer p-4 border-r border-b border-white/15 text-left transition-colors flex flex-col justify-between gap-2 ${
                  active
                    ? 'bg-[#d4af37]/18 text-[#f3dc8a] border-b-2 border-b-[#d4af37]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <Icon className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white/10 text-white/80">
                    {tab.count}
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.14em] font-semibold">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* =================================================================
            MÓDULO 1: PLANES DE PRECIOS Y PAQUETES
        ================================================================= */}
        {activeTab === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lista lateral de paquetes */}
            <div className="lg:col-span-4 bg-black/75 border border-white/15 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                  COLECCIONES ({draftPackages.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newPkg: PackageTier = {
                      id: `pkg-${Date.now()}`,
                      categorySlug: 'wedding-photo',
                      categoryName: {
                        en: 'Fotografía de Bodas',
                        es: 'Fotografía de Bodas',
                      },
                      tierName: {
                        en: 'Nueva Colección Exclusiva',
                        es: 'Nueva Colección Exclusiva',
                      },
                      tagline: {
                        en: 'Descripción breve del paquete y su enfoque artístico',
                        es: 'Descripción breve del paquete y su enfoque artístico',
                      },
                      startingPrice: '$1,900',
                      durationLabel: {
                        en: '6 Horas de Cobertura',
                        es: '6 Horas de Cobertura',
                      },
                      popular: false,
                      deliverables: {
                        en: [
                          'Cobertura Fotográfica Profesional en Alta Resolución',
                          'Galería Privada en Pixieset con Descarga Directa',
                        ],
                        es: [
                          'Cobertura Fotográfica Profesional en Alta Resolución',
                          'Galería Privada en Pixieset con Descarga Directa',
                        ],
                      },
                      optionalExtras: {
                        en: ['Hora Adicional ($250/hr)'],
                        es: ['Hora Adicional ($250/hr)'],
                      },
                    };
                    setDraftPackages((prev) => [...prev, newPkg]);
                    setSelectedPkgIndex(draftPackages.length);
                    showToast('Nuevo paquete creado. Edita sus detalles a la derecha.');
                  }}
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Plan</span>
                </button>
              </div>

              <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
                {draftPackages.map((pkg, idx) => {
                  const selected = idx === selectedPkgIndex;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPkgIndex(idx)}
                      className={`cursor-pointer p-3.5 border transition-colors flex items-center justify-between gap-3 ${
                        selected
                          ? 'bg-[#d4af37]/15 border-[#d4af37] text-white'
                          : 'bg-black/50 border-white/10 text-white/75 hover:border-white/30'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37]">
                            {pkg.categoryName.es}
                          </span>
                          {pkg.popular && (
                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#d4af37] text-black font-bold">
                              DESTACADO
                            </span>
                          )}
                        </div>
                        <p className="font-monument text-xs text-white truncate mt-1">
                          {pkg.tierName.es}
                        </p>
                      </div>
                      <span className="font-monument text-sm text-[#f3dc8a] shrink-0">
                        {pkg.startingPrice}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editor detallado del paquete */}
            {currentPkg && (
              <div className="lg:col-span-8 bg-black/75 border border-white/15 p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37]">
                      EDITANDO PAQUETE #{selectedPkgIndex + 1}
                    </span>
                    <h2 className="font-monument text-xl text-white mt-0.5">
                      {currentPkg.tierName.es}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/packages"
                      target="_blank"
                      className="px-3.5 py-2 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-white/80 hover:text-white flex items-center gap-1.5"
                    >
                      <span>Ver en Web</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    {draftPackages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `¿Eliminar el paquete "${currentPkg.tierName.es}"?`
                            )
                          ) {
                            setDraftPackages((prev) =>
                              prev.filter((_, i) => i !== selectedPkgIndex)
                            );
                            setSelectedPkgIndex(0);
                          }
                        }}
                        className="cursor-pointer px-3.5 py-2 border border-red-500/40 text-red-300 hover:bg-red-500/10 text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Campos Principales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Nombre del Plan / Colección
                    </label>
                    <input
                      type="text"
                      value={currentPkg.tierName.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentPackage((p) => ({
                          ...p,
                          tierName: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-3 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Categoría de Servicio
                    </label>
                    <select
                      value={currentPkg.categorySlug}
                      onChange={(e) => {
                        const slug = e.target
                          .value as PackageTier['categorySlug'];
                        const found = PACKAGE_CATEGORIES.find(
                          (c) => c.slug === slug
                        );
                        const label =
                          found?.label || currentPkg.categoryName.es;
                        updateCurrentPackage((p) => ({
                          ...p,
                          categorySlug: slug,
                          categoryName: { es: label, en: label },
                        }));
                      }}
                      className="w-full px-4 py-3 bg-[#0b0c10] border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      {PACKAGE_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Etiqueta Visible de Categoría
                    </label>
                    <input
                      type="text"
                      value={currentPkg.categoryName.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentPackage((p) => ({
                          ...p,
                          categoryName: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-3 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Precio Inicial (ej. $2,800)
                    </label>
                    <input
                      type="text"
                      value={currentPkg.startingPrice}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentPackage((p) => ({
                          ...p,
                          startingPrice: val,
                        }));
                      }}
                      className="w-full px-4 py-3 bg-black border border-[#d4af37]/50 text-[#f3dc8a] font-monument text-base focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Duración / Cobertura (ej. 8 a 10 Horas)
                    </label>
                    <input
                      type="text"
                      value={currentPkg.durationLabel.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentPackage((p) => ({
                          ...p,
                          durationLabel: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-3 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Subtítulo Editorial / Descripción Corta
                    </label>
                    <input
                      type="text"
                      value={currentPkg.tagline.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentPackage((p) => ({
                          ...p,
                          tagline: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-3 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 pt-1">
                    <label className="cursor-pointer inline-flex items-center gap-3 p-3.5 border border-white/15 bg-white/[0.02]">
                      <input
                        type="checkbox"
                        checked={Boolean(currentPkg.popular)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateCurrentPackage((p) => ({
                            ...p,
                            popular: checked,
                          }));
                        }}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-xs text-white font-medium">
                        Marcar como <strong>MÁS SOLICITADO</strong> y mostrar en la
                        Página de Inicio
                      </span>
                    </label>
                  </div>
                </div>

                {/* Lista de Entregables Incluidos */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                      QUÉ INCLUYE ESTA COLECCIÓN (ENTREGABLES)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentPackage((p) => {
                          const next = [
                            ...p.deliverables.es,
                            'Nuevo entregable incluido en la colección',
                          ];
                          return {
                            ...p,
                            deliverables: { es: next, en: next },
                          };
                        });
                      }}
                      className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-[10px] font-mono uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Entregable</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentPkg.deliverables.es.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#d4af37] w-6">
                          0{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCurrentPackage((p) => {
                              const next = p.deliverables.es.map((d, i) =>
                                i === idx ? val : d
                              );
                              return {
                                ...p,
                                deliverables: { es: next, en: next },
                              };
                            });
                          }}
                          className="flex-1 px-3.5 py-2.5 bg-black border border-white/15 text-xs sm:text-sm text-white focus:border-[#d4af37] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateCurrentPackage((p) => {
                              const next = p.deliverables.es.filter(
                                (_, i) => i !== idx
                              );
                              return {
                                ...p,
                                deliverables: { es: next, en: next },
                              };
                            });
                          }}
                          className="cursor-pointer p-2.5 border border-white/10 hover:border-red-500/50 text-white/50 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lista de Extras Opcionales */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                      EXTRAS OPCIONALES DISPONIBLES
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateCurrentPackage((p) => {
                          const next = [
                            ...p.optionalExtras.es,
                            'Nuevo Extra Opcional',
                          ];
                          return {
                            ...p,
                            optionalExtras: { es: next, en: next },
                          };
                        });
                      }}
                      className="cursor-pointer px-3 py-1.5 bg-white/10 hover:bg-[#d4af37] hover:text-black text-white text-[10px] font-mono uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Añadir Extra</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {currentPkg.optionalExtras.es.map((extra, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-white/40 w-6">
                          +{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={extra}
                          onChange={(e) => {
                            const val = e.target.value;
                            updateCurrentPackage((p) => {
                              const next = p.optionalExtras.es.map((d, i) =>
                                i === idx ? val : d
                              );
                              return {
                                ...p,
                                optionalExtras: { es: next, en: next },
                              };
                            });
                          }}
                          className="flex-1 px-3.5 py-2 bg-black border border-white/15 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateCurrentPackage((p) => {
                              const next = p.optionalExtras.es.filter(
                                (_, i) => i !== idx
                              );
                              return {
                                ...p,
                                optionalExtras: { es: next, en: next },
                              };
                            });
                          }}
                          className="cursor-pointer p-2 border border-white/10 hover:border-red-500/50 text-white/50 hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            MÓDULO 2: CARRUSEL INTERACTIVO PRINCIPAL (WEBGL LIQUID GLASS)
        ================================================================= */}
        {activeTab === 'carousel' && (
          <div className="bg-black/75 border border-white/15 p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d4af37]">
                  GALERÍA PRINCIPAL DE INICIO • LIQUID GLASS CAROUSEL
                </span>
                <h2 className="font-monument text-xl text-white mt-1">
                  Fotografías del Carrusel Interactivo ({draftCarousel.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDraftCarousel((prev) => [
                    ...prev,
                    {
                      title: 'Nueva Obra Editorial',
                      src: '/fotos/boda-47.jpg',
                      aspect: 0.75,
                    },
                  ]);
                }}
                className="cursor-pointer btn-gold px-4 py-2.5 text-xs flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Añadir Fotografía al Carrusel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {draftCarousel.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-black border border-white/15 p-4 flex flex-col justify-between gap-4"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[3/4] bg-[#090a0f] border border-white/10 overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/85 border border-white/15 text-[10px] font-mono text-[#f3dc8a]">
                        SLIDE #{idx + 1}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                        Título al pie de la foto
                      </label>
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftCarousel((prev) =>
                            prev.map((c, i) =>
                              i === idx ? { ...c, title: val } : c
                            )
                          );
                        }}
                        className="w-full px-3 py-2 bg-[#08090d] border border-white/15 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-white/50 block">
                        Ruta o URL de Imagen
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={item.src}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDraftCarousel((prev) =>
                              prev.map((c, i) =>
                                i === idx ? { ...c, src: val } : c
                              )
                            );
                          }}
                          className="flex-1 min-w-0 px-2.5 py-2 bg-[#08090d] border border-white/15 text-[11px] font-mono text-white/80 focus:border-[#d4af37] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setMediaPickerCallback(() => (url: string) => {
                              setDraftCarousel((prev) =>
                                prev.map((c, i) =>
                                  i === idx ? { ...c, src: url } : c
                                )
                              );
                            })
                          }
                          className="cursor-pointer px-2.5 py-2 bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#f3dc8a] text-[10px] font-mono uppercase shrink-0"
                        >
                          Elegir
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          setDraftCarousel((prev) => {
                            const copy = [...prev];
                            const temp = copy[idx - 1];
                            copy[idx - 1] = copy[idx];
                            copy[idx] = temp;
                            return copy;
                          });
                        }}
                        className="cursor-pointer p-1.5 border border-white/15 text-white/70 disabled:opacity-30"
                        title="Mover antes"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === draftCarousel.length - 1}
                        onClick={() => {
                          setDraftCarousel((prev) => {
                            const copy = [...prev];
                            const temp = copy[idx + 1];
                            copy[idx + 1] = copy[idx];
                            copy[idx] = temp;
                            return copy;
                          });
                        }}
                        className="cursor-pointer p-1.5 border border-white/15 text-white/70 disabled:opacity-30"
                        title="Mover después"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {draftCarousel.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setDraftCarousel((prev) =>
                            prev.filter((_, i) => i !== idx)
                          );
                        }}
                        className="cursor-pointer px-2.5 py-1 border border-red-500/30 text-red-300 text-[10px] font-mono uppercase flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Quitar</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =================================================================
            MÓDULO 3: GALERÍAS DE PORTAFOLIO FOTOGRÁFICO (/photography)
        ================================================================= */}
        {activeTab === 'galleries' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Lista de Galerías */}
            <div className="lg:col-span-4 bg-black/75 border border-white/15 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                  GALERÍAS ({draftGalleries.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newGal: ProjectGallery = {
                      id: `gallery-${Date.now()}`,
                      categorySlug: 'weddings',
                      categoryLabel: {
                        en: 'Historia de Boda',
                        es: 'Historia de Boda',
                      },
                      title: {
                        en: 'Nueva Historia Visual',
                        es: 'Nueva Historia Visual',
                      },
                      subtitle: {
                        en: 'Subtítulo Editorial de la Sesión o Evento',
                        es: 'Subtítulo Editorial de la Sesión o Evento',
                      },
                      venue: 'Estudio Principal DPhotography',
                      location: 'Louisville, KY',
                      date: '2026',
                      photoCount: 25,
                      coverImage: '/fotos/boda-47.jpg',
                      story: {
                        en: 'Describe la historia, iluminación y atmósfera de esta producción.',
                        es: 'Describe la historia, iluminación y atmósfera de esta producción.',
                      },
                      gearUsed: 'Sony Alpha Cinema • Sigma Art',
                      images: [
                        {
                          url: '/fotos/boda-47.jpg',
                          caption: {
                            en: 'Fotografía Principal',
                            es: 'Fotografía Principal',
                          },
                          aspect: 'portrait',
                        },
                      ],
                    };
                    setDraftGalleries((prev) => [...prev, newGal]);
                    setSelectedGalleryIndex(draftGalleries.length);
                    showToast('Nueva galería creada.');
                  }}
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nueva Galería</span>
                </button>
              </div>

              <div className="space-y-2">
                {draftGalleries.map((gal, idx) => {
                  const selected = idx === selectedGalleryIndex;
                  return (
                    <div
                      key={gal.id}
                      onClick={() => setSelectedGalleryIndex(idx)}
                      className={`cursor-pointer p-3 border transition-colors flex items-center gap-3 ${
                        selected
                          ? 'bg-[#d4af37]/15 border-[#d4af37]'
                          : 'bg-black/50 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={gal.coverImage}
                        alt={gal.title.es}
                        className="w-12 h-14 object-cover object-top border border-white/15 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37] block">
                          {gal.categoryLabel.es}
                        </span>
                        <p className="font-monument text-xs text-white truncate">
                          {gal.title.es}
                        </p>
                        <span className="text-[10px] text-white/50">
                          {gal.images.length} fotos en retícula
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Editor de Galería Seleccionada */}
            {currentGallery && (
              <div className="lg:col-span-8 bg-black/75 border border-white/15 p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37]">
                      EDITANDO GALERÍA DE PORTAFOLIO
                    </span>
                    <h2 className="font-monument text-xl text-white mt-0.5">
                      {currentGallery.title.es}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/photography"
                      target="_blank"
                      className="px-3.5 py-2 border border-white/15 text-[11px] font-mono uppercase tracking-widest text-white/80 hover:text-white flex items-center gap-1.5"
                    >
                      <span>Ver en Portafolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    {draftGalleries.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            window.confirm(
                              `¿Eliminar la galería "${currentGallery.title.es}"?`
                            )
                          ) {
                            setDraftGalleries((prev) =>
                              prev.filter((_, i) => i !== selectedGalleryIndex)
                            );
                            setSelectedGalleryIndex(0);
                          }
                        }}
                        className="cursor-pointer px-3.5 py-2 border border-red-500/40 text-red-300 text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Eliminar</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Título de la Galería
                    </label>
                    <input
                      type="text"
                      value={currentGallery.title.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({
                          ...g,
                          title: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={currentGallery.subtitle.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({
                          ...g,
                          subtitle: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Categoría
                    </label>
                    <select
                      value={currentGallery.categorySlug}
                      onChange={(e) => {
                        const slug = e.target.value;
                        const found = GALLERY_CATEGORIES.find(
                          (c) => c.slug === slug
                        );
                        const label =
                          found?.label || currentGallery.categoryLabel.es;
                        updateCurrentGallery((g) => ({
                          ...g,
                          categorySlug: slug,
                          categoryLabel: { es: label, en: label },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      {GALLERY_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Salón / Locación
                    </label>
                    <input
                      type="text"
                      value={currentGallery.venue}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({ ...g, venue: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={currentGallery.location}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({ ...g, location: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Fecha / Año
                    </label>
                    <input
                      type="text"
                      value={currentGallery.date}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({ ...g, date: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Historia / Narrativa de la Sesión
                    </label>
                    <textarea
                      rows={3}
                      value={currentGallery.story.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentGallery((g) => ({
                          ...g,
                          story: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Fotografías de la Galería */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                      FOTOGRAFÍAS DENTRO DE ESTA GALERÍA ({currentGallery.images.length})
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setMediaPickerCallback(() => (url: string) => {
                          updateCurrentGallery((g) => ({
                            ...g,
                            images: [
                              ...g.images,
                              {
                                url,
                                caption: {
                                  es: g.title.es,
                                  en: g.title.es,
                                },
                                aspect: 'portrait',
                              },
                            ],
                          }));
                        })
                      }
                      className="cursor-pointer btn-gold px-4 py-2 text-[10px] flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agregar Foto a la Galería</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentGallery.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="bg-black border border-white/15 p-3 flex gap-3 items-start"
                      >
                        <img
                          src={img.url}
                          alt={img.caption.es}
                          className="w-20 h-24 object-cover object-top border border-white/10 shrink-0"
                        />
                        <div className="flex-1 min-w-0 space-y-2">
                          <input
                            type="text"
                            value={img.caption.es}
                            onChange={(e) => {
                              const val = e.target.value;
                              updateCurrentGallery((g) => ({
                                ...g,
                                images: g.images.map((im, i) =>
                                  i === idx
                                    ? { ...im, caption: { es: val, en: val } }
                                    : im
                                ),
                              }));
                            }}
                            placeholder="Pie de foto..."
                            className="w-full px-2.5 py-1.5 bg-[#090a0f] border border-white/15 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                          />
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                setMediaPickerCallback(() => (url: string) => {
                                  updateCurrentGallery((g) => ({
                                    ...g,
                                    coverImage: idx === 0 ? url : g.coverImage,
                                    images: g.images.map((im, i) =>
                                      i === idx ? { ...im, url } : im
                                    ),
                                  }));
                                })
                              }
                              className="cursor-pointer px-2.5 py-1 bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f3dc8a] text-[10px] font-mono uppercase"
                            >
                              Cambiar Foto
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                updateCurrentGallery((g) => ({
                                  ...g,
                                  images: g.images.filter((_, i) => i !== idx),
                                }));
                              }}
                              className="cursor-pointer p-1 border border-red-500/30 text-red-300"
                              title="Eliminar foto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            MÓDULO 4: PRODUCCIONES DE CINE Y VIDEOS (/films)
        ================================================================= */}
        {activeTab === 'films' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-black/75 border border-white/15 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                  PELÍCULAS ({draftFilms.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newFilm: FilmProduction = {
                      id: `film-${Date.now()}`,
                      categorySlug: 'wedding-films',
                      categoryLabel: {
                        en: 'Tráiler Cinematográfico de Boda',
                        es: 'Tráiler Cinematográfico de Boda',
                      },
                      division: 'DPhotography Studios & Films',
                      title: {
                        en: 'NUEVA PRODUCCIÓN CINEMATOGRÁFICA',
                        es: 'NUEVA PRODUCCIÓN CINEMATOGRÁFICA',
                      },
                      subtitle: {
                        en: '4K Anamórfico • Louisville, KY',
                        es: '4K Anamórfico • Louisville, KY',
                      },
                      description: {
                        en: 'Descripción de la producción cinematográfica, cámaras e iluminación.',
                        es: 'Descripción de la producción cinematográfica, cámaras e iluminación.',
                      },
                      duration: '03:30',
                      format: '4K Cine RAW • 24fps',
                      year: '2026',
                      location: 'Louisville, KY',
                      thumbnail: '/brand/creator-directors-chair-cinema-rig.jpg',
                      videoPreviewUrl:
                        'https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-walking-in-a-forest-42428-large.mp4',
                      featuredOnHome: true,
                      credits: {
                        director: 'DPhotography Studios',
                        cinematographer: 'Unidad de Cine DPhotography',
                        editor: 'Suite de Color DPhotography',
                        productionCompany: 'DPhotography Studios & Films',
                      },
                    };
                    setDraftFilms((prev) => [...prev, newFilm]);
                    setSelectedFilmIndex(draftFilms.length);
                    showToast('Nueva película añadida.');
                  }}
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nueva Película</span>
                </button>
              </div>

              <div className="space-y-2">
                {draftFilms.map((film, idx) => {
                  const selected = idx === selectedFilmIndex;
                  return (
                    <div
                      key={film.id}
                      onClick={() => setSelectedFilmIndex(idx)}
                      className={`cursor-pointer p-3 border transition-colors flex items-center gap-3 ${
                        selected
                          ? 'bg-[#d4af37]/15 border-[#d4af37]'
                          : 'bg-black/50 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img
                        src={film.thumbnail}
                        alt={film.title.es}
                        className="w-16 h-11 object-cover border border-white/15 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37] block">
                          {film.division}
                        </span>
                        <p className="font-monument text-xs text-white truncate">
                          {film.title.es}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {currentFilm && (
              <div className="lg:col-span-8 bg-black/75 border border-white/15 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37]">
                      EDITANDO PRODUCCIÓN DE CINE
                    </span>
                    <h2 className="font-monument text-xl text-white mt-0.5">
                      {currentFilm.title.es}
                    </h2>
                  </div>
                  {draftFilms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDraftFilms((prev) =>
                          prev.filter((_, i) => i !== selectedFilmIndex)
                        );
                        setSelectedFilmIndex(0);
                      }}
                      className="cursor-pointer px-3.5 py-2 border border-red-500/40 text-red-300 text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Título de la Película
                    </label>
                    <input
                      type="text"
                      value={currentFilm.title.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({
                          ...f,
                          title: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Subtítulo
                    </label>
                    <input
                      type="text"
                      value={currentFilm.subtitle.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({
                          ...f,
                          subtitle: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      División Productora
                    </label>
                    <select
                      value={currentFilm.division}
                      onChange={(e) => {
                        const val = e.target
                          .value as FilmProduction['division'];
                        updateCurrentFilm((f) => ({ ...f, division: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="DPhotography Studios & Films">
                        DPhotography Studios & Films
                      </option>
                      <option value="DMedia Records">DMedia Records</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Categoría de Cine
                    </label>
                    <select
                      value={currentFilm.categorySlug}
                      onChange={(e) => {
                        const slug = e.target
                          .value as FilmProduction['categorySlug'];
                        const found = FILM_CATEGORIES.find(
                          (c) => c.slug === slug
                        );
                        const label =
                          found?.label || currentFilm.categoryLabel.es;
                        updateCurrentFilm((f) => ({
                          ...f,
                          categorySlug: slug,
                          categoryLabel: { es: label, en: label },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-[#0b0c10] border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      {FILM_CATEGORIES.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Duración (ej. 03:42)
                    </label>
                    <input
                      type="text"
                      value={currentFilm.duration}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({ ...f, duration: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Formato (ej. 4K Cine RAW • 24fps)
                    </label>
                    <input
                      type="text"
                      value={currentFilm.format}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({ ...f, format: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      URL del Video (MP4 directo)
                    </label>
                    <input
                      type="text"
                      value={currentFilm.videoPreviewUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({
                          ...f,
                          videoPreviewUrl: val,
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Miniatura / Portada del Video
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentFilm.thumbnail}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentFilm((f) => ({ ...f, thumbnail: val }));
                        }}
                        className="flex-1 px-4 py-2.5 bg-black border border-white/20 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setMediaPickerCallback(() => (url: string) => {
                            updateCurrentFilm((f) => ({
                              ...f,
                              thumbnail: url,
                            }));
                          })
                        }
                        className="cursor-pointer px-4 py-2.5 bg-[#d4af37]/20 border border-[#d4af37] text-[#f3dc8a] text-xs font-mono uppercase"
                      >
                        Elegir Foto
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Sinopsis / Descripción
                    </label>
                    <textarea
                      rows={3}
                      value={currentFilm.description.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentFilm((f) => ({
                          ...f,
                          description: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="cursor-pointer inline-flex items-center gap-3 p-3.5 border border-white/15 bg-white/[0.02]">
                      <input
                        type="checkbox"
                        checked={Boolean(currentFilm.featuredOnHome)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateCurrentFilm((f) => ({
                            ...f,
                            featuredOnHome: checked,
                          }));
                        }}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-xs text-white font-medium">
                        Destacar esta película en la Página de Inicio
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            MÓDULO 5: GALERÍAS PRIVADAS DE CLIENTES (PIXIESET)
        ================================================================= */}
        {activeTab === 'clients' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4 bg-black/75 border border-white/15 p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#f3dc8a]">
                  CLIENTES PIXIESET ({draftClients.length})
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const newClient: ClientGalleryItem = {
                      id: `client-${Date.now()}`,
                      code: 'CLIENTE2026',
                      clientNames: 'Nuevo Cliente — Colección Privada',
                      eventType: {
                        en: 'Colección de Boda / XV',
                        es: 'Colección de Boda / XV',
                      },
                      date: 'Oct 2026',
                      venue: 'Louisville, KY',
                      photoCount: 350,
                      coverImage: '/fotos/boda-47.jpg',
                      isLocked: true,
                      pixiesetUrl: 'https://pixieset.com',
                      previewPhotos: ['/fotos/boda-47.jpg', '/fotos/boda-60.jpg'],
                    };
                    setDraftClients((prev) => [...prev, newClient]);
                    setSelectedClientIndex(draftClients.length);
                    showToast('Nueva galería de cliente creada.');
                  }}
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase tracking-widest font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nuevo Cliente</span>
                </button>
              </div>

              <div className="space-y-2">
                {draftClients.map((cl, idx) => {
                  const selected = idx === selectedClientIndex;
                  return (
                    <div
                      key={cl.id}
                      onClick={() => setSelectedClientIndex(idx)}
                      className={`cursor-pointer p-3.5 border transition-colors flex items-center justify-between gap-3 ${
                        selected
                          ? 'bg-[#d4af37]/15 border-[#d4af37]'
                          : 'bg-black/50 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-[#d4af37] block">
                          CÓDIGO: {cl.code}
                        </span>
                        <p className="font-monument text-xs text-white truncate mt-0.5">
                          {cl.clientNames}
                        </p>
                      </div>
                      <Lock
                        className={`w-4 h-4 shrink-0 ${
                          cl.isLocked ? 'text-[#d4af37]' : 'text-white/30'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {currentClient && (
              <div className="lg:col-span-8 bg-black/75 border border-white/15 p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37]">
                      PORTAL PRIVADO PIXIESET
                    </span>
                    <h2 className="font-monument text-xl text-white mt-0.5">
                      {currentClient.clientNames}
                    </h2>
                  </div>

                  {draftClients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDraftClients((prev) =>
                          prev.filter((_, i) => i !== selectedClientIndex)
                        );
                        setSelectedClientIndex(0);
                      }}
                      className="cursor-pointer px-3.5 py-2 border border-red-500/40 text-red-300 text-[11px] font-mono uppercase tracking-widest flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Nombre de los Clientes / Evento
                    </label>
                    <input
                      type="text"
                      value={currentClient.clientNames}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentClient((c) => ({
                          ...c,
                          clientNames: val,
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Código / Contraseña de Acceso
                    </label>
                    <input
                      type="text"
                      value={currentClient.code}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        updateCurrentClient((c) => ({ ...c, code: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-[#d4af37]/50 text-[#f3dc8a] font-mono text-sm uppercase focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Tipo de Evento
                    </label>
                    <input
                      type="text"
                      value={currentClient.eventType.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentClient((c) => ({
                          ...c,
                          eventType: { es: val, en: val },
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Fecha del Evento
                    </label>
                    <input
                      type="text"
                      value={currentClient.date}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentClient((c) => ({ ...c, date: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Salón y Ciudad
                    </label>
                    <input
                      type="text"
                      value={currentClient.venue}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentClient((c) => ({ ...c, venue: val }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Cantidad Total de Fotos
                    </label>
                    <input
                      type="number"
                      value={currentClient.photoCount}
                      onChange={(e) => {
                        const val = Number(e.target.value) || 0;
                        updateCurrentClient((c) => ({
                          ...c,
                          photoCount: val,
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Enlace Directo a la Galería en Pixieset
                    </label>
                    <input
                      type="text"
                      value={currentClient.pixiesetUrl}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateCurrentClient((c) => ({
                          ...c,
                          pixiesetUrl: val,
                        }));
                      }}
                      className="w-full px-4 py-2.5 bg-black border border-white/20 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                      Fotografía de Portada
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={currentClient.coverImage}
                        onChange={(e) => {
                          const val = e.target.value;
                          updateCurrentClient((c) => ({
                            ...c,
                            coverImage: val,
                          }));
                        }}
                        className="flex-1 px-4 py-2.5 bg-black border border-white/20 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setMediaPickerCallback(() => (url: string) => {
                            updateCurrentClient((c) => ({
                              ...c,
                              coverImage: url,
                            }));
                          })
                        }
                        className="cursor-pointer px-4 py-2.5 bg-[#d4af37]/20 border border-[#d4af37] text-[#f3dc8a] text-xs font-mono uppercase"
                      >
                        Elegir Portada
                      </button>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="cursor-pointer inline-flex items-center gap-3 p-3.5 border border-white/15 bg-white/[0.02]">
                      <input
                        type="checkbox"
                        checked={currentClient.isLocked}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          updateCurrentClient((c) => ({
                            ...c,
                            isLocked: checked,
                          }));
                        }}
                        className="w-4 h-4 accent-[#d4af37]"
                      />
                      <span className="text-xs text-white font-medium">
                        Requerir contraseña ({currentClient.code}) para ver y
                        descargar esta galería
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            MÓDULO 6: PREGUNTAS FRECUENTES Y TESTIMONIOS
        ================================================================= */}
        {activeTab === 'faq-testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Preguntas Frecuentes */}
            <div className="bg-black/75 border border-white/15 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="font-monument text-lg text-white">
                  Preguntas Frecuentes ({draftFaqs.length})
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setDraftFaqs((prev) => [
                      ...prev,
                      {
                        q: {
                          es: '¿Nueva pregunta frecuente?',
                          en: '¿Nueva pregunta frecuente?',
                        },
                        a: {
                          es: 'Respuesta detallada para el cliente.',
                          en: 'Respuesta detallada para el cliente.',
                        },
                      },
                    ])
                  }
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir FAQ</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftFaqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-black border border-white/15 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#d4af37]">
                        PREGUNTA #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDraftFaqs((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                        className="cursor-pointer text-red-300 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.q.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftFaqs((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, q: { es: val, en: val } } : f
                          )
                        );
                      }}
                      className="w-full px-3 py-2 bg-[#090a0f] border border-white/15 text-xs text-[#f3dc8a] font-semibold focus:border-[#d4af37] focus:outline-none"
                    />
                    <textarea
                      rows={3}
                      value={faq.a.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftFaqs((prev) =>
                          prev.map((f, i) =>
                            i === idx ? { ...f, a: { es: val, en: val } } : f
                          )
                        );
                      }}
                      className="w-full px-3 py-2 bg-[#090a0f] border border-white/15 text-xs text-white/85 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonios de Clientes */}
            <div className="bg-black/75 border border-white/15 p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h2 className="font-monument text-lg text-white">
                  Testimonios en Inicio ({draftTestimonials.length})
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setDraftTestimonials((prev) => [
                      ...prev,
                      {
                        id: `t-${Date.now()}`,
                        client: 'Nombre del Cliente',
                        role: {
                          es: 'Boda / Quinceañera en Louisville',
                          en: 'Boda / Quinceañera en Louisville',
                        },
                        quote: {
                          es: 'Testimonio del cliente sobre su experiencia con DPhotography Studios.',
                          en: 'Testimonio del cliente sobre su experiencia con DPhotography Studios.',
                        },
                        rating: 5,
                        image: '/fotos/boda-47.jpg',
                      },
                    ])
                  }
                  className="cursor-pointer px-3 py-1.5 bg-[#d4af37] text-black text-[10px] font-mono uppercase font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Añadir Reseña</span>
                </button>
              </div>

              <div className="space-y-4">
                {draftTestimonials.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 bg-black border border-white/15 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#d4af37]">
                        TESTIMONIO #{idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDraftTestimonials((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
                        }
                        className="cursor-pointer text-red-300 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={item.client}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftTestimonials((prev) =>
                            prev.map((t, i) =>
                              i === idx ? { ...t, client: val } : t
                            )
                          );
                        }}
                        placeholder="Cliente"
                        className="px-3 py-2 bg-[#090a0f] border border-white/15 text-xs text-white focus:border-[#d4af37] focus:outline-none"
                      />
                      <input
                        type="text"
                        value={item.role.es}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDraftTestimonials((prev) =>
                            prev.map((t, i) =>
                              i === idx
                                ? { ...t, role: { es: val, en: val } }
                                : t
                            )
                          );
                        }}
                        placeholder="Evento / Locación"
                        className="px-3 py-2 bg-[#090a0f] border border-white/15 text-xs text-[#f3dc8a] focus:border-[#d4af37] focus:outline-none"
                      />
                    </div>
                    <textarea
                      rows={3}
                      value={item.quote.es}
                      onChange={(e) => {
                        const val = e.target.value;
                        setDraftTestimonials((prev) =>
                          prev.map((t, i) =>
                            i === idx
                              ? { ...t, quote: { es: val, en: val } }
                              : t
                          )
                        );
                      }}
                      className="w-full px-3 py-2 bg-[#090a0f] border border-white/15 text-xs text-white/85 focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================
          MODAL SELECTOR VISUAL DE FOTOGRAFÍAS (MEDIA LIBRARY + SUBIDA LOCAL)
      =================================================================== */}
      {mediaPickerCallback && (
        <div
          className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-xl p-4 sm:p-8 flex items-center justify-center overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-5xl bg-[#07080c] border border-[#d4af37]/50 p-6 sm:p-8 space-y-6 max-h-[90vh] flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#d4af37] block">
                  BIBLIOTECA DE MEDIOS DEL ESTUDIO
                </span>
                <h3 className="font-monument text-xl text-white">
                  Selecciona una Fotografía o Sube una Nueva
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <label className="cursor-pointer btn-gold px-4 py-2.5 text-xs flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span>Subir Foto Desde Mi Equipo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleLocalImageUpload(e, (dataUrl) => {
                        mediaPickerCallback(dataUrl);
                        setMediaPickerCallback(null);
                      })
                    }
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setMediaPickerCallback(null)}
                  className="cursor-pointer p-2 border border-white/15 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 overflow-y-auto pr-1">
              {mediaLibrary.map((path) => (
                <button
                  key={path}
                  type="button"
                  onClick={() => {
                    mediaPickerCallback(path);
                    setMediaPickerCallback(null);
                  }}
                  className="cursor-pointer group relative aspect-[3/4] bg-black border border-white/15 hover:border-[#d4af37] overflow-hidden text-left"
                >
                  <img
                    src={path}
                    alt={path}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-2 bg-black/85 border-t border-white/10 text-[10px] font-mono text-white/80 truncate">
                    {path.replace('/fotos/', '').replace('/brand/', '')}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================
          MODAL PARA PUBLICAR CAMBIOS EN GITHUB / VERCEL
      =================================================================== */}
      {showCloudModal && (
        <div
          className="fixed inset-0 z-[95] bg-black/90 backdrop-blur-xl p-4 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg bg-[#07080c] border border-[#d4af37]/50 p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#d4af37] block">
                  SINCRONIZACIÓN EN LA NUBE
                </span>
                <h3 className="font-monument text-lg text-white">
                  Publicar Cambios en GitHub y Vercel
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCloudModal(false)}
                className="cursor-pointer p-1.5 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-white/75 leading-relaxed">
              Al publicar en la nube, tus cambios de precios, paquetes y galerías
              se guardan directamente en el repositorio{' '}
              <code className="text-[#f3dc8a]">
                dphotographywebsite-lab/dphotography-studios-web
              </code>{' '}
              y Vercel actualiza automáticamente la web pública para todos los
              visitantes.
            </p>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-widest text-[#f3dc8a] block">
                Token de Acceso GitHub (Personal Access Token)
              </label>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="ghp_..."
                className="w-full px-4 py-3 bg-black border border-white/20 text-white text-xs font-mono focus:border-[#d4af37] focus:outline-none"
              />
              <span className="text-[10px] text-white/45 block">
                Se guarda de forma segura únicamente en tu navegador local.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCloudModal(false)}
                className="cursor-pointer px-4 py-2.5 border border-white/15 text-xs text-white/75"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={() => handleSaveAll(true)}
                className="cursor-pointer btn-gold px-6 py-2.5 text-xs flex items-center gap-2"
              >
                <CloudUpload className="w-4 h-4" />
                <span>{saving ? 'Publicando...' : 'Confirmar y Publicar'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
