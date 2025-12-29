import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AyenhueIconProps {
  icon: LucideIcon;
  className?: string;
  // Añadimos estas dos propiedades a la "partitura"
  colorClass?: string;
  bgClass?: string;
}

export default function AyenhueIcon({ 
  icon: Icon, 
  className, 
  colorClass = "text-primary", 
  bgClass = "bg-primary" 
}: AyenhueIconProps) {
  return (
    <div className={cn(
      "relative flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14", 
      className
    )}>
      {/* Fondo decorativo con Glassmorphism sutil */}
      <div className={cn(
        "absolute inset-0 rounded-2xl rotate-6 opacity-10 transition-transform group-hover:rotate-12 duration-500", 
        bgClass
      )} />
      
      {/* Contenedor del icono */}
      <div className={cn(
        "relative w-full h-full rounded-2xl flex items-center justify-center border border-white shadow-sm backdrop-blur-[2px]",
        "bg-white/80"
      )}>
        <Icon className={cn("w-6 h-6 md:w-7 md:h-7", colorClass)} />
      </div>
    </div>
  );
}