import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateCartShippingAddress } from "@/actions/update-cart-shipping-address";
import type { UpdateCartShippingAddressSchema } from "@/actions/update-cart-shipping-address/schema";
import { toast } from "@/components/ui/sonner";

import { getUseCartQueryKey } from "../queries/use-cart";

export const getUpdateCartShippingAddressMutationKey = () =>
  ["update-cart-shipping-address"] as const;

export const useUpdateCartShippingAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getUpdateCartShippingAddressMutationKey(),
    mutationFn: async (data: UpdateCartShippingAddressSchema) =>
      await updateCartShippingAddress(data),
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({
        queryKey: getUseCartQueryKey(),
        exact: true,
        refetchType: "active",
      });
      if (result.success) {
        toast.success("Endereço de entrega atualizado!");
      } else {
        toast.error(result.message || "Erro ao atualizar endereço.");
      }
    },
    onError: () => {
      toast.error("Erro ao atualizar endereço de entrega.");
    },
  });
};
