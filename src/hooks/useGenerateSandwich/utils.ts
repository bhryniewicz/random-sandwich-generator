import { ProductBase } from "@/types/products";

export const getRandom = <T extends { name: string }>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomProducts = <T extends ProductBase>(
  products: T[],
  quantity: number | null
): T[] => {
  const numProducts = quantity ? quantity : Math.floor(Math.random() * 3) + 1;
  const randomlyChosenProducts: T[] = [];

  const getRandomProduct = () => {
    const randomProduct = getRandom(products);
    if (!randomlyChosenProducts.includes(randomProduct)) {
      randomlyChosenProducts.push(randomProduct);
    } else {
      getRandomProduct();
    }
  };

  while (randomlyChosenProducts.length < numProducts) {
    getRandomProduct();
  }

  return randomlyChosenProducts;
};
