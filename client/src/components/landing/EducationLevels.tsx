import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Users, Puzzle, ToyBrick } from "lucide-react";

const levels = [
  {
    name: "Sala Cuna Menor",
    age: "84 días a 1 año",
    description: "Ambiente cálido y seguro diseñado para el desarrollo sensorial y el apego seguro.",
    icon: Baby,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Sala Cuna Mayor",
    age: "1 a 2 años",
    description: "Fomentamos los primeros pasos y el lenguaje a través de la exploración constante.",
    icon: Users,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    name: "Nivel Medio Menor",
    age: "2 a 3 años",
    description: "Potenciamos la autonomía y la socialización mediante el juego colaborativo.",
    icon: Puzzle,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    name: "Nivel Medio Mayor",
    age: "3 a 4 años",
    description: "Preparación integral enfocada en la curiosidad, el pensamiento lógico y la identidad.",
    icon: ToyBrick,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

export default function EducationLevels() {
  return (
    <section id="niveles" className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo sutil consistente con MissionVision.tsx */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="border-secondary text-primary font-bold px-4 py-1 uppercase tracking-wider text-xs mb-4">
            Niveles Educativos
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
            Un espacio para cada etapa
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nuestros programas están adaptados al ritmo de crecimiento de cada niño, 
            garantizando un aprendizaje significativo y respetuoso.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {levels.map((level, index) => (
            <Card 
              key={index}
              className="border-none shadow-sm hover:shadow-xl transition-all duration-300 group rounded-[2.5rem] bg-slate-50/50 hover:bg-white overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                {/* Icono con el estilo de SealsSection.tsx */}
                <div className={`w-16 h-16 rounded-2xl ${level.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <level.icon className={`w-8 h-8 ${level.color}`} />
                </div>

                <Badge className="bg-white text-primary border-slate-200 mb-4 shadow-sm">
                  {level.age}
                </Badge>

                <h3 className="text-xl font-bold text-primary mb-3">
                  {level.name}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {level.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}