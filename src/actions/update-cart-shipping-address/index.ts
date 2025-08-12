"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type UpdateCartShippingAddressSchema,
  updateCartShippingAddressSchema,
} from "./schema";

export async function updateCartShippingAddress(
  data: UpdateCartShippingAddressSchema,
) {
  try {
    // Validate the input data
    const validatedData = updateCartShippingAddressSchema.parse(data);

    // Get the current user session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado");
    }

    // Update the cart with the shipping address
    const [updatedCart] = await db
      .update(cartTable)
      .set({
        shippingAddressId: validatedData.shippingAddressId,
      })
      .where(eq(cartTable.userId, session.user.id))
      .returning();

    if (!updatedCart) {
      throw new Error("Carrinho não encontrado");
    }

    return {
      success: true,
      data: updatedCart,
      message: "Endereço vinculado ao carrinho com sucesso!",
    };
  } catch (error) {
    console.error("Error updating cart shipping address:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Erro interno do servidor",
    };
  }
}
