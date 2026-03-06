import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15">
            Contato
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-foreground mt-4 mb-5 tracking-tight">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Entre em contato e descubra como podemos ajudar seu negócio a crescer.
          </p>
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
            <Input placeholder="Assunto" className="bg-background/50 rounded-xl h-12 border-border/60" />
            <Textarea placeholder="Sua mensagem..." className="bg-background/50 rounded-xl min-h-[130px] border-border/60 resize-none" />
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
