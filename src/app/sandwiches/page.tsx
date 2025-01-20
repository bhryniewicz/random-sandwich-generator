import { SandwichesList } from "@/components/SandwichesList";
import { getSandwiches } from "@/server/sandwiches";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return (
    <div className="flex flex-col items-center justify-center h-screen flex-grow">
      <SandwichesList sandwiches={sandwiches} />
    </div>
  );
}
