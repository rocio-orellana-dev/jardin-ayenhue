import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="inicio" className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax-like effect */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src={heroImage}
          alt="Niños jugando en Jardín Ayenhue"
          className="w-full h-full object-cover animate-in fade-in duration-1000 scale-105"
        />
        {/* Dynamic Blue Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
          
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium text-sm shadow-lg hover:bg-white/15 transition-colors cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(149,206,11,0.5)]"></span>
            Matrículas Abiertas 2026
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-white tracking-tight drop-shadow-lg">
            Donde la infancia florece con <span className="text-secondary relative inline-block">
              amor y cultura
              <svg className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-md">
            Un jardín de puertas abiertas en El Molino, Coltauco. Respetamos la identidad, valoramos la diversidad y construimos comunidad.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full sm:w-auto"
            >
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold text-lg px-8 h-14 rounded-full shadow-xl shadow-secondary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl w-full sm:w-auto relative overflow-hidden group"
                asChild
              >
                <a 
                  href="https://simonline.junji.gob.cl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2 transition-transform duration-300 group-hover:scale-105">
                    {isHovered ? "Acompañar su primer paso" : "Postular en Línea (JUNJI)"}
                    <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full"></div>
                </a>
              </Button>
            </div>

            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white/5 border-white/40 text-white hover:bg-white hover:text-primary font-semibold text-lg px-8 h-14 rounded-full backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto group"
              asChild
            >
              <a 
                href="https://wa.me/56992435064?text=Hola,%20quisiera%20más%20información%20sobre%20el%20jardín."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                Hablar por WhatsApp
                <MessageCircle className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      {/* Animated Wave Divider */}
      {/* AJUSTE AGRESIVO: 
          1. h-[25px] md:h-[50px]: Altura muy reducida para que quede bien abajo.
          2. translate-y-1: Mantiene el ajuste fino del borde inferior.
      */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none overflow-hidden h-[25px] md:h-[50px] translate-y-1">
        {/* Contenedor de la animación (mide 200% de ancho) */}
        <div className="animate-wave h-full w-[200%] flex">
          
          {/* Ola 1 */}
          <svg className="w-1/2 h-full text-background fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,220 C480,100 960,340 1440,220 L1440,320 L0,320 Z"></path>
          </svg>
          
          {/* Ola 2 */}
          <svg className="w-1/2 h-full text-background fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
             <path d="M0,220 C480,100 960,340 1440,220 L1440,320 L0,320 Z"></path>
          </svg>

        </div>
      </div>
    </section>
  );
}
