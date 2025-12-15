import { Facebook, Instagram, Youtube, ExternalLink, ArrowRight } from "lucide-react";

export default function Social() {
  return (
    <section id="redes" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
           <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary max-w-lg">
            Sigue nuestra vida en comunidad
          </h2>
          <p className="text-muted-foreground">
            Descubre las actividades y experiencias diarias en nuestras redes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Facebook */}
          <a 
            href="https://www.facebook.com/jardininfantil.ayenhue" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-blue-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Facebook className="w-24 h-24 text-blue-600" />
            </div>
            
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#1877F2] transition-colors duration-300">
              <Facebook className="w-8 h-8 text-[#1877F2] group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">Facebook</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Mantente al día con noticias, avisos importantes y la vida diaria del jardín.
            </p>
            
            <div className="flex items-center text-blue-600 font-bold group-hover:gap-2 transition-all">
              Visitar Página <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          {/* Instagram */}
          <a 
            href="https://www.instagram.com/jardin_ayenhue/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-pink-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Instagram className="w-24 h-24 text-pink-600" />
            </div>

            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E4405F] transition-colors duration-300">
              <Instagram className="w-8 h-8 text-[#E4405F] group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">Instagram</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Galería visual de momentos mágicos, actividades pedagógicas y celebraciones.
            </p>
            
            <div className="flex items-center text-pink-600 font-bold group-hover:gap-2 transition-all">
              Ver Fotos <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>

          {/* YouTube */}
          <a 
            href="https://www.youtube.com/@Jard%C3%ADnAyenhue" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-red-100 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Youtube className="w-24 h-24 text-red-600" />
            </div>

            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#FF0000] transition-colors duration-300">
              <Youtube className="w-8 h-8 text-[#FF0000] group-hover:text-white transition-colors duration-300" />
            </div>
            
            <h3 className="font-bold text-xl text-primary mb-2">YouTube</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Videos educativos, canciones y registros de nuestras actividades culturales.
            </p>
            
            <div className="flex items-center text-red-600 font-bold group-hover:gap-2 transition-all">
              Ver Videos <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
