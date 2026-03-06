import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 hero-gradient opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-hero via-transparent to-transparent" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-8">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">Tecnologia que transforma</span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-hero-foreground mb-6 leading-tight">
          Soluções digitais que{" "}
          <span className="text-gradient">impulsionam</span>{" "}
          seu negócio
        </h1>

        <p className="text-lg md:text-xl text-hero-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          A Avera desenvolve software sob medida e soluções SaaS que aceleram a transformação digital da sua empresa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="text-base px-8">
            Fale Conosco
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base px-8">
            Conheça nossas soluções
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
