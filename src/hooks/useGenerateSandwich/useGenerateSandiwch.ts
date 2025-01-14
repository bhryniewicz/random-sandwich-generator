"use client";

import { useState } from "react";
import { getRandom, getRandomProducts } from "./utils";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { ISandwich } from "@/types/sandwich";

const messages = [
  "Generating",
  "Cutting bread",
  "Slicing ingredients",
  "Adding sauce",
];

export const useGenerateSandwich = (
  products: ProductBase[],
  breadStuff: IBreadStuff[],
  sauces: ISauce[]
) => {
  const [sandwich, setSandwich] = useState<ISandwich | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  let currentMessageIndex = 0;

  const handleGenerateSandwich = () => {
    setIsGenerating(true);
    resetSandwichGeneration();

    const interval = setInterval(() => {
      currentMessageIndex = ++currentMessageIndex % messages.length;
      setCurrentMessage(messages[currentMessageIndex]);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      const bread = getRandom<IBreadStuff>(breadStuff);
      const ingredients = getRandomProducts<ProductBase>(products);
      const sauce = getRandom<ISauce>(sauces);

      const generatedSandwich = {
        bread,
        ingredients,
        sauce,
      };

      if (generatedSandwich === null) return;

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
