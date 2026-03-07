import { Calendar, LayoutGrid, Users, CreditCard, Eye, Bell } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Calendar,
    title: "Agendamento Online",
    description: "Reservas recorrentes por quadra e treinador. Sistema inteligente que evita conflitos, disponível 24/7.",
  },
  {
    icon: LayoutGrid,
    title: "Controle de Quadras",
    description: "Visão panorâmica da ocupação. Gerencie bloqueios para manutenção, aulas ou eventos com poucos cliques.",
  },
  {
    icon: Users,
    title: "Gestão de Alunos",
    description: "Controle completo de turmas, histórico de presença, níveis de habilidade e evolução dos alunos.",
  },
  {
    icon: CreditCard,
    title: "Financeiro Integrado",
    description: "Gestão de planos, mensalidades recorrentes e cobranças avulsas. Relatórios de receita por período.",
  },
  {
    icon: Eye,
    title: "Calendário Unificado",
    description: "Dashboard visual com ocupação em tempo real. Identifique horários vagos e maximize a receita.",
  },
  {
    icon: Bell,
    title: "Confirmações e Lembretes",
    description: "Reduza o no-show com lembretes automáticos por e-mail e notificações no app para agendamentos.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-32 bg-background relative overflow-hidden">
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
            Funcionalidades
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Tudo em um só lugar
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Da reserva de quadras ao controle financeiro — gerencie todo o seu centro esportivo numa única plataforma.
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
