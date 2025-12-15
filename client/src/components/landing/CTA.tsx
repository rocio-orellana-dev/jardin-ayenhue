import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle, Heart } from "lucide-react";

export default function CTA() {
  return (
    <section id="cta" className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-primary rounded-[3rem] p-10 md:p-20 text-center shadow-2xl shadow-primary/20 relative overflow-hidden group">
          
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
          
          <div className="relative z-10 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
            <div className="inline-block p-4 rounded-full bg-white/10 mb-2 border border-white/5 backdrop-blur-sm shadow-inner">
              <Heart className="w-8 h-8 text-secondary fill-secondary animate-pulse" />
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
              Porque la infancia no se repite
            </h2>
            
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Te invitamos a ser parte de nuestra comunidad. Te acompañamos paso a paso en el proceso de postulación.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
              <Button 
                size="lg" 
                className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-10 h-16 rounded-full text-lg shadow-xl shadow-secondary/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group/btn" 
                asChild
              >
                <a 
                  href="https://simonline.junji.gob.cl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <span className="group-hover/btn:hidden">Postular en Línea (JUNJI)</span>
                  <span className="hidden group-hover/btn:inline-block">Comenzar el Viaje</span>
                  <ExternalLink className="w-5 h-5 transition-transform group-hover/btn:rotate-45" />
                </a>
              </Button>

              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-primary font-bold px-10 h-16 rounded-full text-lg transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:shadow-lg group/wa" 
                asChild
              >
                <a 
                  href="https://wa.me/56912345678?text=Hola,%20necesito%20ayuda%20con%20la%20postulación."
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Ayuda por WhatsApp <MessageCircle className="w-5 h-5 transition-transform group-hover/wa:scale-110" />
                </a>
              </Button>
            </div>
            
            <p className="text-sm text-white/50 pt-4 font-medium tracking-wide">
              Proceso gratuito y transparente vía plataforma SIM Online
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
