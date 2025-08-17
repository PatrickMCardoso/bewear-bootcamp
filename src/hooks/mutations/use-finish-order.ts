import { useMutation, useQueryClient } from "@tanstack/react-query";

import { finishOrder } from "@/actions/finish-order";
import { toast } from "@/components/ui/sonner";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUseFinishOrderMutationKey = () => ["finish-order"];

export const useFinishOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUseFinishOrderMutationKey(),
    mutationFn: async () => {
      return await finishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
      toast.success("Pedido finalizado! Redirecionando para pagamento...");
    },
    onError: () => {
      toast.error("Erro ao finalizar pedido. Tente novamente.");
    },
  });
};
