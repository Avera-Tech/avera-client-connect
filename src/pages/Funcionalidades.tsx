import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Calendar,
  Dumbbell,
  Users,
  BarChart3,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const features = [
  {
    icon: Calendar,
    title: "Agendamento de Aulas",
    description: "Reserve horários e quadras diretamente pelo app.",
    active: true,
  },
  {
    icon: Dumbbell,
    title: "Treinos Personalizados",
    description: "Acesse sua ficha de treino e acompanhe sua evolução.",
    active: true,
  },
  {
    icon: BarChart3,
    title: "Relatórios de Desempenho",
    description: "Veja métricas e gráficos do seu progresso.",
    active: false,
    comingSoon: true,
  },
  {
    icon: Users,
    title: "Comunidade",
    description: "Conecte-se com outros alunos e participe de desafios.",
    active: false,
    comingSoon: true,
  },
];

const Funcionalidades = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
              Funcionalidades
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Recursos disponíveis no seu plano e novidades que estão por vir.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className={`p-6 rounded-2xl border transition-all ${
                  feature.active
                    ? "bg-card border-border/60 hover:border-primary/20"
                    : "bg-muted/30 border-border/40"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    feature.active ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <feature.icon className={`w-6 h-6 ${
                      feature.active ? "text-primary" : "text-muted-foreground"
                    }`} />
                  </div>
                  {feature.comingSoon && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/10 text-accent">
                      Em breve
                    </span>
                  )}
                  {feature.active && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-accent/15 text-accent">
                      Ativo
                    </span>
                  )}
                </div>
                <h3 className={`font-display font-bold text-lg ${
                  feature.active ? "text-foreground" : "text-muted-foreground"
                }`}>
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                {feature.active && (
                  <Button variant="ghost" size="sm" className="text-primary text-xs rounded-lg mt-4 px-0">
                    Acessar <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Funcionalidades;
