import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, Palette, HeartHandshake, Users, Award, ChevronDown 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

const SEALS_DATA = [
  {
    id: 1,
    title: "Educación Intercultural",
    icon: Globe2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    glowColor: "rgba(37, 99, 235, 0.15)",
    shortDesc: "Interacción horizontal y sinérgica entre culturas.",
    description: "Este concepto apunta a describir la interacción entre dos o más culturas de un modo horizontal y sinérgico, que promueve el reconocimiento, respeto y valoración de la diversidad cultural como un eje fundamental en el desarrollo integral de niños y niñas.",
    floatDelay: "0s"
  },
  {
    id: 2,
    title: "Diversidad que Enriquece",
    icon: Palette,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    glowColor: "rgba(249, 115, 22, 0.15)",
    shortDesc: "Reconoce y promueve la diversidad como recurso pedagógico.",
    description: "Ambientes de aprendizaje inclusivos donde cada niño aporta desde su identidad y experiencias, generando un entorno donde el conocimiento se construye colectivamente.",
    floatDelay: "-1.5s"
  },
  {
    id: 3,
    title: "Ambientes Bien Tratantes",
    icon: HeartHandshake,
    color: "text-red-600",
    bgColor: "bg-red-50",
    glowColor: "rgba(220, 38, 38, 0.15)",
    shortDesc: "Espacios seguros, afectivos y respetuosos.",
    description: "Representa el compromiso con la creación de espacios de aprendizaje seguros y afectuosos, donde las interacciones se basan en el buen trato, la empatía y el respeto mutuo, fortaleciendo la autoestima desde la primera infancia.",
    floatDelay: "-3s"
  },
  {
    id: 4,
    title: "Vinculación con la Familia",
    icon: Users,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    glowColor: "rgba(79, 70, 229, 0.15)",
    shortDesc: "Integración activa en el proceso educativo.",
    description: "Sistema de 'Puertas Abiertas' que reconoce a la familia como el primer y principal agente educativo, cuyo involucramiento favorece significativamente el desarrollo integral de los niños.",
    floatDelay: "-4.5s"
  },
  {
    id: 5,
    title: "Liderazgo Compartido",
    icon: Award,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    glowColor: "rgba(217, 119, 6, 0.15)",
    shortDesc: "Construcción colectiva de la gestión institucional.",
    description: "Gestión institucional basada en la interacción y valoración de todos los colaboradores. Este enfoque fortalece las capacidades del equipo pedagógico y directivo a través de la opinión compartida.",
    floatDelay: "-2s"
  }
];

export default function SealsSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="identidad" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-orange-50 rounded-full blur-3xl" />
      </div>

      <div className={cn(UI.containerX, "relative z-10")}>
        <SectionHeader 
          kicker="Nuestra Identidad"
          title='Sellos Educativos "Ayenhue"'
          subtitle="Los pilares fundamentales que guían nuestro proyecto educativo institucional."
        />

        {/* Contenedor Flex para diseño 2-2-1 */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 max-w-6xl mx-auto">
          {SEALS_DATA.map((seal, index) => {
            const isOpen = openId === seal.id;

            return (
              <motion.div
                key={seal.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.15, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className={cn(
                  "relative group transition-all duration-700 cursor-pointer",
                  "w-full md:w-[45%] lg:w-[42%]", 
                  isOpen ? "z-20" : "z-10"
                )}
                onClick={() => setOpenId(isOpen ? null : seal.id)}
              >
                <div 
                  style={{ 
                    animation: isOpen ? "none" : `float 7s ease-in-out infinite`,
                    animationDelay: seal.floatDelay 
                  }}
                  className="h-full"
                >
                  {/* GLOW AURA */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-[50px] -z-10 scale-125"
                    style={{ backgroundColor: seal.glowColor }}
                  />

                  {/* FONDO MORPHING / BLOB */}
                  <div className={cn(
                    "absolute inset-0 transition-all duration-700 bg-white border border-slate-100 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)]",
                    "group-hover:shadow-xl group-hover:border-white",
                    isOpen ? "rounded-[2.5rem] shadow-2xl scale-105 border-primary/10" : ""
                  )} 
                  style={{
                    borderRadius: isOpen ? "2.5rem" : "60% 40% 30% 70% / 60% 30% 70% 40%",
                    animation: isOpen ? "none" : `morph 18s linear infinite`
                  }}
                  />

                  {/* CONTENIDO */}
                  <div className="relative z-10 p-10 flex flex-col items-center text-center h-full">
                    <div className={cn(
                      "p-5 rounded-2xl mb-6 transition-all duration-700",
                      seal.bgColor, seal.color,
                      "group-hover:scale-110 group-hover:rotate-10",
                      isOpen && "scale-110 rotate-0 shadow-inner"
                    )}>
                      <seal.icon size={32} strokeWidth={1.5} />
                    </div>

                    <h3 className="font-heading font-black text-2xl text-slate-800 mb-4 tracking-tight">
                      {seal.title}
                    </h3>

                    <AnimatePresence mode="wait">
                      {isOpen ? (
                        <motion.div
                          key="text"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-slate-100 mt-2">
                            <p className="text-slate-600 text-[0.95rem] leading-relaxed font-medium">
                              {seal.description}
                            </p>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center gap-3"
                        >
                          {/* MENSAJE BREVE (shortDesc) RESTAURADO */}
                          <p className="text-slate-500 text-sm leading-relaxed max-w-70">
                            {seal.shortDesc}
                          </p>
                          
                          <div className="flex flex-col items-center gap-1 mt-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                              Click para explorar
                            </span>
                            <ChevronDown size={18} className="text-slate-300 animate-bounce" />
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
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          33% { border-radius: 45% 55% 50% 50% / 55% 45% 55% 45%; }
          66% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
}