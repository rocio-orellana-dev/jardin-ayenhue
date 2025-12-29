import { Check, Heart, Users, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  {
    icon: Heart,
    text: "Buscas un ambiente afectivo y seguro donde tu hija e hijo sea tratado con amor y respeto.",
    color: "text-rose-500",
    bg: "bg-rose-50/50",
    hoverBg: "group-hover:bg-rose-100/50"
  },
  {
    icon: Users,
    text: "Quieres ser parte activa de la comunidad educativa y participar en el crecimiento de tu hija e hijo.",
    color: "text-blue-500",
    bg: "bg-blue-50/50",
    hoverBg: "group-hover:bg-blue-100/50"
  },
  {
    icon: Sparkles,
    text: "Valoras el rescate de nuestras tradiciones y la riqueza cultural de cada familia.",
    color: "text-amber-500",
    bg: "bg-amber-50/50",
    hoverBg: "group-hover:bg-amber-100/50"
  },
  {
    icon: Check,
    text: "Necesitas la tranquilidad de una institución con Reconocimiento Oficial y excelencia.",
    color: "text-emerald-500",
    bg: "bg-emerald-50/50",
    hoverBg: "group-hover:bg-emerald-100/50"
  }
];

export default function IsForYou() {
  return (
    <section className={cn(UI.sectionY, "bg-white relative")}>
      <div className={UI.containerX}>
        <SectionHeader 
          title="Ayenhue es para ti si..." 
          subtitle="Hemos creado un espacio pensado para familias que buscan algo más que cuidado; buscan comunidad."
          className="mb-12 md:mb-20"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className={cn(
                UI.cardBase,
                "border-slate-100/50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500"
              )}
            >
              <CardContent className="p-6 md:p-8 flex items-start gap-5 md:gap-6">
                <div className={cn(
                  "w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-500",
                  reason.bg,
                  reason.hoverBg
                )}>
                  <reason.icon className={cn(
                    "w-6 h-6 md:w-7 md:h-7 transition-transform duration-500 group-hover:scale-110",
                    reason.color
                  )} />
                </div>
                <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed pt-0.5 md:pt-1">
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