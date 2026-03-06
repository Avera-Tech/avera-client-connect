import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Download,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

type FilterStatus = "all" | "Pago" | "Pendente" | "Atrasado";

const paymentHistory = [
  { id: 1, description: "Mensalidade — Março/2026", amount: "R$ 149,90", status: "Pendente", date: "10/03/2026", method: "—" },
  { id: 2, description: "Mensalidade — Fevereiro/2026", amount: "R$ 149,90", status: "Pago", date: "10/02/2026", method: "PIX" },
  { id: 3, description: "Mensalidade — Janeiro/2026", amount: "R$ 149,90", status: "Pago", date: "10/01/2026", method: "PIX" },
  { id: 4, description: "Mensalidade — Dezembro/2025", amount: "R$ 149,90", status: "Pago", date: "10/12/2025", method: "Cartão" },
  { id: 5, description: "Mensalidade — Novembro/2025", amount: "R$ 149,90", status: "Pago", date: "10/11/2025", method: "PIX" },
  { id: 6, description: "Mensalidade — Outubro/2025", amount: "R$ 149,90", status: "Pago", date: "10/10/2025", method: "PIX" },
  { id: 7, description: "Mensalidade — Setembro/2025", amount: "R$ 129,90", status: "Pago", date: "10/09/2025", method: "Boleto" },
  { id: 8, description: "Taxa de matrícula", amount: "R$ 99,90", status: "Pago", date: "01/09/2025", method: "Cartão" },
];

const Pagamentos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = paymentHistory.filter((p) => {
    const matchStatus = filter === "all" || p.status === filter;
    const matchSearch = p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totals = {
    pago: paymentHistory.filter(p => p.status === "Pago").length,
    pendente: paymentHistory.filter(p => p.status === "Pendente").length,
    atrasado: paymentHistory.filter(p => p.status === "Atrasado").length,
  };

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

  const filterTabs: { label: string; value: FilterStatus; count: number }[] = [
    { label: "Todos", value: "all", count: paymentHistory.length },
    { label: "Pagos", value: "Pago", count: totals.pago },
    { label: "Pendentes", value: "Pendente", count: totals.pendente },
    { label: "Atrasados", value: "Atrasado", count: totals.atrasado },
  ];

  // Find pending payment for CTA
  const pending = paymentHistory.find(p => p.status === "Pendente");

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">
              Meus Pagamentos
            </h1>
            <p className="text-muted-foreground font-light mt-1">
              Acompanhe seu histórico de cobranças e realize pagamentos pendentes.
            </p>
          </motion.div>

          {/* Pending payment CTA */}
          {pending && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="p-5 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{pending.description}</div>
                  <div className="text-xs text-muted-foreground">Vencimento: {pending.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-xl font-extrabold text-foreground">{pending.amount}</span>
                <Button variant="hero" size="sm" className="rounded-xl gap-2">
                  Pagar <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-sm w-full focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Payment list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden"
          >
            <div className="divide-y divide-border/40">
              {filtered.map((payment) => (
                <div
                  key={payment.id}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-foreground text-sm">{payment.description}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {payment.date} {payment.method !== "—" && `· ${payment.method}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-foreground text-sm">{payment.amount}</span>
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${statusColor(payment.status)}`}>
                      {statusIcon(payment.status)}
                      {payment.status}
                    </span>
                    {payment.status === "Pendente" && (
                      <Button variant="hero" size="sm" className="rounded-xl text-xs h-8 px-3">
                        Pagar
                      </Button>
                    )}
                    {payment.status === "Pago" && (
                      <button className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors" title="Baixar comprovante">
                        <Download className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
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
