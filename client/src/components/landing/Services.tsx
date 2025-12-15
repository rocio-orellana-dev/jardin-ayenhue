import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Music, Palette, Leaf, ShieldCheck, UserCheck, Utensils } from "lucide-react";
import { 
  Globe2, 
  HeartHandshake, 
  BookOpenCheck, 
  Network,
  SmilePlus,
  Users
} from "lucide-react";

const services = [
  {
    title: "Educación Integral",
    description: "Fomentamos el desarrollo cognitivo, emocional y social a través del juego y la exploración.",
    icon: UserCheck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
  },
  {
    title: "Arte y Creatividad",
    description: "Espacios dedicados a la pintura, música y expresión artística libre.",
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
  },
  {
    title: "Entorno Natural",
    description: "Contacto con la naturaleza y respeto por el medio ambiente desde la primera infancia.",
    icon: Leaf,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "group-hover:border-green-200",
  },
  {
    title: "Seguridad y Bienestar",
    description: "Infraestructura segura y protocolos rigurosos para la tranquilidad de las familias.",
    icon: ShieldCheck,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "group-hover:border-red-200",
  },
  {
    title: "Alimentación Saludable",
    description: "Programa de alimentación balanceada supervisado por profesionales.",
    icon: Utensils,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "group-hover:border-orange-200",
  },
  {
    title: "Música y Movimiento",
    description: "Desarrollo psicomotor a través del baile, canciones y juegos rítmicos.",
    icon: Music,
    color: "text-pink-600",
    bg: "bg-pink-50",
    border: "group-hover:border-pink-200",
  },
  {
    title: "Tradiciones Locales",
    description: "Integramos los saberes y la cultura de las familias en cada experiencia educativa.",
    icon: Globe2,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "group-hover:border-secondary/30"
  },
  {
    title: "Trabajo en Redes",
    description: "Colaboramos activamente con salud, escuelas y organizaciones de Coltauco.",
    icon: Network,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/30"
  },
  {
    title: "Educación Intercultural",
    description: "Un sello que promueve el respeto y valoración de la diversidad desde la cuna.",
    icon: Users,
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    border: "group-hover:border-tertiary/30"
  },
  {
    title: "Buen Trato",
    description: "Priorizamos vínculos afectivos seguros, basados en el respeto y la empatía.",
    icon: HeartHandshake,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "group-hover:border-secondary/30"
  },
  {
    title: "Convivencia Educativa",
    description: "Ambientes armónicos donde resolvemos conflictos con diálogo y cariño.",
    icon: SmilePlus,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "group-hover:border-primary/30"
  },
  {
    title: "Seguridad Escolar",
    description: "Espacios certificados y protocolos rigurosos para la tranquilidad familiar.",
    icon: ShieldCheck,
    color: "text-red-600",
    bg: "bg-red-50",
    border: "group-hover:border-red-200"
  },
  {
    title: "Fomento Lector",
    description: "Despertamos la imaginación y el lenguaje a través de la magia de los cuentos.",
    icon: BookOpenCheck,
    color: "text-tertiary",
    bg: "bg-tertiary/10",
    border: "group-hover:border-tertiary/30"
  },
  {
    title: "Medio Ambiente",
    description: "Aprendemos a amar y cuidar nuestra naturaleza desde pequeños.",
    icon: Leaf,
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "group-hover:border-secondary/30"
  },

];
function ServiceCard({ service, index }: { service: any; index?: number }) {
  return (
    <Card
      className={`border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white rounded-3xl overflow-hidden cursor-default ${service.border} animate-in fade-in slide-in-from-bottom-4`}
      style={index !== undefined ? { animationDelay: `${index * 100}ms` } : undefined}
    >
      <CardHeader className="pb-2 pt-8 px-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <service.icon className={`w-7 h-7 ${service.color}`} />
        </div>
        <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight relative">
          {service.title}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-12 mt-1 block"></span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/80 transition-colors">
          {service.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

export default function Services() {
  return (
    <section id="propuesta" className="py-24 bg-muted/40 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-[0.03] pointer-events-none text-primary"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-8 duration-700">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-white px-4 py-2 rounded-full shadow-sm border border-secondary/20 inline-block mb-4">
            Nuestra Propuesta Pedagógica
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
            Aprendizaje con sentido y valores
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuestra metodología pone al niño y la niña al centro, rodeados de una comunidad que cuida, enseña y respeta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`border border-transparent shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white rounded-3xl overflow-hidden cursor-default ${service.border} animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2 pt-8 px-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${service.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <service.icon className={`w-7 h-7 ${service.color}`} />
                </div>
                <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight relative">
                  {service.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary transition-all duration-500 group-hover:w-12 mt-1 block"></span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-8 pb-8">
                <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/80 transition-colors">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
