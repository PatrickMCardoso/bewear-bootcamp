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
    mutationFn: (data: UpdateCartShippingAddressSchema) =>
      updateCartShippingAddress(data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: getUseCartQueryKey() });
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
