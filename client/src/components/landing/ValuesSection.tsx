import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  HelpingHand, 
  UserCheck, 
  Shapes,
  ChevronDown
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

const VALUES_DATA = [
  {
    id: 1,
    title: "El Amor",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    glowColor: "rgba(225, 29, 72, 0.15)",
    shortDesc: "Vivir las relaciones con entrega, generosidad y protección.",
    description: "Este valor se enmarca en vivir la cotidianeidad de las relaciones interpersonales con entrega, generosidad sin esperar recompensa y gratitud. El amor es un desafío que incorporamos en nuestras prácticas diarias, entendiendo que el bienestar presente y futuro de nuestra niñez depende de que se sientan protegidos y amados.",
    floatDelay: "0s"
  },
  {
    id: 2,
    title: "Solidaridad",
    icon: HelpingHand,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    glowColor: "rgba(8, 145, 178, 0.15)",
    shortDesc: "Situarse en el lugar del otro y compartir generosamente.",
    description: "Entendida como el situarse en el lugar del otro. Buscamos que nuestros niños y niñas aprendan desde sala cuna la importancia de compartir y ayudar. Se les enseña a sentir alegría ante los éxitos ajenos y empatía ante los problemas, comprendiendo que la ayuda mutua es fundamental para vivir en paz.",
    floatDelay: "-1.5s"
  },
  {
    id: 3,
    title: "Respeto",
    icon: UserCheck,
    color: "text-green-600",
    bgColor: "bg-green-50",
    glowColor: "rgba(22, 163, 74, 0.15)",
    shortDesc: "Convivencia democrática, escucha atenta y cuidado mutuo.",
    description: "Inculcamos el respeto hacia el otro como a sí mismo, incentivando la escucha atenta. Promovemos relaciones participativas en un clima de amabilidad. Esto incluye el respeto por el medio ambiente, el autocuidado y la profunda valoración por la interculturalidad y la cultura mapuche.",
    floatDelay: "-3s"
  },
  {
    id: 4,
    title: "Diversidad",
    icon: Shapes,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    glowColor: "rgba(147, 51, 234, 0.15)",
    shortDesc: "Aceptar y aprender de las diferencias que nos enriquecen.",
    description: "Enseñamos que hay personas distintas en todo el mundo y que como seres humanos somos todos iguales. La diversidad nos trae riquezas de experiencias; en lugar de criticarla, debemos aprender de ella, especialmente en el contexto de migración actual.",
    floatDelay: "-4.5s"
  }
];

export default function ValuesSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="valores" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      {/* Decoración de fondo suave */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[10%] right-[-5%] w-80 h-80 bg-rose-50 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[-5%] w-80 h-80 bg-cyan-50 rounded-full blur-3xl" />
      </div>

      <div className={cn(UI.containerX, "relative z-10")}>
        <SectionHeader 
          kicker="Nuestros Pilares"
          title="Valores Institucionales"
          subtitle="Experiencias de aprendizaje innovadoras enfocadas en fortalecer el ser."
        />

        {/* Contenedor Grid 2-2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {VALUES_DATA.map((val, index) => {
            const isOpen = openId === val.id;

            return (
              <motion.div
                key={val.id}
                // --- STAGGER ENTRANCE ---
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="relative group cursor-pointer"
                onClick={() => setOpenId(isOpen ? null : val.id)}
              >
                {/* EFECTO FLOTACIÓN */}
                <div 
                  style={{ 
                    animation: isOpen ? "none" : `float 8s ease-in-out infinite`,
                    animationDelay: val.floatDelay 
                  }}
                  className="h-full"
                >
                  {/* GLOW AURA */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-2xl -z-10 scale-110"
                    style={{ backgroundColor: val.glowColor }}
                  />

                  {/* FONDO MORPHING / BLOB */}
                  <div className={cn(
                    "absolute inset-0 transition-all duration-700 bg-white border border-slate-100",
                    "group-hover:shadow-xl group-hover:border-white",
                    isOpen ? "rounded-[2.5rem] shadow-2xl border-primary/5" : "shadow-sm"
                  )} 
                  style={{
                    borderRadius: isOpen ? "2.5rem" : "30% 70% 70% 30% / 30% 30% 70% 70%",
                    animation: isOpen ? "none" : `morph-values 20s linear infinite`
                  }}
                  />

                  {/* CONTENIDO */}
                  <div className="relative z-10 p-8 md:p-12 flex flex-col items-center text-center">
                    <div className={cn(
                      "p-5 rounded-2xl mb-6 transition-all duration-700",
                      val.bgColor, val.color,
                      "group-hover:scale-110 group-hover:rotate-6",
                      isOpen && "scale-110 rotate-0 shadow-inner"
                    )}>
                      <val.icon size={32} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-heading font-black text-2xl text-slate-800 mb-3 tracking-tight">
                      {val.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-100 mt-2">
                            <p className="text-slate-600 text-[0.95rem] leading-relaxed">
                              {val.description}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="short"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          <p className="text-slate-500 text-sm leading-relaxed max-w-70">
                            {val.shortDesc}
                          </p>
                          <div className="flex flex-col items-center gap-1 mt-2">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Ampliar</span>
                             <ChevronDown size={14} className="text-slate-300 animate-bounce" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes morph-values {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}