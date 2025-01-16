import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb/mongodb";

export default async function SandwichPage({
  params,
}: {
  params: { id: string };
}) {
  //   console.log(id);
  const ids = (await params).id;
  const client = await clientPromise;
  const db = client.db("sandwiches");

  const sandwich = await db.collection("created-sandwiches").findOne({
    _id: new ObjectId(ids),
  });

  console.log(sandwich);
  return (
    <div>
      <h1>{sandwich?.name}</h1>
      {/* <p>{sandwich.sandwich.bread.name}</p> */}
    </div>
  );
}
