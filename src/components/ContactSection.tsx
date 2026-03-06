import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Contato</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Vamos conversar?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Entre em contato e descubra como podemos ajudar seu negócio a crescer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            {[
              { icon: Mail, label: "Email", value: "contato@avera.com.br" },
              { icon: Phone, label: "Telefone", value: "+55 (11) 9999-9999" },
              { icon: MapPin, label: "Endereço", value: "São Paulo, SP - Brasil" },
            ].map((info) => (
              <div key={info.label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <info.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{info.label}</div>
                  <div className="text-muted-foreground">{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Nome" className="bg-card" />
              <Input placeholder="Email" type="email" className="bg-card" />
            </div>
            <Input placeholder="Assunto" className="bg-card" />
            <Textarea placeholder="Sua mensagem..." className="bg-card min-h-[140px]" />
            <Button variant="default" size="lg" className="w-full font-semibold">
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
