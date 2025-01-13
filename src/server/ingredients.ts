import clientPromise from "@/lib/mongodb/mongodb";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";

type Collection = "products" | "breadstuff" | "sauces";

const getProductss = async <T>(collection: Collection): Promise<T[]> => {
  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const products = await db.collection(collection).find({}).toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const getProducts = async (): Promise<ProductBase[]> =>
  getProductss<ProductBase>("products");

export const getBreadStuff = async (): Promise<IBreadStuff[]> =>
  getProductss<IBreadStuff>("breadstuff");

export const getSauces = async (): Promise<ISauce[]> =>
  getProductss<ISauce>("sauces");
