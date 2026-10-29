import type { Metadata } from 'next';
import {
  Cinzel,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import { StudioProvider } from '@/context/StudioContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GlobalModals from '@/components/GlobalModals';
import FluidFieldBackground from '@/components/ui/fluid-field';
import ScrollChoreography from '@/components/ScrollChoreography';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-cinzel',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title:
    'DPhotography Studios & Films | Fotografía de Lujo, Bodas, Quinceañeras y Producción de Cine — Louisville, KY',
  description:
    'Estudio de fotografía editorial de lujo y productora de cine en Louisville, Kentucky. Bodas, Quinceañeras, Videos Musicales DMedia Records, Retratos en Estudio y Cine Original.',
  keywords: [
    'DPhotography Studios',
    'DMedia Records',
    'Fotógrafo de bodas en Louisville',
    'Videógrafo de bodas en Louisville',
    'Fotografía de Quinceañeras Louisville KY',
    'Películas de Quinceañeras Kentucky',
    'Producción de videos musicales Louisville',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${cinzel.variable} ${cormorant.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#030306] text-[#f8f6f0] antialiased relative">
        {/* ===================================================================
            LIENZO ESPACIAL ÚNICO Y CONTINUO (Layer 0 — WebGL Fluid Field)
            Shader fluido en tonos negros profundos y charcoal oscuro.
        =================================================================== */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#030306]"
        >
          <FluidFieldBackground className="w-full h-full" />
        </div>

        <StudioProvider>
          <ScrollChoreography />
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <GlobalModals />
          <Footer />
        </StudioProvider>
      </body>
    </html>
  );
}
