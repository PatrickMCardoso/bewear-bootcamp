import { useMutation, useQueryClient } from "@tanstack/react-query";

import { decreaseCartProductQuantity } from "@/actions/decrease-cart-product-quantity";
import { toast } from "@/components/ui/sonner";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getDecreaseCartProductMutationKey = (cartItemId: string) =>
  ["decrease-cart-product-quantity", cartItemId] as const;

export const useDecreaseCartProduct = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getDecreaseCartProductMutationKey(cartItemId),
    mutationFn: async () => await decreaseCartProductQuantity({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
        exact: true,
        refetchType: "active",
      });
      toast.success("Quantidade diminuída!");
    },
    onError: () => {
      toast.error("Erro ao diminuir quantidade.");
    },
  });
};
