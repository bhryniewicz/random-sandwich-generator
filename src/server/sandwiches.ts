import clientPromise from "@/lib/mongodb/mongodb";

export const getSandwiches = async (filter?: string) => {
  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");

    const filters = filter ? { name: { $regex: filter, $options: "i" } } : {};

    const products = await db
      .collection("created-sandwiches")
      .find(filters)
      .toArray();

    return JSON.parse(JSON.stringify(products));
  } catch (e) {
    console.error(e);
  }
};
