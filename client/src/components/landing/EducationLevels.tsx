import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Baby, Users, Puzzle, ToyBrick } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

const levels = [
  {
    name: "Sala Cuna Heterogénea",
    age: "84 días a 2 años",
    description: "Ambiente cálido y seguro diseñado para el desarrollo sensorial y el apego seguro.",
    icon: Baby,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    name: "Nivel Medio Heterogéneo",
    age: "2 a 4 años",
    description: "Potenciamos la autonomía y la socialización mediante el juego colaborativo.",
    icon: Puzzle,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
];

export default function EducationLevels() {
  return (
    <section id="niveles" className={cn(UI.sectionY, "bg-white")}>
      
      <div className={UI.containerX}>
        <SectionHeader 
          kicker="Niveles Educativos"
          title="Un espacio para cada etapa"
          subtitle="Nuestros programas están adaptados al ritmo de crecimiento de cada niño, garantizando un aprendizaje significativo y respetuoso."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto justify-items-center">
          {levels.map((level, index) => (
            <Card 
              key={index}
              className={cn(UI.cardBase, "bg-slate-50/50 hover:bg-white border-none")}
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300", level.bg)}>
                  <level.icon className={cn("w-8 h-8", level.color)} />
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