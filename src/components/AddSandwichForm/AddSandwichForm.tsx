import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { insertSandwich } from "@/server/insertSandwich";
import { ISandwich } from "@/types/sandwich";
import { FC } from "react";

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
    <Card className="flex flex-col gap-6 p-8">
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
          <Input id="name" {...form.register("name")} />
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
  );
};
