import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, Eye, Leaf, Users, Star } from "lucide-react";

export default function MissionVision() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decoración de fondo sutil y moderna */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Encabezado Estandarizado (Estilo Badge) */}
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="text-secondary font-bold tracking-wider uppercase text-xs bg-gray-50 px-4 py-2 rounded-full border border-gray-100 inline-block mb-2">
            Nuestra Esencia
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">
            Misión y Visión
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            La brújula que guía cada paso en el Jardín Infantil y Sala Cuna Ayenhue: educar con amor, respeto y diversidad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          
          {/* Tarjeta MISIÓN */}
          <Card className="border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl overflow-hidden group h-full flex flex-col">
            {/* Barra superior de color */}
            <div className="h-1.5 bg-primary w-full"></div>
            
            <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-6">
                {/* Ícono consistente con el resto del sitio */}
                <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Nuestra Misión</h3>
              </div>
              
              <div className="text-gray-600 leading-relaxed space-y-5 text-lg flex-1">
                <p>
                  Proporcionar a los niños y niñas una <span className="font-bold text-primary">educación de calidad</span>, equitativa e inclusiva, que llegue a cada rincón de nuestra comuna garantizando igualdad de oportunidades.
                </p>
                <p>
                  Entregamos herramientas para el desarrollo integral, potenciando capacidades y destrezas a través de un rol protagónico del niño. Privilegiamos el juego, el buen trato y la afectividad.
                </p>
                
                {/* Destacado interno mejorado */}
                <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 flex gap-4 mt-2">
                  <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
                  <p className="text-sm text-gray-700 italic font-medium">
                    Fomentamos el amor y respeto por las diversidades culturales, principalmente la <span className="font-bold text-orange-700">etnia Mapuche</span>, integrando la riqueza de las familias haitianas, venezolanas, bolivianas y colombianas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta VISIÓN */}
          <Card className="border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white rounded-3xl overflow-hidden group h-full flex flex-col">
            {/* Barra superior de color */}
            <div className="h-1.5 bg-secondary w-full"></div>
            
            <CardContent className="p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex items-center gap-5 mb-6">
                 {/* Ícono consistente */}
                <div className="p-3.5 rounded-2xl bg-secondary/10 text-secondary-foreground group-hover:bg-secondary group-hover:text-primary transition-colors duration-300">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800">Nuestra Visión</h3>
              </div>

              <div className="text-gray-600 leading-relaxed space-y-5 text-lg flex-1">
                <p>
                  Ser reconocidos como un espacio educativo que logra <span className="font-bold text-secondary-foreground">trascender en la vida de los niños y niñas</span> a través de prácticas pedagógicas innovadoras y afectivas.
                </p>
                <p>
                  Buscamos formar personas autónomas, con una <span className="font-semibold text-gray-800">autoestima positiva</span>, capaces de desenvolverse y opinar libremente en su entorno social.
                </p>
                
                <p>
                  Aspiramos a una comunidad que vive y respeta la interculturalidad y los estilos de vida saludable como base del bienestar común.
                </p>

                {/* Grid de iconos pequeños al final */}
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-blue-50 p-4 rounded-2xl text-center border border-blue-100 hover:bg-blue-100 transition-colors cursor-default">
                    <Leaf className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-wide">Vida Saludable</span>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-2xl text-center border border-purple-100 hover:bg-purple-100 transition-colors cursor-default">
                    <Star className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <span className="text-xs font-bold text-purple-700 uppercase tracking-wide">Excelencia</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}