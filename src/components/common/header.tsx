"use client";

import {
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PackageIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "@/components/ui/sonner";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticationPage = pathname === "/authentication";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuItemClick = (href: string, requireAuth: boolean = false) => {
    if (requireAuth && !session?.user) {
      toast.error("Você precisa fazer login para acessar esta página.");
      return;
    }

    setMenuOpen(false);

    if (href === "/" && pathname === "/") {
      return;
    }

    // Usar router.push para redirecionamento
    router.push(href);
  };

  const handleLogout = () => {
    authClient.signOut();
    toast.success("Logout realizado com sucesso!");
    setMenuOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      {!isAuthenticationPage && (
        <div className="flex items-center gap-3">
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-6 px-5">
                {session?.user ? (
                  <>
                    {/* User Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={session?.user?.image as string | undefined}
                          />
                          <AvatarFallback>
                            {session?.user?.name?.split(" ")?.[0]?.[0]}
                            {session?.user?.name?.split(" ")?.[1]?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
                          <span className="text-muted-foreground block text-xs">
                            {session?.user?.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Menu Items for Logged User */}
                    <div className="flex flex-col space-y-4">
                      <Link
                        href="/"
                        className="flex items-center gap-3 text-sm"
                        onClick={() => handleMenuItemClick("/")}
                      >
                        <HomeIcon className="h-4 w-4" />
                        Início
                      </Link>
                      <Link
                        href="/my-orders"
                        className="flex items-center gap-3 text-sm"
                        onClick={() => handleMenuItemClick("/my-orders")}
                      >
                        <PackageIcon className="h-4 w-4" />
                        Meus Pedidos
                      </Link>
                      <button
                        className="flex items-center gap-3 text-left text-sm"
                        onClick={() => handleMenuItemClick("/sacola")}
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Carrinho
                      </button>
                    </div>

                    <Separator />

                    {/* Categories */}
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-sm font-semibold">Categorias</h3>
                      <div className="flex flex-col space-y-3">
                        <Link
                          href="/category/camisetas"
                          className="text-muted-foreground text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/camisetas")
                          }
                        >
                          Camisetas
                        </Link>
                        <Link
                          href="/category/bermuda-shorts"
                          className="text-muted-foreground text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/bermuda-shorts")
                          }
                        >
                          Bermuda & Shorts
                        </Link>
                        <Link
                          href="/category/calas"
                          className="text-muted-foreground text-sm"
                          onClick={() => handleMenuItemClick("/category/calas")}
                        >
                          Calças
                        </Link>
                        <Link
                          href="/category/jaquetas-moletons"
                          className="text-muted-foreground text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/jaquetas-moletons")
                          }
                        >
                          Jaquetas & Moletons
                        </Link>
                        <Link
                          href="/category/tnis"
                          className="text-muted-foreground text-sm"
                          onClick={() => handleMenuItemClick("/category/tnis")}
                        >
                          Tênis
                        </Link>
                        <Link
                          href="/category/acessrios"
                          className="text-muted-foreground text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/acessrios")
                          }
                        >
                          Acessórios
                        </Link>
                      </div>
                    </div>

                    <Separator />

                    {/* Logout */}
                    <div className="flex flex-col space-y-4">
                      <button
                        className="flex items-center gap-3 text-left text-sm"
                        onClick={handleLogout}
                      >
                        <LogOutIcon className="h-4 w-4" />
                        Sair da conta
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Not Logged In */}
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button size="sm" asChild className="rounded-full">
                        <Link
                          href="/authentication"
                          onClick={() => setMenuOpen(false)}
                        >
                          <LogInIcon className="mr-2 h-4 w-4" />
                          Login
                        </Link>
                      </Button>
                    </div>

                    <Separator />

                    {/* Menu Items for Not Logged User */}
                    <div className="flex flex-col space-y-4">
                      <Link
                        href="/"
                        className="flex items-center gap-3 text-sm"
                        onClick={() => handleMenuItemClick("/")}
                      >
                        <HomeIcon className="h-4 w-4" />
                        Início
                      </Link>
                      <button
                        className="text-muted-foreground flex items-center gap-3 text-left text-sm"
                        onClick={() => handleMenuItemClick("/my-orders", true)}
                      >
                        <PackageIcon className="h-4 w-4" />
                        Meus Pedidos
                      </button>
                      <button
                        className="text-muted-foreground flex items-center gap-3 text-left text-sm"
                        onClick={() => handleMenuItemClick("/cart", true)}
                      >
                        <ShoppingCartIcon className="h-4 w-4" />
                        Carrinho
                      </button>
                    </div>

                    <Separator />

                    {/* Categories */}
                    <div className="flex flex-col space-y-4">
                      <h3 className="text-sm font-semibold">Categorias</h3>
                      <div className="flex flex-col space-y-3">
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/camisetas", true)
                          }
                        >
                          Camisetas
                        </button>
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick(
                              "/category/bermuda-e-shorts",
                              true,
                            )
                          }
                        >
                          Bermuda & Shorts
                        </button>
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/calcas", true)
                          }
                        >
                          Calças
                        </button>
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick(
                              "/category/jaquetas-e-moletons",
                              true,
                            )
                          }
                        >
                          Jaquetas & Moletons
                        </button>
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/tenis", true)
                          }
                        >
                          Tênis
                        </button>
                        <button
                          className="text-muted-foreground text-left text-sm"
                          onClick={() =>
                            handleMenuItemClick("/category/acessorios", true)
                          }
                        >
                          Acessórios
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <Cart />
        </div>
      )}
    </header>
  );
};
