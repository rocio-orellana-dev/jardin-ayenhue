import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AyenhueIconProps {
  icon: LucideIcon;
  className?: string;
  variant?: "default" | "blue" | "green" | "orange" | "purple" | "rose";
}

export default function AyenhueIcon({ icon: Icon, className, variant = "default" }: AyenhueIconProps) {
  // Mapeo de colores para mantener la coherencia con Services
  const variants = {
    default: "text-secondary",
    blue: "text-blue-500",
    green: "text-green-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
    rose: "text-rose-500",
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center p-4", className)}>
      {/* TRAZO MANUAL FONDO (Forma orgánica) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full fill-current opacity-20 -rotate-6 transition-transform group-hover:rotate-12 duration-700"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15,45 C15,25 35,15 55,15 C75,15 85,35 85,55 C85,75 65,85 45,85 C25,85 15,65 15,45" />
      </svg>

      {/* DETALLE INTERCULTURAL (Kultrun Dots) */}
      <div className="absolute top-1 right-1 flex gap-0.5">
        <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60" />
        <div className="w-1 h-1 rounded-full bg-current opacity-40" />
      </div>

      {/* ÍCONO PRINCIPAL */}
      <Icon className="relative z-10 w-7 h-7 text-primary stroke-[1.5px]" />
    </div>
  );
}