import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-[#FDFDF9] overflow-x-hidden">
      <Navbar />

      <main className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10">
          <div className="mb-8">
            <Link href="/">
              <span className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer font-medium mb-6">
                <ArrowLeft className="w-5 h-5" />
                Volver al Inicio
              </span>
            </Link>
          </div>
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-poppins font-bold text-foreground mb-4">
              Políticas de Privacidad
            </h1>
            <div className="h-1 w-24 bg-primary rounded-full mx-auto"></div>
          </div>

          <div className="prose prose-lg md:prose-xl prose-p:text-muted-foreground prose-headings:text-foreground prose-headings:font-poppins prose-a:text-primary mx-auto">
            <p>
              En la <strong>Sala Cuna y Jardín Infantil Ayenhue</strong> (en adelante, "el Jardín"), valoramos profundamente la privacidad y seguridad de nuestra comunidad educativa: padres, apoderados y, fundamentalmente, nuestros niños y niñas.
            </p>
            
            <p>
              Esta Política de Privacidad describe qué información recopilamos, cómo la utilizamos y bajo qué circunstancias podría ser compartida, en cumplimiento con la Ley N° 19.628 sobre Protección de la Vida Privada vigente en la República de Chile.
            </p>

            <h2>1. Información que recopilamos</h2>
            <p>
              A través de nuestro sitio web (jardinayenhue.cl), recopilamos información personal únicamente cuando usted nos la proporciona de forma voluntaria. Esto ocurre al utilizar nuestro Formulario de Contacto, donde solicitamos:
            </p>
            <ul>
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Mensaje o consulta</li>
            </ul>

            <h2>2. Uso de la Información</h2>
            <p>
              Los datos personales recabados serán utilizados exclusiva y estrictamente para los siguientes fines:
            </p>
            <ul>
              <li>Responder a sus dudas, consultas o solicitudes de información sobre matrículas y servicios.</li>
              <li>Contactarle en caso de requerir información adicional o dar seguimiento a su comunicación.</li>
            </ul>
            <p>
              <strong>Bajo ninguna circunstancia</strong> el Jardín venderá, arrendará, comercializará ni cederá sus datos personales a empresas de marketing, terceros o entidades no relacionadas con nuestra misión educativa.
            </p>

            <h2>3. Tecnologías de Rastreo y Cookies</h2>
            <p>
              Nuestro sitio web utiliza herramientas analíticas estándar (como Google Analytics) para comprender cómo los visitantes interactúan con nuestra página. Estas herramientas utilizan "cookies", pequeños archivos de texto que se guardan en su navegador.
            </p>
            <p>
              La información recopilada a través de las cookies (como su ubicación aproximada, navegador utilizado y páginas visitadas) es anónima y agregada. Sirve exclusivamente para fines estadísticos y para mejorar la experiencia de navegación. Usted puede configurar su navegador para rechazar las cookies en cualquier momento.
            </p>

            <h2>4. Seguridad de sus Datos</h2>
            <p>
              Tomamos las medidas técnicas y organizacionales comercialmente razonables para proteger su información contra pérdida, robo, acceso no autorizado, alteración o destrucción. Nuestro sitio cuenta con encriptación SSL (HTTPS) y las bases de datos de contacto son accesibles únicamente por la Directora y el personal administrativo autorizado del Jardín.
            </p>

            <h2>5. Derechos del Titular de los Datos</h2>
            <p>
              Conforme a la legislación chilena, usted tiene derecho a solicitar acceso, rectificación, cancelación u oposición respecto al uso de sus datos personales. Si desea ejercer alguno de estos derechos, por favor contáctenos a través de nuestro formulario oficial o directamente a nuestro correo: <strong>viviana.diaz@daemcoltauco.cl</strong>.
            </p>

            <h2>6. Cambios a esta Política</h2>
            <p>
              El Jardín Infantil Ayenhue se reserva el derecho de actualizar esta Política de Privacidad en cualquier momento. Le recomendamos revisar esta página periódicamente para estar informado sobre cómo protegemos su información.
            </p>

            <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/20 text-center">
              <p className="text-sm m-0 text-muted-foreground">
                Última actualización: Marzo 2026<br/>
                Para cualquier duda, no dude en contactarnos.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
