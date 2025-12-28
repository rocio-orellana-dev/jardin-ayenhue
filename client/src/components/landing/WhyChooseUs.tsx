import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ✅ Importa varias imágenes para el carrusel
import img1 from "@assets/generated_images/outdoor_playground_structure.png";
import img2 from "@assets/generated_images/hero_image_2.png";
import img3 from "@assets/generated_images/hero_image_3.png";

export default function WhyChooseUs() {
  const benefits = [
    "Equipo profesional con vocación y experiencia comprobada.",
    "Sello intercultural que respeta y valora la diversidad.",
    "Infraestructura segura, moderna y acogedora.",
    "Participación activa y real de las familias.",
    "Alimentación saludable.",
    "Ambiente bien tratante y afectivo.",
  ];

  // ✅ Slides del carrusel (puedes cambiar alt y sumar más)
  const slides = useMemo(
    () => [
      { src: img1, alt: "Patio de juegos seguro" },
      { src: img2, alt: "Experiencias de aprendizaje" },
      { src: img3, alt: "Ambiente acogedor y familiar" },
    ],
    []
  );

  const [active, setActive] = useState(0);

  // Swipe / drag state
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

  // ✅ Teclado (accesible)
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  // ✅ Autoplay suave (se pausa si el usuario interactúa)
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => clampIndex(p + 1)), 6500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

  // ✅ Pointer (mouse/touch) para arrastrar
  const onPointerDown = (e: React.PointerEvent) => {
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

    const threshold = 55; // sensibilidad swipe
    const dx = deltaX.current;

    startX.current = null;
    deltaX.current = 0;

    if (dx > threshold) goPrev();
    else if (dx < -threshold) goNext();

    // reanuda autoplay luego de un ratito
    setTimeout(() => setPaused(false), 4000);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Texto */}
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
                  ¿Por qué elegir Jardín Infantil y Sala Cuna Ayenhue?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sabemos que elegir el primer lugar educativo para tu hijo es una
                  decisión importante. Aquí te damos razones para confiar en
                  nosotros.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="mt-0.5 bg-secondary/10 p-1.5 rounded-full text-secondary">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-primary text-lg">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ Carrusel (reemplaza imagen fija) */}
            <div className="relative w-full">
              <div
                className="relative h-[340px] sm:h-[420px] lg:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-white select-none"
                role="region"
                aria-label="Carrusel de imágenes del Jardín Ayenhue"
                tabIndex={0}
                onKeyDown={onKeyDown}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                {/* Slides */}
                {slides.map((s, idx) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={[
                      "absolute inset-0 w-full h-full object-cover",
                      "transition-opacity duration-700 ease-in-out",
                      "will-change-opacity",
                      idx === active ? "opacity-100" : "opacity-0",
                    ].join(" ")}
                    loading={idx === 0 ? "eager" : "lazy"}
                    draggable={false}
                  />
                ))}

                {/* Overlay elegante */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* Flechas */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 flex items-center justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 w-11 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg backdrop-blur-md border border-white/50"
                    onClick={() => {
                      setPaused(true);
                      goPrev();
                      setTimeout(() => setPaused(false), 4000);
                    }}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    className="h-11 w-11 rounded-full bg-white/80 hover:bg-white text-primary shadow-lg backdrop-blur-md border border-white/50"
                    onClick={() => {
                      setPaused(true);
                      goNext();
                      setTimeout(() => setPaused(false), 4000);
                    }}
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>

                {/* Dots */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setPaused(true);
                        setActive(i);
                        setTimeout(() => setPaused(false), 4000);
                      }}
                      className={[
                        "h-2.5 rounded-full transition-all duration-300",
                        i === active ? "w-8 bg-white shadow" : "w-2.5 bg-white/60 hover:bg-white/80",
                      ].join(" ")}
                      aria-label={`Ir a imagen ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Hint swipe (solo móvil/tabla) */}
              <div className="mt-3 text-center text-xs text-muted-foreground lg:hidden">
                Desliza con tu dedo para cambiar la imagen
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
