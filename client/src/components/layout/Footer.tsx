import { Facebook, Instagram, Mail, MapPin, Phone, Youtube, Heart } from "lucide-react";
import logoImage from "@assets/generated_images/logo.png";

export default function Footer() {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 bg-white shadow-sm">
                 <img src={logoImage} alt="Logo Ayenhue" className="w-full h-full object-cover" />
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
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Un espacio educativo público, gratuito y de calidad. Comprometidos con la niñez, la cultura y la comunidad en El Molino, Coltauco.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm group">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span className="group-hover:text-primary transition-colors">Av. Manuel Montt S/N, El Molino, Coltauco.</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="group-hover:text-primary transition-colors">+56 9 9243 5064</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="group-hover:text-primary transition-colors">viviana.diaz@daemcoltauco.cl</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Institucional</h3>
            <ul className="space-y-3">
              <li><a href="#nosotros" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">Quiénes Somos</a></li>
              <li><a href="#propuesta" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">Proyecto Educativo</a></li>
              <li><a href="#reconocimiento" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">Reconocimiento Oficial</a></li>
              <li><a href="#contacto" className="text-muted-foreground hover:text-primary text-sm transition-colors flex items-center gap-2">Contacto</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-primary font-heading">Síguenos</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/jardininfantil.ayenhue" target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/jardin_ayenhue/" target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@Jard%C3%ADnAyenhue" target="_blank" className="w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all hover:-translate-y-1 shadow-sm">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jardín Infantil Ayenhue. Todos los derechos reservados.</p>
          <p className="flex items-center gap-1">Diseñado con cariño para la comunidad <Heart className="w-3 h-3 text-red-500 fill-current" /></p>
        </div>
      </div>
    </footer>
  );
}
