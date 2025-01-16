import { SandwichGenerator } from "@/components/SandwichGenerator";

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <SandwichGenerator />;
    </div>
  );
}
