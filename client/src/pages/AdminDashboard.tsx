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
  Building2, Shield, Users, Calendar, Eye, EyeOff, Filter
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
  
  // --- ESTADOS DE EDICIÓN Y FORMULARIOS ---
  
  // Estado del Formulario Testimonios (Incluye avatar_url para guardar la foto vieja si no se sube nueva)
  const [testimonialForm, setTestimonialForm] = useState({ 
    name: "", role: "Apoderado", content: "", rating: 5, avatar_url: "" 
  });
  const [editingId, setEditingId] = useState<number | null>(null); // ID del testimonio que estamos editando
  const [selectedTestimonialFile, setSelectedTestimonialFile] = useState<File | null>(null);
  const testimonialFileInputRef = useRef<HTMLInputElement>(null);

  // Estado Galería
  const [newImageMeta, setNewImageMeta] = useState({ title: "", description: "" });
  const [selectedGalleryFile, setSelectedGalleryFile] = useState<File | null>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

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
      
      // Calcular mensajes no leídos
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
      title: newStatus === "read" ? "Mensaje marcado como leído" : "Mensaje marcado como nuevo",
      description: "El estado ha sido actualizado"
    });
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar este mensaje?")) return;
    
    try {
      await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
      setMessages(messages.filter(m => m.id !== id));
      
      // Actualizar contador de no leídos
      const messageToDelete = messages.find(m => m.id === id);
      if (messageToDelete?.status === 'new') {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      toast({ 
        title: "Mensaje eliminado",
        description: "El mensaje ha sido eliminado correctamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el mensaje",
        variant: "destructive"
      });
    }
  };

  // --- LOGICA TESTIMONIOS (CREAR Y EDITAR) ---

  const startEditing = (t: Testimonial) => {
    setTestimonialForm({
      name: t.name,
      role: t.role,
      content: t.content,
      rating: t.rating ?? 0,
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

      const payload = { ...testimonialForm, avatar_url: finalAvatarUrl || null };
      
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
          title: editingId ? "¡Testimonio Actualizado!" : "¡Testimonio Creado!",
          description: editingId 
            ? "Los cambios se han guardado correctamente"
            : "Nuevo testimonio agregado a la página web"
        });
        cancelEditing();
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast({ 
        variant: "destructive", 
        title: "Ocurrió un error",
        description: "Por favor, intente nuevamente"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar este testimonio?")) return;
    
    try {
      await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      setTestimonials(testimonials.filter(t => t.id !== id));
      toast({ 
        title: "Testimonio eliminado",
        description: "El testimonio ha sido eliminado de la página web"
      });
      if (editingId === id) cancelEditing();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar el testimonio"
      });
    }
  };

  // --- LOGICA GALERIA ---
  const handleCreateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGalleryFile) {
      toast({ 
        variant: "destructive", 
        title: "Imagen requerida",
        description: "Debes seleccionar una imagen para subir"
      });
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
        toast({ 
          title: "¡Imagen Subida!",
          description: "La imagen se ha agregado a la galería"
        });
        setNewImageMeta({ title: "", description: "" });
        setSelectedGalleryFile(null);
        if (galleryFileInputRef.current) galleryFileInputRef.current.value = "";
        fetchData();
      }
    } catch (error) {
      toast({ 
        variant: "destructive", 
        title: "Error al subir",
        description: "No se pudo subir la imagen. Verifique el formato"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteImage = async (id: number) => {
    if (!confirm("¿Está segura de que desea eliminar esta imagen de la galería?")) return;
    
    try {
      await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
      setGalleryImages(galleryImages.filter(img => img.id !== id));
      toast({ 
        title: "Imagen eliminada",
        description: "La imagen ha sido removida de la galería"
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo eliminar la imagen"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Cargando panel administrativo</h3>
            <p className="text-gray-600">Por favor espere un momento...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-4 md:p-8">
      {/* Fondo decorativo sutil */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto space-y-8">
        
        {/* Header mejorado */}
        <Card className="shadow-lg border-0 overflow-hidden bg-gradient-to-r from-white to-blue-50/50">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500" />
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl shadow-sm">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                    Panel de Administración
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      <Shield className="h-3.5 w-3.5" />
                      Área administrativa
                    </span>
                    <span className="text-gray-600 font-medium">
                      Jardín Ayenhue
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={fetchData} 
                  size="sm"
                  className="border-gray-300 hover:bg-gray-50"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Actualizar
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout} 
                  size="sm"
                  className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 border-0"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-md border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Mensajes totales</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{messages.length}</h3>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              {unreadCount > 0 && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">
                  <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse" />
                  {unreadCount} sin leer
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Testimonios activos</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{testimonials.length}</h3>
                </div>
                <div className="p-3 bg-emerald-100 rounded-lg">
                  <Star className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-500">
                Promedio: {(testimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / (testimonials.length || 1)).toFixed(1)} ★
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-md border-0 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Imágenes en galería</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{galleryImages.length}</h3>
                </div>
                <div className="p-3 bg-violet-100 rounded-lg">
                  <ImageIcon className="h-6 w-6 text-violet-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs mejorados */}
        <Card className="shadow-md border-0 overflow-hidden">
          <CardContent className="p-0">
            <div className="flex border-b overflow-x-auto">
              <button 
                onClick={() => setActiveTab("messages")} 
                className={`pb-3 px-6 font-medium flex items-center gap-3 whitespace-nowrap transition-all ${
                  activeTab === "messages" 
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                Mensajes
                {unreadCount > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => setActiveTab("testimonials")} 
                className={`pb-3 px-6 font-medium flex items-center gap-3 whitespace-nowrap transition-all ${
                  activeTab === "testimonials" 
                    ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50/50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Star className="h-5 w-5" />
                Testimonios
              </button>
              
              <button 
                onClick={() => setActiveTab("gallery")} 
                className={`pb-3 px-6 font-medium flex items-center gap-3 whitespace-nowrap transition-all ${
                  activeTab === "gallery" 
                    ? "text-violet-600 border-b-2 border-violet-600 bg-violet-50/50" 
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <ImageIcon className="h-5 w-5" />
                Galería
              </button>
            </div>
          </CardContent>
        </Card>

        {/* --- PESTAÑA MENSAJES MEJORADA --- */}
        {activeTab === "messages" && (
          <Card className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-white to-blue-50/50 border-b">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold text-gray-900">
                  Bandeja de Entrada
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow>
                      <TableHead className="font-semibold text-gray-700">Fecha</TableHead>
                      <TableHead className="font-semibold text-gray-700">Remitente</TableHead>
                      <TableHead className="font-semibold text-gray-700">Mensaje</TableHead>
                      <TableHead className="font-semibold text-gray-700 text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((msg) => (
                      <TableRow 
                        key={msg.id} 
                        className={`transition-colors hover:bg-gray-50 ${
                          msg.status === 'new' ? "bg-blue-50/30 border-l-4 border-l-blue-500" : ""
                        }`}
                      >
                        <TableCell className="whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-medium">{new Date(msg.createdAt || "").toLocaleDateString()}</span>
                            <span className="text-xs text-gray-500">
                              {new Date(msg.createdAt || "").toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-semibold text-gray-900">{msg.name}</div>
                            <div className="text-sm text-gray-600">{msg.email}</div>
                            {msg.phone && (
                              <div className="text-xs text-gray-500 mt-1">📞 {msg.phone}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div className="line-clamp-2 text-gray-700">{msg.message}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => toggleStatus(msg.id, msg.status)}
                              className="hover:bg-blue-100"
                              title={msg.status === "new" ? "Marcar como leído" : "Marcar como no leído"}
                            >
                              {msg.status === "new" ? (
                                <CheckCircle className="h-5 w-5 text-green-600" />
                              ) : (
                                <EyeOff className="h-5 w-5 text-gray-400" />
                              )}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => deleteMessage(msg.id)}
                              className="hover:bg-red-100 text-red-400 hover:text-red-600"
                              title="Eliminar mensaje"
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {messages.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-12">
                          <div className="space-y-3">
                            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto" />
                            <h3 className="text-lg font-semibold text-gray-500">
                              No hay mensajes
                            </h3>
                            <p className="text-gray-400">
                              Los mensajes enviados desde el sitio web aparecerán aquí
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* --- PESTAÑA TESTIMONIOS MEJORADA --- */}
        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* FORMULARIO */}
            <Card className="lg:col-span-1 h-fit shadow-lg border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    {editingId ? "✏️ Editar Testimonio" : "✨ Nuevo Testimonio"}
                  </CardTitle>
                  {editingId && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={cancelEditing}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Ban className="h-4 w-4 mr-1"/>
                      Cancelar
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitTestimonial} className="space-y-5">
                  {/* Avatar Input mejorado */}
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Foto / Logo (Opcional)
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-5 text-center hover:bg-gray-50 transition-colors cursor-pointer relative"
                      onClick={() => testimonialFileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={testimonialFileInputRef} 
                        onChange={(e) => { 
                          if (e.target.files && e.target.files[0]) setSelectedTestimonialFile(e.target.files[0]); 
                        }} 
                      />
                      
                      {selectedTestimonialFile ? (
                        <div className="text-emerald-600 font-medium text-sm flex flex-col items-center">
                          <CheckCircle className="h-8 w-8 mb-2 text-emerald-500" />
                          Archivo seleccionado
                          <span className="text-xs text-gray-500 mt-1">
                            {selectedTestimonialFile.name}
                          </span>
                        </div>
                      ) : testimonialForm.avatar_url ? (
                        <div className="flex flex-col items-center">
                          <img 
                            src={testimonialForm.avatar_url} 
                            alt="Actual" 
                            className="w-20 h-20 rounded-full object-cover mb-3 border-2 border-white shadow-md" 
                          />
                          <span className="text-sm text-emerald-600 font-medium">
                            Clic para cambiar foto
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <div className="p-3 bg-gray-100 rounded-full">
                            <Upload className="h-6 w-6" />
                          </div>
                          <span className="text-sm font-medium">Clic para subir foto</span>
                          <span className="text-xs">JPG, PNG (Máx. 5MB)</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Nombre completo *
                      </label>
                      <Input 
                        placeholder="Ej: María González" 
                        value={testimonialForm.name} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} 
                        required 
                        className="h-11"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Rol / Relación *
                      </label>
                      <Input 
                        placeholder="Apoderado, Ex-alumno, Docente..." 
                        value={testimonialForm.role} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})} 
                        required 
                        className="h-11"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Testimonio *
                      </label>
                      <Textarea 
                        placeholder="Comparta su experiencia con el jardín infantil..." 
                        value={testimonialForm.content} 
                        onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})} 
                        required 
                        rows={4}
                        className="resize-none"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Calificación (1-5 estrellas)
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setTestimonialForm({...testimonialForm, rating: star})}
                              className={`text-2xl ${star <= testimonialForm.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <Input 
                          type="number" 
                          min="1" 
                          max="5" 
                          className="w-20 h-10" 
                          value={testimonialForm.rating} 
                          onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})} 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl shadow-md"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        {editingId ? "Guardando cambios..." : "Creando testimonio..."}
                      </>
                    ) : editingId ? (
                      "💾 Guardar Cambios"
                    ) : (
                      "⭐ Agregar Testimonio"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* LISTA DE TESTIMONIOS */}
            <Card className="lg:col-span-2 shadow-lg border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Testimonios Publicados ({testimonials.length})
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    Promedio: {(testimonials.reduce((acc, t) => acc + (t.rating || 0), 0) / (testimonials.length || 1)).toFixed(1)} ★
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div 
                      key={t.id} 
                      className={`flex justify-between p-5 border rounded-xl bg-white shadow-sm items-center transition-all hover:shadow-md ${
                        editingId === t.id 
                          ? 'border-emerald-500 ring-2 ring-emerald-100 bg-emerald-50/30' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shrink-0 border-2 border-white shadow">
                            {t.avatar_url ? (
                              <img src={t.avatar_url} alt={t.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-xl font-bold text-gray-600">{t.name.charAt(0).toUpperCase()}</span>
                            )}
                          </div>
                          {editingId === t.id && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                              <Pencil className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {t.role}
                            </span>
                            <div className="text-yellow-500 text-sm ml-auto">
                              {"★".repeat(t.rating ?? 0)}
                            </div>
                          </div>
                          <p className="text-gray-700 italic leading-relaxed mb-2">"{t.content}"</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>ID: {t.id}</span>
                            {t.createdAt && (
                              <span>📅 {new Date(t.createdAt).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4 shrink-0">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => startEditing(t)}
                          className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
                          title="Editar testimonio"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteTestimonial(t.id)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                          title="Eliminar testimonio"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
                      <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-500 mb-2">
                        No hay testimonios aún
                      </h3>
                      <p className="text-gray-400 max-w-md mx-auto">
                        Los testimonios agregados aparecerán en la página principal del jardín
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- PESTAÑA GALERIA MEJORADA --- */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1 h-fit shadow-lg border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-violet-500 to-purple-500" />
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-gray-900">
                  📤 Subir Nueva Foto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateImage} className="space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-3 block">
                      Seleccionar imagen *
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => galleryFileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={galleryFileInputRef} 
                        onChange={(e) => { 
                          if (e.target.files && e.target.files[0]) setSelectedGalleryFile(e.target.files[0]); 
                        }} 
                      />
                      <div className="flex flex-col items-center gap-3">
                        {selectedGalleryFile ? (
                          <>
                            <CheckCircle className="h-10 w-10 text-emerald-500" />
                            <div>
                              <span className="text-emerald-600 font-medium">{selectedGalleryFile.name}</span>
                              <p className="text-xs text-gray-500 mt-1">
                                {(selectedGalleryFile.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <span className="text-sm text-gray-400">Clic para cambiar</span>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-violet-100 rounded-full">
                              <Upload className="h-8 w-8 text-violet-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-500">
                              Clic para seleccionar imagen
                            </span>
                            <span className="text-xs text-gray-400">
                              JPG, PNG, WEBP (Máx. 10MB)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Título (Opcional)
                      </label>
                      <Input 
                        placeholder="Ej: Día del niño 2024" 
                        value={newImageMeta.title} 
                        onChange={(e) => setNewImageMeta({...newImageMeta, title: e.target.value})} 
                        className="h-11"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
                        Descripción (Opcional)
                      </label>
                      <Input 
                        placeholder="Ej: Actividades del día del niño" 
                        value={newImageMeta.description} 
                        onChange={(e) => setNewImageMeta({...newImageMeta, description: e.target.value})} 
                        className="h-11"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-md"
                    disabled={isSubmitting || !selectedGalleryFile}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Subiendo...
                      </>
                    ) : (
                      <>
                        <Plus className="h-5 w-5 mr-2" />
                        Subir a la Galería
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2 shadow-lg border-0 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-pink-500 to-rose-500" />
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-bold text-gray-900">
                    Galería de Imágenes ({galleryImages.length})
                  </CardTitle>
                  <div className="text-sm text-gray-500">
                    {galleryImages.length} fotos en total
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {galleryImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {galleryImages.map((img) => (
                      <div 
                        key={img.id} 
                        className="group relative aspect-square rounded-xl overflow-hidden border-2 border-white shadow-lg bg-gray-100"
                      >
                        <img 
                          src={img.url} 
                          alt={img.title || "Imagen de galería"} 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                          <div className="text-white">
                            {img.title && (
                              <h4 className="font-bold text-lg mb-1">{img.title}</h4>
                            )}
                            {img.description && (
                              <p className="text-sm text-gray-200 line-clamp-2">{img.description}</p>
                            )}
                          </div>
                          <div className="flex justify-center gap-3 mt-4">
                            <a 
                              href={img.url} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="p-2 bg-white rounded-full text-gray-800 hover:bg-gray-100 transition-colors"
                              title="Ver imagen completa"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button 
                              onClick={() => deleteImage(img.id)} 
                              className="p-2 bg-gradient-to-r from-red-500 to-rose-500 rounded-full text-white hover:from-red-600 hover:to-rose-600 transition-colors"
                              title="Eliminar imagen"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        {/* Badge de información */}
                        <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                          #{img.id}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-2xl">
                    <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-500 mb-2">
                      Galería vacía
                    </h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                      Suba imágenes para mostrar en la galería pública del jardín
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Jardín Ayenhue • Panel Administrativo v2.0
          <br />
          <span className="text-xs text-gray-400">
            Acceso restringido al personal autorizado • Última actualización: {new Date().toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}