import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  CreditCard,
  Zap,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import logoImg from "@/assets/avera-logo.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", path: "/dashboard" },
  { icon: Users, label: "Clientes", path: "/dashboard/clientes" },
  { icon: UserCog, label: "Usuários", path: "/dashboard/usuarios" },
  { icon: CreditCard, label: "Cobranças", path: "/dashboard/cobrancas" },
  { icon: Zap, label: "Funcionalidades", path: "/dashboard/funcionalidades" },
  { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
];

interface SidebarContentProps {
  onClose?: () => void;
}

export const SidebarContent = ({ onClose }: SidebarContentProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
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
              onClick={() => {
                navigate(item.path);
                onClose?.();
              }}
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
};

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const DashboardSidebar = ({ sidebarOpen, setSidebarOpen }: DashboardSidebarProps) => {
  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex w-72 flex-col hero-gradient border-r border-primary/10 fixed inset-y-0 left-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-foreground/50" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 h-full hero-gradient border-r border-primary/10 flex flex-col">
            <div className="absolute top-6 right-4">
              <button onClick={() => setSidebarOpen(false)} className="text-hero-foreground/50">
                <X size={20} />
              </button>
            </div>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
};

export default DashboardSidebar;
