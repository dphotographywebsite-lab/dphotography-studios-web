'use client';

import React from 'react';
import Link from 'next/link';
import {
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Mail,
  Phone,
  Sparkles,
  Film,
  Camera,
  Lock,
  Disc,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="px-4 sm:px-8 pb-10 pt-10 relative z-10 border-t border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto text-[#d4d6df] relative">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/[0.08] relative z-10">
          {/* Brand Column (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-flex items-center">
              <img
                src="/brand/dps-logo-texture.png"
                alt="DPhotography Studios"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
              />
            </Link>

            <p className="text-sm text-[#a6aab8] leading-relaxed max-w-sm">
              Fundado y dirigido por{' '}
              <strong className="text-white font-medium">
                Daniel Anthony Jesús Cudina
              </strong>
              . Fotografía profesional y producción cinematográfica de alto
              impacto. Donde tus historias se convierten en películas y tus
              sueños se convierten en vida.
            </p>

            {/* DMedia Records Division Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-[#d4af37]/25 text-xs">
              <Disc className="w-4 h-4 text-[#d4af37]" />
              <span className="text-white/90">
                <strong className="text-[#f3dc8a]">DMedia Records</strong> —{' '}
                Videos Musicales y Artistas
              </span>
            </div>

            {/* Social Media (44x44pt ergonomic targets) */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4af37] hover:text-[#f3dc8a] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4af37] hover:text-[#f3dc8a] flex items-center justify-center transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#d4af37] hover:text-[#f3dc8a] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Photography Portfolio Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-monument text-xs tracking-[0.22em] text-[#f3dc8a] uppercase flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Fotografía</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a6aab8]">
              <li>
                <Link
                  href="/photography?category=weddings"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Bodas de Lujo
                </Link>
              </li>
              <li>
                <Link
                  href="/photography?category=quinceaneras"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Quinceañeras Reales
                </Link>
              </li>
              <li>
                <Link
                  href="/photography?category=portraits-editorial"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Retratos y Editorial
                </Link>
              </li>
              <li>
                <Link
                  href="/photography?category=maternity-family"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Maternidad y Familia
                </Link>
              </li>
              <li>
                <Link
                  href="/photography?category=graduation-corporate-events"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Graduaciones y Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Films & Cinema Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-monument text-xs tracking-[0.22em] text-[#f3dc8a] uppercase flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Películas y Producción</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-[#a6aab8]">
              <li>
                <Link
                  href="/films"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Películas y Tráilers de Boda 4K
                </Link>
              </li>
              <li>
                <Link
                  href="/films"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Películas de Quinceañera
                </Link>
              </li>
              <li>
                <Link
                  href="/films"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Videos Musicales (DMedia Records)
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  Paquetes y Colecciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Location & Direct Booking (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-monument text-xs tracking-[0.22em] text-[#f3dc8a] uppercase">
              Estudio y Reservas
            </h4>
            <ul className="space-y-3 text-xs text-[#a6aab8]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  Louisville, Kentucky
                  <br />
                  <span className="text-white/50">
                    Disponibles para viajar a todo EE. UU. e internacionalmente
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href="https://wa.me/17022739854"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  +1 (702) 273-9854 • WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a
                  href="mailto:booking@dphotographystudios.com"
                  className="hover:text-[#f3dc8a] transition-colors"
                >
                  booking@dphotographystudios.com
                </a>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/contact"
                className="btn-gold w-full py-3 px-4 rounded-full text-[11px] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Consultar Disponibilidad</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7c8091] relative z-10">
          <p>
            © {new Date().getFullYear()} DPhotography Studios & Films • DMedia
            Records. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span>Louisville, KY</span>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-[#f3dc8a] transition-colors"
            >
              Reservar
            </Link>
            <span>•</span>
            <Link
              href="/admin"
              className="hover:text-[#f3dc8a] transition-colors text-white/45"
            >
              Panel Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
