import { Button } from "@/components/ui/button";
import { ExternalLink, Heart } from "lucide-react";
// Importamos el icono oficial de WhatsApp
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";

export default function CTA() {
  return (
    <section id="cta" className={cn("bg-white", UI.sectionY)}>
      <div className={cn(UI.containerX)}>
        <div className="max-w-5xl mx-auto bg-primary rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 lg:p-20 text-center shadow-2xl shadow-primary/20 relative overflow-hidden group">
          
          <div className="relative z-10 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-block p-4 rounded-full bg-white/10 mb-2 border border-white/5 backdrop-blur-sm" aria-hidden="true">
              <Heart className="w-8 h-8 text-secondary fill-secondary animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight px-4">
              Porque la infancia no se repite
            </h2>
            
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light px-4">
              Te invitamos a ser parte de nuestra comunidad. Te acompañamos paso a paso en el proceso de postulación.
            </p>
            
            {/* Bloque de Botones y Texto de Ayuda */}
            <div className="flex flex-col items-center pt-4">
              
              {/* Contenedor Fila de Botones (alineados perfectamente) */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full px-4">
                {/* Botón Postulación Oficial */}
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-primary font-bold px-10 h-14 md:h-16 rounded-full text-lg shadow-xl shadow-secondary/20 transition-all duration-300 hover:scale-105 group/btn focus-visible:ring-2 focus-visible:ring-white" 
                  asChild
                >
                  <a href="https://simonline.junji.gob.cl/" target="_blank" rel="noopener noreferrer" aria-label="Postular en línea a través de la plataforma oficial JUNJI">
                    <span>Postular en Línea (JUNJI)</span>
                    <ExternalLink className="w-5 h-5 ml-2 transition-transform group-hover/btn:rotate-45" />
                  </a>
                </Button>

                {/* Botón WhatsApp (Mismas dimensiones y alineación) */}
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full sm:w-auto bg-white/5 border-white/30 text-white hover:bg-white hover:text-primary font-bold px-10 h-14 md:h-16 rounded-full text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white group/wa" 
                  asChild
                >
                  <a href="https://wa.me/56992435064?text=Hola,%20necesito%20ayuda%20con%20la%20postulación." target="_blank" rel="noopener noreferrer">
                    Ayuda por WhatsApp 
                    {/* Usamos el icono de FaWhatsapp */}
                    <FaWhatsapp className="w-5 h-5 ml-2 transition-transform group-hover/wa:scale-110" />
                  </a>
                </Button>
              </div>

              {/* Texto de ayuda (Ahora está abajo de ambos botones y centrado) */}
              <span className="mt-5 text-[11px] text-white/60 font-medium italic tracking-wide">
                Atención directa con el equipo del jardín
              </span>

              {/* Trust Footer - Microcopy de Confianza */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] md:text-xs text-white/50 font-bold uppercase tracking-[0.2em] pt-8 border-t border-white/10 w-full max-w-2xl px-4 mt-6">
                <span>Postulación gratuita</span>
                <span className="w-1 h-1 bg-secondary rounded-full hidden sm:block" aria-hidden="true" />
                <span>Sin intermediarios</span>
                <span className="w-1 h-1 bg-secondary rounded-full hidden sm:block" aria-hidden="true" />
                <span>Plataforma oficial JUNJI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}