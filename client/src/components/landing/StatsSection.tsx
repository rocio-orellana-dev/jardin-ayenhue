import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, Sparkles, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";

const STATS_CONFIG = [
  { 
    id: 1, 
    label: "Niños y niñas actualmente", 
    value: 50, 
    icon: Users,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    glowColor: "rgba(14, 165, 233, 0.12)", 
    floatDelay: "-1.5s",
    morphSpeed: "17s"
  },
  { 
    id: 2, 
    label: "Niveles educativos", 
    value: 2, 
    icon: GraduationCap, 
    description: "Sala Cuna · Nivel Medio",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    glowColor: "rgba(16, 185, 129, 0.12)", 
    floatDelay: "-3s",
    morphSpeed: "19s"
  },
  { 
    id: 3, 
    label: "Equipo educativo", 
    value: 13, 
    icon: UserCheck,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    glowColor: "rgba(244, 63, 94, 0.12)", 
    floatDelay: "-0.8s",
    morphSpeed: "11s"
  },
];

function StatCard({ stat, delay, onFinish }: { stat: typeof STATS_CONFIG[0], delay: number, onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Un pequeño delay extra para que el usuario "aterrice" en la sección
          setTimeout(() => setIsVisible(true), delay + 300); 
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 1800; // EQUILIBRIO: 1.8 segundos de pura magia visual

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo: Un comienzo con energía que aterriza con mucha suavidad
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(Math.floor(ease * stat.value));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsDone(true);
        onFinish();
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, stat.value, onFinish]);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "relative group p-12 transition-all duration-1000 flex flex-col items-center justify-center cursor-default",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ 
        animation: `float 8s ease-in-out infinite`,
        animationDelay: stat.floatDelay 
      }}
    >
      {/* GLOW AURA - Más suave para no distraer */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-[45px] -z-10 rounded-full scale-75 group-hover:scale-110"
        style={{ backgroundColor: stat.glowColor }}
      />

      {/* BLOB BLANCO - Mantenemos la identidad orgánica */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700",
        "bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]",
        "group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)]"
      )} 
      style={{
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: `morph ${stat.morphSpeed} linear infinite`
      }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className={cn(
          "p-4 mb-5 rounded-3xl transition-all duration-700",
          stat.bgColor, stat.color, 
          "group-hover:scale-110 group-hover:rotate-6",
        )}>
          <stat.icon size={28} strokeWidth={1.5} />
        </div>

        <strong className={cn(
          "block text-6xl font-heading font-black text-slate-800 mb-2 tracking-tighter transition-all duration-500",
          isDone ? "scale-105" : "scale-100"
        )}>
          {count}
        </strong>

        <div className="space-y-1.5 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] leading-tight max-w-37.5">
            {stat.label}
          </p>
          {stat.description && (
            <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-[8px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">
              {stat.description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const [completed, setCompleted] = useState(0);
  const total = STATS_CONFIG.length;

  return (
    <section className={cn("bg-white relative overflow-hidden", UI.sectionY)}>
      <div className={cn(UI.containerX, "relative z-10")}>
        
        <div className="text-center mb-24">
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-secondary font-black uppercase tracking-[0.3em] text-[10px]">
            Transparencia Institucional
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-primary tracking-tight">
            Creciendo juntos <span className="text-secondary italic font-light">cada día</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 max-w-6xl mx-auto justify-items-center">
          {STATS_CONFIG.map((stat, index) => (
            <StatCard 
              key={stat.id} 
              stat={stat} 
              delay={index * 250} // Escalonamiento elegante
              onFinish={() => setCompleted(prev => Math.min(prev + 1, total))}
            />
          ))}
        </div>

        <div className={cn(
          "mt-28 flex flex-col items-center transition-all duration-1000",
          completed === total ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <p className="text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            Proceso de matrícula abierto 2026
          </p>
        </div>
      </div>
    </section>
  );
}