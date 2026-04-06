import logoImg from "@/assets/avera-logo-white.svg";

const FitFooter = () => {
  return (
    <footer className="hero-gradient py-16 border-t border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="AveraFit" className="h-10" />
            <span className="text-hero-foreground/40 text-sm font-display font-bold">Fit</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Início", href: "#hero" },
              { label: "Funcionalidades", href: "#features" },
              { label: "Planos", href: "#pricing" },
              { label: "Por que AveraFit", href: "#about" },
              { label: "Contato", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-hero-foreground/40 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-hero-foreground/30 text-sm">
            © {new Date().getFullYear()} AveraFit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FitFooter;
