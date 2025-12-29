import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, MessageCircle, Home, Users, 
  BookOpen, Heart, ImageIcon, ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import logoImage from "@assets/generated_images/logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#inicio");

  // REORDENADO SEGÚN EL FLUJO DE HOME.TSX:
  // 1. Inicio (Hero) 
  // 2. Proyecto (Niveles/Servicios) 
  // 3. Nuestro Jardín (Nosotros/Equipo)
  // 4. Testimonios 
  // 5. Galería
  const navLinks = useMemo(() => [
    { name: "Inicio", href: "#inicio", icon: Home },
    { name: "Proyecto Educativo", href: "#propuesta", icon: BookOpen },
    { name: "Nuestro Jardín", href: "#nosotros", icon: Users },
    { name: "Testimonios", href: "#testimonios", icon: Heart },
    { name: "Galería", href: "#galeria", icon: ImageIcon },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Ajuste de detección: un poco más de margen para que cambie 
      // justo cuando la cabecera de la sección entra en vista
      const scrollPosition = window.scrollY + 120; 
      
      const currentSection = navLinks.find((link) => {
        const section = document.getElementById(link.href.replace("#", ""));
        if (!section) return false;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });

      if (currentSection && activeHash !== currentSection.href) {
        setActiveHash(currentSection.href);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, activeHash]);

  const handleNavClick = (href: string) => {
    setActiveHash(href);
    setIsMobileMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ 
        top: el.offsetTop - 80, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 transition-all duration-500 z-[500]",
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg py-2" 
        : "bg-transparent py-6"
    )}>
      <div className={UI.containerX}>
        <div className="flex items-center justify-between h-[60px] md:h-[70px]">
          
          {/* LOGO CON REBOTE ELÁSTICO MEJORADO */}
          <motion.button 
            onClick={() => handleNavClick("#inicio")} 
            className="flex items-center gap-3 group outline-none relative z-10"
            whileHover="hover"
          >
            <motion.div 
              className={cn(
                "w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-slate-100 overflow-hidden shrink-0 shadow-md flex items-center justify-center p-1.5 transition-all duration-500",
                !isScrolled && "ring-4 ring-white/10"
              )}
              variants={{
                hover: { 
                  y: [0, -10, 0],
                  rotate: [0, -5, 5, 0],
                  scale: 1.05,
                  transition: { 
                    y: { type: "spring", stiffness: 400, damping: 12 },
                    rotate: { duration: 0.4 }
                  }
                }
              }}
            >
              <img src={logoImage} alt="Logo" className="w-full h-full object-contain" />
            </motion.div>
            
            <div className="flex flex-col text-left">
              <span className={cn(
                "font-black text-sm md:text-xl tracking-tight transition-colors duration-500", 
                isScrolled ? "text-primary" : "text-white drop-shadow-lg"
              )}>
                Jardín Ayenhue
              </span>
              <span className={cn(
                "text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-black transition-colors duration-500", 
                isScrolled ? "text-secondary" : "text-secondary/90 drop-shadow-sm"
              )}>
                Intercultural · Coltauco
              </span>
            </div>
          </motion.button>

          {/* NAVEGACIÓN CENTRAL CON PASTILLA VERDE (REORDENADO) */}
          <nav className={cn(
            "hidden xl:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500",
            isScrolled 
              ? "bg-slate-100/80 border-slate-200 shadow-inner" 
              : "bg-white/10 border-white/20 backdrop-blur-md shadow-sm"
          )}>
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.href)} 
                  className={cn(
                    "relative px-5 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all duration-300 rounded-full outline-none", 
                    isActive 
                      ? "text-primary" 
                      : isScrolled ? "text-slate-500 hover:text-primary" : "text-white/80 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="activePill"
                      className="absolute inset-0 bg-secondary rounded-full z-0 shadow-[0_4px_12px_rgba(163,230,53,0.35)]"
                      transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* BOTÓN CTA FIJO */}
          <div className="flex items-center gap-4 relative z-10">
            <Button 
              onClick={() => handleNavClick("#contacto")}
              className={cn(
                "hidden md:flex rounded-full font-black px-8 h-12 transition-all duration-500 active:scale-95 shadow-lg shadow-secondary/25 border-none",
                "bg-secondary text-primary hover:bg-secondary/90"
              )}
            >
              Admisión 2026
            </Button>

            <button 
              className={cn(
                "xl:hidden p-3 rounded-2xl transition-all duration-500 border",
                isScrolled 
                  ? "bg-white border-slate-200 text-primary shadow-sm" 
                  : "bg-white/10 border-white/20 text-white backdrop-blur-md"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MENÚ MÓVIL REORDENADO */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="xl:hidden fixed inset-0 bg-white z-[550] flex flex-col pt-28 pb-12 px-6"
          >
            <div className="space-y-3">
              {navLinks.map((link) => {
                const isActive = activeHash === link.href;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all",
                      isActive ? "bg-secondary text-primary translate-x-2 shadow-md shadow-secondary/15" : "text-slate-400"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-2xl",
                      isActive ? "bg-white text-secondary shadow-sm" : "bg-slate-50 text-slate-300"
                    )}>
                      <link.icon size={22} />
                    </div>
                    <span className="text-lg font-black uppercase tracking-widest">{link.name}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="mt-auto pt-8 border-t border-slate-50">
              <Button 
                onClick={() => handleNavClick("#contacto")}
                className="w-full bg-secondary text-primary font-black h-16 rounded-[2.5rem] text-lg shadow-xl shadow-secondary/20"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                Postular ahora
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}