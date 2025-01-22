import { SandwichGenerator } from "@/screens/Generate/components/SandwichGenerator";

export const Home = () => {
  return (
    <div className="w-full h-auto min-h-[90vh] flex justify-center items-center bg-[#f4dac9] px-4">
      <SandwichGenerator />;
    </div>
  );
};
