import { Heart, Users, Globe2, BookOpen } from "lucide-react";
import teacherImage from "@assets/generated_images/teacher_reading_to_children_in_a_cozy_classroom.png";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import AyenhueIcon from "./AyenhueIcon";

export default function About() {
  return (
    <section id="nosotros" className={cn(UI.sectionY, "bg-white overflow-hidden")}>
      <div className={UI.containerX}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className={UI.cardBase}>
              <div className="relative">
                <img
                  src={teacherImage}
                  alt="Educadora y niños en Jardín Ayenhue"
                  className="w-full h-full object-cover aspect-4/3 transition-transform duration-700 hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent"></div>
              </div>

              <div className="p-5 md:p-6 bg-white">
                <div className="flex items-start gap-4">
                  {/* Ícono del Sello con AyenhueIcon */}
                  <AyenhueIcon icon={Heart} colorClass="text-accent" bgClass="bg-accent" className="-mt-2" />

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-bold text-primary text-sm uppercase tracking-wide">
                        Nuestro Sello
                      </span>
                      <span className="h-px flex-1 bg-muted/80 hidden sm:block"></span>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground font-medium leading-snug">
                      “Educar con amor y respeto por la diversidad de cada familia.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <SectionHeader
              kicker="Sobre Nosotros"
              title="Un jardín de puertas abiertas a la comunidad"
              align="left"
              className="mb-0"
            />
            
            <p className={cn(UI.pSection, "text-lg")}>
              En <span className="font-bold text-primary">El Jardín Infantil y Sala Cuna Ayenhue</span>, creemos que la educación es un acto de amor y colaboración. Rescatamos las tradiciones locales y valoramos la diversidad cultural, creando un espacio donde cada niño y niña se siente protagonista.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Íconos de Pilares adaptados */}
              <div className="flex gap-5 group items-center">
                <AyenhueIcon icon={Users} colorClass="text-blue-600" bgClass="bg-blue-600" />
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">Comunidad y Familia</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ustedes son parte esencial. Fomentamos la participación activa en cada paso del aprendizaje.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-5 group items-center">
                <AyenhueIcon icon={Globe2} colorClass="text-green-600" bgClass="bg-green-600" />
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">Identidad Intercultural</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Celebramos las raíces y costumbres que hacen única a cada familia de El Molino.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group items-center">
                <AyenhueIcon icon={BookOpen} colorClass="text-orange-600" bgClass="bg-orange-600" />
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">Aprendizaje Significativo</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Juego, exploración y creatividad como motores del desarrollo integral.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}