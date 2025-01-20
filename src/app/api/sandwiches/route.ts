import { getSandwiches } from "@/services/database/sandwiches";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { search } = Object.fromEntries(req.nextUrl.searchParams.entries());
  console.log(search, "co tu mamy");
  const resp = await getSandwiches(search);

  if (!resp) {
    return NextResponse.json({ error: "Cant get sandwiches" }, { status: 404 });
  }

  return NextResponse.json(resp, { status: 200 });
}
