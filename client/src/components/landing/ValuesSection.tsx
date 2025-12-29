import { useState } from 'react';
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

const valuesData = [
  {
    id: 1,
    title: "El Amor",
    icon: Heart,
    color: "text-rose-500",
    bg: "bg-rose-50/50",
    shortDesc: "Vivir las relaciones con entrega, generosidad y protección.",
    description: "Este valor se enmarca en vivir la cotidianeidad de las relaciones interpersonales con entrega, generosidad sin esperar recompensa y gratitud. Implica vivenciar el perdón, la aceptación del otro y un comportamiento auténtico en un estado de paz. El amor es un desafío que incorporamos en nuestras prácticas diarias, entendiendo que el bienestar presente y futuro de nuestra niñez depende de que se sientan protegidos y amados."
  },
  {
    id: 2,
    title: "Solidaridad",
    icon: HelpingHand,
    color: "text-cyan-500",
    bg: "bg-cyan-50/50",
    shortDesc: "Situarse en el lugar del otro y compartir generosamente.",
    description: "Entendida como el situarse en el lugar del otro, pensar más en el prójimo que en uno mismo. Buscamos que nuestros niños y niñas aprendan desde sala cuna la importancia de compartir y ayudar a los necesitados. Se les enseña a sentir alegría ante los éxitos ajenos y empatía ante los problemas, comprendiendo que la ayuda mutua es fundamental para vivir en paz y favorece el proceso de aprendizaje."
  },
  {
    id: 3,
    title: "Respeto",
    icon: UserCheck,
    color: "text-green-500",
    bg: "bg-green-50/50",
    shortDesc: "Convivencia democrática, escucha atenta y cuidado mutuo.",
    description: "Inculcamos el respeto hacia el otro como a sí mismo, incentivando la escucha atenta y considerando las opiniones de los demás. Promovemos relaciones participativas y democráticas en un clima de amabilidad y afecto. Esto incluye el respeto por el medio ambiente, el autocuidado, los estilos de vida saludables y la profunda valoración por la interculturalidad y la cultura mapuche."
  },
  {
    id: 4,
    title: "Diversidad",
    icon: Shapes,
    color: "text-purple-500",
    bg: "bg-purple-50/50",
    shortDesc: "Aceptar y aprender de las diferencias que nos enriquecen.",
    description: "Enseñamos que hay personas distintas en todo el mundo y que, aunque nos diferencian valores familiares o culturales, como seres humanos somos todos iguales. La diversidad nos trae riquezas de experiencias; en lugar de criticarla, debemos aprender de ella. En el contexto actual de migración, es fundamental enseñar lo enriquecedor que es compartir con otras personas y sus culturas."
  }
];

export default function ValuesSection() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleValue = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cn(UI.sectionY, "bg-white")}>

      <div className={UI.containerX}>
        <SectionHeader 
          kicker="Nuestros Pilares"
          title="Valores Institucionales"
          subtitle="Experiencias de aprendizaje innovadoras enfocadas en fortalecer el ser."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {valuesData.map((val) => (
            <div 
              key={val.id}
              onClick={() => toggleValue(val.id)}
              className={cn(
                "group rounded-[2.5rem] transition-all duration-500 cursor-pointer",
                openId === val.id 
                  ? "ring-1 ring-primary/10 shadow-md" 
                  : "hover:translate-y-[-2px]"
              )}
            >
              <div className={cn(UI.cardBase, "p-6 sm:p-8 h-full border-gray-100/50")}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-5">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-colors duration-300",
                      val.bg
                    )}>
                      <val.icon className={cn("w-6 h-6", val.color)} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                        {val.title}
                      </h3>
                      <div className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-in-out",
                        openId === val.id ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
                      )}>
                        <p className="text-sm text-slate-500 mt-2 overflow-hidden leading-relaxed">
                          {val.shortDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={cn(
                    "text-slate-300 mt-1.5 transition-transform duration-500",
                    openId === val.id ? "rotate-180 text-primary" : "group-hover:text-slate-400"
                  )}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                <div 
                  className={cn(
                    "grid transition-[grid-template-rows] duration-500 ease-in-out",
                    openId === val.id ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pt-5 border-t border-slate-50">
                      <p className="text-slate-600 leading-relaxed text-[0.95rem]">
                        {val.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}