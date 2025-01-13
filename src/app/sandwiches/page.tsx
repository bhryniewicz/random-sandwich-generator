import { Loader } from "@/components/Loader";
import { SandwichesList } from "@/components/SandwichesList";
import { getSandwiches } from "@/server/sandwiches";
import { Suspense } from "react";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return (
    <div className="flex flex-col items-center justify-center h-screen flex-grow">
      <Suspense fallback={<Loader />}>
        <SandwichesList sandwiches={sandwiches} />
      </Suspense>
    </div>
  );
}
