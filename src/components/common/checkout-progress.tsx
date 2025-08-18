"use client";

import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface CheckoutProgressProps {
  currentStep: "cart" | "identification" | "payment";
}

const steps = [
  {
    id: "cart",
    name: "Carrinho",
    description: "Produtos selecionados",
  },
  {
    id: "identification",
    name: "Identificação",
    description: "Dados de entrega",
  },
  {
    id: "payment",
    name: "Pagamento",
    description: "Finalizar compra",
  },
] as const;

export const CheckoutProgress = ({ currentStep }: CheckoutProgressProps) => {
  const getCurrentStepIndex = () => {
    return steps.findIndex((step) => step.id === currentStep);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className="w-full py-4">
      <div className="mx-auto flex max-w-sm items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isUpcoming = index > currentStepIndex;

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle and Label */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "bg-background flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
                    {
                      "border-primary bg-primary text-primary-foreground":
                        isCompleted,
                      "border-primary text-primary": isCurrent,
                      "border-muted-foreground text-muted-foreground":
                        isUpcoming,
                    },
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p
                    className={cn("text-xs font-medium", {
                      "text-primary": isCurrent || isCompleted,
                      "text-muted-foreground": isUpcoming,
                    })}
                  >
                    {step.name}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 mt-4 h-0.5 w-12 self-start rounded-full transition-colors",
                    isCompleted ? "bg-primary" : "bg-muted",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
