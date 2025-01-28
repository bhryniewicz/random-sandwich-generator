import { sandwichSchema } from "@/screens/EditSandwich/components/EditSandwichForm/schema";
import clientPromise from "@/lib/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const col = await db.collection("created-sandwiches");

    const validation = sandwichSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid sandwich data", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, sandwich } = body;

    await col.insertOne({
      name,
      sandwich,
      createdAt: new Date(),
      editedAt: null,
    });

    return NextResponse.json("Sandwich added succesfully", {
      status: 200,
    });
  } catch (e) {
    console.error(e);
  }
}

export async function DELETE(request: NextRequest) {
  const req = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const col = await db.collection("created-sandwiches");

    const query = { _id: new ObjectId(req.id) };
    const result = await col.deleteOne(query);

    if (result.deletedCount === 1) {
      return NextResponse.json(
        { message: "Successfully deleted one document." },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "No documents matched the query. Deleted 0 documents." },
        { status: 405 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const sandwich = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");
    const col = await db.collection("created-sandwiches");

    const { _id, ...updatedFields } = sandwich;

    const filter = { _id: new ObjectId(_id) };

    const result = await col.updateOne(filter, {
      $set: { ...updatedFields },
    });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "No document with this specific id" },
        { status: 405 }
      );
    }

    return NextResponse.json(
      { message: "Document updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
    NextResponse.json("bad");
  }
}
