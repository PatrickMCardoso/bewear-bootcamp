import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";
import { toast } from "@/components/ui/sonner";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increase-cart-product-quantity", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: async () =>
      await addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
        exact: true,
        refetchType: "active",
      });
      toast.success("Quantidade aumentada!");
    },
    onError: () => {
      toast.error("Erro ao aumentar quantidade.");
    },
  });
};
