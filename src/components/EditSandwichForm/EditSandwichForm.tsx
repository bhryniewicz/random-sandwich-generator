"use client";

import { editSandwich, getSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditSandwichValues } from "./schema";
import { Form } from "../ui/form";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { Card } from "../ui/card";
import { ComboboxSelect } from "../ComboboxSelect";
import { Button } from "../ui/button";
import { FormInput } from "../FormInput";
import { Loader } from "../Loader";

interface EditSandwichFormProps {
  breads: IBreadStuff[];
  sauces: ISauce[];
  ingredients: ProductBase[];
}

export const EditSandwichForm: FC<EditSandwichFormProps> = ({
  breads,
  sauces,
  ingredients: serverIngredients,
}) => {
  const { id } = useParams();

  const { data, isLoading } = useQuery<ICreatedSandwich>({
    queryKey: ["sandwich"],
    queryFn: async () => await getSandwich(id as string),
    enabled: !!id,
  });

  const form = useForm<EditSandwichValues>({
    resolver: zodResolver(editFormSchema),
  });

  if (isLoading) return <Loader isBackground />;

  if (data === undefined) return <h1>no data</h1>;

  const {
    name,
    sandwich: { bread, sauce, ingredients },
  } = data;

  const onSubmit = async (changedData: EditSandwichValues) => {
    const editedSandwich: ICreatedSandwich = {
      ...data,
      ...changedData,
      editedAt: new Date(),
    };
    await editSandwich(editedSandwich);
  };

  return (
    <Card className="p-16 w-[600px]">
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput name="name" defaultValue={name} />
            Sandwich
            <ComboboxSelect<IBreadStuff>
              items={breads}
              defaultValue={bread}
              name="sandwich.bread"
              category="bread"
            />
            <ComboboxSelect<ISauce>
              items={sauces}
              defaultValue={sauce}
              name="sandwich.sauce"
              category="sauce"
            />
            <ComboboxSelect<ProductBase>
              items={serverIngredients}
              defaultValue={ingredients}
              name="sandwich.ingredients"
              category="ingredients"
              multiple
            />
            <Button variant={"default"} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </FormProvider>
    </Card>
  );
};
