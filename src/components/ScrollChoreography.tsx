'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollChoreography() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Editorial Headings & Text Blocks ([data-reveal="up"])
      const upElements = gsap.utils.toArray<HTMLElement>('[data-reveal="up"]');
      upElements.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 2. Staggered Grids & Cards ([data-reveal="stagger"])
      const staggerGroups = gsap.utils.toArray<HTMLElement>(
        '[data-reveal="stagger"]'
      );
      staggerGroups.forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        if (!children.length) return;
        gsap.fromTo(
          children,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.85,
            stagger: 0.09,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: group,
              start: 'top 86%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 3. Architectural Image Frames ([data-reveal="image"])
      const imageFrames = gsap.utils.toArray<HTMLElement>(
        '[data-reveal="image"]'
      );
      imageFrames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { scale: 1.05, autoAlpha: 0 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.15,
            ease: 'power3.out',
            force3D: true,
            scrollTrigger: {
              trigger: frame,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // 4. Hairline Dividers ([data-reveal="line"])
      const lines = gsap.utils.toArray<HTMLElement>('[data-reveal="line"]');
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: '0% 50%' },
          {
            scaleX: 1,
            duration: 1.1,
            ease: 'expo.out',
            force3D: true,
            scrollTrigger: {
              trigger: line,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, [pathname]);

  return null;
}
