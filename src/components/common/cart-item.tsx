import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { formatCentsToBRL } from "@/helper/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productvariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productvariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const decreaseCartProductQuantityMutation = useDecreaseCartProduct(id);
  const increaseCartProductQuantityMutation =
    useIncreaseCartProduct(productVariantId);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate();
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate();
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate();
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productvariantImageUrl}
          alt={productVariantName}
          width={78}
          height={78}
          className="rounded-lg"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-1 pr-4">
          <p className="line-clamp-1 text-sm leading-tight font-medium">
            {productName}
          </p>
          <p className="text-muted-foreground line-clamp-1 text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[80px] items-center justify-between rounded-lg border p-0.5">
            <Button
              className="h-3 w-3 p-0"
              variant="ghost"
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon className="h-2 w-2" />
            </Button>
            <p className="text-xs font-medium">{quantity}</p>
            <Button
              className="h-3 w-3 p-0"
              variant="ghost"
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon className="h-2 w-2" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-col items-end justify-center gap-1">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold whitespace-nowrap">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
