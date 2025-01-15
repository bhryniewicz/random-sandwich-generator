import { Checkbox } from "../ui/checkbox";
import { useSandwichFiltersContext } from "@/contexts/sandwichFIltersContext";
import { Separator } from "../ui/separator";
import { ComboboxSelect } from "../ComboboxSelect";


export const SandwichFilters = ({breads}) => {
  const { sauceFilter, setSauceFilter } = useSandwichFiltersContext();

  return (
    <div className="flex flex-col gap-4 py-8 mb-12">
      <div>
        <h4 className="font-luckiest text-lg text-[#471a08]">Filters</h4>
        <Separator />
      </div>
      <p className="text-sm font-bold text-gray-600">
        Saving option gives a possility to check later on what sandwich you ve
        got but also editing and more exiciting stuff. Add name to remember what
        was that amazing sandwich. You can write a date or some weird name.
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
      {/* <ComboboxSelect 
        items={breads}
        name
        /> */}
    </div>
  );
};
