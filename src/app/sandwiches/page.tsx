import { SandwichesList } from "@/components/SandwichesList";
import { getSandwiches } from "@/server/sandwiches";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return (
    <div className="self-start mt-8">
      <SandwichesList sandwiches={sandwiches} />
    </div>
  );
}
