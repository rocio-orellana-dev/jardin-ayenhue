import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/56992435064?text=Hola,%20necesito%20ayuda%20con%20la%20postulación%20al%20Jardín%20Infantil%20y%20Sala%20Cuna%20Ayenhue.%20¿Me%20pueden%20orientar%20por%20favor?"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp con Jardín Infantil Ayenhue"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Tooltip estilo “card” (solo desktop) */}
      <div className="hidden md:block absolute right-[84px] bottom-1/2 translate-y-1/2">
        <div className="opacity-0 translate-y-1 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <div className="relative rounded-2xl bg-white/90 backdrop-blur-md border border-primary/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] px-4 py-3 w-[260px]">
            <div className="text-xs font-semibold text-primary/70 tracking-wide uppercase">
              WhatsApp Directora de Jardín Infantil y Sala Cuna Ayenhue
            </div>
            <div className="text-sm font-medium text-primary leading-snug mt-1">
              ¿Necesitas orientación para postular?
            </div>

            {/* “Flecha” del tooltip */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white/90 border-r border-t border-primary/10" />
          </div>
        </div>
      </div>

      {/* Botón */}
      <div className="relative w-16 h-16 rounded-full grid place-items-center">
        {/* Halo suave institucional */}
        <div className="absolute inset-0 rounded-full bg-secondary/20 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Anillo sutil + glass */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_14px_40px_rgba(0,0,0,0.18)]" />

        {/* Botón real de WhatsApp (con estilo premium) */}
        <div className="relative w-[56px] h-[56px] rounded-full bg-[#25D366] grid place-items-center shadow-[0_10px_25px_rgba(37,211,102,0.35)] transition-transform duration-300 group-hover:scale-[1.06] active:scale-[0.98]">
          <MessageCircle className="w-7 h-7 text-white" />

          {/* Pulso suave (no ping agresivo) */}
          <span className="absolute inset-0 rounded-full ring-2 ring-[#25D366]/35 animate-[pulse_1.8s_ease-in-out_infinite]" />
        </div>

        {/* Focus accesible */}
        <span className="sr-only">Abrir WhatsApp</span>
      </div>

      {/* Focus visible ring */}
      <style>{`
        a:focus-visible > div {
          outline: none;
        }
      `}</style>
    </a>
  );
}
