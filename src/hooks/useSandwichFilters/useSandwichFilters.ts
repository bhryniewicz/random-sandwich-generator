import { useEffect, useState } from "react";

export const useSandwichFilters = () => {
  const [sauceFilter, setSauceFilter] = useState<boolean>(true);
  const [breadType, setBreadType] = useState("");

  useEffect(() => {
    console.log(sauceFilter);
  }, [sauceFilter]);

  return { sauceFilter, setSauceFilter, breadType, setBreadType };
};
