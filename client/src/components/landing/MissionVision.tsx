import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
// Iconos necesarios, incluyendo Play para el video
import { HeartHandshake, Eye, Leaf, Star, Image as ImageIcon, Play } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogTrigger, // No usado directamente pero buena práctica tenerlo
} from "@/components/ui/dialog";

// --- COMPONENTE: IMAGEN CON CARGA INTELIGENTE (Sin cambios) ---
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

// --- UTILIDAD: YOUTUBE (Sin cambios) ---
const parseYouTube = (url: string) => {
  if (!url) return { id: null, thumb: null };
  const match = url.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const id = match ? match[1] : null;
  return { id, thumb: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null };
};

type Topic = "vida" | "excelencia" | null;

// --- IMPORTS DE IMÁGENES (Asegúrate que las rutas sean correctas) ---
import placeholder1 from "@assets/generated_images/hero_image1.webp";
import placeholder2 from "@assets/generated_images/hero_image2.webp";
import placeholder3 from "@assets/generated_images/hero3.webp";
import placeholder4 from "@assets/generated_images/hero4.webp";
import placeholder5 from "@assets/generated_images/hero5.webp";
import placeholder6 from "@assets/generated_images/hero6.webp";


export default function MissionVision() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>(null);

  // --- CONFIGURACIÓN DE CONTENIDO ---
  const content = useMemo(() => ({
    vida: {
      title: "Vida Saludable",
      subtitle: "Hábitos, movimiento y bienestar desde la primera infancia.",
      youtube: "https://www.youtube.com/watch?v=8xfUTfw-akg",
      items: [
        { title: "Circuitos psicomotrices", desc: "Juegos para fortalecer coordinación y equilibrio en un entorno seguro.", mediaType: "image" as const, mediaSrc: placeholder1 },
        { title: "Huerto y Naturaleza", desc: "Experiencias directas: sembrar, cuidar y explorar el entorno natural.", mediaType: "image" as const, mediaSrc: placeholder2 },
        { title: "Talleres de Alimentación", desc: "Aprendiendo hábitos saludables de forma divertida y práctica.", mediaType: "image" as const, mediaSrc: placeholder3 },
        { title: "Actividad Física Diaria", desc: "Fomentamos el movimiento libre y guiado todos los días.", mediaType: "image" as const, mediaSrc: placeholder4 },
      ],
    },
    excelencia: {
      title: "Excelencia Educativa",
      subtitle: "Calidad, calidez y mejora continua junto a la comunidad.",
      youtube: "https://www.youtube.com/watch?v=Ccq5V_avV9U",
      items: [
        { title: "Proyectos Significativos", desc: "Aprendizajes basados en los intereses reales de los niños y el juego.", mediaType: "image" as const, mediaSrc: placeholder5 },
        { title: "Alianza con Familias", desc: "Comunicación constante y puertas abiertas para construir juntos.", mediaType: "image" as const, mediaSrc: placeholder6 },
      ],
    }
  }), []);

  const active = topic ? content[topic] : null;

  // Estilos base para las tarjetas principales
  const cardBaseStyle = "flex flex-col w-full rounded-[2.5rem] border-2 shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 bg-white";

  return (
    /* CAMBIO REALIZADO AQUÍ: Se cambió bg-slate-50/50 por bg-white para fondo blanco puro */
    <section className={cn("bg-white relative overflow-hidden", UI.sectionY)}>

      {/*
         CAMBIO REALIZADO AQUÍ:
         Se eliminó el bloque <div> que contenía los elementos de fondo (las manchas de colores borrosas).
         El código eliminado era:
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[100px]" />
         </div>
      */}

      <div className={UI.containerX + " relative z-10"}>
        <SectionHeader kicker="Nuestra Esencia" title="Misión y Visión" subtitle="El corazón y el propósito que guía cada día en el Jardín Infantil Ayenhue." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-stretch mt-12">

          {/* --- TARJETA MISIÓN --- */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="h-full flex">
            <Card className={cn(cardBaseStyle, "border-primary/20 shadow-primary/5")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-2rem bg-primary text-white shadow-md shadow-primary/20 transform -rotate-6"><HeartHandshake size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Misión</h3>
                </div>

                <div className="text-slate-600 leading-relaxed text-lg grow space-y-6 font-medium">
                  <p className="text-pretty">
                    Proporcionar a los niños y niñas una <strong>educación de calidad</strong>, en igualdad de oportunidades para todos en nuestra comuna.
                  </p>
                  <p className="text-pretty">
                    Entregar herramientas para el <strong>desarrollo integral</strong>, potenciando sus capacidades y destrezas a través de un rol protagónico en su aprendizaje.
                  </p>
                  <p className="text-pretty">
                    Privilegiar el <strong>juego, buen trato, afectividad e inclusión</strong>. Fomentar estilos de vida saludable y una estrecha <strong>relación con las familias</strong>. Valorar la diversidad cultural (especialmente Mapuche) y la riqueza intercultural de nuestra comunidad (familias haitianas, venezolanas, bolivianas, colombianas, entre otras).
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* --- TARJETA VISIÓN --- */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="h-full flex">
            <Card className={cn(cardBaseStyle, "border-secondary/20 shadow-secondary/5")}>
              <CardContent className="p-8 md:p-10 flex-1 flex flex-col h-full">
                <div className="flex items-center gap-5 mb-8">
                  <div className="p-4 rounded-2rem bg-secondary text-primary shadow-md shadow-secondary/20 transform rotate-6"><Eye size={32} /></div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Nuestra Visión</h3>
                </div>

                <div className="text-slate-600 leading-relaxed space-y-6 text-lg grow font-medium">
                  <p className="text-pretty">
                    Trascender en los niños y niñas potenciando <strong>valores, capacidades y autonomía</strong>.
                  </p>
                  <p className="text-pretty">
                    Formar personas con <strong>autoestima positiva</strong>, capaces de compartir y respetar la diversidad cultural. Niños y niñas con conciencia de <strong>vida saludable</strong>, que expresan sus opiniones y se desarrollan integralmente en su medio social y cultural.
                  </p>
                </div>

                {/* Botones inferiores */}
                <div className="grid grid-cols-2 gap-6 pt-8 mt-auto">
                  <button
                    onClick={() => { setTopic("vida"); setOpen(true); }}
                    className="group/btn relative overflow-hidden bg-white p-4 rounded-4xl text-center border-2 border-sky-100 hover:border-sky-300 hover:bg-sky-50 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col items-center justify-center gap-3"
                  >
                    <div className="bg-sky-100 text-sky-600 p-3 rounded-full group-hover/btn:scale-110 transition-transform"><Leaf size={24} /></div>
                    <span className="text-xs font-black text-sky-800 uppercase tracking-wider">Vida Saludable</span>
                  </button>

                  <button
                    onClick={() => { setTopic("excelencia"); setOpen(true); }}
                    className="group/btn relative overflow-hidden bg-white p-4 rounded-4xl text-center border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg flex flex-col items-center justify-center gap-3"
                  >
                    <div className="bg-purple-100 text-purple-600 p-3 rounded-full group-hover/btn:scale-110 transition-transform"><Star size={24} /></div>
                    <span className="text-xs font-black text-purple-800 uppercase tracking-wider">Excelencia</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* --- DIÁLOGO (MODAL) --- */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-4xl rounded-[3rem] p-0 overflow-hidden border-none shadow-3xl bg-slate-50">
          <div className="max-h-[90vh] overflow-y-auto scrollbar-hide">

            {/* Cabecera del Modal */}
            <div className="p-8 md:p-12 bg-white relative">
               <DialogHeader className="relative z-10">
                <DialogTitle className="text-primary text-4xl md:text-5xl font-black font-heading leading-tight">{active?.title}</DialogTitle>
                <p className="text-slate-500 font-bold text-lg mt-4">{active?.subtitle}</p>
              </DialogHeader>
            </div>

            <div className="p-8 md:p-12 pt-4">
              {active && (
                <div className="space-y-12">

                  {/* SECCIÓN VIDEO */}
                  {(() => {
                    const { id, thumb } = parseYouTube(active.youtube);
                    if (!id || !thumb) return null;
                    return (
                      <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative group aspect-video">
                        <img src={thumb} alt="Video thumbnail" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-slate-900/30 transition-colors group-hover:bg-slate-900/40 flex items-center justify-center">
                          <a
                            href={active.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/95 backdrop-blur-sm text-primary pl-6 pr-8 py-4 rounded-full font-black text-lg shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.4)] hover:scale-105 hover:bg-white transition-all flex items-center gap-3 group/playbtn"
                          >
                             <div className="bg-primary text-white rounded-full p-2 group-hover/playbtn:scale-110 transition-transform">
                                <Play className="w-6 h-6 fill-current translate-x-0.5" />
                             </div>
                             Ver Video Experiencia
                          </a>
                        </div>
                      </div>
                    );
                  })()}

                  {/* GRID DE FOTOS GRANDES */}
                  <div>
                      <h4 className="text-2xl font-black text-slate-800 mb-6">Galería de Actividades</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {active.items.map((it, idx) => (
                        <div key={idx} className="flex flex-col rounded-4xl overflow-hidden bg-white shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">

                           {/* Contenedor de Imagen GRANDE */}
                           <div className="aspect-4/3 w-full relative bg-slate-100">
                             {it.mediaType === "image" && it.mediaSrc ? (
                             <OptimizedImage src={it.mediaSrc} alt={it.title} className="w-full h-full" />
                             ) : (
                             <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon size={48} /></div>
                             )}
                           </div>

                           {/* Texto debajo de la imagen */}
                           <div className="p-6 flex-1 flex flex-col">
                             <h4 className="font-black text-xl text-slate-800 mb-3 leading-tight">{it.title}</h4>
                             <p className="text-slate-600 leading-relaxed font-medium text-base">{it.desc}</p>
                           </div>
                        </div>
                        ))}
                      </div>
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