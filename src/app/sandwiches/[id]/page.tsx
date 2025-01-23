import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb/mongodb";

export default async function SandwichPage({
  params,
}: {
  params: { id: string };
}) {
  const ids = (await params).id;
  const client = await clientPromise;
  const db = client.db("sandwiches");

  const sandwich = await db.collection("created-sandwiches").findOne({
    _id: new ObjectId(ids),
  });

  //zastanowic sie jak pobierac ikonki
  //czy dodac jakies basic zdjecie

  //future
  //sharowanie
  //rate
  //przenoszenie miedzy wlasna lista a lista do sharowania
  

  return (
    <div>
      <h1>{sandwich?.name}</h1>
      {/* <p>{sandwich.sandwich.bread.name}</p> */}
      <p>skladniki</p>
      <p>bread</p>
      <ul>
        <li>ff</li>
        <li>ff</li>
      </ul>
      <p>sauce</p>
      <p>typ kanapki</p>
      <p>stworzona / edytowana</p>
      <p>przyciski co zrobic z nia</p>
      
    </div>
  );
}
