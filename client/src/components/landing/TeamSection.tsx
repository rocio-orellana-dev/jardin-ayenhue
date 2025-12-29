import { useState } from "react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Heart, ChevronDown, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- COMPONENTE: RETRATO OPTIMIZADO CON SKELETON ---
function TeamPortrait({ src, alt, isExpanded }: { src: string; alt: string; isExpanded: boolean }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full h-full bg-slate-100">
      {/* Skeleton animado mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center">
          <Heart className="text-slate-300 w-12 h-12 animate-bounce" />
        </div>
      )}
      <img 
        src={src} 
        alt={alt} 
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-1000",
          "sepia-[0.10] saturate-[1.1] contrast-[1.02]", 
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
          isExpanded ? "sepia-0" : "grayscale-[5%] group-hover:grayscale-0 group-hover:scale-105"
        )}
      />
    </div>
  );
}

// Imports de imágenes
import directoraImg from "@assets/generated_images/viviana_diaz_directora.png";
import educadoraSCImg from "@assets/generated_images/debora_sanchez_sala_cuna.png";
import educadoraNMImg from "@assets/generated_images/gisselle_moscoso_nivel_medio.png";

const team = [
  {
    name: "Viviana Díaz",
    role: "Directora Institucional",
    focus: "Liderazgo con vocación y compromiso.",
    bio: "Con años de trayectoria en el sistema VTF, lidera nuestra comunidad asegurando que cada proceso pedagógico y administrativo se realice con excelencia y profundo amor por la infancia de El Molino.",
    image: directoraImg,
  },
  {
    name: "Débora Sánchez",
    role: "Educadora Sala Cuna",
    levelBadge: "Sala Cuna",
    focus: "Primeros pasos con ternura y seguridad.",
    bio: "Especialista en el primer ciclo de vida, su labor se centra en el apego seguro y la estimulación temprana, creando un entorno de calma donde los más pequeñitos pueden explorar el mundo por primera vez.",
    image: educadoraSCImg,
  },
  {
    name: "Gisselle Moscoso",
    role: "Educadora Nivel Medio",
    levelBadge: "Nivel Medio",
    focus: "Fomentando la autonomía a través del juego.",
    bio: "Apasionada por el aprendizaje activo, diseña experiencias donde el juego y la curiosidad son los motores para que los niños y niñas desarrollen su lenguaje, creatividad y habilidades sociales.",
    image: educadoraNMImg,
  },
];

export default function TeamSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="equipo" className={cn("relative bg-white pb-32 overflow-hidden", UI.sectionY)}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />

      <div className={cn(UI.containerX, "relative z-10")}>
        <SectionHeader
          kicker="Nuestra Comunidad"
          title="El alma de Ayenhue"
          subtitle="Profesionales expertas que transforman cada día en una oportunidad de crecimiento para tus hijos e hijas."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-12 mt-24">
          {team.map((member, index) => {
            const isExpanded = expandedIndex === index;
            
            return (
              <div 
                key={index} 
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="group flex flex-col items-center cursor-pointer"
              >
                <div className="relative w-full max-w-[320px] mb-12">
                  <div className={cn(
                    "absolute -inset-3 border border-slate-100 rounded-t-[160px] rounded-b-3xl transition-all duration-700",
                    isExpanded ? "scale-105 border-secondary/40" : "scale-100"
                  )} />

                  <div className={cn(
                    "relative aspect-[1/1.3] overflow-hidden transition-all duration-700 shadow-xl",
                    "rounded-t-[150px] rounded-b-2xl", 
                    isExpanded ? "shadow-secondary/20" : "group-hover:shadow-2xl"
                  )}>
                    {/* USO DEL COMPONENTE OPTIMIZADO */}
                    <TeamPortrait src={member.image} alt={member.name} isExpanded={isExpanded} />
                    
                    {member.levelBadge && (
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-white/95 backdrop-blur-md text-primary font-bold border-none px-6 py-2 rounded-full shadow-xl text-[10px] tracking-widest uppercase">
                          {member.levelBadge}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <div className="absolute -top-4 -right-2 bg-secondary text-primary p-2.5 rounded-full shadow-lg transform transition-transform group-hover:rotate-12 z-20">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-center w-full max-w-sm">
                  <div className="flex justify-center mb-6">
                    <div className="h-px w-8 bg-slate-200 self-center" />
                    <Heart className={cn("mx-4 w-5 h-5 transition-all duration-500", isExpanded ? "text-secondary fill-secondary scale-125" : "text-slate-200")} />
                    <div className="h-px w-8 bg-slate-200 self-center" />
                  </div>
                  
                  <h3 className="text-3xl font-heading font-black text-primary mb-1 tracking-tight">{member.name}</h3>
                  <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-5">{member.role}</p>
                  <p className="text-slate-500 text-lg font-medium italic mb-2">"{member.focus}"</p>

                  <div className={cn(
                    "grid transition-all duration-700 ease-in-out overflow-hidden text-left",
                    isExpanded ? "grid-rows-[1fr] opacity-100 mt-8" : "grid-rows-[0fr] opacity-0"
                  )}>
                    <div className="min-h-0 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{member.bio}</p>
                    </div>
                  </div>

                  <button className="mt-6 flex flex-col items-center mx-auto text-slate-300 transition-colors group-hover:text-secondary outline-none">
                    <ChevronDown className={cn("w-6 h-6 transition-transform duration-500", isExpanded && "rotate-180")} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}