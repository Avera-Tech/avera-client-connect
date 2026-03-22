import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { planos } from "./StepPlano";
import type { ConfirmacaoFormData, StepNavProps } from "@/types";

interface StepConfirmacaoProps extends StepNavProps {
  formData: ConfirmacaoFormData;
  selectedPlano: number;
  handleFinish: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}

const StepConfirmacao = ({ formData, selectedPlano, handleFinish, isSubmitting, submitError, prevStep }: StepConfirmacaoProps) => (
  <div className="space-y-6 text-center">
    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
      <CheckCircle2 className="w-8 h-8 text-primary" />
    </div>

    <div>
      <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">Tudo pronto!</h2>
      <p className="text-muted-foreground text-xs sm:text-sm mt-2 max-w-sm mx-auto">
        Sua conta foi criada com sucesso. Acesse o painel para configurar seu centro esportivo.
      </p>
    </div>

    <div className="bg-muted/50 rounded-xl p-4 sm:p-5 text-left space-y-2.5">
      {[
        { label: "Empresa",       value: formData.cnpj },
        { label: "Segmento",      value: formData.segmento },
        { label: "Administrador", value: formData.nome },
        { label: "Email",         value: formData.email },
      ].map(({ label, value }) => (
        <div key={label} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 text-xs sm:text-sm">
          <span className="text-muted-foreground shrink-0">{label}</span>
          <span className="font-medium text-foreground break-all sm:break-normal sm:text-right">{value || "—"}</span>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 text-xs sm:text-sm">
        <span className="text-muted-foreground shrink-0">Plano</span>
        <span className="font-medium text-primary">{planos[selectedPlano].nome}</span>
      </div>
    </div>

    {submitError && (
      <p className="text-sm text-destructive text-center">{submitError}</p>
    )}

    <div className="flex gap-3">
      <Button variant="outline" onClick={prevStep} disabled={isSubmitting} className="flex-1 h-12 rounded-xl font-semibold gap-2">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Button>
      <Button onClick={handleFinish} disabled={isSubmitting} className="flex-1 h-12 rounded-xl font-semibold text-base gap-2">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Criando conta...</>
        ) : (
          <>Acessar o painel <ArrowRight className="w-4 h-4" /></>
        )}
      </Button>
    </div>
  </div>
);

export default StepConfirmacao;
