"use client";

import { useState } from "react";
import { getRandom, getRandomProducts } from "./utils";
import {
  IBreadStuff,
  IProducts,
  ISauce,
  ProductBase,
} from "@/types/ingredients";
import { ISandwich } from "@/types/sandwich";

const messages = [
  "Generating",
  "Cutting bread",
  "Slicing ingredients",
  "Adding sauce",
];

export const useGenerateSandwich = (
  products: IProducts,
  sauceFilter: boolean,
  quantity: number | null = null
) => {
  const [sandwich, setSandwich] = useState<ISandwich | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  let currentMessageIndex = 0;

  const { breadStuff, ingredients, sauces } = products;

  const handleGenerateSandwich = () => {
    setIsGenerating(true);
    resetSandwichGeneration();

    const interval = setInterval(() => {
      currentMessageIndex = ++currentMessageIndex % messages.length;
      setCurrentMessage(messages[currentMessageIndex]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      const chosenBread = getRandom<IBreadStuff>(breadStuff);
      const chosenIngredients = getRandomProducts<ProductBase>(
        ingredients,
        quantity
      );
      const chosenSauce = sauceFilter ? getRandom<ISauce>(sauces) : null;

      const generatedSandwich = {
        bread: chosenBread,
        ingredients: chosenIngredients,
        sauce: chosenSauce,
      };

      setSandwich(generatedSandwich);

      setIsGenerating(false);
      setIsGenerated(true);
    }, 4000);
  };

  const resetSandwichGeneration = () => {
    setSandwich(null);
    setIsGenerated(false);
  };

  return {
    currentMessage,
    isGenerating,
    sandwich,
    handleGenerateSandwich,
    isGenerated,
    resetSandwichGeneration,
  };
};
