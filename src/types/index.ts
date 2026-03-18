// ─── Signup ───────────────────────────────────────────────────────────────────

export interface EmpresaFormData {
  cnpj: string;
  segmento: string;
  cidade: string;
  qtdQuadras: string;
}

export interface AdministradorFormData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface VerificacaoFormData {
  email: string;
  codigo: string;
}

export interface ConfirmacaoFormData {
  cnpj: string;
  segmento: string;
  nome: string;
  email: string;
}

export interface SignupFormData extends EmpresaFormData, AdministradorFormData {
  codigo: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface StepNavProps {
  nextStep: () => void;
  prevStep: () => void;
}
