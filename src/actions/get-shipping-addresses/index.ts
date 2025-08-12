"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { auth } from "@/lib/auth";

export async function getShippingAddresses() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      throw new Error("Usuário não autenticado");
    }

    const addresses = await db.query.shippingAddressTable.findMany({
      where: (address, { eq }) => eq(address.userId, session.user.id),
      orderBy: (address, { desc }) => desc(address.createdAt),
    });

    return {
      success: true,
      data: addresses,
    };
  } catch (error) {
    console.error("Error fetching shipping addresses:", error);

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
