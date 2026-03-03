import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, X, ChevronLeft, ChevronRight, PlayCircle, 
  ZoomIn, Leaf, Sparkles, Sun, Cloud, Hand, Loader2 
} from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import type { GalleryImage } from "@shared/schema";

// --- TIPO DE DATOS ---
type Album = { 
  title: string; 
  coverImage: string; 
  isVideoCover: boolean; 
  count: number; 
  images: GalleryImage[]; 
};

// --- COMPONENTES DE SKELETON ---
function OrganicCloudSkeleton({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={cn("w-full h-full animate-pulse", className)} preserveAspectRatio="none">
      <path d="M360,150 C360,230 300,280 200,280 C100,280 40,230 40,150 C40,70 100,20 200,20 C300,20 360,70 360,150 Z" 
            style={{ filter: "blur(12px)", opacity: 0.4 }} transform="scale(1.05) translate(-10, -5)" fill="currentColor" />
      <path d="M350,150 C350,220 300,270 200,270 C100,270 50,220 50,150 C50,80 100,30 200,30 C300,30 350,80 350,150 Z" fill="currentColor" />
    </svg>
  );
}

function OrganicTextSkeleton({ className, width = "100%" }: { className?: string, width?: string }) {
  return (
    <svg width={width} height="28" viewBox="0 0 200 28" className={cn("animate-pulse", className)} preserveAspectRatio="none">
      <path d="M10,14 Q 55,4 100,14 T 190,14" stroke="currentColor" strokeWidth="18" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16 relative z-10">
      {[1, 2, 3].map((i) => (
        <div key={i} className="relative my-6">
          <div className="h-95 w-full relative">
            <OrganicCloudSkeleton className="relative z-10 text-slate-200" />
          </div>
          <div className="space-y-5 px-6 mt-8">
            <OrganicTextSkeleton width="35%" className="h-7 text-slate-100" />
            <OrganicTextSkeleton width="85%" className="h-10 text-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

// --- ELEMENTOS DECORATIVOS ---
function FloatingElements({ isModalOpen }: { isModalOpen: boolean }) {
  const decorations = useMemo(() => [
    { type: 'icon', Icon: Leaf, size: 40, pos: "top-10 left-[5%]", delay: 0, color: "text-secondary", anim: "animate-float" },
    { type: 'icon', Icon: Sun, size: 60, pos: "top-[40%] right-[8%]", delay: 2, color: "text-amber-200", anim: "animate-float-slow" },
    { type: 'icon', Icon: Sparkles, size: 30, pos: "bottom-[20%] left-[10%]", delay: 1, color: "text-secondary", anim: "animate-float" },
    { type: 'icon', Icon: Leaf, size: 45, pos: "bottom-10 right-[15%]", delay: 3, color: "text-emerald-200", anim: "animate-float-slow" },
  ], []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {decorations.map((item, i) => (
        <div 
          key={i} 
          className={cn(
            "absolute transition-all duration-2000 ease-in-out opacity-10", 
            item.pos, item.anim, item.color,
            isModalOpen && "blur-sm opacity-5"
          )}
          style={{ animationDelay: `${item.delay}s` }}
        >
          <item.Icon size={item.size} strokeWidth={1} />
        </div>
      ))}
    </div>
  );
}

// --- TARJETA DE ÁLBUM ---
function AlbumCard({ album, index, onOpen }: { album: Album, index: number, onOpen: (a: Album) => void }) {
  const rotation = index % 3 === 0 ? "rotate-2" : index % 3 === 1 ? "-rotate-2" : "rotate-1";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      onClick={() => onOpen(album)}
      className="group cursor-pointer relative my-6"
    >
      <div className={cn("relative h-100 bg-white rounded-[3rem] border-[6px] border-white shadow-xl overflow-hidden z-10 transition-all duration-500 group-hover:-translate-y-3", rotation)}>
        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-100 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-full text-primary shadow-xl"><ZoomIn size={32} /></div>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
        <div className="absolute inset-0 p-8 flex flex-col justify-end">
          <Badge className="w-fit mb-3 bg-secondary text-primary font-black border-none px-4">{album.count} fotos</Badge>
          <h3 className="text-3xl font-black font-heading text-white mb-2 leading-tight">{album.title}</h3>
          <div className="flex items-center gap-2 text-secondary font-black text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            Explorar Álbum <FolderOpen className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- ANIMACIONES DEL LIGHTBOX ---
const pageFlipVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 500 : -500, opacity: 0, scale: 0.95 }),
  center: { 
    zIndex: 1, x: 0, opacity: 1, scale: 1, 
    transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.3 } } 
  },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 500 : -500, opacity: 0, scale: 0.95 })
};

export default function Gallery() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSwipeHint, setShowSwipeHint] = useState(false);

  const isVideo = (url: string) => /\.(mp4|webm|ogg|mov)$/i.test(url.split("?")[0]);

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then((data: GalleryImage[]) => {
        const groups: Record<string, GalleryImage[]> = {};
        data.forEach(img => {
          const name = img.title || "General";
          if (!groups[name]) groups[name] = [];
          groups[name].push(img);
        });
        const list = Object.keys(groups).map(key => ({
          title: key,
          coverImage: groups[key][0].url,
          isVideoCover: isVideo(groups[key][0].url),
          count: groups[key].length,
          images: groups[key].reverse()
        }));
        setAlbums(list);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const paginate = useCallback((newDir: number) => {
    if (!selectedAlbum) return;
    setDirection(newDir);
    setCurrentImageIndex(prev => (prev + newDir + selectedAlbum.images.length) % selectedAlbum.images.length);
  }, [selectedAlbum]);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
    if (!sessionStorage.getItem("ayenhue_swipe_hint")) {
      setShowSwipeHint(true);
      setTimeout(() => setShowSwipeHint(false), 3500);
      sessionStorage.setItem("ayenhue_swipe_hint", "true");
    }
  };

  const closeAlbum = () => { setSelectedAlbum(null); document.body.style.overflow = 'unset'; };

  return (
    <section id="galeria" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Gochi+Hand&display=swap');
        .font-handwritten { font-family: 'Gochi Hand', cursive; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float 4s ease-in-out infinite; }
      `}} />

      <FloatingElements isModalOpen={!!selectedAlbum} />

      <div className={cn(UI.containerX, "relative z-10")}>
        <SectionHeader 
          kicker="Galería de Tesoros" 
          title="Momentos que dejan huella" 
          subtitle="Un recorrido por la alegría y el descubrimiento de nuestros niños y niñas." 
        />
        
        {loading ? <GallerySkeleton /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
            {albums.map((album, i) => <AlbumCard key={i} album={album} index={i} onOpen={openAlbum} />)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-1000 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between">
            
            {/* Header del Modal */}
            <div className="w-full p-6 md:p-10 flex justify-between items-center text-white z-50">
              <div className="flex flex-col">
                <h3 className="text-xl md:text-2xl font-black font-heading leading-tight">{selectedAlbum.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{currentImageIndex + 1} de {selectedAlbum.images.length}</span>
              </div>
              <button onClick={closeAlbum} className="p-4 bg-white/10 rounded-full text-white hover:bg-secondary hover:text-primary transition-all shadow-lg"><X size={28} /></button>
            </div>

            {/* Controles Laterales (Desktop) */}
            <button className="absolute left-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-secondary hidden md:block z-50 transition-colors" onClick={() => paginate(-1)}><ChevronLeft size={80} strokeWidth={1} /></button>
            <button className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-secondary hidden md:block z-50 transition-colors" onClick={() => paginate(1)}><ChevronRight size={80} strokeWidth={1} /></button>

            {/* Visor de Imagen/Video Mejorado para Responsive */}
            <div className="relative w-full flex-1 flex items-center justify-center p-4 overflow-hidden touch-none">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div 
                  key={currentImageIndex} custom={direction} variants={pageFlipVariants} initial="enter" animate="center" exit="exit"
                  className="absolute w-full h-full flex flex-col items-center justify-center"
                  drag="x" dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = offset.x * velocity.x;
                    if (swipe < -5000) paginate(1);
                    else if (swipe > 5000) paginate(-1);
                  }}
                >
                  <div className="relative flex flex-col items-center max-w-full max-h-full">
                    <div className="relative max-h-[60vh] md:max-h-[75vh] flex items-center justify-center px-4">
                      {isVideo(selectedAlbum.images[currentImageIndex].url) ? (
                        <video 
                          src={selectedAlbum.images[currentImageIndex].url} 
                          className="max-w-full max-h-full rounded-2xl md:rounded-4xl shadow-2xl border-4 border-white/10" 
                          controls autoPlay muted loop
                        />
                      ) : (
                        <img 
                          src={selectedAlbum.images[currentImageIndex].url} 
                          alt="Galería" 
                          className="max-w-full max-h-full object-contain rounded-2xl md:rounded-4xl shadow-2xl border-4 border-white/10" 
                        />
                      )}
                    </div>

                    {/* Descripción con espacio garantizado */}
                    {selectedAlbum.images[currentImageIndex].description && (
                      <motion.div 
                        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                        className="mt-6 md:mt-10 bg-secondary text-primary px-6 py-3 rounded-2xl md:rounded-full font-handwritten text-lg md:text-xl shadow-xl text-center max-w-[90vw] md:max-w-2xl whitespace-normal"
                      >
                        {selectedAlbum.images[currentImageIndex].description}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hint de Navegación Móvil */}
            <div className="pb-8 md:hidden text-white/30 text-xs flex items-center gap-2">
              <Hand size={16} /> Desliza para navegar
            </div>

            {/* Hint Flotante Inicial */}
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-1100 flex flex-col items-center justify-center pointer-events-none bg-black/20">
                  <motion.div animate={{ x: [-30, 30, -30] }} transition={{ duration: 2, repeat: Infinity }} className="text-secondary mb-4">
                    <Hand size={80} fill="currentColor" className="opacity-40" />
                  </motion.div>
                  <p className="text-white font-handwritten text-2xl">Desliza para explorar</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}