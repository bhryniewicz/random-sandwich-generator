"use client";

import { editSandwich } from "@/server/insertSandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { notFound, useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSandwichValues, sandwichSchema } from "./schema";
import { Form, FormLabel } from "../ui/form";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { ComboboxSelect } from "../ComboboxSelect";
import { Button } from "../ui/button";
import { FormInput } from "../FormInput";
import { Loader } from "../Loader";
import { Separator } from "../ui/separator";
import { FormContainer } from "../FormContainer";
import { useGetProducts } from "@/hooks/queries/useProducts/useProducts";
import { useGetSandwich } from "@/hooks/queries/useGetSandwich/useGetSandwich";

export const EditSandwichForm = () => {
  const { id } = useParams();
  const { sandwichData, isSandwichDataLoading } = useGetSandwich(id as string);
  const { products } = useGetProducts();

  const form = useForm<EditSandwichValues>({
    resolver: zodResolver(sandwichSchema),
  });

  if (isSandwichDataLoading) return <Loader isBackground />;
  if (!sandwichData || !products) return notFound();

  const {
    name,
    sandwich: { bread, sauce, ingredients },
  } = sandwichData;

  const { breadStuff, sauces, ingredients: serverIngredients } = products;

  const onSubmit = async (changedData: EditSandwichValues) => {
    const editedSandwich: ICreatedSandwich = {
      ...sandwichData,
      ...changedData,
      editedAt: new Date(),
    };
    await editSandwich(editedSandwich);
  };

  //pomyslec nad landing page
  //local storage / cookies zapis preferencji
  //ogarnac zmienne srodowiskowe
  //zobaczyc jakies api z jedzeniem????
  //dodac tez rozne filtry - search i przez status -> status juz tylko
  //jezeli odswizeymy z query w adresie to nie zmienia sie w zaleznosci od tego wartosci
  //dodac animacje na sandwich generatorze
  //refactor struktury plikow w calym projekcie
  //dodanie autofocusa na input gdy sie pojawi addsandwhicform
  //przemyslec koncepcje menu
  //filtry na kanapke - zrobiony basic stuff, dodac o wiele wiece
  //dodanie bloga
  //pomyslenie nad nowymi propertisami i jak dalej rozinac
  //page dla sandwicha
  //pododawac produkty, dodac do nich emotki
  //npm package dla kanapki
  //usprawnic nawigacje na stronach
  //toasty z informacje czy sie powidolo czy nie
  //bug z undeifned products jak strona jest dluzej nieuzywana

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
            <FormInput
              name="name"
              defaultValue={name}
              label={"Sandwich name"}
            />
            <FormLabel>
              <h4 className="font-luckiest text-lg text-[#471a08]">Sandwich</h4>
              <Separator />
            </FormLabel>
            <ComboboxSelect<IBreadStuff>
              items={breadStuff}
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
              className="tracking-widest mt-4"
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
