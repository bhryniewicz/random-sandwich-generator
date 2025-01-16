import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const sandwichId = (await params).id;

  try {
    const client = await clientPromise;
    const db = client.db("sandwiches");

    const sandwich = await db.collection("created-sandwiches").findOne({
      _id: new ObjectId(sandwichId),
    });

    if (!sandwich) {
      return NextResponse.json(
        { error: "Sandwich not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(sandwich, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch sandwich" },
      { status: 500 }
    );
  }
}
