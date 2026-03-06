import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Users,
  Settings,
  LogOut,
  Bell,
  Search,
  TrendingUp,
  DollarSign,
  UserCheck,
  AlertTriangle,
  ChevronRight,
  Menu,
  X,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import logoImg from "@/assets/avera-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CreditCard, label: "Pagamentos", path: "/dashboard/pagamentos" },
  { icon: Users, label: "Alunos", path: "/dashboard" },
  { icon: Calendar, label: "Agendamentos", path: "/dashboard" },
  { icon: Settings, label: "Configurações", path: "/dashboard" },
];

const stats = [
  { label: "Receita Mensal", value: "R$ 48.500", icon: DollarSign, trend: "+12% vs mês anterior", up: true, color: "text-primary" },
  { label: "Alunos Ativos", value: "312", icon: UserCheck, trend: "+18 este mês", up: true, color: "text-accent" },
  { label: "Inadimplentes", value: "23", icon: AlertTriangle, trend: "7.3% do total", up: false, color: "text-destructive" },
  { label: "Cobranças Pendentes", value: "R$ 8.740", icon: CreditCard, trend: "15 cobranças", up: false, color: "text-primary" },
];

const recentPayments = [
  { name: "Carlos Silva", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Pago", date: "Hoje" },
  { name: "Ana Beatriz", plan: "Trimestral — Natação", amount: "R$ 399,90", status: "Pago", date: "Hoje" },
  { name: "Pedro Henrique", plan: "Mensal — Funcional", amount: "R$ 129,90", status: "Pendente", date: "Ontem" },
  { name: "Maria Clara", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Atrasado", date: "3 dias" },
  { name: "João Victor", plan: "Semestral — Completo", amount: "R$ 699,90", status: "Pago", date: "3 dias" },
];

const upcomingDues = [
  { name: "Rafael Santos", dueDate: "Amanhã", amount: "R$ 149,90", plan: "Musculação" },
  { name: "Juliana Costa", dueDate: "Em 2 dias", amount: "R$ 129,90", plan: "Funcional" },
  { name: "Lucas Almeida", dueDate: "Em 3 dias", amount: "R$ 399,90", plan: "Natação" },
  { name: "Fernanda Lima", dueDate: "Em 5 dias", amount: "R$ 149,90", plan: "Musculação" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center gap-3">
        <img src={logoImg} alt="Avera" className="h-9" />
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-hero-foreground/50 hover:text-hero-foreground hover:bg-hero-foreground/5"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}
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
    </>
  );

  const statusColor = (status: string) => {
    if (status === "Pago") return "bg-accent/15 text-accent";
    if (status === "Pendente") return "bg-primary/15 text-primary";
    return "bg-destructive/15 text-destructive";
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex w-72 flex-col hero-gradient border-r border-primary/10 fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 h-full hero-gradient border-r border-primary/10 flex flex-col">
            <div className="absolute top-6 right-4">
              <button onClick={() => setSidebarOpen(false)} className="text-hero-foreground/50">
                <X size={20} />
              </button>
            </div>
            <SidebarContent />
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
                placeholder="Buscar aluno, cobrança..."
                className="h-10 pl-10 pr-4 rounded-xl bg-muted/50 border border-border/60 text-sm w-72 focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center hover:bg-muted transition-colors">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
              AV
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
              Painel Financeiro 💰
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Acompanhe cobranças, receitas e inadimplência do seu centro esportivo.
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
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  {stat.up ? (
                    <ArrowUpRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
                <div className="font-display text-2xl font-extrabold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{stat.label}</div>
                <div className={`text-xs mt-1 font-medium ${stat.up ? "text-accent" : "text-destructive/70"}`}>{stat.trend}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Recent Payments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3 rounded-2xl bg-card border border-border/60 overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-border/60">
                <h2 className="font-display text-lg font-bold text-foreground">Últimos Pagamentos</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary text-xs rounded-lg"
                  onClick={() => navigate("/dashboard/pagamentos")}
                >
                  Ver todos <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
              <div className="divide-y divide-border/40">
                {recentPayments.map((payment) => (
                  <div key={payment.name} className="p-5 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-primary">
                        {payment.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-foreground text-sm">{payment.name}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{payment.plan}</div>
                    </div>
                    <div className="text-right hidden sm:block">
                      <div className="font-semibold text-foreground text-sm">{payment.amount}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{payment.date}</div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${statusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Upcoming dues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-2 rounded-2xl bg-card border border-border/60 overflow-hidden"
            >
              <div className="p-6 border-b border-border/60">
                <h2 className="font-display text-lg font-bold text-foreground">Vencimentos Próximos</h2>
              </div>
              <div className="p-4 space-y-3">
                {upcomingDues.map((due, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{due.name}</p>
                      <p className="text-xs text-muted-foreground">{due.plan} · {due.dueDate}</p>
                    </div>
                    <span className="text-sm font-semibold text-foreground whitespace-nowrap">{due.amount}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 pt-0">
                <Button variant="ghost" size="sm" className="w-full text-primary text-xs rounded-lg">
                  Ver todos os vencimentos <ChevronRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
