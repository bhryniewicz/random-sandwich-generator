"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGenerateSandwich } from "@/hooks/useGenerateSandwich/useGenerateSandiwch";
import { Button } from "../ui/button";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { FC } from "react";
import { AddSandwichForm } from "../AddSandwichForm";
import { SandwichFilters } from "../SandwichFilters";
import { useSandwichFiltersContext } from "@/contexts/sandwichFIltersContext";

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
  const { sauceFilter } = useSandwichFiltersContext();

  const {
    sandwich,
    isGenerating,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
    currentMessage,
  } = useGenerateSandwich(products, breadStuff, sauces, sauceFilter);

  return (
    <>
      {!isGenerating && !isGenerated && (
        <div className="flex flex-col justify-between">
          <h1 className="font-luckiest text-lg text-[#471a08]">
            Generate the finest sandwich
          </h1>
          <Card className="p-16 w-[600px] border-4 border-[#471a08]">
            <SandwichFilters breads={breadStuff}/>
            <Button
              className="flex justify-center items-center w-full py-12 bg-[#fa8c07] text-[40px] font-luckiest"
              variant={"default"}
              onClick={handleGenerateSandwich}
            >
              Generate
            </Button>{" "}
          </Card>
        </div>
      )}

      {isGenerating && (
        <div className="flex justify-center items-center bg-[url('/assets/sandwich.png')] w-[800px] h-[800px] bg-cover bg-center">
          <h3
            className="text-4xl text-white font-luckiest mt-8"
            style={{
              textShadow:
                "2px 2px 4px rgba(0, 0, 0, 0.7), -2px -2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            {currentMessage}...
          </h3>
        </div>
      )}

      {isGenerated && sandwich && (
        <AddSandwichForm
          sandwich={sandwich}
          resetSandwichGeneration={resetSandwichGeneration}
          generateSandwich={handleGenerateSandwich}
        />
      )}
    </>
  );
};
