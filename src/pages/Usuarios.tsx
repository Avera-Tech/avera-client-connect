import { useState } from "react";
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

interface Usuario {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const initialUsuarios: Usuario[] = [
  { id: 1, name: "Carlos Silva", email: "carlos@avera.com.br", password: "123456", active: true, createdAt: "10/01/2026", updatedAt: "05/04/2026" },
  { id: 2, name: "Fernanda Oliveira", email: "fernanda@avera.com.br", password: "123456", active: true, createdAt: "15/01/2026", updatedAt: "02/04/2026" },
  { id: 3, name: "Rafael Santos", email: "rafael@avera.com.br", password: "123456", active: true, createdAt: "20/02/2026", updatedAt: "01/04/2026" },
  { id: 4, name: "Ana Costa", email: "ana@avera.com.br", password: "123456", active: false, createdAt: "05/03/2026", updatedAt: "20/03/2026" },
  { id: 5, name: "Lucas Mendes", email: "lucas@avera.com.br", password: "123456", active: true, createdAt: "12/03/2026", updatedAt: "10/04/2026" },
];

const today = () => {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
};

const Usuarios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [usuarios, setUsuarios] = useState<Usuario[]>(initialUsuarios);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Usuario | null>(null);
  const { toast } = useToast();

  // form state
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const filtered = usuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingUser(null);
    setFormName("");
    setFormEmail("");
    setFormPassword("");
    setFormActive(true);
    setShowPassword(false);
    setDialogOpen(true);
  };

  const openEdit = (user: Usuario) => {
    setEditingUser(user);
    setFormName(user.name);
    setFormEmail(user.email);
    setFormPassword(user.password);
    setFormActive(user.active);
    setShowPassword(false);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formEmail.trim() || !formPassword.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    if (editingUser) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: formName, email: formEmail, password: formPassword, active: formActive, updatedAt: today() }
            : u
        )
      );
      toast({ title: "Usuário atualizado com sucesso" });
    } else {
      const newId = Math.max(...usuarios.map((u) => u.id), 0) + 1;
      setUsuarios((prev) => [
        ...prev,
        { id: newId, name: formName, email: formEmail, password: formPassword, active: formActive, createdAt: today(), updatedAt: today() },
      ]);
      toast({ title: "Usuário criado com sucesso" });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteConfirm) return;
    setUsuarios((prev) => prev.filter((u) => u.id !== deleteConfirm.id));
    toast({ title: "Usuário removido" });
    setDeleteConfirm(null);
  };

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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 rounded-xl"
              />
            </div>
            <Button variant="default" size="sm" className="rounded-xl gap-2" onClick={openNew}>
              <UserPlus className="w-4 h-4" /> Novo Usuário
            </Button>
          </motion.div>

          {/* Table */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-card border border-border/60 overflow-hidden">
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
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-semibold text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg ${user.active ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}>
                        {user.active ? "Ativo" : "Inativo"}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">{user.createdAt}</TableCell>
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
                          <DropdownMenuItem onClick={() => setDeleteConfirm(user)} className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </main>

      {/* Create / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Editar Usuário" : "Novo Usuário"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Nome completo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} placeholder="email@avera.com.br" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="••••••"
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
              <Button variant="outline" className="rounded-xl">Cancelar</Button>
            </DialogClose>
            <Button className="rounded-xl" onClick={handleSave}>
              {editingUser ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir usuário</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir <strong>{deleteConfirm?.name}</strong>? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <Button variant="outline" className="rounded-xl" onClick={() => setDeleteConfirm(null)}>Cancelar</Button>
            <Button variant="destructive" className="rounded-xl" onClick={handleDelete}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Usuarios;
