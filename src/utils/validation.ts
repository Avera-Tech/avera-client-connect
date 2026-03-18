// ─── Formatters ───────────────────────────────────────────────────────────────

export const formatCNPJ = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const formatPhone = (value: string): string => {
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

// ─── Validators ───────────────────────────────────────────────────────────────

export const isCNPJValid = (cnpj: string): boolean =>
  cnpj.replace(/\D/g, "").length === 14;

export const isEmailValid = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isPhoneValid = (phone: string): boolean =>
  phone.replace(/\D/g, "").length >= 10;

export const isCodigoValid = (codigo: string): boolean =>
  codigo.length === 6;

// ─── Password ─────────────────────────────────────────────────────────────────

export const passwordRules = [
  { id: "length",  label: "Mínimo 8 caracteres",  test: (p: string) => p.length >= 8 },
  { id: "upper",   label: "Uma letra maiúscula",   test: (p: string) => /[A-Z]/.test(p) },
  { id: "number",  label: "Um número",             test: (p: string) => /[0-9]/.test(p) },
  { id: "special", label: "Um caractere especial", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export const getPasswordStrength = (senha: string) => {
  const passed = passwordRules.filter((r) => r.test(senha)).length;
  if (passed <= 1) return { level: 0, label: "Muito fraca", color: "bg-destructive" };
  if (passed === 2) return { level: 1, label: "Fraca",      color: "bg-orange-400" };
  if (passed === 3) return { level: 2, label: "Boa",        color: "bg-yellow-400" };
  return             { level: 3, label: "Forte",      color: "bg-emerald-500" };
};

export const isPasswordStrong = (senha: string): boolean =>
  passwordRules.every((r) => r.test(senha));
