import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lock, Eye, EyeOff, Building2 } from "lucide-react";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        toast({
          title: "Acceso concedido",
          description: "Bienvenida al panel administrativo",
          variant: "default",
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Acceso denegado",
          description: "La contraseña es incorrecta",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "Verifique su conexión a internet",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 to-emerald-50 p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-70" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-100 rounded-full blur-3xl opacity-70" />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Tarjeta principal */}
        <Card className="bg-white/95 backdrop-blur-sm border-slate-200 shadow-2xl shadow-sky-100/50 rounded-2xl overflow-hidden">
          {/* Encabezado con acento de color */}
          <div className="h-2 bg-linear-to-r from-sky-500 to-emerald-500" />
          
          <CardHeader className="pt-8 pb-6">
            <div className="flex flex-col items-center space-y-4">
              {/* Icono de institución */}
              <div className="p-4 bg-linear-to-br from-sky-100 to-emerald-100 rounded-2xl">
                <Building2 className="h-12 w-12 text-sky-600" />
              </div>
              
              <div className="text-center space-y-2">
                <CardTitle className="text-3xl font-bold text-slate-800">
                  Panel Administrativo
                </CardTitle>
                <p className="text-slate-600 font-medium">
                  Jardín Infantil · Dirección
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-slate-700">
                    <Lock className="h-4 w-4" />
                    <span>Acceso restringido</span>
                  </div>
                  
                  {/* Campo de contraseña con mejor diseño */}
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingrese la contraseña de acceso"
                      className="h-12 pl-12 pr-12 text-base border-2 border-slate-200 rounded-xl bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 transition-all duration-200"
                      disabled={isLoading}
                    />
                    
                    {/* Icono de candado */}
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    
                    {/* Botón para mostrar/ocultar contraseña */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-slate-100"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-slate-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-slate-500" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Indicador de seguridad */}
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs text-slate-500">
                      Área administrativa exclusiva
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="h-1 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-300 ${
                            password.length > 0 ? 'bg-emerald-500' : 'bg-transparent'
                          }`}
                        />
                      </div>
                      <span className="text-xs font-medium text-emerald-600">
                        {password.length > 0 ? 'Seguro' : 'Vacío'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de envío */}
              <Button
                type="submit"
                className="w-full h-12 bg-linear-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 transition-all duration-300 transform hover:-translate-y-0.5"
                disabled={isLoading || password.length === 0}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verificando acceso...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <Lock className="h-5 w-5" />
                    <span>Ingresar al Panel</span>
                  </div>
                )}
              </Button>

              {/* Nota de seguridad */}
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-center text-slate-500">
                  Este sistema contiene información confidencial del jardín infantil.
                  <br />
                  Acceso autorizado únicamente para personal administrativo.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer con información */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600 font-medium">
            ¿Problemas para acceder? Contacte al soporte técnico
          </p>
          <p className="text-xs text-slate-500 mt-1">
            © {new Date().getFullYear()} Sistema Administrativo Jardín Infantil
          </p>
        </div>
      </div>
    </div>
  );
}