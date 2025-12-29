import { Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

export default function Social() {
  return (
    <section id="redes" className={cn(UI.sectionY, "bg-white")}>
      <div className={UI.containerX}>
        <SectionHeader
          title="Sigue nuestra vida en comunidad"
          subtitle="Descubre las actividades y experiencias diarias en nuestras redes."
          align="left"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/jardininfantil.ayenhue" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visitar nuestra página oficial de Facebook"
            className={cn(UI.cardBase, "p-8 border-transparent hover:border-blue-100 relative")}
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
              <Facebook className="w-24 h-24 text-blue-600" />
            </div>
            
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1877F2] transition-colors duration-300">
              <Facebook className="w-8 h-8 text-[#1877F2] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">Facebook</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Mantente al día con noticias, avisos importantes y la vida diaria del jardín.
            </p>
            
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Visitar Página <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/jardin_ayenhue/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Seguir nuestro perfil de Instagram"
            className={cn(UI.cardBase, "p-8 border-transparent hover:border-pink-100 relative")}
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
              <Instagram className="w-24 h-24 text-pink-600" />
            </div>

            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E4405F] transition-colors duration-300">
              <Instagram className="w-8 h-8 text-[#E4405F] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">Instagram</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Galería visual de momentos mágicos, actividades pedagógicas y celebraciones.
            </p>
            
            <div className="flex items-center text-pink-600 font-bold group-hover:gap-2 transition-all">
              Ver Fotos <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@JardínAyenhue" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Suscribirse a nuestro canal de YouTube"
            className={cn(UI.cardBase, "p-8 border-transparent hover:border-red-100 relative")}
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity" aria-hidden="true">
              <Youtube className="w-24 h-24 text-red-600" />
            </div>

            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF0000] transition-colors duration-300">
              <Youtube className="w-8 h-8 text-[#FF0000] group-hover:text-white transition-colors duration-300" aria-hidden="true" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">YouTube</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Videos educativos, canciones y registros de nuestras actividades culturales.
            </p>
            
            <div className="flex items-center text-red-600 font-bold group-hover:gap-2 transition-all">
              Ver Videos <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}