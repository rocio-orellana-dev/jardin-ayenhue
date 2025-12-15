import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Loader2 } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Cargar datos reales desde el Backend
  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando testimonios", err);
        setLoading(false);
      });
  }, []);

  // Si está cargando o no hay datos, ocultamos la sección o mostramos un loader
  if (loading) {
    return (
      <div className="py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonios" className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 animate-in fade-in duration-700">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
            Nuestra comunidad habla
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Lo que dicen las familias que confían en nosotros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id} 
              className="bg-white border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group rounded-3xl animate-in fade-in slide-in-from-bottom-8"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Highlight on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 rounded-3xl transition-colors duration-500 pointer-events-none"></div>

              <div className="absolute top-6 right-6 text-primary/5 group-hover:text-secondary/20 transition-colors duration-500 scale-100 group-hover:scale-125 origin-top-right">
                <Quote className="w-16 h-16 fill-current" />
              </div>

              <CardContent className="pt-10 px-8 pb-10 flex flex-col items-center text-center h-full relative z-10">
                
                {/* AVATAR: Muestra imagen si existe, sino la inicial */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500 bg-orange-100 flex items-center justify-center">
                  {testimonial.avatar_url ? (
                    <img 
                      src={testimonial.avatar_url} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-orange-600">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>

                <p className="text-muted-foreground italic mb-6 relative z-10 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                  "{testimonial.content}"
                </p>
                
                <div className="mt-auto">
                  <h4 className="font-bold text-primary text-lg group-hover:text-secondary transition-colors duration-300">
                    {testimonial.name}
                  </h4>
                  <span className="text-xs text-primary/60 font-bold uppercase tracking-wide">
                    {testimonial.role}
                  </span>
                  
                  {/* Estrellas */}
                  {testimonial.rating && (
                    <div className="flex justify-center mt-2 gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}