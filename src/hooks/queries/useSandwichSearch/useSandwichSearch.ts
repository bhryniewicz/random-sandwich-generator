import { deleteSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//query
export const useSandwichSearch = (
  initialData: ICreatedSandwich[],
  searchParam: string = ""
) => {
  const { data: sandwichList, isLoading } = useQuery<ICreatedSandwich[]>({
    queryKey: ["sandwiches-search", searchParam],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/sandwiches?search=${searchParam}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get sandwich with this ID");
      }

      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
    initialData: searchParam === "" ? initialData : undefined,
  });

  return { sandwichList, isLoading };
};

//mutation
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
