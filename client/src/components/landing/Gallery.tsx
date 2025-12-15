import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, Loader2, Image as ImageIcon } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

// Imágenes de respaldo por si la base de datos está vacía (Unsplash)
const FALLBACK_IMAGES = [
  { url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop", title: "Arte y Creatividad", description: "Expresión artística" },
  { url: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop", title: "Juegos", description: "Diversión al aire libre" },
  { url: "https://images.unsplash.com/photo-1560785496-3c9d27877182?q=80&w=1000&auto=format&fit=crop", title: "Lectura", description: "Cuentacuentos" },
  { url: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1000&auto=format&fit=crop", title: "Bienestar", description: "Vida Saludable" },
  { url: "https://images.unsplash.com/photo-1596464716127-f9a085960444?q=80&w=1000&auto=format&fit=crop", title: "Música", description: "Ritmo y aprendizaje" },
];

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando galería:", err);
        setLoading(false);
      });
  }, []);

  // Decidimos qué mostrar: Datos reales o Fallback
  // Mapeamos los fallbacks para que tengan la estructura de GalleryImage
  const displayImages = images.length > 0 
    ? images 
    : FALLBACK_IMAGES.map((img, i) => ({ id: i, url: img.url, title: img.title, description: img.description, displayOrder: i, isActive: true, createdAt: new Date() }));

  if (loading) {
    return (
      <div className="py-32 flex justify-center items-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <section id="galeria" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header de la Sección */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-border/50 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="max-w-2xl">
            <span className="text-primary/60 font-bold tracking-wider uppercase text-sm mb-2 block">
              Galería Fotográfica
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
              Momentos en Jardín Infantil y Sala Cuna Ayenhue
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-md text-right md:text-right">
            Un recorrido visual por el día a día de nuestros niños y niñas.
          </p>
        </div>

        {/* Grid de Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
          {displayImages.map((img, i) => {
            // Lógica para que el diseño sea dinámico (cada 5 fotos, la última es ancha)
            // Esto replica tu diseño original donde una foto ocupaba 2 espacios
            const isWide = (i % 5 === 4) || (i === displayImages.length - 1 && i % 2 === 0); 
            const spanClass = isWide ? "md:col-span-2" : "md:col-span-1";

            return (
              <div 
                key={img.id || i} 
                className={`relative group overflow-hidden rounded-3xl ${spanClass} row-span-1 shadow-sm bg-muted cursor-pointer animate-in fade-in zoom-in-95 duration-700`}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <img
                  src={img.url}
                  alt={img.title || "Foto galería"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                  loading="lazy"
                  onError={(e) => {
                    // Si la imagen falla (URL rota), ponemos un placeholder gris
                    e.currentTarget.src = "https://placehold.co/600x400/eee/999?text=Imagen+No+Disponible";
                  }}
                />
                
                {/* Overlay Interactivo */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                  
                  {/* Badge / Categoría */}
                  <Badge className="self-start bg-secondary text-primary-foreground hover:bg-secondary border-none mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                    {img.title || "Galería"}
                  </Badge>

                  <div className="flex items-center justify-between translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    <p className="text-white font-bold text-lg line-clamp-1 mr-2">
                      {img.description || "Momento Ayenhue"}
                    </p>
                    <ZoomIn className="text-white/80 w-6 h-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}