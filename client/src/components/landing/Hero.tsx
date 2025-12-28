import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ Importa varias imágenes para el carrusel
import hero1 from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import hero2 from "@assets/generated_images/hero_image_2.png";
import hero3 from "@assets/generated_images/hero_image_3.png";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Estado del carrusel
  const heroImages = [hero1, hero2, hero3];
  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ Cambia automático cada X ms
  useEffect(() => {
    // (opcional) precargar
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 segundos

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pb-16 md:pb-24"
    >

      {/* ✅ Background Carousel */}
      <div className="absolute inset-0 z-0 select-none">
        {heroImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Niños jugando en Jardín Ayenhue"
            className={[
              "absolute inset-0 w-full h-full object-cover",
              "transition-opacity duration-1000 ease-in-out",
              "scale-105", // tu look actual
              idx === activeIndex ? "opacity-100" : "opacity-0",
            ].join(" ")}
            // (opcional) para priorizar la primera
            loading={idx === 0 ? "eager" : "lazy"}
          />
        ))}

        {/* Overlays (se mantienen igual) */}
        <div className="absolute inset-0 bg-linear-to-r from-primary/95 via-primary/70 to-primary/20 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-25">
        <div className="max-w-3xl space-y-8 animate-in slide-in-from-bottom-8 duration-1000 delay-200">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white font-medium text-sm shadow-lg hover:bg-white/15 transition-colors cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse shadow-[0_0_10px_rgba(149,206,11,0.5)]"></span>
            Inscripciones Abiertas 2026
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-[1.1] text-white tracking-tight drop-shadow-lg">
            Donde la infancia florece con{" "}
            <span className="text-secondary relative inline-block">
              amor y cultura
              <svg
                className="absolute w-full h-3 -bottom-1 left-0 text-secondary opacity-60"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-md">
            Un jardín de puertas abiertas en El Molino, Coltauco. Respetamos la
            identidad, valoramos la diversidad y construimos comunidad.
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
                    {isHovered
                      ? "Acompañar su primer paso"
                      : "Postular en Línea (JUNJI)"}
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

      <div className="absolute -bottom-10 md:-bottom-14 left-0 right-0 z-10 pointer-events-none overflow-hidden h-[70px] md:h-[110px]">
        {/* Wrapper fijo */}
        <div className="h-full w-full">
          {/* Track animado */}
          <div className="wave-track h-full flex">
            <svg
              className="w-[1440px] md:w-[1600px] h-full shrink-0 text-background fill-current"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d="M0,220 C480,100 960,340 1440,220 L1440,320 L0,320 Z"></path>
            </svg>

            <svg
              className="w-[1440px] md:w-[1600px] h-full shrink-0 text-background fill-current"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
            >
              <path d="M0,220 C480,100 960,340 1440,220 L1440,320 L0,320 Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

