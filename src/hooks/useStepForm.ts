import { useState } from "react";

// DIP — steps dependem dessa abstração, não de useState direto
export function useStepForm<TErrors extends Record<string, string | undefined>>(
  validateFn: () => TErrors,
  allFields: (keyof TErrors)[],
  initialTouched: Partial<Record<keyof TErrors, boolean>> = {}
) {
  const [errors, setErrors] = useState<TErrors>({} as TErrors);
  const [touched, setTouched] = useState<Partial<Record<keyof TErrors, boolean>>>(initialTouched);

  const touch = (field: keyof TErrors) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const clearError = (field: keyof TErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const validate = (): boolean => {
    const e = validateFn();
    setErrors(e);
    setTouched(allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
    return !Object.values(e).some(Boolean);
  };

  return { errors, touched, touch, clearError, validate };
}
