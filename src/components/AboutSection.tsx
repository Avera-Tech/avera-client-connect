import { CheckCircle } from "lucide-react";

const highlights = [
  "Mais de 10 anos de experiência no mercado",
  "Equipe multidisciplinar de especialistas",
  "Metodologias ágeis e entregas contínuas",
  "Suporte dedicado e acompanhamento pós-entrega",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Sobre nós</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Inovação com{" "}
              <span className="text-gradient">propósito</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              A Avera nasceu com a missão de democratizar o acesso à tecnologia de ponta. 
              Acreditamos que toda empresa, independente do tamanho, merece soluções digitais 
              que realmente fazem diferença nos resultados.
            </p>
            <div className="space-y-4">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "200+", label: "Projetos entregues" },
                { number: "50+", label: "Clientes ativos" },
                { number: "99.9%", label: "Uptime garantido" },
                { number: "24/7", label: "Suporte técnico" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-2xl bg-card border border-border text-center glow-border"
                >
                  <div className="font-display text-3xl font-bold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
