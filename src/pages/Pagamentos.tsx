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
  Menu,
  X,
  Calendar,
  Filter,
  Download,
  Plus,
  ChevronDown,
  CheckCircle2,
  Clock,
  AlertTriangle,
} from "lucide-react";
import logoImg from "@/assets/avera-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CreditCard, label: "Pagamentos", path: "/dashboard/pagamentos" },
  { icon: Users, label: "Alunos", path: "/dashboard" },
  { icon: Calendar, label: "Agendamentos", path: "/dashboard" },
  { icon: Settings, label: "Configurações", path: "/dashboard" },
];

type PaymentStatus = "all" | "Pago" | "Pendente" | "Atrasado";

const allPayments = [
  { id: 1, name: "Carlos Silva", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Pago", date: "06/03/2026", method: "PIX" },
  { id: 2, name: "Ana Beatriz", plan: "Trimestral — Natação", amount: "R$ 399,90", status: "Pago", date: "06/03/2026", method: "Cartão" },
  { id: 3, name: "Pedro Henrique", plan: "Mensal — Funcional", amount: "R$ 129,90", status: "Pendente", date: "05/03/2026", method: "Boleto" },
  { id: 4, name: "Maria Clara", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Atrasado", date: "03/03/2026", method: "PIX" },
  { id: 5, name: "João Victor", plan: "Semestral — Completo", amount: "R$ 699,90", status: "Pago", date: "03/03/2026", method: "Cartão" },
  { id: 6, name: "Rafael Santos", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Pendente", date: "02/03/2026", method: "PIX" },
  { id: 7, name: "Juliana Costa", plan: "Mensal — Funcional", amount: "R$ 129,90", status: "Pago", date: "01/03/2026", method: "Cartão" },
  { id: 8, name: "Lucas Almeida", plan: "Trimestral — Natação", amount: "R$ 399,90", status: "Atrasado", date: "28/02/2026", method: "Boleto" },
  { id: 9, name: "Fernanda Lima", plan: "Mensal — Musculação", amount: "R$ 149,90", status: "Pago", date: "28/02/2026", method: "PIX" },
  { id: 10, name: "Gabriel Oliveira", plan: "Mensal — Funcional", amount: "R$ 129,90", status: "Pendente", date: "27/02/2026", method: "Boleto" },
];

const Pagamentos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<PaymentStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = allPayments.filter((p) => {
    const matchStatus = filter === "all" || p.status === filter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const statusColor = (status: string) => {
    if (status === "Pago") return "bg-accent/15 text-accent";
    if (status === "Pendente") return "bg-primary/15 text-primary";
    return "bg-destructive/15 text-destructive";
  };

  const statusIcon = (status: string) => {
    if (status === "Pago") return <CheckCircle2 className="w-3.5 h-3.5" />;
    if (status === "Pendente") return <Clock className="w-3.5 h-3.5" />;
    return <AlertTriangle className="w-3.5 h-3.5" />;
  };

  const totals = {
    pago: allPayments.filter(p => p.status === "Pago").length,
    pendente: allPayments.filter(p => p.status === "Pendente").length,
    atrasado: allPayments.filter(p => p.status === "Atrasado").length,
  };

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
              onClick={() => { navigate(item.path); setSidebarOpen(false); }}
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

  const filterTabs: { label: string; value: PaymentStatus; count: number }[] = [
    { label: "Todos", value: "all", count: allPayments.length },
    { label: "Pagos", value: "Pago", count: totals.pago },
    { label: "Pendentes", value: "Pendente", count: totals.pendente },
    { label: "Atrasados", value: "Atrasado", count: totals.atrasado },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar - desktop */}
      <aside className="hidden lg:flex w-72 flex-col hero-gradient border-r border-primary/10 fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 h-full hero-gradient border-r border-primary/10 flex flex-col">
            <div className="absolute top-6 right-4">
              <button onClick={() => setSidebarOpen(false)} className="text-hero-foreground/50"><X size={20} /></button>
            </div>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 lg:ml-72">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
            <h2 className="font-display text-lg font-bold text-foreground hidden sm:block">Pagamentos</h2>
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
          >
            <div>
              <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
                Pagamentos
              </h1>
              <p className="text-muted-foreground font-light mt-1">
                Gerencie cobranças e acompanhe o status dos pagamentos.
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2">
                <Download className="w-4 h-4" /> Exportar
              </Button>
              <Button variant="hero" size="sm" className="rounded-xl gap-2">
                <Plus className="w-4 h-4" /> Nova Cobrança
              </Button>
            </div>
          </motion.div>

          {/* Summary cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-6"
          >
            <div className="p-4 rounded-2xl bg-accent/5 border border-accent/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-foreground">{totals.pago}</div>
                <div className="text-xs text-muted-foreground">Pagos</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-foreground">{totals.pendente}</div>
                <div className="text-xs text-muted-foreground">Pendentes</div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/15 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-foreground">{totals.atrasado}</div>
                <div className="text-xs text-muted-foreground">Atrasados</div>
              </div>
            </div>
          </motion.div>

          {/* Filters & Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-3 mb-6"
          >
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border/60">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === tab.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-[10px] opacity-60">{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Buscar por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-sm w-full focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden"
          >
            {/* Table header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/60 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <div className="col-span-4">Aluno</div>
              <div className="col-span-2">Valor</div>
              <div className="col-span-2">Data</div>
              <div className="col-span-2">Método</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-border/40">
              {filtered.map((payment) => (
                <div
                  key={payment.id}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer items-center"
                >
                  <div className="sm:col-span-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {payment.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{payment.name}</div>
                      <div className="text-xs text-muted-foreground">{payment.plan}</div>
                    </div>
                  </div>
                  <div className="sm:col-span-2 font-semibold text-foreground text-sm">{payment.amount}</div>
                  <div className="sm:col-span-2 text-sm text-muted-foreground">{payment.date}</div>
                  <div className="sm:col-span-2 text-sm text-muted-foreground">{payment.method}</div>
                  <div className="sm:col-span-2">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${statusColor(payment.status)}`}>
                      {statusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground text-sm">
                  Nenhum pagamento encontrado.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Pagamentos;
