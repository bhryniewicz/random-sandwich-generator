"use client";

import { useState } from "react";
import { getRandom, getRandomProducts } from "./utils";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";

export const useGenerateSandwich = (
  products: ProductBase[],
  breadStuff: IBreadStuff[],
  sauces: ISauce[]
) => {
  const [bread, setBread] = useState<IBreadStuff | null>(null);
  const [ingredients, setIngredients] = useState<ProductBase[]>([]);
  const [sauce, setSauce] = useState<ISauce | null>(null);
  const [isChoosing, setIsChoosing] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  const handleGenerateSandwich = () => {
    setIsChoosing(true);
    let randomBread;
    let randomProduct;
    let randomSauce;
    resetSandwichGeneration();

    const interval = setInterval(() => {
      randomBread = getRandom<IBreadStuff>(breadStuff);
      randomProduct = getRandomProducts<ProductBase>(products);
      randomSauce = getRandom<ISauce>(sauces);

      setBread(randomBread);
      setIngredients(randomProduct);
      setSauce(randomSauce);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      const finalBread = getRandom<IBreadStuff>(breadStuff);
      const finalProducts = getRandomProducts<ProductBase>(products);
      const finalSauce = getRandom<ISauce>(sauces);

      setBread(finalBread);
      setIngredients(finalProducts);
      setSauce(finalSauce);
      setIsChoosing(false);
      setIsGenerated(true);
    }, 2000);
  };

  const resetSandwichGeneration = () => {
    setBread(null);
    setIngredients([]);
    setSauce(null);
    setIsGenerated(false);
  };

  return {
    isChoosing,
    bread,
    ingredients,
    sauce,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
  };
};
