import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/avera-logo.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useToast } from "@/hooks/use-toast";
import { adminAuthApi } from "@/services/authService";
import { adminToken } from "@/services/httpClient";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast({ title: "Preencha e-mail e senha.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      const res = await adminAuthApi.login({ email: email.trim(), password });
      adminToken.set(res.token);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro ao fazer login.";
      toast({ title: message, variant: "destructive" });
      // Limpa a senha por segurança após erro
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroBg})` }} />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute top-1/3 left-[20%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-[15%] w-56 h-56 rounded-full bg-accent/8 blur-[80px] animate-float-delayed" />

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <a href="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Avera" className="h-10" />
          </a>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="font-display text-4xl xl:text-5xl font-extrabold text-hero-foreground leading-tight tracking-tight mb-4">
              Bem-vindo à sua
              <br />
              <span className="text-gradient">área exclusiva</span>
            </h2>
            <p className="text-hero-foreground/50 text-lg font-light max-w-md">
              Acesse seu painel para acompanhar projetos, relatórios e muito mais.
            </p>
          </motion.div>

          <p className="text-hero-foreground/30 text-sm">
            © {new Date().getFullYear()} Avera. Todos os direitos reservados.
          </p>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background relative">
        <div className="absolute inset-0 mesh-gradient opacity-30" />

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          {/* Mobile logo */}
          <a href="/" className="lg:hidden flex items-center gap-3 mb-10">
            <img src={logoImg} alt="Avera" className="h-10" />
          </a>

          <div className="mb-10">
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight mb-2">
              Entrar
            </h1>
            <p className="text-muted-foreground font-light">
              Acesse sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="seu@avera.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-13 rounded-xl bg-card border-border/60 focus:border-primary/50 focus:ring-primary/20"
                autoComplete="email"
                disabled={isLoading}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">Senha</label>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-13 rounded-xl bg-card border-border/60 pr-12 focus:border-primary/50 focus:ring-primary/20"
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              className="w-full rounded-xl h-13 font-semibold text-base"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
              {!isLoading && <ArrowRight className="ml-2 w-4 h-4" />}
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;