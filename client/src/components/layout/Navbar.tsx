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
      setIsScrolled(window.scrollY > 20);
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
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4 lg:py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <a className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border-2 border-white shadow-sm transition-transform group-hover:scale-105 bg-white">
               <img src={logoImage} alt="Logo Ayenhue" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={cn("font-heading font-bold text-lg md:text-xl leading-tight tracking-tight transition-colors", 
                isScrolled ? "text-secondary" : "text-white/90 shadow-black/20 drop-shadow-sm")}>
                Jardín Infantil y Sala Cuna
              </span>
              <span className={cn("text-xs font-semibold uppercase tracking-wider transition-colors", 
                isScrolled ? "text-primary" : "text-white shadow-black/20 drop-shadow-md")}>
                Ayenhue
              </span>
            </div>
          </a>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-all hover:-translate-y-0.5",
                isScrolled 
                  ? "text-primary hover:text-secondary" 
                  : "text-white hover:text-accent drop-shadow-md"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button 
            className="bg-accent hover:bg-accent/90 text-primary font-bold rounded-full px-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            asChild
          >
            <a href="#contacto">
              <MessageCircle className="w-4 h-4 mr-2" />
              Contáctanos
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn("xl:hidden p-2 rounded-lg transition-colors", 
            isScrolled ? "text-primary hover:bg-muted" : "text-white hover:bg-white/10")}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-primary font-medium px-4 py-3 rounded-lg hover:bg-muted transition-colors flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full bg-accent hover:bg-accent/90 text-primary font-bold mt-4 h-12" asChild>
            <a href="#contacto" onClick={() => setIsMobileMenuOpen(false)}>
              Contáctanos
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}