import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import logoImage from "@assets/generated_images/logo.webp";

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className={cn(UI.containerX)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand - Identidad */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-white shadow-sm">
                <img 
                  src={logoImage} 
                  alt="Logo del Jardín Infantil Ayenhue" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl leading-tight text-primary">
                  Ayenhue
                </span>
                <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Jardín Infantil VTF
                </span>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-xs">
              Un espacio educativo público, gratuito y de calidad. Comprometidos con la niñez, la cultura y la comunidad en El Molino, Coltauco.
            </p>
          </div>

          {/* Contact Info - Contacto */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-600 text-sm group">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" aria-hidden="true" />
                <span className="group-hover:text-primary transition-colors">Av. Manuel Montt S/N, El Molino, Coltauco.</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm group">
                <Phone className="w-5 h-5 text-secondary shrink-0" aria-hidden="true" />
                <span className="group-hover:text-primary transition-colors">+56 9 9243 5064</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 text-sm group">
                <Mail className="w-5 h-5 text-secondary shrink-0" aria-hidden="true" />
                <span className="group-hover:text-primary transition-colors">viviana.diaz@daemcoltauco.cl</span>
              </li>
            </ul>
          </div>

          {/* Quick Links - Institucional */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Institucional</h3>
            <nav aria-label="Navegación de pie de página">
              <ul className="space-y-3">
                <li><a href="#nosotros" className="text-slate-600 hover:text-primary text-sm transition-colors flex items-center gap-2">Quiénes Somos</a></li>
                <li><a href="#propuesta" className="text-slate-600 hover:text-primary text-sm transition-colors flex items-center gap-2">Proyecto Educativo</a></li>
                <li><a href="#reconocimiento" className="text-slate-600 hover:text-primary text-sm transition-colors flex items-center gap-2">Reconocimiento Oficial</a></li>
                <li><a href="#contacto" className="text-slate-600 hover:text-primary text-sm transition-colors flex items-center gap-2">Contacto</a></li>
              </ul>
            </nav>
          </div>

          {/* Social - Redes Sociales */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Síguenos</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/jardininfantil.ayenhue" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar nuestra página de Facebook"
                className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
              >
                <Facebook className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://www.instagram.com/jardin_ayenhue/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar nuestro perfil de Instagram"
                className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
              >
                <Instagram className="w-5 h-5" aria-hidden="true" />
              </a>
              <a 
                href="https://www.youtube.com/@JardínAyenhue" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Visitar nuestro canal de YouTube"
                className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all hover:-translate-y-1 shadow-sm"
              >
                <Youtube className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar - Derechos y Créditos */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} Jardín Infantil Ayenhue. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">
            Diseñado con cariño para la comunidad 
            <Heart className="w-3 h-3 text-red-500 fill-current" aria-hidden="true" />
          </p>
        </div>
      </div>
    </footer>
  );
}