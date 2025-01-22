import { SandwichesList } from "@/screens/Sandwiches/components/SandwichesList";
import { ICreatedSandwich } from "@/types/sandwich";

export const Sandwiches = ({
  sandwiches,
}: {
  sandwiches: ICreatedSandwich[];
}) => {
  return (
    <div className="flex justify-center w-full bg-[#f4dac9] h-[90vh] pt-8">
      <SandwichesList sandwiches={sandwiches} />
    </div>
  );
};
