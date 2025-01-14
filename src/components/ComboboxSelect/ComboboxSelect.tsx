import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { ProductBase } from "@/types/ingredients";

interface ComboboxSelectProps<T> {
  name: string;
  items: T[];
  defaultValue: T | T[];
  category: string;
  multiple?: boolean;
}

export const ComboboxSelect = <T extends ProductBase>({
  name,
  items,
  defaultValue,
  category,
  multiple = false,
}: ComboboxSelectProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="capitalize">{category}:</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-start",
                    !field.value?.length && "text-muted-foreground"
                  )}
                >
                  {multiple
                    ? field.value?.length
                      ? field.value.map((item: T) => (
                          <div
                            key={item._id}
                            className="flex gap-2 bg-[#fa900f] text-white px-2 py-[2px] rounded"
                          >
                            {item.name}
                          </div>
                        ))
                      : "Select options"
                    : field.value?.name || "Select an option"}
                  <ChevronDown className="ml-auto" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No options found.</CommandEmpty>
                  <CommandGroup>
                    {items.map((item) => {
                      const isSelected = multiple
                        ? field.value?.some(
                            (selected: T) => selected._id === item._id
                          )
                        : field.value?._id === item._id;

                      return (
                        <CommandItem
                          key={item._id}
                          onSelect={() => {
                            if (multiple) {
                              const currentValue = field.value || [];
                              const updatedValue = isSelected
                                ? currentValue.filter(
                                    (selected: T) => selected._id !== item._id
                                  )
                                : [...currentValue, item];
                              field.onChange(updatedValue);
                              form.trigger(name);
                            } else {
                              field.onChange(item);
                              form.trigger(name);
                            }
                          }}
                          className={cn(
                            isSelected && multiple
                              ? "text-white bg-[#fa900f]"
                              : "",
                            "cursor-pointer"
                          )}
                        >
                          {item.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
