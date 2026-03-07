import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20 p-12 rounded-3xl hero-gradient relative overflow-hidden"
        >
          <div className="absolute inset-0 mesh-gradient opacity-40" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-hero-foreground mb-5 tracking-tight">
              Pronto para modernizar seu centro esportivo?
            </h2>
            <p className="text-hero-foreground/50 text-lg max-w-xl mx-auto font-light mb-8">
              Agende uma demonstração gratuita e veja como a Avera pode transformar sua operação.
            </p>
            <Button variant="hero" size="lg" className="text-base px-8 rounded-full h-14">
              Agendar Demonstração
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Contato
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Fale com a gente
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, label: "Email", value: "contato@avera.com.br" },
              { icon: Phone, label: "Telefone", value: "+55 (11) 9999-9999" },
              { icon: MapPin, label: "Endereço", value: "São Paulo, SP - Brasil" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/20 transition-all duration-300">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{info.label}</div>
                  <div className="text-muted-foreground text-sm mt-0.5">{info.value}</div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 space-y-4 p-8 rounded-3xl bg-card border border-border/60"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nome" className="bg-background/50 rounded-xl h-12 border-border/60" />
              <Input placeholder="Email" type="email" className="bg-background/50 rounded-xl h-12 border-border/60" />
            </div>
            <Input placeholder="Nome do centro esportivo" className="bg-background/50 rounded-xl h-12 border-border/60" />
            <Textarea placeholder="Como podemos ajudar?" className="bg-background/50 rounded-xl min-h-[130px] border-border/60 resize-none" />
            <Button variant="default" size="lg" className="w-full rounded-xl h-13 font-semibold">
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensagem
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
