import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoImg from "@/assets/avera-logo.png";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#features" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-hero/80 backdrop-blur-xl border-b border-primary/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logoImg} alt="Avera" className="h-8 w-8" />
          <span className="font-display text-xl font-bold text-hero-foreground">Avera</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-hero-foreground/70 hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm">
            Área do Cliente
          </Button>
        </div>

        <button
          className="md:hidden text-hero-foreground"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-hero/95 backdrop-blur-xl border-t border-primary/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-hero-foreground/70 hover:text-primary transition-colors font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="sm" className="mt-2 w-full">
            Área do Cliente
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
