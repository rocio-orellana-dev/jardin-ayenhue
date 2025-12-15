import { useState } from 'react';
import { 
  Heart, 
  HelpingHand, 
  UserCheck, 
  Shapes,
  ChevronDown, // Cambiamos Plus/Minus por Chevron para consistencia con Seals
  ChevronUp
} from 'lucide-react';

const valuesData = [
  {
    id: 1,
    title: "El Amor",
    icon: Heart, // Pasamos el componente, no el elemento renderizado
    color: "text-rose-600",
    bg: "bg-rose-100", // Fondo coordinado
    shortDesc: "Vivir las relaciones con entrega, generosidad y protección.",
    description: "Este valor se enmarca en vivir la cotidianeidad de las relaciones interpersonales con entrega, generosidad sin esperar recompensa y gratitud. Implica vivenciar el perdón, la aceptación del otro y un comportamiento auténtico en un estado de paz. El amor es un desafío que incorporamos en nuestras prácticas diarias, entendiendo que el bienestar presente y futuro de nuestra niñez depende de que se sientan protegidos y amados."
  },
  {
    id: 2,
    title: "Solidaridad",
    icon: HelpingHand,
    color: "text-cyan-600",
    bg: "bg-cyan-100",
    shortDesc: "Situarse en el lugar del otro y compartir generosamente.",
    description: "Entendida como el situarse en el lugar del otro, pensar más en el prójimo que en uno mismo. Buscamos que nuestros niños y niñas aprendan desde sala cuna la importancia de compartir y ayudar a los necesitados. Se les enseña a sentir alegría ante los éxitos ajenos y empatía ante los problemas, comprendiendo que la ayuda mutua es fundamental para vivir en paz y favorece el proceso de aprendizaje."
  },
  {
    id: 3,
    title: "Respeto",
    icon: UserCheck,
    color: "text-green-600",
    bg: "bg-green-100",
    shortDesc: "Convivencia democrática, escucha atenta y cuidado mutuo.",
    description: "Inculcamos el respeto hacia el otro como a sí mismo, incentivando la escucha atenta y considerando las opiniones de los demás. Promovemos relaciones participativas y democráticas en un clima de amabilidad y afecto. Esto incluye el respeto por el medio ambiente, el autocuidado, los estilos de vida saludables y la profunda valoración por la interculturalidad y la cultura mapuche."
  },
  {
    id: 4,
    title: "Diversidad",
    icon: Shapes,
    color: "text-purple-600",
    bg: "bg-purple-100",
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
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo sutil */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Encabezado estandarizado con estilo 'Badge' (como en Services) */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-gray-50 px-4 py-2 rounded-full border border-gray-100 inline-block mb-4">
            Nuestros Pilares
          </span>
          <h2 className="text-3xl font-heading font-bold text-primary sm:text-4xl md:text-5xl">
            Valores Institucionales
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Experiencias de aprendizaje innovadoras enfocadas en fortalecer el ser.
          </p>
        </div>

        {/* Grilla */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {valuesData.map((val) => (
            <div 
              key={val.id}
              onClick={() => toggleValue(val.id)}
              className={`
                group rounded-3xl p-1 transition-all duration-300 border-2 cursor-pointer
                ${openId === val.id 
                  ? 'border-primary/20 bg-primary/5 shadow-md' 
                  : 'border-transparent hover:border-gray-100 bg-transparent'}
              `}
            >
              <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-5">
                    {/* Ícono con fondo de color (Estilo Services) */}
                    <div className={`p-3.5 rounded-2xl shrink-0 transition-colors duration-300 ${val.bg}`}>
                      <val.icon className={`w-7 h-7 ${val.color}`} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {val.title}
                      </h3>
                      {/* Descripción corta que desaparece suavemente */}
                      <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${openId === val.id ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'}`}>
                        <p className="text-sm text-gray-500 mt-2 overflow-hidden leading-relaxed">
                          {val.shortDesc}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Flecha Chevron (Estilo Seals) */}
                  <div className={`text-gray-300 mt-2 transition-transform duration-300 ${openId === val.id ? 'rotate-180 text-primary' : ''}`}>
                    <ChevronDown size={24} />
                  </div>
                </div>

                {/* Contenido Expandible */}
                <div 
                  className={`
                    grid transition-[grid-template-rows] duration-500 ease-in-out
                    ${openId === val.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}
                  `}
                >
                  <div className="overflow-hidden">
                    <div className="pt-4 border-t border-dashed border-gray-100">
                      <p className="text-gray-600 leading-relaxed text-base">
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