import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UserPlus, MoreHorizontal, Shield, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell,
} from "@/components/ui/table";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

interface Usuario {
  id: number;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

const mockUsuarios: Usuario[] = [
  { id: 1, name: "Carlos Silva", email: "carlos@avera.com.br", active: true, createdAt: "10/01/2026", updatedAt: "05/04/2026" },
  { id: 2, name: "Fernanda Oliveira", email: "fernanda@avera.com.br", active: true, createdAt: "15/01/2026", updatedAt: "02/04/2026" },
  { id: 3, name: "Rafael Santos", email: "rafael@avera.com.br", active: true, createdAt: "20/02/2026", updatedAt: "01/04/2026" },
  { id: 4, name: "Ana Costa", email: "ana@avera.com.br", active: false, createdAt: "05/03/2026", updatedAt: "20/03/2026" },
  { id: 5, name: "Lucas Mendes", email: "lucas@avera.com.br", active: true, createdAt: "12/03/2026", updatedAt: "10/04/2026" },
];

const Usuarios = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = mockUsuarios.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

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
            <Button variant="default" size="sm" className="rounded-xl gap-2">
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
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
    </div>
  );
};

export default Usuarios;
