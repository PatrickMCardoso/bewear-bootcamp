import { z } from "zod";

export const clearCartSchema = z.object({
  userId: z.string(),
});

export type ClearCartSchema = z.infer<typeof clearCartSchema>;
