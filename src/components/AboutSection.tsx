import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Agendamento 100% online, sem ligações",
  "Redução de até 70% nos no-shows",
  "Cobranças automáticas e controle de inadimplência",
  "Integração com WellHub e TotalPass (em breve)",
];

const stats = [
  { number: "24/7", label: "Agendamento disponível" },
  { number: "70%", label: "Menos no-shows" },
  { number: "100%", label: "Controle financeiro" },
  { number: "0", label: "Planilhas necessárias" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-32 hero-gradient relative overflow-hidden">
      <div className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-primary/5 blur-[80px] animate-float" />
      <div className="absolute bottom-20 left-[10%] w-48 h-48 rounded-full bg-accent/5 blur-[60px] animate-float-delayed" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
              Por que a Avera
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-hero-foreground mt-4 mb-6 tracking-tight leading-[1.05]">
              Menos gestão manual,{" "}
              <span className="text-gradient">mais resultados</span>
            </h2>
            <p className="text-hero-foreground/50 text-lg leading-relaxed mb-10 font-light">
              A Avera foi criada por quem vive o dia a dia dos centros esportivos. 
              Automatize o que é repetitivo e foque no que importa: seus alunos e sua receita.
            </p>
            <div className="space-y-5">
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
                  <span className="text-hero-foreground/80 font-medium">{item}</span>
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
                  className="p-7 rounded-3xl glass text-center group hover:glow-border transition-all duration-500"
                >
                  <div className="font-display text-4xl font-extrabold text-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-hero-foreground/50 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
