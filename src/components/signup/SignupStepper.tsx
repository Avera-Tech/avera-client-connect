// SRP — responsável apenas por renderizar o stepper visual

import { CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  label: string;
  icon: React.ElementType;
}

interface SignupStepperProps {
  steps: Step[];
  currentStep: number;
}

const SignupStepper = ({ steps, currentStep }: SignupStepperProps) => (
  <div className="max-w-3xl mx-auto w-full px-3 sm:px-6 pt-8 sm:pt-10 pb-4 sm:pb-6">
    <div className="flex items-center justify-between">
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isDone = i < currentStep;
        const Icon = step.icon;

        return (
          <div key={step.id} className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
            <div className="relative flex items-center w-full justify-center">
              {i > 0 && (
                <div
                  className={`absolute h-0.5 w-full ${isDone ? "bg-primary" : "bg-border"}`}
                  style={{ right: "50%", width: "100%" }}
                />
              )}
              <div
                className={`relative z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-300 bg-background ${
                  isActive ? "shadow-lg shadow-primary/25" : ""
                }`}
              >
                <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  isActive ? "bg-primary" : isDone ? "bg-primary/15" : "bg-muted"
                }`} />
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive ? "text-primary-foreground" : isDone ? "text-primary" : "text-muted-foreground"
                }`}>
                  {isDone
                    ? <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                    : <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5" />}
                </span>
              </div>
            </div>
            <span className={`text-[10px] sm:text-xs font-medium text-center leading-tight w-full truncate px-0.5 ${
              isActive ? "text-foreground" : isDone ? "text-primary" : "text-muted-foreground"
            }`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default SignupStepper;
