import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

export const planos = [
  {
    nome: "Starter",
    preco: "R$ 197",
    periodo: "/mês",
    descricao: "Para centros esportivos iniciando a digitalização",
    recursos: [
      "Até 5 quadras",
      "Agendamento online",
      "Gestão de alunos",
      "Cobrança básica",
      "Suporte por email",
    ],
  },
  {
    nome: "Profissional",
    preco: "R$ 397",
    periodo: "/mês",
    destaque: true,
    descricao: "Para centros em crescimento que buscam eficiência",
    recursos: [
      "Até 15 quadras",
      "Tudo do Starter",
      "Lembretes automáticos",
      "Relatórios financeiros",
      "Integrações (WellHub)",
      "Suporte prioritário",
    ],
  },
  {
    nome: "Enterprise",
    preco: "Sob consulta",
    periodo: "",
    descricao: "Para grandes centros e redes esportivas",
    recursos: [
      "Quadras ilimitadas",
      "Tudo do Profissional",
      "Multi-unidades",
      "API dedicada",
      "Gerente de sucesso",
      "SLA garantido",
    ],
  },
];

interface StepPlanoProps {
  selectedPlano: number;
  setSelectedPlano: (i: number) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const StepPlano = ({ selectedPlano, setSelectedPlano, nextStep, prevStep }: StepPlanoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Escolha seu plano
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Você pode alterar a qualquer momento
        </p>
      </div>

      <div className="space-y-3">
        {planos.map((plano, i) => (
          <button
            key={plano.nome}
            onClick={() => setSelectedPlano(i)}
            className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
              selectedPlano === i
                ? "border-primary bg-primary/5"
                : "border-border/60 hover:border-primary/30"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-foreground">{plano.nome}</span>
                  {plano.destaque && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{plano.descricao}</p>
              </div>
              <div className="text-right">
                <span className="font-display text-xl font-extrabold text-foreground">{plano.preco}</span>
                <span className="text-xs text-muted-foreground">{plano.periodo}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
              {plano.recursos.map((r) => (
                <span key={r} className="text-xs text-muted-foreground flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  {r}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button onClick={nextStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          Continuar <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepPlano;
