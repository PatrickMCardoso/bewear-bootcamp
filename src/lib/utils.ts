import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));

  // essa classe permite que não haja conflito
  // caso eu sete alguma className pra um botão
  // sendo que ele já tem seu próprio tailwind
  // ou seja já tem uma class pré-definida
}
