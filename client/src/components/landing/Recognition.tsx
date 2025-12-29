import { useState } from "react";
import plaqueImage from "@assets/generated_images/official_government_recognition_plaque.png";
import { CheckCircle2, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import { motion } from "framer-motion";

export default function Recognition() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="reconocimiento" className={cn(UI.sectionY, "bg-white overflow-hidden")}>
      <div className={cn(UI.containerX)}>
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 group cursor-default">
              
              {!isLoaded && (
                <div className="absolute inset-0 rounded-full bg-slate-50 border border-slate-100 animate-pulse flex items-center justify-center">
                  <Award className="text-slate-200 w-16 h-16" />
                </div>
              )}

              <div className={cn(
                "relative w-full h-full rounded-full overflow-hidden border border-slate-100 shadow-2xl bg-white transition-all duration-1000",
                isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
              )}>
                <img 
                  src={plaqueImage} 
                  alt="Sello de Reconocimiento Oficial del Estado" 
                  onLoad={() => setIsLoaded(true)}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110",
                    isLoaded ? "blur-0" : "blur-md"
                  )}
                />
                <div className="absolute inset-0 bg-linear-to-tr from-primary/5 to-transparent pointer-events-none" />
              </div>

              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/10 rounded-full border border-secondary/20 backdrop-blur-sm hidden md:flex items-center justify-center pointer-events-none"
              >
                <div className="w-16 h-16 border-2 border-dashed border-secondary/30 rounded-full" />
              </motion.div>
            </div>
          </div>

          <div className="w-full md:w-2/3 text-center md:text-left space-y-8 order-2 md:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-secondary/10 px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest text-primary border border-secondary/20 shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-secondary" />
              <span>Certificación MINEDUC</span>
            </motion.div>
            
            <h3 className={cn(UI.h2Section, "text-primary text-4xl md:text-5xl font-black tracking-tight")}>
              Reconocimiento Oficial <br className="hidden lg:block" />
              <span className="text-secondary italic font-light text-3xl md:text-4xl">del Estado</span>
            </h3>
            
            <p className={cn(UI.pSection, "text-slate-500 max-w-2xl font-medium leading-relaxed")}>
              Contamos con la certificación que garantiza el cumplimiento de todos los estándares pedagógicos, jurídicos y de infraestructura exigidos por el Ministerio de Educación.
            </p>
            
            <div className="pt-6 flex flex-col sm:flex-row gap-12 justify-center md:justify-start">
              <div className="text-left relative pl-6 border-l-2 border-slate-100">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black mb-1">RBD</p>
                <p className="text-primary text-4xl font-mono font-black tracking-tighter">33753</p>
              </div>
              
              <div className="text-left relative pl-6 border-l-2 border-slate-100">
                <p className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-black mb-1">Dependencia</p>
                <p className="text-primary text-4xl font-black tracking-tighter">JUNJI / VTF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}