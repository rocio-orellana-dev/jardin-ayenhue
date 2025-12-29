import plaqueImage from "@assets/generated_images/official_government_recognition_plaque.png";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";

export default function Recognition() {
  return (
    <section id="reconocimiento" className={cn(UI.sectionY, "bg-white")}>
      <div className={UI.containerX}>
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end order-1 md:order-2 animate-in slide-in-from-right-8 duration-1000">
            {/* Cambiamos borde blanco por borde gris suave para que destaque en fondo blanco */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-[1px] border-slate-100 shadow-2xl group cursor-default bg-slate-50">
              <img 
                src={plaqueImage} 
                alt="Sello de Reconocimiento Oficial del Estado" 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent group-hover:opacity-40 transition-opacity duration-500"></div>
            </div>
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left space-y-8 order-2 md:order-1 animate-in slide-in-from-left-8 duration-1000">
            {/* Badge: Cambiamos bg-white/10 por bg-secondary/10 y texto a primary */}
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-6 py-2 rounded-full text-sm font-bold text-primary border border-secondary/20 shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-secondary" aria-hidden="true" />
              <span>Certificación MINEDUC</span>
            </div>
            
            {/* Título: Cambiamos text-white por text-primary */}
            <h3 className={cn(UI.h2Section, "text-primary")}>
              Reconocimiento Oficial del Estado
            </h3>
            
            {/* Párrafo: Cambiamos text-white/90 por text-slate-600 */}
            <p className={cn(UI.pSection, "text-slate-600 max-w-2xl font-medium text-balance")}>
              Contamos con la certificación que garantiza el cumplimiento de todos los estándares pedagógicos, jurídicos y de infraestructura exigidos por el Ministerio de Educación.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-10 justify-center md:justify-start">
              {/* Datos RBD: Cambiamos colores de blanco a primary/slate */}
              <div className="text-left group outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-lg p-1">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2 group-hover:text-secondary transition-colors">RBD</p>
                <p className="text-primary text-3xl font-mono font-bold tracking-tight">33753</p>
              </div>
              <div className="text-left group outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-lg p-1">
                <p className="text-slate-400 text-xs uppercase tracking-widest font-bold mb-2 group-hover:text-secondary transition-colors">Dependencia</p>
                <p className="text-primary text-3xl font-bold tracking-tight">JUNJI / VTF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}