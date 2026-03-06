import { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const pendingPayment = {
  description: "Mensalidade — Março/2026",
  amount: "R$ 149,90",
  dueDate: "10/03/2026",
  status: "Pendente",
};

const recentHistory = [
  { month: "Fevereiro/2026", amount: "R$ 149,90", status: "Pago", date: "10/02/2026" },
  { month: "Janeiro/2026", amount: "R$ 149,90", status: "Pago", date: "10/01/2026" },
  { month: "Dezembro/2025", amount: "R$ 149,90", status: "Pago", date: "10/12/2025" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-4xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
              Olá, Carlos 👋
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Bem-vindo à sua área do cliente. Confira seus pagamentos e funcionalidades.
            </p>
          </motion.div>

          {/* Pending payment alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-primary/5 border border-primary/20 mb-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground text-lg">Cobrança Pendente</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {pendingPayment.description} · Vencimento: {pendingPayment.dueDate}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <span className="font-display text-2xl font-extrabold text-foreground">{pendingPayment.amount}</span>
                  <Button variant="hero" size="sm" className="rounded-xl gap-2">
                    Pagar agora <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
              </div>
              <div className="font-display text-xl font-extrabold text-foreground">Ativo</div>
              <div className="text-xs text-muted-foreground mt-0.5">Plano Mensal — Musculação</div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="font-display text-xl font-extrabold text-foreground">R$ 149,90</div>
              <div className="text-xs text-muted-foreground mt-0.5">Mensalidade atual</div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="font-display text-xl font-extrabold text-foreground">10/03</div>
              <div className="text-xs text-muted-foreground mt-0.5">Próximo vencimento</div>
            </div>
          </motion.div>

          {/* Recent history */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden mb-6"
          >
            <div className="p-6 flex items-center justify-between border-b border-border/60">
              <h2 className="font-display text-lg font-bold text-foreground">Últimos Pagamentos</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary text-xs rounded-lg"
                onClick={() => navigate("/dashboard/pagamentos")}
              >
                Ver histórico completo <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-border/40">
              {recentHistory.map((item) => (
                <div key={item.month} className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{item.month}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Pago em {item.date}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground text-sm">{item.amount}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg bg-accent/15 text-accent">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features shortcut */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="p-6 rounded-2xl bg-card border border-border/60 flex items-center justify-between cursor-pointer hover:border-primary/20 transition-all"
            onClick={() => navigate("/dashboard/funcionalidades")}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground">Funcionalidades</h3>
                <p className="text-sm text-muted-foreground">Explore os recursos disponíveis no seu plano</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
