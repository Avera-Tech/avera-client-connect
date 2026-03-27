import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
} from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

type FilterStatus = "all" | "Ativo" | "Trial" | "Inadimplente" | "Cancelado";

const clients = [
  { id: 1, name: "Arena Beach Sports", cnpj: "12.345.678/0001-90", city: "São Paulo", segment: "Beach Tennis", plan: "Profissional", status: "Ativo", quadras: 8, since: "01/09/2025" },
  { id: 2, name: "Centro Esportivo Vitória", cnpj: "23.456.789/0001-01", city: "Campinas", segment: "Multiesportivo", plan: "Starter", status: "Trial", quadras: 4, since: "20/03/2026" },
  { id: 3, name: "Quadra10 Sports", cnpj: "34.567.890/0001-12", city: "Belo Horizonte", segment: "Padel", plan: "Profissional", status: "Ativo", quadras: 6, since: "15/01/2026" },
  { id: 4, name: "Play Tennis Club", cnpj: "45.678.901/0001-23", city: "Curitiba", segment: "Tênis", plan: "Teste Grátis", status: "Trial", quadras: 3, since: "15/03/2026" },
  { id: 5, name: "Arena Vôlei SP", cnpj: "56.789.012/0001-34", city: "São Paulo", segment: "Vôlei", plan: "Enterprise", status: "Ativo", quadras: 12, since: "01/06/2025" },
  { id: 6, name: "Sport Center Rio", cnpj: "67.890.123/0001-45", city: "Rio de Janeiro", segment: "Futevôlei", plan: "Profissional", status: "Inadimplente", quadras: 5, since: "01/08/2025" },
  { id: 7, name: "Ace Padel Club", cnpj: "78.901.234/0001-56", city: "Florianópolis", segment: "Padel", plan: "Starter", status: "Ativo", quadras: 4, since: "01/11/2025" },
  { id: 8, name: "Top Tennis Academy", cnpj: "89.012.345/0001-67", city: "Porto Alegre", segment: "Tênis", plan: "Profissional", status: "Cancelado", quadras: 6, since: "01/03/2025" },
];

const statusBadge = (status: string) => {
  if (status === "Ativo") return "bg-accent/15 text-accent";
  if (status === "Trial") return "bg-primary/15 text-primary";
  if (status === "Inadimplente") return "bg-destructive/15 text-destructive";
  return "bg-muted text-muted-foreground";
};

const statusIcon = (status: string) => {
  if (status === "Ativo") return <CheckCircle2 className="w-3.5 h-3.5" />;
  if (status === "Trial") return <Clock className="w-3.5 h-3.5" />;
  if (status === "Inadimplente") return <AlertTriangle className="w-3.5 h-3.5" />;
  return null;
};

const Clientes = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<FilterStatus>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = clients.filter((c) => {
    const matchStatus = filter === "all" || c.status === filter;
    const matchSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj.includes(searchTerm) ||
      c.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    all: clients.length,
    Ativo: clients.filter((c) => c.status === "Ativo").length,
    Trial: clients.filter((c) => c.status === "Trial").length,
    Inadimplente: clients.filter((c) => c.status === "Inadimplente").length,
    Cancelado: clients.filter((c) => c.status === "Cancelado").length,
  };

  const filterTabs: { label: string; value: FilterStatus; count: number }[] = [
    { label: "Todos", value: "all", count: counts.all },
    { label: "Ativos", value: "Ativo", count: counts.Ativo },
    { label: "Trial", value: "Trial", count: counts.Trial },
    { label: "Inadimplentes", value: "Inadimplente", count: counts.Inadimplente },
    { label: "Cancelados", value: "Cancelado", count: counts.Cancelado },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <Users className="w-7 h-7 text-primary" />
              <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Clientes</h1>
            </div>
            <p className="text-muted-foreground font-light">
              Gerencie todos os centros esportivos cadastrados na plataforma.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border/60 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
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
                placeholder="Buscar por nome, CNPJ ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-sm w-full focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Client table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl bg-card border border-border/60 overflow-hidden">
            {/* Header row */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_80px_60px] gap-4 px-5 py-3 border-b border-border/60 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Centro Esportivo</span>
              <span>Plano</span>
              <span>Cidade</span>
              <span>Status</span>
              <span>Quadras</span>
              <span></span>
            </div>

            <div className="divide-y divide-border/40">
              {filtered.map((client) => (
                <div key={client.id} className="px-5 py-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_80px_60px] md:gap-4 md:items-center flex flex-col gap-2 hover:bg-muted/30 transition-colors">
                  <div>
                    <div className="font-semibold text-foreground text-sm">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.cnpj} · {client.segment}</div>
                  </div>
                  <div className="text-sm text-foreground">{client.plan}</div>
                  <div className="text-sm text-muted-foreground">{client.city}</div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit ${statusBadge(client.status)}`}>
                    {statusIcon(client.status)}
                    {client.status}
                  </span>
                  <div className="text-sm text-foreground">{client.quadras}</div>
                  <button className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors" title="Ver detalhes">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground text-sm">Nenhum cliente encontrado.</div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Clientes;
