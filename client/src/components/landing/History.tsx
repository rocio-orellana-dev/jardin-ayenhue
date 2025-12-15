import { Calendar, Star, Heart, TrendingUp, Anchor, Users } from "lucide-react";

const milestones = [
  {
    year: "1992",
    title: "Nuestros Inicios",
    description: "Comenzamos como un pequeño Jardín Familiar, sembrando las primeras semillas de educación en la comunidad.",
    icon: Star,
  },
  {
    year: "2008",
    title: "Inicio VTF",
    description: "Nos transformamos en Jardín Infantil VTF, ampliando cobertura y profesionalizando nuestra gestión.",
    icon: TrendingUp,
  },
  {
    year: "2009",
    title: "Nace el Jardín Infantil y Sala Cuna Ayenhue",
    description: "La comunidad elige nuestro nombre: Ayenhue (Lugar de Alegría), reflejando nuestra identidad mapuche.",
    icon: Heart,
  },
  {
    year: "2022",
    title: "Reconocimiento Oficial",
    description: "Certificación de calidad del Estado (MINEDUC), un sello de confianza para nuestras familias.",
    icon: Anchor,
  },
  {
    year: "2023",
    title: "Resiliencia Comunitaria",
    description: "Tras la inundación, nos levantamos con fuerza gracias al apoyo incondicional de toda la comunidad.",
    icon: Users,
  },
];

export default function History() {
  return (
    <section id="historia" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-20 animate-in fade-in duration-700">
          <span className="text-primary/60 font-bold tracking-wider uppercase text-sm">
            Nuestra Trayectoria
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-3">
            Una historia de compromiso
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Animated Vertical Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-linear-to-b from-primary/5 via-primary/20 to-primary/5 rounded-full overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1/3 bg-linear-to-b from-transparent via-secondary/50 to-transparent animate-wave" style={{ animationDuration: '3s', animationDirection: 'normal', height: '100%' }}></div>
          </div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} animate-in slide-in-from-bottom-8 fade-in duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                
                {/* Content Box */}
                <div className="pl-12 md:pl-0 w-full md:w-1/2 md:px-12 group">
                  <div className={`bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg hover:border-secondary/20 transition-all duration-500 hover:-translate-y-1 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="text-secondary font-bold text-2xl block mb-2 font-heading group-hover:scale-105 origin-left md:origin-right transition-transform duration-300">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-primary mb-3">{milestone.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-base group-hover:text-foreground transition-colors">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white border-4 border-secondary shadow-md z-10 mt-1.5 md:mt-0 transition-transform duration-500 hover:scale-125">
                  <div className="w-2.5 h-2.5 bg-secondary rounded-full animate-pulse"></div>
                </div>

                {/* Spacer for alignment */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
