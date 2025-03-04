import { useForm } from "react-hook-form";
import { Button } from "../../../../components/ui/button";
import { Card, CardTitle } from "../../../../components/ui/card";
import { Form } from "../../../../components/ui/form";
import { ISandwich } from "@/types/sandwich";
import { FC } from "react";
import { FormInput } from "../../../../components/FormInput";
import { Separator } from "../../../../components/ui/separator";
import { ArrowDownToLine } from "lucide-react";
import { FormContainer } from "../../../../components/FormContainer";
import { addSandwichSchema, AddSandwichValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddSandwich } from "@/hooks/queries/useGetSandwich/useGetSandwich";

interface AddSandwichFormProps {
  sandwich: ISandwich;
  resetSandwichGeneration: () => void;
  generateSandwich: () => void;
}

export const AddSandwichForm: FC<AddSandwichFormProps> = ({
  sandwich,
  resetSandwichGeneration,
  generateSandwich,
}) => {
  const { mutate } = useAddSandwich();

  const form = useForm<AddSandwichValues>({
    resolver: zodResolver(addSandwichSchema),
    defaultValues: {
      name: "New Sandwich",
    },
  });

  const onSubmit = async ({ name }: { name: string }) => {
    mutate({ name, sandwich });
    resetSandwichGeneration();
  };

  const { bread, ingredients, sauce } = sandwich;

  return (
    <FormContainer title={"Save your sandwich"}>
      <Card className="flex flex-col gap-6 ">
        <div>
          <h4 className="font-luckiest text-lg text-[#471a08]">Products</h4>
          <Separator />
        </div>
        <ul className="font-luckiest">
          <li>
            Bread: <span className="text-[#fa900f] pl-2">{bread.name}</span>
          </li>
          <li>
            Ingredients:{" "}
            {ingredients.length > 1 ? (
              ingredients.map((ing) => {
                return (
                  <p key={ing._id} className="text-[#fa900f] pl-2">
                    - {ing.name}
                  </p>
                );
              })
            ) : (
              <span className="text-[#fa900f] pl-2">{ingredients[0].name}</span>
            )}
          </li>
          <li>
            Sauce:{" "}
            <span className="text-[#fa900f] pl-2">
              {sauce?.name ? sauce.name : "----"}
            </span>
          </li>
        </ul>
        <CardTitle>
          <h4 className="font-luckiest text-lg text-[#471a08]">
            Do you want to save this sandwich?
          </h4>
          <Separator />
        </CardTitle>
        <p className="text-sm font-bold text-gray-500">
          Saving option gives a possility to check later on what sandwich you ve
          got but also editing and more exiciting stuff. Add name to remember
          what was that amazing sandwich. You can write a date or some weird
          name.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormInput name={"name"} label={"Sandwich name"} />
            <div className="flex flex-col gap-4">
              <Button variant={"default"} type="submit" className="mt-4">
                Save
                <ArrowDownToLine />
              </Button>
              <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="font-luckiest text-[#471a08]">or</span>
                <Separator className="flex-1" />
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={generateSandwich}
                  className="flex-1"
                >
                  Generate again
                </Button>
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={resetSandwichGeneration}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </Card>
    </FormContainer>
  );
};
