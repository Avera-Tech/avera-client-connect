import { motion } from "framer-motion";
import tennisImg from "@/assets/sport-tennis.jpg";
import beachTennisImg from "@/assets/sport-beachtennis.jpg";
import soccerImg from "@/assets/sport-soccer.jpg";
import futevoleiImg from "@/assets/sport-futevolei.jpg";

const sports = [
  { name: "Tennis", image: tennisImg, description: "Quadras de saibro, hard court e grama sintética" },
  { name: "Beach Tennis", image: beachTennisImg, description: "Quadras de areia com gestão completa de horários" },
  { name: "Soccer", image: soccerImg, description: "Campos society e futsal indoor com reservas online" },
  { name: "Futevôlei", image: futevoleiImg, description: "Quadras de areia com controle de ocupação" },
];

const FitSportsSection = () => {
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
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Multi-Esportes
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Todos os esportes,{" "}
            <span className="text-gradient">uma plataforma</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Não importa a modalidade — a AveraFit se adapta ao seu centro esportivo.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {sports.map((sport, i) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-3xl overflow-hidden cursor-default aspect-[3/4]"
            >
              <img
                src={sport.image}
                alt={sport.name}
                loading="lazy"
                width={800}
                height={1024}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-2xl font-extrabold text-primary-foreground mb-1">
                  {sport.name}
                </h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">
                  {sport.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FitSportsSection;
