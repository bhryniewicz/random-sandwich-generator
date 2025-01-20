"use client";

import { Card } from "@/components/ui/card";
import { useGenerateSandwich } from "@/hooks/useGenerateSandwich";
import { Button } from "../ui/button";
import { AddSandwichForm } from "../AddSandwichForm";
import { SandwichFilters } from "../SandwichFilters";
import { useSandwichFiltersContext } from "@/contexts/sandwichFIltersContext";
import { Sandwich } from "lucide-react";
import { useGetProducts } from "@/hooks/queries/useProducts/useProducts";

export const SandwichGenerator = () => {
  const { sauceFilter, ingredientsQuantity } = useSandwichFiltersContext();
  const { products } = useGetProducts();

  const {
    sandwich,
    isGenerating,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
    currentMessage,
  } = useGenerateSandwich(products, sauceFilter, ingredientsQuantity);

  return (
    <>
      {!isGenerating && !isGenerated && (
        <div className="flex flex-col justify-between">
          <h1 className="font-luckiest text-lg text-[#471a08]">
            Generate the finest sandwich
          </h1>
          <Card className="p-16 w-[600px] border-4 border-[#471a08]">
            <SandwichFilters products={products} />
            <Button
              className="flex justify-center items-center w-full py-12 bg-orange_primary text-[40px] font-luckiest"
              variant={"default"}
              onClick={handleGenerateSandwich}
            >
              <Sandwich
                style={{
                  width: "30px",
                  height: "30px",
                  marginBottom: "0.5rem",
                }}
              />
              Generate
            </Button>
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
