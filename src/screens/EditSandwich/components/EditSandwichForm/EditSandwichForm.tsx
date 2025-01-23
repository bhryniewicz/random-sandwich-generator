"use client";

import { editSandwich } from "@/services/api/sandwich";
import { ICreatedSandwich } from "@/types/sandwich";
import { notFound, useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditSandwichValues, sandwichSchema } from "./schema";
import { Form } from "@/components/ui/form";
import { IBreadStuff, ISauce, ProductBase } from "@/types/products";
import { ComboboxSelect } from "@/components/ComboboxSelect";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/FormInput";
import { Loader } from "@/components/Loader";
import { Separator } from "@/components/ui/separator";
import { FormContainer } from "@/components/FormContainer";
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

  //jutrzejsze cele
  //page dla sandwicha
    //sporobwac pokazac to w fjanych polach z obrazami - wuykminic jak to wgl zorbic
    // przyciski del/ edit
    //pokazac tyoy itd
  //redesign formularzy - calego sandwich generator
  //stworzyc 1 layout dla wszystkich komponentow
  //npm package dla kanapki
  //not found page
  //local storage§ / cookies zapis preferencji

  //https://www.behance.net/gallery/206131529/Farm-Website?tracking_source=search_projects|food+website+web+design&l=69

  //testy zaczac pisac
  //toasty z informacje czy sie powidolo czy nie
  //dodanie autofocusa na input gdy sie pojawi addsandwhicform
  //dodac tez rozne filtry - search i przez status -> status juz tylko
  //dodanie bloga
  //zobaczyc jakies api z jedzeniem????
  //filtry na kanapke - zrobiony basic stuff, dodac o wiele wiece
  //jezeli odswizeymy z query w adresie to nie zmienia sie w zaleznosci od tego wartosci
  //pomyslenie nad nowymi propertisami i jak dalej rozinac
  //pododawac produkty, dodac do nich emotki
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
            <div>
              <h4 className="font-luckiest text-lg text-[#471a08]">Sandwich</h4>
              <Separator />
            </div>
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
