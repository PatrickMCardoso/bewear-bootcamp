import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeProductFromCart } from "@/actions/remove-cart-product";
import { toast } from "@/components/ui/sonner";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getRemoveProductFromCartMutationKey = (cartItemId: string) =>
  ["remove-cart-product", cartItemId] as const;

export const useRemoveProductFromCart = (cartItemId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getRemoveProductFromCartMutationKey(cartItemId),
    mutationFn: async () => await removeProductFromCart({ cartItemId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
        exact: true,
        refetchType: "active",
      });
      toast.success("Produto removido do carrinho!");
    },
    onError: () => {
      toast.error("Erro ao remover produto do carrinho.");
    },
  });
};
