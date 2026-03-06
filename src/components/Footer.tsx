import logoImg from "@/assets/avera-logo.png";

const Footer = () => {
  return (
    <footer className="hero-gradient py-12 border-t border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="Avera" className="h-8 w-8" />
            <span className="font-display text-xl font-bold text-hero-foreground">Avera</span>
          </div>
          <p className="text-hero-foreground/50 text-sm">
            © {new Date().getFullYear()} Avera. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
