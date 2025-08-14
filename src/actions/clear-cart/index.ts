"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";

import { ClearCartSchema, clearCartSchema } from "./schema";

export const clearCart = async (data: ClearCartSchema) => {
  const { userId } = clearCartSchema.parse(data);

  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, userId),
  });

  if (!cart) {
    return { success: false, message: "Carrinho não encontrado" };
  }

  await db.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));

  await db
    .update(cartTable)
    .set({ shippingAddressId: null })
    .where(eq(cartTable.id, cart.id));

  return { success: true, message: "Carrinho limpo com sucesso" };
};
