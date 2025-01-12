"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGenerateSandwich } from "@/hooks/useGenerateSandwich/useGenerateSandiwch";
import { Button } from "../ui/button";
import { insertSandwich } from "@/server/insertSandwich";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";

interface SandwichGeneratorProps {
  products: ProductBase[];
  breadStuff: IBreadStuff[];
  sauces: ISauce[];
}

export const SandwichGenerator: FC<SandwichGeneratorProps> = ({
  products,
  breadStuff,
  sauces,
}) => {
  const {
    bread,
    product,
    sauce,
    isChoosing,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
  } = useGenerateSandwich(products, breadStuff, sauces);

  const sandwich = {
    bread,
    product,
    sauce,
  };

  return (
    <div className="flex flex-col gap-8 w-[400px]">
      <Card className=" p-8">
        <CardHeader>
          <CardTitle>Your randomly generated sandwich</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Bread: {bread?.name}</p>
          <div>
            Products:{" "}
            <ul>
              {isChoosing
                ? "Choosing products..."
                : product.map((pro) => {
                    return <li key={pro._id}>{pro?.name}</li>;
                  })}
            </ul>
          </div>
          <p>Sauce: {sauce && `${sauce.name} - ${sauce.type}`}</p>
        </CardContent>
        <Button
          variant={"default"}
          onClick={handleGenerateSandwich}
          disabled={isChoosing}
        >
          Generate
        </Button>
      </Card>

      {isGenerated && (
        <AddSandwichForm
          sandwich={sandwich}
          resetSandwichGeneration={resetSandwichGeneration}
        />
      )}
    </div>
  );
};

const AddSandwichForm = ({ sandwich, resetSandwichGeneration }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "New Sandwich",
    },
  });

  const onSubmit = async (data) => {
    await insertSandwich(data.name, sandwich);
    resetSandwichGeneration();
  };

  return (
    <Card className="flex flex-col gap-6 p-8">
      <CardTitle>Do you want to save this sandwich?</CardTitle>
      <CardDescription>
        Saving option gives a possility to check later on what sandwich you ve
        got but also editing and more exiciting stuff.
      </CardDescription>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <Input id="name" {...register("name")} />
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
    </Card>
  );
};
