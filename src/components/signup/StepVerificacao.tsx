import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { isCodigoValid } from "@/utils/validation";
import { FieldLabel, FieldError, getInputClass } from "./SignupUI";
import type { VerificacaoFormData, StepNavProps } from "@/types";

interface StepVerificacaoProps extends StepNavProps {
  formData: VerificacaoFormData;
  updateField: (field: keyof VerificacaoFormData, value: string) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (v: boolean) => void;
}

const EXPIRY_SECONDS = 10 * 60;

const StepVerificacao = ({ formData, updateField, isEmailVerified, setIsEmailVerified, nextStep, prevStep }: StepVerificacaoProps) => {
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(() => isCodigoValid(formData.codigo));
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXPIRY_SECONDS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const resetTimer = () => {
    clearInterval(intervalRef.current!);
    setTimeLeft(EXPIRY_SECONDS);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const isValid = touched && !error && isCodigoValid(formData.codigo);

  const handleNext = async () => {
    if (isEmailVerified) { nextStep(); return; }
    setTouched(true);
    if (!isCodigoValid(formData.codigo)) {
      setError("Digite o código de 6 dígitos");
      return;
    }
    setError(undefined);
    setIsVerifying(true);
    try {
      const response = await fetch("http://localhost:3100/signup/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: formData.codigo }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        setError(data?.message ?? "Código inválido. Tente novamente.");
        return;
      }

      setIsEmailVerified(true);
      nextStep();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setIsVerifying(false);
    }
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

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {timeLeft > 0 ? (
              <>Expira em <span className={`font-mono font-semibold ${timeLeft <= 60 ? "text-destructive" : "text-foreground"}`}>{formatTime(timeLeft)}</span></>
            ) : (
              <span className="text-destructive font-semibold">Código expirado</span>
            )}
          </span>
          <button
            onClick={() => {
              fetch("http://localhost:3100/signup/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
              });
              resetTimer();
            }}
            className="text-primary font-semibold hover:underline"
          >
            Reenviar código
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} disabled={isVerifying} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button onClick={handleNext} disabled={isVerifying} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          {isVerifying ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Verificando...</>
          ) : (
            <>Verificar <ArrowRight className="w-4 h-4" /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepVerificacao;
