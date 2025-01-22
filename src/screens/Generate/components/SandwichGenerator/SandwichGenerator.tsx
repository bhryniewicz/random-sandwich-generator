"use client";

import { Card } from "@/components/ui/card";
import { useGenerateSandwich } from "@/hooks/useGenerateSandwich";
import { Button } from "@/components/ui/button";
import { AddSandwichForm } from "../AddSandwichForm";
import { SandwichFilters } from "../SandwichFilters";
import { useSandwichFiltersContext } from "@/contexts/sandwichFIltersContext";
import { useGetProducts } from "@/hooks/queries/useProducts/useProducts";
import { motion, AnimatePresence } from "framer-motion";

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
  } = useGenerateSandwich(products!, sauceFilter, ingredientsQuantity);

  return (
    <AnimatePresence mode="wait">
      {!isGenerating && !isGenerated && (
        <motion.div
          key="initial-state"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-between"
        >
          <h1 className="font-luckiest text-lg text-[#471a08]">
            Generate the finest sandwich
          </h1>
          <Card className="p-4 md:p-16 w-ful md:w-[600px] border-4 border-[#471a08]">
            <SandwichFilters products={products} />
            <Button
              className="flex justify-center items-center w-full py-12 bg-orange_primary text-[40px] font-luckiest"
              variant={"default"}
              onClick={handleGenerateSandwich}
            >
              Generate
            </Button>
          </Card>
        </motion.div>
      )}

      {isGenerating && (
        <motion.div
          key="generating-state"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center items-center bg-[url('/assets/sandwich.png')] w-[800px] h-[800px] bg-cover bg-center"
        >
          <h3
            className="text-4xl text-white font-luckiest mt-8"
            style={{
              textShadow:
                "2px 2px 4px rgba(0, 0, 0, 0.7), -2px -2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            {currentMessage}...
          </h3>
        </motion.div>
      )}

      {isGenerated && sandwich && (
        <motion.div
          key="generated-state"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="pb-8"
        >
          <AddSandwichForm
            sandwich={sandwich}
            resetSandwichGeneration={resetSandwichGeneration}
            generateSandwich={handleGenerateSandwich}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
