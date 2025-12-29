import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Layout & Global Components
import Navbar from "@/components/layout/Navbar";
import CloseNote from "@/components/landing/CloseNote";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import MobileStickyCTA from "@/components/MobileStickyCTA";

// Landing Sections
import Hero from "@/components/landing/Hero";
import StatsSection from "@/components/landing/StatsSection";
import EducationLevels from "@/components/landing/EducationLevels";
import Services from "@/components/landing/Services";
import SealsSection from "@/components/landing/SealsSection";
import About from "@/components/landing/About";
import MissionVision from "@/components/landing/MissionVision";
import ValuesSection from "@/components/landing/ValuesSection";
import TeamSection from "@/components/landing/TeamSection";
import WhyChooseUs from "@/components/landing/WhyChooseUs";
import History from "@/components/landing/History";
import Recognition from "@/components/landing/Recognition";
import Testimonials from "@/components/landing/Testimonials";
import Gallery from "@/components/landing/Gallery";
import Social from "@/components/landing/Social";
import IsForYou from "@/components/landing/IsForYou";
import CTA from "@/components/landing/CTA";
import Contact from "@/components/landing/Contact";

import logoImage from "@assets/generated_images/logo.png";

// --- COMPONENTE: PANTALLA DE CARGA INSTITUCIONAL ---
function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-2000 bg-white flex flex-col items-center justify-center p-6 text-center"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          y: [0, -10, 0] 
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 md:w-44 md:h-44 mb-8"
      >
        <img src={logoImage} alt="Jardín Ayenhue" className="w-full h-full object-contain" />
      </motion.div>
      <div className="space-y-3">
        <h2 className="text-primary font-black text-3xl md:text-4xl font-heading tracking-tight">
          Jardín Ayenhue
        </h2>
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-secondary" />
          <p className="text-secondary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">
            Cargando un mundo de colores
          </p>
          <span className="h-px w-8 bg-secondary" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos carga de recursos críticos para una entrada limpia
    const timer = setTimeout(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-secondary/30 selection:text-primary overflow-x-hidden">
      <AnimatePresence>
        {loading && <SplashScreen />}
      </AnimatePresence>

      {/* Solo mostramos el contenido principal cuando termina el Splash */}
      <div className={cn("transition-opacity duration-1000", loading ? "opacity-0" : "opacity-100")}>
        <Navbar />

        <main className="grow">
          {/* SECCIÓN 1: IMPACTO (Fondo Dinámico) */}
          <section className="relative">
            <Hero />
            <StatsSection />
            {/* Divisor orgánico sutil */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 transform rotate-180">
              <svg className="relative block w-[calc(100%+1.3px)] h-[50px] text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
              </svg>
            </div>
          </section>

          {/* SECCIÓN 2: EL SERVICIO (Claridad para padres) */}
          <div className="bg-white relative z-10">
            <EducationLevels />
            <Services />
            <SealsSection />
          </div>

          {/* SECCIÓN 3: LA IDENTIDAD (El Corazón del Jardín) */}
          <section className="bg-slate-50/50 relative py-12">
            <About />
            <MissionVision />
            <ValuesSection />
            <TeamSection />
          </section>

          {/* SECCIÓN 4: CONFIANZA Y TRAYECTORIA */}
          <section className="bg-white">
            <WhyChooseUs />
            <History />
            <Recognition />
          </section>

          {/* SECCIÓN 5: PRUEBA SOCIAL (Vida Real) */}
          <section className="bg-slate-50/30">
            <Testimonials />
            <Gallery />
            <Social />
          </section>

          {/* SECCIÓN 6: ACCIÓN FINAL */}
          <section className="bg-white relative pb-20">
            <IsForYou />
            <CTA />
            <Contact />
            <CloseNote />
          </section>
        </main>

        <Footer />
        
        {/* Herramientas Flotantes */}
        <MobileStickyCTA />
        <FloatingWhatsApp />
      </div>

      {/* ESTILOS GLOBALES PARA EL ACABADO PREMIUM */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
        ::selection { background: #95ce0b4d; color: #003366; }
        
        /* Animación suave para la entrada de componentes */
        .reveal { 
          opacity: 0; 
          transform: translateY(30px); 
          transition: all 0.8s ease-out; 
        }
        .reveal.active { 
          opacity: 1; 
          transform: translateY(0); 
        }

        /* Ajuste de scroll para dispositivos Apple */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen { min-height: -webkit-fill-available; }
        }
      `}} />
    </div>
  );
}