import { SandwichesList } from "@/screens/Sandwiches/components/SandwichesList";
import { ICreatedSandwich } from "@/types/sandwich";

export const Sandwiches = ({
  sandwiches,
}: {
  sandwiches: ICreatedSandwich[];
}) => {
  return (
    <div className="flex justify-center w-full bg-[#f4dac9] min-h-[88vh] md:h-[88vh] pt-4 px-2 md:px-16">
      <SandwichesList sandwiches={sandwiches} />
    </div>
  );
};
