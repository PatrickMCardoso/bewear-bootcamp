import { useQuery } from "@tanstack/react-query";

import { getShippingAddresses } from "@/actions/get-shipping-addresses";

export const getShippingAddressesQueryKey = () =>
  ["shipping-addresses"] as const;

interface UseShippingAddressesOptions {
  initialData?: Awaited<ReturnType<typeof getShippingAddresses>>;
}

export const useShippingAddresses = (options?: UseShippingAddressesOptions) => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: getShippingAddresses,
    initialData: options?.initialData,
  });
};
