import { motion } from "framer-motion";
import { Monitor, Calendar, BarChart3, Users, CreditCard } from "lucide-react";
import dashboardImg from "@/assets/dashboard-mockup.jpg";

const features = [
  { icon: Calendar, label: "Agenda inteligente com visão por quadra e treinador" },
  { icon: Users, label: "Gestão de alunos, turmas e presenças" },
  { icon: BarChart3, label: "Analytics em tempo real por modalidade" },
  { icon: CreditCard, label: "Cobrança automática e controle financeiro" },
];

const FitSystemPreviewSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
              <Monitor className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
              Conheça o Sistema
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-6 tracking-tight leading-[1.05]">
              Tudo que você precisa,{" "}
              <span className="text-gradient">num só painel</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10 font-light">
              Um dashboard pensado para gestores de centros esportivos. 
              Visualize a ocupação das quadras, acompanhe a receita e gerencie 
              alunos e turmas sem sair da tela.
            </p>

            <div className="space-y-4">
              {features.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground/80 font-medium text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border/60 shadow-2xl shadow-primary/10">
              <img
                src={dashboardImg}
                alt="Dashboard AveraFit — Gestão de quadras e agendamentos"
                loading="lazy"
                width={1280}
                height={800}
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl bg-card border border-border/60 shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Ocupação hoje</div>
                <div className="font-display font-bold text-foreground">87%</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -top-4 -right-4 px-5 py-3 rounded-2xl bg-card border border-border/60 shadow-lg flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Alunos ativos</div>
                <div className="font-display font-bold text-foreground">342</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FitSystemPreviewSection;
