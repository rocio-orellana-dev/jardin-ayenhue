import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-4xl mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {/* 1. Kicker con espaciado institucional */}
      {kicker && (
        <span className="text-[11px] font-black text-secondary uppercase tracking-[0.3em] block mb-4 animate-in fade-in slide-in-from-bottom-2">
          {kicker}
        </span>
      )}

      {/* 2. Título con Pincelada Orgánica */}
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold text-primary tracking-tight relative z-10 px-1">
          {title}
        </h2>
        
        {/* SVG de Pincelada (Brush Stroke) */}
        <svg
          viewBox="0 0 280 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "absolute -bottom-2 left-0 w-full h-5 text-secondary/40 pointer-events-none z-0",
            align === "center" ? "left-1/2 -translate-x-1/2" : "left-0"
          )}
          preserveAspectRatio="none"
        >
          <path
            d="M4 15.5C50.5 10.5 150.5 6.5 276 17.5"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            className="animate-draw-brush"
          />
          {/* Segundo trazo sutil para dar textura de pincel real */}
          <path
            d="M20 18.5C70 14.5 180 11.5 250 19.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="opacity-60"
          />
        </svg>
      </div>

      {/* 3. Subtítulo con jerarquía visual clara */}
      {subtitle && (
        <p className="mt-8 text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Estilo para la animación de dibujo del trazo */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drawBrush {
          from { stroke-dasharray: 0 300; opacity: 0; }
          to { stroke-dasharray: 300 300; opacity: 1; }
        }
        .animate-draw-brush {
          stroke-dasharray: 0 300;
          animation: drawBrush 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          animation-delay: 0.5s;
        }
      `}} />
    </div>
  );
}