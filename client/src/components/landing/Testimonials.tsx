import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import type { Testimonial } from "@shared/schema";

// --- SUB-COMPONENTE: COMILLA ANIMADA ---
function AnimatedQuote() {
  return (
    <motion.svg 
      width="50" height="50" viewBox="0 0 40 40" fill="none" 
      className="text-secondary/40 mb-6"
      animate={{ 
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0] 
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 25C12 20 15 17 18 15M5 25C5 18 10 12 18 10M32 25C32 20 35 17 38 15M25 25C25 18 30 12 38 10" 
            stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="10" cy="28" r="3" fill="currentColor" />
      <circle cx="30" cy="28" r="3" fill="currentColor" />
    </motion.svg>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // CARGA DE DATOS DESDE LA API
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error cargando testimonios:", error);
        setLoading(false);
      });
  }, []);

  const next = () => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prev = () => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const containerVariants: Variants = {
    enter: (direction: number) => ({
      opacity: 0,
      scale: 0.95,
      x: direction > 0 ? 30 : -30,
      filter: "blur(8px)"
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)"
    },
    exit: (direction: number) => ({
      opacity: 0,
      scale: 1.05,
      x: direction > 0 ? -30 : 30,
      filter: "blur(8px)"
    })
  };

  const typewriterContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const typewriterWord: Variants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      filter: "blur(5px)",
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.2, 0.65, 0.3, 0.9]
      },
    },
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-secondary" />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  const currentTestimonial = testimonials[index];
  const words = currentTestimonial.content.split(" ");

  return (
    <section id="testimonios" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
        <div className="absolute top-1/4 -left-12 w-64 h-64 rounded-full border border-slate-100 animate-pulse" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 rounded-full border border-slate-100 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className={UI.containerX}>
        <SectionHeader
          kicker="Voces de nuestra comunidad"
          title="Lo que dicen las familias"
          subtitle="El testimonio de quienes confían en nuestro proyecto educativo día a día."
        />

        <div className="relative max-w-4xl mx-auto mt-20">
          <div 
            className="absolute inset-0 bg-slate-50 -z-10 transition-all duration-1000 opacity-70"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              animation: `morph 20s linear infinite`
            }}
          />

          <div className="relative min-h-112.5 md:min-h-100 flex items-center justify-center p-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <div className="flex flex-col items-center text-center px-6 md:px-12">
                  <AnimatedQuote />

                  <blockquote className="text-xl md:text-2xl font-heading font-medium text-slate-700 italic leading-relaxed mb-12">
                    "
                    <motion.span
                      variants={typewriterContainer}
                      initial="hidden"
                      animate="visible"
                      key={currentTestimonial.id}
                      className="inline-block"
                    >
                      {words.map((word, i) => (
                        <motion.span key={i} variants={typewriterWord} className="inline-block mr-[0.3em]">
                          {word}
                        </motion.span>
                      ))}
                    </motion.span>
                    "
                  </blockquote>

                  <div className="flex items-center gap-5">
                    <motion.div 
                      animate={{ y: [0, -5, 0], rotate: [2, -2, 2] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 bg-white rounded-4xl flex items-center justify-center text-secondary font-black text-2xl border border-slate-100 shadow-lg overflow-hidden shrink-0"
                    >
                      {currentTestimonial.avatar_url ? (
                        <img
                          src={currentTestimonial.avatar_url}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-secondary/40 italic">
                          {currentTestimonial.name.charAt(0)}
                        </span>
                      )}
                    </motion.div>
                    
                    <div className="text-left">
                      <h4 className="font-black text-primary text-xl leading-tight">{currentTestimonial.name}</h4>
                      <p className="text-secondary font-black text-[10px] uppercase tracking-[0.25em] mt-2 bg-secondary/5 px-3 py-1 rounded-full inline-block">
                        {currentTestimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-8 mt-16 relative z-20">
            <button 
              onClick={prev} 
              className="group p-4 rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-secondary hover:border-secondary hover:shadow-md transition-all active:scale-95"
            >
              <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
            </button>

            <div className="flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className="relative p-2 outline-none"
                >
                  <motion.div 
                    animate={{ 
                      scale: index === i ? 1.5 : 1,
                      backgroundColor: index === i ? "var(--secondary)" : "#e2e8f0" 
                    }}
                    className={cn(
                      "w-3 h-3 transition-colors duration-500",
                      index === i ? "shadow-[0_0_15px_rgba(163,230,53,0.5)]" : ""
                    )}
                    style={{
                      borderRadius: index === i ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "50%",
                      animation: index === i ? "morph 5s linear infinite" : "none"
                    }}
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={next} 
              className="group p-4 rounded-full bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-secondary hover:border-secondary hover:shadow-md transition-all active:scale-95"
            >
              <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          33% { border-radius: 45% 55% 50% 50% / 55% 45% 55% 45%; }
          66% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
      `}</style>
    </section>
  );
}