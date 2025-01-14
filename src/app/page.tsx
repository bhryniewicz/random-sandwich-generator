import { SandwichGenerator } from "@/components/SandwichGenerator";
import { getBreadStuff, getProducts, getSauces } from "@/server/ingredients";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Suspense fallback={<Loader />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}

const ProductsList = async () => {
  const [products, breadStuff, sauces] = await Promise.all([
    getProducts(),
    getBreadStuff(),
    getSauces(),
  ]);

  if (!products || !breadStuff || !sauces) {
    return <h1>Cant do shitt</h1>;
  }

  return (
    <SandwichGenerator
      products={products}
      breadStuff={breadStuff}
      sauces={sauces}
    />
  );
};
