import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      className={[
        "relative border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group bg-white rounded-3xl overflow-hidden",
        pillar.border,
        "animate-in fade-in slide-in-from-bottom-4",
        className,
      ].join(" ")}
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className={`h-1.5 w-full ${pillar.topBar}`} />

      <div
        className={[
          "pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-60",
          pillar.accentSoft,
        ].join(" ")}
      />

      <CardHeader className="pb-2 pt-7 px-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border bg-gray-50 border-gray-100 text-primary/80">
            <span className={`w-2 h-2 rounded-full ${pillar.topBar}`} />
            {pillar.tag}
          </span>

          <div
            className={[
              "w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm",
              pillar.bg,
              "transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2",
            ].join(" ")}
          >
            <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
          </div>
        </div>

        <CardTitle className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors leading-tight">
          {pillar.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-8 pb-8 space-y-5">
        <CardDescription className="text-base text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/80 transition-colors">
          {pillar.description}
        </CardDescription>

        <div className="grid gap-2.5">
          {pillar.items.map((it) => (
            <div
              key={it.label}
              className="flex items-center gap-2.5 rounded-2xl border border-gray-100 bg-white px-3.5 py-2.5 hover:bg-gray-50 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center">
                <it.icon className="w-4 h-4 text-primary/70" />
              </div>
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
    <section id="propuesta" className="py-24 bg-muted/40 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-[0.03] pointer-events-none text-primary"></div>

      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-secondary/10 blur-[90px] pointer-events-none"></div>
      <div className="absolute -bottom-28 -right-28 w-[520px] h-[520px] rounded-full bg-primary/10 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-in slide-in-from-bottom-8 duration-700">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-white px-4 py-2 rounded-full shadow-sm border border-secondary/20 inline-block mb-4">
            Nuestra Propuesta Pedagógica
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6">
            Aprendizaje con sentido y valores
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un enfoque cálido, seguro y lleno de experiencias: acompañamos a cada
            niño y niña con cariño, respeto y comunidad.
          </p>
        </div>

        {/* ✅ MEJOR LAYOUT: 3 arriba + 2 abajo centradas (mismo ancho, no gigantes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* 3 primeras normal */}
          <PillarCard pillar={pillars[0]} index={0} />
          <PillarCard pillar={pillars[1]} index={1} />
          <PillarCard pillar={pillars[2]} index={2} />

          {/* Fila editorial centrada: ocupa 3 cols pero adentro controla ancho */}
          <div className="xl:col-span-3">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              <PillarCard pillar={pillars[3]} index={3} />
              <PillarCard pillar={pillars[4]} index={4} />
            </div>
          </div>
        </div>

        {/* CTA final */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            className="rounded-full h-12 px-6 bg-secondary hover:bg-secondary/90 text-primary font-bold shadow-lg"
            asChild
          >
            <a href="#galeria">
              Ver actividades y momentos
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          <Button
            variant="outline"
            className="rounded-full h-12 px-6 bg-white/70 backdrop-blur border-gray-200 hover:bg-white text-primary font-bold"
            asChild
          >
          </Button>
        </div>
      </div>
    </section>
  );
}
