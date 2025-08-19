import { z } from "zod";

export const addProductToCartSchema = z.object({
  productVariantId: z.string().uuid(),
  quantity: z.number().int().min(1).max(999),
});

export type addProductToCartSchema = z.infer<typeof addProductToCartSchema>;
