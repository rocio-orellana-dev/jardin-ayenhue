import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Eye, Leaf, Users, Star, Image as ImageIcon, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Topic = "vida" | "excelencia" | null;

import placeholder1 from "@assets/generated_images/hero_image_2.png";
import placeholder2 from "@assets/generated_images/hero_image_3.png";
import placeholder3 from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import placeholder4 from "@assets/generated_images/hero_image_2.png";

const parseYouTube = (url: string) => {
  if (!url) return { id: null, thumb: null };
  let id: string | null = null;
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'youtu.be') {
      id = urlObj.pathname.slice(1);
    } else if (urlObj.pathname.includes('/shorts/') || urlObj.pathname.includes('/embed/')) {
      id = urlObj.pathname.split('/').filter(Boolean).pop()?.split('?')[0] || null;
    } else {
      id = urlObj.searchParams.get('v');
    }
  } catch (e) {
    const match = url.match(/(?:v=|\/shorts\/|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    id = match ? match[1] : null;
  }
  return {
    id,
    thumb: id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null
  };
};

export default function MissionVision() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<Topic>(null);

  const content = useMemo(() => {
    return {
      vida: {
        title: "Vida Saludable",
        subtitle: "Hábitos, movimiento y bienestar desde la primera infancia.",
        youtube: "https://www.youtube.com/watch?v=8xfUTfw-akg",
        items: [
          {
            title: "Circuitos psicomotrices",
            desc: "Juegos y circuitos para fortalecer coordinación, equilibrio y motricidad, adaptados a cada nivel.",
            mediaType: "image" as const,
            mediaSrc: placeholder1,
            mediaAlt: "Actividad de psicomotricidad en el jardín",
          },
          {
            title: "Huerto / naturaleza",
            desc: "Experiencias al aire libre: sembrar, cuidar plantas y explorar el entorno para aprender con sentido.",
            mediaType: "image" as const,
            mediaSrc: placeholder2,
            mediaAlt: "Huerto y naturaleza en el jardín",
          },
          {
            title: "Taller de alimentación",
            desc: "Promoción de hábitos saludables con apoyo a familias: hidratación, variedad y educación alimentaria en la rutina.",
            mediaType: "image" as const,
            mediaSrc: placeholder3,
            mediaAlt: "Actividad de alimentación saludable",
          },
          {
            title: "Rutinas de autocuidado",
            desc: "Prácticas simples: higiene, pausas de calma, respiración y reconocimiento emocional para el bienestar diario.",
            mediaType: "image" as const,
            mediaSrc: placeholder4,
            mediaAlt: "Rutinas de autocuidado y bienestar",
          },
        ],
      },
      excelencia: {
        title: "Excelencia",
        subtitle: "Calidad educativa con mejora continua y comunidad activa.",
        youtube: "https://www.youtube.com/watch?v=Ccq5V_avV9U",
        items: [
          {
            title: "Proyectos pedagógicos",
            desc: "Aprendizajes significativos basados en el juego y experiencias guiadas, con foco en el desarrollo integral.",
            mediaType: "text" as const,
          },
          {
            title: "Trabajo con familias",
            desc: "Actividades y comunicación cercana para fortalecer el proceso educativo y construir comunidad.",
            mediaType: "image" as const,
            mediaSrc: placeholder2,
            mediaAlt: "Trabajo colaborativo con familias",
          },
          {
            title: "Actividades interculturales",
            desc: "Acciones que promueven respeto, diversidad e identidad cultural (incluida la cultura Mapuche).",
            mediaType: "image" as const,
            mediaSrc: placeholder3,
            mediaAlt: "Actividad intercultural en el jardín",
          },
          {
            title: "Evaluación formativa / acompañamiento",
            desc: "Observación y retroalimentación respetuosa para potenciar avances, apoyar necesidades y fortalecer autoestima positiva.",
            mediaType: "text" as const,
          },
        ],
      },
    } as const;
  }, []);

  const active = topic ? content[topic] : null;

  return (
    <section className={cn("bg-white", UI.sectionY)}>

      <div className={UI.containerX}>
        <SectionHeader 
          kicker="Nuestra Esencia"
          title="Misión y Visión"
          subtitle="La brújula que guía cada paso en el Jardín Infantil y Sala Cuna Ayenhue: educar con amor, respeto y diversidad."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          <Card className={cn(UI.cardBase, "flex flex-col")}>
            <div className="h-1.5 bg-primary w-full"></div>
            <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-6">
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Nuestra Misión
                </h3>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-5 text-lg flex-1">
                <p>
                  Proporcionar a los niños y niñas una{" "}
                  <span className="font-bold text-primary">educación de calidad</span>, equitativa e inclusiva,
                  que llegue a cada rincón de nuestra comuna garantizando igualdad de oportunidades.
                </p>
                <p>
                  Entregamos herramientas para el desarrollo integral, potenciando capacidades y destrezas
                  a través de un rol protagónico del niño. Privilegiamos el juego, el buen trato y la afectividad.
                </p>
                <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex gap-4 mt-2">
                  <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1" aria-hidden="true" />
                  <p className="text-sm text-gray-700 italic font-medium">
                    Fomentamos el amor y respeto por las diversidades culturales, principalmente la{" "}
                    <span className="font-bold text-orange-700">etnia Mapuche</span>, integrando la riqueza de
                    las familias haitianas, venezolanas, bolivianas y colombianas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(UI.cardBase, "flex flex-col")}>
            <div className="h-1.5 bg-secondary w-full"></div>
            <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-6">
                <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary-foreground group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Nuestra Visión
                </h3>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-5 text-lg flex-1">
                <p>
                  Ser reconocidos como un espacio educativo que logra{" "}
                  <span className="font-bold text-secondary-foreground">
                    trascender en la vida de los niños y niñas
                  </span>{" "}
                  a través de prácticas pedagógicas innovadoras y afectivas.
                </p>
                <p>
                  Buscamos formar personas autónomas, con una{" "}
                  <span className="font-semibold text-gray-800">autoestima positiva</span>, capaces de desenvolverse y
                  opinar libremente en su entorno social.
                </p>
                <p>
                  Aspiramos a una comunidad que vive y respeta la interculturalidad y los estilos de vida saludable
                  como base del bienestar común.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => { setTopic("vida"); setOpen(true); }}
                    className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 group/btn"
                    aria-label="Ver detalles sobre Vida Saludable"
                  >
                    <Leaf className="w-6 h-6 text-blue-600 mx-auto mb-2 transition-transform group-hover/btn:scale-110" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Vida Saludable</span>
                    <p className="mt-2 text-xs text-blue-700/80">Ver actividades →</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTopic("excelencia"); setOpen(true); }}
                    className="bg-purple-50 p-4 rounded-2xl text-center border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 group/btn"
                    aria-label="Ver detalles sobre Excelencia"
                  >
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2 transition-transform group-hover/btn:scale-110" />
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Excelencia</span>
                    <p className="mt-2 text-xs text-purple-700/80">Ver acciones →</p>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl focus:outline-none">
          <div className="max-h-[85vh] md:max-h-[80vh] overflow-y-auto overscroll-contain">
            <div className="p-6 md:p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="text-primary text-2xl font-heading font-bold">
                  {active?.title ?? ""}
                </DialogTitle>
                {active?.subtitle && (
                  <p className="text-base text-muted-foreground mt-1">{active.subtitle}</p>
                )}
              </DialogHeader>

              {active && (
                <div className="space-y-6">
                  {(() => {
                    const { id, thumb } = parseYouTube(active.youtube);
                    if (!id || !thumb) return null;

                    return (
                      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-slate-50">
                        <div className="relative aspect-video group/yt">
                          <img
                            src={thumb}
                            alt={`Video de ${active.title}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/yt:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/30 group-hover/yt:bg-black/20 transition-colors" />
                          <a
                            href={active.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 rounded-2xl"
                            aria-label="Reproducir video en YouTube (abre nueva pestaña)"
                          >
                            <div className="rounded-full bg-white/95 text-primary px-6 py-3 font-bold shadow-2xl transition hover:bg-white hover:scale-105 flex items-center gap-2">
                              <span className="text-lg">▶</span> Ver video en YouTube
                            </div>
                          </a>
                        </div>
                        <div className="p-4 flex items-center justify-between gap-4 bg-white">
                          <p className="text-sm text-muted-foreground flex-1">
                            Abre el video en YouTube para ver más registros de nuestras actividades.
                          </p>
                          <Button asChild size="sm" className="rounded-xl shrink-0">
                            <a href={active.youtube} target="_blank" rel="noopener noreferrer">
                              Abrir <ExternalLink className="ml-2 w-3 h-3" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="grid gap-3">
                    {active.items.map((it, idx) => (
                      <div
                        key={`${it.title}-${idx}`}
                        className="border border-gray-100 rounded-2xl p-4 bg-white hover:border-primary/10 transition-colors flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 leading-tight">{it.title}</p>
                          <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{it.desc}</p>
                        </div>

                        {it.mediaType === "image" ? (
                          <div className="w-20 h-16 md:w-24 md:h-18 rounded-xl overflow-hidden border border-gray-50 shrink-0 shadow-sm">
                            <img
                              src={it.mediaSrc}
                              alt={it.mediaAlt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-20 h-16 md:w-24 md:h-18 rounded-xl border border-gray-100 shrink-0 bg-slate-50 flex items-center justify-center text-slate-300">
                            <ImageIcon className="w-6 h-6" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-50">
                    <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl text-muted-foreground hover:bg-slate-50 font-semibold px-6">
                      Cerrar
                    </Button>
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