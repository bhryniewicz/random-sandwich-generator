import { SandwichGenerator } from "@/components/SandwichGenerator";
import { getBreadStuff, getProducts, getSauces } from "@/server/ingredients";
import { Suspense } from "react";
import Sandwich from "@/assets/sandwich.png";
import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Suspense
        fallback={
          <Image
            src={Sandwich}
            alt="sandwich loading photo"
            width={200}
            height={200}
            className="animate-pulse"
          />
        }
      >
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
