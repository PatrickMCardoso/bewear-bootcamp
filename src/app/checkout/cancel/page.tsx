"use client";

import { DialogTitle } from "@radix-ui/react-dialog";
import { XCircle } from "lucide-react";
import Link from "next/link";

import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const CheckoutCancelPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-12 w-12 text-red-500" />
          </div>
          <DialogTitle className="text-2xl">Pagamento Cancelado</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pagamento foi cancelado. Você pode tentar novamente ou continuar
            navegando pela loja.
          </DialogDescription>
          <DialogFooter>
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/cart/confirmation">Tentar novamente</Link>
            </Button>
            <Button
              className="rounded-full"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCancelPage;
