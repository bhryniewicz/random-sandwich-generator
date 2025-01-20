import { IProducts } from "@/types/products";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const { data: products } = useQuery<IProducts>({
    queryKey: ["products"],
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });

  return { products };
};
