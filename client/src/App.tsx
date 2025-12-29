import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    // Hemos envuelto el provider para asegurar que se monte correctamente en el cliente
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="relative min-h-screen bg-white">
          
          {/* OVERLAY DE IDENTIDAD */}
          <div 
            className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.25] mix-blend-multiply" 
            style={{ 
              backgroundImage: `
                url("https://www.transparenttextures.com/patterns/natural-paper.png"),
                url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23a3e635' fill-opacity='0.5' fill-rule='evenodd'%3E%3Cpath d='M20 20l10 10m0-10L20 30' stroke='%23a3e635' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='25' r='8' fill='none' stroke='%23a3e635' stroke-width='1'/%3E%3Cpath d='M80 40c5 0 5 5 10 5s5-5 10-5' fill='none' stroke='%23a3e635' stroke-width='2' stroke-linecap='round'/%3E%3Ccircle cx='90' cy='90' r='3'/%3E%3Cpath d='M40 85l5-5 5 5-5 5z'/%3E%3Cpath d='M100 10h5v5h-5z'/%3E%3C/g%3E%3C/svg%3E")
              `,
              backgroundRepeat: 'repeat',
              backgroundSize: '250px, 150px'
            }} 
            aria-hidden="true"
          />

          <div className="relative z-10">
            <Toaster />
            <Router />
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
            ::-webkit-scrollbar { width: 10px; }
            ::-webkit-scrollbar-track { background: #f8fafc; }
            ::-webkit-scrollbar-thumb { 
              background: #a3e635; 
              border-radius: 20px; 
              border: 3px solid #f8fafc; 
            }
          `}} />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}