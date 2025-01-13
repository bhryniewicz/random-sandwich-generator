"use client";

import { editSandwich, getSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editFormSchema, EditSandwichValues } from "./schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { Card } from "../ui/card";
import { ComboboxSelect } from "../ComboboxSelect";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";
import Sandwich from "@/assets/sandwich.png";

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

  const { data, isLoading, isError } = useQuery<ICreatedSandwich | undefined>({
    queryKey: ["sandwich"],
    queryFn: async () => await getSandwich(id as string),
    enabled: !!id,
  });

  const form = useForm<EditSandwichValues>({
    resolver: zodResolver(editFormSchema),
  });

  if (isLoading)
    return (
      <Card className="flex items-center justify-center w-[600px] h-[400px] opacity-90">
        <Image
          src={Sandwich}
          alt="sandwich loading photo"
          width={200}
          height={200}
          className="animate-pulse"
        />
      </Card>
    );
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
            <FormField
              control={form.control}
              name="name"
              defaultValue={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sandwich name</FormLabel>
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
