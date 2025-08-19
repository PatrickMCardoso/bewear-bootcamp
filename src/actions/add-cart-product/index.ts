"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import { addProductToCartSchema } from "./schema";

export const addProductToCart = async (data: addProductToCartSchema) => {
  const validatedData = addProductToCartSchema.parse(data);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, { eq }) =>
      eq(productVariant.id, validatedData.productVariantId),
  });

  if (!productVariant) {
    throw new Error("Product variant not found");
  }

  let cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
      })
      .returning();
    cart = newCart;
  }

  const existingCartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, { and, eq }) =>
      and(
        eq(cartItem.cartId, cart.id),
        eq(cartItem.productVariantId, validatedData.productVariantId),
      ),
  });

  if (existingCartItem) {
    await db
      .update(cartItemTable)
      .set({ quantity: existingCartItem.quantity + validatedData.quantity })
      .where(eq(cartItemTable.id, existingCartItem.id));
  } else {
    await db.insert(cartItemTable).values({
      cartId: cart.id,
      productVariantId: validatedData.productVariantId,
      quantity: validatedData.quantity,
    });
  }

  return { success: true };
};
