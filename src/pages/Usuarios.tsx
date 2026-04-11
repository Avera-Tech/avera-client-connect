import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, MoreHorizontal, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import {
  useAdminUsers,
  useCreateAdminUser,
  useUpdateAdminUser,
  useDeleteAdminUser,
} from "@/hooks/useAdminUsers";
import type { AdminUser } from "@/services/adminApi";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  } catch {
    return iso;
  }
};

// ─── Validação ────────────────────────────────────────────────────────────────

const validate = (
  name: string,
  email: string,
  password: string,
  isEditing: boolean
): string | null => {
  if (!name.trim())  return "Nome é obrigatório.";
  if (!email.trim()) return "E-mail é obrigatório.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "E-mail inválido.";
  if (!isEditing && !password) return "Senha é obrigatória.";
  if (password && password.length < 8) return "A senha deve ter no mínimo 8 caracteres.";
  return null;
};

// ─── Componente ───────────────────────────────────────────────────────────────

const Usuarios = () => {
  const [sidebarOpen, setSidebarOpen]         = useState(false);
  const [search, setSearch]                   = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dialogOpen, setDialogOpen]           = useState(false);
  const [editingUser, setEditingUser]         = useState<AdminUser | null>(null);
  const [deleteConfirm, setDeleteConfirm]     = useState<AdminUser | null>(null);
  const { toast } = useToast();

  // Form state
  const [formName, setFormName]         = useState("");
  const [formEmail, setFormEmail]       = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formActive, setFormActive]     = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Debounce da busca ──────────────────────────────────────────────────────
  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => setDebouncedSearch(value), 400);
  }, []);

  // ── Queries & Mutations ────────────────────────────────────────────────────
  const { data, isLoading, isError } = useAdminUsers({
    search: debouncedSearch || undefined,
    limit: 20,
  });

  const createMutation = useCreateAdminUser();
  const updateMutation = useUpdateAdminUser();
  const deleteMutation = useDeleteAdminUser();

  const usuarios = data?.data ?? [];

  // ── Abrir modal de criação ─────────────────────────────────────────────────
  const openNew = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormActive(true);
    setShowPassword(false);
    setDialogOpen(true);
  };

  // ── Abrir modal de edição ──────────────────────────────────────────────────
  const openEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword(""); // senha nunca é populada por segurança
    setFormActive(user.active);
    setShowPassword(false);
    setDialogOpen(true);
  };

  // ── Salvar (criar ou editar) ───────────────────────────────────────────────
  const handleSave = () => {
    const error = validate(formName, formEmail, formPassword, !!editingUser);
    if (error) {
      toast({ title: error, variant: "destructive" });
      return;
    }

    if (editingUser) {
      // Só envia os campos que mudaram
      const payload: Record<string, unknown> = {};
      if (formName.trim()  !== editingUser.name)   payload.name     = formName.trim();
      if (formEmail.trim() !== editingUser.email)  payload.email    = formEmail.trim();
      if (formActive       !== editingUser.active) payload.active   = formActive;
      if (formPassword)                            payload.password = formPassword;

      if (Object.keys(payload).length === 0) {
        setDialogOpen(false);
        return;
      }

      updateMutation.mutate(
        { id: editingUser.id, payload },
        {
          onSuccess: () => setDialogOpen(false),
          onError: (err: Error) => toast({ title: err.message, variant: "destructive" }),
        }
      );
    } else {
      createMutation.mutate(
        { name: formName.trim(), email: formEmail.trim(), password: formPassword },
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
            <h1 className="font-display text-3xl font-extrabold text-foreground tracking-tight">Usuários</h1>
            <p className="text-muted-foreground font-light mt-1">Gerencie os usuários internos da Avera.</p>
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
                placeholder="Buscar por nome ou email..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Button variant="default" size="sm" className="rounded-xl gap-2" onClick={openNew}>
              <UserPlus className="w-4 h-4" /> Novo Usuário
            </Button>
          </motion.div>

          {/* Erro de carregamento */}
          {isError && (
            <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              Erro ao carregar usuários. Verifique sua conexão e tente novamente.
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
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Criado em</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

                {/* Skeleton de loading */}
                {isLoading && [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><div className="h-4 w-32 bg-muted/60 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-44 bg-muted/40 rounded animate-pulse" /></TableCell>
                    <TableCell><div className="h-6 w-14 bg-muted/40 rounded-lg animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 w-20 bg-muted/40 rounded animate-pulse" /></TableCell>
                    <TableCell />
                  </TableRow>
                ))}

                {/* Dados reais */}
                {!isLoading && usuarios.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-semibold text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg ${
                        user.active
                          ? "bg-accent/15 text-accent"
                          : "bg-destructive/15 text-destructive"
                      }`}>
                        {user.active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="text-muted-foreground hover:text-foreground transition-colors">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openEdit(user)}>
                            <Pencil className="w-4 h-4 mr-2" /> Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => setDeleteConfirm(user)}
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
                {!isLoading && usuarios.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}

              </TableBody>
            </Table>
          </motion.div>

          {/* Meta */}
          {data?.meta && (
            <p className="text-xs text-muted-foreground mt-3 text-right">
              {data.meta.total} usuário{data.meta.total !== 1 ? "s" : ""} encontrado{data.meta.total !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </main>

      {/* ── Modal Criar / Editar ───────────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) setDialogOpen(false); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Nome completo"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="email@avera.com.br"
                autoComplete="off"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Senha{" "}
                {editingUser && (
                  <span className="text-muted-foreground font-normal text-xs">
                    (deixe em branco para não alterar)
                  </span>
                )}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder={editingUser ? "••••••••" : "Mínimo 8 caracteres"}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="active">Ativo</Label>
              <Switch id="active" checked={formActive} onCheckedChange={setFormActive} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl" disabled={isMutating}>
                Cancelar
              </Button>
            </DialogClose>
            <Button className="rounded-xl" onClick={handleSave} disabled={isMutating}>
              {isMutating ? "Salvando..." : editingUser ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Modal de Confirmação de Delete ────────────────────────────────── */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir usuário</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir{" "}
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

export default Usuarios;