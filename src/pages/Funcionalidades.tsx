import { useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Calendar,
  Dumbbell,
  Users,
  BarChart3,
  CreditCard,
  Bell,
  Search,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const modules = [
  { id: "scheduling", icon: Calendar, title: "Agendamento Online", description: "Reserva de quadras e horários 24/7" },
  { id: "payments", icon: CreditCard, title: "Gestão Financeira", description: "Cobranças, mensalidades e relatórios" },
  { id: "workouts", icon: Dumbbell, title: "Treinos Personalizados", description: "Fichas de treino e acompanhamento" },
  { id: "community", icon: Users, title: "Comunidade", description: "Chat entre alunos e desafios" },
  { id: "analytics", icon: BarChart3, title: "Relatórios Avançados", description: "Dashboards e métricas detalhadas" },
  { id: "notifications", icon: Bell, title: "Notificações Push", description: "Avisos automáticos para clientes" },
];

const clientFeatures: Record<string, { name: string; plan: string; enabled: string[] }> = {
  "1": { name: "Arena Beach Sports", plan: "Profissional", enabled: ["scheduling", "payments", "workouts", "notifications"] },
  "2": { name: "Centro Esportivo Vitória", plan: "Starter", enabled: ["scheduling", "payments"] },
  "3": { name: "Quadra10 Sports", plan: "Profissional", enabled: ["scheduling", "payments", "workouts", "analytics"] },
  "5": { name: "Arena Vôlei SP", plan: "Enterprise", enabled: ["scheduling", "payments", "workouts", "community", "analytics", "notifications"] },
  "7": { name: "Ace Padel Club", plan: "Starter", enabled: ["scheduling", "payments"] },
};

const Funcionalidades = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState("1");
  const [features, setFeatures] = useState(clientFeatures);

  const current = features[selectedClient];

  const toggleFeature = (moduleId: string) => {
    setFeatures((prev) => {
      const client = prev[selectedClient];
      const enabled = client.enabled.includes(moduleId)
        ? client.enabled.filter((id) => id !== moduleId)
        : [...client.enabled, moduleId];
      return { ...prev, [selectedClient]: { ...client, enabled } };
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <Zap className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Funcionalidades</h1>
            </div>
            <p className="text-muted-foreground font-light">
              Habilite ou desabilite módulos por cliente.
            </p>
          </motion.div>

          {/* Client selector */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-6">
            <label className="text-xs font-medium text-muted-foreground mb-2 block">Selecionar cliente</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="h-10 px-4 rounded-xl bg-card border border-border/60 text-sm focus:outline-none focus:border-primary/40 transition-colors min-w-[280px]"
            >
              {Object.entries(features).map(([id, client]) => (
                <option key={id} value={id}>
                  {client.name} — {client.plan}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Feature info */}
          {current && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="p-5 rounded-2xl bg-primary/5 border border-primary/20 mb-6 flex items-center justify-between">
              <div>
                <div className="font-display font-bold text-foreground">{current.name}</div>
                <div className="text-sm text-muted-foreground">Plano: {current.plan} · {current.enabled.length} módulos ativos</div>
              </div>
            </motion.div>
          )}

          {/* Modules grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {modules.map((mod, i) => {
              const isEnabled = current?.enabled.includes(mod.id);
              return (
                <motion.div
                  key={mod.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isEnabled ? "bg-card border-primary/20" : "bg-muted/30 border-border/40"
                  }`}
                  onClick={() => toggleFeature(mod.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isEnabled ? "bg-primary/10" : "bg-muted"}`}>
                      <mod.icon className={`w-5 h-5 ${isEnabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    {isEnabled ? (
                      <ToggleRight className="w-6 h-6 text-primary" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 text-muted-foreground/40" />
                    )}
                  </div>
                  <h3 className={`font-display font-bold text-sm ${isEnabled ? "text-foreground" : "text-muted-foreground"}`}>
                    {mod.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{mod.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Funcionalidades;
