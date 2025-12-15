import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, FolderOpen, X, ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { GalleryImage } from "@shared/schema";

type Album = {
  title: string;
  coverImage: string;
  isVideoCover: boolean; // Nuevo campo
  count: number;
  images: GalleryImage[];
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Helper para detectar video
  const isVideo = (url: string) => url.match(/\.(mp4|webm|ogg|mov)$/i);

  // Helper para obtener miniatura estática de un video (Truco Cloudinary)
  const getThumbnail = (url: string) => {
    if (!isVideo(url)) return url;
    // Reemplaza la extensión final (.mp4) por .jpg
    return url.replace(/\.[^/.]+$/, ".jpg");
  };

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data: GalleryImage[]) => {
        setImages(data);
        
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
            // Usamos el truco de la miniatura para la portada siempre
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

  if (loading) return <div className="py-32 flex justify-center"><Loader2 className="h-10 w-10 animate-spin text-primary" /></div>;
  if (albums.length === 0) return null;

  return (
    <section id="galeria" className="py-24 bg-slate-50 relative overflow-hidden">
        {/* Fondos decorativos */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="border-secondary text-primary font-bold px-4 py-1">Galería Multimedia</Badge>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">Explora nuestros momentos</h2>
          <p className="text-muted-foreground text-lg">Fotos y videos organizados por colecciones.</p>
        </div>

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
              <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-md bg-white transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2">
                
                {/* PORTADA (Siempre es imagen gracias a getThumbnail) */}
                <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                
                {/* Icono gigante de Play si la última subida fue video */}
                {album.isVideoCover && (
                   <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                     <PlayCircle className="w-16 h-16 text-white/80 drop-shadow-lg group-hover:scale-110 transition-transform" />
                   </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-secondary text-primary font-bold border border-white/20 hover:bg-white hover:border-transparent">
                            {album.count} archivos
                        </Badge>
                    </div>
                    <h3 className="text-2xl font-bold font-heading mb-2 leading-tight text-white drop-shadow-md">{album.title}</h3>
                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                        <p className="text-gray-200 text-sm mb-4 line-clamp-2">{album.images[0]?.description || "Colección de momentos"}</p>
                        <div className="inline-flex items-center gap-2 text-secondary font-bold text-sm uppercase tracking-wider">
                            Abrir Álbum <FolderOpen className="w-4 h-4" />
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL / LIGHTBOX */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={closeAlbum}
          >
            {/* Header Modal */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 text-white">
                <div>
                    <h3 className="text-xl font-bold">{selectedAlbum.title}</h3>
                    <p className="text-sm text-gray-400">{currentImageIndex + 1} de {selectedAlbum.images.length}</p>
                </div>
                <button onClick={closeAlbum} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-8 h-8" /></button>
            </div>

            <button className="absolute left-4 p-4 text-white hover:text-secondary transition-colors z-50 hidden md:block" onClick={prevImage}><ChevronLeft className="w-12 h-12" /></button>

            {/* CONTENIDO CENTRAL (VIDEO O IMAGEN) */}
            <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isVideo(selectedAlbum.images[currentImageIndex].url) ? (
                        // RENDERIZAR VIDEO
                        <motion.video
                            key={`video-${currentImageIndex}`}
                            src={selectedAlbum.images[currentImageIndex].url}
                            className="max-w-full max-h-full rounded-lg shadow-2xl"
                            controls
                            autoPlay
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={(e) => e.stopPropagation()} 
                        />
                    ) : (
                        // RENDERIZAR IMAGEN
                        <motion.img
                            key={`img-${currentImageIndex}`}
                            src={selectedAlbum.images[currentImageIndex].url}
                            alt="Galería"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    )}
                </AnimatePresence>
                
                {selectedAlbum.images[currentImageIndex].description && (
                    <div className="absolute bottom-8 bg-black/60 text-white px-6 py-3 rounded-full backdrop-blur-md max-w-2xl text-center z-50">
                        {selectedAlbum.images[currentImageIndex].description}
                    </div>
                )}
            </div>

            <button className="absolute right-4 p-4 text-white hover:text-secondary transition-colors z-50 hidden md:block" onClick={nextImage}><ChevronRight className="w-12 h-12" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}