import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  FolderOpen, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle,
  ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@shared/schema";

// --- TIPOS ---
type Album = {
  title: string;
  coverImage: string;
  isVideoCover: boolean;
  count: number;
  images: GalleryImage[];
};

// --- COMPONENTE SKELETON (Carga Percibida) ---
function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-[350px] w-full rounded-[2.5rem]" />
          <div className="space-y-2 px-4">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // --- HELPERS DE OPTIMIZACIÓN ---
  const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg|mov)$/i);

  const getThumbnail = (url: string) => {
    if (isVideo(url)) return url.replace(/\.[^/.]+$/, ".jpg");
    // Optimización Cloudinary: formato y calidad automática + redimensión para la grilla
    if (url.includes("cloudinary.com")) {
      return url.replace("/upload/", "/upload/f_auto,q_auto,w_800,c_fill,g_auto/");
    }
    return url;
  };

  // --- CARGA DE DATOS ---
  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryImage[]) => {
        const groups: Record<string, GalleryImage[]> = {};
        
        data.forEach(img => {
          const albumName = img.title || "General";
          if (!groups[albumName]) groups[albumName] = [];
          groups[albumName].push(img);
        });

        const albumList: Album[] = Object.keys(groups).map(key => {
          const albumImages = groups[key].reverse();
          const lastItem = albumImages[0];
          return {
            title: key,
            coverImage: getThumbnail(lastItem.url),
            isVideoCover: !!isVideo(lastItem.url),
            count: groups[key].length,
            images: albumImages
          };
        });

        setAlbums(albumList);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando galería:", err);
        setLoading(false);
      });
  }, []);

  // --- NAVEGACIÓN ---
  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentImageIndex((prev) => (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length);
  };

  return (
    <section id="galeria" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-secondary text-primary font-bold px-4 py-1 uppercase tracking-wider text-xs">
            Galería Multimedia
          </Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
            Explora nuestros momentos
          </h2>
          <p className="text-muted-foreground text-lg">
            Fotos y videos que reflejan la alegría y el aprendizaje diario.
          </p>
        </div>

        {loading ? (
          <GallerySkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album, index) => (
              <motion.div
                key={album.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => openAlbum(album)}
                className="group cursor-pointer"
              >
                <div className="relative h-[350px] rounded-[2.5rem] overflow-hidden shadow-md bg-white transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 border border-gray-100">
                  <img 
                    src={album.coverImage} 
                    alt={album.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  
                  {album.isVideoCover && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg group-hover:scale-110 transition-transform" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-secondary text-primary font-bold border border-white/20">
                        {album.count} archivos
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-1 text-white drop-shadow-md">
                      {album.title}
                    </h3>
                    <div className="flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      Abrir Álbum <FolderOpen className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* --- MODAL / LIGHTBOX --- */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeAlbum}
          >
            {/* Header del Modal */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 text-white">
              <div>
                <h3 className="text-xl font-bold">{selectedAlbum.title}</h3>
                <p className="text-sm text-gray-400">{currentImageIndex + 1} de {selectedAlbum.images.length}</p>
              </div>
              <button 
                onClick={closeAlbum} 
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Cerrar galería"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Controles laterales */}
            <button 
              className="absolute left-4 p-4 text-white/50 hover:text-secondary transition-colors z-50 hidden md:block" 
              onClick={prevImage}
            >
              <ChevronLeft className="w-12 h-12" />
            </button>

            {/* CONTENIDO CENTRAL */}
            <div className="relative w-full h-full max-w-6xl max-h-[80vh] p-4 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {isVideo(selectedAlbum.images[currentImageIndex].url) ? (
                  <motion.video
                    key={`vid-${currentImageIndex}`}
                    src={selectedAlbum.images[currentImageIndex].url}
                    className="max-w-full max-h-full rounded-2xl shadow-2xl"
                    controls
                    autoPlay
                    muted
                    preload="metadata"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()} 
                  />
                ) : (
                  <motion.img
                    key={`img-${currentImageIndex}`}
                    src={selectedAlbum.images[currentImageIndex].url}
                    alt="Imagen de galería"
                    fetchPriority="high"
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </AnimatePresence>
              
              {selectedAlbum.images[currentImageIndex].description && (
                <div className="absolute -bottom-12 bg-white/10 text-white px-6 py-2 rounded-full backdrop-blur-md text-sm border border-white/10">
                  {selectedAlbum.images[currentImageIndex].description}
                </div>
              )}
            </div>

            <button 
              className="absolute right-4 p-4 text-white/50 hover:text-secondary transition-colors z-50 hidden md:block" 
              onClick={nextImage}
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}