import { Check, Heart, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const reasons = [
  {
    icon: Heart,
    text: "Buscas un ambiente afectivo y seguro donde tu hija e hijo sea tratado con amor y respeto.",
    color: "text-pink-500",
    bg: "bg-pink-50",
    hoverBg: "group-hover:bg-pink-100"
  },
  {
    icon: Users,
    text: "Quieres ser parte activa de la comunidad educativa y participar en el crecimiento de tu hija e hijo.",
    color: "text-primary",
    bg: "bg-blue-50",
    hoverBg: "group-hover:bg-blue-100"
  },
  {
    icon: Sparkles,
    text: "Valoras el rescate de nuestras tradiciones y la riqueza cultural de cada familia.",
    color: "text-accent",
    bg: "bg-orange-50",
    hoverBg: "group-hover:bg-orange-100"
  },
  {
    icon: Check,
    text: "Necesitas la tranquilidad de una institución con Reconocimiento Oficial y excelencia.",
    color: "text-secondary",
    bg: "bg-green-50",
    hoverBg: "group-hover:bg-green-100"
  }
];

export default function IsForYou() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in duration-700">
          <h3 className="text-lg text-muted-foreground">
            Hemos creado un espacio pensado para familias que buscan algo más que cuidado; buscan comunidad.
          </h3>
          <br></br>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
            Jardín Infantil y Sala Cuna Ayenhue es para ti si...
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="border-none shadow-sm hover:shadow-lg transition-all duration-300 bg-muted/20 group hover:-translate-y-1 cursor-default"
            >
              <CardContent className="p-8 flex items-start gap-6">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${reason.bg} ${reason.hoverBg} transition-colors duration-300`}>
                  <reason.icon className={`w-7 h-7 ${reason.color} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <p className="text-foreground font-medium text-lg leading-relaxed pt-1">
                  {reason.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
