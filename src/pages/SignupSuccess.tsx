import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ExternalLink, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "@/assets/avera-logo.png";

interface TenantData {
  company_name: string;
  slug: string;
  url: string;
  plan: string;
  status: string;
  trial_ends_at: string;
}

const SignupSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tenant = location.state?.tenant as TenantData | undefined;

  // Guard — if accessed directly without state
  if (!tenant) {
    navigate("/signup");
    return null;
  }

  const isPendingProvision = tenant.status === "pending_provision";
  const accessUrl = `https://${tenant.url}`;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center">
          <a href="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Avera" className="h-9" />
          </a>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-card rounded-2xl border border-border/60 p-8 text-center"
        >
          {isPendingProvision ? (
            <>
              {/* Pending provision */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                </div>
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground tracking-tight mb-3">
                Estamos preparando seu ambiente
              </h1>

              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Seu cadastro foi realizado com sucesso! Nossa equipe está
                configurando o ambiente da{" "}
                <span className="font-semibold text-foreground">
                  {tenant.company_name}
                </span>
                .
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Em breve você receberá um e-mail com o link de acesso à sua
                plataforma. Normalmente isso leva menos de 24 horas.
              </p>

              <div className="flex items-center gap-3 p-4 rounded-xl border border-border/60 bg-background mb-6 text-left">
                <Mail className="w-5 h-5 text-muted-foreground shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Verifique sua caixa de entrada — enviaremos uma notificação
                  assim que o ambiente estiver pronto.
                </p>
              </div>

              <p className="text-xs text-muted-foreground">
                Dúvidas? Entre em contato:{" "}
                <a
                  href="mailto:suporte@avera.com.br"
                  className="text-primary hover:underline"
                >
                  suporte@avera.com.br
                </a>
              </p>
            </>
          ) : (
            <>
              {/* Active — ready to access */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              </div>

              <h1 className="font-display text-2xl font-bold text-foreground tracking-tight mb-3">
                Ambiente pronto!
              </h1>

              <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                Tudo certo!{" "}
                <span className="font-semibold text-foreground">
                  {tenant.company_name}
                </span>{" "}
                está pronta para usar o AveraFit.
              </p>

              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Você tem{" "}
                <span className="font-semibold text-foreground">
                  14 dias de período de teste gratuito
                </span>{" "}
                para explorar todas as funcionalidades.
              </p>

              <div className="bg-muted/50 rounded-xl p-4 mb-8 text-left">
                <p className="text-xs text-muted-foreground mb-1">Seu link de acesso:</p>
                <p className="font-mono text-sm text-foreground font-medium">
                  app.averafit.com.br/{tenant.slug}
                </p>
              </div>

              <Button
                className="w-full h-12 rounded-xl font-semibold text-base gap-2 mb-4"
                onClick={() => window.open(accessUrl, "_blank")}
              >
                Acessar minha plataforma
                <ExternalLink className="w-4 h-4" />
              </Button>

              <p className="text-xs text-muted-foreground">
                Guarde esse link — é por ele que você acessará o AveraFit sempre.
              </p>
            </>
          )}
        </motion.div>
      </div>

      <footer className="border-t border-border/40 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Avera. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default SignupSuccess;