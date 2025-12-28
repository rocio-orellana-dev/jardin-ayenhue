import { useState } from 'react';
import { 
  Globe2, 
  Palette, 
  HeartHandshake, 
  Users, 
  Award, 
  ChevronDown 
} from 'lucide-react';

const sealsData = [
  {
    id: 1,
    title: "Educación Intercultural",
    icon: Globe2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    shortDesc: "Interacción horizontal y sinérgica entre culturas.",
    description: "Este concepto apunta a describir la interacción entre dos o más culturas de un modo horizontal y sinérgico, que promueve el reconocimiento, respeto y valoración de la diversidad cultural como un eje fundamental en el desarrollo integral de niños y niñas. Integra contenidos, prácticas y estrategias que favorecen la visibilización y valoración de las diferentes culturas presentes en la comunidad educativa."
  },
  {
    id: 2,
    title: "Diversidad que Enriquece",
    icon: Palette,
    color: "text-orange-600",
    bg: "bg-orange-50",
    shortDesc: "Reconoce y promueve la diversidad como recurso pedagógico.",
    description: "Asumir la diversidad en el aula implica generar ambientes de aprendizaje inclusivos, donde cada niño y niña pueda desarrollar una identidad positiva y habilidades para la convivencia. Este enfoque se basa en que cada niño aporta desde su identidad, experiencias y ritmos de desarrollo, generando un entorno donde el conocimiento se construye colectivamente."
  },
  {
    id: 3,
    title: "Ambientes Bien Tratantes",
    icon: HeartHandshake,
    color: "text-red-600",
    bg: "bg-red-50",
    shortDesc: "Espacios seguros, afectivos y respetuosos.",
    description: "Representa el compromiso con la creación de espacios de aprendizaje seguros, afectivos y respetuosos, donde las interacciones se basan en el buen trato, la empatía y el respeto mutuo. Este enfoque promueve el bienestar integral, fortaleciendo la autoestima y habilidades socioemocionales desde la primera infancia."
  },
  {
    id: 4,
    title: "Vinculación con la Familia",
    icon: Users,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    shortDesc: "Integración activa en el proceso educativo.",
    description: "Compromiso con el fortalecimiento del vínculo entre la familia y la institución a través del sistema de 'Puertas Abiertas', promoviendo su participación significativa. Este sello reconoce a la familia como el primer y principal agente educativo, cuyo involucramiento favorece el desarrollo integral."
  },
  {
    id: 5,
    title: "Liderazgo Compartido",
    icon: Award,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    shortDesc: "Construcción colectiva de la gestión institucional.",
    description: "Reconoce que hay múltiples líderes y se centra en la interacción de los participantes. Aunque el líder tenga la última palabra, la opinión de los colaboradores es tenida en cuenta, haciendo que el equipo se sienta valorado y motivado. Este enfoque fortalece las capacidades del equipo pedagógico y directivo."
  }
];

export default function SealsSection() {
  const [openId, setOpenId] = useState<number | null>(null);
  const toggleSeal = (id: number) => setOpenId(openId === id ? null : id);

  return (
    <section id="identidad" className="py-24 bg-gray-50/50 relative scroll-mt-28 md:scroll-mt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado estandarizado (Estilo Badge) */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm inline-block mb-4">
            Nuestra Identidad
          </span>
          <h2 className="text-3xl font-heading font-bold text-primary sm:text-4xl mb-4">
            Sellos Educativos "Ayenhue"
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Los pilares fundamentales que guían nuestro proyecto educativo institucional.
          </p>
        </div>

        {/* Contenedor Flexbox para centrado perfecto */}
        <div className="flex flex-wrap justify-center gap-6">
          {sealsData.map((seal) => (
            <div 
              key={seal.id}
              onClick={() => toggleSeal(seal.id)}
              className={`
                w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]
                bg-white rounded-3xl shadow-sm border border-gray-100 
                cursor-pointer transition-all duration-300 overflow-hidden group
                hover:shadow-md hover:-translate-y-1
                ${openId === seal.id ? 'ring-2 ring-secondary/20 shadow-lg' : ''}
              `}
            >
              {/* Cabecera de la Tarjeta */}
              <div className="p-8 pb-4 flex items-start justify-between gap-4">
                <div className="flex flex-col gap-4">
                  {/* Ícono con fondo de color (Estilo consistente) */}
                  <div className={`p-3.5 rounded-2xl w-fit transition-colors duration-300 ${seal.bg}`}>
                    <seal.icon className={`w-7 h-7 ${seal.color}`} />
                  </div>
                  
                  <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-primary transition-colors">
                    {seal.title}
                  </h3>
                </div>
                
                {/* Flecha animada */}
                <div className={`mt-2 text-gray-300 transition-transform duration-300 ${openId === seal.id ? 'rotate-180 text-secondary' : ''}`}>
                  <ChevronDown size={24} />
                </div>
              </div>

              {/* Contenido Expandible */}
              <div 
                className={`
                  grid transition-[grid-template-rows] duration-500 ease-in-out
                  ${openId === seal.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                `}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-8 pt-2 text-gray-600 text-base leading-relaxed">
                    <div className="border-t border-gray-100 pt-4 mt-2">
                       {seal.description}
                    </div>
                  </div>
                </div>
              </div>

              {/* Descripción corta (visible solo cuando está cerrado) */}
              <div className={`
                px-8 pb-8 pt-0 text-sm text-gray-500 font-medium
                transition-opacity duration-300
                ${openId === seal.id ? 'hidden' : 'block'}
              `}>
                {seal.shortDesc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}