import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const kpis = [
  { label: "Clientes Ativos", value: "127", icon: Users, change: "+8 este mês", color: "primary" },
  { label: "MRR", value: "R$ 18.940", icon: DollarSign, change: "+12% vs mês anterior", color: "accent" },
  { label: "Taxa de Churn", value: "2,3%", icon: TrendingUp, change: "-0,5% vs mês anterior", color: "primary" },
  { label: "Inadimplentes", value: "9", icon: AlertTriangle, change: "R$ 1.349,10 em aberto", color: "destructive" },
];

const recentClients = [
  { name: "Arena Beach Sports", plan: "Profissional", status: "Ativo", date: "22/03/2026" },
  { name: "Centro Esportivo Vitória", plan: "Starter", status: "Trial", date: "20/03/2026" },
  { name: "Quadra10 Sports", plan: "Profissional", status: "Ativo", date: "18/03/2026" },
  { name: "Play Tennis Club", plan: "Teste Grátis", status: "Trial", date: "15/03/2026" },
  { name: "Arena Vôlei SP", plan: "Enterprise", status: "Ativo", date: "12/03/2026" },
];

const statusBadge = (status: string) => {
  if (status === "Ativo") return "bg-accent/15 text-accent";
  if (status === "Trial") return "bg-primary/15 text-primary";
  return "bg-destructive/15 text-destructive";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-5xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
              Painel Avera
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Visão geral da plataforma e métricas do SaaS.
            </p>
          </motion.div>

          {/* KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {kpis.map((kpi) => (
              <div key={kpi.label} className="p-5 rounded-2xl bg-card border border-border/60">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-${kpi.color}/10 flex items-center justify-center`}>
                    <kpi.icon className={`w-5 h-5 text-${kpi.color}`} />
                  </div>
                </div>
                <div className="font-display text-2xl font-extrabold text-foreground">{kpi.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{kpi.label}</div>
                <div className="text-[11px] text-muted-foreground/70 mt-1">{kpi.change}</div>
              </div>
            ))}
          </motion.div>

          {/* Recent clients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden mb-6"
          >
            <div className="p-6 flex items-center justify-between border-b border-border/60">
              <h2 className="font-display text-lg font-bold text-foreground">Últimos Cadastros</h2>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary text-xs rounded-lg"
                onClick={() => navigate("/dashboard/clientes")}
              >
                Ver todos <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
            <div className="divide-y divide-border/40">
              {recentClients.map((client) => (
                <div key={client.name} className="p-5 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{client.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {client.plan} · Cadastrado em {client.date}
                    </div>
                  </div>
                  <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg ${statusBadge(client.status)}`}>
                    {client.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            <div
              className="p-6 rounded-2xl bg-card border border-border/60 flex items-center gap-4 cursor-pointer hover:border-primary/20 transition-all"
              onClick={() => navigate("/dashboard/cobrancas")}
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Cobranças & Faturas</h3>
                <p className="text-sm text-muted-foreground">9 inadimplentes · R$ 1.349 em aberto</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
              className="p-6 rounded-2xl bg-card border border-border/60 flex items-center gap-4 cursor-pointer hover:border-primary/20 transition-all"
              onClick={() => navigate("/dashboard/funcionalidades")}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">Funcionalidades</h3>
                <p className="text-sm text-muted-foreground">Gerencie módulos por cliente</p>
              </div>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
