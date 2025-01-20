import { Sandwiches as SandwichesScreen } from "@/screens/Sandwiches";
import { getSandwiches } from "@/services/database/sandwiches";

export default async function SandwichesPage() {
  const sandwiches = await getSandwiches();

  return <SandwichesScreen sandwiches={sandwiches} />;
}
