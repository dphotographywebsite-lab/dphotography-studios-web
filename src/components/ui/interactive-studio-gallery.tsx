'use client';

import React from 'react';
import { LiquidGlassCarousel } from '@/components/ui/liquid-glass-carousel';
import { useStudio } from '@/context/StudioContext';

export default function InteractiveStudioGallery() {
  const { carouselItems } = useStudio();
  const signature = carouselItems.map((it) => `${it.src}:${it.title}`).join('|');

  return (
    <section
      id="galeria-interactiva"
      className="relative z-20 h-[68svh] sm:h-[88svh] w-full"
    >
      <LiquidGlassCarousel
        key={signature}
        items={carouselItems}
        entry={true}
        background="#050508"
      />
    </section>
  );
}
