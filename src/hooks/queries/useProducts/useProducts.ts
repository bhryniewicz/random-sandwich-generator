import { IProducts } from "@/types/ingredients";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  const { data: products } = useSuspenseQuery<IProducts>({
    queryKey: ["products"],
    staleTime: 1000 * 60 * 60,
  });

  return { products };
};
