import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Eye, Leaf, Users, Star, Image as ImageIcon } from "lucide-react";
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

  const youtubeEmbed = (url: string) => {
    // soporta https://www.youtube.com/watch?v=ID y https://youtu.be/ID
    if (!url) return "";
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1]?.split("?")[0];
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }
    if (url.includes("watch?v=")) {
      const base = url.replace("watch?v=", "embed/");
      return base.split("&")[0];
    }
    return url;
  };

  return (
    <section className="pt-20 pb-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo sutil y moderna */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Encabezado */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-gray-50 px-4 py-2 rounded-full border border-gray-100 inline-block mb-2">
            Nuestra Esencia
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
            Misión y Visión
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            La brújula que guía cada paso en el Jardín Infantil y Sala Cuna Ayenhue:
            educar con amor, respeto y diversidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {/* MISIÓN */}
          <Card className="border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl overflow-hidden group h-full flex flex-col">
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
                  <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                  <p className="text-sm text-gray-700 italic font-medium">
                    Fomentamos el amor y respeto por las diversidades culturales, principalmente la{" "}
                    <span className="font-bold text-orange-700">etnia Mapuche</span>, integrando la riqueza de
                    las familias haitianas, venezolanas, bolivianas y colombianas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* VISIÓN */}
          <Card className="border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl overflow-hidden group h-full flex flex-col">
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

                {/* ✅ Clicables con CTA */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setTopic("vida");
                      setOpen(true);
                    }}
                    className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <Leaf className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                      Vida Saludable
                    </span>
                    <p className="mt-2 text-xs text-blue-700/80">Ver actividades →</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTopic("excelencia");
                      setOpen(true);
                    }}
                    className="bg-purple-50 p-4 rounded-2xl text-center border border-purple-100 hover:bg-purple-100 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-300"
                  >
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">
                      Excelencia
                    </span>
                    <p className="mt-2 text-xs text-purple-700/80">Ver acciones →</p>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ✅ Modal con actividades + fotos + video */}
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-2xl rounded-2xl p-0 overflow-hidden">
        <div className="max-h-[85vh] md:max-h-[80vh] overflow-y-auto">
          <div className="p-6 md:p-7">
            <DialogHeader>
              <DialogTitle className="text-primary text-2xl font-heading">
                {active?.title ?? ""}
              </DialogTitle>
              {active?.subtitle && (
                <p className="text-sm text-muted-foreground">{active.subtitle}</p>
              )}
            </DialogHeader>

            {active && (
              <div className="space-y-5 mt-4">
                {/* ✅ Video preview (fallback pro, sin iframe) */}
                {(() => {
                  const getYouTubeId = (url: string) => {
                    try {
                      if (url.includes("youtu.be/")) return url.split("youtu.be/")[1]?.split("?")[0] ?? "";
                      if (url.includes("watch?v=")) return url.split("watch?v=")[1]?.split("&")[0] ?? "";
                      return "";
                    } catch {
                      return "";
                    }
                  };
                  const getYouTubeThumb = (id: string) => (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "");

                  const ytId = active.youtube ? getYouTubeId(active.youtube) : "";
                  const ytThumb = ytId ? getYouTubeThumb(ytId) : "";

                  if (!active.youtube || !ytId) return null;

                  return (
                    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white">
                      <div className="relative">
                        <img
                          src={ytThumb}
                          alt={`Vista previa: ${active.title}`}
                          className="w-full aspect-video object-cover"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/25"></div>

                        <a
                          href={active.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center"
                          aria-label="Ver video en YouTube"
                        >
                          <div className="rounded-full bg-white/90 hover:bg-white text-primary px-5 py-3 font-bold shadow-xl transition">
                            ▶ Ver video en YouTube
                          </div>
                        </a>
                      </div>

                      <div className="p-4 flex items-center justify-between gap-3">
                        <p className="text-sm text-muted-foreground">
                          Algunos videos no permiten reproducción embebida. Ábrelo en YouTube para verlo.
                        </p>
                        <Button asChild className="rounded-xl">
                          <a href={active.youtube} target="_blank" rel="noopener noreferrer">
                            Abrir
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })()}

                {/* ✅ Actividades */}
                <div className="grid gap-4">
                  {active.items.map((it) => (
                    <div
                      key={it.title}
                      className="border border-gray-100 rounded-2xl p-4 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">{it.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{it.desc}</p>
                        </div>

                        {it.mediaType === "image" ? (
                          <div className="w-24 h-16 md:w-28 md:h-20 rounded-xl overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
                            <img
                              src={it.mediaSrc}
                              alt={it.mediaAlt}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        ) : (
                          <div className="w-24 h-16 md:w-28 md:h-20 rounded-xl border border-gray-100 shrink-0 bg-gray-50 flex items-center justify-center text-gray-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" onClick={() => setOpen(false)} className="rounded-xl">
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
