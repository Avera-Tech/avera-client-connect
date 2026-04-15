import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EmailTemplatePreview from "@/components/EmailTemplatePreview";

const EmailTemplate = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <DashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col lg:ml-72">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground">Template de E-mail</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Preview do e-mail de convite enviado para novos usuários
            </p>
          </div>
          <EmailTemplatePreview />
        </main>
      </div>
    </div>
  );
};

export default EmailTemplate;
