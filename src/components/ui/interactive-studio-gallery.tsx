'use client';

import React, { useEffect, useState } from 'react';
import FlexCarousel from '@/components/ui/flex-carousel';
import { useStudio } from '@/context/StudioContext';

export default function InteractiveStudioGallery() {
  const { carouselItems } = useStudio();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 640);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const items = carouselItems.map((it) => ({
    src: it.src,
    alt: it.title,
    title: it.title,
  }));

  return (
    <section
      id="galeria-interactiva"
      className="relative z-20 w-full h-[380px] sm:h-[620px] !mt-[-6.25rem] sm:!mt-[-2.5rem]"
    >
      <FlexCarousel
        items={items}
        preset="liquid"
        intro="deal"
        cardHeight={isMobile ? 0.52 : 0.35}
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
