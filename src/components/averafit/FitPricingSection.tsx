import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Teste Grátis",
    price: "R$ 0",
    period: "14 dias",
    description: "Experimente todas as funcionalidades sem compromisso",
    features: [
      "Até 3 quadras",
      "Agendamento online",
      "Gestão de alunos",
      "Dashboard básico",
    ],
    cta: "Começar Grátis",
    popular: false,
  },
  {
    name: "Starter",
    price: "R$ 197",
    period: "/mês",
    description: "Para centros esportivos em crescimento",
    features: [
      "Até 6 quadras",
      "Agendamento ilimitado",
      "Controle financeiro",
      "Lembretes automáticos",
      "Relatórios básicos",
    ],
    cta: "Assinar Starter",
    popular: false,
  },
  {
    name: "Profissional",
    price: "R$ 397",
    period: "/mês",
    description: "Gestão completa com funcionalidades avançadas",
    features: [
      "Quadras ilimitadas",
      "Tudo do Starter",
      "App para alunos",
      "Analytics avançado",
      "Multi-modalidades",
      "Suporte prioritário",
    ],
    cta: "Assinar Profissional",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Sob consulta",
    period: "",
    description: "Para redes e grandes centros esportivos",
    features: [
      "Tudo do Profissional",
      "Multi-unidades",
      "API personalizada",
      "Gerente de sucesso dedicado",
      "SLA garantido",
      "Integrações customizadas",
    ],
    cta: "Falar com Vendas",
    popular: false,
  },
];

const FitPricingSection = () => {
  const navigate = useNavigate();

  return (
    <section id="pricing" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Planos
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Escolha o plano ideal
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Comece grátis e escale conforme seu centro esportivo cresce.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-7 rounded-3xl bg-card border transition-all duration-500 hover:glow-border ${
                plan.popular ? "border-primary/40 glow-border" : "border-border/60"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  <Star className="w-3 h-3" /> Mais Popular
                </div>
              )}

              <h3 className="font-display text-lg font-bold text-card-foreground mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-display text-3xl font-extrabold text-foreground">{plan.price}</span>
                {plan.period && <span className="text-muted-foreground text-sm">{plan.period}</span>}
              </div>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-sm text-card-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full rounded-xl"
                onClick={() => navigate("/signup")}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitPricingSection;
