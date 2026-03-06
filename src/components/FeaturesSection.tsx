import { Cloud, Code, Shield, BarChart3, Cpu, Globe } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: Code, title: "Desenvolvimento Sob Medida", description: "Software personalizado para as necessidades específicas do seu negócio." },
  { icon: Cloud, title: "Soluções em Nuvem", description: "Infraestrutura escalável e segura hospedada na nuvem." },
  { icon: Shield, title: "Segurança Avançada", description: "Proteção de dados com as melhores práticas do mercado." },
  { icon: BarChart3, title: "Business Intelligence", description: "Dashboards e relatórios para decisões baseadas em dados." },
  { icon: Cpu, title: "Automação de Processos", description: "Automatize tarefas repetitivas e aumente a produtividade." },
  { icon: Globe, title: "Integração de Sistemas", description: "Conecte diferentes plataformas em um ecossistema unificado." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden">
      {/* Subtle mesh */}
      <div className="absolute inset-0 mesh-gradient opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Soluções
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            O que fazemos de melhor
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Combinamos tecnologia de ponta com expertise de negócios para entregar resultados reais.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-3xl bg-card border border-border/60 hover:border-primary/25 transition-all duration-500 hover:glow-border cursor-default"
            >
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-card-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[15px]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
