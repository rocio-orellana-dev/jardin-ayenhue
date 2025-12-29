import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Eye, Leaf, Users, Star, Image as ImageIcon, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// --- COMPONENTE: IMAGEN CON CARGA INTELIGENTE ---
function OptimizedImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-slate-100", className)}>
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-slate-200" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-all duration-700",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
      />
    </div>
  );
}

// --- UTILIDAD: YOUTUBE ---
const parseYouTube = (url: string) => {
  if (!url) return { id: null, thumb: null };
  const match = url.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const id = match ? match[1] : null;
  return { id, thumb: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null };
};

type Topic = "vida" | "excelencia" | null;

import placeholder1 from "@assets/generated_images/hero_image_2.png";
import placeholder2 from "@assets/generated_images/hero_image_3.png";
import placeholder3 from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import placeholder4 from "@assets/generated_images/hero_image_2.png";

export default function MissionVision() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>(null);

  const content = useMemo(() => ({
    vida: {
      title: "Vida Saludable",
      subtitle: "Hábitos, movimiento y bienestar desde la primera infancia.",
      youtube: "https://www.youtube.com/watch?v=8xfUTfw-akg",
      items: [
        { title: "Circuitos psicomotrices", desc: "Juegos y circuitos para fortalecer coordinación, equilibrio y motricidad, adaptados a cada nivel.", mediaType: "image" as const, mediaSrc: placeholder1, mediaAlt: "Psicomotricidad" },
        { title: "Huerto / naturaleza", desc: "Experiencias al aire libre: sembrar, cuidar plantas y explorar el entorno para aprender con sentido.", mediaType: "image" as const, mediaSrc: placeholder2, mediaAlt: "Huerto" },
        { title: "Taller de alimentación", desc: "Promoción de hábitos saludables con apoyo a familias: hidratación, variedad y educación alimentaria.", mediaType: "image" as const, mediaSrc: placeholder3, mediaAlt: "Alimentación" },
        { title: "Rutinas de autocuidado", desc: "Prácticas simples: higiene, pausas de calma, respiración y reconocimiento emocional.", mediaType: "image" as const, mediaSrc: placeholder4, mediaAlt: "Autocuidado" },
      ],
    },
    excelencia: {
      title: "Excelencia",
      subtitle: "Calidad educativa con mejora continua y comunidad activa.",
      youtube: "https://www.youtube.com/watch?v=Ccq5V_avV9U",
      items: [
        { title: "Proyectos pedagógicos", desc: "Aprendizajes significativos basados en el juego y experiencias guiadas, con foco en el desarrollo integral.", mediaType: "text" as const },
        { title: "Trabajo con familias", desc: "Actividades y comunicación cercana para fortalecer el proceso educativo y construir comunidad.", mediaType: "image" as const, mediaSrc: placeholder2, mediaAlt: "Familias" },
        { title: "Actividades interculturales", desc: "Acciones que promueven respeto, diversidad e identidad cultural (incluida la cultura Mapuche).", mediaType: "image" as const, mediaSrc: placeholder3, mediaAlt: "Interculturalidad" },
        { title: "Evaluación formativa", desc: "Observación y retroalimentación respetuosa para potenciar avances y fortalecer autoestima.", mediaType: "text" as const },
      ],
    }
  }), []);

  const active = topic ? content[topic] : null;

  return (
    <section className={cn("bg-white relative overflow-hidden", UI.sectionY)}>
      <div className={UI.containerX}>
        <SectionHeader kicker="Nuestra Esencia" title="Misión y Visión" subtitle="La brújula que guía cada paso en el Jardín Infantil Ayenhue: educar con amor, respeto y diversidad." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* MISIÓN COMPLETA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className={cn(UI.cardBase, "flex flex-col border-t-8 border-t-primary")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-[2rem] bg-primary/10 text-primary shadow-sm"><HeartHandshake size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Misión</h3>
                </div>
                <div className="text-slate-600 leading-relaxed space-y-6 text-lg flex-1">
                  <p>Proporcionar a los niños y niñas una <span className="font-black text-primary">educación de calidad</span>, equitativa e inclusiva, garantizando igualdad de oportunidades en cada rincón de nuestra comuna.</p>
                  <p>Entregamos herramientas para el desarrollo integral a través de un rol protagónico del niño. Privilegiamos el juego y el buen trato.</p>
                  <div className="bg-orange-50 p-6 rounded-[2.5rem] border border-orange-100 flex gap-4 mt-4 shadow-sm">
                    <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                    <p className="text-sm text-slate-700 italic font-medium">Fomentamos el amor por las diversidades culturales, principalmente la <span className="font-bold text-orange-700 uppercase">etnia Mapuche</span>, integrando la riqueza de familias migrantes.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* VISIÓN COMPLETA */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className={cn(UI.cardBase, "flex flex-col border-t-8 border-t-secondary")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-[2rem] bg-secondary/10 text-primary shadow-sm"><Eye size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Visión</h3>
                </div>
                <div className="text-slate-600 leading-relaxed space-y-6 text-lg flex-1">
                  <p>Ser reconocidos como un espacio educativo que logra <span className="font-black text-primary">trascender en la vida</span> de los niños a través de prácticas pedagógicas innovadoras.</p>
                  <p>Buscamos formar personas autónomas, con una <span className="font-bold text-slate-800">autoestima positiva</span>, capaces de opinar libremente en su entorno social.</p>
                  <p className="text-base text-slate-500">Aspiramos a una comunidad que respeta la interculturalidad y los estilos de vida saludable.</p>
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    <button onClick={() => { setTopic("vida"); setOpen(true); }} className="bg-sky-50 p-5 rounded-[2rem] text-center border border-sky-100 hover:bg-sky-100 transition-all group/btn shadow-sm">
                      <Leaf className="w-8 h-8 text-sky-600 mx-auto mb-2 transition-transform group-hover/btn:scale-110" />
                      <span className="text-[10px] font-black text-sky-800 uppercase tracking-widest">Vida Saludable</span>
                    </button>
                    <button onClick={() => { setTopic("excelencia"); setOpen(true); }} className="bg-purple-50 p-5 rounded-[2rem] text-center border border-purple-100 hover:bg-purple-100 transition-all group/btn shadow-sm">
                      <Star className="w-8 h-8 text-purple-600 mx-auto mb-2 transition-transform group-hover/btn:scale-110" />
                      <span className="text-[10px] font-black text-purple-800 uppercase tracking-widest">Excelencia</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* DIALOG OPTIMIZADO */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="max-h-[85vh] overflow-y-auto overscroll-contain bg-white">
            <div className="p-8 md:p-12">
              <DialogHeader className="mb-10">
                <DialogTitle className="text-primary text-4xl font-black font-heading leading-tight">{active?.title}</DialogTitle>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-3">{active?.subtitle}</p>
              </DialogHeader>

              {active && (
                <div className="space-y-10">
                  {/* VIDEO YOUTUBE */}
                  {(() => {
                    const { id, thumb } = parseYouTube(active.youtube);
                    if (!id || !thumb) return null;
                    return (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 relative group aspect-video">
                        <img src={thumb} alt="Video" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <a href={active.youtube} target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-transform flex items-center gap-3">
                            ▶ REPRODUCIR VIDEO
                          </a>
                        </div>
                      </div>
                    );
                  })()}

                  {/* LISTA DE ITEMS RECUPERADA COMPLETA */}
                  <div className="grid gap-4">
                    {active.items.map((it, idx) => (
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} key={idx} className="p-6 rounded-[2rem] border border-slate-50 bg-slate-50/50 flex items-center gap-6">
                        <div className="flex-1">
                          <h4 className="font-black text-slate-800 text-base mb-1 tracking-tight">{it.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">{it.desc}</p>
                        </div>
                        {it.mediaType === "image" && it.mediaSrc ? (
                          <OptimizedImage src={it.mediaSrc} alt={it.title} className="w-24 h-24 rounded-[1.5rem] shadow-sm shrink-0 border-2 border-white" />
                        ) : (
                          <div className="w-24 h-24 rounded-[1.5rem] bg-white flex items-center justify-center text-slate-200 border border-slate-100 shrink-0"><ImageIcon size={32} /></div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}