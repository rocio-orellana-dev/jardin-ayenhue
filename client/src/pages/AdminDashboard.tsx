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
  MessageSquare, Star, Plus, Image as ImageIcon, ExternalLink, Upload, Pencil, Ban,
  Building2, Shield, Filter, EyeOff, LayoutDashboard
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ContactMessage, Testimonial, GalleryImage } from "@shared/schema";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"messages" | "testimonials" | "gallery">("messages");
  
  // Datos
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const ALBUM_CATEGORIES = [
    "Vida Saludable",
    "Actividades Educativas",
    "Infraestructura",
    "Eventos y Celebraciones",
    "Talleres y Arte",
    "Salidas Pedagógicas"
  ];
  
  // --- ESTADOS DE EDICIÓN Y FORMULARIOS ---
  const [testimonialForm, setTestimonialForm] = useState({ 
    name: "", role: "Apoderado", content: "", rating: 5, avatar_url: "" 
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTestimonialFile, setSelectedTestimonialFile] = useState<File | null>(null);
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);

  // Estado Galería
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
      toast({
        title: "Sesión cerrada",
        description: "Ha salido del panel de administración"
      });
      setTimeout(() => setLocation("/login"), 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive"
      });
    }
  };

  // --- LOGICA MENSAJES ---
  const toggleStatus = async (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "new" ? "read" : "new";
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData(); 
    toast({ 
      title: newStatus === "read" ? "Mensaje leído" : "Mensaje marcado como nuevo",
      className: "bg-indigo-50 border-indigo-200 text-indigo-800"
    });
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar este mensaje?")) return;
    
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages(messages.filter(m => m.id !== id));
      
      const messageToDelete = messages.find(m => m.id === id);
      if (messageToDelete?.status === 'new') {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      toast({ title: "Mensaje eliminado", className: "bg-rose-50 border-rose-200 text-rose-800" });
    } catch (error) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  // --- LOGICA TESTIMONIOS ---
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
    if (testimonialFileInputRef.current) testimonialFileInputRef.current.value = "";
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
        
        if (!uploadRes.ok) throw new Error("Error subiendo imagen");
        const { url } = await uploadRes.json();
        finalAvatarUrl = url;
      }

      const payload = { ...testimonialForm, rating: 5, avatar_url: finalAvatarUrl || null };
      
      let res;
      if (editingId) {
        res = await fetch(`/api/admin/testimonials/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      
      if (res.ok) {
        toast({ 
          title: editingId ? "Actualizado correctamente" : "Testimonio creado",
          className: "bg-emerald-50 border-emerald-200 text-emerald-800"
        });
        cancelEditing();
        fetchData();
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Ocurrió un error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar este testimonio?")) return;
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast({ title: "Testimonio eliminado" });
      if (editingId === id) cancelEditing();
    } catch (error) {
      toast({ variant: "destructive", title: "Error" });
    }
  };

  // --- LOGICA GALERIA ---
  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGalleryFile) {
      toast({ variant: "destructive", title: "Falta el archivo", description: "Seleccione una imagen o video" });
      return;
    }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedGalleryFile);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      
      if (!uploadRes.ok) throw new Error("Fallo la subida");
      const { url } = await uploadRes.json();

      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          url: url, 
          title: newImageMeta.title, 
          description: newImageMeta.description, 
          displayOrder: galleryImages.length + 1 
        }),
      });
      if (res.ok) {
        toast({ title: "Archivo subido a la galería", className: "bg-violet-50 border-violet-200 text-violet-800" });
        setNewImageMeta({ title: "", description: "" });
        setSelectedGalleryFile(null);
        if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
        fetchData();
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error al subir", description: "Verifique el tamaño del archivo" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteImage = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar este archivo?")) return;
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      setGalleryImages(galleryImages.filter(img => img.id !== id));
      toast({ title: "Archivo eliminado" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-rose-200/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-200/30 rounded-full blur-[100px] animate-pulse delay-700" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-4 bg-white/50 backdrop-blur-xl rounded-full shadow-xl mb-4 ring-1 ring-white/50">
            <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
          </div>
          <p className="text-slate-600 font-medium animate-pulse">Cargando panel...</p>
        </div>
      </div>
    );
  }

  // --- RENDERIZADO PRINCIPAL ---
  return (
    <div className="min-h-screen bg-slate-50 relative font-sans text-slate-800 pb-20">
      {/* Fondo Decorativo Estático (para no afectar rendimiento) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-rose-100/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 space-y-8">
        
        {/* HEADER: Diseño Glass limpio */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white/70 backdrop-blur-xl p-6 rounded-2rem shadow-xl shadow-indigo-100/50 border border-white/50">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-linear-to-br from-indigo-500 to-purple-500 rounded-2xl shadow-lg shadow-indigo-200 text-white">
              <Building2 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Panel de Dirección</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-500 font-medium text-sm">Sistema Activo · Jardín Ayenhue</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="ghost" onClick={fetchData} className="rounded-xl hover:bg-slate-100 text-slate-600">
              <RefreshCw className="h-5 w-5 mr-2" /> Actualizar
            </Button>
            <Button 
              onClick={handleLogout} 
              className="rounded-xl bg-white border border-rose-100 text-rose-600 hover:bg-rose-50 hover:text-rose-700 shadow-sm"
            >
              <LogOut className="h-5 w-5 mr-2" /> Salir
            </Button>
          </div>
        </div>

        {/* ESTADÍSTICAS: Tarjetas flotantes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Mensajes", count: messages.length, icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50" },
            { title: "Testimonios", count: testimonials.length, icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
            { title: "Galería", count: galleryImages.length, icon: ImageIcon, color: "text-purple-600", bg: "bg-purple-50" }
          ].map((stat, idx) => (
            <Card key={idx} className="border-0 shadow-lg shadow-slate-200/50 bg-white/80 backdrop-blur-md rounded-3xl hover:-translate-y-1 transition-transform duration-300">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 font-medium text-sm mb-1">{stat.title}</p>
                  <h3 className="text-3xl font-bold text-slate-800">{stat.count}</h3>
                </div>
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="h-7 w-7" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* NAVEGACIÓN: Tabs tipo Cápsula */}
        <div className="flex justify-center">
          <div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full shadow-md border border-white/50 inline-flex gap-1 overflow-x-auto max-w-full">
            {[
              { id: "messages", label: "Mensajes", icon: MessageSquare, count: unreadCount },
              { id: "testimonials", label: "Testimonios", icon: Star, count: 0 },
              { id: "gallery", label: "Galería", icon: ImageIcon, count: 0 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all duration-300
                  ${activeTab === tab.id 
                    ? "bg-slate-800 text-white shadow-lg shadow-slate-200 transform scale-105" 
                    : "text-slate-500 hover:bg-white hover:text-slate-700"}
                `}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-1 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL: Contenedor con transición */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* --- TAB: MENSAJES --- */}
          {activeTab === "messages" && (
            <Card className="border-0 shadow-xl shadow-slate-200/60 bg-white/80 backdrop-blur-xl rounded-2rem overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-white/50 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg"><MessageSquare className="h-5 w-5 text-blue-600"/></div>
                    <CardTitle className="text-xl text-slate-800">Bandeja de Entrada</CardTitle>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    {messages.length} mensajes recibidos
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-b-slate-100 hover:bg-transparent">
                      <TableHead className="pl-8 w-[180px]">Fecha</TableHead>
                      <TableHead>Remitente</TableHead>
                      <TableHead className="w-[40%]">Mensaje</TableHead>
                      <TableHead className="text-right pr-8">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow key={msg.id} className={`border-b-slate-50 transition-colors ${msg.status === 'new' ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}>
                        <TableCell className="pl-8 py-4">
                          <div className="flex flex-col">
                            <span className={`font-semibold text-sm ${msg.status === 'new' ? 'text-blue-700' : 'text-slate-600'}`}>
                              {new Date(msg.createdAt || "").toLocaleDateString()}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(msg.createdAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-bold text-slate-800">{msg.name}</div>
                            <div className="text-sm text-slate-500">{msg.email}</div>
                            {msg.phone && <div className="text-xs text-slate-400 mt-1 flex items-center gap-1"><span className="opacity-50">📱</span> {msg.phone}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-600 text-sm leading-relaxed line-clamp-2 max-w-prose">
                            {msg.message}
                          </div>
                        </TableCell>
                        <TableCell className="pr-8 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleStatus(msg.id, msg.status)} 
                              className={`rounded-full ${msg.status === 'new' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'text-slate-400 hover:bg-slate-100'}`}
                              title={msg.status === 'new' ? "Marcar como leído" : "Marcar como no leído"}
                            >
                              {msg.status === "new" ? <CheckCircle className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteMessage(msg.id)} 
                              className="rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {messages.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="h-64 text-center">
                          <div className="flex flex-col items-center justify-center text-slate-400">
                            <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
                            <p>No hay mensajes nuevos</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* --- TAB: TESTIMONIOS --- */}
          {activeTab === "testimonials" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Formulario Lateral */}
              <div className="lg:col-span-4">
                <Card className="border-0 shadow-xl shadow-slate-200/60 bg-white/90 backdrop-blur-xl rounded-2rem sticky top-8">
                  <div className="h-2 w-full bg-linear-to-r from-amber-400 to-orange-400" />
                  <CardHeader className="pb-2 pt-6 px-6">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center justify-between">
                      {editingId ? "Editar Testimonio" : "Nuevo Testimonio"}
                      {editingId && <Button variant="ghost" size="sm" onClick={cancelEditing} className="h-8 text-rose-500 bg-rose-50 rounded-lg text-xs">Cancelar</Button>}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                      {/* Avatar Upload */}
                      <div 
                        className="group relative h-32 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all"
                        onClick={() => testimonialFileInputRef.current?.click()}
                      >
                        <input type="file" accept="image/*" className="hidden" ref={testimonialFileInputRef} onChange={(e) => { if (e.target.files && e.target.files[0]) setSelectedTestimonialFile(e.target.files[0]); }} />
                        
                        {selectedTestimonialFile ? (
                          <div className="text-center p-2">
                             <div className="mx-auto w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2"><CheckCircle className="h-6 w-6 text-emerald-600" /></div>
                             <p className="text-xs text-emerald-700 font-bold truncate max-w-[200px]">{selectedTestimonialFile.name}</p>
                          </div>
                        ) : testimonialForm.avatar_url ? (
                          <div className="relative w-full h-full p-2">
                            <img src={testimonialForm.avatar_url} className="w-full h-full object-contain rounded-xl opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 text-white font-medium opacity-0 group-hover:opacity-100 rounded-xl transition-opacity">Cambiar</div>
                          </div>
                        ) : (
                          <div className="text-center text-slate-400 group-hover:text-amber-500">
                            <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <span className="text-xs font-semibold">Subir Foto / Logo</span>
                          </div>
                        )}
                      </div>

                      <Input 
                        placeholder="Nombre Completo" 
                        value={testimonialForm.name} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} 
                        className="bg-slate-50 border-transparent focus:bg-white focus:border-amber-400 h-11 rounded-xl"
                        required 
                      />
                      <Input 
                        placeholder="Rol (ej: Apoderada Sala Cuna)" 
                        value={testimonialForm.role} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})} 
                        className="bg-slate-50 border-transparent focus:bg-white focus:border-amber-400 h-11 rounded-xl"
                        required 
                      />
                      <Textarea 
                        placeholder="Escriba aquí la experiencia..." 
                        value={testimonialForm.content} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})} 
                        className="bg-slate-50 border-transparent focus:bg-white focus:border-amber-400 resize-none rounded-xl"
                        rows={4}
                        required 
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-xl bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-bold shadow-lg shadow-amber-200"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : editingId ? "Guardar Cambios" : "Publicar Testimonio"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Lista de Testimonios */}
              <div className="lg:col-span-8 space-y-4">
                {testimonials.map((t) => (
                  <div 
                    key={t.id} 
                    className={`
                      relative flex gap-5 p-6 rounded-2rem bg-white shadow-sm border border-slate-100 transition-all duration-300
                      ${editingId === t.id ? 'ring-2 ring-amber-400 scale-[1.02] shadow-lg' : 'hover:shadow-md'}
                    `}
                  >
                    <div className="shrink-0">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 ring-4 ring-white shadow-md">
                        {t.avatar_url ? (
                          <img src={t.avatar_url} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-xl">
                            {t.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-slate-800 text-lg">{t.name}</h4>
                          <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-wide">
                            {t.role}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => startEditing(t)} className="h-8 w-8 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-full"><Pencil className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => deleteTestimonial(t.id)} className="h-8 w-8 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                      <div className="mt-3 relative">
                        <span className="absolute -left-2 -top-2 text-4xl text-slate-200 font-serif leading-none">“</span>
                        <p className="text-slate-600 leading-relaxed italic relative z-10">{t.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && (
                   <div className="text-center py-20 bg-white/40 rounded-2rem border border-dashed border-slate-300">
                     <Star className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                     <p className="text-slate-500">Aún no hay testimonios publicados</p>
                   </div>
                )}
              </div>
            </div>
          )}

          {/* --- TAB: GALERIA --- */}
          {activeTab === "gallery" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Upload Zone */}
              <div className="lg:col-span-4">
                 <Card className="border-0 shadow-xl shadow-slate-200/60 bg-white/90 backdrop-blur-xl rounded-2rem sticky top-8">
                  <div className="h-2 w-full bg-linear-to-r from-purple-400 to-indigo-500" />
                  <CardHeader className="pt-6 px-6 pb-2">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-purple-500"/> Subir Multimedia
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form onSubmit={handleCreateImage} className="space-y-5">
                      {/* Dropzone */}
                      <div 
                        className={`
                          border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group
                          ${selectedGalleryFile 
                            ? 'border-purple-500 bg-purple-50/30' 
                            : 'border-slate-200 hover:border-purple-400 hover:bg-purple-50/20'}
                        `}
                        onClick={() => galleryFileInputRef.current?.click()}
                      >
                         <input type="file" accept="image/*,video/*" className="hidden" ref={galleryFileInputRef} onChange={(e) => { if (e.target.files && e.target.files[0]) setSelectedGalleryFile(e.target.files[0]); }} />
                         
                         {selectedGalleryFile ? (
                           <div>
                             <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                               <CheckCircle className="h-6 w-6"/>
                             </div>
                             <p className="font-bold text-purple-700 text-sm truncate">{selectedGalleryFile.name}</p>
                           </div>
                         ) : (
                           <div>
                             <div className="w-12 h-12 bg-slate-100 text-slate-400 group-hover:bg-purple-100 group-hover:text-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors">
                               <Plus className="h-6 w-6"/>
                             </div>
                             <p className="font-medium text-slate-600">Clic para seleccionar</p>
                             <p className="text-xs text-slate-400 mt-1">Foto o Video MP4</p>
                           </div>
                         )}
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Álbum / Categoría</label>
                        <select 
                          className="w-full h-11 rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-100 text-sm"
                          value={newImageMeta.title} 
                          onChange={(e) => setNewImageMeta({...newImageMeta, title: e.target.value})} 
                          required
                        >
                          <option value="" disabled>Seleccione una opción...</option>
                          {ALBUM_CATEGORIES.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                          <option value="Otros">Otros</option>
                        </select>
                      </div>

                      <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Descripción</label>
                        <Input 
                          placeholder="Ej: Actividad de Fiestas Patrias" 
                          value={newImageMeta.description} 
                          onChange={(e) => setNewImageMeta({...newImageMeta, description: e.target.value})} 
                          className="bg-slate-50 border-transparent focus:bg-white focus:border-purple-500 h-11 rounded-xl"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full h-12 rounded-xl bg-linear-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold shadow-lg shadow-purple-200"
                        disabled={isSubmitting || !selectedGalleryFile || !newImageMeta.title}
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : "Subir Archivo"}
                      </Button>
                    </form>
                  </CardContent>
                 </Card>
              </div>

              {/* Gallery Grid */}
              <div className="lg:col-span-8">
                <Card className="border-0 bg-white/60 backdrop-blur-md rounded-2rem p-6 min-h-[500px]">
                  {galleryImages.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {galleryImages.map((img) => (
                        <div key={img.id} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                          {isVideo(img.url) ? (
                            <video src={img.url} className="w-full h-full object-cover" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                          ) : (
                            <img src={img.url} alt={img.title || "Imagen"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                          )}
                          
                          {/* Overlay on Hover */}
                          <div className="absolute inset-0 bg-linear-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                             <div className="flex justify-between items-end">
                                <div>
                                  <span className="text-[10px] font-bold text-white bg-white/20 backdrop-blur-md px-2 py-1 rounded-full uppercase tracking-wider">
                                    {img.title || "General"}
                                  </span>
                                </div>
                                <Button 
                                  variant="destructive" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-full shadow-lg" 
                                  onClick={() => deleteImage(img.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                             </div>
                          </div>
                          
                          {isVideo(img.url) && (
                            <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-bold backdrop-blur-sm pointer-events-none">
                              VIDEO
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                      <ImageIcon className="h-20 w-20 mb-4 stroke-1" />
                      <p className="text-lg">La galería está vacía</p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}