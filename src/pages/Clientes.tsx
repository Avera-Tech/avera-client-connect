import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Users,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Eye,
  ShieldAlert,
  X,
  Building2,
  MapPin,
  Phone,
  CreditCard,
  Layers,
  Calendar,
  User,
  Mail,
  Zap,
  UserPlus,
  Send,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useAdminTenants, useAdminTenant } from "@/hooks/useTenants";
import type { TenantStatus, TenantPlan } from "@/services/tenantsService";
import { adminTenantsApi } from "@/services/tenantsService";

// ─── Mapeamento API → visual ──────────────────────────────────────────────────
// A API usa: active | pending | pending_provision | suspended | cancelled
// A página usa: Ativo | Trial | Inadimplente | Cancelado

type VisualStatus = "all" | "active" | "pending" | "suspended" | "cancelled";

const STATUS_LABEL: Record<TenantStatus, string> = {
  active:            "Ativo",
  pending:           "Trial",
  pending_provision: "Trial",
  suspended:         "Inadimplente",
  cancelled:         "Cancelado",
};

const PLAN_LABEL: Record<TenantPlan, string> = {
  starter:      "Starter",
  professional: "Profissional",
  enterprise:   "Enterprise",
};

const formatCnpj = (cnpj: string) =>
  cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");

const statusBadge = (status: TenantStatus) => {
  if (status === "active")                         return "bg-accent/15 text-accent";
  if (status === "pending" || status === "pending_provision") return "bg-primary/15 text-primary";
  if (status === "suspended")                      return "bg-destructive/15 text-destructive";
  return "bg-muted text-muted-foreground";
};

const statusIcon = (status: TenantStatus) => {
  if (status === "active")                         return <CheckCircle2 className="w-3.5 h-3.5" />;
  if (status === "pending" || status === "pending_provision") return <Clock className="w-3.5 h-3.5" />;
  if (status === "suspended")                      return <AlertTriangle className="w-3.5 h-3.5" />;
  return null;
};

// ─── Componente ───────────────────────────────────────────────────────────────

const Clientes = () => {
  const [sidebarOpen, setSidebarOpen]     = useState(false);
  const [searchTerm, setSearchTerm]       = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId]       = useState<number | null>(null);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Modal de convite ──────────────────────────────────────────────────────
  const [inviteOpen, setInviteOpen]       = useState(false);
  const [inviteEmail, setInviteEmail]     = useState("");
  const [inviteName, setInviteName]       = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteError, setInviteError]     = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  const handleInviteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteError(null);
    setInviteLoading(true);
    try {
      await adminTenantsApi.sendInvite(inviteEmail, inviteName);
      setInviteSuccess(true);
      setInviteEmail("");
      setInviteName("");
    } catch (err: unknown) {
      setInviteError(err instanceof Error ? err.message : "Erro ao enviar convite.");
    } finally {
      setInviteLoading(false);
    }
  };

  const closeInviteModal = () => {
    setInviteOpen(false);
    setInviteEmail("");
    setInviteName("");
    setInviteError(null);
    setInviteSuccess(false);
  };

  // ── Filtros refletidos na URL ──────────────────────────────────────────────
  const [searchParams, setSearchParams] = useSearchParams();

  const statusParam = searchParams.get("status") as TenantStatus | null;
  const planParam   = searchParams.get("plan")   as TenantPlan   | null;

  const setFilter = (status: VisualStatus) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (status === "all") next.delete("status");
      else next.set("status", status);
      return next;
    }, { replace: true });
  };

  const setPlanFilter = (plan: TenantPlan | undefined) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (!plan) next.delete("plan");
      else next.set("plan", plan);
      return next;
    }, { replace: true });
  };

  // ── Debounce da busca ──────────────────────────────────────────────────────
  const handleSearch = useCallback((value: string) => {
    setSearchTerm(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedSearch(value), 400);
  }, []);

  // ── Query ──────────────────────────────────────────────────────────────────
  // statusParam null = sem filtro (Todos), string = filtro ativo
  const { data, isLoading, isError } = useAdminTenants({
    search: debouncedSearch || undefined,
    status: statusParam ?? undefined,
    plan:   planParam   ?? undefined,
    limit:  50,
  });

  const tenants = data?.data ?? [];
  const total   = data?.meta?.total ?? 0;

  // ── Detalhes ───────────────────────────────────────────────────────────────
  const { data: detail, isLoading: loadingDetail } = useAdminTenant(selectedId);

  const filterTabs: { label: string; value: VisualStatus }[] = [
    { label: "Todos",         value: "all"       },
    { label: "Ativos",        value: "active"    },
    { label: "Trial",         value: "pending"   },
    { label: "Inadimplentes", value: "suspended" },
    { label: "Cancelados",    value: "cancelled" },
  ];

  // Tab ativa — null no param = "all"
  const activeFilter: VisualStatus = (statusParam as VisualStatus) ?? "all";

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-3">
                <Users className="w-7 h-7 text-primary" />
                <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Clientes</h1>
              </div>
              <button
                onClick={() => setInviteOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Novo Cliente
              </button>
            </div>
            <p className="text-muted-foreground font-light">
              Gerencie todos os centros esportivos cadastrados na plataforma.
            </p>
          </motion.div>

          {/* Erro */}
          {isError && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              Erro ao carregar clientes. Verifique sua conexão e tente novamente.
            </div>
          )}

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex flex-col sm:flex-row gap-3 mb-4"
          >
            {/* Tabs de status */}
            <div className="flex gap-1 p-1 bg-muted/50 rounded-xl border border-border/60 overflow-x-auto">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    activeFilter === tab.value
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Busca */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                placeholder="Buscar por nome, CNPJ ou cidade..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="h-10 pl-10 pr-4 rounded-xl bg-card border border-border/60 text-sm w-full focus:outline-none focus:border-primary/40 transition-colors"
              />
            </div>
          </motion.div>

          {/* Filtro de plano */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="flex gap-2 mb-6"
          >
            {([undefined, "starter", "professional", "enterprise"] as const).map((plan) => (
              <button
                key={plan ?? "all"}
                onClick={() => setPlanFilter(plan)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  planParam === plan
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-card text-muted-foreground border-border/60 hover:text-foreground"
                }`}
              >
                {plan ? PLAN_LABEL[plan] : "Todos os planos"}
              </button>
            ))}
          </motion.div>

          {/* Tabela */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden"
          >
            {/* Header */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_80px_60px] gap-4 px-5 py-3 border-b border-border/60 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <span>Centro Esportivo</span>
              <span>Plano</span>
              <span>Cidade</span>
              <span>Status</span>
              <span>Quadras</span>
              <span></span>
            </div>

            <div className="divide-y divide-border/40">

              {/* Skeleton */}
              {isLoading && [...Array(6)].map((_, i) => (
                <div key={i} className="px-5 py-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_80px_60px] md:gap-4 md:items-center animate-pulse">
                  <div className="space-y-1.5">
                    <div className="h-3.5 w-40 bg-muted/60 rounded" />
                    <div className="h-3 w-56 bg-muted/40 rounded" />
                  </div>
                  <div className="h-3.5 w-20 bg-muted/40 rounded" />
                  <div className="h-3.5 w-24 bg-muted/40 rounded" />
                  <div className="h-6 w-20 bg-muted/40 rounded-lg" />
                  <div className="h-3.5 w-8 bg-muted/40 rounded" />
                  <div className="h-8 w-8 bg-muted/30 rounded-lg" />
                </div>
              ))}

              {/* Dados reais */}
              {!isLoading && tenants.map((tenant) => (
                <div
                  key={tenant.id}
                  className="px-5 py-4 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_80px_60px] md:gap-4 md:items-center flex flex-col gap-2 hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <div className="font-semibold text-foreground text-sm">{tenant.company_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatCnpj(tenant.cnpj)} · {tenant.segment}
                    </div>
                  </div>
                  <div className="text-sm text-foreground">{PLAN_LABEL[tenant.plan] || "não definido"}</div>
                  <div className="text-sm text-muted-foreground">{tenant.city}</div>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg w-fit ${statusBadge(tenant.status)}`}>
                    {statusIcon(tenant.status)}
                    {STATUS_LABEL[tenant.status]}
                  </span>
                  <div className="text-sm text-foreground">{tenant.courts_count}</div>
                  <button
                    onClick={() => setSelectedId(tenant.id)}
                    className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
                    title="Ver detalhes"
                  >
                    <Eye className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              ))}

              {/* Empty state */}
              {!isLoading && tenants.length === 0 && (
                <div className="px-6 py-12 text-center text-muted-foreground text-sm">
                  Nenhum cliente encontrado.
                </div>
              )}
            </div>
          </motion.div>

          {/* Meta */}
          {data?.meta && (
            <p className="text-xs text-muted-foreground mt-3 text-right">
              {total} cliente{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </main>
      {/* ── Modal de Convite ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {inviteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={closeInviteModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-sm bg-card rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-lg font-bold text-foreground">Novo Cliente</h2>
                </div>
                <button
                  onClick={closeInviteModal}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {inviteSuccess ? (
                  <div className="flex flex-col items-center gap-3 py-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-accent/15 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-accent" />
                    </div>
                    <p className="text-sm font-medium text-foreground">Convite enviado com sucesso!</p>
                    <p className="text-xs text-muted-foreground">O cliente receberá um e-mail para criar sua conta.</p>
                    <button
                      onClick={closeInviteModal}
                      className="mt-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      Fechar
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleInviteSubmit} className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Informe o e-mail do responsável para enviar o convite de cadastro.
                    </p>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground uppercase tracking-wide">
                        Nome
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          required
                          placeholder="João Silva"
                          value={inviteName}
                          onChange={(e) => setInviteName(e.target.value)}
                          className="h-10 w-full pl-10 pr-4 rounded-xl bg-muted/40 border border-border/60 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground uppercase tracking-wide">
                        E-mail
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="email"
                          required
                          placeholder="contato@empresa.com.br"
                          value={inviteEmail}
                          onChange={(e) => setInviteEmail(e.target.value)}
                          className="h-10 w-full pl-10 pr-4 rounded-xl bg-muted/40 border border-border/60 text-sm focus:outline-none focus:border-primary/40 transition-colors"
                        />
                      </div>
                    </div>

                    {inviteError && (
                      <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
                        <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                        {inviteError}
                      </div>
                    )}

                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={closeInviteModal}
                        className="flex-1 h-10 rounded-xl border border-border/60 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        disabled={inviteLoading || !inviteEmail || !inviteName}
                        className="flex-1 h-10 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                      >
                        {inviteLoading ? (
                          <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                          <Send className="w-3.5 h-3.5" />
                        )}
                        Enviar Convite
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Modal de Detalhes ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedId !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
              onClick={() => setSelectedId(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-lg bg-card rounded-2xl border border-border/60 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
                <h2 className="font-display text-lg font-bold text-foreground">
                  {loadingDetail ? "Carregando..." : detail?.data?.company_name}
                </h2>
                <button
                  onClick={() => setSelectedId(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              {loadingDetail ? (
                <div className="p-6 space-y-4 animate-pulse">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-4 bg-muted/60 rounded w-3/4" />
                  ))}
                </div>
              ) : detail?.data ? (
                <div className="p-6 overflow-y-auto max-h-[70vh]">
                  {/* Badge de status */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${statusBadge(detail.data.status)}`}>
                      {statusIcon(detail.data.status)}
                      {STATUS_LABEL[detail.data.status]}
                    </span>
                    <span className="text-xs text-muted-foreground px-2.5 py-1 rounded-lg bg-muted/50">
                      {PLAN_LABEL[detail.data.plan] || "Não definido"}
                    </span>
                  </div>

                  {/* Dados do tenant */}
                  <div className="space-y-3 mb-6">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      Dados do Centro
                    </h3>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                        <Building2 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">CNPJ</p>
                          <p className="text-sm font-medium text-foreground">{formatCnpj(detail.data.cnpj)}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                        <Layers className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Segmento</p>
                          <p className="text-sm font-medium text-foreground">{detail.data.segment}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Cidade</p>
                          <p className="text-sm font-medium text-foreground">{detail.data.city}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                        <CreditCard className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Quadras</p>
                          <p className="text-sm font-medium text-foreground">{detail.data.courts_count}</p>
                        </div>
                      </div>

                      {detail.data.phone && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                          <Phone className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Telefone</p>
                            <p className="text-sm font-medium text-foreground">{detail.data.phone}</p>
                          </div>
                        </div>
                      )}

                      {detail.data.trial_ends_at && (
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted/30">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Trial até</p>
                            <p className="text-sm font-medium text-foreground">
                              {new Date(detail.data.trial_ends_at).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Admin do tenant */}
                  {detail.data.admin_user && (
                    <div className="mb-6">
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Administrador
                      </h3>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                          {detail.data.admin_user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <p className="text-sm font-medium text-foreground truncate">{detail.data.admin_user.name}</p>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                            <p className="text-xs text-muted-foreground truncate">{detail.data.admin_user.email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {detail.data.features && detail.data.features.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Funcionalidades
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {detail.data.features.map((f) => (
                          <div
                            key={f.feature_name}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
                              f.enabled
                                ? "bg-accent/10 text-accent"
                                : "bg-muted/40 text-muted-foreground"
                            }`}
                          >
                            <Zap className="w-3 h-3 shrink-0" />
                            <span className="truncate">{f.feature_name.replace(/_/g, " ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Clientes;