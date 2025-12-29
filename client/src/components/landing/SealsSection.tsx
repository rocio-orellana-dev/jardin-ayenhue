import { useState } from 'react';
import { 
  Globe2, 
  Palette, 
  HeartHandshake, 
  Users, 
  Award, 
  ChevronDown 
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

const sealsData = [
  {
    id: 1,
    title: "Educación Intercultural",
    icon: Globe2,
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    shortDesc: "Interacción horizontal y sinérgica entre culturas.",
    description: "Este concepto apunta a describir la interacción entre dos o más culturas de un modo horizontal y sinérgico, que promueve el reconocimiento, respeto y valoración de la diversidad cultural como un eje fundamental en el desarrollo integral de niños y niñas. Integra contenidos, prácticas y estrategias que favorecen la visibilización y valoración de las diferentes culturas presentes en la comunidad educativa."
  },
  {
    id: 2,
    title: "Diversidad que Enriquece",
    icon: Palette,
    color: "text-orange-500",
    bg: "bg-orange-50/50",
    shortDesc: "Reconoce y promueve la diversidad como recurso pedagógico.",
    description: "Asumir la diversidad en el aula implica generar ambientes de aprendizaje inclusivos, donde cada niño y niña pueda desarrollar una identidad positiva y habilidades para la convivencia. Este enfoque se basa en que cada niño aporta desde su identidad, experiencias y ritmos de desarrollo, generando un entorno donde el conocimiento se construye colectivamente."
  },
  {
    id: 3,
    title: "Ambientes Bien Tratantes",
    icon: HeartHandshake,
    color: "text-red-500",
    bg: "bg-red-50/50",
    shortDesc: "Espacios seguros, afectivos y respetuosos.",
    description: "Representa el compromiso con la creación de espacios de aprendizaje seguros, afectivos y respetuosos, donde las interacciones se basan en el buen trato, la empatía y el respeto mutuo. Este enfoque promueve el bienestar integral, fortaleciendo la autoestima y habilidades socioemocionales desde la primera infancia."
  },
  {
    id: 4,
    title: "Vinculación con la Familia",
    icon: Users,
    color: "text-indigo-500",
    bg: "bg-indigo-50/50",
    shortDesc: "Integración activa en el proceso educativo.",
    description: "Compromiso con el fortalecimiento del vínculo entre la familia y la institución a través del sistema de 'Puertas Abiertas', promoviendo su participación significativa. Este sello reconoce a la familia como el primer y principal agente educativo, cuyo involucramiento favorece el desarrollo integral."
  },
  {
    id: 5,
    title: "Liderazgo Compartido",
    icon: Award,
    color: "text-amber-500",
    bg: "bg-amber-50/50",
    shortDesc: "Construcción colectiva de la gestión institucional.",
    description: "Reconoce que hay múltiples líderes y se centra en la interacción de los participantes. Aunque el líder tenga la última palabra, la opinión de los colaboradores es tenida en cuenta, haciendo que el equipo se sienta valorado y motivado. Este enfoque fortalece las capacidades del equipo pedagógico y directivo."
  }
];

export default function SealsSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleSeal = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSeal(id);
    }
  };

  return (
    <section id="identidad" className={cn(UI.sectionY, "bg-white")}>
      <div className={UI.containerX}>
        
        <SectionHeader 
          kicker="Nuestra Identidad"
          title='Sellos Educativos "Ayenhue"'
          subtitle="Los pilares fundamentales que guían nuestro proyecto educativo institucional."
        />

        <div className="flex flex-wrap justify-center gap-6">
          {sealsData.map((seal) => (
            <div 
              key={seal.id}
              role="button"
              tabIndex={0}
              onClick={() => toggleSeal(seal.id)}
              onKeyDown={(e) => handleKeyDown(e, seal.id)}
              className={cn(
                UI.cardBase,
                "w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]",
                "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                openId === seal.id ? 'ring-1 ring-primary/10 shadow-md' : 'hover:translate-y--2px'
              )}
            >
              <div className="p-8 pb-5 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-5">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300",
                    seal.bg
                  )}>
                    <seal.icon className={cn("w-6 h-6", seal.color)} />
                  </div>
                  
                  <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-primary transition-colors">
                    {seal.title}
                  </h3>
                </div>
                
                <div className={cn(
                  "mt-1.5 text-slate-300 transition-transform duration-500",
                  openId === seal.id ? 'rotate-180 text-primary' : 'group-hover:text-slate-400'
                )}>
                  <ChevronDown size={22} />
                </div>
              </div>

              <div 
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-in-out will-change-[grid-template-rows,opacity]",
                  openId === seal.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                )}
              >
                <div className="overflow-hidden overscroll-contain">
                  <div className="px-8 pb-8 pt-2 text-slate-600 text-[0.95rem] leading-relaxed">
                    <div className="border-t border-slate-100 pt-5 mt-2">
                       {seal.description}
                    </div>
                  </div>
                </div>
              </div>

              <div className={cn(
                "px-8 pb-8 pt-0 text-sm text-slate-500 font-medium transition-all duration-300",
                openId === seal.id ? 'hidden opacity-0' : 'block opacity-100'
              )}>
                {seal.shortDesc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}