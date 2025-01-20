import { SandwichesList } from "@/components/SandwichesList";
import { ICreatedSandwich } from "@/types/sandwich";

export const Sandwiches = ({
  sandwiches,
}: {
  sandwiches: ICreatedSandwich[];
}) => {
  return (
    <div className="self-start mt-8">
      <SandwichesList sandwiches={sandwiches} />
    </div>
  );
};
