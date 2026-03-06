import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/avera-logo.png";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "Soluções", href: "#features" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-hero/90 backdrop-blur-2xl border-b border-primary/10 shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-20 px-6">
        <a href="#hero" className="flex items-center gap-3 group">
          <img src={logoImg} alt="Avera" className="h-9 transition-transform group-hover:scale-110" />
        </a>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-5 py-2 text-sm text-hero-foreground/60 hover:text-hero-foreground transition-colors font-medium rounded-full hover:bg-hero-foreground/5"
            >
              {link.label}
            </a>
          ))}
          <div className="ml-4">
            <Button variant="hero" size="sm" className="rounded-full px-6">
              Área do Cliente
            </Button>
          </div>
        </div>

        <button
          className="md:hidden text-hero-foreground p-2 rounded-xl hover:bg-hero-foreground/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-hero/95 backdrop-blur-2xl border-t border-primary/10"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3 px-4 text-hero-foreground/70 hover:text-hero-foreground transition-colors font-medium rounded-xl hover:bg-hero-foreground/5"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <Button variant="hero" size="sm" className="mt-3 w-full rounded-full">
                Área do Cliente
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
