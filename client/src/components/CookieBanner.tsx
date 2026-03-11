import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";
import { Link } from "wouter";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem("ayenhue_cookies_accepted");
    if (!hasAccepted) {
      // Small delay to make the entrance less aggressive
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("ayenhue_cookies_accepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[9999] animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-white border-2 border-primary/20 shadow-2xl rounded-2xl p-5 md:p-6 relative overflow-hidden">
        {/* Soft decorative background element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1"
          aria-label="Cerrar aviso de cookies"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pr-6">
          <h3 className="font-poppins font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" />
            Privacidad y Cookies
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Utilizamos cookies propias y de terceros (como Google Analytics) para analizar el tráfico, 
            mejorar tu experiencia y ofrecerte un mejor servicio. Al navegar en este sitio, aceptas nuestra política.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <Button 
              onClick={acceptCookies} 
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105"
            >
              ¡Entendido y Acepto!
            </Button>
            <Link href="/privacidad">
              <span className="text-sm text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline cursor-pointer transition-colors block text-center sm:text-left">
                Leer Políticas de Privacidad
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
