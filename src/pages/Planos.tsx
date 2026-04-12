import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Plus, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useToast } from "@/hooks/use-toast";
import { Plan } from "@/services/plansService";
import { useAdminPlans, useCreatePlan, useDeletePlan, useUpdatePlan } from "@/hooks/useAdminPlans.ts";


// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatCurrency = (value: number) =>
  value === 0 ? "Grátis" : `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}/mês`;

// ─── Validação ────────────────────────────────────────────────────────────────

const validate = (name: string, price: string): string | null => {
  if (!name.trim())    return "Nome é obrigatório.";
  if (price === "")    return "Preço é obrigatório.";
  if (isNaN(Number(price)) || Number(price) < 0) return "Preço inválido.";
  return null;
};

// ─── Componente ───────────────────────────────────────────────────────────────

const Planos = () => {
  const [sidebarOpen, setSidebarOpen]         = useState(false);
  const [search, setSearch]                   = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialogOpen, setDialogOpen]           = useState(false);
  const [editingPlano, setEditingPlano]       = useState<Plan | null>(null);
  const [deleteConfirm, setDeleteConfirm]     = useState<Plan | null>(null);
  const { toast } = useToast();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form state
  const [formName, setFormName]               = useState("");
  const [formPrice, setFormPrice]             = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formTrialDays, setFormTrialDays]     = useState("");
  const [formActive, setFormActive]           = useState(true);

  // ── Debounce da busca ──────────────────────────────────────────────────────
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedSearch(value), 400);
  }, []);

  // ── Queries & Mutations ────────────────────────────────────────────────────
  const { data, isLoading, isError } = useAdminPlans({
    search: debouncedSearch || undefined,
    limit: 20,
  });

  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();
  const deleteMutation = useDeletePlan();

  const planos = data?.data ?? [];

  // ── Abrir modal de criação ─────────────────────────────────────────────────
  const openNew = () => {
    setEditingPlano(null);
    setFormName("");
    setFormPrice("");
    setFormDescription("");
    setFormTrialDays("");
    setFormActive(true);
    setDialogOpen(true);
  };

  // ── Abrir modal de edição ──────────────────────────────────────────────────
  const openEdit = (plano: Plan) => {
    setEditingPlano(plano);
    setFormName(plano.name);
    setFormPrice(String(plano.price));
    setFormDescription(plano.description ?? "");
    setFormTrialDays(String(plano.trial_days));
    setFormActive(plano.status === 'active');
    setDialogOpen(true);
  };

  // ── Salvar (criar ou editar) ───────────────────────────────────────────────
  const handleSave = () => {
    const error = validate(formName, formPrice);
    if (error) {
      toast({ title: error, variant: "destructive" });
      return;
    }

    if (editingPlano) {
      const payload: Record<string, unknown> = {};
      if (formName.trim()              !== editingPlano.name)        payload.name        = formName.trim();
      if (Number(formPrice)            !== Number(editingPlano.price)) payload.price      = Number(formPrice);
      if (Number(formTrialDays) || 0   !== editingPlano.trial_days)  payload.trial_days  = Number(formTrialDays) || 0;
      if ((formDescription.trim() || null) !== editingPlano.description) payload.description = formDescription.trim() || null;
      const newStatus = formActive ? 'active' : 'inactive';
      if (newStatus !== editingPlano.status) payload.status = newStatus;

      if (Object.keys(payload).length === 0) {
        setDialogOpen(false);
        return;
      }

      updateMutation.mutate(
        { id: editingPlano.id, payload },
        {
          onSuccess: () => setDialogOpen(false),
          onError: (err: Error) => toast({ title: err.message, variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(
        {
          name:        formName.trim(),
          price:       Number(formPrice),
          trial_days:  Number(formTrialDays) || 0,
          description: formDescription.trim() || undefined,
          status:      formActive ? 'active' : 'inactive',
        },
        {
          onSuccess: () => setDialogOpen(false),
          onError: (err: Error) => toast({ title: err.message, variant: "destructive" }),
        }
      );
    }
  };

  // ── Confirmar exclusão ─────────────────────────────────────────────────────
  const handleDelete = () => {
    if (!deleteConfirm) return;
    deleteMutation.mutate(deleteConfirm.id, {
      onSuccess: () => setDeleteConfirm(null),
      onError: (err: Error) => {
        toast({ title: err.message, variant: "destructive" });
        setDeleteConfirm(null);
      },
    });
  };

  const isMutating = createMutation.isPending || updateMutation.isPending;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main className="flex-1 lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-6 lg:p-8 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Planos</h1>
            <p className="text-muted-foreground font-light mt-1">Gerencie os planos disponíveis na plataforma.</p>
          </motion.div>

          {/* Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6"
          >
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar plano..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Button variant="default" size="sm" className="rounded-xl gap-2" onClick={openNew}>
              <Plus className="w-4 h-4" /> Novo Plano
            </Button>
          </motion.div>

          {/* Erro de carregamento */}
          {isError && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              Erro ao carregar planos. Verifique sua conexão e tente novamente.
            </div>
          )}

          {/* Tabela */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl bg-card border border-border/60 overflow-hidden"
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço/mês</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Dias de Teste</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {/* Skeleton de loading */}
                {isLoading && [...Array(4)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-24 bg-muted/60 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-muted/40 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-40 bg-muted/40 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-14 bg-muted/40 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-6 w-14 bg-muted/40 rounded-lg animate-pulse" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))}

                {/* Dados reais */}
                {!isLoading && planos.map((plano) => (
                  <TableRow key={plano.id}>
                    <TableCell className="font-semibold text-foreground">{plano.name}</TableCell>
                    <TableCell className="font-medium text-foreground">{formatCurrency(plano.price)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                      {plano.description ?? "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{plano.trial_days} dias</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg ${
                        plano.status === 'active'
                          ? "bg-accent/15 text-accent"
                          : "bg-destructive/15 text-destructive"
                      }`}>
                        {plano.status === 'active' ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(plano)}>
                            <Pencil className="w-4 h-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(plano)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Empty state */}
                {!isLoading && planos.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum plano encontrado.
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </motion.div>

          {/* Meta */}
          {data?.meta && (
            <p className="text-xs text-muted-foreground mt-3 text-right">
              {data.meta.total} plano{data.meta.total !== 1 ? "s" : ""} encontrado{data.meta.total !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </main>

      {/* ── Modal Criar / Editar ───────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setDialogOpen(false); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPlano ? "Editar Plano" : "Novo Plano"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="planName">Nome</Label>
              <Input
                id="planName"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Starter"
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planPrice">Preço (R$/mês)</Label>
                <Input
                  id="planPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planTrialDays">Dias de Teste</Label>
                <Input
                  id="planTrialDays"
                  type="number"
                  min="0"
                  value={formTrialDays}
                  onChange={(e) => setFormTrialDays(e.target.value)}
                  placeholder="7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="planDesc">Descrição</Label>
              <Textarea
                id="planDesc"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Breve descrição do plano"
                rows={2}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="planActive">Ativo</Label>
              <Switch id="planActive" checked={formActive} onCheckedChange={setFormActive} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl" disabled={isMutating}>
                Cancelar
              </Button>
            </DialogClose>
            <Button className="rounded-xl" onClick={handleSave} disabled={isMutating}>
              {isMutating ? "Salvando..." : editingPlano ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal de Confirmação de Delete ────────────────────────────────── */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir plano</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o plano{" "}
            <strong className="text-foreground">{deleteConfirm?.name}</strong>?{" "}
            Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setDeleteConfirm(null)}
              disabled={deleteMutation.isPending}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planos;