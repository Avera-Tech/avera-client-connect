import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

type FilterStatus = "all" | "Pago" | "Pendente" | "Atrasado";

const invoices = [
  { id: 1, client: "Arena Beach Sports", plan: "Profissional", amount: "R$ 299,90", status: "Pago", dueDate: "10/03/2026", paidDate: "08/03/2026" },
  { id: 2, client: "Centro Esportivo Vitória", plan: "Starter", amount: "R$ 149,90", status: "Pendente", dueDate: "10/03/2026", paidDate: "—" },
  { id: 3, client: "Quadra10 Sports", plan: "Profissional", amount: "R$ 299,90", status: "Pago", dueDate: "10/03/2026", paidDate: "10/03/2026" },
  { id: 4, client: "Sport Center Rio", plan: "Profissional", amount: "R$ 299,90", status: "Atrasado", dueDate: "10/02/2026", paidDate: "—" },
  { id: 5, client: "Ace Padel Club", plan: "Starter", amount: "R$ 149,90", status: "Pago", dueDate: "10/03/2026", paidDate: "09/03/2026" },
  { id: 6, client: "Arena Vôlei SP", plan: "Enterprise", amount: "R$ 799,90", status: "Pago", dueDate: "10/03/2026", paidDate: "05/03/2026" },
  { id: 7, client: "Sport Center Rio", plan: "Profissional", amount: "R$ 299,90", status: "Atrasado", dueDate: "10/01/2026", paidDate: "—" },
  { id: 8, client: "Play Tennis Club", plan: "Teste Grátis", amount: "R$ 0,00", status: "Pago", dueDate: "—", paidDate: "—" },
];

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

const Cobrancas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = invoices.filter((inv) => {
    const matchStatus = filter === "all" || inv.status === filter;
    const matchSearch = inv.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totals = {
    pago: invoices.filter((i) => i.status === "Pago").length,
    pendente: invoices.filter((i) => i.status === "Pendente").length,
    atrasado: invoices.filter((i) => i.status === "Atrasado").length,
  };

  const filterTabs: { label: string; value: FilterStatus; count: number }[] = [
    { label: "Todos", value: "all", count: invoices.length },
    { label: "Pagos", value: "Pago", count: totals.pago },
    { label: "Pendentes", value: "Pendente", count: totals.pendente },
    { label: "Atrasados", value: "Atrasado", count: totals.atrasado },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <DollarSign className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Cobranças & Faturas</h1>
            </div>
            <p className="text-muted-foreground font-light">
              Visualize e gerencie todos os pagamentos dos clientes.
            </p>
          </motion.div>

          {/* Summary cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="text-xs text-muted-foreground mb-1">Recebido este mês</div>
              <div className="font-display text-2xl font-extrabold text-foreground">R$ 17.590</div>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="text-xs text-muted-foreground mb-1">Pendente</div>
              <div className="font-display text-2xl font-extrabold text-primary">R$ 149,90</div>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-border/60">
              <div className="text-xs text-muted-foreground mb-1">Em atraso</div>
              <div className="font-display text-2xl font-extrabold text-destructive">R$ 599,80</div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border/60">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    filter === tab.value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                  <span className="ml-1.5 text-[10px] opacity-60">{tab.count}</span>
                </button>
              ))}
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Buscar por cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-sm w-full focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Invoice list */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-card border border-border/60 overflow-hidden">
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] gap-4 px-5 py-3 border-b border-border/60 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Cliente</span>
              <span>Plano</span>
              <span>Valor</span>
              <span>Vencimento</span>
              <span>Status</span>
              <span></span>
            </div>

            <div className="divide-y divide-border/40">
              {filtered.map((inv) => (
                <div key={`${inv.id}-${inv.dueDate}`} className="px-5 py-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1fr_60px] md:gap-4 md:items-center flex flex-col gap-2 hover:bg-muted/30 transition-colors">
                  <div className="font-semibold text-foreground text-sm">{inv.client}</div>
                  <div className="text-sm text-muted-foreground">{inv.plan}</div>
                  <div className="font-semibold text-foreground text-sm">{inv.amount}</div>
                  <div className="text-sm text-muted-foreground">{inv.dueDate}</div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit ${statusColor(inv.status)}`}>
                    {statusIcon(inv.status)}
                    {inv.status}
                  </span>
                  {(inv.status === "Pendente" || inv.status === "Atrasado") && (
                    <Button variant="ghost" size="sm" className="text-primary text-xs rounded-lg h-8 px-3 w-fit" title="Enviar cobrança">
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground text-sm">Nenhuma fatura encontrada.</div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Cobrancas;
