import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoImage from "@assets/generated_images/logo.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambiamos el estado un poco antes (10px) para que sea sensible
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Historia", href: "#historia" },
    { name: "Propuesta", href: "#propuesta" },
    { name: "Reconocimiento", href: "#reconocimiento" },
    { name: "Galería", href: "#galeria" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2" 
          // Aquí está el truco: Gradiente oscuro sutil para que el texto blanco se lea siempre
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-4 lg:py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border-2 border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-110 bg-white">
              <img src={logoImage} alt="Logo Ayenhue" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-heading font-bold text-lg md:text-xl leading-tight tracking-tight transition-colors drop-shadow-md", 
                isScrolled ? "text-primary" : "text-white"
              )}>
                Jardín Infantil y Sala Cuna
              </span>
              <span className={cn(
                "text-xs font-bold uppercase tracking-widest transition-colors drop-shadow-md", 
                isScrolled ? "text-secondary" : "text-white/90"
              )}>
                Ayenhue
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-bold px-4 py-2 rounded-full transition-all duration-300",
                // Lógica de colores: 
                // Scrolled: Texto oscuro, hover gris claro
                // Top: Texto blanco, hover blanco semitransparente (efecto cristal)
                isScrolled 
                  ? "text-primary hover:bg-primary/5" 
                  : "text-white hover:bg-white/20 hover:backdrop-blur-sm"
              )}
            >
              {link.name}
            </a>
          ))}
          
          {/* Botón Contáctanos - Ajustado al Verde (Secondary) */}
          <Button 
            className="ml-4 bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-full px-6 h-11 shadow-[0_4px_14px_0_rgba(0,0,0,0.2)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.23)] hover:-translate-y-0.5 transition-all duration-300 border-2 border-transparent hover:border-white/20"
            asChild
          >
            <a href="#contacto">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contáctanos
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "xl:hidden p-2 rounded-full transition-colors", 
            isScrolled ? "text-primary hover:bg-muted" : "text-white hover:bg-white/20"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl p-6 flex flex-col gap-3 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary font-bold text-lg px-4 py-3 rounded-xl hover:bg-secondary/10 hover:text-secondary transition-colors flex items-center justify-between group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              <span className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </a>
          ))}
          <div className="h-px bg-gray-100 my-2"></div>
          <Button 
            className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold h-12 rounded-xl text-lg shadow-lg" 
            asChild
          >
            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Contáctanos
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}