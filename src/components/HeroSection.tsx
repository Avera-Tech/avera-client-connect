import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const highlights = [
  { icon: Calendar, label: "Agendamento Online" },
  { icon: Users, label: "Gestão de Alunos" },
  { icon: BarChart3, label: "Controle Financeiro" },
];

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-cover bg-center scale-110" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="absolute inset-0 hero-gradient opacity-90" />
      <div className="absolute inset-0 mesh-gradient" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-[15%] w-72 h-72 rounded-full bg-primary/10 blur-[100px] animate-float" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-accent/8 blur-[120px] animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-glow/5 blur-[150px] animate-pulse-glow" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--hero-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--hero-foreground)) 1px, transparent 1px)",
        backgroundSize: "80px 80px"
      }} />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-primary font-medium tracking-wide">Plataforma de Gestão Esportiva</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-hero-foreground mb-8 leading-[0.95] tracking-tight"
          >
            Gestão do seu
            <br />
            <span className="text-gradient">Centro Esportivo</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-hero-foreground/50 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Aumente a ocupação, reduza o no-show e tenha controle total de alunos e financeiro em um só lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button variant="hero" size="lg" className="text-base px-8 rounded-full h-14">
              Agendar Demonstração
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="lg" className="text-base px-8 rounded-full h-14">
              Conhecer Funcionalidades
            </Button>
          </motion.div>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full glass text-hero-foreground/70 text-sm font-medium"
              >
                <item.icon className="w-4 h-4 text-primary" />
                {item.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute left-1/2 -translate-x-1/2"
          style={{bottom: "-80px"}}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-hero-foreground/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
