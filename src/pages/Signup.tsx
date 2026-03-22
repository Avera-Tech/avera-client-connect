import { useState } from "react";
import { Building2, UserCircle, ShieldCheck, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/avera-logo.png";
import SignupStepper from "@/components/signup/SignupStepper";
import StepEmpresa from "@/components/signup/StepEmpresa";
import StepAdministrador from "@/components/signup/StepAdministrador";
import StepVerificacao from "@/components/signup/StepVerificacao";
import StepPlano, { planos } from "@/components/signup/StepPlano";
import StepConfirmacao from "@/components/signup/StepConfirmacao";
import type { SignupFormData } from "@/types";

// OCP — adicionar um step exige apenas inserir um item aqui
const steps = [
  { id: 0, label: "Empresa",        icon: Building2 },
  { id: 1, label: "Administrador",  icon: UserCircle },
  { id: 2, label: "Verificação",    icon: ShieldCheck },
  { id: 3, label: "Plano",          icon: CreditCard },
  { id: 4, label: "Confirmação",    icon: CheckCircle2 },
];

const initialFormData: SignupFormData = {
  cnpj: "", segmento: "", cidade: "", qtdQuadras: "",
  nome: "", email: "", telefone: "", senha: "", codigo: "",
};

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(1);
  const [formData, setFormData] = useState<SignupFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const navigate = useNavigate();

  const updateField = (field: keyof SignupFormData, value: string) => {
    if (field === "email") setIsEmailVerified(false);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleFinish = async () => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        cnpj: formData.cnpj,
        segment: formData.segmento,
        city: formData.cidade,
        courts_count: formData.qtdQuadras,
        plan: planos[selectedPlano].nome.toLowerCase(),
        name: formData.nome,
        email: formData.email,
        phone: formData.telefone,
        password: formData.senha,
      };

      const response = await fetch("http://localhost:3100/signup/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message ?? "Erro ao criar conta. Tente novamente.");
      }

      navigate("/login");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erro ao criar conta. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Avera" className="h-9" />
          </a>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar
          </button>
        </div>
      </header>

      <SignupStepper steps={steps} currentStep={currentStep} />

      <div className="flex-1 flex items-start justify-center px-6 pb-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border/60 p-5 sm:p-8"
            >
              {currentStep === 0 && (
                <StepEmpresa formData={formData} updateField={updateField} nextStep={nextStep} />
              )}
              {currentStep === 1 && (
                <StepAdministrador
                  formData={formData}
                  updateField={updateField}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  isEmailVerified={isEmailVerified}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 2 && (
                <StepVerificacao
                  formData={formData}
                  updateField={updateField}
                  isEmailVerified={isEmailVerified}
                  setIsEmailVerified={setIsEmailVerified}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 3 && (
                <StepPlano
                  selectedPlano={selectedPlano}
                  setSelectedPlano={setSelectedPlano}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
              {currentStep === 4 && (
                <StepConfirmacao
                  formData={formData}
                  selectedPlano={selectedPlano}
                  handleFinish={handleFinish}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  nextStep={nextStep}
                  prevStep={prevStep}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <footer className="border-t border-border/40 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Avera. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
