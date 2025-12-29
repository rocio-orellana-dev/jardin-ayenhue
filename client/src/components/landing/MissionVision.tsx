import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Eye, Leaf, Star, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
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
        src={src} alt={alt} loading="lazy" onLoad={() => setIsLoaded(true)}
        className={cn("w-full h-full object-cover transition-all duration-700", isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105")}
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

// Placeholders (Se mantienen igual)
import placeholder1 from "@assets/generated_images/hero_image_2.png";
import placeholder2 from "@assets/generated_images/hero_image_3.png";
import placeholder3 from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";

export default function MissionVision() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>(null);

  const content = useMemo(() => ({
    vida: {
      title: "Vida Saludable",
      subtitle: "Hábitos, movimiento y bienestar desde la primera infancia.",
      youtube: "https://www.youtube.com/watch?v=8xfUTfw-akg",
      items: [
        { title: "Circuitos psicomotrices", desc: "Juegos y circuitos para fortalecer coordinación, equilibrio y motricidad.", mediaType: "image" as const, mediaSrc: placeholder1, mediaAlt: "Psicomotricidad" },
        { title: "Huerto / naturaleza", desc: "Experiencias al aire libre: sembrar, cuidar plantas y explorar el entorno.", mediaType: "image" as const, mediaSrc: placeholder2, mediaAlt: "Huerto" },
        { title: "Taller de alimentación", desc: "Promoción de hábitos saludables con apoyo a familias.", mediaType: "image" as const, mediaSrc: placeholder3, mediaAlt: "Alimentación" },
      ],
    },
    excelencia: {
      title: "Excelencia",
      subtitle: "Calidad educativa con mejora continua y comunidad activa.",
      youtube: "https://www.youtube.com/watch?v=Ccq5V_avV9U",
      items: [
        { title: "Proyectos pedagógicos", desc: "Aprendizajes significativos basados en el juego y experiencias guiadas.", mediaType: "text" as const },
        { title: "Trabajo con familias", desc: "Comunicación cercana para fortalecer el proceso educativo.", mediaType: "image" as const, mediaSrc: placeholder2, mediaAlt: "Familias" },
      ],
    }
  }), []);

  const active = topic ? content[topic] : null;

  return (
    <section className={cn("bg-white relative overflow-hidden", UI.sectionY)}>
      <div className={UI.containerX}>
        <SectionHeader kicker="Nuestra Esencia" title="Misión y Visión" subtitle="La brújula que guía cada paso en el Jardín Infantil Ayenhue." />

        {/* El grid con 'items-stretch' garantiza que las tarjetas tengan la misma altura */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch mt-12">
          
          {/* --- TARJETA MISIÓN --- */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="h-full flex">
            <Card className={cn(UI.cardBase, "flex flex-col w-full border-t-8 border-t-primary shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col h-full bg-slate-50/20">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-[2rem] bg-primary/10 text-primary shadow-sm"><HeartHandshake size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Misión</h3>
                </div>
                
                {/* Texto completo de Misión sin el bloque de familias migrantes al final */}
                <div className="text-slate-600 leading-relaxed space-y-6 text-lg flex-grow">
                  <p className="text-pretty">Proporcionar a los niños y niñas una educación de calidad, que llegue a todos los lugares y estratos sociales de cada habitante de esta comuna, en igualdad de oportunidades. Que se caracterice por entregar las herramientas necesarias para el desarrollo integral de los niños/as, potenciando estrategias favorables que fortalezcan sus capacidades, habilidades y destrezas, que les propicien aprendizajes relevantes y significativos a través de un rol protagónico durante todo el proceso pedagógico en función del bienestar, desarrollo pleno y trascendencia como sujetos de derechos que le permitan desenvolverse dentro de un contexto social, a través de una participación plena, acorde a sus posibilidades, características personales y singulares, donde se privilegie el juego, buen trato, afectividad, inclusión, estilos de vida saludable, estrecha participación y relación con las familias, fomentando el amor y respeto por las diversidades culturales principalmente la etnia Mapuche, Logrando un proceso enriquecido interculturalmente aportado por las diversas familias que componen nuestro Jardín Infantil (haitianas, venezolana, boliviana, colombianas, entre otros).</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- TARJETA VISIÓN --- */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-full flex">
            <Card className={cn(UI.cardBase, "flex flex-col w-full border-t-8 border-t-secondary shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col h-full bg-slate-50/20">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-[2rem] bg-secondary/10 text-primary shadow-sm"><Eye size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Visión</h3>
                </div>
                
                <div className="text-slate-600 leading-relaxed space-y-6 text-lg flex-grow">
                  <p className="text-pretty">El Jardín Infantil y Sala Cuna “Ayenhue” tiene como visión trascender en los niños y niñas a través de las prácticas pedagógicas logrando potenciar en ellos/as los valores, sus capacidades, habilidades y destrezas que les permitan relacionarse, desenvolverse de forma autónoma, con una autoestima positiva reconociéndose a sí mismo como una persona capaz de compartir y respetar las diversidades culturales e interculturalidad, con una conciencia clara de estilos de vida saludable, logrando expresar sus opiniones, desarrollándose integralmente en el medio social y cultural en que está inserto.</p>
                </div>

                {/* Los botones se anclan al final de la tarjeta para coincidir visualmente con la Misión */}
                <div className="grid grid-cols-2 gap-4 pt-8 mt-auto border-t border-slate-100/50">
                  <button 
                    onClick={() => { setTopic("vida"); setOpen(true); }} 
                    className="group/btn relative overflow-hidden bg-sky-400/10 backdrop-blur-md p-5 rounded-[2rem] text-center border border-sky-200/50 hover:bg-sky-400/20 transition-all duration-300 shadow-sm flex flex-col items-center"
                  >
                    <Leaf className="w-8 h-8 text-sky-600 mb-2 transition-transform duration-500 group-hover/btn:scale-110" />
                    <span className="text-[10px] font-black text-sky-800 uppercase tracking-widest">Vida Saludable</span>
                  </button>
                  
                  <button 
                    onClick={() => { setTopic("excelencia"); setOpen(true); }} 
                    className="group/btn relative overflow-hidden bg-purple-400/10 backdrop-blur-md p-5 rounded-[2rem] text-center border border-purple-200/50 hover:bg-purple-400/20 transition-all duration-300 shadow-sm flex flex-col items-center"
                  >
                    <Star className="w-8 h-8 text-purple-600 mb-2 transition-transform duration-500 group-hover/btn:scale-110" />
                    <span className="text-[10px] font-black text-purple-800 uppercase tracking-widest">Excelencia</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* DIALOG (Mismo funcionamiento optimizado) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl rounded-[3rem] p-0 overflow-hidden border-none shadow-2xl">
          <div className="max-h-[85vh] overflow-y-auto bg-white">
            <div className="p-8 md:p-12">
              <DialogHeader className="mb-10">
                <DialogTitle className="text-primary text-4xl font-black font-heading leading-tight">{active?.title}</DialogTitle>
                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-3">{active?.subtitle}</p>
              </DialogHeader>

              {active && (
                <div className="space-y-10">
                  {(() => {
                    const { id, thumb } = parseYouTube(active.youtube);
                    if (!id || !thumb) return null;
                    return (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-50 relative group aspect-video">
                        <img src={thumb} alt="Video" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <a href={active.youtube} target="_blank" rel="noopener noreferrer" className="bg-white text-primary px-8 py-4 rounded-full font-black shadow-2xl hover:scale-110 transition-transform flex items-center gap-3">
                            ▶ VER VIDEO
                          </a>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid gap-4">
                    {active.items.map((it, idx) => (
                      <div key={idx} className="p-6 rounded-[2rem] border border-slate-50 bg-slate-50/50 flex items-center gap-6">
                        <div className="flex-1">
                          <h4 className="font-black text-slate-800 text-base mb-1 tracking-tight">{it.title}</h4>
                          <p className="text-sm text-slate-500 leading-relaxed font-medium">{it.desc}</p>
                        </div>
                        {it.mediaType === "image" && it.mediaSrc ? (
                          <OptimizedImage src={it.mediaSrc} alt={it.title} className="w-24 h-24 rounded-[1.5rem] shadow-sm shrink-0 border-2 border-white" />
                        ) : (
                          <div className="w-24 h-24 rounded-[1.5rem] bg-white flex items-center justify-center text-slate-200 border border-slate-100 shrink-0"><ImageIcon size={32} /></div>
                        )}
                      </div>
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