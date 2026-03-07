import { AlertTriangle, Clock, DollarSign, UserX } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: UserX,
    title: "No-Shows Elevados",
    description: "Alunos faltam sem aviso prévio e você perde receita sem nenhum controle sobre cancelamentos.",
  },
  {
    icon: Clock,
    title: "Gestão Manual e Ineficiente",
    description: "Planilhas, cadernos e WhatsApp para controlar quadras, horários e turmas. Erros e retrabalho constantes.",
  },
  {
    icon: DollarSign,
    title: "Inadimplência Sem Controle",
    description: "Cobranças manuais, pagamentos perdidos e falta de visibilidade sobre quem deve e quanto.",
  },
  {
    icon: AlertTriangle,
    title: "Quadras Ociosas",
    description: "Sem visão clara da ocupação, horários vagos passam despercebidos e você deixa receita na mesa.",
  },
];

const ProblemsSection = () => {
  return (
    <section className="py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

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
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Isso soa familiar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            A maioria dos centros esportivos ainda gerencia tudo de forma manual, 
            perdendo tempo, dinheiro e alunos todos os dias.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-destructive/10 hover:border-destructive/25 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-5">
                <problem.icon className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-display text-lg font-bold text-card-foreground mb-2">
                {problem.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
