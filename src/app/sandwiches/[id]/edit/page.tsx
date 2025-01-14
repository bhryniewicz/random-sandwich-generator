import { EditSandwichForm } from "@/components/EditSandwichForm/EditSandwichForm";
import { getBreadStuff, getProducts, getSauces } from "@/server/ingredients";
import { getSandwich } from "@/server/insertSandwich";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function EditSandwichPage({
  params,
}: {
  params: { id: string };
}) {
  const par = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["sandwich", par.id],
    queryFn: () => getSandwich(par.id),
  });

  const breads = await getBreadStuff();
  const sauces = await getSauces();
  const ingredients = await getProducts();

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <EditSandwichForm
          breads={breads}
          sauces={sauces}
          ingredients={ingredients}
        />
      </HydrationBoundary>
    </div>
  );
}
