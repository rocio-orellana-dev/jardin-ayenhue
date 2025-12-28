import { useMemo, useState } from "react";
import { Star, Heart, TrendingUp, Anchor, Users, Image as ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

/**
 * ✅ Reemplaza estos placeholders por fotos reales cuando las tengas.
 * Mantengo placeholders para que compile sí o sí.
 */
import img1992a from "@assets/generated_images/hero_image_2.png";
import img1992b from "@assets/generated_images/hero_image_3.png";
import img2008a from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";
import img2009a from "@assets/generated_images/hero_image_2.png";
import img2022a from "@assets/generated_images/hero_image_3.png";
import img2023a from "@assets/generated_images/hero_image_of_happy_children_playing_outdoors_in_a_sunny_garden.png";

type MilestoneId = "1992" | "2008" | "2009" | "2022" | "2023";

type Milestone = {
  id: MilestoneId;
  year: string;
  title: string;
  description: string;
  icon: any;
};

export default function History() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<MilestoneId | null>(null);

  const milestones: Milestone[] = useMemo(
    () => [
      {
        id: "1992",
        year: "1992",
        title: "Nuestros Inicios",
        description:
          "Comenzamos como un pequeño Jardín Familiar, sembrando las primeras semillas de educación en la comunidad.",
        icon: Star,
      },
      {
        id: "2008",
        year: "2008",
        title: "Inicio VTF",
        description:
          "Nos transformamos en Jardín Infantil VTF, ampliando cobertura y profesionalizando nuestra gestión.",
        icon: TrendingUp,
      },
      {
        id: "2009",
        year: "2009",
        title: "Nace el Jardín Infantil y Sala Cuna Ayenhue",
        description:
          "La comunidad elige nuestro nombre: Ayenhue (Lugar de Alegría), reflejando nuestra identidad mapuche.",
        icon: Heart,
      },
      {
        id: "2022",
        year: "2022",
        title: "Reconocimiento Oficial",
        description:
          "Certificación de calidad del Estado (MINEDUC), un sello de confianza para nuestras familias.",
        icon: Anchor,
      },
      {
        id: "2023",
        year: "2023",
        title: "Resiliencia Comunitaria",
        description:
          "Tras la inundación, nos levantamos con fuerza gracias al apoyo incondicional de toda la comunidad.",
        icon: Users,
      },
    ],
    []
  );

  const details = useMemo(() => {
    return {
      "1992": {
        title: "1992 — Nuestros Inicios",
        subtitle: "El comienzo de una historia construida con cariño y comunidad.",
        bullets: [
          "Primeros espacios de aprendizaje y cuidado, con un enfoque cercano y familiar.",
          "Vínculo temprano con familias y redes locales de apoyo.",
          "Base de nuestro sello: afectividad, respeto y participación.",
        ],
        images: [
          { src: img1992a, alt: "Archivo fotográfico: primeros años del jardín" },
          { src: img1992b, alt: "Archivo fotográfico: comunidad en actividades iniciales" },
        ],
      },
      "2008": {
        title: "2008 — Inicio VTF",
        subtitle: "Crecimos en cobertura y fortalecimos una gestión más profesional.",
        bullets: [
          "Ampliación de atención y fortalecimiento del equipo educativo.",
          "Mejoras en planificación pedagógica y organización interna.",
          "Mayor articulación con programas e instituciones.",
        ],
        images: [{ src: img2008a, alt: "Actividades educativas y crecimiento institucional" }],
      },
      "2009": {
        title: "2009 — Nace Ayenhue",
        subtitle: "“Lugar de Alegría”: identidad y pertenencia para nuestras familias.",
        bullets: [
          "Elección comunitaria del nombre Ayenhue, con sentido y pertenencia.",
          "Sello intercultural: respeto por raíces e identidad mapuche.",
          "Fortalecimiento de tradiciones, lenguaje y celebraciones significativas.",
        ],
        images: [{ src: img2009a, alt: "Identidad y actividades interculturales" }],
      },
      "2022": {
        title: "2022 — Reconocimiento Oficial",
        subtitle: "Un hito que refuerza la confianza y el compromiso con la calidad.",
        bullets: [
          "Consolidación de procesos y buenas prácticas institucionales.",
          "Foco en seguridad, bienestar y mejora continua.",
          "Reconocimiento como respaldo para familias y comunidad.",
        ],
        images: [{ src: img2022a, alt: "Reconocimientos y avances institucionales" }],
      },
      "2023": {
        title: "2023 — Resiliencia Comunitaria",
        subtitle: "Nos levantamos juntos: apoyo, fuerza y reconstrucción.",
        bullets: [
          "Trabajo colaborativo con familias y redes de apoyo locales.",
          "Reconstrucción y continuidad educativa con enfoque humano.",
          "Aprendizajes: comunidad, solidaridad y esperanza.",
        ],
        images: [{ src: img2023a, alt: "Comunidad y resiliencia en actividades" }],
      },
    } as const;
  }, []);

  const active = activeId ? details[activeId] : null;

  return (
    <section id="historia" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* ✅ Sin animación */}
        <div className="text-center mb-20">
          <span className="text-primary/60 font-bold tracking-wider uppercase text-sm">
            Nuestra Trayectoria
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-3">
            Una historia de compromiso
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* ✅ Línea vertical SIN animación */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-linear-to-b from-primary/5 via-primary/20 to-primary/5 rounded-full" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const reverse = index % 2 === 0;

              return (
                <button
                  type="button"
                  key={milestone.id}
                  onClick={() => {
                    setActiveId(milestone.id);
                    setOpen(true);
                  }}
                  className={`w-full text-left flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative ${
                    reverse ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Box */}
                  <div className="pl-12 md:pl-0 w-full md:w-1/2 md:px-12 group">
                    <div
                      className={`bg-white p-6 md:p-8 rounded-3xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-lg hover:border-secondary/20 transition-all duration-300 ${
                        reverse ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <span className="text-secondary font-bold text-2xl block mb-2 font-heading">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-primary mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {milestone.description}
                      </p>

                      <div className={`mt-4 flex ${reverse ? "md:justify-start" : "md:justify-end"} justify-start`}>
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                          Ver más →
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center w-9 h-9 rounded-full bg-white border-4 border-secondary shadow-md z-10 mt-1.5 md:mt-0">
                    <div className="w-2.5 h-2.5 bg-secondary rounded-full" />
                  </div>

                  {/* Spacer */}
                  <div className="hidden md:block w-1/2" />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ✅ Modal con más información + imágenes */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-3xl rounded-2xl p-0 overflow-hidden">
          <div className="max-h-[85vh] overflow-y-auto">
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
                <div className="mt-5 space-y-6">
                  {/* Bullets */}
                  <div className="grid gap-3">
                    {active.bullets.map((b) => (
                      <div
                        key={b}
                        className="border border-gray-100 rounded-2xl p-4 bg-white hover:bg-gray-50 transition-colors"
                      >
                        <p className="text-sm text-gray-700">{b}</p>
                      </div>
                    ))}
                  </div>

                  {/* Imágenes */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ImageIcon className="w-5 h-5 text-secondary" />
                      <p className="text-sm font-bold text-primary">Galería del hito</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {active.images.map((img) => (
                        <Card key={img.src} className="rounded-2xl overflow-hidden border border-gray-100">
                          <CardContent className="p-0">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-48 object-cover"
                              loading="lazy"
                            />
                            <div className="p-4">
                              <p className="text-xs text-muted-foreground">{img.alt}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
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
