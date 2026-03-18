import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { isCodigoValid } from "@/utils/validation";
import { FieldLabel, FieldError, getInputClass } from "./SignupUI";
import type { VerificacaoFormData, StepNavProps } from "@/types";

interface StepVerificacaoProps extends StepNavProps {
  formData: VerificacaoFormData;
  updateField: (field: keyof VerificacaoFormData, value: string) => void;
}

const StepVerificacao = ({ formData, updateField, nextStep, prevStep }: StepVerificacaoProps) => {
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(() => isCodigoValid(formData.codigo));

  const isValid = touched && !error && isCodigoValid(formData.codigo);

  const handleNext = () => {
    setTouched(true);
    if (!isCodigoValid(formData.codigo)) {
      setError("Digite o código de 6 dígitos");
      return;
    }
    setError(undefined);
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Verificação
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Enviamos um código de 6 dígitos para{" "}
          <span className="font-medium text-foreground">{formData.email || "seu email"}</span>
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <FieldLabel valid={isValid}>Código de verificação</FieldLabel>
          <Input
            placeholder="000000"
            value={formData.codigo}
            onChange={(e) => {
              updateField("codigo", e.target.value.replace(/\D/g, "").slice(0, 6));
              setError(undefined);
            }}
            onBlur={() => setTouched(true)}
            className={`${getInputClass(!!error, isValid)} text-center text-base sm:text-lg tracking-[0.5em] font-mono`}
            maxLength={6}
          />
          <FieldError message={error} />
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Não recebeu?{" "}
          <button className="text-primary font-semibold hover:underline">Reenviar código</button>
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button onClick={handleNext} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          Verificar <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default StepVerificacao;
