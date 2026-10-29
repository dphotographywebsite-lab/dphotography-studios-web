'use client';

import React from 'react';
import FlexCarousel from '@/components/ui/flex-carousel';
import { useStudio } from '@/context/StudioContext';

export default function InteractiveStudioGallery() {
  const { carouselItems } = useStudio();
  const items = carouselItems.map((it) => ({
    src: it.src,
    alt: it.title,
    title: it.title,
  }));

  return (
    <section
      id="galeria-interactiva"
      className="relative z-20 w-full h-[520px] sm:h-[640px]"
    >
      <FlexCarousel
        items={items}
        preset="liquid"
        intro="deal"
        cardHeight={0.35}
        gap={10}
        radius={0}
        squeeze={0.17}
        focusOnClick
        captions
        lensWidth={0.87}
        lensHeight={0.99}
        bend={0.36}
        dispersion={0.35}
        autoplay
      />
    </section>
  );
}
