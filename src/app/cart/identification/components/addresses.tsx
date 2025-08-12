"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { toast } from "sonner";

import {
  type CreateShippingAddressSchema,
  createShippingAddressSchema,
} from "@/actions/create-shipping-address/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { shippingAddressTable } from "@/db/schema";
import { useCreateShippingAddress } from "@/hooks/mutations/use-create-shipping-address";
import { useUpdateCartShippingAddress } from "@/hooks/mutations/use-update-cart-shipping-address";

interface AddressesProps {
  shippingAddresses: (typeof shippingAddressTable.$inferSelect)[];
  currentShippingAddressId?: string | null;
}

const Addresses = ({
  shippingAddresses,
  currentShippingAddressId,
}: AddressesProps) => {
  const [selectedAddress, setSelectedAddress] = useState<string | null>(() => {
    return currentShippingAddressId ?? null;
  });
  const createShippingAddressMutation = useCreateShippingAddress();
  const updateCartShippingAddressMutation = useUpdateCartShippingAddress();

  const form = useForm<CreateShippingAddressSchema>({
    resolver: zodResolver(createShippingAddressSchema),
    defaultValues: {
      email: "",
      recipientName: "",
      cpfOrCnpj: "",
      phone: "",
      zipCode: "",
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = async (values: CreateShippingAddressSchema) => {
    createShippingAddressMutation.mutate(values, {
      onSuccess: (result) => {
        if (result.success && result.data) {
          toast.success(result.message);
          form.reset();
          setSelectedAddress(null);

          updateCartShippingAddressMutation.mutate(
            { shippingAddressId: result.data.id },
            {
              onSuccess: (cartResult) => {
                if (cartResult.success) {
                  toast.success("Endereço vinculado ao carrinho!");
                  window.location.reload();
                }
              },
              onError: () => {
                toast.error("Erro ao vincular endereço ao carrinho");
              },
            },
          );
        } else {
          toast.error(result.message);
        }
      },
      onError: (error) => {
        console.error("Error creating shipping address:", error);
        toast.error("Erro ao salvar endereço");
      },
    });
  };

  const handleContinueWithExistingAddress = () => {
    if (!selectedAddress || selectedAddress === "add_new") return;

    updateCartShippingAddressMutation.mutate(
      { shippingAddressId: selectedAddress },
      {
        onSuccess: (result) => {
          if (result.success) {
            toast.success(
              "Endereço selecionado! Continuando para o pagamento...",
            );
          } else {
            toast.error(result.message);
          }
        },
        onError: (error) => {
          console.error("Error updating cart shipping address:", error);
          toast.error("Erro ao vincular endereço ao carrinho");
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identificação</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <RadioGroup
          value={selectedAddress || undefined}
          onValueChange={setSelectedAddress}
        >
          <>
            {shippingAddresses?.map((address) => (
              <Card key={address.id} className="p-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem
                    value={address.id}
                    id={address.id}
                    className="mt-1"
                  />
                  <Label
                    htmlFor={address.id}
                    className="flex-1 cursor-pointer"
                    aria-label={`Selecionar endereço: ${address.recipientName}, ${address.street}, ${address.number}`}
                  >
                    <div className="text-sm font-medium">
                      {address.recipientName}, {address.street},{" "}
                      {address.number}
                      {address.complement && `, ${address.complement}`},{" "}
                      {address.neighborhood}, {address.city} - {address.state},
                      CEP:{" "}
                      <PatternFormat
                        value={address.zipCode}
                        format="#####-###"
                        displayType="text"
                      />
                    </div>
                  </Label>
                </div>
              </Card>
            ))}

            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="add_new" id="add_new" />
                <label
                  htmlFor="add_new"
                  className="cursor-pointer text-sm font-medium"
                >
                  Adicionar novo endereço
                </label>
              </div>
            </Card>
          </>
        </RadioGroup>{" "}
        {selectedAddress && selectedAddress !== "add_new" && (
          <div className="flex justify-end pt-4">
            <Button
              onClick={handleContinueWithExistingAddress}
              disabled={updateCartShippingAddressMutation.isPending}
              className="w-full rounded-full md:w-auto"
            >
              {updateCartShippingAddressMutation.isPending
                ? "Processando..."
                : "Continuar com o pagamento"}
            </Button>
          </div>
        )}
        {selectedAddress === "add_new" && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Novo Endereço</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="seu@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="recipientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome completo</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="cpfOrCnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="###.###.###-##"
                              mask="_"
                              customInput={Input}
                              placeholder="000.000.000-00"
                              value={field.value}
                              onValueChange={(values) => {
                                field.onChange(values.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Celular</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="(##) #####-####"
                              mask="_"
                              customInput={Input}
                              placeholder="(11) 99999-9999"
                              value={field.value}
                              onValueChange={(values) => {
                                field.onChange(values.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CEP</FormLabel>
                          <FormControl>
                            <PatternFormat
                              format="#####-###"
                              mask="_"
                              customInput={Input}
                              placeholder="00000-000"
                              value={field.value}
                              onValueChange={(values) => {
                                field.onChange(values.value);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Endereço</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rua, Avenida, etc."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="number"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Número</FormLabel>
                          <FormControl>
                            <Input placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="complement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Complemento (opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="Apto, Bloco, etc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="neighborhood"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bairro</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu bairro" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Sua cidade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input placeholder="SP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      type="submit"
                      disabled={createShippingAddressMutation.isPending}
                    >
                      {createShippingAddressMutation.isPending
                        ? "Salvando..."
                        : "Salvar Endereço"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSelectedAddress(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
