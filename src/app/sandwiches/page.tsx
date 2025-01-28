import { Sandwiches as SandwichesScreen } from "@/screens/Sandwiches";
import { getSandwiches } from "@/services/database/sandwiches";
import { Suspense } from "react";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return (
    <Suspense fallback={<h1>lodaing</h1>}>
      <SandwichesScreen sandwiches={sandwiches} />;
    </Suspense>
  );
}
