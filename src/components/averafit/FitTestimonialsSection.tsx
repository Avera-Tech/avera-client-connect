import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rafael Mendes",
    role: "Arena Beach Sports · RJ",
    text: "Reduzi o no-show em 65% no primeiro mês. Os lembretes automáticos mudaram completamente a operação do meu centro.",
    rating: 5,
  },
  {
    name: "Camila Torres",
    role: "Play Tennis Club · SP",
    text: "Finalmente consigo ver a ocupação real de todas as quadras e tomar decisões baseadas em dados. Receita subiu 30%.",
    rating: 5,
  },
  {
    name: "André Oliveira",
    role: "Centro Esportivo Vitória · MG",
    text: "Meus alunos adoram o agendamento online. A cobrança automática acabou com a inadimplência crônica que tínhamos.",
    rating: 5,
  },
];

const FitTestimonialsSection = () => {
  return (
    <section className="py-28 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Depoimentos
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-hero-foreground mt-4 mb-5 tracking-tight">
            Quem usa, <span className="text-gradient">recomenda</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-7 rounded-3xl glass hover:glow-border transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-hero-foreground/70 text-sm leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div>
                <div className="font-display font-bold text-hero-foreground text-sm">{t.name}</div>
                <div className="text-hero-foreground/40 text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitTestimonialsSection;
