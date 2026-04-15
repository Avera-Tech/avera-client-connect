import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Cobrancas from "./pages/Cobrancas";
import Funcionalidades from "./pages/Funcionalidades";
import Usuarios from "./pages/Usuarios";
import Planos from "./pages/Planos";
import EmailTemplate from "./pages/EmailTemplate";
import NotFound from "./pages/NotFound";
import AveraFit from "./pages/AveraFit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<AveraFit />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/clientes" element={<Clientes />} />
          <Route path="/dashboard/usuarios" element={<Usuarios />} />
          <Route path="/dashboard/planos" element={<Planos />} />
          <Route path="/dashboard/cobrancas" element={<Cobrancas />} />
          <Route path="/dashboard/funcionalidades" element={<Funcionalidades />} />
          <Route path="/dashboard/email-template" element={<EmailTemplate />} />
          <Route path="/averafit" element={<AveraFit />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
