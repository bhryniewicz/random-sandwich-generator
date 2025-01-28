import { getSandwich, insertSandwich } from "@/services/api/sandwich";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteSandwich } from "@/services/api/sandwich";
import { ICreatedSandwich } from "@/types/sandwich";

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

export const useDeleteSandwich = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["delete-sandwich"],
    mutationFn: async (id: string) => {
      await deleteSandwich(id);
    },
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["sandwiches-search"] });
      const previousSandwiches = queryClient.getQueryData<ICreatedSandwich[]>([
        "sandwiches-search",
      ]);

      queryClient.setQueryData<ICreatedSandwich[]>(
        ["sandwiches-search"],
        (old) => old?.filter((sandwich) => sandwich._id !== id) || []
      );

      return { previousSandwiches };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(
        ["sandwiches-search"],
        context?.previousSandwiches
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["sandwiches-search"] });
    },
  });

  return { mutate };
};
