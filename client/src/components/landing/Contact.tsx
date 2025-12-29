import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Loader2, MessageCircle, Star, Heart, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import SectionHeader from "@/components/SectionHeader";

// --- ESTILOS HAND-DRAWN PERSONALIZADOS ---
const handDrawnBorder = "border-2 border-slate-300 rounded-[15px_5px_15px_5px/5px_20px_5px_25px] bg-white transition-all duration-300";
const handDrawnButton = "rounded-[20px_10px_25px_10px/10px_25px_10px_20px] border-b-4 border-r-4 border-primary/20 transition-all hover:rounded-[10px_20px_10px_25px/25px_10px_25px_10px]";

// Paleta de colores para el confeti personalizada
const ayenhueBrandColors = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#facc15'];

const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  email: z.string().email({ message: "Por favor ingrese un correo electrónico válido." }),
  phone: z.string().min(8, { message: "Por favor ingrese un número de teléfono válido." }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
  honeypot: z.string().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", honeypot: "" },
  });

  // --- FUNCIÓN DE ANIMACIÓN CON IMPORTACIÓN DINÁMICA ---
  const triggerAyenhueSuccess = async () => {
    // Evita errores en el lado del servidor
    if (typeof window === "undefined") return;
    
    try {
      // Importamos la librería solo cuando se necesita (esto soluciona el conflicto de hooks)
      const { default: confetti } = await import("canvas-confetti");
      
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ayenhueBrandColors
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ayenhueBrandColors
        });

        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    } catch (err) {
      console.error("Error al cargar confetti:", err);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Error al enviar");

      // Disparamos la lluvia de colores
      await triggerAyenhueSuccess();

      toast({
        title: "¡Mensaje recibido con alegría!",
        description: "Viviana Díaz o alguien de nuestro equipo te contactará muy pronto.",
        className: "bg-blue-50 border-blue-200 text-blue-900 font-medium",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Hubo un pequeño problema",
        description: "No pudimos enviar tu mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contacto" className={cn(UI.sectionY, "bg-white relative overflow-hidden")}>
      {/* Elementos Decorativos */}
      <Star className="absolute top-10 right-[5%] text-yellow-400/20 w-12 h-12 rotate-12 hidden md:block pointer-events-none" />
      <Heart className="absolute bottom-20 left-[2%] text-red-300/20 w-10 h-10 -rotate-12 hidden md:block pointer-events-none" />
      <Sun className="absolute top-40 left-[5%] text-orange-300/10 w-16 h-16 animate-spin-slow hidden md:block pointer-events-none" />

      <div className={cn(UI.containerX)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Columna de Información */}
          <div className="space-y-10">
            <SectionHeader
              kicker="Contacto"
              title="Estamos aquí para ayudarte"
              subtitle="Si tienes dudas sobre el proceso de matrícula o quieres agendar una visita, no dudes en escribirnos."
              align="left"
              className="mb-0"
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, title: "Dirección", desc: "Av. Manuel Montt S/N, Coltauco", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: Phone, title: "Teléfono", desc: "+56 9 9243 5064", color: "text-green-600", bg: "bg-green-50" },
                { icon: Mail, title: "Email", desc: "viviana.diaz@daemcoltauco.cl", color: "text-orange-600", bg: "bg-orange-50" },
                { icon: Clock, title: "Horario", desc: "Lun a Vie: 08:30 - 17:30", color: "text-purple-600", bg: "bg-purple-50" },
              ].map((item, i) => (
                <Card key={i} className={cn(handDrawnBorder, "border-slate-200 shadow-sm")}>
                  <CardContent className="p-6">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center mb-4", item.bg, item.color)}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-lg text-primary mb-1">{item.title}</h4>
                    <p className="text-slate-600 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Card */}
            <div className={cn(handDrawnBorder, "p-4 border-green-200 bg-green-50/50 flex items-center justify-between")}>
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-full text-white">
                        <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-green-700 uppercase leading-tight">Respuesta Rápida</p>
                        <p className="text-sm text-green-900">¿Dudas por WhatsApp?</p>
                    </div>
                </div>
                <a href="https://wa.me/56992435064" target="_blank" className="bg-green-600 text-white px-4 py-2 rounded-full text-xs font-bold hover:bg-green-700 transition-colors shadow-sm">
                    Chat Directo
                </a>
            </div>
          </div>

          {/* Columna de Formulario */}
          <div className={cn(handDrawnBorder, "p-8 md:p-10 border-slate-200 shadow-xl relative bg-white group")}>
            <h3 className="text-2xl font-bold text-primary mb-8">Envíanos un mensaje</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                  <input type="text" tabIndex={-1} autoComplete="off" {...form.register("honeypot")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Nombre Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Tu nombre" {...field} className={cn("h-12 focus-visible:ring-secondary focus-visible:border-secondary", handDrawnBorder)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Teléfono</FormLabel>
                      <FormControl>
                        <Input placeholder="+56 9..." {...field} className={cn("h-12 focus-visible:ring-secondary focus-visible:border-secondary", handDrawnBorder)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold">Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="tu@email.com" {...field} className={cn("h-12 focus-visible:ring-secondary focus-visible:border-secondary", handDrawnBorder)} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-primary font-bold">Mensaje</FormLabel>
                    <FormControl>
                      <Textarea placeholder="¿En qué podemos ayudarte?" className={cn("min-h-[120px] resize-none focus-visible:ring-secondary focus-visible:border-secondary", handDrawnBorder)} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="space-y-4 pt-2">
                  <Button type="submit" disabled={isSubmitting} className={cn("w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg shadow-lg active:scale-[0.98]", handDrawnButton)}>
                    {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</> : "Enviar Mensaje"}
                  </Button>
                  <div className="text-center pt-2">
                    <p className="text-sm font-medium text-slate-400 italic">"Donde cada niño florece con amor"</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Viviana Díaz — Directora Jardín Ayenhue</p>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* Sección de Mapa */}
        <div className={cn(handDrawnBorder, "mt-12 border-slate-200 overflow-hidden shadow-lg group")}>
          <div className="relative h-[400px] w-full overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.156554523671!2d-71.0772545!3d-34.3315714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966336e053f5f3e9%3A0x6b4c3e3f3e3e3e3e!2sAv.%20Manuel%20Montt%2C%20Coltauco!5e0!3m2!1ses-419!2scl!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Jardín Infantil Ayenhue"
              className="grayscale-40 sepia-20 group-hover:grayscale-0 group-hover:sepia-0 transition-all duration-1000"
            ></iframe>
          </div>
          <div className="bg-white p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-t-2 border-slate-100">
            <span className="text-sm font-bold text-slate-600 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-secondary" aria-hidden="true" />
              Diego Portales con Av. Manuel Montt, El Molino, Coltauco
            </span>
            <Button variant="outline" className={cn("text-primary font-bold border-2 border-primary/20 px-8 transition-all shadow-sm", handDrawnButton)} asChild>
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">Abrir en Google Maps →</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}