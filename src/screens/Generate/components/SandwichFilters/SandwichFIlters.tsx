import { Checkbox } from "@/components/ui/checkbox";
import { useSandwichFiltersContext } from "@/contexts/sandwichFIltersContext";
import { Separator } from "@/components/ui/separator";
import { IProducts } from "@/types/products";
import { FC } from "react";

interface SandwichFiltersProps {
  products: IProducts;
}

export const SandwichFilters: FC<SandwichFiltersProps> = ({ products }) => {
  const { sauceFilter, setSauceFilter, setIngredientsQuantity } =
    useSandwichFiltersContext();

  return (
    <div className="flex flex-col gap-4 py-8 mb-12">
      <div>
        <h4 className="font-luckiest text-lg text-[#471a08]">Filters</h4>
        <Separator />
      </div>
      <p className="text-sm font-bold text-gray-500">
        Add some filters to your sandwich. Maybe it's randomly generated, but I
        bet if you are vegetarian, you don't want any meat inside your next
        meal.
      </p>
      <div className="flex items-center ">
        <Checkbox
          id="sauce"
          onCheckedChange={(val) => setSauceFilter(val as boolean)}
          defaultChecked={sauceFilter}
        />
        <label htmlFor="sauce" className="text-sm pl-2 font-bold leading-none">
          No sauce in sandwich
        </label>
      </div>
      <input
        type="number"
        onChange={(e) => setIngredientsQuantity(Number(e.target.value))}
      />
      {/* <ComboboxSelect 
        items={breads}
        name
        /> */}
    </div>
  );
};
