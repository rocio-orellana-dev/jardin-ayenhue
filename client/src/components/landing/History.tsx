import { useMemo, useState } from "react";
import { Star, Heart, TrendingUp, Anchor, Users, Sparkles, Medal, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type MilestoneId = "1992" | "2008" | "2009" | "2022" | "2023" | "2024" | "2025";

export default function History() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<MilestoneId | null>(null);

  const milestones = useMemo(() => [
    { id: "1992", year: "1992", title: "Un origen con sentido", icon: Star },
    { id: "2008", year: "2008", title: "Crecer para entregar más", icon: TrendingUp },
    { id: "2009", year: "2009", title: "Aprender desde la identidad", icon: Heart },
    { id: "2022", year: "2022", title: "Espacios seguros para crecer", icon: Anchor },
    { id: "2023", year: "2023", title: "Educación que sostiene", icon: Users },
    { id: "2024", year: "2024", title: "Un nuevo comienzo", icon: Sparkles },
    { id: "2025", year: "2025", title: "Reconocimiento a la excelencia", icon: Medal },
  ], []);

  const details = useMemo(() => ({
    "1992": {
      subtitle: "Compromiso con la mujer trabajadora",
      bullets: [
        "Nace para acompañar a las familias ante la incorporación de la mujer al mundo laboral.",
        "Espacio educativo centrado 100% en el cuidado, el afecto y el desarrollo integral.",
        "Atención especializada desde la primera infancia."
      ]
    },
    "2008": {
      subtitle: "Fortalecimiento institucional",
      bullets: [
        "Ampliación de la cobertura de atención y gestión de mayores recursos.",
        "Aumento de la dotación de funcionarias y mejoramiento de espacios educativos.",
        "Implementación de proyectos pedagógicos basados en intereses y ritmos infantiles."
      ]
    },
    "2009": {
      subtitle: "Lugar de Alegría (Ayenhue)",
      bullets: [
        "Consolidación de educación intercultural Mapuche desde sala cuna.",
        "Valoración de la diversidad cultural de todas nuestras familias.",
        "Fomento del sentido de pertenencia y respeto por la identidad."
      ]
    },
    "2022": {
      subtitle: "Certificación y Seguridad",
      bullets: [
        "Mejoras integrales para cumplir con la normativa de la Superintendencia.",
        "Creación de entornos seguros, libres y adecuados para el desarrollo.",
        "Reafirmación de un trabajo pedagógico de alta calidad técnica."
      ]
    },
    "2023": {
      subtitle: "Resiliencia Comunitaria",
      bullets: [
        "Apoyo directo a familias y funcionarias damnificadas por la catástrofe.",
        "Respuesta inmediata en necesidades básicas y contención emocional.",
        "Visitas domiciliarias para velar por el bienestar integral de cada niño."
      ]
    },
    "2024": {
      subtitle: "Esperanza y Solidaridad",
      bullets: [
        "Reencuentro mágico gracias a la Ilustre Municipalidad de Coltauco.",
        "Alianza estratégica con Desafío Levantemos Chile y Fundación Luksic.",
        "Instalación de un nuevo jardín infantil con altos estándares normativos."
      ]
    },
    "2025": {
      subtitle: "Liderazgo en Calidad",
      bullets: [
        "Primer jardín regional seleccionado para evaluación de la Agencia de Calidad.",
        "Revisión exhaustiva logrando resultados excelentes en todas las dimensiones.",
        "Trayectoria validada por estándares indicativos de desempeño institucional."
      ]
    }
  }), []);

  const active = activeId ? (details as any)[activeId] : null;
  const activeMilestone = milestones.find(m => m.id === activeId);

  // Extraemos el icono en una constante con Mayúscula para que React lo reconozca como componente
  const IconComponent = activeMilestone?.icon;

  return (
    <section id="historia" className={cn(UI.sectionY, "bg-white-50/50")}>
      <div className={UI.containerX}>
        <SectionHeader kicker="Nuestra Trayectoria" title="Un camino construido con amor y vocación" />

        <div className="relative max-w-3xl mx-auto mt-16">
          {/* Línea de tiempo Minimalista */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 h-full w-px bg-slate-200" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={milestone.id} className={cn("relative flex items-center justify-between flex-col md:flex-row", isEven ? "md:flex-row-reverse" : "")}>
                  <div className="hidden md:block w-[45%]" />
                  
                  {/* Icono Conector */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 w-4 h-4 rounded-full bg-white border-4 border-secondary shadow-sm" />

                  {/* Tarjeta Visualmente Limpia */}
                  <div className="w-full md:w-[45%] pl-14 md:pl-0">
                    <button
                      onClick={() => { setActiveId(milestone.id as MilestoneId); setOpen(true); }}
                      className="group w-full p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-secondary/20 transition-all text-left"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-secondary font-black text-lg">{milestone.year}</span>
                        <div className="h-px flex-1 bg-slate-100 group-hover:bg-secondary/10 transition-colors" />
                      </div>
                      <h3 className="text-slate-800 font-bold text-base leading-tight group-hover:text-primary transition-colors">
                        {milestone.title}
                      </h3>
                      <p className="mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-secondary">
                        Ver historia completa →
                      </p>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DIÁLOGO: Corregido con validación de existencia */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl rounded-4xl p-0 overflow-hidden border-none shadow-2xl">
          {activeMilestone && active ? (
            <>
              <div className="bg-primary p-12 text-center relative">
                {/* Adorno sutil de fondo */}
                <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
                   {IconComponent && <IconComponent className="w-40 h-40 text-white" />}
                </div>
                
                <div className="relative z-10">
                  <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-bold mb-4 backdrop-blur-sm">
                    Hito Histórico — {activeMilestone.year}
                  </span>
                  <DialogTitle className="text-white text-3xl font-heading font-extrabold leading-tight">
                    {activeMilestone.title}
                  </DialogTitle>
                  <p className="text-primary-foreground/80 mt-2 font-medium italic">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <div className="p-10 bg-white">
                <h4 className="text-slate-900 font-bold text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary" /> Logros y Acciones
                </h4>
                
                <div className="space-y-4">
                  {active.bullets.map((bullet: string, i: number) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {bullet}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-10 pt-6 border-t border-slate-50 flex justify-center">
                  <Button 
                    onClick={() => setOpen(false)} 
                    className="rounded-full bg-slate-900 hover:bg-slate-800 text-white px-10 h-12 font-bold transition-all shadow-lg"
                  >
                    Cerrar Detalle
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-10 text-center text-slate-400">Seleccionando hito...</div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}