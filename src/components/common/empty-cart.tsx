"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui/button";

interface EmptyCartProps {
  onStartShopping?: () => void;
}

export const EmptyCart = ({ onStartShopping }: EmptyCartProps) => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-5 pb-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <ShoppingCart className="text-muted-foreground h-12 w-12" />
        <h3 className="text-lg font-medium">Seu carrinho está vazio</h3>
        <p className="text-muted-foreground text-sm">
          Adicione produtos incríveis ao seu carrinho e finalize sua compra.
        </p>
      </div>
      <Button className="mt-4 rounded-full" asChild>
        <Link href="/" onClick={onStartShopping}>
          Começar a comprar
        </Link>
      </Button>
    </div>
  );
};
