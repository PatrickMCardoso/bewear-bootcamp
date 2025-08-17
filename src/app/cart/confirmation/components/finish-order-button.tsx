"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();

  const handleFinishOrder = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        toast.error("Configuração de pagamento não encontrada.");
        return;
      }

      const { orderId } = await finishOrderMutation.mutateAsync();
      const checkoutSession = await createCheckoutSession({
        orderId,
      });

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );

      if (!stripe) {
        toast.error("Erro ao inicializar pagamento.");
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch (error) {
      console.error("Error in handleFinishOrder:", error);
      toast.error("Erro ao processar pagamento. Tente novamente.");
    }
  };

  return (
    <Button
      className="w-full rounded-full"
      size="lg"
      onClick={handleFinishOrder}
      disabled={finishOrderMutation.isPending}
    >
      {finishOrderMutation.isPending && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      )}
      Finalizar compra
    </Button>
  );
};

export default FinishOrderButton;
