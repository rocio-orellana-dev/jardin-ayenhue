import plaqueImage from "@assets/generated_images/official_government_recognition_plaque.png";
import { CheckCircle2 } from "lucide-react";

export default function Recognition() {
  return (
    <section id="reconocimiento" className="py-24 bg-primary overflow-hidden relative">
      {/* Background decoration - Abstract circles */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[80px] -mr-40 -mt-40 animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[60px] -ml-20 -mb-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end order-1 md:order-2 animate-in slide-in-from-right-8 duration-1000">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white/10 shadow-2xl group cursor-default">
              <img 
                src={plaqueImage} 
                alt="Sello de Reconocimiento Oficial" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-tr from-black/40 to-transparent group-hover:opacity-80 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left space-y-8 order-2 md:order-1 animate-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-2 bg-white/10 px-6 py-2 rounded-full text-sm font-bold text-secondary border border-white/10 backdrop-blur-sm shadow-lg">
              <CheckCircle2 className="w-5 h-5" />
              <span>Certificación MINEDUC</span>
            </div>
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
              Reconocimiento Oficial del Estado
            </h3>
            
            <p className="text-white/90 text-xl max-w-2xl leading-relaxed font-light">
              Contamos con la certificación que garantiza el cumplimiento de todos los estándares pedagógicos, jurídicos y de infraestructura.
            </p>
            
            <div className="pt-6 flex flex-col md:flex-row gap-10 justify-center md:justify-start">
              <div className="text-left group">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-2 group-hover:text-secondary transition-colors">RBD</p>
                <p className="text-white text-2xl font-mono font-bold">33753</p>
              </div>
              <div className="text-left group">
                <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-2 group-hover:text-secondary transition-colors">Dependencia</p>
                <p className="text-white text-2xl font-bold">JUNJI / VTF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
