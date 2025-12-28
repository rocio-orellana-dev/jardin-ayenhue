import { Heart, Users, Globe2, BookOpen } from "lucide-react";
import teacherImage from "@assets/generated_images/teacher_reading_to_children_in_a_cozy_classroom.png";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <section id="nosotros" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side - Refined visual */}
<div className="relative order-2 lg:order-1">
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-secondary/10 rounded-full blur-[100px] -z-10"></div>

  {/* ✅ BLOQUE UNIFICADO: Imagen + Sello (acompaña borde redondeado) */}
  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border border-muted/60">
    {/* Imagen */}
    <div className="relative">
      <img
        src={teacherImage}
        alt="Educadora y niños en Jardín Ayenhue"
        className="w-full h-full object-cover aspect-4/3 transition-transform duration-700 hover:scale-[1.01]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent"></div>
    </div>

    {/* ✅ “Sello” pegado abajo (sin tapar la imagen) */}
    <div className="p-5 md:p-6 bg-white">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-accent/20 rounded-2xl flex items-center justify-center shrink-0">
          <Heart className="w-5 h-5 fill-current text-accent" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <span className="font-bold text-primary text-sm uppercase tracking-wide">
              Nuestro Sello
            </span>
            {/* Línea sutil para “conectar” visualmente con la imagen */}
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


          {/* Text Side */}
          <div className="space-y-8 order-1 lg:order-2">
            <div>
              <Badge variant="outline" className="text-secondary border-secondary/20 bg-secondary/5 px-4 py-1 text-sm font-bold uppercase tracking-wider mb-4 rounded-full">
                Sobre Nosotros
              </Badge>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary leading-[1.2]">
                Un jardín de puertas abiertas a la comunidad
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              En <span className="font-bold text-primary">El Jardín Infantil y Sala Cuna Ayenhue</span>, creemos que la educación es un acto de amor y colaboración. Rescatamos las tradiciones locales y valoramos la diversidad cultural, creando un espacio donde cada niño y niña se siente protagonista.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">Comunidad y Familia</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ustedes son parte esencial. Fomentamos la participación activa en cada paso del aprendizaje.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                  <Globe2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-primary mb-1">Identidad Intercultural</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Celebramos las raíces y costumbres que hacen única a cada familia de El Molino.
                  </p>
                </div>
              </div>

              <div className="flex gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0 group-hover:bg-orange-100 transition-colors">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
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
