import z from "zod";

export const removeProductFromCartProductSchema = z.object({
  cartItemId: z.uuid(),
});
