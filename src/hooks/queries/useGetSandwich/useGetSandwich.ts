import { getSandwich } from "@/server/insertSandwich";
import { useQuery } from "@tanstack/react-query";

export const useGetSandwich = (id: string) => {
  const { data: sandwichData, isLoading: isSandwichDataLoading } = useQuery({
    queryKey: ["sandwich", id],
    queryFn: () => getSandwich(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return { sandwichData, isSandwichDataLoading };
};
