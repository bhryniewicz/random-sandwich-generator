import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { FC } from "react";

interface FormInputProps {
  name: string;
  label: string;
  defaultValue?: string | number;
}
export const FormInput: FC<FormInputProps> = ({
  name,
  label,
  defaultValue,
}) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}:</FormLabel>
          <FormControl>
            <Input
              placeholder="Write a name for sandwich e.g Sandwich of the day"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
