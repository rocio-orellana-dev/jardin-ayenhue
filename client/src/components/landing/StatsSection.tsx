import { useEffect, useState, useRef } from "react";
import { Users, GraduationCap, Sparkles, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";

const STATS_CONFIG = [
  { 
    id: 1, 
    label: "Cupos disponibles 2026", 
    value: 12, 
    icon: Sparkles,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    glowColor: "rgba(245, 158, 11, 0.12)", 
    floatDelay: "0s",
    morphSpeed: "14s"
  },
  { 
    id: 2, 
    label: "Niños y niñas actualmente", 
    value: 94, 
    icon: Users,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    glowColor: "rgba(14, 165, 233, 0.12)", 
    floatDelay: "-1.5s",
    morphSpeed: "17s"
  },
  { 
    id: 3, 
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
    id: 4, 
    label: "Equipo educativo", 
    value: 10, 
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
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2800; // Un poco más lento para ser "hipnótico"

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // easeOutQuart para suavidad extrema
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
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      )}
      style={{ 
        animation: `float 7s ease-in-out infinite`,
        animationDelay: stat.floatDelay 
      }}
    >
      {/* GLOW AURA (Solo visible al hacer hover) */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 blur-[50px] -z-10 rounded-full scale-50 group-hover:scale-125"
        style={{ backgroundColor: stat.glowColor }}
      />

      {/* BLOB BLANCO PURO */}
      <div className={cn(
        "absolute inset-0 transition-all duration-700",
        "bg-white border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]",
        "group-hover:border-white group-hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)]"
      )} 
      style={{
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        animation: `morph ${stat.morphSpeed} linear infinite`
      }}
      />

      {/* CONTENIDO */}
      <div className="relative z-10 flex flex-col items-center">
        <div className={cn(
          "p-4 mb-6 rounded-3xl transition-all duration-700",
          stat.bgColor, stat.color, 
          "group-hover:scale-110 group-hover:rotate-[10deg]",
        )}>
          <stat.icon size={30} strokeWidth={1.5} />
        </div>

        <strong className={cn(
          "block text-6xl md:text-7xl font-heading font-black text-slate-800 mb-3 tracking-tighter transition-transform duration-500",
          isDone && "animate-bounce-subtle"
        )}>
          {count}
        </strong>

        <div className="space-y-2 text-center">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] leading-tight max-w-[140px] group-hover:text-slate-600 transition-colors">
            {stat.label}
          </p>
          {stat.description && (
            <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-[9px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100">
              {stat.description}
            </span>
          )}
        </div>
      </div>
      
      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          33% { border-radius: 45% 55% 50% 50% / 55% 45% 55% 45%; }
          66% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 0.8s ease-out;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}

export default function StatsSection() {
  const [completed, setCompleted] = useState(0);
  const total = STATS_CONFIG.length;

  return (
    <section className={cn("bg-white relative overflow-hidden", UI.sectionY)}>
      <div className={cn(UI.containerX, "relative z-10")}>
        
        <div className="text-center mb-28">
          <span className="inline-block mb-4 px-5 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-secondary font-black uppercase tracking-[0.3em] text-[10px]">
            Transparencia Institucional
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-black text-primary tracking-tight">
            Creciendo juntos <span className="text-slate-300 font-light italic">cada día</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 lg:gap-10 items-center">
          {STATS_CONFIG.map((stat, index) => (
            <StatCard 
              key={stat.id} 
              stat={stat} 
              delay={index * 200} 
              onFinish={() => setCompleted(prev => Math.min(prev + 1, total))}
            />
          ))}
        </div>

        <div className={cn(
          "mt-32 flex flex-col items-center transition-all duration-1000",
          completed === total ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <Button 
            className="rounded-full bg-secondary hover:bg-secondary/90 text-primary font-bold px-14 h-16 text-xl shadow-[0_15px_35px_rgba(163,230,53,0.25)] hover:shadow-[0_20px_45px_rgba(163,230,53,0.35)] transition-all group"
            asChild
          >
            <a href="#contacto">
              Quiero saber más
              <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-2" />
            </a>
          </Button>
          <p className="mt-6 text-[10px] text-slate-300 font-black uppercase tracking-[0.3em]">
            Proceso de matrícula abierto 2026
          </p>
        </div>
      </div>
    </section>
  );
}