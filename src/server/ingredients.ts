import clientPromise from "@/lib/mongodb/mongodb";
import { IBreadStuff, ISauce, ProductBase } from "@/types/ingredients";
import { wait } from "@/utils/wait";

export const getProducts = async (): Promise<ProductBase[] | undefined> => {
  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const products = await db.collection("products").find({}).toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};

export const getBreadStuff = async (): Promise<IBreadStuff[] | undefined> => {
  try {
    await wait();
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const breads = await db.collection("breadstuff").find({}).toArray();
    return JSON.parse(JSON.stringify(breads));
  } catch (e) {
    console.error(e);
  }
};

export const getSauces = async (): Promise<ISauce[] | undefined> => {
  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const products = await db.collection("sauces").find({}).toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};
