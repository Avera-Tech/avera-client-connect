import { Cloud, Code, Shield, BarChart3, Cpu, Globe } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Desenvolvimento Sob Medida",
    description: "Software personalizado para as necessidades específicas do seu negócio.",
  },
  {
    icon: Cloud,
    title: "Soluções em Nuvem",
    description: "Infraestrutura escalável e segura hospedada na nuvem.",
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção de dados com as melhores práticas do mercado.",
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Dashboards e relatórios para decisões baseadas em dados.",
  },
  {
    icon: Cpu,
    title: "Automação de Processos",
    description: "Automatize tarefas repetitivas e aumente a produtividade.",
  },
  {
    icon: Globe,
    title: "Integração de Sistemas",
    description: "Conecte diferentes plataformas em um ecossistema unificado.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Soluções</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            O que fazemos de melhor
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Combinamos tecnologia de ponta com expertise de negócios para entregar resultados reais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-8 rounded-2xl border border-border bg-card hover:glow-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
