import { SandwichesList } from "@/components/SandwichesList";
import { getSandwiches } from "@/server/sandwiches";
import { Suspense } from "react";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen gradient">
      <Suspense fallback={<h1>loading...</h1>}>
        <SandwichesList sandwiches={sandwiches} />
      </Suspense>
    </div>
  );
}
