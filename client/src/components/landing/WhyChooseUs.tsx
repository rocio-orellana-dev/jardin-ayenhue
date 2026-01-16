import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

import img1 from "@assets/generated_images/elegir1.webp";
import img2 from "@assets/generated_images/elegir2.webp";
import img3 from "@assets/generated_images/elegir3.webp";

export default function WhyChooseUs() {
  const benefits = [
    "Equipo profesional con vocación y experiencia comprobada.",
    "Sello intercultural que respeta y valora la diversidad.",
    "Infraestructura segura, moderna y acogedora.",
    "Participación activa y real de las familias.",
    "Alimentación saludable.",
    "Ambiente bien tratante y afectivo.",
  ];

  const slides = useMemo(
    () => [
      { src: img1, alt: "Patio de juegos seguro" },
      { src: img2, alt: "Experiencias de aprendizaje" },
      { src: img3, alt: "Ambiente acogedor y familiar" },
    ],
    []
  );

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const deltaX = useRef<number>(0);

  const clampIndex = (i: number) => {
    const last = slides.length - 1;
    if (i < 0) return last;
    if (i > last) return 0;
    return i;
  };

  const goPrev = () => setActive((p) => clampIndex(p - 1));
  const goNext = () => setActive((p) => clampIndex(p + 1));

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => clampIndex(p + 1)), 6500);
    return () => clearInterval(t);
  }, [paused]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    setPaused(true);
    startX.current = e.clientX;
    deltaX.current = 0;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    deltaX.current = e.clientX - startX.current;
  };

  const onPointerUp = () => {
    if (startX.current === null) return;
    const threshold = 50;
    const dx = deltaX.current;
    
    startX.current = null;
    deltaX.current = 0;

    if (dx > threshold) goPrev();
    else if (dx < -threshold) goNext();
    
    setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section id="porque-elegirnos" className={cn(UI.sectionY, "bg-white")}>
      <div className={UI.containerX}>
        <div className="bg-white/30 rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <SectionHeader
                title="¿Por qué elegir Jardín Infantil y Sala Cuna Ayenhue?"
                subtitle="Sabemos que elegir el primer lugar educativo para tu hijo es una decisión importante. Aquí te damos razones para confiar en nosotros."
                align="left"
                className="mb-5" 
              />

              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className={cn(UI.cardBase, "flex items-start gap-4 p-4 border-none shadow-sm rounded-2xl bg-white/80")}
                  >
                    <div className="mt-0.5 bg-secondary/10 p-1.5 rounded-full text-secondary shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-primary text-lg leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full">
              <div
                className="relative h-85 sm:h-105 lg:h-125 w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 select-none touch-pan-y outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 transition-shadow"
                role="region"
                aria-roledescription="carousel"
                aria-label="Galería de nuestras instalaciones"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                onPointerCancel={onPointerUp}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="sr-only" aria-live="polite">
                  Mostrando imagen {active + 1} de {slides.length}
                </div>

                {slides.map((s, idx) => (
                  <div
                    key={s.src}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${idx + 1} de ${slides.length}`}
                    className={cn(
                      "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                      idx === active ? "opacity-100 z-10" : "opacity-0 z-0"
                    )}
                  >
                    <img
                      src={s.src}
                      alt={s.alt}
                      className="w-full h-full object-cover"
                      loading={idx === 0 ? "eager" : "lazy"}
                      draggable={false}
                    />
                  </div>
                ))}

                <div className="absolute inset-0 bg-primary/5 mix-blend-multiply pointer-events-none z-20" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent pointer-events-none z-20" />

                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex items-center justify-between z-30">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-11 w-11 rounded-full bg-white/90 hover:bg-white text-primary shadow-xl backdrop-blur-md border border-white/50 focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaused(true);
                      goPrev();
                    }}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="h-11 w-11 rounded-full bg-white/90 hover:bg-white text-primary shadow-xl backdrop-blur-md border border-white/50 focus-visible:ring-2 focus-visible:ring-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPaused(true);
                      goNext();
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </div>

                <div 
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-30"
                  role="tablist"
                  aria-label="Seleccionar imagen"
                >
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Ir a imagen ${i + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPaused(true);
                        setActive(i);
                      }}
                      className={cn(
                        "h-2.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-white",
                        i === active ? "w-8 bg-white shadow-md" : "w-2.5 bg-white/60 hover:bg-white/80"
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 lg:hidden flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-slate-200"></span>
                Desliza para explorar
                <span className="w-8 h-px bg-slate-200"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}