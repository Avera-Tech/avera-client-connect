import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ArrowRight } from "lucide-react";
import { formatCNPJ, isCNPJValid } from "@/utils/validation";
import { useStepForm } from "@/hooks/useStepForm";
import { FieldLabel, FieldError, getInputClass, getTriggerClass } from "./SignupUI";
import type { EmpresaFormData, StepNavProps } from "@/types";

const segmentos = [
  "Academia", "Centro Esportivo", "Clube", "Escola de Esportes",
  "Quadras de Padel", "Quadras de Tênis", "Quadras de Beach Tennis",
  "Quadras de Futevôlei", "Centro Multiesportivo",
];

const qtdQuadras = ["1 a 3", "4 a 8", "9 a 15", "16 a 30", "Mais de 30"];

interface StepEmpresaProps extends Pick<StepNavProps, "nextStep"> {
  formData: EmpresaFormData;
  updateField: (field: keyof EmpresaFormData, value: string) => void;
}

// 1. nomeEmpresa adicionado nos tipos de erro
type EmpresaErrors = {
  nomeEmpresa?: string;
  cnpj?: string;
  segmento?: string;
  cidade?: string;
  qtdQuadras?: string;
};

const StepEmpresa = ({ formData, updateField, nextStep }: StepEmpresaProps) => {
  const { errors, touched, touch, clearError, validate } = useStepForm<EmpresaErrors>(
    () => {
      const e: EmpresaErrors = {};
      // 2. nomeEmpresa na função de validação
      if (!formData.nomeEmpresa?.trim()) e.nomeEmpresa = "Nome da empresa é obrigatório";
      if (!formData.cnpj) e.cnpj = "CNPJ é obrigatório";
      else if (!isCNPJValid(formData.cnpj)) e.cnpj = "CNPJ inválido";
      if (!formData.segmento) e.segmento = "Selecione um segmento";
      if (!formData.cidade.trim()) e.cidade = "Cidade é obrigatória";
      if (!formData.qtdQuadras) e.qtdQuadras = "Selecione a quantidade de quadras";
      return e;
    },
    // 3. nomeEmpresa nos campos observados pelo touched
    ["nomeEmpresa", "cnpj", "segmento", "cidade", "qtdQuadras"],
    {
      // 4. nomeEmpresa no objeto de validação inicial
      nomeEmpresa: !!formData.nomeEmpresa?.trim(),
      cnpj: isCNPJValid(formData.cnpj),
      segmento: !!formData.segmento,
      cidade: !!formData.cidade.trim(),
      qtdQuadras: !!formData.qtdQuadras,
    }
  );

  // 5. nomeEmpresa no isValid
  const isValid = {
    nomeEmpresa: touched.nomeEmpresa && !errors.nomeEmpresa && !!formData.nomeEmpresa?.trim(),
    cnpj:        touched.cnpj && !errors.cnpj && isCNPJValid(formData.cnpj),
    segmento:    touched.segmento && !errors.segmento && !!formData.segmento,
    cidade:      touched.cidade && !errors.cidade && !!formData.cidade.trim(),
    qtdQuadras:  touched.qtdQuadras && !errors.qtdQuadras && !!formData.qtdQuadras,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Dados da Empresa
        </h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-1">
          Informe os dados para validarmos sua empresa
        </p>
      </div>

      <div className="space-y-4">

        <div>
          <FieldLabel valid={!!isValid.nomeEmpresa}>Nome da Empresa</FieldLabel>
          <Input
            placeholder="Ex: Arena Beach Tennis SP"
            value={formData.nomeEmpresa}
            onChange={(e) => { updateField("nomeEmpresa", e.target.value); clearError("nomeEmpresa"); }}
            onBlur={() => touch("nomeEmpresa")}
            className={getInputClass(!!errors.nomeEmpresa, !!isValid.nomeEmpresa)}
          />
          <FieldError message={errors.nomeEmpresa} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.cnpj}>CNPJ</FieldLabel>
          <Input
            placeholder="00.000.000/0000-00"
            value={formData.cnpj}
            onChange={(e) => { updateField("cnpj", formatCNPJ(e.target.value)); clearError("cnpj"); }}
            onBlur={() => touch("cnpj")}
            className={getInputClass(!!errors.cnpj, !!isValid.cnpj)}
          />
          <FieldError message={errors.cnpj} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.segmento}>Segmento</FieldLabel>
          <Select value={formData.segmento} onValueChange={(v) => { updateField("segmento", v); clearError("segmento"); touch("segmento"); }}>
            <SelectTrigger className={getTriggerClass(!!errors.segmento, !!isValid.segmento)}>
              <SelectValue placeholder="Selecione o segmento" />
            </SelectTrigger>
            <SelectContent>
              {segmentos.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <FieldError message={errors.segmento} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.cidade}>Cidade de Operação</FieldLabel>
          <Input
            placeholder="Ex: São Paulo - SP"
            value={formData.cidade}
            onChange={(e) => { updateField("cidade", e.target.value); clearError("cidade"); }}
            onBlur={() => touch("cidade")}
            className={getInputClass(!!errors.cidade, !!isValid.cidade)}
          />
          <FieldError message={errors.cidade} />
        </div>

        <div>
          <FieldLabel valid={!!isValid.qtdQuadras}>Quantas quadras/espaços você opera?</FieldLabel>
          <Select value={formData.qtdQuadras} onValueChange={(v) => { updateField("qtdQuadras", v); clearError("qtdQuadras"); touch("qtdQuadras"); }}>
            <SelectTrigger className={getTriggerClass(!!errors.qtdQuadras, !!isValid.qtdQuadras)}>
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              {qtdQuadras.map((q) => <SelectItem key={q} value={q}>{q}</SelectItem>)}
            </SelectContent>
          </Select>
          <FieldError message={errors.qtdQuadras} />
        </div>

      </div>

      <Button onClick={() => { if (validate()) nextStep(); }} className="w-full h-12 rounded-xl font-semibold text-base gap-2">
        Continuar <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default StepEmpresa;