import { Heart } from "lucide-react";
import { motion, Variants } from "framer-motion"; 
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import logoImage from "@assets/generated_images/logo.webp";

export default function CloseNote() {
  // --- SOLUCIÓN: Tipado explícito con 'Variants' para evitar errores de TypeScript ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const signatureVariants: Variants = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    visible: { 
      opacity: 1, 
      clipPath: "inset(0 0% 0 0)", 
      transition: { duration: 1.5, ease: "easeInOut", delay: 1.2 } 
    }
  };

  return (
    <section className={cn("bg-white border-t border-slate-50 overflow-hidden", UI.sectionY)}>
      {/* Importamos la tipografía Gochi Hand directamente para la firma si no está global */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
      `}} />

      <motion.div 
        className={cn(UI.containerX, "text-center")}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-2xl mx-auto space-y-10">
          
          {/* 1. Identidad Visual */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden grayscale opacity-30 border border-slate-100 p-1">
              <img src={logoImage} alt="" className="w-full h-full object-contain" />
            </div>
            <Heart className="w-5 h-5 text-secondary/40 stroke-[1.5px] animate-pulse" />
          </motion.div>

          {/* 2. Mensaje Institucional con Estética Limpia */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl md:text-4xl font-heading font-black text-primary tracking-tight leading-tight px-4">
              Comprometidos con el presente <br /> 
              <span className="text-secondary italic">& futuro de nuestra niñez</span>
            </h3>
            <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed italic px-6 max-w-lg mx-auto">
              "En cada descubrimiento, construimos juntos un lugar de alegría para crecer en comunidad, desde el corazón de El Molino."
            </p>
          </motion.div>

          {/* 3. Firma "Hecha a Mano" */}
          <div className="pt-6 flex flex-col items-center gap-3">
            <motion.p 
              variants={signatureVariants}
              className="text-3xl md:text-4xl text-primary/80 -rotate-2 select-none" 
              style={{ fontFamily: "'Gochi Hand', cursive" }}
              aria-label="Firmado por el Equipo Ayenhue"
            >
              Con cariño, el Equipo Ayenhue
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <span className="h-px w-8 bg-slate-200" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                Coltauco, Chile
              </span>
              <span className="h-px w-8 bg-slate-200" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}