'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LiquidNavbar,
  NimbusIcons,
  LiquidNavItem,
} from '@/components/ui/liquid-glass-navbar';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems: (LiquidNavItem & { route: string })[] = [
    { route: '/', label: 'Inicio', icon: NimbusIcons.home, fx: 'glow' },
    {
      route: '/photography',
      label: 'Fotografía',
      icon: NimbusIcons.drop,
      fx: 'drop',
    },
    { route: '/films', label: 'Películas', icon: NimbusIcons.plane, fx: 'plane' },
    {
      route: '/packages',
      label: 'Paquetes',
      icon: NimbusIcons.globe,
      fx: 'spin',
    },
    { route: '/about', label: 'Estudio', icon: NimbusIcons.user, fx: 'wave' },
    { route: '/contact', label: 'Contacto', fx: 'pop' },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) =>
      item.route === '/' ? pathname === '/' : pathname.startsWith(item.route)
    )
  );

  const hideLogoOnMobileHero = pathname === '/' && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled || mobileOpen
          ? 'bg-[#050508]/85 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href="/"
          className={`group flex items-center focus:outline-none transition-opacity duration-300 ${
            hideLogoOnMobileHero
              ? 'opacity-0 pointer-events-none sm:opacity-100 sm:pointer-events-auto'
              : 'opacity-100'
          }`}
        >
          <img
            src="/brand/dps-logo-texture.png"
            alt="DPhotography Studios"
            className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        {/* Desktop Liquid Glass Waterline Navigation */}
        <div className="hidden xl:flex items-center">
          <LiquidNavbar
            tone="dark"
            active={activeIndex}
            sound={true}
            items={navItems}
            onChange={(idx) => {
              const target = navItems[idx];
              if (target) router.push(target.route);
            }}
          />
        </div>

        {/* Single Clean Action on Desktop */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/contact"
            className="px-6 py-2.5 border border-[#d4af37]/60 hover:bg-[#d4af37] hover:text-[#050508] text-[11px] tracking-[0.22em] uppercase text-[#f3dc8a] font-semibold transition-colors"
          >
            Reservar
          </Link>
        </div>

        {/* Mobile Toggle (Sharp Architectural Square) */}
        <div className="flex xl:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Abrir Menú"
            className="cursor-pointer w-10 h-10 border border-white/20 bg-black/50 flex items-center justify-center text-[#f8f6f0]"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sharp Architectural Menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#050508]/95 backdrop-blur-2xl border-b border-white/15 px-6 py-6">
          <div className="flex flex-col divide-y divide-white/10">
            {navItems.map((item) => {
              const active =
                item.route === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.route);
              return (
                <Link
                  key={item.route}
                  href={item.route}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3.5 text-xs tracking-[0.22em] uppercase font-medium flex items-center justify-between transition-colors ${
                    active ? 'text-[#f3dc8a]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] font-mono text-white/40">→</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
