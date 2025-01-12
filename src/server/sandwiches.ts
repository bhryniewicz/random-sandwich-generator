import clientPromise from "@/lib/mongodb/mongodb";

export const getSandwiches = async () => {
  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const products = await db
      .collection("created-sandwiches")
      .find({})
      .toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};
