import { UserPlus, Settings, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Cadastre seu Centro",
    description: "Crie sua conta, adicione suas quadras, modalidades e configure os horários de funcionamento.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure Tudo",
    description: "Defina planos, preços, regras de cancelamento e personalize a experiência dos seus alunos.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Comece a Operar",
    description: "Seus alunos já podem reservar online, pagar e receber lembretes. Você acompanha tudo no painel.",
  },
];

const FitHowItWorksSection = () => {
  return (
    <section className="py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full bg-primary/5 blur-[60px] animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Como funciona
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-hero-foreground mt-4 mb-5 tracking-tight">
            Comece em <span className="text-gradient">3 passos</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="text-center"
            >
              <div className="w-20 h-20 rounded-3xl glass flex items-center justify-center mx-auto mb-6 relative">
                <item.icon className="w-8 h-8 text-primary" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {item.step}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-hero-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-hero-foreground/50 text-sm leading-relaxed max-w-xs mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitHowItWorksSection;
