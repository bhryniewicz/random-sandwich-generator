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
    ingredients,
    sauce,
    isChoosing,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
  } = useGenerateSandwich(products, breadStuff, sauces);

  const sandwich = {
    bread,
    ingredients,
    sauce,
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <h1 className="font-luckiest text-lg "></h1>
        <Card className="p-16 w-[600px] border-4 border-[#471a08]">
          <CardHeader>
            <CardTitle className="text-[#471a08] text-center">
              {" "}
              Generate the finest sandwich
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>Bread: {bread?.name}</p>
            <div>
              Products:{" "}
              <ul>
                {isChoosing
                  ? "Choosing products..."
                  : ingredients.map((pro) => {
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
      </div>

      {isGenerated && (
        <AddSandwichForm
          sandwich={sandwich}
          resetSandwichGeneration={resetSandwichGeneration}
        />
      )}
    </div>
  );
};
