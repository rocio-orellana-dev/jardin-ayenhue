import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { 
  Loader2, LogOut, Trash2, CheckCircle, XCircle, RefreshCw, 
  MessageSquare, Star, Plus, ImageIcon, ExternalLink, Upload, Pencil, Ban,
  Building2, Shield, Filter, EyeOff, LayoutDashboard, X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { ContactMessage, Testimonial, GalleryImage } from "@shared/schema";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"messages" | "testimonials" | "gallery">("messages");
  
  // --- DATOS ---
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // --- GESTIÓN DE CATEGORÍAS (DINÁMICAS) ---
  const [categories, setCategories] = useState([
    "Vida Saludable",
    "Actividades Educativas",
    "Infraestructura",
    "Eventos y Celebraciones",
    "Talleres y Arte",
    "Salidas Pedagógicas"
  ]);
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // --- ESTADOS DE FORMULARIOS ---
  const [testimonialForm, setTestimonialForm] = useState({ 
    name: "", role: "Apoderado", content: "", rating: 5, avatar_url: "" 
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTestimonialFile, setSelectedTestimonialFile] = useState<File | null>(null);
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);

  const [newImageMeta, setNewImageMeta] = useState({ title: "", description: "" });
  const [selectedGalleryFile, setSelectedGalleryFile] = useState<File | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const isVideo = (url: string) => {
    if (!url) return false;
    return url.match(/\.(mp4|webm|ogg|mov)$/i);
  };

  // --- CARGA DE DATOS ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resMsgs, resTests, resGallery] = await Promise.all([
        fetch("/api/admin/messages"),
        fetch("/api/admin/testimonials"),
        fetch("/api/admin/gallery")
      ]);

      if (resMsgs.status === 401) throw new Error("Unauthorized");

      const messagesData = await resMsgs.json();
      const testimonialsData = await resTests.json();
      const galleryData = await resGallery.json();
      
      setMessages(messagesData);
      setTestimonials(testimonialsData);
      setGalleryImages(galleryData);
      
      // Sincronizar categorías con las que ya existen en la BD
      const existingCategories = galleryData.map((img: GalleryImage) => img.title).filter(Boolean);
      setCategories(prev => Array.from(new Set([...prev, ...existingCategories])));

      const unread = messagesData.filter((msg: ContactMessage) => msg.status === 'new').length;
      setUnreadCount(unread);
      
      setLoading(false);
    } catch (error) {
      toast({
        title: "Sesión expirada",
        description: "Por favor inicie sesión nuevamente",
        variant: "destructive"
      });
      setTimeout(() => setLocation("/login"), 1500);
    }
  };

  useEffect(() => {
    fetchData();
  }, [setLocation]);

  const handleLogout = async () => {
    if (!confirm("¿Está segura de que desea cerrar sesión?")) return;
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      toast({ title: "Sesión cerrada" });
      setTimeout(() => setLocation("/login"), 1000);
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  // --- LÓGICA MENSAJES ---
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "new" ? "read" : "new";
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData(); 
    toast({ title: newStatus === "read" ? "Mensaje leído" : "Marcado como nuevo" });
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("¿Eliminar mensaje?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    fetchData();
    toast({ title: "Mensaje eliminado" });
  };

  // --- LÓGICA TESTIMONIOS ---
  const startEditing = (t: Testimonial) => {
    setTestimonialForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: 5,
      avatar_url: t.avatar_url || ""
    });
    setEditingId(t.id);
    setSelectedTestimonialFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setTestimonialForm({ name: "", role: "Apoderado", content: "", rating: 5, avatar_url: "" });
    setEditingId(null);
    setSelectedTestimonialFile(null);
  };

  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let finalAvatarUrl = testimonialForm.avatar_url;

      if (selectedTestimonialFile) {
        const formData = new FormData();
        formData.append("image", selectedTestimonialFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const { url } = await uploadRes.json();
        finalAvatarUrl = url;
      }

      const payload = { ...testimonialForm, isActive: true, avatar_url: finalAvatarUrl || null };
      const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials";
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: editingId ? "Actualizado" : "Creado con éxito" });
        cancelEditing();
        fetchData();
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error al guardar" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("¿Eliminar testimonio?")) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
    fetchData();
    toast({ title: "Testimonio eliminado" });
  };

  // --- LÓGICA GALERÍA ---
  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGalleryFile) return;

    const finalTitle = isAddingNewCategory ? newCategoryName : newImageMeta.title;
    if (!finalTitle) {
      toast({ title: "Seleccione o cree una categoría", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedGalleryFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await uploadRes.json();

      await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url, 
          title: finalTitle, 
          description: newImageMeta.description, 
          displayOrder: galleryImages.length + 1,
          isActive: true
        }),
      });

      if (isAddingNewCategory && !categories.includes(finalTitle)) {
        setCategories(prev => [...prev, finalTitle]);
      }

      toast({ title: "Subido a la galería" });
      setNewImageMeta({ title: "", description: "" });
      setNewCategoryName("");
      setIsAddingNewCategory(false);
      setSelectedGalleryFile(null);
      fetchData();
    } catch (error) {
      toast({ variant: "destructive", title: "Error al subir" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeCategory = (catToRemove: string) => {
    if (!confirm(`¿Eliminar la categoría "${catToRemove}" de la lista? (Las fotos existentes no se borrarán)`)) return;
    setCategories(prev => prev.filter(c => c !== catToRemove));
    if (newImageMeta.title === catToRemove) {
      setNewImageMeta({ ...newImageMeta, title: "" });
    }
    toast({ title: "Categoría quitada de la lista" });
  };

  const handleReplaceImage = async (id: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*,video/*";
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      if (!file) return;
      
      setIsSubmitting(true);
      toast({ title: "Cambiando imagen...", description: "Subiendo nuevo archivo" });

      try {
        const formData = new FormData();
        formData.append("image", file);
        const upRes = await fetch("/api/upload", { method: "POST", body: formData });
        const { url } = await upRes.json();

        const res = await fetch(`/api/admin/gallery/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        if (res.ok) {
          fetchData();
          toast({ title: "Imagen reemplazada con éxito" });
        }
      } catch (err) {
        toast({ title: "Error al reemplazar", variant: "destructive" });
      } finally {
        setIsSubmitting(false);
      }
    };
    input.click();
  };

  const deleteImage = async (id: number) => {
    if (!confirm("¿Eliminar este archivo?")) return;
    await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    fetchData();
    toast({ title: "Archivo eliminado" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="p-4 bg-white/50 backdrop-blur-xl rounded-full shadow-xl">
          <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-800 pb-20">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-200 h-200 bg-rose-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-200 h-200 bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/70 backdrop-blur-xl p-6 rounded-2rem shadow-xl border border-white/50">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-linear-to-br from-indigo-500 to-purple-500 rounded-2xl text-white">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Panel de Dirección</h1>
              <div className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Jardín Ayenhue · Sistema Activo
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={fetchData} className="rounded-xl hover:bg-slate-100"><RefreshCw className="h-5 w-5 mr-2" /> Actualizar</Button>
            <Button onClick={handleLogout} className="rounded-xl bg-white border border-rose-100 text-rose-600 hover:bg-rose-50 shadow-sm"><LogOut className="h-5 w-5 mr-2" /> Salir</Button>
          </div>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Mensajes", count: messages.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Testimonios", count: testimonials.length, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
            { title: "Galería", count: galleryImages.length, icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" }
          ].map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-lg bg-white/80 backdrop-blur-md rounded-3xl">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 font-medium text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.count}</h3>
                </div>
                <div className={cn("p-4 rounded-2xl", stat.bg, stat.color)}><stat.icon className="h-7 w-7" /></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* TABS NAVEGACIÓN */}
        <div className="flex justify-center">
          <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full shadow-md flex gap-1 border border-white/50">
            {[
              { id: "messages", label: "Mensajes", icon: MessageSquare, count: unreadCount },
              { id: "testimonials", label: "Testimonios", icon: Star, count: 0 },
              { id: "gallery", label: "Galería", icon: ImageIcon, count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300",
                  activeTab === tab.id ? "bg-slate-800 text-white shadow-lg scale-105" : "text-slate-500 hover:bg-white hover:text-slate-700"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.count > 0 && <span className="ml-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{tab.count}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- MENSAJES --- */}
          {activeTab === "messages" && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-xl rounded-2rem overflow-hidden">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-8">Fecha</TableHead>
                    <TableHead>Remitente</TableHead>
                    <TableHead className="w-[40%]">Mensaje</TableHead>
                    <TableHead className="text-right pr-8">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id} className={cn("border-b-slate-50", msg.status === 'new' && "bg-blue-50/30")}>
                      <TableCell className="pl-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{new Date(msg.createdAt || "").toLocaleDateString()}</span>
                          <span className="text-xs text-slate-400">{new Date(msg.createdAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold">{msg.name}</div>
                        <div className="text-xs text-slate-500">{msg.email}</div>
                      </TableCell>
                      <TableCell><div className="text-slate-600 text-sm line-clamp-2">{msg.message}</div></TableCell>
                      <TableCell className="pr-8 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => toggleStatus(msg.id, msg.status)} className="rounded-full hover:bg-emerald-50 text-emerald-600"><CheckCircle className="h-5 w-5" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteMessage(msg.id)} className="rounded-full hover:bg-rose-50 text-rose-500"><Trash2 className="h-5 w-5" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}

          {/* --- TESTIMONIOS --- */}
          {activeTab === "testimonials" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl rounded-2rem sticky top-8 overflow-hidden">
                  <div className="h-2 w-full bg-linear-to-r from-amber-400 to-orange-400" />
                  <CardHeader className="pb-2 pt-6 px-6"><CardTitle className="text-lg font-bold">{editingId ? "Editar" : "Nuevo"} Testimonio</CardTitle></CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                      <div className="h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-amber-50" onClick={() => testimonialFileInputRef.current?.click()}>
                        <input type="file" className="hidden" ref={testimonialFileInputRef} onChange={e => setSelectedTestimonialFile(e.target.files?.[0] || null)} />
                        {selectedTestimonialFile ? <div className="text-emerald-600 font-bold">{selectedTestimonialFile.name}</div> : <div className="text-slate-400">Subir Logo/Foto</div>}
                      </div>
                      <Input placeholder="Nombre Completo" value={testimonialForm.name} onChange={e => setTestimonialForm({...testimonialForm, name: e.target.value})} required className="rounded-xl" />
                      <Input placeholder="Rol (Ej: Apoderada)" value={testimonialForm.role} onChange={e => setTestimonialForm({...testimonialForm, role: e.target.value})} required className="rounded-xl" />
                      <Textarea placeholder="Experiencia..." value={testimonialForm.content} onChange={e => setTestimonialForm({...testimonialForm, content: e.target.value})} rows={5} required className="rounded-xl resize-none" />
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-linear-to-r from-amber-500 to-orange-600 rounded-xl h-12 shadow-lg shadow-amber-200">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : editingId ? "Guardar Cambios" : "Publicar"}
                      </Button>
                      {editingId && <Button variant="ghost" onClick={cancelEditing} className="w-full text-rose-500">Cancelar</Button>}
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8 space-y-4">
                {testimonials.map(t => (
                  <div key={t.id} className={cn("p-6 rounded-2rem bg-white shadow-sm flex gap-5 border border-slate-100", editingId === t.id && "ring-2 ring-amber-400 shadow-lg scale-102")}>
                    <div className="w-16 h-16 rounded-full bg-slate-100 overflow-hidden ring-4 ring-white shadow-sm flex items-center justify-center font-bold text-xl text-slate-400">
                      {t.avatar_url ? <img src={t.avatar_url} className="w-full h-full object-cover" /> : t.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{t.name}</h4>
                          <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase">{t.role}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => startEditing(t)} className="text-blue-500 hover:bg-blue-50 rounded-full"><Pencil size={18} /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(t.id)} className="text-rose-500 hover:bg-rose-50 rounded-full"><Trash2 size={18} /></Button>
                        </div>
                      </div>
                      <p className="mt-3 text-slate-600 italic">"{t.content}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* --- GALERÍA --- */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-xl rounded-2rem sticky top-8 overflow-hidden">
                  <div className="h-2 w-full bg-linear-to-r from-purple-400 to-indigo-500" />
                  <CardHeader className="pt-6 px-6 pb-2"><CardTitle className="text-lg font-bold">Subir Multimedia</CardTitle></CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleCreateImage} className="space-y-5">
                      <div className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer hover:bg-purple-50 transition-colors" onClick={() => galleryFileInputRef.current?.click()}>
                        <input type="file" className="hidden" ref={galleryFileInputRef} onChange={e => setSelectedGalleryFile(e.target.files?.[0] || null)} />
                        {selectedGalleryFile ? (
                          <div className="flex items-center justify-center gap-2 text-purple-600 font-bold animate-in fade-in zoom-in-95">
                            <CheckCircle size={20} /> {selectedGalleryFile.name}
                          </div>
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center gap-2">
                            <Upload className="h-8 w-8 opacity-40" />
                            <span>Clic para seleccionar archivo</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        {!isAddingNewCategory ? (
                          <div className="flex gap-2">
                            <div className="relative flex-1">
                              <select 
                                className="w-full h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-purple-100 text-sm p-2 pr-10 appearance-none"
                                value={newImageMeta.title}
                                onChange={(e) => {
                                  if (e.target.value === "ADD_NEW") {
                                    setIsAddingNewCategory(true);
                                    setNewImageMeta({ ...newImageMeta, title: "" });
                                  } else {
                                    setNewImageMeta({ ...newImageMeta, title: e.target.value });
                                  }
                                }}
                                required
                              >
                                <option value="" disabled>Seleccionar Álbum...</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                <option value="ADD_NEW" className="font-bold text-indigo-600">+ Crear nueva categoría...</option>
                              </select>
                              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                                <Filter size={14} />
                              </div>
                            </div>
                            
                            {newImageMeta.title && (
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeCategory(newImageMeta.title)}
                                className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl h-11 w-11 shrink-0"
                                title="Eliminar categoría de la lista"
                              >
                                <X size={18} />
                              </Button>
                            )}
                          </div>
                        ) : (
                          <div className="flex gap-2 animate-in slide-in-from-top-2">
                            <Input 
                              placeholder="Nombre del nuevo álbum" 
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              className="rounded-xl h-11 focus-visible:ring-purple-400"
                              autoFocus
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              onClick={() => {
                                setIsAddingNewCategory(false);
                                setNewCategoryName("");
                              }}
                              className="text-slate-400 hover:text-rose-500 rounded-xl h-11 w-11 px-0"
                            >
                              <Ban size={18} />
                            </Button>
                          </div>
                        )}
                      </div>

                      <Input 
                        placeholder="Descripción corta" 
                        value={newImageMeta.description} 
                        onChange={e => setNewImageMeta({...newImageMeta, description: e.target.value})} 
                        className="rounded-xl h-11" 
                      />

                      <Button type="submit" disabled={isSubmitting || !selectedGalleryFile} className="w-full bg-linear-to-r from-purple-500 to-indigo-600 rounded-xl h-12 text-white shadow-lg hover:shadow-purple-200 transition-all active:scale-95">
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <><Plus className="mr-2 h-5 w-5" /> Subir a la Galería</>}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.map(img => (
                    <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border-4 border-white hover:z-10 hover:scale-105">
                      {isVideo(img.url) ? <video src={img.url} className="w-full h-full object-cover" muted loop /> : <img src={img.url} className="w-full h-full object-cover" />}
                      
                      {/* OVERLAY ACCIONES (Refinado con el estilo blanco/rosa/indigo) */}
                      <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white text-indigo-600 hover:bg-indigo-50 shadow-lg hover:scale-110 transition-transform h-12 w-12"
                          onClick={() => handleReplaceImage(img.id)}
                          title="Cambiar imagen"
                        >
                          <RefreshCw size={22} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-white text-rose-600 hover:bg-rose-50 shadow-lg hover:scale-110 transition-transform h-12 w-12"
                          onClick={() => deleteImage(img.id)}
                          title="Eliminar"
                        >
                          <Trash2 size={22} />
                        </Button>
                      </div>
                      
                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold shadow-sm border border-slate-100 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {img.title || "General"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}