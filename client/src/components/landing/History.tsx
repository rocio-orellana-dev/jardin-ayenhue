import { useMemo, useState } from "react";
import { Star, Heart, TrendingUp, Anchor, Users, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import AyenhueIcon from "./AyenhueIcon";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// --- SUB-COMPONENTE: MARCADOR DE LÍNEA ORGÁNICO (Semilla) ---
function AyenhueHistoryMarker({ icon: Icon, isActive }: { icon: any, isActive: boolean }) {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 group/marker">
      {/* Capa 1: Mancha de pintura/Semilla orgánica de fondo */}
      <svg
        viewBox="0 0 100 100"
        className={cn(
          "absolute inset-0 w-full h-full fill-current transition-all duration-700 ease-out",
          isActive ? "text-secondary opacity-25 rotate-12 scale-125" : "text-slate-100 opacity-100 rotate-0 scale-100"
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,50 C20,30 35,15 55,15 C75,15 85,35 85,55 C85,75 70,85 50,85 C30,85 20,70 20,50" />
      </svg>

      {/* Capa 2: Contenedor del icono con borde "scribble" */}
      <div className={cn(
        "relative z-10 w-12 h-12 flex items-center justify-center bg-white rounded-[1.2rem] shadow-sm transition-all duration-500",
        "border-2",
        isActive ? "border-secondary scale-110" : "border-slate-100"
      )}>
        <Icon className={cn("w-6 h-6 transition-colors", isActive ? "text-secondary" : "text-slate-400")} />
        
        {/* Simbolismo Kultrun: Puntos en el marcador */}
        <div className="absolute -top-1 -right-1 flex gap-0.5">
          <div className={cn("w-1.5 h-1.5 rounded-full", isActive ? "bg-secondary" : "bg-slate-200")} />
        </div>
      </div>
    </div>
  );
}

// ... (Tipos e Imports de imágenes se mantienen iguales para no romper tu código)
import img1992a from "@assets/generated_images/hero_image_2.png";
import img2008a from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import img2009a from "@assets/generated_images/hero_image_2.png";
import img2022a from "@assets/generated_images/hero_image_3.png";
import img2023a from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";

type MilestoneId = "1992" | "2008" | "2009" | "2022" | "2023";

export default function History() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<MilestoneId | null>(null);

  const milestones = useMemo(() => [
    { id: "1992", year: "1992", title: "Nuestros Inicios", description: "Comenzamos como un pequeño Jardín Familiar, sembrando las primeras semillas de educación.", icon: Star },
    { id: "2008", year: "2008", title: "Inicio VTF", description: "Nos transformamos en Jardín Infantil VTF, profesionalizando nuestra gestión.", icon: TrendingUp },
    { id: "2009", year: "2009", title: "Nace Ayenhue", description: "La comunidad elige nuestro nombre: Ayenhue (Lugar de Alegría), identidad mapuche.", icon: Heart },
    { id: "2022", year: "2022", title: "Reconocimiento Oficial", description: "Certificación de calidad del Estado (MINEDUC), un sello de confianza.", icon: Anchor },
    { id: "2023", year: "2023", title: "Resiliencia Comunitaria", description: "Tras la inundación, nos levantamos con fuerza gracias al apoyo incondicional.", icon: Users },
  ], []);

  const details = useMemo(() => ({
    "1992": { title: "1992 — Nuestros Inicios", subtitle: "Historia construida con cariño.", bullets: ["Primeros espacios de aprendizaje.", "Vínculo temprano con familias."], images: [{ src: img1992a, alt: "Inicios" }] },
    "2008": { title: "2008 — Inicio VTF", subtitle: "Crecimos en cobertura.", bullets: ["Profesionalización de gestión.", "Ampliación de atención."], images: [{ src: img2008a, alt: "VTF" }] },
    "2009": { title: "2009 — Nace Ayenhue", subtitle: "Identidad y pertenencia.", bullets: ["Elección del nombre Ayenhue.", "Sello intercultural Mapuche."], images: [{ src: img2009a, alt: "Ayenhue" }] },
    "2022": { title: "2022 — Reconocimiento Oficial", subtitle: "Compromiso con la calidad.", bullets: ["Certificación MINEDUC.", "Foco en bienestar."], images: [{ src: img2022a, alt: "Certificación" }] },
    "2023": { title: "2023 — Resiliencia", subtitle: "Nos levantamos juntos.", bullets: ["Apoyo tras inundación.", "Reconstrucción colaborativa."], images: [{ src: img2023a, alt: "Resiliencia" }] },
  }), []);

  const active = activeId ? (details as any)[activeId] : null;

  return (
    <section id="historia" className={cn(UI.sectionY, "bg-white")}>
      <div className={UI.containerX}>
        <SectionHeader kicker="Nuestra Trayectoria" title="Una historia de compromiso" />

        <div className="relative max-w-5xl mx-auto mt-24">
          {/* LÍNEA DE TIEMPO: Ahora con estilo punteado tipo "costura" artesanal */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-px border-l-2 border-dashed border-slate-200" />

          <div className="space-y-20">
            {milestones.map((milestone, index) => {
              const reverse = index % 2 === 0;
              const isActive = activeId === milestone.id;

              return (
                <button
                  key={milestone.id}
                  onClick={() => { setActiveId(milestone.id as MilestoneId); setOpen(true); }}
                  className={cn(
                    "w-full flex flex-col md:flex-row items-start md:items-center gap-8 relative group outline-none",
                    reverse ? "md:flex-row-reverse" : ""
                  )}
                >
                  <div className="pl-16 md:pl-0 w-full md:w-1/2 md:px-12">
                    <div className={cn(
                      UI.cardBase, 
                      "p-8 transition-all duration-500",
                      isActive ? "border-secondary/30 shadow-lg scale-[1.02]" : "border-slate-50 group-hover:border-slate-200",
                      reverse ? "md:text-left" : "md:text-right"
                    )}>
                      <span className="text-secondary font-bold text-2xl block mb-2 font-heading">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{milestone.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{milestone.description}</p>
                      <div className={cn("mt-4 flex", !reverse ? "md:justify-end" : "justify-start")}>
                        <span className="text-[10px] font-black text-secondary uppercase tracking-[0.2em] group-hover:text-primary transition-colors">
                          Ver historia →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* REEMPLAZO: Marcador de Semilla Orgánica en el eje central */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 z-20">
                    <AyenhueHistoryMarker icon={milestone.icon} isActive={isActive} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DIÁLOGOS Y CIERRE (Sin cambios para mantener funcionalidad) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl rounded-[2.5rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-primary text-3xl font-heading font-extrabold">{active?.title}</DialogTitle>
              <p className="text-slate-500 italic mt-2">{active?.subtitle}</p>
            </DialogHeader>
            <div className="grid gap-4">
              {active?.bullets.map((b: string, i: number) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 text-sm font-medium">
                  {b}
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-end">
              <Button onClick={() => setOpen(false)} className="rounded-full bg-primary font-bold px-8">Cerrar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}