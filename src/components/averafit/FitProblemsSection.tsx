import { AlertTriangle, Clock, DollarSign, UserX, CalendarX, BarChart } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: UserX,
    title: "No-Shows Constantes",
    description: "Alunos faltam sem aviso e você perde receita sem controle sobre cancelamentos de última hora.",
  },
  {
    icon: Clock,
    title: "Gestão Manual",
    description: "Planilhas, cadernos e WhatsApp para gerenciar quadras, horários e turmas. Retrabalho constante.",
  },
  {
    icon: DollarSign,
    title: "Inadimplência Sem Controle",
    description: "Cobranças manuais, pagamentos perdidos e falta de visibilidade sobre quem deve e quanto.",
  },
  {
    icon: CalendarX,
    title: "Quadras Ociosas",
    description: "Sem visão clara da ocupação, horários vagos passam despercebidos e você perde receita.",
  },
  {
    icon: AlertTriangle,
    title: "Sem Visão de Dados",
    description: "Sem relatórios, métricas de ocupação ou análise de performance por modalidade e período.",
  },
  {
    icon: BarChart,
    title: "Escala Travada",
    description: "Processos manuais impedem o crescimento. Mais quadras = mais caos sem automação.",
  },
];

const FitProblemsSection = () => {
  return (
    <section className="py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-destructive/5 blur-[80px] animate-float" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-destructive font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-destructive/8 border border-destructive/15">
            O problema
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-hero-foreground mt-4 mb-5 tracking-tight">
            Isso soa familiar?
          </h2>
          <p className="text-hero-foreground/50 text-lg max-w-2xl mx-auto font-light">
            A maioria dos centros esportivos ainda gerencia tudo de forma manual,
            perdendo tempo, dinheiro e alunos todos os dias.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-2xl glass border border-destructive/10 hover:border-destructive/25 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-bold text-hero-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-hero-foreground/50 text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitProblemsSection;
