import { useState } from "react";
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

interface Plano {
  id: number;
  name: string;
  price: number;
  description: string;
  trialDays: number;
  active: boolean;
}

const initialPlanos: Plano[] = [
  { id: 1, name: "Teste Grátis", price: 0, description: "Ideal para conhecer a plataforma", trialDays: 14, active: true },
  { id: 2, name: "Starter", price: 149, description: "Para centros esportivos pequenos", trialDays: 7, active: true },
  { id: 3, name: "Profissional", price: 249, description: "Para centros esportivos em crescimento", trialDays: 7, active: true },
  { id: 4, name: "Enterprise", price: 499, description: "Para grandes operações com múltiplas unidades", trialDays: 15, active: true },
];

const formatCurrency = (value: number) =>
  value === 0 ? "Grátis" : `R$ ${value.toLocaleString("pt-BR")}/mês`;

const Planos = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [planos, setPlanos] = useState<Plano[]>(initialPlanos);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPlano, setEditingPlano] = useState<Plano | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Plano | null>(null);
  const { toast } = useToast();

  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formTrialDays, setFormTrialDays] = useState("");
  const [formActive, setFormActive] = useState(true);

  const filtered = planos.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditingPlano(null);
    setFormName("");
    setFormPrice("");
    setFormDescription("");
    setFormTrialDays("");
    setFormActive(true);
    setDialogOpen(true);
  };

  const openEdit = (plano: Plano) => {
    setEditingPlano(plano);
    setFormName(plano.name);
    setFormPrice(String(plano.price));
    setFormDescription(plano.description);
    setFormTrialDays(String(plano.trialDays));
    setFormActive(plano.active);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim() || formPrice === "") {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }

    if (editingPlano) {
      setPlanos((prev) =>
        prev.map((p) =>
          p.id === editingPlano.id
            ? { ...p, name: formName, price: Number(formPrice), description: formDescription, trialDays: Number(formTrialDays) || 0, active: formActive }
            : p
        )
      );
      toast({ title: "Plano atualizado com sucesso" });
    } else {
      const newId = Math.max(...planos.map((p) => p.id), 0) + 1;
      setPlanos((prev) => [
        ...prev,
        { id: newId, name: formName, price: Number(formPrice), description: formDescription, trialDays: Number(formTrialDays) || 0, active: formActive },
      ]);
      toast({ title: "Plano criado com sucesso" });
    }
    setDialogOpen(false);
  };

  const handleDelete = () => {
    if (!deleteConfirm) return;
    setPlanos((prev) => prev.filter((p) => p.id !== deleteConfirm.id));
    toast({ title: "Plano removido" });
    setDeleteConfirm(null);
  };

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

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Buscar plano..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 rounded-xl" />
            </div>
            <Button variant="default" size="sm" className="rounded-xl gap-2" onClick={openNew}>
              <Plus className="w-4 h-4" /> Novo Plano
            </Button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-2xl bg-card border border-border/60 overflow-hidden">
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
                {filtered.map((plano) => (
                  <TableRow key={plano.id}>
                    <TableCell className="font-semibold text-foreground">{plano.name}</TableCell>
                    <TableCell className="font-medium text-foreground">{formatCurrency(plano.price)}</TableCell>
                    <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">{plano.description}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{plano.trialDays} dias</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg ${plano.active ? "bg-accent/15 text-accent" : "bg-destructive/15 text-destructive"}`}>
                        {plano.active ? "Ativo" : "Inativo"}
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
                          <DropdownMenuItem onClick={() => setDeleteConfirm(plano)} className="text-destructive focus:text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" /> Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      Nenhum plano encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </motion.div>
        </div>
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingPlano ? "Editar Plano" : "Novo Plano"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="planName">Nome</Label>
              <Input id="planName" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Ex: Starter" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="planPrice">Preço (R$/mês)</Label>
                <Input id="planPrice" type="number" min="0" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planTrialDays">Dias de Teste</Label>
                <Input id="planTrialDays" type="number" min="0" value={formTrialDays} onChange={(e) => setFormTrialDays(e.target.value)} placeholder="7" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="planDesc">Descrição</Label>
              <Textarea id="planDesc" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Breve descrição do plano" rows={2} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="planActive">Ativo</Label>
              <Switch id="planActive" checked={formActive} onCheckedChange={setFormActive} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-xl">Cancelar</Button>
            </DialogClose>
            <Button className="rounded-xl" onClick={handleSave}>
              {editingPlano ? "Salvar" : "Criar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteConfirm} onOpenChange={(open) => !open && setDeleteConfirm(null)}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Excluir plano</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Tem certeza que deseja excluir o plano <strong>{deleteConfirm?.name}</strong>? Esta ação não pode ser desfeita.
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

export default Planos;
