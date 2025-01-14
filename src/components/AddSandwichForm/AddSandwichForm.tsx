import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { insertSandwich } from "@/server/insertSandwich";
import { ISandwich } from "@/types/sandwich";
import { FC } from "react";
import { FormInput } from "../FormInput";

interface AddSandwichFormProps {
  sandwich: ISandwich;
  resetSandwichGeneration: () => void;
}

export const AddSandwichForm: FC<AddSandwichFormProps> = ({
  sandwich,
  resetSandwichGeneration,
}) => {
  const form = useForm({
    defaultValues: {
      name: "New Sandwich",
    },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    await insertSandwich(name, sandwich);
    resetSandwichGeneration();
  };

  return (
    <div className="flex flex-col">
      <h1 className="font-luckiest text-lg text-[#471a08]">
        Save your sandwich
      </h1>
      <Card className="flex flex-col gap-6 p-16 w-[600px] border-4 border-[#471a08]">
        <CardTitle>Do you want to save this sandwich?</CardTitle>
        <CardDescription>
          Saving option gives a possility to check later on what sandwich you ve
          got but also editing and more exiciting stuff.
        </CardDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput name={"name"} />
            <div className="flex gap-2">
              <Button variant={"default"} type="submit">
                Save
              </Button>
              <Button
                variant={"secondary"}
                type="button"
                onClick={resetSandwichGeneration}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
