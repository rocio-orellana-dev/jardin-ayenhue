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
import { MapPin, Phone, Mail, Clock, Loader2 } from "lucide-react";

// Mantenemos tu esquema local porque tiene los mensajes en español personalizados
const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  phone: z.string().min(8, {
    message: "Por favor ingrese un número de teléfono válido.",
  }),
  message: z.string().min(10, {
    message: "El mensaje debe tener al menos 10 caracteres.",
  }),
  // Campo oculto para seguridad (no se valida en UI, pero se envía)
  honeypot: z.string().optional(),
});

export default function Contact() {
  const { toast } = useToast();
  
  // Estado para saber si se está enviando
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      honeypot: "", // Inicializamos vacío
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true); // Bloqueamos el botón

    try {
      // Petición al Backend
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al enviar el mensaje");
      }

      // Éxito
      toast({
        title: "¡Mensaje enviado correctamente!",
        description: "Nos pondremos en contacto contigo a la brevedad.",
        variant: "default", // O "success" si tienes configurado ese variante
        className: "bg-green-50 border-green-200 text-green-900", // Estilo extra opcional
      });

      form.reset();
    } catch (error) {
      // Error
      console.error(error);
      toast({
        title: "Error al enviar",
        description: "Hubo un problema. Por favor intenta nuevamente o llámanos.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Liberamos el botón
    }
  }

  return (
    <section id="contacto" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info - Sin cambios */}
          <div className="space-y-10">
            <div>
              <span className="text-secondary font-bold tracking-wider uppercase text-sm">Contacto</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mt-4">
                Estamos aquí para ayudarte
              </h2>
              <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
                Si tienes dudas sobre el proceso de matrícula, horarios o quieres agendar una visita, no dudes en escribirnos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm bg-gray-50/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mb-4 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-1">Dirección</h4>
                  <p className="text-muted-foreground text-sm">Av. Manuel Montt S/N, El Molino, Coltauco</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gray-50/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0 mb-4 text-green-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-1">Teléfono</h4>
                  <p className="text-muted-foreground text-sm">+56 9 9243 5064</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gray-50/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mb-4 text-orange-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-1">Email</h4>
                  <p className="text-muted-foreground text-sm">viviana.diaz@daemcoltauco.cl</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-gray-50/50">
                <CardContent className="p-6">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mb-4 text-purple-600">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-primary mb-1">Horario</h4>
                  <p className="text-muted-foreground text-sm">Lunes a Viernes: 08:30 - 17:30</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 md:p-10 rounded-4xl shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-8">Envíanos un mensaje</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* CAMPO OCULTO HONEYPOT (Anti-Spam) */}
                <input type="text" className="hidden" {...form.register("honeypot")} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">Nombre Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Tu nombre" {...field} className="h-12 bg-gray-50 border-gray-200 focus:border-primary/30 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary font-bold">Teléfono</FormLabel>
                        <FormControl>
                          <Input placeholder="+56 9..." {...field} className="h-12 bg-gray-50 border-gray-200 focus:border-primary/30 rounded-xl" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Correo Electrónico</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@email.com" {...field} className="h-12 bg-gray-50 border-gray-200 focus:border-primary/30 rounded-xl" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-bold">Mensaje</FormLabel>
                      <FormControl>
                        <Textarea placeholder="¿En qué podemos ayudarte?" className="min-h-[150px] bg-gray-50 border-gray-200 focus:border-primary/30 rounded-xl resize-none p-4" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} // Deshabilitamos si está cargando
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 text-lg rounded-xl shadow-lg transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...
                    </>
                  ) : (
                    "Enviar Mensaje"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
        {/* Mapa Interactivo - Estilo Ayenhue */}
          <div className="mt-8 overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-lg group">
            <div className="relative h-[350px] w-full">
              {/* Overlay sutil para matching de color (opcional) */}
              <div className="absolute inset-0 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-colors duration-500 z-10"></div>
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3305.6132!2d-71.0151371!3d-34.2621142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96637b34557530e9%3A0xf61266f9303303b1!2sJard%C3%ADn%20Infantil%20Ayenhue!5e0!3m2!1ses-419!2scl!4v1700000000000!5m2!1ses-419!2scl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Jardín Infantil Ayenhue"
                className="grayscale-[20%] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
            
            {/* Botón de acción rápida sobre el mapa */}
            <div className="bg-white p-4 flex justify-between items-center border-t border-gray-50">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Abrir en Google Maps para navegar
              </span>
              <Button variant="ghost" size="sm" className="text-primary font-bold hover:text-secondary" asChild>
                <a 
                  href="https://maps.app.goo.gl/ChIJ6TB1VTR7Y5YRsQMTMPlmEvY" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Cómo llegar →
                </a>
              </Button>
            </div>
          </div>
      </div>
    </section>
  );
}