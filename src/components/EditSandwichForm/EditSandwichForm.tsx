"use client";

import { editSandwich, getSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { useQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSandwichValues, sandwichSchema } from "./schema";
import { Form, FormLabel } from "../ui/form";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { Card } from "../ui/card";
import { ComboboxSelect } from "../ComboboxSelect";
import { Button } from "../ui/button";
import { FormInput } from "../FormInput";
import { Loader } from "../Loader";
import { Separator } from "../ui/separator";
import { FormContainer } from "../FormContainer";

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
    queryKey: ["sandwich", id],
    queryFn: () => getSandwich(id as string),
    staleTime: 1000 * 60 * 5,
  });

  const form = useForm<EditSandwichValues>({
    resolver: zodResolver(sandwichSchema),
  });

  if (isLoading) return <Loader isBackground />;

  if (!data) return notFound();

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

  //list sandwhiches refactor
  //ogarnac tantascka mocniej
  //page dla sandwicha
  //filtry na kanapke
  //ogranac HOCa zbey bylo git
  //wymyslic jak ma wygladac generowanie i jak pokazuejmy wynik

  return (
    <FormContainer title={"Edit your sandwich"}>
      <FormProvider {...form}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <h4 className="font-luckiest text-lg text-[#471a08]">About</h4>
              <Separator />
            </div>
            <FormInput name="name" defaultValue={name} />
            <FormLabel>
              <h4 className="font-luckiest text-lg text-[#471a08]">Sandwich</h4>
              <Separator />
            </FormLabel>
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
            <Button
              variant={"default"}
              type="submit"
              className="bg-[#fa900f] tracking-widest mt-4"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </FormProvider>
    </FormContainer>
  );
};
