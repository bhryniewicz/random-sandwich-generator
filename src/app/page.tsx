import { SandwichGenerator } from "@/components/SandwichGenerator";
import { getBreadStuff, getProducts, getSauces } from "@/server/ingredients";
import { Suspense } from "react";
import { Loader } from "@/components/Loader";

export default async function Home() {
  return (
    <div className="flex items-center h-screen w-[50%]">
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
    <div>
      <SandwichGenerator
        products={products}
        breadStuff={breadStuff}
        sauces={sauces}
      />
    </div>
  );
};
