import { useEffect, useState, useRef } from "react";
import { MessageCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Sensibilidad: Solo actuar si el scroll ha cambiado más de 10px
      if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

      // Lógica: Ocultar al bajar, mostrar al subir o si está muy arriba
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsVisible(false); // Bajando
      } else {
        setIsVisible(true); // Subiendo o cerca del inicio
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-60 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-100 md:hidden transition-transform duration-500 ease-in-out shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.05)]",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
      role="complementary"
      aria-label="Acciones rápidas de contacto y postulación"
    >
      <div className="flex gap-3 max-w-lg mx-auto">
        <Button
          size="lg"
          className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-full h-14 shadow-md focus-visible:ring-2 focus-visible:ring-emerald-500"
          asChild
        >
          <a
            href="https://wa.me/56992435064?text=Hola,%20necesito%20información%20sobre%20el%20jardín."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactar al Jardín Ayenhue por WhatsApp"
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            WhatsApp
          </a>
        </Button>

        <Button
          size="lg"
          className="flex-1 bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-full h-14 shadow-md focus-visible:ring-2 focus-visible:ring-primary"
          asChild
        >
          <a
            href="https://simonline.junji.gob.cl/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Postular en línea a través de SIM Online de JUNJI"
          >
            Postular
            <ExternalLink className="w-4 h-4 ml-2 opacity-70" aria-hidden="true" />
          </a>
        </Button>
      </div>
    </div>
  );
}