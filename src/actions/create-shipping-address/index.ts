"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import {
  type CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "./schema";

export async function createShippingAddress(data: CreateShippingAddressSchema) {
  try {
    const validatedData = createShippingAddressSchema.parse(data);

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado");
    }

    const [newAddress] = await db
      .insert(shippingAddressTable)
      .values({
        userId: session.user.id,
        recipientName: validatedData.recipientName,
        street: validatedData.street,
        number: validatedData.number,
        complement: validatedData.complement || null,
        city: validatedData.city,
        state: validatedData.state,
        neighborhood: validatedData.neighborhood,
        zipCode: validatedData.zipCode,
        country: "BR",
        phone: validatedData.phone,
        email: validatedData.email,
        cpfOrCnpj: validatedData.cpfOrCnpj,
      })
      .returning();

    return {
      success: true,
      data: newAddress,
      message: "Endereço criado com sucesso!",
    };
  } catch (error) {
    console.error("Error creating shipping address:", error);

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
