import { z } from "zod";

export const createShippingAddressSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .refine((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), {
      message: "E-mail inválido",
    }),
  recipientName: z.string().min(1, "Nome completo é obrigatório"),
  cpfOrCnpj: z.string().min(11, "CPF é obrigatório"),
  phone: z.string().min(1, "Celular é obrigatório"),
  zipCode: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type CreateShippingAddressSchema = z.infer<
  typeof createShippingAddressSchema
>;
