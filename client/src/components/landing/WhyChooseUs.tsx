import { CheckCircle2 } from "lucide-react";
import playgroundImage from "@assets/generated_images/outdoor_playground_structure.png";

export default function WhyChooseUs() {
  const benefits = [
    "Equipo profesional con vocación y experiencia comprobada.",
    "Sello intercultural que respeta y valora la diversidad.",
    "Infraestructura segura, moderna y acogedora.",
    "Participación activa y real de las familias.",
    "Alimentación saludable.",
    "Ambiente bien tratante y afectivo.",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-12 lg:p-16 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-primary mb-6">
                  ¿Por qué elegir Jardín Infantil y Sala Cuna Ayenhue?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Sabemos que elegir el primer lugar educativo para tu hijo es una decisión importante. Aquí te damos razones para confiar en nosotros.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-5">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="mt-0.5 bg-secondary/10 p-1.5 rounded-full text-secondary">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-primary text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] w-full hidden lg:block rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img 
                src={playgroundImage} 
                alt="Patio de juegos seguro" 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
