import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, Home, Users, 
  BookOpen, Heart, ImageIcon, ChevronRight, X // Añadimos X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import logoImage from "@assets/generated_images/logo.webp";

function AnimatedHamburger({ isOpen, isScrolled }: { isOpen: boolean, isScrolled: boolean }) {
  const variant = isOpen ? "opened" : "closed";
  const color = isScrolled || isOpen ? "#0f172a" : "#ffffff";

  const top = { closed: { rotate: 0, y: 0 }, opened: { rotate: 45, y: 7 } };
  const center = { closed: { opacity: 1 }, opened: { opacity: 0 } };
  const bottom = { closed: { rotate: 0, y: 0 }, opened: { rotate: -45, y: -7 } };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible">
      <motion.line x1="4" y1="5" x2="20" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" variants={top} animate={variant} />
      <motion.line x1="4" y1="12" x2="20" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round" variants={center} animate={variant} />
      <motion.line x1="4" y1="19" x2="20" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" variants={bottom} animate={variant} />
    </svg>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#inicio");
  const [logoLoaded, setLogoLoaded] = useState(false);

  const navLinks = useMemo(() => [
    { name: "Inicio", href: "#inicio", icon: Home },
    { name: "Proyecto Educativo", href: "#propuesta", icon: BookOpen },
    { name: "Nuestro Jardín", href: "#nosotros", icon: Users },
    { name: "Testimonios", href: "#testimonios", icon: Heart },
    { name: "Galería", href: "#galeria", icon: ImageIcon },
  ], []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      const scrollPosition = window.scrollY + 120;
      
      const currentSection = navLinks.find((link) => {
        const section = document.getElementById(link.href.replace("#", ""));
        if (!section) return false;
        return scrollPosition >= section.offsetTop && scrollPosition < (section.offsetTop + section.offsetHeight);
      });

      if (currentSection && activeHash !== currentSection.href) setActiveHash(currentSection.href);
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
      const offset = window.innerWidth < 768 ? 70 : 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 transition-all duration-500 z-100",
      isScrolled ? "bg-white shadow-md py-1.5" : "bg-transparent py-5"
    )}>
      <div className={UI.containerX}>
        <div className="flex items-center justify-between h-[54px] md:h-[70px]">
          
          <motion.button 
            onClick={() => handleNavClick("#inicio")} 
            className="flex items-center gap-2 group outline-none relative z-10 text-left"
            whileHover="hover"
          >
            <motion.div 
              className={cn(
                "w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white border border-slate-100 overflow-hidden shadow-md flex items-center justify-center p-1 transition-all duration-500",
                !isScrolled && "ring-4 ring-white/10",
                !logoLoaded && "animate-pulse bg-slate-200"
              )}
              variants={{ hover: { y: -5, rotate: -5 } }}
            >
              <img 
                src={logoImage} 
                alt="Logo Jardín Ayenhue" 
                className={cn("w-full h-full object-contain transition-opacity duration-300", logoLoaded ? "opacity-100" : "opacity-0")}
                onLoad={() => setLogoLoaded(true)}
                loading="eager" 
                fetchPriority="high"
              />
            </motion.div>
            
            <div className="flex flex-col">
              <span className={cn(
                "font-black text-sm md:text-xl tracking-tight transition-colors duration-500 leading-tight", 
                isScrolled ? "text-primary" : "text-white"
              )}>
                Jardín Ayenhue
              </span>
              <span className={cn(
                "text-[7px] md:text-[10px] uppercase tracking-[0.15em] font-black transition-colors duration-500", 
                isScrolled ? "text-secondary" : "text-secondary/90"
              )}>
                Intercultural · Coltauco
              </span>
            </div>
          </motion.button>

          <nav className={cn(
            "hidden xl:flex items-center gap-1 p-1 rounded-full border transition-all duration-500",
            isScrolled ? "bg-slate-100/80 border-slate-200 shadow-inner" : "bg-white/10 border-white/20 backdrop-blur-md"
          )}>
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button 
                  key={link.name} 
                  onClick={() => handleNavClick(link.href)} 
                  className={cn(
                    "relative px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all duration-300 rounded-full outline-none", 
                    isActive ? "text-primary" : isScrolled ? "text-slate-500 hover:text-primary" : "text-white/80 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div layoutId="navTab" className="absolute inset-0 bg-secondary rounded-full z-0 shadow-sm" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              className={cn(
                "xl:hidden p-3 rounded-xl transition-all duration-500 border",
                isScrolled || isMobileMenuOpen ? "bg-white border-slate-200 shadow-sm" : "bg-white/10 border-white/20 backdrop-blur-md"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <AnimatedHamburger isOpen={isMobileMenuOpen} isScrolled={isScrolled} />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-200 flex flex-col p-8 pt-6"
          >
            {/* BOTÓN DE CIERRE EXPLÍCITO (X) */}
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:text-primary transition-colors"
              >
                <X size={32} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 text-primary font-black text-xl text-left active:scale-[0.98] transition-transform"
                >
                  <link.icon className="w-6 h-6 text-secondary" />
                  {link.name}
                </button>
              ))}
              <Button 
                onClick={() => handleNavClick("#contacto")}
                className="w-full rounded-2xl bg-primary text-white font-black h-18 text-xl mt-6 shadow-xl shadow-primary/20"
              >
                Admisión 2026
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}