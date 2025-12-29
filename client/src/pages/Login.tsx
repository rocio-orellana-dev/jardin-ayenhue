import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Lock, Eye, EyeOff, School, Sparkles, UserCircle2 } from "lucide-react";

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
          title: "¡Bienvenida!",
          description: "Ingresando al panel de gestión educativa...",
          className: "bg-emerald-50 border-emerald-200 text-emerald-800",
        });
        setLocation("/admin");
      } else {
        toast({
          title: "Acceso denegado",
          description: "La contraseña no es correcta. Inténtelo nuevamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "Revise su conexión a internet.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* --- Fondo Decorativo Animado --- */}
      {/* Círculo superior izquierdo (Cálido/Rosado) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[100px] animate-pulse" />
      {/* Círculo inferior derecho (Fresco/Azul) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[100px] animate-pulse delay-1000" />
      {/* Círculo central (Brillante/Amarillo suave) */}
      <div className="absolute top-[40%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-100/40 rounded-full blur-[80px]" />

      <div className="relative w-full max-w-md px-6">
        {/* --- Tarjeta Principal con Efecto Glass --- */}
        <Card className="border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-2rem overflow-hidden ring-1 ring-white/50">
          
          {/* Barra superior de color */}
          <div className="h-2 w-full bg-linear-to-r from-rose-400 via-fuchsia-400 to-indigo-400" />

          <CardHeader className="pt-10 pb-2 text-center relative">
            <div className="flex justify-center mb-6 relative">
              {/* Icono Principal con fondo suave */}
              <div className="relative z-10 p-5 bg-white rounded-2xl shadow-lg shadow-indigo-100 ring-4 ring-indigo-50">
                <School className="h-10 w-10 text-indigo-600" />
              </div>
              {/* Elementos flotantes decorativos */}
              <Sparkles className="absolute -right-4 -top-2 h-6 w-6 text-amber-400 animate-bounce" style={{ animationDuration: '3s' }} />
            </div>

            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
              Gestión Educativa
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Bienvenida Directora y Equipo Técnico
            </p>
          </CardHeader>

          <CardContent className="p-8 pt-6">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Input Group */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserCircle2 className="h-5 w-5 text-indigo-300 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  {/* Visual input (readonly just for aesthetic) or functional if needed later. For now just visual cue */}
                  <div className="h-12 w-full bg-indigo-50/50 rounded-xl border border-transparent flex items-center pl-12 text-sm text-indigo-400 select-none">
                    Acceso Administrativo
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${password ? 'text-indigo-500' : 'text-slate-400'}`} />
                  </div>
                  
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña de acceso"
                    className="h-14 pl-12 pr-12 bg-white border-slate-200 hover:border-indigo-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 rounded-xl text-base transition-all duration-300 shadow-sm"
                    disabled={isLoading}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Botón Principal */}
              <Button
                type="submit"
                className="w-full h-14 text-lg font-semibold text-white bg-linear-to-r from-indigo-500 via-purple-500 to-rose-500 hover:from-indigo-600 hover:via-purple-600 hover:to-rose-600 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all duration-300"
                disabled={isLoading || password.length === 0}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verificando...</span>
                  </div>
                ) : (
                  "Ingresar al Sistema"
                )}
              </Button>

              {/* Footer discreto */}
              <div className="text-center">
                <p className="text-xs text-slate-400">
                  Sistema seguro del Jardín Infantil
                  <br />
                  <span className="opacity-70">Uso exclusivo personal autorizado</span>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Mensaje inferior flotante */}
        <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="text-sm font-medium text-slate-500 bg-white/40 backdrop-blur-sm py-2 px-4 rounded-full inline-block shadow-sm">
            ¿Necesitas ayuda técnica? <span className="text-indigo-600 cursor-pointer hover:underline">Contáctanos</span>
          </p>
        </div>
      </div>
    </div>
  );
}