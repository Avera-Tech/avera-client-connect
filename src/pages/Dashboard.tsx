import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import logoImg from "@/assets/avera-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FolderOpen, label: "Projetos" },
  { icon: FileText, label: "Relatórios" },
  { icon: Settings, label: "Configurações" },
];

const stats = [
  { label: "Projetos Ativos", value: "8", icon: FolderOpen, trend: "+2 este mês", color: "text-primary" },
  { label: "Tarefas Concluídas", value: "47", icon: CheckCircle2, trend: "92% do total", color: "text-accent" },
  { label: "Horas Registradas", value: "186h", icon: Clock, trend: "+12h esta semana", color: "text-primary" },
  { label: "Próxima Entrega", value: "3 dias", icon: AlertCircle, trend: "Sprint 14", color: "text-accent" },
];

const projects = [
  { name: "App Mobile v2.0", status: "Em andamento", progress: 72, updated: "Hoje" },
  { name: "Dashboard Analytics", status: "Em revisão", progress: 95, updated: "Ontem" },
  { name: "API Gateway", status: "Em andamento", progress: 45, updated: "2 dias atrás" },
  { name: "Redesign Portal", status: "Planejamento", progress: 15, updated: "3 dias atrás" },
];

const activities = [
  { text: "Nova versão do App Mobile implantada", time: "2h atrás", type: "success" },
  { text: "Relatório mensal disponível para download", time: "5h atrás", type: "info" },
  { text: "Sprint 14 iniciada — 12 tarefas atribuídas", time: "1 dia atrás", type: "info" },
  { text: "Correção crítica aplicada no API Gateway", time: "2 dias atrás", type: "warning" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex w-72 flex-col hero-gradient border-r border-primary/10 fixed inset-y-0 left-0 z-40">
        <div className="p-6 flex items-center gap-3">
          <img src={logoImg} alt="Avera" className="h-9" />
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? "bg-primary/15 text-primary"
                  : "text-hero-foreground/50 hover:text-hero-foreground hover:bg-hero-foreground/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-primary/10">
          <button
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-hero-foreground/40 hover:text-hero-foreground hover:bg-hero-foreground/5 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 h-full hero-gradient border-r border-primary/10 flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <img src={logoImg} alt="Avera" className="h-9" />
              <button onClick={() => setSidebarOpen(false)} className="text-hero-foreground/50">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    item.active
                      ? "bg-primary/15 text-primary"
                      : "text-hero-foreground/50 hover:text-hero-foreground hover:bg-hero-foreground/5"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-primary/10">
              <button
                onClick={() => navigate("/login")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-hero-foreground/40 hover:text-hero-foreground hover:bg-hero-foreground/5 transition-all"
              >
                <LogOut className="w-5 h-5" />
                Sair
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Buscar..."
                className="h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/60 text-sm w-64 focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
              JC
            </div>
          </div>
        </header>

        <div className="p-6 lg:p-8 max-w-7xl">
          {/* Welcome */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
              Olá, João 👋
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Aqui está o resumo dos seus projetos e atividades.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="font-display text-2xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                <div className="text-xs text-primary/70 mt-1 font-medium">{stat.trend}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Projects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 rounded-2xl bg-card border border-border/60 overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-border/60">
                <h2 className="font-display text-lg font-bold text-foreground">Projetos</h2>
                <Button variant="ghost" size="sm" className="text-primary text-xs rounded-lg">
                  Ver todos <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="divide-y divide-border/40">
                {projects.map((project) => (
                  <div key={project.name} className="p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">{project.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{project.status} · {project.updated}</div>
                    </div>
                    <div className="w-32 hidden sm:block">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-muted-foreground">Progresso</span>
                        <span className="font-semibold text-foreground">{project.progress}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 rounded-2xl bg-card border border-border/60 overflow-hidden"
            >
              <div className="p-6 border-b border-border/60">
                <h2 className="font-display text-lg font-bold text-foreground">Atividades Recentes</h2>
              </div>
              <div className="p-4 space-y-3">
                {activities.map((activity, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      activity.type === "success" ? "bg-accent" :
                      activity.type === "warning" ? "bg-destructive" : "bg-primary"
                    }`} />
                    <div>
                      <p className="text-sm text-foreground leading-snug">{activity.text}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
