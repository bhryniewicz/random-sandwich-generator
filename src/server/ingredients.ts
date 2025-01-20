import clientPromise from "@/lib/mongodb/mongodb";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";

type Collection = "products" | "breadstuff" | "sauces";

const getCollection = async <T>(collection: Collection): Promise<T[]> => {
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
  
  export const getIngredients = async (): Promise<ProductBase[]> =>
    getCollection<ProductBase>("products");
  
  export const getBreadStuff = async (): Promise<IBreadStuff[]> =>
    getCollection<IBreadStuff>("breadstuff");
  
  export const getSauces = async (): Promise<ISauce[]> =>
    getCollection<ISauce>("sauces");
  
  export const getProducts = async () => {
    const [breadStuff, sauces, ingredients] = await Promise.all([
      getBreadStuff(),
      getSauces(),
      getIngredients(),
    ]);
  
    return { breadStuff, sauces, ingredients };
  };
