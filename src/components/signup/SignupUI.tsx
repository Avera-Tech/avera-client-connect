// SRP — componentes de UI compartilhados do fluxo de signup

import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { passwordRules, getPasswordStrength } from "@/utils/validation";

// ─── FieldLabel ───────────────────────────────────────────────────────────────

interface FieldLabelProps {
  children: React.ReactNode;
  valid: boolean;
}

export const FieldLabel = ({ children, valid }: FieldLabelProps) => (
  <div className="flex items-center gap-1.5 mb-2">
    <label className="text-xs sm:text-sm font-medium text-foreground">{children}</label>
    <AnimatePresence>
      {valid && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
        </motion.span>
      )}
    </AnimatePresence>
  </div>
);

// ─── FieldError ───────────────────────────────────────────────────────────────

interface FieldErrorProps {
  message?: string;
}

export const FieldError = ({ message }: FieldErrorProps) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, y: -4, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -4, height: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center gap-1.5 text-destructive text-xs mt-1.5 overflow-hidden"
      >
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {message}
      </motion.p>
    )}
  </AnimatePresence>
);

// ─── PasswordStrength ─────────────────────────────────────────────────────────

interface PasswordStrengthProps {
  senha: string;
  show: boolean;
}

export const PasswordStrength = ({ senha, show }: PasswordStrengthProps) => {
  const strength = getPasswordStrength(senha);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden mt-2 space-y-2"
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1 flex-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex-1 h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${strength.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: i <= strength.level ? "100%" : "0%" }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  />
                </div>
              ))}
            </div>
            <span className={`text-xs font-medium ${
              strength.level === 3 ? "text-emerald-500"
              : strength.level === 2 ? "text-yellow-500"
              : strength.level === 1 ? "text-orange-400"
              : "text-destructive"
            }`}>
              {strength.label}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            {passwordRules.map((rule) => {
              const ok = rule.test(senha);
              return (
                <motion.div key={rule.id} className="flex items-center gap-1.5" animate={{ opacity: 1 }}>
                  <AnimatePresence mode="wait">
                    {ok ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="x"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                      >
                        <X className="w-3 h-3 text-muted-foreground shrink-0" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span className={`text-xs transition-colors duration-200 ${ok ? "text-foreground" : "text-muted-foreground"}`}>
                    {rule.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Class helpers ────────────────────────────────────────────────────────────

export const getInputClass = (hasError: boolean, isValid: boolean, extra = "") =>
  `h-10 sm:h-12 text-sm sm:text-base rounded-xl bg-background transition-all duration-200 ${extra} ${
    hasError
      ? "border-destructive/70 focus:border-destructive"
      : isValid
      ? "border-emerald-500/50 focus:border-emerald-500/70"
      : "border-border/60 focus:border-primary/50 focus:ring-primary/20"
  }`;

export const getTriggerClass = (hasError: boolean, isValid: boolean) =>
  `h-10 sm:h-12 text-sm sm:text-base rounded-xl bg-background transition-all duration-200 ${
    hasError ? "border-destructive/70" : isValid ? "border-emerald-500/50" : "border-border/60"
  }`;
