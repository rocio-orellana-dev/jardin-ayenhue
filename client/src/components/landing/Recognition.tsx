import { useState } from "react";
import plaqueImage from "@assets/generated_images/official_government_recognition_plaque.webp";
import { CheckCircle2, ShieldCheck, Landmark, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { UI } from "@/styles/ui";
import { motion } from "framer-motion";

export default function Recognition() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section id="reconocimiento" className={cn(UI.sectionY, "bg-white-50/50 overflow-hidden")}>
      <div className={cn(UI.containerX)}>
        {/* Aumenté el gap en LG para dar espacio a la imagen más grande */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* LADO IZQUIERDO: LA IMAGEN/SELLO - AHORA MÁS GRANDE */}
          {/* Cambié w-2/5 a w-1/2 en LG para darle la mitad del espacio */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="relative group"
            >
              {/* Decoración de fondo (brillo) */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[45px] blur-3xl group-hover:bg-secondary/10 transition-colors duration-700 pointer-events-none" />
              
              {/* Contenedor tipo "Marco" con sombra más pronunciada */}
              <div className="relative bg-white p-2 rounded-4xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-slate-100">
                <div className={cn(
                  // AQUI ESTÁ EL CAMBIO PRINCIPAL DE TAMAÑO:
                  // Pasamos de w-80 a dimensiones mucho más grandes (w-[450px] en MD, w-[500px] en LG)
                  // Usamos aspect-square para asegurar que siempre sea cuadrada
                  "relative w-full aspect-square md:w-112.5 lg:w-125 rounded-3xl overflow-hidden bg-slate-100 transition-all duration-1000",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}>
                  
                  {/* Placeholder mientras carga */}
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                      <Landmark className="w-20 h-20 text-slate-200" />
                    </div>
                  )}

                  <img 
                    src={plaqueImage} 
                    alt="Sello de Reconocimiento Oficial MINEDUC" 
                    onLoad={() => setIsLoaded(true)}
                    loading="lazy"
                    // ELIMINADO el padding (p-6) y cambiado a object-cover para que llene todo el espacio
                    className={cn(
                      "w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                      isLoaded ? "blur-0" : "blur-md"
                    )}
                  />
                   {/* Capa de brillo sutil sobre la imagen */}
                   <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none" />
                </div>
                
                {/* Badge flotante de validación - Movido un poco para no tapar tanto */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 bg-white shadow-xl rounded-2xl p-3 lg:p-4 flex items-center gap-3 border border-slate-50 z-10"
                >
                  <div className="bg-green-500 rounded-full p-1.5 lg:p-2 shadow-md">
                    <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 uppercase tracking-tight leading-none mb-1">Estado Actual</p>
                    <p className="text-xs lg:text-sm font-black text-primary leading-none">Vigente y Validado</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* LADO DERECHO: TEXTO E INFO */}
          {/* Ajustado ancho a w-1/2 */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8 order-2">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white border border-secondary/20 px-4 py-1.5 rounded-full shadow-sm mb-6"
              >
                <CheckCircle2 className="w-4 h-4 text-secondary" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary">Máxima Certificación</span>
              </motion.div>
              
              <h3 className={cn(UI.h2Section, "text-primary text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight")}>
                Reconocimiento Oficial <br />
                <span className="text-secondary italic font-serif font-light block mt-2">del Estado de Chile</span>
              </h3>
            </div>
            
            <p className={cn(UI.pSection, "text-slate-600 max-w-xl text-lg font-medium leading-relaxed")}>
              Esta placa no es solo un símbolo; es la garantía para su familia de que nuestro jardín cumple con los más altos estándares de seguridad, infraestructura y calidad pedagógica exigidos por el Ministerio de Educación.
            </p>

            {/* INFO CARDS (RBD y Dependencia) - Diseño más limpio */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="bg-white p-5 rounded-2xl border-l-4 border-secondary shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-center pl-6">
                  <div className="flex items-center gap-2 mb-2 text-secondary">
                    <FileText className="w-4 h-4" />
                    <p className="text-[11px] uppercase font-black tracking-widest">Código RBD</p>
                  </div>
                  <p className="text-primary text-4xl font-mono font-black tracking-tighter">33753</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border-l-4 border-primary shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-center pl-6">
                  <div className="flex items-center gap-2 mb-2 text-primary">
                    <Landmark className="w-4 h-4" />
                    <p className="text-[11px] uppercase font-black tracking-widest">Dependencia</p>
                  </div>
                  <p className="text-primary text-3xl font-black tracking-tight">JUNJI / VTF</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}