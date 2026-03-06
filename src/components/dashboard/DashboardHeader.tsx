import { Bell, Menu } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

const DashboardHeader = ({ onMenuClick }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border/60 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-foreground" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-10 h-10 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center hover:bg-muted transition-colors">
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-destructive" />
        </button>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
          CS
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
