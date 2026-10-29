'use client';

import React from 'react';
import { LiquidGlassCarousel } from '@/components/ui/liquid-glass-carousel';

export default function InteractiveStudioGallery() {
  return (
    <section
      id="galeria-interactiva"
      className="relative z-20 h-[68svh] sm:h-[88svh] w-full"
    >
      <LiquidGlassCarousel entry={true} background="#050508" />
    </section>
  );
}
