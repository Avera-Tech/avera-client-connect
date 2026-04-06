import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Agendamento 100% online, sem ligações",
  "Redução de até 70% nos no-shows",
  "Cobranças automáticas e controle de inadimplência",
  "Multi-esportes: Tennis, Beach Tennis, Soccer, Futevôlei e mais",
  "Integração com WellHub e TotalPass (em breve)",
];

const stats = [
  { number: "24/7", label: "Agendamento disponível" },
  { number: "70%", label: "Menos no-shows" },
  { number: "4+", label: "Modalidades suportadas" },
  { number: "0", label: "Planilhas necessárias" },
];

const FitStatsSection = () => {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
              Por que AveraFit
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-6 tracking-tight leading-[1.05]">
              Menos gestão manual,{" "}
              <span className="text-gradient">mais resultados</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
              A AveraFit foi criada por quem vive o dia a dia dos centros esportivos.
              Automatize o que é repetitivo e foque no que importa: seus alunos e sua receita.
            </p>
            <div className="space-y-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80 font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-7 rounded-3xl bg-card border border-border/60 text-center group hover:glow-border transition-all duration-500"
                >
                  <div className="font-display text-4xl font-extrabold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FitStatsSection;
