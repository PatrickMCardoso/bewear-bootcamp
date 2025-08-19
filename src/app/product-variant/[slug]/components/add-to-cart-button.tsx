"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId],
    mutationFn: async () =>
      await addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
        exact: true,
        refetchType: "active",
      });
      toast.success("Produto adicionado ao carrinho!");
    },
    onError: () => {
      toast.error("Erro ao adicionar produto ao carrinho.");
    },
  });
  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar ao carrinho
    </Button>
  );
};

export default AddToCartButton;
