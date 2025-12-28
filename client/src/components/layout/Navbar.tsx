import { useEffect, useMemo, useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logoImage from "@assets/generated_images/logo.png";

type NavLink = { name: string; href: string };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>("#inicio");

  // ✅ SIN "Contacto" (porque ya existe el botón Contáctanos)
  const navLinks: NavLink[] = useMemo(
    () => [
      { name: "Inicio", href: "#inicio" },
      { name: "Nosotros", href: "#nosotros" },
      { name: "Identidad", href: "#identidad" },
      { name: "Historia", href: "#historia" },
      { name: "Propuesta", href: "#propuesta" },
      { name: "Reconocimiento", href: "#reconocimiento" },
      { name: "Testimonios", href: "#testimonios" },
      { name: "Galería", href: "#galeria" },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ Scroll suave + offset (evita que quede tapado por el navbar)
  const scrollToHash = (hash: string) => {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 92; // ajusta si cambias alto del navbar
    const rect = el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const top = rect.top + scrollTop - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setActiveHash(href);
    scrollToHash(href);
    window.history.replaceState(null, "", href);
  };

  // ✅ Detecta sección activa (nav "premium")
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (!visible?.target) return;
        setActiveHash(`#${(visible.target as HTMLElement).id}`);
      },
      {
        threshold: [0.15, 0.25, 0.35],
        rootMargin: "-30% 0px -55% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [navLinks]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-black/55 via-black/20 to-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-[72px] md:h-[84px]">
          {/* Logo -> Inicio */}
          <button
            type="button"
            onClick={() => handleNavClick("#inicio")}
            className="flex items-center gap-3 group text-left"
            aria-label="Ir al inicio"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 overflow-hidden rounded-full border-2 border-white/20 shadow-lg transition-transform duration-300 group-hover:scale-[1.06] bg-white">
              <img
                src={logoImage}
                alt="Logo Ayenhue"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            <div className="flex flex-col leading-tight">
              <span
                className={cn(
                  "font-heading font-extrabold text-[15px] md:text-lg tracking-tight transition-colors drop-shadow-md",
                  isScrolled ? "text-primary" : "text-white"
                )}
              >
                Jardín Infantil y Sala Cuna
              </span>
              <span
                className={cn(
                  "text-[11px] md:text-xs font-bold uppercase tracking-[0.22em] transition-colors drop-shadow-md",
                  isScrolled ? "text-secondary" : "text-white/90"
                )}
              >
                Ayenhue
              </span>
            </div>
          </button>

          {/* Desktop */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-sm font-bold px-4 py-2 rounded-full transition-all duration-300",
                    isScrolled
                      ? "text-primary hover:bg-primary/5"
                      : "text-white hover:bg-white/20 hover:backdrop-blur-sm",
                    isActive &&
                      (isScrolled
                        ? "bg-primary/8 text-primary"
                        : "bg-white/20 text-white")
                  )}
                >
                  {link.name}
                </button>
              );
            })}

            {/* ✅ Único acceso a Contacto */}
            <Button
              className="ml-3 bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-full px-6 h-11 shadow-[0_6px_22px_rgba(0,0,0,0.20)] hover:-translate-y-0.5 transition-all duration-300 border border-white/20"
              asChild
            >
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contacto");
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contáctanos
              </a>
            </Button>
          </nav>

          {/* Mobile button */}
          <button
            className={cn(
              "xl:hidden p-2 rounded-full transition-colors",
              isScrolled ? "text-primary hover:bg-muted" : "text-white hover:bg-white/20"
            )}
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl p-5">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href;
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-left w-full font-bold text-[16px] px-4 py-3 rounded-xl transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-secondary/12 text-primary"
                      : "text-primary hover:bg-secondary/10 hover:text-secondary"
                  )}
                >
                  {link.name}
                  <span className={cn("text-secondary transition-opacity", isActive ? "opacity-100" : "opacity-0")}>
                    →
                  </span>
                </button>
              );
            })}

            <div className="h-px bg-gray-100 my-2" />

            {/* ✅ Único acceso a Contacto */}
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold h-12 rounded-xl text-lg shadow-lg"
              asChild
            >
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#contacto");
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contáctanos
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
