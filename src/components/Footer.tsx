import logoImg from "@/assets/avera-logo.png";

const Footer = () => {
  return (
    <footer className="hero-gradient py-16 border-t border-primary/10 relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="Avera" className="h-10" />
          </div>
          <div className="flex items-center gap-8">
            {[
              { label: "Início", href: "#hero" },
              { label: "Soluções", href: "#features" },
              { label: "Sobre", href: "#about" },
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
            © {new Date().getFullYear()} Avera
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
