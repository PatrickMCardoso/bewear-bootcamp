"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { formatCentsToBRL } from "@/helper/money";
import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { AuthDialog } from "./auth-dialog";
import CartItem from "./cart-item";
import { EmptyCart } from "./empty-cart";

export const Cart = () => {
  const { data: session } = authClient.useSession();
  const { data: cart } = useCart();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [cartSheetOpen, setCartSheetOpen] = useState(false);

  const handleCartClick = () => {
    if (!session?.user) {
      setAuthDialogOpen(true);
    } else {
      setCartSheetOpen(true);
    }
  };

  const isCartEmpty = !cart?.items || cart.items.length === 0;

  return (
    <>
      <Button variant="outline" size="icon" onClick={handleCartClick}>
        <ShoppingCart />
      </Button>

      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

      <Sheet open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Carrinho</SheetTitle>
          </SheetHeader>

          {isCartEmpty ? (
            <EmptyCart onStartShopping={() => setCartSheetOpen(false)} />
          ) : (
            <div className="flex h-full flex-col px-5 pb-5">
              <div className="flex h-full max-h-full flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
                    {cart?.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariant.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productvariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col gap-4">
                <Separator />

                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                </div>

                <Separator />

                <Button className="mt-3 rounded-full" asChild>
                  <Link href="/cart/identification">Finalizar Compra</Link>
                </Button>

                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground text-center text-sm underline"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
