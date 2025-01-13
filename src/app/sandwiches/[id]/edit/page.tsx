import { EditSandwichForm } from "@/components/EditSandwichForm/EditSandwichForm";
import { getBreadStuff, getProducts, getSauces } from "@/server/ingredients";
import { Suspense } from "react";

export default async function EditSandwichPage() {
  const breads = await getBreadStuff();
  const sauces = await getSauces();
  const ingredients = await getProducts();

  return (
    <div className="flex justify-center items-center w-full h-screen gradient">
      <Suspense fallback={<h1>loading breads</h1>}>
        <EditSandwichForm
          breads={breads}
          sauces={sauces}
          ingredients={ingredients}
        />
      </Suspense>
    </div>
  );
}
