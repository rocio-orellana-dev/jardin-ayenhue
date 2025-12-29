import { Heart } from "lucide-react";
import { motion } from "framer-motion"; // Asegúrate de tener framer-motion instalado
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import logoImage from "@assets/generated_images/logo.png";

export default function CloseNote() {
  // Variantes para animaciones coordinadas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Intervalo entre la aparición de cada elemento
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const signatureVariants = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" }, // Oculto hacia la derecha
    visible: { 
      opacity: 1, 
      clipPath: "inset(0 0% 0 0)", // Se revela como si se escribiera
      transition: { duration: 1.5, ease: "easeInOut", delay: 1.2 } 
    }
  };

  return (
    <section className={cn("bg-white border-t border-slate-50 overflow-hidden", UI.sectionY)}>
      <motion.div 
        className={cn(UI.containerX, "text-center")}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Se activa 100px antes de entrar
      >
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* 1. Logo e Icono con Pulse */}
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-3" aria-hidden="true">
            <div className="w-10 h-10 rounded-full overflow-hidden grayscale opacity-40">
              <img src={logoImage} alt="" className="w-full h-full object-cover" />
            </div>
            <Heart className="w-5 h-5 text-secondary/40 stroke-[1.5px] animate-pulse" />
          </motion.div>

          {/* 2. Mensaje Institucional */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary tracking-tight px-4">
              Comprometidos con el presente y futuro de nuestra niñez
            </h3>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed italic px-6">
              "En cada descubrimiento, construimos juntos un lugar de alegría para crecer en comunidad, desde el corazón de El Molino."
            </p>
          </motion.div>

          {/* 3. Firma con efecto de "Escritura" */}
          <div className="pt-4 flex flex-col items-center gap-1">
            <motion.p 
              variants={signatureVariants}
              className="text-2xl md:text-3xl text-primary/70 -rotate-2 select-none" 
              style={{ fontFamily: 'cursive, Georgia, serif', fontStyle: 'italic' }}
              aria-label="Firmado por el Equipo Ayenhue"
            >
              Con cariño, el Equipo Ayenhue
            </motion.p>
            
            <motion.span 
              variants={itemVariants}
              className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]"
            >
              Coltauco, Chile
            </motion.span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}