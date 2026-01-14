import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import AyenhueIcon from "./AyenhueIcon"; 
import {
  BookOpenCheck,
  Palette,
  Music,
  Leaf,
  Utensils,
  ShieldCheck,
  HeartHandshake,
  SmilePlus,
  Globe2,
  Network,
  Users,
  UserCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// --- SUB-COMPONENTE: ICONO DE LISTA ARTESANAL ---
function AyenhueMiniIcon({ icon: Icon, colorClass }: { icon: any, colorClass: string }) {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0 group/mini">
      {/* Fondo orgánico tipo "mancha de pintura" o "semilla" */}
      <svg
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 w-full h-full fill-current opacity-15 transition-transform duration-500 group-hover/mini:rotate-12", colorClass)}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M25,50 C25,30 35,20 55,20 C75,20 85,30 85,50 C85,70 75,80 55,80 C35,80 25,70 25,50" />
      </svg>
      
      {/* Detalle de trazo manual (bordado) */}
      <svg
        viewBox="0 0 100 100"
        className={cn("absolute inset-0 w-full h-full stroke-current opacity-30", colorClass)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M30,50 C30,35 38,25 55,25 C72,25 80,35 80,50 C80,65 72,75 55,75 C38,75 30,65 30,50" 
          strokeWidth="2" 
          strokeDasharray="4 3" 
          strokeLinecap="round"
        />
      </svg>

      <Icon className={cn("relative z-10 w-4 h-4 opacity-80 transition-transform group-hover/mini:scale-110", colorClass)} />
    </div>
  );
}

type Pillar = {
  tag: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  topBar: string;
  accentSoft: string;
  items: { label: string; icon: any }[];
};

const pillars: Pillar[] = [
  {
    tag: "Aprendizajes",
    title: "Desarrollo Integral",
    description:
      "Crecemos en lo cognitivo, emocional y social, fortaleciendo lenguaje e imaginación desde la primera infancia.",
    icon: UserCheck,
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "group-hover:border-blue-200",
    topBar: "bg-blue-500/90",
    accentSoft: "bg-blue-50",
    items: [
      { label: "Juego y exploración guiada", icon: Sparkles },
      { label: "Fomento lector y lenguaje", icon: BookOpenCheck },
    ],
  },
  {
    tag: "Creatividad",
    title: "Arte y Expresión",
    description:
      "Creamos con libertad: pintura, música y experiencias sensoriales que inspiran confianza y curiosidad.",
    icon: Palette,
    color: "text-purple-700",
    bg: "bg-purple-50",
    border: "group-hover:border-purple-200",
    topBar: "bg-purple-500/90",
    accentSoft: "bg-purple-50",
    items: [
      { label: "Arte y creatividad libre", icon: Palette },
      { label: "Música, ritmo y movimiento", icon: Music },
    ],
  },
  {
    tag: "Bienestar",
    title: "Vida Saludable",
    description:
      "Hábitos saludables y vínculo con el entorno: cuidarnos y cuidar la naturaleza desde pequeños.",
    icon: Leaf,
    color: "text-green-700",
    bg: "bg-green-50",
    border: "group-hover:border-green-200",
    topBar: "bg-green-500/90",
    accentSoft: "bg-green-50",
    items: [
      { label: "Alimentación saludable", icon: Utensils },
      { label: "Naturaleza y medio ambiente", icon: Leaf },
    ],
  },
  {
    tag: "Convivencia",
    title: "Buen Trato y Seguridad",
    description:
      "Ambientes seguros y afectivos, con convivencia respetuosa y protocolos para la tranquilidad de las familias.",
    icon: HeartHandshake,
    color: "text-rose-700",
    bg: "bg-rose-50",
    border: "group-hover:border-rose-200",
    topBar: "bg-rose-500/90",
    accentSoft: "bg-rose-50",
    items: [
      { label: "Seguridad escolar y protocolos", icon: ShieldCheck },
      { label: "Vínculos afectivos seguros", icon: HeartHandshake },
      { label: "Diálogo y resolución respetuosa", icon: SmilePlus },
    ],
  },
  {
    tag: "Identidad",
    title: "Interculturalidad y Redes",
    description:
      "Celebramos tradiciones y diversidad, trabajando con redes locales para acompañar a cada familia con cercanía.",
    icon: Globe2,
    color: "text-secondary-foreground",
    bg: "bg-secondary/10",
    border: "group-hover:border-secondary/30",
    topBar: "bg-secondary",
    accentSoft: "bg-secondary/10",
    items: [
      { label: "Tradiciones locales y cultura familiar", icon: Globe2 },
      { label: "Educación intercultural", icon: Users },
      { label: "Trabajo en redes comunitarias", icon: Network },
    ],
  },
];

function PillarCard({
  pillar,
  index,
  className = "",
}: {
  pillar: Pillar;
  index: number;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        UI.cardBase,
        pillar.border,
        "animate-in fade-in slide-in-from-bottom-4 relative group",
        className
      )}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className={cn("h-1.5 w-full relative z-20", pillar.topBar)} />

      <div
        className={cn(
          "pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-60",
          pillar.accentSoft
        )}
      />

      <CardHeader className="pb-2 pt-7 px-8 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border bg-gray-50 border-gray-100 text-primary/80">
            <span className={cn("w-2 h-2 rounded-full", pillar.topBar)} />
            {pillar.tag}
          </span>

          <AyenhueIcon 
            icon={pillar.icon} 
            colorClass={pillar.color} 
            bgClass={pillar.bg} 
            className="scale-110"
          />
        </div>

        <CardTitle className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
          {pillar.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-8 space-y-5 relative z-10">
        <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/80 transition-colors">
          {pillar.description}
        </CardDescription>

        <div className="grid gap-2.5">
          {pillar.items.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-3.5 py-2.5 hover:bg-gray-50 transition-all hover:translate-x-1"
            >
              {/* CAMBIO: Implementación del nuevo AyenhueMiniIcon */}
              <AyenhueMiniIcon icon={it.icon} colorClass={pillar.color} />
              
              <span className="text-sm font-semibold text-gray-700">
                {it.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Services() {
  return (
    <section id="propuesta" className={cn("relative overflow-hidden bg-white", UI.sectionY)}>
      <div className={UI.containerX}>
        <SectionHeader
          kicker="Nuestra Propuesta Pedagógica"
          title="Aprendizaje con sentido y valores"
          subtitle="Un enfoque cálido, seguro y lleno de experiencias: acompañamos a cada niño y niña con cariño, respeto y comunidad."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <PillarCard pillar={pillars[0]} index={0} />
          <PillarCard pillar={pillars[1]} index={1} />
          <PillarCard pillar={pillars[2]} index={2} />

          <div className="xl:col-span-3">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              <PillarCard pillar={pillars[3]} index={3} />
              <PillarCard pillar={pillars[4]} index={4} />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
        </div>
      </div>
    </section>
  );
}