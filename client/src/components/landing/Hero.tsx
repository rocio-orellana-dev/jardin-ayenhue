import { useEffect, useState } from "react";
import { ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import { motion, AnimatePresence } from "framer-motion";

import hero1 from "@assets/generated_images/hero1.webp";
import hero2 from "@assets/generated_images/hero_image_2.webp";
import hero3 from "@assets/generated_images/hero_image_3.webp";


export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const heroImages = [hero1, hero2, hero3];

  useEffect(() => {
    // PRECARGA INTELIGENTE: Priorizamos la primera, luego las demás con retraso
    const firstImg = new Image();
    firstImg.src = heroImages[0];
    firstImg.onload = () => setIsFirstImageLoaded(true);

    // Preload de las restantes después de un breve delay para no saturar el ancho de banda inicial
    const timeout = setTimeout(() => {
      heroImages.slice(1).forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }, 2000);

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pb-16 md:pb-24 bg-primary"
    >
      {/* PLACEHOLDER DE CARGA: Evita que se vea negro o vacío al inicio */}
      {!isFirstImageLoaded && (
        <div className="absolute inset-0 bg-primary z-[-1] animate-pulse" />
      )}

      <div className="absolute inset-0 z-0 select-none">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            // --- OPTIMIZACIÓN CLAVE ---
            // La primera imagen carga de inmediato (eager), las demás solo cuando se necesitan (lazy)
            loading={idx === 0 ? "eager" : "lazy"}
            // Prioridad alta para el navegador en la primera imagen del carrusel
            fetchPriority={idx === 0 ? "high" : "low"}
            // Decodificación síncrona para la primera para evitar parpadeo blanco
            decoding={idx === 0 ? "sync" : "async"}
            alt="Niños jugando en Jardín Ayenhue"
            onLoad={idx === 0 ? () => setIsFirstImageLoaded(true) : undefined}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out scale-105",
              idx === activeIndex ? "opacity-100" : "opacity-0"
            )}
          />
        ))}

        {/* Overlays de contraste mejorados para legibilidad */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/90 via-primary/60 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/60 via-transparent to-primary/20"></div>
      </div>

      <div className={cn(UI.containerX, "pt-25 relative z-10")}>
        <div className="max-w-3xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          
          {/* BADGE DE INSCRIPCIÓN */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium text-sm shadow-lg"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(149,206,11,0.5)]"></span>
            Inscripciones Abiertas 2026
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-white tracking-tight drop-shadow-xl">
            Donde la infancia florece con{" "}
            <span className="text-secondary relative inline-block">
              amor y cultura
              <svg className="absolute w-full h-3 -bottom-2 left-0 text-secondary/60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-md">
            Un jardín de puertas abiertas en El Molino, Coltauco. Respetamos la
            identidad, valoramos la diversidad y construimos comunidad.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <Button
              size="lg"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 h-14 rounded-full shadow-xl shadow-secondary/20 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto group relative overflow-hidden"
              asChild
            >
              <a href="https://simonline.junji.gob.cl/" target="_blank" rel="noopener noreferrer">
                <span className="relative z-10 flex items-center gap-2">
                  {isHovered ? "Acompañar su primer paso" : "Postular en Línea (JUNJI)"}
                  <ExternalLink className="w-5 h-5 transition-transform group-hover:rotate-45" />
                </span>
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="bg-white/5 border-white/40 text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 h-14 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto group"
              asChild
            >
              <a href="https://wa.me/56992435064?text=Hola,%20quisiera%20más%20información." target="_blank" rel="noopener noreferrer">
                Hablar por WhatsApp
                <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* WAVE ANIMATION: Separada para evitar layout shifts */}
      <div className="absolute -bottom-1 left-0 right-0 z-10 pointer-events-none h-[70px] md:h-[110px]">
        <div className="wave-track h-full flex opacity-100">
           <svg className="w-full h-full text-background fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,220 C480,100 960,340 1440,220 L1440,320 L0,320 Z"></path>
           </svg>
        </div>
      </div>
    </section>
  );
}