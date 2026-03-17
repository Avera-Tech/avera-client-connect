import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  UserCircle,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import logoImg from "@/assets/avera-logo.png";

const steps = [
  { id: 0, label: "Empresa", icon: Building2 },
  { id: 1, label: "Administrador", icon: UserCircle },
  { id: 2, label: "Verificação", icon: ShieldCheck },
  { id: 3, label: "Plano", icon: CreditCard },
  { id: 4, label: "Confirmação", icon: CheckCircle2 },
];

const segmentos = [
  "Academia",
  "Centro Esportivo",
  "Clube",
  "Escola de Esportes",
  "Quadras de Padel",
  "Quadras de Tênis",
  "Quadras de Beach Tennis",
  "Quadras de Futevôlei",
  "Centro Multiesportivo",
];

const qtdQuadras = [
  "1 a 3",
  "4 a 8",
  "9 a 15",
  "16 a 30",
  "Mais de 30",
];

const planos = [
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

const Signup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlano, setSelectedPlano] = useState(1);
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    cnpj: "",
    segmento: "",
    cidade: "",
    qtdQuadras: "",
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    codigo: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleFinish = () => {
    navigate("/login");
  };

  const formatCNPJ = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  };

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 10) {
      return digits
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src={logoImg} alt="Avera" className="h-9" />
          </a>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>
        </div>
      </header>

      {/* Stepper */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-6">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
                <div className="relative flex items-center w-full justify-center">
                  {i > 0 && (
                    <div
                      className={`absolute right-1/2 h-0.5 w-full -translate-x-0 ${
                        isDone ? "bg-primary" : "bg-border"
                      }`}
                      style={{ right: "50%", width: "100%" }}
                    />
                  )}
                  <div
                    className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : isDone
                        ? "bg-primary/15 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                </div>
                <span
                  className={`text-xs font-medium hidden sm:block ${
                    isActive
                      ? "text-foreground"
                      : isDone
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form card */}
      <div className="flex-1 flex items-start justify-center px-6 pb-12">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-card rounded-2xl border border-border/60 p-8"
            >
              {/* Step 0 — Empresa */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                      Dados da Empresa
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Informe o CNPJ para validarmos sua empresa
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">CNPJ</label>
                      <Input
                        placeholder="00.000.000/0000-00"
                        value={formData.cnpj}
                        onChange={(e) => updateField("cnpj", formatCNPJ(e.target.value))}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Segmento</label>
                      <Select value={formData.segmento} onValueChange={(v) => updateField("segmento", v)}>
                        <SelectTrigger className="h-12 rounded-xl bg-background border-border/60">
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {segmentos.map((s) => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Cidade de Operação <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder="Ex: São Paulo - SP"
                        value={formData.cidade}
                        onChange={(e) => updateField("cidade", e.target.value)}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Quantas quadras/espaços você opera?
                      </label>
                      <Select value={formData.qtdQuadras} onValueChange={(v) => updateField("qtdQuadras", v)}>
                        <SelectTrigger className="h-12 rounded-xl bg-background border-border/60">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          {qtdQuadras.map((q) => (
                            <SelectItem key={q} value={q}>{q}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={nextStep} className="w-full h-12 rounded-xl font-semibold text-base gap-2">
                    Continuar <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* Step 1 — Administrador */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                      Dados do Administrador
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Quem será o responsável pela conta
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Nome completo</label>
                      <Input
                        placeholder="Seu nome"
                        value={formData.nome}
                        onChange={(e) => updateField("nome", e.target.value)}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
                      <Input
                        placeholder="(00) 00000-0000"
                        value={formData.telefone}
                        onChange={(e) => updateField("telefone", formatPhone(e.target.value))}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Senha</label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Mínimo 8 caracteres"
                          value={formData.senha}
                          onChange={(e) => updateField("senha", e.target.value)}
                          className="h-12 rounded-xl bg-background border-border/60 pr-12 focus:border-primary/50 focus:ring-primary/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
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
              )}

              {/* Step 2 — Verificação */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                      Verificação
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
                      Enviamos um código de 6 dígitos para <span className="font-medium text-foreground">{formData.email || "seu email"}</span>
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Código de verificação</label>
                      <Input
                        placeholder="000000"
                        value={formData.codigo}
                        onChange={(e) => updateField("codigo", e.target.value.replace(/\D/g, "").slice(0, 6))}
                        className="h-12 rounded-xl bg-background border-border/60 focus:border-primary/50 focus:ring-primary/20 text-center text-lg tracking-[0.5em] font-mono"
                        maxLength={6}
                      />
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                      Não recebeu?{" "}
                      <button className="text-primary font-semibold hover:underline">
                        Reenviar código
                      </button>
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={prevStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
                      <ArrowLeft className="w-4 h-4" /> Voltar
                    </Button>
                    <Button onClick={nextStep} className="flex-1 h-12 rounded-xl font-semibold gap-2">
                      Verificar <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3 — Plano */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                      Escolha seu plano
                    </h2>
                    <p className="text-muted-foreground text-sm mt-1">
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
              )}

              {/* Step 4 — Confirmação */}
              {currentStep === 4 && (
                <div className="space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>

                  <div>
                    <h2 className="font-display text-2xl font-bold text-foreground tracking-tight">
                      Tudo pronto!
                    </h2>
                    <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">
                      Sua conta foi criada com sucesso. Acesse o painel para configurar seu centro esportivo.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-5 text-left space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Empresa</span>
                      <span className="font-medium text-foreground">{formData.cnpj || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Segmento</span>
                      <span className="font-medium text-foreground">{formData.segmento || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Administrador</span>
                      <span className="font-medium text-foreground">{formData.nome || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Email</span>
                      <span className="font-medium text-foreground">{formData.email || "—"}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Plano</span>
                      <span className="font-medium text-primary">{planos[selectedPlano].nome}</span>
                    </div>
                  </div>

                  <Button onClick={handleFinish} className="w-full h-12 rounded-xl font-semibold text-base gap-2">
                    Acessar o painel <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/40 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Avera. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
