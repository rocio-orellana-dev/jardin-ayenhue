/**
 * Design System - Constantes de Estilo Reutilizables
 * Basado en Tailwind CSS + shadcn/ui tokens
 */

export const UI = {
  // Espaciado vertical de secciones (consistente en toda la landing)
  sectionY: "py-24 md:py-32",

  // Contenedor estándar con paddings laterales y centrado
  containerX: "container mx-auto px-4 md:px-6 relative z-10",

  // Estilo base para tarjetas (usado en Niveles, Sellos, Servicios)
  cardBase: "bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group",

  // Estilo para el "Kicker" o Badge que va sobre el título principal
  badgeKicker: "text-secondary font-bold tracking-wider uppercase text-xs bg-white px-4 py-2 rounded-full border border-secondary/20 shadow-sm inline-block mb-4",

  // Tipografía para títulos de sección (H2)
  h2Section: "text-3xl md:text-5xl font-heading font-bold text-primary tracking-tight leading-tight",

  // Tipografía para párrafos de descripción de sección
  pSection: "text-lg text-muted-foreground leading-relaxed",
} as const;