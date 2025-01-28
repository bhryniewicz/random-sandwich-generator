import { ICreatedSandwich } from "@/types/sandwich";
import { useQuery } from "@tanstack/react-query";

//query
export const useSandwichSearch = (
  initialData: ICreatedSandwich[],
  searchParam: string = ""
) => {
  const {
    data: sandwichList,
    isLoading,
    isPending,
    isFetching,
  } = useQuery<ICreatedSandwich[]>({
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

  return { sandwichList, isLoading, isPending, isFetching };
};
