import prisma from "@/app/utils/Db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const searchKey = url.searchParams.get("q") as string;

    if (!searchKey) throw new Error("No search query");

    const search = await prisma.user.findMany({
      where: {
        username: {
          startsWith: searchKey,
          mode: "insensitive",
        },
      },
    });

    if (!search) throw new Error("Couldnt find user");

    return NextResponse.json(search, { status: 200 });
  } catch (error) {
    let msg;
    if (error instanceof Error) {
      msg = error.message;
    }

    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
