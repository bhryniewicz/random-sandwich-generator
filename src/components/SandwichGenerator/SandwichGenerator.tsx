"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGenerateSandwich } from "@/hooks/useGenerateSandwich/useGenerateSandiwch";
import { Button } from "../ui/button";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { AddSandwichForm } from "../AddSandwichForm";

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
