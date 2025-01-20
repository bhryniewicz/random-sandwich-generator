import { useEffect, useState } from "react";

export const useSandwichFilters = () => {
  const [sauceFilter, setSauceFilter] = useState<boolean>(true);
  const [ingredientsQuantity, setIngredientsQuantity] = useState<number | null>(
    null
  );
  const [breadType, setBreadType] = useState("");

  useEffect(() => {
    console.log(ingredientsQuantity);
  }, [ingredientsQuantity]);

  return {
    sauceFilter,
    setSauceFilter,
    breadType,
    setBreadType,
    ingredientsQuantity,
    setIngredientsQuantity,
  };
};
