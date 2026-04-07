import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { formatPhone, isEmailValid, isPhoneValid, isPasswordStrong } from "@/utils/validation";
import { useStepForm } from "@/hooks/useStepForm";
import { FieldLabel, FieldError, PasswordStrength, getInputClass } from "./SignupUI";
import type { AdministradorFormData, StepNavProps } from "@/types";

interface StepAdministradorProps extends StepNavProps {
  formData: AdministradorFormData;
  updateField: (field: keyof AdministradorFormData, value: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  isEmailVerified: boolean;
  companyName: string;  // ← novo
}

type AdminErrors = { nome?: string; email?: string; telefone?: string; senha?: string };

const StepAdministrador = ({
  formData, updateField, showPassword, setShowPassword,
  isEmailVerified, nextStep, prevStep, companyName,
}: StepAdministradorProps) => {
  const [emailApiError, setEmailApiError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { errors, touched, touch, clearError, validate } = useStepForm<AdminErrors>(
    () => {
      const e: AdminErrors = {};
      if (!formData.nome.trim()) e.nome = "Nome é obrigatório";
      if (!formData.email) e.email = "Email é obrigatório";
      else if (!isEmailValid(formData.email)) e.email = "Email inválido";
      if (!formData.telefone) e.telefone = "Telefone é obrigatório";
      else if (!isPhoneValid(formData.telefone)) e.telefone = "Telefone inválido";
      if (!formData.senha) e.senha = "Senha é obrigatória";
      else if (!isPasswordStrong(formData.senha)) e.senha = "A senha não atende todos os requisitos";
      return e;
    },
    ["nome", "email", "telefone", "senha"],
    {
      nome: !!formData.nome.trim(),
      email: isEmailValid(formData.email),
      telefone: isPhoneValid(formData.telefone),
      senha: isPasswordStrong(formData.senha),
    }
  );

  const isValid = {
    nome:     touched.nome     && !errors.nome     && !!formData.nome.trim(),
    email:    touched.email    && !errors.email    && isEmailValid(formData.email),
    telefone: touched.telefone && !errors.telefone && isPhoneValid(formData.telefone),
    senha:    touched.senha    && !errors.senha    && isPasswordStrong(formData.senha),
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Dados do Administrador
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Quem será o responsável pela conta
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <FieldLabel valid={!!isValid.nome}>Nome completo</FieldLabel>
          <Input
            placeholder="Seu nome"
            value={formData.nome}
            onChange={(e) => { updateField("nome", e.target.value); clearError("nome"); }}
            onBlur={() => touch("nome")}
            className={getInputClass(!!errors.nome, !!isValid.nome)}
          />
          <FieldError message={errors.nome} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.email}>Email</FieldLabel>
          <Input
            type="email"
            placeholder="seu@email.com"
            value={formData.email}
            onChange={(e) => { updateField("email", e.target.value); clearError("email"); setEmailApiError(undefined); }}
            onBlur={() => touch("email")}
            className={getInputClass(!!errors.email || !!emailApiError, !!isValid.email)}
          />
          <FieldError message={errors.email ?? emailApiError} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.telefone}>Telefone</FieldLabel>
          <Input
            placeholder="(00) 00000-0000"
            value={formData.telefone}
            onChange={(e) => { updateField("telefone", formatPhone(e.target.value)); clearError("telefone"); }}
            onBlur={() => touch("telefone")}
            className={getInputClass(!!errors.telefone, !!isValid.telefone)}
          />
          <FieldError message={errors.telefone} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.senha}>Senha</FieldLabel>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha forte"
              value={formData.senha}
              onChange={(e) => { updateField("senha", e.target.value); clearError("senha"); }}
              onBlur={() => touch("senha")}
              className={getInputClass(!!errors.senha, !!isValid.senha, "pr-12")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <PasswordStrength senha={formData.senha} show={!!formData.senha} />
          <FieldError message={errors.senha} />
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Button>
        <Button
          disabled={isLoading}
          onClick={async () => {
            if (!validate()) return;
            if (isEmailVerified) { nextStep(); return; }
            setIsLoading(true);
            const response = await fetch(`http://localhost:3100/signup/send-otp`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email:        formData.email,
                company_name: companyName,  // ← enviando o nome da empresa
              }),
            });
            setIsLoading(false);
            if (!response.ok) {
              const data = await response.json().catch(() => null);
              setEmailApiError(data?.error ?? "Email já cadastrado.");
              return;
            }
            nextStep();
          }}
          className="flex-1 h-12 rounded-xl font-semibold gap-2"
        >
          {isLoading
            ? <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
            : <>Continuar <ArrowRight className="w-4 h-4" /></>
          }
        </Button>
      </div>
    </div>
  );
};

export default StepAdministrador;