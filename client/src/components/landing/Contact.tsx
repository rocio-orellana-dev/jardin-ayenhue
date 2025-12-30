import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Loader2, MessageCircle, Star, Heart, Sun, Map as MapIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

// --- ESTILOS HAND-DRAWN PERSONALIZADOS ---
const handDrawnBorder = "border-2 border-slate-300 rounded-[15px_5px_15px_5px/5px_20px_5px_25px] bg-white transition-all duration-300";
const handDrawnButton = "rounded-[20px_10px_25px_10px/10px_25px_10px_20px] border-b-4 border-r-4 border-primary/20 transition-all hover:rounded-[10px_20px_10px_25px/25px_10px_25px_10px]";

// Colores institucionales para el confeti
const ayenhueBrandColors = ['#2563eb', '#16a34a', '#ea580c', '#facc15', '#9333ea'];

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingrese un correo electrónico válido." }),
  phone: z.string().min(9, { message: "Ingrese los 9 dígitos de su número móvil." }).max(9, { message: "Máximo 9 dígitos." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  honeypot: z.string().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", honeypot: "" },
  });

  const triggerAyenhueSuccess = async () => {
    if (typeof window === "undefined") return;
    try {
      const { default: confetti } = await import("canvas-confetti");
      const duration = 3 * 1000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors: ayenhueBrandColors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors: ayenhueBrandColors });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } catch (err) { console.error(err); }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Unificamos el prefijo con el número para el envío final
    const payload = { ...values, phone: `+56 ${values.phone}` };
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Error");
      
      await triggerAyenhueSuccess();
      
      // Mensaje personalizado con el nombre del usuario
      toast({ 
        title: `¡Mensaje recibido con alegría, ${values.name}!`, 
        description: "Viviana Díaz o alguien de nuestro equipo te contactará muy pronto.", 
        className: "bg-blue-50 border-blue-200 text-blue-900 font-medium" 
      });
      
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "No pudimos enviar el mensaje. Inténtalo de nuevo.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  }

  return (
    <section id="contacto" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      {/* Elementos Decorativos */}
      <Star className="absolute top-10 right-[5%] text-yellow-400/20 w-12 h-12 rotate-12 hidden md:block pointer-events-none" />
      <Heart className="absolute bottom-20 left-[2%] text-red-300/20 w-10 h-10 -rotate-12 hidden md:block pointer-events-none" />
      <Sun className="absolute top-40 left-[5%] text-orange-300/10 w-16 h-16 animate-spin-slow hidden md:block pointer-events-none" />

      <div className={cn(UI.containerX)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <SectionHeader kicker="Contacto" title="Estamos aquí para ayudarte" subtitle="Si tienes dudas sobre el proceso de matrícula o quieres agendar una visita, no dudes en escribirnos." align="left" className="mb-5" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, title: "Dirección", desc: "Av. Manuel Montt S/N, Coltauco", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Phone, title: "Teléfono", desc: "+56 9 9243 5064", color: "text-green-600", bg: "bg-green-50" },
                { icon: Mail, title: "Email", desc: "viviana.diaz@daemcoltauco.cl", color: "text-orange-600", bg: "bg-orange-50" },
                { icon: Clock, title: "Horario", desc: "Lun a Vie: 08:30 - 17:30", color: "text-purple-600", bg: "bg-purple-50" },
              ].map((item, i) => (
                <Card key={i} className={cn(handDrawnBorder, "border-slate-200 shadow-sm")}>
                  <CardContent className="p-6">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", item.bg, item.color)}><item.icon className="w-5 h-5" /></div>
                    <h4 className="font-bold text-lg text-primary mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className={cn(handDrawnBorder, "p-4 border-green-200 bg-green-50/50 flex items-center justify-between")}>
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-full text-white"><MessageCircle className="w-5 h-5" /></div>
                    <div><p className="text-xs font-bold text-green-700 uppercase leading-tight">Respuesta Rápida</p><p className="text-sm text-green-900">¿Dudas por WhatsApp?</p></div>
                </div>
                <a href="https://wa.me/56992435064" target="_blank" className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm hover:bg-green-700 transition-colors">Chat Directo</a>
            </div>
          </div>

          <div className={cn(handDrawnBorder, "p-8 md:p-10 border-slate-200 shadow-xl relative bg-white group")}>
            <h3 className="text-2xl font-bold text-primary mb-8">Envíanos un mensaje</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true"><input type="text" tabIndex={-1} {...form.register("honeypot")} /></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" autoComplete="name" autoCapitalize="words" {...field} className={cn("h-12 focus-visible:ring-secondary", handDrawnBorder)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* SOLUCIÓN TELÉFONO: Teclado numérico y prefijo visual inamovible */}
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Teléfono</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 select-none pointer-events-none">+56</span>
                          <Input 
                            type="tel"
                            inputMode="numeric" // Teclado numérico en Android/iOS
                            pattern="[0-9]*"    // Refuerza teclado numérico en iOS
                            placeholder="9 1234 5678" 
                            {...field} 
                            className={cn("h-12 pl-14 focus-visible:ring-secondary", handDrawnBorder)} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                {/* SOLUCIÓN EMAIL: Teclado nativo con @ y dominios */}
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        inputMode="email"
                        autoComplete="email"
                        placeholder="tu@email.com" 
                        {...field} 
                        className={cn("h-12 focus-visible:ring-secondary", handDrawnBorder)} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold">Mensaje</FormLabel>
                    <FormControl><Textarea placeholder="¿En qué podemos ayudarte?" className={cn("min-h-[120px] resize-none focus-visible:ring-secondary", handDrawnBorder)} {...field} /></FormControl><FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" disabled={isSubmitting} className={cn("w-full bg-primary text-white font-bold h-14 text-lg shadow-lg active:scale-[0.98]", handDrawnButton)}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</> : "Enviar Mensaje"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* MAPA CORREGIDO: URL DE EMBED OFICIAL */}
        <div className={cn(handDrawnBorder, "mt-12 border-slate-200 overflow-hidden shadow-lg group relative")}>
          <div className="relative h-[400px] w-full bg-slate-50">
            {!mapLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 animate-pulse text-slate-300">
                <MapIcon size={48} className="mb-4" />
                <p className="font-bold text-sm tracking-widest uppercase">Cargando Ubicación...</p>
              </div>
            )}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.514488349237!2d-71.017712!3d-34.2621142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96627b34557530e9%3A0xf61266f9301303b1!2sJard%C3%ADn%20Infantil%20Ayenhue!5e0!3m2!1ses!2scl!4v1703880000000!5m2!1ses!2scl"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="eager" onLoad={() => setMapLoaded(true)}
              referrerPolicy="no-referrer-when-downgrade" title="Ubicación Jardín Infantil Ayenhue"
              className={cn("grayscale-40 group-hover:grayscale-0 transition-all duration-1000", mapLoaded ? "opacity-100" : "opacity-0")}
            ></iframe>
          </div>
          <div className="bg-white p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t-2 border-slate-100">
            <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" />
              Diego Portales con Av. Manuel Montt, El Molino, Coltauco
            </span>
            <Button variant="outline" className={cn("text-primary font-bold border-2 border-primary/20 px-8 transition-all shadow-sm", handDrawnButton)} asChild>
              <a href="https://maps.google.com/?q=Jardín+Infantil+Ayenhue+Coltauco" target="_blank" rel="noopener noreferrer">
                ¿Cómo llegar? →
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}