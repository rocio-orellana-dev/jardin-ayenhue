import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  FolderOpen, X, ChevronLeft, ChevronRight, PlayCircle, 
  ZoomIn, Leaf, Sparkles, Sun, Cloud, Hand 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";
import type { GalleryImage } from "@shared/schema";

// --- COMPONENTES DE SKELETON (Carga Orgánica) ---
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
          <div className="h-[380px] w-full relative">
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

// --- ELEMENTOS DECORATIVOS FLOTANTES ---
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
            "absolute transition-all duration-[2000ms] ease-in-out opacity-10", 
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const rotation = index % 3 === 0 ? "rotate-2" : index % 3 === 1 ? "-rotate-2" : "rotate-1";

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      onClick={() => onOpen(album)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group cursor-pointer relative my-6"
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute z-40 pointer-events-none"
            style={{ left: mousePos.x, top: mousePos.y }}
          >
            <Sparkles className="text-secondary w-8 h-8 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn("relative h-[400px] bg-white rounded-[3rem] border-[6px] border-white shadow-xl overflow-hidden z-10 transition-all duration-500 group-hover:-translate-y-3", rotation)}>
        <img src={album.coverImage} alt={album.title} className="w-full h-full object-cover transition-all duration-1000 saturate-[0.8] group-hover:saturate-100 group-hover:scale-110" />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-full text-primary shadow-xl"><ZoomIn size={32} /></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
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

// --- COMPONENTE PRINCIPAL ---
const pageFlipVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 800 : -800, rotateY: direction > 0 ? 45 : -45, opacity: 0, scale: 0.9 }),
  center: { zIndex: 1, x: 0, rotateY: 0, opacity: 1, scale: 1, transition: { x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.4 } } },
  exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 800 : -800, rotateY: direction < 0 ? 45 : -45, opacity: 0, scale: 0.9 } )
};

type Album = { title: string; coverImage: string; isVideoCover: boolean; count: number; images: GalleryImage[]; };

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
      });
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
      setTimeout(() => {
        setShowSwipeHint(false);
        sessionStorage.setItem("ayenhue_swipe_hint", "true");
      }, 3500);
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
        <SectionHeader kicker="Galería de Tesoros" title="Momentos que dejan huella" subtitle="Un recorrido por la alegría y el descubrimiento de nuestros niños y niñas." />
        {loading ? <GallerySkeleton /> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-16">
            {albums.map((album, i) => <AlbumCard key={i} album={album} index={i} onOpen={openAlbum} />)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedAlbum && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center">
            
            {/* HINT DE DESLIZAR (SWIPE) */}
            <AnimatePresence>
              {showSwipeHint && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[1100] flex flex-col items-center justify-center pointer-events-none">
                  <motion.div animate={{ x: [-50, 50, -50] }} transition={{ duration: 2, repeat: Infinity }} className="text-secondary mb-4">
                    <Hand size={80} fill="currentColor" className="opacity-40" />
                  </motion.div>
                  <p className="text-white font-handwritten text-2xl">Desliza para navegar</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute top-0 left-0 w-full p-6 md:p-10 flex justify-between items-center z-50">
              <div className="text-white">
                <h3 className="text-xl md:text-2xl font-black font-heading leading-none mb-1">{selectedAlbum.title}</h3>
                <span className="text-xs font-bold uppercase tracking-widest text-white/40">{currentImageIndex + 1} de {selectedAlbum.images.length}</span>
              </div>
              <button onClick={closeAlbum} className="p-4 bg-white/10 rounded-full text-white hover:bg-secondary hover:text-primary transition-all"><X size={28} /></button>
            </div>

            <button className="absolute left-8 text-white/20 hover:text-secondary hidden md:block z-50 transition-colors" onClick={() => paginate(-1)}><ChevronLeft size={80} strokeWidth={1} /></button>
            
            <div className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center touch-none">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div 
                  key={currentImageIndex} custom={direction} variants={pageFlipVariants} initial="enter" animate="center" exit="exit"
                  className="absolute w-full h-full flex items-center justify-center px-4"
                  drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.8}
                  onDragStart={() => setShowSwipeHint(false)}
                  onDragEnd={(_, { offset, velocity }) => {
                    const swipe = offset.x * velocity.x;
                    if (swipe < -5000) paginate(1);
                    else if (swipe > 5000) paginate(-1);
                  }}
                >
                  {isVideo(selectedAlbum.images[currentImageIndex].url) ? (
                    <video src={selectedAlbum.images[currentImageIndex].url} className="max-w-full max-h-full rounded-[2rem] shadow-2xl border-4 border-white/10 pointer-events-none" controls autoPlay muted />
                  ) : (
                    <img src={selectedAlbum.images[currentImageIndex].url} alt="Galería" className="max-w-full max-h-full object-contain rounded-[2rem] shadow-2xl border-4 border-white/10 pointer-events-none" />
                  )}

                  {selectedAlbum.images[currentImageIndex].description && (
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-secondary text-primary px-6 py-2 rounded-full font-handwritten text-xl shadow-xl whitespace-nowrap">
                      {selectedAlbum.images[currentImageIndex].description}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="absolute right-8 text-white/20 hover:text-secondary hidden md:block z-50 transition-colors" onClick={() => paginate(1)}><ChevronRight size={80} strokeWidth={1} /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}