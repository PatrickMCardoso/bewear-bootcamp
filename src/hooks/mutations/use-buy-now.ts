"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { authClient } from "@/lib/auth-client";

interface UseBuyNowParams {
  productVariantId: string;
  quantity: number;
}

export const useBuyNow = ({ productVariantId, quantity }: UseBuyNowParams) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = authClient.useSession();

  return useMutation({
    mutationKey: ["buyNow", productVariantId, quantity],
    mutationFn: async () => {
      if (!session?.user) {
        router.push("/authentication");
        throw new Error("Authentication required");
      }

      return addProductToCart({
        productVariantId,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      if (session?.user) {
        router.push("/cart/identification");
      }
    },
    onError: (error) => {
      if (error.message !== "Authentication required") {
        toast.error("Erro ao processar compra. Tente novamente.");
      }
    },
  });
};

export const getBuyNowMutationKey = (
  productVariantId: string,
  quantity: number,
) => ["buyNow", productVariantId, quantity];
