import Navbar from "@/components/layout/Navbar";
import CloseNote from "@/components/landing/CloseNote";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import StatsSection from "@/components/landing/StatsSection";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import IsForYou from "@/components/landing/IsForYou";
import History from "@/components/landing/History";
import Services from "@/components/landing/Services";
import EducationLevels from "@/components/landing/EducationLevels";
import TeamSection from "@/components/landing/TeamSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import Recognition from "@/components/landing/Recognition";
import Testimonials from "@/components/landing/Testimonials";
import Gallery from "@/components/landing/Gallery";
import Social from "@/components/landing/Social";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";
import MissionVision from "@/components/landing/MissionVision";
import SealsSection from "@/components/landing/SealsSection";
import ValuesSection from "@/components/landing/ValuesSection";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/30 selection:text-primary">
      {/* Navegación fija */}
      <Navbar />

      <main className="grow bg-white">
        {/* --- BLOQUE 1: IMPACTO E INTRODUCCIÓN --- */}
        {/* Captura la atención inmediata y valida con números rápidos */}
        <Hero />
        <StatsSection />

        {/* --- BLOQUE 2: PROPUESTA EDUCATIVA (LA SOLUCIÓN) --- */}
        {/* Los padres necesitan saber qué ofreces antes de conocer tu historia */}
        <EducationLevels />
        <Services />
        <SealsSection />

        {/* --- BLOQUE 3: CONFIANZA E IDENTIDAD --- */}
        {/* Quiénes están detrás y bajo qué valores educarán a sus hijos */}
        <About />
        <MissionVision />
        <ValuesSection />
        <TeamSection />

        {/* --- BLOQUE 4: DIFERENCIACIÓN Y AUTORIDAD --- */}
        {/* Por qué elegirte a ti y no a otro, respaldado por la trayectoria */}
        <WhyChooseUs />
        <History />
        <Recognition />

        {/* --- BLOQUE 5: PRUEBA SOCIAL Y ENTORNO --- */}
        {/* Ver para creer: testimonios de familias y fotos de las instalaciones */}
        <Testimonials />
        <Gallery />
        <Social />

        {/* --- BLOQUE 6: CIERRE Y CONVERSIÓN --- */}
        {/* Filtro final de cliente ideal y llamada a la acción directa */}
        <IsForYou />
        <CTA />
        <Contact />
        <CloseNote />
      </main>

      {/* --- FOOTER Y WIDGETS --- */}
      <Footer />
      
      {/* Botones de acción rápida para mejorar la conversión en móviles */}
      <MobileStickyCTA />
      <FloatingWhatsApp />
    </div>
  );
}