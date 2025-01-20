import React, { createContext, useContext, ReactNode } from "react";
import { useSandwichFilters } from "@/hooks/useSandwichFilters";

interface SandwichFiltersContextProps {
  sauceFilter: boolean;
  setSauceFilter: (value: boolean) => void;
  breadType: string;
  setBreadType: (value: string) => void;
  ingredientsQuantity: number | null;
  setIngredientsQuantity: (value: number | null) => void;
}

const SandwichFiltersContext = createContext<
  SandwichFiltersContextProps | undefined
>(undefined);

export const SandwichFiltersProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const {
    sauceFilter,
    setSauceFilter,
    breadType,
    setBreadType,
    ingredientsQuantity,
    setIngredientsQuantity,
  } = useSandwichFilters();

  return (
    <SandwichFiltersContext.Provider
      value={{
        sauceFilter,
        setSauceFilter,
        breadType,
        setBreadType,
        ingredientsQuantity,
        setIngredientsQuantity,
      }}
    >
      {children}
    </SandwichFiltersContext.Provider>
  );
};

export const useSandwichFiltersContext = () => {
  const context = useContext(SandwichFiltersContext);
  if (!context) {
    throw new Error(
      "useSandwichFiltersContext must be used within a SandwichFiltersProvider"
    );
  }
  return context;
};
