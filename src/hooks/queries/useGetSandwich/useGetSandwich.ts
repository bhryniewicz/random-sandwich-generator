import { getSandwich, insertSandwich } from "@/services/api/sandwich";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//query
export const useGetSandwich = (id: string) => {
  const { data: sandwichData, isLoading: isSandwichDataLoading } = useQuery({
    queryKey: ["sandwich", id],
    queryFn: () => getSandwich(id),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  return { sandwichData, isSandwichDataLoading };
};

//mutation
export const useAddSandwich = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["add-sandwich"],
    mutationFn: async (body) => {
      const { name, sandwich } = body;
      await insertSandwich(name, sandwich);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sandwiches-search"] });
    },
  });

  return { mutate };
};
